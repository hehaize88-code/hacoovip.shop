import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products, SITE_URL } from "../app/data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(projectRoot, "out");
const locales = ["es", "fr", "de", "it", "pt"];
const allLocales = ["en", ...locales];
const legalPaths = ["contact", "privacy", "terms"];
const problems = [];
const titles = new Map();

function localizedUrl(locale, route) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}/${route}/`;
}

async function validateHtml(locale, route) {
  const file = path.join(out, locale, route, "index.html");
  let html;
  try {
    html = await readFile(file, "utf8");
  } catch {
    problems.push(`${locale}/${route}: missing static HTML`);
    return;
  }
  const canonical = localizedUrl(locale, route);
  if (!html.includes(`<html lang="${locale}">`)) problems.push(`${locale}/${route}: incorrect HTML language`);
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) problems.push(`${locale}/${route}: incorrect canonical`);
  for (const alternate of allLocales) {
    const href = localizedUrl(alternate, route);
    if (!html.includes(`rel="alternate" hrefLang="${alternate}" href="${href}"`)) problems.push(`${locale}/${route}: missing ${alternate} hreflang`);
  }
  if (!html.includes(`rel="alternate" hrefLang="x-default" href="${localizedUrl("en", route)}"`)) problems.push(`${locale}/${route}: missing x-default hreflang`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) problems.push(`${locale}/${route}: missing title`);
  else if (titles.has(title)) problems.push(`${locale}/${route}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, `${locale}/${route}`);
  if (route.startsWith("products/")) {
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ");
    const wordCount = visibleText.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 650) problems.push(`${locale}/${route}: localized page is too thin (${wordCount} words)`);
    if (!html.includes('"@type":"FAQPage"')) problems.push(`${locale}/${route}: missing FAQ structured data`);
  }
}

for (const locale of locales) {
  for (const product of products) await validateHtml(locale, `products/${product.slug}`);
  for (const route of legalPaths) await validateHtml(locale, route);

  const directory = await readFile(path.join(out, locale, "products", "index.html"), "utf8");
  for (const product of products) {
    const href = `/${locale}/products/${product.slug}/`;
    if (!directory.includes(`href="${href}"`)) problems.push(`${locale}/products: missing internal link to ${product.slug}`);
  }
  const privacy = await readFile(path.join(out, locale, "privacy", "index.html"), "utf8");
  for (const route of legalPaths) {
    if (!privacy.includes(`href="/${locale}/${route}/"`)) problems.push(`${locale}/privacy: footer does not link to localized ${route}`);
  }
}

const sitemap = await readFile(path.join(out, "sitemap.xml"), "utf8");
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
if (urls.length !== 186) problems.push(`sitemap: expected 186 URLs, found ${urls.length}`);
for (const locale of allLocales) {
  for (const product of products) {
    const expected = localizedUrl(locale, `products/${product.slug}`);
    if (!urls.includes(expected)) problems.push(`sitemap: missing ${expected}`);
  }
  for (const route of legalPaths) {
    const expected = localizedUrl(locale, route);
    if (!urls.includes(expected)) problems.push(`sitemap: missing ${expected}`);
  }
}

if (problems.length) {
  console.error(`Localized route validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Localized route validation passed: ${locales.length * (products.length + legalPaths.length)} new pages, unique titles, canonical/hreflang, internal links and ${urls.length} sitemap URLs.`);
