const supported = ['CNY','USD','EUR','GBP','AUD','BRL','CAD','CHF','CZK','DKK','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','TWD','ZAR'];
let recent;
export async function exchangeRates() {
  try {
    if (!recent || Date.now() > recent.refresh) {
      const response = await fetch('https://open.er-api.com/v6/latest/CNY', {cf:{cacheTtl:3600,cacheEverything:true},signal:AbortSignal.timeout(7000)});
      if (!response.ok) throw Error('rates');
      const data = await response.json();
      if (data.result !== 'success' || data.base_code !== 'CNY' || !data.time_last_update_unix) throw Error('rates');
      const rates = Object.fromEntries(supported.filter(k=>Number.isFinite(data.rates[k]) && data.rates[k]>0).map(k=>[k,data.rates[k]]));
      recent = {rates, date:new Date(data.time_last_update_unix*1000).toISOString().slice(0,10), refresh:Date.now()+3600000};
    }
  } catch { /* A previous successful response retains its original date. */ }
  return Response.json(recent ? {rates:recent.rates,date:recent.date} : {rates:{CNY:1}}, {headers:{'Cache-Control':recent?'public,max-age=900':'no-store'}});
}
export const currencySelect = '<select id="currency" aria-label="ISO 4217">'+supported.map(k=>'<option value="'+k+'" '+(k==='CNY'?'selected':'disabled')+'>'+k+'</option>').join('')+'</select>';
function currencyClient() {
  const select = document.querySelector('#currency');
  fetch('/api/exchange-rates').then(r=>r.json()).then(({rates,date})=>{
    const prices = document.querySelectorAll('[data-cny]');
    let preferred; try { preferred=localStorage.getItem('bbd-currency'); } catch {}
    for (const option of select.options) option.disabled=!rates[option.value];
    select.value=rates[preferred]?preferred:(rates.USD?'USD':'CNY');
    function apply() {
      const code=select.value;
      const format=new Intl.NumberFormat(document.documentElement.lang,{style:'currency',currency:code,currencyDisplay:'narrowSymbol'});
      for (const price of prices) if (price.dataset.cny && Number.isFinite(Number(price.dataset.cny))) {
        price.textContent=format.format(Number(price.dataset.cny)*rates[code])+' '+code;
        price.title=date?date+' · ExchangeRate-API':'';
      }
      try {localStorage.setItem('bbd-currency',code)}catch{}
    }
    apply(); window.addEventListener('bbd-price-update',apply); select.addEventListener('change',apply);
    if(date){const credit=document.querySelector('#fx-credit');credit.textContent='ExchangeRate-API · '+date;credit.hidden=false;}
  }).catch(()=>{});
}
export const currencyScript = '<script>('+currencyClient.toString()+')();</script>';
