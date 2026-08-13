"use client";

import { SiteShell } from "./SiteShell";
import { useLanguage } from "./LanguageProvider";
import { articleSlugs, categorySlugs, products } from "../data";
import { articleContent } from "../articleContent";

type PageKey = "discover" | "categories" | "how" | "articles" | "faq";

function PageHero({ page }: { page: PageKey }) {
  const { d } = useLanguage();
  const copy = d.pages[page];
  return <section className={`page-hero page-${page}`}><span>{copy[0]}</span><h1>{copy[1]}</h1><p>{copy[2]}</p></section>;
}

function ProductCards() {
  const { d } = useLanguage();
  return <div className="product-grid">{products.map((item, index) => <a className={`product ${item.tone} p${index+1}`} key={item.id} href={`https://cnfanshp.com/AllProducts/${item.id}.html`} target="_blank" rel="noreferrer">
    <div className="product-photo"><img src={item.image} alt={item.name}/><span>0{index+1}</span><button tabIndex={-1} aria-hidden="true">↗</button></div>
    <div className="product-copy"><small>{d.categoryNames[index]}</small><h3>{item.name}</h3><p>{d.productOpen}</p></div>
  </a>)}</div>;
}

export function DiscoverPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="discover"/><section className="inner-section"><div className="section-kicker">{d.current}</div><ProductCards/><a className="collection-link" href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noreferrer"><span>{d.collection}</span><b>{d.collectionDesc}</b><i>↗</i></a></section></SiteShell>;
}

export function CategoriesPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="categories"/><section className="inner-section category-cards">{d.categoryNames.map((name,index) => <a key={name} href={`https://cnfanshp.com/${categorySlugs[index]}/`} target="_blank" rel="noreferrer"><span>0{index+1}</span><h2>{name}</h2><p>{d.browseCategory}</p><b>↗</b></a>)}</section></SiteShell>;
}

export function HowPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="how"/><section className="process-page"><div className="process-line"/>{d.steps.map((step,index) => <article key={step[0]}><div><b>0{index+1}</b><span>{d.howFacts[index]}</span></div><h2>{step[0]}</h2><p>{step[1]}</p></article>)}</section><section className="facts compact-facts">{d.facts.map((fact,index) => <article className={index===0?"fact big":"fact"} key={fact[1]}><b>{fact[0]}</b><h3>{fact[1]}</h3><p>{fact[2]}</p></article>)}</section></SiteShell>;
}

export function ArticlesPage() {
  const { d, withLang } = useLanguage();
  return <SiteShell><PageHero page="articles"/><section className="inner-section article-grid">{d.articles.map((article,index) => <a key={article[1]} href={withLang(`/articles/${articleSlugs[index]}`)}><div><span>{article[0]}</span><b>{article[3]}</b></div><h2>{article[1]}</h2><p>{article[2]}</p><strong>{d.readArticle} →</strong></a>)}</section></SiteShell>;
}

export function FaqPage() {
  const { d } = useLanguage();
  return <SiteShell><PageHero page="faq"/><section className="faq faq-page"><div><span>{d.quick}</span><h2>{d.important}</h2><a href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noreferrer">{d.start} ↗</a></div><div className="questions">{d.faqs.map((faq,index) => <details open={index===0} key={faq[0]}><summary>{faq[0]}<b>+</b></summary><p>{faq[1]}</p></details>)}</div></section></SiteShell>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const { d, lang, withLang } = useLanguage();
  const index = Math.max(0, articleSlugs.indexOf(slug));
  const article = d.articles[index];
  const content = articleContent[lang][index];
  return <SiteShell><article className="article-page"><div className="article-inner"><a className="article-back" href={withLang("/articles")}>← {d.pages.articles[1]}</a><div className="article-heading"><span>{article[0]}</span><h1>{article[1]}</h1><p>{article[2]}</p><div><b>{d.updated}</b><b>{d.readTime}: {article[3]}</b></div></div><p className="article-standfirst">{content.standfirst}</p><div className="article-body">{content.sections.map((section,sectionIndex) => <section key={section.heading}><span>{String(sectionIndex+1).padStart(2,"0")}</span><div><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</div></section>)}</div><aside className="article-takeaway"><b>{d.important}</b><p>{content.takeaway}</p></aside><a className="article-cta" href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noreferrer">{d.openCatalog} ↗</a></div></article></SiteShell>;
}
