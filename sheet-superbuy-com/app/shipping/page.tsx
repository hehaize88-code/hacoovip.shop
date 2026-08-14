import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PageHero, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "Superbuy Shipping Calculator & Parcel Planning Guide",
  description:
    "A fact-checked Superbuy shipping planner covering two-stage costs, chargeable weight, consolidation, packaging, route restrictions, insurance, customs, and final freight adjustments.",
};

const shippingSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Superbuy Shipping Calculator & Parcel Planning Guide",
  description: "How to estimate and plan a Superbuy parcel using current official service facts and independent cost-control advice.",
  datePublished: "2026-08-14",
  dateModified: "2026-08-14",
  author: { "@type": "Organization", name: "SheetSuperbuy editorial" },
};

export default function ShippingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Parcel planner"
          title="The item price is not the landed cost."
          intro="A defensible estimate separates the purchase-to-warehouse stage from the warehouse-to-destination stage, then replaces guesses with measured parcel data before a shipping line is chosen."
          aside="Superbuy currently advertises 90 days of free storage and more than 100 shipping lines. The live options for one parcel will still depend on destination, packed dimensions, item category, restrictions, declared contents, and current route rules."
        />

        <section className="content-section content-shell">
          <div className="research-note">
            <span>FACT CHECK · 14 AUGUST 2026</span>
            <p>Reviewed against Superbuy&apos;s official fee structure, user guidance, forwarding guide, shipping calculator, help centre, and service terms. Prices, route names, limits, and temporary notices can change; confirm the live parcel screen before payment.</p>
          </div>
          <h2>Understand the two bills before estimating anything</h2>
          <p>
            Superbuy&apos;s official fee structure separates the journey into two main stages. Stage one covers the product&apos;s original price, seller-to-warehouse domestic delivery, any purchasing service fee that applies to the source, and optional services selected before or during warehousing. Stage two covers international freight after the warehouse items are packed into a parcel, plus any optional parcel services. Local taxes, duties, brokerage, handling, or remote-delivery fees may arise under destination rules and should be treated as a third planning layer even when they are not collected by the shopping agent.
          </p>
          <p>
            As reviewed on 14 August 2026, Superbuy describes standard purchasing service for mainstream platforms such as Taobao, Tmall, JD.com, and 1688 as free of a percentage service fee. That does not make the whole order free: the item, domestic courier charge, payment or exchange costs, optional photos or services, and international parcel remain separate. Other sources and specialised services can have fees. The official schedule currently lists different treatment for second-hand platforms, unlisted platforms, and Shipping Expert orders, so verify the source category shown on the live order rather than applying one headline to every purchase.
          </p>
          <div className="info-grid">
            <article className="info-card"><span>STAGE 01</span><h3>Purchase to warehouse</h3><p>Product, domestic delivery, source-specific purchasing fee where applicable, and optional order or inspection services.</p></article>
            <article className="info-card"><span>STAGE 02</span><h3>Warehouse to you</h3><p>International freight, packing choices, route surcharges, insurance where offered, and other parcel services.</p></article>
            <article className="info-card"><span>DESTINATION</span><h3>Local charges</h3><p>Tax, duty, customs processing, brokerage, handling, or remote-area costs depend on the destination and shipment.</p></article>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>Use the calculator as a scenario tool, not a quote</h2>
          <p>
            Before purchase, a shipping calculator can compare rough scenarios: one pair of shoes with its retail box, the same pair without the box, or several soft garments consolidated together. Enter the correct destination, a realistic item category, and conservative weight and dimensions. If the seller provides only product weight, remember that international freight uses the packed parcel, including outer carton and protection. An early calculation is most useful for rejecting an obviously uneconomic plan, not for promising the final cost to the cent.
          </p>
          <p>
            Superbuy&apos;s user guide explains that the international shipping payment begins as a deposit based on estimated product weight, selected method, and destination. The final shipping fee is calculated after the package size and weight are verified. If the final amount differs from the deposit, the difference is returned to the Superbuy account after shipment. This is why an estimated charge and a settled charge can differ without either screen necessarily being incorrect.
          </p>
          <p>
            Build three estimates rather than one. A low scenario can assume compact packing and an economical eligible line. An expected scenario should use realistic protection and a route you would actually choose. A high scenario should allow for volumetric billing, a split parcel, exchange-rate movement, or a more expensive eligible line. If the purchase only makes sense under the low scenario, the margin is too fragile.
          </p>
          <div className="callout"><strong>Replace estimates in stages.</strong><p>Seller data is useful before purchase. Warehouse item measurements are better after arrival. Packed parcel weight and dimensions, together with the live eligible routes, are the strongest inputs before international payment.</p></div>
        </section>

        <section className="content-section content-shell">
          <h2>Actual weight and volumetric weight answer different questions</h2>
          <p>
            Actual weight is what the parcel weighs on a scale. Volumetric weight assigns a billing weight to the space it occupies. A dense parcel may be charged by actual weight, while a light puffer jacket, large shoebox, plush toy, or protective display box may be charged by volume. Carriers and routes use their own divisors, minimums, charge units, rounding, and oversize rules, so a formula copied from one line should not be presented as universal.
          </p>
          <p>
            Packaging choices therefore affect both protection and cost. Removing an ordinary retail box may lower volume, but retaining a structured box may protect a collectible or something you value. Vacuum packing can reduce the volume of suitable soft goods but may crease certain materials. Corner protection, reinforcement, moisture protection, and stronger outer packaging can add weight or size while reducing a different risk. The goal is not the smallest possible parcel; it is the lowest defensible total cost for the protection the contents need.
          </p>
          <ul className="checklist">
            <li><strong>Compare with and without expendable boxes.</strong> Keep packaging only when protection, resale, storage, or personal value justifies its space.</li>
            <li><strong>Separate fragile from compressible goods.</strong> One packing method is rarely ideal for glass, shoes, clothing, and electronics together.</li>
            <li><strong>Ask for better parcel data when uncertainty is expensive.</strong> A rehearsal or pre-pack option, when available, can make route comparisons more realistic.</li>
            <li><strong>Check each route&apos;s calculation rules.</strong> Initial weight, additional weight, rounding, volumetric divisor, and oversize treatment can differ.</li>
          </ul>
        </section>

        <section className="content-section content-shell">
          <h2>Use consolidation deliberately—not automatically</h2>
          <p>
            Consolidation allows eligible warehouse items from separate orders to share an international parcel. It can reduce repeated base charges and remove unnecessary domestic packaging. Superbuy advertises 90 days of free storage, which creates a planning window for several arrivals. However, warehouse storage and a seller&apos;s return window are not the same clock. Inspect each item promptly even if you intend to wait for more products.
          </p>
          <p>
            The largest possible parcel is not always the cheapest or safest. A heavy or oversized combination can cross a route limit, trigger higher volumetric billing, concentrate too much value in one shipment, or leave only sea or special lines available. A battery, liquid, magnet, fragile item, or restricted category can also remove ordinary lines from the entire consolidated parcel. Compare one large parcel with two purposeful parcels grouped by restriction, fragility, urgency, and value.
          </p>
          <div className="info-grid">
            <article className="info-card"><span>GROUP</span><h3>Compatible items</h3><p>Combine products with similar route eligibility, packing needs, delivery urgency, and risk tolerance.</p></article>
            <article className="info-card"><span>SPLIT</span><h3>Restrictive items</h3><p>Test whether one battery, magnet, liquid, fragile item, or oversized box is narrowing every route choice.</p></article>
            <article className="info-card"><span>TRACK</span><h3>Oldest arrival</h3><p>Record warehouse dates and current storage rules; do not let consolidation planning obscure return or storage deadlines.</p></article>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>Choose among the lines your parcel can actually use</h2>
          <p>
            “What is the best Superbuy shipping line?” has no stable universal answer. The meaningful comparison begins after the warehouse knows the destination, packed weight and dimensions, item categories, restrictions, and declared contents. Superbuy may advertise more than 100 lines overall, but the eligible list for one parcel can be much shorter. Temporary capacity, policy, and price notices can also change the list.
          </p>
          <p>
            Compare total quoted cost, chargeable-weight method, estimated transit range, tracking depth, carrier handoffs, prohibited-item rules, value limits, insurance or compensation terms, and customs model. Estimated delivery time is not a guarantee: export processing, seasonal volume, flight capacity, weather, customs, and the destination carrier can create delays. The cheapest route may be rational for a low-value, non-urgent parcel, while stronger tracking or cover may be worth more for a fragile or difficult-to-replace shipment.
          </p>
          <ol className="checklist">
            <li><strong>Filter for eligibility first.</strong> Do not compare a price from a line that cannot accept the parcel&apos;s contents or dimensions.</li>
            <li><strong>Compare chargeable weight.</strong> The same box can produce different billed weights under different route formulas.</li>
            <li><strong>Read tracking and claim terms.</strong> Note exclusions, evidence requirements, filing windows, and maximum compensation.</li>
            <li><strong>Check destination handling.</strong> Understand likely carrier handoffs, customs model, tax collection, and last-mile constraints.</li>
            <li><strong>Save the selected terms.</strong> Keep the quote and key rules that were visible when the parcel was submitted.</li>
          </ol>
        </section>

        <section className="content-section content-shell">
          <h2>Customs, insurance, and tracking need separate expectations</h2>
          <p>
            Customs rules belong to the destination country or region. Product category, origin, value, quantity, intended use, and local thresholds can affect admissibility, tax, duty, documentation, or inspection. Use truthful product descriptions and values. Advice copied from a different country—or from a social post written before a rule change—cannot replace current official customs guidance for your destination.
          </p>
          <p>
            Superbuy&apos;s terms explain that international logistics is performed by third-party providers and is exposed to customs decisions and uncontrollable transport risks. Insurance or compensation, when available and purchased, has conditions rather than functioning as a universal guarantee. Read the insured value, exclusions, covered events, claim evidence, deadline, and maximum compensation before deciding whether the option matches the parcel. Customs- or weather-related delays may be treated differently from a covered loss.
          </p>
          <p>
            After dispatch, follow tracking as a sequence of milestones: export handling, carrier acceptance, transport, import clearance, and final-mile delivery. A quiet period does not automatically prove loss, and an estimated date does not override a customs hold. Keep the order, payment, parcel data, photographs, packing choices, declared contents, route terms, and tracking record until delivery and any claim window have passed.
          </p>
          <div className="callout"><strong>A conservative landed-cost check</strong><p>Product + domestic delivery + applicable service fees + optional warehouse services + international freight + payment or exchange costs + a destination tax/duty/brokerage buffer. Replace each estimate with live data as it becomes available.</p></div>
        </section>

        <section className="cta-panel shell">
          <div><p className="eyebrow plain">Before the parcel</p><h2>Re-check the warehouse evidence.</h2></div>
          <Link className="button button-primary" href="/qc-guide">Open QC checklist <ArrowIcon /></Link>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingSchema) }} />
    </>
  );
}
