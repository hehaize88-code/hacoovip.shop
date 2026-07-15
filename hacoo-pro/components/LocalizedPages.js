import Link from "next/link";
import { Arrow, CheckIcon } from "./Icons";
import { CategoryCard } from "./Cards";
import HeroSearch from "./HeroSearch";
import StructuredData from "./StructuredData";
import { categories, guides, DESTINATION, SITE_URL } from "@/app/data";
import { absoluteLocalizedUrl, getCopy, localizeCategories, localizeGuides, localizePath } from "@/app/i18n";

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
  const page = copy.categoriesPage;
  const localizedCategories = localizeCategories(categories,locale);
  return <div className="localized-shell" lang={locale}><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="category-grid">{localizedCategories.map((category,index)=><CategoryCard category={category} index={index} locale={locale} key={category.slug}/>)}</div></section></div>;
}

export function LocalizedCategory({ locale, slug }) {
  const copy = getCopy(locale);
  const category = localizeCategories(categories,locale).find((item)=>item.slug===slug);
  if (!category) return null;
  const page = copy.categoryDetail;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: category.name, description: category.description, url: absoluteLocalizedUrl(`/categories/${slug}`,locale), inLanguage: locale };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><section className="category-hero"><div className="category-hero-image"><img src={category.image} alt={category.name}/></div><div className="category-hero-copy"><span className="section-label">{category.eyebrow} / {page.label}</span><h1>{category.name}<br/><em>{copy.nav.spreadsheet}.</em></h1><p>{category.description}</p><a className="button primary" href={`${DESTINATION}${category.destination}`} target="_blank" rel="noopener noreferrer">{page.live} {category.name.toLowerCase()} <Arrow/></a></div></section>
    <section className="section wrap"><div className="story-grid"><div><span className="section-label">{page.why}</span><h2>{page.whyTitle}</h2></div><div><p className="large-copy">{page.whyCopy}</p><p>{page.note}</p><h3>{page.checksTitle}</h3><div className="stacked-checks">{page.checks.map((text,index)=><div key={text}><span>0{index+1}</span><p>{text}</p></div>)}</div></div></div></section></div>;
}

export function LocalizedGuides({ locale }) {
  const copy = getCopy(locale);
  const page = copy.guidesPage;
  const localizedGuides = localizeGuides(guides,locale);
  return <div className="localized-shell" lang={locale}><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="article-index">{localizedGuides.map((guide,index)=><Link href={localizePath(`/guides/${guide.slug}`,locale)} key={guide.slug}><span className="article-no">0{index+1}</span><div><small>{guide.read}</small><h2>{guide.title}</h2><p>{guide.short}</p></div><span className="article-arrow"><Arrow/></span></Link>)}</div></section></div>;
}

export function LocalizedGuide({ locale, slug }) {
  const copy = getCopy(locale);
  const guide = localizeGuides(guides,locale).find((item)=>item.slug===slug);
  if (!guide) return null;
  const page = copy.guideDetail;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.short, mainEntityOfPage: absoluteLocalizedUrl(`/guides/${slug}`,locale), inLanguage: locale, author: { "@type": "Organization", name: "Hacoo Pro Editorial" }, datePublished: "2026-07-14", dateModified: "2026-07-14" };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><article className="article"><header className="article-hero"><div className="wrap article-head"><span className="section-label">{page.label}</span><h1>{guide.title}</h1><div className="article-meta"><span>{page.byline}</span><span>{guide.read}</span><span>{page.reviewed}</span></div><p>{guide.short}</p></div></header><div className="wrap article-body"><aside><span>{copy.nav.guides}</span>{page.sections.map(([title],index)=><a href={`#section-${index}`} key={title}>{title}</a>)}<a href="#quick-process">{page.process}</a></aside><div className="article-content">{page.sections.map(([title,text],index)=><section id={`section-${index}`} key={title}><h2>{title}</h2><p>{text}</p></section>)}<section id="quick-process"><h2>{page.process}</h2><ol>{page.steps.map((step,index)=><li key={step}><span>{index+1}</span>{step}</li>)}</ol></section><div className="article-callout"><h2>{page.continue}</h2><p>{guide.short}</p><Link className="button primary" href={localizePath("/categories",locale)}>{page.browse} <Arrow/></Link></div></div></div></article></div>;
}

export function LocalizedFAQ({ locale }) {
  const copy = getCopy(locale);
  const page = copy.faqPage;
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: page.items.map(([question,answer])=>({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <div className="localized-shell" lang={locale}><StructuredData data={schema}/><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">{page.eyebrow}</span><h1>{page.title[0]}<br/><em>{page.title[1]}</em></h1><p>{page.lead}</p></div></section><section className="section wrap faq-page"><div className="faq-list">{page.items.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section></div>;
}

export function LocalizedAbout({ locale }) {
  const page = getCopy(locale).about;
  return <div className="localized-shell" lang={locale}><section className="page-hero dark-hero"><div className="wrap narrow"><span className="section-label inverse">{page.eyebrow}</span><h1>{page.title[0]}<br/>{page.title[1]}</h1><p>{page.lead}</p></div></section><section className="section wrap"><div className="story-grid"><div><span className="section-label">{page.ruleLabel}</span><h2>{page.ruleTitle}</h2></div><div><p className="large-copy">{page.main}</p><p>{page.note}</p></div></div><div className="values-grid">{page.values.map(([title,text],index)=><div key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section></div>;
}

export function localizedPageMetadata(locale, pathname, title, description) {
  return { title, description, alternates: { canonical: absoluteLocalizedUrl(pathname,locale), languages: Object.fromEntries(["en","es","fr","de","it","pt"].map((code)=>[code,absoluteLocalizedUrl(pathname,code)]).concat([["x-default",`${SITE_URL}${pathname === "/" ? "" : pathname}`]])) }, openGraph: { title, description, url: absoluteLocalizedUrl(pathname,locale), locale } };
}
