"use client";

import { useEffect, useMemo, useState } from "react";
import { articleHref, articleSlugs, ArticleSlug, categoryLinks, copies, languageHref, languages, Lang, mainSite, pageHref, PageKey, products } from "./site-data";
import { articleBodies, articleUi } from "./article-data";
import { isNewArticle, newArticleSlugs, latestArticleSlugs } from "./new-articles";
import { editorialUi } from "./editorial-ui";
import growthCopy from "./content/growth-copy.json";
import { articleModified, relatedArticles } from "./growth-routing";
import ItalianShippingGuide from "./italian-shipping-guide";

type LocalCopy = (typeof copies)[Lang];
const canonicalOrigin = "https://sheet-hipobuy.net";

function useDocumentLanguage(lang: Lang) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}

function Brand({ lang, page, footer = false }: { lang: Lang; page: PageKey; footer?: boolean }) {
  return (
    <a className={`brand hipobuy-brand${footer ? " footer-brand" : ""}`} href={pageHref(lang, "home")} aria-label="Hipobuy home">
      <span className="brand-logo-wrap"><img src="/hipobuy-logo.png" width="494" height="111" alt="HIPOBUY" /></span>
      {!footer && <span className="directory-label">SHEET</span>}
    </a>
  );
}

function Header({ lang, page, articleSlug }: { lang: Lang; page: PageKey; articleSlug?: ArticleSlug }) {
  const t = copies[lang];
  const currentLanguage = languages.find((item) => item.code === lang) ?? languages[0];
  const navItems: Array<[PageKey, string]> = [
    ["spreadsheet", t.nav.spreadsheet], ["categories", t.nav.categories], ["qc", t.nav.qc],
    ["shipping", t.nav.shipping], ["faq", t.nav.faq], ["articles", t.nav.articles],
  ];

  return (
    <>
      <div className="review-bar">
        <span><i /> {t.common.independent}</span><span>{t.common.checked}</span><span>{t.common.review}</span>
      </div>
      <header className="site-header expanded-header">
        <Brand lang={lang} page={page} />
        <nav aria-label="Primary navigation">
          {navItems.map(([key, label]) => <a key={key} className={page === key ? "active" : ""} href={pageHref(lang, key)}>{label}</a>)}
        </nav>
        <div className="header-tools">
          <details className="language-menu">
            <summary aria-label={t.common.language}><span>{currentLanguage.flag}</span><b>{currentLanguage.code.toUpperCase()}</b><i aria-hidden="true">⌄</i></summary>
            <div className="language-popover">
              <p>{t.common.language}</p>
              {languages.map((item) => (
                <a key={item.code} className={item.code === lang ? "active" : ""} href={articleSlug ? articleHref(item.code, articleSlug) : languageHref(item.code, page)} hrefLang={item.code} data-ga-event="language_change" data-ga-language={item.code} data-ga-location="header">
                  <span>{item.flag}</span><div><strong>{item.label}</strong><small>{item.market}</small></div><b>{item.code === lang ? "✓" : ""}</b>
                </a>
              ))}
            </div>
          </details>
          <a className="header-action" href={`${mainSite}/AllProducts/`} target="_blank" rel="noopener noreferrer" data-ga-event="outbound_click" data-ga-link-url={`${mainSite}/AllProducts/`} data-ga-location="header">{t.common.openIndex} <span aria-hidden="true">↗</span></a>
        </div>
      </header>
    </>
  );
}

function Footer({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = copies[lang];
  return (
    <footer>
      <Brand lang={lang} page={page} footer />
      <p>{t.common.footer}</p>
      <div><a href="#top">{t.common.back} ↑</a><span>{t.common.review}</span></div>
    </footer>
  );
}

function ProductTable({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = copies[lang];
  const categoryCopy = t.categories as Record<string, string[]>;
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [pageNumber, setPageNumber] = useState(0);
  const g = growthCopy[lang].ui;
  const pageSize = compact ? 6 : 16;
  const filters = ["all", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matched = products.filter((product) => {
      const matchesCategory = activeFilter === "all" || product.category === activeFilter;
      const localizedCategory = categoryCopy[product.category]?.[0] ?? product.category;
      const matchesQuery = !normalized || `${product.name} ${localizedCategory} ${product.id}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return sort === "featured" ? matched : [...matched].sort((a, b) => (Number(a.price.slice(1)) - Number(b.price.slice(1))) * (sort === "price_desc" ? -1 : 1));
  }, [activeFilter, query, categoryCopy, sort]);
  const pages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(pageNumber, pages - 1);
  const visibleProducts = filteredProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  useEffect(() => {
    if (!query.trim()) return;
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("directory-search", {detail: {language: lang, query_length: String(query.trim().length), result_count: String(filteredProducts.length)}}));
    }, 800);
    return () => window.clearTimeout(timer);
  }, [query, lang, filteredProducts.length]);

  return (
    <div className="directory-window">
      <div className="window-titlebar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="window-name"><span className="mini-sheet" aria-hidden="true">▦</span> {t.home.sheetName}</div>
        <div className="window-meta">{t.home.verified}</div>
      </div>
      <div className="sheet-tabs">
        <span className="active">{t.home.featured}</span>
        <a href={pageHref(lang, "categories")}>{t.home.allCategories}</a>
        <a href={pageHref(lang, "qc")}>{t.home.qcTab}</a>
        <a href={pageHref(lang, "shipping")}>{t.home.shippingTab}</a>
      </div>
      <div className="sheet-toolbar">
        <div className="filter-set" aria-label="Filter product rows">
          {filters.map((filter) => (
            <button type="button" key={filter} className={activeFilter === filter ? "active" : ""} aria-pressed={activeFilter === filter} data-ga-event="directory_filter" data-ga-category={filter} data-ga-language={lang} onClick={() => {setActiveFilter(filter); setPageNumber(0);}}>
              {filter === "all" ? t.home.all : categoryCopy[filter]?.[0]}
            </button>
          ))}
        </div>
        <label className="local-search"><span aria-hidden="true">⌕</span><span className="sr-only">{t.home.searchSheet}</span><input value={query} onChange={(event) => {setQuery(event.target.value); setPageNumber(0);}} type="search" placeholder={t.home.searchSheet} /></label>
      </div>
      <div className="directory-controls"><label>{g[2]} <select value={sort} onChange={(event) => {setSort(event.target.value);setPageNumber(0);}}><option value="featured">{g[3]}</option><option value="price_asc">{g[4]}</option><option value="price_desc">{g[5]}</option></select></label><a href={pageHref(lang, "spreadsheet")}>{g[15]} →</a></div>
      <div className="product-table" role="table" aria-label={t.home.featured}>
        <div className="table-head table-row" role="row">
          <span role="columnheader">{t.common.product}</span><span role="columnheader">{t.common.category}</span><span role="columnheader">{t.common.source}</span><span role="columnheader">{t.common.usd}</span><span role="columnheader">{t.common.status}</span><span role="columnheader">{t.common.checkedShort}</span><span role="columnheader" />
        </div>
        {visibleProducts.map((product, index) => (
          <div className="table-row product-row" role="row" key={product.href}>
            <div className="product-cell" role="cell">
              <span className="row-number">{String(currentPage * pageSize + index + 1).padStart(2, "0")}</span><img src={product.image} alt={product.name} width="72" height="72" loading={index < 3 ? "eager" : "lazy"} />
              <div><a href={product.href} target="_blank" rel="noopener noreferrer" data-ga-event="product_open" data-ga-item-id={product.id} data-ga-item-name={product.name} data-ga-location="product_name">{product.name}</a><small>{product.id}</small></div>
            </div>
            <div className="mobile-field category-cell" role="cell" data-label={t.common.category}><span>{categoryCopy[product.category]?.[0]}</span></div>
            <div className="mobile-field source-cell" role="cell" data-label={t.common.source}>{product.sourcePrice}</div>
            <div className="mobile-field usd-cell" role="cell" data-label={t.common.usd}><strong>{product.price}</strong></div>
            <div className="mobile-field status-cell" role="cell" data-label={t.common.status}><span><i /> {t.common.live}</span></div>
            <div className="mobile-field checked-cell" role="cell" data-label={t.common.checkedShort}><time dateTime={product.checked}>{product.checkedLabel}</time></div>
            <a className="row-action" role="cell" href={product.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.common.openProduct}: ${product.name}`} data-ga-event="product_open" data-ga-item-id={product.id} data-ga-item-name={product.name} data-ga-location="row_action"><span>{t.common.openProduct}</span>↗</a>
          </div>
        ))}
        {filteredProducts.length === 0 && <div className="empty-state">{t.common.noResults}</div>}
      </div>
      <nav className="directory-pagination" aria-label={g[6]}><button disabled={currentPage === 0} onClick={() => setPageNumber(currentPage - 1)} data-ga-event="directory_page" data-ga-page={String(currentPage)}>{g[0]}</button><span aria-live="polite">{currentPage + 1} / {pages} · {filteredProducts.length} {g[6]}</span><button disabled={currentPage + 1 >= pages} onClick={() => setPageNumber(currentPage + 1)} data-ga-event="directory_page" data-ga-page={String(currentPage + 2)}>{g[1]}</button></nav>
      <div className="sheet-footer"><span>{visibleProducts.length} / {products.length} {t.common.shown}</span><span>{t.common.priceNote}</span></div>
    </div>
  );
}

function CategoryGrid({ lang }: { lang: Lang }) {
  const t = copies[lang];
  const categoryCopy = t.categories as Record<string, string[]>;
  return (
    <div className="category-grid">
      {categoryLinks.map((category, index) => (
        <a href={category.href} target="_blank" rel="noopener noreferrer" key={category.key} data-ga-event="category_open" data-ga-category={category.key} data-ga-location="category_grid">
          <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{categoryCopy[category.key][0]}</strong><small>{categoryCopy[category.key][1]}</small></div><b aria-hidden="true">↗</b>
        </a>
      ))}
    </div>
  );
}

function QcChecklist({ t }: { t: LocalCopy }) {
  return (
    <ol className="qc-list">
      {t.qcSteps.map((step, index) => <li key={step[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step[0]}</strong><p>{step[1]}</p></div><b>{step[2]}</b></li>)}
    </ol>
  );
}

function ShippingFlow({ t }: { t: LocalCopy }) {
  return <ol className="shipping-flow">{t.shipSteps.map((step, index) => <li key={step[0]}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step[0]}</strong><p>{step[1]}</p></li>)}</ol>;
}

function FaqList({ t }: { t: LocalCopy }) {
  return (
    <div className="faq-list">
      {t.faqItems.map((faq, index) => <details key={faq[0]}><summary><span>{String(index + 1).padStart(2, "0")}</span>{faq[0]}<b aria-hidden="true">+</b></summary><p>{faq[1]}</p></details>)}
    </div>
  );
}

function SectionTitle({ kicker, title, intro, light = false }: { kicker: string; title: string; intro: string; light?: boolean }) {
  return <div className={`section-title${light ? " light-title" : ""}`}><div><p>{kicker}</p><h2>{title}</h2></div><p>{intro}</p></div>;
}

function HomePage({ lang }: { lang: Lang }) {
  const t = copies[lang];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqItems.map((item) => ({ "@type": "Question", name: item[0], acceptedAnswer: { "@type": "Answer", text: item[1] } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="hero-shell">
        <div className="hero-copy"><p className="overline"><span>{t.home.overline}</span></p><h1>{t.home.title}</h1><p>{t.home.lead}</p>
          <form className="external-search" action={`${mainSite}/search.html`} method="get" target="_blank" data-ga-event="search_submit" data-ga-language={lang} data-ga-location="home_hero"><input type="hidden" name="channelid" value="2" /><label htmlFor={`external-search-${lang}`}>{t.home.searchLabel}</label><div><input id={`external-search-${lang}`} name="keywords" type="search" placeholder={t.home.searchPlaceholder} required /><button type="submit">{t.home.searchButton} <span aria-hidden="true">→</span></button></div></form>
        </div>
        <aside className="hero-summary"><div className="summary-head"><span>{t.home.overview}</span><b><i /> {t.common.updated}</b></div><div className="summary-grid"><div><strong>10</strong><span>{t.home.categoriesMetric}</span></div><div><strong>{products.length}</strong><span>{t.home.rowsMetric}</span></div><div><strong>{languages.length}</strong><span>{growthCopy[lang].ui[8]}</span></div><div><strong>{articleSlugs.length}</strong><span>{growthCopy[lang].ui[9]}</span></div></div><p>{t.home.overviewNote}</p></aside>
      </section>
      <section className="directory-section"><ProductTable lang={lang} compact /></section>
      <section className="category-section section-shell"><SectionTitle kicker={t.home.browseKicker} title={t.home.browseTitle} intro={t.home.browseIntro} /><CategoryGrid lang={lang} /></section>
      <section className="facts-band"><div><span>{growthCopy[lang].ui[6]}</span><strong>{products.length}</strong></div><div><span>{t.home.categoriesMetric}</span><strong>{categoryLinks.length}</strong></div><div><span>{growthCopy[lang].ui[8]}</span><strong>{languages.length}</strong></div><div><span>{growthCopy[lang].ui[9]}</span><strong>{articleSlugs.length}</strong></div><p>{growthCopy[lang].ui[11]}</p></section>
      <section className="qc-section section-shell"><SectionTitle kicker={t.home.qcKicker} title={t.home.qcTitle} intro={t.home.qcIntro} /><div className="qc-layout"><QcChecklist t={t} /><aside className="qc-note"><span>{t.home.ruleLabel}</span><h3>{t.home.ruleTitle}</h3><p>{t.home.ruleText}</p><a href={pageHref(lang, "qc")}>{t.home.ruleLink} →</a></aside></div></section>
      <section className="shipping-section"><div className="section-shell"><SectionTitle kicker={t.home.shipKicker} title={t.home.shipTitle} intro={t.home.shipIntro} light /><ShippingFlow t={t} /></div></section>
      <section className="guides-section section-shell"><SectionTitle kicker={t.home.guidesKicker} title={t.home.guidesTitle} intro={t.home.guidesIntro} /><div className="guide-grid">{([...latestArticleSlugs, "hipobuy-shipping-cost-guide", "hipobuy-warehouse-qc-photos"] as ArticleSlug[]).map((guideSlug) => {const article = t.articles[articleSlugs.indexOf(guideSlug)]; return <a className="guide-card-link" href={articleHref(lang, guideSlug)} data-ga-event="guide_open" data-ga-location="home" data-ga-article={guideSlug} key={guideSlug}><article><span>{article[0]}</span><h3>{article[1]}</h3><p>{article[2]}</p><b>{t.pageExtras.articlesCta} →</b></article></a>;})}</div></section>
      <section className="faq-section"><div className="section-shell faq-layout"><div className="faq-intro"><p>{t.home.faqKicker}</p><h2>{t.home.faqTitle}</h2><span>{t.home.faqBadge}</span></div><FaqList t={t} /></div></section>
    </>
  );
}

function InnerPage({ lang, page }: { lang: Lang; page: Exclude<PageKey, "home"> }) {
  const t = copies[lang];
  const pageCopy = t.pages[page];
  return (
    <>
      <section className="inner-hero"><div><p>{pageCopy.kicker}</p><h1>{pageCopy.title}</h1><span>{pageCopy.intro}</span></div><a href={pageHref(lang, "home")}>{t.nav.home} ↗</a></section>
      {page === "spreadsheet" && <><section className="directory-section inner-directory"><ProductTable lang={lang} /></section><section className="section-shell support-panel"><div><p>01</p><h2>{t.pageExtras.spreadsheetTitle}</h2></div><ol>{t.pageExtras.spreadsheetItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section></>}
      {page === "categories" && <section className="section-shell inner-content"><CategoryGrid lang={lang} /><div className="support-panel compact-support"><div><p>01</p><h2>{t.pageExtras.categoriesTitle}</h2></div><ol>{t.pageExtras.categoriesItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div></section>}
      {page === "qc" && <section className="section-shell inner-content"><div className="qc-layout"><QcChecklist t={t} /><aside className="qc-note"><span>{t.home.ruleLabel}</span><h3>{t.home.ruleTitle}</h3><p>{t.home.ruleText}</p></aside></div><h2 className="subsection-title">{t.pageExtras.qcTitle}</h2><div className="info-card-grid">{t.qcTips.map((tip, index) => <article key={tip[0]}><span>0{index + 1}</span><h3>{tip[0]}</h3><p>{tip[1]}</p></article>)}</div></section>}
      {page === "shipping" && <><section className="shipping-section inner-shipping"><div className="section-shell"><ShippingFlow t={t} /></div></section><section className="section-shell inner-content"><h2 className="subsection-title">{t.pageExtras.shippingTitle}</h2><div className="info-card-grid four-cards">{t.shippingFactors.map((factor, index) => <article key={factor[0]}><span>0{index + 1}</span><h3>{factor[0]}</h3><p>{factor[1]}</p></article>)}</div></section><section className="section-shell country-guides"><h2>{editorialUi[lang].countryGuides}</h2><div className="guide-grid">{newArticleSlugs.map((guideSlug) => <a className="guide-card-link" key={guideSlug} href={articleHref(lang, guideSlug)} data-ga-event="guide_open" data-ga-location="shipping_hub" data-ga-article={guideSlug}><article><h3>{t.articles[articleSlugs.indexOf(guideSlug)][1]}</h3><p>{t.articles[articleSlugs.indexOf(guideSlug)][2]}</p><b>{t.pageExtras.articlesCta} →</b></article></a>)}</div></section>{lang === "it" && <ItalianShippingGuide />}</>}
      {page === "faq" && <section className="section-shell standalone-faq"><FaqList t={t} /></section>}
      {page === "articles" && <section className="section-shell article-index"><div className="article-grid">{articleSlugs.map((slug, index) => ({ slug, index, article: t.articles[index] })).sort((a, b) => Number((latestArticleSlugs as readonly string[]).includes(b.slug)) - Number((latestArticleSlugs as readonly string[]).includes(a.slug)) || Number(isNewArticle(b.slug)) - Number(isNewArticle(a.slug))).map(({ article, index, slug }) => <a className="article-card-link" data-ga-event="guide_open" data-ga-location="article_index" data-ga-article={slug} href={articleHref(lang, slug)} key={article[1]}><article><div><span>{article[0]}</span><b>{String(index + 1).padStart(2, "0")}</b></div><h2>{article[1]}</h2><p>{article[2]}</p><strong>{t.pageExtras.articlesCta} →</strong></article></a>)}</div></section>}
    </>
  );
}

export default function SitePage({ lang, page }: { lang: Lang; page: PageKey }) {
  useDocumentLanguage(lang);
  const t = copies[lang];
  return (
    <main id="top" lang={lang} className={`page-root page-${page}`}>
      <Header lang={lang} page={page} />
      {page === "home" ? <HomePage lang={lang} /> : <InnerPage lang={lang} page={page} />}
      {page !== "home" && page !== "articles" && <section className="section-shell topic-links"><h2>{growthCopy[lang].ui[9]}</h2><div className="guide-grid">{(page === "qc" ? ["hipobuy-warehouse-qc-photos", "hipobuy-warehouse-return-checklist", "how-to-buy-with-hipobuy"] : page === "shipping" ? ["hipobuy-shipping-cost-guide", "hipobuy-actual-vs-volumetric-weight", "hipobuy-rehearsal-parcel"] : ["how-to-buy-with-hipobuy", "hipobuy-warehouse-qc-photos", "hipobuy-shipping-cost-guide"]).map((item) => {const guideSlug = item as ArticleSlug; return <a key={guideSlug} href={articleHref(lang, guideSlug)} data-ga-event="guide_open" data-ga-location="topic_hub" data-ga-article={guideSlug}>{t.articles[articleSlugs.indexOf(guideSlug)][1]} →</a>;})}</div></section>}
      <Footer lang={lang} page={page} />
    </main>
  );
}

export function ArticlePage({ lang, slug }: { lang: Lang; slug: ArticleSlug }) {
  useDocumentLanguage(lang);
  const t = copies[lang];
  const ui = articleUi[lang];
  const body = articleBodies[lang][slug];
  const index = articleSlugs.indexOf(slug);
  const summary = t.articles[index];
  const editorial = editorialUi[lang];
  const related = relatedArticles(slug);
  const updated = articleModified(slug);
  const latest = (latestArticleSlugs as readonly string[]).includes(slug);
  const updatedLabel = updated === "2026-10-31" ? growthCopy[lang].ui[10] : ui.updated;
  const articleText = [body.lead, ...body.keyPoints, ...body.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]), ...body.checklist, ...body.faqs.flat()].join(" ");
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 210));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: summary[1],
    description: summary[2],
    dateModified: updated,
    inLanguage: lang,
    articleSection: summary[0],
    wordCount,
    isAccessibleForFree: true,
    datePublished: latest ? "2026-10-31" : isNewArticle(slug) ? "2026-10-04" : "2026-08-14",
    mainEntityOfPage: `${canonicalOrigin}${articleHref(lang, slug)}`,
    author: { "@type": "Organization", name: "Hipobuy Sheet Research", url: canonicalOrigin, logo: { "@type": "ImageObject", url: `${canonicalOrigin}/hipobuy-logo.png`, width: 494, height: 111 } },
    publisher: { "@type": "Organization", name: "Hipobuy Sheet", url: canonicalOrigin, logo: { "@type": "ImageObject", url: `${canonicalOrigin}/hipobuy-logo.png`, width: 494, height: 111 } },
    image: [`${canonicalOrigin}/og-image.png`],
  };

  return (
    <main id="top" lang={lang} className="page-root page-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t.nav.home, item: `${canonicalOrigin}${pageHref(lang, "home")}` }, { "@type": "ListItem", position: 2, name: t.nav.articles, item: `${canonicalOrigin}${pageHref(lang, "articles")}` }, { "@type": "ListItem", position: 3, name: summary[1], item: `${canonicalOrigin}${articleHref(lang, slug)}` }] }]) }} />
      <Header lang={lang} page="articles" articleSlug={slug} />
      <article className="longform-article">
        <div className="article-breadcrumb"><a href={pageHref(lang, "articles")}>← {ui.back}</a><time dateTime={updated}>{updatedLabel}</time></div>
        <header className="article-hero">
          <div><p>{summary[0]} · {readingMinutes} {ui.minutes}</p><h1>{summary[1]}</h1><div>{body.lead}</div></div>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </header>
        <div className="article-reading-layout">
          <aside className="article-toc">
            <p>{ui.contents}</p>
            <ol>{body.sections.map((section, sectionIndex) => <li key={section.title}><a href={`#section-${sectionIndex + 1}`}><span>{String(sectionIndex + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol>
          </aside>
          <div className="article-copy">
            <section className="article-key-points"><p>{ui.keyPoints}</p><ul>{body.keyPoints.map((item) => <li key={item}>{item}</li>)}</ul></section>
            {body.visual && <figure className="article-visual">
              <figcaption><span>{body.visual.label}</span><h2>{body.visual.title}</h2><p>{body.visual.intro}</p></figcaption>
              <div className="article-visual-table-wrap"><table><thead><tr>{body.visual.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{body.visual.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
            </figure>}
            {body.sections.map((section, sectionIndex) => (
              <section id={`section-${sectionIndex + 1}`} className="article-section" key={section.title}>
                <span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
            <section className="article-checklist"><p>{ui.checklist}</p><ol>{body.checklist.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
            <nav className="article-related" aria-label={editorial.related}><h2>{editorial.related}</h2><ul>{related.map((relatedSlug) => <li key={relatedSlug}><a href={articleHref(lang, relatedSlug)} data-ga-event="guide_open" data-ga-location="related_guides" data-ga-article={relatedSlug}>{t.articles[articleSlugs.indexOf(relatedSlug)][1]} <span aria-hidden="true">→</span></a></li>)}</ul></nav>
            <aside className="article-source-note"><strong>{ui.sourceNote}</strong><p>{latest ? growthCopy[lang].ui[13] : isNewArticle(slug) ? editorial.sources : `${ui.sourceText} ${editorial.revision}`}</p></aside>
            <aside className="article-cta"><div><p>{ui.ctaTitle}</p><span>{ui.ctaText}</span></div><a href={`${mainSite}/AllProducts/`} target="_blank" rel="noopener noreferrer" data-ga-event="outbound_click" data-ga-link-url={`${mainSite}/AllProducts/`} data-ga-location="article_cta">{ui.ctaButton} ↗</a></aside>
          </div>
        </div>
      </article>
      <Footer lang={lang} page="articles" />
    </main>
  );
}
