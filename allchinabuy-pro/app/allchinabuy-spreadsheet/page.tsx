import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "AllChinaBuy Spreadsheet Alternative — Searchable Finds",
  description: "A searchable, mobile-friendly alternative to a static AllChinaBuy spreadsheet, with explained product routes and practical verification guides.",
  alternates: { canonical: `${SITE_URL}/allchinabuy-spreadsheet` },
};

export default function SpreadsheetPage() {
  return (
    <main id="main-content" className="inner-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AllChinaBuy spreadsheet alternative",
        url: `${SITE_URL}/allchinabuy-spreadsheet`,
        description: "A searchable directory alternative to a static product spreadsheet.",
      }} />
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">Spreadsheet alternative</p>
        <h1>Product routes without the mystery rows.</h1>
        <p>
          Looking for an AllChinaBuy spreadsheet? This independent directory uses searchable pages instead:
          each entry explains its destination, review date and the checks still left to you.
        </p>
        <div className="page-hero__actions">
          <Link className="button button--lime" href="/finds">Search the finds <span aria-hidden="true">→</span></Link>
          <Link className="button button--outline-dark" href="/guides/how-a-china-shopping-directory-works">How the directory works</Link>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Why searchable pages</p><h2>Context travels with every link.</h2></div>
          <p>A static sheet can be fast to scan, but it often loses explanation, source context and update history on a small screen.</p>
        </div>
        <div className="check-grid">
          <article><span>01</span><h3>Search by intent</h3><p>Filter product types and research prompts instead of hunting through unexplained rows.</p></article>
          <article><span>02</span><h3>Read the limits</h3><p>Every product entry pairs a source-listing image and item ID while keeping editorial artwork clearly separate.</p></article>
          <article><span>03</span><h3>Keep useful context</h3><p>Measurement, QC and shipping checks sit beside the route instead of in a forgotten note.</p></article>
          <article><span>04</span><h3>Verify live details</h3><p>The destination remains the source for current price, availability, seller information and terms.</p></article>
        </div>
      </section>
      <section className="prose-shell">
        <h2>Is this the official AllChinaBuy sheet?</h2>
        <p>
          No. AllChinaBuy Pro is independent from the official AllChinaBuy website and is not owned,
          sponsored or endorsed by AllChinaBuy. Product entries match public source images and item IDs to exact CNFansHP product pages;
          broad searches and category buttons open the corresponding CNFansHP catalogue pages. The site does
          not offer a downloadable spreadsheet and does not process transactions.
        </p>
        <h2>What belongs in a trustworthy finds directory?</h2>
        <p>
          Useful entries identify the product type, preserve a clear destination, show when the route was
          reviewed and avoid fabricated prices or popularity signals. They also tell readers what the page
          cannot establish—especially quality, stock, authenticity and final shipping cost.
        </p>
        <h2>How to begin</h2>
        <p>
          Open the <Link href="/finds">searchable finds index</Link>, choose a category, read the verification
          notes and then examine the live result. For a first order, use the <Link href="/guides/qc-photo-checklist">QC photo checklist</Link> and <Link href="/guides/shipping-cost-planning">shipping planner</Link> before building a larger parcel.
        </p>
      </section>
    </main>
  );
}
