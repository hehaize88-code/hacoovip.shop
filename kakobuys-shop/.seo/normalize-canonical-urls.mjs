import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const scriptPath = fileURLToPath(import.meta.url);
const siteOrigin = "https://kakobuys.shop";
const textExtensions = new Set([".html", ".js", ".xml"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(target);
    return textExtensions.has(path.extname(entry.name)) ? [target] : [];
  });
}

function canonicalPath(pathname) {
  if (!pathname || pathname === "/" || pathname.endsWith("/")) return pathname || "/";
  const target = path.join(root, pathname.replace(/^\/+/, ""));
  return fs.existsSync(target) && fs.statSync(target).isDirectory() ? `${pathname}/` : pathname;
}

function normalizeAbsoluteUrls(source) {
  return source.replace(/https:\/\/kakobuys\.shop(?:\/[^\s"'`<>]*)?/g, (value) => {
    if (value === siteOrigin) return `${siteOrigin}/`;
    const url = new URL(value);
    url.pathname = canonicalPath(url.pathname);
    return url.toString();
  });
}

function normalizeRelativeLinks(source) {
  return source
    .replace(/(\bhref\s*=\s*)(["'])(\/[^"'?#]*)(\2)/gi, (_match, prefix, quote, pathname) =>
      `${prefix}${quote}${canonicalPath(pathname)}${quote}`
    )
    .replace(/(\bhref\s*:\s*)(["'`])(\/[^"'`?#]*)(\2)/g, (_match, prefix, quote, pathname) =>
      `${prefix}${quote}${canonicalPath(pathname)}${quote}`
    );
}

let changedFiles = 0;

for (const file of walk(root)) {
  if (file === scriptPath) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = normalizeRelativeLinks(normalizeAbsoluteUrls(before));
  if (after === before) continue;
  changedFiles += 1;
  fs.writeFileSync(file, after);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const invalidLocations = locations.filter((location) => {
  const url = new URL(location);
  return canonicalPath(url.pathname) !== url.pathname;
});

if (invalidLocations.length) {
  throw new Error(`Sitemap still contains non-canonical URLs:\n${invalidLocations.join("\n")}`);
}

console.log(JSON.stringify({ changedFiles, sitemapUrls: locations.length }, null, 2));
