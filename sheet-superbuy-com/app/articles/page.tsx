import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PageHero, SiteFooter, SiteHeader } from "../components";
import { articles } from "../article-data";
import {
  SITE_URL,
  breadcrumbSchema,
  createPageMetadata,
} from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Superbuy Guides: Links, Sizing, QC & Shipping",
  description:
    "Independent Superbuy guides led by spreadsheet link verification, stale-route checks, warehouse evidence, parcel planning, and source-aware review methods.",
  path: "/articles/",
});

const prioritySlugs = ["superbuy-spreadsheet-links-not-working", "superbuy-qc-measurements-detailed-photos", "superbuy-shoe-size-guide", "superbuy-hoodie-size-guide"];
const displayedArticles = [...articles].sort((left, right) => {
  const leftIndex = prioritySlugs.indexOf(left.slug);
  const rightIndex = prioritySlugs.indexOf(right.slug);
  if (leftIndex === -1 && rightIndex === -1) return 0;
  if (leftIndex === -1) return 1;
  if (rightIndex === -1) return -1;
  return leftIndex - rightIndex;
});

const articlesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Superbuy link verification and route check guides",
      url: `${SITE_URL}/articles/`,
      numberOfItems: displayedArticles.length,
      itemListElement: displayedArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${SITE_URL}/articles/${article.slug}/`,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Verification guides", path: "/articles/" },
    ]),
  ],
};

export default function ArticlesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Research library"
          title="Superbuy Guides: Links, Sizing, QC & Shipping"
          intro={`${articles.length} guides support the decisions after the click. Start with link verification, move through warehouse evidence and parcel cost, then use destination and review guides for the decision in front of you.`}
          aside="Official Superbuy statements are separated from independent recommendations and user-review themes. No article makes fixed promises about price, speed, quality, authenticity, or customs."
        />
        <section className="content-section shell">
          <div className="research-note research-note-wide">
            <span>EDITORIAL UPDATE · 7 OCTOBER 2026</span>
            <p>Browse all guides below. New measurement examples are illustrative. Earlier destination-policy references retain their stated review dates; check current official rules before shipping.</p>
          </div>
          <div className="article-grid">
            {displayedArticles.map((article) => (
              <article className="article-card" key={article.slug}>
                <span>{article.topic} · {article.readingTime}</span>
                <h2>{article.title}</h2>
                <p>{article.deck}</p>
                <Link className="text-link" href={`/articles/${article.slug}/`}>Read full guide <ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </section>
        <section className="content-section content-shell article-order">
          <h2>Recommended reading order</h2>
          <ol className="checklist">
            <li><strong>Spreadsheet method:</strong> verify the live destination, preserve the exact option, and recognise stale rows before purchase.</li>
            <li><strong>QC evidence:</strong> match the warehouse item, ask for decision-changing measurements, and understand photo limits.</li>
            <li><strong>Shipping cost:</strong> compare actual and volumetric weight, packaging, route eligibility, customs, and landed cost.</li>
            <li><strong>Destination parcel plans:</strong> use the USA, UK, Netherlands, Canada, or Australia guide to add the correct local customs and delivery layer.</li>
            <li><strong>Delivery timeline:</strong> separate warehouse readiness, parcel processing, carrier movement, customs, and final-mile delivery.</li>
            <li><strong>Independent review:</strong> compare official capabilities with recurring praise and complaints across several review sources.</li>
          </ol>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }} />
    </>
  );
}
