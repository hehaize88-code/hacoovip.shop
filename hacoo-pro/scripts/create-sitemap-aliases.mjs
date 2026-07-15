import { readFile, writeFile } from "node:fs/promises";

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

console.log(`Created sitemap-main.xml and sitemap.txt with ${urls.length} URLs.`);
