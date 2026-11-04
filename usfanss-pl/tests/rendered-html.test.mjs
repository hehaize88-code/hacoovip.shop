import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renders production canonical and indexable metadata", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/usfanss\.pl\/["'])[^>]*>/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("exports multilingual pages and SEO endpoints", async () => {
  await Promise.all([
    "out/en/index.html",
    "out/de/index.html",
    "out/fr/index.html",
    "out/it/index.html",
    "out/es/index.html",
    "out/ro/index.html",
    "out/articles/index.html",
    "out/faq/index.html",
    "out/robots.txt",
    "out/sitemap.xml",
  ].map((path) => readFile(new URL(`../${path}`, import.meta.url))));
});

test("exports priority Poland shipping and tracking articles", async () => {
  const [home, shipping, tracking, sitemap] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/en/articles/usfans-shipping-to-poland/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/en/articles/usfans-tracking-guide/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
  ]);
  assert.match(home, /US Fans Lista 2026/i);
  assert.match(home, /click_main_site/);
  assert.match(shipping, /USFans Shipping to Poland 2026/i);
  assert.match(tracking, /USFans Tracking Guide 2026/i);
  assert.match(sitemap, /\/en\/articles\/usfans-shipping-to-poland\//);
  assert.match(sitemap, /\/en\/articles\/usfans-tracking-guide\//);
});

test("exports the full multilingual Poland route-availability article", async () => {
  const pages = await Promise.all([
    "out/articles/usfans-poland-route-availability/index.html",
    "out/en/articles/usfans-poland-route-availability/index.html",
    "out/de/articles/usfans-poland-route-availability/index.html",
    "out/fr/articles/usfans-poland-route-availability/index.html",
    "out/it/articles/usfans-poland-route-availability/index.html",
    "out/es/articles/usfans-poland-route-availability/index.html",
    "out/ro/articles/usfans-poland-route-availability/index.html",
  ].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.ok(pages.every((html) => (html.match(/<section id="section-/g) ?? []).length === 8));
  assert.ok(pages.every((html) => /rel="canonical"/.test(html)));
  const sitemap = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  assert.equal((sitemap.match(/usfans-poland-route-availability/g) ?? []).length, 7);
});

const locales = { pl: "pl-PL", en: "en", de: "de-DE", fr: "fr-FR", it: "it-IT", es: "es-ES", ro: "ro-RO" };
const slugs = ["first-time-spreadsheet-checklist", "read-usfans-qc-photos", "product-price-vs-parcel-cost", "usfans-poland-preorder-checklist", "usfans-poland-route-availability", "usfans-shipping-to-poland", "usfans-tracking-guide", "usfans-sizing-poland", "usfans-returns-before-shipping-poland", "usfans-hoodies-poland-selection", "usfans-shoes-poland-shoebox", "usfans-reviews-poland", "usfans-payments-poland", "usfans-link-troubleshooting"];

test("all 98 localized articles are complete, indexable and reciprocally linked", async () => {
  const titles = new Set();
  for (const [locale, lang] of Object.entries(locales)) {
    const prefix = locale === "pl" ? "" : `${locale}/`;
    for (const slug of slugs) {
      const path = `${prefix}articles/${slug}/`;
      const html = await readFile(new URL(`../out/${path}index.html`, import.meta.url), "utf8");
      assert.ok(html.includes(`<html lang="${lang}"`), path);
      assert.doesNotMatch(html, /<meta[^>]+content="[^"]*noindex/i, path);
      assert.ok(html.includes(`<link rel="canonical" href="https://usfanss.pl/${path}"`), path);
      assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, path);
      const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1];
      assert.ok(heading && !titles.has(heading), `Missing or untranslated heading: ${path}`);
      titles.add(heading);
      assert.ok((html.match(/<section id="section-/g) ?? []).length >= 6, path);
      assert.ok(html.includes('class="official-sources') || html.includes('article-sources official-sources'), path);
      for (const [other, tag] of Object.entries(locales)) {
        const alternate = `https://usfanss.pl/${other === "pl" ? "" : `${other}/`}articles/${slug}/`;
        assert.ok(html.includes(`hrefLang="${tag}" href="${alternate}"`), `${path} missing ${tag}`);
      }
      assert.ok(html.includes('hrefLang="x-default"'), path);
      assert.ok(html.includes('guide_click'), path);
    }
  }
});

test("sitemap compatibility endpoints cover all 140 canonical pages", async () => {
  const sitemap = await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8");
  const index = await readFile(new URL("../out/sitemap-index.xml", import.meta.url), "utf8");
  const text = await readFile(new URL("../out/google-sitemap.txt", import.meta.url), "utf8");
  const robots = await readFile(new URL("../out/robots.txt", import.meta.url), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 140);
  assert.equal(new Set(urls).size, 140);
  assert.deepEqual(text.trim().split("\n"), urls);
  assert.match(index, /<sitemapindex[^>]*>/);
  assert.match(index, /<loc>https:\/\/usfanss.pl\/sitemap.xml<\/loc>/);
  assert.match(robots, /Sitemap: https:\/\/usfanss.pl\/sitemap-index.xml/);
  for (const url of urls) {
    assert.ok(!url.includes("pages.dev"));
    const html = await readFile(new URL(`../out/${new URL(url).pathname.slice(1)}index.html`, import.meta.url), "utf8");
    assert.doesNotMatch(html, /<meta[^>]+content="[^"]*noindex/i, url);
    for (const [, asset] of html.matchAll(/(?:href|src)="(\/_next\/static\/[^"?]+)(?:\?[^" ]*)?"/g)) {
      await readFile(new URL(`../out${asset}`, import.meta.url));
    }
    for (const [, target] of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)) {
      await readFile(new URL(`../out/${target.slice(1)}${target.endsWith("/") ? "index.html" : ""}`, import.meta.url));
    }
  }
});
