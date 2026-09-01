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

const article = getArticle("hacoo-refund-instructions-checklist");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo Refund Instructions: Evidence Checklist",
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

export default function HacooRefundInstructionsArticle() {
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
          "Hacoo refund instructions",
          "Hacoo refund evidence checklist",
          "Hacoo refund request steps",
          "Hacoo refund submission record",
        ],
        isAccessibleForFree: true,
        wordCount: 1352,
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
            <span className="section-label">Hacoo refund request research</span>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>Hacoo Pro Editorial</span>
              <span>{article.read} read</span>
              <span>Published August 31, 2026</span>
              <span>Last checked {article.checkedLabel}</span>
            </div>
            <p>
              A refund instruction is a live set of fields and actions, not a
              promise of approval. Read the current order screen, match every
              answer to evidence, and save exactly what you submit.
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
            no customer, order, address or payment information.
          </figcaption>
        </figure>
        <div className="wrap article-body research-article-body">
          <aside aria-label="Article contents">
            <span>In this article</span>
            <a href="#answer">Short answer</a>
            <a href="#baseline">Official baseline</a>
            <a href="#before">Before opening</a>
            <a href="#fields">Instruction fields</a>
            <a href="#matrix">Evidence matrix</a>
            <a href="#submit">Submit and preserve</a>
            <a href="#mistakes">Mistakes</a>
            <a href="#faq">Questions</a>
          </aside>
          <div className="article-content research-copy">
            <section id="answer">
              <span className="section-label">The short answer</span>
              <h2>Let the live instructions define the task</h2>
              <p>
                Open the exact Hacoo order and use the refund or after-sales
                instructions shown there. Record the affected order line,
                selected colour or size, quantity, delivery status and the
                specific problem. Then prepare only the evidence requested for
                that problem. Do not select a stronger category simply because
                it sounds more urgent, and do not describe a preferred outcome
                as though Hacoo has already authorised it.
              </p>
              <p>
                Hacoo's public Shipping &amp; Delivery page, checked on August
                31, 2026, says users should request after-sales service within
                15 days of delivery and follow the refund instructions. That
                statement provides a timing baseline and points users back to
                the live workflow. It does not publish a universal refund
                amount, approval rule, return method or resolution time for
                every item and region.
              </p>
              <div className="fact-card">
                <h3>Keep four layers separate</h3>
                <dl>
                  <div>
                    <dt>Published baseline</dt>
                    <dd>
                      The current public timing and direction to follow refund
                      instructions.
                    </dd>
                  </div>
                  <div>
                    <dt>Live instruction</dt>
                    <dd>
                      The fields, evidence prompts and next action shown for the
                      exact order.
                    </dd>
                  </div>
                  <div>
                    <dt>Your record</dt>
                    <dd>
                      What arrived, what differs and what dated evidence you can
                      provide.
                    </dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>
                      A later decision that must not be assumed while preparing
                      the request.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section id="baseline">
              <h2>Read the official wording without expanding it</h2>
              <p>
                “Follow the refund instructions” means the current interface is
                operationally important. A cached screenshot, creator tutorial
                or old blog post may omit a required field or show a route that
                is no longer available. Use outside material only to understand
                general record keeping; use the authenticated order flow for the
                action itself.
              </p>
              <p>
                The public timing is an outer boundary, not a reason to delay.
                Preserve the platform's displayed delivery date and begin as
                soon as the issue is found. If parcels were split, identify the
                tracking reference linked to the affected item rather than
                treating the first delivery as proof that the complete order
                arrived. If the live screen shows a different instruction or
                deadline, save it and ask the official support channel which
                applies.
              </p>
              <p>
                Avoid converting an instruction into a guarantee. An upload
                field proves that evidence can be submitted; it does not prove
                that a particular remedy will be granted. A return address or
                label should come from the live instructions, not from another
                customer's post or an address copied from packaging.
              </p>
            </section>

            <section id="before">
              <h2>Prepare a compact issue record before opening the form</h2>
              <ol className="decision-list">
                <li>
                  <strong>Identify one affected order line.</strong> Save the
                  visible item title, order number, selected option and
                  quantity. If several items have different problems, keep
                  separate notes so evidence cannot be assigned to the wrong
                  line.
                </li>
                <li>
                  <strong>Write one factual issue sentence.</strong> Prefer “one
                  blue, size M item arrived; the order line shows two” to “my
                  order is a disaster.” Describe what is observable before
                  explaining the requested resolution.
                </li>
                <li>
                  <strong>Create a dated evidence folder.</strong> Keep the
                  order screen, packaging label where relevant, full-item view
                  and close-up together. Redact copies used outside the official
                  channel, but retain an unedited private original.
                </li>
                <li>
                  <strong>Record the timeline.</strong> Note delivery,
                  inspection, first observation and submission dates. Do not
                  alter file dates or replace earlier evidence when new
                  information appears.
                </li>
                <li>
                  <strong>Check the live prompts.</strong> List required photo
                  angles, video, text limits or selection fields before
                  composing. Requirements can differ by issue and may change.
                </li>
              </ol>
            </section>

            <section id="fields">
              <h2>Answer each instruction field at its own scope</h2>
              <h3>Issue category</h3>
              <p>
                Choose the narrowest accurate category. Wrong variant, missing
                quantity, visible damage and fit preference are not
                interchangeable. If none matches, do not force the evidence into
                a misleading label; preserve the available choices and use the
                official contact route to ask how the issue should be filed.
              </p>
              <h3>Description</h3>
              <p>
                Lead with identity and difference: what the saved order shows,
                what was received and how you verified the mismatch. Include
                measurements only with endpoints and method. Avoid authenticity
                verdicts, material claims based on touch, or durability claims
                from a first inspection. Mark unknown details as unknown.
              </p>
              <h3>Evidence upload</h3>
              <p>
                Use an overview to establish item identity, then a close-up to
                show the issue. Keep lighting neutral enough to avoid turning a
                colour cast into alleged product evidence. For quantity or
                included-part questions, photograph the complete received set in
                one frame before adding detailed views. Never edit away context
                that determines scale or location.
              </p>
              <h3>Requested action</h3>
              <p>
                State the action you are asking Hacoo to consider without
                announcing that it is owed or approved. Follow any displayed
                return, label or disposal instruction exactly. Do not ship an
                item to an address, pay an extra charge or destroy evidence
                based solely on an unofficial message.
              </p>
            </section>

            <section id="matrix">
              <h2>Match the problem to evidence, not emotion</h2>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Minimum useful record</th>
                      <th>Important limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wrong option</td>
                      <td>Saved selection, received label and full item</td>
                      <td>A label alone may not show the entire product</td>
                    </tr>
                    <tr>
                      <td>Missing quantity</td>
                      <td>
                        Order quantity, complete received set and packaging
                        context
                      </td>
                      <td>Check split-shipment status first</td>
                    </tr>
                    <tr>
                      <td>Visible damage</td>
                      <td>
                        Overview, close-up, location and first-observed date
                      </td>
                      <td>Do not claim an unseen cause</td>
                    </tr>
                    <tr>
                      <td>Measurement difference</td>
                      <td>
                        Reference value, endpoints, tool and repeat reading
                      </td>
                      <td>
                        Do not convert one measure into a universal fit claim
                      </td>
                    </tr>
                    <tr>
                      <td>Colour difference</td>
                      <td>Saved option plus neutral-light full view</td>
                      <td>Screen and lighting can change appearance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="submit">
              <h2>Preserve the submission and every next instruction</h2>
              <p>
                Before pressing submit, reread the selected order line,
                category, quantity and requested action. Confirm that uploads
                opened correctly and that no image exposes information outside
                what the official process requires. Then save the confirmation,
                case or request identifier, timestamp and the exact text sent.
              </p>
              <p>
                Treat later instructions as a new dated stage. Record who sent
                them, through which official channel, what action is requested
                and any displayed deadline. If a reply asks for different
                evidence, add it to the case folder; do not delete the original
                submission. If instructions conflict, quote both references and
                ask for clarification before taking an irreversible action.
              </p>
              <p>
                A good record ends with status, not speculation: submitted,
                awaiting information, action requested, decision received or
                closed. Keep delivery experience, product evidence and service
                response in separate fields. That separation makes follow-up
                easier and prevents one disappointing stage from becoming an
                unsupported claim about the whole platform.
              </p>
            </section>

            <section id="mistakes">
              <h2>Avoid the mistakes that weaken a refund request</h2>
              <ul>
                <li>
                  Waiting for perfect evidence until the published window is
                  nearly over.
                </li>
                <li>
                  Uploading a close-up without an overview that identifies the
                  item.
                </li>
                <li>
                  Combining multiple order lines and different problems into one
                  unclear narrative.
                </li>
                <li>
                  Using edited colour, cropped labels or annotations that hide
                  original context.
                </li>
                <li>
                  Copying a return address, fee or remedy from another user's
                  case.
                </li>
                <li>
                  Calling a request “approved” before the official record says
                  so.
                </li>
                <li>
                  Deleting the initial submission after supplying follow-up
                  evidence.
                </li>
              </ul>
            </section>

            <section id="faq">
              <h2>Questions about Hacoo refund instructions</h2>
              <h3>Does submitting within 15 days guarantee a refund?</h3>
              <p>
                No. It addresses the published timing baseline, not eligibility,
                evidence quality or the eventual decision.
              </p>
              <h3>Should I use an address found on the parcel?</h3>
              <p>
                Only use a return destination or label supplied through the
                current official instructions for the case.
              </p>
              <h3>What if a required detail is unavailable?</h3>
              <p>
                State what is missing and why, provide the evidence you do have,
                and ask the official channel what alternative is acceptable.
              </p>
              <h3>Can I rely on a creator's refund tutorial?</h3>
              <p>
                It may illustrate one experience, but it cannot replace the
                current instructions attached to your order, region and issue.
              </p>
            </section>

            <section aria-labelledby="related-support-guides">
              <h2 id="related-support-guides">Related support guides</h2>
              <p>
                Use the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-after-sales-request-window-evidence/"
                >
                  after-sales deadline record
                </Link>{" "}
                to anchor timing, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-order-missing-item-split-shipment/"
                >
                  split-shipment checklist
                </Link>{" "}
                before describing missing quantity, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-tracking-not-updating/"
                >
                  tracking status guide
                </Link>{" "}
                for stalled events, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-marked-delivered-not-received/"
                >
                  delivered-but-missing workflow
                </Link>{" "}
                for a missing parcel, and the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-wrong-address-evidence/"
                >
                  wrong-address evidence guide
                </Link>{" "}
                when the destination record is the problem. For a request made
                before fulfilment or a payment-ledger question, use the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-order-cancellation-billing-evidence/"
                >
                  cancellation and billing evidence guide
                </Link>
                .
              </p>
            </section>

            <div className="article-cta">
              <div>
                <span className="section-label">
                  Continue the support workflow
                </span>
                <h2>Keep timing and issue identity attached</h2>
                <p>
                  Use the deadline guide for timing, or check split shipments
                  before reporting a missing item.
                </p>
              </div>
              <div className="article-cta-actions">
                <Link
                  className="primary-btn"
                  href="/articles/hacoo-after-sales-request-window-evidence/"
                >
                  Deadline evidence guide <Arrow />
                </Link>
                <Link
                  className="secondary-btn"
                  href="/articles/hacoo-order-missing-item-split-shipment/"
                >
                  Split-shipment checklist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
