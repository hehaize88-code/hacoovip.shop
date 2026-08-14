import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "Superbuy FAQ 2026: Fees, QC, Storage & Shipping",
  description:
    "Fact-checked answers about Superbuy purchasing fees, QC photos, 90-day storage, consolidation, international shipping deposits, volumetric weight, customs, insurance, returns, and spreadsheets.",
};

const faqs = [
  {
    q: "Is this the official Superbuy website?",
    a: "No. SheetSuperbuy is an independent product-research and educational site. It does not process purchases, payments, returns, warehouse requests, customer-service cases, or international parcels. Platform facts on this page were checked against Superbuy's official homepage, fee structure, user guidance, forwarding guide, help centre, and terms on 14 August 2026. Policies can change, so account-specific screens remain the final source before payment.",
  },
  {
    q: "What does Superbuy do?",
    a: "Superbuy describes a two-stage shopping-agent and forwarding workflow. In the shopping-agent route, a buyer submits a product, pays the item price and Chinese domestic delivery, and Superbuy purchases it from the seller. The item reaches a warehouse for inspection and storage. The buyer later selects stored items, chooses packing and an eligible international route, pays a shipping deposit, and tracks the parcel after dispatch. Parcel forwarding is a related but distinct service for goods the user has already purchased.",
  },
  {
    q: "What is a Superbuy spreadsheet?",
    a: "A Superbuy spreadsheet is an independent index of product links organised by category, style, or research theme. It can make discovery faster, but it is not a live inventory system and it does not replace the current destination page. Before ordering, verify the seller, gallery, selected variant, product price, domestic delivery, source restrictions, and estimated parcel implications. A copied row can remain online after a seller changes the product, price, options, or destination.",
  },
  {
    q: "What does ‘route checked’ mean on this site?",
    a: "It means the destination page and its primary product image were reachable and matched when reviewed. The check is intentionally narrow: it is not a seller endorsement, quality rating, authenticity claim, stock guarantee, or prediction that the same variant and price will remain available. A useful route check records the destination and review date; the live listing remains the current source of truth when you click.",
  },
  {
    q: "Are the USD prices shown here final?",
    a: "No. USD figures are approximate browsing conversions for comparing products. The amount you ultimately spend can include the selected variant price, Chinese domestic delivery, an applicable source-specific service fee, optional warehouse services, payment or currency-conversion costs, international freight, parcel services, and destination taxes or handling. Exchange rates and marketplace prices can move between discovery, purchase, refund, and parcel payment, so a card price should never be treated as a landed-cost quote.",
  },
  {
    q: "Does Superbuy charge a purchasing service fee?",
    a: "Superbuy's fee page currently describes standard purchasing service for mainstream platforms such as Taobao, Tmall, JD.com, and 1688 as free of a percentage service fee. The product and domestic courier still cost money, and optional services remain separate. Other sources can be treated differently: the official schedule lists distinct fees for certain second-hand platforms, unlisted platforms, and Shipping Expert work. Check the current source category and fee shown on the actual order rather than applying one slogan to every purchase.",
  },
  {
    q: "Why are purchasing and international shipping paid separately?",
    a: "The item must first travel from the Chinese seller to the warehouse. Only after it arrives can the warehouse record its data, provide inspection evidence, combine it with other items, and pack the international parcel. The route and final freight depend on destination, packed weight and dimensions, item restrictions, packaging choices, and current line rules. Separating the two payments prevents an early product estimate from pretending to know parcel facts that do not yet exist.",
  },
  {
    q: "How many standard Superbuy QC photos are provided?",
    a: "Superbuy currently states that three standard QC photos are taken after warehouse inspection. Treat them as general visual evidence. Use them to compare quantity, colour, model, visible labels, overall form, surface condition, and included pieces with the saved order. If a decision depends on a missing detail, request one targeted close-up or ruler measurement through the current service options rather than asking vaguely for ‘more QC.’ Availability and fees for additional evidence can vary.",
  },
  {
    q: "Do QC photos prove authenticity or product quality?",
    a: "No. Photographs can document visible characteristics at a particular time, but they cannot reliably prove authenticity, hidden construction, material composition, comfort, scent, battery health, electrical safety, or long-term durability. Superbuy's terms also describe inspection limits for categories that cannot be opened or professionally tested. Use precise language: a label, colour, measurement, or visible condition can match the order evidence without proving every claim made by a seller.",
  },
  {
    q: "Are 1688 orders inspected in exactly the same way?",
    a: "Superbuy's user guidance explicitly notes that products purchased from 1688 have a different set of quality-control standards and directs buyers to the relevant shopping-agent manual. Do not assume every source receives identical checks or seller remedies. Save the selected specification, quantity, seller description, and any wholesale conditions before purchase, then read the inspection evidence and live order rules that apply to the source shown in your account.",
  },
  {
    q: "How long is free Superbuy warehouse storage?",
    a: "Superbuy currently advertises 90 days of free storage. This can provide time to wait for several orders and plan consolidation, but it should not be confused with a 90-day seller return window. Seller deadlines, domestic return arrangements, and service options may be much shorter. Inspect each arrival promptly, record the warehouse date, and confirm current storage charges and maximum handling rules in the account before relying on the full period.",
  },
  {
    q: "Can products from different sellers be consolidated?",
    a: "Consolidation is a core warehouse workflow: eligible stored items can be selected and packed into an international parcel. It may reduce repeated base charges and unnecessary domestic packaging. Maximum consolidation is not always optimal, however. A large parcel can cross a route limit, increase volumetric weight, concentrate value, or combine ordinary goods with a battery, liquid, magnet, fragile item, or oversized box that narrows the eligible lines for everything.",
  },
  {
    q: "Why is the first international shipping amount only a deposit?",
    a: "Superbuy's user guide says the shipping deposit is calculated from estimated weight, selected method, and destination. The final freight is determined after the parcel's size and weight are verified. When the settled fee differs from the deposit, the difference is returned to the Superbuy account after shipment. An early estimate is therefore useful for planning, while the packed parcel data and live route quote are better evidence before final selection.",
  },
  {
    q: "Why can volumetric weight make a parcel expensive?",
    a: "Actual weight measures mass; volumetric weight assigns a billing weight to the space a parcel occupies. A light but bulky shoebox, puffer jacket, plush toy, or protective display box can be charged by volume. Divisors, minimum units, rounding, and oversize rules vary by route, so no single formula predicts every line. Compare the live eligible options using the packed dimensions, not only the seller's product weight.",
  },
  {
    q: "Should I remove shoeboxes and other retail packaging?",
    a: "Only when the trade-off makes sense for the item. Removing expendable boxes can reduce volume, while keeping a structured box may protect footwear, a collectible, or something whose packaging you value. Vacuum packing may help suitable soft goods but can crease some materials. Superbuy's forwarding guide lists optional services such as package removal, reinforcement, and insurance. Choose based on protection needs and chargeable weight rather than assuming the smallest parcel is automatically safest.",
  },
  {
    q: "What is the best Superbuy shipping line?",
    a: "There is no permanent best line for every buyer. Start with the routes currently eligible for the actual destination, packed weight and dimensions, item categories, restrictions, and declared contents. Then compare total cost, chargeable-weight method, estimated transit range, tracking depth, carrier handoffs, exclusions, insurance or compensation terms, value limits, and customs model. A route name recommended for another country or an older parcel may not be relevant now.",
  },
  {
    q: "Does a shipping estimate include customs taxes and duties?",
    a: "Do not assume it does. Customs treatment depends on destination law, product category, origin, value, quantity, intended use, route terms, and local thresholds. Some lines may describe a tax- or duty-handled model, but the live terms must explain what is included and what remains the receiver's responsibility. Use truthful descriptions and values, and consult current official customs guidance for the destination instead of copying a declaration number from social media.",
  },
  {
    q: "Does parcel insurance guarantee full reimbursement?",
    a: "No. Superbuy's terms describe insurance and compensation as conditional services. Coverage can depend on whether insurance was purchased, the insured value, covered event, exclusions, evidence, claim deadline, and the result of discussions with a third-party logistics provider. Customs- or weather-related delays may be treated differently from loss. Read the live policy before submitting a valuable parcel and keep order, payment, QC, packing, route, and tracking records.",
  },
  {
    q: "What should I do if the QC evidence shows a mismatch?",
    a: "Compare the questionable area with the saved order and selected option, then preserve the warehouse image and describe the discrepancy factually. Ask what return, exchange, partial-refund, or additional-inspection choices are currently available for that order. Seller cooperation, source platform, domestic return postage, fees, and deadlines vary. Resolve material problems before international parcel submission whenever possible, because correction usually becomes harder after dispatch.",
  },
  {
    q: "What should I do if a spreadsheet product link stops working?",
    a: "Return to the relevant category or use product search to find the item type again, then evaluate any new listing independently. A search result or similar thumbnail is not evidence that the seller, batch, material, options, or price are equivalent. Do not silently replace a stale link and preserve its old recommendation. A trustworthy index dates route checks, removes misleading rows, and explains exactly what was verified.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="FAQ · fact checked"
          title="Straight answers before you buy."
          intro="Twenty researched answers cover Superbuy fees, QC evidence, storage, consolidation, shipping deposits, volumetric weight, route selection, customs, insurance, returns, and spreadsheet limits."
          aside="Platform statements were reviewed on 14 August 2026. Live routes, fees, service options, seller remedies, and destination rules can change."
        />
        <section className="content-section content-shell">
          <div className="research-note">
            <span>HOW TO READ THIS PAGE</span>
            <p>Official service facts are attributed to Superbuy. Practical recommendations are independent editorial guidance. No answer is a promise about a particular seller, route, customs outcome, or parcel.</p>
          </div>
          <div className="faq-list faq-list-long">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}<span>+</span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
