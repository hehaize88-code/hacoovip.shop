const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, '../../../hacoovip-shop/assets/js/main.js'), 'utf8');
function page() {
  const events = [], handlers = {};
  const context = {
    URL,
    location: { origin: 'https://hacoovip.shop', href: 'https://hacoovip.shop/de/seo-articles', pathname: '/de/seo-articles' },
    window: { gtag: (...args) => events.push(args) },
    document: { documentElement: { lang: 'de' }, querySelector: () => null, querySelectorAll: () => [], addEventListener: (name, fn) => { (handlers[name] ||= []).push(fn); } }
  };
  vm.runInNewContext(script, context);
  return { events, click(link) { handlers.click.forEach(fn => fn({ target: { closest: () => link } })); } };
}
test('localized guide click keeps the language and article path', () => {
  const p=page();p.click({ href:'https://hacoovip.shop/de/hacoo-product-links-guide', textContent:'Hacoo-Links', closest:()=>null, hasAttribute:n=>n==='data-guide-link', querySelector:()=>({textContent:'Hacoo-Links'}) });
  assert.equal(p.events.length,1);assert.equal(p.events[0][1],'article_open');assert.equal(p.events[0][2].article_path,'/de/hacoo-product-links-guide');assert.equal(p.events[0][2].page_language,'de');
});
test('a catalog product click emits one custom outbound event', () => {
  const p=page();p.click({href:'https://www.cnfanshp.com/AllProducts/5932.html?utm_source=hacoovip.shop',textContent:'Katalog öffnen',closest:()=>null,hasAttribute:()=>false});
  assert.equal(p.events.length,1);assert.equal(p.events[0][1],'outbound_click');assert.equal(p.events[0][2].link_type,'product');assert.equal(p.events[0][2].destination_path,'/AllProducts/5932.html');
});
