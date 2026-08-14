import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, SiteFooter, SiteHeader } from "../../components";
import { articles, getArticle } from "../../article-data";

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
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.deck };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const visual = articleVisuals[article.slug];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.deck,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "SheetSuperbuy editorial" },
    publisher: { "@type": "Organization", name: "SheetSuperbuy" },
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
            <p>Use the live destination for current listing details, then return to the QC and shipping guides before submitting an international parcel.</p>
          </div>
          <Link className="button button-secondary" href="/articles">Back to all articles <ArrowIcon /></Link>
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
