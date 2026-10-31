import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';

async function moduleFor(path) {
  const result = await build({ entryPoints: [path], bundle: true, write: false, format: 'esm', platform: 'node' });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

test('weight planning distinguishes volume and actual mass and rejects invalid inputs', async () => {
  const { weightEstimate } = await moduleFor('app/weight-math.ts');
  assert.deepEqual(weightEstimate([3,40,30,20,6000]), {volume:4,larger:4});
  assert.deepEqual(weightEstimate([3,35,25,18,6000]), {volume:2.625,larger:3});
  assert.deepEqual(weightEstimate([3,40,30,20,5000]), {volume:4.8,larger:4.8});
  for (const values of [[3,40,30,20,0],[3,-40,30,20,6000],[NaN,40,30,20,6000],[Infinity,40,30,20,6000],[3,1e300,1e300,20,6000]]) assert.equal(weightEstimate(values), null);
});

test('the exported release has complete locale parity and canonical links for every page', async () => {
  const { copy, languages, articleSlugs, localizedPath, routeKeys } = await moduleFor('app/site-data.ts');
  const origin = 'https://spreadsheets-superbuy.net';
  const routes = [...routeKeys, 'about','editorial-policy','privacy','terms', ...articleSlugs.map(s => `articles/${s}`)];
  const paths = new Set(languages.flatMap(({code}) => routes.map(r => localizedPath(code,r))));
  const sitemap = readFileSync('dist/client/sitemap.xml','utf8');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.equal(locations.length,120);
  assert.deepEqual(new Set(locations),new Set([...paths].map(p => origin+p)));
  for (const {code} of languages) {
    for (const route of routes) {
      const path = localizedPath(code,route);
      const file = `dist/client${path === '/' ? '/' : path}index.html`;
      const html = readFileSync(file,'utf8');
      assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: canonical`);
      assert.ok(html.includes(`<html lang="${code === 'zh-cn' ? 'zh-CN' : code}">`), `${path}: html language`);
      assert.equal((html.match(/hreflang=/gi)||[]).length,6, `${path}: all alternates`);
      assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1, `${path}: single h1`);
      for (const [,href] of html.matchAll(/href="(\/[^"?#]*)"/g)) {
        if (/^\/(?:assets|products)\//.test(href) || /\.[a-z0-9]+$/i.test(href)) continue;
        assert.ok(paths.has(href),`${path}: destination ${href}`);
      }
      if (route === 'articles') assert.equal((html.match(/data-ga-event="article_click"/g)||[]).length,13);
      if (route === 'finds') {
        assert.equal((html.match(/data-ga-event="product_click"/g)||[]).length,10);
        assert.ok(html.includes('data-catalog-search'));
      }
      if (route.startsWith('articles/')) {
        assert.ok(html.includes('official_source_click'), `${path}: official sources`);
        assert.ok(html.includes('"dateModified":"2026-10-31"'));
      }
    }
    const articles = copy[code].articles;
    for (const slug of articleSlugs.slice(10)) {
      const article = articles[slug];
      assert.equal(article.sections.length,8);
      assert.equal(article.sections.flatMap(s => s.paragraphs).length,16);
      if (code !== 'zh-cn') assert.ok([article.intro,...article.sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).length >= 1200,`${code}/${slug}: full guide`);
      const html = readFileSync(`dist/client${localizedPath(code,`articles/${slug}`)}index.html`,'utf8');
      assert.ok(html.includes('"datePublished":"2026-10-31"'));
    }
  }
});
