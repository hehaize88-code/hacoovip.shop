#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "_i18n/manifest.json"), "utf8"),
);
const workerSource = await fs.readFile(path.join(root, "_worker.js"), "utf8");
const worker = (
  await import(
    `data:text/javascript;base64,${Buffer.from(workerSource).toString("base64")}`
  )
).default;

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

const env = {
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith("/")) pathname += "index.html";
      const filePath = path.join(root, pathname.replace(/^\//, ""));
      try {
        const body = await fs.readFile(filePath);
        return new Response(body, {
          headers: { "Content-Type": contentType(filePath) },
        });
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};

const cacheEntries = new Map();
globalThis.caches = {
  default: {
    async match(request) {
      const response = cacheEntries.get(new Request(request).url);
      return response ? response.clone() : undefined;
    },
    async put(request, response) {
      cacheEntries.set(new Request(request).url, response.clone());
    },
  },
};
const pendingTasks = [];
const ctx = {
  waitUntil(promise) {
    pendingTasks.push(promise);
  },
};

function structureSignature(html) {
  return (html.match(/<\/?[a-zA-Z][^>]*>/g) || [])
    .filter((tag) => !/^<\/?style\b/i.test(tag))
    .map((tag) => {
      const name = tag.match(/^<\/?([a-zA-Z0-9:-]+)/)?.[1] || "";
      return `${tag.startsWith("</") ? "/" : ""}${name.toLowerCase()}`;
    })
    .join(",");
}

function pageTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
}

const failures = [];
let checkedPages = 0;

for (const [canonicalPath, localeRecords] of Object.entries(
  manifest.routes,
)) {
  const canonicalResponse = await worker.fetch(
    new Request(`https://oopbuys.pro${canonicalPath}`),
    env,
    ctx,
  );
  const canonicalHtml = await canonicalResponse.text();
  const canonicalStructure = structureSignature(canonicalHtml);
  if (/CNFans/.test(canonicalHtml)) {
    failures.push({ path: canonicalPath, failures: ["visible-main-brand"] });
  }
  if (canonicalHtml.includes('"potentialAction"')) {
    failures.push({ path: canonicalPath, failures: ["external-search-schema"] });
  }

  for (const locale of manifest.locales) {
    const localizedPath =
      canonicalPath === "/"
        ? `/${locale}/`
        : `/${locale}${canonicalPath}`;
    const localizedResponse = await worker.fetch(
      new Request(`https://oopbuys.pro${localizedPath}`),
      env,
      ctx,
    );
    const localizedHtml = await localizedResponse.text();
    const overlayPath = path.join(root, localeRecords[locale].file);
    const overlay = JSON.parse(await fs.readFile(overlayPath, "utf8"));
    const pageFailures = [];

    if (localizedResponse.status !== 200) pageFailures.push("status");
    if (!localizedHtml.includes(`<html lang="${locale}">`)) {
      pageFailures.push("html-lang");
    }
    if (
      !localizedHtml.includes(
        `rel="canonical" href="https://oopbuys.pro${localizedPath}"`,
      )
    ) {
      pageFailures.push("canonical");
    }
    if (structureSignature(localizedHtml) !== canonicalStructure) {
      pageFailures.push("component-structure");
    }
    if (pageTitle(localizedHtml) === pageTitle(canonicalHtml)) {
      pageFailures.push("localized-title");
    }
    if (/CNFans/.test(localizedHtml)) {
      pageFailures.push("visible-main-brand");
    }
    if (localizedHtml.includes('"potentialAction"')) {
      pageFailures.push("external-search-schema");
    }
    if (!localizedHtml.includes('id="oopbuy-wordmark-logo"')) {
      pageFailures.push("wordmark");
    }
    if (
      overlay.locale !== locale ||
      overlay.route !== canonicalPath ||
      typeof overlay.text !== "object" ||
      typeof overlay.attributes !== "object" ||
      !Array.isArray(overlay.structuredData)
    ) {
      pageFailures.push("overlay-contract");
    }
    if (
      [...Object.values(overlay.text), ...Object.values(overlay.attributes)]
        .some((value) => /<(?:section|article|div|main|header|footer)\b/i.test(value))
    ) {
      pageFailures.push("markup-inside-language-data");
    }

    if (pageFailures.length) {
      failures.push({ path: localizedPath, failures: pageFailures });
    }
    checkedPages += 1;
  }
}

const imageResponse = await worker.fetch(
  new Request(
    "https://oopbuys.pro/_vinext/image?url=%2Fimages%2Fshoe.webp&w=640&q=75",
  ),
  env,
  ctx,
);
if (imageResponse.status !== 200) {
  failures.push({ path: "/_vinext/image", failures: ["image-route"] });
}

const redirectResponse = await worker.fetch(
  new Request("https://www.oopbuys.pro/de/guides/?source=validation"),
  env,
  ctx,
);
if (
  redirectResponse.status !== 301 ||
  redirectResponse.headers.get("location") !==
    "https://oopbuys.pro/de/guides/?source=validation"
) {
  failures.push({ path: "www", failures: ["redirect"] });
}

await Promise.all(pendingTasks);
const cacheHitResponse = await worker.fetch(
  new Request("https://oopbuys.pro/"),
  env,
  ctx,
);
if (cacheHitResponse.headers.get("X-OOPBUYS-Cache") !== "HIT") {
  failures.push({ path: "/", failures: ["html-cache"] });
}

if (failures.length) {
  console.error(JSON.stringify({ checkedPages, failures }, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify({
    canonicalPages: Object.keys(manifest.routes).length,
    localizedPages: checkedPages,
    locales: manifest.locales,
    componentStructure: "identical-to-English",
    imageRoute: "ok",
    wwwRedirect: "ok",
    htmlCache: "ok",
  }),
);
