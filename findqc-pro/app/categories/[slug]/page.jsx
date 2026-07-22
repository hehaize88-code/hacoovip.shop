import Link from "../../../components/LocalizedLink";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import ProductCard from "../../../components/ProductCard";
import { ArrowIcon, CheckIcon, ExternalIcon } from "../../../components/Icons";
import T from "../../../components/LocalizedText";
import { categoryGuides } from "../../../lib/categoryGuides";
import { categories, products } from "../../../lib/data";
import { translate } from "../../../lib/i18n";
import { BUILD_LANGUAGE, languageUrl } from "../../../lib/routing";
import { localizedMetadata } from "../../../lib/seo";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  return localizedMetadata({
    title: `${category.name} Finds & QC Checklist`,
    description: `Browse ${category.name.toLowerCase()} finds and use a practical QC checklist for sizing, visible condition, measurements, details and packing before shipment.`,
  }, `/categories/${category.slug}`);
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const guide = categoryGuides[category.slug];
  const matches = products.filter((product) => product.category === category.slug);
  const categoryName = translate(BUILD_LANGUAGE, `category.${category.slug}.name`);
  const productName = (product) => {
    const key = `product.name.${product.id}`;
    const translated = translate(BUILD_LANGUAGE, key);
    return translated === key ? product.name : translated;
  };
  const categoryUrl = languageUrl(`/categories/${category.slug}`);
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${categoryUrl}#product-list`,
    name: `${categoryName}: ${translate(BUILD_LANGUAGE, "categoryDetail.matchingTitle")}`,
    url: categoryUrl,
    numberOfItems: matches.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: matches.map((product, index) => ({
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
      { "@type": "ListItem", position: 2, name: translate(BUILD_LANGUAGE, "nav.categories"), item: languageUrl("/categories") },
      { "@type": "ListItem", position: 3, name: categoryName, item: categoryUrl },
    ],
  };

  return (
    <div className="shell inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumbs items={[{ labelKey: "nav.categories", href: "/categories" }, { labelKey: `category.${category.slug}.name` }]} />
      <PageHero eyebrow={<>{category.code} / <T id={`category.${category.slug}.short`} /></>} title={<><T id={`category.${category.slug}.name`} /><br /><em><T id="categoryDetail.title2" /></em></>} intro={<T id={`category.${category.slug}.description`} />}>
        <a className="hero-source-link" href={category.href} target="_blank" rel="noopener noreferrer"><T id="categoryDetail.browse" /> <ExternalIcon /></a>
      </PageHero>

      <section className="category-detail-grid">
        <div>
          <div className="section-heading compact-heading"><div><span className="eyebrow"><T id="categoryDetail.matchingEyebrow" /></span><h2><T id="categoryDetail.matchingTitle" /></h2></div></div>
          <div className="product-grid category-products">
            {matches.length ? matches.map((product) => <ProductCard product={product} priority key={product.id} />) : <p><T id="categoryDetail.none" /></p>}
          </div>
        </div>
        <aside className="check-card">
          <span className="eyebrow light"><T id="categoryDetail.quickEyebrow" /></span>
          <h2><T id="categoryDetail.quickTitle" /></h2>
          <ol>{[1, 2, 3].map((number, index) => <li key={number}><span>0{index + 1}</span><p><T id={`category.${category.slug}.prompts.${number}`} /></p><CheckIcon /></li>)}</ol>
          <Link href="/guides/qc-photo-checklist"><T id="categoryDetail.complete" /> <ArrowIcon /></Link>
        </aside>
      </section>

      <article className="category-depth">
        <header className="depth-heading">
          <span className="eyebrow">Category field guide</span>
          <h2>How to review {category.name.toLowerCase()} before international shipping</h2>
          <p>Use the source listing, your recorded order options and the warehouse images together. The goal is to resolve visible, decision-relevant questions—not to turn photographs into a guarantee.</p>
        </header>

        <div className="category-overview">
          {guide.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <section className="buying-advice" aria-labelledby="buying-advice-title">
          <div className="depth-section-label">
            <span>01</span>
            <div><small>Buying advice</small><h2 id="buying-advice-title">Three decisions to make before approval</h2></div>
          </div>
          <div className="advice-grid">
            {guide.advice.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="category-review-grid" aria-labelledby="category-checklist-title">
          <div className="expanded-checklist">
            <span className="eyebrow">Visible QC checks</span>
            <h2 id="category-checklist-title">A six-point {category.name.toLowerCase()} review</h2>
            <ul>
              {guide.checks.map((item) => <li key={item}><CheckIcon size={17} /><span>{item}</span></li>)}
            </ul>
          </div>
          <aside className="decision-note">
            <span>02 / Decision rule</span>
            <h2>Ask for evidence that can change the decision.</h2>
            <p>{guide.decision}</p>
            <Link href="/guides/qc-photo-checklist">Open the complete seven-stage checklist <ArrowIcon size={16} /></Link>
          </aside>
        </section>

        <section className="category-faq" aria-labelledby="category-faq-title">
          <div className="depth-section-label">
            <span>03</span>
            <div><small>Common questions</small><h2 id="category-faq-title">What shoppers usually need to clarify</h2></div>
          </div>
          <div>
            {guide.faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="category-resource-links" aria-label="Related QC resources">
          <Link href="/guides/how-to-buy"><small>Step-by-step workflow</small><strong>How to buy more carefully</strong><ArrowIcon /></Link>
          <Link href="/articles/before-you-buy-qc-guide"><small>Long-form field note</small><strong>Read photos without false certainty</strong><ArrowIcon /></Link>
          <Link href="/products"><small>Mapped source pages</small><strong>Browse the current product shortlist</strong><ArrowIcon /></Link>
        </nav>
      </article>

      <section className="related-categories" aria-labelledby="related-category-title">
        <div className="section-heading compact-heading">
          <div>
            <span className="eyebrow"><T id="home.browseType" /></span>
            <h2 id="related-category-title"><T id="home.startCategory" /></h2>
          </div>
          <Link href="/categories" className="text-link"><T id="home.allCategories" /> <ArrowIcon /></Link>
        </div>
        <div className="related-category-links">
          {categories.filter((item) => item.slug !== category.slug).map((item) => (
            <Link href={`/categories/${item.slug}`} key={item.slug}>
              <span>{item.code}</span>
              <strong><T id={`category.${item.slug}.name`} /></strong>
              <ArrowIcon size={15} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
