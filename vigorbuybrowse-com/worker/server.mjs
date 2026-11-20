const ORIGIN='https://cnfanshp.com';
const cats=['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const decode=s=>String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0].toLowerCase()==='x'?parseInt(v.slice(1),16):Number(v))).replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const clean=s=>decode(String(s||'').replace(/<[^>]*>/g,'')).trim();
function parseCatalog(html){return [...html.matchAll(/<div class="product-card\b[\s\S]*?(?=<div class="product-card\b|<div class="pagination"|<footer|$)/g)].map(m=>{let s=m[0];return {id:s.match(/href="\/AllProducts\/(\d+)\.html/)?.[1],name:clean(s.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]),image:s.match(/data-src="([^"]+)"/)?.[1],price:Number(s.match(/class="product-price">\s*([\d.]+)/)?.[1])}}).filter(p=>p.id&&p.image);}
function parseDetail(html){
 const content=html.split('<section class="product-list">')[0];
 const part=content.replace(/^[\s\S]*?<\/header>/i,''), photos=new Set(), styles=new Set(), qc=new Set();
 for (const tag of part.matchAll(/<img\b[^>]*>/gi)){
  const attrs=Object.fromEntries([...tag[0].matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1],decode(m[2])]));
  let u;try{u=new URL(attrs['data-src']||attrs.src,ORIGIN)}catch{continue}
  if(!['cnfanshp.com','www.cnfanshp.com'].includes(u.hostname)||!u.pathname.startsWith('/uploads/'))continue;
  const role=[attrs.class,attrs.alt,attrs['data-type'],attrs['data-role']].join(' ');
  if(/\bqc\b|质检/i.test(role))qc.add(u.pathname);
  else if(/\b(?:sku|style|variant|colorway)\b|款式|颜色图/i.test(role))styles.add(u.pathname);
  else photos.add(u.pathname);
 }
 return {name:clean(part.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]),itemId:part.match(/weidian.com\/item.html\?itemID=(\d+)/)?.[1],price:Number(part.match(/class="product-price">\s*([\d.]+)/)?.[1]),images:[...photos],styles:[...styles],qc:[...qc]};
}
const memo=new Map();async function cached(key,fn,ttl=300000){let c=memo.get(key);if(c&&c.expires>Date.now())return c.value;let value=await fn();if(memo.size>250)memo.delete(memo.keys().next().value);memo.set(key,{value,expires:Date.now()+ttl});return value}
async function source(path){return cached('source:'+path,async()=>{let r=await fetch(ORIGIN+path,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error('Upstream '+r.status);return r.text()})}
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':status===200?'public, max-age=180':'no-store'}});
const bytes=b64=>Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
export default {async fetch(request,env){const u=new URL(request.url);try{
if(u.hostname==='www.vigorbuybrowse.com'||u.protocol==='http:'){u.hostname='vigorbuybrowse.com';u.protocol='https:';return Response.redirect(u.href,308)}
if(['/robots.txt','/sitemap.xml','/logo.png','/api/search-index'].includes(u.pathname))return env.ASSETS.fetch(request);
if(u.pathname==='/api/index-status')return json(INDEX_REPORT);
if(u.pathname==='/api/catalog'){let cat=u.searchParams.get('category')||'AllProducts';if(!cats.includes(cat))return json({error:'Invalid category'},400);let path=u.searchParams.get('path')||'/'+cat+'/';let q=u.searchParams.get('q');if(q){let pg=new URL(decode(path),'https://source.invalid').searchParams.get('page');path='/search.html?channelid=2&keywords='+encodeURIComponent(q.slice(0,100))+(pg&&/^\d{1,5}$/.test(pg)?'&page='+pg:'');}if(!/^\/(?:AllProducts|shoes|hoodies-sweaters|t-shirts|jackets|pants-shorts|headwear|accessories|short-sets|electronics|other-stuff|jersey)\/(?:list_\d+_\d+\/)?$/.test(path)&&!path.startsWith('/search.html?channelid=2&keywords='))return json({error:'Invalid path'},400);let h=await source(path);let next=h.match(/<a href="([^"<>]+)"[^>]*>下一页<\/a>/)?.[1];return json({products:parseCatalog(h),next:next?decode(next):null});}
if(/^\/api\/product\/\d+$/.test(u.pathname)){let h=await source('/AllProducts/'+u.pathname.split('/').pop()+'.html');let p=parseDetail(h);if(!p.name||!p.images.length)return json({error:'Unavailable'},404);p.id=u.pathname.split('/').pop();return json(p)}
if(u.pathname==='/api/image'){let path=u.searchParams.get('path')||'',target;if(/^\/uploads\/[a-zA-Z0-9_./-]+\.(jpg|jpeg|png|webp|gif)$/i.test(path)&&!path.includes('..'))target=ORIGIN+path;else return new Response('',{status:400});let r=await fetch(target,{signal:AbortSignal.timeout(20000)});if(!r.ok)return new Response('',{status:r.status});return new Response(r.body,{headers:{'content-type':r.headers.get('content-type')||'image/jpeg','cache-control':'public,max-age=86400','x-content-type-options':'nosniff'}})}
if(u.pathname.startsWith('/api/'))return json({error:'Not found'},404);
if(!/^\/(?:|spreadsheet\/?|categories\/?|product\/\d+\/?|image-search\/?|guides\/?|faq\/?|qc\/?|shipping\/?)$/.test(u.pathname))return new Response('Not found',{status:404});return new Response(PAGE,{headers:{'content-type':'text/html; charset=utf-8','x-robots-tag':'index, follow'}});
}catch(e){return json({error:'Source temporarily unavailable. Please retry.'},502)}}};
export {parseCatalog,parseDetail};