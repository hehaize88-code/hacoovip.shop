"use client";

import { useMemo, useState } from "react";
import { InnerHero, SiteChrome } from "../site-chrome";
import { CATALOG_CHECKED_DATE, catalogCategories, catalogProducts, productHref, usdReference } from "../catalog-data";

export default function SpreadsheetPage() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const filtered = useMemo(() => catalogProducts.filter(product => {
    const categoryName = catalogCategories.find(item => item.slug === product.category)?.name ?? product.category;
    const haystack = `${product.id} ${product.name} ${categoryName} ${product.cny}`.toLowerCase();
    return (category === "All" || product.category === category) && haystack.includes(query.toLowerCase());
  }),[query,category]);
  return <SiteChrome><main className="inner-main">
    <InnerHero eyebrow="Checked product sheet · links reviewed 24 Aug 2026" title="Browse Hipobuy finds by category, price and product link." intro="Filter 60 server-visible rows, compare dated USD references and open the exact destination page. A reachable link does not guarantee stock, seller quality, product claims or final shipping cost." />
    <section className="sheet-surface">
      <div className="sheet-controls"><label>Search rows<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Product, category or ID" /></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}><option value="All">All categories</option>{catalogCategories.map(item=><option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label><span>{filtered.length} / {catalogProducts.length} rows</span></div>
      <div className="data-table"><div className="data-head"><span>ID</span><span>PRODUCT</span><span>CATEGORY</span><span>USD REF.</span><span>STATUS</span></div>{filtered.map(product=>{const categoryName=catalogCategories.find(item=>item.slug===product.category)?.name??product.category;return <a className="data-row" href={productHref(product.id)} target="_blank" rel="noopener noreferrer" key={product.id}><span>HB-{product.id}</span><strong>{product.name}</strong><span>{categoryName}</span><span><b>{usdReference(product.cny)}</b><small>¥{product.cny} snapshot</small></span><span className="status-pill">CHECKED {CATALOG_CHECKED_DATE} ↗</span></a>})}</div>
      <div className="sheet-disclaimer"><strong>Read before opening a row.</strong><p>Every destination returned HTTP 200 on 24 August 2026. Prices are reference conversions from the displayed CNY snapshot, not live checkout quotes. Recheck the current listing, selected variant, domestic delivery and checkout amount.</p></div>
    </section>
  </main></SiteChrome>;
}
