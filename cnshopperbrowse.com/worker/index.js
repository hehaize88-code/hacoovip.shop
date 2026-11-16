import { PAGE } from './page.js';
import { SOURCE_INDEX, FEATURES, INDEX_META } from './data.js';
import { variants, allowedImage, agentLinks } from './commerce.js';
const SITE='https://cnshopperbrowse.com';
const LANGS=['en','de','fr','es','it','pt'];
const xml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const staticRoutes=['','spreadsheet','categories','image-search','qc','shipping','articles','guides','faq','articles/ordering','articles/photos','articles/shipping','articles/returns'];
const xmlResponse=s=>new Response(s,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=3600'}});
const ORIGIN='https://cnfanshp.com';
const memo=new Map();
const decode=s=>String(s||'').replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/<[^>]*>/g,'').trim();
const pick=(s,re)=>decode(s.match(re)?.[1]||'');
const safePath=p=>/^\/(?:AllProducts|shoes|hoodies-sweaters|t-shirts|jackets|pants-shorts|headwear|accessories|short-sets|electronics|other-stuff|jersey)(?:\/[A-Za-z0-9_.-]*)*\/?$/.test(p);
async function upstream(path){
 const c=memo.get(path);if(c&&Date.now()-c.at<180000)return c.value;
 const r=await fetch(ORIGIN+path,{redirect:'manual',signal:AbortSignal.timeout(18000),headers:{'User-Agent':'CNShopperCatalog/1.0','Accept':'text/html'}});
 if(!r.ok)throw new Error('Source unavailable ('+r.status+')');
 const text=await r.text();if(!text.includes('product-'))throw new Error('Source returned an unexpected page');
 memo.set(path,{at:Date.now(),value:text});if(memo.size>150)memo.delete(memo.keys().next().value);return text;
}
function parseCatalog(html){
 const blocks=html.split(/<(?:div|article)\s+class="product-card[^>]*>/).slice(1);
 const items=blocks.map(b=>{
  const path=pick(b,/href="(\/[^"?#]+\.html)"/),img=pick(b,/(?:data-src|src)="(\/uploads\/[^" ]+|\/media\/[^" ]+)"/),name=pick(b,/class="product-(?:name|title)"[^>]*>([\s\S]*?)<\//)||pick(b,/alt="([^"]+)"/),price=Number(pick(b,/class="product-price"[^>]*>([\s\S]*?)<\//));
  return {path,img,name,price,currency:/product-price[^>]*data-currency="USD"/.test(b)?'USD':'CNY'};
 }).filter(x=>x.path&&x.img);
 const page=html.split('class="pagination"')[1]?.split('</div>')[0]||'';
 const next=page.match(/href="([^"]+)"[^>]*>下一页/),prev=page.match(/href="([^"]+)"[^>]*>上一页/);
 return {items,next:next?decode(next[1]):null,prev:prev?decode(prev[1]):null};
}
function parseProduct(html){
 const head=html.split(/<(?:section|div)[^>]*class="(?:related-products|product-list|related)/)[0];
 const gallery=head.split('class="product-gallery"')[1]?.split('class="product-info"')[0]||head.split('class="main-image"')[1]?.split('class="product-info"')[0]||'';
 const images=[...new Set([...gallery.matchAll(/(?:data-src|src)="(\/(?:uploads|media)\/[^" ]+)"/g)].map(m=>decode(m[1])))];
 const id=pick(head,/weidian\.com\/item\.html\?itemID=(\d+)/)||pick(head,/Product ID:\s*(\d+)/);
 return {name:pick(head,/<h1[^>]*>([\s\S]*?)<\/h1>/),price:Number(pick(head,/class="product-price"[^>]*>([\s\S]*?)<\//)),currency:/product-price[^>]*data-currency="USD"/.test(head)?'USD':'CNY',images,id};
}
const json=(x,status=200)=>new Response(JSON.stringify(x),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=60','x-content-type-options':'nosniff'}});
export default {async fetch(request,env,ctx){
 const url=new URL(request.url),path=url.pathname;
 if(url.hostname==='www.cnshopperbrowse.com'||(url.hostname==='cnshopperbrowse.com'&&url.protocol!=='https:'))return Response.redirect(SITE+path+url.search,308);
 if(path==='/')return Response.redirect(SITE+'/en/',308);
 try{
 if(path==='/sitemap.xml')return xmlResponse('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['pages',...LANGS.map(l=>'products-'+l)].map(n=>'<sitemap><loc>'+SITE+'/sitemap-'+n+'.xml</loc></sitemap>').join('')+'</sitemapindex>');
 if(path==='/sitemap-pages.xml'||/^\/sitemap-products-(en|de|fr|es|it|pt)\.xml$/.test(path)){
 const lang=path.match(/products-(\w+)\.xml/)?.[1];
 const urls=lang?SOURCE_INDEX.map(p=>SITE+'/'+lang+'/product?path='+encodeURIComponent(p.path)):LANGS.flatMap(l=>staticRoutes.map(r=>SITE+'/'+l+'/'+r));
 return xmlResponse('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>'<url><loc>'+xml(u)+'</loc></url>').join('')+'</urlset>');
 }
 if(path==='/data/image-index.json'||path==='/api/image-index')return env.ASSETS.fetch(new Request(new URL('/data/image-index.json',url),request));
 if(path==='/api/coverage')return json(INDEX_META);
 if(path==='/api/catalog'){
 const q=(url.searchParams.get('q')||'').trim().toLowerCase(),category=url.searchParams.get('category')||'',sort=url.searchParams.get('sort')||'newest';
 let list=SOURCE_INDEX.filter(p=>p.img&&(!q||[p.name,p.id,p.path].some(v=>String(v||'').toLowerCase().includes(q)))&&(!category||category==='0'||String(p.category)===category));
 if(sort==='low')list.sort((a,b)=>a.price-b.price);else if(sort==='high')list.sort((a,b)=>b.price-a.price);else list.sort((a,b)=>Number(b.path.match(/(\d+)\.html/)?.[1]||0)-Number(a.path.match(/(\d+)\.html/)?.[1]||0));
 const size=18,total=list.length,pages=Math.max(1,Math.ceil(total/size)),page=Math.min(pages,Math.max(1,Math.floor(Number(url.searchParams.get('page'))||1)));
 return json({items:list.slice((page-1)*size,page*size),page,pages,total,catalogTotal:SOURCE_INDEX.length,updatedAt:INDEX_META.updatedAt});
 }
 if(path==='/api/variants'){
 const source=url.searchParams.get('path'),p=SOURCE_INDEX.find(p=>p.path===source);
 if(!p?.id)return json({available:false,groups:[],skus:[]});
 try{return json(await variants(p.id))}catch{return json({available:false,groups:[],skus:[],retry:true},200)}
 }
 if(path==='/api/product'){
 const source=url.searchParams.get('path');if(!source||!safePath(source)||!source.endsWith('.html'))return json({error:'Invalid path'},400);
 const snapshot=SOURCE_INDEX.find(p=>p.path===source);let p;
 try{p=parseProduct(await upstream(source));if(!p.id)throw Error();p={...snapshot,...p,cached:false};}catch(e){if(!snapshot)throw e;p={...snapshot,cached:true};}
 return json({...p,qc:p.qc||[],agents:agentLinks(p.id),updatedAt:p.cached?INDEX_META.updatedAt:new Date().toISOString()});
 }
 if(path==='/image'){
 const source=url.searchParams.get('src')||'';if((!/^\/(uploads|media)\/[A-Za-z0-9_./%?=\-]+$/.test(source)&&!allowedImage(source))||source.includes('..'))return new Response('Invalid image',{status:400});
 const r=await fetch(source.startsWith('https:')?source:ORIGIN+source,{redirect:'manual',signal:AbortSignal.timeout(15000)});if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))return new Response('Image unavailable',{status:404});
 return new Response(r.body,{headers:{'content-type':r.headers.get('content-type'),'cache-control':'public,max-age=86400','x-content-type-options':'nosniff'}});
 }
 if(path==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /image?\nSitemap: https://cnshopperbrowse.com/sitemap.xml\n',{headers:{'content-type':'text/plain'}});
 if(path==='/favicon.ico'){return Response.redirect('https://www.cnshopper.com/favicon.ico',302);}
 if(path.startsWith('/api/'))return json({error:'Not found'},404);
 const match=path.match(/^\/(en|de|fr|es|it|pt)(?:\/(.*))?$/),route=match?.[2]?.replace(/\/$/,'')||'',lang=match?.[1];
 const product=route==='product'?SOURCE_INDEX.find(p=>p.path===url.searchParams.get('path')):null;
 if(!lang||(!staticRoutes.includes(route)&&route!=='saved'&&!(route==='product'&&product)))return new Response('Page not found',{status:404,headers:{'content-type':'text/plain','x-robots-tag':'noindex'}});
 const query=product?'?path='+encodeURIComponent(product.path):'';
 const canonical=SITE+'/'+lang+'/'+route+query;
 const head='<link rel="canonical" href="'+xml(canonical)+'">'+LANGS.map(l=>'<link rel="alternate" hreflang="'+l+'" href="'+xml(SITE+'/'+l+'/'+route+query)+'">').join('')+'<link rel="alternate" hreflang="x-default" href="'+xml(SITE+'/en/'+route+query)+'">';
 let html=PAGE.replace('<html lang="en">','<html lang="'+lang+'">').replace('</head>',head+'</head>');
 if(product)html=html.replace(/<title>.*?<\/title>/,'<title>'+xml(product.name)+' | CNShopper</title>');
 return new Response(html,{headers:{'content-type':'text/html; charset=utf-8','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'}});
 }catch(e){return json({error:'The catalog is temporarily unavailable. Please try again.'},502);}
}};
export {parseCatalog,parseProduct};
