import { readdir, readFile, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const pagesDir = resolve(projectRoot, "dist", "pages");
const locales = new Set(["de", "fr", "es", "it", "pl"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

for (const file of await walk(pagesDir)) {
  const route = relative(pagesDir, file).split(sep);
  const locale = locales.has(route[0]) ? route[0] : "en";
  let html = await readFile(file, "utf8");
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);
  // Next serializes the root layout into its hydration payload. Keep that copy
  // aligned with the emitted tag so hydration cannot revert localized pages to
  // English after the browser loads the client runtime.
  html = html.replaceAll('\\"lang\\":\\"en\\"', `\\"lang\\":\\"${locale}\\"`);
  html = html.replaceAll('<meta name="codex-preview" content="development"/>', "");
  await writeFile(file, html);
}
