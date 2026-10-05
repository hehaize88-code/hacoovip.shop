import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guides, SITE_URL } from "@/lib/content";
import { buildPageMetadata, guideSocialCard } from "@/lib/metadata";
import { PlatformStatus } from "@/components/PlatformStatus";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found", robots: { index: false, follow: false } };
  const metadata = buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    modifiedTime: guide.modifiedDate ?? "2026-07-17",
    image: guideSocialCard(guide.figure.src, guide.figure.alt),
  });
  if (guide.publishedDate) metadata.title = { absolute: guide.title };
  return metadata;
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const relatedGuides = guide.relatedSlugs
    .map((relatedSlug) => getGuide(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const publishedDate = guide.publishedDate ?? "2026-07-17";
  const modifiedDate = guide.modifiedDate ?? "2026-07-17";

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
            datePublished: publishedDate,
            dateModified: modifiedDate,
            author: { "@type": "Organization", name: "AllChinaBuy Pro Editorial", url: `${SITE_URL}/about/`, logo: `${SITE_URL}/logo-allchinabuy.png` },
            publisher: { "@type": "Organization", name: "AllChinaBuy Pro", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-allchinabuy.png` } },
            inLanguage: "en",
            image: `${SITE_URL}${guide.figure.src}`,
            ...(!guide.hideSourceLinks && { isBasedOn: guide.sources.map((source) => source.url) }),
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
          <div className="article-meta"><span>{guide.readingTime}</span><span>Updated {guide.modifiedDate ?? guide.updated}</span><span>AllChinaBuy Pro Editorial</span></div>
        </header>
        {guide.slug !== "allchinabuy-website-status-maintenance" && <PlatformStatus />}
        <div className="article-figure-wrap">
          <figure className="article-figure">
            <Image src={guide.figure.src} alt={guide.figure.alt} width={1600} height={900} priority />
            <figcaption>
              {guide.figure.caption}{" "}
            </figcaption>
          </figure>
        </div>
        <div className="prose-shell prose-shell--guide">
          <aside className="research-note" aria-labelledby="research-note-title">
            <p className="eyebrow" id="research-note-title">Research standard</p>
            <p>{guide.evidenceNote ?? `The platform descriptions cited in this guide were reviewed on ${guide.updated}. They are dated reference material, not confirmation that the services are available during the current maintenance period. Recheck current fees, routes, deadlines and account terms before acting.`}</p>
          </aside>
          <nav className="article-toc" aria-label="Article contents"><strong>In this guide</strong><ol>{guide.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 1}`}>{section.title}</a></li>)}</ol></nav>
          <section className="key-facts" aria-labelledby="key-facts-title">
            <p className="eyebrow">Key points</p>
            <h2 id="key-facts-title">Before you begin</h2>
            <ol>
              {guide.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}
            </ol>
          </section>
          {guide.sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`}>
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
          {guide.slug === "qc-photo-checklist" && <section className="qc-worked-example">
            <h2>A practical QC record: observation, evidence and action</h2>
            <p>Use this editorial example to turn a general QC check into a specific decision. These are hypothetical situations, not customer results or photographs of a tested product.</p>
            <div className="table-wrap"><table><thead><tr><th>Visible observation</th><th>Evidence to request</th><th>Next action</th></tr></thead><tbody>
              <tr><td>The ordered size and photographed label differ.</td><td>Order option and readable labels from both shoes.</td><td>Clarify the item identity before approving shipment.</td></tr>
              <tr><td>A shirt looks narrower than expected.</td><td>Flat chest width, armpit seam to armpit seam, in centimetres.</td><td>Compare the same method with a well-fitting garment.</td></tr>
              <tr><td>A seam appears open in a distant photo.</td><td>A close view plus an overview locating the seam.</td><td>Describe the visible opening; check the actual after-sales options.</td></tr>
            </tbody></table></div>
            <p>Record the original picture, your exact request, the response and the decision separately. For footwear, use the <Link href="/guides/allchinabuy-shoe-sizing-insole-qc/">shoe sizing and insole measurement guide</Link>. For an unresolved mismatch, read the <Link href="/guides/allchinabuy-return-refund-stages/">return and refund stages</Link> before international packing.</p>
          </section>}
          {guide.slug === "shipping-cost-planning" && <section>
            <h2>A weight comparison you can reproduce</h2>
            <p>For illustration only, a carton measuring 40 × 30 × 20 cm has a volume of 24,000 cubic centimetres. With a hypothetical divisor of 5,000, its volumetric weight is 4.8 kg. If its scale weight is 3 kg, a line charging the higher of those two values would start from 4.8 kg before its own rounding rules. This is a calculation example, not a current route quote or confirmation that a line is available.</p>
            <p>Write the selected line’s actual divisor, minimum charge, rounding and surcharges beside your measurements. Recalculate only after the parcel configuration is known. The <Link href="/guides/allchinabuy-shipping-to-usa/">USA shipping guide</Link> separates parcel planning from destination rules; the <Link href="/guides/allchinabuy-tracking-not-updating/">tracking guide</Link> explains what to save after dispatch.</p>
          </section>}
          <section className="source-list" aria-labelledby="source-list-title">
            <p className="eyebrow">Primary evidence</p>
            <h2 id="source-list-title">Sources and evidence limits</h2>
            <p>Source names and their scope are recorded below. The review date matters: historical service descriptions do not establish current availability, account terms or the outcome of an individual order.</p>
            <ol>
              {guide.sources.map((source) => (
                <li key={`${source.title}-${source.url}`}>
                  <strong>{source.title}</strong>
                  <span>{source.scope}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
      <section className="related-guides" aria-labelledby="related-guides-title">
        <div className="section-heading">
          <div><p className="eyebrow">Continue the research</p><h2 id="related-guides-title">Related buying guides.</h2></div>
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
        <div><p className="eyebrow">Continue your research</p><h2>Compare product finds and keep the evidence.</h2></div>
        <Link className="button button--lime" href="/allchinabuy-spreadsheet/">Browse the product directory</Link>
      </section>
    </main>
  );
}
