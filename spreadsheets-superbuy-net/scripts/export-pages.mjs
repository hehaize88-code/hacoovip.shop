import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDirectory = join(projectRoot, "dist", "client");
const workerPath = join(projectRoot, "dist", "server", "index.js");
const siteOrigin = "https://spreadsheets-superbuy.net";

const languages = ["en", "fr", "de", "id", "zh-cn"];
const pageRoutes = ["", "finds", "categories", "qc-guide", "shipping", "articles", "faq", "about", "editorial-policy", "privacy", "terms"];
const articleSlugs = [
  "superbuy-spreadsheet-fields-product-record",
  "how-to-use-a-superbuy-spreadsheet",
  "superbuy-qc-photo-checklist",
  "superbuy-shipping-cost-and-consolidation",
];

const localizedPaths = languages.flatMap((language) => {
  const prefix = language === "en" ? "" : `/${language}`;
  return [
    ...pageRoutes.map((route) => `${prefix}/${route}`.replace(/\/$/, "") || "/"),
    ...articleSlugs.map((slug) => `${prefix}/articles/${slug}`),
  ];
});

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const context = {
  waitUntil() {},
  passThroughOnException() {},
};

for (const pathname of localizedPaths) {
  const response = await worker.fetch(
    new Request(new URL(pathname, siteOrigin), {
      headers: { accept: "text/html" },
    }),
    env,
    context,
  );

  if (response.status !== 200) {
    throw new Error(`Static export failed for ${pathname}: HTTP ${response.status}`);
  }

  const outputPath = pathname === "/"
    ? join(clientDirectory, "index.html")
    : join(clientDirectory, pathname.slice(1), "index.html");
  const pathLanguage = pathname.match(/^\/(fr|de|id|zh-cn)(?:\/|$)/)?.[1] ?? "en";
  const htmlLanguage = pathLanguage === "zh-cn" ? "zh-CN" : pathLanguage;
  const html = (await response.text()).replace(/<html lang="en">/i, `<html lang="${htmlLanguage}">`);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

const notFoundResponse = await worker.fetch(
  new Request(new URL("/__static-export-404__", siteOrigin), { headers: { accept: "text/html" } }),
  env,
  context,
);
if (notFoundResponse.status !== 404) throw new Error(`Expected real 404 response, received HTTP ${notFoundResponse.status}`);
await writeFile(join(clientDirectory, "404.html"), await notFoundResponse.text());

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...localizedPaths.flatMap((pathname) => [
    "  <url>",
    `    <loc>${siteOrigin}${pathname === "/" ? "/" : `${pathname}/`}</loc>`,
    `    <lastmod>${pathname.includes("superbuy-spreadsheet-fields-product-record") ? "2026-08-14" : "2026-08-13"}</lastmod>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");

await writeFile(join(clientDirectory, "sitemap.xml"), sitemap);
await writeFile(
  join(clientDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
);
await writeFile(
  join(clientDirectory, "_headers"),
  `/*\n  Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/products/*\n  Cache-Control: public, max-age=604800\n`,
);

console.log(`Exported ${localizedPaths.length} localized HTML pages plus 404.html, sitemap.xml, robots.txt and _headers to dist/client.`);
