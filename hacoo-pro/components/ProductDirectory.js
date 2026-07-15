"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrow } from "./Icons";

export default function ProductDirectory({ items, filters, copy }) {
  const [active, setActive] = useState("all");
  const visibleItems = useMemo(
    () => active === "all" ? items : items.filter((item) => item.categorySlug === active),
    [active, items],
  );

  return <>
    <div className="product-filters" role="group" aria-label="Filter product references">
      <button type="button" className={active === "all" ? "active" : ""} aria-pressed={active === "all"} onClick={() => setActive("all")}>{copy.all}<span>{items.length}</span></button>
      {filters.map((filter) => <button type="button" key={filter.slug} className={active === filter.slug ? "active" : ""} aria-pressed={active === filter.slug} onClick={() => setActive(filter.slug)}>{filter.name}<span>{items.filter((item) => item.categorySlug === filter.slug).length}</span></button>)}
    </div>
    <div className="directory-product-grid" aria-live="polite">
      {visibleItems.map((product) => <article className="directory-product-card" key={product.slug}>
        <Link className="directory-product-image" href={product.referenceUrl} aria-label={`${copy.reference}: ${product.name}`}>
          <img src={product.image} alt={`${product.name} catalog reference`} loading="lazy"/>
          <span><i></i>{copy.checked}</span>
        </Link>
        <div className="directory-product-copy">
          <div className="directory-product-meta"><small>{product.displayCategory}</small><span>#{product.listingId}</span></div>
          <h2><Link href={product.referenceUrl}>{product.name}</Link></h2>
          <p>{product.focus}</p>
          <div className="directory-product-status"><i></i><span>{copy.status}</span><time dateTime={product.checkedIso}>{product.checkedLabel}</time></div>
          <div className="directory-product-actions">
            <Link className="button directory-reference" href={product.referenceUrl}>{copy.reference} <Arrow size={15}/></Link>
            <a className="button directory-listing" href={product.listingUrl} target="_blank" rel="noopener noreferrer">{copy.listing} <Arrow size={15}/></a>
          </div>
          <a className="directory-fallback" href={product.searchUrl} target="_blank" rel="noopener noreferrer">{copy.fallback} <Arrow size={14}/></a>
        </div>
      </article>)}
    </div>
  </>;
}
