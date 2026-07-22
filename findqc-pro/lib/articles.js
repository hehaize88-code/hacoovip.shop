export const articleSources = {
  home: {
    label: "FindQC homepage",
    href: "https://findqc.com/",
    note: "Current navigation, Trending, Karma, Review Wall and Real Hauls descriptions.",
  },
  terms: {
    label: "FindQC Terms of Service",
    href: "https://findqc.com/terms-of-service",
    note: "Official description of the service, third-party purchasing and QC-data limitations.",
  },
  privacy: {
    label: "FindQC Privacy Policy",
    href: "https://findqc.com/privacy-policy",
    note: "Official explanation of search, popularity, collections and third-party QC records.",
  },
  academySearch: {
    label: "FindQC Academy: choosing a search method",
    href: "https://academy.findqc.com/2024/12/21/mastering-qc-finder-choosing-the-best-search-method/",
    note: "FindQC's comparison of link, image and keyword search.",
  },
  bot: {
    label: "FindQC Bot",
    href: "https://findqc.com/robots",
    note: "Official description of link parsing, image recognition and QC media in Discord.",
  },
  cpsc: {
    label: "U.S. Consumer Product Safety Commission recalls",
    href: "https://www.cpsc.gov/Recalls",
    note: "Independent public recall and safety-warning database for consumer products; visual QC photos do not replace a safety check.",
  },
  safetyGate: {
    label: "EU Safety Gate alerts",
    href: "https://ec.europa.eu/safety-gate-alerts/",
    note: "European Commission alert system for dangerous non-food products and an independent reference beyond seller or warehouse imagery.",
  },
};

export const articles = [
  {
    slug: "before-you-buy-qc-guide",
    title: "How to Use FindQC Before You Buy: A Practical QC Photo Checklist",
    shortTitle: "A Practical FindQC Photo Checklist",
    description: "A fact-checked workflow for using FindQC records and warehouse QC photos before placing or approving a shopping-agent order.",
    excerpt: "Turn a FindQC result into a repeatable pre-purchase check: confirm the listing, read the full photo set, compare measurements and understand what the evidence cannot prove.",
    category: "FindQC Guide",
    readTime: "10 min read",
    date: "20 July 2026",
    dateISO: "2026-07-20",
    updatedISO: "2026-07-22",
    heroImage: "/products/shoes-60.jpg",
    heroAlt: "Pair of grey shoes photographed from above beside a shoebox",
    keywords: ["FindQC", "FindQC guide", "QC photos", "warehouse QC checklist", "shopping agent QC"],
    intro: [
      "A useful QC check begins before you zoom in on a logo or count stitches. First, you need to know that the record belongs to the product you are considering. Then you need to separate visible evidence from assumptions. FindQC can shorten the discovery stage by bringing product records and QC material into one research interface, but the final judgement still belongs to the buyer.",
      "This guide turns that research into a calm, repeatable process. It is based on FindQC's current public pages and legal documentation, not on a claim that every listing contains the same fields. Use it before ordering and again when your shopping agent supplies photos of the exact item in your warehouse account.",
    ],
    sections: [
      {
        id: "role",
        title: "1. Start with the correct idea of what FindQC does",
        blocks: [
          { type: "p", text: "FindQC's Terms of Service describe the site as a QC discovery and aggregation platform. Its listed services may include link and image search, regular and premium QC, a link converter, a size assistant and a Discord bot. That wording matters: FindQC organizes research material; it is not the merchant that sells the item." },
          { type: "p", text: "The same terms say that FindQC does not provide purchasing or forwarding. Payments, shipping and returns are handled by third parties, and links may route to shopping agents. In practical terms, use FindQC to investigate a candidate and use the seller or agent interface to confirm the transaction. A price or return label seen on a research page should be rechecked on the live purchase page before money changes hands." },
          { type: "callout", title: "The right mental model", text: "FindQC is the research desk. The source listing is the commercial offer. Your agent's warehouse photos are the evidence for the unit you actually received." },
        ],
      },
      {
        id: "listing",
        title: "2. Confirm the listing before judging the photos",
        blocks: [
          { type: "p", text: "When you already have a Taobao, Weidian or 1688 link, begin with that exact link. FindQC Academy calls link search the most precise and time-saving option for a clear target, while warning that it depends on a valid link. A broken or replaced listing can lead you to no result, an outdated result or a different product." },
          { type: "p", text: "On the result page, compare the product title, seller or store name, source marketplace, variant information and any visible price or domestic-freight field with the link you intend to use. Look for a live-availability notice as well. FindQC pages can preserve QC photos after a seller removes a product; that archive is still useful for research, but it does not make the item purchasable." },
          { type: "list", title: "Five identity checks", items: [
            "The source marketplace and product link match your candidate.",
            "The seller or store name has not silently changed.",
            "The colour, model and variant shown are the ones you plan to order.",
            "The record is not marked as removed or no longer available.",
            "Current price, return terms and domestic shipping are confirmed on the transaction page.",
          ] },
          { type: "p", text: "Do not skip this step because two products share a cover image. Marketplace sellers often reuse promotional photographs, and a familiar title does not prove that two links point to the same batch. Identity comes before quality." },
        ],
      },
      {
        id: "whole-item",
        title: "3. Read the complete photo set from wide view to detail",
        blocks: [
          { type: "p", text: "Open the entire image set before forming an opinion. A strong inspection sequence moves from the whole item to construction details and finally to measurements. Start with front, back, side and top views where available. Ask whether the silhouette is balanced, panels line up, pairs look symmetrical and the selected colour appears consistent across images." },
          { type: "p", text: "Next, inspect the places where assembly errors become visible: seam junctions, hems, collars, cuffs, zippers, eyelets, embroidery edges, print borders and hardware. One loose thread is different from a seam that wanders across a panel. A small lighting reflection is different from a scratch that appears from two angles. Look for repeated evidence rather than reacting to one ambiguous pixel." },
          { type: "figure", image: "/products/jacket.webp", alt: "Dark jacket shown as an editorial product example", caption: "Editorial catalog example. Use wide views to assess shape before inspecting zippers, seams and embroidery. This is not a FindQC warehouse record." },
          { type: "p", text: "Finish with labels, accessories and packaging. Check whether the photographed size label matches the ordered variant, whether removable parts are present and whether the box or protective packaging is adequate for the item. Packaging does not prove product quality, but missing pieces or obvious transport damage can change the decision." },
        ],
      },
      {
        id: "measurements",
        title: "4. Treat measurements as evidence, not decoration",
        blocks: [
          { type: "p", text: "Fit is one of the easiest areas to overestimate from a photograph. A hoodie can look oversized because of the camera angle; a shoe can look long because it is close to the lens. If the record includes a ruler or tape, compare the visible measurement with the seller's size chart and with a comparable item you already own." },
          { type: "p", text: "For clothing, useful checks include chest width, total length, shoulder width, sleeve length, waist and inseam, depending on the garment. For footwear, insole length is often more informative than a printed size alone. For bags and accessories, external dimensions help you test whether the item can serve its intended purpose. Read where the tape begins and ends; a bent tape, thick sole or folded garment can introduce error." },
          { type: "callout", title: "Practical rule", text: "Compare like with like: flat garment to flat garment, insole to insole and the same measurement points on both the seller chart and the QC image." },
        ],
      },
      {
        id: "signals",
        title: "5. Use community signals as context, not a verdict",
        blocks: [
          { type: "p", text: "FindQC's homepage currently separates Trending, Karma, Review Wall and Real Hauls. It describes Trending as discovery based on user behaviour, Karma as global community favourites, Review Wall as buyer reviews with QC photos and Real Hauls as parcels shipped worldwide. These sections can help you find candidates and questions worth asking." },
          { type: "p", text: "Popularity is not the same as quality. A frequently viewed listing may be inexpensive, newly viral or simply easy to share. A positive review may describe another size, colour, order date or batch. A haul shows that a parcel moved through a buying process, not that every future unit will match it. Read the date, the product link and the visible sample size before assigning weight to a signal." },
          { type: "p", text: "The most useful pattern is agreement across independent clues. If the source identity matches, several photo sets show consistent construction, measurements fit your needs and recent reviews mention the same strengths or weaknesses, uncertainty becomes smaller. It never becomes zero." },
        ],
      },
      {
        id: "limits",
        title: "6. Know what QC photos cannot establish",
        blocks: [
          { type: "p", text: "FindQC states that QC photos, weight, dimensions and defect records generally come from third-party agents. The platform organizes that data but does not guarantee its accuracy, completeness or authenticity. Its terms also say that QC content may contain errors and that FindQC does not provide authenticity certification." },
          { type: "p", text: "A photograph can show a visible stain, colour mismatch, missing part or crooked print. It usually cannot prove fibre composition, long-term durability, battery health, waterproofing, internal construction, comfort or how an item will behave after washing. Even sharp photographs may hide the underside, interior or a defect outside the frame." },
          { type: "p", text: "This is why the photos of your own warehouse item matter more than an older public set. Public QC records help you decide whether a listing deserves further attention. Your agent's record helps you decide whether to accept, exchange or return the unit attached to your order, subject to the agent and seller's current rules." },
        ],
      },
      {
        id: "workflow",
        title: "7. A ten-minute decision workflow",
        blocks: [
          { type: "list", title: "Run the check in this order", items: [
            "Minute 1: save the exact source link and ordered variant.",
            "Minutes 2–3: confirm seller, marketplace, availability and current commercial terms.",
            "Minutes 4–5: scan every wide view for shape, colour, symmetry and missing parts.",
            "Minutes 6–7: zoom into construction details relevant to the category.",
            "Minute 8: compare photographed measurements with your reference item.",
            "Minute 9: read recent reviews or community signals for repeated issues.",
            "Minute 10: write a simple accept, ask-for-more-evidence or reject decision.",
          ] },
          { type: "p", text: "If the evidence is incomplete, name the missing view instead of guessing. Ask for a close-up of the suspected mark, a label photo, an insole measurement or a view of the included accessories. A precise request is easier for an agent to fulfil and easier for you to evaluate." },
          { type: "p", text: "The goal is not to eliminate every risk. It is to make the next decision with the best available evidence, while the item is still at a stage where your agent may be able to help. That disciplined use of FindQC is more valuable than treating a large gallery as an automatic approval." },
        ],
      },
    ],
    sources: [articleSources.terms, articleSources.home, articleSources.academySearch, articleSources.cpsc, articleSources.safetyGate],
    related: ["findqc-search-methods", "what-qc-photos-can-prove", "findqc-shopping-agent-workflow"],
    cta: { eyebrow: "Continue the check", title: "Use the seven-stage warehouse photo checklist", href: "/guides/qc-photo-checklist", label: "Open the QC checklist" },
  },
  {
    slug: "findqc-search-methods",
    title: "FindQC Search Methods Explained: Link Search vs Image Search vs Keywords",
    shortTitle: "Link vs Image vs Keyword Search",
    description: "Learn when to use FindQC link search, image search or keyword search, how each method can fail and how to verify the result before buying.",
    excerpt: "Choose the right FindQC search path for the evidence you have, then validate the result instead of assuming the first visual match is the correct listing.",
    category: "Search Strategy",
    readTime: "9 min read",
    date: "20 July 2026",
    dateISO: "2026-07-20",
    updatedISO: "2026-07-22",
    heroImage: "/products/tshirt.webp",
    heroAlt: "Folded white T-shirt used as an editorial product-search example",
    keywords: ["FindQC search", "FindQC link search", "FindQC image search", "FindQC keyword search", "find QC photos"],
    intro: [
      "Search quality depends on the clue you start with. A complete marketplace link, a cropped screenshot and a vague product name do not carry the same information, so they should not be entered in the same way. FindQC supports several discovery paths, and its Academy specifically compares link, image and keyword search.",
      "The best method is not the most advanced-looking one. It is the method that preserves the strongest identifier you already have. This guide explains the trade-offs stated by FindQC, then adds a practical verification routine so that a search result becomes evidence rather than a shortcut to the wrong listing.",
    ],
    sections: [
      {
        id: "decision",
        title: "1. Choose the search method from your starting evidence",
        blocks: [
          { type: "p", text: "Before opening a search box, classify what you have. If you possess the original Taobao, Weidian or 1688 product URL, the link contains a direct identifier and should normally be your first choice. If you only have a clean product image, image search can propose visually related items. If you have a name, category or descriptive phrase, keyword search gives you the broadest exploration." },
          { type: "table", headers: ["Starting clue", "Best first method", "Main risk"], rows: [
            ["Valid source-product URL", "Link search", "The link may be broken, replaced or removed"],
            ["Clear, distinctive product photo", "Image search", "Similar-looking items can belong to different sellers or batches"],
            ["Name, model or category words", "Keyword search", "Wording and language can produce noisy results"],
            ["Screenshot plus partial text", "Image, then keyword", "Crops, overlays and generic terms reduce precision"],
          ] },
          { type: "p", text: "This evidence-first approach prevents a common mistake: throwing away a precise source link and searching a generic name instead. Every step away from a unique identifier creates more candidates to filter." },
        ],
      },
      {
        id: "link-search",
        title: "2. Link search: the shortest route to a specific candidate",
        blocks: [
          { type: "p", text: "FindQC Academy describes link search as precise and time-saving for users with a clear target. Paste the full product URL rather than a seller's shop homepage, an image-hosting address or a shortened social link. If the URL contains tracking parameters, keep the core marketplace item identifier intact." },
          { type: "p", text: "A successful lookup still needs an identity check. Compare the source platform, seller name, title, cover image and variant clues. If FindQC shows a removed-product notice, treat the record as an archive. One official FindQC detail page explicitly says that QC photos remain viewable after the seller removes the item, while the product can no longer be purchased." },
          { type: "list", title: "Use link search when", items: [
            "A seller, spreadsheet or community post supplies a marketplace item URL.",
            "You want QC material tied to one known listing rather than similar products.",
            "You need to revisit the same candidate without rebuilding a keyword query.",
          ] },
          { type: "p", text: "If the lookup fails, do not assume there are no QC records. The Academy notes that link search depends on a valid link. Extract the title or item image and move to the recovery ladder later in this guide." },
        ],
      },
      {
        id: "image-search",
        title: "3. Image search: useful for recognition, weak for identity",
        blocks: [
          { type: "p", text: "Image search is useful when the product name is unknown, written in another language or hidden in a screenshot. FindQC Academy says its algorithm identifies similar pictures and notes that this can help with sample comparison and product-detail validation. FindQC's bot page also describes image recognition that returns products with QC photos or videos." },
          { type: "figure", image: "/products/headwear.webp", alt: "Black embroidered cap isolated on a light background", caption: "A clean, centred image gives visual search more useful shape and detail than a busy lifestyle photograph. Editorial example; not a FindQC result." },
          { type: "p", text: "Prepare the image before uploading. Crop away chat bubbles, prices, watermarks and unrelated objects where possible. Keep the full silhouette, distinctive hardware, print or colour blocking. Avoid severe filters. The Academy warns that image quality and viewing angle affect accuracy, so try a second angle when the first set of results is too broad." },
          { type: "p", text: "A visual match is a lead, not proof. Factories and sellers may use the same promotional photograph, while products that look nearly identical can differ in material, dimensions or construction. Open promising candidates and compare source links, store names, variants and any QC sets. The result with the closest thumbnail is not automatically the right source." },
        ],
      },
      {
        id: "keyword-search",
        title: "4. Keyword search: broad discovery with deliberate filtering",
        blocks: [
          { type: "p", text: "Keyword search works best when you are exploring a product type or have several descriptive clues. FindQC Academy calls it versatile and flexible, and recommends combining keywords to narrow results. Start with the most stable attributes: product type, model term, material, colour or a distinctive feature." },
          { type: "p", text: "Build the query in layers. Begin with two or three specific terms, review the result pattern, then add or remove one attribute at a time. A phrase such as 'black zip hoodie embroidered' carries more information than 'nice hoodie'. Avoid subjective words that sellers may not use. If the English phrase performs poorly, try a shorter model name or use image search rather than inventing a translation." },
          { type: "p", text: "The Academy identifies input accuracy, filtering time and language barriers as disadvantages. That means an empty result may reflect vocabulary, not inventory, while an enormous result set means the query is underspecified. Record the exact source link as soon as you find the intended listing, so future checks can switch back to link search." },
        ],
      },
      {
        id: "verification",
        title: "5. Verify every search result with the same four questions",
        blocks: [
          { type: "list", title: "Result validation", items: [
            "Identity: Does the marketplace item, seller and variant match the candidate?",
            "Freshness: Is the listing live, or does the page say the seller removed it?",
            "Evidence: Are the QC photos tied to the same product record, and are enough views present to answer your question?",
            "Action: Does the purchase link lead to the intended agent or source page, where current terms can be confirmed?",
          ] },
          { type: "p", text: "FindQC's Terms of Service state that photos, weight, dimensions and defect records generally come from third-party agents and are not guaranteed for accuracy, completeness or authenticity. Verification therefore has two levels. First confirm that FindQC found the intended record. Then evaluate the limitations of the data inside that record." },
          { type: "callout", title: "Search success is not purchase approval", text: "Finding the right listing answers 'What is this?' QC review answers 'Does the visible evidence meet my requirements?' The source page answers 'Can I buy it now, under these terms?'" },
        ],
      },
      {
        id: "recovery",
        title: "6. Use a recovery ladder when the first search fails",
        blocks: [
          { type: "p", text: "Search failure is normal when links expire or screenshots lose context. Work from the most specific clue to the broadest. First, clean and retry the source URL. Second, search a distinctive image cropped from the listing. Third, use the exact model or title fragment. Fourth, broaden to category plus visible attributes. Stop when results become too generic to verify." },
          { type: "p", text: "If several candidates remain, create a small comparison rather than guessing. Save the source URL, seller, displayed variant, date checked and the number of useful QC angles for each. Eliminate candidates with contradictory identity information or removed status. Then compare the remaining records on the feature that matters to you, such as dimensions, print placement or included parts." },
          { type: "p", text: "For repeated research, FindQC says certain signed-in features include My Collection and History. Its privacy policy explains that views, clicks and searches are used to calculate popularity and improve systems, while saved items support the user's collection. Decide whether those conveniences fit your privacy preferences; a simple local note with exact URLs also works." },
        ],
      },
      {
        id: "workflow",
        title: "7. A search sequence that preserves evidence",
        blocks: [
          { type: "p", text: "The reliable sequence is simple: begin with the strongest clue, verify identity, save the exact record, inspect the full QC set, confirm that the commercial listing is live and only then move to an agent. If your evidence changes—perhaps the agent substitutes a source link—repeat the identity check rather than assuming the old research still applies." },
          { type: "p", text: "Link, image and keyword search are complementary. Link search retrieves a target, image search recovers from missing language, and keyword search explores a category. The skill is knowing when to change modes and when the result is too uncertain to support a purchase. A methodical search produces fewer exciting false matches and more records you can actually use." },
        ],
      },
    ],
    sources: [articleSources.academySearch, articleSources.terms, articleSources.privacy, articleSources.bot],
    related: ["before-you-buy-qc-guide", "findqc-product-signals", "findqc-shopping-agent-workflow"],
    cta: { eyebrow: "Put search into practice", title: "Browse mapped products with exact source links", href: "/products", label: "Open product finds" },
  },
  {
    slug: "findqc-product-signals",
    title: "How to Read FindQC Trending, Karma, Reviews and Hauls Without Overtrusting Them",
    shortTitle: "Reading FindQC Product Signals",
    description: "A practical guide to interpreting FindQC Trending, Karma, reviews and haul data as research signals rather than quality guarantees.",
    excerpt: "Understand what FindQC's community and behaviour-based sections can reveal, where bias enters, and how to combine signals with listing and QC evidence.",
    category: "Product Research",
    readTime: "9 min read",
    date: "20 July 2026",
    dateISO: "2026-07-20",
    updatedISO: "2026-07-22",
    heroImage: "/products/jersey.webp",
    heroAlt: "Blue basketball jersey shown as an editorial product example",
    keywords: ["FindQC Trending", "FindQC Karma", "FindQC reviews", "FindQC hauls", "product research signals"],
    intro: [
      "Product research becomes difficult when a page contains many numbers but no clear explanation of how much confidence each number deserves. FindQC's homepage currently presents several discovery layers—Trending, Karma, Review Wall and Real Hauls—alongside product cards and QC material. They are useful, but they answer different questions.",
      "This guide reads those sections conservatively. It uses FindQC's own labels and policies, then applies a simple evidence hierarchy. The aim is to discover promising listings without turning popularity, praise or a shipped parcel into a guarantee about the next item you receive.",
    ],
    sections: [
      {
        id: "map",
        title: "1. Map each signal to the question it can answer",
        blocks: [
          { type: "table", headers: ["FindQC section", "Official page description", "Useful question"], rows: [
            ["Trending", "Discovering trends through user behaviour", "What is attracting attention now?"],
            ["Karma", "Global community favourites", "What has accumulated community interest?"],
            ["Review Wall", "Real buyer reviews with QC photos", "What did particular buyers report?"],
            ["Real Hauls", "Real parcels shipped worldwide", "What products appeared in completed parcels?"],
          ] },
          { type: "p", text: "These are discovery questions, not laboratory conclusions. Trending can surface momentum. Karma can surface long-running interest. Reviews can provide experience and photographs. Hauls can show that goods moved through an agent flow. None of them, alone, establishes the condition, material, fit or authenticity of the unit attached to your future order." },
          { type: "p", text: "Keeping the questions separate prevents category errors. A popular item may have few detailed reviews. A highly rated review may be old. A haul may show an attractive combination without recording return problems that happened before shipment. Use each signal for what it is designed to reveal." },
        ],
      },
      {
        id: "trending",
        title: "2. Trending measures attention, not durability",
        blocks: [
          { type: "p", text: "FindQC explicitly says its Trending section discovers trends through user behaviour. Its privacy policy adds that views, clicks and searches are used to calculate popularity and improve ranking and results. That makes Trending useful for seeing where current interest is concentrating." },
          { type: "p", text: "Attention can rise for many reasons: a low displayed price, a viral post, seasonality, a new colour, an influencer mention or a listing that is easy to share. Those causes do not have the same relationship to product quality. Treat Trending as an efficient candidate generator. Once a card catches your interest, leave the trend context and inspect the individual record." },
          { type: "list", title: "Before following a trend", items: [
            "Check whether the product link is still live.",
            "Compare the current variant and seller with the QC record.",
            "Look for several usable angles rather than a large raw image count.",
            "Check the date and specificity of any review you rely on.",
          ] },
        ],
      },
      {
        id: "karma",
        title: "3. Karma is a community filter, not a specification",
        blocks: [
          { type: "p", text: "The homepage labels Karma as a way to discover global community favourites and presents a category index. That can help a new researcher move from an enormous marketplace to a shorter list of widely noticed items. It can also reveal categories with active communities and more available reference material." },
          { type: "p", text: "A community score still lacks important context unless you open the product. It may combine interest accumulated over time, while sellers, prices and batches change. It does not tell you why people engaged, whether they bought the same variant or whether the latest units match older photographs. Do not translate a high number into claims such as 'best quality' unless the visible evidence independently supports them." },
          { type: "figure", image: "/products/pants.webp", alt: "Black drawstring pants used as an editorial category example", caption: "Community interest can help shortlist a category. The product record and your own warehouse evidence must still carry the decision." },
        ],
      },
      {
        id: "reviews",
        title: "4. Read reviews for observations, not just scores",
        blocks: [
          { type: "p", text: "FindQC describes Review Wall as real buyer reviews with QC photos. Reviews can add evidence that a static product page cannot: comments about perceived comfort, packaging, fit or the condition of a received item. Photographs may expose angles missing from a seller's promotional set." },
          { type: "p", text: "The star score is the least detailed part. Read the text for a specific observation and ask whether it is visible or personal. 'The zipper catches at the bottom' is a testable construction report. 'Perfect quality' is an impression. 'True to size' is hard to transfer without the reviewer's measurements, chosen size and fit preference." },
          { type: "list", title: "A review carries more weight when it includes", items: [
            "A date recent enough to be relevant to the current listing.",
            "The exact product or source link rather than only a name.",
            "Variant, size or colour information.",
            "Original-looking photos that show the reported detail.",
            "A concrete strength or problem instead of an unsupported superlative.",
          ] },
          { type: "p", text: "One detailed review can reveal a question to investigate, but it should not define the whole listing. Look for repeated observations across different buyers and compare them with QC images. Repetition is more useful than volume when the volume consists of generic praise." },
        ],
      },
      {
        id: "hauls",
        title: "5. Hauls show a completed route, not a repeatable outcome",
        blocks: [
          { type: "p", text: "FindQC's homepage calls Real Hauls real parcels shipped worldwide. A haul is valuable because it places products in a wider purchasing context. It can help you notice common combinations, the scale of a parcel and how an item appears outside an isolated seller card." },
          { type: "p", text: "A shipped parcel does not prove that every order went smoothly or that a current seller will supply the same unit. It may omit returned items, extra-photo requests, replacements or the time between purchase and dispatch. Shipping cost and customs outcomes also vary by destination, parcel characteristics, agent and date, so do not copy someone else's outcome as a quotation for your own parcel." },
          { type: "p", text: "Use a haul to discover links and practical questions. Then rebuild the evidence for your own order: is the product still available, is the seller unchanged, does your variant match, and do your warehouse photos show the expected item?" },
        ],
      },
      {
        id: "triangulate",
        title: "6. Triangulate signals with listing and QC evidence",
        blocks: [
          { type: "p", text: "A dependable decision uses three layers. The identity layer confirms the exact source listing and variant. The visual layer examines QC photos, measurements and visible defect records. The community layer adds recent reviews, interest and haul context. If one layer contradicts another, investigate the contradiction rather than averaging it away." },
          { type: "callout", title: "Example", text: "A product may be trending and positively reviewed, yet your chosen link is marked unavailable. The correct conclusion is not 'popular enough to buy'; it is 'use the archive to understand the item, then find and verify a live alternative.'" },
          { type: "p", text: "FindQC's own terms reinforce this conservative reading. The platform says QC photos, weight, dimensions and defect records generally come from third-party agents and are not guaranteed for accuracy, completeness or authenticity. Community material increases context, but it does not remove that limitation." },
        ],
      },
      {
        id: "scorecard",
        title: "7. Build a small evidence scorecard",
        blocks: [
          { type: "list", title: "Score the evidence, not the hype", items: [
            "Listing identity: exact, uncertain or conflicting.",
            "Availability: live, unclear or removed.",
            "QC coverage: complete for your concern, partial or missing.",
            "Measurements: comparable, ambiguous or absent.",
            "Reviews: specific and recent, generic, or outdated.",
            "Community signal: supporting context only.",
          ] },
          { type: "p", text: "This does not need a numerical formula. A simple green, amber and red note is enough. Green means the evidence answers the question. Amber means you need another photo, measurement or source check. Red means the record conflicts with the proposed purchase or the required evidence is unavailable." },
          { type: "p", text: "Add a date to the scorecard because product evidence ages. A review written against a live listing today may become historical if the seller removes the item, changes its variants or replaces the offer. Before reordering, reopen the source link and repeat the identity check. Reuse the old notes as a list of questions, not as permanent proof that the current product is unchanged." },
          { type: "p", text: "Trending, Karma, reviews and hauls are valuable because they help people navigate a huge product space. They become misleading only when attention is converted into certainty. Use them to decide what deserves inspection, then let the exact listing and the exact warehouse item decide what deserves approval." },
        ],
      },
    ],
    sources: [articleSources.home, articleSources.privacy, articleSources.terms],
    related: ["findqc-search-methods", "what-qc-photos-can-prove", "before-you-buy-qc-guide"],
    cta: { eyebrow: "Move from signals to evidence", title: "Check the item category by category", href: "/categories", label: "Browse categories" },
  },
  {
    slug: "what-qc-photos-can-prove",
    title: "What FindQC QC Photos Can—and Cannot—Tell You Before Shipping",
    shortTitle: "What QC Photos Can and Cannot Prove",
    description: "Learn which visible product issues FindQC QC photos can help you evaluate, which claims remain unproven and when to request more evidence.",
    excerpt: "Draw a clear line between visible inspection evidence and claims about materials, performance, authenticity or long-term durability.",
    category: "QC Evidence",
    readTime: "10 min read",
    date: "20 July 2026",
    dateISO: "2026-07-20",
    updatedISO: "2026-07-22",
    heroImage: "/products/watch.webp",
    heroAlt: "Watch shown as an editorial example of a detail-sensitive product",
    keywords: ["FindQC QC photos", "what do QC photos show", "warehouse photos", "QC photo limitations", "product inspection photos"],
    intro: [
      "Warehouse QC photos are powerful because they can replace vague hope with visible evidence. They are limited because a camera records only a surface, from a chosen angle, under particular lighting. The most useful buyer is neither cynical about every image nor persuaded by every image; the useful buyer asks a precise question and checks whether the frame can answer it.",
      "FindQC gives access to aggregated QC material, but its official terms set a careful boundary around that material. This guide follows the same boundary. It shows what can reasonably be inspected, what usually remains unknown and how to request an extra view when the decision is still open.",
    ],
    sections: [
      {
        id: "source",
        title: "1. Understand where the evidence comes from",
        blocks: [
          { type: "p", text: "FindQC says that QC photos, weight, dimensions and defect records displayed on its service generally come from third-party agents. Its privacy policy similarly says that FindQC displays this data but does not create it. The platform organizes records for discovery; it does not photograph every unit itself." },
          { type: "p", text: "That distinction explains why coverage varies. One record may contain wide views, measurements and detailed close-ups, while another may have only a few standard angles. Image quality, labels and available fields can differ by agent and by order. Evaluate the evidence that is actually present rather than assuming a standard set exists behind the page." },
          { type: "callout", title: "Two different uses", text: "A public FindQC set helps evaluate a listing or historical example. Photos from your agent account evaluate the particular warehouse item assigned to your order." },
        ],
      },
      {
        id: "visible",
        title: "2. What a clear photo can often show",
        blocks: [
          { type: "p", text: "A well-framed image can reveal product identity and visible condition. You may be able to confirm broad colour, ordered variant, overall shape, obvious stains, tears, scratches, missing pieces, misaligned panels or a print that is noticeably off-centre. Multiple angles can show whether the issue repeats or was created by a fold, reflection or camera perspective." },
          { type: "p", text: "Construction details are also inspectable when resolution and angle allow. On clothing, look at seam direction, collar shape, cuff symmetry, embroidery borders and print placement. On footwear, compare the pair, toe shape, side panels, outsole edge, eyelets and size label. On bags or watches, check hardware placement, surface finishing, closure alignment and included parts." },
          { type: "figure", image: "/products/shoes-60.jpg", alt: "Pair of grey shoes viewed from above beside a shoebox", caption: "Wide editorial example: compare the pair and overall shape first, then request closer evidence for stitching, labels or surface marks. Not a FindQC warehouse record." },
          { type: "p", text: "The word 'visible' should remain attached to every conclusion. A photo may support 'no large stain is visible in the supplied views.' It does not support 'the product has no defects.' The second statement silently includes unseen surfaces and properties the camera cannot test." },
        ],
      },
      {
        id: "measurement",
        title: "3. Measurements can answer fit questions—if read correctly",
        blocks: [
          { type: "p", text: "A ruler or tape turns an image into a rough measurement record. It can help you compare garment width, length, sleeve, waist, inseam, shoe insole or product dimensions with a reference item. This is often more useful than relying on a size letter, because marketplace sizing and personal fit preferences vary." },
          { type: "p", text: "Read the method as carefully as the number. Check whether the item lies flat, whether the tape begins at zero, whether it bends over a thick surface and whether the measurement points match the seller chart. A chest width measured armpit to armpit is not interchangeable with body circumference. An outsole length is not the same as usable insole length." },
          { type: "p", text: "FindQC's terms say displayed dimensions and weight are not guaranteed for accuracy or completeness. Use the measurement to reduce uncertainty, not to create false precision. If a one-centimetre difference would determine your decision, ask for a clearer measurement of the exact warehouse item." },
        ],
      },
      {
        id: "unknown",
        title: "4. What photographs usually cannot prove",
        blocks: [
          { type: "list", title: "Properties that normally need more than a photo", items: [
            "Fibre composition, material grade or chemical content.",
            "Long-term seam strength, abrasion resistance or wash behaviour.",
            "Waterproofing, battery health, sound quality or electronic safety.",
            "Comfort, smell, skin feel or how a garment drapes on your body.",
            "Internal construction hidden by lining or sealed components.",
            "Authenticity or authorization by a brand.",
          ] },
          { type: "p", text: "Some of these properties may have supporting documents or tests elsewhere, but ordinary warehouse photos do not establish them. A printed material label shows what the label says; it does not independently test the fibre. A powered-on screen shows that the display lit at that moment; it does not measure battery capacity or safety." },
          { type: "p", text: "FindQC explicitly says it does not provide authenticity certification. Avoid using QC galleries to make authenticity claims. Visible details may help you compare a product with your expectations, but similarity in photographs is not provenance." },
        ],
      },
      {
        id: "photo-errors",
        title: "5. Separate product problems from photography problems",
        blocks: [
          { type: "p", text: "Warehouse lighting can shift colour temperature. Wide-angle lenses can stretch edges. Compression can erase fine texture, while plastic wrapping creates glare and folds. A garment laid unevenly may look asymmetric; a shoe photographed closer to the lens may look larger than its pair. These are reasons to compare frames, not reasons to dismiss every concern." },
          { type: "p", text: "Use the repeatability test. Does the suspected mark appear in more than one angle? Does a crooked line follow the product or the camera perspective? Is the colour different only in one frame, or does the entire set disagree with the ordered variant? When the answer remains unclear, ask for a neutral-lit close-up with the packaging moved aside." },
          { type: "figure", image: "/products/electronics.webp", alt: "Compact electronic accessory in retail packaging", caption: "Packaging and appearance can be inspected visually; electrical performance and safety require evidence a standard photo cannot provide." },
        ],
      },
      {
        id: "extra",
        title: "6. Request extra evidence with a specific purpose",
        blocks: [
          { type: "p", text: "An effective extra-photo request names the location, angle and decision. Instead of 'send better pictures,' ask for 'a close-up of the left cuff seam in neutral light' or 'the removable insole placed against a ruler from heel to toe.' Specific requests reduce ambiguity for the warehouse and produce an image you can compare." },
          { type: "list", title: "High-value extra views", items: [
            "Close-up of a suspected stain, scratch, skipped stitch or damaged edge.",
            "Size or model label beside the order variant shown in your account.",
            "Ruler across the exact dimension that affects fit.",
            "Interior, underside or rear view omitted from the standard set.",
            "All accessories, cables, straps or removable parts laid out together.",
          ] },
          { type: "p", text: "Request only evidence that can change the decision. More images are not automatically more certainty. Ten repeated front views add less value than one clear label or measurement that resolves the open question." },
        ],
      },
      {
        id: "decision",
        title: "7. Use three decision states instead of pass or fail",
        blocks: [
          { type: "p", text: "A binary reaction encourages guessing. Use three states: accept when the supplied evidence answers your important questions; investigate when one answer is missing or ambiguous; reject or seek a return when the visible item conflicts with the order or your non-negotiable requirements. The available remedy depends on the seller and agent's current rules." },
          { type: "p", text: "Keep a short record of the link, ordered variant, concern, image that supports the conclusion and date. This makes it easier to compare an extra photograph with the original set and prevents a community review from being confused with your own unit." },
          { type: "p", text: "Set the threshold before you become attached to the purchase. For example, a wrong size label or missing required accessory may be an automatic rejection, while a loose removable thread may be acceptable. A prewritten threshold keeps the same visible issue from being judged differently simply because the item is popular, inexpensive or already sitting in the warehouse." },
          { type: "p", text: "The value of FindQC QC photos is not that they make online buying certain. Their value is that they make some questions answerable before international shipping. A disciplined buyer uses the visible evidence fully, states the remaining unknowns honestly and refuses to let a gallery prove more than the camera recorded." },
        ],
      },
    ],
    sources: [articleSources.terms, articleSources.privacy, articleSources.home, articleSources.cpsc],
    related: ["before-you-buy-qc-guide", "findqc-product-signals", "findqc-shopping-agent-workflow"],
    cta: { eyebrow: "Use the evidence", title: "Follow the full seven-stage inspection guide", href: "/guides/qc-photo-checklist", label: "Start the QC checklist" },
  },
  {
    slug: "findqc-shopping-agent-workflow",
    title: "Using FindQC With a Shopping Agent: From Product Link to Warehouse Decision",
    shortTitle: "FindQC and the Shopping-Agent Workflow",
    description: "A step-by-step workflow for researching a product on FindQC, confirming the source listing and reviewing your shopping agent's warehouse evidence.",
    excerpt: "Keep discovery, purchase and warehouse approval separate as you move from a FindQC record to a live listing and your own agent order.",
    category: "Agent Workflow",
    readTime: "10 min read",
    date: "20 July 2026",
    dateISO: "2026-07-20",
    updatedISO: "2026-07-22",
    heroImage: "/products/hoodie.webp",
    heroAlt: "Black hoodie shown as an editorial product-research example",
    keywords: ["FindQC shopping agent", "how to use FindQC", "China shopping agent workflow", "warehouse QC", "product link to agent"],
    intro: [
      "A shopping-agent order crosses several systems, and confusion begins when those systems are treated as one. FindQC helps with discovery and aggregated QC research. A marketplace seller supplies the commercial listing. A shopping agent may handle purchase, warehouse processing and forwarding. Each party controls different information and different remedies.",
      "The safest workflow keeps those roles visible from the first product link to the final warehouse decision. This guide uses FindQC's official descriptions and limitations, then shows how to hand evidence from one stage to the next without assuming that an old QC set belongs to the exact unit you ordered.",
    ],
    sections: [
      {
        id: "roles",
        title: "1. Separate the research platform from the transaction",
        blocks: [
          { type: "p", text: "FindQC calls itself a QC discovery and aggregation platform. Its terms say services may include link and image search, regular and premium QC, a link converter, size assistant and Discord bot. The same document says FindQC is not a seller and does not provide purchasing or forwarding services." },
          { type: "p", text: "Payments, shipping and returns are handled by third parties. Therefore, a FindQC page can help you study a product, but the live seller or agent page remains the place to verify price, domestic freight, variant availability, return eligibility and service terms. If two interfaces disagree, pause and resolve the mismatch before paying." },
          { type: "table", headers: ["Stage", "Primary role", "Decision"], rows: [
            ["Discovery", "FindQC and product research", "Is this candidate worth investigating?"],
            ["Purchase", "Seller and shopping agent", "Is the current offer acceptable?"],
            ["Warehouse", "Agent record for your order", "Accept, request evidence, exchange or return?"],
            ["Forwarding", "Shopping agent or carrier", "How and when should the parcel ship?"],
          ] },
        ],
      },
      {
        id: "candidate",
        title: "2. Build a candidate record before opening an agent",
        blocks: [
          { type: "p", text: "Start with the original marketplace link whenever possible. FindQC Academy describes link search as the precise option for a clear target. If the source link is unavailable, image search can recover visually similar candidates and keyword search can explore by description, but both require more filtering." },
          { type: "p", text: "For each serious candidate, save the source URL, marketplace, seller or store name, product title, intended variant and date checked. Add the FindQC record URL separately. This small distinction prevents an aggregation page from being mistaken for the source listing and gives you two paths back if one link later fails." },
          { type: "list", title: "Minimum candidate record", items: [
            "Original marketplace product link.",
            "FindQC record used for research.",
            "Seller or store and intended variant.",
            "Current price and domestic shipping checked on the transaction page.",
            "One sentence describing the QC question that matters most.",
          ] },
        ],
      },
      {
        id: "research",
        title: "3. Research the listing without confusing history with stock",
        blocks: [
          { type: "p", text: "Review the FindQC photo sets, measurements, defect information and community context that are actually available. Look first for identity: do the seller, marketplace, cover image and variant clues agree with your source link? Then inspect the category-specific details that could change your decision." },
          { type: "p", text: "Historical records remain useful, but availability is a separate question. Some FindQC detail pages retain QC photos while displaying a notice that the seller removed the item and it can no longer be purchased. In that situation, use the gallery to learn what to check on a similar product; do not send the dead link to an agent and expect the archived record to restore it." },
          { type: "figure", image: "/products/hoodie.webp", alt: "Black hoodie shown front-on as an editorial example", caption: "For a hoodie, research shape, print or embroidery placement, cuffs, labels and useful garment measurements. Editorial catalog image; not a FindQC QC record." },
        ],
      },
      {
        id: "handoff",
        title: "4. Hand the exact source and variant to the shopping agent",
        blocks: [
          { type: "p", text: "When the candidate passes research, open the mapped catalog or your chosen agent and confirm the commercial details again. Paste or follow the exact source link, choose the variant carefully and preserve screenshots or order notes that show your selection. A colour nickname or size letter may be translated differently across interfaces, so match images, seller variant text and identifiers where available." },
          { type: "p", text: "On FindQC Pro, product and category entries lead to mapped pages on cnfanshp.com. That route is a navigation aid, not evidence that FindQC itself sold or approved the product. On the destination, verify live availability, price and policies before submitting an order." },
          { type: "callout", title: "Stop on substitution", text: "If an agent proposes a different seller link because the original is unavailable, treat it as a new candidate. Repeat identity and QC research instead of transferring confidence from the first listing." },
        ],
      },
      {
        id: "warehouse",
        title: "5. Give your own warehouse photos the highest weight",
        blocks: [
          { type: "p", text: "Public QC records describe other photographed units. Your agent's warehouse set is tied to the item in your order account, so it should carry more weight for approval. Compare it with the expectations recorded during research: correct product, variant, broad shape, visible construction, labels, measurements and included parts." },
          { type: "p", text: "Do not look only for a dramatic defect. Check for quiet mismatches such as a different colour code, missing accessory, wrong size label, shorter measurement, altered print placement or changed hardware. These can indicate a variant error or product change even when the item appears generally clean." },
          { type: "list", title: "Warehouse review order", items: [
            "Confirm the order number and selected variant.",
            "Scan all wide views for identity, colour, shape and missing pieces.",
            "Inspect the category-specific details identified during research.",
            "Compare any ruler photos with the same points on your reference item.",
            "Record unresolved questions before choosing a remedy.",
          ] },
        ],
      },
      {
        id: "remedy",
        title: "6. Turn uncertainty into a specific warehouse request",
        blocks: [
          { type: "p", text: "If a supplied photo cannot answer an important question, request an extra view that can. Name the exact location and framing: the size tag, left shoe label, inner pocket, cable set or a ruler across the chest width. Avoid broad requests for 'more QC' because they may produce repeated angles without resolving the concern." },
          { type: "p", text: "If the evidence shows the wrong item or an unacceptable visible issue, check the agent and seller's current exchange or return process. FindQC does not control those remedies, and its terms say it is not responsible for third-party pricing or service quality. Deadlines and fees can matter, so act within the transaction platform rather than waiting for a community opinion." },
          { type: "p", text: "Keep your language factual. 'The ordered size is M; the photographed label reads L' is stronger than 'this looks wrong.' A precise discrepancy is easier for support staff to verify and less likely to be lost in translation." },
        ],
      },
      {
        id: "shipping",
        title: "7. Approve the item before optimizing the parcel",
        blocks: [
          { type: "p", text: "Product approval and international shipping are different decisions. First decide whether each warehouse item is acceptable. Only then consider consolidation, packaging options, declared information, route and timing with the agent. A low shipping quote cannot repair a wrong variant, and attractive product photos cannot predict a customs or carrier outcome." },
          { type: "p", text: "FindQC's homepage presents Real Hauls as parcels shipped worldwide, which can be useful context for how other buyers grouped items. Do not copy another haul's cost or transit outcome as a promise. Destination, parcel weight and dimensions, carrier, services and date can all change the result." },
          { type: "figure", image: "/products/watch.webp", alt: "Watch presented as a small high-detail product example", caption: "Small products still need identity, surface and included-part checks before they are consolidated into a larger parcel." },
        ],
      },
      {
        id: "record",
        title: "8. Keep a compact audit trail for future orders",
        blocks: [
          { type: "p", text: "Save the source link, FindQC record, order variant, warehouse decision and any extra-photo result. A compact record helps if a listing disappears, if you reorder later or if a seller changes a batch. It also lets you distinguish a repeatable issue from one isolated warehouse unit." },
          { type: "p", text: "FindQC says My Collection and History are available for certain signed-in features, and its privacy policy explains how saved items and activity support those functions. You can use them if they fit your workflow, or maintain your own note. What matters is preserving exact identifiers and dates rather than relying on memory or a product nickname." },
          { type: "p", text: "The complete process is evidence moving through roles: FindQC helps you discover and compare; the live listing defines the offer; the agent places and records the order; warehouse photos support acceptance; the forwarding service handles the parcel. When each stage answers only its own question, the buying process becomes easier to audit and much harder to confuse." },
        ],
      },
    ],
    sources: [articleSources.terms, articleSources.academySearch, articleSources.home, articleSources.privacy, articleSources.cpsc, articleSources.safetyGate],
    related: ["before-you-buy-qc-guide", "findqc-search-methods", "what-qc-photos-can-prove"],
    cta: { eyebrow: "Ready to research a live catalog?", title: "Browse the mapped CNFansHP product collection", href: "https://cnfanshp.com/AllProducts/", label: "Browse the catalog", external: true },
  },
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
