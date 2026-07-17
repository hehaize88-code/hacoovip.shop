"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/content";
import { ProductCard } from "./ProductCard";

export function FindsExplorer({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.categorySlug === category;
      const haystack = `${product.title} ${product.category} ${product.tags.join(" ")} ${product.short}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, products, query]);

  return (
    <div className="finds-explorer">
      <div className="finds-toolbar">
        <label>
          <span className="sr-only">Filter directory finds</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Filter these directory entries" />
        </label>
        <div className="filter-pills" aria-label="Filter by category">
          <button className={category === "all" ? "is-active" : ""} onClick={() => setCategory("all")}>All</button>
          {categories.map((item) => (
            <button key={item.slug} className={category === item.slug ? "is-active" : ""} onClick={() => setCategory(item.slug)}>{item.title}</button>
          ))}
        </div>
      </div>
      <p className="result-count" aria-live="polite">{filtered.length} research {filtered.length === 1 ? "entry" : "entries"}</p>
      <div className="product-grid">
        {filtered.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>No matching directory entry yet.</h2>
          <p>Try a broader word, or use the main catalogue search below.</p>
        </div>
      )}
    </div>
  );
}
