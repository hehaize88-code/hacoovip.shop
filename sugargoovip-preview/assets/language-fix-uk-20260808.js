(()=>{
  const SUPPORTED=new Set(['en','es','fr','de','it','pt','pl','nl','zh']);
  const SEO_LANGS=new Set(['de','fr','es','pl']);
  const CORE_ROUTES=new Set(['/','/guides/','/guides/what-is-sugargoo.html','/guides/qc-guide.html','/guides/shipping-guide.html','/guides/alternative.html','/faq.html']);

  function normalizePath(path){
    path=(path||'/').replace(/^\/(de|fr|es|pl)(?=\/|$)/,'')||'/';
    if(path==='/index.html')path='/';
    if(path==='/guides/index.html')path='/guides/';
    return path;
  }

  function pathForLanguage(lang,path){
    path=normalizePath(path);
    return SEO_LANGS.has(lang)&&CORE_ROUTES.has(path)?'/'+lang+(path==='/'?'/':path):path;
  }

  function safeStore(lang){
    try{localStorage.setItem('sugargooLang',lang)}catch{}
  }

  function selectedLanguage(){const q=new URLSearchParams(location.search).get('lang');return q||localStorage.getItem('sugargooLang')||'en';}
function cardKey(card){try{return new URL(card.getAttribute('href'),location.href).pathname.split('/').filter(Boolean).pop()||'';}catch{return '';}}
function localizeGuideCards(lang){document.querySelectorAll('.guide-card').forEach(card=>{card.hidden=false;card.removeAttribute('hidden');const dictionary=(typeof L!=='undefined'&&(L[lang]||L.en))||{};const copy=dictionary[cardKey(card)];if(!copy)return;const h=card.querySelector('h3'),p=card.querySelector('p');if(h)h.textContent=copy[0];if(p)p.textContent=copy[1];});const intro=document.querySelector('[data-guide-hub-intro],.guide-hub .article-lead');if(intro&&typeof INTRO!=='undefined'&&INTRO[lang])intro.textContent=INTRO[lang];}
document.addEventListener('DOMContentLoaded',()=>localizeGuideCards(selectedLanguage()));window.addEventListener('sugargoo:languagechange',event=>localizeGuideCards(event.detail.lang));window.addEventListener('pageshow',()=>localizeGuideCards(selectedLanguage()));})();