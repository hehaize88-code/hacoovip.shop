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
  assert.match(html, /https:\/\/www\.cnfanshp\.com\/shoes\//i);
  assert.doesNotMatch(html, /cnbuycha\.com/i);
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

test("serves frontend assets without app-router redirects", async () => {
  const serverCss = await render("/assets/site.css");
  const pagesJs = await renderPages("/assets/site.js");
  const logo = await render("/superbuy-logo.png");

  assert.equal(serverCss.status, 200);
  assert.equal(await serverCss.text(), "static:/assets/site.css");
  assert.equal(pagesJs.status, 200);
  assert.equal(await pagesJs.text(), "static:/assets/site.js");
  assert.equal(logo.status, 200);
  assert.equal(await logo.text(), "static:/superbuy-logo.png");
});

test("renders the packaging guide with search metadata and internal discovery", async () => {
  const response = await render("/articles/superbuy-packaging-guide/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Superbuy Packaging: Shoe Boxes, Vacuum Packing and Parcel Size<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/superbuys\.store\/articles\/superbuy-packaging-guide\/"\/>/i);
  assert.match(html, /"@type":"Article"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.match(html, /Superbuy vacuum packaging/i);
  assert.match(html, /Related Superbuy guides/i);
});

test("uses descriptive search-focused titles for guide hubs", async () => {
  const guides = await (await render("/guides/")).text();
  const faq = await (await render("/faq/")).text();

  assert.match(guides, /<title>How to use Superbuy in 2026\.<\/title>/i);
  assert.match(faq, /<title>Superbuy FAQ 2026: shipping cost, storage, QC &amp; packaging\.<\/title>/i);
});

test("localized homepages expose reciprocal search metadata and four new guides", async () => {
  const homeTitles = {
    en: "Superbuy Spreadsheet &amp; Finds | QC, Fees and Shipping Guides",
    fr: "Superbuy Spreadsheet : trouvailles, frais et livraison",
    de: "Superbuy Spreadsheet: Funde, Gebühren und Versand",
  };
  for (const [locale, title] of Object.entries(homeTitles)) {
    const path = locale === "en" ? "/" : `/${locale}/`;
    const html = await (await renderPages(path)).text();
    assert.ok(html.includes(`<html lang="${locale}"`));
    assert.ok(html.includes(`<title>${title}</title>`));
    assert.ok(html.includes(`<link rel="canonical" href="https://superbuys.store${path}"`));
    for (const [language, suffix] of [["en", "/"], ["fr-FR", "/fr/"], ["de-DE", "/de/"], ["x-default", "/"]]) {
      assert.ok(html.includes(`hrefLang="${language}" href="https://superbuys.store${suffix}"`), `${locale}: missing ${language} alternate`);
    }
    const notes = html.split('class="note-columns"')[1].split('</section>')[0];
    assert.equal((notes.match(/<article\b/g) ?? []).length, 4);
    for (const slug of ["domestic-tracking", "returns-refunds", "fees-total-cost", "warehouse-storage"]) {
      assert.ok(notes.includes(`/articles/superbuy-${slug}-guide/`));
    }
    assert.doesNotMatch(html, /cnbuycha\.com|SEO READING ORDER|One search intent per page/);
    assert.match(html, /G-1QS8EWYKPX/);
  }
});

test("all 33 article-language URLs render their own content and search signals", async () => {
  const { readFile } = await import("node:fs/promises");
  const english = JSON.parse(await readFile(new URL("../lib/articles/en.json", import.meta.url), "utf8"));
  for (const locale of ["en", "fr", "de"]) {
    const articles = JSON.parse(await readFile(new URL(`../lib/articles/${locale}.json`, import.meta.url), "utf8"));
    assert.equal(articles.length, 11);
    assert.deepEqual(articles.map((a) => a.slug), english.map((a) => a.slug));
    for (const [index, article] of articles.entries()) {
      const path = `${locale === "en" ? "" : `/${locale}`}/articles/${article.slug}/`;
      const response = await renderPages(path);
      const html = await response.text();
      assert.equal(response.status, 200, path);
      assert.ok(html.includes(`<html lang="${locale}"`), path);
      assert.ok(html.includes(`<link rel="canonical" href="https://superbuys.store${path}"`), path);
      const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const schema = jsonBlocks.find((item) => item["@type"] === "Article");
      assert.equal(schema.headline, article.title, path);
      assert.equal(schema.inLanguage, locale, path);
      assert.equal(schema.dateModified, "2026-10-06", path);
      assert.equal(schema.datePublished === "2026-10-06", index < 4, path);
      assert.ok(schema.wordCount > 400, path);
      assert.ok(jsonBlocks.some((item) => item["@type"] === "BreadcrumbList"), path);
      if (index < 4) assert.match(html, /<table>/, path);
      assert.doesNotMatch(html, /cnbuycha\.com|▁|SEO READING ORDER/);
      assert.equal((html.match(/<h1>/g) ?? []).length, 1, path);
      assert.equal((html.match(/hrefLang=/g) ?? []).length, 4, path);
      assert.ok(html.includes('class="category-next"'), path);
    }
  }
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  assert.equal(new Set(urls).size, 48);
  assert.equal(urls.length, 48);
  assert.equal(await readFile(new URL("../sitemap.xml", import.meta.url), "utf8"), sitemap);
  const missing = await renderPages("/articles/nonexistent-guide/");
  assert.equal(missing.status, 404);
});

test("engagement tracking separates destination clicks without transmitting search queries", async () => {
  const { runInNewContext } = await import("node:vm");
  const html = await (await renderPages("/fr/")).text();
  const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]).find((body) => body.includes("__superbuysEngagementTracking"));
  assert.ok(script);
  const events = [];
  const handlers = {};
  const context = {
    URL,
    window: { gtag: (...args) => events.push(args) },
    location: { href: "https://superbuys.store/fr/?private=ignored", pathname: "/fr/" },
    document: { documentElement: { lang: "fr" }, addEventListener: (name, handler) => { handlers[name] = handler; } },
  };
  runInNewContext(script, context);
  for (const href of ["https://www.cnfanshp.com/AllProducts/6049.html?secret=ignored", "https://www.cnfanshp.com/shoes/", "https://www.cnfanshp.com/AllProducts/", "https://unrelated.example/"]) {
    handlers.click({ target: { closest: () => ({ href }) } });
  }
  handlers.submit({ target: { matches: (selector) => selector === "form.search-line" } });
  assert.equal(events.length, 4);
  assert.deepEqual(events.slice(0, 3).map((event) => event[2].link_type), ["product", "category", "catalog"]);
  assert.equal(events[3][1], "catalog_search");
  assert.ok(events.every((event) => event[2].source_path === "/fr/" && event[2].site_language === "fr"));
  assert.doesNotMatch(JSON.stringify(events), /secret|private|keywords|search_term/);
});
