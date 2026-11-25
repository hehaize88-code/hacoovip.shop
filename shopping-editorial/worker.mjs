const labels = {
 en:['Articles','Sources','Spreadsheet'],de:['Artikel','Quellen','Produkttabelle'],fr:['Articles','Sources','Tableau des produits'],es:['Artículos','Fuentes','Hoja de productos'],it:['Articoli','Fonti','Foglio prodotti'],nl:['Artikelen','Bronnen','Productlijst'],pt:['Artigos','Fontes','Planilha'],pl:['Artykuły','Źródła','Arkusz produktów'],ro:['Articole','Surse','Tabel de produse'],sv:['Artiklar','Källor','Produktlista'],zh:['文章','资料来源','商品表格'],'zh-CN':['文章','资料来源','商品表格'],da:['Artikler','Kilder','Produktliste'],fi:['Artikkelit','Lähteet','Tuotetaulukko'],el:['Άρθρα','Πηγές','Πίνακας προϊόντων'],cs:['Články','Zdroje','Tabulka produktů'],hu:['Cikkek','Források','Terméktáblázat'],bg:['Статии','Източници','Таблица с продукти'],sk:['Články','Zdroje','Tabuľka produktov'],hr:['Članci','Izvori','Tablica proizvoda'],ja:['記事','参考資料','商品一覧'],ko:['글','출처','상품 목록'],vi:['Bài viết','Nguồn','Danh sách sản phẩm'],th:['บทความ','แหล่งข้อมูล','รายการสินค้า'],id:['Artikel','Sumber','Daftar produk']
};
const css = '.editorial article p{margin:1em 0} .editorial{box-sizing:border-box;width:min(100% - 32px,780px);margin:32px auto 64px;color:#202724;font:17px/1.65 system-ui,sans-serif}.editorial h1,.editorial h2{line-height:1.18;text-wrap:balance}.editorial h1{font-size:clamp(30px,5vw,48px);margin:.65em 0}.editorial h2{font-size:clamp(21px,3vw,29px);margin:1.4em 0 .5em}.editorial details{border-block-end:1px solid #dce2dc;padding:14px 0}.editorial summary{font-weight:650;cursor:pointer}.editorial a,.ednav a{color:#205448;text-underline-offset:.18em}.ednav{max-width:1000px;margin:auto;padding:15px 16px;border-bottom:1px solid #dce2dc;display:flex;align-items:center;gap:16px;flex-wrap:wrap;font:600 15px/1.4 system-ui,sans-serif}.ednav a:first-child{font-size:20px}.ednav select{margin-inline-start:auto;max-width:140px}.editorial .editem{border-bottom:1px solid #dce2dc;padding-bottom:10px}.editorial .editem h2{font-size:22px}.editorial .editem p{margin:.4em 0}.editorial footer{margin-top:32px;font-size:14px}.editorial footer a{overflow-wrap:anywhere}.editorial p{overflow-wrap:break-word}@media(max-width:650px){.editorial{font-size:15px;margin:16px auto 32px}.ednav{gap:10px;font-size:13px}.editorial details{padding:9px 0}}';
function escapeMarkup(value){return String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);}
function structured(data){return '<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c')+'</script>';}
function faqSchema(items){return structured({'@type':'FAQPage',mainEntity:items.map(({q,a})=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});}
function textFields(page){
 if(Array.isArray(page.faq))return page.faq.flatMap(i=>[i.q,i.a]);
 if(Array.isArray(page.articles))return page.articles.flatMap(i=>[i.title,i.description]);
 return [page.title,page.description,...page.sections.flatMap(s=>[s.heading,...s.paragraphs])];
}
function translatedPage(source,lines){
 let i=0,t=()=>lines[i++];
 if(source.faq)return {faq:source.faq.map(q=>({...q,q:t(),a:t()}))};
 if(source.articles)return {articles:source.articles.map(a=>({...a,title:t(),description:t()}))};
 return {...source,title:t(),description:t(),sections:source.sections.map(s=>({heading:t(),paragraphs:s.paragraphs.map(t)}))};
}
async function googleLines(lines,lang){
 // Group whole fields. A lost boundary invalidates the batch so text cannot shift to another heading.
 const groups=[];let group=[],size=0;
 for(const line of lines){
  if(group.length&&size+line.length>2800){groups.push(group);group=[];size=0;}
  group.push(line);size+=line.length+1;
 }
 if(group.length)groups.push(group);
 const result=new Array(groups.length);
 let cursor=0;
 async function work(){while(cursor<groups.length){
  const index=cursor++,batch=groups[index];
  const params=new URLSearchParams({client:'gtx',sl:'en',tl:lang,dt:'t',q:batch.join('\n')});
  const res=await fetch('https://translate.googleapis.com/translate_a/single?'+params,{signal:AbortSignal.timeout(8000),redirect:'error'});
  if(!res.ok)throw Error('Translation unavailable');
  const json=await res.json(), translated=json[0].map(s=>s[0]||'').join('').trim().split(/\r?\n/).map(s=>s.trim());
  if(translated.length!==batch.length||translated.some(s=>!s))throw Error('Incomplete translation');
  result[index]=translated;
 }}
 await Promise.all(Array.from({length:Math.min(3,groups.length)},work));
 return result.flat();
}
export function withEditorial(original, config, content, local={}){
 const origin='https://'+config.host, codes=config.languages;
 const articleMap=new Map(content.articles.map(a=>[a.slug,a]));
 const pathFor=(lang,route)=>config.queryLocale?'/'+route+(lang==='en'?'':'?lang='+encodeURIComponent(lang)):'/'+lang+'/'+route;
 const htmlHeaders={'content-type':'text/html; charset=utf-8','cache-control':'public, max-age=180, s-maxage=3600'};
 const canonical=(lang,route)=>origin+pathFor(lang,route);
 async function localize(source,lang,key,ctx){
  if(lang==='en')return source;
  if(local[lang]?.[key])return translatedPage(source,local[lang][key]);
  const cache=globalThis.caches?.default, cacheKey=origin+'/__editorial-cache/'+config.revision+'/'+lang+'/'+key;
  const hit=await cache?.match(cacheKey);
  if(hit)return translatedPage(source,await hit.json());
  const lines=await googleLines(textFields(source),lang);
  if(cache){const put=cache.put(cacheKey,new Response(JSON.stringify(lines),{headers:{'Cache-Control':'public, max-age=2592000'}}));if(ctx?.waitUntil)ctx.waitUntil(put);else await put;}
  return translatedPage(source,lines);
 }
 const editorialRoutes=['articles/','faq/',...content.articles.map(a=>'articles/'+a.slug+'/')];
 const entries=()=>codes.flatMap(lang=>editorialRoutes.map(route=>'<url><loc>'+escapeMarkup(canonical(lang,route))+'</loc></url>')).join('');
 const xmlHeaders={'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'};
 const urlTag=s=>'<sitemap><loc>'+origin+s+'</loc></sitemap>';
 return {async fetch(request,env,ctx){
  const u=new URL(request.url);
  if(u.origin!==origin||!['GET','HEAD'].includes(request.method))return original.fetch(request,env,ctx);
  if(u.pathname==='/sitemap-editorial.xml')return new Response(request.method==='HEAD'?null:'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries()+'</urlset>',{headers:xmlHeaders});
  if(u.pathname==='/sitemap.xml'||u.pathname==='/robots.txt'){
   const old=await original.fetch(request,env,ctx);
   if(!old.ok||request.method==='HEAD')return old;
   const s=await old.text();
   // A plain urlset cannot link another sitemap. Its sibling is advertised in robots.txt.
   const result=u.pathname==='/robots.txt'?s.trimEnd()+'\nSitemap: '+origin+'/sitemap-editorial.xml\n':s.replace('</sitemapindex>',urlTag('/sitemap-editorial.xml')+'</sitemapindex>');
   const h=new Headers(old.headers);h.delete('content-length');h.delete('etag');return new Response(result,{headers:h});
  }
  const parts=u.pathname.split('/').filter(Boolean);
  const lang=config.queryLocale?u.searchParams.get('lang')||'en':parts.shift();
  if(!codes.includes(lang))return original.fetch(request,env,ctx);
  const [section,slug]=parts;
  if(!['articles','faq'].includes(section)||parts.length>2||(section==='faq'&&slug)||(slug&&!articleMap.has(slug)))return original.fetch(request,env,ctx);
  const route=section+'/'+(slug?slug+'/':'');
  if(u.pathname!==pathFor(lang,route).split('?')[0])return Response.redirect(canonical(lang,route),308);
  const key=slug||section, article=articleMap.get(slug), source=article||(section==='faq'?{faq:content.faq}:{articles:content.articles.map(({title,slug,description})=>({title,slug,description}))});
  let data;
  try{data=await localize(source,lang,key,ctx);}catch{
   // Keep the original FAQ / index available during a translation outage.
   const previous=await original.fetch(request,env,ctx);
   if(previous.ok)return previous;
   return new Response('<!doctype html><html lang="en"><meta name="robots" content="noindex"><a href="'+pathFor('en',route)+'">Read in English</a></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Retry-After':'120','Cache-Control':'no-store'}});
  }
  const [articles,sources,sheet]=labels[lang],e=escapeMarkup;
  const title=article?data.title:section==='faq'?'FAQ':articles;
  const schema=article?structured({'@type':'Article',headline:title,description:data.description,inLanguage:lang,mainEntityOfPage:canonical(lang,route),citation:data.sources.map(s=>s.url)}):section==='faq'?faqSchema(data.faq):'';
  const sourceLinks=list=>list.map(s=>'<li><a href="'+e(s.url)+'" lang="en">'+e(s.title)+'</a></li>').join('');
  const inside=article?'<article><h1>'+e(title)+'</h1><p>'+e(data.description)+'</p>'+data.sections.map(s=>'<section><h2>'+e(s.heading)+'</h2>'+s.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')+'</section>').join('')+'<footer><h2>'+e(sources)+'</h2><ul>'+sourceLinks(data.sources)+'</ul></footer></article>':section==='faq'?data.faq.map(f=>'<details><summary>'+e(f.q)+'</summary><p>'+e(f.a)+'</p></details>').join(''):data.articles.map(a=>'<section class="editem"><h2><a href="'+pathFor(lang,'articles/'+a.slug+'/')+'">'+e(a.title)+'</a></h2><p>'+e(a.description)+'</p></section>').join('');
  if(section==='faq'&&!config.noFaq||section==='articles'&&!slug&&config.oldArticles){
   const old=await original.fetch(request,env,ctx);
   if(old.ok&&old.headers.get('content-type')?.includes('text/html')){
    if(request.method==='HEAD')return old;
    const page=await old.text(), addition='<section class="editorial" aria-label="'+e(title)+'"><style>'+css+'</style>'+inside+'</section>'+schema;
    const end=page.lastIndexOf('</body>'), htmlEnd=page.lastIndexOf('</html>');
    const at=end>=0?end:htmlEnd>=0?htmlEnd:page.length;
    const headers=new Headers(old.headers);headers.delete('content-length');headers.delete('etag');
    return new Response(page.slice(0,at)+addition+page.slice(at),{headers});
   }
  }
  const nav='<header class="ednav"><a href="'+pathFor(lang,'')+'">'+e(config.brand)+'</a><a href="'+pathFor(lang,config.catalog+'/')+'">'+e(sheet)+'</a><a href="'+pathFor(lang,'articles/')+'">'+e(articles)+'</a><a href="'+pathFor(lang,'faq/')+'">FAQ</a><select aria-label="Language" onchange="location.href=this.value">'+codes.map(k=>'<option value="'+pathFor(k,route)+'"'+(k===lang?' selected':'')+'>'+e(new Intl.DisplayNames([k],{type:'language'}).of(k))+'</option>').join('')+'</select></header>';
  const head='<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="'+e(canonical(lang,route))+'">'+codes.map(k=>'<link rel="alternate" hreflang="'+k+'" href="'+e(canonical(k,route))+'">').join('')+'<link rel="alternate" hreflang="x-default" href="'+canonical('en',route)+'"><title>'+e(title)+' · '+e(config.brand)+'</title>'+(article?'<meta name="description" content="'+e(data.description)+'">':'')+'<style>'+css+'</style>'+config.analytics+schema;
  return new Response(request.method==='HEAD'?null:'<!doctype html><html lang="'+lang+'"><head>'+head+'</head><body>'+nav+'<main class="editorial">'+(article?'':'<h1>'+e(title)+'</h1>')+inside+'</main></body></html>',{headers:htmlHeaders});
 }};
}
