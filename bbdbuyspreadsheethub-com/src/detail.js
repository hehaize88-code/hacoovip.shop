const textEscape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
function attrs(tag) {
  const result = {};
  for (const m of tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) result[m[1].toLowerCase()] = (m[2] ?? m[3]).replace(/&amp;/g,'&');
  return result;
}
function itemLink(value,id) {
  try {
    const url = new URL(value,'https://cnfanshp.com');
    const item = url.searchParams.get('itemID') || url.searchParams.get('itemId');
    return url.protocol === 'https:' && /^(?:www\.)?weidian\.com$/.test(url.hostname) && url.pathname === '/item.html' && item === id ? url.href : '';
  } catch { return ''; }
}
function sourcePhoto(value) {
  if (!value) return '';
  try {
    const url = new URL(value,'https://cnfanshp.com');
    return /^https?:$/.test(url.protocol) && /^(?:www\.)?cnfanshp\.com$/.test(url.hostname) && url.pathname.startsWith('/uploads/') ? 'https://cnfanshp.com'+url.pathname+url.search : '';
  } catch { return ''; }
}
export function productImages(html) {
  const result = {gallery:[],details:[],qc:[],styles:[]};
  const id = html.match(/class="product-id">\s*ID:\s*(\d+)/i)?.[1];
  const body = html.split(/class=["']product-detail["']/)[1]?.split(/class=["']product-list["']/)[0] || '';
  const contexts = [];
  for (const match of body.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>/gi,'').matchAll(/<(\/?)([\w-]+)\b[^>]*>/g)) {
    const [tag,closing,type] = match;
    if (closing) {
      const index = contexts.map(c=>c.type).lastIndexOf(type);
      if(index>=0) contexts.length=index;
      continue;
    }
    const a = attrs(tag), parent=contexts.at(-1) || {};
    const marker = [a.class,a.id,a['data-role']].filter(Boolean).join(' ');
    let kind = parent.kind;
    if (/\b(?:qc[-_ ]?(?:photos?|images?|gallery)|quality[-_]control)\b/i.test(marker)) kind='qc';
    else if (/\b(?:styles|variants|sku[-_](?:list|item|gallery)|style[-_](?:item|gallery))\b/i.test(marker)) kind='styles';
    else if (/\b(?:product-description|product-content|detail-images|product-details-content)\b/.test(marker)) kind='details';
    else if (/\bproduct-gallery\b/.test(marker)) kind='gallery';
    const url = itemLink(a['data-weidian-url'] || a['data-url'] || a.href,id) || parent.url;
    const sku = a['data-sku-id'] || parent.sku;
    if (type==='img' && kind) {
      const image=sourcePhoto(a['data-src'] || a['data-original'] || a.src);
      if (image && kind==='styles') {
        let deepLink=url || '';
        if (id && sku && /^[a-zA-Z0-9_-]+$/.test(sku)) {
          const link = new URL(deepLink || 'https://weidian.com/item.html?itemID='+id);
          link.searchParams.set('skuId',sku); deepLink=link.href;
        }
        if (!result.styles.some(style=>style.url===deepLink && style.image===image)) result.styles.push({image,url:deepLink,name:a.alt || ''});
      } else if (image && !result[kind].includes(image)) result[kind].push(image);
    }
    if (!/^(?:img|br|input|meta|link|hr|source|wbr|area|base|embed|param|track)$/.test(type) && !tag.endsWith('/>')) contexts.push({type,kind,url,sku});
  }
  return result;
}
const copy={
 en:['Product photos','Other buying agents','Copy Weidian link','Copy style link','Styles','QC photos','Detail photos','No style options supplied.','No QC photos supplied.','Copied','Select and copy the link','Style','Product ID','Style link unavailable'],
 zh:['商品主图','其他购买平台','复制微店商品链接','复制所选款式链接','款式','QC 质检图','商品详情图','该商品暂未提供可选款式。','该商品暂未提供 QC 质检图。','已复制','请选择并复制链接','款式','商品 ID','此款式暂无专属链接'],
 de:['Produktbilder','Weitere Einkaufsagenten','Weidian-Link kopieren','Variantenlink kopieren','Varianten','QC-Fotos','Detailbilder','Keine Varianten angegeben.','Keine QC-Fotos vorhanden.','Kopiert','Link auswählen und kopieren','Variante','Produkt-ID','Kein Variantenlink verfügbar'],
 fr:['Photos du produit','Autres agents d’achat','Copier le lien Weidian','Copier le lien de la variante','Variantes','Photos de contrôle qualité','Photos de détail','Aucune variante fournie.','Aucune photo de contrôle fournie.','Copié','Sélectionnez et copiez le lien','Variante','Identifiant du produit','Lien de variante indisponible'],
 es:['Fotos del producto','Otros agentes de compra','Copiar enlace de Weidian','Copiar enlace de la variante','Variantes','Fotos de control de calidad','Fotos de detalle','No hay variantes disponibles.','Sin fotos de control de calidad.','Copiado','Selecciona y copia el enlace','Variante','ID del producto','Enlace de variante no disponible'],
 it:['Foto del prodotto','Altri agenti di acquisto','Copia link Weidian','Copia link della variante','Varianti','Foto del controllo qualità','Foto dei dettagli','Nessuna variante disponibile.','Nessuna foto del controllo qualità.','Copiato','Seleziona e copia il link','Variante','ID prodotto','Link della variante non disponibile']
};
function agentLinks(html,id) {
  if (!id) return '';
  const agents=[];
  for (const m of html.matchAll(/<a\b[^>]*class="platform-option"[^>]*>/g)) {
    try {
      const u=new URL(attrs(m[0]).href), host=u.hostname.replace(/^www\./,'');
      if(u.protocol!=='https:' || !/^[a-z0-9]+\.com$/.test(host) || /^bbdbuy/.test(host) || !decodeURIComponent(u.href).includes(id)) continue;
      const name=({'cnfans.com':'CNFans','mulebuy.com':'Mulebuy','oopbuy.com':'Oopbuy','allchinabuy.com':'AllChinaBuy','kakobuy.com':'Kakobuy','acbuy.com':'Acbuy','ootdbuy.com':'OOTDbuy','hubbuycn.com':'HubBuyCN','eastmallbuy.com':'EastMallBuy'})[host] || host[0].toUpperCase()+host.slice(1,-4);
      agents.push('<a href="'+textEscape(u.href)+'" rel="nofollow noopener noreferrer" target="_blank">'+textEscape(name)+'</a>');
    } catch { /* Upstream may omit an agent address. */ }
  }
  return agents.join('');
}
export const detailCSS=`
.pd{max-width:1120px;margin:0 auto}.pd .crumb{display:inline-block;margin:21px 0;color:#50604a;font-size:.9rem}.pd-top{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(22px,4vw,56px)}.pd h1{font-size:clamp(28px,3.5vw,48px);line-height:1.09;letter-spacing:-.04em;margin:0 0 10px}.pd h2{font-size:1.15rem;margin:0 0 12px}.pd-top figure{margin:0}.pd-top figcaption{margin:0 0 12px;display:flex;justify-content:space-between}.pd-main{display:block;background:#f3f4ef;border-radius:10px;overflow:hidden}.pd-main img{display:block;width:100%;aspect-ratio:1;object-fit:contain}.pd-strip,.pd-styles{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;max-height:190px;overflow:auto}.pd .pd-tile{border:2px solid transparent;background:#f4f4f4;padding:0;border-radius:7px;width:60px;height:60px;overflow:hidden;cursor:pointer}.pd-tile img{width:100%;height:100%;object-fit:cover}.pd .pd-tile[aria-pressed=true]{border-color:#294822}.pd-buy{display:block;text-align:center;margin:12px 0;padding:15px}.pd-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.pd-actions>details,.pd-actions>button{flex:1 1 175px}.pd-actions summary,.pd-actions>button{background:#fff;color:#1e261e;border:1px solid #c7ccc3;border-radius:7px;padding:11px 9px;text-align:center;cursor:pointer;min-height:46px;font:inherit}.pd-actions>button:disabled{opacity:.55}.pd-agents{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;background:white}.pd-agents a{text-decoration:underline}.pd-note{margin:8px 0;color:#596454}.pd-variants{margin-top:24px}.pd-section{margin-top:30px;border-top:1px solid #d7dbd4;padding-top:19px}.pd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}.pd-grid img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px}.pd .price{font-weight:750;font-size:1.8rem;margin:17px 0}.pd-choice{padding:0;margin:12px 0;border:0}.pd-choice legend{margin:0 0 5px}.pd-choice-grid{max-height:200px;overflow:auto;display:flex;gap:6px;flex-wrap:wrap}.pd .pd-opt{border:1px solid #bbb;padding:6px 10px;background:white;color:#222}.pd .pd-opt[aria-pressed=true]{background:#263923;color:white}.pd-seller{text-decoration:underline}.pd-copy-fallback{max-width:100%;padding:8px}
@media(max-width:700px){.pd-top{grid-template-columns:1fr;gap:16px}.pd .crumb{margin:12px 0}.pd-main img{max-height:42vh}.pd-top figcaption{margin-bottom:7px}.pd .pd-tile{width:48px;height:48px}.pd-grid{grid-template-columns:repeat(3,1fr)}.pd-actions>details,.pd-actions>button{flex:1 1 120px}.pd-section,.pd-variants{margin-top:18px}}
`;
export function renderProduct(html,{local,base,w,title,recordId,selectedPhoto,enableSeller=false}) {
  const t=copy[local] || copy.en;
  const {gallery,styles,qc,details}=productImages(html);
  const id=html.match(/weidian\.com\/item\.html\?itemID=(\d+)/i)?.[1];
  const seller=id?'https://weidian.com/item.html?itemID='+id:'';
  const price=html.match(/class="product-price">\s*([\d.]+)/)?.[1];
  const titleSafe=textEscape(title);
  const image=(src,alt,main=false)=>'<img '+(main?'':'loading="lazy" ')+'src="'+textEscape(src)+'" alt="'+textEscape(alt)+'">';
  const tile=(src,alt,link,pressed=false)=>'<button class="pd-tile" data-image="'+textEscape(src)+'" '+(link===undefined?'':'data-style-url="'+textEscape(link)+'"')+' aria-label="'+textEscape(alt)+'" aria-pressed="'+pressed+'">'+image(src,alt)+'</button>';
  const links=agentLinks(html,id);
  const variantText=variantLabels[local] || variantLabels.en;
  const styleFallback='<p class="pd-note">'+t[7]+'</p>'+(seller?'<a class="pd-seller" href="'+seller+'" target="_blank" rel="nofollow noopener noreferrer">'+variantText[0]+'</a>':'');
  const variantMount=enableSeller && id && /^\d+$/.test(recordId)?' data-variant-api="/api/item-variants/'+recordId+'" data-labels="'+textEscape(JSON.stringify(variantText))+'"':'';

  const additional=(heading,photos,empty)=>'<section class="pd-section"><h2>'+textEscape(heading)+'</h2>'+(photos.length?'<div class="pd-grid">'+photos.map((p,i)=>'<a href="'+textEscape(p)+'">'+image(p,heading+' '+(i+1))+'</a>').join('')+'</div>':'<p class="pd-note">'+textEscape(empty)+'</p>')+'</section>';
  const additionalImages=[...new Set([...gallery.slice(1),...details])].filter(image=>!qc.includes(image));
  const candidate=sourcePhoto(selectedPhoto);
  const main=[...gallery,...details,...qc,...styles.map(s=>s.image)].includes(candidate)?candidate:(gallery[0]||styles[0]?.image||details[0]);
  return '<article class="pd"><a class="crumb" href="'+base+'catalog/">'+textEscape(w[0])+'</a><div class="pd-top"><figure><figcaption>'+t[0]+'<small>'+gallery.length+'</small></figcaption>'+(main?'<a class="pd-main" href="'+textEscape(main)+'">'+image(main,title,true)+'</a>':'')+(gallery.length>1?'<div class="pd-strip">'+gallery.map((p,i)=>tile(p,t[0]+' '+(i+1),undefined,i===0)).join('')+'</div>':'')+'</figure><section><h1>'+titleSafe+'</h1>'+(id?'<small>'+t[12]+' '+id+'</small>':'')+(price?'<p class="price" data-cny="'+price+'">'+price+' CNY</p>':'')+(seller?'<a class="btn pd-buy" href="https://www.bbdbuyeu.com/goods/WEIDIAN/'+id+'" target="_blank" rel="nofollow noopener noreferrer">'+textEscape(w[8])+'</a>':'')+'<div class="pd-actions">'+(links?'<details><summary>'+t[1]+'</summary><div class="pd-agents">'+links+'</div></details>':'')+(seller?'<button id="pd-copy" data-link="'+seller+'" data-product-link="'+seller+'" data-item-text="'+t[2]+'" data-style-text="'+t[3]+'" data-missing="'+t[13]+'" data-done="'+t[9]+'" data-prompt="'+t[10]+'">'+t[2]+'</button>':'')+'</div><div id="pd-status" role="status"></div><div class="pd-variants"><h2>'+t[4]+'</h2>'+(styles.length?'<div class="pd-styles">'+styles.map((s,i)=>tile(s.image,t[11]+' '+(i+1),s.url)).join('')+'</div>':'<div'+variantMount+'>'+styleFallback+'</div>')+'</div></section></div>'+additional(t[5],qc,t[8])+(additionalImages.length?additional(t[6],additionalImages,''):'')+'</article><script>('+productBehavior.toString()+')();'+(variantMount?'('+sellerBehavior.toString()+')();':'')+'</script>';
}
function productBehavior(){
 const root=document.querySelector('.pd'),button=root.querySelector('#pd-copy'),status=root.querySelector('#pd-status');
 root.querySelectorAll('.pd-tile').forEach(tile=>tile.addEventListener('click',()=>{
   root.querySelectorAll('.pd-tile').forEach(x=>x.setAttribute('aria-pressed',String(x===tile)));
   const main=root.querySelector('.pd-main'); if(main){ main.href=tile.dataset.image;main.firstElementChild.src=tile.dataset.image; }
   status.replaceChildren();
   if(!button)return;
   const variant=tile.hasAttribute('data-style-url');
   const link=variant?tile.dataset.styleUrl:button.dataset.productLink;
   button.dataset.link=link;
   button.disabled=!link || (variant&&link===button.dataset.productLink);
   button.textContent=button.disabled?button.dataset.missing:(variant?button.dataset.styleText:button.dataset.itemText);
 }));
 if(button)button.addEventListener('click',async()=>{
   const link=button.dataset.link;
   try{await navigator.clipboard.writeText(link);status.textContent=button.dataset.done;}
   catch{const label=document.createElement('label'),input=document.createElement('input');label.textContent=button.dataset.prompt+' ';input.readOnly=true;input.className='pd-copy-fallback';input.value=link;label.append(input);status.replaceChildren(label);input.focus();input.select();}
 });
}
function sellerImage(value) {
  try {const u=new URL(value);return u.protocol==='https:' && /^(?:si|img)\.geilicdn\.com$/.test(u.hostname)?u.href:''} catch {return ''}
}
export function sellerVariants(html,id) {
  const packed=html.match(/id="__rocker-render-inject__"[^>]*data-obj="([^"]+)"/)?.[1];
  if (!packed) throw Error('Seller options unavailable');
  const data=packed.replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  const model=JSON.parse(data)?.result?.default_model;
  if(String(model?.item_info?.item_id)!==id) throw Error('Seller item mismatch');
  const props=model.sku_properties || {};
  const groups=(props.attr_list||[]).map(group=>({name:String(group.attr_title||''),values:(group.attr_values||[]).map(v=>({id:String(v.attr_id),name:String(v.attr_value??''),image:sellerImage(v.img)}))}));
  const skus=Object.values(props.sku||{}).filter(s=>/^\d+$/.test(s.id)).map(s=>({id:String(s.id),attrs:String(s.attr_ids).split('-'),price:/^\d+(\.\d+)?$/.test(s.price)?Number(s.price):null,stock:Number(s.stock)}));
  return {id,groups,skus};
}
export async function variantResponse(recordId,read) {
  if(!/^\d{1,10}$/.test(recordId)) return new Response('404',{status:404});
  try{
    const source=await read('/AllProducts/'+recordId+'.html');
    const id=source.match(/weidian\.com\/item\.html\?itemID=(\d+)/i)?.[1];
    if(!id) return Response.json({groups:[],skus:[]});
    const response=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(12000),cf:{cacheEverything:true,cacheTtl:900}});
    if(!response.ok) throw Error('Seller request failed');
    return Response.json(sellerVariants(await response.text(),id),{headers:{'cache-control':'public, max-age=600','x-robots-tag':'noindex'}});
  }catch{return Response.json({error:'Seller unavailable'},{status:503,headers:{'cache-control':'no-store'}})}
}
const variantLabels={
 en:['Choose options on Weidian','Size','Style','Option','Select each option to copy its SKU link.'],
 de:['Varianten auf Weidian ansehen','Größe','Variante','Option','Jede Option auswählen, um den SKU-Link zu kopieren.'],
 fr:['Voir les variantes sur Weidian','Taille','Variante','Option','Sélectionnez chaque option pour copier le lien de cette variante.'],
 it:['Vedi le varianti su Weidian','Taglia','Variante','Opzione','Seleziona tutte le opzioni per copiare il link della variante.'],
 es:['Ver variantes en Weidian','Talla','Variante','Opción','Selecciona todas las opciones para copiar el enlace de la variante.'],
 zh:['在微店查看款式','尺码','款式','选项','请选择完整款式和尺码后再复制对应 SKU 的链接。']
};
async function sellerBehavior(){
 const zone=document.querySelector('[data-variant-api]');
 if(!zone) return;
 let model;
 try{const r=await fetch(zone.dataset.variantApi);if(!r.ok)return;model=await r.json();}catch{return}
 if(!model.groups?.length||!model.skus?.length)return;
 const root=zone.closest('.pd'),button=root.querySelector('#pd-copy'),main=root.querySelector('.pd-main'),price=root.querySelector('[data-cny]'),originalPrice=price?.dataset.cny;
 const selected=new Map(),labels=JSON.parse(zone.dataset.labels);
 const groupType=g=>/size|sizing|尺码|尺寸/i.test(g.name)?1:g.values.some(v=>v.image)||/style|colour|color|款式|颜色/i.test(g.name)?2:3;
 const groups=[...model.groups].sort((a,b)=>Number(b.values.some(v=>v.image))-Number(a.values.some(v=>v.image)));
 zone.replaceChildren();
 for(const [i,g] of groups.entries()){
   const type=groupType(g),section=document.createElement('fieldset'),legend=document.createElement('legend'),grid=document.createElement('div');
   legend.textContent=labels[type]+(type===3?' '+(i+1):'');grid.className='pd-choice-grid';section.className='pd-choice';section.append(legend,grid);zone.append(section);
   for(const v of g.values){
     const opt=document.createElement('button');opt.type='button';opt.dataset.group=String(i);opt.dataset.attr=v.id;opt.setAttribute('aria-pressed','false');
     const optName=v.name.replace(/^(?:Size|尺码)\s*/i,'');opt.setAttribute('aria-label',legend.textContent+' '+optName);
     if(v.image){opt.className='pd-tile';const im=document.createElement('img');im.src=v.image;im.alt=optName;im.loading='lazy';opt.title=optName;opt.append(im)}
     else{opt.className='pd-opt';opt.textContent=optName}
     opt.addEventListener('click',()=>{
       selected.set(i,v.id);
       for(const other of grid.children) other.setAttribute('aria-pressed',String(opt===other));
       if(v.image&&main){main.href=v.image;main.firstElementChild.src=v.image}
       const exact=selected.size===groups.length && model.skus.find(s=>s.attrs.length===selected.size && [...selected.values()].every(v=>s.attrs.includes(v)));
       button.disabled=!exact;button.textContent=exact?button.dataset.styleText:labels[4];
       if(exact){const link=new URL(button.dataset.productLink);link.searchParams.set('skuId',exact.id);button.dataset.link=link.href}
       else button.dataset.link='';
       const status=root.querySelector('#pd-status');status.replaceChildren();
       if(price){price.dataset.cny=String(exact && exact.price!=null?exact.price:originalPrice);price.textContent=price.dataset.cny+' CNY';window.dispatchEvent(new Event('bbd-price-update'))}
     });grid.append(opt);
   }
 }
}
