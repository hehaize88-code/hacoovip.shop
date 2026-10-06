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
  assert.match(html, /AllChinaBuy Spreadsheet România/i);
  assert.doesNotMatch(html, /noindex/i);
  assert.match(html, /rel=["']canonical["']/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /https:\/\/cnfanshp\.com/i);
  assert.doesNotMatch(html, /cnbuycha\.com/i);
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

const newSlugs = [
  "maintenance-orders-romania", "shoes-spreadsheet-eu-size-qc",
  "hoodies-spreadsheet-size-fabric-weight", "shipping-expert-romania",
];
const oldSlugs = ["spreadsheet-guide", "qc-photo-routine", "parcel-cost-guide", "shipping-to-romania", "tracking-guide", "how-to-order-romania"];
const stripTags = (html) => html.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();

test("keeps all ten articles, accurate dates and four latest home cards", async () => {
  const worker = await getWorker();
  const xml = await (await fetchRoute(worker, "/sitemap.xml")).text();
  const articleUrls = [...xml.matchAll(/<loc>https:\/\/allchinabuy\.ro\/articles\/([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(new Set(articleUrls), new Set([...newSlugs, ...oldSlugs]));
  assert.match(xml, /2026-10-06/);
  for (const locale of ["", "/en", "/de", "/fr", "/es", "/it", "/pl"]) {
    const home = await (await fetchRoute(worker, locale || "/")).text();
    const latest = home.match(/class="article-grid home-article-grid"[\s\S]*?<\/section>/)?.[0] || "";
    assert.equal((latest.match(/href="\/articles\//g) || []).length, 4, locale);
    for (const slug of newSlugs) assert.ok(latest.includes(`/articles/${slug}`), `${locale}: ${slug}`);
    const hub = await (await fetchRoute(worker, `${locale}/articles`)).text();
    for (const slug of articleUrls) assert.ok(hub.includes(`/articles/${slug}`), `${locale}: ${slug}`);
  }
});

test("new guides render substantial original content and valid navigation", async () => {
  const worker = await getWorker();
  for (const slug of newSlugs) {
    const response = await fetchRoute(worker, `/articles/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="https://allchinabuy.ro/articles/${slug}"`));
    assert.doesNotMatch(html, /noindex/);
    assert.match(html, /<html lang="en">/);
    const body = html.match(/<article class="terminal-article"[\s\S]*?<\/article>/)?.[0] || "";
    const wordCount = stripTags(body).split(/\s+/).length;
    assert.ok(wordCount >= 1200 && wordCount <= 1800, `${slug}: ${wordCount}`);
    assert.match(body, /<table/);
    assert.match(body, /Related guides/);
    for (const anchor of body.matchAll(/href="#([^"\s]+)"/g)) assert.ok(body.includes(`id="${anchor[1]}"`));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const article = schemas.find(x => x["@type"] === "Article");
    assert.equal(article.datePublished, "2026-10-06");
    assert.equal(article.dateModified, "2026-10-06");
    assert.equal(article.inLanguage, "en");
    assert.ok(schemas.some(x => x["@type"] === "BreadcrumbList"));
    for (const link of body.matchAll(/href="(https:\/\/[^" ]+)"/g)) assert.equal(new URL(link[1]).hostname, "cnfanshp.com");
    console.log(`${slug}: ${wordCount} visible article words`);
  }
  const localized = await (await fetchRoute(worker, `/de/articles/${newSlugs[0]}`)).text();
  assert.match(localized, /noindex/);
  assert.ok(localized.includes(`rel="canonical" href="https://allchinabuy.ro/articles/${newSlugs[0]}"`));
});

test("old guides retain content and gain current service context and cross-links", async () => {
  const worker = await getWorker();
  for (const slug of oldSlugs) {
    const html = await (await fetchRoute(worker, `/articles/${slug}`)).text();
    assert.match(html, /Service check/);
    assert.match(html, /<table/);
    assert.match(html, /Related guides/);
    assert.match(html, /2026-10-06/);
  }
  const shipping = await (await fetchRoute(worker, "/articles/shipping-to-romania")).text();
  assert.match(shipping, /tariff classification rather than the number of physical units/);
  const costs = await (await fetchRoute(worker, "/articles/parcel-cost-guide")).text();
  assert.doesNotMatch(costs, /Public app reviews show mixed experiences/);
});
