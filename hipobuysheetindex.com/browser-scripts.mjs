export function visualClient(){
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

export function bindProduct(){
 const root=document.querySelector('[data-product-view]')
 if(!root)return
 const model=JSON.parse(root.querySelector('.pd-model').textContent)
 const main=root.querySelector('.pd-main img')
 const mainLink=root.querySelector('.pd-main')
 const copyButton=root.querySelector('[data-copy-item]')
 const status=root.querySelector('.pd-status')
 const fields=[...root.querySelectorAll('[data-option-field]')]
 const selected=new Map()
 let target=copyButton?.dataset.copyItem
 const setImage=src=>{
   if(!src||!main)return
   main.src=src
   mainLink.href=src
   const counter=mainLink.querySelector('output')
   if(counter){
     const index=model.gallery.indexOf(src)
     counter.hidden=index<0
     if(index>=0)counter.textContent=(index+1)+' / '+model.gallery.length
   }
 }
 const tiles=root.querySelector('.pd-tiles')
 if(tiles){
   let drag=null,skipClick=false
   tiles.addEventListener('pointerdown',event=>{
     if(event.pointerType!=='mouse'||event.button!==0)return
     drag={id:event.pointerId,y:event.clientY,top:tiles.scrollTop,active:false}
     skipClick=false
   })
   tiles.addEventListener('pointermove',event=>{
     if(!drag||event.pointerId!==drag.id||event.buttons!==1)return
     const delta=drag.y-event.clientY
     if(!drag.active&&Math.abs(delta)<6)return
     if(tiles.scrollHeight<=tiles.clientHeight)return
     if(!drag.active)tiles.setPointerCapture(drag.id)
     drag.active=true;tiles.scrollTop=drag.top+delta
   })
   const end=()=>{skipClick=!!drag?.active;drag=null}
   tiles.addEventListener('pointerup',end)
   tiles.addEventListener('pointercancel',end)
   tiles.addEventListener('dragstart',e=>e.preventDefault())
   tiles.addEventListener('click',event=>{if(skipClick){event.stopPropagation();skipClick=false}},true)
 }
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
     if(exact?.url)target=exact.url
     copyButton.disabled=!!chosen.length&&!exact
     copyButton.textContent=chosen.length?copyButton.dataset.styleText:copyButton.dataset.itemText
   }
   status.textContent=chosen.length&&!exact?model.hint:''
   if(exact?.image)setImage(exact.image)
 }
 root.addEventListener('click',async ev=>{
   const b=ev.target.closest('button')
   if(!b)return
   if(b.dataset.photo){
     status.textContent=''
     setImage(b.dataset.photo)
     for(const anchor of document.querySelectorAll('.locale-list a')){
       const url=new URL(anchor.href)
       url.searchParams.set('photo',b.dataset.photo)
       anchor.href=url.href
     }
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
 else if(model.photo){
   const restored=[...root.querySelectorAll('[data-photo]')].find(b=>b.dataset.photo===model.photo)
   if(restored)restored.click()
 }
}

export function bindLanguagePicker(){
 const picker=document.querySelector('.locale-picker')
 const summary=picker.querySelector('summary')
 document.addEventListener('pointerdown',event=>{if(picker.open&&!picker.contains(event.target))picker.open=false})
 picker.addEventListener('keydown',event=>{if(event.key==='Escape'){picker.open=false;summary.focus()}})
}

export function moneyScript(){
 const picker=document.querySelector('#currency')
 const fallback=JSON.parse(document.getElementById('rate-seed').textContent)
 let data=fallback
 try{
  const saved=JSON.parse(sessionStorage.getItem('hipobuy-rates'))
  if(saved?.rates?.USD===1&&[...picker.options].every(o=>Number(saved.rates[o.value])>0)&&Date.parse(saved.date)>=Date.parse(fallback.date))data=saved
 }catch{}
 function apply(){
  const currency=picker.value
  const factor=Number(data.rates[currency])/Number(data.rates.CNY)
  if(!Number.isFinite(factor)||factor<=0)return
  const format=new Intl.NumberFormat(document.documentElement.lang,{style:'currency',currency})
  const date=new Intl.DateTimeFormat(document.documentElement.lang,{dateStyle:'medium'}).format(new Date(data.date))
  for(const n of document.querySelectorAll('[data-cny]')){
   n.textContent=format.format(Number(n.dataset.cny)*factor)
   n.title='CNY / '+currency+' · '+date
  }
  const credit=document.querySelector('[data-rate-date]')
  if(credit)credit.textContent=date
  try{localStorage.setItem('hipobuy-currency',currency)}catch{}
 }
 let initial='USD'
 try{initial=localStorage.getItem('hipobuy-currency')||'USD'}catch{}
 if([...picker.options].some(o=>o.value===initial))picker.value=initial
 window.addEventListener('currency-refresh',apply)
 const selectors=[...document.querySelectorAll('[data-currency]')]
 for(const select of selectors){
  select.value=picker.value
  select.addEventListener('change',()=>{
   for(const other of selectors)other.value=select.value
   apply()
  })
 }
 apply()
 fetch('/exchange-rates.json').then(r=>r.ok?r.json():null).then(fresh=>{
  if(fresh?.rates?.USD!==1||!(fresh.rates.CNY>0)||!(fresh.rates[picker.value]>0)||Date.parse(fresh.date)<Date.parse(data.date))return
  data=fresh
  try{sessionStorage.setItem('hipobuy-rates',JSON.stringify(data))}catch{}
  apply()
 }).catch(()=>{})
}
