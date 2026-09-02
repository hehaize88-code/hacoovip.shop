import assert from "node:assert/strict";
import test from "node:test";

test("renders indexable canonical metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
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

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<meta name="robots" content="index, follow"\s*\/?>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/spreadsheets-superbuy\.net\/"\s*\/?>/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("unknown routes return a real 404 instead of the homepage", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("not-found-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/nonexistent-audit-839271", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This page is not in the spreadsheet/i);
  assert.doesNotMatch(html, /The Superbuy spreadsheet/i);
});

test("shipping pages use query-aligned metadata and measurable conversion links", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("shipping-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };

  const shippingResponse = await worker.fetch(
    new Request("http://localhost/shipping", { headers: { accept: "text/html" } }),
    env,
    context,
  );
  assert.equal(shippingResponse.status, 200);
  const shippingHtml = await shippingResponse.text();
  assert.match(shippingHtml, /<title>Superbuy International Shipping 2026 \| Cost &amp; Routes<\/title>/i);
  assert.match(shippingHtml, /<h1>Superbuy International Shipping Guide 2026<\/h1>/i);

  const articleResponse = await worker.fetch(
    new Request("http://localhost/articles/superbuy-shipping-cost-and-consolidation", { headers: { accept: "text/html" } }),
    env,
    context,
  );
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /Superbuy International Shipping 2026: Cost, Weight &amp; Routes/i);
  assert.match(articleHtml, /"dateModified":"2026-09-02"/i);
  assert.match(articleHtml, /data-ga-event="article_to_finds_click"/i);
});
