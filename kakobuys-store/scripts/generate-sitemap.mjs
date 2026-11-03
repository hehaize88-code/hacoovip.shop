import { writeFile } from "node:fs/promises";
import { localeCodes, localizedRoutes, articleRoutes, release, updatedInRelease } from "../app/editorial.ts";

const origin = "https://kakobuys.store";
const url = (lang, slug) => origin + "/" + [lang === "en" ? "" : lang, slug].filter(Boolean).map(part => part + "/").join("");
const page = (lang, slug, localized) => {
  const href = url(lang, slug);
  const alternates = localized ? localeCodes : ["en"];
  const reviewed = ["", "qc-hub", "guides", "articles", "faq"].includes(slug) || (articleRoutes.includes(slug) && updatedInRelease(lang, slug));
  const modified = reviewed ? "\n    <lastmod>" + release + "</lastmod>" : "";
  return {href, xml: [
    "  <url>", "    <loc>" + href + "</loc>" + modified,
    ...[...alternates, "x-default"].map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${url(code === "x-default" ? "en" : code,slug)}" />`),
    "  </url>",
  ].join("\n")};
};
const entries = localeCodes.flatMap(lang => localizedRoutes.map(slug => page(lang, slug, true)));
entries.push(page("en","finds",false));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.map(entry=>entry.xml).join("\n")}\n</urlset>\n`;
for (const path of ["../sitemap.xml","../public/sitemap.xml"]) await writeFile(new URL(path,import.meta.url),xml);
await writeFile(new URL("../sitemap.txt",import.meta.url), entries.map(entry=>entry.href).join("\n")+"\n");
console.log(`Generated ${entries.length} URLs.`);
