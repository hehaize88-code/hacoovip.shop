import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function renderPages(pathname) {
  const workerUrl = new URL("../dist/client/_worker.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`),
    {
      ASSETS: {
        fetch: async (request) =>
          new Response(`static:${new URL(request.url).pathname}`, {
            headers: { "content-type": "text/plain" },
          }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders development preview metadata", async () => {
  const response = await render("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders an indexable, substantive category directory", async () => {
  const response = await render("/categories/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<h1>Superbuy product categories &amp; finds\.<\/h1>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/superbuys\.store\/categories\/"\/>/i);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.equal((html.match(/<article/g) ?? []).length, 10);
  assert.match(html, /https:\/\/www\.cnbuycha\.com\/shoes\//i);
  assert.doesNotMatch(html, /cnfanshp\.com/i);
  assert.ok(html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length > 500);
});

test("serves sitemap and robots as exact static assets", async () => {
  const sitemap = await renderPages("/sitemap.xml");
  const robots = await renderPages("/robots.txt");

  assert.equal(sitemap.status, 200);
  assert.equal(await sitemap.text(), "static:/sitemap.xml");
  assert.equal(robots.status, 200);
  assert.equal(await robots.text(), "static:/robots.txt");
});
