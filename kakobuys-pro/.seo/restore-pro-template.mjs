import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "assets/product-catalog.json"), "utf8"));
const categories = [
  "shoes", "hoodies", "t-shirts", "jackets", "bags",
  "accessories", "pants-shorts", "headwear", "jerseys", "electronics",
];
const corePages = [
  "", "catalog", "guides", "articles", "faq", "about", "privacy", "terms",
  ...categories.map((category) => `catalog/${category}`),
  "articles/how-to-read-kakobuy-qc-photos",
  "articles/kakobuy-spreadsheet-vs-search",
  "articles/warehouse-storage-and-returns",
];
const addedArticles = [
  "buy-from-taobao-with-kakobuy",
  "buy-from-weidian-with-kakobuy",
  "how-to-use-kakobuy-step-by-step",
  "kakobuy-hoodie-streetwear-qc-guide",
  "kakobuy-reviews-evidence-checklist",
  "kakobuy-shipping-cost-estimate",
  "kakobuy-shoes-spreadsheet-qc-guide",
  "kakobuy-tracking-purchase-order-parcel",
  "kakobuy-volumetric-weight-parcel-packing",
];
const locales = [
  ["en", "🌐", "English", "EN"],
  ["pl", "🇵🇱", "Polski", "PL"],
  ["de", "🇩🇪", "Deutsch", "DE"],
  ["fr", "🇫🇷", "Français", "FR"],
  ["es", "🇪🇸", "Español", "ES"],
  ["it", "🇮🇹", "Italiano", "IT"],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function routeFor(locale, page) {
  const suffix = page ? `${page}/` : "";
  return locale === "en" ? `/${suffix}` : `/${locale}/${suffix}`;
}

function alternateLinks(page) {
  const tags = locales.map(([locale]) =>
    `<link rel="alternate" hreflang="${locale}" href="https://kakobuys.pro${routeFor(locale, page)}"/>`
  );
  tags.push(`<link rel="alternate" hreflang="x-default" href="https://kakobuys.pro${routeFor("en", page)}"/>`);
  return tags.join("");
}

function languageMenu(page) {
  const links = locales.map(([locale, icon, label, short]) =>
    `<a${locale === "en" ? ' class="is-active" aria-current="page"' : ""} href="${routeFor(locale, page)}" lang="${locale}" hreflang="${locale}" role="menuitem"><span aria-hidden="true">${icon}</span><span>${label}</span><small>${short}</small></a>`
  ).join("");
  return `<div class="language-popover" role="menu" aria-label="Change edition language">${links}</div></details>`;
}

function productGrid(category) {
  const products = catalog.products.filter((product) => product.category === category);
  const cards = products.map((product) => {
    const usd = (product.cny / catalog.cnyPerUsd).toFixed(2);
    return `<article class="kb-product-card"><a href="/products/${product.page}/" aria-label="View details: ${escapeHtml(product.name)}"><div class="kb-product-image"><img width="900" height="900" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async"/><span>Open record →</span></div><div class="kb-product-copy"><small>${escapeHtml(category.replace("-", " & "))}</small><h3>${escapeHtml(product.name)}</h3><p class="kb-product-meta"><span>ID ${escapeHtml(product.id)}</span><strong>≈ $${usd}</strong></p></div></a></article>`;
  }).join("");
  return `<section class="section shell kb-category-products" data-pro-preserved-content="products"><div class="section-heading split-heading"><div><p class="kicker">Matched product records</p><h2>Eight live references for this desk.</h2></div><p>Product names, first images and reference prices remain part of the expanded directory. Open a record to review its item ID and category-specific QC questions.</p></div><div class="kb-product-grid">${cards}</div></section>`;
}

function expandedArticles() {
  const cards = addedArticles.map((slug, index) => {
    const html = fs.readFileSync(path.join(root, "articles", slug, "index.html"), "utf8");
    const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? slug;
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "Practical Kakobuy research note.";
    return `<article class="article-card"><div class="article-number">${String(index + 4).padStart(2, "0")}</div><div><p class="kicker">Expanded research file</p><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><div class="article-meta"><span>Long-form guide</span><span>2026 edition</span></div><a href="/articles/${slug}/">Continue the note →</a></div></article>`;
  }).join("");
  return `<section class="section shell" data-pro-preserved-content="articles"><div class="section-heading split-heading"><div><p class="kicker">Files 04—12</p><h2>The expanded Kakobuy research archive.</h2></div><p>The later long-form guides remain available inside the restored Kakobuys.pro field-journal template.</p></div><div class="article-grid">${cards}</div></section>`;
}

for (const page of corePages) {
  const filename = path.join(root, page, "index.html");
  let html = fs.readFileSync(filename, "utf8");

  html = html.replace(/<section[^>]*data-pro-preserved-content="(?:products|articles)"[\s\S]*?<\/section>/g, "");
  html = html.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+"\/>/g, "");
  html = html.replace(/<div class="language-popover"[\s\S]*?<\/div><\/details>/, languageMenu(page));
  if (!html.includes("/assets/locale-nav.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="/assets/locale-nav.css"/></head>`);
  }
  html = html.replace("</head>", `${alternateLinks(page)}</head>`);

  if (page.startsWith("catalog/") && page !== "catalog/") {
    if (!html.includes("/assets/catalog-upgrade.css")) {
      html = html.replace("</head>", `<link rel="stylesheet" href="/assets/catalog-upgrade.css"/></head>`);
    }
    html = html.replace("</main>", `${productGrid(page.slice("catalog/".length))}</main>`);
  }

  if (page === "articles") {
    html = html.replace("</main>", `${expandedArticles()}</main>`);
  }

  // Keep the restored pages static. The historical hydration bundle would
  // reconcile the language anchors back into the old button-only UI.
  html = html.replace(/<script id="_R_">[\s\S]*?<\/script>/, "");
  html = html.replace(/<\/html>[\s\S]*$/, "</html>");
  fs.writeFileSync(filename, html);
}

console.log(`Restored ${corePages.length} Kakobuys.pro template pages with preserved expansion links.`);
