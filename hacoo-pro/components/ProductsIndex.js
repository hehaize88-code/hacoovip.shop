import StructuredData from "./StructuredData";
import ProductDirectory from "./ProductDirectory";
import { CATALOG_REVIEW, categories, DESTINATION, products, SITE_URL } from "@/app/data";
import { getProductPageCopy } from "@/app/products-copy";
import { getLocalizedProduct } from "@/app/product-locales";
import { localizeCategories, localizePath } from "@/app/i18n";
import { createBreadcrumbList, WEBSITE_ID } from "@/app/schema";

export default function ProductsIndex({ locale = "en" }) {
  const copy = getProductPageCopy(locale);
  const localizedCategories = localizeCategories(categories, locale);
  const categoryNames = Object.fromEntries(localizedCategories.map((category) => [category.slug, category.name]));
  const items = products.map((sourceProduct) => {
    const product = getLocalizedProduct(sourceProduct, locale);
    return {
      ...product,
      displayCategory: categoryNames[product.categorySlug] || product.category,
      referenceUrl: localizePath(`/products/${product.slug}`, locale),
      listingUrl: `${DESTINATION}${product.listingPath}`,
      searchUrl: `${DESTINATION}/search.html?keywords=${encodeURIComponent(product.query)}&channelid=2&method=1`,
      checkedIso: CATALOG_REVIEW.iso,
      checkedLabel: copy.reviewedDate,
    };
  });
  const pageUrl = `${SITE_URL}${localizePath("/products", locale)}/`;
  const breadcrumb = createBreadcrumbList({ locale, path: "/products", items: [{ name: "Hacoo Pro", path: "/" }, { name: copy.title.join(" "), path: "/products" }] });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#webpage`, name: copy.title.join(" "), url: pageUrl, description: copy.lead, inLanguage: locale, dateModified: CATALOG_REVIEW.iso, breadcrumb: { "@id": breadcrumb["@id"] }, isPartOf: { "@id": WEBSITE_ID } },
      { "@type": "ItemList", name: copy.directoryTitle, numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}${localizePath(`/products/${item.slug}`, locale)}/`, name: item.name })) },
      breadcrumb,
    ],
  };

  return <div className="products-index-page" lang={locale}>
    <StructuredData data={schema}/>
    <section className="products-index-hero">
      <div className="wrap products-index-hero-layout">
        <div><span className="section-label inverse">{copy.eyebrow}</span><h1>{copy.title[0]}<br/><em>{copy.title[1]}</em></h1><p>{copy.lead}</p></div>
        <dl className="products-index-stats">
          <div><dt>{products.length}</dt><dd>{copy.detailStat}</dd></div>
          <div><dt>{categories.length}</dt><dd>{copy.categoryStat}</dd></div>
          <div><dt>{copy.reviewedDate}</dt><dd>{copy.reviewed}</dd></div>
        </dl>
      </div>
    </section>
    <section className="section wrap products-directory-section">
      <div className="section-heading"><div><span className="section-label">{copy.directoryLabel}</span><h2>{copy.directoryTitle}</h2></div><p>{copy.directoryText}</p></div>
      <ProductDirectory items={items} filters={localizedCategories} copy={copy}/>
    </section>
    <section className="products-index-notice"><div className="wrap"><span>!</span><div><h2>{copy.noticeTitle}</h2><p>{copy.notice}</p></div></div></section>
  </div>;
}
