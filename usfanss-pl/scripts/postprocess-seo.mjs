import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const outputDir = join(process.cwd(), "out");
const languageByPrefix = {
  en: "en",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
  ro: "ro-RO",
};

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  }));
  return nested.flat();
}

const files = await htmlFiles(outputDir);
for (const file of files) {
  const route = relative(outputDir, file).split(sep);
  const lang = languageByPrefix[route[0]] ?? "pl-PL";
  const html = await readFile(file, "utf8");
  const corrected = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);
  if (corrected !== html) await writeFile(file, corrected);
}

console.log(`Corrected HTML lang attributes in ${files.length} exported pages.`);
