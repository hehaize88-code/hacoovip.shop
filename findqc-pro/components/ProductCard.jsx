"use client";

import { ExternalIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";
import ResponsiveImage from "./ResponsiveImage";

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
  const nameKey = `product.name.${product.id}`;
  const translatedName = t(nameKey);
  const productName = translatedName === nameKey ? product.name : translatedName;

  return (
    <article className="product-card">
      <a href={product.href} target="_blank" rel="noopener noreferrer" className="product-image-link" aria-label={t("product.open", { name: productName })}>
        <ResponsiveImage
          src={product.image}
          alt={productName}
          sizes="(max-width: 640px) calc(50vw - 22px), (max-width: 1050px) calc(33vw - 28px), 280px"
          priority={priority}
        />
        <span className="source-pill">{t("product.live")}</span>
      </a>
      <div className="product-card-body">
        <div className="product-eyebrow">
          <span>{NOTE_KEYS[product.note] ? t(NOTE_KEYS[product.note]) : product.note}</span>
          <span title={`Source item ${product.sourceId}`}>#{product.id}</span>
        </div>
        <h3>{productName}</h3>
        <div className="product-bottom">
          <div>
            <small>{t("product.price")}</small>
            <strong>¥{product.price}</strong>
            <span className="product-source-views">{t("product.views", { count: product.views })}</span>
          </div>
          <a href={product.href} target="_blank" rel="noopener noreferrer" aria-label={t("product.view", { name: productName })}>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
