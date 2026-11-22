import {localOption} from './i18n.mjs'

function bindProduct(){
 const root=document.querySelector('[data-product-view]')
 if(!root)return
 const model=JSON.parse(root.querySelector('.pd-model').textContent)
 const main=root.querySelector('.pd-main img')
 const mainLink=root.querySelector('.pd-main')
 const copyButton=root.querySelector('[data-copy-item]')
 const status=root.querySelector('.pd-status')
 const cost=root.querySelector('[data-cny]')
 const listPrice=cost?.dataset.cny
 const fields=[...root.querySelectorAll('[data-option-field]')]
 const selected=new Map()
 let target=copyButton?.dataset.copyItem
 const setImage=src=>{if(src&&main){main.src=src;mainLink.href=src}}
 const incoming=new Set((new URLSearchParams(location.search).get('options')||'').split(',').slice(0,12))
 for(const field of fields){
   const values=[...field.querySelectorAll('[data-option]')]
   if(values.length===1)selected.set(field,values[0].dataset.option)
   const matching=values.filter(v=>v.dataset.picture&&v.dataset.picture===model.photo)
   if(matching.length===1)selected.set(field,matching[0].dataset.option)
   const restored=values.find(v=>incoming.has(v.dataset.option))
   if(restored&&model.skus.some(s=>s.attrs.includes(restored.dataset.option)&&[...selected].every(([f,id])=>f===field||s.attrs.includes(id)))){
     selected.set(field,restored.dataset.option)
     if(restored.dataset.picture)setImage(restored.dataset.picture)
   }
 }
 function update(){
   const chosen=[...selected.values()]
   for(const anchor of document.querySelectorAll('.locale-list a')){
     const targetUrl=new URL(anchor.href)
     if(chosen.length)targetUrl.searchParams.set('options',chosen.join(','))
     else targetUrl.searchParams.delete('options')
     anchor.href=targetUrl.href
   }
   const exact=chosen.length===fields.length&&model.skus.find(s=>s.attrs.length===chosen.length&&chosen.every(k=>s.attrs.includes(k)))
   for(const [index,field] of fields.entries()){
     const previous=fields.slice(0,index).map(f=>selected.get(f)).filter(Boolean)
     for(const b of field.querySelectorAll('[data-option]')){
       b.setAttribute('aria-pressed',String(selected.get(field)===b.dataset.option))
       b.disabled=!model.skus.some(s=>s.attrs.includes(b.dataset.option)&&previous.every(v=>s.attrs.includes(v)))
     }
     const label=field.querySelector('.pd-selected')
     label.textContent=[...field.querySelectorAll('[data-option]')].find(b=>b.dataset.option===selected.get(field))?.title||''
   }
   if(copyButton){
     target=copyButton.dataset.copyItem
     if(exact){
       const u=new URL(target)
       const choices=fields.map(f=>[...f.querySelectorAll('[data-option]')].find(b=>b.dataset.option===selected.get(f))?.title||'')
       const label=encodeURIComponent(choices.join(' / ')).replace(/_/g,'%5F')
       // Weidian's product client initializes its SKU picker from the fourth underscore-delimited hash field.
       u.hash='sku_'+u.searchParams.get('itemID')+'_'+label+'_'+exact.id
       target=u.href
     }
     copyButton.disabled=!!chosen.length&&!exact
     copyButton.textContent=chosen.length?copyButton.dataset.styleText:copyButton.dataset.itemText
   }
   if(cost){
     cost.dataset.cny=String(exact?.price??listPrice)
     window.dispatchEvent(new CustomEvent('currency-refresh'))
   }
   status.textContent=chosen.length&&!exact?model.hint:''
   if(exact?.image)setImage(exact.image)
 }
 root.addEventListener('click',async ev=>{
   const b=ev.target.closest('button')
   if(!b)return
   if(b.dataset.photo){
     setImage(b.dataset.photo)
     for(const thumb of root.querySelectorAll('[data-photo]'))thumb.setAttribute('aria-pressed',String(thumb===b))
     if(copyButton){target=b.dataset.styleUrl||copyButton.dataset.copyItem;copyButton.textContent=b.dataset.styleUrl?copyButton.dataset.styleText:copyButton.dataset.itemText}
     return
   }
   if(b.dataset.option){
     const field=b.closest('[data-option-field]')
     selected.set(field,b.dataset.option)
     for(const later of fields.slice(fields.indexOf(field)+1)){
       const pos=fields.indexOf(later)
       const needed=fields.slice(0,pos+1).map(f=>selected.get(f)).filter(Boolean)
       if(!model.skus.some(s=>needed.every(v=>s.attrs.includes(v))))selected.delete(later)
     }
     if(b.dataset.picture)setImage(b.dataset.picture)
     update()
   }
   if(b===copyButton&&target){
     try{await navigator.clipboard.writeText(target);status.textContent=copyButton.dataset.success}
     catch{const input=document.createElement('input');input.readOnly=true;input.value=target;input.setAttribute('aria-label',copyButton.dataset.manual);status.replaceChildren(document.createTextNode(copyButton.dataset.manual+' '),input);input.focus();input.select()}
   }
 })
 if(fields.length)update()
}

export function productView(d,{t,lang,image,escape:e,localName,link,price,matched}){
 const productName=localName(d.name,lang)
 const media=d.media||{gallery:d.images||[],details:[],qc:[]}
 const seller=d.seller||{groups:[],skus:[]}
 const groups=seller.groups.filter(g=>g.values.length).sort((a,b)=>Number(b.values.some(v=>v.image))-Number(a.values.some(v=>v.image)))
 const validPhotos=new Set([...media.gallery,...media.details,...media.qc,...(seller.sellerGallery||[]),...groups.flatMap(g=>g.values.map(v=>v.image)),...seller.skus.map(s=>s.image)])
 const first=matched&&validPhotos.has(matched)?matched:d.image||media.gallery[0]||''
 const details=[...new Set([...media.details,...media.gallery.slice(1)])].filter(x=>!media.qc.includes(x))
 const thumb=(src,caption,i,styleUrl='')=>'<button type="button" class="pd-thumb" data-style-url="'+e(styleUrl)+'" data-photo="'+e(src)+'" aria-label="'+e(caption+' '+(i+1))+'">'+image(src,caption+' '+(i+1))+'</button>'
 const gallery=(label,imgs,empty)=>'<section class="pd-media"><h2>'+e(label)+' <small>'+imgs.length+'</small></h2>'+(imgs.length?'<div class="pd-photos">'+imgs.map((src,i)=>'<a href="'+e(src)+'" target="_blank" rel="noopener noreferrer">'+image(src,label+' '+(i+1))+'</a>').join('')+'</div>':'<p>'+e(empty)+'</p>')+'</section>'
 const smallImage=href=>{
   const url=new URL(href)
   url.searchParams.set('w','140')
   url.searchParams.set('h','140')
   url.searchParams.set('cp','1')
   return url.href
 }
 const choices=groups.map(g=>{
   const legend=localOption(g.name,lang)||t.option
   return '<fieldset class="pd-field" data-option-field><legend>'+e(legend)+' <span class="pd-selected"></span></legend><div class="pd-choices">'+g.values.map(v=>{
     const text=localOption(v.name,lang)||t.option+' '+v.id
     return '<button type="button" class="'+(v.image?'pd-style-tile':'pd-option')+'" data-option="'+e(v.id)+'" data-picture="'+e(v.image)+'" title="'+e(text)+'" aria-label="'+e(legend+' '+text)+'" aria-pressed="false">'+(v.image?image(smallImage(v.image),text):e(text))+'</button>'
   }).join('')+'</div></fieldset>'
 }).join('')
 const alternatives=(d.agents||[]).filter(a=>a.name!=='EastMallBuy');
 const agents=alternatives.length?'<details class="pd-agent"><summary>'+e(t.agents)+'</summary><div class="pd-agent-list">'+alternatives.map(a=>'<a href="'+e(a.url)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(a.name)+'</a>').join('')+'</div></details>':''
 const copy=d.weidian?'<button type="button" class="pd-copy" data-copy-item="'+e(d.weidian)+'" data-item-text="'+e(t.copyItem)+'" data-style-text="'+e(t.copyStyle)+'" data-success="'+e(t.copied)+'" data-manual="'+e(t.copyManually)+'">'+e(t.copyItem)+'</button>':''
 const state=JSON.stringify({skus:seller.skus,hint:t.skuChoice,photo:matched&&validPhotos.has(matched)?matched:null}).replace(/</g,'\\u003c')
 const fallback=d.weidian?'<a href="'+e(d.weidian)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(t.chooseOptions)+' · Weidian</a>':''
 const hasStyles=choices||media.styles?.length
 const tiles=choices||(hasStyles?media.styles.map((v,i)=>thumb(v.image,t.styles,i,v.url)):media.gallery.map((v,i)=>thumb(v,t.gallery,i))).join('')
 return '<article class="pd" data-product-view><a class="pd-back" href="'+link()+'">'+e(t.back)+' · '+e(t.sheet)+'</a><div class="pd-columns"><figure><figcaption>'+e(t.gallery)+' <small>'+media.gallery.length+'</small></figcaption>'+(first?'<a class="pd-main" href="'+e(first)+'" target="_blank" rel="noopener noreferrer">'+image(first,productName,false)+'</a>':'')+'</figure><section class="pd-purchase"><h1>'+e(productName)+'</h1>'+(d.marketplaceId?'<div class="pd-id">'+e(t.productId)+' <b>'+e(d.marketplaceId)+'</b></div>':'')+'<div class="pd-price">'+price(d.price)+'</div>'+(d.buy?'<a class="btn pd-buy" href="'+e(d.buy)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(t.buy)+'</a>':'')+'<div class="pd-actions">'+agents+copy+'</div><div class="pd-status" role="status" aria-live="polite"></div><section class="pd-options"><h2>'+e(hasStyles?t.styles:t.gallery)+'</h2><div class="pd-tiles" tabindex="0">'+tiles+'</div>'+(!hasStyles&&fallback?'<p>'+fallback+'</p>':'')+'</section></section></div>'+gallery(t.qc,media.qc,t.noQc)+(details.length?gallery(t.detailPhotos,details,''):'')+'<script type="application/json" class="pd-model">'+state+'</script><script>('+bindProduct.toString()+')()</script></article>'
}
