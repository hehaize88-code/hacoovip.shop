import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import ProductCard from "../../../components/ProductCard";
import { ArrowIcon, CheckIcon, ExternalIcon } from "../../../components/Icons";
import T from "../../../components/LocalizedText";
import { categories, products } from "../../../lib/data";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Finds & QC Guide`,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const matches = products.filter((product) => product.category === category.slug);

  return (
    <div className="shell inner-page">
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
    </div>
  );
}
