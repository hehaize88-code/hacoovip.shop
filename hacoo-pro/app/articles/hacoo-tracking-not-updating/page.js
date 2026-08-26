import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow } from "@/components/Icons";
import { SITE_URL } from "../../data";
import { createPageMetadata } from "../../seo";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../../schema";
import { getArticle } from "../data";

const article = getArticle("hacoo-tracking-not-updating");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo Tracking Not Updating: What to Check First",
  description: article.description,
  path,
  alternates: { canonical: path, languages: { en: path, "x-default": path } },
  type: "article",
  image: { url: imageUrl, width: article.image.width, height: article.image.height, alt: article.image.alt },
});

export default function HacooTrackingNotUpdatingArticle() {
  const breadcrumb = createBreadcrumbList({ path, items: [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: article.title, path },
  ] });
  const schema = { "@context": "https://schema.org", "@graph": [
    {
      "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description,
      image: { "@id": imageId }, mainEntityOfPage: { "@id": `${url}#webpage` },
      author: { "@type": "Organization", name: "Hacoo Pro Editorial", url: `${SITE_URL}/about/` },
      publisher: { "@id": ORGANIZATION_ID }, datePublished: article.published, dateModified: article.modified,
      inLanguage: "en", articleSection: "Hacoo support and policy research",
      keywords: ["Hacoo tracking not updating", "Hacoo tracking stuck", "Hacoo no tracking update", "Hacoo parcel tracking delay"],
      isAccessibleForFree: true, wordCount: 1458,
    },
    { "@type": "ImageObject", "@id": imageId, url: imageUrl, contentUrl: imageUrl, width: article.image.width, height: article.image.height, caption: article.image.caption },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: "en", primaryImageOfPage: { "@id": imageId }, breadcrumb: { "@id": breadcrumb["@id"] }, isPartOf: { "@id": WEBSITE_ID } },
    breadcrumb,
  ] };

  return <>
    <StructuredData data={schema}/>
    <article className="research-article" data-longform-article>
      <header className="article-hero research-article-hero"><div className="wrap article-head">
        <span className="section-label">Hacoo support and policy research</span>
        <h1>{article.title}</h1>
        <div className="article-meta"><span>Hacoo Pro Editorial</span><span>{article.read} read</span><span>Published August 25, 2026</span><span>Last checked {article.checkedLabel}</span></div>
        <p>A silent tracking page does not identify the cause. Match the order, carrier, parcel and last event first, then send the party responsible for that stage one precise question.</p>
      </div></header>

      <figure className="wrap article-cover research-cover">
        <img src={article.image.path} width={article.image.width} height={article.image.height} alt={article.image.alt}/>
        <figcaption>{article.image.caption} Original graphic by Hacoo Pro; it contains no customer, order, address or tracking data.</figcaption>
      </figure>

      <div className="wrap article-body research-article-body">
        <aside aria-label="Article contents"><span>In this article</span><a href="#short-answer">Short answer</a><a href="#official-path">Official path</a><a href="#four-states">Four states</a><a href="#evidence-pack">Evidence pack</a><a href="#comparison">Compare records</a><a href="#contact">Contact choice</a><a href="#examples">Examples</a><a href="#questions">Questions</a></aside>

        <div className="article-content research-copy">
          <section id="short-answer">
            <span className="section-label">The short answer</span>
            <h2>Read the last confirmed event before deciding that tracking is stuck</h2>
            <p>When Hacoo tracking is not updating, open the exact order and record its current status, carrier, tracking number, last event, event location, displayed time and the time you checked. Confirm that every item you expect is assigned to that parcel. Then compare the same number on the carrier destination reached from the official Logistics Details screen.</p>
            <p>Do not diagnose a lost parcel from elapsed time alone. A quiet record can mean the order is still being prepared, the label exists before the carrier's first physical scan, data is moving between systems, the parcel is between checkpoints, or an exception needs attention. The visible order and carrier records tell you which question to ask; they do not guarantee the answer.</p>
            <div className="fact-card" aria-label="Hacoo tracking facts checked August 25, 2026"><h3>What the current public instructions support</h3><dl>
              <div><dt>Where to start</dt><dd>Account, My Orders and Logistics Details.</dd></div>
              <div><dt>What is shown</dt><dd>The carrier and tracking number associated with the shipment.</dd></div>
              <div><dt>Carrier access</dt><dd>A browser control to open the carrier site and a phone control for carrier customer service.</dd></div>
              <div><dt>What is not promised</dt><dd>No universal public waiting threshold proves that an unchanged event is a loss.</dd></div>
            </dl></div>
          </section>

          <section id="official-path">
            <h2>Use the official tracking path as the identity record</h2>
            <p>Hacoo's current public help page directs users to Account, then My Orders, then Logistics Details. It says this view shows the carrier and tracking number, with controls that open the carrier's website or carrier customer service. This path matters because a number copied from an old email, screenshot or creator post may belong to another parcel or contain a transcription error.</p>
            <p>Check the live order on every review. If an order is split, one order can lead to more than one shipment record. A delivered parcel for one group does not prove that every order line travelled in it. Match the item lines to the tracking reference before asking why an item has no scan.</p>
            <p>Use Hacoo's status for the order relationship and the carrier's record for physical transport events. If they differ, save both with times instead of choosing the more reassuring screen. A timestamped mismatch is useful evidence for support.</p>
          </section>

          <section id="four-states">
            <h2>Classify the silent record into one of four states</h2>
            <h3>1. No carrier or tracking number yet</h3>
            <p>This is primarily an order-preparation question, not a carrier-tracking problem. Record the item and order statuses. If a preorder, backorder or split fulfilment is shown, follow that evidence rather than treating the missing number as a transport failure.</p>
            <h3>2. Tracking number exists, but there is no carrier event</h3>
            <p>A number can appear before a first physical scan is visible. Confirm the carrier, exact number and assignment time if displayed. Ask whether the parcel has actually been handed to the carrier; do not describe “label created” as movement.</p>
            <h3>3. One or more events exist, then stop changing</h3>
            <p>Preserve the exact last event and location. Phrases such as departure, arrival, transfer, customs review or delivery attempt describe different responsibilities. Do not translate an unfamiliar event into “lost.” Use the carrier's own wording and event sequence.</p>
            <h3>4. An explicit exception appears</h3>
            <p>An address problem, failed attempt, customs request, return movement or other exception is more actionable than silence. Save the text before it changes, then use the official party identified by the event. Never send identification, payment or security codes through a link copied from an unsolicited message.</p>
          </section>

          <section id="evidence-pack">
            <h2>Build a seven-field tracking evidence pack</h2>
            <ol className="decision-list">
              <li><span>1</span><div><strong>Order reference.</strong><p>Keep the complete number private; use only a short ending in a public note.</p></div></li>
              <li><span>2</span><div><strong>Expected items.</strong><p>List the relevant order lines and whether the app groups them into this shipment.</p></div></li>
              <li><span>3</span><div><strong>Order status.</strong><p>Copy the wording and the date and time you checked it.</p></div></li>
              <li><span>4</span><div><strong>Carrier and number.</strong><p>Copy them from Logistics Details and verify the number character by character.</p></div></li>
              <li><span>5</span><div><strong>Last carrier event.</strong><p>Record its exact text, location, date and displayed time zone when available.</p></div></li>
              <li><span>6</span><div><strong>Record comparison.</strong><p>Note whether Hacoo and the carrier agree or which fields differ.</p></div></li>
              <li><span>7</span><div><strong>Previous action.</strong><p>Save any case number, carrier contact and reply so the next contact does not restart the timeline.</p></div></li>
            </ol>
            <p>A useful message can fit on one screen when these fields are prepared. Repeatedly refreshing a status supplies no extra context; recording a changed event does.</p>
          </section>

          <section id="comparison">
            <h2>Compare records without inventing a deadline</h2>
            <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Visible evidence</th><th>Best interpretation</th><th>Next question</th></tr></thead><tbody>
              <tr><td>Preparing; no shipment record</td><td>Carrier movement has not been established.</td><td>Which item is waiting, and has the parcel been submitted?</td></tr>
              <tr><td>Number assigned; carrier has no event</td><td>A label or data record may precede carrier acceptance.</td><td>Has the parcel been physically handed to this carrier?</td></tr>
              <tr><td>Carrier event exists; no later event</td><td>The last scan identifies the current evidence boundary.</td><td>Does the carrier consider the shipment moving normally or under investigation?</td></tr>
              <tr><td>Hacoo and carrier show different states</td><td>Systems may not have synchronized.</td><td>Which record currently controls the next operational step?</td></tr>
              <tr><td>Explicit exception or failed attempt</td><td>A specific action may be required.</td><td>What evidence or action does the official carrier or Hacoo request?</td></tr>
            </tbody></table></div>
            <p>Hacoo publishes delivery guidance elsewhere, but an estimate is not a scan schedule or guaranteed escalation point. Route, destination, handoff and customs circumstances can vary. This guide therefore does not create a fixed number of hours or days after which every quiet record should be treated the same.</p>
          </section>

          <section id="contact">
            <h2>Contact the party that owns the current stage</h2>
            <p>If there is no carrier assignment, start with official Hacoo order support because the question concerns preparation or shipment creation. If the carrier has accepted the parcel and publishes the last event, use the carrier control provided from Logistics Details for event-specific questions. When records conflict, keep one Hacoo case containing the carrier evidence.</p>
            <p>A precise request is: “Order ending 1234 shows shipped with carrier X and tracking ending 5678. The carrier's last event was [exact wording] at [location and time], checked at [time]. Hacoo currently shows [status]. Is this parcel still within the expected handoff, or should a carrier trace or Hacoo review be opened?”</p>
            <p>Ask one answerable question. Do not open several cases with different descriptions or claim a parcel is lost before the responsible party confirms that conclusion. Keep replies and case references in one timeline.</p>
          </section>

          <section id="examples">
            <h2>Three tracking examples</h2>
            <h3>A paid item with no tracking</h3><p>The order still shows preparation. The correct evidence pack starts with item status, not a carrier screenshot. Check whether the item is a preorder or assigned to a later shipment, then ask when or whether it will enter a parcel.</p>
            <h3>A number with no first scan</h3><p>Logistics Details identifies the carrier, but the carrier has no event. Verify the number and save the assignment time. Ask whether physical handoff occurred. Avoid assuming that the parcel is moving simply because a label exists.</p>
            <h3>A handoff mismatch</h3><p>Hacoo shows shipped while the carrier still shows an earlier transfer event. Save both records at the same time. Contact the carrier about the published event and add that response to one Hacoo case if the mismatch persists.</p>
          </section>

          <section id="questions">
            <h2>Questions about Hacoo tracking not updating</h2>
            <div className="article-faq">
              <details open><summary>Where should I find the Hacoo tracking number?<span>+</span></summary><p>The current public instructions point to Account, My Orders and Logistics Details, where the carrier and tracking number are shown.</p></details>
              <details><summary>Does a tracking number prove carrier acceptance?<span>+</span></summary><p>No. Look for the first physical carrier event and ask whether handoff occurred when the record remains empty.</p></details>
              <details><summary>How long can tracking stay unchanged?<span>+</span></summary><p>No one threshold verified here applies to every route and event. Use the exact last scan, carrier record and current official guidance for that shipment.</p></details>
              <details><summary>Should I publish my tracking number for help?<span>+</span></summary><p>No. Keep the complete order and tracking references inside official Hacoo and carrier support channels.</p></details>
            </div>
          </section>

          <section className="sources-panel"><h2>Continue with the matching internal guide</h2><p>Choose the next page by the evidence now shown.</p><ul>
            <li><Link className="source-link" href="/guides/shipping-planning/">Shipping planning</Link> — separate preparation from carrier movement.</li>
            <li><Link className="source-link" href="/articles/hacoo-order-missing-item-split-shipment/">Split-shipment checklist</Link> — match items to multiple parcel records.</li>
            <li><Link className="source-link" href="/articles/hacoo-preorder-backorder-support/">Preorder support</Link> — check why an item has not entered a shipment.</li>
            <li><Link className="source-link" href="/articles/hacoo-wrong-address-evidence/">Wrong-address evidence</Link> — act when tracking reveals an address problem.</li>
            <li><Link className="source-link" href="/articles/hacoo-marked-delivered-not-received/">Delivered-but-missing checklist</Link> — verify a completed carrier scan and local handoff evidence.</li>
            <li><Link className="source-link" href="/faq/">Hacoo Pro FAQ</Link> — understand the limits of this independent guide.</li>
          </ul></section>

          <div className="article-callout"><h2>Describe the record, not the fear.</h2><p>Match the order, parcel, carrier and last event, then give the responsible party one timeline it can investigate.</p><div className="article-callout-actions"><Link className="button light" href="/guides/shipping-planning/">Open shipping planning <Arrow/></Link><Link className="button quiet-dark" href="/articles/">All research articles</Link></div></div>
        </div>
      </div>
    </article>
  </>;
}
