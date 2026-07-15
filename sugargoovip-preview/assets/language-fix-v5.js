(()=>{
  const SEO_PREFIX=/^\/(de|fr|es|pl)(?=\/|$)/;
  const INTRO={
    en:'Independent, practical articles covering reverse shopping, image and product-link verification, order records, confirmation, QC, warehouse decisions, packing, payments, returns, tracking and destination planning.',
    es:'Artículos independientes y prácticos sobre compra inversa, verificación de imágenes y enlaces, control de pedidos, QC, almacén, embalaje, pagos, devoluciones, seguimiento y planificación del destino.',
    fr:'Articles indépendants et pratiques sur l’achat inversé, la vérification des images et des liens, le suivi des commandes, le QC, l’entrepôt, l’emballage, les paiements, les retours et l’expédition.',
    de:'Unabhängige, praktische Artikel zu Reverse Shopping, Bild- und Linkprüfung, Bestellverwaltung, QC, Lager, Verpackung, Zahlung, Rückgabe, Tracking und Versandplanung.',
    it:'Articoli indipendenti e pratici su acquisti inversi, verifica di immagini e link, gestione ordini, QC, magazzino, imballaggio, pagamenti, resi, tracking e spedizione.',
    pt:'Artigos independentes e práticos sobre compra reversa, verificação de imagens e links, controle de pedidos, QC, armazém, embalagem, pagamentos, devoluções, rastreamento e envio.',
    pl:'Niezależne, praktyczne artykuły o zakupach odwrotnych, weryfikacji zdjęć i linków, kontroli zamówień, QC, magazynie, pakowaniu, płatnościach, zwrotach i wysyłce.',
    nl:'Onafhankelijke, praktische artikelen over reverse shopping, beeld- en linkcontrole, orderbeheer, QC, magazijn, verpakking, betalingen, retouren, tracking en verzending.',
    zh:'独立、实用的反向代购文章，涵盖图片与商品链接核验、多商品订单记录、下单确认、QC、仓库决策、包装、付款、退货、追踪与目的地规划。'
  };

  const FIRST_FIVE={
    en:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['How to Organize a Multi-Item Sugargoo Reverse-Shopping Order','Use batch numbers, item IDs and status records to prevent mixed, missing or incorrectly changed items.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['How to Find a Sugargoo Product from an Image','Turn a screenshot into search clues, compare candidate links and verify the listing before ordering.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['How to Prevent Last-Minute Changes in Sugargoo Orders','Use confirmation checkpoints before purchase, after listing changes and before international shipping.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Which Orders Fit a Sugargoo Reverse-Shopping Workflow?','Judge an order by product clarity, information changes, cross-border limits and communication cost.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['How Does Sugargoo Reverse Shopping Work?','Verify the product link, selected variant, cost breakdown and pre-shipping details before proceeding.']
    },
    it:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Come organizzare un ordine Sugargoo con più articoli','Usa numeri di lotto, codici articolo e stati per evitare scambi, omissioni e modifiche errate.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Come trovare un prodotto Sugargoo da un’immagine','Trasforma lo screenshot in indizi, confronta i link e verifica l’inserzione.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Come evitare modifiche tardive negli ordini Sugargoo','Conferma prima dell’acquisto, dopo i cambiamenti e prima della spedizione.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quali ordini sono adatti al reverse shopping Sugargoo?','Valuta chiarezza, cambiamenti, limiti internazionali e costi di comunicazione.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Come funziona il reverse shopping con Sugargoo?','Verifica link, variante, costi e dettagli prima della spedizione.']
    },
    pt:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Como organizar um pedido Sugargoo com vários itens','Use números de lote, códigos por item e registros de status para evitar trocas e omissões.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Como encontrar um produto Sugargoo usando uma imagem','Transforme a captura em pistas, compare links candidatos e confirme o anúncio.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Como evitar mudanças de última hora em pedidos Sugargoo','Confirme antes da compra, após mudanças e antes do envio internacional.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quais pedidos combinam com a compra reversa Sugargoo?','Avalie clareza, mudanças de informação, limites e custo de comunicação.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Como funciona a compra reversa com Sugargoo?','Verifique link, variação, custos e detalhes antes do envio.']
    },
    es:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Cómo organizar un pedido Sugargoo con varios productos','Usa números de lote, códigos por artículo y estados para evitar mezclas y errores.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Cómo encontrar un producto Sugargoo a partir de una imagen','Convierte la captura en pistas, compara enlaces y verifica el anuncio.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Cómo evitar cambios de última hora en pedidos Sugargoo','Confirma antes de comprar, después de cambios y antes del envío.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['¿Qué pedidos encajan con la compra inversa Sugargoo?','Evalúa claridad, cambios, límites transfronterizos y comunicación.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['¿Cómo funciona la compra inversa con Sugargoo?','Verifica enlace, variante, costes y datos previos al envío.']
    },
    fr:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Organiser une commande Sugargoo avec plusieurs articles','Utilisez des numéros de lot, des identifiants et des statuts pour éviter les confusions.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Trouver un produit Sugargoo à partir d’une image','Transformez la capture en indices, comparez les liens et vérifiez l’annonce.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Éviter les modifications tardives des commandes Sugargoo','Confirmez avant l’achat, après un changement et avant l’expédition.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quelles commandes conviennent à l’achat inversé Sugargoo ?','Évaluez la clarté, les changements, les limites et la communication.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Comment fonctionne l’achat inversé avec Sugargoo ?','Vérifiez le lien, la variante, les coûts et les détails avant l’envoi.']
    },
    de:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Mehrere Sugargoo-Artikel richtig organisieren','Chargen- und Artikelnummern verhindern Verwechslungen und falsche Änderungen.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Ein Sugargoo-Produkt anhand eines Bildes finden','Nutzen Sie Bildmerkmale, vergleichen Sie Links und prüfen Sie das Angebot.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Kurzfristige Änderungen bei Sugargoo-Bestellungen vermeiden','Bestätigen Sie vor dem Kauf, nach Änderungen und vor dem Versand.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Welche Bestellungen eignen sich für Sugargoo Reverse Shopping?','Bewerten Sie Produktklarheit, Änderungen, Grenzen und Kommunikation.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Wie funktioniert Reverse Shopping mit Sugargoo?','Prüfen Sie Link, Variante, Kosten und Versanddetails.']
    },
    pl:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Jak uporządkować zamówienie Sugargoo z wieloma produktami','Numery partii, kody produktów i statusy pomagają uniknąć pomyłek.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Jak znaleźć produkt Sugargoo na podstawie zdjęcia','Zamień obraz na wskazówki, porównaj linki i sprawdź ofertę.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Jak uniknąć późnych zmian w zamówieniach Sugargoo','Potwierdź przed zakupem, po zmianie i przed wysyłką.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Jakie zamówienia pasują do reverse shopping Sugargoo?','Oceń jasność produktu, zmiany, ograniczenia i komunikację.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Jak działa reverse shopping z Sugargoo?','Sprawdź link, wariant, koszty i dane przed wysyłką.']
    },
    nl:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Een Sugargoo-bestelling met meerdere artikelen organiseren','Gebruik batchnummers, itemcodes en statussen om verwisselingen te voorkomen.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Een Sugargoo-product vinden met een afbeelding','Zet de afbeelding om in aanwijzingen, vergelijk links en controleer de aanbieding.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Late wijzigingen in Sugargoo-bestellingen voorkomen','Bevestig vóór aankoop, na wijzigingen en vóór internationale verzending.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Welke bestellingen passen bij Sugargoo reverse shopping?','Beoordeel duidelijkheid, wijzigingen, grenzen en communicatiekosten.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Hoe werkt reverse shopping met Sugargoo?','Controleer link, variant, kosten en gegevens vóór verzending.']
    },
    zh:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Sugargoo反向代购多商品订单怎么整理？','用整单编号、子编号和状态记录防止串单、漏单与误改。'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Sugargoo反向代购只有图片怎么找商品？','把截图拆成视觉线索，建立候选链接并核验商品页。'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Sugargoo反向代购如何避免临时改单？','在采购前、信息变化时和寄送前设置确认节点。'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Sugargoo反向代购适合什么订单？','从商品可描述性、信息变化、跨境限制和沟通成本判断。'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Sugargoo反向代购怎么做？','核对商品链接、规格、成本拆分与寄送前信息。']
    }
  };

  function selectedLanguage(){
  return localStorage.getItem('sugargooLang')||(location.pathname.match(/^\/(de|fr|es|pl)(\/|$)/)?.[1])||'en';
}
function cardKey(card){
  try{return new URL(card.getAttribute('href'),location.href).pathname.split('/').filter(Boolean).pop()||'';}catch{return '';}
}
function localizeGuideCards(lang){
  document.querySelectorAll('.guide-card').forEach(card=>{
    card.hidden=false;card.removeAttribute('hidden');
    const copy=(FIRST_FIVE[lang]||FIRST_FIVE.en)[cardKey(card)];
    if(!copy)return;
    const h=card.querySelector('h3'),p=card.querySelector('p');
    if(h)h.textContent=copy[0];if(p)p.textContent=copy[1];
  });
  const intro=document.querySelector('[data-guide-hub-intro],.guide-hub .article-lead');
  if(intro&&INTRO[lang])intro.textContent=INTRO[lang];
}
document.addEventListener('DOMContentLoaded',()=>localizeGuideCards(selectedLanguage()));
window.addEventListener('sugargoo:languagechange',event=>localizeGuideCards(event.detail.lang));
window.addEventListener('pageshow',()=>localizeGuideCards(selectedLanguage()));
})();