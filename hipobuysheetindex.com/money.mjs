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

