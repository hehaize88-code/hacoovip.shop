import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { findRoutes } from "../app/finds-data.ts";

const root = resolve(dirname(new URL(import.meta.url).pathname), "..");
const workerUrl = pathToFileURL(resolve(root, "dist/server/index.js"));
workerUrl.searchParams.set("static-render", `${Date.now()}`);
const worker = (await import(workerUrl.href)).default;
const languages = ["", "de", "fr", "es", "it", "pl", "pt", "ro"];
const localized = ["", "categories", "qc-hub", "guides", "faq", "articles", "under-25", "qc-first", "new-this-week", "read-kakobuy-qc-photos", "kakobuy-spreadsheet-first-time-guide", "product-price-vs-parcel-cost"];
const englishOnly = ["kakobuy-warehouse-storage-guide", "kakobuy-returns-after-sales-checklist", "kakobuy-stitching-finish-qc-checklist", "kakobuy-alignment-symmetry-print-placement-qc", "kakobuy-size-measurement-qc-photo-limits", "kakobuy-qc-color-lighting-errors", "kakobuy-material-texture-qc-evidence", "kakobuy-shoe-qc-checklist", "kakobuy-qc-finder-vs-warehouse-photos", "kakobuy-extra-qc-photos", "kakobuy-hoodie-qc-checklist", "kakobuy-bag-qc-checklist", "kakobuy-jacket-qc-checklist", "finds", ...findRoutes];
const allRoutes = [
  ...languages.flatMap((language) => localized.map((slug) => [language, slug].filter(Boolean).join("/"))),
  ...englishOnly,
];
const requestedRoutes = process.argv.slice(2);
const routes = requestedRoutes.length ? requestedRoutes : allRoutes;

for (const route of routes) {
  const pathname = route ? `/${route}` : "/";
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (response.status !== 200) throw new Error(`${pathname} rendered ${response.status}`);
  const destination = route ? resolve(root, route, "index.html") : resolve(root, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  // This GitHub/Cloudflare export uses native links, forms and details elements.
  // No client React island needs hydration; remove serialized preview/runtime data.
  let html = await response.text();
  html = html.replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, (tag, attributes) =>
    /type="application\/ld\+json"|src="\/analytics-v2\.js"/i.test(attributes) ? tag : "");
  html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "");
  const language = languages.includes(route.split("/")[0]) && route ? route.split("/")[0] : "en";
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${language}"`);
  await writeFile(destination, html);
}

console.log(`Rendered ${routes.length} static pages.`);
