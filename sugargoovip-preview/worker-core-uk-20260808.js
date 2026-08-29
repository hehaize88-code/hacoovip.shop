const SITE = "https://sugargoovip.uk";
const MAIN = "https://www.cnfanshp.com";
const UPDATED = "2026-08-09";
const NEW_ARTICLES = new Set([
  "/guides/sugargoo-1688-buying-guide-uk.html",
  "/guides/sugargoo-uk-address-format.html",
  "/guides/sugargoo-uk-customs-tax-planning.html",
  "/guides/sugargoo-uk-shipping-calculator-guide.html"
]);
const VALID_LANGS = new Set(["en","es","fr","de","it","pt","pl","nl","zh"]);
const LEGACY_SEO_LANGS = new Set(["de","fr","es","pl"]);

const CATEGORY_META = {
  "shoes": {name:"Shoes", main:"/shoes/", focus:"size labels, pair consistency, sole shape, visible stitching and measurements when fit is critical"},
  "hoodies-sweaters": {name:"Hoodies & Sweaters", main:"/hoodies-sweaters/", focus:"size-chart matching, chest and length measurements, colour, print or embroidery placement and visible seams"},
  "t-shirts": {name:"T-Shirts", main:"/t-shirts/", focus:"size selection, chest width, total length, print placement, collar construction and visible fabric condition"},
  "jackets": {name:"Jackets", main:"/jackets/", focus:"outer dimensions, lining or insulation option, zips, pockets, hardware, colour blocking and visible construction"},
  "pants-shorts": {name:"Pants & Shorts", main:"/pants-shorts/", focus:"waist, rise, inseam, leg opening, selected wash or colour and visible seams or hardware"},
  "headwear": {name:"Headwear", main:"/headwear/", focus:"circumference or size option, brim or crown shape, embroidery placement, closures and visible deformation"},
  "electronics": {name:"Electronics", main:"/electronics/", focus:"model label, plug or connector type, included accessories, visible condition and route eligibility for batteries or other restricted attributes"},
  "accessories": {name:"Accessories", main:"/other-stuff/", focus:"dimensions, included pieces, closures, hardware, model compatibility and any category-specific shipping attribute"}
};

const PRIORITY_GUIDES = {
  "/guides/sugargoo-warehouse-guide.html": {
    key:"WAREHOUSE_BODY",
    title:"Sugargoo Warehouse Guide 2026: QC, Storage, Returns & Parcel Prep",
    description:"A practical Sugargoo warehouse guide for UK shoppers covering arrivals, QC photos, storage, returns, consolidation, packing and parcel submission.",
    lead:"Use the warehouse stage to match arrivals, review QC evidence, manage storage deadlines and prepare a UK-bound parcel before international shipping.",
    sources:"Sugargoo official workflow/features, QC service FAQ, warehouse-storage guide and returns guide; GOV.UK goods-sent-from-abroad guidance. Checked 8 August 2026."
  },
  "/guides/sugargoo-spreadsheet-guide.html": {
    key:"SPREADSHEET_BODY",
    title:"Sugargoo Spreadsheet UK 2026: How to Verify Product Finds",
    description:"Learn how to use a Sugargoo spreadsheet for UK shopping: verify product links, record variants, connect QC notes and keep shipping information current.",
    lead:"A useful spreadsheet connects a product source, the selected variant, QC checks and the current UK shipping decision instead of acting as a static link dump.",
    sources:"Sugargoo official workflow/features, QC service FAQ and freight-calculator material; GOV.UK goods-sent-from-abroad guidance. Checked 8 August 2026."
  },
  "/guides/sugargoo-uk-shipping-guide.html": {
    key:"UK_SHIPPING_BODY",
    title:"Sugargoo Shipping to UK 2026: Routes, Costs, Customs & Tracking",
    description:"Plan Sugargoo shipping to the UK by comparing live routes, chargeable weight, packing, customs information and tracking without treating estimates as guarantees.",
    lead:"Compare the actual parcel and live route options, then check UK customs rules and keep the tracking record from warehouse submission to last-mile delivery.",
    sources:"Sugargoo official workflow/features, freight-calculator, shipping-estimate and QC material; current GOV.UK customs/tax guidance. Checked 8 August 2026."
  },
  "/guides/qc-guide.html": {
    key:"QC_BODY",
    title:"Sugargoo QC Photos Guide 2026: What UK Buyers Should Check",
    description:"A detailed Sugargoo QC photo guide for UK buyers covering five free QC photos, measurements, extra photography, returns and final parcel checks.",
    lead:"Turn warehouse QC photos into a decision: confirm the ordered variant, inspect category-specific visible details and resolve uncertainties before international shipping.",
    sources:"Sugargoo official QC service FAQ, returns guide and workflow/features; GOV.UK goods-sent-from-abroad guidance. Checked 8 August 2026."
  }
};

const GENERIC_GUIDES = {
  "/guides/sugargoo-qc-checklist.html": ["Sugargoo QC Checklist 2026: A Practical Pre-Shipping Review","Use a structured Sugargoo QC checklist to verify visible identity, labels, measurements, construction details and documented decisions before shipping.","QC checklist","visible identity, labels, measurements, construction details and documented decisions"],
  "/guides/sugargoo-rehearsal-packing-guide.html": ["Sugargoo Rehearsal Packing Guide 2026: Weight, Size & Parcel Prep","Plan a parcel using current dimensions, chargeable weight, packaging instructions and route comparisons before international submission.","Rehearsal packing","parcel dimensions, chargeable weight, packaging instructions and route comparison"],
  "/guides/sugargoo-shipping-cost-guide.html": ["Sugargoo Shipping Cost UK 2026: How to Estimate the Real Parcel Cost","Estimate Sugargoo shipping cost for the UK using actual weight, volumetric weight, packing, live route eligibility and current parcel data.","Shipping cost","actual weight, volumetric weight, packing, route eligibility and current UK destination information"],
  "/guides/sugargoo-return-guide.html": ["Sugargoo Return Guide 2026: Evidence, Timing & Warehouse Decisions","Organise return decisions with order evidence, seller conditions, warehouse timing and the current after-sales options shown for the order.","Returns","order evidence, seller conditions, warehouse timing and current after-sales options"],
  "/guides/sugargoo-restricted-items-guide.html": ["Sugargoo Restricted Items Guide 2026: Check Before You Buy or Ship","Review product attributes, live route eligibility, destination rules and accurate declarations before relying on a shipping plan.","Restricted items","batteries, liquids, fragile or unusual attributes, destination rules and accurate declarations"],
  "/guides/sugargoo-payment-guide.html": ["Sugargoo Payment Guide 2026: Separate Product and Shipping Decisions","Keep product cost, domestic delivery, international shipping, conversion and refund records separate so the total is easier to verify.","Payments","product cost, domestic delivery, international shipping, conversion and refund records"],
  "/guides/sugargoo-germany-shipping-guide.html": ["Sugargoo Shipping to Germany 2026: Parcel Data, Routes & Tracking","Plan Germany-bound parcels around live destination eligibility, parcel weight and dimensions, declarations, address format and tracking.","Germany shipping","destination eligibility, parcel weight, dimensions, declarations, address format and tracking"],
  "/guides/sugargoo-order-tracking-guide.html": ["Sugargoo Order Tracking Guide 2026: From Seller to Last-Mile Scan","Understand domestic seller movement, warehouse processing, parcel creation, export movement and last-mile handoff without treating scan gaps as proof of loss.","Order tracking","domestic seller movement, warehouse processing, parcel creation, export movement and last-mile handoff"],
  "/guides/sugargoo-product-link-guide.html": ["Sugargoo Product Link Guide 2026: Verify Listings Before Ordering","Verify listing identity, variants, page changes, screenshots and confirmation records before using a product link for a purchase.","Product links","listing identity, variants, page changes, saved screenshots and confirmation records"]
};

const REVERSE_ARTICLES = {
  "/guides/sugargoo-reverse-shopping-multi-item-order-ledger.html":"/assets/reverse-articles/multi-item-order-ledger.js",
  "/guides/sugargoo-reverse-shopping-image-to-product-link.html":"/assets/reverse-articles/image-to-product-link.js",
  "/guides/sugargoo-reverse-shopping-confirmation-checkpoints.html":"/assets/reverse-articles/confirmation-checkpoints.js",
  "/guides/sugargoo-reverse-shopping-order-boundaries.html":"/assets/reverse-articles/order-boundaries.js",
  "/guides/sugargoo-reverse-shopping-product-link-workflow.html":"/assets/reverse-articles/product-link-workflow.js"
};

const KNOWN_HTML = new Set([
  "/faq.html","/about.html","/disclaimer.html","/privacy.html","/contact.html",
  "/guides/what-is-sugargoo.html","/guides/qc-guide.html","/guides/shipping-guide.html","/guides/alternative.html",
  "/guides/sugargoo-split-or-consolidate-parcel-guide.html", ...NEW_ARTICLES,
  ...Object.keys(PRIORITY_GUIDES), ...Object.keys(GENERIC_GUIDES), ...Object.keys(REVERSE_ARTICLES),
  ...Object.keys(CATEGORY_META).map(k=>`/categories/${k}.html`)
]);

let catalogPromise;
let editorialSourcePromise;

function esc(v="") { return String(v).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function safeJson(v) { return JSON.stringify(v).replace(/</g,"\\u003c"); }
function languageFrom(url) { const q=url.searchParams.get("lang"); return q&&VALID_LANGS.has(q)?q:"en"; }
function noindexForLanguage(lang) { return lang!=="en"; }
function slugFor(p) { return `${p.category}-${p.id}`; }
function categoryFor(slug) { return CATEGORY_META[slug] || null; }

async function assetResponse(env, request, pathname) {
  const u = new URL(request.url); u.pathname=pathname; u.search="";
  return env.ASSETS.fetch(new Request(u.toString(), request));
}
async function assetText(env, request, pathname) {
  const r=await assetResponse(env,request,pathname); if(!r.ok) return ""; return r.text();
}
async function loadCatalog(env,request) {
  if(!catalogPromise) catalogPromise=(async()=>{
    const text=await assetText(env,request,"/assets/catalog-uk-20260808.json");
    const data=JSON.parse(text); if(!Array.isArray(data)||data.length!==40) throw new Error("catalog invalid"); return data;
  })();
  return catalogPromise;
}
async function loadEditorialSource(env,request) {
  if(!editorialSourcePromise) editorialSourcePromise=assetText(env,request,"/tools/upgrade_uk_seo_20260808.py");
  return editorialSourcePromise;
}
function extractBody(source,key) {
  const re=new RegExp(key+"\\s*=\\s*r'''([\\s\\S]*?)'''"); const m=source.match(re); return m?m[1]:"";
}
function stripExternalLinks(body) {
  return body.replace(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>([\s\S]*?)<\/a>/gi,"$1");
}
function robotsMeta(lang) { return noindexForLanguage(lang)?"noindex,follow,max-image-preview:large":"index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"; }

function head({title,description,canonical,image=`${SITE}/assets/11.png`,type="website",lang="en"}) {
  return `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robotsMeta(lang)}"><link rel="canonical" href="${esc(canonical)}"><link rel="icon" href="/assets/11.png" type="image/png"><meta name="theme-color" content="#050505"><meta property="og:type" content="${type}"><meta property="og:site_name" content="Sugargoo Spreadsheet UK"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(image)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(image)}"><link rel="stylesheet" href="/assets/site.css"></head>`;
}
function nav() {
  return `<header class="site-header"><a class="site-logo" href="/"><img src="/assets/11.png" alt="Sugargoo spreadsheet UK guide logo" width="480" height="148"></a><nav class="site-nav"><a href="/" data-i18n="nav.home">Home</a><a href="/#daily-finds" data-i18n="nav.daily">Daily Finds</a><a href="/#categories" data-i18n="nav.categories">Categories</a><a href="/products/" data-i18n="nav.spreadsheet">Spreadsheet</a><a href="/guides/" data-i18n="nav.guides">Guides</a><a href="/faq.html" data-i18n="nav.faq">FAQ</a></nav><select class="language-select" aria-label="Language"></select></header>`;
}
function footer() {
  return `<footer class="site-footer"><div><strong data-i18n="footer.trust">Independent shopping discovery guide</strong><p data-i18n="footer.help">Products and orders are handled by the linked main site</p><p class="trust-links"><a href="/about.html">About</a> · <a href="/disclaimer.html">Disclaimer</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a> · <a href="/categories/">Category Guides</a></p></div><div><strong data-i18n="footer.choose">Choose another language</strong><div class="footer-languages"><button data-language-button="en">English</button><button data-language-button="es">Español</button><button data-language-button="fr">Français</button><button data-language-button="de">Deutsch</button><button data-language-button="it">Italiano</button><button data-language-button="pt">Português</button><button data-language-button="pl">Polski</button><button data-language-button="nl">Nederlands</button><button data-language-button="zh">简体中文</button></div></div></footer>`;
}
function languageScripts(lang) {
  const seed=VALID_LANGS.has(lang)?lang:"en";
  return `<script>try{localStorage.setItem('sugargooLang','${seed}')}catch(e){}</script><script src="/assets/i18n-v5.js" defer></script><script src="/assets/language-fix-v5.js" defer></script><script src="/assets/lang-guard-20260808.js?v=20260808"></script>`;
}
function schemaScript(graph) { return `<script type="application/ld+json">${safeJson({"@context":"https://schema.org","@graph":graph})}</script>`; }
function shell({title,description,canonical,body,lang="en",image,type="website",graph=[]}) {
  return `<!doctype html><html lang="en-GB">${head({title,description,canonical,image,type,lang})}<body>${nav()}<main class="wrap">${body}${footer()}</main>${graph.length?schemaScript(graph):""}${languageScripts(lang)}</body></html>`;
}
function responseHtml(html,status=200) { return new Response(html,{status,headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=0, must-revalidate","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin"}}); }

function productCard(p,cat) {
  return `<a class="card product-card" href="/products/${esc(slugFor(p))}.html"><img src="${esc(p.image)}" alt="${esc(p.title)} product find" width="760" height="760" loading="lazy" style="aspect-ratio:1/1;object-fit:cover"><div class="product-meta"><h3>${esc(p.title)}</h3><p>${esc(cat.name)} · source checked ${UPDATED}</p></div></a>`;
}
function catalogPage(products,lang) {
  const sections=Object.entries(CATEGORY_META).map(([slug,cat])=>{
    const cards=products.filter(p=>p.category===slug).map(p=>productCard(p,cat)).join("");
    return `<h2 class="section-title">${esc(cat.name)}</h2><section class="grid home-products">${cards}</section>`;
  }).join("");
  const title="Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds";
  const description="Browse 40 curated Sugargoo product finds for UK shoppers with stable detail pages, category guides, QC checks and direct main-site shopping links.";
  const body=`<section class="guide-hub article-card"><h1>Sugargoo Spreadsheet UK 2026: 40 Curated Product Finds</h1><p class="article-lead">A smaller, verifiable catalogue for UK shoppers: each find has a stable detail page and one current shopping link to the connected main catalogue.</p><div class="article-content"><p>This is an independent product-discovery catalogue, not an official Sugargoo inventory. The source URLs and corresponding product images were rechecked on ${UPDATED}. Confirm the live listing, exact variant and any price or availability on the main site before purchase.</p><p><a class="btn" href="${MAIN}/" target="_blank" rel="noopener">Open main product catalogue</a> <a class="btn btn-secondary" href="/guides/sugargoo-spreadsheet-guide.html">How to use this spreadsheet</a></p></div></section>${sections}`;
  const graph=[{"@type":"CollectionPage","url":`${SITE}/products/`,"name":title,"description":description,"inLanguage":"en-GB","dateModified":UPDATED},{"@type":"ItemList","numberOfItems":products.length,"itemListElement":products.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":`${SITE}/products/${slugFor(p)}.html`}))}];
  return shell({title,description,canonical:`${SITE}/products/`,body,lang,image:products[0]?.image||`${SITE}/assets/11.png`,graph});
}
function productPage(p,lang) {
  const cat=categoryFor(p.category); const slug=slugFor(p); const canonical=`${SITE}/products/${slug}.html`;
  const title=`${p.title} | Sugargoo Spreadsheet UK 2026`;
  const description=`Curated ${cat.name.toLowerCase()} find for UK shoppers with source-listing, QC and shipping checks. Open the linked main catalogue for current product details.`;
  const body=`<div class="breadcrumbs"><a href="/">Home</a> / <a href="/products/">Product Finds</a> / <a href="/categories/${esc(p.category)}.html">${esc(cat.name)}</a> / <span>${esc(p.title)}</span></div><div class="article-layout"><article class="article-card"><img src="${esc(p.image)}" alt="${esc(p.title)} product find" width="760" height="760" loading="eager" style="max-width:520px;width:100%;height:auto;border-radius:18px;object-fit:cover"><h1>${esc(p.title)}</h1><p class="article-lead">Curated ${esc(cat.name.toLowerCase())} find in the Sugargoo Spreadsheet UK research catalogue.</p><div class="article-content"><h2>Source listing</h2><p><strong>Original listing title:</strong> ${esc(p.sourceTitle||p.title)}</p><p><strong>Source last checked:</strong> ${UPDATED}</p><p>This local page keeps a stable research record but does not copy a live price or promise stock. Open the current listing before choosing a variant or paying.</p><p><a class="btn" href="${esc(p.source)}" target="_blank" rel="noopener">Open current listing on main site</a></p><h2>What to verify before ordering</h2><p>Confirm the exact option, colour, size or model on the live source page. For this category, prioritise ${esc(cat.focus)}. Save the original option text when several versions share the same product page.</p><h2>What to check after warehouse arrival</h2><p>Match the warehouse entry to the saved link and selected variant. Use QC photos to verify visible identity and condition. Request a targeted extra photo or measurement only when it can resolve a specific decision.</p><h2>UK shipping note</h2><p>Route availability and total shipping cost depend on the actual parcel, product attributes, weight, dimensions and destination. Use the live shipping estimator and current UK customs guidance instead of copying an old quote.</p><p><a href="/guides/qc-guide.html">QC photo guide</a> · <a href="/guides/sugargoo-warehouse-guide.html">Warehouse guide</a> · <a href="/guides/sugargoo-uk-shipping-guide.html">UK shipping guide</a></p></div></article><aside class="side-card"><a href="/products/">All 40 Product Finds</a><a href="/categories/${esc(p.category)}.html">${esc(cat.name)} Category Guide</a><a href="${esc(p.source)}" target="_blank" rel="noopener">Main-site Listing</a></aside></div>`;
  const graph=[{"@type":"ItemPage","url":canonical,"name":p.title,"description":description,"inLanguage":"en-GB","dateModified":UPDATED,"primaryImageOfPage":{"@type":"ImageObject","url":p.image}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE+"/"},{"@type":"ListItem","position":2,"name":"Product Finds","item":SITE+"/products/"},{"@type":"ListItem","position":3,"name":cat.name,"item":`${SITE}/categories/${p.category}.html`},{"@type":"ListItem","position":4,"name":p.title,"item":canonical}]}];
  return shell({title,description,canonical,body,lang,image:p.image,type:"article",graph});
}
function categoryText(cat) {
  return `<p>This UK-focused category page is an independent research layer rather than a merchant category. It groups five current finds from the linked main catalogue so a shopper can compare source listings, open a stable local detail page and remember the checks that matter before placing an order. Product links and images were rechecked on ${UPDATED}; current variants, prices and availability must still be confirmed on the live source page.</p><p>For ${esc(cat.name.toLowerCase())}, the most useful pre-order and warehouse checks include ${esc(cat.focus)}. Save the exact variant text when ordering. After warehouse arrival, compare the item with the order record and use QC photos as visible evidence rather than a promise about properties that cannot be seen. If a measurement drives the buying decision, request that measurement instead of relying only on a size label.</p><p>UK shipping should be considered before the final parcel is built. Weight, dimensions and product attributes can change route eligibility and chargeable weight. Use the live shipping calculator and parcel interface for current options, then review accurate declaration information and current GOV.UK guidance for goods sent from abroad. This page does not quote a fixed shipping cost or delivery time because those figures depend on the actual parcel and can change.</p><p>The local detail pages below do not process purchases. Each has one shopping button to the connected main site and links back to the QC, warehouse and UK shipping guides. This lets the external site provide useful context while keeping the main catalogue as the shopping destination.</p>`;
}
function categoryPage(slug,products,lang) {
  const cat=categoryFor(slug); const subset=products.filter(p=>p.category===slug); const canonical=`${SITE}/categories/${slug}.html`;
  const title=`Sugargoo ${cat.name} Finds UK 2026: Products, QC & Shipping Checks`;
  const description=`Browse five curated ${cat.name.toLowerCase()} product finds for UK shoppers, with local detail pages, QC checks and a direct link to the matching main-site category.`;
  const cards=subset.map(p=>productCard(p,cat)).join("");
  const body=`<div class="breadcrumbs"><a href="/">Home</a> / <a href="/categories/">Category Guides</a> / <span>${esc(cat.name)}</span></div><section class="article-card"><h1>Sugargoo ${esc(cat.name)} Finds UK 2026</h1><p class="article-lead">Five current finds plus the checks that matter before ordering, QC approval and UK parcel submission.</p><div class="article-content">${categoryText(cat)}<p><a class="btn" href="${MAIN}${cat.main}" target="_blank" rel="noopener">Open ${esc(cat.name)} on main site</a> <a class="btn btn-secondary" href="/products/">Browse all 40 finds</a></p></div><div class="grid home-products">${cards}</div></section>`;
  const graph=[{"@type":"CollectionPage","url":canonical,"name":title,"description":description,"inLanguage":"en-GB","dateModified":UPDATED},{"@type":"ItemList","numberOfItems":subset.length,"itemListElement":subset.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":`${SITE}/products/${slugFor(p)}.html`}))}];
  return shell({title,description,canonical,body,lang,image:subset[0]?.image,graph});
}
function categoryHub(products,lang) {
  const cards=Object.entries(CATEGORY_META).map(([slug,cat])=>`<a class="card guide-card" href="/categories/${slug}.html"><h3>${esc(cat.name)}</h3><p>5 curated finds plus UK-oriented QC and shipping checks.</p></a>`).join("");
  const body=`<section class="guide-hub article-card"><h1>Sugargoo UK Product Categories 2026</h1><p class="article-lead">Eight category landing pages connect 40 curated product finds with the QC and shipping checks that matter for UK shoppers.</p><div class="grid">${cards}</div></section>`;
  return shell({title:"Sugargoo UK Product Categories 2026 | 40 Curated Finds",description:"Browse eight Sugargoo UK product category guides with 40 curated finds, QC checks, local detail pages and main-site shopping links.",canonical:`${SITE}/categories/`,body,lang});
}

function relatedAside() {
  return `<aside class="side-card"><a href="/products/">Sugargoo Spreadsheet UK</a><a href="/guides/sugargoo-warehouse-guide.html">Warehouse Guide</a><a href="/guides/qc-guide.html">QC Photos Guide</a><a href="/guides/sugargoo-uk-shipping-guide.html">UK Shipping Guide</a><a href="/guides/">All Guides</a></aside>`;
}
async function priorityGuidePage(path,def,env,request,lang) {
  const source=await loadEditorialSource(env,request); let article=extractBody(source,def.key);
  if(!article) return null;
  article=stripExternalLinks(article)+`<section class="article-sources"><h2>Sources checked</h2><p>${esc(def.sources)}</p><p>Current account, route, seller and government rules take priority over archived examples or screenshots.</p></section>`;
  const canonical=SITE+path;
  const body=`<div class="breadcrumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a> / <span>${esc(def.title)}</span></div><div class="article-layout"><article class="article-card"><h1>${esc(def.title)}</h1><p class="article-lead">${esc(def.lead)}</p><div class="article-content">${article}</div></article>${relatedAside()}</div>`;
  const graph=[{"@type":"Article","headline":def.title,"description":def.description,"url":canonical,"mainEntityOfPage":canonical,"inLanguage":"en-GB","dateModified":UPDATED,"author":{"@type":"Organization","name":"Sugargoo VIP Editorial Team"}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":SITE+"/"},{"@type":"ListItem","position":2,"name":"Shopping Guides","item":SITE+"/guides/"},{"@type":"ListItem","position":3,"name":def.title,"item":canonical}]}];
  return shell({title:def.title,description:def.description,canonical,body,lang,type:"article",graph});
}
function genericGuideBody(name,focus) {
  return `<p>This independent ${esc(name.toLowerCase())} guide is built around decisions a buyer can verify rather than fixed promises. Sugargoo’s current interface should be treated as the source of truth for live order status, route availability, fees and after-sales options. The useful record is the one that connects the product listing, warehouse evidence and the action you take next.</p><h2>Start from the current order record</h2><p>Save the exact product link, selected option, quantity and the date the information was checked. If the seller page changes later, your order record explains what was approved. For a multi-item order, give each item a stable reference so photos, changes and questions cannot be attached to the wrong product.</p><h2>Separate known facts from estimates</h2><p>Use the live interface for values that can change. A price, shipping estimate or available service shown on an old screenshot is context, not a current quotation. Label unknown fields instead of filling them from memory. This is especially important for ${esc(focus)}.</p><h2>Use warehouse evidence deliberately</h2><p>When the product reaches the warehouse, compare visible evidence with the saved specification. QC photos can establish colour, labels, visible condition and included pieces where those details are shown. They do not automatically establish material composition, authenticity, comfort, durability or internal performance.</p><h2>Request extra evidence only when it changes a decision</h2><p>A measurement or close-up should answer a precise question. Ask for the relevant dimension, label or area rather than “more photos.” Specific requests create records that are easier to compare with the source listing and easier to use if an after-sales question arises.</p><h2>Resolve domestic-stage problems before international shipping</h2><p>If something is wrong, document the mismatch while the item is still in China and check the options shown for the live order. Seller conditions and deadlines can vary. Do not assume every seller or product follows one universal return period, and do not wait for parcel submission if the evidence already shows a question that needs action.</p><h2>Build the parcel from actual warehouse data</h2><p>International shipping decisions depend on the real item mix, parcel weight, dimensions, product attributes and destination. Compare route eligibility after enough parcel information exists. Consolidating can reduce duplicated packaging, while splitting can be sensible when one item changes route options, damage risk or urgency.</p><h2>Keep UK import decisions separate from warehouse checks</h2><p>For UK delivery, accurate descriptions and current customs guidance matter. A route name or community recommendation is not a guarantee that tax, duty, customs review or carrier handling charges cannot occur. Review current government guidance and the live carrier information when the parcel is actually moving.</p><h2>Keep a simple audit trail</h2><p>Save the source link, selected variant, QC decision, parcel number, chosen route and tracking number. A short structured record makes it easier to identify whether a later question belongs to the seller stage, warehouse stage, international carrier or last-mile delivery.</p><p><strong>Checked:</strong> ${UPDATED}. This page deliberately avoids fixed fees, delivery guarantees or other claims that cannot be confirmed for the current account and parcel.</p>`;
}
function genericGuidePage(path,def,lang) {
  const [title,description,name,focus]=def; const canonical=SITE+path;
  const body=`<div class="breadcrumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a> / <span>${esc(title)}</span></div><div class="article-layout"><article class="article-card"><h1>${esc(title)}</h1><p class="article-lead">${esc(description)}</p><div class="article-content">${genericGuideBody(name,focus)}</div></article>${relatedAside()}</div>`;
  const graph=[{"@type":"Article","headline":title,"description":description,"url":canonical,"inLanguage":"en-GB","dateModified":UPDATED,"author":{"@type":"Organization","name":"Sugargoo VIP Editorial Team"}}];
  return shell({title,description,canonical,body,lang,type:"article",graph});
}

function decodeJsString(s) { return s.replace(/\\'/g,"'").replace(/\\n/g,"\n").replace(/\\\\/g,"\\"); }
async function reverseArticleHtml(path,env,request,lang) {
  let html=await assetText(env,request,path); if(!html) return "";
  if(lang==="zh") return injectLanguage(html,lang);
  const jsPath=REVERSE_ARTICLES[path]; const js=await assetText(env,request,jsPath);
  const m=js.match(/en:\{title:'((?:\\'|[^'])*)',lead:'((?:\\'|[^'])*)',body:`([\s\S]*?)`,side:\[/);
  if(!m) return injectLanguage(html,lang);
  const title=decodeJsString(m[1]); const lead=decodeJsString(m[2]); const article=stripExternalLinks(m[3]);
  html=html.replace(/<html lang="[^"]*">/i,'<html lang="en-GB">')
    .replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)} | Sugargoo UK Guide</title>`)
    .replace(/<meta name="description" content="[^"]*">/i,`<meta name="description" content="${esc(lead.slice(0,190))}">`)
    .replace(/<meta property="og:locale" content="[^"]*">/i,'<meta property="og:locale" content="en_GB">')
    .replace(/<meta property="og:title" content="[^"]*">/i,`<meta property="og:title" content="${esc(title)}">`)
    .replace(/<h1>[\s\S]*?<\/h1>/i,`<h1>${esc(title)}</h1>`)
    .replace(/<p class="article-lead">[\s\S]*?<\/p>/i,`<p class="article-lead">${esc(lead)}</p>`)
    .replace(/<div class="article-content">[\s\S]*?<\/div>\s*<\/article>/i,`<div class="article-content">${article}</div></article>`)
    .replace(/<aside class="side-card">[\s\S]*?<\/aside>/i,relatedAside())
    .replace(/"inLanguage":"zh-CN"/g,'"inLanguage":"en-GB"')
    .replace(/"dateModified":"[^"]+"/g,`"dateModified":"${UPDATED}"`);
  return injectLanguage(html,lang);
}

function productListSchema(products) {
  return `<script type="application/ld+json">${safeJson({"@context":"https://schema.org","@type":"ItemList","name":"Sugargoo Spreadsheet UK curated product finds","numberOfItems":40,"itemListElement":products.map((p,i)=>({"@type":"ListItem","position":i+1,"name":p.title,"url":`${SITE}/products/${slugFor(p)}.html`}))})}</script>`;
}
function transformHome(html,products,lang) {
  const title="Sugargoo Spreadsheet UK 2026: Product Finds, QC & Shipping";
  const description="Browse curated Sugargoo product finds for UK shoppers, compare listing details, check QC photos and plan warehouse and international shipping decisions.";
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/i,`<meta name="description" content="${description}">`)
    .replace(/<meta property="og:site_name" content="[^"]*">/i,'<meta property="og:site_name" content="Sugargoo Spreadsheet UK">')
    .replace(/<meta property="og:title" content="[^"]*">/i,`<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/i,`<meta property="og:description" content="${description}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/i,`<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/i,`<meta name="twitter:description" content="${description}">`)
    .replace(/<body([^>]*)\sdata-title-key="hero\.b"([^>]*)>/i,'<body$1$2>')
    .replace(/<h1>[\s\S]*?<\/h1>/i,'<h1 data-uk-home-title>Sugargoo Spreadsheet UK <span class="orange">2026</span></h1>')
    .replace(/<p data-i18n="hero\.intro">[\s\S]*?<\/p>/i,`<p data-uk-home-intro>${description}</p>`)
    .replace(/<h2 data-i18n="sheet\.title">[\s\S]*?<\/h2>/i,'<h2 data-uk-sheet-title>Sugargoo Spreadsheet UK 2026</h2>')
    .replace(/<div class="stat-chip"><strong>4<\/strong><span data-i18n="section\.daily">Daily Finds<\/span><\/div>/i,'<div class="stat-chip"><strong>40</strong><span data-uk-find-label>Product Finds</span></div>')
    .replace(/<div class="stat-chip"><strong>4<\/strong><span data-i18n="section\.guides">Shopping Guides<\/span><\/div>/i,'<div class="stat-chip"><strong>23</strong><span data-i18n="section.guides">Shopping Guides</span></div>')
    .replace(/<a class="btn" href="https:\/\/www\.cnfanshp\.com\/" target="_blank" rel="noopener" data-i18n="sheet\.cta">View Spreadsheet<\/a>/i,'<a class="btn" href="/products/">Browse 40 Product Finds</a>')
    .replace(/<a href="https:\/\/www\.cnfanshp\.com\/" target="_blank" rel="noopener" data-i18n="nav\.spreadsheet">Spreadsheet<\/a>/i,'<a href="/products/" data-i18n="nav.spreadsheet">Spreadsheet</a>')
    .replace(/>shoes-60</g,'>Curated Shoes Find 6045<')
    .replace(/"name":"Sugargoo VIP"/g,'"name":"Sugargoo Spreadsheet UK"')
    .replace(/"name":"Sugargoo Spreadsheet 2026: Daily Finds, QC & Shipping Guide"/g,`"name":"${title}"`)
    .replace(/"dateModified":"2026-07-10"/g,`"dateModified":"${UPDATED}"`)
    .replace(/"inLanguage":"en"/g,'"inLanguage":"en-GB"');
  if(!html.includes('href="/products/" class="btn btn-secondary"')) {
    html=html.replace(/<\/div>\s*<\/div>\s*<div class="hero-visual"/i,'<a href="/products/" class="btn btn-secondary">Browse 40 Finds</a></div></div><div class="hero-visual"');
  }
  html=html.replace(/<\/head>/i,productListSchema(products)+"</head>");
  return injectLanguage(html,lang);
}
function transformGuideHub(html,lang) {
  const reps={
    "Sugargoo Warehouse Guide":"Sugargoo Warehouse Guide 2026: QC, Storage, Returns & Parcel Prep",
    "Match arrivals, review evidence, plan storage and prepare a complete parcel checklist.":"Deep UK-focused guide to arrivals, QC, storage deadlines, returns, consolidation and parcel preparation.",
    "Sugargoo Spreadsheet Guide":"Sugargoo Spreadsheet UK 2026",
    "Organize product links, variants, source details and QC notes in a useful research sheet.":"Verify product links, variants, QC notes and shipping attributes in a useful UK research catalogue.",
    "Sugargoo Shipping to the UK":"Sugargoo Shipping to UK 2026",
    "Plan route eligibility, chargeable weight, declarations, tracking and address details.":"Compare live routes, chargeable weight, packing, customs information and tracking without fixed promises.",
    "Sugargoo QC Photos Guide":"Sugargoo QC Photos Guide 2026",
    "Review warehouse photos, measurements and visible condition before shipping.":"Detailed UK-buyer checklist for free QC photos, measurements, extra photography, returns and parcel checks."
  };
  for(const [a,b] of Object.entries(reps)) html=html.split(a).join(b);
  return injectLanguage(html,lang);
}
function injectLanguage(html,lang) {
  const seed=VALID_LANGS.has(lang)?lang:"en";
  const seedScript=`<script>try{localStorage.setItem('sugargooLang','${seed}')}catch(e){}</script>`;
  if(!html.includes("lang-guard-20260808.js")) html=html.replace(/<\/body>/i,'<script src="/assets/lang-guard-20260808.js?v=20260808"></script></body>');
  if(!html.includes("localStorage.setItem('sugargooLang'")) {
    const marker=html.match(/<script src="(?:\.\.\/)?assets\/i18n-v5\.js" defer><\/script>|<script src="\/assets\/i18n-v5\.js" defer><\/script>/i);
    if(marker) html=html.replace(marker[0],seedScript+marker[0]); else html=html.replace(/<\/head>/i,seedScript+"</head>");
  }
  if(noindexForLanguage(lang)) {
    html=html.replace(/<meta name="robots" content="[^"]*">/i,'<meta name="robots" content="noindex,follow,max-image-preview:large">');
  }
  return html;
}

async function staticHtml(path,env,request,lang,products) {
  const assetPath=path==="/"?"/index.html":path==="/guides/"?"/guides/index.html":path;
  let html=await assetText(env,request,assetPath); if(!html) return null;
  if(path==="/") return transformHome(html,products,lang);
  if(path==="/guides/") return transformGuideHub(html,lang);
  return injectLanguage(html,lang);
}

function xmlResponse(xml) { return new Response(xml,{status:200,headers:{"content-type":"application/xml; charset=UTF-8","cache-control":"public, max-age=0, must-revalidate","x-content-type-options":"nosniff"}}); }
async function sitemapXml(env,request,products) {
  const old=await assetText(env,request,"/sitemap.xml"); const urls=[];
  for(const m of old.matchAll(/<loc>([^<]+)<\/loc>/g)) if(m[1].startsWith(SITE)&&!urls.includes(m[1])) urls.push(m[1]);
  if(!urls.includes(`${SITE}/products/`)) urls.push(`${SITE}/products/`);
  for(const p of products){const u=`${SITE}/products/${slugFor(p)}.html`;if(!urls.includes(u))urls.push(u);}
  const fresh=new Set([`${SITE}/`,`${SITE}/products/`,`${SITE}/categories/`,`${SITE}${NEW_ARTICLE}`,...Object.keys(PRIORITY_GUIDES).map(p=>SITE+p),...Object.keys(CATEGORY_META).map(k=>`${SITE}/categories/${k}.html`),...products.map(p=>`${SITE}/products/${slugFor(p)}.html`)]);
  const rows=urls.map(u=>`  <url><loc>${esc(u)}</loc><lastmod>${fresh.has(u)?UPDATED:(u===`${SITE}/guides/`?"2026-07-16":"2026-07-10")}</lastmod><changefreq>weekly</changefreq><priority>${u===`${SITE}/`?"1.0":u===`${SITE}/products/`||u===`${SITE}/categories/`||u===`${SITE}/guides/`?"0.9":"0.8"}</priority></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>`;
}

function canonicalExtension(path) {
  if(path.endsWith("/")||path.includes(".")) return null;
  const candidate=path+".html";
  if(KNOWN_HTML.has(candidate)) return candidate;
  if(/^\/products\/[a-z0-9-]+$/i.test(path)) return candidate;
  return null;
}

export default {
  async fetch(request,env) {
    const url=new URL(request.url); const host=url.hostname.toLowerCase();
    if(host==="www.sugargoovip.uk"||host.endsWith(".pages.dev")||url.protocol!=="https:") {
      url.protocol="https:"; url.hostname="sugargoovip.uk"; url.port=""; return Response.redirect(url.toString(),301);
    }
    const locale=url.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    if(locale) {
      const lang=locale[1]; url.pathname=locale[2]||"/"; url.searchParams.set("lang",lang); return Response.redirect(url.toString(),301);
    }
    const ext=canonicalExtension(url.pathname); if(ext){url.pathname=ext;return Response.redirect(url.toString(),301);}
    const lang=languageFrom(url);
    let products;
    try{products=await loadCatalog(env,request);}catch(e){products=[];}

    if(url.pathname==="/sitemap-index.xml") return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE}/sitemap.xml</loc><lastmod>${UPDATED}</lastmod></sitemap></sitemapindex>`);
    if(url.pathname==="/sitemap.xml") return xmlResponse(await sitemapXml(env,request,products));
    if(["/sitemap-de.xml","/sitemap-fr.xml","/sitemap-es.xml","/sitemap-pl.xml"].includes(url.pathname)) return xmlResponse('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
    if(url.pathname==="/robots.txt") return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap-index.xml\n`,{headers:{"content-type":"text/plain; charset=UTF-8","cache-control":"public, max-age=0, must-revalidate"}});
    if(url.pathname==="/products/"||url.pathname==="/products/index.html") return responseHtml(catalogPage(products,lang));
    const pm=url.pathname.match(/^\/products\/([a-z0-9-]+)-(\d+)\.html$/i);
    if(pm){const p=products.find(x=>slugFor(x)===`${pm[1]}-${pm[2]}`);if(p)return responseHtml(productPage(p,lang));}
    if(url.pathname==="/categories/"||url.pathname==="/categories/index.html") return responseHtml(categoryHub(products,lang));
    const cm=url.pathname.match(/^\/categories\/([a-z0-9-]+)\.html$/i);
    if(cm&&categoryFor(cm[1])) return responseHtml(categoryPage(cm[1],products,lang));
    if(PRIORITY_GUIDES[url.pathname]) { const out=await priorityGuidePage(url.pathname,PRIORITY_GUIDES[url.pathname],env,request,lang); if(out)return responseHtml(out); }
    if(GENERIC_GUIDES[url.pathname]) return responseHtml(genericGuidePage(url.pathname,GENERIC_GUIDES[url.pathname],lang));
    if(REVERSE_ARTICLES[url.pathname]) { const out=await reverseArticleHtml(url.pathname,env,request,lang); if(out)return responseHtml(out); }

    const staticPath=url.pathname==="/"?"/":url.pathname;
    const html=await staticHtml(staticPath,env,request,lang,products);
    if(html) return responseHtml(html);
    return env.ASSETS.fetch(request);
  }
};
