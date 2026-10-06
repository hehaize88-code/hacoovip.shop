import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { newArticles } from '../app/article-expansion.ts';

test('new guides are complete, linked from every English hub and exported without hydration', async () => {
  const hubs = await Promise.all(['index.html', 'qc-hub/index.html', 'guides/index.html', 'articles/index.html'].map(path => readFile(new URL(`../${path}`, import.meta.url), 'utf8')));
  for (const article of newArticles) {
    const html = await readFile(new URL(`../${article.slug}/index.html`, import.meta.url), 'utf8');
    const count = [article.intro, article.quickAnswer, ...article.sections.flatMap(s => [s.heading, ...s.paragraphs])].join(' ').split(/\s+/).length;
    assert.ok(count >= 1200 && count <= 1800, `${article.slug}: ${count} reading words`);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /<script src="\/analytics-v2.js" defer/);
    assert.doesNotMatch(html, /self\.__VINEXT|\/workspace\//);
    for (const hub of hubs) assert.ok(hub.includes(`href="/${article.slug}/"`));
  }
});

test('analytics initializes once and records the catalog click and search', async () => {
  const handlers = {};
  class Element {
    closest() { return { href: 'https://www.cnfanshp.com/AllProducts/2037.html', textContent: 'Open product' }; }
  }
  class HTMLFormElement {
    matches() { return true; }
    querySelector() { return { value: 'hoodie' }; }
  }
  const context = vm.createContext({
    window: {}, Element, HTMLFormElement, URL, Date,
    location: { href: 'https://kakobuys.store/', pathname: '/' },
    document: { createElement: () => ({}), head: { appendChild() {} }, addEventListener: (name, handler) => { handlers[name] = handler; } }
  });
  const code = await readFile(new URL('../public/analytics-v2.js', import.meta.url), 'utf8');
  vm.runInContext(code, context);
  vm.runInContext(code, context);
  handlers.click({ target: new Element() });
  handlers.submit({ target: new HTMLFormElement() });
  assert.equal(context.window.dataLayer.filter(a => a[0] === 'config').length, 1);
  assert.equal(JSON.stringify(context.window.dataLayer.filter(a => a[0] === 'event').map(a => a[1])), JSON.stringify(['outbound_catalog_click', 'catalog_search']));
});
