import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { CATALOG_REVIEW, categories, DESTINATION, products, SITE_URL } from "@/app/data";
import { productResearch } from "@/app/product-research";
import { createPageMetadata } from "@/app/seo";
import { languageAlternates } from "@/app/i18n";
import { getCyclicRelated, withTrailingSlash } from "@/app/internal-links";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  const research = productResearch[slug];
  if (!product || !research) return {};
  return createPageMetadata({
    title: `${product.name}: Size & QC Research`,
    description: research.seoDescription,
    path: `/products/${product.slug}`,
    alternates: languageAlternates(`/products/${product.slug}`, "en"),
    image: {
      url: `${SITE_URL}${product.image}`,
      width: 750,
      height: 750,
      alt: `${product.name} visual research reference`,
    },
  });
}

export default async function ProductReferencePage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  const research = productResearch[slug];
  if (!product || !research) notFound();

  const category = categories.find((item) => item.slug === product.categorySlug);
  if (!category) notFound();

  const verifiedListing = `${DESTINATION}${product.listingPath}`;
  const liveSearch = `${DESTINATION}/search.html?keywords=${encodeURIComponent(product.query)}&channelid=2&method=1`;
  const relatedProducts = getCyclicRelated(products, product.slug, 3);
  const productUrl = `${SITE_URL}/products/${product.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${productUrl}#webpage`,
        name: `${product.name} size and QC research`,
        url: productUrl,
        description: research.seoDescription,
        dateModified: CATALOG_REVIEW.iso,
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${product.image}`,
          caption: `${product.name} visual research reference`,
        },
        breadcrumb: { "@id": `${productUrl}#breadcrumb` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products/` },
          { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${productUrl}#faq`,
        mainEntity: research.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <>
    <StructuredData data={schema}/>

    <section className="product-reference-hero">
      <div className="product-reference-image"><img src={product.image} alt={`${product.name} visual research reference`}/></div>
      <div className="product-reference-copy">
        <span className="section-label">{product.category} / checked reference</span>
        <h1>{product.name}</h1>
        <p>{product.focus}</p>
        <div className="hero-actions">
          <a className="button primary" href={verifiedListing} target="_blank" rel="noopener noreferrer">Open verified listing <Arrow/></a>
          <a className="button quiet" href={liveSearch} target="_blank" rel="noopener noreferrer">Search fallback</a>
          <Link className="button quiet" href={`/categories/${product.categorySlug}/`}>Open {product.category} guide</Link>
        </div>
        <span className="product-reference-note">Listing #{product.listingId} checked {CATALOG_REVIEW.label} · independent reference</span>
      </div>
    </section>

    <section className="section wrap product-evidence-section">
      <div className="section-heading">
        <div><span className="section-label">Image evidence</span><h2>What this reference actually shows.</h2></div>
        <p>{research.summary}</p>
      </div>
      <div className="research-grid product-observation-grid">
        {research.observed.map(([title, text], index) => <article className="research-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <div className="product-limit"><strong>What it cannot verify</strong><p>{research.limits}</p></div>
    </section>

    <section className="soft-section product-research-section">
      <div className="wrap">
        <div className="section-heading">
          <div><span className="section-label">Size &amp; specification worksheet</span><h2>Measurements to request.</h2></div>
          <p>Use values from the exact selected option and record the measurement method. A familiar size, title or thumbnail is not enough.</p>
        </div>
        <div className="research-table-wrap">
          <table className="research-table">
            <thead><tr><th>Check</th><th>What to record</th><th>How to use it</th></tr></thead>
            <tbody>{research.measurements.map(([check, record, use]) => <tr key={check}><th data-label="Check">{check}</th><td data-label="What to record">{record}</td><td data-label="How to use it">{use}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="table-note">No measurement or technical value is inferred from the reference photograph. Confirm all figures on the current listing or its matching evidence.</p>
      </div>
    </section>

    <section className="section wrap product-research-section">
      <div className="section-heading">
        <div><span className="section-label">Photo review plan</span><h2>Product-specific QC checks.</h2></div>
        <p>Ask for views that answer a defined question. Attractive photography is less useful than consistent angles, neutral light and visible reference points.</p>
      </div>
      <div className="research-table-wrap">
        <table className="research-table">
          <thead><tr><th>Area</th><th>Useful evidence</th><th>Decision point</th></tr></thead>
          <tbody>{research.qc.map(([area, evidence, decision]) => <tr key={area}><th data-label="Area">{area}</th><td data-label="Useful evidence">{evidence}</td><td data-label="Decision point">{decision}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="reference-disclosure">A detail route returning successfully confirms that the address was reachable at review time. It does not certify stock, quality, authenticity, specifications or future availability.</div>
    </section>

    <section className="product-decision-section">
      <div className="wrap product-decision-layout">
        <div><span className="section-label inverse">Decision workflow</span><h2>Three checks before leaving the guide.</h2><p>Keep the selected option, evidence and review date together so details from similar listings are not mixed.</p></div>
        <ol className="product-decision-list">
          {research.workflow.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
        </ol>
      </div>
    </section>

    <section className="soft-section">
      <div className="wrap category-faq product-faq-section">
        <div><span className="section-label">Product questions</span><h2>{product.name} FAQ.</h2><p>Answers are limited to what this independent research page can responsibly verify.</p></div>
        <div className="faq-list">{research.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className="update-section">
      <div className="wrap update-layout">
        <div><span className="section-label">Review history</span><h2>Checked and dated.</h2></div>
        <ol className="update-log">{research.updates.map(([date, label, title, text]) => <li key={`${date}-${title}`}><time dateTime={date}>{label}</time><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </div>
    </section>

    <section className="section wrap product-route-section">
      <div className="reference-grid">
        <div><span className="section-label">Verified route + fallback</span><h2>Keep the match. Avoid a dead end.</h2></div>
        <div className="reference-copy">
          <p className="large-copy">The current detail route, its observed catalog label and a live-search fallback remain together on this page.</p>
          <p>The observed CNFansHP label was “{product.catalogLabel}”. Listing #{product.listingId} returned successfully on {CATALOG_REVIEW.label}; recheck the selected option after opening it.</p>
          <div className="reference-checks">
            {category.checklist.map((check, index) => <div key={check}><span>0{index + 1}</span><p>{check}</p></div>)}
          </div>
          <div className="inline-links"><a href={verifiedListing} target="_blank" rel="noopener noreferrer">Open listing #{product.listingId} <Arrow size={16}/></a><a href={liveSearch} target="_blank" rel="noopener noreferrer">Search CNFansHP <Arrow size={16}/></a><a href={`${DESTINATION}${category.destination}`} target="_blank" rel="noopener noreferrer">Browse live {product.category.toLowerCase()} <Arrow size={16}/></a></div>
        </div>
      </div>
    </section>

    <section className="soft-section product-related-section">
      <div className="wrap">
        <div className="section-heading compact"><div><span className="section-label">Continue researching</span><h2>Related checked references.</h2></div><Link className="text-link large" href="/products/">View all products <Arrow size={17}/></Link></div>
        <div className="related-product-grid">{relatedProducts.map((item) => <Link className="related-product-card" href={withTrailingSlash(`/products/${item.slug}`)} key={item.slug}><img src={item.image} alt={`${item.name} product reference`}/><div><small>{item.category}</small><h3>{item.name}</h3><span>Open research page <Arrow size={15}/></span></div></Link>)}</div>
      </div>
    </section>
  </>;
}
