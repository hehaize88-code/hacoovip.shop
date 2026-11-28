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

export function visualView({lang,t,escape,base}){
  const words=Object.fromEntries(['matches','searching','imageError','empty'].map(k=>[k,t[k]]));words.base=base;words.all=t.all;words.failed=t.error
  return '<section class="visual"><h1>'+escape(t.imgSearch)+'</h1><p>'+escape(t.imageHint)+'</p><div id="visual-drop" class="visual-drop"><label class="btn" for="visual-file">'+escape(t.uploadImage)+'</label><input type="file" accept="image/*" id="visual-file"><small>JPG · PNG · WebP</small><img id="visual-preview" alt="" hidden></div><form id="visual-form" class="search"><input type="url" id="visual-url" required placeholder="'+escape(t.imageUrl)+'" aria-label="'+escape(t.imageUrl)+'"><button>'+escape(t.search)+'</button></form><p id="visual-status" role="status" aria-live="polite"></p><button type="button" id="scan-toggle" hidden></button><p id="scan-progress" role="status"></p><div id="visual-results" class="cards"></div></section><script type="application/json" id="visual-words">'+JSON.stringify(words).replace(/</g,'\\u003c')+'</script><script>('+visualClientSource+')()</script>'
}
