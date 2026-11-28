import {localOption} from './i18n.mjs'



export function productView(d,{t,lang,currencySelect=()=>'',optionLabel=name=>localOption(name,lang),image,escape:e,localName,link,price,matched}){
 const productName=localName(d.name,lang)
 const media=d.media||{gallery:d.images||[],details:[],qc:[]}
 const seller=d.seller||{groups:[],skus:[]}
 const groups=seller.groups.filter(g=>g.values.length).sort((a,b)=>Number(b.values.some(v=>v.image))-Number(a.values.some(v=>v.image)))
 const validPhotos=new Set([...media.gallery,...media.details,...media.qc,...(media.styles||[]).map(style=>style.image),...(seller.sellerGallery||[]),...groups.flatMap(g=>g.values.map(v=>v.image)),...seller.skus.map(s=>s.image)])
 const first=matched&&validPhotos.has(matched)?matched:d.image||media.gallery[0]||''
 const details=[...new Set(media.details)].filter(x=>!media.qc.includes(x))
 const film=media.gallery.length>1?'<div class="pd-film">'+media.gallery.map((src,i)=>'<button type="button" class="pd-thumb" data-gallery-photo="'+e(src)+'" aria-pressed="'+(src===first)+'" aria-label="'+e(t.gallery+' '+(i+1))+'">'+image(src,t.gallery+' '+(i+1))+'</button>').join('')+'</div>':''
 const thumb=(src,caption,i,styleUrl='')=>'<button aria-pressed="'+(src===first)+'" title="'+e(caption)+'" type="button" class="pd-thumb" data-style-url="'+e(styleUrl)+'" data-photo="'+e(src)+'" aria-label="'+e(caption+' '+(i+1))+'">'+image(src,caption+' '+(i+1))+'</button>'
 const gallery=(label,imgs,empty)=>'<section class="pd-media"><h2>'+e(label)+' <small>'+imgs.length+'</small></h2>'+(imgs.length?'<div class="pd-photos">'+imgs.map((src,i)=>'<a href="'+e(src)+'" target="_blank" rel="noopener noreferrer">'+image(src,label+' '+(i+1))+'</a>').join('')+'</div>':'<p>'+e(empty)+'</p>')+'</section>'
 const smallImage=href=>{
   const url=new URL(href)
   url.searchParams.set('w','140')
   url.searchParams.set('h','140')
   url.searchParams.set('cp','1')
   return url.href
 }
 const choices=groups.map(g=>{
   const legend=optionLabel(g.name)||t.option
   const pictureGroup=g.values.some(v=>v.image)
   return '<fieldset class="pd-field" data-option-field><legend>'+e(legend)+' <span class="pd-selected"></span></legend><div class="pd-choices'+(pictureGroup?' pd-scroll':'')+'"'+(pictureGroup?' tabindex="0"':'')+'>'+g.values.map(v=>{
     const text=optionLabel(v.name)||t.option+' '+v.id
     return '<button type="button" class="'+(v.image?'pd-style-tile':'pd-option')+'" data-option="'+e(v.id)+'" data-picture="'+e(v.image)+'" title="'+e(text)+'" aria-label="'+e(legend+' '+text)+'" aria-pressed="false">'+(v.image?image(smallImage(v.image),text):e(text))+'</button>'
   }).join('')+'</div></fieldset>'
 }).join('')
 const alternatives=(d.agents||[]).filter(a=>a.name!=='USFans');
 const agents=alternatives.length?'<details class="pd-agent"><summary>'+e(t.agents)+'</summary><div class="pd-agent-list">'+alternatives.map(a=>'<a href="'+e(a.url)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(a.name)+'</a>').join('')+'</div></details>':''
 const copy=d.weidian?'<button type="button" class="pd-copy" data-copy-item="'+e(d.weidian)+'" data-item-text="'+e(t.copyItem)+'" data-style-text="'+e(t.copyStyle)+'" data-success="'+e(t.copied)+'" data-manual="'+e(t.copyManually)+'">'+e(t.copyItem)+'</button>':''
 const state=JSON.stringify({gallery:media.gallery,skus:seller.skus,hint:t.skuChoice,photo:matched&&validPhotos.has(matched)?matched:null}).replace(/</g,'\\u003c')
 const fallback=d.weidian?'<a href="'+e(d.weidian)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(t.chooseOptions)+' · Weidian</a>':''
 const hasStyles=choices||media.styles?.length
 const tiles=choices||(media.styles||[]).map((v,i)=>thumb(v.image,v.name?optionLabel(v.name):t.styles,i,v.url)).join('')
 const options=hasStyles?'<section class="pd-options"><h2>'+e(t.styles)+'</h2><div class="pd-tiles'+(choices?'':' pd-scroll')+'"'+(choices?'':' tabindex="0"')+'>'+tiles+'</div></section>':fallback?'<div class="pd-options"><p>'+fallback+'</p></div>':''
 const galleryIndex=media.gallery.indexOf(first)
 const hero=first?`<a class="pd-main" href="${e(first)}" target="_blank" rel="noopener noreferrer">
   ${image(first,productName,false)}<output${galleryIndex<0?' hidden':''}>${galleryIndex+1} / ${media.gallery.length}</output>
 </a>`:''
 const id=d.marketplaceId?`<div class="pd-id">${e(t.productId)} <b>${e(d.marketplaceId)}</b></div>`:''
 const buy=d.buy?`<a class="btn pd-buy" href="${e(d.buy)}" target="_blank" rel="nofollow noopener noreferrer">${e(t.buy)}</a>`:''
 return `<article class="pd" data-product-view>
   <a class="pd-back" href="${link()}">${e(t.back)} · ${e(t.sheet)}</a>
   <div class="pd-columns">
     <figure><figcaption>${e(t.gallery)} <small>${media.gallery.length}</small></figcaption>${hero}${film}</figure>
     <section class="pd-purchase">
       <h1>${e(productName)}</h1>${id}
       <div class="pd-price">${price(d.price)} <small data-original-cny>${e(d.price)} CNY</small> ${currencySelect('product-currency')}</div>
       ${buy}<div class="pd-actions">${agents}${copy}</div>
       <div class="pd-status" role="status" aria-live="polite"></div>${options}
     </section>
   </div>
   ${gallery(t.qc,media.qc,t.noQc)}${details.length?gallery(t.detailPhotos,details,''):''}
   <script type="application/json" class="pd-model">${state}</script><script>(${bindProductSource})()</script>
 </article>`
}
