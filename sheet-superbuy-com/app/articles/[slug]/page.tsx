import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, SiteFooter, SiteHeader } from "../../components";
import { articles, getArticle } from "../../article-data";
import {
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  absoluteUrl,
  breadcrumbSchema,
  createPageMetadata,
} from "../../seo";

const articleVisuals: Record<string, {
  label: string;
  caption: string;
  cells: { code: string; title: string; text: string }[];
}> = {
  "how-to-use-a-superbuy-spreadsheet": {
    label: "ROUTE CHECK · THREE EVIDENCE LAYERS",
    caption: "A spreadsheet starts discovery; the live listing and warehouse record support the purchase decision.",
    cells: [
      { code: "01", title: "Sheet row", text: "Find the candidate and note the check date." },
      { code: "02", title: "Live listing", text: "Verify the seller, option, price, and domestic delivery." },
      { code: "03", title: "Warehouse", text: "Compare the received item before parcel submission." },
    ],
  },
  "superbuy-qc-photos-checklist": {
    label: "QC EVIDENCE · REVIEW ORDER",
    caption: "Move from identity to condition to a recorded ship-or-correct decision.",
    cells: [
      { code: "01", title: "Match", text: "Quantity, model, colour, size, and included pieces." },
      { code: "02", title: "Inspect", text: "Overall form, surfaces, seams, closures, and measurements." },
      { code: "03", title: "Decide", text: "Ship, hold, request evidence, return, or exchange." },
    ],
  },
  "superbuy-shipping-cost-guide": {
    label: "LANDED COST · BUILD THE WHOLE NUMBER",
    caption: "Do not let a low product price hide the later parcel and destination layers.",
    cells: [
      { code: "01", title: "Warehouse", text: "Product, domestic delivery, and applicable services." },
      { code: "02", title: "Parcel", text: "Packed weight, dimensions, route, and protection." },
      { code: "03", title: "Destination", text: "Tax, duty, brokerage, handling, and last mile." },
    ],
  },
  "superbuy-review-2026": {
    label: "REVIEW METHOD · KEEP SOURCES SEPARATE",
    caption: "No single star score predicts a parcel; each source answers a different question.",
    cells: [
      { code: "FACT", title: "Official pages", text: "Services, fees, workflow, limits, and terms." },
      { code: "THEME", title: "User feedback", text: "Trustpilot, Google Play, App Store, and Reddit patterns." },
      { code: "ADVICE", title: "Editorial test", text: "What the combined evidence supports—and what it does not." },
    ],
  },
  "superbuy-shipping-to-usa": {
    label: "USA PARCEL PLAN · THREE DECISIONS",
    caption: "Estimate the packed parcel, compare only eligible lines, and preserve an accurate import record.",
    cells: [
      { code: "01", title: "Measure", text: "Actual weight, packed dimensions, and route divisor." },
      { code: "02", title: "Compare", text: "Eligible line terms, tracking, protection, and total quote." },
      { code: "03", title: "Document", text: "Contents, value, payment, parcel, and carrier records." },
    ],
  },
  "superbuy-shipping-to-netherlands": {
    label: "NETHERLANDS PARCEL · COST AND IMPORT CHECK",
    caption: "Compare the packed parcel, the eligible line, and the Dutch import record as separate decisions.",
    cells: [
      { code: "01", title: "Measure", text: "Use final dimensions and the line-specific divisor." },
      { code: "02", title: "Classify", text: "Keep product types, values, and records consistent." },
      { code: "03", title: "Recheck", text: "Apply the customs rules effective when the parcel imports." },
    ],
  },
  "superbuy-shipping-to-uk": {
    label: "UK PARCEL · THREE CONTROL POINTS",
    caption: "The destination, chargeable weight, and declaration must describe the same shipment.",
    cells: [
      { code: "01", title: "Region", text: "Confirm Great Britain or Northern Ireland and the full postcode." },
      { code: "02", title: "Weight", text: "Compare actual and volumetric weight after packing." },
      { code: "03", title: "Evidence", text: "Retain values, declarations, tax notices, and carrier records." },
    ],
  },
  "superbuy-shipping-to-australia": {
    label: "AUSTRALIA PARCEL · PLAN BEFORE SUBMIT",
    caption: "Check line eligibility, biosecurity, and the final packed measurements before payment.",
    cells: [
      { code: "01", title: "Pack", text: "Balance protection with dimensional-weight exposure." },
      { code: "02", title: "Screen", text: "Check restricted goods and biosecurity requirements." },
      { code: "03", title: "Record", text: "Preserve values, GST evidence, tracking, and border notices." },
    ],
  },
  "superbuy-shipping-to-canada": {
    label: "CANADA PARCEL · MEASURE, DECLARE, DELIVER",
    caption: "Use live line data and a consistent customs record instead of an old public rate example.",
    cells: [
      { code: "01", title: "Measure", text: "Calculate chargeable weight under each live line's rule." },
      { code: "02", title: "Declare", text: "Use accurate descriptions, quantities, origins, and values." },
      { code: "03", title: "Follow", text: "Track customs, courier handoff, charges, and final delivery." },
    ],
  },
  "how-long-does-superbuy-shipping-take": {
    label: "DELIVERY TIME · SIX SEPARATE STAGES",
    caption: "A realistic timeline starts before carrier transit and continues through customs and final mile.",
    cells: [
      { code: "01", title: "Warehouse", text: "Seller dispatch, intake, inspection, and item readiness." },
      { code: "02", title: "Transit", text: "Parcel processing, handover, and international movement." },
      { code: "03", title: "Destination", text: "Customs clearance, local carrier, and final delivery." },
    ],
  },
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = `/articles/${article.slug}/`;
  const canonical = absoluteUrl(path);
  const metadata = createPageMetadata({
    title: article.title,
    description: article.deck,
    path,
  });

  return {
    ...metadata,
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: SITE_NAME,
      title: article.title,
      description: article.deck,
      url: canonical,
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [`${SITE_NAME} editorial`],
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 756,
          height: 126,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const visual = articleVisuals[article.slug];
  const articleUrl = `${SITE_URL}/articles/${article.slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.deck,
        url: articleUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        image: [SOCIAL_IMAGE],
        datePublished: article.date,
        dateModified: article.date,
        author: { "@type": "Organization", name: "SheetSuperbuy editorial" },
        publisher: {
          "@type": "Organization",
          name: "Sheet Superbuy",
          url: `${SITE_URL}/`,
          logo: { "@type": "ImageObject", url: SOCIAL_IMAGE },
        },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Verification guides", path: "/articles/" },
        { name: article.title, path: `/articles/${article.slug}/` },
      ]),
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="shell article-layout">
        <article className="article-body">
          <p className="eyebrow plain">{article.topic}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.deck}</p>
          <div className="article-meta"><span>Updated {article.updated}</span><span>{article.readingTime}</span><span>Independent guide</span></div>
          {visual && (
            <figure className="article-visual">
              <div className="article-visual-label">{visual.label}</div>
              <div className="article-visual-grid">
                {visual.cells.map((cell) => (
                  <div key={cell.code}>
                    <span>{cell.code}</span>
                    <strong>{cell.title}</strong>
                    <p>{cell.text}</p>
                  </div>
                ))}
              </div>
              <figcaption>{visual.caption}</figcaption>
            </figure>
          )}
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
          <div className="callout">
            <strong>Keep researching</strong>
            <p>Use the live destination for current listing details, then return to the <Link href="/qc-guide/">QC checklist</Link> and <Link href="/shipping/">shipping calculator</Link> before submitting an international parcel.</p>
          </div>
          <Link className="button button-secondary" href="/articles/">Back to all articles <ArrowIcon /></Link>
        </article>
        <aside className="article-aside">
          <strong>In this guide</strong>
          {article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
        </aside>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
