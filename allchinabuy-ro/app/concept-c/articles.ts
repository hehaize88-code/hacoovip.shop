export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
};

export type FullArticle = {
  title: string;
  slug: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  readTime: string;
  updated: string;
  intro: string[];
  sections: ArticleSection[];
  sourceNote: string;
};

export const englishArticles: FullArticle[] = [
  {
    title: "How to Use an AllChinaBuy Spreadsheet Without Getting Lost",
    slug: "spreadsheet-guide",
    description: "A practical system for turning a large AllChinaBuy spreadsheet into a verified, comparable shortlist before you spend money.",
    primaryKeyword: "AllChinaBuy spreadsheet",
    secondaryKeywords: ["ACBuy spreadsheet", "AllChinaBuy finds", "how to use AllChinaBuy", "AllChinaBuy product links"],
    readTime: "9 min read",
    updated: "August 12, 2026",
    intro: [
      "A large product spreadsheet feels useful because it puts hundreds or thousands of finds in one place. The problem is that quantity can create false confidence. A row with a photo, a price and a link is not the same thing as a checked product. Listings change, variants carry different prices, sellers replace photos and some links eventually stop working. The right way to use an AllChinaBuy spreadsheet is therefore not to scroll until something looks exciting. It is to treat the sheet as a discovery index, then verify each candidate before ordering.",
      "That distinction matters because AllChinaBuy describes its service as a cross-border purchasing agency covering procurement, order fulfilment, quality inspection, international logistics and after-sales service. In other words, the platform sits between a shopper and sellers in China. A spreadsheet can help you discover an item, but the live listing, order record, warehouse photos and current parcel quote are the records that matter at later stages. This guide gives you a repeatable way to move from discovery to a sensible shortlist without confusing an old spreadsheet entry with a live offer."
    ],
    sections: [
      {
        heading: "Start with the search intent, not the biggest category",
        paragraphs: [
          "Before opening ten tabs, write down what you are actually trying to find. A useful search brief includes the product type, acceptable price range, preferred colour, required size or measurements, and the details that would make you reject the item. For a jacket, that might mean a specific chest width, a zip closure and a total item budget below a chosen amount. For shoes, it may mean insole length, colour and upper material. This brief prevents a common spreadsheet problem: comparing products that only look similar in thumbnail form but are not substitutes for one another.",
          "Use category pages to reduce the field, then use descriptive queries rather than only brand names. Terms such as “heavyweight zip hoodie,” “wide-leg trousers” or “leather crossbody bag” describe the construction you want and can surface alternatives. The spreadsheet should shorten research, not decide taste for you. If every result is judged against the same written brief, a lower-priced item cannot win merely because it appeared first."
        ]
      },
      {
        heading: "Understand what a spreadsheet row can and cannot prove",
        paragraphs: [
          "A good row can tell you that a product was found at a particular URL, was placed in a category and had a displayed price when the index was checked. It may also show a preview image. It normally cannot prove current stock, the price of every colour or size, material quality, seller performance, final packed weight or international shipping cost. Those facts either change over time or become available only after an order reaches later stages.",
          "Treat the row as a pointer, not a guarantee. Open the exact product page and compare the product title, selected variant, seller information, domestic delivery terms and live price with the spreadsheet entry. If the live page and the row disagree, the live page takes priority. If the link opens a different product, a generic search page or an unavailable listing, remove it from the shortlist. A broken shortcut should never become a reason to improvise with an unknown substitute."
        ]
      },
      {
        heading: "Build a shortlist that can be compared fairly",
        paragraphs: [
          "Limit the first shortlist to three to five candidates per product type. More choices rarely improve the decision once the important attributes are visible. Record the live item price, variant, seller, available measurements, domestic shipping charge if shown, and the date checked. Add a notes column for unclear details. This small comparison table is more useful than saving twenty screenshots because it forces each candidate into the same structure.",
          "Do not rank by item price alone. A slightly more expensive listing with clear measurements and consistent photos may be easier to evaluate than a cheaper listing with vague options. Conversely, polished images do not prove quality. The goal is not to award a winner immediately; it is to identify which candidate supplies enough information to justify an order and which questions must be answered later through the purchasing or warehouse process."
        ],
        checklist: [
          "Exact title and live URL",
          "Chosen colour, size and variant price",
          "Seller and domestic shipping information",
          "Measurements or size chart",
          "Questions to verify in warehouse photos"
        ]
      },
      {
        heading: "Read prices as previews, not final totals",
        paragraphs: [
          "Spreadsheet prices are useful for rough comparison, but they are rarely the complete landed cost. A listing can use a low default price while a larger size, different material or premium version costs more. Currency conversion also changes the displayed equivalent. After the item purchase come other possible cost layers: domestic shipping to the warehouse, optional services, packing choices, international transport and destination-country taxes or carrier charges where applicable.",
          "Keep two budgets from the start. The first is the item-stage budget: goods, selected variants and any domestic charges visible at order time. The second is a parcel reserve for international delivery and possible destination charges. AllChinaBuy provides a shipping calculator, but its own form requires destination, product category, estimated weight and optional packed dimensions. That design is a reminder that a thumbnail price cannot predict a parcel total. Use estimates for planning and the live quote for the decision."
        ]
      },
      {
        heading: "Use warehouse inspection as a decision gate",
        paragraphs: [
          "AllChinaBuy’s official app description includes quality inspection among its services. That makes the warehouse stage more than a waiting room. When photos become available, compare the received item with the exact variant in your order record. Check colour, size label, visible shape, front and back, closures, stitching, print placement and any included parts. If measurements matter, compare a ruler photo with a well-fitting item you already own rather than relying only on the printed size.",
          "QC photos reduce uncertainty about visible features, but they do not prove comfort, fabric composition, durability, internal construction or authenticity. Lighting and camera angle can also change how colour and proportions appear. Decide what can be accepted, what needs another photo, and what is a reason to contact support before international shipping. Once a parcel leaves the warehouse, correcting a seller-side problem is normally harder and more expensive."
        ]
      },
      {
        heading: "Reject common spreadsheet shortcuts",
        paragraphs: [
          "The first shortcut is assuming a high match score, “verified” label or popular position means the product has been physically tested by the index owner. Unless the methodology is clearly explained, those labels should be treated as curation signals only. The second shortcut is ordering several near-identical items because each looks inexpensive. Consolidation can reduce repeated fixed costs, but extra weight and volume still matter, and one bulky item can change available shipping options.",
          "The third shortcut is copying customer comments without context. A review may describe a different batch, size, destination, shipping line or time period. It can reveal questions worth asking, but it cannot replace a check of your own listing and parcel. Finally, do not assume an old screenshot proves a current promotion, coupon, route or return rule. Time-sensitive claims should always be verified inside the current platform interface before payment."
        ]
      },
      {
        heading: "Follow one repeatable workflow",
        paragraphs: [
          "A dependable workflow has five gates. Discover products through the spreadsheet. Verify the live listing and chosen variant. Record a small shortlist using consistent fields. Inspect the received item while it is still in the warehouse. Then compare the current parcel options using real recorded weight and dimensions. At every gate, remove candidates that do not supply enough information instead of carrying uncertainty forward.",
          "This method may feel slower than clicking the first attractive card, but it usually saves time because each decision has a purpose. It also produces better search behaviour: you stop browsing generic “best finds” pages and start looking for specific construction, measurement, QC and shipping answers. That is exactly how a spreadsheet becomes a useful shopping tool rather than an endless feed."
        ]
      },
      {
        heading: "Final pre-order checklist",
        paragraphs: [
          "Before placing an order, confirm that the URL still opens the intended listing, the selected variant is correct, the live price is acceptable and the size decision is based on measurements where available. Save the product record and note the date checked. Decide which visible details must be confirmed in warehouse photos. Finally, keep enough budget outside the item price for parcel costs; do not spend the entire budget at the product stage.",
          "The best AllChinaBuy spreadsheet is not necessarily the one with the largest number in its headline. It is the one that helps you reach a smaller, clearer and currently verifiable set of choices. Use the database for discovery, the live listing for the order, the warehouse record for inspection and the live shipping quote for parcel planning. Each source answers a different question, and treating them that way is the simplest protection against outdated links and unrealistic totals."
        ]
      }
    ],
    sourceNote: "Research basis: AllChinaBuy official website and shipping calculator, plus the official AllChinaBuy app description on Google Play; checked August 12, 2026. Variable prices, routes, promotions and policies should be rechecked in the live platform interface."
  },
  {
    title: "AllChinaBuy QC Photos: A Five-Minute Inspection Routine",
    slug: "qc-photo-routine",
    description: "A practical AllChinaBuy QC photo checklist for confirming the item, checking measurements and spotting visible problems before parcel submission.",
    primaryKeyword: "AllChinaBuy QC photos",
    secondaryKeywords: ["ACBuy QC", "how to check AllChinaBuy QC photos", "warehouse inspection photos", "AllChinaBuy quality inspection"],
    readTime: "10 min read",
    updated: "August 12, 2026",
    intro: [
      "Quality-control photos are most useful when they lead to a decision. They are not decoration, and they are not a certificate that an item is perfect. AllChinaBuy publicly describes quality inspection as part of its purchasing-agency service, alongside procurement, order fulfilment, international logistics and after-sales support. The practical purpose of the warehouse photos is to let you compare what arrived with what you ordered before you commit it to an international parcel.",
      "Five focused minutes are usually more valuable than twenty minutes of random zooming. Start with identity, move to shape, check measurements, inspect high-risk details and finish with a clear outcome: accept, ask for evidence, or contact support about a return or exchange. The routine below is designed for clothing, shoes, bags and everyday accessories, but the logic applies to most photo-based warehouse inspections."
    ],
    sections: [
      {
        heading: "Minute one: confirm that it is the right item",
        paragraphs: [
          "Open the order record and the live listing beside the QC set. Compare product type, colour, selected size and visible option details. A correct-looking hoodie in the wrong colour or size is still the wrong item. Check labels, tags, model codes and included parts when they are visible, but do not let one matching label override obvious differences elsewhere. Sellers sometimes use generic packaging, so the item itself remains the main evidence.",
          "Look at the full front and back before zooming into small details. Ask whether the silhouette, panel arrangement, collar, pockets, sole shape, straps or hardware match the version ordered. If the platform shows the parcel or order identifier with the photo set, make sure it matches your record. This first minute catches fulfilment mistakes that detailed stitching inspection cannot solve."
        ]
      },
      {
        heading: "Minute two: judge overall shape and symmetry",
        paragraphs: [
          "Shape problems are easier to see when the item is photographed flat or square to the camera. Compare the left and right sides, shoulder height, pocket position, toe boxes, heel alignment, bag handles and the way panels meet. Some apparent asymmetry comes from folds or camera angle, so look for the same issue in more than one photo before deciding it is a defect.",
          "For clothing, check whether the garment is laid naturally rather than stretched. For shoes, compare both shoes rather than inspecting only the cleaner one. For bags, inspect whether the base sits level and the straps appear equal. A warehouse photo cannot tell you how an item feels on the body, but it can reveal obvious distortion, missing components and uneven assembly."
        ]
      },
      {
        heading: "Minute three: use measurements instead of size labels",
        paragraphs: [
          "A printed size is a category, not a dimension. Different sellers may use different size charts, and the finished item can vary from the listing. When fit matters, compare ruler or tape photos with measurements from an item you already own and like. For tops, useful dimensions often include chest width, body length and sleeve length. For trousers, waist, rise, thigh and inseam may matter. For shoes, insole length is often more informative than the box label alone.",
          "Read the ruler carefully. Check where the measurement begins, whether the tape is straight and whether the garment is flat. A photo that cuts off the zero point or bends around fabric does not provide a reliable number. If the required dimension is missing, an additional measurement photo can be more valuable than another close-up of a logo or label."
        ],
        checklist: [
          "Compare against an item you own",
          "Check the ruler starts at zero",
          "Make sure the item is laid flat",
          "Allow for normal small manufacturing variation",
          "Request the dimension that changes your decision"
        ]
      },
      {
        heading: "Minute four: inspect the details most likely to fail",
        paragraphs: [
          "Do not give every detail equal attention. Focus on areas that carry stress or are difficult to fix: zips, buttons, eyelets, buckles, handles, pocket openings, sole joins and major seams. Look for loose threads, skipped stitches, stains, scratches, glue marks, tears, dents and missing hardware. On printed items, compare placement and alignment across the whole garment before zooming into the print edge.",
          "Lighting can exaggerate surface marks and hide texture. A bright reflection on coated leather is not automatically a scratch, and a dark fold is not automatically a stain. Look for repeated evidence across angles. Photos can show visible construction, but they cannot prove material composition, waterproofing, smell, long-term durability or whether an electronic item functions unless a specific test is documented. Keep the conclusion inside what the evidence supports."
        ]
      },
      {
        heading: "Minute five: choose accept, clarify or escalate",
        paragraphs: [
          "End the inspection with one of three outcomes. Accept means the correct item arrived and the visible condition is within your tolerance. Clarify means one missing angle, measurement or close-up would change the decision; request only that evidence. Escalate means the item appears wrong, damaged or materially different from the order, so contact the platform through the current order or warehouse process before parcel submission.",
          "Avoid vague requests such as “take better photos.” State the exact area and reason: “Please photograph the left zip tooth straight on,” or “Please measure the insole from heel to toe with the zero point visible.” Specific requests reduce ambiguity. Return eligibility, timing, seller acceptance and fees can vary, so do not copy an old community rule into a current case. Read the live order options and contact support when the decision affects money."
        ]
      },
      {
        heading: "What QC photos cannot guarantee",
        paragraphs: [
          "A clean photo set cannot guarantee that an item will fit, feel comfortable or last. It also cannot verify hidden stitching, internal padding, fibre content, colour accuracy on your screen or performance under use. Photo inspection is strongest for identity, measurements, obvious damage, missing pieces and visible construction. Treat claims beyond those areas with caution unless the platform provides a specific documented test.",
          "QC should also not be confused with authentication. A warehouse image can help you compare the received item with the seller’s listing, but it does not establish intellectual-property status or legality in your destination. Buyers remain responsible for what they purchase and for destination-country rules. If an item type is restricted or sensitive, check current platform and customs information before ordering and again before choosing a route."
        ]
      },
      {
        heading: "Keep a simple evidence record",
        paragraphs: [
          "Save the order identifier, selected variant, seller listing and relevant QC photos together. If you ask a question, keep the response with that record. This is useful when several similar items arrive, and it prevents you from relying on memory when building a parcel days later. A short note such as “size confirmed by chest measurement; small mark accepted” explains why the item was approved.",
          "Record-keeping also makes later support conversations clearer. Instead of saying an item is “bad,” you can identify the order, show the selected variant and point to the visible issue. The goal is not to create a legal file; it is to preserve the evidence that existed before international shipping. Once items are combined and repacked, identifying where a problem began can become more difficult."
        ]
      },
      {
        heading: "A practical QC standard for real buyers",
        paragraphs: [
          "Perfection is not a useful standard for mass-produced goods. Decide in advance which differences matter: wrong size, missing part, major stain, damaged closure or a measurement outside your acceptable range. Small packaging dents or removable threads may not justify delay, while a wrong variant clearly does. Consistent thresholds help you avoid rejecting one item for a detail you accepted on another.",
          "The strongest QC routine is short because it follows a fixed order: identity, shape, dimensions, risk details and outcome. It uses photos for what photos can prove and requests extra evidence only when it changes the decision. That is how AllChinaBuy QC photos become a practical warehouse checkpoint instead of a gallery you glance at before clicking submit."
        ]
      }
    ],
    sourceNote: "Research basis: AllChinaBuy’s official service description identifies quality inspection as part of its purchasing workflow. Inspection limits and the decision framework are editorial guidance, not a claim that every order receives identical images or services. Checked August 12, 2026."
  },
  {
    title: "AllChinaBuy Product Price vs Parcel Cost: What You Actually Pay",
    slug: "parcel-cost-guide",
    description: "Understand why an AllChinaBuy item price cannot predict the international parcel total, and build a realistic budget before ordering.",
    primaryKeyword: "AllChinaBuy shipping cost",
    secondaryKeywords: ["AllChinaBuy shipping calculator", "ACBuy shipping price", "AllChinaBuy parcel cost", "AllChinaBuy volumetric weight"],
    readTime: "11 min read",
    updated: "August 12, 2026",
    intro: [
      "A low product price is not a low delivered price. This is the most important budgeting lesson for any purchasing-agent order. AllChinaBuy’s official description separates procurement and order fulfilment from international logistics, and it notes that international shipping is provided by third-party service companies. The official shipping calculator also asks for destination, product category, estimated weight and optional package dimensions. Those inputs explain why the number on a product card cannot predict the number shown when a parcel is ready.",
      "A realistic budget is built in stages. First comes the selected product and any domestic movement to the warehouse. Then the item is inspected, combined with other goods if desired, packed, measured and matched with routes available for its destination and category. Currency conversion, optional services and destination charges may add further uncertainty. This guide shows how to plan each stage without inventing a universal per-kilogram rate or promising a delivery time that the live quote may not support."
    ],
    sections: [
      {
        heading: "Separate the product order from the international parcel",
        paragraphs: [
          "Purchasing-agent orders usually create two different money decisions. The first is whether to buy the item from a seller in China. The second is whether and how to ship one or more warehouse items internationally. Keeping those decisions separate prevents the product price from consuming the parcel budget. A $20 item is not “$20 delivered” merely because the discovery page shows $20.",
          "At the product stage, record the exact variant price and any domestic seller-to-warehouse charge shown. At the parcel stage, use the warehouse’s recorded item information and current route options. If you plan several products, reserve money for shipping before placing every item order. Otherwise, you can end up with goods in storage and no comfortable route within the remaining budget."
        ]
      },
      {
        heading: "Use the official calculator for scenarios, not promises",
        paragraphs: [
          "AllChinaBuy provides a public shipping calculator. Its visible inputs include the destination country or region, the warehouse origin, product category, estimated weight and package dimensions for lines that calculate with volumetric weight. This makes it useful for comparing scenarios before ordering: one light clothing parcel, a parcel containing shoes with boxes, or a bulky mixed order. Change one input at a time so you can see which assumption moves the estimate.",
          "The result remains an estimate because the final parcel may differ from your guess. Seller packaging, warehouse packing, dimensional measurement, route availability, fuel or carrier adjustments and item restrictions can change the live options. Save the date and assumptions when comparing estimates. A calculator result without its destination, category, weight and dimensions is not a reusable quote."
        ]
      },
      {
        heading: "Understand actual weight and volumetric weight",
        paragraphs: [
          "Actual weight is what the packed parcel physically weighs. Volumetric weight is a carrier method that converts package dimensions into a chargeable figure. The exact divisor or rule can differ by route, so use the rule shown for the current option rather than memorising one formula. A parcel full of lightweight but bulky packaging can therefore be charged as if it were heavier than the scale reading.",
          "This is why shoe boxes, rigid gift boxes, puffy clothing and protective air space matter. Removing unnecessary retail packaging may reduce volume, but it also removes protection. The sensible choice depends on the item. A soft T-shirt can tolerate compact packing; fragile accessories or structured shoes may need reinforcement. Ask what packing change is being made and judge the saving against the damage risk."
        ]
      },
      {
        heading: "Consolidation helps only when the parcel still makes sense",
        paragraphs: [
          "Combining several warehouse items can avoid sending multiple separate parcels and may spread some fixed handling or first-weight effects across more goods. It does not make added weight or volume disappear. Every extra hoodie, shoe box or accessory changes the parcel, and a mixed category can affect which lines are available. Consolidation should be a planning tool, not an excuse to add products until the item total looks large enough.",
          "Before combining everything, compare at least two scenarios: one complete parcel and a sensible split. A split can cost more overall, but it may keep each parcel within route limits, separate sensitive items or reduce the consequence of a single delay. The cheapest displayed line is not automatically the best value if its restrictions, tracking, compensation terms or estimated service level do not fit the order."
        ]
      },
      {
        heading: "Product category can change route availability",
        paragraphs: [
          "The official calculator asks for product category because carriers do not treat every item the same. Batteries, liquids, magnets, electronics, food, cosmetics and other sensitive categories may have fewer routes or special conditions. Even ordinary goods can face destination-specific limits. Do not mark a product as a safer category simply to reveal a cheaper estimate; the warehouse or carrier can reclassify it later.",
          "Check the current description of each route and confirm that all parcel contents are eligible. If a listing is unclear about material or components, resolve that before parcel submission. A route shown for generic clothing does not prove it will accept a parcel containing a battery-powered accessory. Eligibility is a live operational fact, not a permanent property of a spreadsheet row."
        ]
      },
      {
        heading: "Budget for the costs outside the freight line",
        paragraphs: [
          "The international line item is not always the whole delivered cost. Depending on the order and destination, the total can also involve currency conversion, payment processing, optional inspection or packing services, insurance choices, taxes, duties, customs assessment or last-mile carrier charges. Not every cost applies to every parcel, and the platform cannot guarantee how a destination authority will assess a shipment.",
          "Create three budget columns: known, estimated and destination-dependent. Product and selected variant prices belong in known once confirmed. A calculator scenario belongs in estimated. Taxes or carrier charges that depend on destination treatment belong in destination-dependent until verified. This prevents a precise-looking spreadsheet total from hiding uncertainty and makes it easier to decide how much reserve is comfortable."
        ]
      },
      {
        heading: "What customer reviews can—and cannot—tell you",
        paragraphs: [
          "Public app reviews show mixed experiences. Some users praise the interface, order tracking or customer support, while others complain that shipping was much higher than the product value or that route information felt unclear. These accounts are useful because they highlight the questions a buyer should ask: What were the destination, packed weight, dimensions, category, route and date? Was the amount an estimate or final charge? Were destination fees included?",
          "A review is not a universal price table. One user’s parcel may differ in country, volume, line, timing and contents. Use repeated complaints as prompts for verification, not as proof that your parcel will cost the same. Likewise, a positive delivery story does not guarantee your route or customs outcome. A balanced review article should preserve this context and clearly label customer statements as individual experiences."
        ],
        checklist: [
          "Destination and date",
          "Packed weight and dimensions",
          "Product categories and restrictions",
          "Selected route and quoted service level",
          "Whether taxes or last-mile fees were included"
        ]
      },
      {
        heading: "Use a landed-cost worksheet before you buy",
        paragraphs: [
          "Start with the live variant price, domestic delivery and the number of items. Add a shipping scenario from the official calculator using honest category, weight and size assumptions. Add optional services you actually intend to use. Then set aside a destination reserve based on current local rules or carrier information. Divide the estimated total by the number of useful items only after the full total is visible; this shows whether a “cheap” extra item really improves value.",
          "Run a stress test by increasing estimated parcel cost by a percentage you can tolerate. If the order becomes unaffordable with a moderate change, the item stage is already too large. Remove low-priority products before purchase rather than hoping the final quote will be unusually low. Budgeting is most effective while every item is still optional."
        ]
      },
      {
        heading: "The decision rule that prevents shipping shock",
        paragraphs: [
          "Never approve the product basket using only product-card prices. Approve it only when the item-stage cost plus a realistic parcel scenario plus a reserve fits the total budget. When warehouse measurements become available, replace assumptions with recorded values and compare live routes again. If the final parcel is not attractive, reconsider packing, remove optional packaging where appropriate, compare a split or delay adding lower-priority goods.",
          "There is no honest single answer to “How much is AllChinaBuy shipping?” without destination, contents, weight, dimensions and timing. The useful answer is a process: estimate before buying, inspect and measure in the warehouse, compare eligible live routes, and keep uncertain destination costs visible. That process does not guarantee the cheapest parcel, but it prevents a low item price from being mistaken for a delivered total."
        ]
      }
    ],
    sourceNote: "Research basis: AllChinaBuy official website, official freight calculator and official app description; calculator fields and service description checked August 12, 2026. Customer-review patterns are treated as anecdotal experience, not universal pricing evidence."
  }
];

export const getEnglishArticle = (slug: string) => englishArticles.find((article) => article.slug === slug) ?? englishArticles[0];
