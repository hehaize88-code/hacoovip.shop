// Original editorial workflows. Examples are explicitly illustrative, not live offers.
const section = (id, heading, text, table) => ({ id, nav: heading, heading, paragraphs: text.trim().split(/\n\s*\n/), ...(table ? { table } : {}) });
const resource = (href, label, note) => ({ href, label, note });
const common = {
  kind: "comparison", published: "2026-10-04", modified: "2026-10-04",
  publishedLabel: "October 4, 2026", checkedLabel: "October 4, 2026",
  read: "7 min", sectionLabel: "Hacoo spreadsheet / Practical research",
};

export const comparisonArticles = [
  {
    ...common,
    slug: "hacoo-spreadsheet-men-clothing-finds",
    title: "Hacoo Spreadsheet for Men: Build a Useful Clothing Shortlist",
    seoTitle: "Hacoo Spreadsheet for Men: Clothing & Shoe Checks",
    description: "Use a Hacoo spreadsheet for men's clothing with a practical shortlist for shoes, tops and layers, matched measurements and a clear comparison worksheet.",
    excerpt: "Build a small men's clothing shortlist around existing outfits, measured fit and evidence gaps instead of collecting unrelated links.",
    keywords: ["hacoo spreadsheet men", "hacoo spreadsheet for men", "hacoo clothing finds", "hacoo menswear spreadsheet"],
    image: { path: "/products/pants-relaxed.webp", width: 750, height: 750, alt: "Relaxed trousers as an editorial menswear reference", caption: "A clothing reference for comparing proportions and intended use." },
    lead: "A useful Hacoo spreadsheet for men starts with the clothes you need, then narrows the links you open. This guide turns shoes, tops, trousers and layers into a manageable shortlist. It is a research method for an independent directory, not a ranked list of tested purchases or a promise that a linked item is currently available.",
    sections: [
      section("wardrobe", "Start with one missing role in your wardrobe", `Write down the situation you are trying to cover before searching: everyday trousers for a long commute, a sweatshirt to wear beneath a jacket, or shoes for casual outfits. Add the conditions that matter, such as room for a base layer or a hem that does not drag. A specific role gives you a reason to reject attractive items that do not solve the original problem.

Choose one existing outfit as your reference. Photograph it for your own notes and list the proportions you want to preserve. A relaxed top may work with your current trousers but not with a jacket that has narrow sleeves. This does not make either item universally good or bad; it identifies a compatibility question that the spreadsheet should help you answer.

Keep the first shortlist to two or three candidates for the same role. Comparing three trousers is usually more useful than comparing a watch, a hoodie and a pair of shoes in one ranking. Separate clothing fit, footwear fit and accessory specifications into their own decisions. The word men in a search query is a discovery label, not evidence that every item will fit a particular body.`),
      section("routes", "Choose a category before choosing a product", `Use the category index to reach the relevant research page, then open the current external listing when you need its options. Hacoo Pro is an independent discovery site. Its catalog destination is separate from the official Hacoo service, and a link between sites does not establish that a product, account or order is shared between them.

For an everyday clothing shortlist, start with trousers or shorts if they are the missing item, then consider tops or a layer only when needed. Shoes deserve a separate measurement record because footwear size labels cannot be compared with garment widths. Accessories should have their own dimensions, attachment or compatibility checks rather than receiving a clothing fit score.

An editorial reference is a starting point for research. It is not a tested best buy, an authenticity judgment or a live stock report. Check the date attached to the reference and inspect the actual selected option on the destination. If the thumbnail and destination describe different items, leave the row unresolved instead of using the photograph as proof.`, { headers: ["Role", "Useful comparison", "Do not assume"], rows: [["Everyday top", "Chest width, length, sleeve method", "Your usual letter size will match"], ["Trousers", "Waist method, rise, inseam, opening", "A stretch range is a relaxed measurement"], ["Layer", "Room over your reference outfit", "More chest room means longer sleeves"], ["Shoes", "Foot length and chart definition", "A regional size conversion proves fit"]] }),
      section("measurements", "Make one reference measurement sheet", `Measure an item you already own that fits the intended use. Lay it flat without stretching and write down the endpoints you used. For a top, chest width normally means a straight measurement across the garment, while body circumference goes around the person. Keep those labels explicit. Compare a garment chart with your garment reference only when both use the same method.

For trousers, note whether the waistband is relaxed, stretched or fixed. Record rise and inseam separately: two pairs with the same outer length can place the waistband and hem differently. If a listing provides only a letter size and a model photograph, the missing measurements remain missing. Do not fill them in from another visually similar pair.

Measure your existing garment twice and retain a sensible level of precision for a household tape. A tiny apparent difference may be caused by a fold, tension or a changed endpoint. The goal is a repeatable comparison, not a claim of laboratory accuracy. Keep body measurements private and share only the particular dimension needed if you request clarification.`),
      section("worksheet", "Compare candidates in the same order", `Give each row a short identifier and record the full destination address, selected color, selected size, visible material description and check date. Add the reference measurements beside the listing values rather than keeping them in separate browser tabs. A blank cell means not confirmed. It should never silently become zero, average or probably the same as the other item.

Review fit first, then construction evidence, intended use and current total cost. This order prevents a low headline price from rescuing an item that has already failed a necessary measurement. You can prefer a particular style, but label that as a preference. Visible seam details, stated composition and current option availability are different kinds of evidence and should stay separate in your notes.

For a practical example, imagine you need trousers to wear with shoes you already own. Candidate A lists inseam and rise but omits the leg opening. Candidate B provides those dimensions but only for a different size. Neither row is fully comparable yet. The next action is a specific measurement request, not a confident recommendation based on the more appealing photograph.`),
      section("evidence", "Use photographs for the questions they can answer", `Look for full front and back views, then the details relevant to the garment: pocket openings, fastening, hems, seams and any area that will sit beneath another layer. A close photograph may reveal visible construction, but it cannot establish long-term durability or how fabric feels on your skin. Keep those limits beside the observation rather than converting a tidy image into a quality guarantee.

Match images to the candidate and selected option. A review of a different color, a different size or an earlier version may provide context, but it is weaker evidence for your exact row. A seller-provided chart, a general promotional photograph and item-specific measurement evidence serve different purposes. Write down which kind you have before deciding whether a missing detail has been answered.

If only styled photographs are available, retain the item as a discovery lead and identify the next needed fact. For example, ask for flat chest width in the selected size or a clear view of the trouser closure. One focused request is easier to evaluate than a broad question about whether the item is good.`),
      section("decision", "Finish with a decision and an unresolved list", `Use three practical outcomes: continue researching, reject for a stated reason, or ready for a final live check. Record the reason in one sentence. A candidate can be rejected because its stated inseam does not suit your reference; it should not be rejected merely because a missing number was guessed incorrectly. Unknown evidence calls for clarification, not an invented score.

Before moving beyond research, reopen the exact option and review the price, destination, availability and terms shown for that selection. Save the current details needed for your own decision. Do not carry a delivery estimate, review or return condition from a different website into this listing. Hacoo Pro does not process the transaction or control the external catalog.

Keep the shortlist after you finish. The useful record is the method, dimensions and reason for the decision, not a growing collection of stale links. When a product changes, update its row with a new date and repeat the affected checks. Your next clothing search should begin with a better reference item and clearer requirements, not with an assumption that last season's result still applies.`),
    ],
    checklistTitle: "A men's clothing shortlist you can actually use",
    checklist: [
      { title: "Name the role", text: "Choose one gap in an existing outfit and define the fit or compatibility requirement." },
      { title: "Keep the comparison small", text: "Compare two or three candidates of the same type with consistently labeled measurements." },
      { title: "Write down the uncertainty", text: "Separate known listing details, personal preferences and the evidence still needed." },
    ],
    sources: [resource("/spreadsheet/", "Hacoo spreadsheet", "start with the independent category directory"), resource("/categories/pants-shorts/", "Trousers and shorts checks", "compare waist, rise and length"), resource("/categories/t-shirts/", "T-shirt research", "inspect top measurements and construction"), resource("/articles/hacoo-hoodie-size-guide-measurements/", "Hoodie measurement guide", "compare layers with a reference garment"), resource("/articles/hacoo-shoes-spreadsheet-size-fit/", "Shoe size comparison", "keep footwear measurements separate")],
    calloutTitle: "Start with the item your wardrobe needs.",
    calloutText: "Open one category, keep the selected option visible and build a small comparison you can explain.",
  },
  {
    ...common,
    slug: "hacoo-shoes-spreadsheet-size-fit",
    title: "Hacoo Shoes Spreadsheet: Compare Size Charts and Fit Evidence",
    seoTitle: "Hacoo Shoes Spreadsheet: Size & Fit Comparison",
    description: "Compare Hacoo shoe finds using foot length, size-chart definitions, width and matching photos. Includes a clearly labeled measurement example and worksheet.",
    excerpt: "Separate foot length, insole length and outsole length, then compare the exact shoe option with a repeatable measurement record.",
    keywords: ["hacoo shoes spreadsheet", "hacoo shoe size guide", "hacoo sneakers spreadsheet", "hacoo shoes sizing"],
    image: { path: "/products/shoe-daily.webp", width: 750, height: 750, alt: "Footwear reference for a shoe size and fit comparison", caption: "Editorial footwear imagery illustrates the category, not a measured or tested recommendation." },
    lead: "The useful question behind a Hacoo shoes spreadsheet is whether a particular option has enough fit evidence to compare. Start with the measurement the chart actually describes. Foot length, removable insole length and outsole length are different quantities, and a familiar EU, UK or US label does not make them interchangeable.",
    sections: [
      section("reference", "Record your feet and a comfortable reference pair", `Measure both feet on a firm, level surface using the same method, with the socks you expect to wear. Stand normally while another person marks the heel and longest toe, or follow a clear measurement method supplied by the relevant seller. Record each foot separately and note the method. Do not assume the second foot has the same dimensions as the first.

Repeat the measurement if the paper shifts, the pencil angle changes or the heel does not stay at the starting point. A single improvised measurement is less useful than a repeatable one. If you already have footwear that works for the intended activity, record its model, labeled size and the fit you like. This is a personal reference, not a conversion rule for another manufacturer's shape.

Do not force an insole out of a shoe if it is fixed. If a removable insole can be measured without damage, record its length as insole length. It is not automatically the usable space inside the shoe: toe shape, lining, heel position and construction can change how the same measured length feels.`),
      section("chart", "Read the chart heading before the size row", `Find the measurement definition attached to the current listing. A column headed foot length describes something different from a column headed insole length. An unexplained centimeter column needs clarification before you use it. Screenshots copied into a spreadsheet can lose the chart heading, units or model name, which makes an apparently precise number misleading.

Check whether the size chart belongs to the selected model and version. A store may show several footwear styles within one product page or gallery. Do not borrow a chart from the next thumbnail because the sizes look similar. Save the chart alongside the selected option and date so that a later page change does not erase the context of your comparison.

Treat regional labels as the listing's labels. There is no single conversion table in this article because a universal table would imply consistency that has not been established for the actual products. The safe comparison is between your recorded measurement and the seller's stated interpretation of that measurement for this specific option.`, { headers: ["Displayed measure", "What it describes", "Comparison limit"], rows: [["Foot length", "Heel to longest toe using a stated method", "Use the chart's own sizing instructions"], ["Insole length", "Length of the insert or stated internal reference", "Not automatically usable toe room"], ["Outsole length", "External sole from end to end", "Cannot directly determine internal fit"], ["EU / UK / US label", "A named regional size", "Does not prove a universal conversion"]] }),
      section("example", "Work through a measurement example without guessing", `Consider a hypothetical comparison, not a real listing or a size recommendation. Your repeated foot measurement is 26.0 centimeters. Candidate A says a particular size corresponds to foot length 26.0 centimeters. Candidate B shows 26.5 centimeters but labels that column insole length. The numbers alone do not make Candidate B the better fit, because the two charts describe different things.

For Candidate A, the next check is the seller's sizing instructions, chart scope and any relevant width information. For Candidate B, the next question is which foot measurement the seller associates with that insole length. Adding an arbitrary allowance to both charts would hide the distinction. This guide does not prescribe one clearance value for every shoe shape, activity or person.

Suppose Candidate A's chart is visible only for a different model. That changes the outcome again: the row is now unresolved even though the measurement initially looked promising. Good research records the missing model match rather than treating a convenient number as evidence. A comparison should become more cautious when its definition disappears.`),
      section("shape", "Compare width and shape as separate questions", `Length is only one dimension of footwear fit. Look for information about forefoot width, toe shape, instep volume and heel structure when those features matter to you. A longer option may add unwanted length without resolving a shape mismatch. Likewise, a broad-looking photograph is not a measured width and can be distorted by angle or the lens.

Use your reference pair to describe the issue precisely. Instead of saying shoes usually feel small, note whether pressure occurs at the toes, sides, top or heel, and whether the issue appears with the socks you plan to use. This helps you identify the relevant missing information. It does not allow a remote photograph to predict comfort or suitability for an activity.

Separate casual appearance from functional claims. A sporty shape does not establish running performance, impact protection or support. If a specialized use is essential, require relevant product specifications and evidence instead of making a decision from the spreadsheet category. Leave unsupported performance claims out of your comparison.`),
      section("photos", "Match photographs to the selected pair", `Review a complete pair where such images are available: top, side, rear and sole views can answer different visual questions. Compare the left and right items under similar angles before judging a visible asymmetry. Perspective can make one shoe look longer or wider. Ask for a comparable view when the photograph itself prevents a fair comparison.

For measurement photographs, look for the starting point, unit markings and endpoint. A tape stretched along a curved outsole is not the same measure as straight internal length. A cropped image that shows only the final number cannot demonstrate how the measurement was taken. Label it as incomplete evidence rather than assuming the hidden method was correct.

Keep listing photographs, customer photographs and item-specific QC photographs in separate fields. Availability of one type does not prove that the other types exist. Images cannot establish authenticity, long-term wear, hidden materials or the comfort of the eventual pair. They can still be useful for the visible details they actually show.`),
      section("shortlist", "Close the comparison with a fit evidence record", `Make a compact row for each candidate: full product route, selected model, color, size label, chart definition, stated measurements and missing information. Add the date of your check. Use the shoe category page for discovery and return to the exact current option before you rely on any detail. A changed selection may change the chart, price or availability.

Choose a research outcome based on the evidence. A clear mismatch can remove a candidate from the shortlist. An unclear unit or missing chart calls for clarification. A coherent chart and matching photographs allow a further check, not a guarantee of fit. Keep the distinction visible so that a future reader does not mistake your notes for a wear test.

Review the current destination terms relevant to your decision, including any available size-exchange or return information, without assuming another site's policy applies. Hacoo Pro is an independent guide and does not sell or fit the shoes. Your most reusable result is a well-labeled reference measurement and a record of the questions that remain unanswered.`),
    ],
    checklistTitle: "Before keeping a shoe on the shortlist",
    checklist: [
      { title: "Label the dimension", text: "Keep foot, insole and outsole measurements distinct, with their units and method." },
      { title: "Match the chart", text: "Confirm that the chart belongs to the model and option being compared." },
      { title: "Preserve the uncertainty", text: "Record missing width, unclear measurement definitions and any unsupported performance claim." },
    ],
    sources: [resource("/categories/shoes/", "Hacoo shoes spreadsheet category", "start with footwear-specific checks"), resource("/guides/size-guide/", "General size guide", "keep labels and measurement methods separate"), resource("/guides/qc-photo-checklist/", "Hacoo QC photo checklist", "evaluate image scope and missing views"), resource("/articles/hacoo-spreadsheet-compare-product-links/", "Product comparison worksheet", "match the exact option before comparing"), resource("/products/grey-low-top-sneakers/", "Dated shoe reference", "see an example research record, not a fit endorsement")],
    calloutTitle: "Open the shoe route with a measurement record.",
    calloutText: "Use the category to discover candidates, then verify the current chart and selected option before taking the next step.",
  },
  {
    ...common,
    slug: "hacoo-hoodie-size-guide-measurements",
    title: "Hacoo Hoodie Size Guide: Chest, Length and Room for Layers",
    seoTitle: "Hacoo Hoodie Size Guide: Measure Chest & Length",
    description: "Compare hoodie and sweatshirt measurements using a garment you own. Check flat chest width, body length, sleeve method and room for layers before choosing.",
    excerpt: "Measure a familiar sweatshirt, read the listing's chart correctly and identify which dimensions actually create the fit you want.",
    keywords: ["hacoo hoodie size guide", "hacoo hoodie sizing", "hacoo sweatshirt measurements", "hacoo hoodies spreadsheet"],
    image: { path: "/products/sweatshirt-layered.webp", width: 750, height: 750, alt: "Sweatshirt layering reference for comparing garment dimensions", caption: "An editorial sweatshirt reference for discussing garment shape and layering." },
    lead: "Choose a hoodie by comparing dimensions and construction, not by assuming that your usual medium or large will transfer. This Hacoo hoodie size guide uses a sweatshirt you already own as the starting point. It covers garment measurements, chart definitions and layering checks without promising that a photo or a letter size can predict the final fit.",
    sections: [
      section("reference", "Choose a reference garment for the intended fit", `Take a hoodie or sweatshirt that already works for the way you intend to wear the new item. If you want a layer beneath a jacket, use a reference that fits comfortably under that jacket. If you want a loose outer layer, choose a different reference if necessary. One favorite garment cannot represent every silhouette or layering situation.

Place it on a flat surface, close a zipper if appropriate and smooth obvious folds without stretching the fabric. Record whether the garment has been worn or washed and whether it is relaxed at the cuffs and hem. These observations help explain differences when you measure it again. They are not a reason to predict that a different fabric will change by the same amount.

Keep a short note about what you like and what you would change. You might want the same chest room with a shorter body, or a similar body length with sleeves that sit higher. This turns a vague oversized search into a set of separate dimensions. Buying the next letter size does not guarantee that only the desired dimension will change.`),
      section("chest", "Distinguish flat chest width from body circumference", `A flat chest measurement runs across the garment between defined points, commonly near the underarm seams. Follow the seller's illustrated method if one is provided, and use the same endpoints on your reference. Do not compare a flat garment width with a body circumference as though they were the same number. The chart must say what it measures.

For an illustrative example, suppose a reference sweatshirt measures 58 centimeters across the chest and a candidate chart lists 60 centimeters using the same flat method. The candidate is listed as 2 centimeters wider across that line. Doubling those widths gives a simple geometric comparison of 116 and 120 centimeters, but it does not establish actual body ease or how the garment will hang.

That example is not a real product measurement or a size recommendation. Fabric, side construction, armholes and the placement of the tape can affect interpretation. If the chart only says chest 120 without defining body or garment circumference, ask for its meaning before choosing. A clear definition is more valuable than a number that merely looks familiar.`, { headers: ["Dimension", "Record the method", "Common mismatch"], rows: [["Chest", "Flat width and exact endpoints", "Comparing it directly with body circumference"], ["Body length", "Starting seam and finishing edge", "Back-center versus high-shoulder measurement"], ["Sleeve", "Shoulder seam or neck starting point", "Comparing set-in and raglan methods"], ["Hem", "Relaxed width and any stated stretch", "Treating stretched ribbing as the relaxed fit"]] }),
      section("length", "Measure body length without losing the starting point", `Body length can be measured from the back neckline, a high shoulder point or another defined seam. These methods can produce different values on the same garment. Keep the start and end visible in a photograph of your own measurement. When comparing a listing, find its diagram or description rather than assuming every length column follows your method.

Include the hem or ribbed band only if the chart does. A deep ribbed hem may gather the body and affect how the sweatshirt sits, even when the total measured length looks suitable. A straight-cut hem can behave differently. The number is useful evidence, but the construction around that number determines which follow-up question matters.

Consider the trousers or jacket you plan to wear with the hoodie. Compare the reference outfit while standing normally and moving your arms. You are checking your preferred proportions, not enforcing a universal rule about where a hoodie should end. Record that preference separately from the listing's measurable facts.`),
      section("sleeves", "Check shoulder construction before comparing sleeves", `A dropped shoulder moves the sleeve seam away from the usual shoulder position. A raglan sleeve may be measured from the neck instead of a shoulder seam. A shorter sleeve number can therefore coexist with a longer overall reach. Do not choose between two candidates until the chart makes the construction and measurement method clear.

Use the reference garment's seam layout to decide what can be compared directly. If the constructions differ, ask for a comparable measurement or keep the sleeve comparison unresolved. Adding two values from incompatible diagrams may produce a tidy total with no reliable meaning. A useful spreadsheet preserves the diagram or method beside the number.

Look at the cuff and underarm area when matching photographs are available. Ribbing, sleeve width and armhole shape may affect movement or how the garment layers. A photograph can show their visible shape; it cannot prove stretch recovery, softness or comfort. Avoid turning a detail image into a claim about long-term performance.`),
      section("layers", "Test the layering requirement with clothes you own", `Wear the reference sweatshirt over the base layer you intend to use, then add your existing jacket if relevant. Notice where movement becomes restricted: chest, upper arm, underarm, shoulder or hood area. This exercise tells you which dimensions and construction details to prioritize in a listing. It does not tell you how an untested garment will feel.

If your main concern is upper-arm room, a larger chest width alone may not resolve it. If the hood crowds a jacket collar, body length is not the missing fact. Ask for the relevant dimension or a clear construction view. Keep each requirement distinct so that one appealing measurement does not conceal an unresolved limitation elsewhere.

Avoid assuming that a fabric will shrink or stretch by a particular amount. Record composition and care information only when the current listing supplies it, and do not manufacture a correction factor for a missing chart. Where a seller states a measurement tolerance, retain that wording and consider whether it could change your choice. An unstated tolerance should stay unknown.`),
      section("decision", "Build a size decision that can be repeated", `Create one row for the reference and one for each candidate size. Keep units consistent and record chest method, body length method, sleeve construction, selected color and the check date. Highlight the dimensions that matter for your use. A candidate can match one measurement and still fail another; do not reduce the comparison to a single overall size score.

Reopen the live listing before making a final decision. Confirm that the chart and photographs still belong to the selected garment and that changing the color or version has not introduced a different chart. Save the relevant details with the exact option. A chart found through an image search is not enough if its connection to the current listing cannot be established.

Finish with a short reason: dimensions are comparable and meet my reference, a particular dimension rules the item out, or information is still missing. Review the current terms on the destination before taking the next step. This guide supports a measurement process; Hacoo Pro does not sell the garment, verify its manufacturing tolerances or guarantee a fit outcome.`),
    ],
    checklistTitle: "Your hoodie measurement record",
    checklist: [
      { title: "Use the right reference", text: "Choose a garment that already suits the intended silhouette and layers." },
      { title: "Match the endpoints", text: "Write down flat chest, body length and sleeve methods before comparing the numbers." },
      { title: "Keep fit decisions specific", text: "Explain which dimensions work and which construction details still need confirmation." },
    ],
    sources: [resource("/categories/hoodies-sweaters/", "Hoodies and sweaters category", "explore the relevant clothing route"), resource("/guides/size-guide/", "Hacoo size guide", "review body and garment measurement distinctions"), resource("/guides/qc-photo-checklist/", "Measurement photo checklist", "check tape placement and matching options"), resource("/articles/hacoo-spreadsheet-men-clothing-finds/", "Men's clothing shortlist", "place the layer in an existing outfit"), resource("/products/classic-logo-crew-neck/", "Dated crew-neck reference", "inspect a sample research record")],
    calloutTitle: "Bring measurements to the hoodie category.",
    calloutText: "Use a familiar garment and a defined measurement method to make each candidate easier to compare.",
  },
  {
    ...common,
    slug: "hacoo-budget-finds-total-cost",
    title: "Hacoo Budget Finds: Compare the Total Cost of a Shortlist",
    seoTitle: "Hacoo Budget Finds: Item Price vs Total Cost",
    description: "Compare budget finds with a consistent total-cost worksheet. Separate item price, delivery, optional extras and unknown charges using illustrative examples.",
    excerpt: "Use the same destination, currency and options when comparing budget finds, and keep unknown charges out of false bargain rankings.",
    keywords: ["hacoo budget finds", "hacoo cheap finds", "hacoo spreadsheet budget", "hacoo shipping cost comparison"],
    image: { path: "/products/knit-everyday.webp", width: 750, height: 750, alt: "Everyday clothing reference for a budget comparison", caption: "A product-category reference; no price or current offer is represented by this image." },
    lead: "A low item price is only one part of a useful budget comparison. This Hacoo budget finds guide shows how to record the amount visible for an exact option, separate confirmed charges from unknowns and compare candidates on the same basis. Every numerical example below is invented for explanation, not a current price, shipping quote or platform fee.",
    sections: [
      section("scope", "Define the comparison before collecting prices", `Write down the item you need, the selected size or version, your delivery destination and the currency used for the comparison. A price for the smallest accessory in a multi-option listing cannot fairly be compared with a price for a complete garment. Similarly, one destination's displayed delivery amount should not be copied into a row for another destination.

Decide whether you are comparing individual items or complete baskets. Those are different questions. A basket-level discount, shared delivery charge or minimum order condition can make an item look cheaper only when other purchases are included. Keep those conditions attached to the price rather than dividing them away and calling the result a standalone offer.

Set a personal spending limit before browsing. The limit is a decision aid, not evidence about what a marketplace should charge. Include the room you want to retain for unresolved costs and explain your assumption in the worksheet. If a required charge is unknown, the total is incomplete even when the visible subtotal falls beneath your limit.`),
      section("worksheet", "Separate confirmed amounts, estimates and unknowns", `Create a row for the exact selected option and record the visible item amount with its currency and check time. Add delivery and other charges only when they are shown for the relevant selection and destination. Do not assume that every platform uses the same fees or that the absence of a line on an early screen means the charge is zero.

Label each amount by evidence status: displayed now, estimate with a stated basis, or unknown. A number copied from an old screenshot belongs in historical notes until it can be reproduced. Optional services should remain separate so that readers can see whether they are included in the total being compared. Do not quietly include them for one candidate and omit them for another.

If a seller or checkout displays a tax line, record what the screen says and the scope of that display. This article does not determine tax obligations or predict import charges. When a charge relevant to your destination is not established, retain the uncertainty and consult the applicable current information before relying on a final total.`, { headers: ["Field", "Evidence to retain", "If not established"], rows: [["Selected item", "Option, quantity, amount and currency", "Do not use the lowest thumbnail price"], ["Delivery", "Destination and selected service", "Mark unknown, not zero"], ["Other displayed charges", "Label and conditions shown", "Keep scope unresolved"], ["Optional extras", "Chosen service and amount", "Keep outside the base comparison"], ["Discount", "Eligibility and basket conditions", "Exclude an unconfirmed saving"]] }),
      section("example", "Use a small example to expose misleading totals", `Imagine two hypothetical single-item candidates in the same currency and for the same destination. Candidate A has an item amount of 18 units and displayed delivery of 9 units. Candidate B has an item amount of 22 units and displayed delivery of 3 units. Before any other applicable charges, the visible sums are 27 and 25 units respectively. The lower item price does not produce the lower visible sum.

Now suppose Candidate B's delivery amount applies only to a basket above a threshold you have not reached. Its 25-unit sum is no longer supported for the basket you are actually comparing. Restore delivery to unknown or use the amount that applies to your real selection. Buying extra items to reach a threshold changes both the cost and the decision.

The arithmetic illustrates a method, not a Hacoo offer or a quote from the linked catalog. Neither sum is a final delivered cost while required charges remain unresolved. Keep the word subtotal or visible sum in the worksheet until the relevant components are established. A precise-looking total should not conceal an incomplete calculation.`),
      section("shipping", "Compare delivery evidence at the right stage", `A listing preview, a basket estimate and a final checkout display may describe different stages or conditions. Save the destination and service associated with the amount you record. If you change the item quantity, option, delivery location or basket contents, revisit the delivery line instead of assuming the previous value still applies.

Where weight or package dimensions affect a displayed estimate, retain the stated assumptions. Product dimensions and packed dimensions are not necessarily the same. Do not invent package weight from an image or treat a general shipping calculator result as a confirmed quote for an item that has not been specified. The information may be useful for planning while remaining provisional.

Delivery speed and delivery price are also separate fields. A cheaper service does not automatically satisfy a time-sensitive requirement. Record any displayed estimate as an estimate with its conditions, and avoid turning it into a guaranteed arrival date. If the timing cannot meet the purpose of the purchase, the lowest cost may be irrelevant to the shortlist.`),
      section("value", "Keep price separate from fit and evidence quality", `A candidate that fails a necessary measurement is not made suitable by a discount. Apply your essential fit or compatibility checks before ranking costs. For clothing, compare the chart with a measured reference item. For shoes, define the chart's length measurement. For accessories or electronics, establish the exact specifications needed for your use rather than substituting a low price for missing information.

Use photographs to evaluate the visible details they can support, but do not calculate a quality score from a polished cover image. Long-term durability, authenticity and future satisfaction have not been established by opening a listing. Label personal style preferences separately from supported specifications so that a budget decision remains understandable.

Consider the practical consequences of uncertainty without inventing a return charge or failure rate. Read the current terms relevant to the exact destination and transaction. If an unresolved sizing issue could make the item unusable for you, that is a reason to seek clarification or remove it from the shortlist. It is not a reason to publish an unsupported monetary penalty as fact.`),
      section("finish", "Publish a comparison that can be checked later", `End each row with its evidence date and one of three outcomes: within the limit on confirmed information, beyond the limit, or incomplete because a required component is unknown. Avoid ranking an incomplete row as the cheapest. You may keep it as a candidate while stating the precise information needed to finish the comparison.

Preserve the selected option and the display that supports each amount. Reopen the destination before taking action because promotions, availability and displayed charges can change. If the currency changes, record the conversion basis and avoid mixing amounts from different moments without explanation. A rounded planning conversion should remain labeled as an estimate.

Hacoo Pro is an independent research guide and does not set prices, collect payments or promise shipping rates. Its spreadsheet routes help you discover candidates; the current external destination supplies the transaction details. A useful budget find is one whose relevant facts can be compared honestly with your requirements, including the unknowns that may still prevent a decision.`),
    ],
    checklistTitle: "A budget comparison ready for review",
    checklist: [
      { title: "Fix the comparison basis", text: "Use the same currency, destination, quantity and clearly identified options." },
      { title: "Label every amount", text: "Separate current displays, conditional estimates and unknown components." },
      { title: "Recheck the real basket", text: "Apply only the delivery amounts and discounts that belong to the selection being compared." },
    ],
    sources: [resource("/spreadsheet/", "Hacoo spreadsheet directory", "discover candidates before comparing costs"), resource("/guides/shipping-planning/", "Shipping planning guide", "identify the variables behind an estimate"), resource("/articles/hacoo-spreadsheet-compare-product-links/", "Exact-option comparison", "keep like-for-like selections together"), resource("/articles/hacoo-spreadsheet-men-clothing-finds/", "Clothing shortlist workflow", "apply fit requirements before price ranking"), resource("/articles/hacoo-payment-order-record-checklist/", "Payment and order records", "preserve the relevant transaction evidence")],
    calloutTitle: "Compare the cost you can support.",
    calloutText: "Build a small shortlist, record the conditions and leave missing charges visibly unresolved.",
  },
  {
    ...common,
    slug: "hacoo-spreadsheet-compare-product-links",
    title: "Hacoo Spreadsheet Comparison: Match Product Links, Photos and Options",
    seoTitle: "Hacoo Spreadsheet: Compare Product Links & Options",
    description: "Compare two working product links by identity, selected variant, measurements and photo evidence. Use a worksheet that keeps unknowns and differences visible.",
    excerpt: "Decide whether two working links describe the same option, different variants or only similar-looking products before comparing price and evidence.",
    keywords: ["hacoo spreadsheet links", "hacoo product comparison", "hacoo product links", "hacoo spreadsheet link"],
    image: { path: "/products/shoe-court.webp", width: 750, height: 750, alt: "Footwear editorial reference for comparing product identity and options", caption: "A category image can support discovery, but it does not identify a current listing or selected option." },
    lead: "Two product links can both work and still make an unfair comparison. They may describe different sizes, versions, bundles or merely similar-looking items. This Hacoo spreadsheet comparison guide starts after a page opens: it shows how to preserve identity, compare equivalent options and separate visible differences from information that has not been established.",
    sections: [
      section("identity", "Give each candidate a complete identity record", `Save the full product address, the displayed title, any visible listing identifier and the site hosting the page. Add the selected color, size, version and quantity. A short title such as grey sneakers is a search clue, not a unique identity. Likewise, the same product photograph appearing on two pages does not prove that they share a seller, inventory or manufacturing source.

Keep the spreadsheet's source row separate from the destination record. The row may contain an old image or a shortened description that was accurate only when it was created. Record the date you opened the destination and describe what it shows now. If the reference and current page disagree, document the disagreement instead of silently replacing one with the other.

Hacoo Pro provides independent research and links to a separate catalog destination. That relationship does not make the catalog an official Hacoo service or connect its accounts and order records to another platform. Preserve the host in the comparison so that policy statements, reviews and product claims are not transferred across unrelated sites.`),
      section("options", "Lock the option before comparing the details", `Select the option you actually intend to inspect before recording price or measurements. Some pages use one title for several sizes, colors, models or packages. A preview may show the lowest-priced option while the photographed bundle belongs to a different selection. Write down the displayed selection rather than describing the product only by its cover image.

Compare like with like where possible. If one listing contains a single item and another contains a pair or accessory bundle, separate that difference before interpreting the price. If the exact option is absent from one page, say that it is not an equivalent candidate. Do not assume that an unavailable option can be obtained because a similar thumbnail remains in the gallery.

Check whether changing the option also changes the chart, description, images or included pieces. Record the resulting state rather than mixing a chart from the first selection with a price from the second. A useful row behaves like a dated snapshot of one coherent option, even when the live page can switch among many.`, { headers: ["Record", "Candidate A", "Candidate B"], rows: [["Full link and host", "Save the actual address", "Save the actual address"], ["Selected variant", "Color, size, version, quantity", "Same fields, no assumed match"], ["Measurements", "Units and chart method", "Comparable method or unknown"], ["Images", "Listing, customer or item-specific", "Identify source and option scope"], ["Outcome", "Same option, different option or unresolved", "Explain the supporting evidence"]] }),
      section("photos", "Use images to identify questions, not manufacture proof", `Compare full views first, then distinctive details: seam placement, panel shape, fastenings, pockets, sole pattern or included components. A similar silhouette is a broad match, while several consistent details can make the identity comparison more specific. Neither observation proves authenticity or that the item eventually supplied will match the photographs.

Keep the source of each image visible. A promotional picture, a customer upload and an item-specific inspection photograph have different connections to the candidate. A customer photo may relate to another option or an earlier purchase. If the relationship cannot be established, mark the image as contextual rather than using it to settle a precise measurement or construction question.

Avoid treating color differences as decisive when lighting and background differ. Conversely, do not dismiss a changed component merely because the colors look similar. List the observed detail and the uncertainty separately: for example, fastening appears different, but the second image is too cropped to confirm. This is more useful than a binary same or different judgment without evidence.`),
      section("measurements", "Normalize the meaning of measurements", `Before placing two numbers beside each other, confirm their units, endpoints and scope. A flat chest width cannot be compared directly with body circumference. An outsole measurement cannot substitute for foot length. A device's external dimensions do not establish its connector compatibility. The measurement label matters as much as the value.

For a hypothetical sweatshirt comparison, Candidate A lists chest width as 60 centimeters measured flat. Candidate B lists chest as 120 centimeters without a diagram. Doubling A's width may suggest a possible relationship, but it does not establish what B means. Keep B's definition unresolved until the listing or a reliable clarification identifies the method.

Record missing fields explicitly. Unknown sleeve length is not zero length, and an unstated material percentage is not the same as a confirmed composition. If a necessary field is unavailable, the next step is a focused request or removal from the shortlist. A complete-looking table filled with assumptions is less useful than an honest table with gaps.`),
      section("outcomes", "Use three comparison outcomes instead of a guess", `The first outcome is a supported match for the purpose of the comparison: the identifying details and selected option align, with enough evidence for the question you are asking. This is not a guarantee that two sellers hold identical stock. State the limited conclusion, such as the displayed size and measurement method are comparable, rather than claiming a universal product identity.

The second outcome is a meaningful difference. A different sole, material description, chart method, bundle or version may make the candidates alternatives instead of duplicates. Keep them as separate rows and compare them against your needs. Do not borrow reviews, measurements or delivery information from one to complete the other.

The third outcome is unresolved. Conflicting identifiers, missing option names or cropped images can prevent a useful conclusion even when both links load successfully. Write one precise next question, such as whether the chart belongs to the selected version. Stopping at an unresolved result is a valid research outcome when the evidence does not support more.`),
      section("maintain", "Keep the worksheet useful when a page changes", `Store the date and the particular details that influenced your decision. You do not need a complete archive of every image; you need enough context to reproduce the comparison and recognize a later change. Keep private account, address and payment information out of shared screenshots. A product worksheet should not become a collection of unnecessary personal data.

If a link later redirects, becomes unavailable or loses its selection, use the separate broken-link recovery workflow. Preserve the old row and label any replacement as a new candidate until its identity has been checked. Finding a working page restores a route; it does not automatically restore all the evidence previously associated with it.

Finish by reopening the current selected options and reviewing the terms and costs that belong to those exact destinations. Then record the comparison reason in a short sentence that another person can understand. The goal is a defensible shortlist with clear evidence boundaries, not a spreadsheet that appears complete because every uncertainty has been hidden.`),
    ],
    checklistTitle: "A product comparison with clear evidence boundaries",
    checklist: [
      { title: "Preserve identity", text: "Save the host, full route, visible identifier and exact selected option together." },
      { title: "Compare the same meaning", text: "Match chart definitions, image scope and included quantities before comparing values." },
      { title: "State the outcome", text: "Explain the supported match, meaningful difference or missing evidence without borrowing facts from another row." },
    ],
    sources: [resource("/guides/how-to-use-hacoo-spreadsheet/", "Spreadsheet workflow", "start with a small candidate set"), resource("/guides/qc-photo-checklist/", "QC photo checklist", "review the scope of each photograph"), resource("/articles/hacoo-product-links-not-working/", "Broken-link recovery guide", "recover a route when a page stops opening"), resource("/articles/hacoo-shoes-spreadsheet-size-fit/", "Shoe measurement comparison", "distinguish foot, insole and outsole length"), resource("/articles/hacoo-budget-finds-total-cost/", "Budget comparison worksheet", "compare costs only after options are aligned")],
    calloutTitle: "Compare the option, not just the thumbnail.",
    calloutText: "Keep a dated record of the selected product and let unresolved evidence remain visible.",
  },
];

for (const article of comparisonArticles) {
  const text = [article.title, article.lead, ...article.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.table ? [...s.table.headers, ...s.table.rows.flat()] : [])]), article.checklistTitle, ...article.checklist.flatMap(c => [c.title, c.text])].join(" ");
  article.wordCount = (text.match(/\b[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*\b/g) || []).length;
}
