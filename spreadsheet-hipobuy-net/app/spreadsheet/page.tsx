"use client";

import { useMemo, useState } from "react";
import { InnerHero, SiteChrome } from "../site-chrome";

const rows = [
  ["HB-5974","Classic loose-fit sweatshirt","Hoodies","$19.45","¥140","https://cnfanshp.com/AllProducts/5974.html"],
  ["HB-6045","Everyday trainer · 60","Shoes","$45.85","¥330","https://cnfanshp.com/AllProducts/6045.html"],
  ["HB-5971","Letter-embroidered cap","Headwear","$12.35","¥89","https://cnfanshp.com/AllProducts/5971.html"],
  ["HB-6043","Daily runner · 58","Shoes","$38.90","¥280","https://cnfanshp.com/AllProducts/6043.html"],
  ["HB-5970","Collared patchwork sweatshirt","Hoodies","$22.25","¥160","https://cnfanshp.com/AllProducts/5970.html"],
  ["HB-6044","Everyday trainer · 59","Shoes","$55.45","¥399","https://cnfanshp.com/AllProducts/6044.html"],
];

export default function SpreadsheetPage() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const filtered = useMemo(() => rows.filter(row => (category === "All" || row[2] === category) && row.join(" ").toLowerCase().includes(query.toLowerCase())),[query,category]);
  return <SiteChrome><main className="inner-main">
    <InnerHero eyebrow="Live product sheet · links checked 22 Aug 2026" title="Hipobuy Spreadsheet 2026" intro="Search a compact preview, compare dated USD references and open the exact destination page. A live link does not guarantee stock, seller quality or final shipping cost." />
    <section className="sheet-surface">
      <div className="sheet-controls"><label>Search rows<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Product, category or ID" /></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option><option>Shoes</option><option>Hoodies</option><option>Headwear</option></select></label><span>{filtered.length} / {rows.length} rows</span></div>
      <div className="data-table"><div className="data-head"><span>ID</span><span>PRODUCT</span><span>CATEGORY</span><span>USD REF.</span><span>STATUS</span></div>{filtered.map(row=><a className="data-row" href={row[5]} target="_blank" rel="noopener noreferrer" key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}</span><span><b>{row[3]}</b><small>{row[4]} snapshot</small></span><span className="status-pill">LINK LIVE ↗</span></a>)}</div>
      <div className="sheet-disclaimer"><strong>Read before opening a row.</strong><p>Prices are reference conversions from a dated CNY snapshot. Recheck the current listing, selected variant, domestic delivery and checkout quote.</p></div>
    </section>
  </main></SiteChrome>;
}
