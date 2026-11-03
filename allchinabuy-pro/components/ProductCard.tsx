/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Product } from "@/lib/content";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <article
      className={compact ? "product-card product-card--compact" : "product-card"}
      data-item-id={product.itemId}
      data-main-product-id={product.mainProductId}
      data-category={product.categorySlug}
      data-search-tags={product.tags.join(" ")}
    >
      <a
        href={product.targetUrl}
        className="product-card__image-wrap"
        aria-label={`Open ${product.title}, item ${product.itemId}, in the main catalogue`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <img
          src={product.image}
          alt={`Source listing image for ${product.title}, item ${product.itemId}`}
          width="1254"
          height="1254"
          loading="lazy"
        />
        <span className="product-card__arrow" aria-hidden="true">↗</span>
      </a>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span>Checked {product.checkedAt}</span>
        </div>
        <h3>
          <a href={product.targetUrl} target="_blank" rel="nofollow noopener noreferrer">
            {product.title}
          </a>
        </h3>
        {!compact && <p>{product.short}</p>}
        <Link className="product-research-link" href={product.categorySlug === "shoes" ? "/guides/allchinabuy-shoe-sizing-insole-qc/" : "/guides/allchinabuy-qc-photos-by-product-link/"}>
          {product.categorySlug === "shoes" ? "Check shoe sizing" : "Find QC photos"}
        </Link>
      </div>
    </article>
  );
}
