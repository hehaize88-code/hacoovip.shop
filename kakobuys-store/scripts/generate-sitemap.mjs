import { writeFile } from "node:fs/promises";
import { findRoutes } from "../app/finds-data.ts";

const origin = "https://kakobuys.store";
const languages = ["en", "de", "fr", "es", "it", "pl", "pt", "ro"];
const localized = [
  "",
  "categories",
  "qc-hub",
  "guides",
  "faq",
  "articles",
  "under-25",
  "qc-first",
  "new-this-week",
  "read-kakobuy-qc-photos",
  "kakobuy-spreadsheet-first-time-guide",
  "product-price-vs-parcel-cost",
];
const englishOnly = ["kakobuy-warehouse-storage-guide", "kakobuy-returns-after-sales-checklist", "kakobuy-stitching-finish-qc-checklist", "kakobuy-alignment-symmetry-print-placement-qc", "kakobuy-size-measurement-qc-photo-limits", "kakobuy-qc-color-lighting-errors", "finds", ...findRoutes];
const route = (language, slug) => `${origin}/${language === "en" ? "" : `${language}/`}${slug ? `${slug}/` : ""}`;
const entries = [];

for (const language of languages) {
  for (const slug of localized) {
    const alternates = languages.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${route(alternate, slug)}" />`).join("\n");
    entries.push(`  <url>\n    <loc>${route(language, slug)}</loc>\n    <lastmod>2026-08-26</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${route("en", slug)}" />\n  </url>`);
  }
}

for (const slug of englishOnly) {
  const lastmod = slug === "kakobuy-qc-color-lighting-errors" ? "2026-08-29" : slug === "kakobuy-size-measurement-qc-photo-limits" ? "2026-08-27" : slug === "kakobuy-alignment-symmetry-print-placement-qc" ? "2026-08-13" : slug === "kakobuy-stitching-finish-qc-checklist" ? "2026-08-11" : slug === "kakobuy-returns-after-sales-checklist" ? "2026-08-09" : "2026-08-03";
  entries.push(`  <url>\n    <loc>${route("en", slug)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <xhtml:link rel="alternate" hreflang="en" href="${route("en", slug)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${route("en", slug)}" />\n  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
const text = [...languages.flatMap((language) => localized.map((slug) => route(language, slug))), ...englishOnly.map((slug) => route("en", slug))].join("\n") + "\n";

await Promise.all([
  writeFile(new URL("../sitemap.xml", import.meta.url), xml),
  writeFile(new URL("../public/sitemap.xml", import.meta.url), xml),
  writeFile(new URL("../sitemap.txt", import.meta.url), text),
]);

console.log(`Generated ${entries.length} sitemap URLs.`);
