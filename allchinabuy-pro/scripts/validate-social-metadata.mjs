import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const outDir = resolve(process.cwd(), "out");
const siteUrl = "https://allchinabuy.pro";
const failures = [];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1], match[2]]),
  );
}

function metaMap(html) {
  const result = new Map();
  for (const tag of html.match(/<meta\s[^>]*>/g) ?? []) {
    const attrs = attributes(tag);
    const key = attrs.property ?? attrs.name;
    if (key && attrs.content) result.set(key, attrs.content);
  }
  return result;
}

function canonicalUrl(html) {
  for (const tag of html.match(/<link\s[^>]*>/g) ?? []) {
    const attrs = attributes(tag);
    if (attrs.rel === "canonical") return attrs.href;
  }
}

const pages = walk(outDir).filter((path) => path.endsWith(".html"));
let audited = 0;

for (const path of pages) {
  const relativePath = relative(outDir, path).split(sep).join("/");
  if (relativePath === "404.html" || relativePath.startsWith("404/") || relativePath.startsWith("_not-found/")) {
    continue;
  }
  const html = readFileSync(path, "utf8");
  const metas = metaMap(html);
  if ((metas.get("robots") ?? "").includes("noindex")) continue;
  const canonical = canonicalUrl(html);
  if (!canonical) continue;
  audited += 1;
  const route = `/${relativePath}`
    .replace(/\/index\.html$/, "/")
    .replace(/^\/index\.html$/, "/");
  const expected = [
    "og:title",
    "og:description",
    "og:url",
    "og:image",
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ];
  for (const key of expected) {
    if (!metas.get(key)) failures.push(`${route}: missing ${key}`);
  }
  if (metas.get("og:url") !== canonical) {
    failures.push(`${route}: og:url does not match canonical (${metas.get("og:url")} vs ${canonical})`);
  }
  if (metas.get("twitter:title") !== metas.get("og:title")) {
    failures.push(`${route}: Twitter and Open Graph titles differ`);
  }
  if (metas.get("twitter:description") !== metas.get("og:description")) {
    failures.push(`${route}: Twitter and Open Graph descriptions differ`);
  }
  if (metas.get("twitter:image") !== metas.get("og:image")) {
    failures.push(`${route}: Twitter and Open Graph images differ`);
  }
  if (route !== "/" && canonical === siteUrl) {
    failures.push(`${route}: inherited the homepage canonical URL`);
  }
  if (route !== "/" && metas.get("og:image") === `${siteUrl}/images/hero-collage.webp`) {
    failures.push(`${route}: inherited the homepage share image`);
  }
}

if (audited < 45) failures.push(`Expected at least 45 indexable HTML pages, audited ${audited}`);

if (failures.length > 0) {
  console.error(`Social metadata validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Social metadata passed for ${audited} indexable pages.`);
