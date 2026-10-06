import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../_worker.js';

test('static deployment refreshes article HTML and sitemaps without freezing product pages',async()=>{
 const env={ASSETS:{fetch:async()=>new Response('content',{headers:{'Content-Type':'text/html','CDN-Cache-Control':'no-store'}})}};
 for(const path of ['/articles/','/articles/superbuy-shoes-spreadsheet-sizing-qc/','/products/shoes-60/','/sitemap.xml','/robots.txt']){
  const r=await worker.fetch(new Request('https://superbuys.pro'+path),env);
  assert.equal(r.status,200);
  assert.equal(r.headers.get('Cache-Control'),'public, max-age=0, must-revalidate');
  assert.equal(r.headers.get('CDN-Cache-Control'),'no-store');
 }
 const image=await worker.fetch(new Request('https://superbuys.pro/products/6045.jpg'),env);
 assert.equal(image.headers.get('Cache-Control'),'public, max-age=3600');
 const asset=await worker.fetch(new Request('https://superbuys.pro/assets/index-a1b2c3d4.css'),env);
 assert.match(asset.headers.get('Cache-Control'),/immutable/);
 const redirect=await worker.fetch(new Request('https://www.superbuys.pro/articles/'),env);
 assert.equal(redirect.status,301);
 assert.equal(redirect.headers.get('Location'),'https://superbuys.pro/articles/');
});
