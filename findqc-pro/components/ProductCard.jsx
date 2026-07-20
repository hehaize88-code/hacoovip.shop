"use client";

import { ExternalIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";

const NOTE_KEYS = {
  "Footwear listing": "product.note.shoes",
  "Hoodie listing": "product.note.hoodie",
  "T-shirt listing": "product.note.tshirt",
  "Outerwear listing": "product.note.outerwear",
  "Pants listing": "product.note.pants",
  "Headwear listing": "product.note.headwear",
  "Accessory listing": "product.note.accessory",
  "Jersey listing": "product.note.jersey",
  "Electronics listing": "product.note.electronics",
};

export default function ProductCard({ product, priority = false }) {
  const { t } = useLanguage();
  const productName = t(`product.name.${product.id}`);

  return (
    <article className="product-card">
      <a href={product.href} target="_blank" rel="noopener noreferrer" className="product-image-link" aria-label={t("product.open", { name: productName })}>
        <img src={product.image} alt={productName} loading={priority ? "eager" : "lazy"} />
        <span className="source-pill">{t("product.live")}</span>
      </a>
      <div className="product-card-body">
        <div className="product-eyebrow">
          <span>{NOTE_KEYS[product.note] ? t(NOTE_KEYS[product.note]) : product.note}</span>
          <span>#{product.id}</span>
        </div>
        <h3>{productName}</h3>
        <div className="product-bottom">
          <div>
            <small>{t("product.price")}</small>
            <strong>¥{product.price}</strong>
          </div>
          <a href={product.href} target="_blank" rel="noopener noreferrer" aria-label={t("product.view", { name: productName })}>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
