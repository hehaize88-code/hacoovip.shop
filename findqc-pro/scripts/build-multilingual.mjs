import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const buildOut = path.join(root, "out");
const staging = path.join(root, ".multilingual-out");
const languages = ["en", "pl", "es", "de", "ro"];
const localeMap = { en: "en_US", pl: "pl_PL", es: "es_ES", de: "de_DE", ro: "ro_RO" };
const removalOptions = {
  recursive: true,
  force: true,
  maxRetries: 10,
  retryDelay: 100,
};

function walk(directory, predicate, results = []) {
  for (const entry of readdirSync(directory)) {
    const absolute = path.join(directory, entry);
    if (statSync(absolute).isDirectory()) walk(absolute, predicate, results);
    else if (predicate(absolute)) results.push(absolute);
  }
  return results;
}

function routeFromHtml(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (normalized === "index.html") return "/";
  return `/${normalized.replace(/\.html$/, "")}`;
}

function localizedUrl(route, language) {
  const prefix = language === "en" ? "" : `/${language}`;
  return `https://findqc.pro${prefix}${route === "/" ? "/" : route}`;
}

function stripMarkup(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function enrichHtml(html, route, language) {
  const canonical = localizedUrl(route, language);
  const links = [
    `<link rel="canonical" href="${canonical}"/>`,
    ...languages.map((candidate) => `<link rel="alternate" hreflang="${candidate}" href="${localizedUrl(route, candidate)}"/>`),
    `<link rel="alternate" hreflang="x-default" href="${localizedUrl(route, "en")}"/>`,
  ].join("");

  let output = html
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${language}"`)
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>/gi, "")
    .replace("<head>", `<head>${links}`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}"/>`)
    .replace(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale" content="${localeMap[language]}"/>`);

  const h1 = output.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) {
    const pageTitle = stripMarkup(h1[1]);
    if (pageTitle) output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle} | FindQC Pro</title>`);
  }

  return output;
}

function copyHtmlBuild(language) {
  const destination = language === "en" ? staging : path.join(staging, language);
  mkdirSync(destination, { recursive: true });

  for (const source of walk(buildOut, (file) => file.endsWith(".html"))) {
    const relative = path.relative(buildOut, source);
    if (language !== "en" && ["404.html", "_not-found.html"].includes(relative)) continue;
    const target = path.join(destination, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, enrichHtml(readFileSync(source, "utf8"), routeFromHtml(relative), language));
  }

  const nextAssets = path.join(buildOut, "_next");
  if (existsSync(nextAssets)) cpSync(nextAssets, path.join(destination, "_next"), { recursive: true });

  const manifest = path.join(buildOut, "manifest.webmanifest");
  if (existsSync(manifest)) cpSync(manifest, path.join(destination, "manifest.webmanifest"));
}

function buildSitemap(routes) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = routes.flatMap((route) => languages.map((language) => {
    const alternates = [
      ...languages.map((candidate) => `    <xhtml:link rel="alternate" hreflang="${candidate}" href="${localizedUrl(route, candidate)}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(route, "en")}" />`,
    ].join("\n");
    return `  <url>\n    <loc>${localizedUrl(route, language)}</loc>\n${alternates}\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  }));

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

rmSync(staging, removalOptions);
let indexableRoutes = [];

for (const language of languages) {
  rmSync(buildOut, removalOptions);
  rmSync(path.join(root, ".next"), removalOptions);

  const result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: root,
    env: { ...process.env, NEXT_PUBLIC_SITE_LANGUAGE: language },
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);

  if (language === "en") {
    const sourceSitemap = readFileSync(path.join(buildOut, "sitemap.xml"), "utf8");
    indexableRoutes = [...sourceSitemap.matchAll(/<loc>https:\/\/findqc\.pro([^<]*)<\/loc>/g)]
      .map((match) => match[1] || "/");

    for (const source of walk(buildOut, (file) => {
      const relative = path.relative(buildOut, file).split(path.sep).join("/");
      return !relative.startsWith("_next/")
        && !relative.endsWith(".html")
        && !relative.endsWith(".txt")
        && !["sitemap.xml", "robots.txt"].includes(relative);
    })) {
      const target = path.join(staging, path.relative(buildOut, source));
      mkdirSync(path.dirname(target), { recursive: true });
      cpSync(source, target);
    }
  }

  copyHtmlBuild(language);
}

writeFileSync(path.join(staging, "sitemap.xml"), buildSitemap(indexableRoutes));
writeFileSync(path.join(staging, "robots.txt"), "User-Agent: *\nAllow: /\nSitemap: https://findqc.pro/sitemap.xml\n");

const worker = path.join(root, "_worker.js");
if (existsSync(worker)) cpSync(worker, path.join(staging, "_worker.js"));

rmSync(buildOut, removalOptions);
renameSync(staging, buildOut);
console.log(`Multilingual export complete: ${indexableRoutes.length * languages.length} indexable URLs across ${languages.length} languages.`);
