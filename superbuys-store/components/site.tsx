import { articles, categories, copy, edit, faq, localeNames, ROOT, type Locale } from "../lib/content";

type RouteKind = "home" | "categories" | "guides" | "faq" | "articles" | "article" | "not-found";

type ParsedRoute = {
  locale: Locale;
  kind: RouteKind;
  slug?: string;
  basePath: string;
};

export function parseRoute(segments: string[]): ParsedRoute {
  const maybeLocale = segments[0];
  const locale: Locale = maybeLocale === "fr" || maybeLocale === "de" ? maybeLocale : "en";
  const rest = locale === "en" ? segments : segments.slice(1);
  const basePath = rest.length ? `/${rest.join("/")}` : "/";

  if (rest.length === 0) return { locale, kind: "home", basePath };
  if (rest.length === 1 && ["categories", "guides", "faq", "articles"].includes(rest[0])) {
    return { locale, kind: rest[0] as RouteKind, basePath };
  }
  if (rest.length === 2 && rest[0] === "articles") {
    const exists = articles[locale].some((article) => article.slug === rest[1]);
    return { locale, kind: exists ? "article" : "not-found", slug: rest[1], basePath };
  }
  return { locale, kind: "not-found", basePath };
}

export function localizedPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

function Header({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  return (
    <header className="topbar">
      <a className="brand-logo" href={localizedPath(locale, "/")} aria-label="Superbuy index home">
        <img src="/superbuy-logo.png" alt="Superbuy" width="726" height="142" />
      </a>
      <nav aria-label="Primary navigation">
        <a href={localizedPath(locale, "/categories")}>{t.nav.categories}</a>
        <a href={localizedPath(locale, "/guides")}>{t.nav.guides}</a>
        <a href={localizedPath(locale, "/faq")}>{t.nav.faq}</a>
        <a href={localizedPath(locale, "/articles")}>{t.nav.articles}</a>
      </nav>
      <div className="top-actions">
        <details className="language-menu">
          <summary>{locale.toUpperCase()} <span aria-hidden="true">⌄</span></summary>
          <div>
            {(Object.keys(localeNames) as Locale[]).map((code) => (
              <a key={code} href={localizedPath(code, basePath)} lang={code} aria-current={code === locale ? "page" : undefined}>
                <span>{code.toUpperCase()}</span>{localeNames[code]}
              </a>
            ))}
          </div>
        </details>
        <a className="browse-link" href={`${ROOT}/AllProducts/`} target="_blank" rel="noreferrer">
          {t.nav.browse} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

function Search({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  return (
    <form className={compact ? "search-line search-line--compact" : "search-line"} action={`${ROOT}/search.html`} method="get" target="_blank">
      <label htmlFor={`site-search-${compact ? "compact" : "home"}`}>{t.searchLabel}</label>
      <div>
        <input type="hidden" name="channelid" value="2" />
        <input id={`site-search-${compact ? "compact" : "home"}`} name="keywords" type="search" placeholder={t.searchPlaceholder} required />
        <button type="submit">{t.searchButton} ↗</button>
      </div>
    </form>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer>
      <div className="footer-mark"><img src="/superbuy-logo.png" alt="Superbuy" width="726" height="142" /></div>
      <div className="footer-copy"><p>{t.disclaimer}</p></div>
      <a href={localizedPath(locale, "/")}>{t.back} ↑</a>
    </footer>
  );
}

function Shell({ locale, basePath, children }: { locale: Locale; basePath: string; children: React.ReactNode }) {
  return <main><Header locale={locale} basePath={basePath} />{children}<Footer locale={locale} /></main>;
}

function CategoryRows({ locale, limit }: { locale: Locale; limit?: number }) {
  const t = copy[locale];
  return (
    <div className="index-list">
      {categories.slice(0, limit).map((category, index) => {
        const [name, note] = t.cat[category.key];
        return (
          <a key={category.key} href={category.href} target="_blank" rel="noreferrer">
            <span className="index-no">{String(index + 1).padStart(2, "0")}</span>
            <strong>{name}</strong>
            <span className="index-note">{note}</span>
            <span className="index-arrow" aria-hidden="true">↗</span>
          </a>
        );
      })}
    </div>
  );
}

function Home({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  return (
    <Shell locale={locale} basePath={basePath}>
      <section className="hero" id="top">
        <div className="issue-rail" aria-hidden="true"><span>SUPERBUY PRODUCT INDEX</span><span>ISSUE 01 / 2026</span></div>
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.titleA}<br /><em>{t.home.titleB}</em><br />{t.home.titleC}</h1>
          <div className="hero-deck"><span className="edition">01</span><p>{t.home.deck}</p></div>
        </div>
        <a className="hero-image" href={edit[0].href} target="_blank" rel="noreferrer" aria-label={t.home.coverAlt}>
          <img src={edit[0].image} alt={t.home.coverAlt} width="900" height="900" />
          <span className="image-caption">{t.home.coverCaption} <b>{t.open} ↗</b></span>
        </a>
        <Search locale={locale} />
        <p className="margin-note">CURATED ROUTES<br />REAL LISTING LINKS<br />INDEPENDENT GUIDE</p>
      </section>

      <section className="category-index" id="index">
        <div className="section-kicker"><span>{t.home.directoryKicker}</span><p>{t.home.directoryIntro}</p></div>
        <div className="index-heading"><h2>{t.home.directoryTitle}</h2><a href={localizedPath(locale, "/categories")}>{t.home.routes} →</a></div>
        <CategoryRows locale={locale} limit={8} />
      </section>

      <section className="editorial" id="edit">
        <div className="editorial-title">
          <div><span>{t.home.editKicker}</span><span>{t.home.editSource}</span></div>
          <h2>{t.home.editTitle}</h2><p>{t.home.editIntro}</p>
        </div>
        <div className="feature-layout">
          {edit.map((item, index) => (
            <a className={item.className} href={item.href} target="_blank" rel="noreferrer" key={item.number}>
              <div className="feature-image"><img src={item.image} alt={t.home.names[index][0]} width="900" height="900" loading="lazy" /><span>{t.open} ↗</span></div>
              <div className="feature-caption"><span>{item.number}</span><div><strong>{t.home.names[index][0]}</strong><small>{t.home.names[index][1]}</small></div><b>↗</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className="statement">
        <p>{t.home.idea}</p><blockquote>{t.home.statement[0]}<br /><em>{t.home.statement[1]}</em><br />{t.home.statement[2]}</blockquote>
        <a href={`${ROOT}/AllProducts/`} target="_blank" rel="noreferrer">{t.home.enter} <span>↗</span></a>
      </section>

      <section className="notes" id="notes">
        <div className="notes-head"><span>{t.home.notesKicker}</span><h2>{t.home.notesTitle}</h2><p>{t.home.notesIntro}</p></div>
        <div className="note-columns">
          {t.home.notes.map((note) => (
            <article key={note[3]}><span>{note[0]}</span><h3>{note[1]}</h3><p>{note[2]}</p><a href={localizedPath(locale, `/articles/${note[3]}`)}>{t.read} <span>→</span></a></article>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function InnerHero({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <section className="inner-hero"><p>{kicker}</p><h1>{title}</h1><div><span>ISSUE 01 / 2026</span><p>{intro}</p></div></section>;
}

function CategoriesPage({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  return <Shell locale={locale} basePath={basePath}><InnerHero {...t.categoriesPage} /><section className="category-index category-index--inner"><CategoryRows locale={locale} /><Search locale={locale} compact /></section></Shell>;
}

function ArticlesGrid({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <div className="article-grid">{articles[locale].map((article, index) => <article key={article.slug}><span>0{index + 1} / FIELD NOTE</span><h2>{article.title}</h2><p>{article.dek}</p><small>{t.updated}</small><a href={localizedPath(locale, `/articles/${article.slug}`)}>{t.read} →</a></article>)}</div>;
}

function ArticlesPage({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  const roadmap = {
    en: [
      ["01", "Core workflow", "how to use Superbuy spreadsheet", "Start with discovery, variant checks and the two-payment model."],
      ["02", "Warehouse evidence", "Superbuy QC photos", "Answer the highest-risk question before international shipping."],
      ["03", "Cost decision", "Superbuy shipping cost", "Explain weight, volume, consolidation and packaging trade-offs."],
      ["04", "Next cluster", "Superbuy warehouse storage", "Expand into storage deadlines, returns, fees and country routes."],
    ],
    fr: [
      ["01", "Parcours essentiel", "utiliser une spreadsheet Superbuy", "Commencer par la découverte, les variantes et les deux paiements."],
      ["02", "Preuves d’entrepôt", "photos QC Superbuy", "Répondre à la question la plus risquée avant l’envoi international."],
      ["03", "Décision coût", "frais d’envoi Superbuy", "Expliquer poids, volume, regroupement et emballage."],
      ["04", "Prochain groupe", "stockage entrepôt Superbuy", "Développer stockage, retours, frais et destinations."],
    ],
    de: [
      ["01", "Kernablauf", "Superbuy Spreadsheet verwenden", "Mit Produktsuche, Variantenprüfung und zwei Zahlungen beginnen."],
      ["02", "Lagerbelege", "Superbuy QC Fotos", "Die wichtigste Risikofrage vor dem Auslandsversand klären."],
      ["03", "Kostenentscheidung", "Superbuy Versandkosten", "Gewicht, Volumen, Konsolidierung und Verpackung erklären."],
      ["04", "Nächstes Cluster", "Superbuy Lagerung", "Lagerfristen, Rückgaben, Gebühren und Länder-Routen ausbauen."],
    ],
  }[locale];
  return <Shell locale={locale} basePath={basePath}><InnerHero {...t.articlesPage} /><section className="content-roadmap"><div className="section-kicker"><span>SEO READING ORDER</span><p>One search intent per page</p></div><div className="roadmap-grid">{roadmap.map((item) => <article key={item[0]}><span>{item[0]}</span><small>{item[1]}</small><h2>{item[2]}</h2><p>{item[3]}</p></article>)}</div></section><section className="reading-index"><ArticlesGrid locale={locale} /></section></Shell>;
}

function GuidesPage({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  const flow = {
    en: [["01", "Choose and verify", "Check the live seller page, exact option, measurements and restrictions."], ["02", "Pay for the order", "Product, Chinese delivery and selected product services form the first payment."], ["03", "Review at warehouse", "Use the three published warehouse photos as visible evidence, not a guarantee."], ["04", "Build the parcel", "Compare consolidation, packaging, route, destination, estimated and final weight."]],
    fr: [["01", "Choisir et vérifier", "Contrôlez la page vendeur, l’option, les mesures et les restrictions."], ["02", "Payer la commande", "Produit, livraison chinoise et services choisis forment le premier paiement."], ["03", "Contrôler en entrepôt", "Utilisez les trois photos publiées comme preuve visible, pas comme garantie."], ["04", "Composer le colis", "Comparez regroupement, emballage, ligne, destination et poids final."]],
    de: [["01", "Auswählen und prüfen", "Live-Listing, Option, Maße und Einschränkungen kontrollieren."], ["02", "Bestellung bezahlen", "Produkt, China-Versand und gewählte Dienste bilden die erste Zahlung."], ["03", "Im Lager prüfen", "Die drei veröffentlichten Fotos als sichtbare Hinweise nutzen, nicht als Garantie."], ["04", "Paket planen", "Konsolidierung, Verpackung, Route, Ziel und Endgewicht vergleichen."]],
  }[locale];
  return <Shell locale={locale} basePath={basePath}><InnerHero {...t.guidesPage} /><section className="guide-flow"><div className="section-kicker"><span>PUBLISHED PROCESS / CHECKED 12 AUG 2026</span><p>Facts first, decisions second</p></div><div className="flow-grid">{flow.map((step) => <article key={step[0]}><span>{step[0]}</span><h2>{step[1]}</h2><p>{step[2]}</p></article>)}</div><div className="fact-band"><div><strong>2</strong><span>PAYMENT STAGES</span></div><div><strong>3</strong><span>WAREHOUSE PHOTOS</span></div><div><strong>90</strong><span>FREE STORAGE DAYS</span></div><div><strong>82+</strong><span>DELIVERY DESTINATIONS</span></div></div></section><section className="reading-index reading-index--guides"><ArticlesGrid locale={locale} /></section></Shell>;
}

function FaqPage({ locale, basePath }: { locale: Locale; basePath: string }) {
  const t = copy[locale];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq[locale].map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <Shell locale={locale} basePath={basePath}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><InnerHero {...t.faqPage} /><section className="faq-list">{faq[locale].map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</section></Shell>;
}

function ArticlePage({ locale, basePath, slug }: { locale: Locale; basePath: string; slug: string }) {
  const t = copy[locale];
  const article = articles[locale].find((item) => item.slug === slug)!;
  const bodyText = article.sections.flatMap((section) => section.paragraphs).join(" ");
  const wordCount = bodyText.trim().split(/\s+/).length;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, datePublished: "2026-08-12", dateModified: "2026-08-12", inLanguage: locale, description: article.dek, wordCount };
  const sourceLabel = locale === "fr" ? "Base factuelle" : locale === "de" ? "Faktenbasis" : "Fact-check basis";
  const sourceText = locale === "fr" ? "Vérifié le 12 août 2026 à partir des guides anglais publiés par Superbuy sur le service d’achat, la composition des frais, l’entreposage et la livraison internationale. Les tarifs et lignes peuvent évoluer." : locale === "de" ? "Am 12. August 2026 anhand der veröffentlichten englischen Superbuy-Leitfäden zu Shopping Agent, Gebühren, Lagerung und internationalem Versand geprüft. Preise und Routen können sich ändern." : "Checked 12 August 2026 against Superbuy’s published English shopping-agent, fee-composition, warehouse and international-delivery guidance. Prices, services and routes can change.";
  return <Shell locale={locale} basePath={basePath}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="longform"><header><a href={localizedPath(locale, "/articles")}>← {t.nav.articles}</a><span>{t.updated}</span><h1>{article.title}</h1><p>{article.dek}</p><div className="article-meta"><span>{wordCount.toLocaleString()} WORDS</span><span>{article.sections.length} SECTIONS</span><span>INDEPENDENT GUIDE</span></div></header><aside className="source-note"><span>{sourceLabel}</span><p>{sourceText}</p></aside><nav className="article-toc" aria-label="Article contents"><span>IN THIS GUIDE</span>{article.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2, "0")} {section.heading}</a>)}</nav><div className="longform-body">{article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div><Search locale={locale} compact /></article></Shell>;
}

function NotFound({ locale, basePath }: { locale: Locale; basePath: string }) {
  return <Shell locale={locale} basePath={basePath}><section className="not-found"><span>404</span><h1>Page not found.</h1><a href={localizedPath(locale, "/")}>{copy[locale].back} →</a></section></Shell>;
}

export function SiteRouter({ segments }: { segments: string[] }) {
  const route = parseRoute(segments);
  const props = { locale: route.locale, basePath: route.basePath };
  if (route.kind === "home") return <Home {...props} />;
  if (route.kind === "categories") return <CategoriesPage {...props} />;
  if (route.kind === "guides") return <GuidesPage {...props} />;
  if (route.kind === "faq") return <FaqPage {...props} />;
  if (route.kind === "articles") return <ArticlesPage {...props} />;
  if (route.kind === "article") return <ArticlePage {...props} slug={route.slug!} />;
  return <NotFound {...props} />;
}
