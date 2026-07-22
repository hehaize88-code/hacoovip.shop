import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articles as englishArticles } from "../lib/articles.js";
import { categories, products } from "../lib/data.js";
import { getLocalizedArticles } from "../lib/localizedArticles.js";
import { imageManifest } from "../lib/imageManifest.js";
import { getRouteLastModified } from "../lib/contentDates.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const languages = ["en", "pl", "es", "de", "ro"];
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapEntries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)]
  .map((match) => ({ url: match[1], lastModified: match[2] }));
const failures = [];
const articleSlugs = englishArticles.map(({ slug }) => slug);

function articleText(article) {
  const values = [];
  const visit = (value) => {
    if (typeof value === "string") values.push(value);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  visit({
    title: article.title,
    description: article.description,
    excerpt: article.excerpt,
    intro: article.intro,
    sections: article.sections,
    cta: article.cta,
  });
  return values.join(" ");
}

function words(value) {
  return value.toLocaleLowerCase().match(/\p{L}+(?:[-’']\p{L}+)*/gu) || [];
}

function trigrams(value) {
  const tokens = words(value);
  return new Set(tokens.slice(0, -2).map((word, index) => `${word} ${tokens[index + 1]} ${tokens[index + 2]}`));
}

function overlap(left, right) {
  const a = trigrams(left);
  const b = trigrams(right);
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const item of a) if (b.has(item)) shared += 1;
  return shared / Math.min(a.size, b.size);
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&mdash;|&#x2014;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function expectedLanguage(pathname) {
  return pathname.match(/^\/(pl|es|de|ro)(?=\/|$)/)?.[1] || "en";
}

function localizedPath(language, pathname) {
  if (language === "en") return pathname;
  return `/${language}${pathname === "/" ? "/" : pathname}`;
}

function localizedUrl(language, pathname) {
  if (language === "en" && pathname === "/") return "https://findqc.pro";
  const prefix = language === "en" ? "" : `/${language}`;
  return `https://findqc.pro${prefix}${pathname === "/" ? "/" : pathname}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function structuredData(html, pathname) {
  const schemas = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`Invalid JSON-LD on ${pathname}: ${error.message}`);
    }
  }
  return schemas;
}

function schemaOfType(schemas, type) {
  return schemas.find((schema) => schema["@type"] === type || schema["@graph"]?.some((item) => item["@type"] === type));
}

for (const language of languages.filter((candidate) => candidate !== "en")) {
  const localizedArticles = getLocalizedArticles(language);
  for (const englishArticle of englishArticles) {
    const localized = localizedArticles.find(({ slug }) => slug === englishArticle.slug);
    if (!localized) {
      failures.push(`Missing localized article data: ${language}/${englishArticle.slug}`);
      continue;
    }

    const translatedText = articleText(localized);
    const englishText = articleText(englishArticle);
    const wordCount = words(translatedText).length;
    if (localized.title === englishArticle.title) failures.push(`English article title leaked into ${language}/${englishArticle.slug}`);
    if (localized.description === englishArticle.description) failures.push(`English description leaked into ${language}/${englishArticle.slug}`);
    if (localized.sections.length !== englishArticle.sections.length) failures.push(`Section count changed on ${language}/${englishArticle.slug}`);
    if (wordCount < 650) failures.push(`Localized article too short (${wordCount} words): ${language}/${englishArticle.slug}`);
    if (overlap(translatedText, englishText) > 0.08) failures.push(`Localized article too similar to English: ${language}/${englishArticle.slug}`);

    const pathname = `/${language}/articles/${englishArticle.slug}`;
    const file = htmlPath(pathname);
    if (!existsSync(file)) {
      failures.push(`Missing localized article HTML: ${pathname}`);
      continue;
    }
    const rendered = visibleText(readFileSync(file, "utf8"));
    if (!rendered.includes(localized.title)) failures.push(`Localized H1 not rendered: ${pathname}`);
    if (rendered.includes(englishArticle.title)) failures.push(`English H1 rendered on localized article: ${pathname}`);
  }
}

function htmlPath(pathname) {
  const relative = pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!relative) return path.join(out, "index.html");
  if (pathname.endsWith("/")) return path.join(out, relative, "index.html");
  return path.join(out, `${relative}.html`);
}

for (const url of urls) {
  const { pathname } = new URL(url);
  const file = htmlPath(pathname);
  const language = expectedLanguage(pathname);
  if (!existsSync(file)) {
    failures.push(`Missing HTML: ${url}`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
  const imageTags = html.match(/<img\b[^>]*>/gi) || [];
  const eagerImages = imageTags.filter((tag) => /\bloading=["']eager["']/i.test(tag));
  const responsiveSources = html.match(/<source\b[^>]*\btype=["']image\/(?:avif|webp)["'][^>]*>/gi) || [];
  for (const image of imageTags) {
    if (!/\bwidth=["']\d+["']/i.test(image) || !/\bheight=["']\d+["']/i.test(image)) {
      failures.push(`Image missing intrinsic dimensions: ${url}`);
    }
  }
  if (eagerImages.length > 1) failures.push(`More than one eager image: ${url}`);
  if (eagerImages.some((tag) => !/\bfetchpriority=["']high["']/i.test(tag))) {
    failures.push(`Eager image is not high priority: ${url}`);
  }
  for (const source of responsiveSources) {
    if (!/\bsrcset=["'][^"']+\s\d+w/i.test(source) || !/\bsizes=["'][^"']+["']/i.test(source)) {
      failures.push(`Responsive image source is missing srcset or sizes: ${url}`);
    }
  }
  if (!html.includes(`<html lang="${language}"`)) failures.push(`Wrong lang attribute: ${url}`);
  const canonicalTags = head.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi) || [];
  if (canonicalTags.length !== 1) failures.push(`Expected one canonical tag, found ${canonicalTags.length}: ${url}`);
  if (!canonicalTags[0]?.includes(`href="${url}"`)) failures.push(`Wrong canonical: ${url}`);

  const ogUrlTags = head.match(/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/gi) || [];
  if (ogUrlTags.length !== 1) failures.push(`Expected one og:url tag, found ${ogUrlTags.length}: ${url}`);
  if (!ogUrlTags[0]?.includes(`content="${url}"`)) failures.push(`Wrong og:url: ${url}`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) failures.push(`Expected one H1: ${url}`);

  const basePath = pathname.replace(/^\/(pl|es|de|ro)(?=\/|$)/, "") || "/";
  for (const alternate of [...languages, "x-default"]) {
    const targetLanguage = alternate === "x-default" ? "en" : alternate;
    const expected = localizedUrl(targetLanguage, basePath);
    const pattern = new RegExp(`<link\\b(?=[^>]*\\brel=["']alternate["'])(?=[^>]*\\bhreflang=["']${escapeRegExp(alternate)}["'])(?=[^>]*\\bhref=["']${escapeRegExp(expected)}["'])[^>]*>`, "gi");
    const alternateTags = head.match(pattern) || [];
    if (alternateTags.length !== 1) failures.push(`Expected one ${alternate} alternate, found ${alternateTags.length}: ${url}`);
  }

  if (language !== "en") {
    const localPrefix = `/${language}`;
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1].split(/[?#]/)[0]);
    const pageLinks = hrefs.filter((href) => !path.extname(href) && !href.startsWith("/_next"));
    for (const href of pageLinks) {
      if (!href.startsWith(localPrefix)) failures.push(`Cross-language internal link on ${url}: ${href}`);
    }
  }
}

for (const language of languages) {
  const homePath = localizedPath(language, "/");
  const homeHtml = readFileSync(htmlPath(homePath), "utf8");
  if (!schemaOfType(structuredData(homeHtml, homePath), "Organization")) failures.push(`Missing Organization schema: ${homePath}`);

  const productsPath = localizedPath(language, "/products");
  const productsHtml = readFileSync(htmlPath(productsPath), "utf8");
  const productSchemas = structuredData(productsHtml, productsPath);
  const productList = schemaOfType(productSchemas, "ItemList");
  const productBreadcrumbs = schemaOfType(productSchemas, "BreadcrumbList");
  if (productList?.numberOfItems !== products.length || productList?.itemListElement?.length !== products.length) {
    failures.push(`Products ItemList must contain ${products.length} items: ${productsPath}`);
  }
  if (productBreadcrumbs?.itemListElement?.length !== 2) failures.push(`Products BreadcrumbList must contain 2 levels: ${productsPath}`);

  for (const category of categories) {
    const categoryPath = localizedPath(language, `/categories/${category.slug}`);
    const categoryHtml = readFileSync(htmlPath(categoryPath), "utf8");
    const categorySchemas = structuredData(categoryHtml, categoryPath);
    const categoryList = schemaOfType(categorySchemas, "ItemList");
    const categoryBreadcrumbs = schemaOfType(categorySchemas, "BreadcrumbList");
    const expectedProducts = products.filter((product) => product.category === category.slug).length;
    if (categoryList?.numberOfItems !== expectedProducts || categoryList?.itemListElement?.length !== expectedProducts) {
      failures.push(`Category ItemList must contain ${expectedProducts} items: ${categoryPath}`);
    }
    if (categoryBreadcrumbs?.itemListElement?.length !== 3) failures.push(`Category BreadcrumbList must contain 3 levels: ${categoryPath}`);
  }

  const faqPath = localizedPath(language, "/faq");
  const faqHtml = readFileSync(htmlPath(faqPath), "utf8");
  const faq = schemaOfType(structuredData(faqHtml, faqPath), "FAQPage");
  const faqVisibleText = visibleText(faqHtml);
  if (faq?.inLanguage !== language || faq?.mainEntity?.length !== 17) {
    failures.push(`FAQPage must contain 17 ${language} questions: ${faqPath}`);
  } else {
    for (const entity of faq.mainEntity) {
      if (!faqVisibleText.includes(entity.name) || !faqVisibleText.includes(entity.acceptedAnswer?.text)) {
        failures.push(`FAQPage markup is not visible on the page: ${faqPath} / ${entity.name}`);
      }
    }
  }
}

if (Object.keys(imageManifest).length !== 117) failures.push(`Expected 117 image manifest entries, found ${Object.keys(imageManifest).length}`);
for (const product of products) {
  if (!imageManifest[product.image]) failures.push(`Product image is missing responsive variants: ${product.image}`);
}
for (const [source, image] of Object.entries(imageManifest)) {
  if (!image.width || !image.height || image.webp.length === 0) failures.push(`Incomplete image metadata: ${source}`);
  for (const candidate of [...image.avif, ...image.webp]) {
    if (!existsSync(path.join(out, candidate.src.replace(/^\//, "")))) failures.push(`Missing generated image: ${candidate.src}`);
  }
}

const homeHtml = readFileSync(htmlPath("/"), "utf8");
const homeHead = homeHtml.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
const imagePreloads = homeHead.match(/<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']image["'])[^>]*>/gi) || [];
if (imagePreloads.length !== 1 || !imagePreloads[0].includes("/optimized/products/shoes-60-480.avif")) {
  failures.push("Homepage must preload only the responsive AVIF LCP image");
}
if ((homeHtml.match(/loading="eager"/g) || []).length !== 1) failures.push("Homepage must have exactly one eager image");
if ((homeHtml.match(/loading="lazy"/g) || []).length < 5) failures.push("Homepage below-fold images must be lazy-loaded");

const headers = readFileSync(path.join(out, "_headers"), "utf8");
if (!headers.includes("/_next/static/*") || !headers.includes("max-age=31536000, immutable")) {
  failures.push("Next.js static assets must use one-year immutable caching");
}

const sitemapAlternateCount = (sitemap.match(/<xhtml:link /g) || []).length;
if (urls.length !== 130) failures.push(`Expected 130 sitemap URLs, found ${urls.length}`);
if (new Set(urls).size !== urls.length) failures.push("Sitemap contains duplicate URLs");
if (sitemapAlternateCount !== 780) failures.push(`Expected 780 sitemap alternates, found ${sitemapAlternateCount}`);
if (sitemapEntries.length !== urls.length) failures.push(`Expected ${urls.length} sitemap lastmod values, found ${sitemapEntries.length}`);
for (const entry of sitemapEntries) {
  const { pathname } = new URL(entry.url);
  const language = expectedLanguage(pathname);
  const route = pathname.replace(/^\/(pl|es|de|ro)(?=\/|$)/, "") || "/";
  const expected = getRouteLastModified(route, language);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastModified)) failures.push(`Invalid sitemap lastmod: ${entry.url}`);
  if (entry.lastModified !== expected) failures.push(`Wrong sitemap lastmod (${entry.lastModified}, expected ${expected}): ${entry.url}`);
}
if (new Set(sitemapEntries.map(({ lastModified }) => lastModified)).size < 2) {
  failures.push("Sitemap lastmod values must reflect page content dates, not one deployment date");
}
if (!readFileSync(path.join(out, "robots.txt"), "utf8").includes("Sitemap: https://findqc.pro/sitemap.xml")) failures.push("robots.txt sitemap is incorrect");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  languages: languages.length,
  indexableUrls: urls.length,
  localizedArticlePages: articleSlugs.length * (languages.length - 1),
  bidirectionalAlternateLinks: sitemapAlternateCount,
  structuredDataLanguages: languages.length,
  productListItems: products.length,
  categoryLists: categories.length * languages.length,
  status: "passed",
}, null, 2));
