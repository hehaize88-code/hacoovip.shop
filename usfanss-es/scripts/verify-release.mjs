import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const origin = 'https://usfanss.es';
const sitemap = readFileSync('sitemap.xml','utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
const prefixes = ['', '/en', '/fr', '/de', '/it', '/pl', '/pt', '/zh-cn'];
const fresh = ['usfans-metodos-pago','usfans-reembolsos-retirar-saldo','usfans-cupones-descuento'];
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = readFileSync(`${path.slice(1)}index.html`,'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`H1: ${path}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`),`Canonical: ${path}`);
  assert.ok(html.includes('name="robots" content="index,follow'),`Indexability: ${path}`);
  assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,9,`Alternates: ${path}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) JSON.parse(match[1]);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?]*)(?:\?[^"#]*)?"/g)) {
    const [destination,fragment] = match[1].split('#');
    const file = destination.endsWith('/') ? `${destination.slice(1)}index.html` : destination.slice(1);
    assert.ok(existsSync(file),`Missing target: ${path} -> ${match[1]}`);
    if (fragment && file.endsWith('.html')) assert.ok(readFileSync(file,'utf8').includes(`id="${fragment}"`),`Missing anchor: ${match[1]}`);
  }
  const css = html.match(/href="(\/static-assets\/app-([a-f0-9]+)\.css)"/);
  const js = html.match(/src="(\/static-assets\/app-([a-f0-9]+)\.js)"/);
  for (const asset of [css,js]) {
    assert.ok(asset,`Missing fingerprinted asset: ${path}`);
    assert.equal(createHash('sha256').update(readFileSync(asset[1].slice(1))).digest('hex').slice(0,12),asset[2]);
  }
  assert.equal((html.match(/gtag\('config','G-56TMQMXE1J'\)/g)||[]).length,1,`GA tag: ${path}`);
}
for (const prefix of prefixes) {
  for (const slug of fresh) assert.ok(urls.includes(`${origin}${prefix}/articles/${slug}/`));
  const faq = readFileSync(`${prefix.slice(1)}${prefix ? '/' : ''}faq/index.html`,'utf8');
  assert.ok((faq.match(/<details/g)||[]).length>=20,`FAQ count: ${prefix}`);
  const home=readFileSync(`${prefix.slice(1)}${prefix ? '/' : ''}index.html`,'utf8');
  for (const slug of fresh) assert.ok(home.includes(`href="${prefix}/articles/${slug}/"`),`Homepage missing new guide: ${prefix}/${slug}`);
}
assert.equal(urls.length,192,'Expected 24 routes across eight languages');
console.log(`Verified ${urls.length} indexable pages, canonicals, hreflang, JSON-LD, links, anchors, CSS/JS hashes and one GA4 config per page.`);
