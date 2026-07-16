import Link from "next/link";
import { Arrow } from "./Icons";
import StructuredData from "./StructuredData";
import { CATALOG_REVIEW, categories, DESTINATION, products, SITE_URL } from "@/app/data";
import { getLocalizedDepth } from "@/app/localizedDepth";
import { absoluteLocalizedUrl, localizeCategories, localizePath } from "@/app/i18n";
import { getLocalizedProduct, getLocalizedProductPageCopy } from "@/app/product-locales";
import { getProductPageCopy } from "@/app/products-copy";

function withSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

export default function LocalizedProductReference({ locale, slug }) {
  const sourceProduct = products.find((item) => item.slug === slug);
  if (!sourceProduct) return null;
  const product = getLocalizedProduct(sourceProduct, locale);
  const category = localizeCategories(categories, locale).find((item) => item.slug === product.categorySlug);
  if (!category) return null;

  const copy = getLocalizedProductPageCopy(locale);
  const directoryCopy = getProductPageCopy(locale);
  const depth = getLocalizedDepth(locale);
  const checks = depth.categoryChecks[product.categorySlug] || [];
  const verifiedListing = `${DESTINATION}${product.listingPath}`;
  const liveSearch = `${DESTINATION}/search.html?keywords=${encodeURIComponent(product.query)}&channelid=2&method=1`;
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3).map((item) => getLocalizedProduct(item, locale));
  const path = `/products/${product.slug}`;
  const productUrl = withSlash(absoluteLocalizedUrl(path, locale));
  const productImage = `${SITE_URL}${product.image}`;
  const faqs = copy.faqs(product.name, category.name);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${productUrl}#webpage`,
        name: product.name,
        url: productUrl,
        description: product.summary,
        dateModified: CATALOG_REVIEW.iso,
        inLanguage: locale,
        primaryImageOfPage: { "@type": "ImageObject", contentUrl: productImage, caption: product.name },
        breadcrumb: { "@id": `${productUrl}#breadcrumb` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.home, item: withSlash(absoluteLocalizedUrl("/", locale)) },
          { "@type": "ListItem", position: 2, name: copy.products, item: withSlash(absoluteLocalizedUrl("/products", locale)) },
          { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${productUrl}#faq`,
        inLanguage: locale,
        mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return <div lang={locale}>
    <StructuredData data={schema}/>
    <section className="product-reference-hero">
      <div className="product-reference-image"><img src={product.image} alt={`${product.name} — ${copy.checked}`}/></div>
      <div className="product-reference-copy">
        <span className="section-label">{category.name} / {copy.checked}</span>
        <h1>{product.name}</h1>
        <p>{product.summary}</p>
        <div className="hero-actions">
          <a className="button primary" href={verifiedListing} target="_blank" rel="noopener noreferrer">{copy.open} <Arrow/></a>
          <a className="button quiet" href={liveSearch} target="_blank" rel="noopener noreferrer">{copy.fallback}</a>
          <Link className="button quiet" href={localizePath(`/categories/${product.categorySlug}`, locale)}>{copy.categoryGuide} {category.name}</Link>
        </div>
        <span className="product-reference-note">#{product.listingId} · {directoryCopy.reviewedDate} · {copy.independent}</span>
      </div>
    </section>

    <section className="section wrap product-evidence-section">
      <div className="section-heading"><div><span className="section-label">{copy.evidenceLabel}</span><h2>{copy.evidenceTitle}</h2></div><p>{copy.evidenceIntro}</p></div>
      <div className="research-grid product-observation-grid">{product.features.map((text, index) => <article className="research-card" key={text}><span>0{index + 1}</span><h3>{category.name}</h3><p>{text}</p></article>)}</div>
      <div className="product-limit"><strong>{copy.limitTitle}</strong><p>{copy.limit(product.name)}</p></div>
    </section>

    <section className="soft-section product-research-section"><div className="wrap">
      <div className="section-heading"><div><span className="section-label">{copy.worksheetLabel}</span><h2>{copy.worksheetTitle}</h2></div><p>{copy.worksheetIntro}</p></div>
      <div className="research-table-wrap"><table className="research-table"><thead><tr>{copy.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>
        {checks.map((check) => <tr key={check}><th data-label={copy.headers[0]}>{check}</th><td data-label={copy.headers[1]}>{copy.record}</td><td data-label={copy.headers[2]}>{copy.use}</td></tr>)}
      </tbody></table></div><p className="table-note">{copy.tableNote}</p>
    </div></section>

    <section className="section wrap product-research-section">
      <div className="section-heading"><div><span className="section-label">{copy.qcLabel}</span><h2>{copy.qcTitle}</h2></div><p>{copy.qcIntro}</p></div>
      <div className="research-table-wrap"><table className="research-table"><thead><tr>{copy.qcHeaders.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>
        {product.features.map((feature) => <tr key={feature}><th data-label={copy.qcHeaders[0]}>{feature}</th><td data-label={copy.qcHeaders[1]}>{copy.qcEvidence}</td><td data-label={copy.qcHeaders[2]}>{copy.qcDecision}</td></tr>)}
      </tbody></table></div><div className="reference-disclosure">{copy.disclosure}</div>
    </section>

    <section className="product-decision-section"><div className="wrap product-decision-layout"><div><span className="section-label inverse">{copy.workflowLabel}</span><h2>{copy.workflowTitle}</h2><p>{copy.workflowIntro}</p></div><ol className="product-decision-list">{copy.workflow.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className="soft-section"><div className="wrap category-faq product-faq-section"><div><span className="section-label">{copy.faqLabel}</span><h2>{copy.faqTitle(product.name)}</h2><p>{copy.faqIntro}</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="update-section"><div className="wrap update-layout"><div><span className="section-label">{copy.historyLabel}</span><h2>{copy.historyTitle}</h2></div><ol className="update-log"><li><time dateTime={CATALOG_REVIEW.iso}>{directoryCopy.reviewedDate}</time><div><h3>{copy.updateTitle}</h3><p>{copy.updateText(product.listingId)}</p></div></li></ol></div></section>

    <section className="section wrap product-route-section"><div className="reference-grid"><div><span className="section-label">{copy.routeLabel}</span><h2>{copy.routeTitle}</h2></div><div className="reference-copy"><p className="large-copy">{copy.routeLead}</p><p>{copy.routeText(product.catalogLabel, product.listingId)}</p><div className="reference-checks">{checks.map((check, index) => <div key={check}><span>0{index + 1}</span><p>{check}</p></div>)}</div><div className="inline-links"><a href={verifiedListing} target="_blank" rel="noopener noreferrer">{copy.open} <Arrow size={16}/></a><a href={liveSearch} target="_blank" rel="noopener noreferrer">{copy.fallback} <Arrow size={16}/></a></div></div></div></section>

    <section className="soft-section product-related-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">{copy.related}</span><h2>{copy.relatedTitle}</h2></div><Link className="text-link large" href={localizePath("/products", locale)}>{copy.all} <Arrow size={17}/></Link></div><div className="related-product-grid">{relatedProducts.map((item) => <Link className="related-product-card" href={localizePath(`/products/${item.slug}`, locale)} key={item.slug}><img src={item.image} alt={item.name}/><div><small>{localizeCategories(categories, locale).find((entry) => entry.slug === item.categorySlug)?.name}</small><h3>{item.name}</h3><span>{copy.openResearch} <Arrow size={15}/></span></div></Link>)}</div></div></section>
  </div>;
}
