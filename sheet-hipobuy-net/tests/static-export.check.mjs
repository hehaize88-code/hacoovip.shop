import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("../out/", import.meta.url).pathname;
const origin = "https://sheet-hipobuy.net";
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const langs = ["en", "de", "es", "it", "pl"];
const newSlugs = ["hipobuy-shipping-to-germany", "hipobuy-shipping-to-italy", "hipobuy-shipping-to-france", "hipobuy-delivery-time-tracking"];
const latestSlugs = ["hipobuy-shipping-to-spain", "hipobuy-rehearsal-parcel"];
const revisedSlugs = [...latestSlugs, "hipobuy-shipping-cost-guide", "hipobuy-warehouse-qc-photos", "hipobuy-review-2026"];
const read = (path) => readFileSync(join(root, path, "index.html"), "utf8");

test("the sitemap resolves to 100 exported pages with canonical and language metadata", () => {
  assert.equal(urls.length, 100);
  assert.equal(new Set(urls).size, 100);
  for (const url of urls) {
    const path = new URL(url).pathname;
    const html = read(path);
    assert.ok(html.includes(`rel="canonical" href="${url}"`), `${path}: canonical`);
    const first = path.split("/").filter(Boolean)[0];
    const lang = langs.includes(first) ? first : "en";
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`), `${path}: HTML lang`);
    for (const alternate of [...langs, "x-default"]) assert.ok(html.includes(`hrefLang="${alternate}"`), `${path}: ${alternate} alternate`);
    assert.doesNotMatch(html, /<meta[^>]+content="[^"]*noindex/, path);
  }
});

test("all five article indexes expose thirteen real, complete articles", () => {
  for (const lang of langs) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const index = read(`${prefix}/articles/`);
    assert.equal((index.match(/class="article-card-link"/g) ?? []).length, 13, lang);
    for (const slug of newSlugs) {
      const path = `${prefix}/articles/${slug}/`;
      assert.ok(index.includes(`href="${path}"`), path);
      const html = read(path);
      assert.ok(Number(html.match(/"wordCount":(\d+)/)?.[1]) >= 600, `${path}: complete body`);
      assert.equal((html.match(/class="article-section"/g) ?? []).length, 7, path);
      assert.match(html, /"datePublished":"2026-10-04"/);
      assert.match(html, /"@type":"BreadcrumbList"/);
      assert.doesNotMatch(html, /article-faq|"@type":"FAQPage"|>undefined</);
      for (const alternate of langs) {
        const altPrefix = alternate === "en" ? "" : `/${alternate}`;
        assert.ok(html.includes(`href="${altPrefix}/articles/${slug}/"`), `${path}: language switch`);
      }
    }
  }
});

test("article links resolve and historical publication dates are retained", () => {
  const articles = urls.filter((url) => /\/articles\/[^/]+\/$/.test(url));
  assert.equal(articles.length, 65);
  for (const url of articles) {
    const html = read(new URL(url).pathname);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, url);
    assert.doesNotMatch(html, /article-faq|"@type":"FAQPage"/);
    const updated = revisedSlugs.some((slug) => url.endsWith(`/${slug}/`)) ? "2026-10-31" : "2026-10-04";
    assert.ok(html.includes(`"dateModified":"${updated}"`));
    if (![...newSlugs, ...latestSlugs].some((slug) => url.endsWith(`/${slug}/`))) assert.match(html, /"datePublished":"2026-08-14"/);
    for (const [, path] of html.matchAll(/href="(\/(?:de\/|es\/|it\/|pl\/)?articles\/[^"#?]*)"/g)) {
      assert.ok(existsSync(join(root, path, "index.html")), `${url}: ${path}`);
    }
  }
  assert.ok(existsSync(join(root, "og-image.png")));
  assert.ok(read("/").includes('alt="Nike Zoom Vomero 5 Collection"'));
  assert.ok(sitemap.includes(origin));
});

test("new articles have complete localized bodies, discovery links and accurate dates", () => {
  for (const lang of langs) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    for (const slug of latestSlugs) {
      const path = `${prefix}/articles/${slug}/`;
      const html = read(path);
      const words = Number(html.match(/"wordCount":(\d+)/)?.[1]);
      assert.ok(words >= (lang === "en" ? 1200 : 800), `${path}: body ${words}`);
      assert.equal((html.match(/class="article-section"/g) ?? []).length, 8, path);
      assert.match(html, /"datePublished":"2026-10-31"/);
      assert.match(html, /"dateModified":"2026-10-31"/);
      assert.doesNotMatch(html, /article-faq|"@type":"FAQPage"|>undefined</);
      for (const hub of ["/", "/articles/", "/shipping/"]) {
        assert.ok(read(`${prefix}${hub}`).includes(`href="${path}"`), `${path}: linked from ${hub}`);
      }
      for (const other of langs) {
        assert.ok(html.includes(`href="${other === "en" ? "" : `/${other}`}/articles/${slug}/"`), `${path}: ${other} switch`);
      }
    }
  }
});

test("the catalog expands consistently with usable controls in every language", () => {
  for (const lang of langs) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const html = read(`${prefix}/spreadsheet/`);
    assert.equal((html.match(/class="table-row product-row"/g) ?? []).length, 16);
    assert.match(html, /class="directory-pagination"/);
    assert.match(html, /value="price_asc"/);
    assert.match(html, /data-ga-event="directory_filter"/);
    assert.match(html, /data-ga-event="product_open"/);
    assert.match(html, /dateTime="2026-10-31"/);
    assert.match(html, /\/AllProducts\/6008.html/);
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description && description.length >= 100, `${lang}: substantial description`);
  }
});
