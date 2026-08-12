import type { ArticleSlug, Locale, PageKind } from "./site-data";
import { allProducts, articleSlugs, categories, copy, getArticles, locales, products, routeFor } from "./site-data";
import { researchedFaqs, researchedSteps } from "./researched-content";

const articleResearchLabels: Record<Locale, string> = {
  pl: "Sprawdzone na publicznych stronach USFans · aktualizacja 12 sierpnia 2026",
  en: "Fact-checked against USFans public pages · updated 12 August 2026",
  de: "An öffentlichen USFans-Seiten geprüft · aktualisiert am 12. August 2026",
  fr: "Vérifié sur les pages publiques USFans · mis à jour le 12 août 2026",
  it: "Verificato sulle pagine pubbliche USFans · aggiornato il 12 agosto 2026",
  es: "Verificado con las páginas públicas de USFans · actualizado el 12 de agosto de 2026",
  ro: "Verificat pe paginile publice USFans · actualizat la 12 august 2026",
};

const categoryLabels: Record<Locale, string[]> = {
  pl: ["Buty", "Bluzy", "T-shirty", "Kurtki", "Spodnie", "Nakrycia głowy", "Akcesoria", "Koszulki sportowe", "Elektronika", "Inne"],
  en: ["Shoes", "Hoodies", "T-Shirts", "Jackets", "Pants", "Headwear", "Accessories", "Jerseys", "Electronics", "Other finds"],
  de: ["Schuhe", "Hoodies", "T-Shirts", "Jacken", "Hosen", "Kopfbedeckung", "Accessoires", "Trikots", "Elektronik", "Weitere"],
  fr: ["Chaussures", "Sweats", "T-shirts", "Vestes", "Pantalons", "Couvre-chefs", "Accessoires", "Maillots", "Électronique", "Autres"],
  it: ["Scarpe", "Felpe", "T-shirt", "Giacche", "Pantaloni", "Copricapi", "Accessori", "Maglie", "Elettronica", "Altro"],
  es: ["Calzado", "Sudaderas", "Camisetas", "Chaquetas", "Pantalones", "Gorras", "Accesorios", "Camisetas deportivas", "Electrónica", "Otros"],
  ro: ["Pantofi", "Hanorace", "Tricouri", "Jachete", "Pantaloni", "Șepci", "Accesorii", "Tricouri sportive", "Electronice", "Altele"],
};

function Header({ locale, page, article }: { locale: Locale; page: PageKind; article?: ArticleSlug }) {
  const c = copy[locale];
  const activePage = page === "article" ? "articles" : page;
  return (
    <header className="nav-wrap">
      <a className="brand" href={routeFor(locale, "home")} aria-label="USFanss home">
        <img className="brand-logo" src="/usfans-logo.png" alt="USFans" />
        <span className="brand-year">/ 2026</span>
      </a>
      <nav aria-label="Primary navigation">
        {(["finds", "categories", "guides", "articles", "faq"] as const).map((item) => (
          <a className={activePage === item ? "active" : ""} key={item} href={routeFor(locale, item)}>{c.nav[item]}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <details className="language-menu">
          <summary aria-label={c.language}><span className="globe">◎</span>{locale.toUpperCase()}<i>⌄</i></summary>
          <div className="language-panel">
            <p>{c.language}</p>
            {locales.map((item) => (
              <a className={locale === item.code ? "selected" : ""} href={routeFor(item.code, page, article)} key={item.code} hrefLang={item.lang}>
                <span>{item.short}</span><b>{item.label}</b>{locale === item.code && <i>✓</i>}
              </a>
            ))}
            <small>US · DE · FR · GB · CA · PL · IT · RO · ES</small>
          </div>
        </details>
        <a className="nav-cta" href={allProducts} target="_blank" rel="noopener noreferrer">{c.browseAll} <span>↗</span></a>
      </div>
    </header>
  );
}

function Search({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <form className="search-box" action="https://www.cnbuycha.com/search.html" method="get" target="_blank">
      <input type="hidden" name="channelid" value="2" />
      <label htmlFor={`product-search-${locale}`}>{c.searchLabel}</label>
      <div className="search-row">
        <input id={`product-search-${locale}`} name="keywords" placeholder={c.searchPlaceholder} required />
        <button type="submit">{c.search} <span>↗</span></button>
      </div>
    </form>
  );
}

function CategoryGrid({ locale, limit }: { locale: Locale; limit?: number }) {
  const labels = categoryLabels[locale];
  return (
    <div className="category-grid">
      {categories.slice(0, limit).map(([, index, href], i) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="category-card">
          <span>{index}</span><strong>{labels[i]}</strong><i>↗</i>
        </a>
      ))}
    </div>
  );
}

function ProductGrid({ locale, limit }: { locale: Locale; limit?: number }) {
  const c = copy[locale];
  return (
    <>
      <div className="product-grid">
        {products.slice(0, limit).map((product, index) => (
          <a className="product-card" href={product.href} key={product.href} target="_blank" rel="noopener noreferrer">
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} loading={index > 2 ? "lazy" : "eager"} />
              <span className="product-open">↗</span>
            </div>
            <div className="product-meta">
              <h3>{product.name}</h3>
              <div className="price"><strong>{product.price}</strong><small>{c.approx}</small></div>
            </div>
          </a>
        ))}
      </div>
      <p className="price-note">{c.priceNote}</p>
    </>
  );
}

function ArticleCards({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const articles = getArticles(locale);
  return (
    <div className="article-grid">
      {articleSlugs.map((slug, index) => (
        <a className={`article-card article-card-${index + 1}`} href={routeFor(locale, "article", slug)} key={slug}>
          <div className="article-top"><span>0{index + 1}</span><i>↗</i></div>
          <p>{c.planned}</p><h3>{articles[slug].title}</h3><small>{articles[slug].excerpt}</small>
          <b>{c.readArticle} →</b>
        </a>
      ))}
    </div>
  );
}

function FAQList({ locale, limit }: { locale: Locale; limit?: number }) {
  return (
    <div className="faq-list">
      {researchedFaqs[locale].slice(0, limit).map(([question, answer]) => (
        <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
      ))}
    </div>
  );
}

function SectionHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div><p>{body}</p></div>;
}

function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>{c.independent}</span><b>{c.updated}</b></p>
          <h1>{c.heroLines[0]}<br />{c.heroLines[1]}<br /><em>{c.heroLines[2]}</em></h1>
          <p className="hero-lede">{c.heroBody}</p><Search locale={locale} />
          <div className="hero-actions"><a className="primary-button" href={routeFor(locale, "finds")}>{c.explore}</a><a className="text-button" href={routeFor(locale, "guides")}>{c.howLink} ↓</a></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <figure className="hero-card hero-card-main"><img src={products[0].image} alt="" /></figure>
          <figure className="hero-card hero-card-small"><img src={products[2].image} alt="" /></figure>
        </div>
      </section>
      <section className="quick-nav" aria-label="Independent pages">
        {(["finds", "categories", "guides", "articles", "faq"] as const).map((item, index) => <a href={routeFor(locale, item)} key={item}><span>0{index + 1}</span><strong>{c.nav[item]}</strong><i>↗</i></a>)}
      </section>
      <section className="section"><SectionHead kicker={c.categoriesKicker} title={c.categoriesTitle} body={c.categoriesBody} /><CategoryGrid locale={locale} limit={6} /><a className="section-route" href={routeFor(locale, "categories")}>{c.nav.categories} →</a></section>
      <section className="section light-panel"><SectionHead kicker={c.findsKicker} title={c.findsTitle} body={c.findsBody} /><ProductGrid locale={locale} limit={3} /><a className="section-route" href={routeFor(locale, "finds")}>{c.nav.finds} →</a></section>
      <section className="section"><SectionHead kicker={c.articleKicker} title={c.articlesTitle} body={c.articlesBody} /><ArticleCards locale={locale} /><a className="section-route" href={routeFor(locale, "articles")}>{c.articleIndex} →</a></section>
      <section className="section faq-home"><div><p className="section-kicker">{c.faqKicker}</p><h2>{c.faqTitle}</h2><p>{c.faqIntro}</p></div><FAQList locale={locale} limit={2} /></section>
    </>
  );
}

function InnerHero({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return <section className="inner-hero"><p className="section-kicker">{kicker}</p><h1>{title}</h1><p>{body}</p></section>;
}

function FindsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><InnerHero kicker={c.findsKicker} title={c.findsTitle} body={c.findsBody} /><section className="section internal-section"><Search locale={locale} /><ProductGrid locale={locale} /></section></>;
}

function CategoriesPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><InnerHero kicker={c.categoriesKicker} title={c.categoriesTitle} body={c.categoriesBody} /><section className="section internal-section"><CategoryGrid locale={locale} /></section></>;
}

function GuidesPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><InnerHero kicker={c.guidesKicker} title={c.guidesTitle} body={c.guidesBody} /><section className="section how-section"><div><p className="section-kicker">{c.howKicker}</p><h2>{c.howTitle}</h2><p>{c.howBody}</p></div><ol className="steps">{researchedSteps[locale].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section><section className="section"><ArticleCards locale={locale} /></section></>;
}

function ArticlesPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><InnerHero kicker={c.articleKicker} title={c.articlesTitle} body={c.articlesBody} /><section className="section internal-section"><ArticleCards locale={locale} /></section></>;
}

function FAQPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><InnerHero kicker={c.faqKicker} title={c.faqTitle} body={c.faqIntro} /><section className="section faq-page"><FAQList locale={locale} /></section></>;
}

function ArticlePage({ locale, slug }: { locale: Locale; slug: ArticleSlug }) {
  const c = copy[locale];
  const article = getArticles(locale)[slug];
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, inLanguage: locales.find((l) => l.code === locale)?.lang, mainEntityOfPage: routeFor(locale, "article", slug) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article-page">
        <header><a href={routeFor(locale, "articles")}>← {c.articleIndex}</a><p>{c.articleKicker} · 2026</p><h1>{article.title}</h1><strong>{article.excerpt}</strong><small className="research-note">{articleResearchLabels[locale]}</small></header>
        <div className="article-layout">
          <aside><span>{c.keyTakeaways}</span><ul>{article.points.map((point) => <li key={point}>{point}</li>)}</ul></aside>
          <div className="article-body">
            <div className="article-intro">{article.intro.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {article.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2>{body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <div className="article-check"><strong>{c.disclaimer}</strong></div>
          </div>
        </div>
      </article>
    </>
  );
}

function FinalCTA({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className="final-cta"><p>{c.finalEyebrow}</p><h2>{c.finalTitle}</h2><a href={allProducts} target="_blank" rel="noopener noreferrer">{c.finalCta} <span>↗</span></a></section>;
}

function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <footer><div className="footer-brand"><img className="footer-logo" src="/usfans-logo.png" alt="USFans" /><strong>/ 2026</strong></div><p>{c.disclaimer}</p><div><a href="#top">{c.backTop} ↑</a><span>{locale.toUpperCase()}</span></div></footer>;
}

export function SitePage({ locale, page, article }: { locale: Locale; page: PageKind; article?: ArticleSlug }) {
  const c = copy[locale];
  const languageTag = locales.find((item) => item.code === locale)?.lang ?? locale;
  const faqJson = page === "faq" ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: researchedFaqs[locale].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) } : null;
  return (
    <main className={`site page-${page}`} id="top">
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(languageTag)}` }} />
      {faqJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />}
      <div className="page-shell">
        <Header locale={locale} page={page} article={article} />
        {page === "home" && <HomePage locale={locale} />}
        {page === "finds" && <FindsPage locale={locale} />}
        {page === "categories" && <CategoriesPage locale={locale} />}
        {page === "guides" && <GuidesPage locale={locale} />}
        {page === "articles" && <ArticlesPage locale={locale} />}
        {page === "faq" && <FAQPage locale={locale} />}
        {page === "article" && article && <ArticlePage locale={locale} slug={article} />}
        {page !== "article" && <FinalCTA locale={locale} />}
        <Footer locale={locale} />
      </div>
    </main>
  );
}
