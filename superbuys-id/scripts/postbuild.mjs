import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const outDir = new URL("../out/", import.meta.url);
const languageByPrefix = { en: "en", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" };

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const route = relative(outDir.pathname, fullPath).split(sep);
    const lang = languageByPrefix[route[0]] ?? "id-ID";
    const html = await readFile(fullPath, "utf8");
    await writeFile(fullPath, html.replace(/<html lang="[^"]+">/, `<html lang="${lang}">`));
  }
}

await walk(outDir.pathname);
