"use client";

import { SiteShell } from "./SiteShell";
import { useLanguage } from "./LanguageProvider";
import { articleSlugs, catalogBase, categorySlugs, productUrl, products, productCategory } from "../data";
import { articleModified } from "../articleMeta";
import { getArticles, getArticle } from "../articleRegistry";

type PageKey = "discover" | "categories" | "how" | "articles" | "faq";

function PageHero({ page }: { page: PageKey }) {
  const { d } = useLanguage();
  const copy = d.pages[page];
  return <section className={`page-hero page-${page}`}><span>{copy[0]}</span><h1>{copy[1]}</h1><p>{copy[2]}</p></section>;
}

function ProductCards() {
  const { d, lang } = useLanguage();
  return <div className="product-grid">{products.map((item, index) => <a className={`product ${item.tone} p${index+1}`} key={item.id} href={productUrl(item.id)} target="_blank" rel="noreferrer">
    <div className="product-photo"><img src={item.image} alt={item.name} loading="lazy" width="750" height="750"/><span>0{index+1}</span><i className="product-arrow" aria-hidden="true">↗</i></div>
    <div className="product-copy"><small>{productCategory(item.category, lang, d.categoryNames)} · {item.price}</small><h3>{item.name}</h3><p>{d.productOpen} · {d.verified} {item.verified}</p></div>
  </a>)}</div>;
}

export function DiscoverPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="discover"/><section className="inner-section"><div className="section-kicker">{d.current}</div><ProductCards/><a className="collection-link" href={`${catalogBase}/AllProducts/`} target="_blank" rel="noreferrer"><span>{d.collection}</span><b>{d.collectionDesc}</b><i>↗</i></a></section></SiteShell>;
}

export function CategoriesPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="categories"/><section className="inner-section category-cards">{d.categoryNames.map((name,index) => <a key={name} href={`${catalogBase}/${categorySlugs[index]}/`} target="_blank" rel="noreferrer"><span>0{index+1}</span><h2>{name}</h2><p>{d.browseCategory}</p><b>↗</b></a>)}</section></SiteShell>;
}

export function HowPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="how"/><section className="process-page"><div className="process-line"/>{d.steps.map((step,index) => <article key={step[0]}><div><b>0{index+1}</b><span>{d.howFacts[index]}</span></div><h2>{step[0]}</h2><p>{step[1]}</p></article>)}</section><section className="facts compact-facts">{d.facts.map((fact,index) => <article className={index===0?"fact big":"fact"} key={fact[1]}><b>{fact[0]}</b><h3>{fact[1]}</h3><p>{fact[2]}</p></article>)}</section></SiteShell>;
}

export function ArticlesPage() {
  const { d, lang, withLang } = useLanguage();
  return <SiteShell><PageHero page="articles"/><section className="inner-section article-grid">{getArticles(lang).slice().reverse().map(({card:article,slug}) => <a key={article[1]} href={withLang(`/articles/${slug}/`)}><div><span>{article[0]}</span><b>{article[3]}</b></div><h2>{article[1]}</h2><p>{article[2]}</p><strong>{d.readArticle} →</strong></a>)}</section></SiteShell>;
}

export function FaqPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="faq"/><section className="faq faq-page"><div><span>{d.quick}</span><h2>{d.important}</h2><a href={`${catalogBase}/AllProducts/`} target="_blank" rel="noreferrer">{d.start} ↗</a></div><div className="questions">{d.faqs.map((faq,index) => <details open={index===0} key={faq[0]}><summary>{faq[0]}<b>+</b></summary><p>{faq[1]}</p></details>)}</div></section></SiteShell>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const { d, lang, withLang } = useLanguage();
  const index = articleSlugs.indexOf(slug);
  const entry = getArticle(lang,slug);
  const article = entry?.card;
  const content = entry?.content;
  if (!article || !content) return <SiteShell><section className="inner-section"><h1>Artículo no disponible</h1><a href={withLang("/articles/")}>← {d.pages.articles[1]}</a></section></SiteShell>;
  const preferred = index === 1 || index === 12 ? [12,1,10] : index === 2 || index === 11 || index === 13 ? [11,13,2,3] : [14,0,4,1];
  const relatedArticles = [...new Set([...preferred,0,1,2,3])].filter(i=>i!==index).map(i=>getArticle(lang,articleSlugs[i])).filter(article=>!!article).slice(0,3);
  const text = [content.standfirst,...content.sections.flatMap(s=>[s.heading,...s.paragraphs,...(s.bullets??[])]),content.takeaway].join(" ");
  const minutes = Math.max(1,Math.ceil(lang === "zh" ? text.length / 400 : text.split(/\s+/).length / 200));
  const date = articleModified(slug,lang);
  const tocLabel = {es:"En esta guía",en:"In this guide",fr:"Dans ce guide",de:"In diesem Ratgeber",it:"In questa guida",pl:"W tym poradniku",pt:"Neste guia",zh:"本文目录"}[lang];
  return <SiteShell><article className="article-page"><div className="article-inner"><a className="article-back" href={withLang("/articles/")}>← {d.pages.articles[1]}</a><div className="article-heading"><span>{article[0]}</span><h1>{article[1]}</h1><p>{article[2]}</p><div><time dateTime={date}>{new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : lang,{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(`${date}T00:00:00Z`))}</time><b>{d.readTime}: {minutes} min</b></div></div><p className="article-standfirst">{content.standfirst}</p><nav className="article-toc" aria-label={tocLabel}><b>{tocLabel}</b><ol>{content.sections.map((section,i)=><li key={section.heading}><a href={`#section-${i+1}`}>{section.heading}</a></li>)}</ol></nav><div className="article-body">{content.sections.map((section,sectionIndex) => <section id={`section-${sectionIndex+1}`} key={section.heading}><span>{String(sectionIndex+1).padStart(2,"0")}</span><div><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}{section.links&&<ul className="article-sources">{section.links.map(link=><li key={link.url}><a href={link.url.startsWith("/") ? withLang(link.url) : link.url} target={link.url.startsWith("/") ? undefined : "_blank"} rel={link.url.startsWith("/") ? undefined : "noopener noreferrer"}>{link.label} {link.url.startsWith("/") ? "→" : "↗"}</a></li>)}</ul>}</div></section>)}</div><aside className="article-takeaway"><b>{d.important}</b><p>{content.takeaway}</p></aside><section className="article-related"><span>{d.pages.articles[0]}</span><h2>{d.pages.articles[1]}</h2><div>{relatedArticles.map(related => <a key={related.slug} href={withLang(`/articles/${related.slug}/`)}>{related.card[1]} →</a>)}</div></section><a className="article-cta" href={`${catalogBase}/AllProducts/`} target="_blank" rel="noreferrer">{d.openCatalog} ↗</a></div></article></SiteShell>;
}
