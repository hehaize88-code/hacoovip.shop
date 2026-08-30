import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow } from "@/components/Icons";
import { SITE_URL } from "../../data";
import { createPageMetadata } from "../../seo";
import {
  createBreadcrumbList,
  ORGANIZATION_ID,
  pageUrl,
  WEBSITE_ID,
} from "../../schema";
import { getArticle } from "../data";

const article = getArticle("hacoo-after-sales-request-window-evidence");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo After-Sales Request Window: Evidence Checklist",
  description: article.description,
  path,
  alternates: { canonical: path, languages: { en: path, "x-default": path } },
  type: "article",
  image: {
    url: imageUrl,
    width: article.image.width,
    height: article.image.height,
    alt: article.image.alt,
  },
});

export default function HacooAfterSalesWindowArticle() {
  const breadcrumb = createBreadcrumbList({
    path,
    items: [
      { name: "Home", path: "/" },
      { name: "Articles", path: "/articles" },
      { name: article.title, path },
    ],
  });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        image: { "@id": imageId },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: {
          "@type": "Organization",
          name: "Hacoo Pro Editorial",
          url: `${SITE_URL}/about/`,
        },
        publisher: { "@id": ORGANIZATION_ID },
        datePublished: article.published,
        dateModified: article.modified,
        inLanguage: "en",
        articleSection: "Hacoo support and policy research",
        keywords: [
          "Hacoo after-sales request window",
          "Hacoo after-sales evidence",
          "Hacoo request deadline",
          "Hacoo refund instructions",
        ],
        isAccessibleForFree: true,
        wordCount: 1633,
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        url: imageUrl,
        contentUrl: imageUrl,
        width: article.image.width,
        height: article.image.height,
        caption: article.image.caption,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: article.title,
        description: article.description,
        inLanguage: "en",
        primaryImageOfPage: { "@id": imageId },
        breadcrumb: { "@id": breadcrumb["@id"] },
        isPartOf: { "@id": WEBSITE_ID },
      },
      breadcrumb,
    ],
  };

  return (
    <>
      <StructuredData data={schema} />
      <article className="research-article" data-longform-article>
        <header className="article-hero research-article-hero">
          <div className="wrap article-head">
            <span className="section-label">
              Hacoo after-sales support research
            </span>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>Hacoo Pro Editorial</span>
              <span>{article.read} read</span>
              <span>Published August 29, 2026</span>
              <span>Last checked {article.checkedLabel}</span>
            </div>
            <p>
              An after-sales window is a submission deadline, not a promise that
              every request will be accepted. Anchor the date, document the
              exact problem and preserve the submitted record before time runs
              out.
            </p>
          </div>
        </header>
        <figure className="wrap article-cover research-cover">
          <img
            src={article.image.path}
            width={article.image.width}
            height={article.image.height}
            alt={article.image.alt}
          />
          <figcaption>
            {article.image.caption} Original graphic by Hacoo Pro; it contains
            no customer, address, order or payment information.
          </figcaption>
        </figure>
        <div className="wrap article-body research-article-body">
          <aside aria-label="Article contents">
            <span>In this article</span>
            <a href="#answer">Short answer</a>
            <a href="#baseline">Official baseline</a>
            <a href="#deadline">Deadline method</a>
            <a href="#evidence">Evidence pack</a>
            <a href="#matrix">Issue matrix</a>
            <a href="#submit">Submission</a>
            <a href="#mistakes">Mistakes</a>
            <a href="#faq">Questions</a>
          </aside>
          <div className="article-content research-copy">
            <section id="answer">
              <span className="section-label">The short answer</span>
              <h2>Calculate first, investigate second, submit third</h2>
              <p>
                Open the exact Hacoo order as soon as you identify a problem.
                Save the displayed delivery date, order number, affected item,
                selected option and current status. Hacoo's Shipping &amp;
                Delivery page, checked on August 29, 2026, says that after-sales
                service should be requested within 15 days of delivery and tells
                users to follow the refund instructions shown for the request.
                Treat that published period as an outer limit, not as permission
                to wait until day fifteen.
              </p>
              <p>
                The practical rule is simple: calculate a conservative deadline
                from the platform's recorded delivery date, preserve the
                original evidence, and submit a clear request early. If one
                detail is still missing, state that it is pending. Do not let a
                search for perfect photographs or a seller response consume the
                available window.
              </p>
              <div className="fact-card">
                <h3>Official facts checked August 29, 2026</h3>
                <dl>
                  <div>
                    <dt>Published timing</dt>
                    <dd>
                      Hacoo's shipping page says to request after-sales service
                      within 15 days of delivery.
                    </dd>
                  </div>
                  <div>
                    <dt>Instructions</dt>
                    <dd>
                      The page directs users to follow the refund instructions
                      presented for the request.
                    </dd>
                  </div>
                  <div>
                    <dt>What this does not prove</dt>
                    <dd>
                      The wording does not guarantee eligibility, acceptance, a
                      fixed refund amount or a universal resolution time.
                    </dd>
                  </div>
                  <div>
                    <dt>Safe working rule</dt>
                    <dd>
                      Use the displayed delivery record and submit well before
                      the latest plausible deadline.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section id="baseline">
              <h2>Read the published window narrowly</h2>
              <p>
                “Within 15 days of delivery” contains two variables: which
                delivery event starts the count and how the platform counts the
                days. The checked public wording does not define every edge
                case, time zone or partial-delivery scenario. Avoid inventing a
                calculation rule. Use the delivery date shown for the affected
                shipment, count conservatively, and ask support which date
                applies when multiple parcels or corrected carrier events exist.
              </p>
              <p>
                A request window is procedural. It indicates when a user should
                act; it does not establish that a damaged, wrong, missing or
                unwanted item qualifies for the same remedy. The evidence and
                request category still matter. Likewise, “refund instructions”
                means the current on-screen steps should control. A blog
                checklist cannot replace options, labels, upload fields or
                return directions displayed inside the live order flow.
              </p>
              <p>
                Capture the policy page and order record on the day you prepare
                the request. Policies and interfaces can change. Your dated copy
                shows what you relied on without claiming that old wording
                governs forever.
              </p>
              <p>
                Keep three dates separate in your notes: the carrier event, the
                delivery date displayed by Hacoo, and the day you first observed
                the problem. They may coincide, but they answer different
                questions. The first helps trace the parcel, the second anchors
                the published window, and the third explains when inspection
                occurred. If a status changes after you have saved it, add the
                new event to the timeline; do not overwrite the earlier record.
              </p>
            </section>

            <section id="deadline">
              <h2>Build a deadline record you can defend</h2>
              <ol className="decision-list">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Identify the affected shipment.</strong>
                    <p>
                      Match the item to its parcel and tracking reference. Split
                      orders may have different delivery dates.
                    </p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>Save the platform date.</strong>
                    <p>
                      Record the delivery date in the Hacoo order or logistics
                      view, not just the date you opened the parcel.
                    </p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>Save the carrier event.</strong>
                    <p>
                      Keep the carrier's exact delivered wording, time and
                      location as supporting evidence.
                    </p>
                  </div>
                </li>
                <li>
                  <span>4</span>
                  <div>
                    <strong>Set an early internal target.</strong>
                    <p>
                      Choose a submission date comfortably before the apparent
                      outer limit. This is your planning buffer, not an official
                      rule.
                    </p>
                  </div>
                </li>
                <li>
                  <span>5</span>
                  <div>
                    <strong>Record uncertainty.</strong>
                    <p>
                      If the platform and carrier dates differ, preserve both
                      and ask which controls rather than silently choosing the
                      later one.
                    </p>
                  </div>
                </li>
                <li>
                  <span>6</span>
                  <div>
                    <strong>Keep proof of submission.</strong>
                    <p>
                      Save the request time, category, uploaded files, written
                      description and any case reference.
                    </p>
                  </div>
                </li>
              </ol>
              <p>
                For example, if the Hacoo order displays delivery on August 20
                and the carrier shows a late-evening scan on August 19, do not
                publish a definitive “last day.” Record both dates, plan from
                the earlier one, and submit promptly. The value of the example
                is the method, not a universal counting formula.
              </p>
            </section>

            <section id="evidence">
              <h2>Prepare an evidence pack that answers four questions</h2>
              <h3>Which order and item?</h3>
              <p>
                Include the order reference, exact item title, selected colour,
                size, quantity and the parcel or tracking number connected to
                it. Crop a working copy if needed, but retain the original full
                record privately. Never post an address, telephone number,
                payment identifier or complete tracking code in a public forum.
              </p>
              <h3>What was expected?</h3>
              <p>
                Save the product-page details and option selection that were
                visible when you ordered, if available. Distinguish a stated
                specification from an impression created by photography. A saved
                page does not prove quality or authenticity, but it can show the
                option and information on which the request relies.
              </p>
              <h3>What arrived?</h3>
              <p>
                Use neutral, observable language: “label states M while the
                order states L,” “left seam is open for approximately four
                centimetres,” or “one of two units is present.” Avoid
                conclusions such as “fake,” “fraud” or “unusable” unless the
                current request process specifically asks for that
                classification and you have appropriate evidence.
              </p>
              <h3>When was the problem recorded?</h3>
              <p>
                Preserve the delivery event, unboxing or first inspection time,
                photograph timestamps, and submission time. A coherent timeline
                is more useful than twenty screenshots with no explanation.
              </p>
            </section>

            <section id="matrix">
              <h2>
                Match the evidence to the issue, not to a generic template
              </h2>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Issue observed</th>
                      <th>Most useful evidence</th>
                      <th>Do not claim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wrong option</td>
                      <td>
                        Order option, packaging label and full-item photograph
                      </td>
                      <td>
                        That colour on a screen proves a calibrated colour value
                      </td>
                    </tr>
                    <tr>
                      <td>Visible damage</td>
                      <td>
                        Full item, close-up, scale reference and packaging
                        condition
                      </td>
                      <td>The exact cause of damage from one image</td>
                    </tr>
                    <tr>
                      <td>Missing quantity</td>
                      <td>
                        Ordered quantity, parcel contents and packaging overview
                      </td>
                      <td>
                        That a split shipment is impossible before checking
                        tracking groups
                      </td>
                    </tr>
                    <tr>
                      <td>Fit or measurement concern</td>
                      <td>
                        Seller size information and repeatable garment
                        measurement
                      </td>
                      <td>That a size label alone proves incorrect fit</td>
                    </tr>
                    <tr>
                      <td>Delivered parcel absent</td>
                      <td>
                        Carrier event, delivery proof and local-search timeline
                      </td>
                      <td>
                        A refund outcome; use the carrier-first process for that
                        scenario
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                If the request form limits attachments, lead with identity, the
                clearest overview, the decisive close-up and the date record.
                Keep additional originals ready. More files are not
                automatically stronger evidence; relevance and traceability
                matter.
              </p>
              <p>
                Photograph in ordinary light when possible and include one
                overview before close-ups. A close crop can show a loose seam
                but may not show which garment, side or option it belongs to.
                When measurement is relevant, show both endpoints and the
                complete measuring tool in a second image. State the method
                rather than presenting one reading as a guaranteed fit result.
                For quantity concerns, photograph all received contents together
                and retain the outer packaging label in the private case file.
              </p>
            </section>

            <section id="submit">
              <h2>Write one answerable after-sales request</h2>
              <p>
                Use a compact structure: “Order [reference], item [exact item],
                delivered [displayed date]. I selected [option]. The received
                item shows [observable discrepancy]. I attached [evidence]. I am
                submitting within the published after-sales period. Please
                confirm the current remedy and any next step or return
                instruction.”
              </p>
              <p>
                Select the closest available issue category and follow the
                on-screen refund or return directions. If the interface asks for
                a particular angle, label or document, supply it without
                replacing the existing originals. Do not send an item elsewhere,
                discard packaging or incur postage solely because an unofficial
                post suggested it. Wait for the case-specific official
                instruction.
              </p>
              <p>
                After submission, save a screenshot or export showing the time,
                description and attachments. If no case reference appears,
                record the exact route used and check the order history or
                message area. Follow up with the same facts rather than creating
                conflicting versions.
              </p>
            </section>

            <section id="mistakes">
              <h2>Avoid the four deadline mistakes that weaken a request</h2>
              <p>
                <strong>Waiting for certainty.</strong> Submit the known facts
                before the window closes and identify what remains uncertain.{" "}
                <strong>Using the purchase date.</strong> The checked wording is
                tied to delivery, so preserve the delivery record.{" "}
                <strong>Combining separate problems.</strong> Match each
                affected item and shipment before describing the issue.{" "}
                <strong>Treating submission as approval.</strong> A timestamp
                proves that a request was made, not that a remedy is guaranteed.
              </p>
              <p>
                Also avoid editing evidence destructively. Keep original files,
                make separate annotated copies, and explain any markups. Do not
                reuse photographs from another order, creator or review. That
                breaks the connection between the request and the delivered
                item.
              </p>
            </section>

            <section id="faq">
              <h2>Questions about the Hacoo after-sales request window</h2>
              <div className="article-faq">
                <details open>
                  <summary>
                    Is the window definitely fifteen 24-hour periods?
                    <span>+</span>
                  </summary>
                  <p>
                    The checked public page says within 15 days of delivery but
                    does not define every counting edge case. Use the displayed
                    delivery date, act early and ask support when dates
                    conflict.
                  </p>
                </details>
                <details>
                  <summary>
                    Does submitting within the window guarantee a refund?
                    <span>+</span>
                  </summary>
                  <p>
                    No. Timing, eligibility, evidence and the current case
                    instructions are separate questions.
                  </p>
                </details>
                <details>
                  <summary>
                    What if an order arrived in two parcels?<span>+</span>
                  </summary>
                  <p>
                    Match each affected item to its shipment and preserve each
                    delivery date. Ask which date applies instead of assuming
                    one date controls the whole order.
                  </p>
                </details>
                <details>
                  <summary>
                    Should I remove personal details from evidence?
                    <span>+</span>
                  </summary>
                  <p>
                    Keep complete originals for the official channel. Use
                    redacted copies only when sharing more broadly, and never
                    publish addresses, payment data or full tracking numbers.
                  </p>
                </details>
              </div>
            </section>

            <section className="sources-panel">
              <h2>Continue with the matching internal guide</h2>
              <ul>
                <li>
                  <Link
                    className="source-link"
                    href="/articles/hacoo-refund-instructions-checklist/"
                  >
                    Refund instruction checklist
                  </Link>{" "}
                  — match each live request field to a precise evidence record.
                </li>
                <li>
                  <Link
                    className="source-link"
                    href="/articles/hacoo-marked-delivered-not-received/"
                  >
                    Delivered-but-missing checklist
                  </Link>{" "}
                  — follow the carrier-first evidence route for a missing
                  delivered parcel.
                </li>
                <li>
                  <Link
                    className="source-link"
                    href="/articles/hacoo-order-missing-item-split-shipment/"
                  >
                    Split-shipment checklist
                  </Link>{" "}
                  — confirm whether an item belongs to another parcel.
                </li>
                <li>
                  <Link
                    className="source-link"
                    href="/articles/hacoo-wrong-address-evidence/"
                  >
                    Wrong-address evidence guide
                  </Link>{" "}
                  — preserve the entered address and shipment state.
                </li>
                <li>
                  <Link
                    className="source-link"
                    href="/guides/shipping-planning/"
                  >
                    Shipping planning guide
                  </Link>{" "}
                  — keep fulfilment, transit, delivery and after-sales timing
                  separate.
                </li>
                <li>
                  <Link className="source-link" href="/faq/">
                    Hacoo Pro FAQ
                  </Link>{" "}
                  — understand the limits of this independent support resource.
                </li>
              </ul>
            </section>
            <div className="article-callout">
              <h2>Protect the deadline before perfecting the file.</h2>
              <p>
                Anchor the date, document the exact item and discrepancy, then
                preserve a traceable submission record.
              </p>
              <div className="article-callout-actions">
                <Link className="button light" href="/articles/">
                  All support articles <Arrow />
                </Link>
                <Link className="button quiet-dark" href="/faq/">
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
