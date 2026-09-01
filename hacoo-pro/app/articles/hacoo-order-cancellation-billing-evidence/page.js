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

const article = getArticle("hacoo-order-cancellation-billing-evidence");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "Hacoo Order Cancellation and Billing Evidence Guide",
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

export default function HacooCancellationBillingArticle() {
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
          "Hacoo order cancellation",
          "Hacoo billing question",
          "Hacoo pending charge",
          "Hacoo duplicate charge evidence",
        ],
        isAccessibleForFree: true,
        wordCount: 1520,
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
              Hacoo order and billing research
            </span>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>Hacoo Pro Editorial</span>
              <span>{article.read} read</span>
              <span>Published September 2, 2026</span>
              <span>Last checked {article.checkedLabel}</span>
            </div>
            <p>
              A request to stop an order and a question about a card or wallet
              entry are different problems. Fix the order status, transaction
              state and timeline before asking for an outcome.
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
            <a href="#boundary">Public boundary</a>
            <a href="#status">Order status</a>
            <a href="#billing">Billing record</a>
            <a href="#matrix">Decision matrix</a>
            <a href="#support">Support request</a>
            <a href="#security">Security</a>
            <a href="#faq">Questions</a>
          </aside>
          <div className="article-content research-copy">
            <section id="answer">
              <span className="section-label">The short answer</span>
              <h2>
                Identify whether the problem is the order, the payment record or
                both
              </h2>
              <p>
                Open the exact Hacoo order and record its current status, item
                lines, quantity, order reference and displayed total. Separately
                inspect the payment method for each related entry: pending
                authorisation, completed charge, reversal, refund or an entry
                that appears duplicated. Do not call a pending authorisation a
                completed payment, and do not assume that requesting
                cancellation automatically reverses a transaction. Save the time
                of every status and ask the official support channel one
                question tied to the current stage.
              </p>
              <p>
                If the order screen provides a cancellation control or
                instructions, use the live wording and preserve the
                confirmation. If it does not, do not copy a cancellation route,
                email template, deadline or refund promise from another person’s
                case. Hacoo’s current public pages do not publish a universal
                cancellation window or a single billing-resolution timetable for
                every order, region and payment method.
              </p>
              <div className="fact-card">
                <h3>Keep four records separate</h3>
                <dl>
                  <div>
                    <dt>Order state</dt>
                    <dd>What the exact order currently shows.</dd>
                  </div>
                  <div>
                    <dt>Requested action</dt>
                    <dd>What you asked Hacoo to consider and when.</dd>
                  </div>
                  <div>
                    <dt>Payment state</dt>
                    <dd>
                      What the payment provider currently labels pending,
                      completed, reversed or refunded.
                    </dd>
                  </div>
                  <div>
                    <dt>Final outcome</dt>
                    <dd>
                      A later result that must not be assumed while the request
                      is open.
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
            <section id="boundary">
              <h2>
                Use current public information only for the boundary it supports
              </h2>
              <p>
                Hacoo’s public Shipping and Delivery page, checked September 2,
                2026, says order processing normally takes three to five
                business days. Its wrong-address section says processing is
                accelerated and describes only a small window for correcting an
                address. Those statements make early action sensible, but they
                do not establish that every order can be cancelled during a
                fixed period.
              </p>
              <p>
                Processing language also does not explain the state of a bank,
                card or wallet entry. Payment providers may display an
                authorisation before final settlement, and wording differs by
                provider. Use the label and timestamp actually shown in the
                account. If an entry changes later, add a new dated record
                instead of editing the earlier observation.
              </p>
              <p>
                A creator tutorial can illustrate one interface at one time, but
                it cannot replace the authenticated order screen or the payment
                provider’s ledger. Menus, payment methods and operational routes
                can vary. Record what is available in the exact account without
                presenting it as a feature guaranteed to every user.
              </p>
            </section>
            <section id="status">
              <h2>
                Build an order-status snapshot before requesting cancellation
              </h2>
              <ol className="decision-list">
                <li>
                  <strong>Identify the order.</strong> Save the reference, item
                  names, selected options, quantities and displayed total.
                  Redact copies used outside the official support process.
                </li>
                <li>
                  <strong>Record the present state.</strong> Note the exact
                  status wording and timestamp. Do not translate a vague label
                  into “shipped,” “cancelled” or “refunded” without supporting
                  text.
                </li>
                <li>
                  <strong>Look for irreversible changes.</strong> Record whether
                  a tracking number, shipment group or other fulfilment event is
                  visible. Do not claim that a label proves carrier possession.
                </li>
                <li>
                  <strong>Check current controls.</strong> Save the options and
                  instructions actually offered for this order. Avoid using a
                  route copied from another region or an old app version.
                </li>
                <li>
                  <strong>State the request clearly.</strong> Name the order and
                  action you want considered. A request is not confirmation that
                  fulfilment stopped.
                </li>
              </ol>
              <p>
                If only one item is at issue, identify that line rather than
                asking to cancel “everything.” If several items show different
                states, keep them separate. This prevents a response about one
                item from being misread as a decision about the whole order.
              </p>
            </section>
            <section id="billing">
              <h2>Read the payment ledger without guessing</h2>
              <p>
                For every related payment entry, record the provider, displayed
                merchant text, date, amount, currency and current status.
                Preserve the order’s own displayed amount separately. A small
                difference can arise from currency conversion, issuer
                presentation or later settlement, but do not assign a cause
                without evidence. Ask the payment provider how its own labels
                work when necessary.
              </p>
              <h3>Pending authorisation</h3>
              <p>
                A pending entry is not enough to claim a final duplicate charge.
                Keep the original date and watch for settlement, expiry or
                reversal according to information supplied by the provider.
                Hacoo should be asked whether it has one or more recorded
                payment attempts for the order; the provider should explain its
                account entry.
              </p>
              <h3>Completed charge</h3>
              <p>
                Match a completed entry to the order reference, amount and
                currency. If no matching order appears, preserve both the
                payment record and the account’s order list. Do not post full
                card numbers, security codes or unredacted statements.
              </p>
              <h3>Refund or reversal</h3>
              <p>
                Separate the platform’s decision or confirmation from the
                provider’s ledger. Record the amount, currency, reference and
                date each source shows. A message that an action was initiated
                does not prove the final account posting time or exchange-rate
                result.
              </p>
            </section>
            <section id="matrix">
              <h2>Choose the next action from the evidence</h2>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Observed state</th>
                      <th>Useful record</th>
                      <th>Precise question</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Order active; cancel option visible</td>
                      <td>Order state, control wording and confirmation</td>
                      <td>Was the request accepted for this order line?</td>
                    </tr>
                    <tr>
                      <td>Order active; no cancel option visible</td>
                      <td>Status, timestamp and item lines</td>
                      <td>
                        Can fulfilment still be stopped, and what current
                        instruction applies?
                      </td>
                    </tr>
                    <tr>
                      <td>Payment pending; one order visible</td>
                      <td>Pending label, amount and order reference</td>
                      <td>
                        Does Hacoo record one payment attempt for this order?
                      </td>
                    </tr>
                    <tr>
                      <td>Two completed entries appear</td>
                      <td>
                        Both provider references and one or more order records
                      </td>
                      <td>
                        Which transaction reference is attached to each order?
                      </td>
                    </tr>
                    <tr>
                      <td>Refund confirmation; ledger unchanged</td>
                      <td>
                        Confirmation reference, amount, currency and provider
                        status
                      </td>
                      <td>
                        What transaction reference was used, and what should the
                        provider trace?
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Do not combine these rows into a generic “billing issue.” A bank
                can explain its ledger but cannot confirm whether warehouse work
                stopped. Hacoo can explain its order record but should not be
                asked to interpret a provider-specific pending label. Direct
                each question to the party positioned to answer it.
              </p>
            </section>
            <section id="support">
              <h2>Send a compact support request with one timeline</h2>
              <p>
                Lead with the order reference and current status, followed by
                the action requested. Add the payment reference only when the
                billing record is relevant. A useful format is: “Order [redacted
                reference] showed [exact status] at [time]. I requested [action]
                at [time]. My payment provider shows
                [pending/completed/reversed] for [amount and currency] under
                reference [redacted]. Please confirm the current order state and
                the transaction reference attached to it.”
              </p>
              <p>
                Attach only the evidence needed for the question. Screenshots
                should retain timestamps and labels while hiding unrelated
                transactions, account balances, addresses and full payment
                identifiers. Save the submission confirmation, case reference
                and exact text sent. If the answer introduces a new instruction,
                record it as a new dated stage rather than replacing the
                original request.
              </p>
              <p>
                Keep a status vocabulary: request prepared, submitted,
                acknowledged, clarification requested, cancellation confirmed,
                fulfilment continued, billing trace requested, reversal visible
                or closed. This prevents “I asked to cancel” from becoming “the
                order was cancelled” before the record supports it.
              </p>
            </section>
            <section id="security">
              <h2>Protect account and payment information</h2>
              <p>
                Use only the current official account and contact routes you can
                verify. Do not share passwords, one-time codes, full card
                numbers or security codes. Be cautious if an unsolicited message
                asks for remote access, a new payment, a return to an unverified
                address or conversation outside the official channel. Preserve
                the message and verify the instruction independently.
              </p>
              <p>
                If a transaction appears unauthorised rather than merely
                duplicated or pending, contact the payment provider through its
                official route promptly. That is a different issue from an
                ordinary cancellation request. Do not delay provider security
                steps while waiting for a general platform reply.
              </p>
            </section>
            <section id="faq">
              <h2>Questions about Hacoo cancellation and billing</h2>
              <h3>Does submitting a cancellation request stop fulfilment?</h3>
              <p>
                Not by itself. Preserve the request and wait for the
                authenticated order record or official response to confirm the
                current state.
              </p>
              <h3>Is a pending entry a duplicate charge?</h3>
              <p>
                Not necessarily. Record it as pending and compare order and
                transaction references. Ask the payment provider what its label
                means and Hacoo how many attempts it records.
              </p>
              <h3>Should I cancel through a creator link or message?</h3>
              <p>
                Use the current authenticated order controls and official
                contact route. Another user’s interface or address may be
                outdated or inapplicable.
              </p>
              <h3>What if the order and payment totals differ?</h3>
              <p>
                Save both currencies, amounts and timestamps. Do not invent a
                fee or exchange-rate explanation; ask each responsible party for
                the record it controls.
              </p>
            </section>
            <section aria-labelledby="related-support-records">
              <h2 id="related-support-records">
                Related Hacoo support records
              </h2>
              <p>
                Use the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-refund-instructions-checklist/"
                >
                  refund-instruction checklist
                </Link>{" "}
                when an after-sales form is active, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-after-sales-request-window-evidence/"
                >
                  after-sales deadline record
                </Link>{" "}
                for delivered items, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-wrong-address-evidence/"
                >
                  wrong-address workflow
                </Link>{" "}
                when destination accuracy is the urgent issue, the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-order-missing-item-split-shipment/"
                >
                  split-shipment checklist
                </Link>{" "}
                for partial fulfilment, and the{" "}
                <Link
                  className="source-link"
                  href="/articles/hacoo-tracking-not-updating/"
                >
                  tracking evidence guide
                </Link>{" "}
                after a shipment reference exists. Each guide addresses a
                different stage; do not treat one stage as proof of another.
              </p>
            </section>
            <section className="article-next">
              <span className="section-label">
                Continue the support workflow
              </span>
              <h2>Keep the live instruction and evidence together</h2>
              <p>
                Use the refund-instruction guide when an after-sales form is
                active, or the wrong-address guide when the destination record
                is the immediate problem.
              </p>
              <div className="article-link-row">
                <Link
                  className="text-link"
                  href="/articles/hacoo-refund-instructions-checklist/"
                >
                  Refund instructions <Arrow />
                </Link>
                <Link
                  className="text-link"
                  href="/articles/hacoo-wrong-address-evidence/"
                >
                  Wrong-address evidence <Arrow />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
