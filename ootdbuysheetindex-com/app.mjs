import {catalog,detail} from './source.mjs'
import {languages,copy,localName,sourceQuery} from './i18n.mjs'
import {css} from './style.mjs'
const escape=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]))
const menuLanguages='en de fr es it nl pt pl ro sv zh-CN da fi el cs hu bg sk hr ja ko vi th id'.split(' ')
const register='https://ootdbuy.com/register'
const icon='<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg>'
function bindLanguagePicker(){
 const picker=document.querySelector('.locale-picker')
 const summary=picker.querySelector('summary')
 document.addEventListener('pointerdown',event=>{if(picker.open&&!picker.contains(event.target))picker.open=false})
 picker.addEventListener('keydown',event=>{if(event.key==='Escape'){picker.open=false;summary.focus()}})
}
async function render(request){
 const url=new URL(request.url), parts=url.pathname.split('/').filter(Boolean)
 if(url.origin!=='https://ootdbuysheetindex.com')return Response.redirect('https://ootdbuysheetindex.com'+url.pathname+url.search,308)
 if(url.pathname==='/exchange-rates.json')return ratesResponse()
 const asset={'/brand/logo.png':'logo.png','/favicon.ico':'favicon.ico'}[url.pathname]
 if(asset)return new Response(Uint8Array.from(atob(brandAssets[asset]),x=>x.charCodeAt(0)),{headers:{'Content-Type':asset==='logo.png'?'image/png':'image/x-icon','Cache-Control':'public,max-age=86400'}})
 const primary='https://ootdbuysheetindex.com'
 if(url.pathname==='/')return Response.redirect(primary+'/en/'+url.search,308)
 const languageCodes=Object.keys(languages)
 const sitemapPath=lang=>'/sitemap-'+lang+'.xml'
 if(url.pathname==='/robots.txt'){
  const maps=['/sitemap.xml',...languageCodes.filter(lang=>lang!=='en').map(sitemapPath)]
  return new Response('User-agent: *\nAllow: /\n'+maps.map(path=>'Sitemap: '+primary+path).join('\n')+'\n',{headers:{'content-type':'text/plain; charset=utf-8'}})
 }
 const map=url.pathname.match(/^\/sitemap-([a-zA-Z-]+)\.xml$/)
 if(url.pathname==='/sitemap.xml'||(map&&Object.hasOwn(languages,map[1]))){
  const lang=map?map[1]:'en'
  const sections=['','spreadsheet/','categories/','image-search/','faq/']
  const paths=(map?[lang]:languageCodes).flatMap(code=>sections.map(section=>'/'+code+'/'+section))
  for(const id of Object.keys(imageNames))paths.push('/'+lang+'/product/'+id+'/')
  const rows=paths.map(path=>'<url><loc>'+primary+path+'</loc></url>').join('')
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+rows+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=3600'}})
 }
 if(url.pathname.startsWith('/visual-api/'))return visualApi(request)
 const lang=Object.hasOwn(languages,parts[0])?parts[0]:'en', t=copy[lang]
 const route=parts[1]||'home',base='/'+lang+'/', q=(url.searchParams.get('q')||'').slice(0,120),cat=url.searchParams.get('cat')||'',page=Math.max(1,Math.min(10000,parseInt(url.searchParams.get('page'))||1))
 const path=(v={})=>{let p=new URLSearchParams();for(const [k,a] of Object.entries(v))if(a)p.set(k,a);return base+'spreadsheet/'+(p.size?'?'+p:'')}
 const link=v=>escape(path(v)),idlink=id=>base+'product/'+encodeURIComponent(id)+'/'
 const localizedPath=k=>{
  const next=new URLSearchParams(url.search)
  if(q)next.set('q',localName(sourceQuery(q,lang),k))
  const suffix=next.toString()
  return '/'+k+'/'+parts.slice(1).join('/')+(parts.length>1?'/':'')+(suffix?'?'+suffix:'')
 }
 const languageLinks=menuLanguages.map(code=>'<a lang="'+code+'" hreflang="'+code+'" href="'+escape(localizedPath(code))+'"'+(code===lang?' aria-current="true"':'')+'>'+escape(languages[code])+'</a>').join('')
 const langNav='<details class="locale-picker"><summary aria-label="'+escape(t.language+' · '+languages[lang])+'"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><span>'+escape(languages[lang])+'</span></summary><div class="locale-list">'+languageLinks+'</div></details>'
 const image=(src,name,lazy=true)=>src?'<img '+(lazy?'loading="lazy"':'fetchpriority="high"')+' referrerpolicy="no-referrer" src="'+escape(src)+'" alt="'+escape(name)+'">':''
 const camera='<a class="camera" href="'+base+'image-search/" aria-label="'+escape(t.imgSearch)+'" title="'+escape(t.imgSearch)+'"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="3.5"/></svg></a>'
 const search='<form class="search" action="'+base+'spreadsheet/">'+icon+'<input type="search" name="q" aria-label="'+escape(t.search)+'" placeholder="'+escape(t.placeholder)+'" value="'+escape(q)+'">'+camera+'<button>'+escape(t.search)+'</button></form>'
 const faq='<section class="faq" id="faq"><h2>'+t.faq+'</h2>'+[1,2,3].map(i=>'<details><summary>'+t['q'+i]+'</summary><p>'+t['a'+i]+'</p></details>').join('')+'</section>'
 let title=t.hero,body,status=200
 try{
 if(!Object.hasOwn(languages,parts[0])||parts.length>(route==='product'?3:2)||parts[1]==='home'){status=404;body='<h1>404</h1>'}
 else if(route==='product'&&/^\d+$/.test(parts[2])){
 const d=await detail(parts[2]);if(!d)throw Error('missing')
 title=(await pageNames([d.name],lang)).get(d.name)
 body=productView(d,{t,lang,image,escape,localName:()=>title,link,matched:url.searchParams.get('photo'),price:n=>priceTag(n,lang)})
 }else if(route==='image-search'){title=t.imgSearch;body=visualView({lang,t,escape,base})
 }else if(['home','spreadsheet','categories','faq'].includes(route)){
 if(route==='faq'){title=t.faq;body=faq}else{
 const d=await catalog({page,cat,q:sourceQuery(q,lang)}),items=d.items,labels=await pageNames(items.map(p=>p.name),lang),name=p=>labels.get(p.name)
 const chips='<div class="chips"><a class="'+(!cat?'active':'')+'" href="'+link()+'">'+t.all+'</a>'+d.categories.filter(c=>!['all','allproducts'].includes(String(c.id).toLowerCase())).map(c=>'<a class="'+(cat===String(c.id)?'active':'')+'" href="'+link({cat:c.id})+'">'+escape(localName(c.name,lang))+'</a>').join('')+'</div>'
 const cards=(list)=>'<div class="cards">'+list.map(p=>'<a class="card" href="'+idlink(p.id)+'"><div class="photo">'+image(p.image,name(p))+'</div><h3>'+escape(name(p))+'</h3>'+(p.price?'<span class="cost">'+t.price+' · '+priceTag(p.price,lang)+'</span>':'')+'</a>').join('')+'</div>'
 if(route==='home'){
 const chosen=[],seen=new Set;for(const p of items){const key=p.name.toLowerCase().replace(/[\d\s-]+$/g,'');if(p.image&&!seen.has(key)){chosen.push(p);seen.add(key)}if(chosen.length===3)break}for(const p of items){if(chosen.length>=3)break;if(p.image&&!chosen.includes(p))chosen.push(p)}
 body='<section class="hero"><div class="herotext"><h1>'+t.hero+'</h1><p>'+t.intro+'</p>'+search+'</div><div class="heroart">'+chosen.map((p,i)=>'<a href="'+idlink(p.id)+'">'+image(p.image,name(p),i>0)+'<small>'+escape(name(p))+'</small></a>').join('')+'</div></section><section><div class="sectionhead"><h2>'+t.latest+'</h2><a href="'+link()+'">'+t.browse+'</a></div><details class="catmenu"><summary>'+t.categories+'</summary>'+chips+'</details>'+cards(items.slice(0,8))+'</section>'+faq
 }else{
 title=route==='categories'?t.categories:t.sheet
 body='<section class="listing"><h1>'+title+'</h1><p>'+escape(t.all)+' · '+new Intl.NumberFormat(lang).format(d.total)+'</p>'+search+(route==='categories'?chips:'<details class="catmenu"><summary>'+t.categories+'</summary>'+chips+'</details>')+(items.length?cards(items):'<p class="notice">'+t.empty+'</p>')+'<div class="pager">'+(page>1?'<a href="'+link({cat,q,page:page-1})+'">'+t.prev+'</a>':'')+'<span>'+t.page+' '+page+' / '+d.pages+'</span><form action="'+base+'spreadsheet/">'+(cat?'<input type="hidden" name="cat" value="'+escape(cat)+'">':'')+(q?'<input type="hidden" name="q" value="'+escape(q)+'">':'')+'<input aria-label="'+t.page+'" type="number" name="page" min="1" max="'+d.pages+'" value="'+page+'"><button aria-label="'+t.page+'">↵</button></form>'+(page<d.pages?'<a href="'+link({cat,q,page:page+1})+'">'+t.next+'</a>':'')+'</div></section>'
 }}
 }else{status=404;body='<section class="notice"><h1>404</h1><a href="'+base+'">'+t.home+'</a></section>'}
 }catch(e){console.error('catalog response:',String(e).slice(0,150));status=e.message==='missing'?404:503;body='<section class="notice"><h1>'+t.error+'</h1><a href="'+escape(url.pathname+url.search)+'">'+t.retry+'</a></section>'}
 const html='<!doctype html><html lang="'+lang+'"><meta charset="utf-8"><script async src="https://www.googletagmanager.com/gtag/js?id=G-535FKDEEH6"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-535FKDEEH6");</script><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="/favicon.ico">'+(status===200?'<link rel="canonical" href="'+escape(primary+url.pathname+url.search)+'">':'<meta name="robots" content="noindex">')+'<title>'+escape(title)+' | OOTDBuy</title><style>'+css+'</style><header><div class="wrap"><a class="brand" href="'+base+'"><img src="/brand/logo.png" alt="OOTDBuy" width="142" height="34"></a><nav><a href="'+base+'">'+t.home+'</a><a href="'+link()+'">'+t.sheet+'</a><a href="'+base+'categories/">'+t.categories+'</a><a href="'+base+'image-search/">'+t.imgSearch+'</a><a href="'+base+'faq/">'+t.faq+'</a></nav><div class="actions">'+langNav+'<select class="language" id="currency" aria-label="'+escape(t.currency)+'">'+currencies.map(c=>'<option>'+c+'</option>').join('')+'</select><a class="btn" href="'+register+'">'+t.register+'</a></div></div></header><main class="wrap">'+body+'</main><footer class="wrap foot"><strong>'+escape(t.hero)+'</strong><a href="'+base+'faq/">'+t.faq+'</a><a href="https://www.exchangerate-api.com/">ExchangeRate-API · <span data-rate-date></span></a></footer><script type="application/json" id="rate-seed">'+JSON.stringify(seed)+'</script><script>('+bindLanguagePicker.toString()+')();('+moneyScript.toString()+')()</script></html>'
 return new Response(html,{status,headers:{'x-robots-tag':status===200?'index, follow':'noindex, follow','content-type':'text/html; charset=utf-8','cache-control':status===200?'public, max-age=60, s-maxage=300':'no-store'}})
}
export default {fetch:render}
