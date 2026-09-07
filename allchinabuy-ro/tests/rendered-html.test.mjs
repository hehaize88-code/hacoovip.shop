import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function fetchRoute(worker, path, host = "allchinabuy.ro") {
  return worker.fetch(
    new Request(`https://${host}${path}`, {
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
}

test("renders production SEO metadata", async () => {
  const worker = await getWorker();
  const response = await fetchRoute(worker, "/");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="ro">/i);
  assert.match(html, /AllChinaBuy România 2026: Spreadsheet, QC Photos/i);
  assert.doesNotMatch(html, /noindex/i);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /https:\/\/www\.cnbuycha\.com/i);
  assert.doesNotMatch(html, /cnfanshp\.com/i);
  assert.doesNotMatch(html, />2,044</i);
  assert.doesNotMatch(html, /98\.7%/i);
  assert.doesNotMatch(html, /Match\s+\d+%/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("localizes documents and uses final canonical URLs", async () => {
  const worker = await getWorker();
  const response = await fetchRoute(worker, "/de/shipping-guide");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="de">/i);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/allchinabuy\.ro\/de\/shipping-guide"/i,
  );
  assert.doesNotMatch(html, /\/de\/shipping-guide\//i);
});

test("redirects aliases and keeps missing routes missing", async () => {
  const worker = await getWorker();
  const www = await fetchRoute(worker, "/shipping-guide", "www.allchinabuy.ro");
  assert.equal(www.status, 301);
  assert.equal(
    www.headers.get("location"),
    "https://allchinabuy.ro/shipping-guide",
  );

  const ro = await fetchRoute(worker, "/ro/shipping-guide");
  assert.equal(ro.status, 308);
  assert.equal(
    ro.headers.get("location"),
    "https://allchinabuy.ro/shipping-guide",
  );

  const missing = await fetchRoute(worker, "/not-a-real-page");
  assert.equal(missing.status, 404);
});

test("publishes a normalized sitemap", async () => {
  const worker = await getWorker();
  const response = await fetchRoute(worker, "/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /https:\/\/allchinabuy\.ro\/en<\/loc>/i);
  assert.doesNotMatch(xml, /https:\/\/allchinabuy\.ro\/en\/<\/loc>/i);
  assert.match(xml, /https:\/\/allchinabuy\.ro\/methodology<\/loc>/i);
  assert.match(
    xml,
    /https:\/\/allchinabuy\.ro\/articles\/shipping-to-romania<\/loc>/i,
  );
  assert.doesNotMatch(xml, /\/de\/articles\/shipping-to-romania/i);
});

test("publishes keyword-focused articles without editor labels", async () => {
  const worker = await getWorker();
  const response = await fetchRoute(worker, "/articles/tracking-guide");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(html, /AllChinaBuy Tracking Guide/i);
  assert.match(html, /rel="canonical" href="https:\/\/allchinabuy\.ro\/articles\/tracking-guide"/i);
  assert.doesNotMatch(html, /PRIMARY KEYWORD/i);
  assert.doesNotMatch(html, /SUPPORTING/i);
});
