import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { newArticles } from '../app/article-expansion.ts';
import { localeCodes, newSlugs } from '../app/editorial.ts';

test('category guides retain complete English text and links from topic and article directories', async () => {
  const hubs = await Promise.all(['qc-hub/index.html', 'guides/index.html', 'articles/index.html'].map(path => readFile(new URL(`../${path}`, import.meta.url), 'utf8')));
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
    location: { href: 'https://kakobuys.store/', origin: 'https://kakobuys.store', pathname: '/' },
    document: { createElement: () => ({}), head: { appendChild() {} }, addEventListener: (name, handler) => { handlers[name] = handler; } }
  });
  const code = await readFile(new URL('../public/analytics-v2.js', import.meta.url), 'utf8');
  vm.runInContext(code, context);
  vm.runInContext(code, context);
  handlers.click({ target: new Element() });
  handlers.submit({ target: new HTMLFormElement() });
  class GuideLink extends Element {
    constructor(){super();this.href='https://kakobuys.store/fr/kakobuy-extra-qc-photos/';}
    closest(selector){return selector==='a'?this:{dataset:{guideEntry:'home'}};}
  }
  handlers.click({target:new GuideLink()});
  const selection=context.window.dataLayer.find(args=>args[1]==='select_guide');
  assert.equal(selection[2].guide_path,'/fr/kakobuy-extra-qc-photos/');
  assert.equal(selection[2].entry_point,'home');
  assert.equal(context.window.dataLayer.filter(a => a[0] === 'config').length, 1);
  assert.equal(JSON.stringify(context.window.dataLayer.filter(a => a[0] === 'event').map(a => a[1])), JSON.stringify(['outbound_catalog_click', 'catalog_search', 'select_guide']));
});

test('each language publishes both new guides with a local entry link and reciprocal alternates', async () => {
  for (const lang of localeCodes) {
    const prefix = lang === 'en' ? '' : lang + '/';
    const dir = await readFile(new URL('../' + prefix + 'articles/index.html', import.meta.url),'utf8');
    assert.equal((dir.match(/<article>/g) ?? []).length,18);
    for (const slug of newSlugs) {
      assert.ok(dir.includes('href="/' + prefix + slug + '/"'));
      const page = await readFile(new URL('../' + prefix + slug + '/index.html',import.meta.url),'utf8');
      assert.ok(page.includes('<html lang="' + lang + '"'));
      assert.equal((page.match(/rel="alternate"/g) ?? []).length,9);
      assert.ok(page.includes('"inLanguage":"' + lang + '"'));
    }
  }
});

test('all public page stylesheets and their local resources are included in the deployment', async () => {
  const { localizedRoutes } = await import('../app/editorial.ts');
  const { findRoutes } = await import('../app/finds-data.ts');
  const root = new URL('../', import.meta.url);
  const pages = localeCodes.flatMap(lang => localizedRoutes.map(slug =>
    [lang === 'en' ? '' : lang, slug, 'index.html'].filter(Boolean).join('/')
  ));
  pages.push('finds/index.html', ...findRoutes.map(slug => slug + '/index.html'));
  const sheets = new Set();
  for (const page of pages) {
    const html = await readFile(new URL(page, root), 'utf8');
    const links = (html.match(/<link\b[^>]*>/gi) ?? []).filter(link => /\brel="stylesheet"/i.test(link));
    const paths = links.map(link => link.match(/\bhref="([^"]+)"/i)?.[1]);
    assert.ok(paths.some(path => path?.startsWith('/assets/')), page + ' is missing its layout stylesheet');
    for (const path of paths) if (path?.startsWith('/')) sheets.add(path);
  }
  for (const path of sheets) {
    const asset = new URL(path.slice(1), root);
    const css = await readFile(asset, 'utf8');
    assert.ok(css.trim() && !css.trimStart().startsWith('<'), path + ' must contain CSS');
    for (const [, url] of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;
      const dependency = url.startsWith('/') ? new URL(url.slice(1), root) : new URL(url, asset);
      assert.ok((await readFile(dependency)).length, url + ' is empty');
    }
  }
});
