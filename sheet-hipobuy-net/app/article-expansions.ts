import type { ArticleSlug, Lang } from "./site-data";
import { reviewParityDetails } from "./article-parity";

export type ArticleVisual = {
  label: string;
  title: string;
  intro: string;
  columns: [string, string, string];
  rows: Array<[string, string, string]>;
};

type Section = { title: string; paragraphs: string[]; bullets?: string[] };
type LegacySlug = Exclude<ArticleSlug, "hipobuy-review-2026">;

export type ArticleExpansion = {
  sections: Section[];
  checklist: string[];
  faqs: Array<[string, string]>;
  visual: ArticleVisual;
};

export type FullArticle = {
  lead: string;
  keyPoints: string[];
  sections: Section[];
  checklist: string[];
  faqs: Array<[string, string]>;
  visual: ArticleVisual;
};

const en: Record<LegacySlug, ArticleExpansion> = {
  "how-to-buy-with-hipobuy": {
    visual: {
      label: "Decision map",
      title: "Five gates between a product link and delivery",
      intro: "A green light at one gate does not approve the next. Keep the evidence and cost decision separate at every stage.",
      columns: ["Gate", "Evidence to keep", "Decision"],
      rows: [
        ["Listing", "Seller, variant, price snapshot", "Submit or keep researching"],
        ["Warehouse", "Arrival record, QC photos, measurements", "Keep, question or return"],
        ["Parcel", "Packed weight, dimensions, route rules", "Repack, split or ship"],
      ],
    },
    sections: [
      {
        title: "Read platform claims as a starting point, not a guarantee",
        paragraphs: [
          "Hipobuy’s current Google Play description says the service helps users buy from Chinese marketplaces such as Taobao and 1688, offers 90 days of free storage, serves more than 200 countries and has professional buyers available around the clock. The same listing advertises thousands of shipping options and delivery in as little as five days. These statements explain the intended workflow, but they do not establish what will be available for a particular product, address or date. Treat them as questions to verify inside the live account rather than promises to copy into a budget.",
          "The public landing page also displays PayPal, Klarna, Visa, Mastercard and JCB as supported payment brands. Availability can still depend on country, account and checkout context. Before submitting a large order, make a small test of the exact payment path you expect to use, read the amount after currency conversion and save the confirmation. A payment logo says which rail may be offered; it does not tell you the exchange rate, refund route, processing time or protection that applies to your transaction.",
        ],
      },
      {
        title: "Build a budget that survives the warehouse stage",
        paragraphs: [
          "A useful pre-purchase budget has three numbers: the known product total, a working estimate for domestic and service costs, and a separate international-shipping range. Do not force the last number into false precision before the warehouse has measured the parcel. Instead, test a compact and a bulky scenario. A pair of shoes with the retail box and a soft item without unnecessary packaging can produce very different dimensions even when their product prices are similar. The range is more honest than a single calculator result and gives you a clear point at which the purchase no longer makes sense.",
          "Public app reviews repeatedly show why this separation matters. Some reviewers praise the simple order flow, QC images and responsive support, while others say the international charge arrived later than they expected or that refunds and extra fees were difficult to understand. Those reports are individual experiences, not audited performance data, yet the pattern identifies a practical risk: a first-time buyer may mentally combine product payment and final delivery into one event. Write the two payments on different lines before ordering. That small habit prevents a low item price from becoming the only number guiding the decision.",
        ],
      },
      {
        title: "Run one low-risk order before building a large haul",
        paragraphs: [
          "The first order should test the system, not maximise savings. Choose an item whose variant is easy to identify, whose measurements can be checked from photographs and whose value would not create financial stress if the process takes longer than hoped. Watch how the purchase status changes, how the warehouse labels the item, how quickly usable QC evidence appears and how the platform presents return timing. Record the dates. You will learn more from one controlled cycle than from reading a dozen promotional posts with different countries, routes and product types.",
          "After that test, review the gaps between expectation and reality. Was the seller’s domestic delivery slower than assumed? Did the photo set answer the questions you had? Was the packed size close to the estimate? Could you identify every fee before paying it? Use those answers to set rules for the next parcel: a maximum unresolved-item count, a latest consolidation date and a cost ceiling. The goal is not to prove that every future order will be identical. It is to replace vague confidence with a repeatable operating method.",
        ],
      },
      {
        title: "Protect the final handoff and delivery record",
        paragraphs: [
          "Before international payment, capture the selected route, declared parcel contents, chargeable weight, outer dimensions, packaging services, destination and quoted total. If insurance or compensation is offered, read what events and evidence it covers; a label alone is not enough. Once a tracking number appears, follow exceptions rather than refreshing only for movement. A request for information, customs hold or failed delivery attempt needs a different response from an ordinary transit gap. Keep address and phone details consistent with the carrier’s requirements.",
          "At delivery, photograph a visibly damaged outer parcel before opening it and keep the label in frame. Then compare the contents with the warehouse record instead of relying on memory. This does not guarantee a claim, but it creates a timeline from listing to receipt. If everything is correct, keep the final numbers as your own benchmark: product count, packed weight, dimensions, route, transit time and total paid. Personal records from comparable parcels are more useful for the next decision than a stranger’s unusually fast or unusually expensive shipment.",
        ],
      },
    ],
    checklist: ["Separate product payment from international shipping in the budget.", "Test the intended payment method with a manageable order."],
    faqs: [["Do public download numbers prove the service will suit my order?", "No. Google Play shows adoption, not route availability, seller quality, fee clarity or the outcome of a specific parcel."]],
  },
  "hipobuy-shipping-cost-guide": {
    visual: {
      label: "Cost model",
      title: "The quote has layers, not one price",
      intro: "Keep confirmed amounts apart from estimates so the largest uncertainty remains visible.",
      columns: ["Layer", "Known when", "What can change it"],
      rows: [
        ["Product + domestic", "At order or seller dispatch", "Variant, seller delivery, payment conversion"],
        ["Parcel + route", "After warehouse packing", "Weight, dimensions, restrictions, packaging"],
        ["Destination", "By route and local rules", "Tax, customs handling, last-mile events"],
      ],
    },
    sections: [
      {
        title: "Use public reviews to locate uncertainty, not to copy a price",
        paragraphs: [
          "Shipping appears in both positive and negative public Hipobuy reviews. Some customers describe acceptable transit times, intact packaging or useful tracking; others say the international fee was higher than expected or became clear only after goods reached the warehouse. App-store reviews are not a controlled sample: countries, parcel shapes, routes, promotions and expectations differ, and an angry or delighted customer is more likely to post than a neutral one. The responsible conclusion is not that shipping is always cheap or always expensive. It is that the final parcel quote deserves its own approval gate.",
          "A review that says four kilograms cost a certain amount is not a rate card. It usually omits outer dimensions, chargeable weight, destination postcode, restricted contents, protection, currency conversion and the date of quotation. Use reviews to form questions—Was volume charged? Were boxes retained? Was the route tracked?—then answer those questions with your own parcel data. This turns anecdote into a useful audit prompt without pretending it predicts your bill.",
        ],
      },
      {
        title: "Reconcile the estimate with the packed quote",
        paragraphs: [
          "When the warehouse provides weight and dimensions, rebuild the estimate from the beginning. Confirm whether the displayed weight is the scale weight, a volumetric result or the chargeable number after rounding. Check that the destination and product restrictions match the route you intended to use. Then compare the quote with the earlier range. A difference is not automatically an error: protective packing, seller cartons, a long side or a route rule can move the parcel into another band. The task is to explain the difference with observable inputs.",
          "If you cannot reconcile it, ask one precise question at a time. Request the recorded outer dimensions, ask whether optional packaging was applied, or confirm which weight rule the route used. A vague message such as ‘shipping is too high’ gives support little to investigate. A useful request says that the parcel measures a specific size, the route shows a specific chargeable weight, and you want to know which rule created the gap. Save the answer with the revised quote.",
        ],
      },
      {
        title: "Compare scenarios, not isolated coupons",
        paragraphs: [
          "Build at least two complete scenarios. One might keep retail boxes and use a route with stronger tracking; another might remove unnecessary cartons, use a smaller outer box and select a different eligible line. Include packaging fees, insurance or compensation options, payment conversion and estimated destination charges in both. A coupon belongs in the model only after its conditions, expiry and eligible route are known. Otherwise it is a marketing number attached to a parcel that may not qualify.",
          "Choose the scenario with the best controlled total, not necessarily the smallest headline. Saving a modest amount is a poor trade if the route excludes the contents, the packaging no longer protects a structured item or tracking is too weak for your risk tolerance. Conversely, expensive original packaging may add volume without meaningful protection. Write down why the selected scenario won. That note makes the next parcel easier to plan and stops each shipment from becoming a new guess.",
        ],
      },
      {
        title: "Create a post-shipment cost record",
        paragraphs: [
          "After delivery, calculate the all-in cost per parcel and, if useful, per item. Include product payments, domestic freight, service or transaction charges, international shipping and any destination amount actually paid. Do not allocate shipping by item price alone: a bulky low-cost product can consume more parcel capacity than a compact expensive one. Weight, volume or a simple category-based allocation may produce a more realistic view of which purchases made the parcel expensive.",
          "Keep the date, route, destination, packed weight, dimensions, transit time and packaging choices beside the total. Over several orders this becomes your best forecasting tool because the observations share your address, habits and product mix. It will still not predict route changes, but it is more comparable than public screenshots. If the final total repeatedly exceeds the ceiling you set before ordering, change the product mix or parcel plan before relying on another promotion.",
        ],
      },
    ],
    checklist: ["Label every amount as confirmed or estimated.", "Save outer dimensions and chargeable weight with the final quote."],
    faqs: [["Can a coupon make an unsuitable route worthwhile?", "Usually not. Confirm eligibility, restrictions, protection and the final total before treating any discount as a saving."]],
  },
  "hipobuy-warehouse-qc-photos": {
    visual: {
      label: "QC evidence ladder",
      title: "Move from identity to condition",
      intro: "Check what the item is before debating how good it looks.",
      columns: ["Pass", "Question answered", "Best evidence"],
      rows: [
        ["Identity", "Is it the ordered variant?", "Order option, label, full view"],
        ["Scale", "Will the dimensions work?", "Readable tape and both endpoints"],
        ["Condition", "Is a visible issue material?", "Wide view plus targeted close-up"],
      ],
    },
    sections: [
      {
        title: "Understand what a QC photo can and cannot prove",
        paragraphs: [
          "A warehouse image records one item, at one moment, under one lighting setup and from a limited angle. It can provide strong evidence for color family, visible shape, labels, quantity, measurements and surface damage. It cannot reliably prove long-term durability, internal construction, smell, exact material composition or how a garment will fit a particular body. This boundary matters because an attractive photo can create more confidence than the evidence deserves. Make the approval decision only on questions the images can reasonably answer.",
          "Public reviews often praise Hipobuy’s QC photos, and some reviewers specifically describe them as useful for checking an order before shipping. Other reviews still report dissatisfaction with the received product. Both can be true because QC reduces uncertainty rather than eliminating it. The photo set may be clear while a hidden flaw remains, or a buyer may approve a visible variation and regret it later. The best response is not to dismiss QC; it is to define a threshold before seeing the images and apply it consistently.",
        ],
      },
      {
        title: "Control for lighting, angle and comparison bias",
        paragraphs: [
          "Color is especially vulnerable to white balance, screen calibration and reflections. If shade accuracy is material, compare several frames that include a neutral background and ask whether the warehouse can provide another angle under the same setup. Do not compare a studio product image and a warehouse phone photograph pixel for pixel. Instead, look for stable differences across views: a consistently different color family, absent panel, wrong graphic or incorrect hardware is more meaningful than a small shift in brightness.",
          "Scale has similar traps. A wide-angle lens can make the near end of a shoe or bag look larger, and a tape that begins outside the frame cannot support an exact measurement. Ask for the tape to lie flat, with the zero point and endpoint visible. For symmetric products, compare matching landmarks on both sides rather than judging the whole silhouette at once. These controls take minutes and turn a subjective impression into a repeatable review.",
        ],
      },
      {
        title: "Set material and cosmetic thresholds before approval",
        paragraphs: [
          "Write down which findings require a return, which require one more photo and which you are willing to accept. A wrong size, missing component, tear or non-functioning closure may be a material issue. A tiny loose thread, packaging crease or light variation may be cosmetic, depending on the item and your standards. There is no universal threshold, but there should be a threshold made before urgency or sunk cost begins to influence the decision.",
          "Use three outcomes and avoid an endless middle state. Approve when identity, measurements and visible condition meet the written threshold. Question when one specific image or measurement could resolve the decision. Return when the observable mismatch already crosses the limit. If you ask for more evidence, write the exact next decision beside the request—for example, ‘keep if the mark wipes away; return if it is a cut.’ This prevents extra photos from becoming delay without clarity.",
        ],
      },
      {
        title: "Preserve the evidence after the parcel leaves",
        paragraphs: [
          "Save the listing option, warehouse record, original QC frames, extra-photo request and final approval together. Screenshots should include the item identifier and date where possible. A loose collection of product images is difficult to connect to a support case later. The record is also useful when several similar products enter the warehouse, because it prevents photos from being matched to the wrong line in your own spreadsheet.",
          "When the parcel arrives, compare the delivered item with the saved evidence in the same order: identity, measurements where practical, construction and visible condition. If there is a difference, photograph it before use and describe only what the comparison shows. This record cannot guarantee a remedy, and it should not be published with personal order data. Its value is precision: support can see what was approved, what arrived and where the observable change occurred.",
        ],
      },
    ],
    checklist: ["Define material, question and cosmetic thresholds before opening QC.", "Keep item identifiers with every saved image."],
    faqs: [["Should I judge color from one warehouse image?", "No. Lighting and screens change appearance. Compare multiple frames and focus on stable differences rather than small brightness shifts."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    visual: {
      label: "Weight decision",
      title: "The scale is only half of the parcel",
      intro: "Dimensions can change the charge without changing the products inside.",
      columns: ["Input", "What it measures", "Best control"],
      rows: [
        ["Actual weight", "Mass of packed parcel", "Remove needless materials"],
        ["Dimensions", "Space occupied", "Right-size the outer carton"],
        ["Route rule", "How inputs become a charge", "Read divisor, rounding and limits"],
      ],
    },
    sections: [
      {
        title: "Use a formula only after identifying the route rule",
        paragraphs: [
          "A common volumetric model multiplies parcel length, width and height, then divides the result by a carrier-specific number. The calculation is easy; choosing the correct units, divisor and rounding rule is the hard part. Air, rail and express products may not use the same standard, and a route can change its commercial rules. For that reason this guide does not publish one supposed Hipobuy divisor. The reliable source is the live quotation or route description attached to the parcel you are actually considering.",
          "Work through the logic with a neutral example. If a parcel becomes ten percent shorter while width and height stay the same, its calculated volume also falls by roughly ten percent before rounding. If one side crosses a size band, however, the effect may be larger than the simple formula suggests. This is why asking only for scale weight can miss the main driver. Record all three external dimensions in the same unit and note whether the warehouse rounded them up.",
        ],
      },
      {
        title: "Find the dimension that is doing the damage",
        paragraphs: [
          "Do not ask for generic repacking first. Identify whether the parcel is generally loose or whether one item creates a long, wide or tall side. A shoe box might set height, a rolled poster might set length, and several soft garments might create a box that is simply underfilled. The correct change is different in each case. Removing a poster tube will not help a parcel whose height is controlled by rigid footwear, and compressing clothing will not shorten a long item.",
          "Request a before-and-after measurement when a packaging service is expected to reduce volume. The new quote should be compared on the same route because switching both packaging and route at once hides which action created the change. Also record the protection removed. A smaller bill is not an improvement if a structured or fragile item is now likely to deform. The useful optimisation is lower wasted volume with adequate protection, not the smallest possible box at any cost.",
        ],
      },
      {
        title: "Model split and combined parcels with the same assumptions",
        paragraphs: [
          "A combined parcel can use space efficiently and avoid repeated base handling, but it can also exceed a route’s weight or size limit. Two smaller parcels may access different lines, yet duplicate packaging and fixed charges. Compare both arrangements with the same destination, contents and protection standard. Include minimum billable increments and any service charges instead of comparing only a per-kilogram figure.",
          "The answer often depends on which item controls the dimensions. If one rigid box makes the combined parcel bulky, separating that item may allow the remaining soft goods to pack efficiently. If every item is compact, splitting may add more carton than it removes. This is a planning exercise, not a universal rule. Ask for separate scenarios only when the possible saving is large enough to justify the handling and the risk of two tracking journeys.",
        ],
      },
      {
        title: "Audit a revised charge without jumping to conclusions",
        paragraphs: [
          "A quote can change after warehouse remeasurement, reinforcement or carrier acceptance. Start by comparing the stored before-and-after values: actual weight, three dimensions, selected route and chargeable weight. Check whether the parcel entered another rounding increment or whether a protective service changed the carton. If all inputs are unchanged but the charge moved, ask which tariff or adjustment was applied and request the current rule in writing.",
          "Keep the tone factual. Public reviews include frustration about high logistics costs, but a high amount alone does not prove an incorrect calculation. At the same time, a platform label should not replace an explanation that can be tied to measurable inputs. The most useful support message presents the prior quote, final measurement and exact difference. That makes a genuine correction easier and gives you evidence if you decide not to ship on that route.",
        ],
      },
    ],
    checklist: ["Identify the current route rule before calculating.", "Compare repacking with before-and-after dimensions on the same route."],
    faqs: [["Can I use a divisor found in an old forum post?", "Only as a rough scenario. Confirm the current divisor, units and rounding on the live route before making a payment decision."]],
  },
  "hipobuy-90-day-warehouse-storage": {
    visual: {
      label: "Two-clock plan",
      title: "Storage time and return time are not the same",
      intro: "The shorter operational deadline should control the next action.",
      columns: ["Clock", "What starts it", "Safe response"],
      rows: [
        ["Seller return", "Seller or platform event", "Inspect and decide promptly"],
        ["Warehouse storage", "Recorded warehouse arrival", "Plan consolidation with buffer"],
        ["Parcel dispatch", "Your target delivery need", "Work backward from a safe date"],
      ],
    },
    sections: [
      {
        title: "Verify the live countdown item by item",
        paragraphs: [
          "The 90-day figure comes from Hipobuy’s current public app-store description, which presents it as free storage intended to help users combine orders. It is useful evidence of the advertised service, but the account should remain the operational source. Check whether the countdown begins at warehouse receipt, after processing or at another visible status, and see whether every item shows the same rule. Promotional wording cannot resolve an item-specific exception, a policy update or a warehouse notice.",
          "Take a screenshot of each arrival date and any displayed expiry, then calculate your own earlier action date. If the account does not show a clear countdown, ask support for the date in a message that identifies the item. Do not wait until the final week to discover that your assumed starting point was wrong. A storage plan is dependable only when it is tied to visible item records rather than one general sentence on an app listing.",
        ],
      },
      {
        title: "Use a weekly warehouse review instead of daily checking",
        paragraphs: [
          "Constantly refreshing does not make a seller ship faster, but ignoring the warehouse for a month can hide a missed return. A weekly review is a practical middle ground while the parcel is being assembled. Sort items into expected, received without QC, question, return in progress and ready. Record the owner of the next action—seller, platform support or you—and the date on which silence becomes an escalation.",
          "End each review with a parcel decision, even if the decision is to wait one more week. State which incoming items justify that wait and what happens if they do not arrive. This prevents optional purchases from extending the plan indefinitely. It also shows when the original parcel concept has changed: a small group of compatible products can slowly become a bulky mix with different route restrictions if every new find is added simply because storage remains available.",
        ],
      },
      {
        title: "Set early triggers for splitting or abandoning the plan",
        paragraphs: [
          "Create triggers before the buffer becomes uncomfortable. Examples include a seller missing the expected dispatch window, an item staying in question status after one evidence request, the combined parcel losing the intended route, or the estimated total passing your budget ceiling. A trigger does not force immediate shipping; it forces a review with specific options. You might return one item, ship the ready group, or stop adding products.",
          "Sunk cost is especially dangerous near the end of a storage window. Time spent waiting does not make an unsuitable item or expensive parcel better. Compare the remaining choices from today forward: fees, protection, route access and the value of waiting. If a live account warning conflicts with the earlier plan, follow the current warning and preserve evidence. The aim is a controlled exit, not using every advertised day.",
        ],
      },
      {
        title: "Work backward from the date you actually need the parcel",
        paragraphs: [
          "A storage deadline is not a delivery date. International transit, export processing, customs and last-mile delivery all occur afterward. If the parcel is needed for a trip, gift or season, start with that event and subtract a conservative transit range, a customs buffer, warehouse packing time and a decision buffer. The platform’s ‘as fast as five days’ wording describes an advertised best case, not a schedule on which a fixed event should depend.",
          "When timing matters more than consolidation savings, ship earlier and reduce uncertainty. When timing is flexible, the warehouse window can support staggered purchases, but keep the same review discipline. Confirm the route again immediately before submission because availability and estimates may have changed while items waited. Storage is valuable because it creates options; it becomes a liability when it encourages a plan with no final decision date.",
        ],
      },
    ],
    checklist: ["Capture the live arrival date and any displayed expiry.", "Review warehouse status on a fixed weekly schedule."],
    faqs: [["Is the advertised 90-day period a delivery promise?", "No. It concerns storage as described in the app listing; packing, international transit, customs and last-mile delivery happen separately."]],
  },
  "hipobuy-warehouse-return-checklist": {
    visual: {
      label: "Return case file",
      title: "One claim, one evidence chain",
      intro: "A return request is easier to assess when every document answers a specific question.",
      columns: ["Question", "Evidence", "Outcome to request"],
      rows: [
        ["What was ordered?", "Selected option and buyer note", "Reference point"],
        ["What arrived?", "Warehouse overview and detail", "Mismatch or condition"],
        ["What should happen?", "Deadline and current fee terms", "Return, exchange or clarification"],
      ],
    },
    sections: [
      {
        title: "Learn from review themes without treating allegations as proof",
        paragraphs: [
          "Public Hipobuy reviews include complaints about return transaction charges, cancelled orders, delayed refunds and difficult communication. Other users describe fast support and smooth resolutions. None of those individual posts establishes what will happen to your case, and allegations should not be repeated as verified misconduct. They do reveal where a return request commonly becomes unclear: who accepted it, which fee was applied, where the refund will be sent and which status counts as completion.",
          "Turn those themes into fields in your case log. Record the requested remedy, the amount expected back, any domestic return or service cost, the refund destination and the promised processing stage. If support gives a time range, note when it starts and when you will follow up. This is more useful than arguing from someone else’s review because it keeps the conversation tied to your order and the terms visible at that time.",
        ],
      },
      {
        title: "Write the first message so it can be acted on",
        paragraphs: [
          "A concise return message can follow five lines: order identifier; exact option purchased; observable difference; attached evidence; requested outcome. Avoid emotional labels, broad accusations and a long history before the basic facts. For example, state that the order shows size M, the warehouse label shows size L, the relevant frames are attached, and you request a return or exchange before the displayed deadline. The structure lets a support agent understand the case without guessing which photograph matters.",
          "If the problem cannot be proved from the supplied images, request the missing evidence before demanding a result. Ask for a readable tag, a measurement or a close-up of the suspected damage. At the same time, tell support that the request relates to a return decision so the timing is visible. Once the evidence arrives, update the same thread instead of opening several competing conversations. One timeline is easier to audit and reduces the risk of contradictory instructions.",
        ],
      },
      {
        title: "Track acceptance, movement and money as separate events",
        paragraphs: [
          "A support reply that says a request has been received is not necessarily seller acceptance, physical return dispatch or a completed refund. Give each event its own date and reference. Ask whether the item must move back to the seller, whether a replacement will create a new warehouse record and whether any amount returns to account balance or the original payment method. The answer may depend on the seller, payment rail and reason for return.",
          "After the item leaves the parcel plan, remove it from projected weight and dimensions, but keep the record until the financial outcome is visible. If a replacement is expected, add a new QC and consolidation deadline rather than assuming it will fit the old schedule. A return changes both money and logistics; closing only one side can leave an unexplained balance or an item still blocking shipment.",
        ],
      },
      {
        title: "Escalate with a timeline, not a larger volume of messages",
        paragraphs: [
          "When the stated time passes, send a short follow-up that lists the request date, acceptance reference, last promised step and the single status you need. Attach the earlier evidence rather than rewriting the entire case. If the platform has a formal dispute or escalation path, use it within the visible deadline and keep personal payment details out of public posts. A public review may describe the experience later, but it should not replace the active support process.",
          "At closure, record the gross product amount, fees withheld, refund amount, destination and completion date. If the figures differ from the written terms, ask for an itemised explanation. This does not assume the difference is wrong; it gives both sides a calculation to examine. Finally, update the seller and product notes in your own sheet so the reason for return informs future sourcing rather than disappearing once the refund arrives.",
        ],
      },
    ],
    checklist: ["Log acceptance, physical return and refund as three separate events.", "Keep the case until the financial result is visible."],
    faqs: [["Should I post payment screenshots publicly to get attention?", "No. Use the platform’s support or dispute path and redact personal, address, order and payment information from anything shared publicly."]],
  },
};

const reviewEn: FullArticle = {
  lead: "A useful Hipobuy review cannot be reduced to one star score or a collection of dramatic screenshots. Public sources currently tell different stories: the official app listings describe a broad shopping-agent workflow, store ratings vary by country, reviewers praise QC and support, and others complain about shipping cost, refunds or unclear steps. This review separates those signals, explains their limits and turns them into checks a buyer can perform before committing a large parcel.",
  keyPoints: [
    "Official feature claims explain the intended service; they do not prove a result for one order.",
    "App Store ratings are storefront-specific, so a US score must not be presented as a global rating.",
    "Public reviews are useful for finding recurring questions, not for proving every allegation or promise.",
    "The safest evaluation is a small documented order with a pre-set cost and QC threshold.",
  ],
  visual: {
    label: "Evidence map",
    title: "What each public source can actually tell you",
    intro: "The strongest conclusion stays within the limits of the source.",
    columns: ["Source", "Useful signal", "Important limit"],
    rows: [
      ["Official app listing", "Features, reach and advertised terms", "Self-described and subject to change"],
      ["App-store rating", "Storefront user sentiment", "Country, version and selection effects"],
      ["Public review", "Problems or strengths to investigate", "Individual, unaudited experience"],
    ],
  },
  sections: [
    {
      title: "What Hipobuy publicly says the service does",
      paragraphs: [
        "Hipobuy’s Google Play description presents the app as a global shopping service for buying products from Chinese marketplaces including Taobao and 1688. It says the service combines purchasing, warehouse storage and international shipping, with professional buyers available 24/7. The same listing advertises 90 days of free storage, more than 200 destination countries, thousands of shipping options and delivery in as little as five days. Google Play showed more than 500,000 downloads when this article was checked on 14 August 2026.",
        "The official public landing page is much narrower. It promotes more than 100,000 choices, a coupon offer, app download and payment brands including PayPal, Klarna, Visa, Mastercard and JCB. These pages establish what the company markets, not what every account will see. Routes, timing, payment methods and policy details can vary with location, product and date. Any review that repeats these figures should label them as advertised claims and direct the practical decision back to the live account.",
      ],
    },
    {
      title: "Why one rating does not describe every user",
      paragraphs: [
        "The US Apple App Store showed a 3.1 out of 5 rating from 261 ratings at the time of research, while the Canadian storefront showed 3.9 from 62 ratings. Google Play showed about four stars and more than 500,000 downloads, although the review total displayed in different parts of the listing was not perfectly consistent. These are snapshots, not permanent values. More importantly, Apple ratings are attached to a storefront. Publishing the US figure as ‘Hipobuy’s global rating’ would be inaccurate.",
        "Ratings also compress very different stages into one number. One person may rate the interface, another the seller’s product, another customs transit and another a refund. App versions change, routes differ and users with extreme outcomes may be more motivated to post. A responsible review reports the source, country and check date, then examines the reasons behind the stars. The score is a doorway into the evidence, not the verdict.",
      ],
    },
    {
      title: "What positive reviews tend to value",
      paragraphs: [
        "Across the app stores and public review pages, positive comments commonly mention an understandable ordering flow, useful warehouse QC images, responsive support, careful packaging, tracking updates and delivery that met or beat the reviewer’s expectation. These themes fit the job a shopping agent is supposed to perform: translate a product link into a purchase, receive the item, show evidence and arrange an international parcel. They are useful because they identify functions a new user can test directly.",
        "They should still be read cautiously. A reviewer who says support was fast does not provide a measured service level for every language and time zone. A parcel that arrived in a week does not establish the transit time of another route. Product-quality praise may reflect the third-party seller more than the agent. The practical use of a positive review is to create a test: Was the QC set clear? Did support answer the exact question? Did tracking explain exceptions? Record the answer from your own order.",
      ],
    },
    {
      title: "What critical reviews tend to question",
      paragraphs: [
        "Critical app-store and review-site posts frequently focus on international shipping that felt high or appeared later than expected, return or transaction charges, cancelled orders, refund timing, slow communication and an interface that did not make every cost obvious to a first-time buyer. These are claims by individual users, not findings of fraud or proof that the same outcome is typical. Some posts omit dimensions, destination, product restrictions and the support resolution, so they cannot establish whether a particular charge was calculated correctly.",
        "The repeated topics nevertheless reveal where buyers need stronger controls. Separate product payment from international shipping before ordering. Ask how return fees and refund destinations work while the item is still eligible. Save packed weight, dimensions and route rules. Keep one support timeline. If a platform step is unclear, resolve it before adding more items. A balanced review does not hide complaints, but it converts them into questions that can be answered with account-level evidence.",
      ],
    },
    {
      title: "The Trustpilot warning changes how its reviews should be used",
      paragraphs: [
        "Trustpilot currently says Hipobuy’s rating is unavailable because of a breach of its guidelines and states that a number of fake reviews were removed. The page still displays individual reviews, including both positive and negative experiences. This means it would be misleading to promote the former headline distribution as a clean trust score or to select only flattering quotes. The moderation notice is itself material context and must travel with any discussion of that source.",
        "It also does not prove that every remaining review is false or that every customer experience is negative. Review platforms apply their own detection and enforcement processes, and individual posts remain opinions. The careful approach is thematic: note which operational issues recur, compare them with app-store feedback, avoid unverifiable superlatives and do not publish customer images or order details without permission. For this site, no copied testimonial is used as an endorsement.",
      ],
    },
    {
      title: "How to run a fair test before a large order",
      paragraphs: [
        "Choose a modest item with an obvious variant and measurable dimensions. Before paying, save the exact listing, option, product price, domestic delivery and visible payment total. Set a maximum all-in budget and a rule for walking away. When the item reaches the warehouse, time the status updates and review the supplied images against a written QC checklist. If one material question remains, request one precise extra photo and note how long the response takes.",
        "Next, record the packed scale weight, all three dimensions, chargeable weight, eligible routes, packaging choices and final quote. Do not change several variables at once if you want to understand a price difference. Submit only if the total, protection and tracking meet the rule you set earlier. At delivery, record transit time and compare the item with the saved QC evidence. This single controlled cycle produces a personal review that is more relevant than a stranger’s parcel from another country.",
      ],
    },
    {
      title: "A measured verdict: useful workflow, variable outcomes",
      paragraphs: [
        "The verifiable picture is that Hipobuy operates a publicly listed shopping app with substantial Google Play adoption and a workflow covering purchase, warehouse handling and international shipping. Its marketing emphasises reach, storage, speed and support. Public feedback shows that some users value the interface, QC evidence and service, while others report frustration around final shipping cost, refunds and communication. Storefront ratings differ, and Trustpilot’s current guideline warning prevents a simple reputation score from carrying much weight.",
        "That evidence does not justify calling every order safe, cheap or fast, and it does not justify declaring every complaint representative. Hipobuy should be evaluated as a multi-stage service whose result depends on the seller, warehouse evidence, packaging, route, destination and user decisions. A small test order, separate shipping budget, saved QC record and clear return deadline are the most defensible way to decide whether the platform fits your needs.",
      ],
    },
  ],
  checklist: [
    "Check the app-store country and research date before quoting a rating.",
    "Separate official claims from independent user reports.",
    "Set a product budget and a separate shipping ceiling.",
    "Use a first order that is easy to identify and measure.",
    "Save listing, payment, QC, parcel and route evidence.",
    "Confirm return timing and refund destination before a problem occurs.",
    "Judge support with a specific question and documented response.",
    "Do not publish personal order or payment details in a review.",
  ],
  faqs: [
    ["Is Hipobuy legit?", "Public app listings and substantial downloads show an operating service, but ‘legit’ is too broad to guarantee seller quality, shipping cost, refunds or the result of one order. Test the workflow with a controlled purchase."],
    ["What is Hipobuy’s rating?", "There is no single global score. Ratings vary by store and country and change over time; Trustpilot currently marks the company rating unavailable after a guideline breach."],
    ["Are Hipobuy reviews reliable?", "Treat individual reviews as unaudited experiences. Look for recurring themes, disclose moderation warnings and verify decisions with your own account data."],
    ["What should a first-time user test?", "Variant accuracy, QC usefulness, fee visibility, packed measurements, route eligibility, support clarity and the final all-in cost."],
  ],
};

const de: Record<LegacySlug, ArticleExpansion> = {
  "how-to-buy-with-hipobuy": {
    visual: { label: "Entscheidungsplan", title: "Fünf Prüfstellen vom Produktlink bis zur Lieferung", intro: "Eine Freigabe in einer Phase genehmigt nicht automatisch die nächste.", columns: ["Prüfstelle", "Beleg", "Entscheidung"], rows: [["Angebot", "Verkäufer, Variante, Preisstand", "Bestellen oder weiter prüfen"], ["Lager", "Eingang, QC-Fotos, Maße", "Behalten, klären oder zurückgeben"], ["Paket", "Gewicht, Maße, Routenregeln", "Umpacken, teilen oder senden"]] },
    sections: [
      { title: "Plattformangaben als Ausgangspunkt lesen", paragraphs: ["Im aktuellen Google-Play-Eintrag beschreibt Hipobuy den Kauf auf chinesischen Marktplätzen wie Taobao und 1688, 90 Tage kostenlose Lagerung, mehr als 200 Zielländer und rund um die Uhr verfügbare Einkäufer. Außerdem werden zahlreiche Versandoptionen und eine Lieferung in bis zu fünf Tagen beworben. Diese Aussagen erklären den vorgesehenen Ablauf, garantieren aber weder eine Route noch eine Frist für ein bestimmtes Produkt. Prüfe sie deshalb im aktuellen Konto, bevor du Geld oder einen Liefertermin fest einplanst.", "Die öffentliche Startseite zeigt PayPal, Klarna, Visa, Mastercard und JCB. Ob eine Methode tatsächlich erscheint, kann von Land, Konto und Checkout abhängen. Teste den vorgesehenen Zahlungsweg mit einem überschaubaren Auftrag, lies den Betrag nach Währungsumrechnung und sichere die Bestätigung. Ein Zahlungslogo sagt nicht, welcher Kurs, Erstattungsweg, Bearbeitungszeitraum oder Schutz für genau diese Transaktion gilt."] },
      { title: "Ein Budget bauen, das die Lagerphase überlebt", paragraphs: ["Trenne drei Zahlen: bestätigter Produktpreis, Arbeitswert für Inlands- und Servicekosten sowie eine Spanne für internationalen Versand. Vor dem Verpacken ist eine Spanne ehrlicher als ein scheinbar exakter Endpreis. Rechne ein kompaktes und ein voluminöses Szenario. Schuhkartons, steife Verpackungen und wattierte Jacken können die Außenmaße stärker verändern als ihr Warenwert vermuten lässt. Lege schon jetzt fest, ab welcher Gesamtsumme der Kauf keinen Sinn mehr ergibt.", "Öffentliche Bewertungen zeigen, warum diese Trennung nötig ist. Einige Nutzer loben Bestellablauf, QC-Bilder und schnelle Antworten; andere berichten, dass internationale Versandkosten später oder höher als erwartet sichtbar wurden oder dass Rückzahlungen schwer nachzuvollziehen waren. Das sind Einzelerfahrungen, keine geprüfte Statistik. Das wiederkehrende Risiko ist trotzdem klar: Produktzahlung und Haustürlieferung werden gedanklich zu einem Preis verschmolzen. Schreibe sie vor der Bestellung auf zwei getrennte Zeilen."] },
      { title: "Vor einem großen Haul einen kleinen Test durchführen", paragraphs: ["Der erste Auftrag soll den Prozess prüfen, nicht den Rabatt maximieren. Wähle einen leicht erkennbaren Artikel mit klarer Variante und messbaren Eigenschaften, dessen Wert bei einer Verzögerung keinen finanziellen Druck erzeugt. Beobachte Statuswechsel, Lagerkennzeichnung, Qualität der QC-Belege und dargestellte Rückgabefristen. Notiere die Daten. Ein kontrollierter Durchlauf ist aussagekräftiger als Werbeposts zu anderen Ländern, Routen und Produktarten.", "Vergleiche danach Erwartung und Ergebnis: War der Inlandsversand langsamer? Beantworteten die Fotos deine Fragen? Entsprach die Verpackungsgröße der Schätzung? Waren alle Gebühren vor Zahlung erkennbar? Formuliere daraus Regeln für das nächste Paket, etwa eine Obergrenze offener Fälle, einen letzten Bündeltag und ein Kostenlimit. Ziel ist keine Garantie für kommende Bestellungen, sondern ein wiederholbarer eigener Ablauf."] },
      { title: "Übergabe, Tracking und Empfang dokumentieren", paragraphs: ["Vor der internationalen Zahlung sicherst du Route, Inhaltsangabe, Abrechnungsgewicht, Außenmaße, Verpackungsleistungen, Zieladresse und Gesamtpreis. Wenn Versicherung oder Entschädigung angeboten wird, lies abgedeckte Ereignisse und erforderliche Belege. Nach Erhalt der Sendungsnummer achtest du besonders auf Ausnahmen wie Informationsanfragen, Zollstopps oder fehlgeschlagene Zustellung, statt nur auf Bewegung im Tracking zu warten.", "Fotografiere ein sichtbar beschädigtes Außenpaket vor dem Öffnen mit lesbarem Label. Vergleiche den Inhalt anschließend mit dem gespeicherten Lagerbeleg. Bewahre auch bei erfolgreicher Lieferung Produktzahl, Maße, Gewicht, Route, Laufzeit und Gesamtkosten auf. Eigene Daten aus vergleichbaren Paketen helfen bei der nächsten Entscheidung mehr als ein fremder außergewöhnlich schneller oder teurer Versand."] },
    ],
    checklist: ["Produktzahlung und internationalen Versand getrennt budgetieren.", "Den geplanten Zahlungsweg mit einem überschaubaren Auftrag testen."],
    faqs: [["Beweisen hohe Downloadzahlen, dass mein Auftrag gut läuft?", "Nein. Downloads zeigen Nutzung, nicht Routenverfügbarkeit, Verkäuferqualität, Kostentransparenz oder das Ergebnis eines konkreten Pakets."]],
  },
  "hipobuy-shipping-cost-guide": {
    visual: { label: "Kostenmodell", title: "Ein Angebot besteht aus mehreren Ebenen", intro: "Bestätigte Werte bleiben getrennt von Schätzungen, damit Unsicherheit sichtbar wird.", columns: ["Ebene", "Bekannt ab", "Veränderliche Faktoren"], rows: [["Produkt + Inland", "Bestellung oder Versand des Verkäufers", "Variante, Inlandsporto, Umrechnung"], ["Paket + Route", "Nach dem Verpacken", "Gewicht, Maße, Regeln, Schutz"], ["Zielland", "Je nach Route und Land", "Steuern, Zoll, letzte Meile"]] },
    sections: [
      { title: "Bewertungen zeigen Fragen, keine übertragbare Preisliste", paragraphs: ["Versand taucht in positiven und negativen Hipobuy-Bewertungen auf. Manche Nutzer nennen passende Laufzeiten, intakte Verpackung oder hilfreiches Tracking; andere empfinden die internationale Gebühr als hoch oder erst spät verständlich. Die Fälle sind nicht kontrolliert: Land, Paketform, Route, Aktion und Erwartung unterscheiden sich. Daraus folgt weder ‘immer günstig’ noch ‘immer teuer’, sondern eine klare Regel: Das fertige Versandangebot braucht eine eigene Freigabe.", "Eine Bewertung mit Kilogramm und Preis ist keine Tarifkarte. Meist fehlen Außenmaße, Abrechnungsgewicht, Postleitzahl, Einschränkungen, Schutz, Wechselkurs und Angebotsdatum. Verwende sie, um Fragen zu bilden: Wurde Volumen berechnet? Blieben Kartons erhalten? Welche Route und welches Tracking wurden genutzt? Beantworte diese Fragen anschließend mit den Daten deines Pakets."] },
      { title: "Schätzung und verpacktes Angebot abstimmen", paragraphs: ["Sobald Gewicht und Maße vorliegen, baust du die Schätzung neu auf. Kläre, ob der angezeigte Wert Istgewicht, Volumenergebnis oder bereits gerundetes Abrechnungsgewicht ist. Prüfe Ziel und Produkthinweise der vorgesehenen Route. Eine Abweichung ist nicht automatisch ein Fehler: Schutzmaterial, Verkäuferkartons, eine lange Seite oder eine Tarifstufe können sie erklären. Entscheidend ist, ob messbare Eingaben die Differenz nachvollziehbar machen.", "Wenn die Rechnung offen bleibt, stelle jeweils eine präzise Frage. Bitte um die erfassten Außenmaße, frage nach angewandten Verpackungsleistungen oder nach der Gewichtsregel. ‘Versand zu teuer’ ist schwer zu prüfen. Eine hilfreiche Nachricht nennt Maße, Route, angezeigtes Abrechnungsgewicht und die konkrete Lücke. Speichere die Antwort mit dem neuen Angebot."] },
      { title: "Vollständige Szenarien statt einzelner Coupons vergleichen", paragraphs: ["Baue mindestens zwei Gesamtmodelle: etwa Originalkartons plus stärkeres Tracking gegenüber kompakter Verpackung plus anderer zulässiger Linie. Nimm Verpackungsleistungen, Versicherung, Zahlungsumrechnung und mögliche Zielkosten in beide Modelle auf. Ein Coupon zählt erst, wenn Bedingungen, Ablaufdatum und berechtigte Route bestätigt sind. Sonst ist er nur eine Marketingzahl für ein vielleicht ungeeignetes Paket.", "Wähle die beste kontrollierte Gesamtlösung, nicht zwangsläufig die niedrigste Überschrift. Eine kleine Ersparnis ist schlecht, wenn die Route den Inhalt ausschließt oder die Verpackung einen strukturierten Artikel nicht mehr schützt. Umgekehrt kann teure Originalverpackung Volumen ohne echten Nutzen hinzufügen. Notiere den Grund der Wahl, damit die nächste Sendung nicht wieder bei null beginnt."] },
      { title: "Nach der Lieferung einen echten Kostenbeleg erstellen", paragraphs: ["Berechne Produkt, Inlandsfracht, Service oder Transaktion, internationalen Versand und tatsächlich gezahlte Zielkosten. Verteile Versand nicht allein nach Warenwert: Ein billiger, sperriger Artikel kann mehr Raum verbrauchen als ein kompakter teurer. Gewicht, Volumen oder eine einfache Produktgruppen-Regel ergeben oft ein realistischeres Bild der Kostentreiber.", "Speichere Datum, Route, Ziel, Gewicht, Maße, Laufzeit und Verpackung neben der Summe. Mehrere eigene Lieferungen werden so zum besten Prognosewerkzeug für deine Adresse und deinen Warenmix. Wenn die Gesamtkosten wiederholt über dem vorher gesetzten Limit liegen, ändere Produktmix oder Paketplan, statt auf die nächste Aktion zu hoffen."] },
    ],
    checklist: ["Jeden Betrag als bestätigt oder geschätzt markieren.", "Außenmaße und Abrechnungsgewicht mit dem Endangebot speichern."],
    faqs: [["Macht ein Coupon eine ungeeignete Route sinnvoll?", "Meist nicht. Berechtigung, Einschränkungen, Schutz und Endsumme müssen vor der Zahlung passen."]],
  },
  "hipobuy-warehouse-qc-photos": {
    visual: { label: "QC-Belegleiter", title: "Von Identität zu Zustand prüfen", intro: "Zuerst klären, was der Artikel ist; danach, wie gut er aussieht.", columns: ["Prüfung", "Frage", "Bester Beleg"], rows: [["Identität", "Bestellte Variante?", "Option, Etikett, Gesamtansicht"], ["Maß", "Passen die Abmessungen?", "Lesbares Band mit Endpunkten"], ["Zustand", "Ist die Abweichung relevant?", "Gesamtbild plus Detail"]] },
    sections: [
      { title: "Grenzen eines QC-Fotos verstehen", paragraphs: ["Ein Lagerfoto zeigt einen Artikel zu einem Zeitpunkt, unter einem Licht und aus wenigen Winkeln. Es kann Farbeindruck, Form, Etikett, Anzahl, Maße und sichtbare Schäden belegen. Dauerhaltbarkeit, Innenkonstruktion, Geruch, exakte Materialzusammensetzung oder individuelle Passform kann es nicht sicher beweisen. Entscheide nur über Fragen, die das Bildmaterial tatsächlich beantworten kann.", "Öffentliche Bewertungen loben häufig die QC-Fotos; zugleich berichten einzelne Käufer von Unzufriedenheit nach Erhalt. Beides ist möglich, weil QC Unsicherheit reduziert, nicht beseitigt. Ein verdeckter Mangel kann bleiben oder eine sichtbare Abweichung wurde bewusst akzeptiert. Lege deshalb deine Grenze vor dem Betrachten fest und wende sie auf jedes Produkt gleich an."] },
      { title: "Licht, Winkel und Vergleichsfehler kontrollieren", paragraphs: ["Farbe verändert sich durch Weißabgleich, Display und Reflexion. Vergleiche mehrere Bilder mit neutralem Hintergrund und suche nach stabilen Unterschieden, nicht nach kleinen Helligkeitsschwankungen zwischen Studiofoto und Lageraufnahme. Fehlendes Panel, falsche Grafik oder andere Hardware sind aussagekräftiger als ein einzelner Farbton unter anderem Licht.", "Auch Maße können täuschen. Ein Weitwinkel vergrößert die nahe Seite; ein Band ohne sichtbaren Nullpunkt erlaubt keine genaue Aussage. Bitte um flaches Maßband mit beiden Enden im Bild. Bei symmetrischen Artikeln vergleichst du gleiche Bezugspunkte links und rechts. So wird ein Eindruck zu einer wiederholbaren Kontrolle."] },
      { title: "Schwellen für wesentlich, klären und kosmetisch festlegen", paragraphs: ["Notiere vorab, welche Befunde Rückgabe bedeuten, welche ein weiteres Bild brauchen und welche du akzeptierst. Falsche Größe, fehlendes Teil, Riss oder defekter Verschluss können wesentlich sein; ein loser Faden oder eine Verpackungsfalte kann kosmetisch sein. Die Grenze ist persönlich, aber sie sollte vor Zeitdruck und bereits ausgegebenem Geld feststehen.", "Nutze nur drei Ergebnisse. Freigeben, wenn Identität, Maße und sichtbarer Zustand passen. Klären, wenn genau ein Beleg fehlt. Zurückgeben, wenn die sichtbare Abweichung die Grenze bereits überschreitet. Formuliere bei einer Zusatzaufnahme die Folgeentscheidung mit, etwa: behalten, wenn der Fleck abwischbar ist; zurückgeben, wenn es ein Schnitt ist."] },
      { title: "Belege bis nach der Zustellung aufbewahren", paragraphs: ["Speichere ausgewählte Option, Lagerdatensatz, Originalbilder, Zusatzanfrage und Freigabe gemeinsam. Bilder sollten nach Möglichkeit Artikelkennung und Datum enthalten. Lose Fotos lassen sich später schwer einem Fall zuordnen, besonders wenn ähnliche Artikel gleichzeitig im Lager liegen.", "Vergleiche bei Empfang wieder in derselben Reihenfolge: Identität, Maße soweit sinnvoll, Verarbeitung und Zustand. Fotografiere eine Differenz vor der Nutzung und beschreibe nur das Beobachtbare. Der Datensatz garantiert keine Lösung, macht aber klar, was freigegeben wurde, was ankam und an welcher Stelle sich ein sichtbarer Unterschied befindet."] },
    ],
    checklist: ["Grenzen für wesentlich, klären und kosmetisch vor dem QC festlegen.", "Artikelkennung mit jedem gespeicherten Bild behalten."],
    faqs: [["Soll ich Farbe nach einem Bild beurteilen?", "Nein. Vergleiche mehrere Aufnahmen und achte auf stabile Unterschiede statt kleine Helligkeitsverschiebungen."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    visual: { label: "Gewichtsentscheidung", title: "Die Waage zeigt nur die Hälfte", intro: "Außenmaße können die Abrechnung ändern, ohne den Inhalt zu verändern.", columns: ["Eingabe", "Bedeutung", "Beste Kontrolle"], rows: [["Istgewicht", "Masse des Pakets", "Unnötiges Material entfernen"], ["Maße", "Belegter Raum", "Passenden Außenkarton wählen"], ["Routenregel", "Umrechnung in Gebühr", "Teiler, Rundung und Limits lesen"]] },
    sections: [
      { title: "Erst die Routenregel, dann die Formel", paragraphs: ["Ein verbreitetes Modell multipliziert Länge, Breite und Höhe und teilt durch eine anbieterspezifische Zahl. Nicht die Multiplikation ist schwierig, sondern richtige Einheit, Teiler und Rundung. Verschiedene Linien können andere Regeln nutzen und diese ändern. Deshalb nennt dieser Ratgeber keinen angeblich universellen Hipobuy-Teiler. Verlässlich ist die aktuelle Beschreibung der konkret gewählten Route.", "Ein neutrales Beispiel zeigt die Wirkung: Wird das Paket bei gleicher Breite und Höhe zehn Prozent kürzer, fällt sein Rechenvolumen vor Rundung ungefähr ebenso. Überschreitet eine Seite jedoch eine Größenstufe, kann der Effekt stärker sein. Speichere deshalb alle drei Außenmaße in derselben Einheit und kläre, ob das Lager aufgerundet hat."] },
      { title: "Die schädliche Dimension finden", paragraphs: ["Bitte nicht zuerst pauschal um Umpacken. Finde heraus, ob allgemein Luft im Karton ist oder ein Artikel Länge, Breite oder Höhe vorgibt. Schuhkarton, Posterrolle und lose Textilien verlangen unterschiedliche Lösungen. Kleidung zu komprimieren hilft nicht, wenn ein langer Gegenstand die Paketlänge bestimmt.", "Erwarte bei Umpacken eine Vorher-Nachher-Messung und vergleiche auf derselben Route. Wenn Verpackung und Route gleichzeitig wechseln, bleibt die Ursache der Ersparnis unsichtbar. Notiere auch den entfernten Schutz. Ziel ist weniger leeres Volumen bei ausreichender Sicherheit, nicht das kleinstmögliche Paket um jeden Preis."] },
      { title: "Geteiltes und kombiniertes Paket fair modellieren", paragraphs: ["Ein Gesamtpaket kann Raum effizient nutzen und Grundaufwand sparen, aber ein Größen- oder Gewichtslimit überschreiten. Zwei Pakete öffnen vielleicht andere Linien, verdoppeln jedoch Karton und feste Gebühren. Vergleiche beide Varianten mit gleichem Ziel, Inhalt und Schutz und nimm Mindeststufen sowie Servicekosten mit auf.", "Oft entscheidet der dimensionsbestimmende Artikel. Eine steife Box getrennt zu senden kann weiche Waren kompakter machen; bei ohnehin kleinen Artikeln fügt eine Teilung nur Verpackung hinzu. Fordere Szenarien nur an, wenn die mögliche Differenz den Mehraufwand und zwei Tracking-Wege rechtfertigt."] },
      { title: "Eine geänderte Gebühr sachlich prüfen", paragraphs: ["Vergleiche bei einer neuen Quote Istgewicht, drei Maße, Route und Abrechnungsgewicht. Suche nach neuer Rundungsstufe, Verstärkung oder Messkorrektur. Sind die Eingaben gleich und die Gebühr anders, frage nach dem angewandten Tarif oder Zuschlag und bitte um die aktuelle Regel.", "Kritische Bewertungen nennen hohe Logistikkosten, doch ein hoher Betrag beweist allein keine Fehlberechnung. Umgekehrt ersetzt ein Plattformlabel keine nachvollziehbare Erklärung. Eine gute Anfrage zeigt altes Angebot, neue Messung und exakte Differenz. So kann ein Fehler leichter korrigiert oder eine bewusste Routenentscheidung getroffen werden."] },
    ],
    checklist: ["Vor der Rechnung die aktuelle Routenregel bestimmen.", "Umpacken mit Vorher-Nachher-Maßen auf derselben Route vergleichen."],
    faqs: [["Kann ich einen Teiler aus einem alten Forum nutzen?", "Nur für ein grobes Szenario. Einheit, Teiler und Rundung der aktuellen Route müssen vor Zahlung bestätigt werden."]],
  },
  "hipobuy-90-day-warehouse-storage": {
    visual: { label: "Zwei-Uhren-Plan", title: "Lagerzeit ist nicht Rückgabezeit", intro: "Die kürzere operative Frist steuert die nächste Aktion.", columns: ["Uhr", "Start", "Sichere Reaktion"], rows: [["Verkäuferrückgabe", "Verkäufer- oder Plattformereignis", "Schnell prüfen und entscheiden"], ["Lagerung", "Erfasster Lagereingang", "Mit Puffer bündeln"], ["Versandziel", "Eigener Bedarfstermin", "Rückwärts planen"]] },
    sections: [
      { title: "Den aktuellen Countdown je Artikel prüfen", paragraphs: ["Die 90 Tage stammen aus dem aktuellen App-Store-Text von Hipobuy und werden als kostenlose Lagerung zum Bündeln beschrieben. Für die Arbeit zählt trotzdem das Konto. Prüfe, ob die Zeit bei Eingang, nach Bearbeitung oder bei einem anderen Status beginnt und ob alle Artikel dieselbe Anzeige haben. Allgemeine Werbung klärt keine Ausnahme oder spätere Richtlinienänderung.", "Sichere Eingangsdatum und angezeigtes Ende und setze ein eigenes früheres Aktionsdatum. Fehlt ein klarer Countdown, frage mit Artikelkennung nach. Warte nicht bis zur letzten Woche, um einen falschen Startpunkt zu entdecken. Ein belastbarer Plan hängt an sichtbaren Datensätzen, nicht nur an einem Satz im Store."] },
      { title: "Wöchentlich prüfen statt ständig aktualisieren", paragraphs: ["Tägliches Refresh beschleunigt keinen Verkäufer; einen Monat nicht hinzusehen kann eine Rückgabe kosten. Sortiere einmal pro Woche in erwartet, eingetroffen ohne QC, Frage, Rückgabe läuft und bereit. Notiere, wer als Nächstes handeln muss und wann Schweigen eskaliert wird.", "Beende jede Prüfung mit einer Paketentscheidung, auch wenn sie ‘noch eine Woche warten’ lautet. Benenne, welche Eingänge das Warten rechtfertigen und was bei Ausbleiben geschieht. So verlängern optionale Käufe den Plan nicht endlos und ein kleines Paket wächst nicht unbemerkt zu einem sperrigen Mix mit neuen Einschränkungen."] },
      { title: "Frühe Auslöser für Teilen oder Stoppen festlegen", paragraphs: ["Definiere vorher Auslöser: Verkäufer verpasst die erwartete Frist, ein Artikel bleibt nach einer Beleganfrage offen, die geplante Route fällt weg oder die Gesamtschätzung überschreitet das Limit. Ein Auslöser erzwingt keine sofortige Sendung, sondern einen Vergleich konkreter Optionen: Artikel zurückgeben, fertige Gruppe senden oder keine weiteren Produkte hinzufügen.", "Nahe am Ende wirkt versunkene Zeit besonders stark. Warten macht einen ungeeigneten Artikel nicht besser. Vergleiche nur noch Kosten, Schutz, Route und Nutzen ab heute. Wenn eine aktuelle Kontowarnung dem alten Plan widerspricht, folgt die Entscheidung der aktuellen Anzeige. Ziel ist ein kontrollierter Abschluss, nicht die Nutzung jedes Werbetages."] },
      { title: "Vom tatsächlichen Bedarfstermin rückwärts planen", paragraphs: ["Lagerende ist kein Lieferdatum. Internationaler Transport, Ausfuhr, Zoll und letzte Meile folgen erst danach. Bei Reise, Geschenk oder Saison ziehst du vom Bedarfstermin konservative Laufzeit, Zollpuffer, Verpackungszeit und Entscheidungspuffer ab. ‘Bis zu fünf Tage’ ist ein beworbener Bestfall, kein Kalender für einen festen Termin.", "Wenn Zeit wichtiger als Bündelersparnis ist, sende früher. Bei flexibler Zeit hilft das Lager weiterhin, aber die wöchentliche Kontrolle bleibt. Prüfe die Route unmittelbar vor Abgabe erneut, weil Verfügbarkeit während des Wartens wechseln kann. Lagerung schafft Optionen; ohne Enddatum wird sie zum Risiko."] },
    ],
    checklist: ["Eingangsdatum und angezeigtes Ende sichern.", "Lagerstatus an einem festen Wochentag prüfen."],
    faqs: [["Sind 90 Tage zugleich eine Lieferzusage?", "Nein. Die Store-Angabe betrifft Lagerung; Verpackung, internationaler Transport, Zoll und Zustellung folgen getrennt."]],
  },
  "hipobuy-warehouse-return-checklist": {
    visual: { label: "Rückgabeakte", title: "Ein Anspruch, eine Beweiskette", intro: "Jeder Beleg beantwortet eine konkrete Frage.", columns: ["Frage", "Beleg", "Gewünschtes Ergebnis"], rows: [["Was bestellt?", "Option und Käuferhinweis", "Referenz"], ["Was eingetroffen?", "Übersicht und Detailfoto", "Abweichung oder Zustand"], ["Was soll geschehen?", "Frist und Gebührenregel", "Rückgabe, Tausch oder Klärung"]] },
    sections: [
      { title: "Bewertungsthemen nutzen, Behauptungen nicht als Beweis behandeln", paragraphs: ["Öffentliche Berichte nennen Rückgabe- oder Transaktionsgebühren, Stornierungen, verzögerte Erstattungen und schwierige Kommunikation; andere Nutzer schildern schnelle Hilfe. Kein Einzelpost beweist den Verlauf deines Falls oder ein Fehlverhalten. Die Themen zeigen aber, was festgehalten werden sollte: Annahme, konkrete Gebühr, Erstattungsziel und der Status, der Abschluss bedeutet.", "Lege dafür Felder in der Fallakte an: gewünschte Lösung, erwarteter Bruttobetrag, mögliche Inlands- oder Servicekosten, Rückzahlungsweg und angekündigter Bearbeitungsschritt. Notiere Beginn und Ende einer genannten Frist. Diese eigenen Daten sind für die Klärung wichtiger als der Hinweis auf eine fremde Bewertung."] },
      { title: "Die erste Nachricht handlungsfähig schreiben", paragraphs: ["Fünf Zeilen reichen oft: Bestellkennung, gekaufte Option, beobachtbare Abweichung, beigefügter Beleg und gewünschtes Ergebnis. Vermeide lange Vorwürfe vor den Fakten. Ein präziser Fall nennt etwa Größe M in der Bestellung, Größe L auf dem Lageretikett, die relevanten Bilder und den Wunsch nach Rückgabe oder Tausch vor der angezeigten Frist.", "Kann das Problem mit vorhandenen Bildern nicht belegt werden, fordere zuerst das fehlende Foto oder Maß an und nenne den Zusammenhang mit der Rückgabeentscheidung. Aktualisiere anschließend denselben Thread statt mehrere Gespräche zu öffnen. Eine Zeitleiste lässt sich prüfen und verhindert widersprüchliche Anweisungen."] },
      { title: "Annahme, Warenbewegung und Geld getrennt verfolgen", paragraphs: ["‘Anfrage erhalten’ bedeutet nicht automatisch Verkäuferannahme, Rücktransport oder abgeschlossene Erstattung. Gib jedem Ereignis Datum und Referenz. Frage, ob der Artikel zurückgeht, ob ein Ersatz einen neuen Lagerdatensatz erhält und ob Geld auf Kontoguthaben oder ursprüngliche Zahlungsart fließt. Verkäufer, Zahlungsweg und Rückgabegrund können den Ablauf verändern.", "Entferne den Artikel nach bestätigter Rückgabe aus der Paketplanung, behalte die Akte aber bis zum sichtbaren Geldabschluss. Bei Ersatz setzt du neue QC- und Bündelfristen. Eine Rückgabe verändert Logistik und Zahlung; nur eine Seite zu schließen hinterlässt ungeklärte Beträge oder ein weiterhin blockiertes Paket."] },
      { title: "Mit Zeitleiste statt Nachrichtenmenge eskalieren", paragraphs: ["Nach Ablauf der genannten Zeit folgt eine kurze Nachricht mit Anfragedatum, Annahmereferenz, letztem versprochenem Schritt und genau dem fehlenden Status. Hänge frühere Belege an, statt alles neu zu erzählen. Nutze einen formalen Streit- oder Eskalationsweg innerhalb der sichtbaren Frist und veröffentliche keine persönlichen Zahlungs- oder Bestelldaten.", "Am Ende notierst du Warenwert, einbehaltene Gebühren, Erstattungsbetrag, Ziel und Abschlussdatum. Bei Abweichung bittest du um eine Einzelaufstellung, ohne automatisch einen Fehler zu unterstellen. Aktualisiere anschließend Verkäufer- und Produktnotizen, damit die Ursache die nächste Beschaffung verbessert."] },
    ],
    checklist: ["Annahme, Rücktransport und Erstattung als getrennte Ereignisse protokollieren.", "Fall bis zum sichtbaren finanziellen Abschluss behalten."],
    faqs: [["Soll ich Zahlungsbilder öffentlich posten, um Druck zu machen?", "Nein. Nutze Support oder Streitweg und entferne persönliche, Adress-, Bestell- und Zahlungsdaten aus öffentlichen Beiträgen."]],
  },
};

const reviewDe: FullArticle = {
  lead: "Ein brauchbarer Hipobuy-Test ist weder eine einzelne Sternezahl noch eine Sammlung dramatischer Screenshots. Öffentliche Quellen zeigen unterschiedliche Signale: Die offiziellen App-Einträge beschreiben einen umfangreichen Einkaufsagenten, Store-Wertungen unterscheiden sich nach Land, Nutzer loben QC und Support, andere kritisieren Versandkosten, Erstattungen oder unklare Schritte. Diese Auswertung trennt die Quellen, nennt ihre Grenzen und macht daraus konkrete Prüfungen vor einem großen Paket.",
  keyPoints: ["Offizielle Funktionen erklären das Angebot, garantieren aber kein einzelnes Ergebnis.", "App-Store-Wertungen gehören zu einem Land und sind keine globale Note.", "Bewertungen zeigen wiederkehrende Fragen, beweisen aber nicht jede Aussage.", "Ein kleiner dokumentierter Test mit Kosten- und QC-Grenze ist aussagekräftiger."],
  visual: { label: "Quellenkarte", title: "Was öffentliche Quellen wirklich aussagen", intro: "Die Schlussfolgerung darf nicht größer als der Beleg sein.", columns: ["Quelle", "Nützliches Signal", "Grenze"], rows: [["Offizieller App-Eintrag", "Funktionen und beworbene Bedingungen", "Selbstdarstellung, veränderlich"], ["Store-Wertung", "Stimmung im jeweiligen Store", "Land, Version, Auswahl"], ["Einzelbewertung", "Zu prüfende Stärke oder Schwäche", "Nicht geprüfte Einzelerfahrung"]] },
  sections: [
    { title: "Was Hipobuy öffentlich über den Dienst sagt", paragraphs: ["Google Play beschreibt Hipobuy als globale Einkaufs-App für Produkte von chinesischen Marktplätzen wie Taobao und 1688. Genannt werden Kaufabwicklung, Lager und internationaler Versand, rund um die Uhr verfügbare Einkäufer, 90 Tage kostenlose Lagerung, mehr als 200 Zielländer, zahlreiche Routen und Lieferung in bis zu fünf Tagen. Am 14. August 2026 zeigte Google Play mehr als 500.000 Downloads.", "Die öffentliche Startseite wirbt zusätzlich mit mehr als 100.000 Auswahlmöglichkeiten, Coupons, App-Download und PayPal, Klarna, Visa, Mastercard sowie JCB. Das belegt die Vermarktung, nicht die Verfügbarkeit in jedem Konto. Route, Laufzeit, Zahlungsart und Richtlinie müssen für Land, Produkt und Zeitpunkt live geprüft werden."] },
    { title: "Warum eine Sternezahl nicht alle Nutzer beschreibt", paragraphs: ["Im US-App-Store standen zum Recherchezeitpunkt 3,1 von 5 bei 261 Bewertungen, im kanadischen Store 3,9 bei 62. Google Play zeigte ungefähr vier Sterne und mehr als 500.000 Downloads; selbst die angezeigte Zahl der Rezensionen war innerhalb der Seite nicht völlig einheitlich. Das sind Momentaufnahmen. Vor allem darf die US-Note nicht als weltweite Hipobuy-Wertung bezeichnet werden.", "Eine Zahl vermischt App-Oberfläche, Verkäuferprodukt, Zolltransport und Rückzahlung. Versionen und Routen ändern sich, und sehr zufriedene oder verärgerte Nutzer schreiben eher. Eine seriöse Auswertung nennt Store, Land und Datum und liest anschließend die Gründe hinter den Sternen."] },
    { title: "Was positive Bewertungen häufig schätzen", paragraphs: ["Positive Beiträge nennen oft verständliche Bestellung, brauchbare Lagerfotos, schnelle Antworten, sorgfältige Verpackung, Tracking und eine Laufzeit innerhalb der Erwartung. Diese Punkte entsprechen der Aufgabe eines Einkaufsagenten und lassen sich im eigenen Test direkt beobachten.", "Trotzdem beweist eine schnelle Antwort keinen Servicelevel für jede Sprache und eine Wochenlieferung keine andere Route. Produktqualität kann stärker vom Drittverkäufer abhängen. Verwende Lob deshalb als Prüffrage: Sind die Fotos klar, beantwortet Support die konkrete Frage und erklärt das Tracking Ausnahmen?"] },
    { title: "Welche Fragen kritische Bewertungen aufwerfen", paragraphs: ["Kritische Posts betreffen häufig spät verstandene oder hohe internationale Kosten, Rückgabe- und Transaktionsgebühren, Stornierungen, Erstattungsdauer, langsame Kommunikation und eine für Einsteiger unklare Kostenanzeige. Es sind Nutzerbehauptungen, keine Feststellung von Betrug oder typischem Verhalten. Oft fehlen Maße, Ziel, Einschränkungen und endgültige Lösung.", "Die wiederkehrenden Themen führen zu Kontrollen: Produkt- und Versandbudget trennen, Rückgabegebühren und Rückzahlungsweg früh klären, Gewicht, Maße und Routenregel speichern und eine einzige Support-Zeitleiste führen. So wird Kritik weder verschwiegen noch ungeprüft übernommen."] },
    { title: "Der Trustpilot-Hinweis verändert die Bewertung", paragraphs: ["Trustpilot zeigt derzeit keine Unternehmenswertung, weil ein Verstoß gegen Richtlinien festgestellt wurde, und erklärt, mehrere gefälschte Bewertungen entfernt zu haben. Einzelne positive und negative Beiträge bleiben sichtbar. Deshalb wäre es irreführend, eine frühere Verteilung als sauberen Vertrauenswert zu bewerben oder nur Lobzitate auszuwählen.", "Der Hinweis beweist nicht, dass jede verbleibende Bewertung falsch ist. Plattformen moderieren nach eigenen Verfahren; Beiträge bleiben Meinungen. Sinnvoll ist nur eine thematische Auswertung mit sichtbarem Warnhinweis, ohne Superlative und ohne fremde Kundenbilder oder Bestelldaten als Werbung zu übernehmen."] },
    { title: "So läuft ein fairer Test vor einer großen Bestellung", paragraphs: ["Wähle einen günstigen, klar definierten und messbaren Artikel. Sichere Angebot, Variante, Produktpreis, Inlandsporto und Zahlungssumme. Lege Gesamtkostenlimit und Abbruchregel fest. Im Lager misst du Statusdauer, Bildqualität und Reaktion auf genau eine zusätzliche Beleganfrage.", "Danach speicherst du Istgewicht, drei Maße, Abrechnungsgewicht, mögliche Routen, Verpackung und Endpreis. Ändere nicht mehrere Variablen gleichzeitig. Sende nur, wenn Summe, Schutz und Tracking die vorherige Regel erfüllen, und vergleiche bei Empfang mit dem QC-Datensatz."] },
    { title: "Abgewogenes Urteil: brauchbarer Ablauf, variable Ergebnisse", paragraphs: ["Belegt ist eine öffentlich gelistete Einkaufs-App mit erheblicher Google-Play-Nutzung und einem Ablauf aus Kauf, Lager und internationalem Versand. Werbung betont Reichweite, Lagerzeit, Tempo und Hilfe. Nutzerfeedback zeigt sowohl Nutzen von Oberfläche, QC und Support als auch Frust über Versand, Erstattungen und Kommunikation. Länderscores unterscheiden sich; der Trustpilot-Hinweis schwächt einen einfachen Reputationswert.", "Daraus folgt weder ‘immer sicher, billig und schnell’ noch ‘jede Beschwerde ist typisch’. Das Ergebnis hängt von Verkäufer, Lagerbeleg, Verpackung, Route, Land und Nutzerentscheidung ab. Ein kleiner Test, getrenntes Versandbudget, gespeichertes QC und klare Rückgabefrist sind die belastbarste Grundlage."] },
  ],
  checklist: ["Store-Land und Datum jeder Wertung nennen.", "Werbeangaben und Nutzerberichte trennen.", "Produktbudget und Versandlimit getrennt setzen.", "Mit einem klar messbaren Artikel testen.", "Angebot, Zahlung, QC, Paket und Route sichern.", "Rückgabefrist und Rückzahlungsweg früh klären.", "Support mit einer konkreten Frage bewerten.", "Keine persönlichen Bestell- oder Zahlungsdaten veröffentlichen."],
  faqs: [["Ist Hipobuy seriös?", "Öffentliche App-Einträge und Downloads zeigen einen aktiven Dienst, garantieren aber weder Verkäuferqualität, Versandkosten, Erstattung noch ein bestimmtes Ergebnis."], ["Welche Bewertung hat Hipobuy?", "Es gibt keine einzige globale Note. Werte unterscheiden sich nach Store und Land; Trustpilot zeigt die Unternehmenswertung derzeit nach einem Richtlinienverstoß nicht an."], ["Sind Hipobuy-Bewertungen zuverlässig?", "Behandle sie als ungeprüfte Einzelerfahrungen, suche Themen, nenne Warnhinweise und prüfe Entscheidungen mit eigenen Kontodaten."], ["Was sollte ein Einsteiger testen?", "Variantenrichtigkeit, QC-Nutzen, Gebührentransparenz, Maße, Route, Support und Gesamtkosten."]],
};

const es: Record<LegacySlug, ArticleExpansion> = {
  "how-to-buy-with-hipobuy": {
    visual: { label: "Mapa de decisiones", title: "Cinco controles entre el enlace y la entrega", intro: "Superar una fase no aprueba automáticamente la siguiente.", columns: ["Control", "Prueba que guardas", "Decisión"], rows: [["Anuncio", "Vendedor, variante, precio fechado", "Pedir o investigar"], ["Almacén", "Entrada, fotos QC, medidas", "Aceptar, preguntar o devolver"], ["Paquete", "Peso, medidas, reglas de ruta", "Reembalar, dividir o enviar"]] },
    sections: [
      { title: "Leer las promesas de la plataforma como punto de partida", paragraphs: ["La ficha actual de Google Play presenta Hipobuy como un servicio para comprar en mercados chinos como Taobao y 1688. Anuncia 90 días de almacenamiento gratuito, servicio en más de 200 países, compradores disponibles las 24 horas, miles de opciones de envío y entregas desde cinco días. Estas afirmaciones describen el flujo previsto, pero no garantizan una ruta o plazo para un producto, dirección y fecha concretos. Úsalas como preguntas que debes confirmar en la cuenta activa.", "La página pública muestra PayPal, Klarna, Visa, Mastercard y JCB. La opción disponible puede depender del país, la cuenta y el checkout. Prueba el método previsto con un pedido asumible, revisa el total después del cambio de moneda y guarda la confirmación. Un logotipo no explica por sí solo el tipo de cambio, la vía del reembolso, el plazo de proceso ni la protección aplicable."] },
      { title: "Crear un presupuesto que aguante la fase de almacén", paragraphs: ["Separa tres cifras: producto confirmado, estimación de transporte nacional y servicios, y rango de envío internacional. Antes de embalar, un rango es más honesto que una cifra falsa de precisión. Modela un paquete compacto y otro voluminoso. Cajas de calzado, embalajes rígidos y prendas acolchadas pueden cambiar las medidas mucho más de lo que su precio sugiere. Define por adelantado el total a partir del cual ya no comprarías.", "Las opiniones públicas muestran por qué importa. Algunos usuarios valoran el proceso, las fotos QC y la atención; otros dicen que el envío internacional apareció más tarde o costó más de lo previsto, o que el reembolso fue difícil de seguir. Son experiencias individuales, no estadísticas auditadas. Aun así revelan un riesgo: el principiante imagina el pago del producto y la entrega final como un solo precio. Escríbelos en líneas distintas antes de pedir."] },
      { title: "Hacer un pedido pequeño antes de construir un haul grande", paragraphs: ["El primer pedido debe probar el sistema, no maximizar el ahorro. Elige un artículo de variante clara, fácil de medir en fotos y cuyo valor no cause presión si tarda más. Observa cambios de estado, etiqueta de almacén, utilidad de las imágenes y plazo de devolución mostrado. Registra fechas. Un ciclo controlado enseña más que publicaciones promocionales sobre otros países, rutas y productos.", "Después compara expectativa y realidad. ¿Tardó más el transporte nacional? ¿Las fotos respondieron tus dudas? ¿El tamaño embalado se acercó a la estimación? ¿Viste cada tasa antes de pagar? Convierte las respuestas en reglas: máximo de casos abiertos, última fecha de consolidación y límite de coste. No buscas asegurar que todos los pedidos serán iguales, sino crear un método repetible."] },
      { title: "Proteger la entrega y el historial final", paragraphs: ["Antes de pagar el envío guarda ruta, contenido declarado, peso facturable, tres dimensiones, servicios de embalaje, destino y total. Si existe seguro o compensación, lee qué eventos y pruebas cubre. Con tracking activo, vigila excepciones: una petición de datos, retención aduanera o intento fallido exige otra respuesta que una pausa normal de tránsito.", "Fotografía el exterior dañado antes de abrir, con la etiqueta visible. Compara el contenido con el registro de almacén y conserva, incluso si todo sale bien, número de artículos, peso, medidas, ruta, tiempo y coste total. Tus propios datos de paquetes comparables son más útiles para la próxima decisión que el envío excepcionalmente rápido o caro de otra persona."] },
    ],
    checklist: ["Separar en el presupuesto producto y envío internacional.", "Probar el método de pago previsto con un pedido manejable."],
    faqs: [["¿Muchas descargas prueban que mi pedido irá bien?", "No. Miden adopción, no disponibilidad de ruta, calidad del vendedor, claridad de tasas ni el resultado de tu paquete."]],
  },
  "hipobuy-shipping-cost-guide": {
    visual: { label: "Modelo de costes", title: "La cotización tiene capas", intro: "Separa importes confirmados de estimaciones para ver la incertidumbre.", columns: ["Capa", "Cuándo se conoce", "Qué la cambia"], rows: [["Producto + nacional", "Pedido o salida del vendedor", "Variante, transporte, conversión"], ["Paquete + ruta", "Después del embalaje", "Peso, medidas, límites, protección"], ["Destino", "Según ruta y país", "Impuestos, aduana, última milla"]] },
    sections: [
      { title: "Usar reseñas para encontrar dudas, no copiar precios", paragraphs: ["El envío aparece en opiniones positivas y negativas. Unos describen plazos razonables, embalaje intacto o buen tracking; otros afirman que la tarifa internacional fue alta o se entendió tarde. No es una muestra controlada: cambian país, forma, ruta, promoción y expectativa. La conclusión responsable no es ‘siempre barato’ ni ‘siempre caro’, sino que la cotización final necesita aprobación independiente.", "Una reseña que asocia cuatro kilos a un precio no es una tarifa. Suele omitir medidas, peso facturable, código postal, restricciones, protección, cambio y fecha. Úsala para formular preguntas —volumen, cajas, ruta, tracking— y contéstalas con tu propio paquete. Así la anécdota sirve como lista de auditoría sin fingir que predice tu factura."] },
      { title: "Conciliar la estimación con el paquete real", paragraphs: ["Cuando el almacén mida, reconstruye el cálculo. Confirma si ves peso de báscula, resultado volumétrico o peso facturable ya redondeado; verifica destino y restricciones. Una diferencia no es automáticamente un error: protección, cajas del vendedor, un lado largo o una banda tarifaria pueden explicarla. El objetivo es relacionarla con datos observables.", "Si no cuadra, pregunta una cosa cada vez: dimensiones exteriores registradas, servicio de embalaje o regla de peso. ‘El envío es caro’ no permite investigar. Un mensaje útil da medidas, ruta, peso facturable y diferencia exacta. Guarda la respuesta junto a la cotización revisada."] },
      { title: "Comparar escenarios completos, no cupones aislados", paragraphs: ["Construye al menos dos opciones: cajas originales y tracking más fuerte frente a embalaje compacto y otra línea elegible. Incluye reembalaje, seguro, conversión de pago y posibles costes de destino. Un cupón entra en el modelo solo después de confirmar condiciones, caducidad y ruta. De otro modo es una cifra publicitaria para un paquete que quizá no cumple.", "Elige el total mejor controlado, no necesariamente el titular más bajo. Ahorrar poco no compensa una ruta que excluye el contenido o un embalaje que deja sin protección una pieza rígida. A la inversa, una caja original puede sumar volumen sin proteger mejor. Anota por qué gana un escenario; facilitará el siguiente envío."] },
      { title: "Crear un registro de coste después de la entrega", paragraphs: ["Suma producto, transporte nacional, servicios, transacción, envío internacional y cantidades de destino realmente pagadas. No repartas el envío solo por valor: un artículo barato y voluminoso puede consumir más capacidad que otro compacto y caro. Peso, volumen o una regla por categoría reflejan mejor qué encareció el paquete.", "Guarda fecha, ruta, destino, peso, medidas, tránsito y embalaje junto al total. Varias entregas propias forman el mejor pronóstico para tu dirección y mezcla de productos. Si el total supera repetidamente el límite previo, cambia artículos o plan de paquete en lugar de depender de otra promoción."] },
    ],
    checklist: ["Marcar cada importe como confirmado o estimado.", "Guardar dimensiones y peso facturable con la cotización final."],
    faqs: [["¿Un cupón compensa una ruta inadecuada?", "Normalmente no. Comprueba elegibilidad, límites, protección y total antes de considerarlo ahorro."]],
  },
  "hipobuy-warehouse-qc-photos": {
    visual: { label: "Escalera de pruebas QC", title: "De la identidad al estado", intro: "Comprueba qué es el producto antes de discutir cómo se ve.", columns: ["Paso", "Pregunta", "Mejor prueba"], rows: [["Identidad", "¿Es la variante pedida?", "Opción, etiqueta y vista general"], ["Escala", "¿Sirven las medidas?", "Cinta legible con extremos"], ["Estado", "¿La diferencia importa?", "Vista amplia y detalle"]] },
    sections: [
      { title: "Entender lo que una foto QC demuestra", paragraphs: ["Una imagen registra un artículo, un momento, una luz y pocos ángulos. Puede demostrar familia de color, forma visible, etiqueta, cantidad, medida y daño superficial. No prueba bien durabilidad, construcción interior, olor, composición exacta ni ajuste personal. Una foto atractiva puede crear más confianza que evidencia. Decide solo sobre preguntas que las imágenes pueden responder.", "Reseñas públicas elogian a menudo las fotos QC y otras personas siguen insatisfechas al recibir. Ambas cosas pueden ser ciertas: QC reduce incertidumbre, no la elimina. Puede quedar un defecto oculto o el comprador aceptar una variación visible. Define tu umbral antes de ver las fotos y aplícalo siempre."] },
      { title: "Controlar luz, ángulo y sesgo de comparación", paragraphs: ["El color cambia con balance de blancos, pantalla y reflejos. Compara varios fotogramas con fondo neutro y busca diferencias estables; no enfrentes píxel a píxel una foto de estudio y otra de almacén. Un panel ausente, gráfico equivocado o herraje distinto pesa más que un pequeño cambio de brillo.", "La escala también engaña. Un gran angular agranda el extremo cercano y una cinta sin cero visible no da medida exacta. Pide la cinta plana con ambos puntos. En objetos simétricos, compara referencias equivalentes a ambos lados. Estos controles convierten una impresión en revisión repetible."] },
      { title: "Fijar límites materiales y cosméticos", paragraphs: ["Anota qué exige devolución, qué pide una foto más y qué aceptarás. Talla incorrecta, pieza ausente, rotura o cierre inutilizable pueden ser materiales; un hilo suelto o pliegue del embalaje puede ser cosmético según el producto. No existe un umbral universal, pero debe fijarse antes de que influyan la prisa y el dinero ya gastado.", "Usa tres resultados. Aprueba cuando identidad, medidas y estado cumplen. Pregunta cuando una prueba concreta resolverá la decisión. Devuelve cuando la diferencia observable ya supera el límite. Al pedir otra foto escribe la consecuencia, por ejemplo: conservar si la marca se limpia; devolver si es un corte."] },
      { title: "Conservar la prueba después de la salida", paragraphs: ["Guarda opción, registro de almacén, fotos originales, petición extra y aprobación juntos. Incluye identificador y fecha cuando sea posible. Fotos sueltas son difíciles de asociar, sobre todo con artículos parecidos.", "Al recibir, compara en el mismo orden: identidad, medidas cuando proceda, construcción y estado. Fotografía una diferencia antes de usarla y describe solo lo visible. No garantiza solución, pero permite mostrar qué se aprobó, qué llegó y dónde aparece el cambio."] },
    ],
    checklist: ["Definir antes del QC los límites material, dudoso y cosmético.", "Guardar el identificador junto a cada imagen."],
    faqs: [["¿Debo juzgar el color con una sola foto?", "No. Compara varios fotogramas y busca diferencias constantes, no pequeños cambios de brillo."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    visual: { label: "Decisión de peso", title: "La báscula solo cuenta la mitad", intro: "Las medidas pueden cambiar el cobro sin cambiar el contenido.", columns: ["Dato", "Qué mide", "Mejor control"], rows: [["Peso real", "Masa del paquete", "Quitar material innecesario"], ["Dimensiones", "Espacio ocupado", "Ajustar la caja exterior"], ["Regla de ruta", "Conversión a tarifa", "Leer divisor, redondeo y límites"]] },
    sections: [
      { title: "Identificar la regla antes de usar una fórmula", paragraphs: ["Un modelo habitual multiplica largo, ancho y alto y divide por una cifra del transportista. Lo difícil es usar unidad, divisor y redondeo correctos. Diferentes rutas pueden aplicar normas distintas y cambiarlas. Por eso no publicamos un divisor universal de Hipobuy: la referencia fiable es la descripción activa de la ruta del paquete.", "Ejemplo neutral: si el largo baja un diez por ciento y ancho y alto no cambian, el volumen calculado baja aproximadamente lo mismo antes de redondear. Pero cruzar una banda de tamaño puede alterar más el precio. Registra las tres medidas exteriores en una unidad y si fueron redondeadas."] },
      { title: "Encontrar la dimensión que causa el problema", paragraphs: ["No pidas ‘reembalar’ sin diagnóstico. Averigua si hay aire general o si un producto fija largo, ancho o alto. Caja de zapatos, tubo y prendas blandas necesitan cambios distintos. Comprimir ropa no acorta un objeto largo.", "Pide medidas antes y después y compara sobre la misma ruta. Si cambias embalaje y línea a la vez no sabrás qué produjo la diferencia. Registra también la protección retirada. La optimización correcta elimina vacío manteniendo seguridad; no persigue la caja mínima a cualquier precio."] },
      { title: "Modelar paquete unido y dividido con las mismas reglas", paragraphs: ["Un paquete unido puede aprovechar espacio y reducir bases fijas, pero superar límites. Dos pequeños acceden quizá a otras líneas, aunque duplican caja y cargos. Compara destino, contenido y protección iguales, incluyendo mínimos y servicios.", "Suele decidir el artículo que fija la dimensión. Separar una caja rígida puede dejar que el resto blando se compacte; dividir artículos ya compactos puede añadir más cartón. Solicita escenarios solo si el posible ahorro compensa gestión y dos seguimientos."] },
      { title: "Auditar un cobro revisado sin concluir demasiado pronto", paragraphs: ["Compara peso real, tres medidas, ruta y peso facturable antes y después. Busca nuevo escalón, refuerzo o medición. Si los datos son iguales y el cobro cambia, pregunta qué tarifa o ajuste se aplicó y pide la regla vigente.", "Reseñas críticas mencionan logística cara, pero una cifra alta no demuestra cálculo incorrecto. Tampoco basta una etiqueta sin explicación. El mensaje eficaz presenta cotización anterior, medición final y diferencia exacta; facilita corregir o decidir no usar esa ruta."] },
    ],
    checklist: ["Identificar la regla actual de ruta antes de calcular.", "Comparar reembalaje con medidas antes y después en la misma ruta."],
    faqs: [["¿Puedo usar un divisor de un foro antiguo?", "Solo para una hipótesis. Confirma divisor, unidades y redondeo actuales antes de pagar."]],
  },
  "hipobuy-90-day-warehouse-storage": {
    visual: { label: "Plan de dos relojes", title: "Almacenamiento y devolución no son lo mismo", intro: "El plazo operativo más corto manda.", columns: ["Reloj", "Inicio", "Respuesta segura"], rows: [["Devolución", "Evento del vendedor o plataforma", "Revisar y decidir pronto"], ["Almacén", "Entrada registrada", "Consolidar con margen"], ["Entrega necesaria", "Fecha propia", "Planificar hacia atrás"]] },
    sections: [
      { title: "Comprobar el contador activo de cada artículo", paragraphs: ["Los 90 días proceden de la descripción pública actual, que los presenta como almacenamiento gratuito para unir pedidos. Para operar, manda la cuenta. Averigua si empieza en la recepción, tras el proceso u otro estado, y si todos los artículos muestran igual regla. La publicidad general no resuelve excepciones ni cambios.", "Guarda fecha de llegada y vencimiento mostrado, y fija una acción anterior. Si no hay contador claro, pregunta con el identificador. No esperes a la última semana para descubrir un inicio distinto. Un plan sólido se apoya en registros visibles."] },
      { title: "Revisión semanal en lugar de vigilancia constante", paragraphs: ["Actualizar a diario no acelera al vendedor, pero ignorar el almacén puede perder una devolución. Cada semana clasifica: esperado, recibido sin QC, pregunta, devolución en curso y listo. Anota quién actúa y cuándo el silencio debe escalarse.", "Cierra cada revisión con una decisión de paquete, aunque sea esperar siete días más. Di qué llegada justifica la espera y qué harás si falta. Así las compras opcionales no alargan el plan y un paquete pequeño no se convierte sin control en una mezcla voluminosa."] },
      { title: "Definir disparadores para dividir o detener", paragraphs: ["Fija eventos: vendedor fuera de plazo, artículo aún dudoso tras pedir prueba, pérdida de ruta o presupuesto superado. El disparador obliga a comparar opciones —devolver, enviar lo listo o dejar de añadir—, no necesariamente a enviar de inmediato.", "Cerca del final pesa el coste hundido. El tiempo esperado no mejora un artículo inadecuado. Compara desde hoy coste, protección, ruta y valor de esperar. Si la cuenta muestra una advertencia distinta del plan antiguo, sigue la información actual. El objetivo es una salida controlada, no gastar todos los días anunciados."] },
      { title: "Planificar hacia atrás desde la fecha real", paragraphs: ["El fin de almacenaje no es la entrega. Después vienen preparación, tránsito, aduana y última milla. Para viaje, regalo o temporada, resta un tránsito prudente, margen aduanero, embalaje y decisión. ‘Desde cinco días’ es el mejor caso publicitado, no un calendario garantizado.", "Si el tiempo importa más que consolidar, envía antes. Si es flexible, conserva la disciplina semanal y vuelve a comprobar la ruta justo antes de presentar el paquete. El almacén crea opciones; sin fecha final puede crear demora."] },
    ],
    checklist: ["Guardar llegada y vencimiento mostrado.", "Revisar el almacén un día fijo cada semana."],
    faqs: [["¿Los 90 días incluyen la entrega?", "No. La afirmación se refiere al almacenamiento; embalaje, tránsito, aduana y última milla van después."]],
  },
  "hipobuy-warehouse-return-checklist": {
    visual: { label: "Expediente de devolución", title: "Una reclamación, una cadena de pruebas", intro: "Cada documento responde una pregunta concreta.", columns: ["Pregunta", "Prueba", "Resultado"], rows: [["¿Qué pedí?", "Opción y nota", "Referencia"], ["¿Qué llegó?", "Vista y detalle de almacén", "Diferencia o estado"], ["¿Qué debe pasar?", "Plazo y tasas", "Devolver, cambiar o aclarar"]] },
    sections: [
      { title: "Aprender de las reseñas sin convertir acusaciones en hechos", paragraphs: ["Opiniones públicas mencionan tasas de devolución o transacción, cancelaciones, reembolsos tardíos y comunicación difícil; otras hablan de ayuda rápida. Ningún comentario prueba tu caso ni una conducta general. Sí revela campos que conviene controlar: aceptación, tasa, destino del dinero y estado que significa cierre.", "Registra solución solicitada, importe esperado, transporte nacional o servicio, vía de devolución y etapa prometida. Si dan un plazo, anota cuándo comienza y cuándo preguntarás. Tu expediente es más útil que discutir con la historia de otra persona."] },
      { title: "Escribir un primer mensaje accionable", paragraphs: ["Usa cinco líneas: pedido, opción, diferencia observable, prueba y resultado. Evita etiquetas emocionales antes de los datos. Por ejemplo: pedido talla M, etiqueta de almacén L, imágenes adjuntas y solicitud de devolución o cambio antes del plazo.", "Si las fotos no prueban el problema, pide etiqueta, medida o detalle y explica que afecta a la devolución. Continúa en el mismo hilo. Una cronología reduce instrucciones contradictorias y facilita revisar quién dijo qué."] },
      { title: "Separar aceptación, movimiento y dinero", paragraphs: ["‘Solicitud recibida’ no implica aceptación del vendedor, devolución física ni reembolso. Da fecha y referencia a cada evento. Pregunta si el artículo vuelve, si el reemplazo crea nuevo registro y si el dinero llega al saldo o al método original. Depende del vendedor, pago y motivo.", "Quita el artículo del plan de paquete tras la devolución confirmada, pero conserva el caso hasta ver el resultado financiero. Un reemplazo necesita nuevas fechas de QC y consolidación. La devolución cambia logística y dinero; cerrar solo una parte deja una incógnita."] },
      { title: "Escalar con cronología, no con más mensajes", paragraphs: ["Al vencer el plazo, envía fecha de solicitud, referencia de aceptación, último paso prometido y estado que falta. Adjunta la prueba anterior y usa la vía formal dentro del plazo. No publiques datos personales, dirección, pedido o pago.", "Al cerrar, registra valor bruto, tasas retenidas, reembolso, destino y fecha. Si difiere de lo escrito, pide desglose sin asumir error. Actualiza tus notas de vendedor y producto para que la causa mejore la próxima compra."] },
    ],
    checklist: ["Registrar aceptación, retorno físico y reembolso como eventos distintos.", "Conservar el caso hasta ver el resultado financiero."],
    faqs: [["¿Debo publicar capturas de pago para conseguir respuesta?", "No. Usa soporte o disputa y elimina datos personales, de dirección, pedido y pago de cualquier publicación."]],
  },
};

const reviewEs: FullArticle = {
  lead: "Una reseña útil de Hipobuy no cabe en una estrella ni en capturas dramáticas. Las fuentes públicas cuentan historias distintas: las fichas oficiales describen un agente de compra global, las valoraciones cambian por país, unos usuarios destacan QC y soporte y otros cuestionan envío, reembolsos o pasos poco claros. Esta revisión separa señales, explica límites y las convierte en controles antes de comprometer un paquete grande.",
  keyPoints: ["Las funciones oficiales explican el servicio, no garantizan un pedido.", "Las notas de App Store pertenecen a cada país y no son globales.", "Las opiniones detectan preguntas recurrentes, no prueban toda acusación o promesa.", "La mejor evaluación es un pedido pequeño documentado con límites previos."],
  visual: { label: "Mapa de pruebas", title: "Qué puede decir cada fuente", intro: "La conclusión debe quedarse dentro del límite de la prueba.", columns: ["Fuente", "Señal útil", "Límite"], rows: [["Ficha oficial", "Funciones y términos anunciados", "Autodescripción cambiante"], ["Valoración de tienda", "Sentimiento de ese país", "País, versión y selección"], ["Reseña pública", "Temas que investigar", "Experiencia individual no auditada"]] },
  sections: [
    { title: "Lo que Hipobuy dice públicamente", paragraphs: ["Google Play presenta Hipobuy como una app para comprar en Taobao y 1688 con compra, almacén y envío internacional. Anuncia compradores 24/7, 90 días de almacenamiento gratuito, más de 200 países, miles de rutas y entrega desde cinco días. El 14 de agosto de 2026 mostraba más de 500.000 descargas.", "La página pública promociona más de 100.000 opciones, cupones, descarga y PayPal, Klarna, Visa, Mastercard y JCB. Eso demuestra el mensaje comercial, no lo que verá cada cuenta. Ruta, plazo, pago y política deben confirmarse según país, producto y fecha."] },
    { title: "Por qué una nota no describe a todos", paragraphs: ["La App Store de Estados Unidos mostraba 3,1 sobre 5 con 261 valoraciones, mientras Canadá mostraba 3,9 con 62. Google Play rondaba cuatro estrellas y superaba 500.000 descargas, aunque la cifra de reseñas variaba dentro de la página. Son capturas. Presentar la nota estadounidense como global sería incorrecto.", "Una estrella puede valorar interfaz, producto del vendedor, aduana o reembolso. Cambian versión, rutas y motivación para opinar. Una revisión responsable cita tienda, país y fecha, y después analiza los motivos."] },
    { title: "Qué valoran las opiniones positivas", paragraphs: ["Se repiten proceso comprensible, fotos QC útiles, atención rápida, embalaje cuidado, actualizaciones y entrega dentro de lo esperado. Son funciones centrales de un agente y se pueden probar directamente.", "Pero una respuesta rápida no establece nivel de servicio universal y una entrega semanal no predice otra ruta. La calidad puede depender del vendedor. Convierte el elogio en preguntas: ¿las fotos resuelven?, ¿soporte contesta lo concreto?, ¿tracking explica incidencias?"] },
    { title: "Qué cuestionan las opiniones críticas", paragraphs: ["Las críticas suelen hablar de envío internacional alto o entendido tarde, tasas de devolución, cancelaciones, reembolsos, comunicación y una interfaz poco clara para principiantes. Son alegaciones individuales, no prueba de fraude ni frecuencia. A menudo faltan medidas, destino, restricciones y resolución.", "Aun así señalan controles: separar presupuestos, aclarar devolución, guardar peso y dimensiones y mantener una cronología. Una reseña equilibrada no borra la crítica ni la convierte en hecho demostrado."] },
    { title: "La advertencia de Trustpilot importa", paragraphs: ["Trustpilot indica ahora que la valoración de Hipobuy no está disponible por incumplir sus directrices y que retiró varias reseñas falsas. Siguen visibles opiniones positivas y negativas. No sería correcto promocionar una distribución antigua como indicador limpio ni elegir solo testimonios favorables.", "Tampoco prueba que toda reseña restante sea falsa. Son opiniones moderadas por reglas propias. La vía prudente es resumir temas, mostrar la advertencia y no copiar imágenes de clientes, datos de pedidos ni superlativos sin verificar."] },
    { title: "Cómo hacer una prueba justa", paragraphs: ["Elige un artículo modesto, claro y medible. Guarda anuncio, opción, precio, transporte nacional y pago. Define total máximo y regla de salida. En almacén mide estados, fotos y respuesta a una solicitud precisa.", "Registra peso, tres dimensiones, peso facturable, rutas, embalaje y total. No cambies varias variables a la vez. Envía solo si coste, protección y tracking cumplen la regla y compara el producto recibido con QC."] },
    { title: "Conclusión medida: proceso útil, resultados variables", paragraphs: ["La evidencia muestra una app pública con adopción relevante y un flujo de compra, almacén y envío. Su marketing enfatiza alcance, almacenamiento, velocidad y ayuda. Las opiniones mezclan utilidad de interfaz, QC y soporte con frustración por envío, reembolsos y comunicación. Las notas nacionales difieren y la advertencia de Trustpilot impide un veredicto fácil.", "No se puede prometer seguridad, ahorro o rapidez en cada pedido, ni considerar típica toda queja. Depende de vendedor, pruebas, embalaje, ruta, país y decisiones. Un test pequeño, presupuesto separado, QC guardado y plazo claro son la base más defendible."] },
  ],
  checklist: ["Citar país y fecha de cada nota.", "Separar publicidad y testimonios.", "Fijar presupuesto de producto y techo de envío.", "Probar con un artículo medible.", "Guardar anuncio, pago, QC, paquete y ruta.", "Aclarar devolución antes de tener un problema.", "Evaluar soporte con una pregunta concreta.", "No publicar datos personales de pedido o pago."],
  faqs: [["¿Hipobuy es legítimo?", "Las fichas y descargas muestran un servicio operativo, pero no garantizan vendedor, envío, reembolso ni un pedido concreto."], ["¿Qué valoración tiene Hipobuy?", "No existe una nota global única. Cambia por tienda y país; Trustpilot no muestra ahora la puntuación por una infracción de directrices."], ["¿Son fiables las reseñas?", "Trátalas como experiencias no auditadas, busca temas, muestra advertencias y verifica con tus datos."], ["¿Qué debe probar un principiante?", "Variante, QC, visibilidad de tasas, medidas, ruta, soporte y coste total."]],
};

const it: Record<LegacySlug, ArticleExpansion> = {
  "how-to-buy-with-hipobuy": {
    visual: { label: "Mappa decisionale", title: "Cinque controlli dal link alla consegna", intro: "Superare una fase non approva automaticamente la successiva.", columns: ["Controllo", "Prova da conservare", "Decisione"], rows: [["Inserzione", "Venditore, variante, prezzo datato", "Ordinare o cercare ancora"], ["Magazzino", "Arrivo, foto QC, misure", "Tenere, chiarire o rendere"], ["Pacco", "Peso, dimensioni, regole", "Reimballare, dividere o spedire"]] },
    sections: [
      { title: "Leggere le dichiarazioni come punto di partenza", paragraphs: ["La scheda Google Play descrive Hipobuy come servizio per acquistare da marketplace cinesi come Taobao e 1688. Pubblicizza 90 giorni di deposito gratuito, oltre 200 paesi, buyer disponibili 24 ore su 24, migliaia di opzioni di spedizione e consegne a partire da cinque giorni. Queste frasi spiegano il flusso previsto, ma non garantiscono rotta o tempo per un articolo e indirizzo specifici. Devono diventare domande da verificare nell’account attuale.", "La landing pubblica mostra PayPal, Klarna, Visa, Mastercard e JCB. La disponibilità può dipendere da paese, account e checkout. Prova il metodo previsto con un ordine gestibile, controlla il totale dopo la conversione e salva la conferma. Un logo non definisce cambio, percorso del rimborso, tempi o protezione della singola transazione."] },
      { title: "Costruire un budget che resista alla fase di magazzino", paragraphs: ["Separa tre valori: prodotto confermato, stima di trasporto interno e servizi, fascia di spedizione internazionale. Prima dell’imballo una fascia è più onesta di un numero apparentemente preciso. Simula un pacco compatto e uno voluminoso: scatole di scarpe, imballi rigidi e giacche imbottite possono cambiare le dimensioni più del loro prezzo. Fissa prima il totale oltre il quale rinunceresti.", "Le recensioni mostrano perché. Alcuni utenti apprezzano processo, foto QC e assistenza; altri dicono che il costo internazionale è apparso più tardi o più alto del previsto, oppure che il rimborso era difficile da seguire. Sono casi individuali, non statistiche certificate, ma segnalano un rischio: confondere pagamento del prodotto e consegna finale. Scrivili su righe diverse prima di ordinare."] },
      { title: "Fare un test piccolo prima di un haul grande", paragraphs: ["Il primo ordine deve testare il sistema, non massimizzare lo sconto. Scegli una variante facile da riconoscere e misurare, con un valore che non crei pressione se il processo rallenta. Osserva stati, etichetta di magazzino, utilità delle foto e scadenza di reso. Registra le date. Un ciclo controllato vale più di post promozionali riferiti ad altri paesi e percorsi.", "Poi confronta aspettative e realtà: consegna interna, qualità delle immagini, dimensione imballata, visibilità di ogni costo. Trasforma le risposte in regole per il pacco successivo: numero massimo di casi aperti, data finale di consolidamento e tetto di spesa. Non garantisce ordini identici; crea un metodo ripetibile."] },
      { title: "Proteggere passaggio finale e consegna", paragraphs: ["Prima del pagamento internazionale salva rotta, contenuto dichiarato, peso fatturabile, tre dimensioni, servizi, destinazione e totale. Se viene offerta copertura, leggi eventi e prove richieste. Nel tracking osserva eccezioni: richiesta di dati, blocco doganale o consegna fallita richiedono azioni diverse da una normale pausa.", "Fotografa un imballo esterno danneggiato prima di aprire, con etichetta visibile. Confronta il contenuto con il record QC e conserva comunque quantità, peso, misure, rotta, transito e totale. I tuoi dati di pacchi comparabili aiutano più del caso estremo di uno sconosciuto."] },
    ],
    checklist: ["Separare prodotto e spedizione internazionale nel budget.", "Provare il metodo di pagamento con un ordine gestibile."],
    faqs: [["Molti download garantiscono il mio ordine?", "No. Indicano adozione, non disponibilità della rotta, qualità del venditore, chiarezza dei costi o risultato del pacco."]],
  },
  "hipobuy-shipping-cost-guide": {
    visual: { label: "Modello di costo", title: "Il preventivo ha più livelli", intro: "Separa importi confermati e stime per vedere l’incertezza.", columns: ["Livello", "Quando è noto", "Cosa lo cambia"], rows: [["Prodotto + interno", "Ordine o invio del venditore", "Variante, trasporto, cambio"], ["Pacco + rotta", "Dopo l’imballo", "Peso, misure, limiti, protezione"], ["Destinazione", "Secondo rotta e paese", "Imposte, dogana, ultimo miglio"]] },
    sections: [
      { title: "Usare le recensioni per trovare dubbi, non prezzi", paragraphs: ["La spedizione compare in commenti positivi e negativi. Alcuni parlano di tempi accettabili, pacco integro o tracking utile; altri di tariffa internazionale alta o compresa tardi. Paese, forma, rotta, promozione e attese cambiano. La conclusione corretta non è ‘sempre economica’ o ‘sempre cara’: il preventivo finale deve avere una sua approvazione.", "Una recensione che collega chili e prezzo non è un tariffario. Di solito mancano dimensioni, peso fatturabile, CAP, restrizioni, protezione, cambio e data. Usala per creare domande su volume, scatole, rotta e tracking, poi rispondi con i dati del tuo pacco."] },
      { title: "Riconciliare stima e pacco imballato", paragraphs: ["Quando il magazzino misura, ricostruisci il calcolo. Distingui peso di bilancia, risultato volumetrico e peso fatturabile arrotondato; controlla destinazione e limiti. Una differenza non è automaticamente un errore: protezione, cartoni, lato lungo o fascia possono spiegarla. Devi collegarla a input osservabili.", "Se resta un dubbio, poni una domanda precisa: misure registrate, servizio applicato o regola di peso. ‘Costa troppo’ non è investigabile. Un messaggio utile indica dimensioni, rotta, peso fatturabile e differenza. Salva la risposta con il nuovo preventivo."] },
      { title: "Confrontare scenari completi, non coupon isolati", paragraphs: ["Crea almeno due modelli: scatole originali e tracking più robusto contro imballo compatto e altra linea idonea. Includi servizi, copertura, conversione e possibili costi a destinazione. Un coupon conta solo dopo aver verificato condizioni, scadenza e rotta, altrimenti è una cifra pubblicitaria.", "Scegli il totale meglio controllato, non il titolo più basso. Un piccolo risparmio non compensa una rotta non adatta o una protezione insufficiente; una scatola originale può invece aggiungere volume inutile. Scrivi perché uno scenario vince, così il prossimo pacco non riparte da zero."] },
      { title: "Registrare il costo reale dopo la consegna", paragraphs: ["Somma prodotto, trasporto interno, servizi, transazione, spedizione e importi realmente pagati a destinazione. Non dividere il trasporto solo per valore: un articolo economico e voluminoso può occupare più capacità di uno compatto e costoso. Peso, volume o categoria danno una lettura migliore.", "Conserva data, rotta, paese, peso, misure, transito e imballo accanto al totale. Più ordini personali diventano il miglior strumento per il tuo indirizzo e mix. Se il totale supera spesso il tetto iniziale, cambia prodotti o piano invece di affidarti a una nuova promozione."] },
    ],
    checklist: ["Segnare ogni importo come confermato o stimato.", "Salvare dimensioni e peso fatturabile con il preventivo finale."],
    faqs: [["Un coupon rende valida una rotta inadatta?", "Di solito no. Verifica idoneità, limiti, protezione e totale prima di chiamarlo risparmio."]],
  },
  "hipobuy-warehouse-qc-photos": {
    visual: { label: "Scala delle prove QC", title: "Dall’identità alla condizione", intro: "Prima scopri cos’è l’articolo, poi giudica com’è.", columns: ["Passaggio", "Domanda", "Prova migliore"], rows: [["Identità", "Variante corretta?", "Opzione, etichetta, vista"], ["Scala", "Misure adatte?", "Metro leggibile con estremi"], ["Condizione", "Problema rilevante?", "Vista ampia e dettaglio"]] },
    sections: [
      { title: "Capire cosa dimostra una foto QC", paragraphs: ["Una foto mostra un articolo, un momento, una luce e pochi angoli. Può provare famiglia di colore, forma, etichetta, quantità, misura e danno visibile. Non dimostra bene durata, interno, odore, composizione esatta o vestibilità personale. Una bella immagine può creare più fiducia della prova; decidi solo sulle domande che può davvero risolvere.", "Recensioni pubbliche lodano le foto QC, mentre altri utenti restano delusi alla consegna. Entrambe le cose sono possibili: il QC riduce l’incertezza, non la elimina. Un difetto può essere nascosto o una variazione visibile può essere stata accettata. Definisci la soglia prima di guardare."] },
      { title: "Controllare luce, angolo e confronto", paragraphs: ["Il colore cambia con bilanciamento del bianco, schermo e riflessi. Confronta più fotogrammi con fondo neutro e cerca differenze costanti, non piccole variazioni rispetto a una foto da studio. Pannello assente, grafica errata o hardware diverso sono segnali più solidi.", "Anche la scala inganna. Un grandangolo ingrandisce il lato vicino; un metro senza zero visibile non dà misura esatta. Chiedilo piatto con entrambi gli estremi. Per oggetti simmetrici confronta riferimenti equivalenti sui due lati."] },
      { title: "Fissare soglie materiali e cosmetiche", paragraphs: ["Scrivi cosa richiede reso, cosa una foto aggiuntiva e cosa accetti. Taglia errata, parte mancante, strappo o chiusura guasta possono essere materiali; un filo o piega può essere cosmetico. Non esiste una regola universale, ma va definita prima che urgenza e costo già sostenuto influenzino.", "Usa tre esiti: approvare quando identità, misure e stato passano; chiarire quando manca una prova; rendere quando la differenza supera già il limite. Nella richiesta extra scrivi la decisione successiva, per esempio tenere se il segno si pulisce, rendere se è un taglio."] },
      { title: "Conservare le prove dopo la partenza", paragraphs: ["Salva opzione, record, foto originali, richiesta extra e approvazione insieme, con identificatore e data. Immagini sciolte sono difficili da collegare quando arrivano articoli simili.", "Alla consegna confronta nello stesso ordine: identità, misure quando utile, costruzione e stato. Fotografa prima dell’uso e descrivi solo ciò che è visibile. Non garantisce rimedio, ma mostra cosa fu approvato e cosa è arrivato."] },
    ],
    checklist: ["Definire soglie materiale, dubbio e cosmetico prima del QC.", "Conservare l’identificatore con ogni immagine."],
    faqs: [["Posso giudicare il colore da una foto?", "No. Confronta più immagini e cerca differenze stabili, non piccoli cambi di luminosità."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    visual: { label: "Decisione sul peso", title: "La bilancia racconta solo metà pacco", intro: "Le dimensioni possono cambiare il prezzo senza cambiare il contenuto.", columns: ["Dato", "Cosa misura", "Controllo"], rows: [["Peso reale", "Massa del pacco", "Togliere materiali inutili"], ["Dimensioni", "Spazio occupato", "Usare cartone adeguato"], ["Regola rotta", "Conversione in costo", "Leggere divisore, arrotondamento e limiti"]] },
    sections: [
      { title: "Conoscere la regola prima della formula", paragraphs: ["Un modello comune moltiplica lunghezza, larghezza e altezza e divide per un valore del vettore. La difficoltà è usare unità, divisore e arrotondamento corretti. Le rotte possono differire e cambiare. Per questo non pubblichiamo un divisore Hipobuy universale: conta la descrizione corrente della linea specifica.", "Esempio neutro: ridurre la lunghezza del dieci per cento, con gli altri lati uguali, riduce circa allo stesso modo il volume prima dell’arrotondamento. Ma superare una fascia può avere un effetto maggiore. Registra tutte e tre le misure nella stessa unità e se sono state arrotondate."] },
      { title: "Trovare la dimensione che crea costo", paragraphs: ["Non chiedere un generico reimballo. Scopri se c’è vuoto ovunque o se un articolo fissa lunghezza, larghezza o altezza. Scatola di scarpe, tubo e indumenti morbidi richiedono soluzioni diverse. Comprimere vestiti non accorcia un oggetto lungo.", "Chiedi misure prima e dopo sulla stessa rotta. Cambiare imballo e linea insieme nasconde la causa. Registra la protezione rimossa: l’obiettivo è eliminare vuoto con sicurezza adeguata, non ottenere il pacco minimo a ogni costo."] },
      { title: "Confrontare pacco unito e diviso con le stesse ipotesi", paragraphs: ["Un pacco unico può usare meglio lo spazio e ridurre costi fissi, ma superare limiti. Due pacchi possono aprire altre linee, duplicando cartone e basi. Confronta stesso paese, contenuto, protezione, minimi e servizi.", "Spesso decide l’articolo che imposta la misura. Separare una scatola rigida può compattare il resto; dividere prodotti già piccoli aggiunge imballo. Valuta due scenari solo se il risparmio possibile giustifica gestione e doppio tracking."] },
      { title: "Verificare un importo rivisto senza conclusioni premature", paragraphs: ["Confronta peso reale, tre misure, rotta e peso fatturabile. Cerca fascia nuova, rinforzo o nuova misura. Se gli input non cambiano ma il prezzo sì, chiedi tariffa o adeguamento e regola attuale.", "Le recensioni critiche citano costi elevati, ma una cifra alta non dimostra errore. Nemmeno un’etichetta sostituisce una spiegazione. Un messaggio efficace mostra preventivo precedente, misura finale e differenza esatta."] },
    ],
    checklist: ["Identificare la regola della rotta prima di calcolare.", "Confrontare reimballo con misure prima e dopo sulla stessa linea."],
    faqs: [["Posso usare un divisore trovato in un vecchio forum?", "Solo come ipotesi. Conferma divisore, unità e arrotondamento correnti prima di pagare."]],
  },
  "hipobuy-90-day-warehouse-storage": {
    visual: { label: "Piano a due orologi", title: "Deposito e reso hanno tempi diversi", intro: "La scadenza operativa più breve controlla l’azione.", columns: ["Orologio", "Inizio", "Risposta"], rows: [["Reso venditore", "Evento del venditore o piattaforma", "Controllare e decidere presto"], ["Deposito", "Arrivo registrato", "Consolidare con margine"], ["Data necessaria", "Esigenza personale", "Pianificare a ritroso"]] },
    sections: [
      { title: "Verificare il conto alla rovescia di ogni articolo", paragraphs: ["I 90 giorni provengono dalla descrizione pubblica e sono presentati come deposito gratuito per consolidare. Per operare, conta l’account. Controlla se parte dall’arrivo, dalla lavorazione o da altro stato e se ogni articolo mostra la stessa regola. Una frase pubblicitaria non risolve eccezioni o cambi.", "Salva arrivo e scadenza visibile e imposta una data d’azione precedente. Se manca un contatore chiaro, chiedi con identificatore. Non aspettare l’ultima settimana per scoprire un inizio diverso."] },
      { title: "Controllo settimanale invece di aggiornamento continuo", paragraphs: ["Aggiornare ogni giorno non accelera il venditore, ignorare il magazzino può perdere un reso. Ogni settimana dividi in atteso, arrivato senza QC, domanda, reso in corso e pronto. Segna chi deve agire e quando il silenzio diventa escalation.", "Chiudi con una decisione, anche se è aspettare sette giorni. Indica quale arrivo giustifica l’attesa e cosa farai se manca. Così acquisti opzionali non allungano il piano e un pacco piccolo non diventa un mix voluminoso."] },
      { title: "Definire segnali per dividere o fermare", paragraphs: ["Stabilisci eventi: venditore oltre il tempo atteso, domanda aperta dopo una prova, rotta non più disponibile o budget superato. Il segnale impone una revisione: rendere, spedire il pronto o smettere di aggiungere.", "Verso la fine pesa il costo già sostenuto. Attendere non migliora un articolo inadatto. Confronta da oggi costi, protezione, rotta e valore dell’attesa. Se l’account avvisa diversamente dal piano, segui l’informazione corrente. Non devi usare ogni giorno pubblicizzato."] },
      { title: "Pianificare a ritroso dalla data reale", paragraphs: ["La fine del deposito non è la consegna. Seguono imballo, transito, dogana e ultimo miglio. Per viaggio, regalo o stagione sottrai tempo prudente, margine doganale, preparazione e decisione. ‘A partire da cinque giorni’ è un caso migliore pubblicizzato, non un calendario garantito.", "Se il tempo conta più del consolidamento, spedisci prima. Se è flessibile, mantieni la verifica settimanale e ricontrolla la rotta prima della consegna del pacco. Il deposito crea opzioni; senza data finale crea ritardo."] },
    ],
    checklist: ["Salvare arrivo e scadenza mostrata.", "Controllare il magazzino un giorno fisso ogni settimana."],
    faqs: [["I 90 giorni comprendono la consegna?", "No. Riguardano il deposito pubblicizzato; imballo, transito, dogana e ultimo miglio sono separati."]],
  },
  "hipobuy-warehouse-return-checklist": {
    visual: { label: "Fascicolo reso", title: "Una richiesta, una catena di prove", intro: "Ogni documento risponde a una domanda.", columns: ["Domanda", "Prova", "Esito"], rows: [["Cosa ho ordinato?", "Opzione e nota", "Riferimento"], ["Cosa è arrivato?", "Vista e dettaglio", "Differenza o stato"], ["Cosa deve accadere?", "Scadenza e commissioni", "Reso, cambio o chiarimento"]] },
    sections: [
      { title: "Imparare dalle recensioni senza trasformarle in fatti", paragraphs: ["Commenti pubblici citano commissioni di reso o transazione, cancellazioni, rimborsi lenti e comunicazione difficile; altri raccontano assistenza rapida. Nessun post dimostra il tuo caso o una condotta generale. Indica però cosa registrare: accettazione, costo, destinazione del rimborso e stato finale.", "Annota rimedio richiesto, importo atteso, trasporto interno o servizio, canale del rimborso e fase promessa. Se viene dato un tempo, registra inizio e follow-up. Il tuo fascicolo vale più di discutere con la storia di un altro cliente."] },
      { title: "Scrivere un primo messaggio operativo", paragraphs: ["Cinque righe: ordine, opzione, differenza osservabile, prova e risultato. Evita accuse prima dei dati. Per esempio: ordine M, etichetta di magazzino L, foto allegate e richiesta di reso o cambio prima della scadenza.", "Se le immagini non bastano, chiedi etichetta, misura o dettaglio e spiega che serve alla decisione di reso. Continua nello stesso thread. Una cronologia riduce istruzioni contraddittorie."] },
      { title: "Separare accettazione, movimento e denaro", paragraphs: ["‘Richiesta ricevuta’ non significa accettazione del venditore, ritorno fisico o rimborso. Data e riferimento per ogni evento. Chiedi se l’articolo torna, se il ricambio crea nuovo record e se il denaro va a saldo o metodo originale.", "Rimuovi l’articolo dal piano dopo il reso confermato, ma conserva il caso fino al risultato finanziario. Un ricambio richiede nuove date QC e consolidamento. Il reso cambia logistica e denaro."] },
      { title: "Escalation con cronologia, non con volume", paragraphs: ["Dopo il termine invia data della richiesta, riferimento, ultimo passo promesso e stato mancante. Allega la prova e usa la procedura formale entro la scadenza. Non pubblicare dati personali, indirizzo, ordine o pagamento.", "Alla chiusura registra valore lordo, commissioni, rimborso, destinazione e data. Se differiscono dai termini, chiedi un dettaglio senza presumere errore. Aggiorna le note su venditore e prodotto."] },
    ],
    checklist: ["Registrare accettazione, ritorno e rimborso come eventi separati.", "Conservare il caso fino all’esito finanziario visibile."],
    faqs: [["Devo pubblicare screenshot di pagamento per ottenere attenzione?", "No. Usa assistenza o controversia e rimuovi dati personali, indirizzo, ordine e pagamento da ogni post."]],
  },
};

const reviewIt: FullArticle = {
  lead: "Una recensione utile di Hipobuy non si riduce a un voto o a screenshot drammatici. Le fonti pubbliche danno segnali diversi: le schede ufficiali descrivono un agente globale, i rating cambiano per paese, alcuni utenti apprezzano QC e assistenza, altri criticano spedizione, rimborsi o passaggi poco chiari. Questa analisi separa le fonti, ne spiega i limiti e le trasforma in controlli prima di un pacco importante.",
  keyPoints: ["Le funzioni ufficiali descrivono il servizio, non garantiscono un ordine.", "I rating App Store sono legati al paese e non sono globali.", "Le recensioni mostrano temi, non provano ogni accusa o promessa.", "Il test migliore è un piccolo ordine documentato con limiti già fissati."],
  visual: { label: "Mappa delle prove", title: "Cosa può dire ogni fonte", intro: "La conclusione non deve superare il limite della prova.", columns: ["Fonte", "Segnale utile", "Limite"], rows: [["Scheda ufficiale", "Funzioni e termini pubblicizzati", "Autodescrizione variabile"], ["Rating store", "Sentimento di quel paese", "Paese, versione, selezione"], ["Recensione", "Tema da verificare", "Esperienza individuale non verificata"]] },
  sections: [
    { title: "Cosa dice pubblicamente Hipobuy", paragraphs: ["Google Play descrive Hipobuy per acquisti da Taobao e 1688 con acquisto, deposito e spedizione. Pubblicizza buyer 24/7, 90 giorni gratuiti, oltre 200 paesi, migliaia di opzioni e consegna a partire da cinque giorni. Il 14 agosto 2026 mostrava oltre 500.000 download.", "La landing promuove oltre 100.000 scelte, coupon e PayPal, Klarna, Visa, Mastercard e JCB. È comunicazione commerciale, non disponibilità per ogni account. Rotta, tempo, metodo e politica vanno verificati per paese, prodotto e data."] },
    { title: "Perché un voto non descrive tutti", paragraphs: ["Lo store USA mostrava 3,1 su 5 con 261 valutazioni, il Canada 3,9 con 62. Google Play era intorno a quattro stelle e oltre 500.000 download, mentre il conteggio recensioni variava nella pagina. Sono istantanee. Il voto USA non può essere presentato come globale.", "Le stelle mescolano interfaccia, venditore, dogana e rimborso. Cambiano versione, rotte e motivazione a scrivere. Una recensione seria cita store, paese e data, poi analizza le ragioni."] },
    { title: "Cosa apprezzano i commenti positivi", paragraphs: ["Ricorrono ordine comprensibile, foto QC utili, risposte rapide, imballo accurato, aggiornamenti e consegna attesa. Sono funzioni centrali che un utente può testare.", "Una risposta veloce non stabilisce un livello universale e una consegna settimanale non predice altre linee. La qualità può dipendere dal venditore. Trasforma l’elogio in domande verificabili su foto, risposta e tracking."] },
    { title: "Cosa contestano i commenti critici", paragraphs: ["Le critiche parlano spesso di costo internazionale alto o capito tardi, commissioni di reso, cancellazioni, rimborso, comunicazione e interfaccia poco chiara. Sono affermazioni individuali, non prova di frode o frequenza; spesso mancano dimensioni, paese e soluzione.", "I temi suggeriscono controlli: separare budget, chiarire reso, salvare peso e misure e mantenere una cronologia. Una lettura equilibrata non nasconde né certifica automaticamente la lamentela."] },
    { title: "L’avviso Trustpilot cambia l’uso delle recensioni", paragraphs: ["Trustpilot indica che il rating Hipobuy non è disponibile per violazione delle linee guida e che ha rimosso varie recensioni false. Restano commenti positivi e negativi. Sarebbe scorretto usare una vecchia distribuzione come indicatore pulito o scegliere solo testimonianze favorevoli.", "Non dimostra che ogni recensione restante sia falsa. Sono opinioni moderate con regole proprie. L’approccio prudente riassume temi, mostra l’avviso e non copia immagini o dati dei clienti."] },
    { title: "Come fare un test corretto", paragraphs: ["Scegli un articolo modesto, chiaro e misurabile. Salva inserzione, opzione, prezzo, trasporto interno e pagamento. Definisci totale massimo e regola di uscita. In magazzino misura stati, qualità QC e risposta a una richiesta precisa.", "Registra peso, tre dimensioni, peso fatturabile, rotte, imballo e totale. Non cambiare più variabili insieme. Spedisci solo se costo, protezione e tracking rispettano la regola e confronta l’arrivo con il QC."] },
    { title: "Verdetto misurato: flusso utile, risultati variabili", paragraphs: ["Le prove mostrano un’app pubblica con adozione significativa e un flusso di acquisto, magazzino e spedizione. Il marketing evidenzia portata, deposito, velocità e supporto. Il feedback combina utilità di interfaccia, QC e assistenza con frustrazione per costi, rimborsi e comunicazione. I voti nazionali differiscono e l’avviso Trustpilot impedisce un giudizio semplice.", "Non si può garantire che ogni ordine sia sicuro, economico o rapido, né che ogni lamentela sia tipica. Venditore, prove, imballo, rotta, paese e decisioni contano. Un test piccolo, budget separato, QC salvato e scadenza chiara sono la base più solida."] },
  ],
  checklist: ["Citare paese e data del rating.", "Separare pubblicità e testimonianze.", "Fissare budget prodotto e tetto spedizione.", "Testare un articolo misurabile.", "Salvare inserzione, pagamento, QC, pacco e rotta.", "Chiarire reso prima del problema.", "Valutare assistenza con una domanda precisa.", "Non pubblicare dati personali di ordine o pagamento."],
  faqs: [["Hipobuy è affidabile?", "Schede e download mostrano un servizio operativo, ma non garantiscono venditore, costo, rimborso o singolo risultato."], ["Qual è il rating di Hipobuy?", "Non esiste un voto globale unico. Cambia per store e paese; Trustpilot non mostra ora il rating per una violazione."], ["Le recensioni sono attendibili?", "Trattale come esperienze non verificate, cerca temi, mostra avvisi e verifica con i tuoi dati."], ["Cosa deve testare un principiante?", "Variante, QC, costi, misure, rotta, assistenza e totale."]],
};

const pl: Record<LegacySlug, ArticleExpansion> = {
  "how-to-buy-with-hipobuy": {
    visual: { label: "Mapa decyzji", title: "Pięć kontroli od linku do dostawy", intro: "Zielone światło na jednym etapie nie zatwierdza następnego.", columns: ["Etap", "Dowód", "Decyzja"], rows: [["Oferta", "Sprzedawca, wariant, cena z datą", "Zamówić lub badać"], ["Magazyn", "Przyjęcie, QC, wymiary", "Zatrzymać, wyjaśnić lub zwrócić"], ["Paczka", "Waga, wymiary, reguły", "Przepakować, podzielić lub wysłać"]] },
    sections: [
      { title: "Czytaj deklaracje platformy jako punkt startowy", paragraphs: ["Aktualna karta Google Play opisuje Hipobuy jako usługę zakupów na chińskich platformach, takich jak Taobao i 1688. Reklamuje 90 dni bezpłatnego magazynu, ponad 200 krajów, kupujących dostępnych całą dobę, tysiące opcji wysyłki i dostawę nawet od pięciu dni. Wyjaśnia to zamierzony proces, ale nie gwarantuje trasy ani czasu dla konkretnego produktu, adresu i daty. Każdą obietnicę sprawdź w aktywnym koncie.", "Publiczna strona pokazuje PayPal, Klarna, Visa, Mastercard i JCB. Dostępność zależy od kraju, konta i płatności. Przetestuj planowaną metodę na rozsądnym zamówieniu, sprawdź kwotę po przewalutowaniu i zachowaj potwierdzenie. Logo nie określa kursu, drogi zwrotu, czasu obsługi ani ochrony transakcji."] },
      { title: "Zbuduj budżet odporny na etap magazynu", paragraphs: ["Rozdziel trzy liczby: potwierdzony produkt, roboczą kwotę dostawy krajowej i usług oraz zakres wysyłki międzynarodowej. Przed pakowaniem zakres jest uczciwszy niż pozornie dokładna cena. Policz wariant kompaktowy i duży. Pudełka po butach, sztywne opakowania i puchowe kurtki mogą zmienić wymiary bardziej, niż sugeruje ich cena. Ustal z góry całkowity limit rezygnacji.", "Publiczne opinie pokazują powód. Jedni chwalą proces, QC i pomoc; inni twierdzą, że transport międzynarodowy stał się jasny późno lub był droższy, a zwrot pieniędzy trudny do śledzenia. To pojedyncze relacje, nie audytowana statystyka, ale wskazują ryzyko: początkujący łączy zapłatę za produkt i dostawę do domu w jedną cenę. Zapisz je w dwóch wierszach."] },
      { title: "Wykonaj mały test przed dużym zestawem", paragraphs: ["Pierwsze zamówienie ma sprawdzić system, nie maksymalizować rabat. Wybierz łatwy do rozpoznania i zmierzenia wariant o wartości, która nie wywoła presji przy opóźnieniu. Obserwuj statusy, oznaczenie magazynowe, użyteczność zdjęć i termin zwrotu. Zapisuj daty. Jeden kontrolowany cykl jest cenniejszy niż promocyjne posty o innych krajach i trasach.", "Potem porównaj założenia z wynikiem: czas krajowy, odpowiedzi ze zdjęć, rozmiar paczki i widoczność opłat. Zamień wnioski w zasady: maksymalna liczba otwartych spraw, ostatni dzień konsolidacji i limit kosztu. Nie zapewni to identycznych zamówień, ale daje powtarzalny sposób pracy."] },
      { title: "Zabezpiecz przekazanie i odbiór", paragraphs: ["Przed płatnością międzynarodową zachowaj trasę, deklarowaną zawartość, wagę rozliczeniową, trzy wymiary, usługi, adres i sumę. Przy ubezpieczeniu sprawdź zdarzenia i wymagane dowody. W trackingu reaguj na wyjątki: prośba o dane, odprawa lub nieudana dostawa to nie zwykła przerwa w ruchu.", "Fotografuj uszkodzoną paczkę przed otwarciem z widoczną etykietą. Porównaj zawartość z QC i zachowaj liczbę rzeczy, wagę, wymiary, trasę, czas i pełny koszt nawet przy powodzeniu. Własne porównywalne dane są lepsze niż skrajny przypadek innej osoby."] },
    ],
    checklist: ["Oddzielić w budżecie produkt i transport międzynarodowy.", "Przetestować metodę płatności na rozsądnym zamówieniu."],
    faqs: [["Czy duża liczba pobrań gwarantuje moje zamówienie?", "Nie. Pokazuje popularność, nie trasę, jakość sprzedawcy, jasność opłat ani wynik paczki."]],
  },
  "hipobuy-shipping-cost-guide": {
    visual: { label: "Model kosztu", title: "Wycena ma warstwy", intro: "Oddziel wartości potwierdzone od szacowanych.", columns: ["Warstwa", "Kiedy znana", "Co ją zmienia"], rows: [["Produkt + kraj", "Zamówienie lub wysyłka sprzedawcy", "Wariant, dostawa, kurs"], ["Paczka + trasa", "Po zapakowaniu", "Waga, wymiary, limity, ochrona"], ["Cel", "Według trasy i kraju", "Podatki, odprawa, ostatnia mila"]] },
    sections: [
      { title: "Opinie wskazują pytania, nie cennik", paragraphs: ["Transport pojawia się w dobrych i złych opiniach. Jedni opisują rozsądny czas, całe opakowanie lub tracking; inni mówią o wysokiej lub późno zrozumianej opłacie. Kraj, kształt, trasa, promocja i oczekiwanie różnią się. Wniosek nie brzmi ‘zawsze tanio’ ani ‘zawsze drogo’: końcowa wycena potrzebuje osobnej zgody.", "Relacja z kilogramami i ceną nie jest taryfą. Brakuje zwykle wymiarów, wagi rozliczeniowej, kodu, ograniczeń, ochrony, kursu i daty. Użyj jej do pytań o objętość, pudełka, linię i tracking, a odpowiedzi znajdź w danych własnej paczki."] },
      { title: "Uzgodnij szacunek z gotową paczką", paragraphs: ["Po pomiarze policz od początku. Ustal, czy widzisz wagę z wagi, objętościową czy rozliczeniową po zaokrągleniu; sprawdź cel i ograniczenia. Różnica nie oznacza od razu błędu: ochrona, kartony, długi bok lub próg mogą ją wyjaśnić. Połącz ją z obserwowalnymi danymi.", "Jeśli nadal nie pasuje, pytaj o jedną rzecz: wymiary, zastosowaną usługę lub regułę wagi. ‘Za drogo’ jest mało użyteczne. Podaj rozmiar, trasę, wagę rozliczeniową i dokładną lukę. Zachowaj odpowiedź z nową wyceną."] },
      { title: "Porównuj pełne scenariusze, nie sam kupon", paragraphs: ["Zbuduj dwa modele: oryginalne pudełka i mocniejszy tracking kontra kompaktowe opakowanie i inna dozwolona linia. Dodaj usługi, ochronę, przewalutowanie i możliwe koszty kraju. Kupon liczy się dopiero po potwierdzeniu warunków, daty i trasy.", "Wybierz najlepiej kontrolowany koszt całkowity. Mała oszczędność nie rekompensuje niedozwolonej zawartości lub słabej ochrony; oryginalny karton może też dodawać pustą objętość. Zapisz powód wyboru, aby następna paczka nie zaczynała od zgadywania."] },
      { title: "Po dostawie zapisz prawdziwy koszt", paragraphs: ["Dodaj produkt, transport krajowy, usługi, transakcję, wysyłkę i kwoty rzeczywiście zapłacone na miejscu. Nie dziel tylko według wartości: tani duży produkt może zajmować więcej niż drogi kompaktowy. Waga, objętość lub kategoria lepiej wskazują przyczynę.", "Zachowaj datę, trasę, kraj, wagę, wymiary, czas i opakowanie. Kilka własnych zamówień staje się najlepszą prognozą. Jeśli suma stale przekracza limit, zmień produkty lub plan zamiast liczyć na kolejną promocję."] },
    ],
    checklist: ["Oznaczyć każdą kwotę jako potwierdzoną lub szacowaną.", "Zapisać wymiary i wagę rozliczeniową z końcową wyceną."],
    faqs: [["Czy kupon ratuje złą trasę?", "Zwykle nie. Potwierdź uprawnienie, limity, ochronę i sumę przed uznaniem rabatu."]],
  },
  "hipobuy-warehouse-qc-photos": {
    visual: { label: "Drabina dowodów QC", title: "Od tożsamości do stanu", intro: "Najpierw sprawdź, co to jest, potem jak wygląda.", columns: ["Etap", "Pytanie", "Najlepszy dowód"], rows: [["Tożsamość", "Zamówiony wariant?", "Opcja, metka, widok"], ["Skala", "Czy wymiary pasują?", "Czytelna miarka z końcami"], ["Stan", "Czy wada jest istotna?", "Widok ogólny i zbliżenie"]] },
    sections: [
      { title: "Zrozum granice zdjęcia QC", paragraphs: ["Zdjęcie pokazuje jeden artykuł, chwilę, światło i kilka kątów. Może dowieść koloru, formy, metki, liczby, wymiaru i widocznego uszkodzenia. Nie potwierdza dobrze trwałości, wnętrza, zapachu, składu ani dopasowania do ciała. Ładny obraz może dać zbyt dużo pewności; decyduj tylko w granicach dowodu.", "Publiczne opinie chwalą QC, a inni nadal są rozczarowani odbiorem. Oba zdania mogą być prawdziwe: QC zmniejsza niepewność, nie usuwa jej. Wada może być ukryta albo klient zaakceptował widoczną różnicę. Ustal próg wcześniej."] },
      { title: "Kontroluj światło, kąt i porównanie", paragraphs: ["Kolor zmienia balans bieli, ekran i odbicie. Porównaj kilka kadrów z neutralnym tłem i szukaj stałych różnic, nie drobnej jasności wobec zdjęcia studyjnego. Brak panelu, zła grafika lub inne okucie są mocniejsze.", "Szeroki obiektyw powiększa bliski koniec, a miarka bez zera nie daje liczby. Poproś o płaską taśmę z dwoma punktami. W symetrycznych produktach porównaj odpowiadające punkty po obu stronach."] },
      { title: "Ustal progi istotny, pytanie i kosmetyczny", paragraphs: ["Zapisz, co oznacza zwrot, dodatkowe zdjęcie i akceptację. Zły rozmiar, brak, rozdarcie lub niesprawne zapięcie bywają istotne; nitka lub zagniecenie mogą być kosmetyczne. Nie ma jednej granicy, ale powinna powstać przed presją czasu i kosztu.", "Stosuj trzy wyniki. Zatwierdź, gdy tożsamość, wymiar i stan przechodzą. Pytaj, gdy jedna konkretna próba rozstrzyga. Zwracaj, gdy różnica już przekracza próg. Przy dodatkowym zdjęciu zapisz następną decyzję."] },
      { title: "Zachowaj dowody po wysyłce", paragraphs: ["Trzymaj opcję, zapis magazynu, oryginalne zdjęcia, prośbę i zgodę razem, najlepiej z identyfikatorem i datą. Luźne obrazy trudno później połączyć.", "Po odbiorze porównaj w tym samym porządku: tożsamość, wymiary, wykonanie i stan. Fotografuj różnicę przed użyciem i opisuj tylko to, co widać. To nie gwarantuje rozwiązania, ale tworzy precyzyjną oś czasu."] },
    ],
    checklist: ["Ustalić progi przed otwarciem QC.", "Trzymać identyfikator z każdym zdjęciem."],
    faqs: [["Czy oceniać kolor z jednego zdjęcia?", "Nie. Porównaj kilka kadrów i szukaj stałych różnic, nie małych zmian jasności."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    visual: { label: "Decyzja o wadze", title: "Waga pokazuje tylko połowę paczki", intro: "Wymiary mogą zmienić cenę bez zmiany zawartości.", columns: ["Dane", "Co mierzą", "Kontrola"], rows: [["Waga rzeczywista", "Masa paczki", "Usunąć zbędny materiał"], ["Wymiary", "Zajęta przestrzeń", "Dopasować karton"], ["Reguła trasy", "Przeliczenie na koszt", "Sprawdzić dzielnik, zaokrąglenie i limity"]] },
    sections: [
      { title: "Najpierw reguła, potem wzór", paragraphs: ["Typowy model mnoży długość, szerokość i wysokość, a potem dzieli przez wartość przewoźnika. Trudne są właściwe jednostki, dzielnik i zaokrąglenie. Linie mogą mieć różne i zmienne zasady. Dlatego nie podajemy jednego dzielnika Hipobuy; wiarygodna jest aktualna informacja konkretnej trasy.", "Neutralny przykład: skrócenie paczki o dziesięć procent przy tej samej szerokości i wysokości zmniejsza objętość podobnie przed zaokrągleniem. Przekroczenie progu może dać większy skutek. Zapisz trzy wymiary w jednej jednostce i sposób zaokrąglenia."] },
      { title: "Znajdź wymiar tworzący koszt", paragraphs: ["Nie proś ogólnie o przepakowanie. Sprawdź, czy karton jest pusty, czy jeden przedmiot ustala długość, szerokość lub wysokość. Pudełko, tuba i miękka odzież wymagają innych zmian. Kompresja ubrań nie skróci długiego elementu.", "Poproś o pomiar przed i po na tej samej trasie. Jednoczesna zmiana opakowania i linii ukrywa przyczynę. Zapisz usuniętą ochronę. Celem jest mniej pustki przy odpowiednim zabezpieczeniu, nie najmniejsza paczka za wszelką cenę."] },
      { title: "Porównaj połączenie i podział na tych samych zasadach", paragraphs: ["Jedna paczka może lepiej wykorzystać przestrzeń i bazowe opłaty, ale przekroczyć limity. Dwie mogą otworzyć inne linie, podwajając karton i koszty stałe. Użyj tego samego celu, zawartości, ochrony, minimów i usług.", "Często decyduje sztywny przedmiot. Oddzielenie go może skompresować resztę; dzielenie małych rzeczy tylko dodaje opakowanie. Modeluj dwie wersje, gdy możliwa oszczędność uzasadnia obsługę i dwa trackingi."] },
      { title: "Sprawdź zmianę bez pochopnego wniosku", paragraphs: ["Porównaj wagę, trzy wymiary, trasę i wagę rozliczeniową. Szukaj progu, wzmocnienia lub nowego pomiaru. Przy tych samych danych i innej cenie zapytaj o taryfę lub korektę i aktualną zasadę.", "Krytyczne opinie mówią o drogim transporcie, lecz wysoka suma sama nie dowodzi błędu. Sama etykieta też nie wyjaśnia kosztu. Dobry komunikat pokazuje wcześniejszą wycenę, finalny pomiar i dokładną różnicę."] },
    ],
    checklist: ["Przed obliczeniem poznać regułę trasy.", "Porównać przepakowanie na tej samej trasie przed i po."],
    faqs: [["Czy użyć dzielnika ze starego forum?", "Tylko do scenariusza. Przed płatnością potwierdź aktualny dzielnik, jednostki i zaokrąglenie."]],
  },
  "hipobuy-90-day-warehouse-storage": {
    visual: { label: "Plan dwóch zegarów", title: "Magazyn i zwrot mają inne terminy", intro: "Krótszy termin operacyjny steruje działaniem.", columns: ["Zegar", "Start", "Reakcja"], rows: [["Zwrot", "Zdarzenie sprzedawcy lub platformy", "Szybko sprawdzić i zdecydować"], ["Magazyn", "Przyjęcie", "Konsolidować z buforem"], ["Potrzebna dostawa", "Własna data", "Planować wstecz"]] },
    sections: [
      { title: "Sprawdź aktywny licznik każdego produktu", paragraphs: ["90 dni pochodzi z publicznej karty i jest reklamowane jako darmowy magazyn do łączenia zamówień. W pracy liczy się konto. Ustal, czy czas zaczyna się przy przyjęciu, obróbce czy innym statusie i czy każdy produkt ma tę samą regułę. Reklama nie rozstrzyga wyjątków.", "Zapisz przyjęcie i widoczny koniec, a własne działanie ustaw wcześniej. Gdy licznik jest niejasny, zapytaj z identyfikatorem. Nie odkrywaj różnicy dopiero w ostatnim tygodniu."] },
      { title: "Sprawdzaj co tydzień, nie bez przerwy", paragraphs: ["Codzienne odświeżanie nie przyspiesza sprzedawcy, lecz brak kontroli może zamknąć zwrot. Raz w tygodniu podziel rzeczy na oczekiwane, bez QC, pytanie, zwrot i gotowe. Zapisz, kto działa i kiedy cisza wymaga eskalacji.", "Kończ każdą kontrolę decyzją, nawet ‘czekamy tydzień’. Wskaż, co uzasadnia czekanie i co zrobisz bez dostawy. Opcjonalne zakupy nie będą wtedy przedłużać planu w nieskończoność."] },
      { title: "Ustal sygnały podziału lub stopu", paragraphs: ["Sygnałem może być spóźniony sprzedawca, otwarte pytanie po jednej próbie, brak planowanej trasy lub przekroczony budżet. Sygnał wymusza porównanie: zwrócić, wysłać gotowe lub przestać dodawać.", "Pod koniec silny jest koszt utopiony. Czekanie nie poprawia złego produktu. Od dzisiaj porównuj koszt, ochronę, trasę i wartość czasu. Aktualne ostrzeżenie konta ma pierwszeństwo przed starym planem. Nie trzeba zużyć wszystkich dni."] },
      { title: "Planuj wstecz od prawdziwej daty", paragraphs: ["Koniec magazynu nie jest dostawą. Potem są pakowanie, transport, odprawa i ostatnia mila. Dla wyjazdu, prezentu lub sezonu odejmij ostrożny czas, bufor celny, pakowanie i decyzję. ‘Od pięciu dni’ to reklamowany najlepszy przypadek.", "Jeśli czas jest ważniejszy niż konsolidacja, wyślij wcześniej. Przy elastycznym terminie zachowaj tygodniową kontrolę i potwierdź trasę tuż przed wysłaniem. Magazyn tworzy opcje, a bez końcowej daty tworzy zwłokę."] },
    ],
    checklist: ["Zapisać przyjęcie i widoczną datę końcową.", "Sprawdzać magazyn w stałym dniu tygodnia."],
    faqs: [["Czy 90 dni obejmuje dostawę?", "Nie. To reklamowane magazynowanie; pakowanie, transport, odprawa i ostatnia mila są osobne."]],
  },
  "hipobuy-warehouse-return-checklist": {
    visual: { label: "Akta zwrotu", title: "Jedno żądanie, jeden łańcuch dowodów", intro: "Każdy dokument odpowiada na pytanie.", columns: ["Pytanie", "Dowód", "Wynik"], rows: [["Co zamówiono?", "Opcja i uwaga", "Punkt odniesienia"], ["Co przyjęto?", "Widok i szczegół", "Różnica lub stan"], ["Co ma się stać?", "Termin i opłaty", "Zwrot, wymiana lub wyjaśnienie"]] },
    sections: [
      { title: "Ucz się z opinii, nie uznawaj zarzutów za fakt", paragraphs: ["Publiczne relacje wymieniają opłaty zwrotne lub transakcyjne, anulowanie, wolne refundy i komunikację; inne chwalą pomoc. Żaden wpis nie dowodzi przebiegu twojej sprawy ani ogólnego zachowania. Pokazuje jednak, co rejestrować: akceptację, opłatę, cel pieniędzy i status końcowy.", "Zapisz żądane rozwiązanie, oczekiwaną kwotę, koszt krajowy lub usługi, kanał zwrotu i obiecany etap. Przy terminie zapisz początek i dzień kontaktu. Własne akta są ważniejsze niż cudza historia."] },
      { title: "Napisz pierwszą wiadomość do działania", paragraphs: ["Pięć wierszy: zamówienie, opcja, widoczna różnica, dowód i wynik. Nie zaczynaj od oskarżeń. Przykład: zamówiono M, etykieta L, dołączone zdjęcia, prośba o zwrot lub wymianę przed terminem.", "Gdy zdjęcia nie wystarczą, poproś o metkę, pomiar lub zbliżenie i zaznacz decyzję zwrotną. Prowadź jeden wątek. Jedna chronologia ogranicza sprzeczne instrukcje."] },
      { title: "Rozdziel akceptację, ruch i pieniądze", paragraphs: ["‘Otrzymaliśmy prośbę’ nie oznacza akceptacji sprzedawcy, fizycznego zwrotu ani refundu. Nadaj datę każdemu zdarzeniu. Zapytaj, czy rzecz wraca, czy zamiennik ma nowy rekord i czy środki idą do salda czy pierwotnej metody.", "Usuń rzecz z planu po potwierdzonym zwrocie, lecz trzymaj akta do wyniku finansowego. Zamiennik potrzebuje nowych dat QC i konsolidacji. Zwrot zmienia logistykę i pieniądze."] },
      { title: "Eskaluj chronologią, nie liczbą wiadomości", paragraphs: ["Po terminie podaj datę prośby, numer akceptacji, ostatni obiecany krok i brakujący status. Dołącz wcześniejszy dowód i użyj formalnej drogi w terminie. Nie publikuj danych osobowych, adresu, zamówienia ani płatności.", "Na końcu zapisz wartość, potrącenia, refund, cel i datę. Gdy liczby różnią się od warunków, poproś o rozpisanie bez automatycznego zarzutu. Uzupełnij notatkę o sprzedawcy i produkcie."] },
    ],
    checklist: ["Zapisać akceptację, ruch i zwrot pieniędzy jako osobne zdarzenia.", "Trzymać sprawę do widocznego finału finansowego."],
    faqs: [["Czy publikować zrzuty płatności, aby dostać odpowiedź?", "Nie. Użyj wsparcia lub sporu i usuń dane osobowe, adresowe, zamówienia i płatności z publikacji."]],
  },
};

const reviewPl: FullArticle = {
  lead: "Użyteczna recenzja Hipobuy nie mieści się w jednej ocenie ani dramatycznych zrzutach. Publiczne źródła pokazują różne sygnały: oficjalne karty opisują globalnego agenta, oceny zmieniają się według kraju, część użytkowników ceni QC i pomoc, inni pytają o transport, zwroty lub niejasne kroki. Ta analiza rozdziela źródła, pokazuje ich granice i zamienia je w kontrole przed dużą paczką.",
  keyPoints: ["Oficjalne funkcje opisują usługę, nie gwarantują wyniku.", "Oceny App Store są krajowe, nie globalne.", "Opinie pokazują tematy, nie dowodzą każdej obietnicy lub skargi.", "Najlepszym testem jest małe udokumentowane zamówienie z limitem."],
  visual: { label: "Mapa dowodów", title: "Co mówi każde źródło", intro: "Wniosek nie może być szerszy od dowodu.", columns: ["Źródło", "Sygnał", "Ograniczenie"], rows: [["Karta oficjalna", "Funkcje i reklamowane warunki", "Autoprezentacja, zmienna"], ["Ocena sklepu", "Nastroje w danym kraju", "Kraj, wersja, selekcja"], ["Publiczna opinia", "Temat do sprawdzenia", "Nieaudytowane doświadczenie"]] },
  sections: [
    { title: "Co Hipobuy publicznie deklaruje", paragraphs: ["Google Play opisuje zakupy z Taobao i 1688, obsługę zakupu, magazyn i wysyłkę. Reklamuje kupujących 24/7, 90 dni magazynu, ponad 200 krajów, tysiące opcji i dostawę od pięciu dni. 14 sierpnia 2026 karta pokazywała ponad 500 000 pobrań.", "Landing promuje ponad 100 000 wyborów, kupony i PayPal, Klarna, Visa, Mastercard oraz JCB. To komunikat handlowy, nie dostępność dla każdego konta. Trasę, czas, metodę i politykę trzeba sprawdzić dla kraju, produktu i dnia."] },
    { title: "Dlaczego jedna ocena nie opisuje wszystkich", paragraphs: ["Amerykański App Store pokazywał 3,1/5 z 261 ocen, kanadyjski 3,9 z 62. Google Play około czterech gwiazdek i ponad 500 000 pobrań, choć liczba opinii na stronie nie była spójna. To migawki. Ocena USA nie jest globalną oceną Hipobuy.", "Gwiazdy mieszają aplikację, towar sprzedawcy, odprawę i refund. Zmieniają się wersje, trasy i motywacja do pisania. Rzetelny tekst podaje sklep, kraj i datę, potem analizuje powody."] },
    { title: "Co chwalą pozytywne opinie", paragraphs: ["Powtarzają się prosty proces, użyteczne zdjęcia QC, szybka pomoc, staranne opakowanie, aktualizacje i dostawa zgodna z oczekiwaniem. Są to funkcje agenta możliwe do sprawdzenia.", "Szybka odpowiedź nie jest uniwersalnym poziomem, a tygodniowa paczka nie przewiduje innej trasy. Jakość towaru może zależeć od sprzedawcy. Zamień pochwałę w pytania o zdjęcia, odpowiedź i tracking."] },
    { title: "O co pytają krytyczne opinie", paragraphs: ["Krytyka dotyczy często wysokiej lub późno zrozumianej wysyłki, opłat zwrotnych, anulowania, refundu, komunikacji i interfejsu. To indywidualne twierdzenia, nie dowód oszustwa ani częstotliwości; często brakuje wymiarów, kraju i finału.", "Tematy prowadzą do kontroli: osobny budżet, wczesne zasady zwrotu, zapis wagi i wymiarów oraz jedna chronologia. Wyważona recenzja nie ukrywa skarg i nie uznaje ich automatycznie za fakt."] },
    { title: "Ostrzeżenie Trustpilot ma znaczenie", paragraphs: ["Trustpilot podaje, że ocena Hipobuy jest niedostępna z powodu naruszenia wytycznych i usunięto liczne fałszywe opinie. Nadal widać wpisy dobre i złe. Nie wolno przedstawiać starego rozkładu jako czystego dowodu ani wybierać tylko pochwał.", "Nie oznacza to, że każda pozostała opinia jest fałszywa. To opinie moderowane według zasad platformy. Ostrożnie podsumowujemy tematy, pokazujemy ostrzeżenie i nie kopiujemy zdjęć ani danych klientów."] },
    { title: "Jak przeprowadzić uczciwy test", paragraphs: ["Wybierz niedrogi, jasny i mierzalny artykuł. Zapisz ofertę, opcję, cenę, krajową dostawę i płatność. Ustal maksymalną sumę i regułę wyjścia. W magazynie zmierz statusy, QC i odpowiedź na jedno precyzyjne pytanie.", "Zapisz wagę, trzy wymiary, wagę rozliczeniową, trasy, opakowanie i sumę. Nie zmieniaj kilku rzeczy naraz. Wysyłaj tylko, gdy koszt, ochrona i tracking przechodzą regułę, a po odbiorze porównaj z QC."] },
    { title: "Wyważony werdykt: użyteczny proces, różne wyniki", paragraphs: ["Dowody pokazują publiczną aplikację z dużą liczbą pobrań i procesem zakupu, magazynu i transportu. Marketing podkreśla zasięg, czas, szybkość i pomoc. Opinie łączą użyteczność interfejsu, QC i wsparcia z frustracją dotyczącą kosztów, refundów i komunikacji. Oceny krajowe się różnią, a ostrzeżenie Trustpilot wyklucza prosty werdykt.", "Nie można zagwarantować, że każdy zakup będzie bezpieczny, tani lub szybki, ani uznać każdej skargi za typową. Liczą się sprzedawca, dowody, opakowanie, trasa, kraj i decyzje. Mały test, osobny budżet, zapis QC i termin zwrotu to najsolidniejsza podstawa."] },
  ],
  checklist: ["Podawać kraj i datę oceny.", "Oddzielać reklamę i relacje użytkowników.", "Ustalić budżet produktu i limit transportu.", "Testować mierzalny artykuł.", "Zapisać ofertę, płatność, QC, paczkę i trasę.", "Wyjaśnić zwrot przed problemem.", "Ocenić wsparcie konkretnym pytaniem.", "Nie publikować danych zamówienia ani płatności."],
  faqs: [["Czy Hipobuy jest legalny i wiarygodny?", "Karty i pobrania pokazują działającą usługę, ale nie gwarantują sprzedawcy, kosztu, refundu ani jednego wyniku."], ["Jaką ocenę ma Hipobuy?", "Nie ma jednej globalnej oceny. Zmienia się według sklepu i kraju; Trustpilot nie pokazuje teraz wyniku po naruszeniu wytycznych."], ["Czy opinie są wiarygodne?", "Traktuj je jako nieaudytowane doświadczenia, szukaj tematów, pokazuj ostrzeżenia i weryfikuj własnymi danymi."], ["Co sprawdzić na początku?", "Wariant, QC, opłaty, wymiary, trasę, wsparcie i koszt całkowity."]],
};

export const localizedSectionDetails: Record<Lang, Record<LegacySlug, string[]>> = {
  en: {
    "how-to-buy-with-hipobuy": [
      "Beside every advertised claim, note the exact account screen where you will verify it. This keeps public marketing separate from what your own order can actually use on that date.",
      "A contingency is not extra shopping money. It covers an explained variance; if the controlled total crosses the limit, returning, splitting or postponing may be the better decision.",
      "Do not score the test only by speed. A slower but transparent cycle can be easier to control than a fast order whose fees and choices appear after substantial money is committed.",
      "Record uneventful deliveries too. If you save only problems, your personal history becomes negatively biased and less useful when you compare a later route.",
    ],
    "hipobuy-shipping-cost-guide": [
      "A review from another country rarely shares your postcode, tax context and available lines. Even two four-kilogram parcels can occupy very different space and are not a clean comparison.",
      "Confirm that the measurements describe the final outer carton rather than an intermediate package. Only the shape handed to the carrier explains the final volumetric input.",
      "Put every scenario in the same currency and use the same conversion assumption. Otherwise an apparent route advantage may come only from two different exchange calculations.",
      "Keep rejected routes and the reason they failed. Knowing that size or contents removed an option saves time when a similar parcel reaches the warehouse later.",
    ],
    "hipobuy-warehouse-qc-photos": [
      "Separate image quality from product quality. A sharp photograph can prove that the wrong variant arrived; good photography does not make the item correct.",
      "Use a reference you understand, such as a garment that fits and has known measurement points. A third-party size table helps only when it measures the same places.",
      "Write the threshold beside the item. Later you can see whether new evidence changed the decision or whether waiting time and sunk cost changed your tolerance.",
      "Do not publish saved QC images automatically. They can contain order or warehouse identifiers and are primarily private evidence for your decision.",
    ],
    "hipobuy-actual-vs-volumetric-weight": [
      "Calculate with the units used by the route. Combining centimetres with a divisor designed for inches produces a plausible-looking but incorrect result.",
      "A useful reduction should cross a rounding or size band. Removing a few millimetres with no tariff effect may not justify an extra handling service.",
      "When splitting, each parcel must independently satisfy content restrictions. A mathematically cheaper plan is useless if one of the two lines cannot accept its contents.",
      "Ask for measurable inputs, not a general price promise. Weight and dimensions can be audited later; a statement that shipping should be cheap cannot.",
    ],
    "hipobuy-90-day-warehouse-storage": [
      "Even when several items arrive together, check each row. Processing and seller rules can create different operational deadlines despite the same calendar day.",
      "A traffic-light field helps: green is ready, amber has one named action and date, and red needs return or urgent clarification. An item without a next step is already blocking.",
      "Add a quantity or volume ceiling. Storage time may remain even though the planned parcel is already large enough that another purchase makes it worse.",
      "Use a wider buffer for a fixed event than for an ordinary purchase. The fastest advertised time should never be the only cushion before travel, a gift or a season.",
    ],
    "hipobuy-warehouse-return-checklist": [
      "When review sources show a moderation warning, record it next to the theme. This prevents a striking selection of praise or criticism from being presented as representative.",
      "With multilingual support, preserve the original message and add one short summary. Repeated free translations can accidentally change amounts or the remedy being requested.",
      "After every status change, update the parcel draft. Removing or replacing an item can alter weight, dimensions, route choice and the planned dispatch date.",
      "An escalation should remain factual but include a next date. Without one it becomes another open message, not a commitment that can later be checked.",
    ],
  },
  de: {
    "how-to-buy-with-hipobuy": [
      "Notiere neben jeder Werbeaussage die konkrete Kontoseite, auf der du sie später bestätigst. So bleibt erkennbar, welcher Teil öffentlich beworben und welcher Teil für deinen Auftrag tatsächlich verfügbar war.",
      "Ein sinnvoller Risikopuffer ist kein zusätzlicher Einkaufsbetrag. Er bleibt unberührt, bis eine nachvollziehbare Gebühr oder Kursabweichung erscheint; wird das Limit überschritten, wird nicht aus Bequemlichkeit weitergezahlt.",
      "Bewerte den Test nicht nur nach schneller Lieferung. Ein langsamer, aber klar erklärter Ablauf kann besser steuerbar sein als ein schneller Auftrag, bei dem Kosten und Entscheidungen erst im Nachhinein sichtbar werden.",
      "Bei einem unauffälligen Empfang genügt ebenfalls ein kurzer Abschlussdatensatz. Er verhindert, dass nur problematische Bestellungen dokumentiert werden und dein persönlicher Vergleich dadurch unnötig negativ verzerrt ist.",
    ],
    "hipobuy-shipping-cost-guide": [
      "Bewertungen aus Deutschland, Spanien oder Kanada sind nicht automatisch aufeinander übertragbar. Selbst im gleichen Land können Postleitzahl, Produktart und Zeitpunkt andere Linien und Aufschläge erzeugen.",
      "Kontrolliere außerdem, ob Maße außen am fertigen Karton oder an einer Zwischenverpackung genommen wurden. Nur die für den Versand verwendete Außenform erklärt die endgültige Volumenberechnung.",
      "Schreibe die Szenarien in derselben Währung und mit demselben Wechselkurs. Sonst kann ein scheinbarer Routenvorteil nur aus einer unterschiedlichen Umrechnung entstehen.",
      "Der Datensatz sollte auch fehlgeschlagene Szenarien enthalten. Zu wissen, warum eine Linie wegen Größe oder Inhalt ausschied, spart bei einem ähnlichen Paket später Zeit.",
    ],
    "hipobuy-warehouse-qc-photos": [
      "Trenne die Qualität des Bildes von der Qualität des Artikels. Ein hochauflösendes Foto kann eine falsche Variante deutlich zeigen; gute Fotografie macht den Inhalt nicht automatisch richtig.",
      "Nutze eine Referenz, die du selbst verstehst, etwa ein passendes Kleidungsstück mit bekannten Maßen. Fremde Größentabellen helfen nur, wenn Messpunkte und Einheiten übereinstimmen.",
      "Halte die Schwelle in einem kurzen Satz neben dem Artikel fest. Damit wird später sichtbar, ob neue Information die Entscheidung änderte oder nur der Zeitdruck.",
      "Veröffentliche gespeicherte QC-Bilder nicht automatisch. Sie können Bestellnummern, Lagerkennungen oder andere Daten enthalten und sind in erster Linie dein privater Entscheidungsbeleg.",
    ],
    "hipobuy-actual-vs-volumetric-weight": [
      "Rechne ein Beispiel immer mit den Einheiten der Route. Zentimeter mit einem für Zoll gedachten Divisor zu mischen erzeugt einen plausibel aussehenden, aber falschen Wert.",
      "Eine Reduktion sollte groß genug sein, eine Rundungs- oder Größenstufe zu verändern. Wenige Millimeter ohne Tarifwirkung rechtfertigen möglicherweise keine zusätzliche Bearbeitung.",
      "Bei einer Teilung müssen beide Pakete separat den Inhaltseinschränkungen entsprechen. Eine mathematisch günstigere Aufteilung ist wertlos, wenn eine Teilstrecke nicht buchbar ist.",
      "Bitte um Daten, nicht um eine pauschale Preisgarantie. Gewicht und Außenmaß lassen sich später vergleichen; eine allgemeine Aussage wie ‘ungefähr günstig’ nicht.",
    ],
    "hipobuy-90-day-warehouse-storage": [
      "Wenn mehrere Artikel am gleichen Tag erscheinen, prüfe trotzdem jede Zeile einzeln. Unterschiedliche Bearbeitung oder Verkäuferregeln können zu anderen operativen Fristen führen.",
      "Ein einfaches Ampelfeld hilft: Grün ist bereit, Gelb hat genau eine offene Aktion, Rot braucht Rückgabe oder sofortige Klärung. Ein Artikel ohne Besitzer und Datum bleibt nicht neutral, sondern blockiert.",
      "Definiere zusätzlich eine Mengen- oder Volumengrenze. Auch wenn noch Zeit übrig ist, kann das geplante Paket bereits groß genug sein und durch weitere Käufe schlechter werden.",
      "Plane für feste Termine konservativer als für gewöhnliche Einkäufe. Eine beworbene Bestzeit darf nie der einzige Puffer vor Reise, Geburtstag oder Saisonende sein.",
    ],
    "hipobuy-warehouse-return-checklist": [
      "Vermerke bei Bewertungsquellen immer, ob die Plattform eine Moderationswarnung zeigt. Das schützt davor, eine auffällige Auswahl an Lob oder Kritik als repräsentativ darzustellen.",
      "Übersetze bei mehrsprachigem Support nicht frei zwischen mehreren Versionen. Bewahre den ursprünglichen Wortlaut und ergänze eine kurze klare Zusammenfassung, damit Zahlen und gewünschtes Ergebnis gleich bleiben.",
      "Prüfe nach jeder Statusänderung auch den Paketentwurf. Ein entferntes oder ersetztes Produkt kann Gewicht, Maße, Routenwahl und den geplanten Versandtag verändern.",
      "Eine Eskalation bleibt sachlich, nennt aber eine klare nächste Frist. Ohne Datum entsteht nur eine weitere offene Nachricht, die sich später schwer von einer echten Zusage unterscheiden lässt.",
    ],
  },
  es: {
    "how-to-buy-with-hipobuy": [
      "Junto a cada promesa apunta la pantalla concreta donde la verificarás. Así distingues con claridad lo que la marca anuncia de lo que tu cuenta ofrece realmente ese día.",
      "La reserva no es dinero extra para seguir comprando. Solo cubre una variación explicable; si el total supera tu límite, la decisión correcta puede ser devolver o no enviar todavía.",
      "No valores el ensayo solo por rapidez. Un ciclo más lento pero transparente puede ser más útil que otro veloz en el que tasas y opciones aparecen cuando ya has comprometido demasiado.",
      "Registra también los pedidos sin incidencias. Si solo guardas problemas, tu historial personal exagerará el riesgo y será menos útil para comparar una próxima ruta.",
    ],
    "hipobuy-shipping-cost-guide": [
      "Una opinión de otro país rara vez comparte código postal, fiscalidad y líneas disponibles. Incluso dos paquetes de cuatro kilos pueden ocupar volúmenes muy distintos y no son una comparación limpia.",
      "Comprueba que las medidas correspondan a la caja exterior definitiva y no a un embalaje intermedio. Solo la forma entregada al transportista explica el cálculo final.",
      "Convierte todos los escenarios con la misma moneda y tipo de cambio. De lo contrario, una aparente ventaja puede proceder únicamente de dos conversiones diferentes.",
      "Conserva también las rutas descartadas y su motivo. Saber que una opción falló por tamaño o contenido evita repetir la misma investigación con un paquete parecido.",
    ],
    "hipobuy-warehouse-qc-photos": [
      "Separa calidad de imagen y calidad del producto. Una foto nítida puede demostrar perfectamente que llegó la variante equivocada; la buena fotografía no mejora el artículo.",
      "Usa una referencia propia, como una prenda que te queda bien y cuyos puntos de medida conoces. Una tabla ajena solo sirve si define exactamente los mismos puntos.",
      "Escribe el límite junto a la línea del producto. Después podrás ver si cambió por nueva evidencia o por la presión de haber esperado y pagado.",
      "No publiques automáticamente las imágenes guardadas. Pueden contener identificadores de pedido o almacén y su primera función es apoyar tu decisión privada.",
    ],
    "hipobuy-actual-vs-volumetric-weight": [
      "Usa las unidades de la propia ruta. Mezclar centímetros con un divisor diseñado para pulgadas produce una cifra creíble, pero equivocada.",
      "La reducción útil debe cruzar un redondeo o banda de tamaño. Quitar unos milímetros sin efecto tarifario puede no justificar un servicio adicional.",
      "En una división, cada paquete debe cumplir por separado las restricciones. El mejor resultado matemático no sirve si una de las dos líneas no admite su contenido.",
      "Pide datos medibles y no una promesa general de precio. Peso y dimensiones se pueden auditar; ‘debería ser barato’ no.",
    ],
    "hipobuy-90-day-warehouse-storage": [
      "Aunque varios artículos lleguen el mismo día, revisa cada fila. Procesamiento y reglas del vendedor pueden dejar plazos operativos distintos.",
      "Un semáforo ayuda: verde listo, amarillo una acción con responsable y fecha, rojo devolución o aclaración inmediata. Un artículo sin siguiente paso ya es un bloqueo.",
      "Añade un límite de cantidad o volumen. Puede quedar tiempo de almacén y, sin embargo, el paquete ya ser suficientemente grande para empeorar con otra compra.",
      "Para una fecha fija utiliza un margen mayor que para una compra normal. El mejor plazo anunciado nunca debe ser el único colchón antes de un viaje o regalo.",
    ],
    "hipobuy-warehouse-return-checklist": [
      "Al usar opiniones, registra cualquier aviso de moderación del portal. Evita presentar una selección llamativa de elogios o quejas como si representara a todos.",
      "Si soporte usa otro idioma, conserva el mensaje original y añade una síntesis breve. No hagas varias traducciones libres que cambien importes o el resultado solicitado.",
      "Tras cada cambio revisa también el borrador del paquete. Quitar o sustituir un artículo puede alterar peso, dimensiones, ruta y fecha prevista.",
      "La escalación debe ser factual, pero incluir una próxima fecha. Sin ella solo añades otro mensaje abierto difícil de distinguir de un compromiso real.",
    ],
  },
  it: {
    "how-to-buy-with-hipobuy": [
      "Accanto a ogni promessa segna la schermata in cui la verificherai. Resta così distinta la pubblicità da ciò che l’account rende disponibile davvero in quella data.",
      "La riserva non è budget per aggiungere prodotti. Copre solo una variazione spiegabile; oltre il limite può essere meglio rendere, dividere o rinviare il pacco.",
      "Non giudicare il test soltanto dalla velocità. Un ciclo più lento ma trasparente può essere più controllabile di uno rapido con costi visibili solo alla fine.",
      "Registra anche gli ordini senza problemi. Conservare soltanto incidenti rende il tuo storico troppo negativo e meno utile per il confronto futuro.",
    ],
    "hipobuy-shipping-cost-guide": [
      "Una recensione di un altro paese raramente condivide CAP, imposte e linee. Anche due pacchi dello stesso peso possono avere volumi molto diversi.",
      "Verifica che le misure siano del cartone esterno definitivo, non di un imballo intermedio. Solo quella forma spiega il calcolo consegnato al vettore.",
      "Confronta scenari nella stessa valuta e con lo stesso cambio. Altrimenti un vantaggio apparente può dipendere solo da conversioni diverse.",
      "Salva anche le rotte escluse e il motivo. Sapere che una linea fallì per dimensione o contenuto evita di ripetere il lavoro.",
    ],
    "hipobuy-warehouse-qc-photos": [
      "Separa qualità della foto e qualità dell’articolo. Un’immagine nitida può dimostrare benissimo una variante errata; non rende corretto il prodotto.",
      "Usa un riferimento personale con punti di misura noti. Una tabella estranea serve solo quando misura esattamente negli stessi punti.",
      "Scrivi la soglia accanto alla riga. In seguito vedrai se la decisione è cambiata per nuova prova o solo per pressione di tempo e costo.",
      "Non pubblicare automaticamente le foto. Possono contenere codici di ordine o magazzino e servono prima di tutto alla tua decisione privata.",
    ],
    "hipobuy-actual-vs-volumetric-weight": [
      "Calcola con le unità della rotta. Mescolare centimetri e un divisore per pollici produce un valore plausibile ma sbagliato.",
      "Una riduzione utile deve superare un arrotondamento o una fascia. Pochi millimetri senza effetto non giustificano sempre un servizio.",
      "Con due pacchi, ciascuno deve rispettare le restrizioni. Il risultato matematico migliore è inutile se una linea non accetta il contenuto.",
      "Chiedi valori misurabili, non una promessa generica. Peso e dimensioni si confrontano; ‘dovrebbe costare poco’ no.",
    ],
    "hipobuy-90-day-warehouse-storage": [
      "Anche se più articoli arrivano insieme, controlla ogni riga. Lavorazione e regole del venditore possono creare scadenze operative differenti.",
      "Usa un semaforo: verde pronto, giallo una sola azione con responsabile e data, rosso reso o chiarimento urgente. Senza azione l’articolo blocca.",
      "Aggiungi un limite di quantità o volume. Può restare tempo ma il pacco essere già grande abbastanza da peggiorare con un altro acquisto.",
      "Per una data fissa usa più margine di un acquisto normale. Il tempo migliore pubblicizzato non deve essere l’unico cuscinetto.",
    ],
    "hipobuy-warehouse-return-checklist": [
      "Quando usi recensioni, registra gli avvisi di moderazione. Impedisce di presentare una selezione evidente come rappresentativa di tutti.",
      "Con assistenza multilingue conserva il messaggio originale e una sintesi breve. Più traduzioni libere possono cambiare importi e richiesta.",
      "Dopo ogni stato aggiorna il progetto del pacco. Un articolo rimosso o sostituito cambia peso, misure, rotta e data.",
      "L’escalation resta fattuale ma fissa una prossima data. Senza scadenza è solo un altro messaggio aperto, non un impegno verificabile.",
    ],
  },
  pl: {
    "how-to-buy-with-hipobuy": [
      "Przy każdej obietnicy zapisz ekran, na którym ją sprawdzisz. Oddzielisz reklamę od funkcji rzeczywiście dostępnej na twoim koncie danego dnia.",
      "Rezerwa nie służy do dokładania produktów. Pokrywa wyjaśnioną różnicę; ponad limit lepiej zwrócić, podzielić lub odłożyć wysyłkę.",
      "Nie oceniaj testu tylko szybkością. Wolniejszy, przejrzysty cykl może być łatwiejszy do kontroli niż szybki z kosztami pokazanymi na końcu.",
      "Zapisuj również zamówienia bez problemów. Same incydenty zniekształcą własną historię i utrudnią uczciwe porównanie następnej trasy.",
    ],
    "hipobuy-shipping-cost-guide": [
      "Opinia z innego kraju rzadko ma ten sam kod, podatki i linie. Dwie paczki o tej samej wadze mogą zajmować inną przestrzeń.",
      "Upewnij się, że wymiary dotyczą końcowego kartonu zewnętrznego, nie etapu pośredniego. Tylko ta forma wyjaśnia naliczenie przewoźnika.",
      "Porównuj scenariusze w jednej walucie i przy jednym kursie. Inaczej pozorna przewaga może pochodzić wyłącznie z przeliczenia.",
      "Zachowaj odrzucone trasy i powód. Informacja o limicie rozmiaru lub zawartości oszczędzi badania przy podobnej paczce.",
    ],
    "hipobuy-warehouse-qc-photos": [
      "Oddziel jakość zdjęcia od jakości rzeczy. Ostry obraz może doskonale pokazać zły wariant; dobra fotografia nie poprawia produktu.",
      "Użyj własnego wzorca o znanych punktach pomiaru. Obca tabela pomaga tylko wtedy, gdy mierzy dokładnie w tych samych miejscach.",
      "Zapisz próg przy produkcie. Później rozpoznasz, czy decyzję zmienił nowy dowód, czy presja czasu i wydanych pieniędzy.",
      "Nie publikuj zdjęć automatycznie. Mogą zawierać identyfikatory, a przede wszystkim są prywatnym dowodem twojej decyzji.",
    ],
    "hipobuy-actual-vs-volumetric-weight": [
      "Licz w jednostkach trasy. Centymetry z dzielnikiem dla cali tworzą wiarygodnie wyglądający, lecz błędny wynik.",
      "Zmiana powinna przekroczyć zaokrąglenie lub próg. Kilka milimetrów bez wpływu na taryfę może nie uzasadniać usługi.",
      "Przy podziale każda paczka osobno musi spełniać ograniczenia. Matematycznie lepszy układ nie pomaga, jeśli linia odrzuca zawartość.",
      "Proś o mierzalne dane, nie ogólną obietnicę ceny. Wagę i wymiary można później sprawdzić; ‘powinno być tanio’ nie.",
    ],
    "hipobuy-90-day-warehouse-storage": [
      "Nawet przy wspólnym dniu dostawy sprawdź każdą pozycję. Obróbka i zasady sprzedawcy mogą tworzyć różne terminy.",
      "Użyj świateł: zielone gotowe, żółte jedna akcja z osobą i datą, czerwone zwrot lub pilne wyjaśnienie. Brak kroku blokuje.",
      "Dodaj limit liczby lub objętości. Może zostać czas, choć paczka jest już wystarczająco duża i kolejny zakup ją pogorszy.",
      "Dla stałej daty zostaw większy bufor. Najlepszy reklamowany czas nie może być jedynym zapasem przed wyjazdem lub prezentem.",
    ],
    "hipobuy-warehouse-return-checklist": [
      "Przy opiniach zapisuj ostrzeżenia moderacyjne serwisu. Nie przedstawisz wtedy wybranych pochwał lub skarg jako obrazu wszystkich klientów.",
      "W obsłudze wielojęzycznej zachowaj oryginał i krótkie podsumowanie. Kolejne swobodne tłumaczenia mogą zmienić kwoty lub żądanie.",
      "Po zmianie statusu popraw plan paczki. Usunięta lub wymieniona rzecz wpływa na wagę, wymiary, trasę i termin.",
      "Eskalacja pozostaje rzeczowa, lecz zawiera następną datę. Bez niej powstaje kolejna otwarta wiadomość, nie sprawdzalne zobowiązanie.",
    ],
  },
};

const reviewSectionDetails: Record<Lang, string[]> = {
  en: [
    "Google Play also carries developer-provided data-safety disclosures about possible collection of location and personal information and possible sharing of device identifiers. Review permissions and deletion options; the disclosure is not an independent security certification.",
    "Even the displayed review total can vary within a store page. Avoid turning an apparently exact count into permanent SEO copy; keep the check date and scale instead.",
    "When a review praises product quality, separate responsibilities. The agent organises purchase and warehouse handling, while manufacture and product characteristics belong to the third-party seller.",
    "Criticism becomes most useful when it creates a control before payment. Without a pre-set gate, the same concern may surface only after too much money is committed.",
    "The moderation warning should sit beside any Trustpilot summary. Hiding it in a distant footnote would separate the most important caveat from the numbers shaping the reader’s impression.",
    "A fair test records the normal price and discount separately. An exceptional coupon can make a cost look sustainable when the next unpromoted order will not be.",
    "Revisit the conclusion when app versions, policies or moderation status change. This is dated research, not a permanent seal of quality.",
  ],
  de: [
    "Zusätzlich nennt Google Play in der Datensicherheitssektion mögliche Erfassung von Standort und persönlichen Daten sowie eine mögliche Weitergabe von Gerätekennungen. Diese Entwicklerangaben sind ein Anlass, Berechtigungen und Löschoptionen selbst zu prüfen, keine unabhängige Sicherheitszertifizierung.",
    "Auch die sichtbare Zahl von Bewertungen kann innerhalb einer Store-Seite abweichen. Verwende deshalb keine scheinbar exakte Gesamtzahl als dauerhafte SEO-Aussage, sondern Datum und ungefähre Größenordnung.",
    "Prüfe bei Lob für Produktqualität immer, welche Leistung bewertet wird. Der Agent organisiert Kauf und Lager; Herstellung und tatsächliche Produktmerkmale liegen beim Drittverkäufer.",
    "Kritik wird besonders nützlich, wenn sie in einen vorher festgelegten Kontrollpunkt übersetzt wird. Ohne solche Regeln beeinflusst dieselbe Information die Entscheidung erst, nachdem bereits viel Geld gebunden ist.",
    "Der Moderationshinweis gehört in Überschrift oder unmittelbaren Kontext jeder Trustpilot-Zusammenfassung. Eine versteckte Fußnote würde den wichtigsten Vorbehalt zu weit vom Eindruck der Zahlen trennen.",
    "Ein fairer Test darf nicht durch einen außergewöhnlich hohen Gutschein verzerrt werden. Notiere Normalpreis und Rabatt getrennt, damit das Ergebnis nach Ablauf der Aktion noch vergleichbar bleibt.",
    "Das Urteil sollte nach neuen App-Versionen, Richtlinien oder einer veränderten Moderationslage überprüft werden. Es ist eine datierte Recherche, kein dauerhaftes Gütesiegel.",
  ],
  es: [
    "Google Play también declara posible recopilación de ubicación y datos personales y posible intercambio de identificadores. Es información aportada por el desarrollador: invita a revisar permisos y borrado, pero no es una certificación independiente.",
    "Incluso el número de reseñas puede variar dentro de una misma ficha. Evita una cifra aparentemente exacta como frase SEO permanente; conserva fecha y orden de magnitud.",
    "Cuando una opinión elogia la calidad, separa funciones. El agente organiza compra y almacén; fabricación y características pertenecen al vendedor externo.",
    "La crítica resulta más útil cuando se convierte en un control previo. Sin un límite, la misma duda aparece después de haber inmovilizado demasiado dinero.",
    "El aviso de moderación debe estar junto a cualquier resumen de Trustpilot. Una nota lejana separaría la principal cautela de las cifras que condicionan la impresión.",
    "Un ensayo justo guarda precio normal y descuento por separado. Un cupón excepcional puede hacer parecer sostenible un coste que no lo será en el siguiente pedido.",
    "La conclusión debe revisarse cuando cambien versiones, políticas o moderación. Es una investigación fechada, no un sello permanente de calidad.",
  ],
  it: [
    "Google Play dichiara anche possibile raccolta di posizione e dati personali e condivisione di identificatori. Sono informazioni del developer: richiedono controllo di permessi e cancellazione, non sono una certificazione indipendente.",
    "Perfino il numero delle recensioni può differire nella stessa scheda. Evita una cifra esatta come frase SEO permanente; conserva data e ordine di grandezza.",
    "Quando viene lodata la qualità, separa i ruoli. L’agente gestisce acquisto e magazzino; produzione e caratteristiche dipendono dal venditore esterno.",
    "La critica diventa utile se trasformata in controllo prima del pagamento. Senza una soglia, lo stesso dubbio emerge dopo aver impegnato troppo denaro.",
    "L’avviso di moderazione deve stare vicino a ogni sintesi Trustpilot. Una nota lontana separerebbe il principale limite dai numeri che formano l’impressione.",
    "Un test corretto salva prezzo normale e sconto separati. Un coupon eccezionale può far sembrare sostenibile un costo che non lo sarà dopo la promozione.",
    "La conclusione va aggiornata quando cambiano app, politiche o moderazione. È una ricerca datata, non un marchio di qualità permanente.",
  ],
  pl: [
    "Google Play deklaruje też możliwe zbieranie lokalizacji i danych osobowych oraz udostępnianie identyfikatorów. To dane dewelopera: warto sprawdzić uprawnienia i usuwanie, lecz nie są niezależnym certyfikatem.",
    "Nawet liczba recenzji może różnić się w obrębie jednej karty. Nie używaj dokładnej liczby jako stałego hasła SEO; podaj datę i skalę.",
    "Przy pochwałach jakości rozdziel role. Agent organizuje zakup i magazyn, a produkcja oraz cechy rzeczy zależą od zewnętrznego sprzedawcy.",
    "Krytyka pomaga, gdy staje się kontrolą przed płatnością. Bez progu ten sam problem pojawia się dopiero po związaniu dużej kwoty.",
    "Ostrzeżenie moderacyjne musi być obok podsumowania Trustpilot. Odległy przypis oddzieliłby najważniejsze zastrzeżenie od liczb budujących wrażenie.",
    "Uczciwy test zapisuje cenę zwykłą i rabat osobno. Wyjątkowy kupon może ukryć koszt, który po promocji nie będzie rozsądny.",
    "Wniosek trzeba aktualizować po zmianie aplikacji, zasad lub moderacji. To datowane badanie, nie trwały znak jakości.",
  ],
};

export const articleExpansions: Record<Lang, Record<LegacySlug, ArticleExpansion>> = {
  en,
  de,
  es,
  it,
  pl,
};

function addReviewDetails(lang: Lang, body: FullArticle): FullArticle {
  const details = reviewSectionDetails[lang];
  const parity = lang === "en" ? undefined : reviewParityDetails[lang];
  return {
    ...body,
    sections: body.sections.map((section, index) => ({
      ...section,
      paragraphs: details[index]
        ? [...section.paragraphs, [details[index], parity?.[index]].filter(Boolean).join(" ")]
        : section.paragraphs,
    })),
  };
}

export const reviewArticles: Record<Lang, FullArticle> = {
  en: addReviewDetails("en", reviewEn),
  de: addReviewDetails("de", reviewDe),
  es: addReviewDetails("es", reviewEs),
  it: addReviewDetails("it", reviewIt),
  pl: addReviewDetails("pl", reviewPl),
};
