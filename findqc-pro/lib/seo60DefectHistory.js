export const defectHistoryArticle = {
  slug: "findqc-defect-history-sample-limits",
  title: "FindQC Defect History: Read Patterns Without Overstating the Sample",
  shortTitle: "Defect History and Sample Limits",
  description: "Learn how to read FindQC defect-history patterns while preserving item identity, sample size, date coverage and the limits of historical QC evidence.",
  excerpt: "Turn repeated historical defect signals into a focused inspection plan without treating one damaged unit—or one clean gallery—as proof of the next item.",
  category: "Product Intelligence Guide",
  readTime: "11 min read",
  date: "1 September 2026",
  dateISO: "2026-09-01",
  updatedISO: "2026-09-01",
  languages: ["en"],
  heroImage: "/products/tshirt.webp",
  heroAlt: "Editorial folded shirt image representing a product whose historical defect records require sample-aware review",
  heroCaption: "Existing FindQC Pro editorial catalog image. It is not a customer order, defect report or warehouse inspection record.",
  keywords: ["FindQC defect history", "FindQC defect signals", "QC defect sample size", "recurring QC defects", "Product Intelligence defect history"],
  sourceIntro: "FindQC's What is QC, How FindQC Works, Product Intelligence, Content Integrity and Terms pages were checked on 1 September 2026. The article describes the published evidence model and does not invent record counts, defect rates or outcomes.",
  intro: [
    "A defect-history panel can be more useful than a perfect-looking photo, because it may reveal the kinds of problems that appeared across earlier records. It can also be badly overread. One damaged unit does not prove a listing is consistently defective, while one clean unit does not prove later units will be clean. The useful question is narrower: does the displayed history identify a repeated, decision-relevant area that deserves extra attention?",
    "FindQC says Premium QC may include defect history and that Product Intelligence can summarize common defect types and reasons. It also warns that samples may be small, data may be incomplete and third-party records can contain errors. Those limits are not footnotes to ignore. They determine whether a signal can influence the shortlist, merely shape an inspection prompt or should be treated as unknown.",
  ],
  sections: [
    {
      id: "define-signal",
      title: "1. Define what the defect signal actually represents",
      blocks: [
        { type: "p", text: "Start by copying the displayed defect label or reason exactly enough to preserve its meaning. Do not widen “edge glue visible” into “poor construction,” and do not narrow “wrong option” into a cosmetic issue. A label may summarize a buyer report, an inspection outcome or another third-party record. Unless the interface defines the underlying event, describe it as a historical signal rather than a verified factory diagnosis." },
        { type: "table", headers: ["Displayed wording", "Safe interpretation", "Unsupported leap"], rows: [["Glue mark", "A visible glue-related issue was recorded", "Every unit has weak bonding"], ["Size issue", "A size-related reason appears in history", "The seller chart is always wrong"], ["Misalignment", "Alignment was reported or observed", "The whole batch fails"], ["No defect shown", "No defect signal is visible in this view", "The sample contains no defects"]] },
        { type: "p", text: "Keep defects separate from reviews and returns. A review may mention preference or feel. A return may happen for size, option, timing or another commercial reason. A defect signal should not absorb those events unless the displayed report explicitly connects them. Separate streams let you ask better questions and prevent one broad negative number from becoming a fictional quality score." },
      ],
    },
    {
      id: "identity",
      title: "2. Confirm that the history belongs to the target",
      blocks: [
        { type: "p", text: "Historical defects only transfer when product identity is strong. Confirm the source item, seller or store, model, selected colour, size or version, quantity and included parts where available. A same-item group is stronger than a visually similar recommendation, but even a likely same-item group can contain option differences that matter to the defect under review." },
        { type: "list", title: "Identity gate", items: ["Source item or stable product identifier matches.", "Seller or store relationship is the same.", "The relevant option does not conflict with the target.", "The defect concerns a component present on both records.", "The record date is known or explicitly marked unknown."] },
        { type: "p", text: "A mismatch changes the role of the evidence. A glue mark on a similar shoe may suggest checking sole edges on shoes generally, but it is not a product-specific signal for another listing. A size complaint for one colour may be more relevant if construction is shared, yet the available evidence may not prove that. Write “category inspection prompt” when identity is weak instead of borrowing certainty from appearance." },
      ],
    },
    {
      id: "denominator",
      title: "3. Find the denominator before reading a rate",
      blocks: [
        { type: "p", text: "A count or percentage needs a denominator. Two recorded alignment issues among three relevant observations create a different evidence context from two among several hundred. If FindQC displays the number of matched records, save it with the defect count and date range. If it does not, write “denominator not shown.” Never reverse-engineer a sample from a rounded chart or assume that every QC photo set was eligible for the summary." },
        { type: "table", headers: ["Field", "Record it as", "Why it matters"], rows: [["Relevant records", "Exact displayed count or unknown", "Defines the observed sample"], ["Defect occurrences", "Exact displayed count or descriptive signal", "Shows recurrence within that sample"], ["Date coverage", "Earliest and latest visible dates", "Reveals whether evidence is current or clustered"], ["Option coverage", "Matched, mixed or unknown", "Controls transfer to the target variant"]] },
        { type: "p", text: "Do not treat the visible gallery size as the denominator unless the page explicitly says every displayed record feeds the defect calculation. Duplicates may be reduced, some records may lack metadata and Standard QC may not carry the same fields as Premium QC. The honest output can be qualitative: “the page presents a recurring edge-finishing signal, but the eligible sample is not shown.”" },
      ],
    },
    {
      id: "freshness",
      title: "4. Audit dates, clustering and possible batch drift",
      blocks: [
        { type: "p", text: "A repeated issue across several dates is stronger historical context than several records captured on one day, but neither proves the factory batch. Sellers can change materials, suppliers, tooling, workers, packaging or option labels without a public batch identifier. Record dates as dates, not as invented batch numbers." },
        { type: "p", text: "Look for clustering. If the same visible issue appears in several well-matched records near one period and not in later matched records, describe the time pattern without claiming that it was fixed. If observations span a long period, check whether the listing, seller and option remained stable. Missing recent defects can mean improvement, missing data or a smaller sample; the history alone may not distinguish them." },
        { type: "callout", title: "Safe wording", text: "“The displayed matched records show the concern more than once within the visible date range” is supportable. “This is a bad batch” requires batch evidence the gallery may not contain." },
      ],
    },
    {
      id: "severity",
      title: "5. Separate recurrence from severity and consequence",
      blocks: [
        { type: "p", text: "Frequency and consequence answer different questions. A common removable surface speck may matter less than one broken load-bearing attachment. Decide what failure would make the item unsuitable before reading the history. This prevents a large count of minor issues from overwhelming a rare but material structural concern—or a dramatic isolated image from outweighing its uncertain relevance." },
        { type: "table", headers: ["Observation type", "Possible consequence", "Exact-unit check"], rows: [["Loose surface thread", "Usually cosmetic; tolerance is personal", "Close view of seam and whether it is open"], ["Repeated print shift", "Appearance may exceed the buyer's placement limit", "Straight front view with reference lines"], ["Closure failure", "Function may be compromised", "Current-unit closure condition; motion evidence if available"], ["Wrong size or option", "Identity and intended use fail", "Label, selected option and measurement"]] },
        { type: "p", text: "Do not assign a universal pass mark. A collector, daily wearer and occasional-use buyer can reasonably set different limits. State the buyer's threshold and why the observed defect type crosses or does not cross it. The defect history supplies context; it does not set the acceptance criteria." },
      ],
    },
    {
      id: "clean-samples",
      title: "6. Read clean records and missing data cautiously",
      blocks: [
        { type: "p", text: "A clean-looking record is still one photographed unit under limited coverage. The absence of a defect signal does not prove every area was inspected, that the images were sharp enough or that the issue could not appear later. Check whether the critical component is actually visible and whether the record belongs to the same item and option." },
        { type: "p", text: "Likewise, a missing defect-history panel is not a zero-defect result. FindQC says Product Intelligence depends on Premium QC and sufficient historical data. Standard-only items or sparse histories may not show a report. Record the state as unavailable or insufficient, then fall back to direct photo review and the exact unit's later warehouse evidence." },
        { type: "list", title: "Never convert these states", items: ["Not displayed → zero defects", "One clean set → reliable seller", "One damaged set → universal failure", "No recent record → confirmed improvement", "Many photos → complete inspection"] },
      ],
    },
    {
      id: "inspection-plan",
      title: "7. Convert a pattern into a focused inspection plan",
      blocks: [
        { type: "p", text: "The best output from defect history is a ranked list of places to inspect on the exact unit. Translate each relevant pattern into a visible question: edge glue becomes “inspect the full left and right sole join”; alignment becomes “compare print centre with the garment centre line”; sizing becomes “compare a specified flat measurement with the reference garment.” Keep the request narrow enough to answer." },
        { type: "p", text: "Prioritize by identity strength, recurrence, severity, visibility and consequence. A strong match with a repeated, visible, decision-critical issue belongs first. A weakly matched cosmetic comment may stay as optional context. If the required property is hidden, such as fibre composition or internal strength, no extra surface photo can prove it. Mark the limit instead of asking for decorative media." },
        { type: "callout", title: "Platform boundary", text: "FindQC organizes research evidence. The buyer's chosen agent controls purchasing, warehouse photography, any exchange or return request, packaging and international shipping under its current terms." },
      ],
    },
    {
      id: "decision-record",
      title: "8. Finish with a sample-aware conclusion",
      blocks: [
        { type: "p", text: "Write the target identity, displayed sample or unknown denominator, date coverage, repeated defect type, severity for the intended use, image limitations and current-unit check. This makes the conclusion reproducible and prevents a later reviewer from remembering only the strongest adjective." },
        { type: "list", title: "Final audit", items: ["The defect wording has not been broadened.", "Target item, seller and relevant option are matched.", "Sample size and denominator are stated or unknown.", "Dates are recorded without inventing a batch.", "Frequency is separate from severity.", "Missing history is not treated as a clean result.", "The next check concerns the exact warehouse unit."] },
        { type: "p", text: "A defensible conclusion might read: “Several matched historical records within the visible period flag edge finishing, but the eligible sample size is not shown and the current production batch is unknown. Because an open edge would be unacceptable for daily use, inspect both joins on the exact unit before the selected agent proceeds.” That sentence uses the pattern, preserves its limits and assigns the live action to the party responsible for the order." },
      ],
    },
  ],
  sources: [],
  related: ["findqc-product-intelligence-report-guide", "findqc-seller-ship-time-domestic-delivery", "what-qc-photos-can-prove"],
  cta: { eyebrow: "Need the full report method?", title: "Read Product Intelligence field by field before combining its signals", href: "/articles/findqc-product-intelligence-report-guide", label: "Open the Product Intelligence guide" },
};
