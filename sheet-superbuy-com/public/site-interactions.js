/* Native navigation retains each language URL; no remote translation is required. */
(() => {
  const lang=document.documentElement.lang;
  const track=(name,fields)=>window.gtag?.('event',name,{...fields,page_path:location.pathname,content_language:lang});
  document.addEventListener('click',event=>{
    const anchor=event.target.closest?.('a[href]');if(!anchor)return;
    const dest=new URL(anchor.href,location.href);
    if(anchor.dataset.language){localStorage.setItem('sheet-language',anchor.dataset.language);track('language_change',{selected_language:anchor.dataset.language});}
    else if(dest.hostname==='www.cnfanshp.com'||dest.hostname==='cnfanshp.com'){
      const kind=/\/AllProducts\/\d+\.html$/.test(dest.pathname)?'product':dest.pathname==='/AllProducts/'?'catalogue':'category';
      track('main_site_click',{link_type:kind,link_domain:dest.hostname,link_url:dest.href,link_text:anchor.textContent.trim().slice(0,100)});
    }else if(dest.origin===location.origin&&dest.pathname.includes('/articles/'))track('article_click',{link_url:dest.href});
  });
  document.addEventListener('submit',event=>{
    const form=event.target;if(!form.matches('form[role="search"]'))return;
    const input=form.querySelector('[name="keywords"]');if(!input.value.trim()){event.preventDefault();input.focus();return;}
    // Do not transmit free-form search text to analytics.
    track('search_submit',{search_used:true,link_domain:new URL(form.action).hostname});
  });
  for(const box of document.querySelectorAll('[data-calculator="chargeable-weight"]')){
    const inputs=[...box.querySelectorAll('input')],outputs=box.querySelectorAll('.calculator-results strong');let tracked=false;
    const update=()=>{const values=inputs.map(x=>Number(x.value));const valid=values.every((n,i)=>Number.isFinite(n)&&(i===4?n>0:n>=0));const [actual,l,w,h,d]=values;const volume=l*w*h/d;const data=[actual,volume,Math.max(actual,volume)];outputs.forEach((el,i)=>el.textContent=valid?`${data[i].toLocaleString(lang,{minimumFractionDigits:2,maximumFractionDigits:2})} kg`:'—');};
    inputs.forEach(input=>input.addEventListener('input',()=>{update();if(!tracked){track('shipping_calculator_use',{calculator:'chargeable_weight'});tracked=true;}}));update();
  }
})();
