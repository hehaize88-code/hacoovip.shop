"use client";

import { useMemo, useState } from "react";
import { InnerHero, SiteChrome } from "../site-chrome";
import { CATALOG_CHECKED_DATE, catalogCategories, catalogProducts, productHref, usdReference } from "../catalog-data";

export default function SpreadsheetPage() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const [budget,setBudget] = useState("all");
  const [order,setOrder] = useState("default");
  const filtered = useMemo(() => catalogProducts.filter(product => {
    const categoryName = catalogCategories.find(item => item.slug === product.category)?.name ?? product.category;
    const haystack = `${product.id} ${product.name} ${categoryName} ${product.cny}`.toLowerCase();
    return (category === "All" || product.category === category) && haystack.includes(query.toLowerCase()) && (budget==="all" || Number(usdReference(product.cny).slice(1))<=Number(budget));
  }).sort((a,b)=>order==="low"?a.cny-b.cny:order==="high"?b.cny-a.cny:0),[query,category,budget,order]);
  return <SiteChrome><main className="inner-main">
    <InnerHero eyebrow="Hipobuy finds · product links and budget filters" title="Browse Hipobuy finds by category, price and product link." intro="Search 60 product links, filter by reference price and compare categories. Prices exclude international shipping. Confirm the selected variation and current price before ordering." />
    <section className="sheet-surface">
      <div className="sheet-controls"><label>Search rows<input data-sheet-search value={query} onChange={e=>setQuery(e.target.value)} placeholder="Product, category or ID" /></label><label>Category<select data-sheet-category value={category} onChange={e=>setCategory(e.target.value)}><option value="All">All categories</option>{catalogCategories.map(item=><option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label><label>Reference price<select data-sheet-budget value={budget} onChange={e=>setBudget(e.target.value)}><option value="all">All reference prices</option><option value="20">Up to $20</option><option value="30">Up to $30</option><option value="50">Up to $50</option></select></label><label>Price order<select data-sheet-order value={order} onChange={e=>setOrder(e.target.value)}><option value="default">Original order</option><option value="low">Lowest reference price first</option><option value="high">Highest reference price first</option></select></label><span data-sheet-count aria-live="polite">{filtered.length} / {catalogProducts.length} rows</span></div>
      <div className="data-table"><div className="data-head"><span>ID</span><span>PRODUCT</span><span>CATEGORY</span><span>USD REF.</span><span>STATUS</span></div>{filtered.map(product=>{const categoryName=catalogCategories.find(item=>item.slug===product.category)?.name??product.category;return <a className="data-row" data-price={usdReference(product.cny).slice(1)} href={productHref(product.id)} target="_blank" rel="noopener noreferrer" key={product.id}><span>HB-{product.id}</span><strong>{product.name}</strong><span>{categoryName}</span><span><b>{usdReference(product.cny)}</b><small>¥{product.cny} snapshot</small></span><span className="status-pill">CHECKED {CATALOG_CHECKED_DATE} ↗</span></a>})}</div>
      <p data-sheet-empty hidden>No matching rows. Try another category, price limit or search term.</p>
      <div className="sheet-disclaimer"><strong>Read before opening a row.</strong><p>Prices are dated catalogue snapshots converted at a reference rate, not live checkout quotes. The price filter excludes shipping and other charges. A reachable listing does not confirm stock or authenticity. Check the current variation, domestic delivery and payable total.</p></div>
      <nav className="internal-category-links"><a href="/articles/hipobuy-budget-finds-under-30/">Compare budget finds and total costs</a><a href="/articles/hipobuy-link-converter-guide/">Check a marketplace product link</a></nav>
    </section>
  </main></SiteChrome>;
}
