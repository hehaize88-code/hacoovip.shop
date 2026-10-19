import assert from 'node:assert/strict';
import {getCatalog,getProduct} from '../src/lib/source.ts';
// Deliberately opt-in: exercises the real upstream, without persisted product fixtures.
const first=await getCatalog();const second=await getCatalog({page:2});const fourth=await getCatalog({page:4});
assert.equal(first.items.length,20);assert.equal(second.items.length,20);assert.equal(fourth.items.length,20);
assert.ok(!first.items.some(p=>second.items.some(q=>p.id===q.id)));
assert.ok(!first.items.some(p=>fourth.items.some(q=>p.id===q.id)));
const search=await getCatalog({q:'Shorts'});assert.ok(search.items.length>0);assert.ok(search.items.some(p=>/short/i.test(p.title)));assert.notDeepEqual(search.items.map(p=>p.id),first.items.map(p=>p.id));
const asc=await getCatalog({category:'shoes',sort:'price-asc'});const desc=await getCatalog({category:'shoes',sort:'price-desc'});
for(const [list,direction] of [[asc,1],[desc,-1]] as const){const amounts=list.items.map(p=>p.cny).filter((p):p is number=>p!==null);assert.ok(amounts.every((n,i)=>i===0||(n-amounts[i-1])*direction>=0));}
const product=await getProduct('6079');assert.equal(product.sourceId,'7777809164');assert.ok(product.buyUrl?.includes('/productDetail/7777809164?'));assert.ok(product.images.length>0);assert.equal(product.qcImages.length,0);
console.log(JSON.stringify({ok:true,perPage:first.items.length,sourcePageBoundary:fourth.items[0].id,searchResults:search.items.length,detailId:product.id,originalId:product.sourceId,photos:product.images.length}));
process.exit(0);
