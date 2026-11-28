const currencies='USD CNY EUR GBP CAD AUD JPY KRW PLN BRL CHF TWD HKD SGD SEK DKK NOK CZK HUF INR IDR MYR MXN NZD PHP RON THB TRY ZAR ILS ISK'.split(' ')
let latest
async function ratesResponse(){
 if(!latest||Date.now()>latest.expires){
  try{
   const res=await fetch('https://open.er-api.com/v6/latest/USD',{signal:AbortSignal.timeout(4500),cf:{cacheTtl:3600,cacheEverything:true}})
   if(!res.ok)throw new Error()
   const d=await res.json()
   if(d.base_code!=='USD'||!currencies.every(k=>Number.isFinite(d.rates?.[k])&&d.rates[k]>0))throw new Error()
   latest={date:d.time_last_update_utc,rates:d.rates,expires:Date.now()+3600000}
  }catch{latest={...(latest||seed),expires:Date.now()+60000}}
 }
 return Response.json({date:latest.date,rates:latest.rates},{headers:{'Cache-Control':'public,max-age=600'}})
}
function priceTag(n,lang){
 const v=String(n??'').trim()
 if(!/^\d+(?:\.\d+)?$/.test(v))return ''
 const formatted=new Intl.NumberFormat(lang,{style:'currency',currency:'USD'}).format(Number(v)/seed.rates.CNY)
 return '<span data-cny="'+v+'">'+formatted+'</span>'
}
function moneyScript(){
 const picker=document.querySelector('#currency')
 const fallback=JSON.parse(document.getElementById('rate-seed').textContent)
 let data=fallback
 try{
  const saved=JSON.parse(sessionStorage.getItem('kakobuy-rates'))
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
  try{localStorage.setItem('kakobuy-currency',currency)}catch{}
 }
 let initial='USD'
 try{initial=localStorage.getItem('kakobuy-currency')||'USD'}catch{}
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
  try{sessionStorage.setItem('kakobuy-rates',JSON.stringify(data))}catch{}
  apply()
 }).catch(()=>{})
}
