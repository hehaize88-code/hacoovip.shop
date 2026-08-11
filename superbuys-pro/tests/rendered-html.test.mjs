import assert from "node:assert/strict";
import test from "node:test";

test("renders the production homepage metadata and primary routes", async () => {
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
  assert.match(html, /<title>Superbuy Spreadsheet 2026:/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/superbuys\.pro\/"/i);
  assert.match(html, /href="\/articles\/"/i);
  assert.match(html, /href="\/qc-check\/"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, />SUPERBUY SPREADSHEET</i);
  assert.doesNotMatch(html, /https:\/\/www\.cnfanshp\.com\/uploads\//i);
});

test("uses final slash URLs, localized html lang and product schema", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-seo`);
  const { default: worker } = await import(workerUrl.href);
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};

  const redirect=await worker.fetch(new Request("https://superbuys.pro/finds"),env,ctx);
  assert.equal(redirect.status,308);
  assert.equal(redirect.headers.get("location"),"https://superbuys.pro/finds/");

  const localized=await worker.fetch(new Request("https://superbuys.pro/de/finds/",{headers:{accept:"text/html"}}),env,ctx);
  assert.equal(localized.status,200);
  assert.match(await localized.text(),/<html lang="de">/i);

  const product=await worker.fetch(new Request("https://superbuys.pro/products/patagonia-quick-drying-pants/",{headers:{accept:"text/html"}}),env,ctx);
  const productHtml=await product.text();
  assert.match(productHtml,/"@type":"Product"/i);
  assert.match(productHtml,/"@type":"BreadcrumbList"/i);
  assert.match(productHtml,/href="https:\/\/www\.cnfanshp\.com\/AllProducts\/5973\.html"/i);

  const sitemap=await worker.fetch(new Request("https://superbuys.pro/sitemap.xml"),env,ctx);
  const xml=await sitemap.text();
  assert.match(xml,/<loc>https:\/\/superbuys\.pro\/finds\/<\/loc>/i);
  assert.match(xml,/<loc>https:\/\/superbuys\.pro\/de\/products\/patagonia-quick-drying-pants\/<\/loc>/i);
  assert.doesNotMatch(xml,/<loc>https:\/\/superbuys\.pro\/finds<\/loc>/i);
});
