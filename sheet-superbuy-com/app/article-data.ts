export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  topic: string;
  title: string;
  deck: string;
  date: string;
  updated: string;
  readingTime: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "how-to-use-a-superbuy-spreadsheet",
    topic: "Spreadsheet method",
    title: "How to use a Superbuy spreadsheet without buying blind",
    deck: "A product sheet is useful for discovery, but only if you verify the live listing, preserve the exact variant, and estimate the whole buying journey.",
    date: "2026-08-14",
    updated: "14 August 2026",
    readingTime: "9 min read",
    sections: [
      {
        id: "what-it-is",
        title: "What a spreadsheet can—and cannot—tell you",
        paragraphs: [
          "A Superbuy spreadsheet is best understood as a discovery index. It can group product routes by category, surface unfamiliar search terms, and reduce the time needed to find a plausible listing. That is valuable, especially when marketplace titles are inconsistent or difficult to search. But the sheet is not the seller, the warehouse, the carrier, or the item itself. Its information can become stale the moment a listing changes.",
          "The safest mental model is a library catalogue. A catalogue tells you where a book might be; it does not certify the condition of the copy on the shelf. In the same way, a spreadsheet route can lead to a live product page without proving that its photographs, options, seller performance, stock, materials, or current price are the same as when the route was first collected.",
          "That distinction matters because giant link counts can create false confidence. Ten thousand rows are not ten thousand current verifications. A smaller set of clearly described route checks, combined with live category and search access, is often more useful than a huge copied table with no review date or methodology.",
        ],
      },
      {
        id: "verify",
        title: "Verify the destination before evaluating the product",
        paragraphs: [
          "Start by checking that the route opens the intended detail page. Look for an obvious match between the spreadsheet label, the primary image, and the destination. A redirect to a generic homepage, an unrelated agent, or a missing page is a broken route even if the link technically loads.",
          "Next, evaluate the live page on its own terms. Read the current title and options. Check whether the displayed price applies to the variant you want or only to the cheapest option. Review the product gallery for consistency and look for size information, seller notes, domestic shipping, minimum quantities, and restrictions. If key information exists only in an image, save a clear record of it before ordering.",
        ],
        bullets: [
          "Match the product type and primary image.",
          "Confirm colour, size, model, quantity, and any bundled options.",
          "Check whether the shown price changes with the selected variant.",
          "Record important seller notes and size information.",
          "Treat availability as current only at the time you submit the purchase.",
        ],
      },
      {
        id: "cost",
        title: "Separate the item price from the landed cost",
        paragraphs: [
          "A spreadsheet price is normally only the product price, and an approximate USD figure adds exchange-rate uncertainty. The purchase stage can also include seller-to-warehouse delivery and optional services. The parcel stage adds international freight, packaging choices, route surcharges, and sometimes insurance. Your destination may then apply taxes, duties, brokerage, or handling charges.",
          "Shipping is especially hard to infer from a product card because the charge may depend on the packed parcel rather than the item alone. A light shoebox or puffer jacket can occupy enough space to trigger volumetric pricing. Removing unnecessary packaging can reduce volume, while keeping protective boxes can reduce damage risk. Neither decision is universally correct; it depends on the item and route.",
          "Use early estimates to compare scenarios, not as promises. Once the item reaches the warehouse, measured weight and dimensions provide better inputs. If a rehearsal or pre-pack option is available, it can reduce uncertainty before you choose a line.",
        ],
      },
      {
        id: "qc",
        title: "Turn warehouse photos into a checkpoint",
        paragraphs: [
          "When the item arrives, compare the warehouse photos with the exact order record you saved. Begin with quantity, colour, model, and size label. Then inspect visible condition: stains, scratches, tears, crushed areas, loose threads, glue marks, misaligned printing, damaged hardware, or packaging problems. Perspective and lighting can mislead, so ask for one targeted close-up or measurement when the standard views do not answer a material question.",
          "A QC photo is evidence of visible appearance at a moment in time. It cannot prove authenticity, hidden construction, fabric composition, comfort, scent, electronics reliability, or long-term durability. Avoid language such as ‘passed authenticity check’ unless a qualified service actually performed and documented such a check.",
          "Resolve visible problems before international submission whenever possible. Seller return windows and domestic return arrangements vary, and correction becomes harder after the parcel leaves the warehouse. A concise request that identifies the ordered option and the exact discrepancy is more useful than a vague request to ‘check quality.’",
        ],
      },
      {
        id: "warning-signs",
        title: "Recognise stale or misleading spreadsheet rows",
        paragraphs: [
          "A route deserves extra caution when the card image and destination gallery no longer match, the title describes a different product type, or every option carries a very different price from the amount shown in the sheet. A generic marketplace search result is not equivalent to an exact product page. Neither is a redirect to an unrelated shopping agent. When the route loses its original context, restart the comparison rather than assuming the nearest result is interchangeable.",
          "Dates also matter. A recently updated page can still contain an old product row, while an older route can remain valid. Look for evidence at the row level: a review date, a clear description of what was checked, and a current destination. Avoid treating labels such as ‘verified,’ ‘best quality,’ or ‘trusted seller’ as evidence when the publisher does not explain the test behind them.",
          "Watch for rows that omit the variant responsible for the advertised price. Marketplace listings sometimes show the cheapest accessory, deposit, sample, or small size as the headline amount. Select the exact option you intend to buy and check the resulting price. If the seller’s options are ambiguous, ask for clarification before purchase rather than expecting warehouse staff to infer your preference.",
          "Finally, separate popularity from suitability. A frequently copied link may simply be easy to redistribute. It does not tell you whether the size chart fits your needs, the item can use your preferred shipping line, or the seller’s current batch resembles older community photos. Use community references to form questions, then answer those questions with the live listing and your own warehouse evidence.",
        ],
      },
      {
        id: "record",
        title: "Keep a compact decision record",
        paragraphs: [
          "For each serious candidate, keep the destination URL, captured title, selected options, displayed item price, domestic delivery, order date, and the reason you chose it. After arrival, add the warehouse date, measurement evidence, visible issues, and your ship-or-return decision. This record helps if several similar items arrive or if a listing changes after purchase.",
          "The purpose is not to create paperwork. It is to prevent the common failure in which the buyer remembers the spreadsheet thumbnail but cannot reconstruct which colour, size, seller note, or price applied. A few precise fields make the later QC and parcel decision faster.",
          "If you share a sheet with friends or a community, distinguish observation from opinion. ‘Destination opened and primary image matched on 14 August’ is an observation. ‘Best batch’ or ‘perfect quality’ is a conclusion that requires a defined comparison and can become outdated. Add dates to checks, preserve the original destination, and correct broken rows instead of silently redirecting them. That small amount of editorial discipline makes the index easier for another person to audit and reduces the chance that an old recommendation keeps circulating without its original evidence.",
          "Used this way, a Superbuy spreadsheet becomes genuinely useful: a fast discovery surface connected to live evidence, not a substitute for judgment. Browse broadly, verify narrowly, and make the expensive decisions only after the relevant information exists.",
        ],
      },
    ],
  },
  {
    slug: "superbuy-qc-photos-checklist",
    topic: "QC photos",
    title: "Superbuy QC photos: a practical warehouse checklist",
    deck: "Use standard and targeted warehouse photos to verify the ordered variant, inspect visible condition, and decide while correction may still be possible.",
    date: "2026-08-14",
    updated: "14 August 2026",
    readingTime: "8 min read",
    sections: [
      {
        id: "purpose",
        title: "The purpose of a QC review",
        paragraphs: [
          "Warehouse QC is a checkpoint between domestic purchase and international shipping. Superbuy states that three standard photos are supplied after inspection. Those views give you evidence of what arrived at the warehouse, but their value depends on having a clear order record and a repeatable review sequence.",
          "The first question is not ‘does it look good?’ It is ‘does the visible item match what I ordered?’ Check quantity, colour, size label, model, and included pieces against your submitted options. A beautifully photographed wrong variant is still wrong. If the seller listing changed after purchase, compare the warehouse evidence with the order snapshot rather than relying on the current page alone.",
          "Only then move to condition and workmanship. Review the whole silhouette before zooming into details. This reduces the chance of concentrating on a minor thread while missing a wrong shape, missing component, or major asymmetry.",
        ],
      },
      {
        id: "sequence",
        title: "A six-part inspection sequence",
        paragraphs: [
          "Begin with the package contents and overall item. Count pieces, pairs, accessories, and removable components. Compare the dominant colour and shape with the order. For footwear, check that both shoes appear to be the same model and size. For clothing, locate the size label and inspect front and back. For electronics or accessories, confirm the expected visible components without assuming they have been function-tested.",
          "Next inspect surfaces and construction. Look for stains, scratches, tears, dents, crushed edges, discolouration, glue marks, loose threads, skipped seams, misaligned panels, crooked printing, inconsistent embroidery, and damaged hardware. Compare left and right sides when symmetry matters. Remember that lens distortion and folded fabric can create apparent differences, so use more than one view.",
        ],
        bullets: [
          "Order match: quantity, colour, model, size, and selected options.",
          "Overall form: proportions, silhouette, and obvious deformation.",
          "Visible condition: stains, scratches, tears, or transport damage.",
          "Construction: seams, printing, embroidery, zips, buttons, and hardware.",
          "Measurements: dimensions that affect fit or compatibility.",
          "Packaging: boxes, tags, inserts, and protection you intend to keep.",
        ],
      },
      {
        id: "targeted",
        title: "Request evidence, not reassurance",
        paragraphs: [
          "Standard photos are designed to provide a general view, so they will not answer every product-specific question. When a decision depends on missing information, ask for one targeted piece of evidence. For trousers, that might be waist width and inseam with a ruler. For shoes, it might be insole length and a close-up of the size tag. For a printed garment, it might be a straight-on view of the graphic and a close-up of a suspected defect.",
          "A good request names the exact area, viewing angle, and reference object. ‘Please place a ruler along the insole from heel to toe and photograph the full measurement’ is testable. ‘Please check the size’ invites a subjective response. Likewise, ‘photograph the scratch beside the zipper in natural warehouse lighting’ is more useful than ‘take another picture.’",
          "Avoid requesting many generic extra photos. More images do not automatically create more certainty. Identify the question that would change your decision and request the cheapest reliable evidence for that question.",
        ],
      },
      {
        id: "limits",
        title: "Know what photographs cannot prove",
        paragraphs: [
          "Warehouse images can document visible characteristics, but they cannot reliably establish authenticity. Similar labels, packaging, and exterior details can appear on different products, and authenticity judgments often require expertise, provenance, or physical testing. The photos also cannot tell you how a garment feels, whether a material composition claim is accurate, whether an electronic device will remain reliable, or whether an adhesive will hold over time.",
          "This does not make QC useless. It makes precise language important. Say that the colour, label, visible condition, or measurement matched the order evidence. Do not expand that observation into a guarantee about things the evidence does not show.",
          "Lighting can shift colour, compression can hide small defects, and camera angle can distort proportions. When colour accuracy is decisive, compare multiple views and ask whether the warehouse can provide a neutral-light photo. Even then, different screens display colour differently.",
        ],
      },
      {
        id: "category-checks",
        title: "Adapt the checklist to the product category",
        paragraphs: [
          "For footwear, confirm the size label on both shoes, inspect the pair from above and behind, and compare the left and right shape. Look at sole attachment, eyelets, stitching paths, obvious glue, and deformation caused by packing. If fit is uncertain, an insole-length measurement is usually more useful than an exterior sole measurement, but confirm how the ruler is positioned so you can compare it with footwear you already own.",
          "For clothing, request flat measurements that correspond to a garment with a known fit: chest width, shoulder width, body length, waist, rise, or inseam as relevant. A printed size tag is not a universal measurement system. Inspect major seams, cuffs, closures, graphics, embroidery, and symmetry. Fold lines are normal after packing; stains, tears, skipped seams, or a clearly incorrect print position require a different judgment.",
          "For structured accessories, check dimensions, hardware count, closure alignment, corners, straps, and included pieces. Reflective metal and glossy surfaces are difficult to judge in one photograph, so ask for a close-up from a second angle when a mark could be glare. If you care about retail packaging, state that before consolidation; otherwise it may be treated as expendable packaging rather than part of the product value.",
          "For electronics, photographs mainly confirm visible model information, ports, accessories, and exterior condition. They do not establish battery health, long-term reliability, network compatibility, electrical safety, or successful operation unless a specific test service covers those points and records the result. Batteries and magnets can also restrict shipping routes, so confirm eligibility before treating the item price as the main decision.",
          "Whatever the category, keep the original files when possible instead of relying only on compressed screenshots shared through another platform. Note the warehouse arrival date and connect each photo request to the correct order number. If you later need to explain a mismatch, a clear sequence—order option, arrival evidence, targeted photo, and decision—is more persuasive and easier to review than an unlabelled folder of similar thumbnails.",
        ],
      },
      {
        id: "decision",
        title: "Make the decision before parcel submission",
        paragraphs: [
          "If a mismatch appears, first confirm that it is not caused by an overlooked option or an ambiguous seller description. Then document the discrepancy and ask what return, exchange, or further-inspection choices are currently available. Seller cooperation, domestic return shipping, service fees, and deadlines can vary, so act promptly rather than assuming a universal policy.",
          "Balance the seriousness of the issue against the item value, correction cost, and uncertainty. A minor cosmetic issue might be acceptable to one buyer and decisive to another. The warehouse provides evidence and services; the acceptance threshold remains yours.",
          "Set that threshold before you become attached to the purchase. Decide which mistakes are automatic returns—such as the wrong size, missing piece, or material visible damage—and which imperfections you would accept at a particular price. Predefined criteria reduce the temptation to rationalise a serious discrepancy simply because the item has already taken time to arrive. They also help you write a clear service request, since you can explain what evidence would change the decision and what outcome you want if the problem is confirmed.",
          "Finally, record the outcome. Keep the photos or measurements that supported your decision and note whether the item will be returned, exchanged, held, or included in a parcel. That simple audit trail is useful when you consolidate several purchases and need to remember which items were cleared for shipping.",
        ],
      },
    ],
  },
  {
    slug: "superbuy-shipping-cost-guide",
    topic: "Shipping",
    title: "Superbuy shipping costs: plan the parcel before you pay",
    deck: "Understand two-stage costs, chargeable weight, packaging, consolidation, route trade-offs, and the limits of early estimates.",
    date: "2026-08-14",
    updated: "14 August 2026",
    readingTime: "9 min read",
    sections: [
      {
        id: "two-stages",
        title: "Why shopping and shipping are separate payments",
        paragraphs: [
          "A warehouse-agent purchase normally has two financial stages. First, you pay for the item and any seller-to-warehouse domestic delivery, along with optional services that apply at the purchasing or inspection stage. Later, after one or more items arrive and you choose a parcel, you pay for international shipping and related parcel services.",
          "That sequence explains why a spreadsheet price cannot represent the final delivered cost. Even an accurate item price says nothing about the packed dimensions, eligible lines, destination, insurance choices, local taxes, or customs handling. Treat an approximate USD item figure as a discovery aid, not as a landed-cost quote.",
          "Superbuy currently advertises free standard purchasing service for mainstream platforms such as Taobao, Tmall, JD, and 1688, but product, seller, payment, optional-service, and route conditions still vary. Read the live order and parcel screens before committing funds.",
        ],
      },
      {
        id: "weight",
        title: "Chargeable weight can be larger than scale weight",
        paragraphs: [
          "International carriers commonly compare actual weight with volumetric weight and charge using the larger value. Volumetric calculations assign weight to the space a parcel occupies. A dense small parcel may be billed by scale weight; a light puffer jacket or large shoebox may be billed by volume.",
          "The formula divisor, unit conversion, minimum charge, and rounding method vary by route. That is why a single web formula cannot predict every quote. Early estimates are still useful for deciding whether an item is likely to be economical, but the warehouse parcel’s measured dimensions and the live route calculator are better evidence.",
          "Packaging decisions therefore affect both protection and price. Removing a retail box can reduce volume, while retaining it may protect a structured product or preserve something you value. Vacuum packing can reduce soft-goods volume but may not suit every material. Ask what each service changes and avoid assuming the smallest parcel is automatically the safest.",
        ],
      },
      {
        id: "consolidation",
        title: "Use consolidation deliberately",
        paragraphs: [
          "Consolidation lets eligible items from different purchases share an international parcel. This can reduce repeated base charges and unnecessary outer packaging. It also gives you time to choose combinations based on weight, dimensions, restrictions, value, and urgency.",
          "A larger consolidated parcel is not always cheaper or safer. It can cross a route limit, produce a higher volumetric tier, concentrate value in one shipment, or combine sensitive and ordinary goods in a way that reduces eligible lines. Compare one large parcel with two purposeful parcels rather than assuming maximum consolidation is optimal.",
          "Superbuy advertises 90 days of free storage. Use that period as planning flexibility, but track the first arrival date and current storage rules. Seller return windows may be much shorter than warehouse storage, so do not postpone QC decisions merely because the item can remain stored.",
        ],
        bullets: [
          "Group items with compatible restrictions and similar urgency.",
          "Compare one-parcel and split-parcel estimates.",
          "Check value and weight limits for each eligible line.",
          "Resolve QC issues before storage time obscures seller deadlines.",
          "Record which packaging should be removed or retained.",
        ],
      },
      {
        id: "route",
        title: "Choose a route by trade-offs, not a slogan",
        paragraphs: [
          "Superbuy advertises more than 100 shipping lines, but the number available to your parcel will be smaller. Destination, packed data, item category, batteries, liquids, magnets, brand restrictions, declared value, and temporary route rules can filter the list. The correct comparison is between the live eligible options for the actual parcel.",
          "Compare estimated transit time, tracking depth, compensation limits, insurance terms, prohibited-item rules, volumetric treatment, customs model, handoff partners, and total quoted cost. Fast estimates are not delivery guarantees; seasonal volume, flight capacity, customs, weather, and local carrier performance can add delay.",
          "The cheapest line may be appropriate for a low-value, non-urgent parcel, while stronger tracking or cover may matter more for another shipment. Read exclusions carefully. Insurance or compensation can have evidence requirements, filing deadlines, and maximum amounts that do not match the full subjective value of the contents.",
        ],
      },
      {
        id: "customs",
        title: "Treat declarations and customs as destination-specific",
        paragraphs: [
          "Import rules belong to the destination country or region, not to a universal spreadsheet formula. Product category, value, origin, intended use, and local thresholds can affect taxes, duties, documentation, or admissibility. Check current official customs guidance for your destination and use accurate product descriptions. Advice copied from a different country—or from a post written before a rule change—may not apply to your parcel.",
          "A tax-inclusive or duty-handled shipping label should be read according to the live route terms. It does not automatically remove every possible charge, inspection, restriction, or documentation requirement. Likewise, a low declared value is not a harmless shipping discount. Inaccurate declarations can affect customs treatment, compensation, and claims, and may violate applicable rules. Use truthful information and understand who is responsible for each declaration field.",
          "Restricted and sensitive items deserve an eligibility check before purchase. Batteries, liquids, powders, magnets, food, cosmetics, medical products, and some branded goods can have limited routes or additional controls. A line that accepts ordinary clothing may not accept every item in a consolidated parcel. If one product reduces the available choices, compare shipping it separately with changing the order plan.",
          "Keep commercial invoices, order records, payment evidence, product descriptions, parcel details, and tracking information until delivery is complete. If customs or a carrier asks a legitimate question, consistent records make the response easier. Do not send sensitive documents to an unverified contact; use the official carrier, agent, or customs channel shown in your account or tracking record.",
          "After dispatch, read tracking events as milestones rather than precise promises. Export processing, airline handoff, import clearance, and final-mile delivery can each create quiet periods. A lack of a new scan does not by itself prove loss, while a generic estimated-delivery date does not override a customs hold. Follow the route’s stated inquiry window and preserve screenshots of material updates before opening a trace or compensation request.",
        ],
      },
      {
        id: "landed",
        title: "Build a conservative landed-cost estimate",
        paragraphs: [
          "Before buying, create a low, expected, and high scenario. Include the product, domestic delivery, expected services, a realistic share of international freight, and a buffer for exchange-rate movement. Then research your own destination’s import thresholds, tax rules, duties, brokerage, and handling practices from official local sources. Do not rely on another shopper’s country or an old social post.",
          "Currency conversion deserves its own buffer. The rate shown on a spreadsheet, payment screen, card statement, and refund can differ because they occur at different times and may include provider fees. A cancelled item or shipping refund may therefore return a slightly different amount in your home currency even when the original currency amount is unchanged. Compare scenarios in one currency, record the rate assumption, and avoid spending right up to a hard budget limit that leaves no room for movement or a route change.",
          "At the parcel stage, replace guesses with measured information. Confirm the selected packaging, chargeable weight, current line quote, declared contents, and insurance choice. Keep the order and parcel records until delivery and any claim window have passed.",
          "The goal is not to predict every cent. It is to avoid a decision that only works if shipping is unusually cheap and no local charge applies. If the high scenario makes the purchase unreasonable, reconsider the item or parcel plan before the irreversible steps.",
        ],
      },
    ],
  },
  {
    slug: "superbuy-review-2026",
    topic: "Independent review",
    title: "Superbuy review 2026: what the platform offers and users actually report",
    deck: "A source-aware review of Superbuy's shopping-agent workflow, fees, QC photos, storage, shipping, support, and the recurring strengths and complaints found in independent user feedback.",
    date: "2026-08-14",
    updated: "14 August 2026",
    readingTime: "10 min read",
    sections: [
      {
        id: "method",
        title: "How this Superbuy review was researched",
        paragraphs: [
          "A useful Superbuy review should not turn one successful parcel or one angry comment into a universal verdict. For this article, platform facts were checked against Superbuy's official homepage, fee structure, user guide, forwarding guide, help centre, and terms on 14 August 2026. User-experience themes were then compared across Trustpilot, Google Play, Apple's App Store, and the Superbuy community on Reddit. Those sources answer different questions and none represents every customer.",
          "The Trustpilot profile showed just over one thousand reviews and a score in the mid-four-star range on the day checked. Trustpilot also labels the profile as one where the company invites customers to review, which matters when interpreting the sample. App-store reviews are attached to the mobile product rather than the full website journey. Reddit is useful for detailed parcel questions and problem reports, but active communities can over-represent new users, unusually good outcomes, and unusually difficult cases.",
          "Accordingly, this review separates three layers. ‘Official fact’ means Superbuy currently states a service or rule. ‘User theme’ means a point appeared repeatedly across independent feedback, not that it will happen to everyone. ‘Editorial advice’ is our practical recommendation for reducing uncertainty. Prices, routes, customs notices, seller remedies, and app ratings can change, so a dated review should help you ask better questions rather than pretend to freeze the service in time.",
        ],
      },
      {
        id: "service",
        title: "What Superbuy officially provides",
        paragraphs: [
          "Superbuy is a China shopping-agent and parcel-forwarding platform. In the shopping-agent workflow, a buyer submits a product from a Chinese marketplace, pays the item and Chinese domestic delivery, and Superbuy purchases it from the seller. The item is delivered to a Superbuy warehouse, where it is recorded, inspected within the stated service limits, photographed, and stored. The buyer later selects stored items, chooses packaging and an eligible international route, pays a shipping deposit, and tracks the parcel after dispatch.",
          "The current official material advertises three standard QC photographs and 90 days of free warehouse storage. It also describes consolidation, optional package removal and reinforcement, insurance where offered, and more than 100 shipping lines across the wider network. These are platform-wide capabilities, not a promise that every line or service appears for every item. Destination, parcel dimensions, batteries, liquids, magnets, product category, current policy, and other restrictions can narrow the live list.",
          "Superbuy's fee page currently describes standard purchasing service for mainstream platforms such as Taobao, Tmall, JD.com, and 1688 as free of a percentage service fee. That headline does not remove the product price, domestic courier charge, optional services, payment or exchange costs, international shipping, or destination charges. Other sources—including certain second-hand and unlisted platforms—and specialist Shipping Expert work have their own fee rules. A fair review therefore compares the complete journey, not a single ‘zero fee’ label.",
        ],
      },
      {
        id: "positive-themes",
        title: "What positive reviews mention most often",
        paragraphs: [
          "Across Trustpilot and the app stores, the most common positive themes are responsive customer service, a manageable ordering interface after the initial learning period, useful warehouse photographs, consolidation, and careful parcel packing. Many reviewers describe the agent as making Chinese marketplace purchases accessible when direct international checkout or forwarding would otherwise be difficult. These reports align with the core function Superbuy advertises: purchasing, warehousing, visual evidence, packing, and international handoff.",
          "Packaging receives particular attention in user feedback. Positive reviewers frequently describe items arriving securely packed, and some App Store comments mention staff care with fragile goods. That is encouraging, but it is not a reason to ignore packaging choices. A sturdy parcel for one product may be unsuitable for another, and protection can increase chargeable weight. Buyers should still identify fragile areas, decide whether retail boxes matter, and compare optional reinforcement with the value and replaceability of the contents.",
          "Support is another recurring strength, especially when buyers have questions about seller communication, stored items, or parcel choices. Google Play feedback also notes that the mobile app broadly mirrors the desktop account, which can be convenient for tracking. At the same time, some users mention a learning curve or language clarity issues. The useful conclusion is not that support is always instant; it is that a concise request with an order number, exact discrepancy, and desired evidence gives any service team a better chance of resolving the issue efficiently.",
        ],
      },
      {
        id: "concerns",
        title: "Recurring complaints and where expectations break",
        paragraphs: [
          "Shipping cost is the most predictable source of disappointment. A product can look inexpensive while the final parcel is affected by domestic delivery, packaging, actual or volumetric weight, route rounding, surcharges, insurance, and destination charges. App-store and community posts regularly ask why freight is higher than expected or why only a small number of lines are available. That does not establish that a quote is wrong; it shows why estimating the packed parcel before treating an item as ‘cheap’ is essential.",
          "Users also report frustration when tracking is quiet, a preferred route disappears, or a restricted item narrows the options. Superbuy's own guidance says international transport is performed by third-party logistics providers and is exposed to customs and uncontrollable risks. Route names, capacity, and policy can change. A review written around one person's transit time should therefore not promise that another parcel will be equally fast. Compare the current eligible lines and save the selected terms when you submit.",
          "Quality control produces mixed expectations. Many users value the photos; some negative reviews say a defect was missed or that the remedy felt limited. Both can be true because standard photographs document visible condition without proving every hidden property. Superbuy's terms also describe limits for items that cannot be opened or professionally tested. Buyers who need a particular measurement or close-up should request that evidence before international shipping instead of assuming a general warehouse inspection answers a product-specific question.",
        ],
      },
      {
        id: "cost",
        title: "Is Superbuy expensive? Use a complete comparison",
        paragraphs: [
          "There is no useful yes-or-no answer without the product, source, destination, packaging, and parcel. The cost has at least two stages: purchase to warehouse, then warehouse to destination. Superbuy says the first international payment is a deposit based on estimated weight, selected method, and destination; the final fee is calculated after parcel size and weight are verified, with a difference returned to the Superbuy account after shipment. A deposit and settled charge can therefore differ legitimately.",
          "For a pre-purchase comparison, include the product, Chinese domestic delivery, any source-specific fee, optional photos or services, expected international freight, payment or exchange costs, and a buffer for local tax, duty, brokerage, or handling. Then test low, expected, and high parcel scenarios. A decision that only works if a bulky item avoids volumetric billing and the cheapest route remains available is not a robust bargain.",
          "Consolidation can reduce repeated base charges, but a larger parcel is not automatically better. It can cross a line limit, concentrate value, or combine ordinary goods with a battery, magnet, liquid, fragile item, or oversize box that removes cheaper options. Superbuy's 90-day free storage window creates planning flexibility, but seller return periods may be shorter. Inspect each arrival promptly and group parcels deliberately by restriction, urgency, fragility, and value.",
        ],
      },
      {
        id: "safety",
        title: "Is Superbuy safe or legit? Ask a narrower question",
        paragraphs: [
          "A review score cannot guarantee the safety of a future order, and ‘legit’ is too broad to answer every risk. The evidence reviewed shows an established service with official terms, public support channels, longstanding app listings, and a substantial volume of independent customer feedback. That supports the conclusion that Superbuy operates the shopping-agent and forwarding workflow it describes. It does not guarantee a seller's product, customs clearance, a fixed delivery date, or reimbursement outside the applicable terms.",
          "Separate the parties involved. The marketplace seller controls the product listing and domestic fulfilment. Superbuy performs the selected purchasing, warehouse, inspection, and parcel services. Third-party carriers transport the international parcel. Customs and destination authorities apply local rules. A positive experience with one party does not remove the risks controlled by another. Preserve evidence at each handoff: listing and variant, payment, warehouse images, measurements, packing choices, declared contents, route terms, and tracking.",
          "For valuable or irreplaceable items, read insurance and compensation details before submitting the parcel. Coverage can depend on the insured value, event, exclusions, evidence, deadlines, and third-party findings. Use truthful declarations and check prohibited-item rules. No agent review should encourage a buyer to treat insurance as unconditional or to copy another person's declaration strategy from a different country.",
        ],
      },
      {
        id: "verdict",
        title: "Who Superbuy is best suited to—and our verdict",
        paragraphs: [
          "Superbuy is best suited to buyers who want help purchasing from Chinese marketplaces, value warehouse photographs and consolidation, and are willing to make a separate parcel decision after items arrive. It is less suitable for someone expecting the product-card price to be a delivered total, guaranteed authenticity, professional testing of hidden qualities, a permanent cheapest route, or a fixed customs outcome. The workflow rewards buyers who keep records and ask specific questions.",
          "Our evidence-based verdict is that Superbuy offers a mature and useful agent workflow, while the main risks remain cost uncertainty, seller quality, inspection limits, route eligibility, third-party transport, and destination customs. Independent reviews lean positive overall and repeatedly praise support, packaging, and convenience, but complaints about freight, tracking, route choice, and missed QC details are material enough to plan around. That balanced picture is more useful than a single star score.",
          "Before ordering, verify the live listing and exact variant, estimate the complete journey, and save the seller evidence. At the warehouse, compare the three standard photos with the order and request one targeted measurement or close-up if needed. Before shipping, compare only eligible lines using packed data, read cover and customs terms, and keep the records until delivery. If you follow that sequence, user reviews become context for better decisions—not a substitute for your own evidence.",
        ],
        bullets: [
          "Good fit: buyers who need purchasing assistance, warehouse evidence, storage, consolidation, and international route choices.",
          "Poor fit: buyers expecting a final delivered price at product-card stage or a guarantee about seller quality, authenticity, customs, or transit time.",
          "Best risk control: preserve evidence, review QC promptly, estimate packed weight, choose an eligible route deliberately, and read current terms.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
