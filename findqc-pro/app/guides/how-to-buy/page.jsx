import Link from "next/link";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import SearchBox from "../../../components/SearchBox";
import { ArrowIcon, CheckIcon, ExternalIcon } from "../../../components/Icons";
import T from "../../../components/LocalizedText";

export const metadata = {
  title: "How to Buy More Carefully: Search to Shipment",
  description: "Follow a practical workflow for product search, source-page verification, option records, warehouse QC review and shipment approval.",
  alternates: { canonical: "/guides/how-to-buy" },
};

export default function HowToBuyPage() {
  return (
    <article className="shell inner-page guide-article expanded-guide">
      <Breadcrumbs items={[{ labelKey: "nav.guides", href: "/guides" }, { labelKey: "howBuy.crumb" }]} />
      <PageHero eyebrow={<T id="howBuy.eyebrow" />} title={<><T id="howBuy.title1" /><br /><em><T id="howBuy.title2" /></em></>} intro={<T id="howBuy.intro" />} ><SearchBox compact /></PageHero>

      <section className="official-search-methods" aria-labelledby="search-method-title">
        <header>
          <span className="eyebrow light">Documented by FindQC Academy</span>
          <h2 id="search-method-title">Choose the search route from the clue you already have.</h2>
          <p>FindQC’s official Academy compares link, image and keyword search. Each route solves a different starting problem; none removes the need to verify the resulting source listing.</p>
          <a href="https://academy.findqc.com/2024/12/21/mastering-qc-finder-choosing-the-best-search-method/" target="_blank" rel="noopener noreferrer">Read the official search guide <ExternalIcon size={16} /></a>
        </header>
        <div>
          <article><span>01 / Most exact</span><h3>Link search</h3><p>Use it when you already have a valid marketplace, supplier or agent link and want the closest route to records for that listing. A removed or broken link can stop resolving.</p></article>
          <article><span>02 / Visual clue</span><h3>Image search</h3><p>Use it when you recognise the item but lack reliable wording. Crop, quality and camera angle affect similarity results, so confirm the seller, model and option afterwards.</p></article>
          <article><span>03 / Broad discovery</span><h3>Keyword search</h3><p>Use specific combined terms when exploring a category or model. Wording and language influence relevance, and broader results usually require more filtering.</p></article>
        </div>
      </section>

      <section className="buy-workflow-intro" aria-labelledby="workflow-title">
        <span className="depth-number">01—06</span>
        <div><small>Practical workflow</small><h2 id="workflow-title">Keep the source page, selected option and warehouse evidence connected.</h2></div>
        <p>The most common preventable errors happen when one of those three records is missing: the right-looking item leads to a different listing, an option is remembered incorrectly, or a warehouse image is reviewed without the original order beside it.</p>
      </section>

      <section className="buy-steps">
        {[1, 2, 3, 4, 5, 6].map((number, index) => <div key={number}><span>0{index + 1}</span><h2><T id={`howBuy.steps.${number}.title`} /></h2><p><T id={`howBuy.steps.${number}.text`} /></p></div>)}
      </section>
      <div className="article-callout wide"><strong><T id="howBuy.calloutTitle" /></strong><p><T id="howBuy.calloutText" /></p></div>

      <section className="order-record" aria-labelledby="order-record-title">
        <div>
          <span className="eyebrow">Copy before ordering</span>
          <h2 id="order-record-title">A compact order record prevents guesswork later.</h2>
          <p>Save facts that can be compared when the parcel reaches the warehouse. Keep personal payment information out of screenshots you share publicly.</p>
        </div>
        <ul>
          <li><CheckIcon size={17} /><span><strong>Source identity</strong>Product URL, item ID, seller name if shown, and date checked.</span></li>
          <li><CheckIcon size={17} /><span><strong>Selected option</strong>Colour, size, model, version, quantity and any custom text.</span></li>
          <li><CheckIcon size={17} /><span><strong>Included parts</strong>Only items explicitly listed for the selected bundle or option.</span></li>
          <li><CheckIcon size={17} /><span><strong>Fit reference</strong>Relevant seller chart plus measurements from a comparable item you own.</span></li>
          <li><CheckIcon size={17} /><span><strong>Special request</strong>Any agreed note, optional inspection or packing request and its confirmed scope.</span></li>
          <li><CheckIcon size={17} /><span><strong>Decision status</strong>Approve, request one piece of evidence, or resolve a defined mismatch.</span></li>
        </ul>
      </section>

      <section className="cost-boundaries" aria-labelledby="cost-boundary-title">
        <header>
          <span className="eyebrow light">Costs and responsibility</span>
          <h2 id="cost-boundary-title">A product price is not a delivered-price quote.</h2>
          <p>Check the current terms of the service that will actually handle the purchase and parcel. Do not copy fees or promises from an unrelated platform.</p>
        </header>
        <div>
          <article><span>01</span><h3>Before the warehouse</h3><p>The item price may be joined by domestic delivery, a purchasing-service charge or optional seller services. Availability and option pricing can change, so confirm the live checkout information.</p></article>
          <article><span>02</span><h3>At the warehouse</h3><p>Extra photographs, measurements, testing, storage, rehearsal, packing or reinforcement may have separate rules and fees. Ask the service handling the order for its current scope before relying on one.</p></article>
          <article><span>03</span><h3>International shipment</h3><p>Chargeable weight, parcel dimensions, route, destination, restricted contents, insurance and customs treatment affect the final result. Historical haul data is context, not a quote for your parcel.</p></article>
        </div>
      </section>

      <section className="guide-source-note purchase-boundary" aria-label="FindQC transaction boundary">
        <div><span>Official FindQC boundary</span><strong>FindQC is not the seller or freight forwarder.</strong></div>
        <p>Its current Terms say payments, shipping and returns are handled by third parties, and that buyers are responsible for evaluating risk. FindQC Pro likewise provides independent discovery and educational guidance; it does not take orders, inspect goods or guarantee external services.</p>
        <a href="https://findqc.com/terms-of-service" target="_blank" rel="noopener noreferrer">Verify on FindQC <ExternalIcon size={16} /></a>
      </section>

      <nav className="guide-next-links" aria-label="Continue the workflow">
        <Link href="/products"><small>Start with a mapped item</small><strong>Browse exact product source pages</strong><ArrowIcon /></Link>
        <Link href="/guides/qc-photo-checklist"><small>Use at the warehouse</small><strong>Open the seven-stage QC checklist</strong><ArrowIcon /></Link>
        <Link href="/categories"><small>Choose the product type</small><strong>Read category-specific QC advice</strong><ArrowIcon /></Link>
      </nav>
    </article>
  );
}
