import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { guides, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fact-Checked AllChinaBuy Guides",
  description: "Independent, source-linked guides to the AllChinaBuy order flow, QC photos, warehouse packing, shipping restrictions and freight planning.",
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
        <p className="eyebrow">{guides.length} source-linked guides</p>
        <h1>AllChinaBuy research you can audit.</h1>
        <p>We checked AllChinaBuy’s public English mobile pages and turned the visible rules into practical workflows. Every article names its official sources, review date and evidence limits.</p>
        <ul className="page-hero__facts">
          <li>Official pages linked</li>
          <li>Fact-checked July 17, 2026</li>
          <li>No invented fees or delivery promises</li>
        </ul>
      </section>
      <section className="content-section">
        <div className="guide-list">
          {guides.map((guide, index) => (
            <article className="guide-card" key={guide.slug}>
              <span className="guide-card__index">{String(index + 1).padStart(2, "0")}</span>
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
