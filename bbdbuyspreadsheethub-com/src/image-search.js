import {imageMeta, imageNames, packed} from './image-signatures.js';
import {localizedTitle} from './localization.js';

const messages = {
 en: ['Image search', 'Find a product by photo', 'Choose an image', 'Compare a photo with the product catalog and its image galleries.', 'Comparing photos…', 'Similar products', 'Choose a readable image smaller than 20 MB.', 'The search index could not be loaded. Please try again.', 'Searchable images', 'Products', 'No close matches. Try a different view.', 'Your photo stays in your browser.'],
 zh: ['以图搜商品','上传照片查找商品','选择图片','用照片匹配商品目录和详情图集。','正在比对图片…','相似商品','请选择可读取且小于 20 MB 的图片。','暂时无法加载图片索引，请重试。','可检索图片','件商品','没有找到相似商品，请试试其他角度。','照片仅在你的浏览器中处理。'],
 de: ['Bildersuche','Produkte per Foto finden','Bild auswählen','Vergleiche dein Foto mit dem Produktkatalog und den Bildergalerien.','Bilder werden verglichen…','Ähnliche Produkte','Wähle ein lesbares Bild unter 20 MB.','Der Suchindex konnte nicht geladen werden. Bitte erneut versuchen.','Durchsuchbare Bilder','Produkte','Keine ähnlichen Treffer. Versuche eine andere Ansicht.','Dein Foto bleibt in deinem Browser.'],
 fr: ['Recherche par image','Trouver un produit avec une photo','Choisir une image','Comparez une photo au catalogue et aux galeries des produits.','Comparaison des photos…','Produits similaires','Choisissez une image lisible de moins de 20 Mo.','Impossible de charger l’index. Réessayez.','Images indexées','Produits','Aucune correspondance proche. Essayez un autre angle.','Votre photo reste dans votre navigateur.'],
 es: ['Búsqueda por imagen','Encuentra un producto con una foto','Elegir una imagen','Compara una foto con el catálogo y las galerías de productos.','Comparando fotos…','Productos similares','Elige una imagen legible de menos de 20 MB.','No se pudo cargar el índice. Inténtalo de nuevo.','Imágenes indexadas','Productos','Sin coincidencias cercanas. Prueba con otra vista.','Tu foto permanece en tu navegador.'],
 it: ['Ricerca per immagine','Trova un prodotto da una foto','Scegli un’immagine','Confronta una foto con il catalogo e le gallerie dei prodotti.','Confronto delle foto…','Prodotti simili','Scegli un’immagine leggibile di meno di 20 MB.','Impossibile caricare l’indice. Riprova.','Immagini indicizzate','Prodotti','Nessuna corrispondenza simile. Prova un’altra angolazione.','La foto rimane nel tuo browser.']
};
export function imageLabel(locale) { return (messages[locale] || messages.en)[0]; }

function searchClient() {
 const labels=JSON.parse(document.getElementById('visual-words').textContent);
 const fileInput=document.getElementById('visual-file');
 const drop=document.getElementById('visual-drop');
 const status=document.getElementById('visual-status');
 const preview=document.getElementById('visual-preview');
 const results=document.getElementById('visual-results');
 const locale=document.documentElement.lang;
 const meta=JSON.parse(document.getElementById('visual-meta').textContent);
 let promise, sequence=0, currentURL;
 async function load(){
   if(!promise) promise=(async()=>{
     const parts=Array(meta.parts);
     let next=0;
     async function lane(){
       while(next<meta.parts){
         const i=next++;
         const response=await fetch('/api/visual/part/'+meta.version+'/'+i);
         if(!response.ok) throw Error();
         parts[i]=await response.json();
       }
     }
     await Promise.all(Array.from({length:4},lane));
     return parts.flat();
   })().catch(e=>{promise=null;throw e});
   return promise;
 }
 const bitsToHex=bits=>{
   let hex='';
   for(let i=0;i<bits.length;i+=4)hex+=(bits[i]*8+bits[i+1]*4+bits[i+2]*2+bits[i+3]).toString(16);
   return hex;
 };
 async function features(url){
   const image=new Image();image.src=url;await image.decode();
   const canvas=document.createElement('canvas');
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   function pixels(w,h){
     canvas.width=w;canvas.height=h;ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);
     ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,w,h);
     return ctx.getImageData(0,0,w,h).data;
   }
   function gray(data){return Array.from({length:data.length/4},(_,i)=>Math.round(.299*data[i*4]+.587*data[i*4+1]+.114*data[i*4+2]));}
   const grid=gray(pixels(32,32)),cosines=Array.from({length:8},(_,k)=>Array.from({length:32},(_,n)=>Math.cos(Math.PI*(2*n+1)*k/64)));
   const coefficients=[];
   for(let ky=0;ky<8;ky++)for(let kx=0;kx<8;kx++){
     let sum=0;
     for(let y=0;y<32;y++)for(let x=0;x<32;x++)sum+=grid[y*32+x]*cosines[ky][y]*cosines[kx][x];
     coefficients.push(sum);
   }
   const threshold=coefficients.slice(1).sort((a,b)=>a-b)[31], gradient=gray(pixels(9,8)), bits=[];
   for(let y=0;y<8;y++)for(let x=0;x<8;x++)bits.push(+(gradient[9*y+x+1]>gradient[9*y+x]));
   const color=Array.from(pixels(4,4)).filter((_,i)=>i%4!==3);
   return {ph:bitsToHex(coefficients.map(n=>+(n>threshold))),dh:bitsToHex(bits),color,aspect:image.naturalWidth/image.naturalHeight};
 }
 const pop=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];
 function hamming(left,right){let n=0;for(let i=0;i<16;i++)n+=pop[parseInt(left[i],16)^parseInt(right[i],16)];return n;}
 function compare(rows,q){
   const best=new Map();
   for(const [src,ids,ph,dh,color,aspect] of rows){
     const rgb=atob(color);let diff=0;
     for(let i=0;i<48;i++)diff+=Math.abs(q.color[i]-rgb.charCodeAt(i));
     const score=.65*hamming(ph,q.ph)+.35*hamming(dh,q.dh)+diff*20/(48*255)+Math.min(5,3*Math.abs(Math.log(aspect/q.aspect)));
     if(score>28)continue;
     for(const id of ids){
       const prior=best.get(id);
       if(!prior||score<prior.score)best.set(id,{id,src,score});
     }
   }
   return [...best.values()].sort((a,b)=>a.score-b.score).slice(0,20);
 }
 async function run(file){
   if(!file)return;
   const id=++sequence;
   results.replaceChildren();status.textContent='';
   if(currentURL)URL.revokeObjectURL(currentURL);
   preview.hidden=true;preview.removeAttribute('src');
   if((file.type&&!file.type.startsWith('image/'))||file.size>=20*1024*1024){status.textContent=labels[6];return;}
   currentURL=URL.createObjectURL(file);const activeURL=currentURL;
   let descriptor;
   try{descriptor=await features(activeURL);}catch{if(id===sequence)status.textContent=labels[6];return;}
   if(id!==sequence)return;
   preview.src=activeURL;preview.hidden=false;status.textContent=labels[4];
   try{
     const rows=await load();if(id!==sequence)return;
     const matches=compare(rows,descriptor);
     if(!matches.length){status.textContent=labels[10];return;}
     const params=new URLSearchParams({lang:locale,ids:matches.map(r=>r.id).join(',')});
     const response=await fetch('/api/visual/titles?'+params);
     if(!response.ok)throw Error();
     const names=await response.json();if(id!==sequence)return;
     status.textContent=labels[5]+' · '+matches.length;
     const links=matches.map(m=>{
       const a=document.createElement('a');a.className='card';a.href='/'+locale+'/item/'+m.id+'/?photo='+encodeURIComponent(m.src);
       const im=document.createElement('img');im.loading='lazy';im.src='https://cnfanshp.com'+m.src;im.alt=names[m.id]||'';
       const name=document.createElement('strong');name.textContent=names[m.id]||'#'+m.id;a.append(im,name);return a;
     });
     results.replaceChildren(...links);
   }catch{if(id===sequence)status.textContent=labels[7];}
 }
 fileInput.addEventListener('change',()=>{run(fileInput.files[0]);fileInput.value='';});
 for(const event of ['dragenter','dragover'])drop.addEventListener(event,e=>{e.preventDefault();drop.classList.add('over');});
 drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
 drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');run(e.dataTransfer.files[0]);});
}
const pathVersion=imageMeta.indexedAt.replace(/[^\d]/g,'');
export function imageApi(request){
 const u=new URL(request.url);if(!u.pathname.startsWith('/api/visual/'))return null;
 if(request.method!=='GET')return new Response(null,{status:405});
 if(u.pathname==='/api/visual/titles'){
   const lang=u.searchParams.get('lang')||'en';
   const ids=(u.searchParams.get('ids')||'').split(',').slice(0,20).filter(x=>/^\d{1,9}$/.test(x)&&Object.hasOwn(imageNames,x));
   return Response.json(Object.fromEntries(ids.map(id=>[id,localizedTitle(imageNames[id],lang)])),{headers:{'Cache-Control':'public,max-age=3600'}});
 }
 const match=u.pathname.match(/^\/api\/visual\/part\/(\d+)\/(\d+)$/);
 if(!match||match[1]!==pathVersion||!Object.hasOwn(packed,match[2]))return new Response(null,{status:404});
 const bytes=Uint8Array.from(atob(packed[match[2]]),c=>c.charCodeAt(0));
 // Workers compress responses at the edge. Decode the gzip payload before writing JSON.
 const decoded=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
 return new Response(decoded,{headers:{'Content-Type':'application/json','Cache-Control':'public,max-age=604800,immutable'}});
}
export function imagePage(locale){
 const t=messages[locale]||messages.en;
 const pretty=n=>n.toLocaleString(locale);
 return `<style>.visual{max-width:900px;margin:40px auto}.visual h1{font-size:clamp(32px,5vw,60px);letter-spacing:-.055em;line-height:1.1;margin:10px 0}.visual p{line-height:1.5}.visual-zone{padding:28px 16px;border:2px dashed #a1afa8;border-radius:16px;background:#f4f8f5;text-align:center}.visual-zone.over,.visual-zone:focus-within{border-color:currentColor;background:#e6eeea}.visual-zone label{cursor:pointer}.visual-zone input{position:absolute;width:1px;height:1px;opacity:0}.visual-zone img{width:110px;height:110px;object-fit:contain;border-radius:8px;margin:12px auto}.visual-zone img:not([hidden]){display:block}.visual-summary{color:#4e5652;font-size:14px}.visual #visual-status{font-weight:700;margin:22px 0 14px}.visual .grid{grid-template-columns:repeat(auto-fill,minmax(min(145px,43%),1fr))}</style>
 <section class="visual"><h1>${t[1]}</h1><p>${t[3]}</p><div class="visual-zone" id="visual-drop"><label class="btn" for="visual-file">${t[2]}</label><input id="visual-file" type="file" accept="image/*"><img id="visual-preview" alt="" hidden><p>${t[11]}</p></div>
 <p class="visual-summary">${t[8]} · ${pretty(imageMeta.imageCount)} &nbsp; ${t[9]} · ${pretty(imageMeta.productCount)}</p><p role="status" aria-live="polite" id="visual-status"></p><div class="grid" id="visual-results"></div></section>
 <script type="application/json" id="visual-words">${JSON.stringify(t)}</script><script type="application/json" id="visual-meta">${JSON.stringify({parts:imageMeta.parts,version:pathVersion})}</script><script>(${searchClient.toString()})()</script>`;
}
