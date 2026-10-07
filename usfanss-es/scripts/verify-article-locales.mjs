import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const languages = { es: '', en: '/en', fr: '/fr', de: '/de', it: '/it', pl: '/pl', pt: '/pt', zh: '/zh-cn' };
const articleLinks = (html, prefix) => new Set([...html.matchAll(/href="([^"]+)"/g)]
  .map(match => match[1]).filter(path => path.startsWith(`${prefix}/articles/`) && /^\/articles\/[^/]+\/$/.test(path.slice(prefix.length))));
const spanishHub = readFileSync('articles/index.html', 'utf8');
const slugs = [...articleLinks(spanishHub, '')].map(path => path.split('/')[2]).sort();
assert.ok(slugs.length >= 15, 'Spanish article collection lost published guides');
const sitemap = readFileSync('sitemap.xml', 'utf8');
const script = readFileSync('static-assets/app.js', 'utf8');
let articlesChecked = 0;
let switchesChecked = 0;
for (const [lang, prefix] of Object.entries(languages)) {
  const hub = readFileSync(`${prefix.slice(1)}${prefix ? '/' : ''}articles/index.html`, 'utf8');
  const links = articleLinks(hub, prefix);
  assert.deepEqual([...links].map(path => path.split('/').at(-2)).sort(), slugs, `${lang}: article hub differs from Spanish`);
  for (const slug of slugs) {
    const path = `${prefix}/articles/${slug}/`;
    const html = readFileSync(`${path.slice(1)}index.html`, 'utf8');
    assert.ok(html.includes(`<html lang="${lang === 'zh' ? 'zh-CN' : lang}">`), `Wrong language: ${path}`);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Wrong heading count: ${path}`);
    assert.ok(html.includes(`rel="canonical" href="https://usfanss.es${path}"`), `Wrong canonical: ${path}`);
    assert.ok(html.includes('class="article-toc"') && html.includes('class="article-takeaway"'), `Incomplete article: ${path}`);
    assert.ok((html.match(/id="section-\d+"/g) || []).length >= 4, `Missing sections: ${path}`);
    assert.ok(sitemap.includes(`<loc>https://usfanss.es${path}</loc>`), `Missing sitemap entry: ${path}`);
    for (const other of Object.values(languages)) {
      assert.ok(html.includes(`href="https://usfanss.es${other}/articles/${slug}/"`), `Missing language alternate: ${path} -> ${other}`);
    }
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const destination = match[1].slice(1);
      assert.ok(existsSync(destination.endsWith('/') ? `${destination}index.html` : destination || 'index.html'), `Broken local link: ${path} -> ${match[1]}`);
    }
    for (const [target, targetPrefix] of Object.entries(languages)) {
      let change;
      let actual;
      const select = { value: lang, addEventListener: (name, callback) => { if (name === 'change') change = callback; } };
      const window = { location: { pathname: path, hash: '#section-2', assign: value => { actual = value; } } };
      const document = { querySelectorAll: selector => selector === 'select' ? [select] : [], querySelector: () => null };
      runInNewContext(script, { window, document, Object, FormData });
      select.value = target;
      assert.equal(typeof change, 'function', `Language switch listener missing: ${path}`);
      change();
      assert.equal(actual, `${targetPrefix}/articles/${slug}/#section-2`, `Language switch lost article or section: ${path} -> ${target}`);
      switchesChecked++;
    }
    articlesChecked++;
  }
  console.log(`${lang}: ${links.size} complete articles`);
}
console.log(`Verified ${articlesChecked} article pages and ${switchesChecked} same-article language switches.`);
