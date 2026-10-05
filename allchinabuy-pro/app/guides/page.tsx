import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { guides, SITE_URL } from "@/lib/content";
import { buildPageMetadata, socialCard } from "@/lib/metadata";
import { PlatformStatus } from "@/components/PlatformStatus";

export const metadata: Metadata = buildPageMetadata({
  title: "AllChinaBuy Guides: Tracking, QC, Refunds and Shipping",
  description: "Read 21 AllChinaBuy guides covering maintenance, tracking, returns, shoe sizing, QC photos, shipping costs and product discovery.",
  path: "/guides",
  image: socialCard("guides", "AllChinaBuy Pro fact-checked guides share card"),
});

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
        <p className="eyebrow">{guides.length} practical guides</p>
        <h1>AllChinaBuy guides for your next decision.</h1>
        <p>Find help with product discovery, QC photos, shoe measurements, tracking and after-sales records. Each guide separates dated platform evidence from practical editorial advice.</p>
        <ul className="page-hero__facts">
          <li>Sources and review dates identified</li>
          <li>Latest editorial update October 5, 2026</li>
          <li>No invented fees or delivery promises</li>
        </ul>
      </section>
      <PlatformStatus />
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
