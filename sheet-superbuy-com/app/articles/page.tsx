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
  title: "Superbuy Link Verification & Route Check Guides",
  description:
    "Independent Superbuy guides led by spreadsheet link verification, stale-route checks, warehouse evidence, parcel planning, and source-aware review methods.",
  path: "/articles/",
});

const articlesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Superbuy link verification and route check guides",
      url: `${SITE_URL}/articles/`,
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
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
          title="Superbuy Link Verification and Route Check Guides"
          intro="Four guides support the decisions after the click. Start with link verification, move through warehouse evidence and parcel cost, then use the independent review to test whether the workflow fits your needs and risk tolerance."
          aside="Official Superbuy statements are separated from independent recommendations and user-review themes. No article makes fixed promises about price, speed, quality, authenticity, or customs."
        />
        <section className="content-section shell">
          <div className="research-note research-note-wide">
            <span>EDITORIAL STANDARD · UPDATED 14 AUGUST 2026</span>
            <p>Platform facts were checked against current Superbuy official pages. The review article also compares Trustpilot, Google Play, Apple App Store, and Reddit themes without treating individual comments as representative proof.</p>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
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
            <li><strong>Independent review:</strong> compare official capabilities with recurring praise and complaints across several review sources.</li>
          </ol>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }} />
    </>
  );
}
