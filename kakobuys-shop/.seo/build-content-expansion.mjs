import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expansionArticles } from "./expansion-articles.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const reviewedDate = "2026-07-30";
const displayDate = "July 30, 2026";
const site = "https://kakobuys.shop";

const existingArticles = [
  {
    slug: "how-to-read-kakobuy-qc-photos",
    eyebrow: "QC field guide",
    title: "How to Read Kakobuy QC Photos Before You Ship",
    description: "A practical inspection order for shape, measurements, stitching, labels and seller-link risk—without pretending a photo can prove everything.",
    readTime: "11 min",
    updated: "July 29, 2026"
  },
  {
    slug: "kakobuy-spreadsheet-vs-search",
    eyebrow: "Buying workflow",
    title: "Kakobuy Spreadsheet vs. Search: Which Finds Products Faster?",
    description: "Use a spreadsheet for discovery and a searchable index for verification. This guide explains where each format wins and where it fails.",
    readTime: "9 min",
    updated: "July 29, 2026"
  },
  {
    slug: "warehouse-storage-and-returns",
    eyebrow: "Policy notes",
    title: "Warehouse Storage, Returns and the Five-Day Clock",
    description: "What Kakobuy’s public help pages say about free storage and eligible returns, plus the checks you should make before relying on a deadline.",
    readTime: "8 min",
    updated: "July 29, 2026"
  },
  {
    slug: "kakobuy-shipping-cost-estimate",
    eyebrow: "Shipping cost guide",
    title: "Kakobuy Shipping Cost: How to Estimate Before You Submit a Parcel",
    description: "A practical way to estimate Kakobuy international freight, compare parcel assumptions and avoid treating a calculator result as a guaranteed final quote.",
    readTime: "12 min",
    updated: "July 30, 2026"
  }
];

const allArticles = [...existingArticles, ...expansionArticles];

const relatedArticles = {
  "how-to-use-kakobuy-step-by-step": ["buy-from-taobao-with-kakobuy", "how-to-read-kakobuy-qc-photos", "kakobuy-shipping-cost-estimate"],
  "buy-from-taobao-with-kakobuy": ["how-to-use-kakobuy-step-by-step", "kakobuy-spreadsheet-vs-search", "warehouse-storage-and-returns"],
  "buy-from-weidian-with-kakobuy": ["how-to-use-kakobuy-step-by-step", "kakobuy-shoes-spreadsheet-qc-guide", "how-to-read-kakobuy-qc-photos"],
  "kakobuy-volumetric-weight-parcel-packing": ["kakobuy-shipping-cost-estimate", "warehouse-storage-and-returns", "kakobuy-tracking-purchase-order-parcel"],
  "kakobuy-shoes-spreadsheet-qc-guide": ["how-to-read-kakobuy-qc-photos", "buy-from-weidian-with-kakobuy", "kakobuy-volumetric-weight-parcel-packing"],
  "kakobuy-hoodie-streetwear-qc-guide": ["how-to-read-kakobuy-qc-photos", "kakobuy-spreadsheet-vs-search", "warehouse-storage-and-returns"],
  "kakobuy-tracking-purchase-order-parcel": ["how-to-use-kakobuy-step-by-step", "kakobuy-shipping-cost-estimate", "warehouse-storage-and-returns"],
  "kakobuy-reviews-evidence-checklist": ["how-to-use-kakobuy-step-by-step", "kakobuy-shipping-cost-estimate", "how-to-read-kakobuy-qc-photos"]
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function wordCount(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function languageMenu() {
  return `<details class="language-menu">
    <summary aria-label="Choose language"><span aria-hidden="true">◎</span><span data-content-language-summary>EN</span><span class="language-caret" aria-hidden="true">⌄</span></summary>
    <div class="language-popover" role="menu" aria-label="Choose language">
      <button data-content-language="en" type="button" role="menuitem"><span aria-hidden="true">🌐</span><span>English</span><small>EN</small></button>
      <button data-content-language="pl" type="button" role="menuitem"><span aria-hidden="true">🇵🇱</span><span>Polski</span><small>PL</small></button>
      <button data-content-language="de" type="button" role="menuitem"><span aria-hidden="true">🇩🇪</span><span>Deutsch</span><small>DE</small></button>
      <button data-content-language="fr" type="button" role="menuitem"><span aria-hidden="true">🇫🇷</span><span>Français</span><small>FR</small></button>
      <button data-content-language="it" type="button" role="menuitem"><span aria-hidden="true">🇮🇹</span><span>Italiano</span><small>IT</small></button>
    </div>
  </details>`;
}

function header() {
  return `<header class="site-header"><div class="shell nav-row">
    <a href="/" class="logo" aria-label="Kakobuys Shop home"><img class="logo-image" src="/kakobuy-logo.png" alt="Kakobuy" width="642" height="162"></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="/catalog/">Catalog</a><a href="/guides/">QC Guides</a><a href="/articles/">SEO Articles</a><a href="/faq/">FAQ</a><a href="/about/">About</a></nav>
    ${languageMenu()}
    <a class="button button-dark nav-cta" href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">Browse all finds <span aria-hidden="true">↗</span></a>
    <details class="mobile-menu"><summary aria-label="Menu">Menu</summary><nav aria-label="Mobile navigation"><a href="/catalog/">Catalog</a><a href="/guides/">QC Guides</a><a href="/articles/">SEO Articles</a><a href="/faq/">FAQ</a><a href="/about/">About</a></nav></details>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid">
    <div><a href="/" class="logo" aria-label="Kakobuys Shop home"><img class="logo-image" src="/kakobuy-logo.png" alt="Kakobuy" width="642" height="162"></a><p>Independent Kakobuy spreadsheet research, QC education and product-link discovery.</p></div>
    <div><strong>Explore</strong><a href="/catalog/">Product catalog</a><a href="/guides/">QC Guides</a><a href="/articles/">SEO Articles</a><a href="/faq/">Questions</a></div>
    <div><strong>Project</strong><a href="/about/">About &amp; sources</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div>
    <div class="footer-note"><span class="status-dot" aria-hidden="true"></span><strong>Research status</strong><p>Expansion facts reviewed July 30, 2026.</p></div>
  </div><div class="shell legal-row"><p>© 2026 Kakobuys.shop. Independent resource.</p><p>Not affiliated with Kakobuy or any marketplace or brand referenced.</p></div></footer>`;
}

function documentHead({ title, description, canonical, type = "website", keywords = [], image = `${site}/kakobuy-logo.png` }) {
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(keywords.join(","))}">
  <meta name="creator" content="Kakobuys.shop Research Desk">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="/assets/index-B3cBPZ7F.css">
  <link rel="stylesheet" href="/assets/content-library.css">`;
}

function articlePage(article) {
  const canonical = `${site}/articles/${article.slug}/`;
  const count = wordCount(article.body);
  if (count < 1200 || count > 1800) {
    throw new Error(`${article.slug} has ${count} words; expected 1200–1800`);
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: canonical,
    datePublished: reviewedDate,
    dateModified: reviewedDate,
    inLanguage: "en",
    wordCount: count,
    keywords: article.keywords,
    image: [article.image || `${site}/kakobuy-logo.png`],
    author: {"@type": "Organization", name: "Kakobuys.shop Research Desk"},
    publisher: {
      "@type": "Organization",
      name: "Kakobuys.shop",
      url: site,
      logo: {"@type": "ImageObject", url: `${site}/kakobuy-logo.png`}
    },
    isPartOf: {"@type": "WebSite", name: "Kakobuys.shop", url: site}
  };
  const related = (relatedArticles[article.slug] || [])
    .map((slug) => allArticles.find((entry) => entry.slug === slug))
    .filter(Boolean)
    .map((entry) => `<li><a href="/articles/${entry.slug}/">${escapeHtml(entry.title)}</a></li>`)
    .join("");
  return `<!doctype html><html lang="en"><head>
  ${documentHead({
    title: `${article.title} | Kakobuys.shop`,
    description: article.description,
    canonical,
    type: "article",
    keywords: article.keywords,
    image: article.image
  })}
  <meta property="article:published_time" content="${reviewedDate}T00:00:00Z">
  <meta property="article:modified_time" content="${reviewedDate}T00:00:00Z">
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
  </head><body class="content-article">
  ${header()}
  <main>
    <section class="page-hero"><div class="shell">
      <div class="breadcrumbs"><a href="/">Home</a> / <a href="/articles/">SEO Articles</a> / ${escapeHtml(article.eyebrow)}</div>
      <p class="kicker">${escapeHtml(article.eyebrow)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p>${escapeHtml(article.description)}</p>
      <div class="article-byline"><span>By Kakobuys.shop Research Desk</span><span>${escapeHtml(article.readTime)} read</span><span>${count.toLocaleString("en-US")} words</span><span>Reviewed ${displayDate}</span></div>
    </div></section>
    <section class="section shell"><div class="article-layout">
      <article class="prose">${article.body.trim()}
        <section class="evidence-ledger"><h2>Related Kakobuy research</h2><ul>${related}</ul></section>
      </article>
      <aside class="side-card">
        <p class="kicker">Independent research</p>
        <h3>Facts and limits stay separate.</h3>
        <p>Platform statements are dated. Examples are labelled, and customer reports are never presented as guarantees.</p>
        <a class="button button-dark" href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">Search product index ↗</a>
        <a class="button" href="/articles/">All 12 articles</a>
      </aside>
    </div></section>
  </main>
  ${footer()}
  <script src="/assets/content-language.js" defer></script>
  </body></html>`;
}

function articleIndex() {
  const canonical = `${site}/articles/`;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: allArticles.length,
    itemListElement: allArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site}/articles/${article.slug}/`,
      name: article.title
    }))
  };
  const cards = allArticles.map((article, index) => `<article class="expanded-article-card">
    <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
    <p class="kicker">${escapeHtml(article.eyebrow)}</p>
    <h2>${escapeHtml(article.title)}</h2>
    <p>${escapeHtml(article.description)}</p>
    <div class="article-meta"><span>${escapeHtml(article.readTime)}</span><span>Updated ${escapeHtml(article.updated)}</span></div>
    <a class="button button-dark" href="/articles/${article.slug}/">Read article →</a>
  </article>`).join("");
  return `<!doctype html><html lang="en"><head>
  ${documentHead({
    title: "Kakobuy Guides, QC Research & Shipping Articles | Kakobuys.shop",
    description: "Read 12 evidence-led Kakobuy guides covering orders, Taobao and Weidian links, QC, shipping, tracking, warehouse decisions and public customer feedback.",
    canonical,
    keywords: ["Kakobuy guide", "Kakobuy spreadsheet", "Kakobuy shipping", "Kakobuy QC", "how to use Kakobuy"]
  })}
  <script type="application/ld+json">${JSON.stringify(itemList).replaceAll("<", "\\u003c")}</script>
  </head><body class="article-library-page">
  ${header()}
  <main>
    <section class="page-hero articles-hero"><div class="shell">
      <div class="breadcrumbs"><a href="/">Home</a> / SEO Articles</div>
      <p class="kicker">Evidence-led library</p>
      <h1>Kakobuy research for decisions people actually make.</h1>
      <p>Twelve complete English guides separate observable facts, dated platform information, editorial methods and the limits of third-party reports.</p>
    </div></section>
    <section class="section shell">
      <div class="article-library-summary"><div><p class="kicker">Published research</p><h2>${allArticles.length} complete articles</h2></div><p>Each article has one primary search intent. New topics are checked against the topic map before publication to reduce repetition and keyword cannibalisation.</p></div>
      <div class="expanded-article-library">${cards}</div>
      <div class="source-note"><strong>Editorial standard</strong> Articles name the review date, distinguish official statements from examples, avoid invented customer stories and link readers back to independent product records.</div>
    </section>
  </main>
  ${footer()}
  <script src="/assets/content-language.js" defer></script>
  </body></html>`;
}

function updateSitemap() {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  const refreshedPaths = ["/", "/catalog/", "/articles/", ...[
    "shoes", "hoodies", "t-shirts", "jackets", "bags", "accessories",
    "pants-shorts", "headwear", "jerseys", "electronics"
  ].map((category) => `/catalog/${category}/`)];
  for (const pathname of refreshedPaths) {
    const loc = `${site}${pathname}`;
    const blockPattern = new RegExp(`(<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc>\\s*<lastmod>)[^<]+`);
    xml = xml.replace(blockPattern, `$1${reviewedDate}T00:00:00.000Z`);
  }
  for (const article of expansionArticles) {
    const url = `${site}/articles/${article.slug}/`;
    if (xml.includes(`<loc>${url}</loc>`)) continue;
    const entry = `<url>
<loc>${url}</loc>
<lastmod>${reviewedDate}T00:00:00.000Z</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>
`;
    xml = xml.replace("</urlset>", `${entry}</urlset>`);
  }
  fs.writeFileSync(sitemapPath, xml);
}

function updateTopicMap() {
  const topicPath = path.join(here, "topic-map.json");
  const topicMap = JSON.parse(fs.readFileSync(topicPath, "utf8"));
  const oldEntries = topicMap.entries.filter((entry) =>
    !expansionArticles.some((article) => entry.url.includes(`/articles/${article.slug}`))
  );
  topicMap.lastReviewed = reviewedDate;
  topicMap.entries = [
    ...oldEntries,
    ...expansionArticles.map((article) => ({
      url: `${site}/articles/${article.slug}/`,
      primaryQuery: article.primaryQuery,
      relatedTerms: article.keywords.filter((keyword) => keyword !== article.primaryQuery),
      intent: article.intent,
      angle: article.angle,
      evidence: article.evidence,
      internalLinkRole: article.internalLinkRole
    }))
  ];
  topicMap.nextPriority = "Kakobuy coupons and shipping discounts: current-term verification";
  fs.writeFileSync(topicPath, `${JSON.stringify(topicMap, null, 2)}\n`);
}

for (const article of expansionArticles) {
  const destination = path.join(root, "articles", article.slug);
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, "index.html"), articlePage(article));
}
fs.writeFileSync(path.join(root, "articles", "index.html"), articleIndex());
updateSitemap();
updateTopicMap();

console.log(JSON.stringify({
  totalArticles: allArticles.length,
  added: expansionArticles.map((article) => ({
    slug: article.slug,
    words: wordCount(article.body)
  }))
}, null, 2));
