export type GuideSource = {
  title: string;
  url: string;
  scope: string;
};

export type GuideFigure = {
  src: string;
  alt: string;
  caption: string;
  sourceUrl: string;
};

export type GuideSection = {
  title: string;
  paragraphs: string[];
  checklist?: string[];
  takeaway?: string;
};

export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  readingTime: string;
  updated: string;
  keyFacts: string[];
  figure: GuideFigure;
  sections: GuideSection[];
  sources: GuideSource[];
  relatedSlugs: string[];
};

const REVIEWED = "July 17, 2026";

const freightCalculator: GuideSource = {
  title: "AllChinaBuy Shipping Calculator",
  url: "https://m.allchinabuy.com/en/freightcompute/",
  scope: "Public calculator fields, chargeable-weight guidance, route notes and warehouse restrictions.",
};

const orderConfirmation: GuideSource = {
  title: "AllChinaBuy Order Confirmation",
  url: "https://m.allchinabuy.com/en/confirmorder/?isformcart=1",
  scope: "Public order-stage descriptions for inspection, detailed photos, original packing and cost timing.",
};

const goodsDetail: GuideSource = {
  title: "AllChinaBuy Goods Detail",
  url: "https://m.allchinabuy.com/en/goodsdetail/",
  scope: "Public product-stage notices, service boundaries, restricted-item prompts and used-item terms.",
};

export const guides: Guide[] = [
  {
    slug: "how-a-china-shopping-directory-works",
    title: "How AllChinaBuy Works: Product Link to International Parcel",
    eyebrow: "Beginner guide",
    description:
      "A fact-checked map of the public AllChinaBuy flow: product selection, domestic delivery, warehouse inspection and a separate international shipment.",
    readingTime: "6 min read",
    updated: REVIEWED,
    keyFacts: [
      "The public order page separates the item-stage total from international delivery.",
      "The warehouse stage can include quantity, colour and size checks plus inspection photos.",
      "International options depend on destination, category, warehouse, packed size and weight.",
    ],
    figure: {
      src: "/images/guides/allchinabuy-workflow.svg",
      alt: "Four-stage AllChinaBuy workflow from product link to order, warehouse and international parcel",
      caption: "Editorial workflow reconstructed from AllChinaBuy’s public goods, order and freight pages; checked July 17, 2026.",
      sourceUrl: orderConfirmation.url,
    },
    sections: [
      {
        title: "The useful mental model is two purchases, not one checkout",
        paragraphs: [
          "An AllChinaBuy order is easier to understand when you separate the product transaction from the international parcel. The public goods page presents the item price and local delivery information, while the order-confirmation page states that international delivery is not included at that point. The item first moves from a domestic seller to a warehouse. Only after the warehouse has the item can the packed parcel be measured and an international route be selected with better information.",
          "That separation explains why a cheap listing does not equal a cheap delivered order. Domestic delivery, optional warehouse services, packing choices, international freight, payment conversion and destination charges can appear at different moments. A reliable estimate therefore needs a running ledger rather than one copied product price. Before buying, record the listing price, domestic delivery and any selected services; leave the international line open until the packed data exists.",
        ],
        checklist: [
          "Save the original product URL and selected option.",
          "Record item price and domestic delivery separately.",
          "Do not treat the item-stage total as a delivered total.",
        ],
      },
      {
        title: "The product page is a decision screen, not proof of the item",
        paragraphs: [
          "The public goods-detail interface exposes the familiar buying controls—options, local delivery, quantity and add-to-cart or buy-now actions—but it also contains eligibility and restriction notices. A product can become unavailable or ineligible for the service. Some categories can trigger mailing restrictions or additional terms. The practical rule is to read the live screen again immediately before payment instead of assuming a converted link will preserve the same price, stock or eligibility forever.",
          "Preserve evidence that will still make sense at the warehouse stage: the source URL, seller title, option text, colour, size, quantity and any promised measurement. A product photograph alone is weak evidence because images can be shared across options. A short screenshot that includes the selected option and price is more useful. If a seller changes the price or the agent shows a difference to pay, compare it with this record before accepting the change.",
        ],
      },
      {
        title: "Domestic delivery creates the first uncertainty",
        paragraphs: [
          "The first physical movement is seller to warehouse, not China to your home. Domestic courier delays, seller dispatch times and a wrong warehouse address can affect this stage. The parcel that arrives may include the seller’s courier box, retail box, filler and labels. Those materials are relevant later because the public order page offers a choice around keeping the inbound courier packaging, and the freight calculator asks for the box size after packing.",
          "Track seller dispatch and warehouse receipt as separate events. If several items are intended for one international parcel, also record which warehouse receives each one. The public calculator warns that products held in different warehouses cannot be shipped together. Consolidation plans should therefore be based on actual warehouse assignment, not merely on the fact that every item appears in the same account.",
        ],
        takeaway: "A consolidation plan is valid only when the items are eligible and stored in the same warehouse.",
      },
      {
        title: "Warehouse inspection answers a narrow set of questions",
        paragraphs: [
          "AllChinaBuy’s public order text describes standard inspection as checking quantity, colour and size and providing inspection photos. That is useful evidence, but it is not a laboratory test or a guarantee of authenticity, durability or hidden condition. Sealed products are especially important: the same interface says sealed packaging is not normally opened, checked or photographed unless an unpacking choice applies. Decide in advance whether preserving a seal or obtaining interior evidence matters more.",
          "Review warehouse photos against the saved order, not against memory. Start with the option, count and visible labels. Then check obvious shape, colour and damage. If a missing measurement would change your decision, request a targeted detailed photo where available. Avoid vague requests such as “check quality.” A request such as “place a ruler across the insole from heel to toe and show the full scale” produces evidence that can be acted on.",
        ],
      },
      {
        title: "International shipping starts with measured inputs",
        paragraphs: [
          "The public freight calculator asks for destination country, product category, sending warehouse, weight and packed dimensions. These are not cosmetic filters: they can change which lines appear and how chargeable weight is calculated. The calculator also notes that its category selection is a reference and that the warehouse’s final classification prevails. That is why a route shown before purchase should be treated as a planning result, not a reservation.",
          "Once the warehouse supplies the actual packed measurements, rerun the calculator. Compare the line’s chargeable-weight method, estimated delivery window, restrictions, delivery method and any tax-related label shown in the current interface. The calculator says delivery estimates are provided for reference and that logistics prices can fluctuate. Save the final quotation and its timestamp so a later change can be understood rather than guessed at.",
        ],
      },
      {
        title: "A compact order record prevents most avoidable confusion",
        paragraphs: [
          "Use one row per item with the original URL, option, price, domestic delivery, warehouse, inspection status, packed weight and a link to the photo set. Add a second section for the international parcel with dimensions, actual weight, calculated volume weight, selected line and quoted price. This makes it clear which figures are facts, which are estimates and which still need confirmation.",
          "This guide reflects public English-language mobile pages checked on July 17, 2026. Logged-in availability, fees, routes and destination rules can differ and can change. When the live account screen conflicts with an old screenshot or a third-party post, use the current AllChinaBuy interface and ask support for clarification before paying. Our role is to explain the workflow, not to replace the platform’s current contract or your destination’s customs authority.",
        ],
      },
    ],
    sources: [goodsDetail, orderConfirmation, freightCalculator],
    relatedSlugs: ["qc-photo-checklist", "shipping-cost-planning", "allchinabuy-checkout-costs"],
  },
  {
    slug: "qc-photo-checklist",
    title: "AllChinaBuy QC Photos: A Practical Inspection Checklist",
    eyebrow: "Quality control",
    description:
      "What AllChinaBuy’s public order page says standard inspection covers, what warehouse photos cannot prove, and how to request decision-grade evidence.",
    readingTime: "6 min read",
    updated: REVIEWED,
    keyFacts: [
      "Public order text describes standard checks for quantity, colour and size with inspection photos.",
      "Sealed packages are not normally opened, inspected or photographed by default.",
      "Detailed photos should answer one precise requirement rather than repeat a general angle.",
    ],
    figure: {
      src: "/images/guides/qc-photo-checklist.svg",
      alt: "QC photo review sequence for identity, option, measurements and visible condition",
      caption: "An editorial QC sequence based on AllChinaBuy’s public inspection and detailed-photo descriptions.",
      sourceUrl: orderConfirmation.url,
    },
    sections: [
      {
        title: "Start with identity before hunting for tiny flaws",
        paragraphs: [
          "The first job of a warehouse photo is to show whether the received item appears to match the order. Compare product type, quantity, colour, size and visible labels with the option you saved at checkout. AllChinaBuy’s public order interface describes those fields as part of standard inspection. This is more important than zooming into stitching while overlooking that the seller sent the wrong colour or size.",
          "Use a fixed sequence: order record, overview photo, option label, quantity, then visible condition. If the item has multiple pieces, count them explicitly. For footwear, confirm that the pair matches and both sizes are visible when possible. For a set, compare the included parts with the source listing. Write down any mismatch in plain terms so the next request can be specific.",
        ],
        checklist: [
          "Correct product and quantity",
          "Correct colour and selected size",
          "Visible labels or identifiers agree with the order",
          "All advertised pieces appear present",
        ],
      },
      {
        title: "Read photographs as evidence with limits",
        paragraphs: [
          "A clear photo can show visible shape, colour, dirt, tears, broken hardware and some measurement evidence. It cannot reliably establish material composition, electrical safety, waterproofing, long-term durability, internal construction or authenticity. Lighting can shift colour; a wide-angle phone lens can distort proportions; compression can hide texture. Treat each image as evidence of what is visible in that frame, not as a general quality certificate.",
          "For clothing, inspect front and back shape, seams, hems, pockets, zips and printed areas. For shoes, compare left and right shape, panel alignment, outsole edges and obvious glue or damage. For bags, inspect hardware, closures, strap attachment and interior only if the interior is shown. Electronics require model, plug and visible condition checks, but a photo cannot replace an appropriate function or safety test.",
        ],
      },
      {
        title: "Sealed packaging forces a real trade-off",
        paragraphs: [
          "The public order text says a sealed package will not normally be opened, checked or photographed by default. That means a pristine exterior photo may tell you nothing about the item inside. If the seal has resale, hygiene or collector value, opening it may destroy something you care about. If correctness or internal condition matters more, keeping it sealed may leave the key risk unresolved.",
          "Make the trade-off explicit before ordering. Ask whether the product can be inspected without damaging retail packaging, whether an exterior label identifies the exact option, and what evidence is available if the seal remains intact. Do not assume that selecting original inbound packing prevents every opening: the public packing description also says the warehouse may still unpack to check for prohibited contents and perform inspection.",
        ],
        takeaway: "“Sealed” and “verified inside” are usually competing goals; choose the one that matters for this item.",
      },
      {
        title: "Request measurements that decide accept or return",
        paragraphs: [
          "A useful detailed-photo request contains one observable requirement, a unit and the exact endpoints. “Measure the shirt” is ambiguous. “Lay the shirt flat and show the chest width from armpit seam to armpit seam in centimetres” is testable. For shoes, define whether you need removable insole length or exterior outsole length. For a bag, specify width, height or usable strap range.",
          "AllChinaBuy’s public order interface instructs users to keep each detailed-photo request to one requirement and says a photo can be retaken when it does not match the request. That makes wording important. Use one request per decision and include a reference image only if it clarifies the angle. Do not spend an extra photo on another general overview when the missing fact is a measurement or label.",
        ],
        checklist: [
          "One requirement per requested photo",
          "Name the measurement endpoints",
          "State centimetres or another unit",
          "Ask for the full ruler or tape scale to remain visible",
        ],
      },
      {
        title: "Separate visible defects from unsupported conclusions",
        paragraphs: [
          "Describe what the image shows: “the left pocket seam appears open for about two centimetres” is stronger than “bad quality.” If colour seems wrong, compare it with the option label and allow for lighting. If symmetry looks off, check whether the product is flat and whether the camera angle is centred. Request a new angle when perspective could explain the apparent issue.",
          "Do not turn warehouse photographs into an authenticity verdict. Logos, tags and packaging can be copied, and the public used-item wording explicitly limits inspection and disclaims authenticity and completeness guarantees in that context. If authenticity is essential, use a seller and verification method that can provide appropriate provenance; a shopping-agent photo set cannot create provenance after the fact.",
        ],
      },
      {
        title: "Document the decision and act within the live deadline",
        paragraphs: [
          "Save the complete photo set, your request wording, the reply and the decision. Mark the item as accepted, clarification requested or return requested. If a return is possible, use the deadline shown in the current order rather than an old guide or forum comment. Used items and condition-sensitive categories can have narrower or different return rules, so read the product-specific notice before assuming a remedy exists.",
          "Our checklist was built from AllChinaBuy’s public English order descriptions checked July 17, 2026. It does not claim access to your logged-in order, and photo counts, availability and fees can vary. The current order screen is the operational source. The value of this method is consistency: it turns a pile of pictures into a short list of answerable questions and a recorded decision.",
        ],
      },
    ],
    sources: [orderConfirmation, goodsDetail],
    relatedSlugs: ["allchinabuy-detailed-photos", "allchinabuy-original-packaging", "allchinabuy-used-items"],
  },
  {
    slug: "shipping-cost-planning",
    title: "AllChinaBuy Shipping Cost: Plan Before You Build a Haul",
    eyebrow: "Shipping guide",
    description:
      "A fact-based budgeting method using the fields and warnings in AllChinaBuy’s public shipping calculator.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "The calculator asks for destination, category, warehouse, packed dimensions and weight.",
      "Its public formula converts centimetre dimensions to volume weight with L × W × H ÷ 5,000.",
      "Items in different warehouses cannot be combined into the same shipment.",
    ],
    figure: {
      src: "/images/guides/shipping-cost-plan.svg",
      alt: "Shipping cost plan showing product cost, packed data, route comparison and buffer",
      caption: "A planning model tied to the inputs and warnings displayed in AllChinaBuy’s public shipping calculator.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Build a delivered-cost ledger before buying",
        paragraphs: [
          "Start with separate columns for product price, seller-to-warehouse delivery, optional warehouse services, packing materials, international freight, payment conversion and destination charges. The public order page makes the timing clear: international delivery is calculated after goods reach the warehouse. A single “total” copied during the product checkout therefore leaves out the largest unknown for many orders.",
          "Use a low, expected and high estimate instead of one precise-looking number. The low case uses the seller’s product weight and compact dimensions, the expected case adds realistic packaging, and the high case adds bulky packing or a more expensive eligible route. If the high case breaks the budget, the order is not yet safe merely because the low case looks attractive.",
        ],
      },
      {
        title: "Enter the calculator fields in the right order",
        paragraphs: [
          "AllChinaBuy’s public calculator asks for destination country, product category, sending warehouse, item weight and the size of the box after packing. Begin with destination and category because they influence eligibility. Then select the warehouse that will actually hold the item. Finally enter a realistic packed weight and three exterior dimensions; product-only dimensions will understate a shoe box, structured bag or protected fragile item.",
          "The category selector is explicitly described as a reference, with final classification determined at the warehouse. If a product contains a battery, liquid, magnet, powder, food or another sensitive feature, use the closest truthful category and read every line restriction. Do not select a harmless category simply to make a cheaper route appear. A route that cannot accept the warehouse classification is not a usable budget option.",
        ],
        checklist: [
          "Destination country",
          "Truthful product category",
          "Actual receiving warehouse",
          "Packed weight and exterior dimensions",
        ],
      },
      {
        title: "Compare actual and volumetric weight",
        paragraphs: [
          "The public calculator shows the formula Length × Width × Height × 1,000 ÷ 5,000, which is equivalent to dividing cubic centimetres by 5,000 to get kilograms. A 40 × 30 × 20 cm parcel produces 4.8 kg of volume weight. If it weighs 2.6 kg on a scale and a route charges the larger figure, the line prices it as 4.8 kg. Compacting empty space can matter more than removing a small amount of mass.",
          "Do not assume every line uses identical rounding or divisors. Use the formula as the calculator’s planning reference, then read the current line details and final warehouse quotation. Record all three figures—actual weight, volume weight and the chargeable weight shown—so you can see whether the parcel is mass-heavy or space-heavy and choose packing changes intelligently.",
        ],
        takeaway: "For a space-heavy parcel, reducing box dimensions can save more than removing a few grams.",
      },
      {
        title: "Respect the warehouse boundary",
        paragraphs: [
          "The public calculator warns that products stored in different warehouses cannot be shipped together. It also displays a specific notice that the Hong Kong warehouse only receives packages sent from outside mainland China, including Hong Kong, Macao and Taiwan contexts. These are operational boundaries, not labels that can be ignored when planning consolidation.",
          "Create a warehouse column in the item ledger and group only eligible items in the same location. If a product is assigned elsewhere, calculate it as a separate parcel unless the current account provides an explicit transfer option and price. Two smaller parcels can cost more than one consolidated parcel, so warehouse assignment deserves attention before purchase, not after every item arrives.",
        ],
      },
      {
        title: "Read route cards beyond the headline price",
        paragraphs: [
          "The public calculator exposes route details such as first-weight charge, added-weight charge, fuel-related fees, operating fees, estimated timing, delivery method and tax-related labels. A low first number may not remain cheapest at your parcel’s chargeable weight. Compare the complete estimate for the same inputs and read the restrictions attached to each line.",
          "Delivery windows are reference estimates supplied by logistics providers, according to the calculator text. Freight can also fluctuate with market conditions. Do not convert “estimated days” into a promised arrival date, and do not spend the entire budget on the initial quote. Save a dated screenshot or note of the route result, then rerun it when the warehouse measurements are final.",
        ],
      },
      {
        title: "Use buffers based on the real uncertainty",
        paragraphs: [
          "A flat percentage buffer is better than none, but a targeted buffer is more useful. Add dimension risk for shoes, bags and protective packing; classification risk for sensitive goods; exchange-rate risk for payment; and destination risk for taxes or handling. If several items are unmeasured, keep the buffer wider. Once warehouse data replaces estimates, narrow it.",
          "This guide does not publish a universal price per kilogram because AllChinaBuy’s own public calculator says rates can change and route eligibility depends on live inputs. Use the official tool on the day you plan and again before submission. Any article that gives a timeless route price without destination, category, warehouse, dimensions and date is missing the facts needed to make that number meaningful.",
        ],
      },
    ],
    sources: [freightCalculator, orderConfirmation],
    relatedSlugs: ["allchinabuy-volumetric-weight", "allchinabuy-shipping-lines", "allchinabuy-warehouse-storage"],
  },
  {
    slug: "product-link-safety",
    title: "AllChinaBuy Product Link Safety and Item Eligibility",
    eyebrow: "Link guide",
    description:
      "How to preserve the source, recognize live eligibility and avoid treating a converted product link as proof of stock, shipping or seller claims.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "A live product can be unavailable, restricted or ineligible even if an old converted link still exists.",
      "The warehouse’s final product classification can override a planning category.",
      "A source record should include the original URL, option, price and date checked.",
    ],
    figure: {
      src: "/images/guides/product-link-safety.svg",
      alt: "Product-link verification chain from source URL to live option and shipping eligibility",
      caption: "A verification chain based on notices in AllChinaBuy’s public goods and freight interfaces.",
      sourceUrl: goodsDetail.url,
    },
    sections: [
      {
        title: "A converted link is a route, not a frozen offer",
        paragraphs: [
          "A shopping-agent product page can help interpret a marketplace URL, but it does not freeze the seller’s stock, price, option names or return terms. AllChinaBuy’s public goods interface contains states for unavailable or ineligible products and can show price differences that require confirmation. Reopen the live page immediately before ordering and compare it with the original marketplace listing when that listing is still available.",
          "Save both addresses. The original URL preserves seller context; the AllChinaBuy URL preserves the agent-side order route. Also save the selected colour, size, quantity, visible seller name, item price, domestic delivery and timestamp. If a link later resolves differently, this compact record shows what you intended without relying on a product thumbnail or memory.",
        ],
      },
      {
        title: "Verify the domain before credentials or payment",
        paragraphs: [
          "Read the registered domain from right to left and confirm that the page is really under allchinabuy.com before entering an account password or payment data. HTTPS protects transport but does not prove that a copied subdomain or look-alike spelling belongs to the intended service. Bookmarks and links from the authenticated account reduce the chance of mistyping.",
          "This website, AllChinaBuy Pro, is an independent editorial directory and is not the official AllChinaBuy service. Our source links are clearly labelled and point to m.allchinabuy.com. We do not collect AllChinaBuy credentials or process orders. The distinction should remain visible because a similar name is not evidence of shared ownership.",
        ],
      },
      {
        title: "Eligibility must be checked before product payment",
        paragraphs: [
          "A product that can be purchased domestically is not automatically eligible for every international route. The public freight calculator asks for product category and destination, and the goods interface exposes mailing-restriction prompts. Batteries, liquids, magnets, powders, food and other sensitive categories can reduce route choice; dangerous or prohibited goods are not supported by the calculator’s public notice.",
          "Run an early calculator check using the truthful category and destination. Treat the result as a screen, not a guarantee, because the calculator says category selection is for reference and final classification is made at the warehouse. If no practical route appears, do not buy on the assumption that support will create one later. Ask for a written clarification first.",
        ],
        takeaway: "Purchase eligibility and international shipping eligibility are different checks.",
      },
      {
        title: "Read category-specific terms, especially for used goods",
        paragraphs: [
          "The public goods page contains additional wording for used items. It describes the platform as a purchase agent rather than the seller, limits inspection largely to visible condition and warns that authenticity, quality and completeness may not be guaranteed. It also describes restricted return or exchange possibilities. Those terms materially change the risk and should be read before payment, not after warehouse photos arrive.",
          "The same frontend contains multiple condition-specific fee descriptions rather than one universal used-item number. That is a reason not to copy a fee from a guide. Use the amount and terms shown for the exact item, platform route, membership level and order. If the page is unclear, request confirmation in the order before committing.",
        ],
      },
      {
        title: "Do not infer claims from imagery or urgency",
        paragraphs: [
          "A logo, tag or seller photograph is not proof of authenticity. A countdown, low-stock label or popularity indicator is not proof that delaying for verification will lose the item. Confirm option availability and current commercial terms on the live page. Where authenticity is essential, use a source with verifiable provenance and an appropriate authentication process rather than expecting warehouse photos to solve the question.",
          "Product images can also be reused across variants. Match the selected option text, not just the hero photograph. For size-sensitive goods, preserve the seller’s chart and request a warehouse measurement if the value is decision-critical. The more a claim affects safety, legality or a large amount of money, the stronger the evidence you should require.",
        ],
      },
      {
        title: "Use a stop rule for broken or unexpected routes",
        paragraphs: [
          "Stop if the domain changes unexpectedly, the product title no longer resembles the source, the option list is missing, the price changes without explanation or the page shows a restriction you do not understand. Do not try similar-looking domains or force a different category to bypass a warning. Return to the account or official home page and reproduce the route from there.",
          "Our factual claims here come from public AllChinaBuy English mobile pages checked July 17, 2026. They do not establish the status of a particular seller or item. Availability and rules can change after review. A trustworthy link workflow therefore ends with a live check and a saved record, not with confidence in an old URL.",
        ],
      },
    ],
    sources: [goodsDetail, freightCalculator, orderConfirmation],
    relatedSlugs: ["allchinabuy-shipping-restrictions", "allchinabuy-used-items", "allchinabuy-checkout-costs"],
  },
  {
    slug: "allchinabuy-warehouse-storage",
    title: "AllChinaBuy Warehouse Storage and Consolidation Rules",
    eyebrow: "Warehouse guide",
    description:
      "What the public AllChinaBuy interface says about warehouse separation, package holding periods and the practical record you should keep.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "The public goods-page text displays different holding periods for South China and Hong Kong shopping-agent packages.",
      "The freight calculator says items in different warehouses cannot ship together.",
      "Warehouse assignment should be recorded per item before planning consolidation.",
    ],
    figure: {
      src: "/images/guides/warehouse-map.svg",
      alt: "Warehouse planning diagram separating South China and Hong Kong inventory before consolidation",
      caption: "Editorial warehouse ledger based on public AllChinaBuy goods-page and freight-calculator notices.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Warehouse location is a shipping constraint",
        paragraphs: [
          "AllChinaBuy’s public calculator states that products stored in different warehouses cannot be shipped together. That turns warehouse location into a cost variable: two items in the same account may still require two international parcels. Record the receiving warehouse for every order as soon as it appears, and do not count a consolidation saving until all intended items are confirmed in the same eligible location.",
          "The calculator also displays a notice that the Hong Kong warehouse receives packages sent from outside mainland China, including Hong Kong, Macao and Taiwan contexts. Read the current wording before directing any parcel because warehouse intake rules can be operationally specific. A familiar warehouse label is not permission to send from any origin.",
        ],
      },
      {
        title: "The public interface displays different preservation periods",
        paragraphs: [
          "In the English goods-page frontend checked July 17, 2026, shopping-agent package preservation is described as 90 days for the South China warehouse and 30 days for the Hong Kong warehouse. Treat these as the public interface values observed on the review date, not as a promise that overrides the timer or terms in your account. Service categories, item conditions or future policy changes can affect the applicable deadline.",
          "Use the earliest live deadline shown across the items intended for one parcel. Waiting for a late seller can consume storage time on the first arrivals. Add arrival date, displayed expiry and planned ship date to the ledger, and set your own decision date several days earlier. That buffer leaves time for photo questions, packing changes and payment rather than forcing a rushed shipment at the end.",
        ],
        takeaway: "Plan from the earliest displayed deadline, not from the last item’s arrival.",
      },
      {
        title: "Build a warehouse ledger that supports action",
        paragraphs: [
          "For each item record order number, warehouse, arrival date, displayed storage deadline, inspection state, return deadline, estimated weight and packing preference. Colour-code only facts from the live account; keep seller estimates and your assumptions in separate columns. A simple ledger immediately shows which items can consolidate and which unresolved item is holding the parcel.",
          "Do not rely on a screenshot of the general policy alone. Capture the order-level timer when available because it is the operational deadline attached to the item. If the account shows a value that differs from the public wording, use the account value and ask support to explain the difference in writing. Save the response beside the order.",
        ],
        checklist: [
          "Receiving warehouse",
          "Arrival and displayed expiry dates",
          "Inspection and return status",
          "Packing preference and current weight",
        ],
      },
      {
        title: "Consolidation should have a cut-off rule",
        paragraphs: [
          "Waiting for more items can reduce international freight per item, but it also adds storage, delay and coordination risk. Choose a cut-off before shopping: for example, ship when all priority items pass inspection, when the earliest timer reaches your buffer date or when the parcel reaches a target chargeable-weight band. A rule prevents indefinite waiting for a small item that does not materially improve the parcel.",
          "Check volume as well as mass. Adding a light but bulky box can raise chargeable weight more than a dense garment. Use the official calculator with a consolidated packed estimate and compare it with separate parcels. The cheapest theoretical combination is not useful if the items are in different warehouses or a line cannot accept one category.",
        ],
      },
      {
        title: "Resolve exceptions before the deadline",
        paragraphs: [
          "An item may be awaiting seller clarification, a detailed photo, a return decision or a special packing request. Tag each exception with an owner and next action. “Waiting” is not an action; “request chest measurement by July 20” is. If an item will miss the intended parcel, decide whether to ship the rest, return it where permitted or accept a later separate parcel.",
          "For any transfer, extension or disposal option, use the current account and support response. We did not find a single public page that makes every exception universal, so this guide does not invent one. The defensible fact is the warehouse separation notice and the reviewed public holding-period text; account-specific remedies require account-specific evidence.",
        ],
      },
      {
        title: "Archive the parcel record after submission",
        paragraphs: [
          "When you submit international delivery, save the included order numbers, final warehouse, packing option, dimensions, actual weight, selected line and price. This closes the storage ledger and creates a clean parcel record. If an item is missing later, you can distinguish between “not included,” “included but not packed” and “packed but not delivered.”",
          "The facts in this article were taken from public English-language AllChinaBuy interfaces reviewed July 17, 2026. Always follow the live timer and order terms shown in your account. Storage policies are exactly the kind of operational detail that can change, so the review date is part of the evidence rather than a decorative label.",
        ],
      },
    ],
    sources: [goodsDetail, freightCalculator],
    relatedSlugs: ["shipping-cost-planning", "allchinabuy-original-packaging", "allchinabuy-shipping-lines"],
  },
  {
    slug: "allchinabuy-detailed-photos",
    title: "AllChinaBuy Detailed Photos vs Standard Inspection Photos",
    eyebrow: "Photo service",
    description:
      "A source-based guide to the public photo-service descriptions, how to write a useful request and when another image is worth paying for.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "The public order page distinguishes standard inspection photos from optional detailed-photo requests.",
      "Its wording refers to three free standard photos and one requirement per detailed photo.",
      "A photo that misses the stated requirement can be requested again under the displayed service description.",
    ],
    figure: {
      src: "/images/guides/photo-service.svg",
      alt: "Comparison of standard inspection photos and targeted detailed-photo requests",
      caption: "Editorial comparison based on AllChinaBuy’s public order-stage photo-service wording.",
      sourceUrl: orderConfirmation.url,
    },
    sections: [
      {
        title: "Standard and detailed photos have different jobs",
        paragraphs: [
          "The public order interface describes standard inspection around quantity, colour and size and refers to three free photos in its detailed-photo explanation. Those images are designed to document a routine warehouse check. A detailed photo is a separate, user-directed request for a precise angle, label or measurement that the standard set may not show.",
          "Do not judge value by photo count alone. Three clear overview images may establish the correct option but fail to answer whether a chest width matches your requirement. One targeted measurement image can be more useful than five additional beauty angles. Start by listing the decisions that could lead you to accept, question or return the item, then request only missing evidence tied to those decisions.",
        ],
      },
      {
        title: "Write one observable requirement per image",
        paragraphs: [
          "AllChinaBuy’s public wording tells users to put one detailed requirement in each photo request. Follow that literally. “Show the size label and measure the insole and photograph the heel” contains three tasks and makes it unclear whether a partial response is acceptable. Split it into independent requests, ordered by importance.",
          "A good request specifies object, viewpoint and success condition: “Remove the insole if removable, lay it flat beside a centimetre ruler, and show heel-to-toe length with both endpoints visible.” Avoid subjective terms such as “high quality,” “perfect” or “looks authentic.” A warehouse worker can photograph an observable feature; they cannot turn a broad opinion into reliable evidence.",
        ],
        checklist: [
          "One object or detail",
          "One angle or measurement",
          "Visible scale or label where relevant",
          "A clear condition for a successful photo",
        ],
      },
      {
        title: "Use the retake promise precisely",
        paragraphs: [
          "The public service text says a detailed photo can be retaken free when it does not match the user’s requirement. That is strongest when the original request is objective. If you asked for the full ruler and one endpoint is cropped, explain that exact mismatch. If you merely asked for “a better photo,” there is no measurable standard against which to compare the result.",
          "Save the request and returned image together. Mark the missing element on a copy only if the interface allows a reference, while keeping the original. Do not change the requirement during a retake request; a new angle is a new request. The live account’s current service terms and dispute window govern, so act promptly when an image is unusable.",
        ],
      },
      {
        title: "Understand the displayed pricing language without freezing it",
        paragraphs: [
          "The reviewed public order text advertises a discount beginning with the third detailed photo, but this guide does not publish a fixed currency fee. Service pricing, membership benefits and promotions can change. Read the amount displayed on the exact order before adding the service, confirm how many requests the discount covers and save the order-stage total.",
          "Spend on information, not reassurance. A measurement that prevents an unusable size can justify its fee. Another logo close-up usually cannot prove authenticity. For a low-value item, the cost of multiple photos may exceed the risk they reduce. For a high-value or non-returnable item, unresolved uncertainty is more expensive; decide with that asymmetry in mind.",
        ],
      },
      {
        title: "Use category-specific request templates",
        paragraphs: [
          "For clothing, ask for flat chest width, body length, shoulder width or a care/material label. For shoes, request removable insole length, size tag, outsole or a suspected defect. For bags, request exterior dimensions, strap range, interior compartments or hardware damage. For electronics, a model label and plug can be photographed, but an image cannot establish battery health or electrical safety.",
          "For a visible defect, describe location and scale: “photograph the left sleeve cuff from 20 cm away with the loose seam centred.” For colour, ask for a neutral-light image beside a plain reference, while recognizing that screens and cameras still shift colour. Prioritize evidence that can change the decision.",
        ],
      },
      {
        title: "Keep the public-page evidence in context",
        paragraphs: [
          "Our description is based on the public English AllChinaBuy order page checked July 17, 2026. It does not guarantee that every product, order type or account receives the same number of free images or identical pricing. Used-item flows can show additional photo wording, and sealed packages can limit what a worker may inspect without opening them.",
          "Before paying, compare the service name, count, fee and request box in your current order with this guide. If they differ, the current order screen wins. The durable method is independent of the promotion: define the decision, request one observable fact, verify the returned image against the wording and keep the record.",
        ],
      },
    ],
    sources: [orderConfirmation],
    relatedSlugs: ["qc-photo-checklist", "allchinabuy-original-packaging", "allchinabuy-used-items"],
  },
  {
    slug: "allchinabuy-original-packaging",
    title: "AllChinaBuy Original Packaging: Keep It or Remove It?",
    eyebrow: "Packing guide",
    description:
      "A practical decision guide based on AllChinaBuy’s public inbound-packing description and the shipping cost created by extra weight and volume.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "Without the inbound-original-packing service, the domestic courier box is removed by default in the public description.",
      "Keeping it means the warehouse weighs and measures the item with that courier box.",
      "The warehouse can still open packaging for prohibited-item checks and inspection.",
    ],
    figure: {
      src: "/images/guides/packing-choice.svg",
      alt: "Decision diagram comparing keeping and removing a domestic courier box",
      caption: "Editorial packing trade-off based on AllChinaBuy’s public original-packing service description.",
      sourceUrl: orderConfirmation.url,
    },
    sections: [
      {
        title: "Identify which packaging the option actually refers to",
        paragraphs: [
          "The public order page describes “Inbound With Original Packing” as keeping the courier box used to send the product to the warehouse. That is not necessarily the same as preserving every retail box, seal or internal wrap untouched. Ask which layer matters: domestic courier carton, branded retail box, protective insert, factory seal or the product’s own case.",
          "If a retail box has collector or resale value, state that separately in the order request and verify what the service can preserve. The public description also says the warehouse still unpacks for prohibited-item screening and inspection, so selecting the service should not be interpreted as a guarantee that no layer will ever be opened.",
        ],
      },
      {
        title: "Know the default and the weight consequence",
        paragraphs: [
          "According to the public service wording, the domestic courier box is removed by default when the option is not selected, with confirmation for fragile products. If the option is selected, the warehouse weighs the item with the courier box and international freight uses the resulting box size and total weight. That can increase both actual and volumetric weight.",
          "Estimate the trade-off with numbers. If an extra carton changes a parcel from 35 × 25 × 15 cm to 42 × 32 × 22 cm, the public calculator formula raises volume weight from about 2.6 kg to about 5.9 kg. Even when the carton adds only a few hundred grams, the larger exterior dimensions can affect chargeable weight much more.",
        ],
        takeaway: "For bulky packaging, dimension growth can cost more than the added cardboard mass.",
      },
      {
        title: "Keep packaging when it solves a defined risk",
        paragraphs: [
          "A domestic courier box can add impact protection, keep multiple loose parts together or preserve evidence of how the seller packed a fragile item. A retail box may matter for fit, storage, gifting or resale. These are defined benefits. “Original is always better” is not a defined benefit and should not automatically outweigh shipping cost.",
          "For fragile goods, ask what protective material will remain if the courier carton is removed and what reinforcement is available for the international parcel. The public wording says fragile items may require confirmation before default removal. Use that conversation to choose the minimum packaging that controls the actual damage risk.",
        ],
      },
      {
        title: "Remove packaging when it is mostly empty volume",
        paragraphs: [
          "Shoe cartons, oversized retail boxes and seller courier cartons can contain substantial air. Removing or folding nonessential packaging may reduce dimensions and protect the product inside a more efficient consolidated carton. However, removal can eliminate labels, accessories or structural support, so inspect the warehouse photos and list what must be retained first.",
          "Ask for a packing estimate rather than assuming the smallest theoretical box. The international parcel still needs safe external packaging. Compare the official calculator using realistic “keep” and “remove” dimensions, and choose based on chargeable weight and damage risk rather than scale weight alone.",
        ],
        checklist: [
          "Which exact packaging layer has value?",
          "How much larger is the packed parcel?",
          "What protection replaces a removed box?",
          "Are labels or accessories attached to the packaging?",
        ],
      },
      {
        title: "Handle sealed and restricted items separately",
        paragraphs: [
          "A sealed retail package creates the same evidence trade-off described in the QC guide. Keeping a seal may prevent interior inspection; opening can reduce collector value. The public order page says sealed packages are not opened, inspected or photographed by default, while the original-packing description still allows prohibited-item checks. Confirm the exact treatment for the product rather than joining these statements into a guarantee they do not make.",
          "Sensitive items may also require specific packaging or may be ineligible for some routes. Do not use original packing as a way to conceal contents or bypass classification. The public freight calculator says final category judgment belongs to the warehouse, and dangerous or prohibited goods are unsupported.",
        ],
      },
      {
        title: "Write a packing instruction that can be audited",
        paragraphs: [
          "List what to keep, what may be removed and the priority: “Keep the branded shoe box and accessories; remove only the outer domestic courier bag; use the smallest protective outer carton that avoids crushing.” Save the accepted instruction and final parcel photos where available. When the dimensions arrive, compare them with the packing request before paying freight.",
          "This article is based on public AllChinaBuy English order descriptions checked July 17, 2026. Service availability and charges can vary by product and account. Read the live option before selection. The goal is not to preserve the maximum amount of cardboard; it is to preserve the packaging that has a clear function at a shipping cost you understand.",
        ],
      },
    ],
    sources: [orderConfirmation, freightCalculator],
    relatedSlugs: ["allchinabuy-volumetric-weight", "shipping-cost-planning", "qc-photo-checklist"],
  },
  {
    slug: "allchinabuy-shipping-restrictions",
    title: "AllChinaBuy Shipping Restrictions: Check Before You Order",
    eyebrow: "Restrictions guide",
    description:
      "How AllChinaBuy’s public calculator describes country, category and warehouse classification—and why route availability can change.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "Restriction results are presented as reference information, with warehouse classification controlling final eligibility.",
      "Rules can change with customs, airline and logistics-provider requirements.",
      "Dangerous or prohibited goods are not supported and may need to be returned to the seller.",
    ],
    figure: {
      src: "/images/guides/restriction-check.svg",
      alt: "Shipping restriction check using destination, item category, warehouse classification and live route",
      caption: "Editorial eligibility sequence derived from AllChinaBuy’s public freight-calculator notices.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Check destination and category as a pair",
        paragraphs: [
          "A product category is not globally shippable or unshippable. Route eligibility depends on destination, content and current line rules. AllChinaBuy’s public calculator begins with destination country and item category for that reason. Search the truthful category for the exact destination before placing the product order, then read the restrictions on each returned line.",
          "Common risk signals include batteries, liquids, magnets, powders, aerosols, food, cosmetics and other sensitive contents, but a list in an article can never be complete. Materials, quantity, watt-hours, concentration, brand treatment and local import rules can matter. Use the product specification and live calculator rather than a nickname such as “small electronics.”",
        ],
      },
      {
        title: "Treat the early result as screening, not approval",
        paragraphs: [
          "The calculator says product-category selection is for reference and warehouse judgment prevails. Before the product arrives, you are estimating classification from seller information. At receipt, warehouse staff can inspect the actual item and classify it differently. A route shown during planning is therefore evidence that a route may exist for the declared category, not a promise that the item will qualify.",
          "Save the product specification that supports your category choice, including battery status, liquid volume or material where relevant. If classification changes, compare the actual item and warehouse explanation with that record. Do not relabel the category simply to restore a cheaper line; inaccurate classification can create safety and customs problems.",
        ],
        takeaway: "The calculator screens a declared category; the warehouse classifies the received item.",
      },
      {
        title: "Expect restrictions to change",
        paragraphs: [
          "The public restriction wording says information is updated in real time in response to customs, airline and logistics-provider requirements. That makes an old screenshot weak evidence. A route may disappear between product purchase and international submission, particularly for sensitive goods or a changing destination environment.",
          "Check at three points: before product payment, after warehouse classification and immediately before parcel submission. Record the date and inputs each time. If only one expensive line remains, compare return possibilities and storage deadlines before waiting indefinitely for a route to reopen.",
        ],
      },
      {
        title: "Know the consequence of an unsupported item",
        paragraphs: [
          "The public calculator warns that dangerous and prohibited goods are not supported and can be returned to the seller at the original address. A return is not the same as a guaranteed refund: seller terms, domestic courier cost, timing and item condition can still matter. Confirm the live return path before purchasing an uncertain item.",
          "For destination legality, use the destination customs or regulator as the authority. A carrier route appearing in a calculator does not by itself prove that an item is legal to import, exempt from tax or permitted in a particular quantity. Platform eligibility, carrier acceptance and legal importability are three separate questions.",
        ],
        checklist: [
          "Platform can purchase the item",
          "Warehouse classifies it for an eligible line",
          "Carrier accepts the contents and packing",
          "Destination law permits the import",
        ],
      },
      {
        title: "Avoid mixed parcels that inherit the hardest restriction",
        paragraphs: [
          "A single sensitive item can narrow the route options for an otherwise ordinary parcel. Before consolidation, compare a parcel containing all items with a separate sensitive-item parcel. The answer depends on actual and volume weight, line minimums and whether the sensitive item has any eligible route. Do not assume consolidation is always cheaper.",
          "Warehouse separation can add another boundary: the public calculator says items in different warehouses cannot be shipped together. Build scenarios only from items that can actually consolidate. A spreadsheet with category, warehouse, actual weight, packed volume and eligible lines makes the constraint visible.",
        ],
      },
      {
        title: "Use support for an item-specific written answer",
        paragraphs: [
          "When the public calculator is ambiguous, provide the exact product URL, destination, composition, quantity, battery or liquid specification and desired warehouse. Ask whether the item can be purchased, how it is likely to be classified and which current lines accept it. Keep the written response, while recognizing that final classification occurs after receipt.",
          "This guide reflects public AllChinaBuy English pages reviewed July 17, 2026 and intentionally avoids a permanent prohibited-item list. The official interface itself says restrictions can update. A useful restriction guide teaches a repeatable live check; a static list without a date encourages false confidence.",
        ],
      },
    ],
    sources: [freightCalculator, goodsDetail],
    relatedSlugs: ["product-link-safety", "allchinabuy-shipping-lines", "allchinabuy-warehouse-storage"],
  },
  {
    slug: "allchinabuy-volumetric-weight",
    title: "AllChinaBuy Volumetric Weight: Formula and Examples",
    eyebrow: "Weight guide",
    description:
      "Calculate the volume weight shown by AllChinaBuy’s public shipping tool, compare it with scale weight and find the packing change that matters.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "The public formula is length × width × height ÷ 5,000 when dimensions are centimetres.",
      "The calculator explains that the larger of actual and volume weight can control route pricing.",
      "Final rounding and line rules should be checked on the live quotation.",
    ],
    figure: {
      src: "/images/guides/volumetric-weight.svg",
      alt: "Volumetric weight formula with a 40 by 30 by 20 centimetre parcel example",
      caption: "Worked example using the formula displayed in AllChinaBuy’s public shipping calculator.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Use exterior packed dimensions, not product dimensions",
        paragraphs: [
          "Measure the final parcel’s longest length, width and height at the outermost points. The calculator labels these as the box size after packing. A shoe may be 30 cm long, but its retail box, protective wrap and consolidated carton can produce a much larger shipping cube. Using product dimensions gives a neat answer to the wrong question.",
          "For a pre-purchase estimate, add realistic clearance for the retail or protective box and any consolidation. Use a high case if the seller dimensions are missing. After warehouse packing, replace the estimate with measured exterior dimensions and rerun the official calculator before paying.",
        ],
      },
      {
        title: "Apply the public calculator formula",
        paragraphs: [
          "AllChinaBuy’s public page displays Length × Width × Height × 1,000 ÷ 5,000. With centimetres and kilograms, this simplifies to L × W × H ÷ 5,000. For a 40 × 30 × 20 cm parcel, the calculation is 24,000 ÷ 5,000 = 4.8 kg. Write down the dimensions and result so a later packing change can be compared.",
          "A 30 × 20 × 10 cm parcel produces 1.2 kg. If its scale weight is 2.0 kg, it is mass-heavy relative to this formula. If the 40 × 30 × 20 cm parcel weighs 2.6 kg, it is space-heavy. The distinction tells you whether to focus on removing mass or reducing the box.",
        ],
        checklist: [
          "40 × 30 × 20 cm = 4.8 kg volume weight",
          "30 × 20 × 10 cm = 1.2 kg volume weight",
          "Record scale, volume and displayed chargeable weight separately",
        ],
      },
      {
        title: "Compare with actual weight",
        paragraphs: [
          "The calculator text explains that logistics providers can calculate using the larger of actual and volume weight. For the 4.8 kg volume example, a 2.6 kg scale weight may still be charged as 4.8 kg on such a line. If the same box weighs 6.1 kg, actual weight is larger and reducing empty space alone may not change the chargeable figure.",
          "Use the route’s displayed calculation rather than assuming every line behaves identically. Lines can apply rounding, minimum units or different operational rules. The formula explains the pressure created by volume; the live quotation shows how the selected line prices the actual parcel.",
        ],
        takeaway: "Optimize the larger driver: dimensions for a space-heavy parcel, mass for a mass-heavy parcel.",
      },
      {
        title: "Test packing changes with sensitivity analysis",
        paragraphs: [
          "Change one dimension at a time. Reducing the 40 × 30 × 20 cm example to 40 × 30 × 16 cm lowers volume weight to 3.84 kg. Reducing only one centimetre of length lowers it to 4.68 kg. This shows why removing a tall empty layer can matter more than trimming a small edge.",
          "Compare keeping and removing seller courier boxes, folding nonessential cartons and separating bulky low-value packaging. Never optimize below safe protection. A crushed product is not a shipping saving. Ask what reinforcement replaces removed packaging and use the smallest safe outer carton, not the smallest imaginable carton.",
        ],
      },
      {
        title: "Keep warehouses and category rules in the calculation",
        paragraphs: [
          "A perfect volume estimate is useless for a line the item cannot use. Enter destination, truthful category and actual warehouse before comparing cost. The public calculator says the warehouse’s classification prevails and that items in different warehouses cannot be shipped together. Build only scenarios that satisfy those constraints.",
          "For a mixed parcel, the most restricted item may determine route choice. Calculate the consolidated parcel and plausible split parcels. Sometimes separating a sensitive or bulky item creates more route choice for the remainder even though there are two shipments.",
        ],
      },
      {
        title: "Do not turn the divisor into a universal promise",
        paragraphs: [
          "This guide reports the formula visible on AllChinaBuy’s public English calculator on July 17, 2026. Carrier rules, rounding and route availability can change. Always use the live calculator and final parcel quotation. If a route card shows a different chargeable result, ask for the line-specific rule rather than forcing the general example onto it.",
          "The useful habit is transparent arithmetic. Save the dimensions, scale weight, formula result, route and date. When a quote changes, those inputs make it possible to identify whether the cause was packing, classification, route pricing or a different calculation rule.",
        ],
      },
    ],
    sources: [freightCalculator, orderConfirmation],
    relatedSlugs: ["shipping-cost-planning", "allchinabuy-original-packaging", "allchinabuy-shipping-lines"],
  },
  {
    slug: "allchinabuy-shipping-lines",
    title: "How to Compare AllChinaBuy Shipping Lines",
    eyebrow: "Route guide",
    description:
      "Compare live routes by eligibility, chargeable weight, fee structure, delivery method and evidence—not headline price alone.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "Public route details can include first-weight, added-weight, fuel and operating charges.",
      "Displayed delivery times are provider estimates for reference, not guarantees.",
      "Some routes are supplied by third-party logistics providers, with AllChinaBuy acting as an intermediary.",
    ],
    figure: {
      src: "/images/guides/route-comparison.svg",
      alt: "Shipping-line comparison matrix for eligibility, chargeable weight, complete cost and delivery evidence",
      caption: "Editorial route matrix based on fields displayed by AllChinaBuy’s public calculator.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Filter for eligibility before ranking price",
        paragraphs: [
          "Enter the same destination, category, warehouse, packed dimensions and weight for every comparison. Remove any route that does not accept the item’s final classification. A cheap line that cannot carry the contents is not an option. The public calculator says its category selection is a reference and warehouse judgment controls the final classification.",
          "Check delivery method, destination coverage, restrictions and any tax-related description shown. A line name alone does not establish door delivery, customs treatment or acceptance of sensitive goods. Open the route details and save the complete current wording for the finalists.",
        ],
      },
      {
        title: "Compare the complete fee structure",
        paragraphs: [
          "The public calculator includes fields for first-weight charge, added-weight charge, fuel-related fees and operating fees. A low first-weight price can be overtaken by a high added-weight rate on a larger parcel. Use the calculator’s total for the same chargeable weight and inspect every included component instead of comparing banner numbers.",
          "Also note currency and payment conversion. If the final payment currency differs from your budget, record the exchange rate or provider spread at the time of payment. Do not add an invented average service fee when the live interface already provides the order-specific amount.",
        ],
        checklist: [
          "Same inputs for every route",
          "Complete displayed charge, not banner price",
          "Chargeable-weight method and rounding",
          "Payment currency and conversion",
        ],
      },
      {
        title: "Treat delivery windows as estimates",
        paragraphs: [
          "AllChinaBuy’s public calculator says delivery-time estimates come from logistics providers and are for reference. Use them as comparative ranges, not promised arrival dates. A narrow range without a sample size or service guarantee is still an estimate. Customs review, handoffs, weather and peak periods can extend it.",
          "If timing matters, define a latest acceptable date and work backward with a buffer. Record the date you viewed the estimate. For urgent or high-value goods, ask whether the line provides tracked milestones, compensation terms or an actual service guarantee; do not infer these from a displayed day range.",
        ],
      },
      {
        title: "Understand who operates the route",
        paragraphs: [
          "The public calculator notes that some lines can be provided by third-party logistics companies and that AllChinaBuy may communicate or negotiate on the user’s behalf. This means the platform can be an intermediary rather than the carrier performing every leg. Keep the displayed provider or route name and terms with the parcel record.",
          "When a problem occurs, describe the last tracked event, date, route and parcel number. Ask which party currently holds the parcel and which published term applies. “AllChinaBuy shipping” is too broad to identify an operational carrier or handoff.",
        ],
      },
      {
        title: "Score risk as well as price",
        paragraphs: [
          "A simple matrix can use five columns: eligible contents, complete quoted cost, estimated range, tracking evidence and remedy terms. Add packing limits or tax handling only when the live route describes them. Weight the columns according to the item: a replaceable low-value garment and a fragile high-value product should not produce the same decision.",
          "Avoid social-media anecdotes as if they were current route statistics. One buyer’s fast parcel does not establish the expected outcome for another country, month or category. First use official live fields; then use dated external experience only as context, clearly separated from platform facts.",
        ],
        takeaway: "Choose the cheapest eligible route whose uncertainty you can accept, not the smallest headline number.",
      },
      {
        title: "Recheck after final packing",
        paragraphs: [
          "Packing can change dimensions, actual weight and therefore the ranking of lines. Rerun the comparison after the warehouse publishes final parcel data. Save the winning route, two alternatives and the reason for the choice. If the price moves, the public calculator warns that logistics charges can fluctuate with market conditions.",
          "This article is based on public AllChinaBuy English calculator fields checked July 17, 2026. It does not recommend one timeless “best” line because the needed inputs and live options vary. A defensible recommendation must name destination, category, warehouse, dimensions, weight, date and the user’s risk priority.",
        ],
      },
    ],
    sources: [freightCalculator],
    relatedSlugs: ["shipping-cost-planning", "allchinabuy-volumetric-weight", "allchinabuy-shipping-restrictions"],
  },
  {
    slug: "allchinabuy-used-items",
    title: "Buying Used Items Through AllChinaBuy: Risk Checklist",
    eyebrow: "Used-item guide",
    description:
      "A careful reading of the public used-item terms: limited inspection, condition uncertainty, return limits and fees that must be checked on the exact order.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "Public product-page wording describes AllChinaBuy as a purchase agent rather than the used-item seller.",
      "Used-item inspection is limited and does not guarantee authenticity, quality or completeness.",
      "The frontend contains condition-specific fee language, so a universal fee should not be assumed.",
    ],
    figure: {
      src: "/images/guides/used-item-risk.svg",
      alt: "Used-item decision gate covering seller evidence, condition, return terms, fee and shipping",
      caption: "Editorial risk gates based on used-item notices in AllChinaBuy’s public goods interface.",
      sourceUrl: goodsDetail.url,
    },
    sections: [
      {
        title: "Recognize the agency boundary",
        paragraphs: [
          "The public used-item wording describes AllChinaBuy as providing a purchase-agent service rather than selling the item itself. The seller controls the item description and condition claim. The agent can place the domestic order and perform limited warehouse handling, but it does not gain first-hand history or provenance merely by receiving the parcel.",
          "Save the seller profile, full description, condition grade, defect disclosures, included parts, serial or model information and original photos. Ask questions before payment where possible. If a claim is essential but not documented, price the item as though the claim is unproven or do not buy it.",
        ],
      },
      {
        title: "Do not overread the inspection",
        paragraphs: [
          "The public goods-page text limits used-item inspection and warns that authenticity, quality and completeness are not guaranteed. An appearance check may identify obvious damage or a missing visible component, but it cannot reveal battery health, intermittent faults, internal wear, odour, hidden repair, water damage or long-term function.",
          "Translate the listing into observable checkpoints. Ask for the model label, all included pieces, major surfaces, ports, soles or high-wear areas. A warehouse photo can answer those questions. It cannot establish provenance or a performance claim without a suitable test, and the public wording should prevent a reader from assuming otherwise.",
        ],
        takeaway: "Warehouse evidence can reduce visible-condition uncertainty; it cannot erase used-item history risk.",
      },
      {
        title: "Read the exact return and exchange terms",
        paragraphs: [
          "The public used-item notices describe restricted or unavailable returns and exchanges in common scenarios. Because the seller and item category can control the practical remedy, read the exact notice attached to the product before paying. Do not assume ordinary retail return expectations apply to a unique or used listing.",
          "Set a maximum acceptable loss before ordering: product cost, domestic shipping, agent service, photos and any return courier cost. If the uncertainty exceeds that amount, request stronger seller evidence or walk away. A low purchase price can still create a high percentage loss after non-refundable service and logistics costs.",
        ],
      },
      {
        title: "Check the displayed service fee, not a copied number",
        paragraphs: [
          "The reviewed frontend contains more than one used-item fee description tied to different flows, platforms or membership conditions. That makes a universal “AllChinaBuy used-item fee” misleading. Use the fee shown for the exact product and order, and capture the amount before confirmation.",
          "If the interface shows a percentage, minimum, maximum or membership discount, calculate it against the correct base and ask what happens if the seller changes the price. Include optional detailed photos in the budget. This article deliberately does not freeze a number that the live order may contradict.",
        ],
        checklist: [
          "Exact service fee on this order",
          "Return or exchange wording",
          "Visible-condition evidence required",
          "Worst-case non-refundable total",
        ],
      },
      {
        title: "Plan storage and shipping for a slow decision",
        paragraphs: [
          "Used items often need more questions and photos, which consume warehouse time. Record the arrival date, current storage timer and any return deadline immediately. The public goods frontend also displays different shopping-agent preservation periods for South China and Hong Kong warehouses, but the order-level timer should govern your action.",
          "Check shipping restrictions for batteries, liquids or fragile construction before purchase. A used electronic device may have uncertain battery specifications, and a fragile collectible can need packaging that increases volume weight. Run a truthful early calculator scenario and leave budget for protective packing.",
        ],
      },
      {
        title: "Use a written accept-or-reject rule",
        paragraphs: [
          "Before paying, write the conditions that must be visible at the warehouse: correct model, all listed components, no crack in named areas and a specific measurement or label. Also write which uncertainties you knowingly accept. When the photos arrive, compare them with that list rather than becoming attached to the purchase.",
          "This article is based on public AllChinaBuy English goods-page wording checked July 17, 2026. Used-item terms are particularly item-specific. The live product notice and order contract override this general guide. Our factual conclusion is modest but important: the service boundary and limited inspection mean the buyer must carry more condition and remedy risk than with a standard new retail purchase.",
        ],
      },
    ],
    sources: [goodsDetail, orderConfirmation, freightCalculator],
    relatedSlugs: ["qc-photo-checklist", "allchinabuy-detailed-photos", "product-link-safety"],
  },
  {
    slug: "allchinabuy-checkout-costs",
    title: "AllChinaBuy Checkout Costs: What Is and Is Not Included",
    eyebrow: "Cost guide",
    description:
      "A stage-by-stage cost ledger grounded in AllChinaBuy’s public product and order pages, including the international charge that comes later.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "The public product flow shows item price and local delivery, while international delivery is excluded at order confirmation.",
      "Optional photos and packing choices can change the pre-shipping total or final parcel dimensions.",
      "A seller discount or price change can create a difference that needs confirmation.",
    ],
    figure: {
      src: "/images/guides/checkout-ledger.svg",
      alt: "AllChinaBuy cost ledger separating product checkout, warehouse services, international freight and destination charges",
      caption: "Editorial cost timeline based on AllChinaBuy’s public goods, order and freight pages.",
      sourceUrl: orderConfirmation.url,
    },
    sections: [
      {
        title: "Separate the cost into four stages",
        paragraphs: [
          "Stage one is the product: item price and domestic seller-to-warehouse delivery. Stage two is optional warehouse work such as detailed photos or packing choices. Stage three is international freight after packed measurements exist. Stage four is destination-side tax, customs or handling where applicable. Keeping four subtotals prevents the early product checkout from masquerading as delivered cost.",
          "The public order-confirmation page explicitly says the displayed total excludes international delivery and that this is calculated after items reach the warehouse. Put that sentence at the top of your budget. If the order is only affordable before international freight, it is not yet affordable.",
        ],
      },
      {
        title: "Record product and domestic delivery exactly",
        paragraphs: [
          "Capture unit price, quantity, selected option, domestic delivery and currency. If the seller offers a discount or changes price, the public product interface can show a difference that needs to be paid or confirmed. Compare the new amount with the source listing and decide whether the order still meets the budget before accepting.",
          "For multiple sellers, keep domestic delivery per item because free shipping on one listing does not imply it on another. Mark estimates and confirmed charges differently. The goal is an auditable total, not an average that hides which seller or option created the change.",
        ],
        checklist: [
          "Unit price × quantity",
          "Domestic delivery",
          "Discount or price difference",
          "Currency and payment amount",
        ],
      },
      {
        title: "Add warehouse services only when they reduce risk",
        paragraphs: [
          "Detailed photos should answer a specific accept-or-return question. Original inbound packing should preserve a packaging layer with defined value. Extra protection should address an identified damage risk. Add each service as a separate line with its displayed live price; do not group them as an invisible “agent fee.”",
          "Some services also affect international cost. Keeping a courier carton can increase actual and volume weight. A photo request may delay the decision but prevent shipping an unusable item. Evaluate the service by total risk reduced, not only by its immediate price.",
        ],
      },
      {
        title: "Estimate international freight with packed scenarios",
        paragraphs: [
          "Before purchase, run the public calculator using destination, truthful category, likely warehouse, estimated packed weight and dimensions. Use low, expected and high packing cases. After warehouse packing, replace estimates with actual measurements and compare eligible lines using the same inputs.",
          "The public formula gives volume weight as L × W × H ÷ 5,000 with centimetres. Record actual, volume and displayed chargeable weight. The calculator says rates can fluctuate and delivery times are estimates, so keep a buffer and timestamp the result rather than presenting it as a guarantee.",
        ],
      },
      {
        title: "Keep destination charges outside the platform claim",
        paragraphs: [
          "Customs thresholds, tax collection and handling rules vary by destination and can change. Use the destination customs or tax authority for legal obligations. A route label can describe a logistics product, but it should not be treated as a universal legal or tax guarantee without reading the current terms.",
          "Add a destination reserve when the amount is uncertain and never copy another buyer’s declaration as advice. Country, category, value and date matter. Keep official customs research beside the platform budget so the delivered-cost estimate clearly shows which source supports each line.",
        ],
        takeaway: "Platform checkout, international freight and legal import cost are related—but they are not the same invoice or authority.",
      },
      {
        title: "Use a final go/no-go review",
        paragraphs: [
          "Before product payment, verify the source, option, early route eligibility and high-case budget. Before international payment, verify included items, warehouse, inspection, packing, dimensions, chargeable weight, route and complete live quote. Stop when a material figure is missing; uncertainty is not zero cost.",
          "This cost map uses public AllChinaBuy English pages checked July 17, 2026 and avoids hard-coded service or freight prices. That is intentional: the live order and calculator are the current sources for amounts. The lasting value is the ledger structure, which makes missing international cost and hidden assumptions visible before they become a surprise.",
        ],
      },
    ],
    sources: [goodsDetail, orderConfirmation, freightCalculator],
    relatedSlugs: ["how-a-china-shopping-directory-works", "shipping-cost-planning", "allchinabuy-shipping-lines"],
  },
  {
    slug: "allchinabuy-pre-shipment-checklist",
    title: "AllChinaBuy Pre-Shipment Checklist: 15 Final Checks",
    eyebrow: "Final review",
    description:
      "A final evidence-based review before paying international freight, covering items, photos, warehouse, packing, weight, route and records.",
    readingTime: "5 min read",
    updated: REVIEWED,
    keyFacts: [
      "Final international cost should be reviewed after warehouse measurements replace product estimates.",
      "Packing choice can affect both evidence and chargeable weight.",
      "The route should be rechecked for current eligibility, fees and estimated timing.",
    ],
    figure: {
      src: "/images/guides/pre-shipment-check.svg",
      alt: "Fifteen-check pre-shipment gate grouped into item, parcel, route and record checks",
      caption: "Editorial final gate assembled from AllChinaBuy’s public order and freight fields.",
      sourceUrl: freightCalculator.url,
    },
    sections: [
      {
        title: "Checks 1–4: confirm every included item",
        paragraphs: [
          "First, compare the parcel’s included order numbers with your intended list. Second, verify quantity, colour and size against the saved checkout. Third, review the standard inspection photos for visible mismatch or damage. Fourth, close every detailed-photo request with an explicit accept, return or clarification decision. Do not submit a parcel while an item is still in an undefined “probably fine” state.",
          "AllChinaBuy’s public order text describes standard checks around quantity, colour and size, but those photos have limits. Confirm sealed-item trade-offs and used-item condition risk separately. Save the photo set and decision because the international shipment usually makes a later domestic return much harder.",
        ],
        checklist: [
          "1. Included order numbers",
          "2. Quantity, colour and size",
          "3. Standard photo review",
          "4. Detailed-photo decisions closed",
        ],
      },
      {
        title: "Checks 5–8: verify warehouse and packing",
        paragraphs: [
          "Fifth, confirm all items are in the same warehouse; the public calculator says different warehouses cannot ship together. Sixth, check the earliest storage timer so submission will complete before the live deadline. Seventh, review which courier and retail packaging will be kept or removed. Eighth, confirm protection for fragile or crushable items.",
          "A packing instruction should name layers, not say “pack well.” The public original-packing description says keeping the inbound courier box increases the measured box size and total weight and does not necessarily prevent prohibited-item inspection. Make sure the final choice matches the cost estimate and the item’s protection needs.",
        ],
        checklist: [
          "5. Same receiving warehouse",
          "6. Storage deadline buffer",
          "7. Keep/remove packaging instruction",
          "8. Fragile protection confirmed",
        ],
      },
      {
        title: "Checks 9–11: audit the measured parcel",
        paragraphs: [
          "Ninth, record actual scale weight. Tenth, record exterior length, width and height after packing. Eleventh, calculate volume weight with the public formula L × W × H ÷ 5,000 and compare it with the route’s displayed chargeable weight. If the figures do not reconcile, ask for the line rule before paying.",
          "Look for avoidable empty volume, but do not compromise protection. If keeping a seller box makes the parcel space-heavy, compare a safe removal scenario. Save the final measurements; they are the factual bridge between packing and freight price.",
        ],
        checklist: [
          "9. Actual weight",
          "10. Packed exterior dimensions",
          "11. Volume and chargeable weight",
        ],
      },
      {
        title: "Checks 12–14: compare the live route",
        paragraphs: [
          "Twelfth, verify the final warehouse classification and route eligibility for the destination. Thirteenth, compare complete quoted charges, including first-weight, added-weight, fuel or operating components where displayed. Fourteenth, read delivery method, estimated window, tracking and tax-related wording without converting an estimate into a promise.",
          "The public calculator says category selection is a reference, prices can fluctuate and delivery time is supplied for reference by logistics providers. Use the result from today with the final parcel inputs. Keep one viable alternative in case the preferred route changes before payment.",
        ],
        checklist: [
          "12. Final category and eligibility",
          "13. Complete live quote",
          "14. Delivery and route terms",
        ],
      },
      {
        title: "Check 15: save a complete submission record",
        paragraphs: [
          "Save included items, final photos, packing instruction, warehouse, dimensions, actual and chargeable weight, selected line, full price, date and payment confirmation. This is check fifteen. A complete record lets you explain a mismatch using evidence and separates a platform issue from a carrier or destination event.",
          "Add the tracking number and first scan when available. If a third-party logistics provider operates the line, retain the route name shown at submission. The public calculator notes that AllChinaBuy can act as an intermediary for such routes, so identifying the actual handoff matters when asking for help.",
        ],
        checklist: ["15. Dated parcel and payment record"],
      },
      {
        title: "Use the checklist as a stop gate",
        paragraphs: [
          "A failed check should produce an action, not an ignored warning. Missing dimension: request it. Unresolved photo: clarify it. Ineligible category: compare legitimate alternatives or return where permitted. Different warehouse: recalculate separate parcels. Price outside budget: change parcel composition or wait only if the storage timer allows.",
          "This checklist is based on public AllChinaBuy English interfaces reviewed July 17, 2026. Your current account, destination rules and order terms remain authoritative. The checklist adds value by forcing the final facts into one place before the irreversible and usually more expensive international stage.",
        ],
      },
    ],
    sources: [orderConfirmation, freightCalculator, goodsDetail],
    relatedSlugs: ["allchinabuy-checkout-costs", "allchinabuy-shipping-lines", "allchinabuy-original-packaging"],
  },
];
