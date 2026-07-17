/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Product } from "@/lib/content";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <article className={compact ? "product-card product-card--compact" : "product-card"}>
      <Link href={`/finds/${product.slug}`} className="product-card__image-wrap" aria-label={`Read ${product.title}`}>
        <img src={product.image} alt={`Generic ${product.title.toLowerCase()} category illustration`} width="1254" height="1254" loading="lazy" />
        <span className="product-card__arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span>Checked {product.checkedAt}</span>
        </div>
        <h3><Link href={`/finds/${product.slug}`}>{product.title}</Link></h3>
        {!compact && <p>{product.short}</p>}
      </div>
    </article>
  );
}
