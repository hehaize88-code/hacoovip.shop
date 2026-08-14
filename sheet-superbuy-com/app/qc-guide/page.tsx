import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PageHero, SiteFooter, SiteHeader } from "../components";
import {
  SITE_URL,
  SOCIAL_IMAGE,
  breadcrumbSchema,
  createPageMetadata,
} from "../seo";

export const metadata: Metadata = createPageMetadata({
  title: "Superbuy QC Photo Checklist: Warehouse Review Guide",
  description:
    "A fact-checked Superbuy QC photo checklist for comparing the ordered variant, reviewing warehouse evidence, requesting measurements, and deciding before international shipping.",
  path: "/qc-guide/",
});

const qcSteps = [
  { name: "Preserve the order evidence", text: "Save the live listing, selected variant, size information, quantity, seller notes, and packaging expectations before the listing changes." },
  { name: "Confirm identity and quantity", text: "Match the visible model, colour, size label, quantity, and included pieces against the exact order record." },
  { name: "Review overall condition", text: "Check the silhouette, surfaces, symmetry, closures, hardware, printing, seams, and obvious transport damage." },
  { name: "Request targeted evidence", text: "Ask for a specific close-up or ruler measurement when the standard views do not answer a decision-changing question." },
  { name: "Resolve discrepancies", text: "Document any mismatch and ask about the current return, exchange, or further-inspection options before parcel submission." },
  { name: "Record the ship decision", text: "Keep the photos, measurements, and outcome connected to the order before combining it with other warehouse items." },
];

const qcSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to review Superbuy warehouse QC photos",
      description: "A repeatable warehouse-photo review for checking a Superbuy order before international parcel submission.",
      url: `${SITE_URL}/qc-guide/`,
      image: SOCIAL_IMAGE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/qc-guide/`,
      },
      step: qcSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        ...step,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Superbuy QC photo checklist", path: "/qc-guide/" },
    ]),
  ],
};

export default function QcGuidePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Warehouse inspection"
          title="Superbuy QC Photo Checklist"
          intro="QC photos are a decision point—not decoration. Superbuy says three standard QC photos are taken after warehouse inspection. This field guide turns those images into a repeatable order-match, condition, measurement, and ship-or-correct decision."
          aside="Official service facts and independent checking advice are separated below. A warehouse image documents visible appearance; it does not prove authenticity, hidden construction, material composition, comfort, or durability."
        />

        <section className="content-section content-shell">
          <div className="research-note">
            <span>FACT CHECK · 14 AUGUST 2026</span>
            <p>Reviewed against Superbuy&apos;s official homepage, user guidance, parcel-forwarding guide, fee structure, and service terms. Account-level options and seller policies can change, so the live order screen remains the final source for a specific purchase.</p>
          </div>
          <h2>Start with what Superbuy actually says it provides</h2>
          <p>
            Superbuy&apos;s current homepage describes warehouse quality inspection, three free QC photos, and 90 days of free storage. Its user guide explains that received items appear in <em>My Superbuy → Warehouse</em>, where buyers can view the inspection evidence before choosing whether to keep purchasing or submit a parcel. Those are useful service facts, but they should not be expanded into a promise that every hidden defect, material claim, or authenticity question has been professionally verified.
          </p>
          <p>
            The official guidance also notes that inspection standards can differ for some sources, including 1688 orders. Superbuy&apos;s service terms describe limits for categories that cannot be opened or professionally tested: for certain electronics, collectibles, tickets, cards, models, custom goods, and similar products, an inspector may only be able to check exterior condition and visible accessories. A careful buyer therefore begins by asking what the available photographs can actually show—not by treating the word “QC” as a universal certification.
          </p>
          <div className="info-grid">
            <article className="info-card"><span>OFFICIAL BASELINE</span><h3>Three standard photos</h3><p>Use the views as starting evidence. Request a targeted service only when a missing detail could change your decision.</p></article>
            <article className="info-card"><span>PLANNING WINDOW</span><h3>90 days free storage</h3><p>Storage time can help with consolidation, but seller return windows may be much shorter. Review new arrivals promptly.</p></article>
            <article className="info-card"><span>IMPORTANT LIMIT</span><h3>Visible evidence only</h3><p>A photo can document colour, labels, dimensions, and exterior condition; it cannot establish every hidden property.</p></article>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>Prepare the comparison before the item reaches the warehouse</h2>
          <p>
            Good QC starts at checkout, not when the warehouse images arrive. Save the live product URL, the title shown at purchase, selected colour and size, quantity, seller size chart, promised accessories, and any note sent with the order. If packaging matters, record that as well. Marketplace pages can change, variants can disappear, and a seller may replace the gallery after your order. A dated screenshot or compact order record gives you a stable reference when the warehouse evidence arrives.
          </p>
          <p>
            Decide which facts are essential. For shoes, the printed size alone may not answer fit, so record the insole length of a pair you already own. For trousers, keep the flat waist, rise, and inseam of a known garment. For a structured bag or case, note the dimensions and required accessories. For an electronic accessory, confirm the visible model number, plug type, ports, and expected pieces—but do not assume a photograph proves electrical safety or long-term operation.
          </p>
          <p>
            Set an acceptance threshold before you become invested in the purchase. A wrong size, missing component, major stain, broken closure, or clearly different model might be an automatic correction request. A small fold line or packaging scuff may not matter. Defining that threshold early reduces the tendency to rationalise a material problem simply because the order took time to arrive.
          </p>
          <div className="callout">
            <strong>A useful order record is short.</strong>
            <p>Keep: destination URL, captured title, chosen variant, quantity, displayed price, seller note, dimensions that matter, packaging requirements, and the date the order was submitted.</p>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>A ten-point Superbuy QC photo checklist</h2>
          <ol className="checklist">
            <li><strong>Order identity:</strong> match the order number, listing title, model, and visible product type before examining small details.</li>
            <li><strong>Quantity:</strong> count pairs, pieces, removable parts, accessories, and anything the selected option was meant to include.</li>
            <li><strong>Colour and variant:</strong> compare all available views with the saved order, allowing for normal lighting and screen differences.</li>
            <li><strong>Size evidence:</strong> locate visible labels, then request relevant ruler measurements when fit or compatibility depends on dimensions.</li>
            <li><strong>Overall form:</strong> inspect silhouette, proportion, left-right symmetry, warping, crushing, and deformation from domestic transport.</li>
            <li><strong>Surface condition:</strong> look for stains, scratches, tears, dents, discolouration, excess glue, and other visible marks.</li>
            <li><strong>Construction:</strong> check seams, printing, embroidery, panels, eyelets, zips, buttons, straps, soles, and visible hardware.</li>
            <li><strong>Included packaging:</strong> confirm boxes, tags, inserts, cases, manuals, and protection only when they are part of your decision.</li>
            <li><strong>Shipping sensitivity:</strong> identify batteries, liquids, magnets, fragile parts, or oversized packaging that may affect eligible routes.</li>
            <li><strong>Decision record:</strong> mark the item “ship,” “hold,” “request evidence,” “return,” or “exchange” while the evidence is fresh.</li>
          </ol>
          <p>
            Review from large questions to small ones. It is easy to focus on a loose thread while missing that the wrong size or colour arrived. Start with identity and quantity, move to overall form, and only then zoom into workmanship. Use several images when perspective can create a false impression; folded fabric, wide-angle lenses, and reflected warehouse lights can make straight lines, colour, and symmetry look different from one frame to another.
          </p>
        </section>

        <section className="content-section content-shell">
          <h2>Adapt the inspection to the product category</h2>
          <div className="info-grid">
            <article className="info-card"><span>FOOTWEAR</span><h3>Pair, labels, shape</h3><p>Check both size labels, left-right shape, sole attachment, eyelets, stitching, visible glue, deformation, and insole length when fit is uncertain.</p></article>
            <article className="info-card"><span>CLOTHING</span><h3>Measure flat</h3><p>Use chest, shoulder, length, waist, rise, or inseam measurements that can be compared with a garment you already know.</p></article>
            <article className="info-card"><span>ACCESSORIES</span><h3>Count every part</h3><p>Inspect dimensions, corners, straps, closures, hardware, inserts, and included pieces from more than one angle when glare hides a mark.</p></article>
          </div>
          <p>
            Electronics require a narrower claim. Warehouse photos can confirm visible model information, ports, plugs, accessories, and exterior condition. Unless a clearly defined paid test has been ordered and documented, the images do not establish battery health, network compatibility, electrical safety, successful operation, or reliability. Batteries and magnets can also reduce route eligibility, so check shipping options before assuming the product price is the main cost question.
          </p>
          <p>
            Fragile and custom-made goods need equally specific instructions. If a retail box is part of the value, say so before parcel packing. If a figurine has thin projections or a glass product has vulnerable edges, identify the protection you expect and compare the visible condition on arrival. Superbuy&apos;s terms make clear that some specialised goods do not receive a professional internal quality examination, so the buyer must use exterior evidence and seller communication carefully.
          </p>
        </section>

        <section className="content-section content-shell">
          <h2>Request evidence, not reassurance</h2>
          <p>
            Standard photographs are designed to give a general warehouse view. When they leave an important question unanswered, ask for the smallest additional piece of evidence that would change your decision. “Please check the size” is subjective. “Please place a ruler along the removable insole from heel to toe and photograph the complete measurement” is testable. “Please check the print” is vague. “Please take one straight-on photograph of the front graphic and one close-up of the mark beside the lower-left letter” identifies the exact issue.
          </p>
          <p>
            Measurements also need a defined method. A chest measurement can mean flat pit-to-pit width or full circumference; an outside sole measurement is not the same as usable insole length. Ask the agent to show the starting and ending points in one frame, then compare that evidence with an item measured in the same way. More photographs do not automatically create more certainty—one correctly specified ruler image can be more useful than ten generic angles.
          </p>
          <div className="callout">
            <strong>Copy the structure, not a promise.</strong>
            <p>“Ordered option: black, size 42. Question: the visible label appears to show 41. Evidence requested: one close-up of both shoe labels and one heel-to-toe insole measurement. If size 41 is confirmed, please advise the current return or exchange options.”</p>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>What to do when the evidence shows a problem</h2>
          <p>
            First confirm that the discrepancy is not caused by an overlooked variant, seller description, lighting, fold, or camera angle. Then preserve the relevant warehouse image, order record, and a concise description of the mismatch. Ask which return, exchange, partial-refund, or additional-inspection options are available for that exact order. Seller cooperation, domestic return postage, platform source, service fees, and deadlines vary, so avoid relying on a universal return period copied from an old guide.
          </p>
          <p>
            Act before international parcel submission whenever possible. Superbuy&apos;s warehouse stage gives you a valuable correction point, but it does not make every issue reversible. Once an item is packed and dispatched internationally, domestic seller remedies are harder to use, and international shipping cost may exceed the value of a small defect. The practical sequence is: identify the mismatch, request only necessary evidence, learn the current remedy and cost, then decide whether to return, exchange, accept, or hold.
          </p>
          <p>
            Finally, keep the outcome connected to the order. When several similar products are stored together, it is easy to remember that “one black hoodie had an issue” without remembering which order it was. A simple ship/hold/return note prevents a rejected item from being included accidentally during consolidation. It also creates a clear evidence trail if you later need customer-service help.
          </p>
        </section>

        <section className="cta-panel shell">
          <div><p className="eyebrow plain">After QC</p><h2>Estimate the parcel, not just the item.</h2></div>
          <Link className="button button-primary" href="/shipping/">Plan shipping <ArrowIcon /></Link>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qcSchema) }} />
    </>
  );
}
