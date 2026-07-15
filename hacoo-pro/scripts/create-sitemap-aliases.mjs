import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const source = new URL("../out/sitemap.xml", import.meta.url);
const xmlAlias = new URL("../out/sitemap-main.xml", import.meta.url);
const textAlias = new URL("../out/sitemap.txt", import.meta.url);

const xml = await readFile(source, "utf8");
const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);

if (urls.length === 0) {
  throw new Error("The generated sitemap did not contain any URLs.");
}

await Promise.all([
  writeFile(xmlAlias, xml),
  writeFile(textAlias, `${urls.join("\n")}\n`),
]);

const outputRoot = new URL("../out/", import.meta.url);
const localizedLanguages = new Set(["es", "fr", "de", "it", "pt"]);
let localizedHtmlFiles = 0;

async function rewriteLocalizedHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return rewriteLocalizedHtml(fullPath);
    if (!entry.isFile() || !entry.name.endsWith(".html")) return;
    const relative = path.relative(outputRoot.pathname, fullPath);
    const locale = relative.split(path.sep)[0];
    if (!localizedLanguages.has(locale)) return;
    const html = await readFile(fullPath, "utf8");
    const corrected = html.replace(/<html lang="en">/, `<html lang="${locale}">`);
    if (corrected !== html) {
      await writeFile(fullPath, corrected);
      localizedHtmlFiles += 1;
    }
  }));
}

await rewriteLocalizedHtml(outputRoot.pathname);
console.log(`Created sitemap aliases with ${urls.length} URLs and corrected ${localizedHtmlFiles} localized HTML files.`);
