import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { categories, DESTINATION, products, SITE_URL } from "@/app/data";
import { createPageMetadata } from "@/app/seo";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  const description = `${product.name} visual reference, category-specific checks and a current CNFansHP search route without relying on an expired product-detail URL.`;
  return createPageMetadata({
    title: `${product.name} Reference & Live Search`,
    description,
    path: `/products/${product.slug}`,
    alternates: { canonical: `/products/${product.slug}/` },
    image: {
      url: `${SITE_URL}${product.image}`,
      width: 750,
      height: 750,
      alt: `${product.name} visual reference`,
    },
  });
}

export default async function ProductReferencePage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const category = categories.find((item) => item.slug === product.categorySlug);
  const liveSearch = `${DESTINATION}/search.html?keywords=${encodeURIComponent(product.query)}&channelid=2&method=1`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${product.name} research reference`,
    url: `${SITE_URL}/products/${product.slug}/`,
    description: product.focus,
    dateModified: "2026-07-15",
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${SITE_URL}${product.image}`, caption: product.name },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return <>
    <StructuredData data={schema}/>
    <section className="product-reference-hero">
      <div className="product-reference-image"><img src={product.image} alt={`${product.name} visual reference`}/></div>
      <div className="product-reference-copy">
        <span className="section-label">{product.category} / visual reference</span>
        <h1>{product.name}</h1>
        <p>{product.focus}</p>
        <div className="hero-actions">
          <a className="button primary" href={liveSearch} target="_blank" rel="noopener noreferrer">Search the live catalog <Arrow/></a>
          <Link className="button quiet" href={`/categories/${product.categorySlug}`}>Open {product.category} guide</Link>
        </div>
        <span className="product-reference-note">Checked July 15, 2026 · independent reference</span>
      </div>
    </section>
    <section className="section wrap">
      <div className="reference-grid">
        <div><span className="section-label">A safer route</span><h2>Keep the match. Avoid a dead link.</h2></div>
        <div className="reference-copy">
          <p className="large-copy">This page keeps the image and research context together while the external catalog changes.</p>
          <p>Product-detail routes can expire even when an old thumbnail remains visible. Hacoo Pro therefore links this reference to a current search and the broader live category instead of presenting an unavailable detail address as active.</p>
          <div className="reference-checks">
            {category.checklist.map((check, index) => <div key={check}><span>0{index + 1}</span><p>{check}</p></div>)}
          </div>
          <div className="reference-disclosure">The image is a discovery reference, not proof of current stock, specification, authenticity or quality. Match the current search result, selected option and live details before making a decision.</div>
          <div className="inline-links"><a href={liveSearch} target="_blank" rel="noopener noreferrer">Search CNFansHP <Arrow size={16}/></a><a href={`${DESTINATION}${category.destination}`} target="_blank" rel="noopener noreferrer">Browse live {product.category.toLowerCase()} <Arrow size={16}/></a></div>
        </div>
      </div>
    </section>
  </>;
}
