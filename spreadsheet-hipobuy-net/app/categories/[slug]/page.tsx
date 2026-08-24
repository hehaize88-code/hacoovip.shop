import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogCategories, getCatalogCategory, imageHref, productHref, productsForCategory, usdReference } from "../../catalog-data";
import { InnerHero, SiteChrome } from "../../site-chrome";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCatalogCategory(slug);
  if (!category) return {};
  return {
    title: `${category.searchLabel} 2026: Checked Product Links`,
    description: `${category.intro} Ten links checked on 24 August 2026.`,
    alternates: { canonical: `/categories/${category.slug}/` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCatalogCategory(slug);
  if (!category) notFound();
  const products = productsForCategory(category.slug);
  const canonical = `https://spreadsheet-hipobuy.net/categories/${category.slug}/`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://spreadsheet-hipobuy.net/" },
        { "@type": "ListItem", position: 2, name: "Categories", item: "https://spreadsheet-hipobuy.net/categories/" },
        { "@type": "ListItem", position: 3, name: category.name, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.searchLabel,
      url: canonical,
      description: category.intro,
      dateModified: "2026-08-24",
      isPartOf: { "@type": "WebSite", name: "Hipobuy Sheet", url: "https://spreadsheet-hipobuy.net/" },
    },
  ];

  return <SiteChrome><main className="inner-main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><InnerHero eyebrow="Category link verification · checked 24 Aug 2026" title={`${category.name} finds: 10 checked product rows.`} intro={category.intro}/><section className="category-row-cards" aria-label={`${category.name} checked products`}>{products.map(product=><article key={product.id}><a className="category-row-image" href={productHref(product.id)} target="_blank" rel="noopener noreferrer"><img src={imageHref(product.image)} alt={product.name} loading="lazy"/><span>LINK CHECKED</span></a><div><small>HB-{product.id} · 24 AUG 2026</small><h2>{product.name}</h2><p><strong>{usdReference(product.cny)}</strong><span>¥{product.cny} dated source snapshot</span></p><a href={productHref(product.id)} target="_blank" rel="noopener noreferrer">Open exact product <b>↗</b></a></div></article>)}</section><section className="category-checklist"><div><span>BEFORE YOU BUY</span><h2>Verify the option, then inspect the received item.</h2><p>A checked URL proves only that the destination responded during this review. It does not verify stock, seller claims, authenticity, final price or shipping eligibility.</p></div><ol>{category.checklist.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol></section><section className="category-method"><h2>How this category is maintained</h2><p>The 10 rows above were read from server-visible catalogue pages and each exact product destination returned HTTP 200 on 24 August 2026. The USD figure is a dated reference conversion from the displayed CNY amount. Before payment, open the live page and confirm the selected variation and current price. If a later check finds a missing destination, the row should be marked unavailable or removed rather than left as “checked.”</p><nav><a href="/spreadsheet/">Search all 60 rows →</a><a href="/qc-guide/">Use the QC checklist →</a><a href="/shipping/">Plan shipping inputs →</a></nav></section></main></SiteChrome>;
}
