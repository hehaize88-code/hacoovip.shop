import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides, SITE_URL } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found", robots: { index: false, follow: false } };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/guides/${guide.slug}`,
      title: guide.title,
      description: guide.description,
      modifiedTime: "2026-07-17",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <main id="main-content" className="inner-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            url: `${SITE_URL}/guides/${guide.slug}`,
            datePublished: "2026-07-17",
            dateModified: "2026-07-17",
            author: { "@type": "Organization", name: "AllChinaBuy Pro Editorial" },
            publisher: { "@type": "Organization", name: "AllChinaBuy Pro" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
              { "@type": "ListItem", position: 3, name: guide.title, item: `${SITE_URL}/guides/${guide.slug}` },
            ],
          },
        ],
      }} />
      <article>
        <header className="page-hero page-hero--plain">
          <div className="breadcrumb"><Link href="/guides">Guides</Link> / {guide.eyebrow}</div>
          <p className="eyebrow">{guide.eyebrow}</p>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <div className="article-meta"><span>{guide.readingTime}</span><span>Reviewed {guide.updated}</span><span>Independent editorial guide</span></div>
        </header>
        <div className="prose-shell">
          <div className="callout"><p>This guide is educational. Check current platform rules, shipping restrictions and destination requirements before making a purchase.</p></div>
          {guide.sections.map((section, index) => (
            <section key={section.title}>
              <p className="eyebrow">Step {String(index + 1).padStart(2, "0")}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </article>
      <section className="page-cta">
        <div><p className="eyebrow">Put it into practice</p><h2>Browse a route, then verify the live listing.</h2></div>
        <Link className="button button--lime" href="/finds">Browse finds <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
