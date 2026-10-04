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
const read = (path) => readFileSync(join(root, path, "index.html"), "utf8");

test("the sitemap resolves to 90 exported pages with canonical and language metadata", () => {
  assert.equal(urls.length, 90);
  assert.equal(new Set(urls).size, 90);
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

test("all five article indexes expose eleven real, complete articles", () => {
  for (const lang of langs) {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const index = read(`${prefix}/articles/`);
    assert.equal((index.match(/class="article-card-link"/g) ?? []).length, 11, lang);
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
  assert.equal(articles.length, 55);
  for (const url of articles) {
    const html = read(new URL(url).pathname);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, url);
    assert.doesNotMatch(html, /article-faq|"@type":"FAQPage"/);
    assert.match(html, /"dateModified":"2026-10-04"/);
    if (!newSlugs.some((slug) => url.endsWith(`/${slug}/`))) assert.match(html, /"datePublished":"2026-08-14"/);
    for (const [, path] of html.matchAll(/href="(\/(?:de\/|es\/|it\/|pl\/)?articles\/[^"#?]*)"/g)) {
      assert.ok(existsSync(join(root, path, "index.html")), `${url}: ${path}`);
    }
  }
  assert.ok(existsSync(join(root, "og-image.png")));
  assert.ok(read("/").includes('alt="Nike Zoom Vomero 5 Collection"'));
  assert.ok(sitemap.includes(origin));
});
