const byCatalog=new Map(records.map(r=>[r[0],r]))
const byMarket=new Map(records.map(r=>[r[1],r]))
const shortBuy=id=>'https://www.superbuy.com/en/page/buy/?'+new URLSearchParams({nTag:'Home-search',from:'search-input',url:'https://weidian.com/item.html?itemID='+id})
const register='https://www.superbuy.com/en/page/register/'
const logo='https://cdn.superbuy.com/starit-superbuy/dist/img/homepage-v2/brand/logo-artwork.svg'
const favicon='https://cdn.superbuy.com/starit-superbuy/dist/img/favicon/favicon.svg'
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const base=l=>l==='en'?'/':'/'+l.toLowerCase()+'/'
const code=s=>Object.keys(languages).find(l=>l.toLowerCase()===s?.toLowerCase())
const editorialLabels={en:['Articles','Shipping'],fr:['Articles','Livraison'],de:['Artikel','Versand'],es:['Artículos','Envío'],it:['Articoli','Spedizione'],id:['Artikel','Pengiriman'],'zh-CN':['文章','国际运费'],nl:['Artikelen','Verzending'],pt:['Artigos','Envio'],pl:['Artykuły','Wysyłka'],ro:['Articole','Livrare'],sv:['Artiklar','Frakt'],da:['Artikler','Fragt'],fi:['Artikkelit','Toimitus'],el:['Άρθρα','Αποστολή'],cs:['Články','Doprava'],hu:['Cikkek','Szállítás'],bg:['Статии','Доставка'],sk:['Články','Doprava'],hr:['Članci','Dostava'],ja:['記事','国際配送'],ko:['가이드','국제 배송'],vi:['Bài viết','Vận chuyển'],th:['บทความ','การจัดส่ง']}
const opts=(pairs,value)=>pairs.map(([k,v])=>'<option value="'+esc(k)+'"'+(k===value?' selected':'')+'>'+esc(v)+'</option>').join('')
function header(l,u,route){
 const t=copy[l],b=base(l)
 return '<header><div class="wrap"><a class="brand" href="'+b+'"><img src="'+logo+'" alt="Superbuy"></a><nav><a href="'+b+'spreadsheet/">'+t.sheet+'</a><a href="'+b+'image-search/">'+t.imgSearch+'</a><a href="'+b+'articles/">'+editorialLabels[l][0]+'</a></nav><div class="actions"><select aria-label="'+esc(t.language)+'" onchange="location.href=this.value">'+opts(Object.entries(languages).map(([k,v])=>[base(k)+route+u.search,v]),b+route+u.search)+'</select><select id="currency" aria-label="'+esc(t.currency)+'">'+opts(currencies.map(k=>[k,k]),'USD')+'</select><a class="btn" href="'+register+'">'+t.register+'</a></div></div></header>'
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
 const schema=route?'':'<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'Superbuy Spreadsheet',url:u.origin+'/',potentialAction:{'@type':'SearchAction',target:u.origin+base(l)+'spreadsheet/?q={search_term_string}','query-input':'required name=search_term_string'}})+'</script>'
 return new Response('<!doctype html><html lang="'+l+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+(title==='Superbuy Spreadsheet'?'Superbuy Spreadsheet | Finds, QC Photos &amp; Weidian Links':esc(title)+' | Superbuy Spreadsheet')+'</title><meta name="description" content="'+esc(t.intro)+'"><link rel="canonical" href="'+href+'">'+alternates+'<link rel="alternate" hreflang="x-default" href="'+esc(u.origin+'/'+route+u.search)+'"><link rel="icon" href="'+favicon+'"><style>'+css+'</style>'+schema+analytics+'</head><body>'+header(l,u,route)+'<main class="wrap">'+body+'</main><footer class="wrap foot"><a href="'+base(l)+'shipping/">'+editorialLabels[l][1]+'</a><a href="'+base(l)+'qc-guide/">'+esc(t.qc)+'</a><a href="'+base(l)+'faq/">'+esc(t.faq)+'</a><a href="https://www.exchangerate-api.com/">ExchangeRate-API · <span data-rate-date></span></a></footer><script type="application/json" id="rate-seed">'+JSON.stringify(seed)+'</script><script>('+moneyScript.toString()+')()</script></body></html>',{status,headers:{'content-type':'text/html;charset=utf-8','cache-control':status===200?'public,max-age=60':'no-store',...(status!==200||u.search?{'x-robots-tag':'noindex,follow'}:{})}})
}
const mobileSheetStyle=`<style>
 .sheet-mobile-pager{display:none}
 @media(max-width:767px){
  .sheet-list .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 10px}
  .sheet-list .sheet-other-part,.sheet-list .sheet-desktop-pager{display:none}
  .sheet-list .sheet-mobile-pager{display:flex;align-items:center;justify-content:center;gap:12px}
  .sheet-list .photo{aspect-ratio:auto;height:clamp(105px,19svh,200px)}
  .sheet-list .card h3{font-size:1rem;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .sheet-list .qc{padding:4px 0;font-size:.86rem}
  .sheet-list .chips{display:flex;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px}
  .sheet-list .chips a{flex:none}
  .sheet-list .sort{gap:6px 12px}
  .sheet-list h1{margin-bottom:8px}
 }
 </style>`
async function listing(u,l,route,env){
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
 const exact=/^\d+$/.test(q)?byMarket.get(q):undefined
 const html=exact?'':await read(src.pathname+src.search)
 const items=exact?[{id:exact[0],name:exact[2],price:exact[3],image:'https://www.cnfanshp.com'+exact[4]}]:parseCards(html),home=!route
 const compact=route==='spreadsheet/'
 const perPart=20
 const parts=Math.max(1,Math.ceil(items.length/perPart))
 const requestedPart=u.searchParams.get('part')
 const part=requestedPart==='last'?parts:Math.max(1,Math.min(parts,Number.parseInt(requestedPart,10)||1))
 const links=(p)=>{const next=new URLSearchParams(u.search);next.delete('part');for(const [k,v] of Object.entries(p))if(v)next.set(k,v);else next.delete(k);return esc(b+'spreadsheet/?'+next)}
 const buyPath=p=>{const id=byCatalog.get(p.id)?.[1];return /^\d+$/.test(id)?esc(shortBuy(id)):b+'product/'+p.id+'/'}
 const cards=(home?items.slice(0,8):items).map((p,i)=>'<div class="cardset'+(compact&&Math.floor(i/perPart)+1!==part?' sheet-other-part':'')+'"><a class="card" href="'+buyPath(p)+'"><div class="photo"><img loading="lazy" src="'+esc(p.image)+'" alt="'+esc(localName(p.name,l))+'"></div><h3>'+esc(localName(p.name,l))+'</h3>'+priceTag(p.price,l)+'</a><a class="qc" href="'+b+'photos/'+p.id+'/">'+esc(t.gallery)+' / QC</a></div>').join('')
 let guide=''
 if(home&&env.ASSETS){
  const asset=await env.ASSETS.fetch(new Request(new URL('/home-guides/'+l.toLowerCase()+'.json',u)))
  if(asset.ok && asset.headers.get('content-type')?.includes('json'))guide=(await asset.json()).sections
 }
 const title=home?t.hero:t.sheet
 const intro=home?(l==='en'?'Search Superbuy finds by product name or photo. Compare prices, review seller and QC photos where available, and open the matching Weidian item on Superbuy.':t.intro):t.browse
 const filters='<div class="chips">'+(categories||categoriesFrom(html)).filter(c=>!['allproducts','all'].includes(c.id.toLowerCase())).map(c=>'<a href="'+links({cat:c.id,q:'',page:''})+'">'+esc(localName(c.name,l))+'</a>').join('')+'</div>'
 const sortBar='<div class="catalog-menu sort">'+[['new',t.latest],['popular','★'],['low',t.price+' ↑'],['high',t.price+' ↓']].map(([k,v])=>'<a href="'+links({sort:k,page:''})+'">'+esc(v)+'</a>').join('')+'</div>'
 const hasNext=html.includes('>下一页<')||items.length===60
 const pageLink=(params,label)=>'<a href="'+links(params)+'">'+esc(label)+'</a>'
 const desktopPager='<div class="pager sheet-desktop-pager">'+(n>1?pageLink({page:n-1},t.prev):'')+(hasNext?pageLink({page:n+1},t.next):'')+'</div>'
 let pager=desktopPager
 if(compact){
  const prev=part>1?{page:n,part:part-1}:n>1?{page:n-1,part:'last'}:null
  const next=part<parts?{page:n,part:part+1}:hasNext?{page:n+1}:null
  if(prev||next){
   const number=new Intl.NumberFormat(l).format((n-1)*3+part)
   pager+='<div class="pager sheet-mobile-pager">'+(prev?pageLink(prev,t.prev):'')+'<span aria-current="page">'+number+'</span>'+(next?pageLink(next,t.next):'')+'</div>'
  }
 }
 return page(l,u,route,title,(compact?mobileSheetStyle:'')+'<section class="listing'+(compact?' sheet-list':'')+'"><h1>'+esc(title)+'</h1><p>'+esc(intro)+'</p>'+search(l,q)+filters+sortBar+'<div class="cards">'+cards+'</div>'+(!items.length?'<p>'+t.empty+'</p>':'')+(home?'<a class="btn" href="'+b+'spreadsheet/">'+t.browse+'</a>':pager)+'</section>'+guide)
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
  if(!route||['spreadsheet/','finds/','categories/'].includes(route))return await listing(u,l,route,env)
  if(route==='image-search/')return page(l,u,route,t.imgSearch,visualView({lang:l,t,escape:esc,base:base(l)}))
  if(/^(?:product|photos)\/\d{1,8}\/$/.test(route)){
   const d=await detail(parts[1]),buy=official(d)
   if(parts[0]==='product'&&buy)return new Response(null,{status:302,headers:{location:buy,'cache-control':'public,max-age=120'}})
   const gallery=(title,images)=>images.length?'<h2>'+esc(title)+'</h2><div class="cards">'+images.map(src=>'<img loading="lazy" style="width:100%" src="'+esc(src)+'" alt="'+esc(title)+'">').join('')+'</div>':''
   return page(l,u,route,localName(d.name,l),'<h1>'+esc(localName(d.name,l))+'</h1>'+(buy?'<a class="btn" href="'+esc(buy)+'">'+t.buy+'</a>':'')+gallery(t.gallery,d.images)+gallery(t.detailPhotos,d.media.details)+gallery(t.styles,d.media.styles.map(s=>s.image))+(gallery(t.qc,d.media.qc)||'<p>'+t.noQc+'</p>'))
  }
  return env.ASSETS.fetch(request)
 }catch(error){console.error('Catalog request failed',String(error));return page(l,u,route,t.error,'<h1>'+t.error+'</h1><a href="'+esc(u.pathname+u.search)+'">'+t.retry+'</a>',503)}
}
export default {fetch:serve}
