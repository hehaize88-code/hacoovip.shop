/* Native interactions for the fully localized static export. */
(() => {
  const languages=['en','de','es','fr','it','pl','pt','zh'];
  const lang=document.body.dataset.locale || 'en';
  const route=document.body.dataset.route || '/';
  const url=new URL(location.href), legacy=url.searchParams.get('lang');
  const local=(l)=> (l==='en'?'':'/'+l)+route;
  if(languages.includes(legacy)){url.pathname=local(legacy);url.searchParams.delete('lang');location.replace(url.href);return;}
  const languageSelect=document.querySelector('.language-select select');
  if(languageSelect){languageSelect.value=lang;languageSelect.addEventListener('change',()=>{const next=languageSelect.value;if(languages.includes(next)){try{localStorage.setItem('hipobuy-language',next);}catch{} location.assign(local(next)+location.hash);}});}
  const track=(name,data)=>{if(typeof window.gtag==='function')window.gtag('event',name,{page_language:lang,source_path:location.pathname,...data});};
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href]');if(!a)return;
    const u=new URL(a.href,location.href);
    if(['cnfanshp.com','www.cnfanshp.com'].includes(u.hostname)){
      const match=u.pathname.match(/^\/AllProducts\/(\d+)\.html$/i);
      const name=match?'outbound_product_click':u.pathname==='/search.html'?'outbound_search_click':u.pathname==='/'?'outbound_catalog_click':'outbound_category_click';
      track(name,{link_url:u.href,link_text:a.textContent.trim().slice(0,100),...(match?{product_id:match[1]}:{})});
    } else if(u.origin===location.origin && /\/articles\/.+/.test(u.pathname))track('article_click',{link_url:u.href});
  });
  document.querySelectorAll('form.hero-search').forEach(form=>form.addEventListener('submit',event=>{const input=form.querySelector('[name=keywords]');input.value=input.value.trim();if(!input.value){event.preventDefault();return;}track('site_search',{search_term:input.value});}));
  const cards=[...document.querySelectorAll('.product-card')];
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===button);x.setAttribute('aria-pressed',String(x===button));});cards.forEach(card=>{card.hidden=button.dataset.filter!=='All' && card.dataset.category!==button.dataset.filter;});}));
  const query=document.querySelector('.sheet-controls input'),category=document.querySelector('.sheet-controls select'),rows=[...document.querySelectorAll('.data-row')];
  const filterRows=()=>{const q=(query?.value||'').trim().toLowerCase(),c=category?.value||'All';let n=0;rows.forEach(row=>{const cat=row.dataset.category;row.hidden=!(row.dataset.search.includes(q) && (c==='All'||c.toLowerCase()===cat));if(!row.hidden)n++;});const counter=document.querySelector('.sheet-controls>span');if(counter)counter.textContent=counter.textContent.replace(/\d+\s*\/\s*\d+/,`${n} / ${rows.length}`);};
  query?.addEventListener('input',filterRows);category?.addEventListener('change',filterRows);
  const number=(form,name)=>{const field=form.elements.namedItem(name);return field.value.trim()===''?NaN:Number(field.value);};
  const format=(value,digits)=>new Intl.NumberFormat(lang==='zh'?'zh-CN':lang,{maximumFractionDigits:digits,minimumFractionDigits:digits}).format(value);
  const weights=document.getElementById('weight-planner');
  if(weights){weights.addEventListener('submit',e=>e.preventDefault());weights.addEventListener('input',()=>{const [w,l,b,h,d]=['weight','length','width','height','divisor'].map(n=>number(weights,n));const valid=[w,l,b,h,d].every(x=>Number.isFinite(x)&&x>0);document.getElementById('volume-result').textContent=valid?format(l*b*h/d,3):'—';document.getElementById('chargeable-result').textContent=valid?format(Math.max(w,l*b*h/d),3):'—';});}
  const budget=document.getElementById('budget-planner');
  if(budget){budget.addEventListener('submit',e=>e.preventDefault());budget.addEventListener('input',()=>{const values=[...budget.querySelectorAll('input')].map(x=>x.value.trim()===''?NaN:Number(x.value));const invalid=values.some(x=>Number.isFinite(x)&&x<0);const known=values.filter(Number.isFinite);document.getElementById('budget-result').textContent=!invalid&&known.length?format(known.reduce((a,b)=>a+b,0),2):'—';document.getElementById('budget-missing').textContent=String(values.filter(x=>!Number.isFinite(x)).length);});}
})();
