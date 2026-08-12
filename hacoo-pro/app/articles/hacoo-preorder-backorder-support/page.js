import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow } from "@/components/Icons";
import { SITE_URL } from "../../data";
import { createPageMetadata } from "../../seo";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../../schema";
import { getArticle } from "../data";

const article = getArticle("hacoo-preorder-backorder-support");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo Preorder and Backorder Support Guide",
  description: article.description,
  path,
  alternates: { canonical: path, languages: { en: path, "x-default": path } },
  type: "article",
  image: { url: imageUrl, width: article.image.width, height: article.image.height, alt: article.image.alt },
});

export default function HacooPreorderSupportArticle() {
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
      articleSection: "Hacoo support and policy research",
      keywords: ["Hacoo preorder support", "Hacoo backorder status", "Hacoo preorder tracking", "Hacoo order not shipped"],
      isAccessibleForFree: true,
      wordCount: 1522,
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
          <span className="section-label">Hacoo support and policy research</span>
          <h1>{article.title}</h1>
          <div className="article-meta"><span>Hacoo Pro Editorial</span><span>{article.read} read</span><span>Published August 11, 2026</span><span>Last checked {article.checkedLabel}</span></div>
          <p>A preorder or backorder is a status to monitor, not a delivery promise. This guide shows how to preserve the live record, separate preparation from shipping and ask support a question that can be answered from the order.</p>
        </div>
      </header>

      <figure className="wrap article-cover research-cover">
        <img src={article.image.path} width={article.image.width} height={article.image.height} alt={article.image.alt}/>
        <figcaption>{article.image.caption} Original graphic by Hacoo Pro; it contains no customer, order or tracking data.</figcaption>
      </figure>

      <div className="wrap article-body research-article-body">
        <aside aria-label="Article contents">
          <span>In this article</span>
          <a href="#short-answer">Short answer</a>
          <a href="#official-baseline">Official baseline</a>
          <a href="#status-record">Status record</a>
          <a href="#timeline">Two clocks</a>
          <a href="#decision-checks">Decision checks</a>
          <a href="#support-message">Support message</a>
          <a href="#examples">Examples</a>
          <a href="#questions">Questions</a>
        </aside>

        <div className="article-content research-copy">
          <section id="short-answer">
            <span className="section-label">The short answer</span>
            <h2>Treat each unavailable item as its own fulfilment record</h2>
            <p>When a Hacoo item is described as a preorder or backorder, save the wording shown for that exact order line, along with the variant, quantity, order date and current status. Then check whether the line has been assigned a shipment. Do not count from an estimated delivery range while the item is still unshipped, and do not assume that another item in the same order will wait for it.</p>
            <p>Hacoo's current shipping information says products that are available may be shipped immediately, while preordered or backordered products may be delivered later. That wording establishes the possibility of split fulfilment. It does not establish a universal release date, a guaranteed dispatch day or a promise that every mixed order will split in the same way.</p>
            <div className="fact-card" aria-label="Hacoo preorder facts checked August 11, 2026">
              <h3>What can be stated from the current public pages</h3>
              <dl>
                <div><dt>Available lines</dt><dd>They may be shipped before unavailable lines.</dd></div>
                <div><dt>Preorder or backorder</dt><dd>The item may be delivered later.</dd></div>
                <div><dt>Tracking</dt><dd>Logistics Details is reached through Account and My Orders.</dd></div>
                <div><dt>Delivery estimates</dt><dd>Published shipping times are guidelines rather than a guaranteed date.</dd></div>
              </dl>
            </div>
          </section>

          <section id="official-baseline">
            <h2>Separate the official baseline from assumptions</h2>
            <p>The useful official baseline is narrow. Hacoo publishes general processing and regional shipping guidance, explains that receiving time combines processing and shipping, and warns that shipping ranges are not guarantees. The same shipping page explains that available and unavailable products may travel at different times. Those points help you classify the order, but they do not reveal the live inventory position of a particular colour, size or seller.</p>
            <p>A creator post, old product screenshot or another buyer's delivery date cannot fill that gap. It may describe that person's experience, but it does not update your order. The order screen and official support response are the records that can identify whether your line is awaiting availability, preparing, cancelled, refunded or assigned to a shipment.</p>
            <p>Use exact language when you take notes. “Preorder shown on August 11” is an observation. “Will ship next Tuesday” is a prediction unless the live order or an official response actually supplies that date. This distinction makes later support messages shorter and prevents an estimate from becoming an invented promise.</p>
          </section>

          <section id="status-record">
            <h2>Build a status record before anything changes</h2>
            <ol className="decision-list">
              <li><span>1</span><div><strong>Identify the precise line.</strong><p>Record the product name, selected size or version, colour and quantity. Similar thumbnails are not enough when variants differ.</p></div></li>
              <li><span>2</span><div><strong>Save the availability wording.</strong><p>Capture the preorder or backorder label and any date or condition actually displayed. Include enough of the order screen to preserve context.</p></div></li>
              <li><span>3</span><div><strong>Record the order status and time.</strong><p>A dated note lets you show how the status changed without claiming that a screenshot is current forever.</p></div></li>
              <li><span>4</span><div><strong>Check shipment assignment.</strong><p>Look in Logistics Details for a carrier and tracking number linked to the item or order. No tracking means there is no carrier journey to follow yet.</p></div></li>
              <li><span>5</span><div><strong>Keep payment and support references privately.</strong><p>Preserve the order identifier and case number, but do not expose addresses, phone numbers or payment details in public posts.</p></div></li>
            </ol>
            <p>Repeat the check after a meaningful status change, not every few minutes. A small table with date, visible wording, shipment reference and action taken is usually more useful than a folder of near-identical screenshots.</p>
          </section>

          <section id="timeline">
            <h2>Run two clocks: preparation and carrier movement</h2>
            <p>The first clock begins with the order and covers availability and preparation. The second begins only after a shipment is assigned and a carrier record exists. Hacoo's public shipping page describes processing separately from shipping, so adding an estimated carrier range to an item that has not shipped mixes two different stages.</p>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th>Visible state</th><th>Useful action</th></tr></thead>
                <tbody>
                  <tr><td>Preorder or backorder; no tracking</td><td>Preserve the availability wording and ask about the line's current fulfilment status if the order does not explain it.</td></tr>
                  <tr><td>Available item has tracking; preorder line does not</td><td>Treat the order as potentially split and monitor each line separately.</td></tr>
                  <tr><td>Preorder line receives tracking</td><td>Switch to the carrier record and compare its events with Logistics Details.</td></tr>
                  <tr><td>Status changes without explanation</td><td>Save before-and-after records and ask what the new status means for that exact line.</td></tr>
                  <tr><td>Another parcel arrives first</td><td>Reconcile delivered contents without reporting the unshipped line as missing from that parcel.</td></tr>
                </tbody>
              </table>
            </div>
            <p>This model also prevents double counting. A published receiving estimate includes stages; it should not be restarted or extended with invented numbers. Use any live estimate only as the page presents it, note the check date and ask support when the order-specific record is unclear.</p>
          </section>

          <section id="decision-checks">
            <h2>Use a decision check before contacting support</h2>
            <h3>Is the item still labelled preorder or backorder?</h3>
            <p>If yes, record the label and look for order-specific information. If the wording has disappeared, preserve the earlier record and note the current status instead of continuing to describe the page as though nothing changed.</p>
            <h3>Does the item have its own shipment reference?</h3>
            <p>If yes, the question has moved from availability to logistics. If no, a carrier cannot explain the delay. Ask about fulfilment or shipment assignment, not why tracking has stopped.</p>
            <h3>Did another line already ship or arrive?</h3>
            <p>If yes, a split is plausible under Hacoo's published wording. Match the delivered parcel to its tracking number and contents. Do not assume the remaining line was packed in that parcel unless the order record assigns it there.</p>
            <h3>Is there a live date, or only a general estimate?</h3>
            <p>Quote only what the order actually displays. When there is no item-specific date, ask whether one is currently available. Do not borrow a date from a creator, review or different order.</p>
          </section>

          <section id="support-message">
            <h2>Send one support message with one answerable question</h2>
            <p>A useful message names the order, exact line, variant, quantity, visible availability wording, current order status and whether a tracking number exists. Attach the smallest set of screenshots that proves those points. Then ask: “Is this line still awaiting availability, preparing for shipment, or assigned to a separate shipment?”</p>
            <p>If a live date was displayed and has passed, include that date and the screenshot. Ask for the current status and available options; do not demand a policy outcome that the public page does not promise. If cancellation, billing or refund becomes relevant, use the current official order flow and conditions for the item rather than relying on a generic article.</p>
            <p>Keep all replies in the same case when possible. A single timeline is easier to investigate than several messages that use different labels for the same line. Save the case reference and date of each response.</p>
          </section>

          <section id="examples">
            <h2>Two examples that keep the stages separate</h2>
            <h3>Available top and backordered shoes</h3>
            <p>The top has a tracking number; the shoes remain labelled backorder with no tracking. Record both lines separately. Follow the top through the carrier and ask about the shoes' fulfilment status only if the order page does not answer it. The top's delivery does not make the shoes a missing item.</p>
            <h3>Preorder label replaced by preparing</h3>
            <p>Your earlier screenshot shows preorder, while the current order shows preparing and still has no tracking. Save both states and ask whether the line is now in fulfilment and whether shipment assignment is pending. Do not estimate dispatch from the status label alone.</p>
          </section>

          <section id="questions">
            <h2>Questions about Hacoo preorder support</h2>
            <div className="article-faq">
              <details open><summary>Does preorder mean the item will arrive on a fixed date?<span>+</span></summary><p>Not from the public shipping wording alone. Use an order-specific date only when the live record or official support provides it, and preserve the date checked.</p></details>
              <details><summary>Can available items arrive before a backordered item?<span>+</span></summary><p>Yes, Hacoo's current shipping page says available products may ship immediately while preorder or backorder products may be delivered later. Check the actual shipment assignments for your order.</p></details>
              <details><summary>Can I track a preorder before it ships?<span>+</span></summary><p>You can track its order status, but carrier tracking requires a shipment reference. Save the availability status until Logistics Details shows a carrier and number.</p></details>
              <details><summary>Should I publish my screenshots to get advice?<span>+</span></summary><p>No. Keep order identifiers, addresses, phone numbers, payment data and support messages private. Share evidence only through an official support route when needed.</p></details>
            </div>
          </section>

          <section className="sources-panel">
            <h2>Continue with the matching internal guide</h2>
            <p>Choose the next checklist by the item's current stage.</p>
            <ul>
              <li><Link className="source-link" href="/guides/shipping-planning/">Shipping planning</Link> — distinguish preparation from delivery estimates.</li>
              <li><Link className="source-link" href="/articles/hacoo-order-missing-item-split-shipment/">Partial-order checklist</Link> — reconcile parcels after another line arrives.</li>
              <li><Link className="source-link" href="/articles/hacoo-wrong-address-evidence/">Wrong-address checklist</Link> — preserve the order address and shipment state before requesting a correction.</li>
              <li><Link className="source-link" href="/guides/how-to-use-hacoo-spreadsheet/">Research workflow</Link> — verify the live destination before relying on saved details.</li>
              <li><Link className="source-link" href="/faq/">Hacoo Pro FAQ</Link> — understand this independent site's role and limits.</li>
              <li><Link className="source-link" href="/articles/">Research articles</Link> — browse the full English article index.</li>
            </ul>
          </section>

          <div className="article-callout">
            <h2>Ask about the line, not the whole timeline.</h2>
            <p>Save the exact availability wording, current status and shipment assignment. One precise record gives support a clear place to start.</p>
            <div className="article-callout-actions"><Link className="button light" href="/guides/shipping-planning/">Open shipping planning <Arrow/></Link><Link className="button quiet-dark" href="/articles/">All research articles</Link></div>
          </div>
        </div>
      </div>
    </article>
  </>;
}
