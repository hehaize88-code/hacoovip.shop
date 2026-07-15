const SITE = "https://sugargoovip.uk";
const MAIN = "https://www.cnfanshp.com";
const UPDATED = "2026-07-10";

const SEO_LANGS = ["de", "fr", "es", "pl"];
const CORE_ROUTES = new Set([
  "/", "/guides/", "/guides/what-is-sugargoo.html",
  "/guides/qc-guide.html", "/guides/shipping-guide.html",
  "/guides/alternative.html", "/faq.html"
]);
const SEO_META = {
  de: {
    home:["Sugargoo Tabelle 2026 | Produktfunde, QC und Versand","Entdecken Sie Produktlinks, tägliche Funde, Kategorien sowie unabhängige QC- und Versandratgeber für Sugargoo."],
    guides:["Sugargoo Ratgeber 2026 | QC, Versand und Alternativen","Unabhängige Sugargoo-Ratgeber zu Einkaufsablauf, QC-Fotos, Versandkosten, Tracking und Alternativen."],
    what:["Was ist Sugargoo? Einkaufsagent und Ablauf erklärt","Erfahren Sie, wie der Sugargoo-Einkaufsablauf von Produktlink und Lager bis QC, Verpackung und internationalem Versand funktioniert."],
    qc:["Sugargoo QC-Fotos 2026 | Checkliste vor dem Versand","Prüfen Sie Größe, Farbe, Nähte, Logos, Zubehör, Maße und sichtbare Mängel anhand von Sugargoo-QC-Fotos."],
    shipping:["Sugargoo Versandratgeber 2026 | Kosten, Routen und Tracking","Vergleichen Sie Sugargoo-Versandrouten nach Abrechnungsgewicht, Gesamtkosten, Einschränkungen, Tracking und realistischer Laufzeit."],
    alternative:["Sugargoo Alternativen 2026 | Einkaufsagenten vergleichen","Vergleichen Sie Sugargoo-Alternativen anhand von Zahlung, QC, Lagerung, Rückgabe, Support, Verpackung und Versandrouten."],
    faq:["Sugargoo FAQ 2026 | Bestellung, QC, Versand und Rückgabe","Antworten auf häufige Fragen zu Sugargoo-Bestellungen, QC-Fotos, Versanddauer, Rückgaben und Abrechnungsgewicht."]
  },
  fr: {
    home:["Tableur Sugargoo 2026 | Produits, QC et expédition","Découvrez des liens produits, des sélections, des catégories et des guides indépendants sur le QC et l’expédition Sugargoo."],
    guides:["Guides Sugargoo 2026 | QC, expédition et alternatives","Guides indépendants sur le fonctionnement de Sugargoo, les photos QC, les coûts d’expédition, le suivi et les alternatives."],
    what:["Qu’est-ce que Sugargoo ? Fonctionnement de l’agent d’achat","Comprenez le processus Sugargoo, du lien produit à l’entrepôt, aux photos QC, à l’emballage et à l’expédition internationale."],
    qc:["Photos QC Sugargoo 2026 | Liste de contrôle avant envoi","Vérifiez taille, couleur, coutures, logos, accessoires, mesures et défauts visibles grâce aux photos QC Sugargoo."],
    shipping:["Guide d’expédition Sugargoo 2026 | Coûts, lignes et suivi","Comparez les lignes Sugargoo selon le poids facturable, le coût total, les restrictions, le suivi et les délais réalistes."],
    alternative:["Alternatives à Sugargoo 2026 | Comparer les agents d’achat","Comparez les alternatives à Sugargoo selon les paiements, le QC, le stockage, les retours, le support et les lignes d’expédition."],
    faq:["FAQ Sugargoo 2026 | Commandes, QC, expédition et retours","Réponses aux questions fréquentes sur les commandes Sugargoo, les photos QC, les délais, les retours et le poids facturable."]
  },
  es: {
    home:["Hoja Sugargoo 2026 | Productos, QC y envíos","Descubre enlaces de productos, selecciones, categorías y guías independientes sobre control de calidad y envíos con Sugargoo."],
    guides:["Guías Sugargoo 2026 | QC, envíos y alternativas","Guías independientes sobre el proceso de compra, fotos QC, costes de envío, seguimiento y alternativas a Sugargoo."],
    what:["¿Qué es Sugargoo? Proceso del agente de compras","Conoce el proceso de Sugargoo desde el enlace del producto y el almacén hasta las fotos QC, el embalaje y el envío internacional."],
    qc:["Fotos QC de Sugargoo 2026 | Lista de revisión","Revisa talla, color, costuras, logotipos, accesorios, medidas y defectos visibles mediante las fotos QC de Sugargoo."],
    shipping:["Guía de envíos Sugargoo 2026 | Costes, rutas y seguimiento","Compara rutas de Sugargoo por peso facturable, coste total, restricciones, seguimiento y plazo de entrega realista."],
    alternative:["Alternativas a Sugargoo 2026 | Comparar agentes de compra","Compara alternativas a Sugargoo por pagos, QC, almacenamiento, devoluciones, soporte, embalaje y rutas de envío."],
    faq:["FAQ Sugargoo 2026 | Pedidos, QC, envíos y devoluciones","Respuestas a preguntas sobre pedidos Sugargoo, fotos QC, tiempos de envío, devoluciones y peso facturable."]
  },
  pl: {
    home:["Arkusz Sugargoo 2026 | Produkty, QC i wysyłka","Odkrywaj linki do produktów, codzienne propozycje, kategorie oraz niezależne poradniki QC i wysyłki Sugargoo."],
    guides:["Poradniki Sugargoo 2026 | QC, wysyłka i alternatywy","Niezależne poradniki o procesie zakupowym, zdjęciach QC, kosztach wysyłki, śledzeniu i alternatywach dla Sugargoo."],
    what:["Czym jest Sugargoo? Proces agenta zakupowego","Poznaj proces Sugargoo od linku produktu i magazynu po zdjęcia QC, pakowanie oraz wysyłkę międzynarodową."],
    qc:["Zdjęcia QC Sugargoo 2026 | Lista kontroli przed wysyłką","Sprawdź rozmiar, kolor, szwy, logo, dodatki, wymiary i widoczne wady na zdjęciach QC Sugargoo."],
    shipping:["Poradnik wysyłki Sugargoo 2026 | Koszty, trasy i tracking","Porównaj trasy Sugargoo według wagi rozliczeniowej, pełnego kosztu, ograniczeń, śledzenia i realnego czasu dostawy."],
    alternative:["Alternatywy Sugargoo 2026 | Porównanie agentów zakupowych","Porównaj alternatywy Sugargoo pod kątem płatności, QC, magazynu, zwrotów, wsparcia, pakowania i tras wysyłki."],
    faq:["FAQ Sugargoo 2026 | Zamówienia, QC, wysyłka i zwroty","Odpowiedzi na pytania o zamówienia Sugargoo, zdjęcia QC, czas wysyłki, zwroty i wagę rozliczeniową."]
  }
};

function normalizeCorePath(path) {
  if (!path || path === "/index.html") return "/";
  if (path === "/guides/index.html") return "/guides/";
  return path;
}
function coreKey(path) {
  path = normalizeCorePath(path);
  if (path === "/") return "home";
  if (path === "/guides/") return "guides";
  if (path.endsWith("what-is-sugargoo.html")) return "what";
  if (path.endsWith("qc-guide.html")) return "qc";
  if (path.endsWith("shipping-guide.html")) return "shipping";
  if (path.endsWith("alternative.html")) return "alternative";
  if (path.endsWith("faq.html")) return "faq";
  return null;
}
function localeUrl(lang, path) {
  path = normalizeCorePath(path);
  return lang === "en" ? SITE + path : SITE + "/" + lang + (path === "/" ? "/" : path);
}
function hreflangTags(path) {
  path = normalizeCorePath(path);
  if (!CORE_ROUTES.has(path)) return "";
  const links = ["en", ...SEO_LANGS].map(lang => `<link rel="alternate" hreflang="${lang}" href="${localeUrl(lang, path)}">`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${localeUrl("en", path)}">`);
  return links.join("");
}
function localizedInternalLinks(html, lang, path) {
  const prefix = "/" + lang;
  html = html.replace(/(href|src)="(?:\.\.\/)?assets\//g, `$1="/assets/`);
  html = html.replace(/href="\.\.\/index\.html#daily-finds"/g, `href="${prefix}/#daily-finds"`);
  html = html.replace(/href="\.\.\/index\.html#categories"/g, `href="${prefix}/#categories"`);
  html = html.replace(/href="index\.html#daily-finds"/g, `href="${prefix}/#daily-finds"`);
  html = html.replace(/href="index\.html#categories"/g, `href="${prefix}/#categories"`);
  html = html.replace(/href="\.\.\/index\.html"/g, `href="${prefix}/"`);
  html = html.replace(/href="guides\/index\.html"/g, `href="${prefix}/guides/"`);
  html = html.replace(/href="\.\.\/faq\.html([^\"]*)"/g, `href="${prefix}/faq.html$1"`);
  html = html.replace(/href="faq\.html([^\"]*)"/g, `href="${prefix}/faq.html$1"`);
  const guides = ["what-is-sugargoo.html","qc-guide.html","shipping-guide.html","alternative.html"];
  for (const file of guides) html = html.replace(new RegExp(`href="${file.replace('.', '\\.') }"`, "g"), `href="${prefix}/guides/${file}"`);
  if (normalizeCorePath(path).startsWith("/guides/")) html = html.replace(/href="index\.html"/g, `href="${prefix}/guides/"`);
  else html = html.replace(/href="index\.html"/g, `href="${prefix}/"`);
  return html;
}
function replaceMeta(html, lang, path) {
  path = normalizeCorePath(path);
  const key = coreKey(path);
  const meta = SEO_META[lang] && SEO_META[lang][key];
  if (!meta) return html;
  const [title, description] = meta;
  const canonical = localeUrl(lang, path);
  html = html.replace(/<html lang="[^"]*">/i, `<html lang="${lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">${hreflangTags(path)}`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${description}">`);
  html = localizedInternalLinks(html, lang, path);
  html = html.replace(/<body([^>]*)>/i, `<body$1 data-seo-locale="${lang}">`);
  html = html.replace(/<script src="\/assets\/i18n\.js" defer><\/script>|<script src="(?:\.\.\/)?assets\/i18n\.js" defer><\/script>/i,
    `<script>if(!localStorage.getItem('sugargooLang'))localStorage.setItem('sugargooLang','${lang}')</script><script src="/assets/i18n-v5.js" defer></script>`);
  return html;
}
async function serveLocalized(request, env, lang, requestedPath) {
  const path = normalizeCorePath(requestedPath || "/");
  if (!CORE_ROUTES.has(path)) return Response.redirect(SITE + "/" + lang + "/", 302);
  const assetPath = path === "/" ? "/index.html" : path === "/guides/" ? "/guides/index.html" : path;
  const assetUrl = new URL(request.url);
  assetUrl.pathname = assetPath;
  assetUrl.search = "";
  const response = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));
  if (!response.ok) return response;
  const html = replaceMeta(await response.text(), lang, path);
  return new Response(html, {status:200, headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=0, must-revalidate","x-content-type-options":"nosniff"}});
}

const guidePages = {
  "/guides/sugargoo-spreadsheet-guide.html": {
    title: "Sugargoo Spreadsheet Guide 2026 | How to Use Product Links Safely",
    description: "Learn how to organize a Sugargoo spreadsheet, verify product links, record variants, review QC photos and keep product information current.",
    heading: "How to Use a Sugargoo Spreadsheet",
    lead: "A spreadsheet is most useful when it acts as a research system rather than a list of unexplained links.",
    sections: [
      ["Start with a clear structure", "Separate product name, category, source URL, selected variant, reference price, seller notes and the date the link was checked. A tidy structure makes it easier to compare similar listings and remove expired products."],
      ["Verify every product link", "Open the original listing before ordering. Confirm that the title, photos, available sizes, colors and seller information still match the spreadsheet entry. Prices and availability can change, so the destination page should always be treated as the current source."],
      ["Record the exact variant", "Do not rely on a product title alone. Save the color, size, batch or model selected for the order. When an item has several versions, note the identifying details that should appear in warehouse photos."],
      ["Connect the spreadsheet to QC", "Add a short checklist for each product type. Shoes may require size tags, sole shape and stitching checks; clothing may need measurements and fabric details; electronics may require plug, voltage and model confirmation."],
      ["Maintain the sheet", "Review links regularly, remove dead listings and mark products that have changed. A smaller sheet with verified information is more useful than a large sheet filled with outdated links."],
      ["Independent-use reminder", "This site does not process purchases. Product availability, ordering rules and service policies should be confirmed on the linked shopping site before payment."]
    ]
  },
  "/guides/sugargoo-qc-checklist.html": {
    title: "Sugargoo QC Checklist 2026 | Photos, Measurements and Defects",
    description: "Use a practical Sugargoo QC checklist to review warehouse photos, measurements, labels, construction, defects and the selected product variant.",
    heading: "Sugargoo QC Checklist",
    lead: "QC photos are a decision tool: they help you compare the received item with the listing before international shipping.",
    sections: [
      ["Confirm the complete item", "Check front, back, both sides and the overall shape. Confirm the color and selected model before focusing on smaller details."],
      ["Check labels and variation", "Review size tags, model labels, color codes and included accessories. A visually similar item can still be the wrong variation."],
      ["Inspect construction", "Look for uneven seams, loose threads, misaligned panels, glue marks, scratches, dents, damaged hardware or missing parts. Zoom in on areas that commonly fail for the product category."],
      ["Use measurements", "Request or review measurements when fit matters. Clothing length, chest width, waist and inseam can be more reliable than a generic size label. For shoes, compare insole or outsole measurements when available."],
      ["Ask for targeted extra photos", "A useful request names the exact area and angle needed. For example: close-up of the size label, zipper, sole, serial label or a ruler placed beside the item."],
      ["Decide before international shipping", "If the item is incorrect or visibly defective, address the issue while it remains in the warehouse and within the seller or platform after-sales window."]
    ]
  },
  "/guides/sugargoo-rehearsal-packing-guide.html": {
    title: "Sugargoo Rehearsal Packing Guide | Estimate Parcel Size and Weight",
    description: "Understand rehearsal packing, chargeable weight, packaging requests and how to compare a parcel estimate before selecting an international route.",
    heading: "Rehearsal Packing Explained",
    lead: "Rehearsal packing can produce a more realistic parcel size and weight before the final international shipment is purchased.",
    sections: [
      ["Why estimates change", "Early shipping estimates may be based on item data rather than a finished parcel. Final packaging, boxes, protective material and dimensional weight can change the chargeable weight."],
      ["When rehearsal packing is useful", "It is especially useful for bulky clothing, several shoe boxes, mixed categories or parcels where volumetric weight may be important."],
      ["Write clear packing instructions", "State whether original boxes should be kept, folded, reinforced or removed. Ask for fragile items to be protected and avoid instructions that could damage the product."],
      ["Compare the result", "Review actual weight, parcel dimensions and the available routes after packing. A lower physical weight does not always mean a lower charge if the parcel remains large."],
      ["Balance protection and cost", "Removing unnecessary packaging may reduce volume, but protection should match the product. Electronics, glass, structured bags and delicate accessories may need stronger packaging."],
      ["Keep a record", "Save the measured dimensions, weight and selected packing request. These details help explain the final shipping charge and support any later inquiry."]
    ]
  },
  "/guides/sugargoo-shipping-cost-guide.html": {
    title: "Sugargoo Shipping Cost Guide 2026 | Weight, Volume and Routes",
    description: "Learn how actual weight, volumetric weight, packaging, route restrictions, insurance and surcharges affect Sugargoo shipping costs.",
    heading: "How to Compare Sugargoo Shipping Costs",
    lead: "The cheapest displayed route is not always the lowest total cost or the best match for the parcel.",
    sections: [
      ["Understand chargeable weight", "Carriers may bill actual weight or volumetric weight. Bulky but light parcels can therefore cost more than expected."],
      ["Compare the complete charge", "Include packaging, handling, route surcharges, insurance and any optional services. Use the final parcel data instead of comparing only an initial estimate."],
      ["Check route restrictions", "A route can be inexpensive but unavailable for a specific category, battery type, parcel size or destination. Confirm current restrictions before selecting it."],
      ["Review tracking and compensation", "Compare tracking detail, loss or damage compensation and the documentation required to make a claim. A slightly higher price may provide better visibility or protection."],
      ["Treat delivery times as ranges", "Weather, customs, carrier congestion and seasonal demand can affect delivery. Use estimates for planning, not as guaranteed arrival dates."],
      ["Use realistic parcel examples", "Shipping comparisons are most useful when based on your own destination, product mix, dimensions and weight rather than another buyer's unrelated parcel."]
    ]
  },
  "/guides/sugargoo-warehouse-guide.html": {
    title: "Sugargoo Warehouse Guide 2026 | Arrival, Storage and Consolidation",
    description: "Understand warehouse arrival, product matching, QC records, storage planning, consolidation and parcel preparation in a shopping-agent workflow.",
    heading: "Sugargoo Warehouse Workflow",
    lead: "The warehouse stage connects the domestic purchase to the international parcel, so accurate records matter.",
    sections: [
      ["Match arrivals to orders", "Check that the warehouse record corresponds to the correct order, seller, quantity and selected variation. Mixed or similar orders can be confused without clear notes."],
      ["Review the arrival status", "An item may be marked received before every requested photo or measurement is available. Wait for the required evidence before approving shipment."],
      ["Track storage time", "Storage rules and free-storage periods can change. Review the current platform policy and avoid leaving completed orders unplanned."],
      ["Consolidate deliberately", "Combining items can reduce the number of international parcels, but it may increase parcel size or mix categories with different route restrictions."],
      ["Resolve after-sales issues early", "Returns and exchanges are generally easier before the international parcel is created. Keep screenshots, QC photos and order notes when reporting a problem."],
      ["Prepare a parcel checklist", "Confirm the item list, shipping address, declaration, packaging request, insurance choice and selected route before paying for international shipping."]
    ]
  },
  "/guides/sugargoo-return-guide.html": {
    title: "Sugargoo Return Guide 2026 | Warehouse Returns and Evidence",
    description: "Learn how to identify return issues early, document defects, review seller rules and manage a warehouse return before international shipping.",
    heading: "How to Handle a Warehouse Return",
    lead: "A return is usually simpler before the item leaves the warehouse, but timing and evidence are important.",
    sections: [
      ["Identify the reason", "State whether the item is the wrong size, color, model, quantity or condition. A precise reason makes the request easier to evaluate."],
      ["Collect evidence", "Use QC photos, measurements, labels and screenshots of the original listing. Highlight the difference without altering the underlying image."],
      ["Check the current deadline", "Seller and platform after-sales periods vary. Review the current order page and policy rather than relying on an old community post."],
      ["Understand possible costs", "Domestic return shipping, service charges or non-refundable seller costs may apply. Confirm the expected deduction before approving the return."],
      ["Do not ship a disputed item internationally", "Once an item is included in an international parcel, the cost and complexity of a return usually increase substantially."],
      ["Save the outcome", "Keep the return request, tracking status, refund record and any seller response until the balance or payment method reflects the final result."]
    ]
  },
  "/guides/sugargoo-restricted-items-guide.html": {
    title: "Sugargoo Restricted Items Guide 2026 | Route and Category Checks",
    description: "Use a safe process to check route restrictions, batteries, liquids, branded goods, dimensions and destination requirements before ordering.",
    heading: "How to Check Restricted Items",
    lead: "Restrictions can come from the marketplace, warehouse, carrier, route or destination country, and they can change.",
    sections: [
      ["Check before purchasing", "Do not assume that a product can be shipped internationally because it can be purchased domestically. Review the current route and destination restrictions first."],
      ["Describe the product accurately", "Material, battery type, liquid content, magnetic parts, dimensions and intended use can affect route eligibility."],
      ["Avoid absolute lists", "A category accepted by one route may be rejected by another. Use the current shipping calculator or support guidance for the exact parcel."],
      ["Consider destination rules", "Customs, product standards and import restrictions differ by country. The buyer is responsible for checking applicable local requirements."],
      ["Do not misdeclare", "Incorrect descriptions or values can create customs, insurance and delivery problems. Use accurate parcel information."],
      ["Choose a compliant alternative", "When a route does not accept the item, consider a permitted route or remove the product from the parcel rather than trying to bypass restrictions."]
    ]
  },
  "/guides/sugargoo-payment-guide.html": {
    title: "Sugargoo Payment Guide 2026 | Fees, Exchange Rates and Refunds",
    description: "Compare payment totals by exchange rate, processor fees, refund route and transaction records before funding a shopping-agent order.",
    heading: "Understanding Shopping-Agent Payments",
    lead: "The displayed product price is only one part of the final amount charged to an overseas buyer.",
    sections: [
      ["Review the converted total", "Check the currency conversion and the final amount shown by the payment provider. Your bank or card issuer may use a different exchange rate or add its own fee."],
      ["Separate product and shipping costs", "Domestic purchase costs, service charges and international shipping may be paid at different stages. Keep records for each stage."],
      ["Check payment-method rules", "Availability, limits and verification requirements can change. Use the current checkout page as the authoritative source."],
      ["Understand refunds", "A refund may return to the platform balance or the original payment method, and processing times can differ. Confirm the route before expecting funds in a bank account."],
      ["Keep transaction evidence", "Save order numbers, payment confirmations, refund records and timestamps. These are useful when contacting support or a payment provider."],
      ["Protect account access", "Use a unique password, enable available security options and never share verification codes or payment credentials with an unknown third party."]
    ]
  },
  "/guides/sugargoo-uk-shipping-guide.html": {
    title: "Sugargoo Shipping to the UK 2026 | Parcel Planning Checklist",
    description: "Plan a Sugargoo parcel to the UK by checking route eligibility, chargeable weight, declarations, tracking, customs and address details.",
    heading: "Sugargoo Shipping to the UK",
    lead: "A UK parcel should be planned around the exact products, current carrier routes and accurate customs information.",
    sections: [
      ["Use the current route list", "Route availability and estimated delivery ranges change. Enter the real parcel weight, dimensions and category in the current calculator."],
      ["Check chargeable weight", "Large clothing bundles and retained shoe boxes can create volumetric weight. Rehearsal packing may provide a more useful estimate."],
      ["Prepare accurate declarations", "Use a truthful description and value. Check current UK customs and tax guidance when you are uncertain about the treatment of a parcel."],
      ["Verify the delivery address", "Use a complete postcode, recipient name and reachable contact number. Address errors can delay carrier handoff or final delivery."],
      ["Save tracking details", "Keep both the parcel number and international tracking code. Early tracking can be limited while the parcel moves between carriers."],
      ["Allow for customs and peak periods", "Delivery estimates are not guarantees. Customs review, weather and seasonal volume can add time beyond the normal route range."]
    ]
  },
  "/guides/sugargoo-germany-shipping-guide.html": {
    title: "Sugargoo Shipping to Germany 2026 | Customs and Route Checklist",
    description: "Plan a Sugargoo shipment to Germany with accurate product data, route eligibility, parcel dimensions, tracking and current customs guidance.",
    heading: "Sugargoo Shipping to Germany",
    lead: "German and EU import requirements make accurate parcel information and route selection especially important.",
    sections: [
      ["Check the exact route", "Confirm that the route accepts the product category and delivers to the German address. Do not assume that a route available to another EU country has identical rules."],
      ["Use accurate item descriptions", "A clear description, quantity and value support customs processing. Avoid vague or misleading declarations."],
      ["Review current tax and customs guidance", "Rules can change and depend on the goods and value. Consult current German or EU guidance when making an import decision."],
      ["Control parcel size", "Bulky packaging can increase volumetric weight. Review whether boxes should be retained and whether consolidation remains economical."],
      ["Check address formatting", "Include the full street, house number, postal code, city and a reachable recipient contact."],
      ["Keep evidence", "Save order details, parcel data, declarations and tracking. These records are useful if customs or the carrier requests clarification."]
    ]
  },
  "/guides/sugargoo-order-tracking-guide.html": {
    title: "Sugargoo Order Tracking Guide 2026 | Domestic and International Stages",
    description: "Understand domestic seller tracking, warehouse arrival, parcel creation, international tracking updates and how to document a delay.",
    heading: "How to Track a Sugargoo Order",
    lead: "An agent order usually has more than one tracking stage, so the same status page does not cover the entire journey.",
    sections: [
      ["Domestic seller shipment", "The first tracking number normally covers movement from the seller to the warehouse. A delivery scan should be matched with warehouse receipt and item verification."],
      ["Warehouse processing", "After arrival, photos, measurements or return decisions may occur before an international parcel is created."],
      ["Parcel creation", "International tracking may not become active immediately after payment. Label creation, carrier handoff and export processing can happen before the first visible scan."],
      ["Read tracking events carefully", "A repeated status does not always mean the parcel is lost. Some routes provide limited events until the parcel reaches a destination carrier."],
      ["Know when to ask for help", "Compare the time since the last scan with the route's current guidance. Provide the parcel number, tracking code and screenshots when contacting support."],
      ["Keep carrier records", "Once a local carrier takes over, save its tracking page and delivery evidence. These records help with a missing or damaged parcel inquiry."]
    ]
  },
  "/guides/sugargoo-product-link-guide.html": {
    title: "Sugargoo Product Link Guide 2026 | Variants, Sellers and Dead Links",
    description: "Learn how to submit and verify a product link, preserve variant details, compare sellers and handle a listing that changes or disappears.",
    heading: "How to Work with Product Links",
    lead: "A product URL is only the starting point; the order still needs clear variant and seller information.",
    sections: [
      ["Open the original listing", "Confirm the product is still available and that the page matches the item you intend to buy."],
      ["Save the selected variant", "Record size, color, model, quantity and any seller note. Screenshots can preserve information if the listing later changes."],
      ["Review seller information", "Compare listing history, product details and available feedback where the marketplace provides it. A low headline price is not enough information on its own."],
      ["Check domestic shipping and minimums", "Some listings have domestic shipping charges, minimum quantities or variant-specific prices. Confirm the complete domestic purchase total."],
      ["Handle dead or changed links", "Do not automatically replace an expired listing with a visually similar product. Re-check specifications and ask for approval before ordering a substitute."],
      ["Use notes carefully", "Write short, specific instructions that can be verified at purchase or QC. Avoid vague requests that the seller or warehouse cannot objectively confirm."]
    ]
  }
};

const categories = {
  "/categories/shoes.html": {title:"China Shoes Shopping Guide | Sizing, QC and Shipping", description:"Review shoe sizing, materials, sole construction, QC photos and shipping considerations before opening the main shoes category.", heading:"Shoes Buying Guide", shop:`${MAIN}/shoes/`, sections:[["Choose size by measurement","Compare the seller's insole or foot-length guidance instead of relying only on familiar regional sizes."],["Review the upper and sole","Use QC photos to check panel alignment, stitching, glue marks, outsole shape and the selected color."],["Plan packaging","Keeping a shoe box can protect the item but may increase volumetric weight. Decide before parcel packing."],["Check the exact listing","Availability and versions change. Open the product page and verify the current seller information before ordering."]]},
  "/categories/hoodies-sweaters.html": {title:"Hoodies and Sweaters Guide | Measurements, Fabric and QC", description:"Compare hoodie and sweater measurements, fabric, prints, stitching and packing before browsing the main category.", heading:"Hoodies and Sweaters Guide", shop:`${MAIN}/hoodies-sweaters/`, sections:[["Use garment measurements","Compare chest, length, shoulder and sleeve measurements with clothing you already own."],["Check material and weight","Fabric composition, knit density and garment weight can affect feel, warmth and shipping cost."],["Inspect graphics and seams","Review print placement, embroidery, cuffs, hems, zipper alignment and loose threads."],["Pack without damaging shape","Fold carefully and avoid excessive compression for structured or delicate knitwear."]]},
  "/categories/t-shirts.html": {title:"T-Shirts Shopping Guide | Fit, Print and QC Checks", description:"Use measurements, fabric details, print alignment and stitching checks before browsing the main T-shirts category.", heading:"T-Shirts Buying Guide", shop:`${MAIN}/t-shirts/`, sections:[["Compare fit","Check chest width, length and shoulder measurements because labels such as slim or oversized are not standardized."],["Review fabric details","Material, fabric weight and shrinkage expectations affect comfort and long-term fit."],["Inspect prints and embroidery","Check alignment, spelling, edges, color consistency and visible damage."],["Order the correct variation","Confirm size, color and design code before payment and again in warehouse photos."]]},
  "/categories/jackets.html": {title:"Jackets Shopping Guide | Sizing, Hardware and Shipping", description:"Review jacket measurements, lining, zippers, hardware, construction and parcel volume before opening the main category.", heading:"Jackets Buying Guide", shop:`${MAIN}/jackets/`, sections:[["Allow for layering","Compare chest, shoulder, sleeve and length measurements with the clothing you plan to wear underneath."],["Inspect hardware","Check zippers, snaps, drawcords, pockets and fasteners in QC photos."],["Review construction","Look at panel alignment, lining, cuffs, hems and visible marks."],["Plan for volume","Padded and structured jackets can increase parcel dimensions even when their actual weight is moderate."]]},
  "/categories/pants-shorts.html": {title:"Pants and Shorts Guide | Waist, Inseam and QC", description:"Check waist, rise, inseam, leg opening, fabric and stitching before browsing pants and shorts on the main site.", heading:"Pants and Shorts Guide", shop:`${MAIN}/pants-shorts/`, sections:[["Measure beyond the waist","Review rise, inseam, thigh and leg opening as well as waist width."],["Confirm the cut","Straight, tapered, relaxed and oversized descriptions vary between sellers."],["Inspect closures and seams","Check buttons, zippers, pockets, belt loops and stitching."],["Verify the selected size","Match the warehouse tag and measurements with the ordered variation before shipping."]]},
  "/categories/headwear.html": {title:"Headwear Shopping Guide | Size, Shape and Packing", description:"Review cap or hat sizing, shape, embroidery, panels and protective packing before opening the main headwear category.", heading:"Headwear Buying Guide", shop:`${MAIN}/headwear/`, sections:[["Check size and adjustment","Confirm circumference, fitted size or adjustment range."],["Inspect shape","Review crown, brim, panel symmetry and closure alignment."],["Check decorative details","Look at embroidery, patches, printed text and color placement."],["Protect the structure","Ask for suitable packing when a brim or structured crown could be crushed."]]},
  "/categories/accessories.html": {title:"Accessories Shopping Guide | Materials, Details and QC", description:"Review dimensions, materials, hardware, included parts and shipping requirements before browsing accessories.", heading:"Accessories Buying Guide", shop:`${MAIN}/accessories/`, sections:[["Confirm dimensions","Small differences in length, width or capacity can change how an accessory is used."],["Review materials and hardware","Check clasps, chains, zippers, buckles, coatings and visible scratches."],["Confirm included parts","Verify straps, cases, dust bags, replacement pieces or other promised accessories."],["Check route eligibility","Some materials or product components may affect the available shipping routes."]]},
  "/categories/electronics.html": {title:"Electronics Shopping Guide | Compatibility, Batteries and Shipping", description:"Check model compatibility, plug, voltage, battery restrictions, condition and warranty limitations before browsing electronics.", heading:"Electronics Buying Guide", shop:`${MAIN}/electronics/`, sections:[["Confirm the exact model","Check model number, region, plug, voltage, language and supported networks or standards."],["Review battery and route rules","Battery type and capacity can affect shipping eligibility. Confirm the current route before purchasing."],["Inspect condition and accessories","Check screens, ports, labels, cables, chargers and included parts."],["Understand after-sales limits","International warranty and returns can be difficult. Review the seller's current policy before payment."]]}
};

const trustPages = {
  "/about.html": {title:"About Sugargoo VIP | Independent Shopping Guide", description:"Learn how Sugargoo VIP researches product links, QC, shipping and shopping-agent topics while remaining independent from the named platforms.", heading:"About Sugargoo VIP", lead:"Sugargoo VIP is an independent product-discovery and shopping-guide website.", sections:[["What we publish","The site organizes product links, category routes, QC checklists, shipping explanations and practical shopping-agent articles."],["How content is prepared","Guides focus on repeatable checks: verifying the current product page, confirming variants, reviewing warehouse evidence and comparing the complete shipping workflow."],["What the site does not do","This website does not process orders, payments, warehousing, returns or international shipping."],["Independence","Sugargoo VIP is not operated by, endorsed by or officially affiliated with Sugargoo or the marketplaces and shopping sites referenced on its pages."],["Corrections","Product links and policies can change. Readers should use the destination site as the current source and contact us when a page contains an outdated route or factual error."]]},
  "/disclaimer.html": {title:"Disclaimer | Sugargoo VIP", description:"Read the independent-site, external-link, trademark, pricing and information disclaimer for Sugargoo VIP.", heading:"Disclaimer", lead:"This website is an independent informational resource and does not provide official platform services.", sections:[["No official affiliation","Sugargoo VIP is not an official Sugargoo website and is not operated, sponsored or endorsed by Sugargoo. Names and marks belong to their respective owners."],["External links","Product and category links lead to third-party websites. We do not control their availability, pricing, content, payment process, seller conduct or service policies."],["No transaction services","This site does not take payments, place orders, store goods, perform QC, arrange shipping or handle refunds."],["Information can change","Routes, fees, seller listings, product availability and platform rules may change without notice. Always verify current information on the destination site before acting."],["No guarantees","We do not guarantee product authenticity, quality, legality, customs clearance, delivery time, savings or search-engine results."],["General information only","Content is not legal, customs, tax, financial or professional advice. Users are responsible for checking the rules that apply to their country and purchase."]]},
  "/privacy.html": {title:"Privacy Policy | Sugargoo VIP", description:"Learn what limited technical information Sugargoo VIP may process, how language preferences work and how third-party links affect privacy.", heading:"Privacy Policy", lead:"This static guide is designed to collect as little personal information as reasonably possible.", sections:[["Language preference","The language selector may save the chosen language in browser storage so the same preference can be used on other pages."],["Technical logs","Cloudflare and hosting infrastructure may process standard request data such as IP address, user agent, requested page, security events and timing information to deliver and protect the site."],["External websites","When you open a product or category link, the destination website applies its own cookies, analytics and privacy policy. This policy does not control third-party processing."],["No checkout data","Sugargoo VIP does not operate checkout, payment, warehouse or shipping systems and does not receive the transaction data entered on linked sites."],["Contact messages","Information voluntarily included in an email is used to review and respond to that inquiry. Do not send passwords, payment details or verification codes."],["Changes and requests","This policy may be updated as site functionality changes. Privacy questions can be sent through the Contact page."]]},
  "/contact.html": {title:"Contact Sugargoo VIP | Corrections and Link Requests", description:"Contact Sugargoo VIP about factual corrections, outdated links, privacy questions, trademark concerns or site feedback.", heading:"Contact", lead:"Use the contact address for site-content questions rather than order or parcel support.", sections:[["Suitable inquiries","You may contact us about broken links, factual corrections, privacy requests, trademark concerns or accessibility problems."],["Order support","We cannot access shopping accounts, payments, warehouse records or parcels. Contact the platform or seller shown on the relevant order page for transaction support."],["Email","Write to contact@sugargoovip.uk. Include the page URL and a clear description of the requested correction or issue."],["Security","Do not send passwords, payment-card details, login codes, identity documents or other sensitive account information."],["Response expectations","Messages are reviewed for site administration. A response is not guaranteed, and urgent order matters should be sent to the responsible shopping platform."]]}
};

const categoryOrder = [
  ["Shoes", "/categories/shoes.html"], ["Hoodies / Sweaters", "/categories/hoodies-sweaters.html"],
  ["T-Shirts", "/categories/t-shirts.html"], ["Jackets", "/categories/jackets.html"],
  ["Pants / Shorts", "/categories/pants-shorts.html"], ["Headwear", "/categories/headwear.html"],
  ["Accessories", "/categories/accessories.html"], ["Electronics", "/categories/electronics.html"]
];

const originalGuides = [
  ["What Is Sugargoo?", "/guides/what-is-sugargoo.html", "Understand the shopping-agent workflow from product link to international parcel."],
  ["QC Photos Explained", "/guides/qc-guide.html", "Review warehouse photos, measurements and visible condition."],
  ["Shipping Guide", "/guides/shipping-guide.html", "Compare routes, packaging, tracking and total cost."],
  ["Sugargoo Alternatives 2026", "/guides/alternative.html", "Compare agents using operational criteria rather than one headline offer."]
];

function esc(value) {
  return String(value).replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
}

function nav(root = "") {
  return `<header class="site-header"><a class="site-logo" href="${root}/"><img src="${root}/assets/11.png" alt="Sugargoo shopping guide logo" width="480" height="148"></a><nav class="site-nav"><a href="${root}/" data-i18n="nav.home">Home</a><a href="${root}/#daily-finds" data-i18n="nav.daily">Daily Finds</a><a href="${root}/#categories" data-i18n="nav.categories">Categories</a><a href="${MAIN}/" target="_blank" rel="noopener" data-i18n="nav.spreadsheet">Spreadsheet</a><a href="${root}/guides/" data-i18n="nav.guides">Guides</a><a href="${root}/faq.html" data-i18n="nav.faq">FAQ</a></nav><select class="language-select" aria-label="Language"></select></header>`;
}

function footer(root = "") {
  return `<footer class="site-footer"><div><strong data-i18n="footer.trust">Independent shopping discovery guide</strong><p data-i18n="footer.help">Products and orders are handled by the linked main site</p><p class="trust-links"><a href="${root}/about.html">About</a> · <a href="${root}/disclaimer.html">Disclaimer</a> · <a href="${root}/privacy.html">Privacy</a> · <a href="${root}/contact.html">Contact</a> · <a href="${root}/categories/">Category Guides</a></p></div><div><strong data-i18n="footer.choose">Choose another language</strong><div class="footer-languages"><button data-language-button="en">English</button><button data-language-button="es">Español</button><button data-language-button="fr">Français</button><button data-language-button="de">Deutsch</button><button data-language-button="it">Italiano</button><button data-language-button="pt">Português</button><button data-language-button="pl">Polski</button><button data-language-button="nl">Nederlands</button><button data-language-button="zh">简体中文</button></div></div></footer>`;
}

function schema(type, title, description, path, extra = {}) {
  return JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":type,"headline":title,"name":title,"description":description,"url":SITE + path,"mainEntityOfPage":SITE + path,"datePublished":UPDATED,"dateModified":UPDATED,"inLanguage":"en","author":{"@type":"Organization","name":"Sugargoo VIP Editorial Team"},"publisher":{"@type":"Organization","name":"Sugargoo VIP","logo":{"@type":"ImageObject","url":SITE + "/assets/11.png"}},...extra},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE + "/"},{"@type":"ListItem","position":2,"name":title,"item":SITE + path}]}]});
}

function shell({title, description, path, body, type="Article"}) {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="${SITE + path}">${hreflangTags(path)}<link rel="icon" href="/assets/11.png" type="image/png"><meta name="theme-color" content="#050505"><meta property="og:type" content="article"><meta property="og:site_name" content="Sugargoo VIP"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${SITE + path}"><meta property="og:image" content="${SITE}/assets/11.png"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${schema(type,title,description,path)}</script></head><body>${nav("")}<main class="wrap"><div class="breadcrumbs"><a href="/">Home</a> / <span>${esc(title)}</span></div>${body}${footer("")}</main><script src="/assets/i18n-v5.js" defer></script><script src="/assets/language-fix-v5.js" defer></script></body></html>`;
}

function sectionsHtml(sections) {
  return sections.map(([heading, text]) => `<h2>${esc(heading)}</h2><p>${esc(text)}</p>`).join("");
}

function articlePage(path, page) {
  const side = `<aside class="side-card"><a href="/guides/">All Shopping Guides</a><a href="/categories/">Category Guides</a><a href="/guides/sugargoo-qc-checklist.html">QC Checklist</a><a href="/guides/sugargoo-shipping-cost-guide.html">Shipping Cost Guide</a><a href="/faq.html">FAQ</a></aside>`;
  const body = `<div class="article-layout"><article class="article-card"><h1>${esc(page.heading)}</h1><p class="article-lead">${esc(page.lead)}</p><div class="article-content">${sectionsHtml(page.sections)}</div></article>${side}</div>`;
  return shell({title:page.title, description:page.description, path, body});
}

function categoryPage(path, page) {
  const body = `<div class="article-layout"><article class="article-card"><h1>${esc(page.heading)}</h1><p class="article-lead">${esc(page.description)}</p><div class="article-content">${sectionsHtml(page.sections)}<h2>Browse the current category</h2><p>Open the destination category to check current products, prices, variants and availability.</p><p><a class="btn" href="${page.shop}" target="_blank" rel="noopener">Open Category on Main Site</a></p></div></article><aside class="side-card"><a href="/categories/">All Category Guides</a><a href="/guides/sugargoo-qc-checklist.html">QC Checklist</a><a href="/guides/sugargoo-shipping-cost-guide.html">Shipping Cost Guide</a><a href="/faq.html">FAQ</a></aside></div>`;
  return shell({title:page.title, description:page.description, path, body, type:"CollectionPage"});
}

function trustPage(path, page) {
  const emailButton = path === "/contact.html" ? `<p><a class="btn" href="mailto:contact@sugargoovip.uk">Email contact@sugargoovip.uk</a></p>` : "";
  const body = `<article class="article-card"><h1>${esc(page.heading)}</h1><p class="article-lead">${esc(page.lead)}</p><div class="article-content">${sectionsHtml(page.sections)}${emailButton}</div></article>`;
  return shell({title:page.title, description:page.description, path, body, type:"WebPage"});
}

function guideHub() {
  const extra = Object.entries(guidePages).map(([path, p]) => [p.heading, path, p.description]);
  const cards = [...originalGuides, ...extra].map(([title, href, desc]) => `<a class="card guide-card" href="${href}"><h3>${esc(title)}</h3><p>${esc(desc)}</p></a>`).join("");
  const body = `<section class="guide-hub article-card"><h1>Shopping Guides</h1><p class="article-lead">Independent, practical articles covering product links, QC, warehouse decisions, packing, shipping, returns and destination planning.</p><div class="grid">${cards}</div></section>`;
  return shell({title:"Sugargoo Guides 2026 | QC, Shipping, Warehouse and Returns",description:"Browse original Sugargoo shopping guides covering spreadsheets, QC, shipping costs, warehouse workflow, returns, payments, tracking and destination planning.",path:"/guides/",body,type:"CollectionPage"});
}

function categoryHub() {
  const cards = categoryOrder.map(([title, href]) => `<a class="card guide-card" href="${href}"><h3>${esc(title)}</h3><p>Read sizing, QC, packing and shipping checks before opening the main category.</p></a>`).join("");
  const body = `<section class="guide-hub article-card"><h1>Category Guides</h1><p class="article-lead">Use these independent category pages for measurements, QC and shipping preparation, then continue to the linked main-site category.</p><div class="grid">${cards}</div></section>`;
  return shell({title:"Shopping Category Guides | Shoes, Clothing, Accessories and Electronics",description:"Read independent shopping category guides for shoes, hoodies, T-shirts, jackets, pants, headwear, accessories and electronics.",path:"/categories/",body,type:"CollectionPage"});
}

function injectStaticHtml(html, pathname) {
  if (!html.includes("trust-links")) {
    html = html.replace("</footer>", `<p class="trust-links"><a href="/about.html">About</a> · <a href="/disclaimer.html">Disclaimer</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a> · <a href="/categories/">Category Guides</a></p></footer>`);
  }
  if ((pathname === "/" || pathname === "/index.html") && !html.includes('href="/categories/" class="btn')) {
    html = html.replace('<a class="btn btn-secondary" href="guides/index.html" data-i18n="nav.guides">Guides</a>', '<a class="btn btn-secondary" href="guides/index.html" data-i18n="nav.guides">Guides</a><a class="btn btn-secondary" href="/categories/">Category Guides</a>');
  }
  const corePath = normalizeCorePath(pathname);
  if (CORE_ROUTES.has(corePath) && !html.includes('hreflang=')) {
    html = html.replace(/(<link rel="canonical"[^>]+>)/i, `$1${hreflangTags(corePath)}`);
  }
  return html;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const shouldRedirectHost = host === "www.sugargoovip.uk" || host === "sugargoovip-uk.pages.dev";
    if (shouldRedirectHost || url.protocol !== "https:") {
      url.protocol = "https:";
      url.hostname = "sugargoovip.uk";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    const localeMatch = url.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    if (localeMatch) {
      return serveLocalized(request, env, localeMatch[1], localeMatch[2] || "/");
    }

    const path = url.pathname;
    let html = null;
    if (path === "/guides/" || path === "/guides/index.html") html = null;
    else if (path === "/categories/" || path === "/categories/index.html") html = categoryHub();
    else if (guidePages[path]) html = articlePage(path, guidePages[path]);
    else if (categories[path]) html = categoryPage(path, categories[path]);
    else if (trustPages[path]) html = trustPage(path, trustPages[path]);

    if (html) {
      return new Response(html, {status:200, headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=0, must-revalidate","x-content-type-options":"nosniff"}});
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const contentType = assetResponse.headers.get("content-type") || "";
    if (assetResponse.ok && contentType.includes("text/html")) {
      const source = await assetResponse.text();
      const modified = injectStaticHtml(source, path);
      const headers = new Headers(assetResponse.headers);
      headers.set("content-type", "text/html; charset=UTF-8");
      headers.set("cache-control", "public, max-age=0, must-revalidate");
      return new Response(modified, {status:assetResponse.status, headers});
    }
    return assetResponse;
  }
};