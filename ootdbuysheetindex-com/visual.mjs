import {imageMeta,imageNames,pendingSellers,imageReferences,imageSignatures} from './visual-data.mjs'
import {localName} from './i18n.mjs'
import {sellerData} from './source.mjs'

let signatures, urlPositions
const sourceUrl=path=>path.startsWith('/')?'https://www.cnfanshp.com'+path:path
const bitCounts=Uint8Array.from({length:256},(_,i)=>i.toString(2).replace(/0/g,'').length)
const stride=29

// A resized seller duplicate can differ by less than half a distance point from the source photo.
function compareMatches(left,right){
  const gap=Math.floor(left.distance*2)-Math.floor(right.distance*2)
  if(gap)return gap
  const firstOrigin=left.image.startsWith('https://www.cnfanshp.com/')
  const secondOrigin=right.image.startsWith('https://www.cnfanshp.com/')
  return Number(secondOrigin)-Number(firstOrigin)||left.distance-right.distance||left.id-right.id
}
function matchesForSignature(descriptor) {
  if(!signatures) signatures=Uint8Array.from(atob(imageSignatures),value=>value.charCodeAt(0))
  const results=new Map()
  for(let i=0,offset=0;i<imageReferences.length;i++,offset+=stride) {
    let ph=0,dh=0
    for(let k=0;k<8;k++) {
      ph+=bitCounts[descriptor[k]^signatures[offset+k]]
      dh+=bitCounts[descriptor[k+8]^signatures[offset+8+k]]
    }
    const hashDistance=.65*ph+.35*dh
    if(hashDistance>28)continue
    let rgb=0
    for(let k=16;k<28;k++)rgb+=Math.abs(descriptor[k]-signatures[offset+k])
    const aspect=signatures[offset+28]
    const distance=hashDistance+rgb*20/(12*255)+Math.min(5,3*Math.abs(descriptor[28]-(aspect>127?aspect-256:aspect))/32)
    if(distance>28)continue
    const ref=imageReferences[i]
    for(let k=1;k<ref.length;k++){
      const previous=results.get(ref[k])
      const candidate={id:ref[k],image:sourceUrl(ref[0]),distance}
      if(!previous||compareMatches(candidate,previous)<0)results.set(ref[k],candidate)
    }
  }
  return [...results.values()].sort(compareMatches).slice(0,20)
}

function matchesForUrl(value) {
  let u
  try{u=new URL(value)}catch{return []}
  if(!['http:','https:'].includes(u.protocol))return []
  const source=['cnfanshp.com','www.cnfanshp.com'].includes(u.hostname)?u.pathname:'https://'+u.hostname+u.pathname
  if(!urlPositions){
    urlPositions=new Map()
    for(const row of imageReferences)urlPositions.set(row[0].split('?')[0],row)
  }
  const row=urlPositions.get(source)
  return row?row.slice(1).map(id=>({id,image:sourceUrl(row[0])})):[]
}

export async function visualApi(request) {
  const u=new URL(request.url)
  if(request.method!=='GET')return new Response(null,{status:405})
  if(u.pathname==='/visual-api/coverage')return Response.json(imageMeta)
  if(u.pathname==='/visual-api/pending')return Response.json(pendingSellers,{headers:{'cache-control':'public,max-age=300'}})
  if(u.pathname==='/visual-api/styles'){
    const id=u.searchParams.get('id'),lang=u.searchParams.get('lang')||'en'
    if(!Object.hasOwn(pendingSellers,id))return new Response(null,{status:404})
    const gallery=await sellerData(id)
    if(!gallery.available)return new Response(null,{status:503})
    const photos=[...(gallery.sellerGallery||[]),...gallery.groups.flatMap(g=>g.values.map(v=>v.image)),...gallery.skus.map(s=>s.image)].filter(Boolean)
    const products=pendingSellers[id].map(id=>({id,name:localName(imageNames[id],lang)}))
    return Response.json({products,photos:[...new Set(photos)]},{headers:{'cache-control':'public,max-age=1800'}})
  }
  if(u.pathname==='/visual-api/thumbnail'){
    let target
    try{target=new URL(u.searchParams.get('image'))}catch{return new Response(null,{status:400})}
    if(target.protocol!=='https:'||target.username||target.password||target.port||!target.hostname.endsWith('.geilicdn.com'))return new Response(null,{status:400})
    target.searchParams.set('w','128')
    target.searchParams.set('h','128')
    const response=await fetch(target.href,{redirect:'manual',signal:AbortSignal.timeout(8000),cf:{cacheEverything:true,cacheTtl:86400}})
    const type=response.headers.get('content-type')||''
    if(!response.ok||!( /^image\/(?:webp|jpeg|png|gif|avif|bmp)(?:;|$)/i.test(type)))return new Response(null,{status:404})
    return new Response(response.body,{headers:{'content-type':type,'cache-control':'public,max-age=86400','x-content-type-options':'nosniff'}})
  }
  if(u.pathname!=='/visual-api/search')return new Response(null,{status:404})
  const lang=u.searchParams.get('lang')||'en'
  let result
  if(u.searchParams.has('url'))result=matchesForUrl(u.searchParams.get('url').slice(0,2048))
  else {
    const value=u.searchParams.get('sig')||''
    if(!/^[0-9a-f]{58}$/i.test(value))return new Response(null,{status:400})
    const q=Array.from(value.match(/../g),n=>parseInt(n,16))
    if(q[28]>127)q[28]-=256
    result=matchesForSignature(q)
  }
  return Response.json(result.map(({id,image,distance})=>({id,image,distance:distance||0,name:localName(imageNames[id],lang)})),{headers:{'Cache-Control':'private,max-age=600'}})
}

// Only the comparison signature or the pasted catalog URL leaves the browser.
function visualClient(){
  const words=JSON.parse(document.getElementById('visual-words').textContent)
  const file=document.getElementById('visual-file'),input=document.getElementById('visual-url')
  const preview=document.getElementById('visual-preview'),state=document.getElementById('visual-status'),results=document.getElementById('visual-results')
  let sequence=0,objectURL,controller,query,ranked=[],pending,scanState
  const controls=document.getElementById('visual-advanced'),scanButton=document.getElementById('visual-scan'),pause=document.getElementById('visual-pause'),progress=document.getElementById('visual-progress')
  const hex=v=>(v&255).toString(16).padStart(2,'0')
  const bits=values=>{
    let s=''
    for(let i=0;i<values.length;i+=8){let byte=0;for(let j=0;j<8;j++)byte=byte*2+Number(values[i+j]);s+=hex(byte)}
    return s
  }
  async function signature(src){
    const image=new Image();image.src=src;await image.decode()
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true})
    function pixels(w,h) {
      canvas.width=w;canvas.height=h;ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h)
      ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,w,h)
      return ctx.getImageData(0,0,w,h).data
    }
    const gray=data=>Array.from({length:data.length/4},(_,i)=>Math.round(.299*data[4*i]+.587*data[4*i+1]+.114*data[4*i+2]))
    const lum=gray(pixels(32,32)),dct=[],cos=Array.from({length:8},(_,k)=>Array.from({length:32},(_,n)=>Math.cos(Math.PI*(2*n+1)*k/64)))
    for(let y=0;y<8;y++)for(let x=0;x<8;x++){
      let sum=0
      for(let i=0;i<32;i++)for(let j=0;j<32;j++)sum+=lum[i*32+j]*cos[y][i]*cos[x][j]
      dct.push(sum)
    }
    const median=dct.slice(1).sort((a,b)=>a-b)[31],gradient=gray(pixels(9,8)),diff=[]
    for(let y=0;y<8;y++)for(let x=0;x<8;x++)diff.push(gradient[y*9+x+1]>gradient[y*9+x])
    const color=pixels(4,4),channels=[]
    for(let y=0;y<4;y+=2)for(let x=0;x<4;x+=2)for(let k=0;k<3;k++){
      let sum=0
      for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++)sum+=color[((y+dy)*4+x+dx)*4+k]
      channels.push(hex(Math.round(sum/4)))
    }
    return bits(dct.map(v=>v>median))+bits(diff)+channels.join('')+hex(Math.max(-127,Math.min(127,Math.round(Math.log(image.naturalWidth/image.naturalHeight)*32))))
  }
  async function search(upload,url){
    const serial=++sequence
    controller?.abort();controller=null;query=null;scanState=null;controls.hidden=true;progress.textContent='';scanButton.hidden=false;pause.hidden=true
    results.replaceChildren();state.textContent=words.searching;preview.hidden=true;preview.removeAttribute('src')
    if(objectURL)URL.revokeObjectURL(objectURL)
    try{
      const params=new URLSearchParams({lang:document.documentElement.lang})
      if(upload){
        if(upload.size>20*1024*1024||(upload.type&&!upload.type.startsWith('image/')))throw Error()
        objectURL=URL.createObjectURL(upload)
        params.set('sig',await signature(objectURL))
        if(serial!==sequence)return
        preview.src=objectURL;preview.hidden=false
      }else params.set('url',url)
      const response=await fetch('/visual-api/search?'+params)
      if(!response.ok)throw Error()
      const matches=await response.json()
      if(serial!==sequence)return
      ranked=matches
      query={descriptor:params.get('sig'),url:params.get('url'),lang:params.get('lang')}
      controls.hidden=false
      const key=checkpointKey()
      try{scanState=JSON.parse(localStorage.getItem(key))}catch{}
      if(scanState){
        ranked=merge(ranked,scanState.matches||[])
        showProgress()
      }
      draw()
      // Keep exact matches instant. Inexact queries can continue through every linked seller.
      if(!ranked.some(match=>match.distance===0))searchRemaining(3)
    }catch{if(serial===sequence)state.textContent=words.imageError}
  }
  function checkpointKey(){
    return 'ootdbuy.visual.'+words.version+'.'+query.lang+'.'+(query.descriptor||query.url)
  }
  function merge(existing,more){
    const map=new Map()
    for(const m of [...existing,...more]){
      const prior=map.get(m.id)
      if(!prior||prior.distance>m.distance)map.set(m.id,m)
    }
    return [...map.values()].sort((a,b)=>a.distance-b.distance).slice(0,20)
  }
  function draw(){
    state.textContent=ranked.length?words.matches+' · '+ranked.length:words.empty
    const links=ranked.map(m=>{
      const a=document.createElement('a');a.className='card';a.href=words.base+'product/'+m.id+'/?photo='+encodeURIComponent(m.image)
      const div=document.createElement('div');div.className='photo';const im=document.createElement('img');im.src=m.image;im.loading='lazy';im.alt=m.name;im.referrerPolicy='no-referrer';div.append(im)
      const name=document.createElement('h3');name.textContent=m.name;a.append(div,name);return a
    })
    results.replaceChildren(...links)
  }
  const unpack=s=>Array.from(s.match(/../g),v=>parseInt(v,16))
  const pop=n=>{let i=0;while(n){n&=n-1;i++}return i}
  function score(a,b){
    let distance=0
    for(let i=0;i<16;i++)distance+=pop(a[i]^b[i])*(i<8?.65:.35)
    for(let i=16;i<28;i++)distance+=Math.abs(a[i]-b[i])*20/(12*255)
    const signed=x=>x>127?x-256:x
    return distance+Math.min(5,3*Math.abs(signed(a[28])-signed(b[28]))/32)
  }
  function showProgress(){
    if(!scanState)return
    let text=words.advanced[2]+' '+scanState.checked.length+' / '+scanState.total
    if(scanState.failed.length)text+=' · '+words.advanced[3]+' '+scanState.failed.length
    const count=scanState.checked.length+scanState.failed.length
    if(count&&scanState.total>count){
      const minutes=Math.max(1,Math.round((scanState.total-count)*scanState.elapsed/count/60000))
      text+=' · '+words.advanced[4]+' '+new Intl.NumberFormat(query.lang,{style:'unit',unit:'minute',unitDisplay:'short'}).format(minutes)
    }
    progress.textContent=text
  }
  async function searchRemaining(batchSize=400){
    if(controller||!query)return
    const serial=sequence,abort=new AbortController();controller=abort;scanButton.hidden=true;pause.hidden=false
    try{
      if(!pending){const res=await fetch('/visual-api/pending',{signal:abort.signal});if(!res.ok)throw Error();pending=await res.json()}
      const ids=Object.keys(pending)
      scanState??={checked:[],failed:[],matches:[],total:ids.length,elapsed:0}
      const done=new Set(scanState.checked)
      const previousFailures=new Set(scanState.failed);scanState.total=ids.length;let consecutiveFailures=0
      const nearest=new Map(ranked.map((m,i)=>[m.id,i]))
      const priority=id=>Math.min(100,...pending[id].map(p=>nearest.get(p)??100))
      ids.sort((a,b)=>Number(previousFailures.has(a))-Number(previousFailures.has(b))||priority(a)-priority(b)||Number(b)-Number(a))
      const q=query.descriptor&&unpack(query.descriptor)
      const normalized=url=>{const p=new URL(url);return p.hostname+p.pathname}
      const target=query.url?normalized(query.url):null
      showProgress()
      let inBatch=0
      const end=Date.now()+10*60*1000
      for(const id of ids){
        if(abort.signal.aborted||sequence!==serial)break
        if(done.has(id))continue
        if(++inBatch>batchSize||Date.now()>end)break
        const start=Date.now()
        let ok=true
        try{
          const response=await fetch('/visual-api/styles?'+new URLSearchParams({id,lang:query.lang}),{signal:abort.signal})
          if(!response.ok)throw Error()
          const {products,photos}=await response.json()
          let next=0
          async function lane(){
            while(next<photos.length&&!abort.signal.aborted){
              const image=photos[next++];let distance=Infinity
              try{
                if(target)distance=normalized(image)===target?0:Infinity
                else{
                  const thumb='/visual-api/thumbnail?'+new URLSearchParams({image})
                  const r=await fetch(thumb,{signal:abort.signal,credentials:'omit',referrerPolicy:'no-referrer'})
                  if(!r.ok)throw Error()
                  const object=URL.createObjectURL(await r.blob())
                  try{distance=score(q,unpack(await signature(object)))}finally{URL.revokeObjectURL(object)}
                }
              }catch{ok=false}
              if(distance<=28&&sequence===serial&&!abort.signal.aborted){
                const found=products.map(p=>({...p,image,distance}))
                ranked=merge(ranked,found)
                scanState.matches=merge(scanState.matches,found)
              }
            }
          }
          await Promise.all([lane(),lane(),lane()])
        }catch{ok=false}
        if(sequence!==serial||abort.signal.aborted)break
        scanState.failed=scanState.failed.filter(x=>x!==id)
        scanState[ok?'checked':'failed'].push(id);scanState.elapsed+=Date.now()-start
        consecutiveFailures=ok?0:consecutiveFailures+1
        try{localStorage.setItem(checkpointKey(),JSON.stringify(scanState))}catch{}
        showProgress();draw()
        if(consecutiveFailures>=8){progress.textContent+=' · '+words.imageError;break}
        await new Promise(resolve=>setTimeout(resolve,150))
      }
    }catch{if(serial===sequence&&!abort.signal.aborted)progress.textContent=words.imageError}
    finally{if(serial===sequence){controller=null;pause.hidden=true;scanButton.hidden=!!scanState&&scanState.checked.length===scanState.total}}
  }
  scanButton.addEventListener('click',()=>searchRemaining())
  pause.addEventListener('click',()=>controller?.abort())
  window.addEventListener('pagehide',()=>controller?.abort())
  file.addEventListener('change',()=>{if(file.files[0])search(file.files[0]);file.value=''})
  document.getElementById('visual-form').addEventListener('submit',e=>{e.preventDefault();if(input.value.trim())search(null,input.value.trim())})
  const zone=document.getElementById('visual-drop')
  zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('over')})
  zone.addEventListener('dragleave',()=>zone.classList.remove('over'))
  zone.addEventListener('drop',event=>{event.preventDefault();zone.classList.remove('over');if(event.dataTransfer.files[0])search(event.dataTransfer.files[0])})
}
const scanLabels={
  nl:['Zoeken in de overige verkopersfoto’s','Pauzeren','Aanbiedingen gecontroleerd','Niet beschikbaar','Geschatte resterende tijd'],
  ro:['Caută în fotografiile rămase ale vânzătorilor','Pauză','Anunțuri verificate','Indisponibile','Timp rămas estimat'],
  sv:['Sök bland återstående säljarbilder','Pausa','Kontrollerade annonser','Otillgängliga','Beräknad tid kvar'],
  da:['Søg i sælgernes øvrige billeder','Pause','Kontrollerede annoncer','Utilgængelige','Anslået resterende tid'],
  fi:['Hae myyjien muista kuvista','Keskeytä','Tarkistettuja ilmoituksia','Ei saatavilla','Arvioitu jäljellä oleva aika'],
  el:['Αναζήτηση στις υπόλοιπες φωτογραφίες των πωλητών','Παύση','Καταχωρίσεις που ελέγχθηκαν','Μη διαθέσιμες','Εκτιμώμενος χρόνος που απομένει'],
  cs:['Prohledat zbývající fotografie prodejců','Pozastavit','Zkontrolované nabídky','Nedostupné','Odhadovaný zbývající čas'],
  hu:['Keresés az eladók további fotói között','Szünet','Ellenőrzött hirdetések','Nem elérhető','Becsült hátralévő idő'],
  bg:['Търсене в останалите снимки на продавачите','Пауза','Проверени обяви','Недостъпни','Очаквано оставащо време'],
  sk:['Prehľadať zvyšné fotografie predajcov','Pozastaviť','Skontrolované ponuky','Nedostupné','Odhadovaný zostávajúci čas'],
  hr:['Pretraži preostale fotografije prodavača','Pauziraj','Provjereni oglasi','Nedostupno','Procijenjeno preostalo vrijeme'],
  ja:['残りの販売者写真を検索','一時停止','確認済みの出品','取得できなかった出品','推定残り時間'],
  ko:['나머지 판매자 사진 검색','일시 정지','확인한 상품','확인할 수 없는 상품','예상 남은 시간'],
  vi:['Tìm trong các ảnh còn lại của người bán','Tạm dừng','Tin bán hàng đã kiểm tra','Không khả dụng','Thời gian còn lại dự kiến'],
  th:['ค้นหารูปที่เหลือของผู้ขาย','หยุดชั่วคราว','รายการสินค้าที่ตรวจสอบแล้ว','รายการที่ไม่พร้อมใช้งาน','เวลาที่คาดว่าเหลือ'],
  id:['Cari di foto penjual lainnya','Jeda','Daftar produk yang diperiksa','Tidak tersedia','Perkiraan waktu tersisa'],
  en:['Search remaining seller photos','Pause','Seller listings checked','Unavailable','Estimated time remaining'],
  de:['Weitere Verkäuferfotos durchsuchen','Pausieren','Geprüfte Angebote','Nicht verfügbar','Geschätzte Restzeit'],
  fr:['Rechercher dans les autres photos des vendeurs','Pause','Annonces vérifiées','Indisponibles','Temps restant estimé'],
  es:['Buscar en las fotos restantes de vendedores','Pausar','Anuncios revisados','No disponibles','Tiempo restante estimado'],
  it:['Cerca nelle altre foto dei venditori','Pausa','Inserzioni verificate','Non disponibili','Tempo rimanente stimato'],
  pl:['Przeszukaj pozostałe zdjęcia sprzedawców','Wstrzymaj','Sprawdzone oferty','Niedostępne','Szacowany pozostały czas'],
  pt:['Pesquisar nas restantes fotos dos vendedores','Pausar','Anúncios verificados','Indisponíveis','Tempo restante estimado'],
  'zh-CN':['继续检索其余卖家图片','暂停','已核对卖家商品','暂不可用','预计剩余时间']
}
export function visualView({lang,t,escape,base}){
  const words=Object.fromEntries(['matches','searching','imageError','empty'].map(k=>[k,t[k]]));words.base=base;words.version=imageMeta.sellerImages;words.advanced=scanLabels[lang]||scanLabels.en
  return '<section class="visual"><h1>'+escape(t.imgSearch)+'</h1><p>'+escape(t.imageHint)+'</p><div id="visual-drop" class="visual-drop"><label class="btn" for="visual-file">'+escape(t.uploadImage)+'</label><input type="file" accept="image/*" id="visual-file"><small>JPG · PNG · WebP</small><img id="visual-preview" alt="" hidden></div><form id="visual-form" class="search"><input type="url" id="visual-url" required placeholder="'+escape(t.imageUrl)+'" aria-label="'+escape(t.imageUrl)+'"><button>'+escape(t.search)+'</button></form><p id="visual-status" role="status" aria-live="polite"></p><div id="visual-advanced" hidden><button id="visual-scan" type="button">'+escape(words.advanced[0])+'</button><button id="visual-pause" hidden type="button">'+escape(words.advanced[1])+'</button><p id="visual-progress" role="status"></p></div><div id="visual-results" class="cards"></div></section><script type="application/json" id="visual-words">'+JSON.stringify(words).replace(/</g,'\\u003c')+'</script><script>('+visualClient.toString()+')()</script>'
}
