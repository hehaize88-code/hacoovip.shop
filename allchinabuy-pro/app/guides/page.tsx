import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { guides, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "China Shopping Guides",
  description: "Practical, independent guides to product links, QC photographs, measurements and international shipping planning.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesPage() {
  return (
    <main id="main-content" className="inner-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "AllChinaBuy Pro shopping guides",
        url: `${SITE_URL}/guides`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `${SITE_URL}/guides/${guide.slug}`,
          })),
        },
      }} />
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">Practical reading</p>
        <h1>Guides that answer the next question.</h1>
        <p>Original explainers for navigating product routes, reading warehouse photographs and planning an international parcel.</p>
      </section>
      <section className="content-section">
        <div className="guide-list">
          {guides.map((guide, index) => (
            <article className="guide-card" key={guide.slug}>
              <span className="guide-card__index">0{index + 1}</span>
              <p className="eyebrow">{guide.eyebrow}</p>
              <h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2>
              <p>{guide.description}</p>
              <div><span>{guide.readingTime}</span><Link href={`/guides/${guide.slug}`} aria-label={`Read ${guide.title}`}>↗</Link></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
