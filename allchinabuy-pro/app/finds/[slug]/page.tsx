/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, SITE_URL } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Find not found", robots: { index: false, follow: false } };

  return {
    title: `${product.title} — Independent Research Find`,
    description: product.short,
    alternates: { canonical: `${SITE_URL}/finds/${product.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/finds/${product.slug}`,
      title: product.title,
      description: product.short,
      images: [{ url: product.image, alt: `Source listing image for ${product.title}, item ${product.itemId}` }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.slug !== product.slug && item.categorySlug === product.categorySlug)
    .slice(0, 3);
  const fallbackRelated = related.length > 0
    ? related
    : products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main id="main-content" className="inner-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemPage",
              name: product.title,
              url: `${SITE_URL}/finds/${product.slug}`,
              description: product.description,
              dateModified: "2026-07-18",
              mainEntity: {
                "@type": "Product",
                name: product.title,
                sku: product.itemId,
                url: product.targetUrl,
                image: `${SITE_URL}${product.image}`,
                description: product.short,
                category: product.category,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Finds", item: `${SITE_URL}/finds` },
                { "@type": "ListItem", position: 3, name: product.title, item: `${SITE_URL}/finds/${product.slug}` },
              ],
            },
          ],
        }}
      />
      <section className="product-detail">
        <div className="product-detail__image">
          <img
            src={product.image}
            alt={`Source listing image for ${product.title}, item ${product.itemId}`}
            width="1254"
            height="1254"
            fetchPriority="high"
          />
          <span>Source listing image · item {product.itemId}</span>
        </div>
        <div className="product-detail__copy">
          <div className="breadcrumb"><Link href="/finds">Finds</Link> / {product.category}</div>
          <p className="eyebrow">Independent research entry</p>
          <h1>{product.title}</h1>
          <p className="product-detail__source-label">Source listing label: {product.sourceTitle}</p>
          <p className="product-detail__lead">{product.description}</p>
          <div className="product-detail__tags">
            <span>Item {product.itemId}</span>
            {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <a
            className="button button--lime"
            href={product.targetUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Open matching item on AllChinaBuy <span aria-hidden="true">↗</span>
          </a>
          <p className="product-detail__notice">
            Image, source label and item route matched {product.checkedAt}. This does not verify brand authenticity or product quality. Price, options, availability and seller information can change after review.
          </p>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Before ordering</p><h2>A short verification pass.</h2></div>
          <p>The destination page is the source for current commercial information. Use this checklist to slow down the decision.</p>
        </div>
        <div className="check-grid">
          <article><span>01</span><h3>Match the option</h3><p>Confirm colour, size, quantity and visible identifiers against the option you intend to select.</p></article>
          <article><span>02</span><h3>Compare measurements</h3><p>Use item measurements and a product you already own; international size labels are not consistent.</p></article>
          <article><span>03</span><h3>Read the live details</h3><p>Check current images, material notes, seller information, availability and return conditions.</p></article>
          <article><span>04</span><h3>Plan the parcel</h3><p>Consider product weight, packaging, shipping-line restrictions and destination charges.</p></article>
        </div>
      </section>
      <section className="content-section content-section--dark">
        <div className="section-heading section-heading--dark">
          <div><p className="eyebrow">Keep researching</p><h2>Related directory entries.</h2></div>
          <Link className="text-link" href={`/collections/${product.categorySlug}`}>Open {product.category} collection →</Link>
        </div>
        <div className="product-grid">
          {fallbackRelated.map((item) => <ProductCard key={item.slug} product={item} />)}
        </div>
      </section>
    </main>
  );
}
