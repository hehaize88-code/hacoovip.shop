import Link from "next/link";
import { Arrow, CheckIcon } from "./Icons";
import { CategoryCard } from "./Cards";
import HeroSearch from "./HeroSearch";
import StructuredData from "./StructuredData";
import { createPageMetadata } from "@/app/seo";
import { CATALOG_REVIEW, categories, guides, DESTINATION, products, SITE_URL } from "@/app/data";
import { getLocalizedDepth } from "@/app/localizedDepth";
import { absoluteLocalizedUrl, getCopy, localizeCategories, localizeGuides, localizePath } from "@/app/i18n";
import { getLocalizedProduct } from "@/app/product-locales";
import { getProductPageCopy } from "@/app/products-copy";
import { getCyclicRelated, withTrailingSlash } from "@/app/internal-links";

export function LocalizedHome({ locale }) {
  const copy = getCopy(locale);
  const localizedCategories = localizeCategories(categories, locale);
  const localizedGuides = localizeGuides(guides, locale);
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: `Hacoo Pro — ${copy.home.title.join(" ")}`, url: absoluteLocalizedUrl("/", locale), inLanguage: locale };
  return <div className="localized-shell home-page" lang={locale}><StructuredData data={schema}/>
    <section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span></span>{copy.home.eyebrow}</div><h1>{copy.home.title[0]}<br/><em>{copy.home.title[1]}<br/>{copy.home.title[2]}</em></h1><p className="hero-lead">{copy.home.lead}</p><div className="hero-actions"><a className="button primary" href={DESTINATION} target="_blank" rel="noopener noreferrer">{copy.home.visit} <Arrow/></a><Link className="button quiet" href={localizePath("/categories", locale)}>{copy.home.browse}</Link></div><div className="trust-row">{copy.home.trust.map((item) => <span key={item}><CheckIcon/>{item}</span>)}</div></div>
      <div className="hero-visual"><div className="hero-photo"><img src="/products/shoe-performance.webp" alt={localizedCategories[0].name}/><span className="photo-note">DISCOVER / 01</span></div><HeroSearch locale={locale}/><div className="signal-card"><span>08</span><p>{copy.home.chooseText}</p></div></div></section>
    <section className="ticker"><div>{copy.nav.spreadsheet} <i>•</i> {copy.nav.categories} <i>•</i> {copy.nav.guides} <i>•</i> {copy.nav.faq} <i>•</i> {copy.nav.live} <i>•</i></div></section>
    <section className="section wrap"><div className="section-heading"><div><span className="section-label">{copy.home.chooseLabel}</span><h2>{copy.home.chooseTitle}</h2></div><p>{copy.home.chooseText}</p></div><div className="category-grid">{localizedCategories.slice(0,6).map((category,index)=><CategoryCard category={category} index={index} locale={locale} key={category.slug}/>)}</div><div className="center-action"><Link className="button outline" href={localizePath("/categories",locale)}>{copy.home.allCategories} <Arrow/></Link></div></section>
    <section className="dark-section"><div className="wrap process-layout"><div className="process-intro"><span className="section-label inverse">{copy.home.processLabel}</span><h2>{copy.home.processTitle}</h2><p>{copy.home.processText}</p><Link className="button light" href={localizePath("/guides/how-to-use-hacoo-spreadsheet",locale)}>{copy.home.read} <Arrow/></Link></div><ol className="process-list">{copy.home.processSteps.map(([title,text],index)=><li key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
    <section className="editorial-section"><div className="wrap"><div className="section-heading"><div><span className="section-label">{copy.home.guideLabel}</span><h2>{copy.home.guideTitle}</h2></div><p>{copy.home.guideText}</p></div><div className="guide-grid">{localizedGuides.slice(0,4).map((guide,index)=><Link href={localizePath(`/guides/${guide.slug}`,locale)} className="guide-card" key={guide.slug}><span className="guide-number">0{index+1}</span><div><small>{guide.read}</small><h3>{guide.title}</h3><p>{guide.short}</p><span className="text-link">{copy.home.read} <Arrow size={16}/></span></div></Link>)}</div></div></section>
    <section className="section wrap faq-preview"><div><span className="section-label">{copy.home.faqLabel}</span><h2>{copy.home.faqTitle}</h2><p>{copy.home.faqText}</p><Link className="button outline" href={localizePath("/faq",locale)}>{copy.home.faqLink} <Arrow/></Link></div><div className="faq-list">{copy.faqPage.items.slice(0,4).map(([q,a],index)=><details key={q} open={index===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
  </div>;
}

export function LocalizedSpreadsheet({ locale }) {
  const copy = getCopy(locale);
  const page = copy.spreadsheet;
  const localizedCategories = localizeCategories(categories, locale);
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: page.shortTitle, url: absoluteLocalizedUrl("/spreadsheet",locale), inLanguage: locale };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><section className="page-hero lime-hero"><div className="wrap narrow"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/>{page.title[1]}</h1><p>{page.lead}</p><div className="hero-actions"><Link className="button dark" href={localizePath("/categories",locale)}>{page.choose} <Arrow/></Link><Link className="button quiet-dark" href={localizePath("/guides/how-to-use-hacoo-spreadsheet",locale)}>{page.how}</Link></div></div></section>
    <section className="section wrap"><div className="split-copy"><div><span className="section-label">{page.shortLabel}</span><h2>{page.shortTitle}</h2></div><div><p className="large-copy">{page.shortCopy}</p><p>{page.shortNote}</p></div></div></section>
    <section className="soft-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">{page.browseLabel}</span><h2>{page.browseTitle}</h2></div><p>{page.browseText}</p></div><div className="category-grid">{localizedCategories.map((category,index)=><CategoryCard category={category} index={index} locale={locale} key={category.slug}/>)}</div></div></section>
    <section className="section wrap"><div className="section-heading"><div><span className="section-label">{page.checksLabel}</span><h2>{page.checksTitle}</h2></div></div><div className="check-grid">{page.checks.map(([title,text])=><div className="check-card" key={title}><CheckIcon size={24}/><h3>{title}</h3><p>{text}</p></div>)}</div></section></div>;
}

export function LocalizedCategories({ locale }) {
  const copy = getCopy(locale);
  const depth = getLocalizedDepth(locale);
  const page = copy.categoriesPage;
  const localizedCategories = localizeCategories(categories,locale);
  return <div className="localized-shell" lang={locale}><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="category-grid">{localizedCategories.map((category,index)=><CategoryCard category={category} index={index} locale={locale} key={category.slug}/>)}</div></section><section className="soft-section"><div className="wrap split-copy"><div><span className="section-label">{copy.nav.categories}</span><h2>{depth.indexes.categoriesTitle}</h2></div><div><p className="large-copy">{depth.indexes.categoriesText}</p><p>{copy.categoryDetail.note}</p></div></div></section></div>;
}

export function LocalizedCategory({ locale, slug }) {
  const copy = getCopy(locale);
  const depth = getLocalizedDepth(locale);
  const category = localizeCategories(categories,locale).find((item)=>item.slug===slug);
  if (!category) return null;
  const page = copy.categoryDetail;
  const checks = depth.categoryChecks[slug] || page.checks;
  const sourceProduct = products.find((product)=>product.categorySlug===slug);
  const featuredProduct = getLocalizedProduct(sourceProduct, locale);
  const productCopy = getProductPageCopy(locale);
  const productReferencePath = withTrailingSlash(localizePath(`/products/${featuredProduct.slug}`, locale));
  const productReferenceUrl = withTrailingSlash(absoluteLocalizedUrl(`/products/${featuredProduct.slug}`, locale));
  const verifiedListing = `${DESTINATION}${featuredProduct.listingPath}`;
  const liveSearch = `${DESTINATION}/search.html?keywords=${encodeURIComponent(featuredProduct.query)}&channelid=2&method=1`;
  const faqItems = depth.faqExtra;
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: category.name, description: category.description, url: withTrailingSlash(absoluteLocalizedUrl(`/categories/${slug}`,locale)), inLanguage: locale, dateModified: CATALOG_REVIEW.iso, mainEntity: { "@id": productReferenceUrl } }, { "@type": "ItemList", name: `${category.name} product reference`, itemListElement: [{ "@type": "ListItem", position: 1, name: featuredProduct.name, url: productReferenceUrl }] }, { "@type": "FAQPage", inLanguage: locale, mainEntity: faqItems.map(([question,answer])=>({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }] };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><section className="category-hero"><div className="category-hero-image"><img src={category.image} alt={category.name}/></div><div className="category-hero-copy"><span className="section-label">{category.eyebrow} / {page.label}</span><h1>{category.name}<br/><em>{copy.nav.spreadsheet}.</em></h1><p>{category.description}</p><a className="button primary" href={`${DESTINATION}${category.destination}`} target="_blank" rel="noopener noreferrer">{page.live} {category.name} <Arrow/></a></div></section>
    <section className="section wrap"><div className="story-grid"><div><span className="section-label">{page.why}</span><h2>{page.whyTitle}</h2></div><div><p className="large-copy">{page.whyCopy}</p><p>{page.note}</p><h3>{page.checksTitle}</h3><div className="stacked-checks">{page.checks.map((text,index)=><div key={text}><span>0{index+1}</span><p>{text}</p></div>)}</div></div></div></section>
    <section className="verified-product-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">{depth.category.productLabel}</span><h2>{depth.category.productTitle}</h2></div><p>{depth.category.reviewed}</p></div><article className="verified-product"><div className="verified-product-image"><img src={featuredProduct.image} alt={featuredProduct.name}/><span>{CATALOG_REVIEW.label}</span></div><div className="verified-product-copy"><div className="verified-product-status"><span></span>#{featuredProduct.listingId}</div><h3>{featuredProduct.name}</h3><p>{featuredProduct.focus}</p><dl><div><dt>CNFansHP</dt><dd>{featuredProduct.catalogLabel}</dd></div><div><dt>{depth.category.updateLabel}</dt><dd>{CATALOG_REVIEW.label}</dd></div></dl><div className="hero-actions"><Link className="button quiet" href={productReferencePath}>{productCopy.reference}</Link><a className="button primary" href={verifiedListing} target="_blank" rel="noopener noreferrer">{depth.category.openListing} <Arrow/></a><a className="button quiet" href={liveSearch} target="_blank" rel="noopener noreferrer">{depth.category.fallback}</a></div><p className="verified-product-disclosure">{depth.category.disclosure}</p></div></article></div></section>
    <section className="soft-section"><div className="wrap"><div className="section-heading"><div><span className="section-label">{depth.category.label}</span><h2>{depth.category.title}</h2></div><p>{depth.category.intro(category.name)}</p></div><div className="research-grid">{checks.map((text,index)=><article className="research-card" key={text}><span>0{index+1}</span><h3>{category.name}</h3><p>{text}</p></article>)}</div><p className="verification-note">{depth.category.reviewed}</p></div></section>
    <section className="section wrap"><div className="section-heading"><div><span className="section-label">{depth.category.tableLabel}</span><h2>{depth.category.tableTitle}</h2></div></div><div className="research-table-wrap"><table className="research-table"><thead><tr>{depth.category.tableHeaders.map((header)=><th key={header}>{header}</th>)}</tr></thead><tbody>{checks.map((check)=><tr key={check}><th>{check}</th><td>{depth.category.tableRecord}</td><td>{depth.category.tableEvidence}</td></tr>)}</tbody></table></div></section>
    <section className="update-section"><div className="wrap update-layout"><div><span className="section-label">{depth.category.updateLabel}</span><h2>{depth.category.updateTitle}</h2></div><ol className="update-log"><li><time dateTime={CATALOG_REVIEW.iso}>{CATALOG_REVIEW.label}</time><div><h3>#{featuredProduct.listingId}</h3><p>{depth.category.updateText}</p></div></li></ol></div></section>
    <section className="soft-section"><div className="wrap category-faq"><div><span className="section-label">FAQ</span><h2>{depth.category.faqTitle}</h2></div><div className="faq-list">{faqItems.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section></div>;
}

export function LocalizedGuides({ locale }) {
  const copy = getCopy(locale);
  const depth = getLocalizedDepth(locale);
  const page = copy.guidesPage;
  const localizedGuides = localizeGuides(guides,locale);
  return <div className="localized-shell" lang={locale}><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="article-index">{localizedGuides.map((guide,index)=><Link href={localizePath(`/guides/${guide.slug}`,locale)} key={guide.slug}><span className="article-no">0{index+1}</span><div><small>{guide.read}</small><h2>{guide.title}</h2><p>{guide.short}</p></div><span className="article-arrow"><Arrow/></span></Link>)}</div></section><section className="soft-section"><div className="wrap split-copy"><div><span className="section-label">{copy.nav.guides}</span><h2>{depth.indexes.guidesTitle}</h2></div><div><p className="large-copy">{depth.indexes.guidesText}</p><p>{copy.guideDetail.sections[2][1]}</p></div></div></section></div>;
}

export function LocalizedGuide({ locale, slug }) {
  const copy = getCopy(locale);
  const depth = getLocalizedDepth(locale);
  const localizedGuides = localizeGuides(guides,locale);
  const guide = localizedGuides.find((item)=>item.slug===slug);
  if (!guide) return null;
  const relatedGuides = getCyclicRelated(localizedGuides, slug, 3);
  const page = copy.guideDetail;
  const checks = depth.guideChecks[slug] || page.steps;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.short, mainEntityOfPage: absoluteLocalizedUrl(`/guides/${slug}`,locale), inLanguage: locale, author: { "@type": "Organization", name: "Hacoo Pro Editorial" }, datePublished: "2026-07-14", dateModified: "2026-07-14" };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><article className="article"><header className="article-hero"><div className="wrap article-head"><span className="section-label">{page.label}</span><h1>{guide.title}</h1><div className="article-meta"><span>{page.byline}</span><span>{guide.read}</span><span>{page.reviewed}</span></div><p>{guide.short}</p></div></header><div className="wrap article-body"><aside><span>{copy.nav.guides}</span>{page.sections.map(([title],index)=><a href={`#section-${index}`} key={title}>{title}</a>)}<a href="#evidence-check">{depth.guide.label}</a><a href="#quick-process">{page.process}</a></aside><div className="article-content">{page.sections.map(([title,text],index)=><section id={`section-${index}`} key={title}><h2>{title}</h2><p>{text}</p></section>)}<section id="evidence-check"><h2>{depth.guide.title}</h2><p>{depth.guide.intro}</p><ul className="mistake-list">{checks.map((text)=><li key={text}><CheckIcon size={18}/><span>{text}</span></li>)}</ul></section><section id="quick-process"><h2>{page.process}</h2><ol>{page.steps.map((step,index)=><li key={step}><span>{index+1}</span>{step}</li>)}</ol></section><div className="article-callout"><h2>{page.continue}</h2><p>{guide.short}</p><Link className="button primary" href={withTrailingSlash(localizePath("/categories",locale))}>{page.browse} <Arrow/></Link></div></div></div></article><section className="soft-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">{copy.home.guideLabel}</span><h2>{copy.home.guideTitle}</h2></div><Link className="text-link large" href={withTrailingSlash(localizePath("/guides", locale))}>{copy.nav.guides} <Arrow size={17}/></Link></div><div className="guide-grid">{relatedGuides.map((item,index)=><Link href={withTrailingSlash(localizePath(`/guides/${item.slug}`,locale))} className="guide-card" key={item.slug}><span className="guide-number">0{index+1}</span><div><small>{item.read}</small><h3>{item.title}</h3><p>{item.short}</p><span className="text-link">{copy.home.read} <Arrow size={16}/></span></div></Link>)}</div></div></section></div>;
}

export function LocalizedFAQ({ locale }) {
  const copy = getCopy(locale);
  const depth = getLocalizedDepth(locale);
  const page = copy.faqPage;
  const items = [...page.items, ...depth.faqExtra];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: items.map(([question,answer])=>({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap faq-page"><div className="faq-list">{items.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section></div>;
}

export function LocalizedAbout({ locale }) {
  const page = getCopy(locale).about;
  const depth = getLocalizedDepth(locale);
  return <div className="localized-shell" lang={locale}><section className="page-hero dark-hero"><div className="wrap narrow"><span className="section-label inverse">{page.eyebrow}</span><h1>{page.title[0]}<br/>{page.title[1]}</h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="story-grid"><div><span className="section-label">{page.ruleLabel}</span><h2>{page.ruleTitle}</h2></div><div><p className="large-copy">{page.main}</p><p>{page.note}</p></div></div><div className="values-grid">{page.values.map(([title,text],index)=><div key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section><section className="soft-section"><div className="wrap"><div className="section-heading"><div><span className="section-label">Hacoo Pro</span><h2>{depth.about.title}</h2></div><p>{depth.about.intro}</p></div><div className="research-grid">{depth.about.steps.map(([title,text],index)=><article className="research-card" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section></div>;
}

export function localizedPageMetadata(locale, pathname, title, description, options = {}) {
  const labels = {
    es: { home: "Guía Hacoo: categorías y enlaces", spreadsheet: "Directorio Hacoo 2026: enlaces y categorías", categories: "Categorías Hacoo: enlaces y comprobaciones", products: "Productos Hacoo: enlaces e imágenes comprobados", guides: "Guías Hacoo: tallas, QC y envíos", faq: "Preguntas frecuentes sobre Hacoo", about: "Sobre Hacoo Pro: guía independiente", contact: "Contacto de Hacoo Pro", privacy: "Política de privacidad de Hacoo Pro", terms: "Condiciones de uso de Hacoo Pro", category: (name) => `${name} Hacoo: enlaces y guía`, product: (name) => `${name}: medidas y revisión QC`, guide: (name) => `${name} — Guía práctica` },
    fr: { home: "Guide Hacoo : catégories et liens", spreadsheet: "Répertoire Hacoo 2026 : liens et catégories", categories: "Catégories Hacoo : liens et vérifications", products: "Produits Hacoo : liens et images vérifiés", guides: "Guides Hacoo : tailles, QC et livraison", faq: "Questions fréquentes sur Hacoo", about: "À propos de Hacoo Pro : guide indépendant", contact: "Contacter Hacoo Pro", privacy: "Politique de confidentialité Hacoo Pro", terms: "Conditions d’utilisation Hacoo Pro", category: (name) => `${name} Hacoo : liens et guide`, product: (name) => `${name} : mesures et contrôle QC`, guide: (name) => `${name} — Guide pratique` },
    de: { home: "Hacoo-Ratgeber: Kategorien und Links", spreadsheet: "Hacoo-Verzeichnis 2026: Links und Kategorien", categories: "Hacoo-Kategorien: Links und Prüfungen", products: "Hacoo-Produkte: geprüfte Links und Bilder", guides: "Hacoo-Ratgeber: Größe, QC und Versand", faq: "Häufige Fragen zu Hacoo", about: "Über Hacoo Pro: unabhängiger Ratgeber", contact: "Kontakt zu Hacoo Pro", privacy: "Datenschutzerklärung von Hacoo Pro", terms: "Nutzungsbedingungen von Hacoo Pro", category: (name) => `${name} Hacoo: Links und Ratgeber`, product: (name) => `${name}: Maße und QC-Prüfung`, guide: (name) => `${name} — Praktischer Ratgeber` },
    it: { home: "Guida Hacoo: categorie e link", spreadsheet: "Elenco Hacoo 2026: link e categorie", categories: "Categorie Hacoo: link e controlli", products: "Prodotti Hacoo: link e immagini verificati", guides: "Guide Hacoo: taglie, QC e spedizione", faq: "Domande frequenti su Hacoo", about: "Informazioni su Hacoo Pro: guida indipendente", contact: "Contatta Hacoo Pro", privacy: "Informativa sulla privacy di Hacoo Pro", terms: "Termini di utilizzo di Hacoo Pro", category: (name) => `${name} Hacoo: link e guida`, product: (name) => `${name}: misure e controllo QC`, guide: (name) => `${name} — Guida pratica` },
    pt: { home: "Guia Hacoo: categorias e links", spreadsheet: "Diretório Hacoo 2026: links e categorias", categories: "Categorias Hacoo: links e verificações", products: "Produtos Hacoo: links e imagens verificados", guides: "Guias Hacoo: tamanhos, QC e envio", faq: "Perguntas frequentes sobre Hacoo", about: "Sobre o Hacoo Pro: guia independente", contact: "Contactar o Hacoo Pro", privacy: "Política de privacidade do Hacoo Pro", terms: "Termos de utilização do Hacoo Pro", category: (name) => `${name} Hacoo: links e guia`, product: (name) => `${name}: medidas e verificação QC`, guide: (name) => `${name} — Guia prático` },
  };
  const localeLabels = labels[locale] || labels.es;
  let seoTitle = title;
  if (pathname === "/") seoTitle = localeLabels.home;
  else if (pathname === "/spreadsheet") seoTitle = localeLabels.spreadsheet;
  else if (pathname === "/categories") seoTitle = localeLabels.categories;
  else if (pathname === "/products") seoTitle = localeLabels.products;
  else if (pathname === "/guides") seoTitle = localeLabels.guides;
  else if (pathname === "/faq") seoTitle = localeLabels.faq;
  else if (pathname === "/about") seoTitle = localeLabels.about;
  else if (pathname === "/contact") seoTitle = localeLabels.contact;
  else if (pathname === "/privacy") seoTitle = localeLabels.privacy;
  else if (pathname === "/terms") seoTitle = localeLabels.terms;
  else if (pathname.startsWith("/categories/")) seoTitle = localeLabels.category(title);
  else if (pathname.startsWith("/products/")) seoTitle = localeLabels.product(title);
  else if (pathname.startsWith("/guides/")) seoTitle = localeLabels.guide(title);

  const suffixes = {
    es: "Incluye enlaces actuales, comprobaciones prácticas y datos que debes confirmar en el anuncio.",
    fr: "Avec des liens actuels, des vérifications pratiques et les informations à confirmer sur l’annonce.",
    de: "Mit aktuellen Links, praktischen Prüfungen und Angaben, die im Angebot bestätigt werden müssen.",
    it: "Con link attuali, controlli pratici e dati da confermare nell’inserzione.",
    pt: "Inclui links atuais, verificações práticas e dados a confirmar no anúncio.",
  };
  const expandedDescription = description.length < 90 ? `${description} ${suffixes[locale]}` : description;
  const seoDescription = expandedDescription.length > 160
    ? `${expandedDescription.slice(0, 157).replace(/\s+\S*$/, "")}.`
    : expandedDescription;
  const canonicalPath = localizePath(pathname, locale);
  const withSlash = (url) => url.endsWith("/") ? url : `${url}/`;
  const alternates = {
    canonical: withSlash(absoluteLocalizedUrl(pathname, locale)),
    languages: Object.fromEntries(
      ["en", "es", "fr", "de", "it", "pt"].map((code) => [code, withSlash(absoluteLocalizedUrl(pathname, code))]).concat([["x-default", withSlash(absoluteLocalizedUrl(pathname, "en"))]]),
    ),
  };
  return createPageMetadata({ title: seoTitle, description: seoDescription, path: canonicalPath, locale, alternates, type: pathname.startsWith("/guides/") ? "article" : "website", ...options });
}
