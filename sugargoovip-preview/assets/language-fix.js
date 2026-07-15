(()=>{
  const SEO_LANGS=new Set(['de','fr','es','pl']);
  const INTRO={
    en:'Independent, practical articles covering reverse shopping, image and product-link verification, multi-item order records, order confirmation, QC, warehouse decisions, packing, payments, returns, tracking and destination planning.',
    es:'Artículos independientes y prácticos sobre compras inversas, verificación de imágenes y enlaces, control de pedidos, QC, almacén, embalaje, pagos, devoluciones, seguimiento y planificación del destino.',
    fr:'Articles indépendants et pratiques sur l’achat inversé, la vérification des images et des liens, le suivi des commandes, le QC, l’entrepôt, l’emballage, les paiements, les retours et l’expédition.',
    de:'Unabhängige, praktische Artikel zu Reverse Shopping, Bild- und Linkprüfung, Bestellverwaltung, QC, Lager, Verpackung, Zahlung, Rückgabe, Tracking und Versandplanung.',
    it:'Articoli indipendenti e pratici su acquisti inversi, verifica di immagini e link, gestione ordini, QC, magazzino, imballaggio, pagamenti, resi, tracking e spedizione.',
    pt:'Artigos independentes e práticos sobre compra reversa, verificação de imagens e links, controle de pedidos, QC, armazém, embalagem, pagamentos, devoluções, rastreamento e envio.',
    pl:'Niezależne, praktyczne artykuły o zakupach odwrotnych, weryfikacji zdjęć i linków, kontroli zamówień, QC, magazynie, pakowaniu, płatnościach, zwrotach i wysyłce.',
    nl:'Onafhankelijke, praktische artikelen over reverse shopping, beeld- en linkcontrole, orderbeheer, QC, magazijn, verpakking, betalingen, retouren, tracking en verzending.',
    zh:'独立、实用的反向代购文章，涵盖图片与商品链接核验、多商品订单记录、下单确认、QC、仓库决策、包装、付款、退货、追踪与目的地规划。'
  };

  function normalizedBasePath(){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    let path=match?(match[2]||'/'):location.pathname;
    if(path==='/index.html') path='/';
    if(path==='/guides/index.html') path='/guides/';
    return path;
  }

  function selectedLanguage(){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/|$)/);
    if(match) return match[1];
    const select=document.querySelector('.language-select');
    return (select&&select.value)||localStorage.getItem('sugargooLang')||'en';
  }

  function filterGuideCards(lang){
    document.body.dataset.activeLanguage=lang;
    document.querySelectorAll('.zh-only-guide').forEach(card=>{card.hidden=lang!=='zh';});
    document.querySelectorAll('.en-only-guide').forEach(card=>{card.hidden=lang!=='en';});
    document.querySelectorAll('.core-guide').forEach(card=>{card.hidden=false;});
    const intro=document.querySelector('[data-guide-hub-intro]');
    if(intro&&INTRO[lang]) intro.textContent=INTRO[lang];
  }

  function leaveSeoLocaleForClientLanguage(lang){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    if(!match||lang==='en'||SEO_LANGS.has(lang)) return false;
    localStorage.setItem('sugargooLang',lang);
    const target=normalizedBasePath()+location.search+location.hash;
    location.replace(target);
    return true;
  }

  function refresh(lang){
    if(leaveSeoLocaleForClientLanguage(lang)) return;
    setTimeout(()=>filterGuideCards(lang),0);
  }

  document.addEventListener('DOMContentLoaded',()=>{
    filterGuideCards(selectedLanguage());
    document.addEventListener('change',event=>{
      if(event.target.matches('.language-select')) refresh(event.target.value);
    });
    document.addEventListener('click',event=>{
      const button=event.target.closest('[data-language-button]');
      if(button) refresh(button.dataset.languageButton);
    });
  });
  window.addEventListener('pageshow',()=>filterGuideCards(selectedLanguage()));
})();
