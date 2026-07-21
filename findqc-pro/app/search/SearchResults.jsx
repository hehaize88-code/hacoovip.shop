"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import SearchBox from "../../components/SearchBox";
import ProductCard from "../../components/ProductCard";
import { ArrowIcon, ExternalIcon } from "../../components/Icons";
import { categories, products } from "../../lib/data";
import T from "../../components/LocalizedText";

function includesQuery(values, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = values.filter(Boolean).join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export default function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") || "").trim().slice(0, 120);
  const productMatches = query ? products.filter((product) => includesQuery([product.id, product.sourceId, product.name, product.category, product.note], query)) : [];
  const categoryMatches = query ? categories.filter((category) => includesQuery([category.name, category.slug, category.short, category.description], query)) : [];
  const googleHref = `https://www.google.com/search?q=${encodeURIComponent(`site:cnfanshp.com ${query}`)}`;

  return (
    <div className="shell inner-page search-page">
      <Breadcrumbs items={[{ labelKey: "searchPage.crumb" }]} />
      <header className="search-header">
        <span className="eyebrow"><T id="searchPage.eyebrow" /></span>
        <h1>{query ? <><T id="searchPage.resultsFor" /> <em>“{query}”</em></> : <T id="searchPage.title" />}</h1>
        <SearchBox compact />
      </header>

      {query && (productMatches.length > 0 || categoryMatches.length > 0) ? (
        <>
          {categoryMatches.length > 0 && <section className="search-result-section"><div className="result-label"><span><T id="searchPage.categories" /></span><b>{categoryMatches.length}</b></div><div className="search-category-list">{categoryMatches.map((category) => <Link href={`/categories/${category.slug}`} key={category.slug}><span>{category.code}</span><div><strong><T id={`category.${category.slug}.name`} /></strong><small><T id={`category.${category.slug}.short`} /></small></div><ArrowIcon /></Link>)}</div></section>}
          {productMatches.length > 0 && <section className="search-result-section"><div className="result-label"><span><T id="searchPage.products" /></span><b>{productMatches.length}</b></div><div className="product-grid all-products">{productMatches.map((product) => <ProductCard product={product} priority key={product.id} />)}</div></section>}
        </>
      ) : (
        <section className="empty-search">
          <span><T id={query ? "searchPage.noMatches" : "searchPage.start"} /></span>
          <h2><T id={query ? "searchPage.notShortlisted" : "searchPage.try"} /></h2>
          <p><T id={query ? "searchPage.noMatchText" : "searchPage.startText"} /></p>
          {query && <a href={googleHref} target="_blank" rel="noopener noreferrer"><T id="searchPage.google" values={{ query }} /> <ExternalIcon /></a>}
        </section>
      )}
    </div>
  );
}
