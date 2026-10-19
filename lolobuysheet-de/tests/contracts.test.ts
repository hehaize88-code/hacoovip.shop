import test from 'node:test';
import assert from 'node:assert/strict';
import {makeBuyUrl,imageUrl,parseList,parseRate} from '../src/lib/source.ts';
import {href,locales,ui,infoPages,articleSlugs} from '../src/lib/i18n.ts';
// Contracts guard the money/link boundaries; no catalog fixture or mock image collection.
test('LoloBuy URL uses the original marketplace ID, including the supplied example',()=>{
 const id='7711153142';
 assert.equal(makeBuyUrl(id,`https://weidian.com/item.html?itemID=${id}`),`https://www.lolobuy.com/productDetail/${id}?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${id}`);
 assert.equal(makeBuyUrl('6079','https://weidian.com/item.html?itemID=7777809164'),null);
 assert.equal(makeBuyUrl(id,`https://evil.example/item.html?itemID=${id}`),null);
 assert.equal(makeBuyUrl('bad',`https://weidian.com/item.html?itemID=${id}`),null);
});
test('images can only come from the approved cnfanshm upload paths',()=>{
 assert.equal(imageUrl('https://example.com/photo.jpg'),'');assert.equal(imageUrl('data:image/png;base64,x'),'');assert.equal(imageUrl('/uploads/item.jpg'),'https://cnfanshm.com/uploads/item.jpg');
});
test('missing upstream price rule and markup fail explicitly',()=>{
 assert.throws(()=>parseRate(''));assert.equal(parseRate('const CNY_TO_USD_RATE = 7.26;'),7.26);assert.throws(()=>parseList('<html>unavailable</html>',7.26));
});
test('all six interfaces and locale paths are complete',()=>{
 const keys=Object.keys(ui.de);
 for(const lang of locales){assert.deepEqual(Object.keys(ui[lang]),keys);for(const key of keys)assert.ok(ui[lang][key]?.trim(),`${lang}.${key}`);for(const path of [...infoPages,...articleSlugs.map(s=>`articles/${s}`)])assert.match(href(lang,path),/^\/(?:en\/|es\/|fr\/|it\/|pl\/)?[a-z/-]+\/$/);}
 assert.equal(href('de'),'/');assert.equal(href('en','product/6079'),'/en/product/6079/');
});
