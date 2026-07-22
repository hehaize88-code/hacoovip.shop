import Link from "../../components/LocalizedLink";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import SearchBox from "../../components/SearchBox";
import ProductCard from "../../components/ProductCard";
import { ArrowIcon, CheckIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";
import { CATALOG_REVIEWED, categories, products } from "../../lib/data";
import { translate } from "../../lib/i18n";
import { BUILD_LANGUAGE, languageUrl } from "../../lib/routing";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({
  title: "Product Finds with Exact Source Links",
  description: "Browse a curated product shortlist, open exact source pages and use practical listing and QC checks before ordering or approving international shipment.",
}, "/products");

export default function ProductsPage() {
  const productGroups = categories.map((category) => ({
    category,
    items: products.filter((product) => product.category === category.slug),
  }));
  const productName = (product) => {
    const key = `product.name.${product.id}`;
    const translated = translate(BUILD_LANGUAGE, key);
    return translated === key ? product.name : translated;
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${languageUrl("/products")}#product-list`,
    name: `${translate(BUILD_LANGUAGE, "products.title1")} ${translate(BUILD_LANGUAGE, "products.title2")}`,
    url: languageUrl("/products"),
    numberOfItems: products.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: productName(product),
      url: product.href,
      image: new URL(product.image, "https://findqc.pro").toString(),
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: translate(BUILD_LANGUAGE, "common.home"), item: languageUrl("/") },
      { "@type": "ListItem", position: 2, name: translate(BUILD_LANGUAGE, "nav.finds"), item: languageUrl("/products") },
    ],
  };

  return (
    <div className="shell inner-page products-depth-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumbs items={[{ labelKey: "nav.finds" }]} />
      <PageHero eyebrow={<T id="products.eyebrow" />} title={<><T id="products.title1" /><br /><em><T id="products.title2" /></em></>} intro={<T id="products.intro" />}><SearchBox compact /></PageHero>

      <section className="shortlist-method" aria-labelledby="shortlist-method-title">
        <div>
          <span className="eyebrow light">How this shortlist works</span>
          <h2 id="shortlist-method-title">{products.length} exact product routes across nine categories.</h2>
        </div>
        <p>Every card was matched to one specific source-catalog page and a distinct listing image on {CATALOG_REVIEWED}. Inclusion does not mean that FindQC Pro has purchased, inspected, authenticated or endorsed the item. Availability, options, view counts and source prices can change after a card is checked.</p>
        <ul>
          <li><CheckIcon size={17} /><span><strong>12 per category</strong>Each of the nine categories now contains twelve individually mapped products.</span></li>
          <li><CheckIcon size={17} /><span><strong>Unique route and image</strong>No two cards reuse the same destination or local product image.</span></li>
          <li><CheckIcon size={17} /><span><strong>Evidence still required</strong>Review the warehouse images for your own order before approving international shipment.</span></li>
        </ul>
      </section>

      <nav className="product-category-index" aria-label="Jump to a product category">
        {productGroups.map(({ category, items }) => (
          <a href={`#products-${category.slug}`} key={category.slug}>
            <span>{category.code}</span>
            <strong>{category.name}</strong>
            <small>{items.length} products</small>
            <ArrowIcon size={15} />
          </a>
        ))}
      </nav>

      <div className="product-catalog">
        {productGroups.map(({ category, items }, groupIndex) => (
          <section className="product-catalog-section" id={`products-${category.slug}`} aria-labelledby={`products-${category.slug}-title`} key={category.slug}>
            <header className="product-group-heading">
              <div><span>{category.code} / {items.length} source-linked products</span><h2 id={`products-${category.slug}-title`}>{category.name}</h2></div>
              <Link href={`/categories/${category.slug}`}>Open the {category.name.toLowerCase()} QC guide <ArrowIcon size={16} /></Link>
            </header>
            <div className="product-grid all-products">
              {items.map((product, index) => <ProductCard product={product} priority={groupIndex === 0 && index < 4} key={product.id} />)}
            </div>
          </section>
        ))}
      </div>
      <p className="price-note"><T id="products.priceNote" /></p>

      <section className="product-use-grid" aria-labelledby="product-use-title">
        <article>
          <span className="depth-number">01</span>
          <small>Before opening a card</small>
          <h2 id="product-use-title">Know what you are trying to confirm.</h2>
          <p>A useful search starts with a product type, a specific model clue or a known product ID. Similar thumbnails can represent different sellers, versions or option sets. Keep the card name and ID in view, then check the destination rather than assuming the first image proves a match.</p>
          <p>If the source page has several colours, sizes or bundles, record the exact option text. For electronics, include connector, plug, capacity or region. For clothing, include size and colour. For customised items, save the spelling, number and requested patches.</p>
        </article>
        <article>
          <span className="depth-number">02</span>
          <small>On the source page</small>
          <h2>Recheck live information before ordering.</h2>
          <p>Confirm the product ID, current option list, size chart, seller notes and what the selected package includes. A displayed source price is not necessarily the final delivered cost; domestic delivery, purchasing-service charges, optional services, parcel preparation and international shipping may be separate.</p>
          <p>Do not rely on an old screenshot when a live source page is available. If a listing has disappeared or changed identity, return to the category rather than forcing an outdated link into the order process.</p>
        </article>
        <article>
          <span className="depth-number">03</span>
          <small>At the warehouse</small>
          <h2>Compare your order with your own evidence.</h2>
          <p>Public QC records can help you learn where to look, but another buyer’s images do not prove what arrived in your parcel. Compare your warehouse set with your recorded colour, size, version and included-parts list. Then review overall condition, construction, labels, measurements and packing in a fixed order.</p>
          <p>When a decisive area is missing, request one focused view—such as a ruler across the chest or a close-up of a damaged connector. “More photos” is less useful than naming the exact evidence you need.</p>
        </article>
      </section>

      <section className="product-preflight" aria-labelledby="preflight-title">
        <div>
          <span className="eyebrow">Six-point preflight</span>
          <h2 id="preflight-title">Before you approve any shortlisted product</h2>
          <p>This checklist reduces avoidable mismatches while keeping the limits of photo review clear.</p>
        </div>
        <ol>
          <li><span>01</span><p>The destination is the intended product page, not a look-alike listing.</p></li>
          <li><span>02</span><p>Size, colour, model, version and quantity match the recorded order.</p></li>
          <li><span>03</span><p>Measurements use visible endpoints and a method you can compare.</p></li>
          <li><span>04</span><p>All explicitly included pieces appear in the warehouse evidence.</p></li>
          <li><span>05</span><p>Any visible concern is checked from an appropriate angle or close-up.</p></li>
          <li><span>06</span><p>Packing and current shipping restrictions suit the product type.</p></li>
        </ol>
      </section>

      <section className="product-category-paths" aria-labelledby="product-category-title">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow">Category-specific checks</span><h2 id="product-category-title">Use the right checklist for the item.</h2></div>
          <Link href="/categories" className="text-link">View all categories <ArrowIcon /></Link>
        </div>
        <div>
          {categories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.slug}>
              <span>{category.code}</span><strong>{category.name}</strong><small>{category.short}</small><ArrowIcon size={15} />
            </Link>
          ))}
        </div>
      </section>

      <aside className="product-boundary-note">
        <div><span>Evidence boundary</span><h2>Photos help with visible comparison. They do not certify authenticity or future performance.</h2></div>
        <p>FindQC Pro is an independent discovery and education layer. Product transactions take place on the linked external catalog, and the service handling an order controls its current fees, warehouse options, shipping rules, returns and support.</p>
        <Link href="/guides/qc-photo-checklist">Use the full QC photo checklist <ArrowIcon /></Link>
      </aside>
    </div>
  );
}
