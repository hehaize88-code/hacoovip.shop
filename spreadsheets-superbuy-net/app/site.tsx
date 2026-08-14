import { ArticleSlug, articleSlugs, categories, copy, Lang, languages, localizedPath, products, RouteKey } from "./site-data";
import { guideUi, pageSeo, trustPages, TrustRoute, trustRouteKeys } from "./seo-data";

const ALL_PRODUCTS = "https://www.cnfanshm.com/AllProducts/";
const FORMAL_SITE = "https://spreadsheets-superbuy.net";
const EXTERNAL_REL = "nofollow sponsored noopener";

function trackedUrl(url: string, content: string) {
  const destination = new URL(url);
  destination.searchParams.set("utm_source", "spreadsheets-superbuy.net");
  destination.searchParams.set("utm_medium", "referral");
  destination.searchParams.set("utm_campaign", "verified-spreadsheet");
  destination.searchParams.set("utm_content", content);
  return destination.toString();
}

const priceNotes: Record<Lang, string> = {
  en: "USD planning estimates use CN¥6.75 = US$1 (checked August 13, 2026). Live listing price and payment conversion may differ.",
  fr: "Estimations en USD calculées à CN¥6,75 = 1 US$ (vérifié le 13 août 2026). Le prix réel et le taux de paiement peuvent différer.",
  de: "USD-Planwerte mit CN¥6,75 = 1 US$ (geprüft am 13. August 2026). Live-Preis und Zahlungsumrechnung können abweichen.",
  id: "Estimasi USD memakai CN¥6,75 = US$1 (diperiksa 13 Agustus 2026). Harga produk dan kurs pembayaran dapat berbeda.",
  "zh-cn": "美元估价按 CN¥6.75 = US$1 计算（核验于 2026 年 8 月 13 日）；实时商品价格和支付汇率可能不同。",
};

const localizedCatalog: Record<Lang, { categories: string[]; products: { title: string; category: string }[]; liveSearch: string; nextStep: string }> = {
  en: {
    categories: ["Shoes", "Hoodies / Sweaters", "T-Shirts", "Jackets", "Pants / Shorts", "Headwear", "Accessories", "Jerseys", "Electronics", "Other Stuff"],
    products: [
      { title: "AMIRI Patchwork Denim Jeans [30 styles]", category: "Pants / Shorts" },
      { title: "Stone Island Hoodie", category: "Hoodies / Sweaters" },
      { title: "Football Jerseys", category: "Jerseys" },
      { title: "Lacoste Crossbody Bag with Matching Pouch [6 styles]", category: "Accessories" },
    ],
    liveSearch: "LIVE CATALOG SEARCH", nextStep: "NEXT STEP",
  },
  fr: {
    categories: ["Chaussures", "Sweats / Pulls", "T-shirts", "Vestes", "Pantalons / Shorts", "Couvre-chefs", "Accessoires", "Maillots", "Électronique", "Autres produits"],
    products: [
      { title: "Jean patchwork AMIRI [30 styles]", category: "Pantalons / Shorts" },
      { title: "Sweat Stone Island", category: "Sweats / Pulls" },
      { title: "Maillots de football", category: "Maillots" },
      { title: "Sac bandoulière Lacoste avec pochette [6 styles]", category: "Accessoires" },
    ],
    liveSearch: "RECHERCHE DANS LE CATALOGUE", nextStep: "ÉTAPE SUIVANTE",
  },
  de: {
    categories: ["Schuhe", "Hoodies / Pullover", "T-Shirts", "Jacken", "Hosen / Shorts", "Kopfbedeckungen", "Accessoires", "Trikots", "Elektronik", "Sonstiges"],
    products: [
      { title: "AMIRI Patchwork-Jeans [30 Varianten]", category: "Hosen / Shorts" },
      { title: "Stone Island Hoodie", category: "Hoodies / Pullover" },
      { title: "Fußballtrikots", category: "Trikots" },
      { title: "Lacoste Umhängetasche mit Beutel [6 Varianten]", category: "Accessoires" },
    ],
    liveSearch: "LIVE-KATALOGSUCHE", nextStep: "NÄCHSTER SCHRITT",
  },
  id: {
    categories: ["Sepatu", "Hoodie / Sweater", "Kaos", "Jaket", "Celana / Celana Pendek", "Penutup Kepala", "Aksesori", "Jersey", "Elektronik", "Barang Lain"],
    products: [
      { title: "Jeans Patchwork AMIRI [30 gaya]", category: "Celana / Celana Pendek" },
      { title: "Hoodie Stone Island", category: "Hoodie / Sweater" },
      { title: "Jersey Sepak Bola", category: "Jersey" },
      { title: "Tas Selempang Lacoste dengan Pouch [6 gaya]", category: "Aksesori" },
    ],
    liveSearch: "PENCARIAN KATALOG LANGSUNG", nextStep: "LANGKAH BERIKUTNYA",
  },
  "zh-cn": {
    categories: ["鞋类", "卫衣 / 毛衣", "T 恤", "夹克", "裤装 / 短裤", "帽子", "配饰", "球衣", "电子产品", "其他商品"],
    products: [
      { title: "AMIRI 拼接牛仔裤 [30 种款式]", category: "裤装 / 短裤" },
      { title: "Stone Island 卫衣", category: "卫衣 / 毛衣" },
      { title: "足球球衣", category: "球衣" },
      { title: "Lacoste 斜挎包与配套小包 [6 种款式]", category: "配饰" },
    ],
    liveSearch: "实时目录搜索", nextStep: "下一步",
  },
};

const articleEvidence: Record<Lang, { facts: [string, string, string]; note: string; updated: string }> = {
  en: { facts: ["3 free QC photos", "90 days free storage", "100+ shipping lines"], note: "Fact-checked against Superbuy’s public user guidance. Policies, routes and eligibility can change; verify the current order interface before paying.", updated: "Updated August 13, 2026" },
  fr: { facts: ["3 photos QC gratuites", "90 jours de stockage gratuit", "Plus de 100 lignes"], note: "Vérifié à partir des guides publics de Superbuy. Les politiques, lignes et conditions peuvent changer ; contrôlez l’interface actuelle avant paiement.", updated: "Mis à jour le 13 août 2026" },
  de: { facts: ["3 kostenlose QC-Fotos", "90 Tage kostenlose Lagerung", "Über 100 Versandlinien"], note: "Anhand der öffentlichen Superbuy-Anleitungen geprüft. Regeln, Routen und Verfügbarkeit können sich ändern; vor Zahlung die aktuelle Bestellansicht prüfen.", updated: "Aktualisiert am 13. August 2026" },
  id: { facts: ["3 foto QC gratis", "Penyimpanan gratis 90 hari", "100+ jalur pengiriman"], note: "Diperiksa berdasarkan panduan publik Superbuy. Kebijakan, jalur, dan kelayakan dapat berubah; periksa antarmuka pesanan terbaru sebelum membayar.", updated: "Diperbarui 13 Agustus 2026" },
  "zh-cn": { facts: ["3 张免费 QC 图片", "90 天免费仓储", "100 多条运输线路"], note: "内容已对照 Superbuy 公开用户指南核验。政策、线路和适用条件可能变化，付款前请以当前订单界面为准。", updated: "更新于 2026 年 8 月 13 日" },
};

function SearchForm({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = copy[lang];
  return (
    <form className={`search-form${compact ? " compact" : ""}`} action="https://www.cnfanshm.com/search.html" method="get" target="_blank">
      <label className="sr-only" htmlFor={`product-search-${compact ? "compact" : "main"}`}>{t.search}</label>
      <input id={`product-search-${compact ? "compact" : "main"}`} name="keywords" placeholder={t.searchPlaceholder} autoComplete="off" />
      <input type="hidden" name="channelid" value="2" />
      <input type="hidden" name="utm_source" value="spreadsheets-superbuy.net" />
      <input type="hidden" name="utm_medium" value="referral" />
      <input type="hidden" name="utm_campaign" value="verified-spreadsheet" />
      <input type="hidden" name="utm_content" value={compact ? "page-search" : "homepage-search"} />
      <button type="submit">{t.search}</button>
    </form>
  );
}

function Header({ lang, routePath }: { lang: Lang; routePath: string }) {
  const t = copy[lang];
  const nav = [
    ["", t.nav.home], ["finds", t.nav.finds], ["categories", t.nav.categories], ["qc-guide", t.nav.qc],
    ["shipping", t.nav.shipping], ["articles", guideUi[lang].nav], ["faq", t.nav.faq],
  ];
  const activeLang = languages.find((item) => item.code === lang)!;
  return (
    <header className="site-header">
      <a href={localizedPath(lang)} className="brand" aria-label="Superbuy Spreadsheets home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/superbuy-logo.png" alt="Superbuy" width="726" height="142" />
      </a>
      <nav aria-label="Primary navigation">
        {nav.map(([path, label]) => <a key={path} href={localizedPath(lang, path)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <details className="language-picker">
          <summary aria-label={t.language}><span>{activeLang.short}</span><b>{activeLang.label}</b><i>⌄</i></summary>
          <div>{languages.map((item) => <a key={item.code} href={localizedPath(item.code, routePath)} lang={item.code}>{item.label}<span>{item.short}</span></a>)}</div>
        </details>
        <a className="open-all" href={trackedUrl(ALL_PRODUCTS, "header-open-all")} target="_blank" rel={EXTERNAL_REL}>{t.openAll}</a>
        <details className="mobile-menu">
          <summary aria-label="Menu">MENU</summary>
          <div>{nav.map(([path, label]) => <a key={path} href={localizedPath(lang, path)}>{label}</a>)}<a className="mobile-open-all" href={trackedUrl(ALL_PRODUCTS, "mobile-open-all")} target="_blank" rel={EXTERNAL_REL}>{t.openAll}</a></div>
        </details>
      </div>
    </header>
  );
}

function PageHero({ eyebrow, title, text, seoTitle = title }: { eyebrow: string; title: string; text: string; seoTitle?: string }) {
  return <section className="page-hero"><span>{eyebrow}</span><h1>{seoTitle}</h1><p>{seoTitle !== title && <><strong>{title}</strong><br /></>}{text}</p></section>;
}

function ProductGrid({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const labels = localizedCatalog[lang].products;
  return <><div className="product-grid">{products.map((product, index) => (
    <a className="product-card" href={trackedUrl(product.href, `product-${index + 1}`)} target="_blank" rel={EXTERNAL_REL} key={product.href}>
      {/* Local, verified catalog assets are served directly to avoid transforming product evidence. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="product-image"><img src={product.image} alt={labels[index].title} width="750" height="750" loading="lazy" decoding="async" /><span>{product.price}</span></div>
      <p>{labels[index].category}</p><h3>{labels[index].title}</h3><div><span>{t.notes[product.noteKey]}</span><b>↗</b></div>
      <strong>{t.checkListing}</strong>
    </a>
  ))}</div><p className="price-note">{priceNotes[lang]}</p></>;
}

function CategoryGrid({ lang, limit }: { lang: Lang; limit?: number }) {
  const t = copy[lang];
  return <div className="category-grid">{categories.slice(0, limit).map((category, index) => (
    <a href={trackedUrl(category.href, `category-${index + 1}`)} target="_blank" rel={EXTERNAL_REL} key={category.href}>
      <span className={`category-symbol shape-${index % 4}`}>{category.icon}</span><h3>{localizedCatalog[lang].categories[index]}</h3><p>{t.categoryText}</p><b>{t.explore}</b>
    </a>
  ))}</div>;
}

function ArticleCards({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <div className="article-grid">{(Object.entries(t.articles) as [ArticleSlug, (typeof t.articles)[ArticleSlug]][]).map(([slug, article], index) => (
    <a href={localizedPath(lang, `articles/${slug}`)} key={slug}>
      <div className={`article-art art-${index + 1}`}><span>0{index + 1}</span><i></i><b></b></div>
      <span>{article.category} · {article.read}</span><h3>{article.title}</h3><p>{article.excerpt}</p><strong>{t.readArticle}</strong>
    </a>
  ))}</div>;
}

function FaqList({ lang }: { lang: Lang }) {
  return <div className="faq-list">{copy[lang].faqItems.map((item, index) => <details key={item.q} open={index === 0}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>;
}

function Home({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <>
    <section className="home-hero">
      <div className="hero-copy"><span className="eyebrow">{t.eyebrow}</span><h1>{t.heroTitle}<br /><em>{t.heroEm}</em></h1><p>{t.heroText}</p><SearchForm lang={lang} /><div className="proof">{t.proof.map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div></div>
      <div className="trending-panel"><div><span>{t.trending}</span><a href={localizedPath(lang, "categories")}>{t.viewAll} →</a></div>{categories.slice(0, 4).map((category, index) => <a key={category.href} href={trackedUrl(category.href, `trending-${index + 1}`)} target="_blank" rel={EXTERNAL_REL}><span>{category.icon}</span><b>{localizedCatalog[lang].categories[index]}</b><i>↗</i></a>)}</div>
    </section>
    <section className="section light"><div className="section-heading"><span>{t.browseLabel}</span><h2>{t.browseTitle}</h2><p>{t.browseText}</p></div><CategoryGrid lang={lang} limit={6} /><a className="text-link" href={localizedPath(lang, "categories")}>{t.viewAll} →</a></section>
    <section className="section soft"><div className="section-heading"><span>{t.findsLabel}</span><h2>{t.findsTitle}</h2><p>{t.findsText}</p></div><ProductGrid lang={lang} /><a className="text-link" href={localizedPath(lang, "finds")}>{t.viewAll} →</a></section>
    <section className="how-section"><div><span>{t.learnLabel}</span><h2>{t.learnTitle}</h2><p>{t.learnText}</p></div><div className="steps">{t.learnSteps.map((step, index) => <article key={step.title}><b>0{index + 1}</b><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
    <section className="section articles-home"><div className="section-heading"><span>{t.articlesLabel}</span><h2>{guideUi[lang].title}</h2><p>{guideUi[lang].text}</p></div><ArticleCards lang={lang} /><a className="text-link" href={localizedPath(lang, "articles")}>{t.articleIndexText} →</a></section>
    <section className="faq-section"><div><span>05 / FAQ</span><h2>{t.faqTitle}</h2></div><FaqList lang={lang} /></section>
  </>;
}

function FindsPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles.finds} seoTitle={pageSeo[lang].finds.h1} /><section className="search-band"><div><span>{localizedCatalog[lang].liveSearch}</span><h2>{t.resultsText}</h2></div><SearchForm lang={lang} compact /></section><section className="section soft no-top"><ProductGrid lang={lang} /></section></>;
}

function CategoriesPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles.categories} seoTitle={pageSeo[lang].categories.h1} /><section className="section light no-top"><CategoryGrid lang={lang} /></section></>;
}

function QcPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles["qc-guide"]} seoTitle={pageSeo[lang]["qc-guide"].h1} /><section className="editorial-layout"><aside><span>QC / 01—05</span><h2>{t.nav.qc}</h2><p>{t.learnText}</p></aside><div className="numbered-list">{t.qcChecklist.map((item, index) => <article key={item.title}><b>0{index + 1}</b><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section><section className="article-promo"><span>{t.articles["superbuy-qc-photo-checklist"].category}</span><h2>{t.articles["superbuy-qc-photo-checklist"].title}</h2><a href={localizedPath(lang, "articles/superbuy-qc-photo-checklist")}>{t.readArticle}</a></section></>;
}

function ShippingPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles.shipping} seoTitle={pageSeo[lang].shipping.h1} /><section className="shipping-grid">{t.shippingCards.map((card, index) => <article key={card.title}><span>0{index + 1}</span><h2>{card.title}</h2><p>{card.text}</p></article>)}</section><section className="article-promo lime"><span>{t.articles["superbuy-shipping-cost-and-consolidation"].category}</span><h2>{t.articles["superbuy-shipping-cost-and-consolidation"].title}</h2><a href={localizedPath(lang, "articles/superbuy-shipping-cost-and-consolidation")}>{t.readArticle}</a></section></>;
}

function ArticlesPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles.articles} seoTitle={pageSeo[lang].articles.h1} /><section className="section articles-index no-top"><ArticleCards lang={lang} /></section></>;
}

function FaqPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <><PageHero {...t.pageTitles.faq} seoTitle={pageSeo[lang].faq.h1} /><section className="faq-page"><FaqList lang={lang} /></section></>;
}

function TrustPageView({ lang, route }: { lang: Lang; route: TrustRoute }) {
  const page = trustPages[lang][route];
  return <><PageHero eyebrow={page.eyebrow} title={page.title} text={page.description} /><section className="editorial-layout trust-content"><aside><span>{page.eyebrow}</span><h2>{page.title}</h2><p>{page.description}</p></aside><div className="numbered-list">{page.sections.map((section, index) => <article key={section.title}><b>0{index + 1}</b><div><h3>{section.title}</h3><p>{section.text}</p></div></article>)}</div></section></>;
}

function ArticlePage({ lang, articleSlug }: { lang: Lang; articleSlug: ArticleSlug }) {
  const t = copy[lang]; const article = t.articles[articleSlug];
  const evidence = articleEvidence[lang];
  const pageUrl = `${FORMAL_SITE}${localizedPath(lang, `articles/${articleSlug}`)}`;
  const published = articleSlug === "superbuy-spreadsheet-fields-product-record" ? "2026-08-14" : "2026-08-13";
  const schema = { "@context": "https://schema.org", "@type": articleSlug === "superbuy-spreadsheet-fields-product-record" ? "BlogPosting" : "Article", headline: article.title, description: article.excerpt, datePublished: published, dateModified: published, inLanguage: lang === "zh-cn" ? "zh-CN" : lang, author: { "@type": "Organization", name: "Superbuy Spreadsheets Editorial Team" }, publisher: { "@type": "Organization", name: "Superbuy Spreadsheets" }, mainEntityOfPage: pageUrl };
  return <article className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header><a href={localizedPath(lang, "articles")}>← {guideUi[lang].nav}</a><span>{article.category} · {article.read}</span><h1>{article.title}</h1><p>{article.excerpt}</p><small>{evidence.updated}</small></header>
    <div className="article-fact-strip">{evidence.facts.map((fact, index) => <div key={fact}><span>0{index + 1}</span><b>{fact}</b></div>)}</div>
    <div className="article-body"><p className="method-note">{evidence.note}</p><p className="lead">{article.intro}</p>{article.sections.map((section, index) => <section key={section.heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div></section>)}<aside className="related-guides"><span>{guideUi[lang].related}</span>{articleSlugs.filter((slug) => slug !== articleSlug).map((slug) => <a key={slug} href={localizedPath(lang, `articles/${slug}`)}>{t.articles[slug].title} →</a>)}</aside></div>
    <aside className="article-end"><span>{localizedCatalog[lang].nextStep}</span><h2>{t.findsTitle}</h2><a href={localizedPath(lang, "finds")}>{t.nav.finds} →</a></aside>
  </article>;
}

function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <footer className="site-footer">
    <div className="footer-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/superbuy-logo.png" alt="Superbuy" width="726" height="142" />
    </div>
    <div><p>{t.disclaimer}</p><nav className="footer-links" aria-label="Policies">{trustRouteKeys.map((route) => <a key={route} href={localizedPath(lang, route)}>{trustPages[lang][route].title}</a>)}</nav></div><span>spreadsheets-superbuy.net · 2026</span>
  </footer>;
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function PageSchemas({ lang, route, articleSlug, trustRoute }: { lang: Lang; route: RouteKey | "article" | "trust"; articleSlug?: ArticleSlug; trustRoute?: TrustRoute }) {
  const language = lang === "zh-cn" ? "zh-CN" : lang;
  const routePath = route === "article" ? `articles/${articleSlug}` : route === "trust" ? trustRoute! : route;
  const currentUrl = `${FORMAL_SITE}${localizedPath(lang, routePath)}`;
  const graph: object[] = [];
  if (route === "") {
    graph.push(
      { "@type": "WebSite", "@id": `${FORMAL_SITE}/#website`, url: `${FORMAL_SITE}/`, name: "Spreadsheets Superbuy", inLanguage: language },
      { "@type": "Organization", "@id": `${FORMAL_SITE}/#organization`, name: "Spreadsheets Superbuy Editorial", url: `${FORMAL_SITE}/`, logo: `${FORMAL_SITE}/superbuy-logo.png` },
      { "@type": "ItemList", name: "Verified Superbuy spreadsheet product links", numberOfItems: products.length, itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: localizedCatalog[lang].products[index].title, url: product.href })) },
    );
  }
  if (route === "faq") graph.push({ "@type": "FAQPage", mainEntity: copy[lang].faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) });
  if (route !== "") graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: copy[lang].nav.home, item: `${FORMAL_SITE}${localizedPath(lang)}` },
    { "@type": "ListItem", position: 2, name: route === "article" ? copy[lang].articles[articleSlug!].title : route === "trust" ? trustPages[lang][trustRoute!].title : pageSeo[lang][route].h1, item: currentUrl },
  ] });
  return graph.length ? <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} /> : null;
}

export default function Site({ lang, route, articleSlug, trustRoute, routePath }: { lang: Lang; route: RouteKey | "article" | "trust"; articleSlug?: ArticleSlug; trustRoute?: TrustRoute; routePath: string }) {
  let body;
  if (route === "") body = <Home lang={lang} />;
  else if (route === "finds") body = <FindsPage lang={lang} />;
  else if (route === "categories") body = <CategoriesPage lang={lang} />;
  else if (route === "qc-guide") body = <QcPage lang={lang} />;
  else if (route === "shipping") body = <ShippingPage lang={lang} />;
  else if (route === "articles") body = <ArticlesPage lang={lang} />;
  else if (route === "faq") body = <FaqPage lang={lang} />;
  else if (route === "trust") body = <TrustPageView lang={lang} route={trustRoute!} />;
  else body = <ArticlePage lang={lang} articleSlug={articleSlug!} />;
  return <main className="mint-site" lang={lang === "zh-cn" ? "zh-CN" : lang}><PageSchemas lang={lang} route={route} articleSlug={articleSlug} trustRoute={trustRoute} /><Header lang={lang} routePath={routePath} />{body}<Footer lang={lang} /></main>;
}
