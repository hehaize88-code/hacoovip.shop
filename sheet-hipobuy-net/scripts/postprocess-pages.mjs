import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || ".";
const locales = { de: "de", es: "es", it: "it", pl: "pl" };
const replacements = [
  ["SEO Articles", "Buying Guides"],
  ["SEO research library", "Buying Guides"],
  ["Practical Hipobuy guides with a clear search intent.", "Hipobuy Buying Guides: Spreadsheet, QC & Shipping"],
  ["Searchable rows, exact product links.", "Hipobuy Spreadsheet | Searchable Product Links"],
  ["Ten focused ways into the catalogue.", "Hipobuy Product Categories | Shoes, Shirts & More"],
  ["Turn warehouse photos into a decision.", "Hipobuy QC Photos Guide | Warehouse Checklist"],
  ["Plan the parcel before choosing the route.", "Hipobuy Shipping Cost & Parcel Planning Guide"],
  ["Clear limits before you buy.", "Hipobuy FAQ | QC, Storage, Shipping & Returns"],
  ["SEO-Artikel", "Kaufratgeber"],
  ["Artículos SEO", "Guías de compra"],
  ["Articoli SEO", "Guide all'acquisto"],
  ["Artykuły SEO", "Przewodniki zakupowe"],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) processFile(full);
  }
}

function processFile(file) {
  let html = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  const first = rel.split("/")[0];
  const lang = locales[first] || "en";
  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`);
  for (const [from, to] of replacements) html = html.split(from).join(to);
  fs.writeFileSync(file, html);
}

walk(root);
