"use client";

import { SiteShell } from "./components/SiteShell";
import { useLanguage } from "./components/LanguageProvider";
import { articleSlugs, catalogBase, categorySlugs, productUrl, products } from "./data";

export default function Home() {
  const { d, withLang } = useLanguage();
  return <SiteShell>
    <section className="hero">
      <div className="hero-copy">
        <div className="edition"><span>{d.edition}</span><b>2026</b></div>
        <h1>{d.heroA}<br/><em>{d.heroB}</em></h1>
        <p>{d.heroDesc}</p>
        <form className="hero-search" action={`${catalogBase}/search.html`} method="get" target="_blank">
          <span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="search">{d.search}</label>
          <input id="search" name="keywords" type="search" placeholder={d.searchPlaceholder} required/><button type="submit">{d.search}</button>
        </form>
        <div className="micro-trust">{d.trusts.map(item => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="hero-gallery" aria-label="Product selection">
        <a className="hero-card hero-main" href={productUrl(products[0].id)} target="_blank" rel="noreferrer"><img src={products[0].image} alt={products[0].name} width="750" height="750"/><span>{d.drop}</span><div><small>{d.categoryNames[0]}</small><b>{d.layers}</b></div></a>
        <a className="hero-card hero-mini one" href={productUrl(products[1].id)} target="_blank" rel="noreferrer"><img src={products[1].image} alt={products[1].name} width="750" height="750"/><b>{d.trending} ↗</b></a>
        <a className="hero-card hero-mini two" href={productUrl(products[3].id)} target="_blank" rel="noreferrer"><img src={products[3].image} alt={products[3].name} width="750" height="750"/><b>{d.newest} ↗</b></a>
        <div className="floating-note"><span>{d.curated}</span><b>{d.sixCats}</b></div>
      </div>
    </section>

    <section className="category-rail" aria-label="Popular categories">
      {d.categoryNames.map((name, index) => <a key={categorySlugs[index]} href={withLang("/categories/")}><span>0{index + 1}</span>{name}<b>↗</b></a>)}
    </section>

    <section className="discover">
      <div className="section-title"><div><span>{d.current}</span><h2>{d.findsA}<br/><em>{d.findsB}</em></h2></div><p>{d.findsDesc}</p></div>
      <div className="product-grid">{products.map((item,index) => <a className={`product ${item.tone} p${index+1}`} key={item.id} href={productUrl(item.id)} target="_blank" rel="noreferrer">
        <div className="product-photo"><img src={item.image} alt={item.name} loading={index > 2 ? "lazy" : "eager"} width="750" height="750"/><span>0{index+1}</span><button tabIndex={-1} aria-hidden="true">↗</button></div>
        <div className="product-copy"><small>{d.categoryNames[index]} · {item.price}</small><h3>{item.name}</h3><p>{d.productOpen} · {d.verified} {item.verified}</p></div>
      </a>)}</div>
      <a className="collection-link" href={`${catalogBase}/AllProducts/`} target="_blank" rel="noreferrer"><span>{d.collection}</span><b>{d.collectionDesc}</b><i>↗</i></a>
    </section>

    <section className="guide"><div className="guide-head"><span>{d.journeyLabel}</span><h2>{d.journeyTitle}</h2></div><div className="journey">{d.steps.map((step, index) => <article key={step[0]}><b>{index + 1}</b><div><h3>{step[0]}</h3><p>{step[1]}</p></div></article>)}</div></section>

    <section className="facts"><div className="fact-intro"><span>{d.before}</span><h2>{d.lessDoubt}<br/><em>{d.better}</em></h2></div>{d.facts.map((fact, index) => <article className={index === 0 ? "fact big" : "fact"} key={fact[1]}><b>{fact[0]}</b><h3>{fact[1]}</h3><p>{fact[2]}</p></article>)}</section>

    <section className="home-articles">
      <div className="section-title"><div><span>{d.pages.articles[0]}</span><h2>{d.pages.articles[1]}</h2></div><p>{d.pages.articles[2]}</p></div>
      <div className="article-grid">{d.articles.map((article,index)=><a key={article[1]} href={withLang(`/articles/${articleSlugs[index]}/`)}><div><span>{article[0]}</span><b>{article[3]}</b></div><h2>{article[1]}</h2><p>{article[2]}</p><strong>{d.readArticle} →</strong></a>)}</div>
      <a className="all-articles-link" href={withLang("/articles/")}>{d.nav[3]} →</a>
    </section>

    <section className="faq"><div><span>{d.quick}</span><h2>{d.important}</h2><a href={withLang("/discover/")}>{d.start} →</a></div><div className="questions">{d.faqs.map((faq, index) => <details open={index === 0} key={faq[0]}><summary>{faq[0]}<b>+</b></summary><p>{faq[1]}</p></details>)}</div></section>
  </SiteShell>;
}
