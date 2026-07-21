import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import { ArrowIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";
import { categories } from "../../lib/data";

export const metadata = {
  title: "Product Categories",
  description: "Browse product categories and use focused QC prompts for shoes, clothing, accessories, jerseys and electronics.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="shell inner-page">
      <Breadcrumbs items={[{ labelKey: "nav.categories" }]} />
      <PageHero eyebrow={<T id="categories.eyebrow" />} title={<><T id="categories.title1" /><br /><em><T id="categories.title2" /></em></>} intro={<T id="categories.intro" />} />
      <section className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.slug}>
            <div className="category-card-top"><span>{category.code}</span><small><T id={`category.${category.slug}.short`} /></small></div>
            <h2><T id={`category.${category.slug}.name`} /></h2>
            <p><T id={`category.${category.slug}.description`} /></p>
            <div className="category-actions">
              <Link href={`/categories/${category.slug}`}><T id="categories.openGuide" /> <ArrowIcon size={16} /></Link>
              <Link href={`/categories/${category.slug}`} aria-label={`Open the ${category.name} category guide`}><ArrowIcon size={16} /></Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
