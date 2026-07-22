import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const languages = ["en", "pl", "es", "de", "ro"];
const sitemap = readFileSync(path.join(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const failures = [];

function expectedLanguage(pathname) {
  return pathname.match(/^\/(pl|es|de|ro)(?=\/|$)/)?.[1] || "en";
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
  bidirectionalAlternateLinks: sitemapAlternateCount,
  status: "passed",
}, null, 2));
