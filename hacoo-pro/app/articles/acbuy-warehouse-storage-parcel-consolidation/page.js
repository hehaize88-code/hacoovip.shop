import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow, CheckIcon } from "@/components/Icons";
import { SITE_URL } from "../../data";
import { createPageMetadata } from "../../seo";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../../schema";
import { getArticle } from "../data";

const article = getArticle("acbuy-warehouse-storage-parcel-consolidation");
const path = `/articles/${article.slug}`;
const url = pageUrl(path);
const imageUrl = `${SITE_URL}${article.image.path}`;
const imageId = `${url}#primaryimage`;

export const metadata = createPageMetadata({
  title: "ACbuy Warehouse Storage & Parcel Consolidation",
  description: article.description,
  path,
  alternates: { canonical: path },
  type: "article",
  image: { url: imageUrl, width: article.image.width, height: article.image.height, alt: article.image.alt },
});

function ExternalLink({ href, children }) {
  return <a className="source-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function AcbuyWarehouseArticle() {
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
      articleSection: "China shopping agent research",
      keywords: ["ACbuy warehouse storage", "ACbuy parcel consolidation", "ACbuy QC photos", "China shopping agent"],
      isAccessibleForFree: true,
      wordCount: 1740,
      citation: [
        "https://www.acbuy.com/home",
        "https://www.acbuy.com/shopping-guide",
        "https://www.easypost.com/blog/2024-09-17-package-consolidation-service-what-it-is-and-when-to-use-it/",
        "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/",
        "https://www.iopp.org/files/SmallParcelPkgGuiderev9-3-14.pdf",
      ],
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
          <span className="section-label">China shopping agent research</span>
          <h1>{article.title}</h1>
          <div className="article-meta"><span>Hacoo Pro Editorial</span><span>{article.read} read</span><span>Published July 19, 2026</span><span>Last checked {article.checkedLabel}</span></div>
          <p>The warehouse stage is where a shopping-agent order becomes a shipping decision. This guide explains what ACbuy currently says about photographs, storage, combining orders and the international-shipping deposit—and where a careful buyer still needs to verify the live account screen.</p>
        </div>
      </header>

      <figure className="wrap article-cover research-cover">
        <img src={article.image.path} width={article.image.width} height={article.image.height} alt={article.image.alt}/>
        <figcaption>{article.image.caption} Original graphic by Hacoo Pro; no customer data or platform artwork is reproduced.</figcaption>
      </figure>

      <div className="wrap article-body research-article-body">
        <aside aria-label="Article contents">
          <span>In this article</span>
          <a href="#short-answer">Short answer</a>
          <a href="#official-workflow">Official workflow</a>
          <a href="#qc-photos">QC-photo wording</a>
          <a href="#storage-clock">Storage clock</a>
          <a href="#consolidation">Consolidation decision</a>
          <a href="#checklist">Pre-shipping checklist</a>
          <a href="#packaging">Packaging and restrictions</a>
          <a href="#deposit">Shipping deposit</a>
          <a href="#faq">Questions</a>
          <a href="#sources">Sources checked</a>
        </aside>

        <div className="article-content research-copy">
          <section id="short-answer">
            <span className="section-label">The short answer</span>
            <h2>Do not submit a parcel just because every item says “Stored.”</h2>
            <p>“Stored” means the warehouse stage is available; it does not mean the group is ready to travel. Before consolidation, match each warehouse entry to the option you ordered, review the useful photographs, record any missing evidence, check whether the items can share a route, and compare the value of protective services against the added packed weight or volume.</p>
            <p>ACbuy's public <ExternalLink href="https://www.acbuy.com/shopping-guide">shopping guide</ExternalLink> describes receipt, inspection, weighing, photography and storage as one stage. It then lets users select stored orders for a parcel, choose from available shipping methods and pay an estimated international-shipping deposit. Those are platform descriptions, not an independent guarantee that a particular item, route or packing request will be accepted.</p>
            <div className="fact-card" aria-label="ACbuy warehouse facts checked July 19, 2026">
              <h3>Published facts worth recording</h3>
              <dl>
                <div><dt>QC photographs</dt><dd>The guide says “usually” three free photographs; the homepage advertises 3–5.</dd></div>
                <div><dt>Free storage</dt><dd>The guide states 90 days.</dd></div>
                <div><dt>Paid extension</dt><dd>The guide describes up to another 90 days, subject to its stated rules.</dd></div>
                <div><dt>Parcel price</dt><dd>The first payment is described as an estimate; final weight and volume are calculated after packing.</dd></div>
              </dl>
            </div>
          </section>

          <section id="official-workflow">
            <h2>What ACbuy says happens after a seller dispatches</h2>
            <p>According to the current guide, the order status can progress through review, purchase, seller dispatch, delivery, storage processing and finally “Stored.” At the warehouse, ACbuy says the item is received, inspected, weighed and photographed. The user can then find it under the warehouse area of the account. The guide also says an agent or customer service may contact the user when an order needs clarification.</p>
            <p>The public homepage presents the same flow more briefly: place orders, QC and storage, submit parcels, then international shipping. The mobile address currently redirects to <ExternalLink href="https://www.acbuy.com/home">ACbuy's www site</ExternalLink>, so this article uses the post-redirect pages as the source of record.</p>
          </section>

          <section id="qc-photos">
            <h2>Why the free-photo number needs a footnote</h2>
            <p>There is a small but important difference between ACbuy's own pages. The shopping guide says that users can check QC photos under an order and that “usually” three free photos are provided. The homepage card says “3-5 free QC photos.” A responsible summary should not silently turn those two statements into a guaranteed five-photo package.</p>
            <p>Treat the number and coverage shown inside the live order as decisive. Three clear photographs can be more useful than five repetitive angles, but they may still be insufficient for a fit-sensitive or specification-sensitive item. For footwear, look for both shoes together, the selected size label and a measurement view. For clothing, prioritize the exact colour and size, full front and back, label, and key flat measurements. For electronics, match the complete model, ports, power markings and included pieces; a generic product-family photograph is not enough.</p>
          </section>

          <section id="storage-clock">
            <h2>Use the 90-day window as planning time, not a target</h2>
            <p>ACbuy's guide currently advertises 90 days of free storage. It also describes a paid extension of up to 90 days, a 28-day grace period under specified no-extension or short-extension conditions, and automatic destruction after a cumulative total of 180 days including extensions. Because this is a high-consequence policy, verify the date and options displayed in your account rather than calculating from this article alone.</p>
            <p>Keep a simple warehouse register: order identifier, stored date, last free-storage date shown, option checked, outstanding question and intended parcel group. Use the earliest relevant deadline in the group, not the most recent arrival. Waiting for one late order can quietly consume the usable time on everything that arrived first.</p>
          </section>

          <section id="consolidation">
            <h2>Consolidation can reduce duplication, but “one box” is not always cheaper</h2>
            <p>In consumer forwarding, parcel consolidation generally means collecting multiple orders and shipping them together. <ExternalLink href="https://www.easypost.com/blog/2024-09-17-package-consolidation-service-what-it-is-and-when-to-use-it/">EasyPost's logistics explainer</ExternalLink> distinguishes that use from carrier-scale consolidation, where many parcels are grouped for transport and separated later. ACbuy uses the consumer-facing version: select stored orders and have the warehouse combine the submitted group.</p>
            <p>Combining orders may remove duplicated outer packaging and avoid paying a separate base charge for several small parcels. ACbuy itself says combining more products can save shipping cost. However, that is a general platform claim, not a promise for every basket. Rates may depend on chargeable weight, actual weight, volume, route, destination and service. A larger consolidated carton can cross a weight or dimension threshold, and one restricted product can narrow the routes for the entire group.</p>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th>Keep together when</th><th>Consider splitting when</th></tr></thead>
                <tbody>
                  <tr><td>Items are compatible, compact and accepted by the same route.</td><td>One item is restricted, liquid, battery-powered, unusually valuable or especially fragile.</td></tr>
                  <tr><td>Removing duplicate retail boxes clearly reduces unused volume.</td><td>A bulky box is wanted for protection, resale or identification.</td></tr>
                  <tr><td>The combined estimate remains inside a useful line's limits.</td><td>The combined dimensions or weight appear close to a route threshold.</td></tr>
                  <tr><td>All items have been checked and have comfortable storage time remaining.</td><td>One order is unresolved or is delaying items with an earlier deadline.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="checklist">
            <h2>A practical pre-shipping checklist</h2>
            <ol className="decision-list">
              <li><span>1</span><div><strong>Match every warehouse entry.</strong><p>Confirm product, option, quantity and visible identifiers. Do not let a similar thumbnail stand in for the exact size, colour or model.</p></div></li>
              <li><span>2</span><div><strong>Review evidence by risk.</strong><p>Prioritize measurements for fit, labels and ports for compatibility, and close views for seams, hardware, screens or fragile surfaces.</p></div></li>
              <li><span>3</span><div><strong>Record the storage deadline.</strong><p>Use the account's displayed date and leave time for questions, parcel processing and any correction. Do not build a plan around the maximum published period.</p></div></li>
              <li><span>4</span><div><strong>Check route compatibility.</strong><p>Confirm that batteries, liquids, magnets, powders, food, branded goods or other controlled categories do not remove the line you intended to use.</p></div></li>
              <li><span>5</span><div><strong>Choose what to remove.</strong><p>Retail packaging can add volume, but it may also provide structure, identification or protection. Decide item by item instead of requesting universal box removal.</p></div></li>
              <li><span>6</span><div><strong>Choose protective services deliberately.</strong><p>ACbuy lists bubble wrap, vacuum bags, stretch film, parcel reinforcement and insurance. Match each service to the contents; a vacuum bag may suit soft clothing but not a structured item.</p></div></li>
              <li><span>7</span><div><strong>Compare at least two parcel plans.</strong><p>Price a sensible combined group and a sensible split. Compare route availability and chargeable dimensions, not only the headline estimate.</p></div></li>
              <li><span>8</span><div><strong>Save the live terms.</strong><p>Keep the selected line, declared contents, packaging request, estimate and applicable protection terms together. A dated record is more useful than memory if support is needed later.</p></div></li>
            </ol>
          </section>

          <section id="packaging">
            <h2>Packaging protects against handling; it cannot erase every risk</h2>
            <p>The independent <ExternalLink href="https://www.iopp.org/files/SmallParcelPkgGuiderev9-3-14.pdf">Institute of Packaging Professionals small-parcel guide</ExternalLink> describes shock, vibration, compression, climate and handling as recurring package hazards. It recommends controlling movement, filling voids and protecting surfaces. Its scope is domestic small-parcel transport and it explicitly excludes overseas shipments, so it is useful as handling context—not as a rulebook for an ACbuy international parcel.</p>
            <p>Route restrictions deserve a separate check. ACbuy says its submission screen filters available methods for products subject to restrictions. For batteries, the concern is wider than one platform: <ExternalLink href="https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/">IATA classifies batteries as dangerous goods</ExternalLink> and notes that transport requirements depend on battery type, configuration and rating. Never disguise an item's contents or assume that a route available for clothing will accept a power bank.</p>
          </section>

          <section id="deposit">
            <h2>Understand what the international-shipping deposit is—and is not</h2>
            <p>ACbuy's guide says the parcel deposit is estimated from weight, volume, destination and shipping line. It describes customs-clearance fees, warehouse-handling fees and selected value-added services as components, then says the shipping amount is recalculated after packing from final weight and volume. If the final amount is lower, the guide says the excess is refunded; if higher, the user pays the difference.</p>
            <p>That means the deposit should not be quoted as a final universal price in a review or comparison. Save the pre-pack estimate, then compare it with the packed result. If the difference is material, look first at final dimensions, final weight, added packaging, removed packaging and the selected line. Tracking is a later stage: the guide says updates are usually visible around three days after a parcel is marked shipped, but that wording is not a guaranteed delivery or scanning deadline.</p>
          </section>

          <section id="faq">
            <h2>Questions buyers usually ask at the warehouse stage</h2>
            <div className="article-faq">
              <details open><summary>Does ACbuy always provide five free QC photos?<span>+</span></summary><p>No single current public statement supports “always five.” The homepage advertises 3–5, while the shopping guide says usually three. Check the photographs actually attached to the order and request a specific missing view when necessary.</p></details>
              <details><summary>Is 90 days the deadline for every stored order?<span>+</span></summary><p>The public guide states 90 days of free storage and describes extensions and a grace period, but the date displayed in the account should control your plan. Policies can change, and waiting until the last day leaves no room for a query or parcel correction.</p></details>
              <details><summary>Will consolidation always reduce the shipping price?<span>+</span></summary><p>No. It can remove duplicated packaging and base charges, but a larger parcel can reach a different chargeable-weight or size tier. Restricted or fragile items may also make a split more sensible.</p></details>
              <details><summary>When is rehearsal packaging useful?<span>+</span></summary><p>It is most useful when improved weight-and-volume information could change the route, parcel split or packaging decision. ACbuy describes it as a paid simulation, not the actual final packing.</p></details>
              <details><summary>Can QC photographs prove authenticity or performance?</summary><p>No. Photographs can help confirm visible option, measurements, labels, condition and construction. They cannot establish authenticity, long-term performance or every internal specification.</p></details>
            </div>
          </section>

          <section id="sources" className="sources-panel">
            <h2>Sources checked</h2>
            <p><strong>Research date:</strong> July 19, 2026. Platform details below are ACbuy's own published statements and may change.</p>
            <ul>
              <li><ExternalLink href="https://www.acbuy.com/home">ACbuy homepage</ExternalLink> — public workflow and the “3-5 free QC photos” card.</li>
              <li><ExternalLink href="https://www.acbuy.com/shopping-guide">ACbuy shopping guide</ExternalLink> — order status, QC, storage, parcel submission, services, deposit and tracking wording.</li>
              <li><ExternalLink href="https://www.easypost.com/blog/2024-09-17-package-consolidation-service-what-it-is-and-when-to-use-it/">EasyPost package-consolidation explainer</ExternalLink> — independent terminology and logistics context.</li>
              <li><ExternalLink href="https://www.iopp.org/files/SmallParcelPkgGuiderev9-3-14.pdf">IoPP small-parcel packaging guide</ExternalLink> — independent handling and packaging context; domestic scope noted above.</li>
              <li><ExternalLink href="https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/">IATA battery guidance</ExternalLink> — independent dangerous-goods context for battery products.</li>
            </ul>
          </section>

          <div className="article-callout">
            <h2>Keep product checks separate from platform claims.</h2>
            <p>Use the warehouse checklist for the evidence in front of you, then confirm current options and terms on the relevant live page.</p>
            <div className="article-callout-actions"><Link className="button light" href="/guides/qc-photo-checklist/">Open the QC checklist <Arrow/></Link><Link className="button quiet-dark" href="/articles/">All research articles</Link></div>
          </div>
        </div>
      </div>
    </article>
  </>;
}
