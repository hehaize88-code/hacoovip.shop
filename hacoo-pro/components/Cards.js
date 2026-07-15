import Link from "next/link";
import { Arrow } from "./Icons";
import { DESTINATION } from "@/app/data";
import { localizePath } from "@/app/i18n";

export function CategoryCard({ category, index, locale = "en" }) {
  return (
    <Link className="category-card" href={localizePath(`/categories/${category.slug}`, locale)}>
      <div className="category-image"><img src={category.image} alt={`${category.name} category preview`} loading="lazy"/><span>{String(index + 1).padStart(2, "0")}</span></div>
      <div className="category-copy"><small>{category.eyebrow}</small><h3>{category.name}</h3><p>{category.description}</p><span className="text-link">{category.name} <Arrow size={16}/></span></div>
    </Link>
  );
}

export function ProductCard({ product }) {
  return (
    <a className="product-card" href={`${DESTINATION}${product.href}`} target="_blank" rel="noopener noreferrer">
      <div className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span>{product.tag}</span></div>
      <div className="product-copy"><small>{product.category}</small><h3>{product.name}</h3><span className="text-link">Check live listing <Arrow size={16}/></span></div>
    </a>
  );
}
