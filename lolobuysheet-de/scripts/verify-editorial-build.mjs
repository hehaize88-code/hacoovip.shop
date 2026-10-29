import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {locales,articleSlugs,href} from '../src/lib/i18n.ts';
import {getEditorial} from '../src/lib/editorial/index.ts';

const site='https://lolobuysheet.de';
const read=path=>readFileSync(new URL(`../dist/client${path}`,import.meta.url),'utf8');
for(const lang of locales){
 const hub=load(read(`${href(lang,'articles')}index.html`));
 assert.equal(hub('.article-hub .article-card').length,13,`${lang} article hub`);
 for(const slug of articleSlugs){
  const path=href(lang,`articles/${slug}`),entry=getEditorial(lang,slug);
  const html=read(`${path}index.html`),$=load(html);
  assert.equal($('html').attr('lang'),lang,path);
  assert.equal($('h1').length,1,path);
  assert.equal($('h1').text(),entry.title,path);
  assert.equal($('link[rel=canonical]').attr('href'),site+path,path);
  assert.equal($('meta[name=robots]').attr('content'),'index,follow',path);
  assert.equal($('link[rel=alternate][hreflang]').length,7,path);
  for(const other of locales)assert.equal($(`link[hreflang=${other}]`).attr('href'),site+href(other,`articles/${slug}`),path);
  assert.equal($('.editorial-body>section[id]').length,entry.sections.length,path);
  assert.equal($('.related-articles .article-card').length,3,path);
  assert.ok($('.article-next a').toArray().some(a=>$(a).attr('href')===href(lang,'spreadsheet')),path);
  assert.ok(!$('.editorial-body').text().includes('cnfanshm.com'),path);
  const schema=$('script[type="application/ld+json"]').toArray().flatMap(el=>JSON.parse($(el).html()));
  const article=schema.find(s=>s['@type']==='Article');
  assert.equal(article.inLanguage,lang,path);assert.equal(article.dateModified,entry.date,path);
  assert.equal(article.datePublished,entry.publishedAt,path);
  assert.ok(schema.some(s=>s['@type']==='BreadcrumbList'),path);
 }
}
const sitemap=load(read('/sitemap.xml'),{xml:true});
assert.equal(sitemap('url').length,132);
const locations=new Set(sitemap('loc').toArray().map(el=>sitemap(el).text()));
assert.equal(locations.size,132);
for(const lang of locales)for(const slug of articleSlugs)assert.ok(locations.has(site+href(lang,`articles/${slug}`)));
assert.ok([...locations].every(url=>!url.includes('?')&&!url.includes('/privacy/')&&!url.includes('/image-search/')));
console.log('Build verified: 78 article pages, 6 hubs, reciprocal language links, article metadata, 132 unique sitemap URLs.');
