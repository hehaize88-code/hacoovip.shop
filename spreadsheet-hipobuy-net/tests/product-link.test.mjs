import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProductLink } from '../public/link-utils.js';
test('keeps the exact marketplace item while removing affiliate/query tracking',()=>{
 assert.deepEqual(normalizeProductLink('https://weidian.com/item.html?itemID=7721490300&spider_token=abc#share'),{id:'7721490300',marketplace:'Weidian',clean:'https://weidian.com/item.html?itemID=7721490300'});
 assert.equal(normalizeProductLink('https://item.taobao.com/item.htm?id=123456789012&skuId=222').clean,'https://item.taobao.com/item.htm?id=123456789012');
 assert.equal(normalizeProductLink('https://detail.tmall.com/item.htm?id=123456789012').marketplace,'Tmall');
 assert.equal(normalizeProductLink('http://detail.1688.com/offer/123456789012.html?spm=abc').clean,'https://detail.1688.com/offer/123456789012.html');
});
test('does not mistake directory IDs, short links, deceptive hosts or conflicting IDs for a product',()=>{
 for(const value of ['HB-6045','https://cnfanshp.com/AllProducts/6045.html','https://m.tb.cn/h.abc','https://weidian.com.evil.test/item.html?itemID=7721490300','https://weidian.com@evil.test/item.html?itemID=7721490300','https://weidian.com/item.html?itemID=7721490300&itemID=1234567890','https://weidian.com/item.html?itemID=<script>','javascript:alert(1)','https://weidian.com:8443/item.html?itemID=7721490300'])assert.equal(normalizeProductLink(value),null,value);
});
