import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articles as englishArticles } from "../lib/articles.js";
import { getLocalizedArticles } from "../lib/localizedArticles.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const languages = ["en", "pl", "es", "de", "ro"];
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
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
  if (!html.includes(`<html lang="${language}"`)) failures.push(`Wrong lang attribute: ${url}`);
  if (!html.includes(`<link rel="canonical" href="${url}"`)) failures.push(`Wrong canonical: ${url}`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) failures.push(`Expected one H1: ${url}`);

  const basePath = pathname.replace(/^\/(pl|es|de|ro)(?=\/|$)/, "") || "/";
  for (const alternate of [...languages, "x-default"]) {
    const targetLanguage = alternate === "x-default" ? "en" : alternate;
    const prefix = targetLanguage === "en" ? "" : `/${targetLanguage}`;
    const expected = `https://findqc.pro${prefix}${basePath === "/" ? "/" : basePath}`;
    const pattern = new RegExp(`<link rel="alternate" hreflang="${alternate}" href="${expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
    if (!pattern.test(html)) failures.push(`Missing ${alternate} alternate: ${url}`);
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

const sitemapAlternateCount = (sitemap.match(/<xhtml:link /g) || []).length;
if (urls.length !== 130) failures.push(`Expected 130 sitemap URLs, found ${urls.length}`);
if (new Set(urls).size !== urls.length) failures.push("Sitemap contains duplicate URLs");
if (sitemapAlternateCount !== 780) failures.push(`Expected 780 sitemap alternates, found ${sitemapAlternateCount}`);
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
  status: "passed",
}, null, 2));
