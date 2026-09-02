import assert from "node:assert/strict";
import test from "node:test";

const indexableRobotsMeta =
  /<meta(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*index[^"']*follow[^"']*["'])[^>]*>/i;

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const workerPromise = import(workerUrl.href).then((module) => module.default);

async function render(pathname) {
  const worker = await workerPromise;
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  return { response, html: await response.text() };
}

test("renders production indexing metadata", async () => {
  const { response, html } = await render("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(html, indexableRobotsMeta);
  assert.doesNotMatch(html, /noindex|nofollow|codex-preview|review-build/i);
});

test("publishes a complete sitemap and robots declaration", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.response.status, 200);
  assert.match(sitemapResponse.html, /<urlset\b/);
  assert.equal((sitemapResponse.html.match(/<url>/g) ?? []).length, 70);
  assert.match(sitemapResponse.html, /https:\/\/sheet-hipobuy\.net\/articles\/hipobuy-review-2026\//);
  assert.match(sitemapResponse.html, /https:\/\/sheet-hipobuy\.net\/pl\/articles\/hipobuy-review-2026\//);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.response.status, 200);
  assert.match(robotsResponse.html, /Allow: \/\s/);
  assert.match(robotsResponse.html, /Sitemap: https:\/\/sheet-hipobuy\.net\/sitemap\.xml/);
});

test("publishes focused Italian snippets, shipping depth and click tracking", async () => {
  const home = await render("/it");
  assert.equal(home.response.status, 200);
  assert.match(home.html, /<title>Lista Hipobuy 2026 \| Prodotti e link verificati<\/title>/);
  assert.match(home.html, /Consulta la lista Hipobuy 2026 con prodotti, prezzi indicativi e link verificati/);
  assert.match(home.html, /data-ga-event="search_submit"/);
  assert.match(home.html, /data-ga-event="product_open"/);
  assert.match(home.html, /data-ga-event="category_open"/);
  assert.match(home.html, /data-ga-event="language_change"/);

  const shipping = await render("/it/shipping");
  assert.equal(shipping.response.status, 200);
  assert.match(shipping.html, /<title>Costi spedizione Hipobuy 2026 \| Peso, volume e dogana<\/title>/);
  assert.match(shipping.html, /Come confrontare un preventivo Hipobuy senza fermarsi al prezzo iniziale/);
  assert.match(shipping.html, /hipobuy-actual-vs-volumetric-weight/);
  assert.match(shipping.html, /hipobuy-warehouse-qc-photos/);

  const qcArticle = await render("/it/articles/hipobuy-warehouse-qc-photos");
  assert.match(qcArticle.html, /<title>Foto QC Hipobuy: cosa controllare prima dell.approvazione<\/title>/);

  for (const html of [home.html, shipping.html, qcArticle.html]) {
    assert.doesNotMatch(html, /SEO Articles|Articoli SEO|contenuti SEO|Biblioteca SEO/i);
  }
});

test("keeps every localized article complete and structurally aligned", async () => {
  const languages = ["en", "de", "es", "it", "pl"];
  const slugs = [
    "how-to-buy-with-hipobuy",
    "hipobuy-shipping-cost-guide",
    "hipobuy-warehouse-qc-photos",
    "hipobuy-actual-vs-volumetric-weight",
    "hipobuy-90-day-warehouse-storage",
    "hipobuy-warehouse-return-checklist",
    "hipobuy-review-2026",
  ];
  const structuralClasses = [
    "article-section",
    "article-key-points",
    "article-checklist",
    "article-faq",
    "article-visual",
  ];

  for (const slug of slugs) {
    let englishStructure;
    for (const language of languages) {
      const prefix = language === "en" ? "" : `/${language}`;
      const { response, html } = await render(`${prefix}/articles/${slug}`);
      assert.equal(response.status, 200, `${language}/${slug} should render`);

      const wordCount = Number(html.match(/"wordCount":(\d+)/)?.[1]);
      assert.ok(wordCount >= 1200 && wordCount <= 1800, `${language}/${slug} has ${wordCount} words`);
      assert.match(html, new RegExp(`<main[^>]+lang="${language}"`), `${language}/${slug} has the correct lang attribute`);

      const structure = structuralClasses.map((className) =>
        (html.match(new RegExp(`class="[^"]*\\b${className}\\b[^"]*"`, "g")) ?? []).length,
      );
      englishStructure ??= structure;
      assert.deepEqual(structure, englishStructure, `${language}/${slug} preserves the English article modules`);

      for (const targetLanguage of languages) {
        const targetPrefix = targetLanguage === "en" ? "" : `/${targetLanguage}`;
        assert.match(
          html,
          new RegExp(`href="${targetPrefix}/articles/${slug}/"`),
          `${language}/${slug} links to the same article in ${targetLanguage}`,
        );
      }
    }
  }
});
