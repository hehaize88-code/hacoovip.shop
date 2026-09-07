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
