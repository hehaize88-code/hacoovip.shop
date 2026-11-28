import {imageReferences,imageSignatures} from './visual-data.mjs'
import {pageNames,localName,languages} from './i18n.mjs'
import {detail,catalog} from './source.mjs'

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

function allPhotos(p){
 return [...new Set([...p.media.gallery,...p.media.details,...p.media.qc,...p.media.styles.map(s=>s.image),...p.seller.groups.flatMap(g=>g.values.map(v=>v.image)),...p.seller.skus.map(s=>s.image)].filter(Boolean))]
}

export async function visualApi(request) {
  const u=new URL(request.url)
  if(request.method!=='GET')return new Response(null,{status:405})
  const lang=Object.hasOwn(languages,u.searchParams.get('lang'))?u.searchParams.get('lang'):'en'
  const json=value=>Response.json(value,{headers:{'cache-control':'public,max-age=120'}})
  if(u.pathname==='/visual-api/list'){
    const p=Number(u.searchParams.get('p'))
    if(!Number.isInteger(p)||p<1||p>25000)return new Response(null,{status:400})
    const d=await catalog({page:p,count:p===1})
    const labels=await pageNames(d.items.map(x=>x.name),lang)
    return json({items:d.items.map(x=>({...x,label:labels.get(x.name),coverPending:x.image&&!matchesForUrl(x.image).some(m=>String(m.id)===String(x.id))})),pages:p===1?d.pages:undefined,total:p===1?d.total:undefined})
  }
  if(u.pathname==='/visual-api/photos'){
    const id=u.searchParams.get('id')
    if(!/^\d{1,8}$/.test(id))return new Response(null,{status:400})
    const p=await detail(id)
    if(!p)return new Response(null,{status:404})
    const urls=allPhotos(p)
    return json({photos:urls.filter(src=>!matchesForUrl(src).some(m=>String(m.id)===id)),sellerMissing:!!p.marketplaceId&&!p.media.styles.length&&!p.seller.available})
  }
  if(u.pathname==='/visual-api/thumb'){
    let src
    try{src=new URL(u.searchParams.get('url'))}catch{return new Response(null,{status:400})}
    const source=['cnfanshp.com','www.cnfanshp.com'].includes(src.hostname)&&/^\/(uploads|media)\//.test(src.pathname)
    const seller=src.hostname.endsWith('.geilicdn.com')
    if(src.protocol!=='https:'||src.port||src.username||src.password||(!source&&!seller))return new Response(null,{status:400})
    if(seller){src.searchParams.set('w','140');src.searchParams.set('h','140')}
    const r=await fetch(src,{redirect:'manual',signal:AbortSignal.timeout(9000),cf:{cacheEverything:true,cacheTtl:3600}})
    const type=r.headers.get('content-type')||''
    if(!r.ok||!/^image\/(jpeg|png|webp|gif|avif|bmp)/i.test(type))return new Response(null,{status:404})
    return new Response(r.body,{headers:{'content-type':type,'cache-control':'public,max-age=86400','x-content-type-options':'nosniff'}})
  }
  if(u.pathname!=='/visual-api/search')return new Response(null,{status:404})
  let result
  if(u.searchParams.has('url'))result=matchesForUrl(u.searchParams.get('url').slice(0,2048))
  else {
    const value=u.searchParams.get('sig')||''
    if(!/^[0-9a-f]{58}$/i.test(value))return new Response(null,{status:400})
    const q=Array.from(value.match(/../g),n=>parseInt(n,16))
    if(q[28]>127)q[28]-=256
    result=matchesForSignature(q)
  }
  const hits=await Promise.allSettled(result.slice(0,12).map(async match=>{
    const p=await detail(String(match.id),false)
    return p?{...match,name:p.name}:null
  }))
  const matches=hits.filter(x=>x.status==='fulfilled'&&x.value).map(x=>x.value)
  const labels=await pageNames(matches.map(m=>m.name),lang)
  return json(matches.map(m=>({...m,distance:m.distance||0,name:labels.get(m.name)})))

}

// Only the comparison signature or the pasted catalog URL leaves the browser.
function visualClient(){
  const words=JSON.parse(document.getElementById('visual-words').textContent)
  const file=document.getElementById('visual-file'),input=document.getElementById('visual-url')
  const preview=document.getElementById('visual-preview'),state=document.getElementById('visual-status'),results=document.getElementById('visual-results')
  let sequence=0,objectURL,ranked=[]
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
  async function scan(params,serial){
    const button=document.getElementById('scan-toggle'), progress=document.getElementById('scan-progress')
    let paused=false,done=0,missing=0,pages=1,total=0
    button.hidden=false;button.textContent='Ⅱ';button.onclick=()=>{paused=!paused;button.textContent=paused?'▶':'Ⅱ'}
    const check=async()=>{while(paused&&serial===sequence)await new Promise(r=>setTimeout(r,250));if(serial!==sequence)throw Error()}
    const json=async path=>{const r=await fetch('/visual-api/'+path);if(!r.ok)throw Error();return r.json()}
    const query=params.get('sig'), target=params.get('url')
    const key=v=>{const u=new URL(v);return u.hostname.replace(/^www\./,'')+u.pathname}
    const score=(a,b)=>{
      const bytes=s=>s.match(/../g).map(x=>parseInt(x,16))
      const x=bytes(a),y=bytes(b);let sum=0
      for(let i=0;i<16;i++)sum+=(x[i]^y[i]).toString(2).replace(/0/g,'').length*(i<8?.65:.35)
      for(let i=16;i<28;i++)sum+=Math.abs(x[i]-y[i])*20/3060
      return sum+Math.min(5,3*Math.abs(((x[28]+128)%256)-((y[28]+128)%256))/32)
    }
    async function inspect(item,image){
      await check()
      if(!image)return
      const distance=target?(key(image)===key(target)?0:Infinity):score(query,await signature('/visual-api/thumb?url='+encodeURIComponent(image)))
      if(serial!==sequence||distance>28)return
      const prior=ranked.find(m=>String(m.id)===String(item.id))
      if(prior&&prior.distance<=distance)return
      ranked=ranked.filter(m=>m!==prior).concat({id:item.id,name:item.label||item.name,image,distance}).sort((a,b)=>a.distance-b.distance).slice(0,20)
      draw()
    }
    try{
      for(let n=1;n<=pages;n++){
        await check()
        const data=await json('list?p='+n+'&lang='+params.get('lang'))
        if(n===1){pages=data.pages;total=data.total}
        let next=0
        async function lane(){
          while(next<data.items.length){
            await check()
            const item=data.items[next++]
            try{
              if(item.coverPending){try{await inspect(item,item.image)}catch{missing++}}
              const extra=await json('photos?id='+item.id)
              if(extra.sellerMissing)missing++
              for(const url of extra.photos){try{await inspect(item,url)}catch{missing++}}
            }catch{missing++}
            if(serial!==sequence)return
            done++
            progress.textContent=words.all+' · '+done+' / '+total+(missing?' · '+words.failed+' '+missing:'')
          }
        }
        await Promise.all([lane(),lane()])
      }
    }catch{if(serial===sequence)progress.textContent=words.imageError}
    finally{if(serial===sequence)button.hidden=true}
  }
  async function search(upload,url){
    const serial=++sequence
    document.getElementById("scan-progress").textContent="";document.getElementById("scan-toggle").hidden=true;
    results.replaceChildren();state.textContent=words.searching;preview.hidden=true;preview.removeAttribute('src')
    if(objectURL)URL.revokeObjectURL(objectURL)
    try{
      const params=new URLSearchParams({lang:document.documentElement.lang})
      if(upload){
        if(upload.size>20*1024*1024||!upload.type.startsWith('image/'))throw Error()
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
      draw()
      if(!matches.length||matches[0].distance>0)void scan(params,serial)
      else{
        const button=document.getElementById('scan-toggle')
        button.hidden=false;button.textContent=words.all
        button.onclick=()=>scan(params,serial)
      }
    }catch{if(serial===sequence)state.textContent=words.imageError}
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
  file.addEventListener('change',()=>{if(file.files[0])search(file.files[0]);file.value=''})
  document.getElementById('visual-form').addEventListener('submit',e=>{e.preventDefault();if(input.value.trim())search(null,input.value.trim())})
  document.addEventListener('paste',e=>{
    const pasted=[...(e.clipboardData?.items||[])].find(item=>item.kind==='file'&&item.type.startsWith('image/'))?.getAsFile()
    if(pasted){e.preventDefault();search(pasted)}
  })
  const zone=document.getElementById('visual-drop')
  zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('over')})
  zone.addEventListener('dragleave',()=>zone.classList.remove('over'))
  zone.addEventListener('drop',event=>{event.preventDefault();zone.classList.remove('over');if(event.dataTransfer.files[0])search(event.dataTransfer.files[0])})
}
export function visualView({lang,t,escape,base}){
  const words=Object.fromEntries(['matches','searching','imageError','empty'].map(k=>[k,t[k]]));words.base=base;words.all=t.all;words.failed=t.error
  return '<section class="visual"><h1>'+escape(t.imgSearch)+'</h1><p>'+escape(t.imageHint)+'</p><div id="visual-drop" class="visual-drop"><label class="btn" for="visual-file">'+escape(t.uploadImage)+'</label><input type="file" accept="image/*" id="visual-file"><small>JPG · PNG · WebP</small><img id="visual-preview" alt="" hidden></div><form id="visual-form" class="search"><input type="url" id="visual-url" required placeholder="'+escape(t.imageUrl)+'" aria-label="'+escape(t.imageUrl)+'"><button>'+escape(t.search)+'</button></form><p id="visual-status" role="status" aria-live="polite"></p><button type="button" id="scan-toggle" hidden></button><p id="scan-progress" role="status"></p><div id="visual-results" class="cards"></div></section><script type="application/json" id="visual-words">'+JSON.stringify(words).replace(/</g,'\\u003c')+'</script><script>('+visualClient.toString()+')()</script>'
}
