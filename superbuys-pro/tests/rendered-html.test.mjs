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
  assert.match(html, /data-analytics="ga4"/i);
  assert.match(html, /href="\/articles\/superbuy-shoes-spreadsheet-sizing-qc\/"/i);
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
  assert.match(xml, /<loc>https:\/\/superbuys\.pro\/articles\/superbuy-warehouse-storage-qc-guide\/<\/loc>/i);
  assert.match(xml, /<loc>https:\/\/superbuys\.pro\/fr\/articles\/superbuy-fees-shopping-agent-vs-parcel-forwarding\/<\/loc>/i);
  assert.doesNotMatch(xml,/<loc>https:\/\/superbuys\.pro\/finds<\/loc>/i);
});

test("publishes complete six-language articles with consistent metadata and navigation", async () => {
  const {readFile}=await import("node:fs/promises");
  const editorial=JSON.parse(await readFile(new URL("../app/editorial.json",import.meta.url),"utf8"));
  const {default:worker}=await import(new URL("../dist/server/index.js",import.meta.url));
  const env={ASSETS:{fetch:async()=>new Response("Not found",{status:404})}};
  const ctx={waitUntil(){},passThroughOnException(){}};
  assert.equal(editorial.length,11);
  const locales=["en","de","fr","it","nl","ms"];
  for(const article of editorial){
    const english=article.bodies.en;
    const count=[english.dek,...english.sections.flat()].join(" ").trim().split(/\s+/).length;
    assert.ok(count>=1200&&count<=1800,`${article.slug}: English length ${count}`);
    for(const locale of locales){
      const body=article.bodies[locale];
      assert.equal(body.sections.length,english.sections.length,`${locale}/${article.slug}: missing section`);
      assert.ok(body.dek.length>100);
      for(const [i,section] of body.sections.entries()){
        assert.ok(section[0].length>8);
        assert.ok(section[1].length>english.sections[i][1].length*.5,`${locale}/${article.slug}: abridged section ${i}`);
      }
      const path=`/${locale==="en"?"":locale+"/"}articles/${article.slug}/`;
      const response=await worker.fetch(new Request(`https://superbuys.pro${path}`,{headers:{accept:"text/html"}}),env,ctx);
      assert.equal(response.status,200,path);
      const html=await response.text();
      assert.ok(html.includes(`<html lang="${locale}">`));
      assert.ok(html.includes(`rel="canonical" href="https://superbuys.pro${path}"`),path);
      assert.ok(html.includes('property="og:type" content="article"'));
      assert.ok(html.includes(`"datePublished":"${article.date}"`));
      assert.ok(html.includes('"dateModified":"2026-10-06"'));
      assert.ok(html.includes(`href="#section-${body.sections.length}"`));
      for(const other of locales){
        const destination=`/${other==="en"?"":other+"/"}articles/${article.slug}/`;
        assert.ok(html.includes(`href="${destination}"`),`${path} language switch to ${other}`);
      }
      assert.doesNotMatch(html,/cnfanshp\.com(?:—| –|,)/);
    }
  }
});
