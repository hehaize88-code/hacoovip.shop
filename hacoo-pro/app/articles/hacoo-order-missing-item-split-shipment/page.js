import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow } from "@/components/Icons";
import { SITE_URL } from "../../data";
import { createPageMetadata } from "../../seo";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../../schema";
import { getArticle } from "../data";

const article = getArticle("hacoo-order-missing-item-split-shipment");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo Order Missing an Item: Split-Shipment Checklist",
  description: article.description,
  path,
  alternates: { canonical: path, languages: { en: path, "x-default": path } },
  type: "article",
  image: { url: imageUrl, width: article.image.width, height: article.image.height, alt: article.image.alt },
});

export default function HacooMissingItemArticle() {
  const breadcrumb = createBreadcrumbList({
    path,
    items: [
      { name: "Home", path: "/" },
      { name: "Articles", path: "/articles" },
      { name: article.title, path },
    ],
  });
  const schema = { "@context": "https://schema.org", "@graph": [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.description,
      image: { "@id": imageId },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      author: { "@type": "Organization", name: "Hacoo Pro Editorial", url: `${SITE_URL}/about/` },
      publisher: { "@id": ORGANIZATION_ID },
      datePublished: article.published,
      dateModified: article.modified,
      inLanguage: "en",
      articleSection: "Hacoo order troubleshooting",
      keywords: ["Hacoo order missing item", "Hacoo split shipment", "Hacoo partial delivery", "Hacoo tracking multiple parcels"],
      isAccessibleForFree: true,
      wordCount: 1566,
    },
    { "@type": "ImageObject", "@id": imageId, url: imageUrl, contentUrl: imageUrl, width: article.image.width, height: article.image.height, caption: article.image.caption },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: "en", primaryImageOfPage: { "@id": imageId }, breadcrumb: { "@id": breadcrumb["@id"] }, isPartOf: { "@id": WEBSITE_ID } },
    breadcrumb,
  ] };

  return <>
    <StructuredData data={schema}/>
    <article className="research-article" data-longform-article>
      <header className="article-hero research-article-hero">
        <div className="wrap article-head">
          <span className="section-label">Hacoo order troubleshooting</span>
          <h1>{article.title}</h1>
          <div className="article-meta"><span>Hacoo Pro Editorial</span><span>{article.read} read</span><span>Published August 8, 2026</span><span>Last checked {article.checkedLabel}</span></div>
          <p>Receiving one parcel does not always mean the entire order travelled in it. This guide shows how to reconcile the order, shipment and received contents before deciding whether an item is late, separately shipped or genuinely missing.</p>
        </div>
      </header>

      <figure className="wrap article-cover research-cover">
        <img src={article.image.path} width={article.image.width} height={article.image.height} alt={article.image.alt}/>
        <figcaption>{article.image.caption} Original graphic by Hacoo Pro; it contains no customer, order or carrier data.</figcaption>
      </figure>

      <div className="wrap article-body research-article-body">
        <aside aria-label="Article contents">
          <span>In this article</span>
          <a href="#short-answer">Short answer</a>
          <a href="#three-records">Three records</a>
          <a href="#decision-table">Decision table</a>
          <a href="#evidence">Evidence checklist</a>
          <a href="#tracking">Tracking checks</a>
          <a href="#examples">Worked examples</a>
          <a href="#support">Support request</a>
          <a href="#questions">Questions</a>
        </aside>

        <div className="article-content research-copy">
          <section id="short-answer">
            <span className="section-label">The short answer</span>
            <h2>Reconcile the order before you report a missing item</h2>
            <p>Start by counting order lines, not parcels. Then identify every tracking reference attached to the order and match each delivered package to its label and contents. Hacoo's current shipping page says available products may be sent before a pre-ordered or back-ordered item is ready. That makes a partial delivery possible, but it does not prove that every unexplained gap is a split shipment.</p>
            <p>Do not wait on an assumption and do not open a vague “something is missing” case. Record the exact product, variant and quantity that did not arrive; the package label and tracking number you did receive; the order status; and whether another shipment is visible. This converts a confusing delivery into a specific question that support can investigate.</p>
            <div className="fact-card" aria-label="Hacoo partial-order facts checked August 8, 2026">
              <h3>What the current official pages establish</h3>
              <dl>
                <div><dt>Order contents</dt><dd>One order can contain more than one item.</dd></div>
                <div><dt>Split possibility</dt><dd>Available items may ship before pre-ordered or back-ordered items.</dd></div>
                <div><dt>Tracking location</dt><dd>Logistics Details is available through Account and My Orders.</dd></div>
                <div><dt>Delivered but absent</dt><dd>The help flow distinguishes a whole missing parcel from a missing item inside a parcel.</dd></div>
              </dl>
            </div>
          </section>

          <section id="three-records">
            <h2>Use three records instead of one delivery notification</h2>
            <p>A carrier notification answers only one question: what happened to a tracking number. It does not automatically describe every product in the order. Build your check from three records.</p>

            <h3>1. The order record</h3>
            <p>List every line exactly as ordered: product name, selected colour or version, size, and quantity. Note any pre-order or back-order wording still visible. If two units of the same product were ordered, write “two” rather than treating the line as one item. A thumbnail is not enough because two variants can share the same cover image.</p>

            <h3>2. The shipment record</h3>
            <p>Open Account, My Orders and Logistics Details. Hacoo's current tracking help says this area shows the shipping company and tracking number and provides routes to the carrier's website or customer service. Record every number, not just the one in the latest notification. A second number is the strongest visible clue that the order was divided, but separate packaging can still require support confirmation.</p>

            <h3>3. The received record</h3>
            <p>Before discarding packaging, photograph the external label, all sides of the package, the opened contents together, and the packing material. Keep product bags or labels that identify variants. The goal is not to create dramatic evidence; it is to link the physical package to one tracking number and show what was actually inside.</p>
          </section>

          <section id="decision-table">
            <h2>Split shipment, missing item or missing parcel?</h2>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th>What you see</th><th>Most useful next check</th></tr></thead>
                <tbody>
                  <tr><td>One parcel delivered; a second tracking number is still moving.</td><td>Match the undelivered number to the unreceived order line and monitor the official logistics record.</td></tr>
                  <tr><td>One parcel delivered; an item is marked pre-order or back-order.</td><td>Confirm whether the item has its own shipment or remains unshipped before filing a missing-item claim.</td></tr>
                  <tr><td>One parcel delivered; all order lines appear under the same delivered tracking number.</td><td>Document the label and contents, then report the exact missing product and quantity.</td></tr>
                  <tr><td>Tracking says delivered, but no parcel is present.</td><td>Check the drop-off area and household recipients, then use the package-not-received flow rather than a missing-item claim.</td></tr>
                  <tr><td>Tracking says returned to sender.</td><td>Contact official support about resending if supported or the applicable refund path.</td></tr>
                </tbody>
              </table>
            </div>
            <p>The labels describe different failures. A missing parcel means the whole tracked package is absent. A missing item means the package arrived but the documented contents do not match the order. A split shipment means not every order line was assigned to the same delivery event. Choosing the right label prevents support from investigating the wrong stage.</p>
          </section>

          <section id="evidence">
            <h2>Build evidence that identifies the gap</h2>
            <ol className="decision-list">
              <li><span>1</span><div><strong>Save the complete order summary.</strong><p>Include line items, variants, quantities and the order identifier. Avoid a crop that hides which order the products belong to.</p></div></li>
              <li><span>2</span><div><strong>Save every logistics entry.</strong><p>Record carrier name, tracking number and status for each shipment attached to the order.</p></div></li>
              <li><span>3</span><div><strong>Photograph the delivered label.</strong><p>The label connects the received carton or bag with a specific tracking reference.</p></div></li>
              <li><span>4</span><div><strong>Photograph the contents together.</strong><p>Show the opened package and all contents in one clear frame, followed by useful close views.</p></div></li>
              <li><span>5</span><div><strong>Write the discrepancy precisely.</strong><p>State “one blue size M shirt missing from quantity two,” not “my order is incomplete.”</p></div></li>
              <li><span>6</span><div><strong>Keep timestamps.</strong><p>Record delivery, opening and support-contact dates without inventing a deadline that is not shown in the live policy.</p></div></li>
            </ol>
            <p>Do not publish labels, addresses or phone numbers in a public review. Provide sensitive order evidence only through an official support route and only to the extent needed for the case.</p>
          </section>

          <section id="tracking">
            <h2>Read tracking as a sequence, not a promise</h2>
            <p>Tracking events can lag, repeat or use carrier-specific wording. Start from Hacoo's Logistics Details screen, then follow the listed carrier rather than an unsolicited message. Compare the package's printed tracking number with the number on screen. If they differ, record both and ask which order line belongs to each shipment.</p>
            <p>A “delivered” scan for one number does not close another active number. Conversely, a single delivered number does not prove a missing item will arrive later unless another shipment or unshipped line is visible. The safest conclusion is the narrowest one supported by the records.</p>
            <p>When a whole package is marked delivered but cannot be found, Hacoo's help flow tells users to check typical drop-off locations and ask household members or neighbours before using the package-not-received route. When tracking says returned to sender, Hacoo's help page directs users to contact support about resending if supported or a refund as applicable. Neither situation should be described as an item missing from an opened parcel.</p>
          </section>

          <section id="examples">
            <h2>Three worked examples</h2>

            <h3>Two shirts ordered, one shirt received</h3>
            <p>The order summary shows two quantities on one line, while Logistics Details shows one delivered tracking number and no second shipment. Photograph the label, opened package and received shirt, then report the missing quantity and exact variant. Do not frame the case as a missing parcel because the parcel arrived.</p>

            <h3>Jacket delivered, shoes still preparing</h3>
            <p>The order contains two lines. The jacket has a delivered tracking number, and the shoes remain unshipped or show pre-order wording. This resembles a split fulfilment, not proof of loss. Save both statuses and ask support to confirm the shoes' current assignment if the order page does not explain it.</p>

            <h3>One tracking number says delivered, nothing found</h3>
            <p>This is a whole-package investigation. Check the address, delivery image when available, usual drop-off places and other recipients. Use the package-not-received process attached to the order. A photograph of an empty hallway does not replace the carrier and order records.</p>
          </section>

          <section id="support">
            <h2>Send a support request that can be investigated</h2>
            <p>Use one message with the order number, affected line item, quantity, variant, delivered tracking number, any second tracking number, current statuses and a short evidence list. Ask one direct question: “Is this item assigned to another shipment, still unshipped, or missing from the delivered parcel?” That wording leaves room for the records to decide the category.</p>
            <p>Avoid opening multiple cases for the same gap unless official support instructs you to do so. Keep the case number and response. If a return or refund path becomes relevant, read the current conditions for the exact product before mailing anything. Product categories can have different handling restrictions, and this article does not replace the live policy.</p>
          </section>

          <section id="questions">
            <h2>Questions about partial Hacoo orders</h2>
            <div className="article-faq">
              <details open><summary>Does one order always use one tracking number?<span>+</span></summary><p>No universal statement supports that assumption. Hacoo's shipping page describes available items shipping before pre-ordered or back-ordered items, so reconcile every tracking reference shown for the order.</p></details>
              <details><summary>Should I report a missing item immediately after the first parcel?<span>+</span></summary><p>First check for another shipment or an unshipped line. If all lines appear assigned to the delivered package, preserve the packaging and report the exact discrepancy promptly through the official order flow.</p></details>
              <details><summary>What if the parcel label is already discarded?<span>+</span></summary><p>Use the tracking record, order summary and any delivery or opening evidence still available. Explain what is missing without claiming evidence you do not have.</p></details>
              <details><summary>Is “delivered but not received” the same as a missing item?<span>+</span></summary><p>No. The first concerns an absent tracked package; the second concerns contents missing from a package that arrived.</p></details>
            </div>
          </section>

          <section className="sources-panel">
            <h2>Continue with the right internal checklist</h2>
            <p>Use these pages to check adjacent questions without sending order evidence to an external guide.</p>
            <ul>
              <li><Link className="source-link" href="/guides/shipping-planning/">Shipping planning</Link> — separate current delivery information from estimates.</li>
              <li><Link className="source-link" href="/guides/qc-photo-checklist/">Photo checklist</Link> — decide which visible details are useful evidence.</li>
              <li><Link className="source-link" href="/products/">Product references</Link> — match exact options and live listing details.</li>
              <li><Link className="source-link" href="/faq/">Hacoo Pro FAQ</Link> — understand this site's independent role.</li>
              <li><Link className="source-link" href="/articles/">Research articles</Link> — return to the English article index.</li>
            </ul>
          </section>

          <div className="article-callout">
            <h2>Report the exact gap, not a guess.</h2>
            <p>Match order lines, tracking references and received contents first. Then ask support whether the remaining item is separately shipped, unshipped or missing.</p>
            <div className="article-callout-actions"><Link className="button light" href="/guides/shipping-planning/">Open shipping planning <Arrow/></Link><Link className="button quiet-dark" href="/articles/">All research articles</Link></div>
          </div>
        </div>
      </div>
    </article>
  </>;
}
