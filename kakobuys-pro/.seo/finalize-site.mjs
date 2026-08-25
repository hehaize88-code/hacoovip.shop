import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parseHTML } = require("linkedom");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const site = "https://kakobuys.pro";
const localeOrder = ["en", "pl", "de", "fr", "es", "it"];
const localeDirectories = new Set(localeOrder.filter((locale) => locale !== "en"));
const languageTags = {
  en: "en",
  pl: "pl-PL",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  it: "it-IT"
};
const languageLabels = {
  en: ["🌐", "English", "EN"],
  pl: ["🇵🇱", "Polski", "PL"],
  de: ["🇩🇪", "Deutsch", "DE"],
  fr: ["🇫🇷", "Français", "FR"],
  es: ["🇪🇸", "Español", "ES"],
  it: ["🇮🇹", "Italiano", "IT"]
};

function collectIndexFiles(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collectIndexFiles(full, output);
    if (entry.isFile() && entry.name === "index.html") output.push(full);
  }
  return output;
}

function cleanRoute(route) {
  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

function fileRoute(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const route = relative === "index.html" ? "/" : `/${relative.replace(/\/index\.html$/, "")}/`;
  const first = route.split("/").filter(Boolean)[0];
  if (localeDirectories.has(first)) {
    const rest = route.split("/").filter(Boolean).slice(1).join("/");
    return {
      locale: first,
      route,
      base: rest ? `/${rest}/` : "/"
    };
  }
  return { locale: "en", route, base: route };
}

function routeFile(route) {
  const clean = cleanRoute(route);
  return clean === "/" ? path.join(root, "index.html") : path.join(root, clean.slice(1), "index.html");
}

function routeExists(route) {
  return fs.existsSync(routeFile(route));
}

function localizedRoute(base, locale) {
  if (locale === "en") return cleanRoute(base);
  const clean = cleanRoute(base);
  return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

function setCanonicalAndLanguages(document, page, equivalents) {
  document.documentElement.setAttribute("lang", languageTags[page.locale]);
  document.querySelectorAll('meta[http-equiv="content-language"]').forEach((node) => node.remove());
  const languageMeta = document.createElement("meta");
  languageMeta.setAttribute("http-equiv", "content-language");
  languageMeta.setAttribute("content", languageTags[page.locale]);
  document.head.append(languageMeta);

  const canonicalUrl = `${site}${page.route}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.append(canonical);
  }
  canonical.setAttribute("href", canonicalUrl);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  for (const locale of localeOrder) {
    const route = equivalents.get(locale);
    if (!route) continue;
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", locale);
    link.setAttribute("href", `${site}${route}`);
    document.head.append(link);
  }
  const fallback = document.createElement("link");
  fallback.setAttribute("rel", "alternate");
  fallback.setAttribute("hreflang", "x-default");
  fallback.setAttribute("href", `${site}${equivalents.get("en") || page.route}`);
  document.head.append(fallback);

  for (const structured of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(structured.textContent);
      const records = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
      for (const record of records) {
        if (!record || typeof record !== "object") continue;
        if (["Article", "Product", "WebPage", "CollectionPage"].includes(record["@type"])) {
          record.url = canonicalUrl;
          if (record.mainEntityOfPage) record.mainEntityOfPage = canonicalUrl;
          record.inLanguage = languageTags[page.locale];
        }
      }
      structured.textContent = JSON.stringify(data);
    } catch {
      // Keep a future non-JSON structured-data block unchanged.
    }
  }
}

function updateLanguageMenu(document, page, equivalents) {
  const menu = document.querySelector(".language-menu");
  if (!menu) return;
  const articleFallback = page.base.startsWith("/articles/") ? "/pl/articles/" : "/pl/";
  const links = localeOrder.map((locale) => {
    const [flag, label, short] = languageLabels[locale];
    const route = equivalents.get(locale) || (locale === "pl" ? articleFallback : localizedRoute("/", locale));
    const active = locale === page.locale;
    return `<a${active ? ' class="is-active"' : ""} href="${route}" lang="${locale}" hreflang="${locale}" role="menuitem"${active ? ' aria-current="page"' : ""}><span aria-hidden="true">${flag}</span><span>${label}</span><small>${short}</small></a>`;
  }).join("");
  menu.outerHTML = `<details class="language-menu"><summary aria-label="Choose language"><span aria-hidden="true">◎</span>${languageLabels[page.locale][2]}<span class="language-caret" aria-hidden="true">⌄</span></summary><div class="language-popover" role="menu" aria-label="Choose language">${links}</div></details>`;
}

function normalizeInternalLinks(document) {
  for (const anchor of document.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    if (!href?.startsWith("/") || href.startsWith("//")) continue;
    const url = new URL(href, site);
    if (path.extname(url.pathname) || url.pathname.startsWith("/assets/")) continue;
    const route = cleanRoute(url.pathname);
    if (!routeExists(route)) continue;
    anchor.setAttribute("href", `${route}${url.search}${url.hash}`);
  }
}

function localePrefix(locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function addTopicLinks(document, page) {
  const articleMatch = page.base.match(/^\/articles\/([^/]+)\/$/);
  if (articleMatch) {
    const prose = document.querySelector(".article-layout .prose, article.prose");
    if (prose && !prose.querySelector(".kb-topic-links, .kb-related-topics")) {
      const prefix = localePrefix(page.locale);
      const siblingFiles = collectIndexFiles(path.join(root, ...(page.locale === "en" ? [] : [page.locale]), "articles"))
        .map((file) => fileRoute(file))
        .filter((item) => /^\/(?:[a-z]{2}\/)?articles\/[^/]+\/$/.test(item.route));
      const currentIndex = siblingFiles.findIndex((item) => item.base === page.base);
      const related = siblingFiles
        .filter((item) => item.base !== page.base)
        .slice(Math.max(0, currentIndex), Math.max(0, currentIndex) + 2);
      const category = articleMatch[1].includes("shoes")
        ? "shoes"
        : articleMatch[1].includes("hoodie")
          ? "hoodies"
          : "";
      const categoryRoute = category ? `${prefix}/catalog/${category}/` : `${prefix}/catalog/`;
      prose.insertAdjacentHTML("beforeend", `<section class="kb-topic-links"><h2>${page.locale === "pl" ? "Następny krok" : "Continue the topic"}</h2><p><a href="${categoryRoute}">${page.locale === "pl" ? "Powiązane produkty" : "Related products"}</a> · <a href="${prefix}/faq/">FAQ</a> · <a href="${prefix}/guides/">${page.locale === "pl" ? "Metoda QC" : "QC method"}</a>${related.map((item) => ` · <a href="${item.route}">${item.base.split("/").filter(Boolean).at(-1).replaceAll("-", " ")}</a>`).join("")}</p><a class="button button-dark" href="https://cnfanshp.com/search.html?keywords=${encodeURIComponent(document.querySelector("h1")?.textContent || "Kakobuy")}&channelid=2" target="_blank" rel="noopener noreferrer">${page.locale === "pl" ? "Sprawdź aktualne wyniki" : "Check current product results"} ↗</a></section>`);
    }
  }

  const categoryMatch = page.base.match(/^\/catalog\/([^/]+)\/$/);
  if (categoryMatch) {
    const prose = document.querySelector(".guide-layout .prose");
    if (prose && !prose.querySelector(".kb-topic-links, .kb-related-topics")) {
      const prefix = localePrefix(page.locale);
      const label = document.querySelector(".page-hero h1")?.textContent || categoryMatch[1];
      prose.insertAdjacentHTML("beforeend", `<section class="kb-topic-links"><h2>${page.locale === "pl" ? "Więcej informacji o tej kategorii" : "More on this category"}</h2><p><a href="${prefix}/guides/">${page.locale === "pl" ? "Pełna metoda QC" : "Complete QC method"}</a> · <a href="${prefix}/faq/">FAQ</a> · <a href="${prefix}/articles/how-to-read-kakobuy-qc-photos/">${page.locale === "pl" ? "Jak czytać zdjęcia QC" : "How to read QC photos"}</a></p><a class="button button-dark" href="https://cnfanshp.com/search.html?keywords=${encodeURIComponent(categoryMatch[1])}&channelid=2" target="_blank" rel="noopener noreferrer">${page.locale === "pl" ? "Szukaj aktualnych ofert" : "Search the current category"}: ${label} ↗</a></section>`);
    }
  }
}

function updateDocument(file, groups) {
  const page = fileRoute(file);
  const equivalents = groups.get(page.base);
  const { document } = parseHTML(fs.readFileSync(file, "utf8"));
  setCanonicalAndLanguages(document, page, equivalents);
  updateLanguageMenu(document, page, equivalents);
  normalizeInternalLinks(document);
  addTopicLinks(document, page);
  if (page.locale !== "en") {
    for (const script of [...document.querySelectorAll("script")]) {
      if (script.getAttribute("type") !== "application/ld+json") script.remove();
    }
  }
  fs.writeFileSync(file, `<!DOCTYPE html>${document.documentElement.outerHTML}\n`);
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
}

function writeSitemap(files, groups) {
  const sitemapFile = path.join(root, "sitemap.xml");
  const existingLastmod = new Map();
  if (fs.existsSync(sitemapFile)) {
    const currentXml = fs.readFileSync(sitemapFile, "utf8");
    for (const match of currentXml.matchAll(/<loc>https:\/\/kakobuys\.pro([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
      existingLastmod.set(cleanRoute(match[1] || "/"), match[2]);
    }
  }
  const today = new Date().toISOString().slice(0, 10);
  const rows = files
    .map((file) => fileRoute(file))
    .sort((left, right) => left.route.localeCompare(right.route))
    .map((page) => {
      const lastmod = existingLastmod.get(page.route) || today;
      const alternates = [...groups.get(page.base).entries()]
        .sort(([left], [right]) => localeOrder.indexOf(left) - localeOrder.indexOf(right))
        .map(([locale, route]) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${site}${route}`)}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(`${site}${page.route}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${site}${groups.get(page.base).get("en") || page.route}`)}"/>\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows}\n</urlset>\n`;
  fs.writeFileSync(sitemapFile, xml);
}

const files = collectIndexFiles(root);
const groups = new Map();
for (const file of files) {
  const page = fileRoute(file);
  if (!groups.has(page.base)) groups.set(page.base, new Map());
  groups.get(page.base).set(page.locale, page.route);
}
for (const file of files) updateDocument(file, groups);
writeSitemap(files, groups);

console.log(JSON.stringify({
  pages: files.length,
  languageCounts: Object.fromEntries(localeOrder.map((locale) => [
    locale,
    files.filter((file) => fileRoute(file).locale === locale).length
  ])),
  sitemap: path.join(root, "sitemap.xml")
}, null, 2));
