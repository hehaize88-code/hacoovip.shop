export type ArticleLocale = "en" | "de" | "fr" | "es" | "it" | "pl";

import { firstOrderArticle } from "./first-order-article";
import { newArticleContent } from "./seo-articles";

export type ArticleSection = { h: string; paragraphs: string[]; bullets?: string[] };
export type ArticleContent = {
  intro: string;
  sections: ArticleSection[];
  sources?: { label: string; url: string }[];
};

const en: Record<string, ArticleContent> = {
  "usfans-spreadsheet-guide": {
    intro: "A USFans spreadsheet can shorten product discovery, but it should never replace verification. This practical 2026 workflow explains how to turn a promising row into a checked product route, a precise order record and a useful QC plan without treating an old link, a price snapshot or an anonymous rating as a guarantee.",
    sections: [
      { h: "What a spreadsheet can—and cannot—do", paragraphs: [
        "A spreadsheet is best understood as a discovery layer. It groups product links into categories so that you can compare ideas without repeating the same broad search. It may help you find a hoodie, shoe, jersey or accessory that matches the style you want. It does not hold inventory, control the seller, lock a price or prove that the item in today’s listing is identical to the item reviewed months ago.",
        "That distinction matters because marketplace listings change. A seller can remove a color, replace photographs, edit a title, change the price or reuse a listing. Treat every row as a lead that must be opened and checked. A smaller sheet with current, readable links is more useful than thousands of rows whose destinations and variants have not been reviewed recently."
      ]},
      { h: "Start with intent, not an endless brand list", paragraphs: [
        "Write down the product type, fit, material clues and measurable details that actually matter before searching. “Heavyweight zip hoodie, relaxed fit, dark grey” is a better starting point than a single broad brand word. For shoes, include silhouette, intended use, color and size range. For a jersey, include club or country, season, sleeve style and whether you want a fan or player cut.",
        "Use those terms to create a shortlist, then compare only a few live pages at a time. This site’s search form sends the exact phrase you enter to the matching catalog results. It is designed to avoid the common dead end where a search button opens a generic all-products page and loses the user’s keyword."
      ]},
      { h: "Verify the live destination before comparing products", paragraphs: [
        "Open the current product page and confirm four basics: the destination loads, the title still describes the expected item, the required variant exists and the visible price applies to that variant. Watch for price ranges in which the lowest number belongs to an accessory, deposit or different option. Record the exact color, size and version instead of relying on a screenshot of the sheet.",
        "If a link no longer matches its spreadsheet description, discard it or search again. Do not rescue an outdated row by assuming a visually similar option is equivalent. Checking the live destination is also the point where you should review visible seller notes, size information, product measurements and any current purchasing notice shown in the order flow."
      ]},
      { h: "Build an order record that survives the warehouse stage", paragraphs: [
        "Save the URL, date checked, selected variant, visible product price and any seller note that affected your decision. A short record prevents confusion when several similar products reach storage. It also gives you something concrete to compare with the warehouse record: ordered color, label size, model details and included pieces.",
        "USFans publicly describes an agent workflow in which a user submits a product link, the item is purchased, received at a Chinese warehouse, inspected and later prepared for international shipping. Some current public product pages describe three to seven HD inspection photos, but the number and available views can vary. The live account record should therefore remain the final source for a specific order."
      ]},
      { h: "Plan QC questions before the item arrives", paragraphs: [
        "A useful QC request is category-specific. For shoes, plan to check both lateral sides, the heel pair, outsole, toe shape, size label and insole or outsole measurement when available. For clothing, check front and back, seams, print or embroidery placement, care and size labels, visible marks and practical garment measurements. For a cap or bag, focus on symmetry, closures, hardware, stitching and included parts.",
        "Photos are evidence of visible condition, not a laboratory test. They cannot confirm fiber composition, smell, long-term durability, internal construction or electrical safety. If a decisive detail is missing, ask a narrow question while the item is still in storage. “Please show the size tag and measure the chest width flat” is more actionable than “Please check quality.”"
      ]},
      { h: "Estimate the complete cost, not only the row price", paragraphs: [
        "Keep product price separate from domestic seller delivery, optional services and international parcel shipping. Exchange rates can also move between product purchase and parcel submission. The cheapest row in a spreadsheet may not be the cheapest delivered option if it is unusually heavy, ships in a large rigid box or requires protective packing.",
        "Volume matters as well as scale weight. Carriers can calculate a volume-based weight for large, light parcels, subject to the current line’s formula and rules. Shoes, padded coats and boxed accessories are common cases where packaging decisions change the final billable figure. Wait for the packed parcel information before treating an estimate as final."
      ]},
      { h: "Check route compatibility before committing", paragraphs: [
        "A purchasable item is not automatically accepted by every international line. Batteries, liquids, powders, cosmetics, magnets and other sensitive goods commonly face narrower routing choices. Destination coverage, parcel dimensions, declared information and current restrictions can also change what is available. Check the live route list and current support information for the exact destination and contents.",
        "USFans states publicly that its service reaches more than 200 countries and regions. That is a broad coverage statement, not a promise that every product has a route to every address. A careful spreadsheet guide should preserve that boundary instead of turning a platform-level claim into a parcel-level guarantee."
      ]},
      { h: "Use a four-step routine every time", paragraphs: [
        "The reliable sequence is simple: discover, verify, inspect and plan. Discover with categories and specific search terms. Verify the live page and exact variant. Inspect warehouse evidence against your saved order record. Plan packaging, route and the full parcel cost only after the item information is available.",
        "This routine is slower than clicking the first attractive row, but it removes avoidable mistakes. It also makes a spreadsheet genuinely useful for 2026 searchers: not a wall of unsupported “best” claims, but a practical bridge between discovery and a documented purchase decision."
      ]},
      { h: "Judge the quality of the spreadsheet itself", paragraphs: [
        "A trustworthy directory makes its purpose and limits clear. Look for understandable category names, working destinations, visible update information, consistent price context and practical explanations of QC and parcel cost. Be cautious when a sheet publishes huge product counts without showing the records, labels every item “best quality,” or gives precise success percentages without a source. Those claims do not help you verify a specific order.",
        "Good maintenance is also visible in small details. Search should preserve the user’s keyword. Category buttons should open the matching category, not a generic homepage. Product cards should lead to the intended product, and unavailable links should be removed instead of silently redirected. Articles should answer different questions rather than repeating the same brand paragraph with a new title.",
        "Finally, check whether the site keeps a clean boundary between editorial guidance and the destination catalog. A useful spreadsheet does not need to send users through unrelated agents, marketplaces or competing directories. Clear routing, current records and honest uncertainty create more value than an inflated number at the top of the page."
      ]}
    ]
  },
  "usfans-qc-photos-guide": {
    intro: "USFans QC photos can reduce uncertainty before international shipping, but only if you inspect them in a consistent order and understand their limits. This guide turns warehouse images into a practical decision record without pretending that photographs can guarantee materials, durability or route eligibility.",
    sections: [
      { h: "Begin with the order record, not the photograph", paragraphs: [
        "Before judging an image, reopen the order record and confirm what was actually selected: product, color, size, model and any included pieces. A photograph can be perfectly clear and still show the wrong variant. Keep the original listing details and your saved notes beside the warehouse images so the comparison starts from facts rather than memory.",
        "USFans publicly describes warehouse receipt and quality inspection as part of its purchasing workflow. Some current product pages state that three to seven HD inspection photos may be supplied. Treat that as a description of the visible service on those pages, not a universal promise about every category or order."
      ]},
      { h: "Inspect the full silhouette before zooming in", paragraphs: [
        "Look at the item from a distance first. Check overall shape, proportions, color family and symmetry. For a shoe pair, compare toe shapes, heel heights and the left-right balance. For clothing, look for twisting, uneven hems, misplaced panels or obvious differences between sleeves. For bags and caps, check whether the structure appears centered and balanced.",
        "Warehouse lighting, camera exposure and screen settings can change perceived color. A slight shade difference between the listing and QC image is not automatically a defect. If color is decisive, request a clearer neutral-light view rather than making a confident judgment from one compressed photograph."
      ]},
      { h: "Move through construction details in a fixed order", paragraphs: [
        "After the overall view, inspect seams, edge finishing, prints, embroidery, labels, zippers, buttons and other hardware. Use the same order each time so you do not spend all your attention on a logo and miss a broken closure or visible stain. Zoom enough to identify a problem, but remember that compression and sharpening can create false edges.",
        "Ask whether a detail is present, aligned, complete and visibly undamaged. Those are questions a photograph can often answer. Avoid turning a warehouse image into an unsupported craftsmanship score. A picture may reveal a loose thread or scratch, but it cannot show how a fabric feels or how a seam will perform after repeated use."
      ]},
      { h: "Use measurements instead of trusting a letter size", paragraphs: [
        "Confirm the visible size label, but do not stop there. Letter sizes and seller charts can vary. For clothing, flat chest width, length, shoulder and sleeve measurements are more useful when compared with an item that already fits you. For shoes, an insole or outsole measurement can help, provided you understand which measurement was taken and how.",
        "Small measurement differences can come from the measuring method, garment position or ruler angle. Define the needed measurement precisely and allow a sensible tolerance. If the photograph does not clearly show both endpoints, ask for a better view rather than reading an exact number from an ambiguous angle."
      ]},
      { h: "Separate defects from temporary packaging effects", paragraphs: [
        "Folds, compressed shapes and light creases may result from domestic transport or temporary warehouse packaging. Missing components, broken hardware, stains, holes, severe asymmetry and clearly incorrect variants require a different response. Compare multiple views before deciding whether what you see is surface presentation or a material problem.",
        "When you contact support, point to the exact area and question. “There is a dark mark near the lower-left seam; please confirm whether it wipes off” is easier to act on than “The quality looks bad.” Specific requests create a better written record and reduce the chance that the answer addresses the wrong detail."
      ]},
      { h: "Know the hard limits of QC photography", paragraphs: [
        "QC photos cannot prove fiber composition, odor, internal construction, electrical safety, water resistance, colorfastness or long-term durability. They also cannot guarantee authenticity or legal importability. Those questions require seller documentation, testing, policy checks or judgment beyond what a warehouse camera can provide.",
        "Route restrictions are a separate issue. An item can look flawless and still be limited because it contains a battery, liquid, powder, magnet or another sensitive component. Confirm live shipping eligibility before parcel payment. Visual approval and route approval are two different decisions."
      ]},
      { h: "Make the after-sales decision while evidence is current", paragraphs: [
        "If the item is wrong or visibly defective, review the current order page and available after-sales options promptly. Some public USFans listings display a return window tied to warehouse arrival, including five-day wording on certain pages, but seller acceptance, category rules and timing can vary. Never convert an item-specific notice into a site-wide guarantee.",
        "Save the warehouse images, order variant, dates and support responses before choosing to keep, exchange or return the item. The goal is a traceable decision based on what was visible at the time, not a vague recollection after the parcel has already left storage."
      ]},
      { h: "Finish with a one-minute approval checklist", paragraphs: [
        "Confirm the variant, visible condition, required measurements, included pieces and any support answer. Then check that you understand what remains unknown. If a missing view could change the decision, request it before parcel submission. If the uncertainty concerns material, durability or safety, acknowledge that another photograph may not solve it.",
        "A disciplined QC workflow does not promise perfection. It improves the odds of catching visible errors while action is still possible. That is the useful role of USFans QC photos: evidence for a better decision, not a badge that makes every future outcome certain."
      ]},
      { h: "Apply the checklist differently by category", paragraphs: [
        "For shoes, compare the pair as a pair: toe shape, heel height, side panels, outsole pattern, size labels and a useful length measurement. A close-up of one logo cannot reveal whether the left and right shoes match. For hoodies and T-shirts, prioritize flat garment measurements, print or embroidery placement, seams, cuffs, hem and visible marks. Folded fabric can hide large areas, so request a clear front or back view if needed.",
        "For jerseys, check the ordered name, number, sleeve patches, size label and whether printed elements appear aligned. For caps and structured bags, inspect symmetry, closure, brim or base shape, hardware and included straps or parts. Electronics require a different boundary: appearance may be checked, but plug compatibility, battery rules, function and safety cannot be established from surface images alone.",
        "Do not turn these lists into a demand for unnecessary photographs. Start with the images already provided, identify the one uncertainty that could change your decision, and request only the eviden