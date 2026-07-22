import Link from "../../../components/LocalizedLink";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import { ArrowIcon, CheckIcon, ExternalIcon } from "../../../components/Icons";
import T from "../../../components/LocalizedText";
import { categories } from "../../../lib/data";
import { localizedMetadata } from "../../../lib/seo";

export const metadata = localizedMetadata({
  title: "7-Step QC Photo Checklist Before Shipping",
  description: "Use a practical seven-stage checklist to compare order details, condition, construction, labels, measurements and packing in warehouse QC photos.",
}, "/guides/qc-photo-checklist");

export default function ChecklistPage() {
  return (
    <article className="shell inner-page guide-article expanded-guide">
      <Breadcrumbs items={[{ labelKey: "nav.guides", href: "/guides" }, { labelKey: "checklist.crumb" }]} />
      <PageHero eyebrow={<T id="checklist.eyebrow" />} title={<><T id="checklist.title1" /><br /><em><T id="checklist.title2" /></em></>} intro={<T id="checklist.intro" />} />

      <section className="guide-source-note" aria-label="Evidence boundary">
        <div><span>Official FindQC boundary</span><strong>QC records are reference material, not authentication.</strong></div>
        <p>FindQC’s current Terms say its QC photos, weight, dimensions and defect records generally come from third-party agents. The platform organises this information but does not guarantee that it is complete, accurate or authentic. Use public records to learn what to inspect, then make the shipment decision from the evidence for your own order.</p>
        <a href="https://findqc.com/terms-of-service" target="_blank" rel="noopener noreferrer">Read the official Terms <ExternalIcon size={16} /></a>
      </section>

      <section className="before-review" aria-labelledby="before-review-title">
        <div className="depth-section-label">
          <span>00</span>
          <div><small>Prepare the comparison</small><h2 id="before-review-title">Open three things before you inspect a single pixel.</h2></div>
        </div>
        <div>
          <article><span>01</span><h3>Your order record</h3><p>Keep the product URL, item ID, selected colour, size, version, quantity and requested extras together. A screenshot helps when a live listing later changes, but the written option name is still important.</p></article>
          <article><span>02</span><h3>The source listing</h3><p>Check the current option list, seller chart, product details and explicitly included parts. Seller images are references; edited lighting, styling and perspective may differ from warehouse photographs.</p></article>
          <article><span>03</span><h3>Your decision questions</h3><p>Write down what would make you approve, request evidence or resolve a mismatch. This prevents an endless search for tiny cosmetic differences that would not change the decision.</p></article>
        </div>
      </section>

      <div className="article-layout">
        <aside className="article-aside">
          <div><span><T id="checklist.useWhen" /></span><p><T id="checklist.useWhenText" /></p></div>
          <div><span><T id="checklist.keepInMind" /></span><p><T id="checklist.keepInMindText" /></p></div>
          <div><span>Useful sequence</span><p>Identity → condition → shape → construction → labels → measurements → packing.</p></div>
          <Link href="/products"><T id="checklist.findProduct" /> <ArrowIcon /></Link>
        </aside>
        <div className="stage-list">
          {[1, 2, 3, 4, 5, 6, 7].map((number, index) => (
            <section key={number}>
              <span className="stage-no">0{index + 1}</span>
              <div><h2><T id={`checklist.stages.${number}.title`} /></h2><p><T id={`checklist.stages.${number}.text`} /></p></div>
              <CheckIcon size={24} />
            </section>
          ))}
          <div className="article-callout"><strong><T id="checklist.calloutTitle" /></strong><p><T id="checklist.calloutText" /></p></div>
        </div>
      </div>

      <section className="evidence-requests" aria-labelledby="evidence-request-title">
        <div className="depth-section-label">
          <span>08</span>
          <div><small>Better follow-up</small><h2 id="evidence-request-title">Turn an uncertain impression into a precise request.</h2></div>
        </div>
        <div>
          <article><small>Instead of</small><h3>“The size looks wrong.”</h3><p>Ask for a named measurement with visible endpoints: “Please measure the flat chest width from one underarm seam to the other.”</p></article>
          <article><small>Instead of</small><h3>“The shoe looks crooked.”</h3><p>Ask for both shoes together in a straight heel or overhead view so camera distance and angle are comparable.</p></article>
          <article><small>Instead of</small><h3>“Please send more photos.”</h3><p>Name the missing evidence: a close-up of the left heel join, the interior label, the connector marking or every included component.</p></article>
        </div>
      </section>

      <section className="decision-framework" aria-labelledby="decision-framework-title">
        <header><span className="eyebrow light">A three-outcome review</span><h2 id="decision-framework-title">End the checklist with a written decision.</h2><p>A short conclusion keeps the process consistent and makes support messages easier to understand.</p></header>
        <div>
          <article><span>01</span><h3>Approve visible details</h3><p>The ordered option, condition, measurements and included parts are consistent enough for you to accept the remaining uncertainty.</p></article>
          <article><span>02</span><h3>Request one missing fact</h3><p>A decision-relevant area is absent or unclear, and a specific image, measurement or offered test could resolve it.</p></article>
          <article><span>03</span><h3>Resolve a mismatch</h3><p>The evidence shows a wrong option, missing part, significant damage or measurement difference that should be handled before shipment.</p></article>
        </div>
      </section>

      <section className="guide-category-links" aria-labelledby="guide-category-title">
        <div className="section-heading compact-heading"><div><span className="eyebrow">Category detail</span><h2 id="guide-category-title">Apply the checklist to the product type.</h2></div><Link href="/categories" className="text-link">All category guides <ArrowIcon /></Link></div>
        <div>
          {categories.map((category) => <Link href={`/categories/${category.slug}`} key={category.slug}><span>{category.code}</span><strong>{category.name}</strong><ArrowIcon size={15} /></Link>)}
        </div>
      </section>

      <nav className="guide-next-links" aria-label="Continue reading">
        <Link href="/guides/how-to-buy"><small>Next guide</small><strong>Connect product search to shipment approval</strong><ArrowIcon /></Link>
        <Link href="/articles/before-you-buy-qc-guide"><small>Longer explanation</small><strong>How to read warehouse photos without overreading them</strong><ArrowIcon /></Link>
      </nav>
    </article>
  );
}
