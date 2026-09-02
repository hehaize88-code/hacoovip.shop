"use client";

import { useEffect, useMemo, useState } from "react";
import { articleHref, articleSlugs, ArticleSlug, categoryLinks, copies, languageHref, languages, Lang, mainSite, pageHref, PageKey, products } from "./site-data";
import { articleBodies, articleUi } from "./article-data";
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

function ProductTable({ lang }: { lang: Lang }) {
  const t = copies[lang];
  const categoryCopy = t.categories as Record<string, string[]>;
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filters = ["all", "shoes", "tshirts", "headwear"];

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeFilter === "all" || product.category === activeFilter;
      const localizedCategory = categoryCopy[product.category]?.[0] ?? product.category;
      const matchesQuery = !normalized || `${product.name} ${localizedCategory} ${product.id}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeFilter, query, categoryCopy]);

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
            <button type="button" key={filter} className={activeFilter === filter ? "active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
              {filter === "all" ? t.home.all : categoryCopy[filter]?.[0]}
            </button>
          ))}
        </div>
        <label className="local-search"><span aria-hidden="true">⌕</span><span className="sr-only">{t.home.searchSheet}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={t.home.searchSheet} /></label>
      </div>
      <div className="product-table" role="table" aria-label={t.home.featured}>
        <div className="table-head table-row" role="row">
          <span role="columnheader">{t.common.product}</span><span role="columnheader">{t.common.category}</span><span role="columnheader">{t.common.source}</span><span role="columnheader">{t.common.usd}</span><span role="columnheader">{t.common.status}</span><span role="columnheader">{t.common.checkedShort}</span><span role="columnheader" />
        </div>
        {filteredProducts.map((product, index) => (
          <div className="table-row product-row" role="row" key={product.href}>
            <div className="product-cell" role="cell">
              <span className="row-number">{String(index + 1).padStart(2, "0")}</span><img src={product.image} alt="" width="72" height="72" loading={index < 3 ? "eager" : "lazy"} />
              <div><a href={product.href} target="_blank" rel="noopener noreferrer" data-ga-event="product_open" data-ga-item-id={product.id} data-ga-item-name={product.name} data-ga-location="product_name">{product.name}</a><small>{product.id}</small></div>
            </div>
            <div className="mobile-field category-cell" role="cell" data-label={t.common.category}><span>{categoryCopy[product.category]?.[0]}</span></div>
            <div className="mobile-field source-cell" role="cell" data-label={t.common.source}>{product.sourcePrice}</div>
            <div className="mobile-field usd-cell" role="cell" data-label={t.common.usd}><strong>{product.price}</strong></div>
            <div className="mobile-field status-cell" role="cell" data-label={t.common.status}><span><i /> {t.common.live}</span></div>
            <div className="mobile-field checked-cell" role="cell" data-label={t.common.checkedShort}>14/08</div>
            <a className="row-action" role="cell" href={product.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.common.openProduct}: ${product.name}`} data-ga-event="product_open" data-ga-item-id={product.id} data-ga-item-name={product.name} data-ga-location="row_action"><span>{t.common.openProduct}</span>↗</a>
          </div>
        ))}
        {filteredProducts.length === 0 && <div className="empty-state">{t.common.noResults}</div>}
      </div>
      <div className="sheet-footer"><span>{filteredProducts.length} / {products.length} {t.common.shown}</span><span>{t.common.priceNote}</span></div>
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
        <aside className="hero-summary"><div className="summary-head"><span>{t.home.overview}</span><b><i /> {t.common.updated}</b></div><div className="summary-grid"><div><strong>10</strong><span>{t.home.categoriesMetric}</span></div><div><strong>6</strong><span>{t.home.rowsMetric}</span></div><div><strong>200+</strong><span>{t.home.countriesMetric}</span></div><div><strong>90d</strong><span>{t.home.storageMetric}</span></div></div><p>{t.home.overviewNote}</p></aside>
      </section>
      <section className="directory-section"><ProductTable lang={lang} /></section>
      <section className="category-section section-shell"><SectionTitle kicker={t.home.browseKicker} title={t.home.browseTitle} intro={t.home.browseIntro} /><CategoryGrid lang={lang} /></section>
      <section className="facts-band"><div><span>{t.home.storageLabel}</span><strong>90 d</strong></div><div><span>{t.home.downloadsLabel}</span><strong>500K+</strong></div><div><span>{t.home.countriesLabel}</span><strong>200+</strong></div><div><span>{t.home.deliveryLabel}</span><strong>5 d</strong></div><p>*{t.common.factsNote}</p></section>
      <section className="qc-section section-shell"><SectionTitle kicker={t.home.qcKicker} title={t.home.qcTitle} intro={t.home.qcIntro} /><div className="qc-layout"><QcChecklist t={t} /><aside className="qc-note"><span>{t.home.ruleLabel}</span><h3>{t.home.ruleTitle}</h3><p>{t.home.ruleText}</p><a href={pageHref(lang, "qc")}>{t.home.ruleLink} →</a></aside></div></section>
      <section className="shipping-section"><div className="section-shell"><SectionTitle kicker={t.home.shipKicker} title={t.home.shipTitle} intro={t.home.shipIntro} light /><ShippingFlow t={t} /></div></section>
      <section className="guides-section section-shell"><SectionTitle kicker={t.home.guidesKicker} title={t.home.guidesTitle} intro={t.home.guidesIntro} /><div className="guide-grid">{t.articles.slice(0,3).map((article, index) => <a className="guide-card-link" href={articleHref(lang, articleSlugs[index])} key={article[1]}><article><span>{article[0]} · {index + 6} min</span><h3>{article[1]}</h3><p>{article[2]}</p><b>{t.pageExtras.articlesCta} →</b></article></a>)}</div></section>
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
      {page === "shipping" && <><section className="shipping-section inner-shipping"><div className="section-shell"><ShippingFlow t={t} /></div></section><section className="section-shell inner-content"><h2 className="subsection-title">{t.pageExtras.shippingTitle}</h2><div className="info-card-grid four-cards">{t.shippingFactors.map((factor, index) => <article key={factor[0]}><span>0{index + 1}</span><h3>{factor[0]}</h3><p>{factor[1]}</p></article>)}</div></section>{lang === "it" && <ItalianShippingGuide />}</>}
      {page === "faq" && <section className="section-shell standalone-faq"><FaqList t={t} /></section>}
      {page === "articles" && <section className="section-shell article-index"><div className="article-grid">{t.articles.map((article, index) => <a className="article-card-link" href={articleHref(lang, articleSlugs[index])} key={article[1]}><article><div><span>{article[0]}</span><b>{String(index + 1).padStart(2, "0")}</b></div><h2>{article[1]}</h2><p>{article[2]}</p><strong>{t.pageExtras.articlesCta} →</strong></article></a>)}</div></section>}
    </>
  );
}

export default function SitePage({ lang, page }: { lang: Lang; page: PageKey }) {
  useDocumentLanguage(lang);
  return (
    <main id="top" lang={lang} className={`page-root page-${page}`}>
      <Header lang={lang} page={page} />
      {page === "home" ? <HomePage lang={lang} /> : <InnerPage lang={lang} page={page} />}
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
  const articleText = [body.lead, ...body.keyPoints, ...body.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]), ...body.checklist, ...body.faqs.flat()].join(" ");
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(6, Math.ceil(wordCount / 210));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: summary[1],
    description: summary[2],
    dateModified: "2026-09-02",
    inLanguage: lang,
    articleSection: summary[0],
    wordCount,
    isAccessibleForFree: true,
    datePublished: "2026-08-14",
    mainEntityOfPage: `${canonicalOrigin}${articleHref(lang, slug)}`,
    author: { "@type": "Organization", name: "Hipobuy Sheet Research" },
  };

  return (
    <main id="top" lang={lang} className="page-root page-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header lang={lang} page="articles" articleSlug={slug} />
      <article className="longform-article">
        <div className="article-breadcrumb"><a href={pageHref(lang, "articles")}>← {ui.back}</a><span>{ui.updated}</span></div>
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
            <section className="article-faq"><h2>{ui.faq}</h2>{body.faqs.map((faq, faqIndex) => <details key={faq[0]} open={faqIndex === 0}><summary>{faq[0]}<b>+</b></summary><p>{faq[1]}</p></details>)}</section>
            <aside className="article-source-note"><strong>{ui.sourceNote}</strong><p>{ui.sourceText}</p></aside>
            <aside className="article-cta"><div><p>{ui.ctaTitle}</p><span>{ui.ctaText}</span></div><a href={`${mainSite}/AllProducts/`} target="_blank" rel="noopener noreferrer" data-ga-event="outbound_click" data-ga-link-url={`${mainSite}/AllProducts/`} data-ga-location="article_cta">{ui.ctaButton} ↗</a></aside>
          </div>
        </div>
      </article>
      <Footer lang={lang} page="articles" />
    </main>
  );
}
