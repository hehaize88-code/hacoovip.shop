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
  if (!/<\/html>\s*$/.test(html) || html.includes("\uFFFD")) {
    throw new Error(`Incomplete or invalid static HTML: ${relative(pagesDir, file)}`);
  }
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);
  // The published pages use native links, forms and details elements. Keep
  // them independent of Next's flight stream: an incomplete transport payload
  // otherwise replaces a readable document with the client error boundary.
  // Preserve analytics, JSON-LD and other site-owned scripts.
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) =>
    /\bsrc=["']\/_next\//i.test(script) || script.includes("self.__next") ? "" : script
  );
  html = html.replace(/<link\b[^>]*\bas=["']script["'][^>]*>/gi, "");
  html = html.replaceAll('<meta name="codex-preview" content="development"/>', "");
  await writeFile(file, html);
}
