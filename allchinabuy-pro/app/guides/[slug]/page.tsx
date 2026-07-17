import type { Metadata } from "next";
import Image from "next/image";
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
      images: [{ url: `${SITE_URL}${guide.figure.src}`, width: 1600, height: 900, alt: guide.figure.alt }],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const relatedGuides = guide.relatedSlugs
    .map((relatedSlug) => getGuide(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

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
            image: `${SITE_URL}${guide.figure.src}`,
            isBasedOn: guide.sources.map((source) => source.url),
            mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
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
          <div className="article-meta"><span>{guide.readingTime}</span><span>Fact-checked {guide.updated}</span><span>{guide.sources.length} official source{guide.sources.length === 1 ? "" : "s"}</span></div>
        </header>
        <div className="article-figure-wrap">
          <figure className="article-figure">
            <Image src={guide.figure.src} alt={guide.figure.alt} width={1600} height={900} priority />
            <figcaption>{guide.figure.caption} <a href={guide.figure.sourceUrl} rel="noreferrer" target="_blank">Open the official page ↗</a></figcaption>
          </figure>
        </div>
        <div className="prose-shell prose-shell--guide">
          <aside className="research-note" aria-labelledby="research-note-title">
            <p className="eyebrow" id="research-note-title">Research standard</p>
            <p>We checked AllChinaBuy’s public English mobile pages on {guide.updated}. Platform facts are linked below. Variable fees, routes, deadlines and account-only terms must be confirmed on the current live order.</p>
          </aside>
          <section className="key-facts" aria-labelledby="key-facts-title">
            <p className="eyebrow">Verified on the public interface</p>
            <h2 id="key-facts-title">Three facts to carry forward</h2>
            <ol>
              {guide.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}
            </ol>
          </section>
          {guide.sections.map((section, index) => (
            <section key={section.title}>
              <p className="eyebrow">Section {String(index + 1).padStart(2, "0")}</p>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.checklist && (
                <ul className="article-checklist">
                  {section.checklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.takeaway && <div className="article-takeaway"><strong>Practical takeaway</strong><p>{section.takeaway}</p></div>}
            </section>
          ))}
          <section className="source-list" aria-labelledby="source-list-title">
            <p className="eyebrow">Primary evidence</p>
            <h2 id="source-list-title">Official pages checked</h2>
            <p>These links go to AllChinaBuy’s public mobile website. Dynamic content, logged-in prices and availability can change after our review date.</p>
            <ol>
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">{source.title} ↗</a>
                  <span>{source.scope}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
      <section className="related-guides" aria-labelledby="related-guides-title">
        <div className="section-heading">
          <div><p className="eyebrow">Continue the research</p><h2 id="related-guides-title">Related fact-checked guides.</h2></div>
        </div>
        <div className="related-guides__grid">
          {relatedGuides.map((related) => (
            <article key={related.slug}>
              <p className="eyebrow">{related.eyebrow}</p>
              <h3><Link href={`/guides/${related.slug}`}>{related.title}</Link></h3>
              <p>{related.description}</p>
              <Link className="text-link" href={`/guides/${related.slug}`}>Read guide <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="page-cta">
        <div><p className="eyebrow">Use current data</p><h2>Check the live official page before you pay.</h2></div>
        <a className="button button--lime" href={guide.sources[0].url} rel="noreferrer" target="_blank">Open official source <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
