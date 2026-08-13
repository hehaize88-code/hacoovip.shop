import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDirectory = join(projectRoot, "dist", "client");
const workerPath = join(projectRoot, "dist", "server", "index.js");
const siteOrigin = "https://spreadsheets-superbuy.net";

const languages = ["en", "fr", "de", "id", "zh-cn"];
const pageRoutes = ["", "finds", "categories", "qc-guide", "shipping", "articles", "faq"];
const articleSlugs = [
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
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await response.text());
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...localizedPaths.flatMap((pathname) => [
    "  <url>",
    `    <loc>${siteOrigin}${pathname === "/" ? "/" : `${pathname}/`}</loc>`,
    "    <lastmod>2026-08-13</lastmod>",
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

console.log(`Exported ${localizedPaths.length} localized HTML pages plus sitemap.xml and robots.txt to dist/client.`);
