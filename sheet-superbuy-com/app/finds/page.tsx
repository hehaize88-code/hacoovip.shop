import type { Metadata } from "next";
import {
  ArrowIcon,
  PageHero,
  ProductCard,
  SearchBar,
  SiteFooter,
  SiteHeader,
} from "../components";
import { MAIN_SITE, categories, products } from "../site-data";
import {
  SITE_URL,
  breadcrumbSchema,
  createPageMetadata,
} from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Verified Superbuy Product Finds",
  description:
    "Browse Superbuy product routes checked for a reachable destination, matching primary image, review date, and clearly stated verification limits.",
  path: "/finds/",
});

const findsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Verified Superbuy product routes",
      url: `${SITE_URL}/finds/`,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.title,
        url: product.url,
        image: product.image,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Verified product finds", path: "/finds/" },
    ]),
  ],
};

export default function FindsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Research shelf"
          title="Verified Superbuy Product Finds"
          intro="Fewer claims, better route checks. This shelf favours inspectable evidence over giant item-count claims. Each representative card opens the exact source destination used for its image."
          aside="A checked route can still go out of stock or change after review. Always treat the live destination as the current source of truth."
        />
        <section className="content-section shell">
          <div className="section-toolbar">
            <div className="section-heading">
              <p className="eyebrow plain">Current selection</p>
              <h2>Six routes checked on 14 August 2026</h2>
              <p>Prices are approximate USD conversions for comparison only. Live prices and variants may differ.</p>
            </div>
            <a className="text-link" href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener sponsored nofollow">Browse the full catalogue <ArrowIcon /></a>
          </div>
          <div className="product-grid">
            {products.map((product) => <ProductCard product={product} key={product.url} />)}
          </div>
        </section>
        <section className="content-section content-shell">
          <h2>Search beyond this shelf</h2>
          <p>Try a product type, construction, or material. Search opens the source catalogue results directly—there is no on-site checkout and no hidden intermediate redirect.</p>
          <SearchBar />
          <div className="callout">
            <strong>What “route checked” does not mean</strong>
            <p>It is not an authenticity claim, seller endorsement, quality guarantee, or promise of stock. Warehouse QC can help identify visible discrepancies, but it cannot prove material composition or authenticity.</p>
          </div>
        </section>
        <section className="content-section shell">
          <div className="category-grid compact-category-grid">
            {categories.map((category, index) => (
              <a className="category-card" href={category.url} target="_blank" rel="noopener sponsored nofollow" key={category.name}>
                <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="category-copy"><strong>{category.name}</strong><small>{category.note}</small></span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(findsSchema) }} />
    </>
  );
}
