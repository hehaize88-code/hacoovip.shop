const register='https://www.superbuy.com/en/page/register/'
const logo='https://cdn.superbuy.com/starit-superbuy/dist/img/homepage-v2/brand/logo-artwork.svg'
const favicon='https://cdn.superbuy.com/starit-superbuy/dist/img/favicon/favicon.svg'
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const legacy=['en','fr','de','es','it','id','zh-CN']
const base=l=>l==='en'?'/':'/'+l.toLowerCase()+'/'
const code=s=>Object.keys(languages).find(l=>l.toLowerCase()===s?.toLowerCase())
const opts=(pairs,value)=>pairs.map(([k,v])=>'<option value="'+esc(k)+'"'+(k===value?' selected':'')+'>'+esc(v)+'</option>').join('')
function header(l,u,route){
 const t=copy[l],b=base(l)
 return '<header><div class="wrap"><a class="brand" href="'+b+'"><img src="'+logo+'" alt="Superbuy"></a><nav><a href="'+b+'spreadsheet/">'+t.sheet+'</a><a href="'+b+'image-search/">'+t.imgSearch+'</a><a href="'+(legacy.includes(l)?b:'/')+'articles/">Articles</a></nav><div class="actions"><select aria-label="'+esc(t.language)+'" onchange="location.href=this.value">'+opts(Object.entries(languages).map(([k,v])=>[base(k)+route+u.search,v]),b+route+u.search)+'</select><select id="currency" aria-label="'+esc(t.currency)+'">'+opts(currencies.map(k=>[k,k]),'USD')+'</select><a class="btn" href="'+register+'">'+t.register+'</a></div></div></header>'
}
function search(l,q){
 const t=copy[l],b=base(l)
 return '<form class="search" action="'+b+'spreadsheet/"><input type="search" name="q" aria-label="'+esc(t.search)+'" placeholder="'+esc(t.placeholder)+'" value="'+esc(q)+'"><a class="camera" href="'+b+'image-search/" aria-label="'+esc(t.imgSearch)+'" title="'+esc(t.imgSearch)+'">📷</a><button>'+t.search+'</button></form>'
}
const analytics='<script async src="https://www.googletagmanager.com/gtag/js?id=G-P91GYCQQPL"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-P91GYCQQPL")</script>'
function page(l,u,route,title,body,status=200){
 const href=esc(u.origin+base(l)+route+u.search)
 const alternates=Object.keys(languages).map(k=>'<link rel="alternate" hreflang="'+k+'" href="'+esc(u.origin+base(k)+route+u.search)+'">').join('')
 const t=copy[l]
 return new Response('<!doctype html><html lang="'+l+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | Superbuy Spreadsheet</title><meta name="description" content="'+esc(t.intro)+'"><link rel="canonical" href="'+href+'">'+alternates+'<link rel="alternate" hreflang="x-default" href="'+esc(u.origin+'/'+route+u.search)+'"><link rel="icon" href="'+favicon+'"><style>'+css+'</style>'+analytics+'</head><body>'+header(l,u,route)+'<main class="wrap">'+body+'</main><footer class="wrap foot"><a href="'+(legacy.includes(l)?base(l):'/')+'shipping/">Shipping</a><a href="'+(legacy.includes(l)?base(l):'/')+'qc-guide/">QC Guide</a><a href="'+(legacy.includes(l)?base(l):'/')+'faq/">FAQ</a><a href="https://www.exchangerate-api.com/">ExchangeRate-API · <span data-rate-date></span></a></footer><script type="application/json" id="rate-seed">'+JSON.stringify(seed)+'</script><script>('+moneyScript.toString()+')()</script></body></html>',{status,headers:{'content-type':'text/html;charset=utf-8','cache-control':status===200?'public,max-age=60':'no-store',...(status!==200||u.search?{'x-robots-tag':'noindex,follow'}:{})}})
}
async function listing(u,l,route){
 const t=copy[l],b=base(l),q=(u.searchParams.get('q')||'').trim().slice(0,120),sort=u.searchParams.get('sort')||'new',n=Math.max(1,Math.min(25000,parseInt(u.searchParams.get('page'))||1))
 const sorts={new:['new','desc'],popular:['click','desc'],low:['price','asc'],high:['price','desc']}
 const [key,direction]=Object.hasOwn(sorts,sort)?sorts[sort]:sorts.new
 const cat=u.searchParams.get('cat')||''
 let path=defaultList, categories
 if(cat){
  const main=await read(defaultList);categories=categoriesFrom(main)
  if(!categories.some(c=>c.id===cat))return page(l,u,route,t.empty,'<h1>'+t.empty+'</h1>',404)
  const group=await read('/'+cat+'/')
  const tid=group.match(/c=Lists(?:&|&amp;)a=index(?:&|&amp;)tid=(\d+)/)?.[1]
  if(tid)path=path.replace('tid=1&','tid='+tid+'&')
 }
 if(q)path='/search.html?'+new URLSearchParams({channelid:2,keywords:sourceQuery(q,l)})
 const src=new URL(path,'https://www.cnfanshp.com')
 src.searchParams.set('sort',key);src.searchParams.set('sort_asc',direction);src.searchParams.set('page',n)
 const html=await read(src.pathname+src.search),items=parseCards(html),home=!route
 const links=(p)=>{const next=new URLSearchParams(u.search);for(const [k,v] of Object.entries(p))if(v)next.set(k,v);else next.delete(k);return esc(b+'spreadsheet/?'+next)}
 const cards=(home?items.slice(0,8):items).map(p=>'<div class="cardset"><a class="card" href="'+b+'product/'+p.id+'/"><div class="photo"><img loading="lazy" src="'+esc(p.image)+'" alt="'+esc(localName(p.name,l))+'"></div><h3>'+esc(localName(p.name,l))+'</h3>'+priceTag(p.price,l)+'</a><a class="qc" href="'+b+'photos/'+p.id+'/">'+esc(t.gallery)+' / QC</a></div>').join('')
 const title=home?t.hero:t.sheet
 const intro=home?(l==='en'?'Search Superbuy finds by product name or photo. Compare prices, review seller and QC photos where available, and open the matching Weidian item on Superbuy.':t.intro):t.browse
 const filters='<div class="chips">'+(categories||categoriesFrom(html)).filter(c=>!['allproducts','all'].includes(c.id.toLowerCase())).map(c=>'<a href="'+links({cat:c.id,q:'',page:''})+'">'+esc(localName(c.name,l))+'</a>').join('')+'</div>'
 const sortBar='<div class="catalog-menu sort">'+[['new',t.latest],['popular','★'],['low',t.price+' ↑'],['high',t.price+' ↓']].map(([k,v])=>'<a href="'+links({sort:k,page:''})+'">'+esc(v)+'</a>').join('')+'</div>'
 const pager='<div class="pager">'+(n>1?'<a href="'+links({page:n-1})+'">'+t.prev+'</a>':'')+(html.includes('>下一页<')||items.length===60?'<a href="'+links({page:n+1})+'">'+t.next+'</a>':'')+'</div>'
 return page(l,u,route,title,'<section class="listing"><h1>'+esc(title)+'</h1><p>'+esc(intro)+'</p>'+search(l,q)+filters+sortBar+'<div class="cards">'+cards+'</div>'+(!items.length?'<p>'+t.empty+'</p>':'')+(home?'<a class="btn" href="'+b+'spreadsheet/">'+t.browse+'</a>':pager)+'</section>')
}
function official(d){
 if(!/^\d+$/.test(d.marketplaceId))return null
 const original=d.agents.find(a=>a.name==='Superbuy')
 if(original)return original.url
 return 'https://www.superbuy.com/en/page/buy/?'+new URLSearchParams({url:d.weidian})
}
async function serve(request,env){
 const u=new URL(request.url),parts=u.pathname.split('/').filter(Boolean),prefix=code(parts[0]),l=prefix||'en',t=copy[l]
 if(prefix)parts.shift()
 const route=parts.join('/')+(parts.length?'/':'')
 if(u.pathname==='/exchange-rates.json')return ratesResponse()
 if(u.pathname.startsWith('/visual-api/'))return visualApi(request)
 if(u.pathname==='/favicon.ico'||u.pathname==='/favicon.svg')return Response.redirect(favicon,302)
 try{
  if(!route||['spreadsheet/','finds/','categories/'].includes(route))return await listing(u,l,route)
  if(route==='image-search/')return page(l,u,route,t.imgSearch,visualView({lang:l,t,escape:esc,base:base(l)}))
  if(/^(?:product|photos)\/\d{1,8}\/$/.test(route)){
   const d=await detail(parts[1]),buy=official(d)
   if(parts[0]==='product'&&buy)return new Response(null,{status:302,headers:{location:buy,'cache-control':'public,max-age=120'}})
   const gallery=(title,images)=>images.length?'<h2>'+esc(title)+'</h2><div class="cards">'+images.map(src=>'<img loading="lazy" style="width:100%" src="'+esc(src)+'" alt="'+esc(title)+'">').join('')+'</div>':''
   return page(l,u,route,localName(d.name,l),'<h1>'+esc(localName(d.name,l))+'</h1>'+(buy?'<a class="btn" href="'+esc(buy)+'">'+t.buy+'</a>':'')+gallery(t.gallery,d.images)+gallery(t.detailPhotos,d.media.details)+gallery(t.styles,d.media.styles.map(s=>s.image))+(gallery(t.qc,d.media.qc)||'<p>'+t.noQc+'</p>'))
  }
  const asset=await env.ASSETS.fetch(request)
  if(!asset.headers.get('content-type')?.includes('text/html'))return asset
  return new HTMLRewriter().on('a.nav-cta, nav[aria-label="Mobile navigation"] a:last-child',{element(el){el.setAttribute('href',register);el.setInnerContent(t.register)}}).on('a.brand img',{element(el){el.setAttribute('src',logo)}}).on('link[rel~="icon"]',{element(el){el.setAttribute('href',favicon)}}).on('a[href]',{element(el){const h=el.getAttribute('href')||'',m=h.match(/^https?:\/\/(?:www\.)?cnfanshp\.com\/AllProducts\/(\d+)\.html$/i);if(m)el.setAttribute('href',base(l)+'product/'+m[1]+'/');else if(/^https?:\/\/(www\.)?cnfanshp\.com\//.test(h))el.setAttribute('href',base(l)+'spreadsheet/')}}).transform(asset)
 }catch(error){console.error('Catalog request failed',String(error));return page(l,u,route,t.error,'<h1>'+t.error+'</h1><a href="'+esc(u.pathname+u.search)+'">'+t.retry+'</a>',503)}
}
export default {fetch:serve}
