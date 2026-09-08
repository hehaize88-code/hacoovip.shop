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
    slug: "superbuy-shipping-to-usa",
    topic: "USA parcel planning",
    title: "Superbuy Shipping to USA: Cost & Customs",
    deck: "A 2026 planning guide for estimating a Superbuy parcel to the United States without inventing a fixed rate: measure chargeable weight, compare eligible lines, and prepare accurate customs evidence.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "10 min read",
    sections: [
      {
        id: "budget",
        title: "Start with a USA shipping budget, not a product-price guess",
        paragraphs: [
          "A useful Superbuy shipping-to-USA estimate begins after you separate the purchase from the parcel. Superbuy's current fee structure describes two main stages. The shopping stage covers the product, seller-to-warehouse delivery, any source-specific purchasing charge, and optional services selected around the order. The international stage begins after stored items are submitted as a parcel. That later bill depends on the final package, selected line, and destination. A spreadsheet price can help you shortlist an item, but it cannot answer the American shipping question by itself.",
          "Build a working budget with distinct rows for the item, China domestic delivery, confirmed optional services, payment or currency costs, international freight, and a United States import buffer. Do not label an unknown field as zero. If a seller has not published the packed weight, write “unknown before warehouse.” If a route has not been selected, write “live quote required.” This makes uncertainty visible instead of hiding it inside one optimistic total.",
          "The goal is not a perfect forecast before purchase. It is a decision that remains sensible when the parcel is heavier, larger, or more restricted than expected. If the order only works when international shipping is unusually cheap, treat that as a warning. A conservative estimate protects the buying decision; the live Superbuy parcel screen still determines which routes and charges are actually available.",
        ],
      },
      {
        id: "chargeable-weight",
        title: "Model actual, volumetric, and chargeable weight",
        paragraphs: [
          "Actual weight is the scale reading. Volumetric weight converts the space occupied by a box into a billing weight. A carrier may compare both and use the larger figure, often called chargeable or billable weight. This is why a dense parcel of hardware and a light parcel containing shoeboxes can produce very different cost patterns even when their scale readings look similar.",
          "For a planning calculation in centimetres and kilograms, multiply packed length by width by height, then divide by the divisor stated for the route. A 45 × 35 × 25 cm sample box divided by 6,000 produces 6.56 kg of volumetric weight. If the same parcel weighs 2.40 kg on a scale, 6.56 kg is the planning weight before route-specific rounding. The example does not establish Superbuy's final charge because the divisor, weight increments, minimum charge, and oversize rules can differ by eligible line.",
          "Use the calculator on this site's shipping page to test a box, then repeat the calculation with a compact-pack scenario. The difference shows how much of the risk comes from size rather than mass. Replace the example divisor with the value shown by the current line. Once the warehouse has packed the parcel, replace estimates with its measured dimensions and weight. Those figures are more useful than a seller's product-only measurement because international shipping includes the outer package and protection.",
        ],
        bullets: [
          "Record scale weight and all three packed dimensions in one unit system.",
          "Use the divisor and rounding rules displayed for the eligible line.",
          "Calculate both actual and volumetric weight; plan around the larger result.",
          "Recalculate after package removal, folding, compression, or reinforcement.",
          "Treat the result as a comparison input, not a final freight quote.",
        ],
      },
      {
        id: "scenarios",
        title: "Compare three parcel scenarios before choosing a line",
        paragraphs: [
          "One estimate encourages false precision. Create three. The compact scenario removes expendable retail packaging from suitable items and groups compatible soft goods. The protected scenario keeps the boxes or reinforcement needed for shape, breakage risk, storage, or personal value. The split scenario separates an item that is fragile, oversized, urgent, or subject to different route restrictions. Compare the live quotes for all three when the account provides enough parcel data.",
          "A large consolidated parcel can reduce repeated starting charges, but maximum consolidation is not automatically cheapest. One bulky box may cross a dimension limit, increase volumetric weight, concentrate too much value, or leave fewer eligible lines. Superbuy's current fee page says multiple warehouse items can be consolidated into one parcel without a consolidation charge, yet the international result still depends on the final package and line. Free consolidation is therefore an option, not a command to combine everything.",
          "Use warehouse time deliberately. Superbuy currently states that items receive 90 days of free storage after arrival. That window can help several purchases reach the warehouse before parcel submission, but it should not delay inspection. Seller return opportunities and warehouse storage are different clocks. Review each arrival, resolve visible mismatches, and record the oldest storage date before waiting for the next item.",
        ],
      },
      {
        id: "packaging",
        title: "Turn warehouse evidence into better calculator inputs",
        paragraphs: [
          "The best time to improve a Superbuy shipping-cost estimate is after warehouse intake and before international submission. Match every stored item to the order, review its QC photos, and identify packaging that is either necessary or expendable. A shoe box may protect structure or hold personal value, while an ordinary outer seller carton may only add empty space. A soft jacket may tolerate compression; a structured bag or delicate print may not. Cost reduction should never be detached from the contents' physical needs.",
          "Write a short parcel instruction rather than a vague request to make shipping cheap. List the items to combine, boxes to keep or remove, pieces that must stay together, fragile areas, and acceptable protection. If a change could affect a return or product value, make that decision before approving it. Save the final instruction and the resulting parcel measurements so a later difference can be explained.",
          "When an input is uncertain enough to change the route or budget, obtain better evidence. A packed-parcel or rehearsal-style service, when currently offered for the account and item, may reduce uncertainty. Do not assume that every option appears for every shipment. The useful output is not merely a smaller number; it is a documented relationship between contents, packing choice, dimensions, chargeable weight, and the lines that remain eligible for a United States address.",
        ],
      },
      {
        id: "route",
        title: "Compare eligible USA lines without chasing a universal winner",
        paragraphs: [
          "There is no stable answer to “the best Superbuy shipping line to USA.” The useful comparison is the list generated for the current parcel. Destination, item category, batteries, liquids, magnets, brands, declared contents, value, dimensions, and temporary capacity can alter eligibility. A route mentioned in an older review may be unavailable, renamed, repriced, or unsuitable for your contents when you are ready to submit.",
          "Start with eligibility, then compare total quoted cost, chargeable-weight method, estimated transit range, tracking depth, carrier handoffs, size limits, prohibited-item rules, compensation or insurance terms, and customs model. Read what the estimate includes. A low headline fee is not stronger evidence than the complete live breakdown. Likewise, an estimated delivery range is not a guarantee; export handling, flights, customs, weather, and the American final-mile carrier can create additional time.",
          "Match the line to the consequences of failure. A low-value, non-urgent parcel may justify a different balance from a fragile or difficult-to-replace shipment. Stronger tracking can matter more than a small price difference when several carriers will handle the package. Insurance or compensation should be judged by covered events, exclusions, evidence requirements, filing deadlines, and maximum amounts—not by the label alone. Save the chosen terms at submission because a later page update may not describe the exact version you purchased.",
        ],
      },
      {
        id: "customs",
        title: "Prepare a current United States customs record",
        paragraphs: [
          "Buying goods online from abroad makes the American recipient part of an import process. U.S. Customs and Border Protection advises internet buyers to understand admissibility, duty, paperwork, and carrier or broker charges. Rules for low-value e-commerce shipments changed materially before this article's 8 September 2026 fact check, so an old social post about a blanket duty-free threshold is not a safe budget assumption. Check current CBP guidance when the parcel is submitted and again if the carrier requests information.",
          "Use an accurate product description, quantity, value, and intended use. Preserve the seller listing, order confirmation, payment evidence, warehouse item record, parcel contents, declaration, shipping invoice, and tracking. The details should agree across documents. Calling commercial goods a gift or understating value can create compliance, delay, and claim problems. This guide cannot determine a tariff classification or duty amount for a specific shipment; product composition, origin, value, and applicable rules matter.",
          "Screen the contents before purchase, not only after packing. Food, plants, animal products, medicines, cosmetics, batteries, liquids, powders, magnets, weapons, and protected cultural or wildlife materials can face agency rules or transport limits beyond ordinary clothing. A route being displayed does not itself prove that every U.S. import requirement has been satisfied. When admissibility is uncertain, use the current official U.S. agency guidance for that product category or seek qualified advice.",
          "Treat a customs or carrier request as an evidence task. Confirm that the message came through a legitimate account, carrier, broker, or government channel before sending personal records. Respond with the exact document requested and keep a copy of the exchange. A consistent file can shorten clarification and supports a later trace or claim, while conflicting descriptions and missing value evidence make resolution harder.",
        ],
      },
      {
        id: "submit",
        title: "Run a final pre-submission check for the USA parcel",
        paragraphs: [
          "Before payment, compare the selected contents with the warehouse decision record. Confirm that every item meant to ship is present, every unresolved QC issue is excluded, and the packaging instruction matches the measured parcel. Recalculate chargeable weight with the displayed route formula. Then compare the live eligible options rather than relying on the line you expected before the items arrived.",
          "Read the final quote as a set of conditions: destination, contents, actual and volumetric inputs, weight increments, route, estimated range, included services, optional cover, declared information, and possible later adjustment. Superbuy's current guidance says the international payment is reconciled against the logistics provider's final bill, with an overpayment refunded or an underpayment collected. Keep enough budget available for that reconciliation instead of treating the first payment as mathematically final.",
          "After dispatch, record the parcel number, route, handoff carriers, declared contents, amount paid, and first acceptance scan. Interpret tracking as milestones rather than a minute-by-minute location. A quiet period does not alone prove loss, and an estimated date does not override a customs hold. If an inquiry becomes necessary, use the stated service window and submit a chronology supported by the saved parcel and tracking evidence.",
        ],
        bullets: [
          "All stored items have a recorded ship, hold, return, or exclude decision.",
          "Packed weight and dimensions match the scenario being purchased.",
          "The line is eligible for the complete contents and U.S. destination.",
          "Description, quantity, and value are accurate and consistent.",
          "Tracking, insurance, adjustment, and claim terms are saved.",
          "A buffer remains for duty, carrier fees, or final freight reconciliation.",
        ],
      },
    ],
  },
  {
    slug: "superbuy-shipping-to-netherlands",
    topic: "Netherlands parcel planning",
    title: "Superbuy Shipping to the Netherlands: Cost & VAT",
    deck: "A Netherlands-specific 2026 guide to estimating a Superbuy parcel using packed weight, live eligible lines, controlled consolidation, accurate import records, and the latest Dutch customs treatment for e-commerce shipments.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "11 min read",
    sections: [
      {
        id: "nl-cost-model",
        title: "Separate product cost from Netherlands delivery cost",
        paragraphs: [
          "A Superbuy shipping-to-Netherlands estimate should begin as a layered budget. Superbuy's current fee structure separates the purchasing stage from international shipping. The first can contain product cost, delivery from the Chinese seller to the warehouse, relevant purchasing charges, and chosen optional services. The international stage is generated later from the final parcel, selected line, and destination.",
          "Create separate rows for the item, China domestic delivery, selected warehouse services, international freight, payment or currency costs, Netherlands import VAT, customs duty, and possible carrier clearance or handling charges. Do not label an unknown amount as zero. A live quote is needed when the route or parcel measurement has not been confirmed.",
          "‘Superbuy shipping cost Netherlands’ is therefore a search topic, not one fixed price. Superbuy recommends using its shipping calculator with current parcel data. The calculator supports the Netherlands as a destination and asks for weight, dimensions, and item category. Use it to compare scenarios, then replace planning inputs with the packed warehouse measurements before submission.",
        ],
      },
      {
        id: "nl-weight",
        title: "Use route-specific chargeable weight",
        paragraphs: [
          "Scale weight and shipping weight are not always identical. Volumetric weight represents the space occupied by the parcel, and a carrier may charge according to the larger of actual and volumetric weight. Bulky retail boxes, large outer cartons, and generous empty space can therefore increase a Netherlands quote even when the products are light.",
          "A planning calculation multiplies the packed length, width, and height and divides the result by the divisor shown for the line. Superbuy's public calculator explains 6,000 as a common air-cargo example, but each live option may apply its own formula, increments, limits, and rounding. Never copy a divisor from another country guide or an old parcel review without checking the current line.",
          "Use outer dimensions after the final packing choice. Test the protected parcel first, then a compact alternative. If removing expendable packaging materially lowers volumetric weight while keeping the contents adequately protected, compare the updated live quotes. If the parcel remains close to a line limit, leave a measurement buffer instead of assuming every warehouse or carrier measurement will be identical.",
        ],
        bullets: [
          "Record actual weight in kilograms",
          "Record length, width, and height of the outer package",
          "Use the live line's divisor and rounding method",
          "Compare actual and volumetric results",
          "Recalculate after consolidation, removal, compression, or reinforcement",
        ],
      },
      {
        id: "nl-consolidation",
        title: "Control parcel size before choosing a route",
        paragraphs: [
          "Superbuy currently states that multiple stored items can be consolidated into one parcel without a consolidation charge. Combining compatible purchases may remove duplicate seller cartons and reduce repeated initial-weight charges. It can also produce a larger box, increase volumetric weight, cross a dimension limit, or reduce the number of eligible lines.",
          "Sort items by physical needs. Flexible textiles may tolerate folding or compression. Structured shoes, delicate accessories, glass, electronics, or presentation packaging may need space and reinforcement. Record which boxes can be removed, which pieces must stay together, and which surfaces require protection. A short, item-specific instruction is safer than a broad request for the smallest parcel.",
          "Compare consolidation with one or more split scenarios. In the Netherlands, the customs treatment of an e-commerce consignment also makes its contents and product categories relevant. Splitting should have a genuine packing, eligibility, risk, or delivery reason—not an inaccurate valuation purpose. Preserve the relationship between each parcel, its contents, measurements, and declaration.",
        ],
      },
      {
        id: "nl-live-lines",
        title: "Let destination and contents determine eligibility",
        paragraphs: [
          "There is no universal best Superbuy shipping line to the Netherlands. Use the current list generated for the complete parcel and Dutch address. Item categories, batteries, liquids, powders, magnets, dimensions, value, and carrier capacity can affect what appears. A route name or experience from an older post may not describe the option available on 8 September 2026.",
          "Compare the total displayed freight, chargeable-weight rule, first and additional units, estimated transit range, tracking depth, handoffs, limits, exclusions, compensation terms, and customs arrangement. Estimated transit is not a delivery guarantee. Export processing, available transport, EU entry procedures, Dutch customs selection, and the local carrier can change the timeline.",
          "A line appearing in the interface does not certify that every product is lawful to import. Superbuy lists prohibited and restricted transport categories, while Dutch Customs separately applies product, safety, intellectual-property, tax, and import rules. Screen uncertain goods before purchase. Route eligibility and customs admissibility answer different questions.",
        ],
      },
      {
        id: "nl-vat-duty",
        title: "Budget for the Netherlands rules effective in 2026",
        paragraphs: [
          "Dutch Customs says online purchases from outside the European Union can involve VAT, shipping costs, clearance charges, and customs duty. Its consumer guidance states that purchases over €150 are subject to VAT and customs duty, with the duty amount depending on the product. Import VAT also applies to goods arriving from outside the EU. The way VAT is collected or displayed can depend on the transaction and declaration arrangement, so preserve any checkout or parcel tax evidence.",
          "A major change took effect on 1 July 2026. Dutch Customs states that the declarant pays a temporary €3 customs duty for e-commerce consignments with an intrinsic value up to and including €150. The duty applies per product type, or per declaration line in the relevant business declaration systems, from 1 July 2026 until 1 July 2028. One parcel containing different product types can therefore create more than one €3 declaration-line charge.",
          "Do not automatically multiply the number of physical pieces by €3. The official examples distinguish product types: several identical products can form one type, while different categories can create separate lines. The declarant is the party legally addressed by the rule; how the charge reaches or is presented to the recipient can depend on the seller, platform, logistics provider, customs representative, and declaration method. Use the final transaction and carrier documentation instead of inventing a consumer-facing total.",
          "Dutch Customs also says a separate European handling fee is expected from 1 November 2026 for e-commerce imports both up to and above €150. As of this article's 8 September fact check, the amount had not been announced. Do not enter a made-up number in a September budget. If submitting after the expected start date, recheck Dutch Customs and the live parcel terms before paying.",
        ],
      },
      {
        id: "nl-declaration",
        title: "Describe every product accurately",
        paragraphs: [
          "Use a specific, truthful description for each product type. ‘Cotton T-shirt,’ ‘synthetic backpack,’ or another fact-supported description is more useful than ‘gift,’ ‘sample,’ ‘accessory,’ or ‘personal item.’ Record quantity, paid value, material when known, and intended personal or commercial use. Do not guess composition or origin when the listing does not establish it.",
          "Keep the value consistent with the order and payment evidence. International freight, insurance, and other components can matter to VAT or customs calculations even when a threshold refers to intrinsic goods value. This guide cannot assign the correct commodity code, import rate, or taxable basis for a particular parcel. Use current Dutch or EU tariff information, or qualified advice, when classification materially affects the result.",
          "Do not mark a commercial purchase as a gift or lower the value to target a threshold. Inaccurate declarations can create delays, reassessment, enforcement, and claim problems. Dutch Customs also warns that certain products cannot be imported and that counterfeit goods may be seized. A warehouse photograph or displayed transport line does not remove those legal restrictions.",
        ],
      },
      {
        id: "nl-delivery-record",
        title: "Prepare for customs and local delivery handoffs",
        paragraphs: [
          "Save the live listing, selected option, order confirmation, payment record, warehouse page, QC photos, parcel contents, packing instruction, declaration, freight payment, and tracking. Product names, quantities, and values should agree. A consistent file is useful if a customs representative or delivery company asks for an invoice, payment evidence, or clarification.",
          "Dutch Customs explains that parcels are handled by the delivery company, such as the named local courier, rather than sitting at a customer-facing Customs parcel desk. Contact the carrier when tracking or payment information is unclear. Verify messages through the carrier's official site or account before following links, uploading identity documents, or paying an unexpected charge.",
          "Track the parcel as milestones: export acceptance, international departure, EU arrival, declaration, customs release, carrier handoff, and local delivery. A scan can describe an electronic declaration before the parcel reaches that physical point. Save the first and last verified scans and use a dated chronology if an investigation becomes necessary.",
        ],
      },
      {
        id: "nl-submit",
        title: "Run the Netherlands pre-submission checklist",
        paragraphs: [
          "Before payment, compare the selected contents with the warehouse record. Resolve visible QC problems, confirm the final packaging instruction, and recalculate chargeable weight from the packed measurements. Then compare only the routes currently eligible for the entire parcel and Dutch postcode.",
          "Read the quote as a group of conditions: contents, measurements, divisor, weight increments, route, transit estimate, tracking, cover, declared information, and possible final adjustment. Superbuy says its international shipping deposit uses estimated weight, method, and destination, while the logistics provider's verified size and weight determine the final fee. Keep a budget buffer for reconciliation and destination-side charges.",
          "After dispatch, retain the parcel number, route terms, declaration record, amount paid, and carrier handoffs. If the parcel is submitted after a tax or fee change, use the official rule effective on the shipment or import date rather than the publication date of this guide.",
        ],
        bullets: [
          "All items have a ship, hold, return, or exclude decision",
          "Final packed dimensions match the quoted scenario",
          "The route accepts every item and the Netherlands destination",
          "Each product type has a truthful description, quantity, and value",
          "VAT, €3-duty, carrier, and freight-adjustment evidence is retained",
          "The expected November handling-fee position is rechecked when relevant",
        ],
      },
    ],
  },
  {
    slug: "superbuy-shipping-to-uk",
    topic: "UK parcel planning",
    title: "Superbuy Shipping to UK: Cost, VAT & Customs",
    deck: "A current UK-focused guide to estimating Superbuy shipping without relying on a fixed price: calculate chargeable weight, compare the live eligible lines, plan packaging, and keep the evidence needed for VAT and customs.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "10 min read",
    sections: [
      {
        id: "uk-budget",
        title: "Build the UK parcel budget in separate layers",
        paragraphs: [
          "A realistic Superbuy shipping-to-UK budget starts by separating the purchase from the international parcel. Superbuy's current fee structure treats them as different stages. The first can include the product price, delivery from the Chinese seller to the warehouse, source-specific purchasing charges, and optional services. International shipping is calculated later from the final parcel, destination, and selected line. A product-page price is therefore not a delivered UK price.",
          "Use separate budget rows for the item, China domestic delivery, confirmed optional services, payment or currency costs, international freight, and possible UK import charges. Mark uncertain fields as unknown rather than zero. If the item has not reached the warehouse, its final packed dimensions are unknown. If no route has been selected, write ‘live UK quote required.’ This prevents an early estimate from looking more precise than the available evidence.",
          "The phrase ‘Superbuy shipping cost UK’ does not describe one permanent tariff. The cost can change with contents, packed size, chargeable weight, line availability, operational components, and the UK delivery address. Superbuy recommends using its current shipping calculator for the most accurate available preview. Treat that preview as dated planning information, then save the final parcel breakdown when submitting.",
        ],
      },
      {
        id: "uk-chargeable-weight",
        title: "Calculate weight after packing, not from the product alone",
        paragraphs: [
          "Actual weight is the warehouse scale reading. Volumetric weight converts the space used by the carton into a billing weight. A line may compare the two and charge according to the larger result, subject to its own divisor, minimum unit, rounding, and oversize rules. This is why a light but bulky parcel may cost more than a smaller parcel with the same scale weight.",
          "For planning, multiply the packed length, width, and height in centimetres, then divide by the divisor displayed for the eligible route. Superbuy's public calculator explains 6,000 as a common air-cargo example, but that example must not be treated as the formula for every UK line. Copy the divisor and charging increments from the live option being considered.",
          "Measure the outer parcel, including reinforcement and protective space. A seller's product weight excludes the international carton and may exclude retail packaging. Recalculate after package removal, folding, compression, or reinforcement. The useful number is not the smallest theoretical weight; it is the larger of actual and route-specific volumetric weight for the parcel that can safely contain the goods.",
        ],
        bullets: [
          "Record actual weight and all three packed dimensions",
          "Use the divisor shown for the current eligible line",
          "Check first-weight and additional-weight increments",
          "Test both compact and protected packaging scenarios",
          "Recalculate whenever the packaging instruction changes",
        ],
      },
      {
        id: "uk-packaging",
        title: "Consolidate only items that belong together",
        paragraphs: [
          "Superbuy's current fee page says multiple warehouse items can be consolidated into one parcel without a consolidation charge. Consolidation can reduce repeated starting charges and unnecessary outer cartons, but maximum consolidation is not automatically the cheapest UK strategy. One large box can increase volumetric weight, cross a dimension limit, reduce line eligibility, or concentrate too much value in one shipment.",
          "Group compatible goods first. Soft clothing may tolerate folding or compression, while structured footwear, delicate surfaces, glass, electronics, or gift packaging may need more protection. Decide which retail boxes have functional or personal value and which only create empty space. Write a precise instruction listing what may be removed, what must remain, and which areas need reinforcement.",
          "Compare a compact parcel, a protected parcel, and a split-parcel scenario. Use live UK quotes for all viable versions once warehouse measurements are available. Splitting can add another starting charge, but it may preserve route access or prevent one bulky item from increasing the chargeable weight of everything else. Keep the packed measurement and instruction associated with the option finally selected.",
        ],
      },
      {
        id: "uk-lines",
        title: "Compare only the lines currently eligible for the complete parcel",
        paragraphs: [
          "There is no permanent best Superbuy shipping line to the UK. The relevant list is the one displayed for the current contents and destination at submission. Item categories, batteries, liquids, powders, magnets, dimensions, declared information, and temporary carrier capacity can affect eligibility. A route mentioned in an older review may no longer be available or suitable.",
          "Start with eligibility, then compare the complete quoted amount, chargeable-weight method, estimated transit range, tracking events, carrier handoffs, size limits, restrictions, insurance or compensation terms, and customs model. An estimated delivery range is not a guarantee. Export processing, transport capacity, customs review, weather, and the UK final-mile carrier can all affect timing.",
          "Enter the complete postcode and distinguish Great Britain from Northern Ireland before comparing. England, Wales, and Scotland follow the Great Britain rules described by GOV.UK, while Northern Ireland can involve different treatment for goods arriving from outside the UK and EU. Do not copy a route or tax assumption from one destination region to the other.",
        ],
      },
      {
        id: "uk-vat-customs",
        title: "Apply the current UK tax rules to the actual consignment",
        paragraphs: [
          "GOV.UK states that goods posted or couriered from another country pass through customs. For Great Britain, VAT applies to imported purchases, and the collection point depends on the transaction and consignment. The current consumer guidance says that for qualifying non-excise goods worth £135 or less, VAT is generally included when the goods are bought. For goods worth more than £135, VAT is normally paid to the delivery company before receipt or collection.",
          "For Great Britain, current GOV.UK guidance says Customs Duty can apply to goods sent from outside the UK when they are excise goods or worth more than £135. Where duty applies, its rate depends on the type and origin of the goods, and the calculation can include the goods plus postage, packaging, and insurance. Use the current UK Trade Tariff for classification and applicable rates instead of assuming a single percentage.",
          "The £135 figure concerns the total consignment, not a separate allowance for every product placed in the same parcel. Do not split or describe goods inaccurately to manufacture a tax result. A purchased item is not a personal gift simply because the recipient plans to give it to someone. Declare a truthful product description, quantity, value, and use, and preserve evidence supporting those entries.",
          "Northern Ireland requires a separate check. GOV.UK currently distinguishes goods sent there from outside the UK and EU and explains additional ‘at risk’ rules. This article cannot decide the treatment for a specific parcel. Confirm the destination, contents, value, and current official guidance before submission, especially when a shipment includes excise, restricted, or commercially imported goods.",
        ],
      },
      {
        id: "uk-records",
        title: "Prepare evidence for customs and the final-mile carrier",
        paragraphs: [
          "Keep the seller listing, selected options, order confirmation, payment record, warehouse item page, QC evidence, parcel contents, packing instruction, declared information, freight payment, tracking number, and any tax record. Values and descriptions should agree across the file. A clear record helps answer a legitimate customs or carrier request and supports a trace, return, or overcharge review.",
          "GOV.UK says Royal Mail, Parcelforce, or another courier will contact the recipient if VAT, duty, or delivery charges must be paid. Verify that a message comes from the genuine carrier channel before following a payment link or sending personal documents. Save the bill and payment confirmation. If the parcel does not arrive by the carrier's stated date, the official guidance directs recipients to the parcel or courier company.",
          "Tracking should be read as a chain of custody. Export acceptance, departure, arrival, customs processing, handoff, and final delivery are different milestones. A quiet interval does not by itself prove loss, and a customs status does not mean the parcel is physically stored by HMRC. Use the parcel number, last genuine scan, carrier, and supporting documents when requesting an investigation.",
        ],
      },
      {
        id: "uk-submit",
        title: "Complete the UK pre-submission check",
        paragraphs: [
          "Before paying, match the parcel contents to the warehouse decision record. Every item should have a documented ship, hold, return, or exclude decision. Confirm that unresolved QC problems are not inside the parcel and that the final packaging instruction produced the weight and dimensions used in the quote.",
          "Review the destination, eligible route, chargeable-weight calculation, declared description, quantity, value, estimated range, tracking, cover, exclusions, and freight adjustment terms. Superbuy's guidance says the international shipping deposit is based on estimated weight, method, and destination, while the final amount is calculated from the size and weight verified by the logistics provider. Keep a buffer rather than treating the deposit as immutable.",
          "After dispatch, save the parcel number, route, first acceptance scan, declaration record, amount paid, and any final reconciliation. Recheck current GOV.UK guidance if the carrier requests tax or customs information, because the correct treatment depends on the real shipment rather than an article example.",
        ],
        bullets: [
          "UK region and full postcode are correct",
          "Packed weight and dimensions match the purchased quote",
          "The line is eligible for every item in the parcel",
          "Product descriptions, quantities, and values are accurate",
          "VAT, duty, carrier-charge, and adjustment evidence is saved",
          "Tracking and claim conditions are preserved at submission",
        ],
      },
    ],
  },
  {
    slug: "superbuy-shipping-to-australia",
    topic: "Australia parcel planning",
    title: "Superbuy Shipping to Australia: Cost & GST",
    deck: "Plan Superbuy shipping to Australia using chargeable weight, live line eligibility, efficient packaging, accurate import data and current Australian customs and GST guidance.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "9 min read",
    sections: [
      {
        id: "australia-cost-map",
        title: "Map the complete Australia parcel cost",
        paragraphs: [
          "A useful Superbuy shipping cost Australia plan separates costs that occur before international dispatch from costs connected with the outbound parcel and import. Superbuy's current fee page describes two main stages. The purchasing stage can include merchandise, domestic delivery to the warehouse and selected optional services. The international stage begins when warehouse items are submitted for overseas delivery.",
          "Superbuy states that international freight is generated from the parcel's final weight, selected shipping line and destination. The amount initially collected can use estimated weight, while the final logistics bill is based on verified package size and weight and may be reconciled afterward. A public rate example therefore cannot serve as a fixed Australia quote.",
          "Build a planning total with distinct entries for merchandise and seller-to-warehouse delivery, optional inspection or packaging work, estimated international freight, a GST, duty and clearance reserve where relevant, and any local handling or delivery charge shown by the chosen service. Keeping these entries separate reveals whether a saving comes from packaging, line choice or simply omitting a cost.",
        ],
      },
      {
        id: "australia-chargeable-weight",
        title: "Model actual and dimensional weight",
        paragraphs: [
          "Australia-bound parcels can contain clothing, shoes and accessories that occupy very different amounts of space. A light carton with substantial empty volume can be more expensive to transport than its scale weight suggests. Some lines calculate a dimensional weight and compare it with actual weight to establish a chargeable amount.",
          "Use the formula and divisor displayed for the specific live line. Do not copy a divisor from another service or an older article. Units, rounding increments, minimum charges and dimensional rules can differ. The safe planning method is to note the packed length, width and height, calculate the line's dimensional value, and then compare it with actual weight under the same line rules.",
          "Packaging choices should be tested before submission. Removing an unnecessary shoebox may shrink a volume-sensitive parcel, while reinforcement can increase measurements. If actual weight already dominates, reducing a small amount of volume may not change the billed tier. All values remain estimates until the final parcel is measured by the logistics provider.",
        ],
        bullets: [
          "Estimated packed dimensions",
          "Estimated actual weight",
          "The line's dimensional formula and divisor",
          "Resulting planning chargeable weight",
          "Billing increment and rounding treatment",
        ],
      },
      {
        id: "live-australia-lines",
        title: "Compare only currently eligible Australia lines",
        paragraphs: [
          "Superbuy's forwarding guidance says some goods are restricted from certain delivery methods and that the submission system presents available choices based on the parcel. A service that accepts ordinary clothing may treat batteries, liquids, powders, magnets or other attributes differently. Destination, size and total weight can also change what appears.",
          "Select the actual warehouse items and enter the complete Australian address before evaluating options. The live result is more reliable than a saved list of route names because operational availability and restrictions can change. This article intentionally does not name a preferred route or promise a delivery time.",
          "Compare estimated chargeable weight and freight, eligible and excluded categories, weight and size limits, tracking information, protection terms and visible service notices. A lower quote can be a poor fit if the parcel does not meet its restrictions or if the protection terms do not match the contents. Delivery ranges remain planning information because third-party carriage and customs events are outside Superbuy's full control.",
        ],
      },
      {
        id: "australia-consolidation-packaging",
        title: "Consolidate without creating an oversized carton",
        paragraphs: [
          "Superbuy's fee page says multiple items can be consolidated without a consolidation charge, and its forwarding guide describes 90 days of free warehouse storage. Consolidation can reduce repeated outer packaging and combine several items under one shipment. It can also produce a carton that is too large for an attractive line or becomes expensive under volumetric billing.",
          "Compare a single consolidated parcel with a logical split before committing. Separating a restricted item from ordinary goods may restore more line choices. Splitting a dense group from bulky lightweight products may also produce a different chargeable-weight result. There is no universal rule that one large parcel is cheaper than two smaller ones.",
          "For the long international movement to Australia, packaging should protect the contents without creating unnecessary volume. Use reinforcement for genuinely fragile items, consider moisture protection for vulnerable materials and request retail-box removal only after confirming that the box is not required for protection or product value. Review warehouse photos and quantities before issuing the instruction.",
        ],
        bullets: [
          "Restriction profile",
          "Fragility",
          "Density and likely volumetric impact",
          "Need to retain original packaging",
          "Value and evidence needs",
        ],
      },
      {
        id: "australia-customs-gst",
        title: "Use accurate values for Australian customs and GST",
        paragraphs: [
          "Australian Border Force guidance distinguishes low-value imported goods from consignments above the low-value threshold. Current ABF information states that goods with a value over AUD1,000 generally require an Import Declaration and can be subject to customs duty, taxes and an import processing charge. Some categories, including tobacco and alcohol, have additional treatment and should not be assessed using ordinary parcel assumptions.",
          "The Australian Taxation Office explains that GST can apply to low-value imported goods with a customs value of AUD1,000 or less and may be collected through the sale process. For taxable importations assessed at the border, ABF states that GST is 10 percent of the value of the taxable importation. That value can include customs value, applicable duty, international transport and insurance, and certain other taxes where relevant.",
          "These rules do not justify inventing a lower declaration. Describe each item accurately and use values supported by the transaction record. Avoid generic descriptions that prevent identification of the contents. Keep product cost, international freight and any tax already collected distinguishable in your records so duplicated or unexplained amounts can be investigated. The actual treatment depends on the goods and transaction, so recheck official ABF or ATO guidance when submitting.",
        ],
        bullets: [
          "Itemized order confirmations",
          "Proof of payment",
          "Warehouse item and parcel lists",
          "Declared descriptions, quantities and values",
          "Freight and optional service charges",
          "Evidence of any GST collected",
          "Tracking and final delivery records",
        ],
      },
      {
        id: "australia-border-delivery",
        title: "Plan for border, biosecurity and local delivery",
        paragraphs: [
          "Australia applies prohibited, restricted and biosecurity controls in addition to ordinary customs assessment. ABF maintains official lists of goods that cannot be imported or require permission. Food, plant material, animal products and goods made from certain natural materials can involve biosecurity requirements even when the parcel value is low. Parcel eligibility in Superbuy does not replace Australian import permission.",
          "Check the specific product before it is packed. Do not submit an item merely because another buyer reports receiving something similar. Composition, treatment, quantity and intended use can affect the rule. If permission or supporting documentation is required, obtain it before dispatch or leave the item out of the parcel.",
          "After the package reaches Australia, customs or biosecurity examination can change the delivery timeline. Watch tracking and messages sent to the recipient details used at submission. Provide truthful supporting evidence when requested. A delay at this stage does not by itself prove the parcel is lost, and a published transport estimate is not a customs guarantee.",
        ],
        bullets: [
          "Use the recipient's complete legal name and reachable phone number",
          "Check state, suburb, postcode and street details",
          "Save both international and local tracking references",
          "Keep receipts for tax or clearance payments",
          "Photograph visible parcel damage before opening",
          "Inspect the contents before discarding packaging and labels",
        ],
      },
      {
        id: "australia-submit-checklist",
        title: "Complete the Australia pre-submit review",
        paragraphs: [
          "Run the final review after all packaging requests have been included, because changing the carton can change chargeable weight and line eligibility. Reopen the live line list, recalculate dimensional weight and compare the final parcel plan with the available budget.",
          "The strongest Superbuy shipping to Australia estimate is one that can be reconstructed from current screen data and supporting documents. It should not depend on a permanent route name, an assumed tax-free result or a delivery guarantee. This process does not predict the final customs decision or exact delivery day, but it improves cost control and reduces avoidable declaration inconsistencies.",
        ],
        bullets: [
          "Australian recipient, suburb, state, postcode and phone are correct",
          "Warehouse quantities and QC images match the intended order",
          "Prohibited, restricted and biosecurity status has been checked",
          "Only currently eligible lines are being compared",
          "Each line uses its own dimensional rule and billing increment",
          "Consolidated and split scenarios have been evaluated",
          "Packaging requests are necessary and specific",
          "Item descriptions, values, quantities and origins are accurate",
          "Order, payment, freight and GST records are saved",
          "Funds remain available for possible border or local charges",
          "Current line notices and protection terms have been read",
        ],
      },
    ],
  },
  {
    slug: "superbuy-shipping-to-canada",
    topic: "Canada parcel planning",
    title: "Superbuy Shipping to Canada: Cost & Duties",
    deck: "Plan Superbuy shipping to Canada around chargeable weight, currently eligible lines, consolidation, accurate customs data and the Canadian delivery process—without relying on a fixed rate that may no longer apply.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "9 min read",
    sections: [
      {
        id: "build-canada-budget",
        title: "Build a Canada budget from two separate stages",
        paragraphs: [
          "A useful Superbuy shipping cost Canada estimate starts before the international parcel is submitted. Superbuy's current fee structure separates the journey into a purchasing stage and an international shipping stage. The first can include the item price, domestic delivery from the seller to the warehouse and any optional services selected for the item. The second is calculated for the outbound parcel after the warehouse items are selected. Mixing these two stages into one unexplained number makes it difficult to understand where the money went or which decision can still be changed.",
          "For international delivery, Superbuy states that its system considers the parcel's final weight, the selected shipping line and the destination country or region. The payment made when submitting a parcel can be based on estimated data, while the final charge is reconciled after the logistics provider verifies the package. That is why a screenshot of somebody else's Canada shipment is not a reliable quotation for a new parcel.",
          "Practical editorial guidance is to keep a simple worksheet with separate entries for merchandise, China domestic shipping, optional warehouse services, estimated international freight and a Canada import reserve. The reserve should not be treated as a predicted tax bill. Its purpose is to prevent the parcel from exhausting the entire budget before any duties, taxes or private courier clearance fees are known.",
        ],
        bullets: [
          "Destination province and complete Canadian postal code",
          "Total merchandise price supported by order receipts",
          "Warehouse weight and dimensions currently shown",
          "Packaging changes still being considered",
          "Any batteries, liquids, magnets or other attributes that may restrict eligibility",
        ],
      },
      {
        id: "canada-chargeable-weight",
        title: "Calculate chargeable weight before comparing lines",
        paragraphs: [
          "The physical scale weight is only one part of Superbuy shipping to Canada planning. A large but light parcel can occupy more transport space than a compact parcel with the same actual weight. Some services therefore use a volumetric or dimensional calculation. The amount billed can be based on the greater of actual weight and the line's calculated dimensional weight, subject to that line's own rules, rounding steps and minimum billing unit.",
          "Do not assume that one universal divisor applies to every Superbuy line. Read the calculation rule displayed for each currently available Canada option, then apply that exact rule to the packed dimensions. A planning formula may be written as length × width × height ÷ line divisor, but the divisor, measurement unit and rounding method have to come from the live line details. Recalculate whenever the estimated carton changes.",
          "The important comparison is the line-specific chargeable weight, not merely the warehouse item weight. For example, removing an unnecessary retail box may reduce parcel dimensions without materially changing scale weight. That can affect a volume-sensitive quote. For a dense parcel, however, dimension reduction may make little difference because actual weight remains higher. Treat every result as an estimate until the logistics provider measures the final package.",
        ],
        bullets: [
          "Actual packed weight",
          "Dimensional weight calculated under that line's rule",
          "Planning chargeable weight after the line's rounding method",
        ],
      },
      {
        id: "live-canada-lines",
        title: "Use the live Canada line list as the source of truth",
        paragraphs: [
          "Shipping-line availability is not permanent. Superbuy's forwarding guidance says that some items may be restricted from certain delivery methods and that users are shown eligible or recommended choices when submitting a parcel. Eligibility can depend on destination, parcel measurements and item attributes. A route mentioned in an old article or social post may not appear for the current warehouse combination.",
          "Open parcel submission with the actual Canadian address and the exact items selected. Compare only the options the system currently presents. Read the billing basis, restrictions, tracking scope, compensation or insurance terms, estimated information and excluded categories. Do not choose from the displayed freight number alone.",
          "Delivery estimates are planning ranges, not guarantees. Superbuy notes that international delivery is performed by third parties and that customs processing, taxes, delays and other events are not fully under its control. Record the estimated freight, billing unit, actual-versus-volumetric rule, size limits, restrictions, protection terms and local-delivery handoff for every serious candidate.",
        ],
      },
      {
        id: "canada-consolidation",
        title: "Consolidate and package for measurable savings",
        paragraphs: [
          "Superbuy's current fee page says that multiple warehouse items can be consolidated into one parcel without a consolidation charge. Its forwarding guide also describes 90 days of free storage, allowing items to be held while a parcel is planned. Consolidation can reduce repeated outer packaging and avoid paying several separate starting-weight charges, but it is not automatically the cheapest or safest answer.",
          "A single carton may become volumetrically inefficient, exceed a line limit or combine restricted and unrestricted goods in a way that removes useful choices. The correct decision comes from comparing at least two parcel plans: one consolidated package and a sensible split. Check both plans against the live Canada line list before submitting either.",
          "Packaging should be matched to the contents. Removing an empty retail box may reduce dimensions, while reinforcement can be reasonable for fragile goods. Moisture protection may be useful for vulnerable materials. These choices can add weight or volume, so request only what protects the actual contents rather than selecting every service by default. Review warehouse photos first so packaging changes do not remove something you intended to keep.",
        ],
        bullets: [
          "Fragility and need for reinforcement",
          "Restrictions or special product attributes",
          "High volume relative to weight",
          "Evidence requirements if damage occurs",
          "Whether the original box is useful or only empty space",
        ],
      },
      {
        id: "canada-declaration",
        title: "Prepare an accurate Canadian customs declaration",
        paragraphs: [
          "The Canada Border Services Agency states that imported goods must be properly declared with true, accurate and complete information. For courier shipments, relevant data includes the value, country of origin and a detailed description of the goods. CBSA's valuation guidance also says a value for duty must be established even when no duty is owed, and values used for Canadian customs purposes are expressed in Canadian currency under the applicable rules.",
          "Use specific descriptions such as the actual product type and material where known. Avoid vague labels such as ‘goods,’ ‘sample’ or ‘accessories’ when they do not properly identify the contents. Keep the declared item values consistent with purchase records. Consolidation does not turn several paid purchases into a gift, and an arbitrary low value can create inconsistencies if customs requests proof.",
          "For goods arriving from China, do not apply the higher courier thresholds that are conditional on qualifying shipments from the United States or Mexico. CBSA's current guidance states that mail shipments worth CAN$20 or less may be duty and tax free, while amounts above that can be assessed. Imported mail items may be subject to GST, HST or provincial tax depending on the circumstances and province, and duty can vary with classification and origin.",
          "Keep merchandise value, international freight, possible duty and federal or provincial tax, and any private courier or broker clearance charge as separate budget entries. A private clearance fee is separate from duties and taxes collected for the government. Confirm such service fees with the carrier when relevant.",
        ],
      },
      {
        id: "canada-clearance-delivery",
        title: "Prepare for clearance and Canadian delivery",
        paragraphs: [
          "When a courier accounts for a casual shipment, CBSA may review the reported description, value and origin and may examine the parcel. If it is released, the courier or its Canadian delivery partner continues the local movement. A clearance request is easier to answer when the recipient name, address, phone number and postal code match the parcel submission and supporting records.",
          "Keep the order confirmation, payment evidence, warehouse item list, parcel declaration, shipping payment, tracking number and any measurement evidence together. CBSA's valuation guidance requires records supporting value for duty in applicable importer contexts. For a personal parcel, the practical point is to preserve complete evidence rather than deleting it after dispatch.",
          "If duty or tax appears incorrect, use the carrier or CBSA process supported by the shipment documents rather than changing the original evidence. CBSA explains that courier clearance fees are private charges distinct from government duties and taxes. It also describes a self-accounting option for qualifying casual courier imports, but that process requires coordination and is not a last-minute shortcut suitable for every parcel.",
        ],
        bullets: [
          "Save the first and final tracking numbers if they differ",
          "Watch for requests from the carrier or customs",
          "Keep receipts for any amount paid at clearance",
          "Photograph the sealed parcel before opening if damage is visible",
          "Retain packaging and labels until the contents are checked",
        ],
      },
      {
        id: "canada-submit-checklist",
        title: "Run the Canada pre-submit check",
        paragraphs: [
          "A strong Superbuy shipping to Canada plan should survive one final review after packaging choices are made. Reopen the line list instead of relying on an earlier quote, because a changed carton, item set or destination can change the available services and chargeable weight.",
          "Confirm every item and value against the warehouse record. The goal is not to force the smallest possible number into each field; it is to submit a parcel whose weight plan, declaration and supporting evidence agree. This process cannot guarantee a particular delivery date or customs result, but it produces a defensible estimate and a cleaner evidence trail.",
        ],
        bullets: [
          "Canadian recipient name, province, postal code and phone number are correct",
          "Only intended warehouse items are selected",
          "QC photos and item attributes have been reviewed",
          "Actual and dimensional weight have been compared under each live line's rule",
          "Consolidated and split-parcel scenarios have been checked",
          "Packaging instructions are specific and necessary",
          "Product descriptions, quantities, values and origins are accurate",
          "Receipts and proof of payment are saved",
          "A separate customs and clearance reserve remains in the budget",
          "The selected line's current restrictions and protection terms have been read",
        ],
      },
    ],
  },
  {
    slug: "how-long-does-superbuy-shipping-take",
    topic: "Superbuy delivery timeline",
    title: "How Long Does Superbuy Shipping Take?",
    deck: "Superbuy shipping time is not one universal number. Build a realistic delivery window by separating warehouse readiness, parcel packing, carrier transit, customs clearance and final-mile delivery, then compare the live estimates shown for eligible lines.",
    date: "2026-09-08",
    updated: "8 September 2026",
    readingTime: "9 min read",
    sections: [
      {
        id: "one-timeline-is-misleading",
        title: "Why Superbuy shipping time is not one universal number",
        paragraphs: [
          "People searching ‘how long does Superbuy shipping take’ often expect one number. That number would be misleading because a Superbuy order passes through several separate systems before it reaches the recipient. A seller first sends the item within China, the warehouse receives and processes it, the user submits a parcel, the parcel is packed and handed to a logistics provider, customs may review it, and a local carrier completes delivery. A delay in any one stage changes the total.",
          "Superbuy's official guidance describes shopping and international shipping as two stages. Products purchased through the shopping-agent service first travel to the Superbuy warehouse. Only after the required items are stocked can the user consolidate them, submit an international parcel and pay the shipping deposit. The international delivery clock therefore should not be confused with the time from the original product purchase.",
          "A useful Superbuy delivery-time estimate starts with a personal milestone: the date by which every item you intend to ship is available in My Warehouse. From that point, add the parcel-processing period shown in your account, the current estimate for an eligible shipping line, and a reasonable buffer for customs and local delivery. Treat the result as a planning range, not a promised arrival date.",
        ],
        bullets: [
          "Domestic seller dispatch and transport to the warehouse",
          "Warehouse receipt, weighing, inspection and storage",
          "Parcel submission, consolidation and packing",
          "International carrier movement",
          "Customs processing",
          "Final-mile delivery",
        ],
      },
      {
        id: "warehouse-readiness",
        title: "Start the clock with warehouse readiness",
        paragraphs: [
          "The first part of the timeline depends on the seller and the domestic carrier, not on the international line you will eventually select. An order that has been paid but not dispatched is still waiting for the seller. An order moving inside China has not yet entered the international parcel process. If several products are planned for one consolidated parcel, the slowest item determines when that parcel can be submitted.",
          "After a parcel reaches the warehouse, Superbuy's guidance says the item is weighed and inspected before it appears in My Warehouse. Review the warehouse status and inspection material before planning the next step. If the item, quantity or visible condition needs attention, resolve it before parcel submission. Shipping immediately and discovering an avoidable issue later can cost far more time than a careful warehouse review.",
          "Forwarding orders follow a related but distinct workflow. Superbuy states that parcel forwarding is separate from its shopping-agent service and includes item-information review before the parcel is sent to the selected warehouse. Do not apply a forwarding-stage estimate to a shopping-agent order, or vice versa. Use the status attached to the actual service in your account.",
        ],
        bullets: [
          "Record when each seller dispatches the order",
          "Wait until every intended item shows as stocked",
          "Review warehouse evidence before consolidation",
          "Separate shopping-agent orders from forwarding orders",
        ],
      },
      {
        id: "parcel-processing",
        title: "Separate parcel submission from carrier transit",
        paragraphs: [
          "When the items are ready, select them in My Warehouse and submit them for delivery. This begins a processing stage in which the items may be consolidated, packaging instructions are applied, the parcel is packed and weighed, and the final shipment is prepared. Package removal, reinforcement or other requested services can change the work required before handover.",
          "The payment estimate is based on the information available at submission, while Superbuy's official guide says the final shipping fee is calculated using the parcel size and weight verified for shipment. That reconciliation is another reason not to treat the moment of payment as proof that the international carrier already has the parcel. The meaningful carrier-transit milestone is the dispatch or handover status shown for the completed parcel.",
          "Keep three timestamps rather than one: parcel submitted, parcel sent out, and first carrier scan. This makes the Superbuy shipping time easier to diagnose. If the parcel is still being packed, the issue is pre-dispatch processing. If it has been sent out but has no later movement, investigate the carrier-tracking stage rather than repeatedly changing the original parcel plan.",
        ],
      },
      {
        id: "compare-live-line-estimates",
        title: "Compare live eligible line estimates before paying",
        paragraphs: [
          "Eligible lines depend on the destination, parcel measurements and item restrictions. Superbuy's guide says some products may be restricted from particular delivery methods and that the account presents recommended available methods. A line visible for another user, country or parcel is not evidence that it will be available for yours.",
          "Compare the live options presented for the parcel you are actually submitting. Read the estimated delivery information beside each eligible line at the same session, then weigh time against restrictions, tracking, packaging needs and the level of uncertainty you can accept. Do not copy a transit claim from an old post or apply a historical result to a different destination.",
          "Preserve a dated screenshot of the comparison screen before payment. It should capture the destination, line name, displayed estimate, parcel weight or measurement information and any visible notices. Estimates and availability can change as logistics conditions change, so this record shows what information was available when you made the decision. It is evidence for later comparison, not a delivery guarantee.",
        ],
        bullets: [
          "Compare only lines currently eligible for the exact parcel",
          "Read restrictions and notices as well as the time estimate",
          "Capture the comparison date and destination",
          "Keep the selected line and parcel number together",
        ],
      },
      {
        id: "tracking-progress",
        title: "Read tracking as a sequence of handovers",
        paragraphs: [
          "After dispatch, Superbuy directs users to User Center and My Parcel to follow shipping progress. Its official parcel-tracking page also accepts a tracking number or parcel number and points users to relevant postal and express-carrier tracking services. Keep the Superbuy parcel number and the carrier tracking number because they identify different parts of the shipment record.",
          "A tracking event is evidence that a scan or data exchange occurred; it is not a countdown timer. International parcels can move between an origin handler, export transport, an international carrier, customs and a destination delivery network. A tracking page may display these handovers with different wording, and the receiving carrier may not show the parcel until its own system receives the shipment data or physical parcel.",
          "Monitor the last event, its timestamp and the organization displaying it. Save screenshots when a status materially changes. Compare the live record with the estimate preserved at submission, but do not invent a missing milestone. If one tracking system stops updating, check My Parcel and the identified carrier's official tracking page before deciding that the shipment has stopped moving.",
        ],
        bullets: [
          "Parcel number",
          "Carrier tracking number",
          "Last scan text and timestamp",
          "Tracking source",
          "Screenshots of major handovers",
        ],
      },
      {
        id: "customs-final-mile",
        title: "Allow separately for customs and final-mile delivery",
        paragraphs: [
          "Carrier transit is only part of Superbuy delivery time. Import processing belongs to the destination authority, while final delivery belongs to the destination carrier. Superbuy's official guidance explicitly notes that third-party logistics providers and customs handle parts of international delivery that the platform cannot fully control. A displayed line estimate therefore should not be rewritten as a universal customs or door-delivery promise.",
          "Customs time varies with the destination, shipment information, item type and whether the authority or carrier needs additional action. Truthful, internally consistent parcel information helps prevent avoidable questions, but accurate information cannot guarantee immediate release. Watch the tracking record and any legitimate notice linked to the shipment rather than assuming every quiet interval means a problem.",
          "After release or import processing, the parcel may be transferred to a local delivery network. That handover can create a new tracking view or a gap between systems. Use the carrier identified in the official tracking record, confirm that the delivery address remains usable, and monitor attempted-delivery notices. The parcel is not complete merely because the international movement has ended.",
        ],
      },
      {
        id: "build-realistic-window",
        title: "Build and protect a realistic delivery window",
        paragraphs: [
          "Plan from evidence rather than a single headline number. First record the warehouse-ready date. Next record parcel submission and dispatch. Add the live delivery range displayed for the selected eligible line, then keep extra flexibility for customs, handovers and final-mile delivery. If the parcel is needed for an event, travel date or gift deadline, avoid scheduling around the earliest possible day.",
          "Seasonal volume, severe weather, transport disruption, item restrictions, address problems, customs review and missed delivery attempts can all extend the timeline. Superbuy also warns that international shipments handled by third parties can encounter delays and other logistics risks. No responsible Superbuy shipping-time guide can convert those variables into a guaranteed worldwide transit number.",
          "Preserve the original order record, warehouse status, parcel-submission confirmation, packaging requests, payment record, line-comparison screenshot and tracking history. If progress appears abnormal, report the parcel number, tracking number, last scan and dates through the support or after-sales route connected to the parcel. A precise chronology is more actionable than saying only that delivery is late.",
          "The clearest answer to ‘how long does Superbuy shipping take’ is therefore the current parcel-specific estimate plus the stages outside that estimate. Recheck live eligible lines each time you ship, because a previous parcel is only a reference. By separating warehouse processing, packing, carrier transit, customs and final-mile delivery, you can set a realistic expectation and identify where any delay actually occurred.",
        ],
        bullets: [
          "Warehouse-ready date",
          "Parcel-submission date",
          "Sent-out date",
          "Selected line and displayed estimate",
          "Customs or carrier notices",
          "Final delivery or attempted-delivery event",
        ],
      },
    ],
  },
  {
    slug: "superbuy-order-evidence-checklist",
    topic: "Order evidence",
    title: "Superbuy Order Evidence Checklist: Build a Record Before You Pay",
    deck: "A source-first Shopping Agent checklist for preserving listing, option, price, message and payment evidence before the seller page or order status changes.",
    date: "2026-08-28",
    updated: "28 August 2026",
    readingTime: "12 min read",
    sections: [
      { id: "purpose", title: "Treat the order file as a decision tool", paragraphs: ["A Superbuy Shopping Agent order crosses several systems: an external seller listing, the imported order form, a product-stage payment, seller-to-warehouse delivery, warehouse intake and eventually an international parcel. Each system records a different part of the transaction. If the only record is a spreadsheet thumbnail or a confirmation total, a later question about the option, seller promise or changed amount becomes difficult to answer.", "The purpose of an order evidence file is not to collect every screen. It is to preserve the few facts that would change a decision or explain a discrepancy. A useful file shows what the seller offered, what you selected, what Superbuy received as the instruction, what amount you authorized and which messages changed the plan. It should be understandable without relying on memory.", "Keep Shopping Agent and Parcel Forwarding separate. In the Shopping Agent flow, Superbuy purchases from the seller after the buyer submits the item. With Parcel Forwarding, the buyer already owns the item and sends it to a forwarding address. Seller communication, purchase evidence and inspection boundaries are therefore not interchangeable." ] },
      { id: "listing", title: "Capture the live listing before selection changes", paragraphs: ["Save the exact source URL, seller or shop identifier, visible product title, primary image and the date checked. Then record the option groups that matter: colour, size, model, version, quantity, bundle and included pieces. Marketplace pages can change after purchase; an option can disappear while the same URL remains online. A dated source snapshot gives the later warehouse record a stable comparison.", "Do not save only the top price. Select the intended option and capture the amount tied to it. A low headline number may belong to an accessory, deposit, small component or minimum quantity. Also record seller-to-warehouse delivery when shown. Product amount and China domestic delivery belong to the purchase stage; they do not include the later international parcel.", "Use bounded language. ‘Listing displayed sizes M–XL on 28 August 2026’ is evidence. ‘True to size’ is an interpretation unless reliable measurements support it. ‘Two straps shown in the selected bundle description’ is evidence. A lifestyle photo containing two straps is not necessarily a promise that both are included." ], bullets: ["Exact source URL and seller", "Visible title and primary image", "Selected option text and quantity", "Option-specific price and currency", "China domestic delivery", "Check date"] },
      { id: "identity", title: "Match the imported order to the source", paragraphs: ["Paste the source link into the current Shopping Agent order interface and wait for the imported product fields. Compare title, option image, colour, size, model, quantity and amount with the source record. Automatic capture can be incomplete, especially when the seller uses complex variants, a manual-order format or a page the parser does not recognize fully.", "If the imported title is shorter but the option and product identity still agree, record the difference rather than demanding identical wording. If the page imports another seller, another product, a deposit-only link or an unrelated option, stop before payment. A remark cannot make a wrong destination safe.", "Where a manual order is required, save every field you supply: URL, neutral description, option, unit price, domestic delivery, quantity and any seller contact detail requested by the form. The manual record is the purchase brief. It should describe the item without adding unsupported claims about authenticity, material or performance." ] },
      { id: "remarks", title: "Preserve the final order instruction", paragraphs: ["Use order remarks only for a material detail that is not represented clearly by the structured fields. A good note is short and testable: ‘Black, EU 42, one pair; match the black option image; do not substitute without confirmation.’ Avoid ‘best quality,’ ‘perfect item’ or ‘choose a good one.’ Those phrases do not give the agent an observable rule.", "Save the exact final remark with the order draft. If a seller later proposes a substitute, a different option or a changed amount, treat the new message as an amendment rather than silently replacing the original instruction. Record what changed, when, who requested it and whether you accepted, rejected or asked for clarification.", "Keep a private warehouse brief separately. Purchase instructions define what to buy; warehouse questions define what visible evidence would help you accept or return it. Combining both in a long order note can create expectations that ordinary warehouse photographs cannot satisfy." ] },
      { id: "payment", title: "Record the authorized amount in layers", paragraphs: ["Before authorization, record the product subtotal for the selected option, China domestic delivery, any clearly named order-stage service, total amount and displayed currency. If a line is not shown, write ‘not shown’ rather than zero. Zero means the interface explicitly charged nothing; blank means the fact is unknown.", "After payment, keep the platform confirmation and the payment-provider record. They answer different questions. The platform record shows the amount requested for the order; the provider record shows the amount and currency settled. Exchange conversion or an issuer charge should not be labelled as a Superbuy service fee unless the platform actually identifies it that way.", "Superbuy’s public guidance describes international shipping as a later stage after warehouse arrival and parcel submission. Do not merge a calculator estimate into the item payment and call the result a final delivered price. The later parcel will depend on destination, eligible route, packaging, weight, dimensions and current terms." ] },
      { id: "status", title: "Turn every status change into a dated event", paragraphs: ["After submission, add the Superbuy order number and the time the status first appears. For each meaningful update, keep the visible status text, timestamp, any attached message and the party with the next action. A status is most useful when it explains whether the buyer, purchasing agent, seller, Chinese carrier or warehouse controls the handoff.", "A seller tracking number is not the same as a carrier acceptance scan. A Chinese-carrier delivery event is not the same as completed warehouse intake. Record those distinctions. If a gap needs support, the useful evidence includes the order number, domestic tracking, last scan, delivery timestamp and the exact unresolved step—not a general statement that the order is stuck.", "If the buyer must approve a price change or option, retain the request and the response. If an order is cancelled or refunded, connect the order event to the balance or payment record. Do not delete the original order row; mark its outcome so the chronology remains complete." ] },
      { id: "warehouse", title: "Reconcile the file when the item arrives", paragraphs: ["Open the saved listing, order confirmation and warehouse item page side by side. Match order number, seller, selected option, colour, size, model, quantity and promised pieces. Then review intake notes, visible weight and the standard photographs. Intake weight is useful evidence, but it is not the final packed parcel measurement.", "Mark each decision field as match, mismatch or not visible. If one material field is unresolved, request the smallest targeted proof that can answer it—a size tag, ruler measurement, connector panel or all set pieces in one frame. Ordinary photographs cannot establish authenticity, internal construction, comfort, composition, durability or electrical safety.", "When evidence shows a problem, state the expected value, observed value and supporting image. ‘Ordered navy, XL; warehouse label shows L in photo two’ is actionable. Keep the item out of an international parcel while the current after-sales path is being considered." ] },
      { id: "storage", title: "Store evidence without creating a privacy problem", paragraphs: ["Use a folder or table named with an internal reference, not a public customer identity. Keep source capture, order confirmation, material messages, payment record, domestic tracking, warehouse evidence and final decision. Avoid duplicating address, passport, card, account balance or other sensitive information when those fields do not help explain the product decision.", "If the file is shared with another buyer or editor, remove personal details and retain only the product evidence. A public review should never expose an order number that can be linked to an account. Screenshots should be cropped to the fact being discussed, with date and context preserved.", "The final audit is compact: can another person identify the source, selected option, approved amount, changes, warehouse match and outcome? If yes, the record is sufficient. If not, collect the missing decision fact before moving forward. A disciplined evidence file does not prevent every seller or carrier problem, but it makes the next action faster, more precise and easier to support." ], bullets: ["Source and selected option preserved", "Imported order matches", "Final remark is testable", "Amount and currency are layered", "Status events are dated", "Warehouse decision is recorded", "Personal data is minimized"] }
    ]
  },
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
