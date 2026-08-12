export type LongArticle = {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const englishArticles: Record<string, LongArticle> = {
  "spreadsheet-guide": {
    title: "How to Use a Superbuy Spreadsheet Safely in 2026",
    description: "A practical, product-first workflow for finding listings, checking options, using warehouse QC photos and planning a Superbuy parcel without treating a spreadsheet as a guarantee.",
    primaryKeyword: "how to use Superbuy spreadsheet",
    secondaryKeywords: ["Superbuy spreadsheet 2026", "Superbuy product links", "Superbuy QC photos", "Superbuy buying guide"],
    sections: [
      {
        heading: "A spreadsheet is a starting point, not a quality guarantee",
        paragraphs: [
          "A useful Superbuy spreadsheet solves one problem: discovery. It turns a long list of Chinese marketplace listings into a cleaner set of product and category routes. That can save time, especially when a product title is difficult to search in English. It does not prove that a listing is current, that every variant is available, or that the seller will send exactly what appears in an old photo. Treating a spreadsheet as a recommendation certificate is the fastest way to skip the checks that matter.",
          "The safer approach is to separate discovery from verification. Use the spreadsheet to find a candidate. Then open the current destination listing and make a fresh decision from the live information. Check the selected colour, size, model, quantity, seller notes and domestic shipping cost. If the page has changed since the index was updated, the live listing wins. This simple rule prevents most spreadsheet-related confusion before money is committed."
        ]
      },
      {
        heading: "Search narrowly and compare more than one route",
        paragraphs: [
          "Begin with a specific need rather than browsing everything. A query such as “black zip hoodie” or “white low-profile trainers” produces a more manageable shortlist than a broad word such as “clothes.” Category pages are useful when you want ideas, but keyword search is better when fit, material or colour is important. Open two or three plausible listings and compare them side by side instead of choosing the first attractive image.",
          "Compare what can actually be verified: the product description, option names, measurements, sales information shown by the source marketplace, seller terms and recent listing images. A lower item price may come with paid domestic delivery, fewer useful measurements or weak return conditions. A slightly higher price can be easier to evaluate if the listing explains variants clearly. The goal is not to find the cheapest card in the index; it is to find a listing whose details you can understand and later verify."
        ]
      },
      {
        heading: "Record the exact variant before you order",
        paragraphs: [
          "Before submitting an order, create a short decision record. Save the product URL and note the colour, size, quantity and any message that must be passed to the seller. For clothing, save the size chart and compare garment measurements with something you already own. Letter sizes are inconsistent across sellers, so “M” on one listing can be close to “S” or “L” elsewhere. For shoes, confirm whether the option uses EU sizing, foot length or an internal code.",
          "This record becomes your QC reference. When warehouse photos arrive several days later, you should not have to rely on memory. You can compare the label, colour and visible construction with what you selected. It also helps if an agent asks for clarification because the option names are ambiguous. A precise order remark is useful; a long message full of assumptions is not. Ask for one measurable or visible requirement at a time."
        ],
        bullets: ["Product URL and screenshot", "Selected colour, size and quantity", "Key measurement or option code", "Any seller promise that affects the order"]
      },
      {
        heading: "Understand the two payment stages",
        paragraphs: [
          "Superbuy’s current fee guide separates the process into purchasing and international shipping. During the purchasing stage, the user pays the item price and any domestic delivery charge from the seller to the warehouse. The guide says standard purchasing from mainstream platforms such as Taobao, Tmall, JD and 1688 has no purchasing service fee, while second-hand or unlisted platforms can have different charges. Optional services, such as extra photographs or specialized inspection, are separate choices.",
          "International delivery is a later payment. It is not included in the price shown on a spreadsheet card. The final parcel cost depends on destination, route, chargeable weight, dimensions and any selected parcel services. Keeping these stages separate makes budgeting more realistic. A low product price can still result in an expensive parcel if the item is bulky, heavy or restricted to a limited set of routes."
        ]
      },
      {
        heading: "Use warehouse photos as a structured checkpoint",
        paragraphs: [
          "Superbuy’s current homepage states that three free QC photos are taken after warehouse inspection. Those images are valuable because they show the received item before international shipping. Compare them with your decision record. Start with the label and selected variant, then check the overall shape, visible colour, quantity shown, printing, obvious damage and included accessories. Do not begin by zooming into a minor stitch while ignoring that the wrong size has arrived.",
          "The photographs have limits. A standard visual inspection cannot confirm hidden materials, internal electronics, authenticity or long-term durability. Warehouse lighting and image compression can also alter colour. If a specific detail controls your decision and the standard photos do not show it, request a targeted detailed photo before approving the item. Paying for one useful angle is often better than ordering several vague images."
        ]
      },
      {
        heading: "Use the storage window to consolidate deliberately",
        paragraphs: [
          "Superbuy’s current fee structure states that items receive 90 days of free storage after arrival. It also says storage beyond that period is charged daily and that the normal maximum storage period is 180 days unless an extension is arranged. That does not mean every buyer should wait for three months. It means there is room to receive several orders, resolve QC issues and combine suitable items into a parcel.",
          "Consolidation can reduce duplicated base charges, but adding more items is not automatically cheaper. Large shoe boxes, rigid packaging and low-density goods may increase volumetric weight. Use the warehouse period to decide what belongs together, not as a reason to keep shopping indefinitely. Check the storage deadline shown in the account and submit the parcel with enough time to resolve any problem."
        ]
      },
      {
        heading: "Plan the parcel before choosing the cheapest line",
        paragraphs: [
          "At parcel submission, compare the routes available for the actual contents and destination. Look beyond the headline price. Check whether the route accepts the item category, how it calculates chargeable weight, what tracking is provided, the expected range rather than a single promised day, and what compensation or insurance terms apply. Customs duties and VAT depend on the destination and declaration rules, and the recipient remains responsible for complying with local law.",
          "Packaging decisions should match the risk. Removing unnecessary retail packaging may reduce weight or volume for flexible clothing. Fragile goods may need bubble cushioning, corner protection, foam filling or a stronger outer box. Superbuy lists these as optional value-added services, so choose them because the item needs them—not because a long list of services looks reassuring."
        ]
      },
      {
        heading: "Common spreadsheet mistakes to avoid",
        paragraphs: [
          "The first common mistake is assuming that an old price is still available. The second is choosing a variant from the card image without reading the live option menu. The third is approving QC photos without comparing them to the original selection. The fourth is treating estimated international shipping as a fixed quote. The fifth is waiting until the storage deadline to ask about a problem. Each mistake comes from skipping a transition between discovery, ordering, warehousing and delivery.",
          "A spreadsheet works best when those transitions are explicit. Find the listing, verify it, record the variant, check the warehouse photos, then build the parcel. If any stage creates uncertainty, stop there rather than carrying the uncertainty into an international shipment. This workflow is slower than one-click browsing, but it is much faster than correcting a wrong item after it has crossed a border."
        ]
      },
      {
        heading: "A practical final checklist",
        paragraphs: [
          "Before ordering, confirm the live listing, option, measurement and seller terms. Before approving warehouse QC, match the visible item with the saved order record and request one targeted photo if a decisive detail is missing. Before shipping, check storage deadlines, parcel contents, route restrictions, packaging, estimated chargeable weight and destination tax responsibilities. Keep screenshots of the order and final parcel details until delivery is complete.",
          "The best Superbuy spreadsheet is not the one with the most links. It is the one that helps you move from a broad search to a small number of verifiable choices. Use it as an organized map, keep your own notes, and let current listing data and visible warehouse evidence guide the decision."
        ]
      }
    ]
  },
  "qc-photo-checklist": {
    title: "How to Read Superbuy QC Photos: A Practical 2026 Checklist",
    description: "Learn what Superbuy QC photos can verify, what standard inspection cannot prove, and when to request a targeted detailed photo before international shipping.",
    primaryKeyword: "Superbuy QC photos",
    secondaryKeywords: ["how to read Superbuy QC photos", "Superbuy warehouse photos", "Superbuy quality inspection", "Superbuy detailed photos"],
    sections: [
      {
        heading: "Why QC photos deserve a real process",
        paragraphs: [
          "Warehouse QC photos are the last practical chance to catch many visible problems before an item enters international delivery. They are not decorative order updates. They connect the listing you selected with the physical item that reached the warehouse. A good review can identify the wrong colour, wrong size label, missing accessory, obvious stain, damaged box or visibly different design while there may still be time to ask for help.",
          "A poor review usually has one of two problems. The buyer looks only for a dramatic defect, or the buyer expects the photos to prove things a camera cannot prove. The better method is structured: compare order facts first, then overall shape, then specific details, and finally decide whether the remaining uncertainty is acceptable."
        ]
      },
      {
        heading: "Know what the standard service actually includes",
        paragraphs: [
          "Superbuy’s current homepage says warehouse inspection includes three free QC photos. Its forwarding guide also describes three photographs of the actual product after warehousing. The current fee page lists paid options for detailed photos, re-inspection, detailed inspection, power-on checks, video shooting and model try-on photographs. These are separate services for cases where the standard view is not enough.",
          "The existence of extra services explains the boundary of a standard check. A routine visual inspection is designed to confirm obvious, visible information. It is not a laboratory test and it does not convert a third-party marketplace listing into a guaranteed product. Superbuy’s own purchasing notices say it provides an agent service and does not assume the seller’s product-quality risk. That distinction should shape every QC decision."
        ]
      },
      {
        heading: "Prepare before the photos arrive",
        paragraphs: [
          "QC begins at ordering. Save the live listing, selected colour, size, quantity and any relevant seller chart. If a product is customized, save the exact agreed instruction. Without that reference, a warehouse image can show a perfectly clear label and still leave you unable to tell whether it is the label you ordered.",
          "Choose two or three decisive checks in advance. For a hoodie, they might be size label, front print placement and colour. For shoes, they might be size tag, outsole shape and pair symmetry. For a collectible, they might be outer-box condition, included parts and seal status. This prevents random zooming and helps you request a precise additional photo when needed."
        ]
      },
      {
        heading: "The first pass: identity, variant and quantity",
        paragraphs: [
          "Start with identity. Does the item in the warehouse image match the product type and model ordered? Then confirm the visible option. Read the size label, colour name, model code or other mark when available. If multiple pieces were ordered, check whether the photos or warehouse record show the expected quantity. Do not assume that a similar colour or a familiar logo means the correct variant arrived.",
          "If a label is too small to read, that is a good reason for a targeted photo. Ask for the size tag or model code to fill the frame. Avoid vague requests such as “take better photos,” because the result may still miss the evidence you need. One clear request creates a checkable result."
        ]
      },
      {
        heading: "The second pass: shape, symmetry and visible condition",
        paragraphs: [
          "Next, step back and compare the whole item. Look for left-right symmetry, a straight neckline, evenly placed pockets, matching shoe shapes, aligned panels and an undamaged silhouette. Creases caused by folding are not automatically defects, but deep dents, crushed structural parts or a visibly warped shape deserve attention. Compare every available angle before deciding.",
          "Then scan the surface. Check for stains, scratches, missing paint, broken hardware, loose components, severe print misalignment and obvious tears. Warehouse lighting can create reflections, especially on leather-like materials, metal and glossy packaging. If a mark appears in one image but disappears from another angle, request a close-up rather than guessing."
        ]
      },
      {
        heading: "Clothing checks that photographs can support",
        paragraphs: [
          "For clothing, verify the visible size tag and compare the general cut with the listing. Look at print or embroidery placement, collar shape, cuffs, hem, zipper direction, pocket position and colour blocking. A standard photo rarely gives reliable garment measurements unless a ruler is deliberately included, so do not estimate exact chest width from perspective alone.",
          "Colour is also imperfect evidence. Different lamps, phone screens and compression can shift navy toward black or cream toward white. Use colour photos to identify a clear mismatch, not to judge a subtle shade with absolute certainty. If the shade is critical, ask for a photograph under neutral lighting or beside a simple colour reference, while accepting that screens still vary."
        ]
      },
      {
        heading: "Shoe, accessory and electronics checks",
        paragraphs: [
          "For shoes, check that both shoes are present, the size labels agree, the pair appears symmetrical and the outsole, heel, toe box and fastening system match the ordered model. If keeping the retail box matters, inspect its condition separately from the shoes. A damaged box and an undamaged product are different decisions.",
          "For bags and accessories, focus on visible hardware, strap count, closures, included pouches and surface condition. For electronics, standard appearance photos do not prove function. Superbuy’s current value-added list includes a paid power-on inspection for certain devices, which checks basic indicator and power functions. Even that is a limited functional check, not a complete durability or battery-health test."
        ]
      },
      {
        heading: "What QC photos cannot confirm",
        paragraphs: [
          "A photograph cannot reliably confirm material composition, internal construction, waterproofing, battery capacity, electrical safety, scent, taste or long-term durability. It cannot prove authenticity simply because visible branding looks familiar. It also cannot guarantee that an item will survive international transport. Packaging and route risk are separate decisions made later.",
          "Bulk and sealed goods have additional limits. Superbuy’s 1688 guidance says original packaging may not be opened to count individual units when quantity is not shown externally, and service levels vary by seller classification. Second-hand products can also have restricted or unavailable return options. Read the service warning attached to the order instead of assuming every marketplace receives the same inspection."
        ]
      },
      {
        heading: "When an extra photo is worth paying for",
        paragraphs: [
          "Request an additional photo when one visible fact will decide whether you keep or return the item. Good examples include a readable size label, the back print, a serial or model code, a close-up of a suspected stain, the contents laid out together, or a ruler placed across a specific measurement. The current Superbuy fee page lists detailed photographs as a per-photo optional service, so a precise request also controls cost.",
          "Do not buy extra photos merely to reduce a feeling of uncertainty that no image can resolve. If your concern is hidden material quality or authenticity, more angles of the exterior may not answer it. Decide whether the remaining risk is acceptable, whether the seller’s return terms allow action, or whether the item should not be ordered in the first place."
        ]
      },
      {
        heading: "Approve, ask, or escalate: a simple decision rule",
        paragraphs: [
          "Approve when the visible identity, variant, quantity and condition match your record and the unverified qualities are risks you knowingly accept. Ask for a targeted photo when a specific visible fact is missing or unclear. Contact after-sales support when the existing images show a clear mismatch, damage or missing component. Provide the order number and state the observable issue without exaggeration.",
          "Finally, save the key photos and your decision until the parcel is delivered. If a later problem occurs, a clear record of what entered the parcel is more useful than memory. QC is not about finding perfection in every stitch. It is about making the best evidence-based decision while the item is still at the warehouse."
        ]
      }
    ]
  },
  "shipping-cost-guide": {
    title: "Superbuy Shipping Cost Explained: Deposit, Weight and Final Charge",
    description: "A fact-checked guide to Superbuy product costs, domestic delivery, warehouse consolidation, chargeable weight, shipping deposits and final reconciliation in 2026.",
    primaryKeyword: "Superbuy shipping cost",
    secondaryKeywords: ["Superbuy shipping calculator", "Superbuy shipping deposit", "Superbuy parcel weight", "Superbuy fees 2026"],
    sections: [
      {
        heading: "Why the first number is not the whole cost",
        paragraphs: [
          "A product card price tells you almost nothing about the final delivered cost. Shopping through an agent has at least two financial stages: getting the item from a Chinese seller to the warehouse, and getting the finished parcel from the warehouse to an overseas address. Optional inspection, photography and packaging services can add a third layer. Confusing these stages is why a cheap item can produce an unexpectedly expensive total.",
          "Superbuy’s current fee structure describes the same separation. Stage one includes product price, domestic delivery and any applicable purchasing or value-added service. Stage two is international shipping, calculated from the parcel, route and destination. Build a budget for both stages before ordering, even though the exact international figure is not known yet."
        ]
      },
      {
        heading: "Stage one: product, domestic delivery and service choices",
        paragraphs: [
          "The original product price is set by the seller. Domestic delivery covers transport from that seller to the Superbuy warehouse. Some sellers offer free domestic shipping; others charge it separately. The current Superbuy fee guide says standard purchasing from mainstream platforms including Taobao, Tmall, JD and 1688 has no purchasing service fee. It lists different charges for second-hand platforms, unlisted sources and specialist purchasing services.",
          "Optional product services sit beside those costs. The current list includes detailed photographs, re-inspection, detailed inspection, power-on checks, video and other special handling. These services are not automatically required. Use one when it answers a real question or reduces a specific risk. Adding every available service to a low-value item can cost more than the uncertainty it removes."
        ]
      },
      {
        heading: "The warehouse changes what can be calculated",
        paragraphs: [
          "Before arrival, international shipping is only a rough scenario because the warehouse has not confirmed the received item’s weight and packaging. Once goods are stored, you can see warehouse data, review QC photos and decide which items belong in the same parcel. Superbuy currently advertises three free QC photos and 90 days of free storage, giving users time to inspect and consolidate.",
          "The fee guide says multiple items can be consolidated into one parcel without a consolidation fee. That may reduce repeated first-weight charges, but it does not make all combinations efficient. A parcel that mixes dense clothing with large empty retail boxes may be billed on volume. A very large parcel can also limit the available routes or become harder to handle. Consolidate deliberately, not automatically."
        ]
      },
      {
        heading: "Actual weight versus volumetric weight",
        paragraphs: [
          "Carriers need to price both mass and space. Actual weight is what the parcel weighs on a scale. Volumetric weight converts the parcel’s length, width and height into a chargeable figure using the route’s divisor. A light but bulky box can therefore cost more than a smaller parcel with the same scale weight. Different routes can apply different units, rounding and volumetric rules, so one calculation should not be copied across every line.",
          "Shoe boxes, rigid gift packaging, pillows and other low-density goods often increase volume. Vacuum packaging may reduce suitable soft goods, while folding or removing a retail box can reduce empty space. Those choices also reduce protection or change presentation. Shipping optimization is a trade-off between cost, item safety and whether original packaging matters to you."
        ]
      },
      {
        heading: "How the shipping deposit and final charge work",
        paragraphs: [
          "Superbuy’s forwarding guide says the international shipping deposit is calculated from estimated weight, the selected method and the destination. Its current fee FAQ adds that the logistics provider’s official bill determines the final cost. After the parcel is packed and measured, the charges are reconciled: an overpayment can be refunded, while an underpayment can require the balance.",
          "This means the deposit is not a bait-and-switch and it is not a guaranteed final quote. It is an operational estimate made before the carrier’s final data is available. Keep a small budget margin and check the account after packing. If the difference is large, compare the packed dimensions and services with what you requested before assuming the calculation is wrong."
        ]
      },
      {
        heading: "Compare routes on more than price",
        paragraphs: [
          "The cheapest available line is not always the lowest-risk choice. Compare item restrictions, destination coverage, chargeable-weight method, tracking, typical delivery range, handoff carrier and compensation or insurance terms. A route for ordinary clothing may reject batteries, liquids, food or other sensitive goods. A duty-inclusive or tax-related label also needs to be read carefully; it does not remove the buyer’s responsibility to understand local import rules.",
          "Use the current shipping calculator close to parcel submission because rates and available lines change. Do not copy a price from an old review or another country. Two buyers with similar product lists can receive different options because their parcel dimensions, destination, warehouse, declarations or restricted-item classifications differ."
        ]
      },
      {
        heading: "Packaging decisions that can change cost and risk",
        paragraphs: [
          "Superbuy’s current value-added list includes free package removal and simple packaging, plus paid options such as bubble cushioning, EPE protection, corner protectors, stretch film, moisture barriers, vacuum packaging and wooden cases. The right choice depends on the contents. Flexible clothing may not need a heavy box. Ceramics, electronics and collectible packaging may need more structure, filler and moisture protection.",
          "Do not optimize only for the smallest number. Removing every box can expose a structured product to crushing. Keeping every retail carton can increase volumetric weight. Write parcel remarks that state the priority: reduce volume for soft clothing, retain a specific collectible box, protect four corners, or keep items separated. Clear priorities help the warehouse make consistent packing choices."
        ]
      },
      {
        heading: "Customs, VAT and declaration responsibilities",
        paragraphs: [
          "The international freight shown by an agent is not necessarily the complete import cost. Superbuy’s fee guide states that customs duties or VAT charged by the destination are borne by the recipient. Rules depend on country, item category, declared value and current law. No spreadsheet or old community post can guarantee that a parcel will pass without tax or inspection.",
          "Use truthful product descriptions and follow the destination’s declaration rules. Avoid advice that promises a magic value or universal tax-free method. If a route includes a particular customs arrangement, read its current terms inside the platform before payment. The cost of compliance is part of the real delivered price."
        ]
      },
      {
        heading: "A planning example without fake precision",
        paragraphs: [
          "Suppose you are considering several clothing items and one pair of shoes. First total the live product prices and domestic shipping. Add only the product services you actually need. Use the calculator to create a range for the likely combined weight, then compare a version with the shoe box and a version without it if box condition is not important. Leave room for packing materials and final measurement.",
          "This is more useful than publishing a single invented shipping price. Rates depend on destination and date, and the final charge depends on real parcel data. Your planning output should be a range and a decision: which items to combine, which packaging to keep, which routes are eligible and how much margin to reserve."
        ]
      },
      {
        heading: "The final cost-control checklist",
        paragraphs: [
          "Before ordering, check product price, domestic delivery, source-platform fee rules and item restrictions. At the warehouse, review weight, QC and storage deadlines. Before parcel submission, compare consolidation choices, package removal, protection needs, route rules, chargeable weight and destination taxes. After packing, review the final measured data and account reconciliation.",
          "The most reliable way to reduce Superbuy shipping surprises is not to chase a secret coupon or copy another buyer’s parcel. It is to understand which cost is being quoted at each stage, keep the parcel compact without sacrificing necessary protection, and use current route data for your own destination."
        ]
      }
    ]
  }
};
