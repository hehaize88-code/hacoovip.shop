/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { categories, getCategory, products, SITE_URL } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Collection not found", robots: { index: false, follow: false } };
  return {
    title: `${category.title} Finds & Shopping Links`,
    description: category.description,
    alternates: { canonical: `${SITE_URL}/collections/${category.slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/collections/${category.slug}`,
      title: `${category.title} research collection`,
      description: category.description,
      images: [{ url: category.image, alt: `Generic ${category.title} category illustration` }],
    },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.categorySlug === category.slug);

  return (
    <main id="main-content" className="inner-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: `${category.title} research collection`,
              url: `${SITE_URL}/collections/${category.slug}`,
              description: category.description,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: categoryProducts.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: product.title,
                  url: `${SITE_URL}/finds/${product.slug}`,
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Finds", item: `${SITE_URL}/finds` },
                { "@type": "ListItem", position: 3, name: category.title, item: `${SITE_URL}/collections/${category.slug}` },
              ],
            },
          ],
        }}
      />
      <section className="category-hero">
        <div className="category-hero__copy">
          <div className="breadcrumb"><Link href="/finds">All finds</Link> / Collections</div>
          <p className="eyebrow">Independent category route</p>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
          <div className="page-hero__actions">
            <a className="button button--lime" href={category.targetUrl} target="_blank" rel="nofollow noopener noreferrer">Browse main-site category <span aria-hidden="true">↗</span></a>
            <Link className="button button--outline-dark" href="/guides/qc-photo-checklist">Read the QC checklist</Link>
          </div>
        </div>
        <div className="category-hero__image">
          <img
            src={category.image}
            srcSet={`${category.imageMobile} 640w, ${category.image} 1254w`}
            sizes="(max-width: 860px) 100vw, 50vw"
            alt={`Generic ${category.title.toLowerCase()} category illustration`}
            width="1254"
            height="1254"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Research entries</p><h2>Start here, verify there.</h2></div>
          <p>{category.kicker}. Product cards below use first images matched to their listed item IDs and verified CNFansHP product pages; check the live destination before ordering.</p>
        </div>
        {categoryProducts.length > 0 ? (
          <div className="product-grid">
            {categoryProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        ) : (
          <div className="empty-state"><h2>Use the live category route.</h2><p>No editorial entry has been added to this category yet.</p></div>
        )}
      </section>
    </main>
  );
}
