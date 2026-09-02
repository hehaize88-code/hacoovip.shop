import { articleSlugs, type ArticleSlug, type Lang } from "./site-data";
import { articleExpansions, localizedSectionDetails, reviewArticles, type ArticleVisual } from "./article-expansions";
import { localizedParityDetails } from "./article-parity";

type LegacySlug = Exclude<ArticleSlug, "hipobuy-review-2026">;

export type ArticleBody = {
  lead: string;
  keyPoints: string[];
  sections: Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;
  checklist: string[];
  faqs: Array<[string, string]>;
  visual?: ArticleVisual;
};

export type ArticleUi = {
  back: string;
  minutes: string;
  updated: string;
  contents: string;
  keyPoints: string;
  checklist: string;
  faq: string;
  sourceNote: string;
  sourceText: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

export const articleUi: Record<Lang, ArticleUi> = {
  en: {
    back: "All buying guides", minutes: "min read", updated: "Updated 2 September 2026", contents: "In this guide",
    keyPoints: "Key points", checklist: "Practical checklist", faq: "Frequently asked questions",
    sourceNote: "Research boundary", sourceText: "Checked 14 August 2026 against Hipobuy’s public landing page, Google Play and Apple App Store listings. Review themes are paraphrased from public app-store and review-site posts; they are individual experiences, not verified platform-wide outcomes. Confirm live terms in your account before paying or approving a parcel.",
    ctaTitle: "Ready to compare product finds?", ctaText: "Use the searchable product index to open the exact listing, then return to this guide before warehouse approval.",
    ctaButton: "Open product index",
  },
  de: {
    back: "Alle Kaufratgeber", minutes: "Min. Lesezeit", updated: "Aktualisiert am 2. September 2026", contents: "In diesem Ratgeber",
    keyPoints: "Das Wichtigste", checklist: "Praktische Checkliste", faq: "Häufige Fragen",
    sourceNote: "Recherchegrenze", sourceText: "Am 14. August 2026 mit öffentlicher Hipobuy-Startseite sowie Google-Play- und Apple-App-Store-Einträgen geprüft. Bewertungsthemen sind aus öffentlichen Beiträgen sinngemäß zusammengefasst; es sind Einzelerfahrungen, keine bestätigten Gesamtergebnisse. Aktuelle Kontobedingungen vor Zahlung oder Freigabe prüfen.",
    ctaTitle: "Produktfundstücke vergleichen?", ctaText: "Öffne über den durchsuchbaren Produktindex den exakten Eintrag und kehre vor der Lagerfreigabe zu diesem Ratgeber zurück.",
    ctaButton: "Produktindex öffnen",
  },
  es: {
    back: "Todas las guías de compra", minutes: "min de lectura", updated: "Actualizado el 2 de septiembre de 2026", contents: "En esta guía",
    keyPoints: "Puntos clave", checklist: "Lista práctica", faq: "Preguntas frecuentes",
    sourceNote: "Límite de la investigación", sourceText: "Comprobado el 14 de agosto de 2026 con la página pública de Hipobuy y sus fichas de Google Play y Apple App Store. Los temas de opiniones son paráfrasis de publicaciones públicas y representan experiencias individuales, no resultados generales verificados. Confirma las condiciones activas antes de pagar o aprobar.",
    ctaTitle: "¿Listo para comparar productos?", ctaText: "Usa el índice buscable para abrir el anuncio exacto y vuelve a esta guía antes de aprobarlo en el almacén.",
    ctaButton: "Abrir índice de productos",
  },
  it: {
    back: "Tutte le guide all’acquisto", minutes: "min di lettura", updated: "Aggiornato il 2 settembre 2026", contents: "In questa guida",
    keyPoints: "Punti chiave", checklist: "Checklist pratica", faq: "Domande frequenti",
    sourceNote: "Limite della ricerca", sourceText: "Controllato il 14 agosto 2026 sulla landing Hipobuy e sulle schede Google Play e Apple App Store. I temi delle recensioni sono parafrasi di post pubblici e restano esperienze individuali, non risultati generali verificati. Conferma le condizioni attive prima di pagare o approvare.",
    ctaTitle: "Vuoi confrontare i prodotti?", ctaText: "Usa l’indice ricercabile per aprire l’inserzione esatta e torna a questa guida prima dell’approvazione in magazzino.",
    ctaButton: "Apri indice prodotti",
  },
  pl: {
    back: "Wszystkie poradniki zakupowe", minutes: "min czytania", updated: "Aktualizacja: 2 września 2026", contents: "W tym poradniku",
    keyPoints: "Najważniejsze punkty", checklist: "Praktyczna lista", faq: "Najczęstsze pytania",
    sourceNote: "Granica badania", sourceText: "Sprawdzono 14 sierpnia 2026 na publicznej stronie Hipobuy oraz w kartach Google Play i Apple App Store. Tematy opinii są parafrazą publicznych wpisów i pozostają pojedynczymi doświadczeniami, nie potwierdzonym wynikiem całej platformy. Przed płatnością sprawdź warunki konta.",
    ctaTitle: "Chcesz porównać produkty?", ctaText: "Użyj przeszukiwalnego indeksu, otwórz dokładną ofertę i wróć do poradnika przed zatwierdzeniem w magazynie.",
    ctaButton: "Otwórz indeks produktów",
  },
};

const en: Record<LegacySlug, ArticleBody> = {
  "hipobuy-90-day-warehouse-storage": {
    lead: "Hipobuy’s public app listing advertises 90 days of free storage. That sounds generous, but the useful question is not how long an item can sit in a warehouse. It is how to use the window without missing seller-return deadlines, delaying consolidation or turning a small order into an expensive parcel.",
    keyPoints: [
      "Treat 90 days as a planning ceiling, not a target waiting time.",
      "Track seller-return timing separately from the warehouse storage clock.",
      "Consolidate only after every item has passed a documented QC review.",
      "Leave a safety margin for photos, support replies, repacking and route changes.",
    ],
    sections: [
      {
        title: "What the advertised storage window really changes",
        paragraphs: [
          "A storage allowance lets purchases arrive on different dates before they are combined. This can help when you are building a parcel from several sellers, waiting for a replacement or comparing packaging options. It does not freeze product value, exchange rates, shipping prices or route availability. Those variables can change while the item is stored.",
          "The safest approach is to treat storage as operational flexibility. A well-managed item should move through four dated states: ordered, received, inspected and ready to consolidate. If an item remains in one state for too long, the calendar should trigger a decision rather than passive waiting.",
        ],
      },
      {
        title: "Use two clocks, not one",
        paragraphs: [
          "The warehouse clock and the seller-return clock are different. An item may have many storage days remaining while its return or exchange opportunity is already closing. Record the warehouse arrival date, the date QC photos became available and the last date on which a problem can realistically be raised.",
          "Create a simple parcel sheet with one row per item. Add status, expected companion orders, return decision and a target consolidation week. This makes a delayed seller or missing photo visible before it blocks the whole parcel.",
        ],
        bullets: ["Warehouse arrival date", "QC completed date", "Return decision deadline", "Target consolidation date", "Latest safe dispatch date"],
      },
      {
        title: "Do not consolidate before QC is finished",
        paragraphs: [
          "Consolidation changes the parcel and can make individual-item corrections harder. Before combining anything, compare the ordered color, size and version with the warehouse record. Then review measurements, construction, visible damage and included accessories. A low-resolution photo that cannot answer a material question is a reason to request evidence, not a reason to approve by default.",
          "Mark every item as keep, question or return. Only keep items should enter the parcel plan. A question item needs a specific next action and date; otherwise it silently consumes the storage buffer.",
        ],
      },
      {
        title: "Plan the parcel, not just the product list",
        paragraphs: [
          "Adding more items can spread some fixed handling effort, but it can also increase chargeable weight, box dimensions and route restrictions. Shoes with boxes, bulky jackets and protective packaging may raise volumetric weight faster than expected. Estimate the final shape of the parcel before waiting for another order.",
          "Compare at least two scenarios: ship the ready items now, or wait and add the remaining items. Include the possible extra storage risk, return risk and change in chargeable weight. The cheapest-looking scenario is not always the most controllable one.",
        ],
      },
      {
        title: "Build a safety margin into the final two weeks",
        paragraphs: [
          "Do not schedule the last possible day as the dispatch day. Support replies, additional photos, repacking, payment review and temporary route changes all require time. A practical safety margin turns the final stage into a controlled decision instead of an emergency.",
          "When the buffer begins, stop adding optional products. Resolve every question item, confirm the delivery destination, compare current routes and submit the parcel with enough time to correct a rejected option. If a policy or countdown shown in the account differs from a public description, the live account information should control the decision.",
        ],
      },
    ],
    checklist: ["Record every warehouse arrival date.", "Set a separate return-decision deadline.", "Approve only after variant, measurements and condition are checked.", "Compare ship-now and wait-to-consolidate scenarios.", "Stop adding optional items before the safety margin begins.", "Confirm the live storage countdown before parcel submission."],
    faqs: [
      ["Does free storage mean every warehouse service is free?", "No. A free storage period does not automatically remove purchasing, return, repacking, payment or shipping charges. Review the live fee details for the action you are taking."],
      ["Should I wait until close to day 90?", "Usually no. The allowance is most useful as a buffer for staggered arrivals and problem solving, not as a target holding period."],
      ["What if one item delays the parcel?", "Compare the cost and risk of waiting with shipping the ready items separately. Do not let one unresolved item consume the safety margin for everything else."],
    ],
  },
  "hipobuy-warehouse-qc-photos": {
    lead: "Warehouse photos are not decoration. They are the last practical evidence between the seller’s listing and your approval decision. A repeatable review order helps you find objective mismatches first, avoid being distracted by styling and request only the extra evidence that can change the outcome.",
    keyPoints: [
      "Verify the ordered variant before judging finish or appearance.",
      "Measurements are stronger evidence than a size label alone.",
      "Review symmetry, seams, edges, print placement, hardware and damage in a fixed order.",
      "Ask for a close-up or alternate angle only when it can change the keep-or-return decision.",
    ],
    sections: [
      {
        title: "Start with the order record",
        paragraphs: [
          "Open the exact product option you selected and write down color, size, model, quantity and any seller note. Compare those fields with the warehouse record before looking for small defects. A perfectly photographed item is still wrong if the variant does not match the order.",
          "Use stable identifiers rather than memory. Similar colors, regional sizing and small model differences are easy to confuse. Keep the listing snapshot, selected option and warehouse photos together so the final decision can be traced.",
        ],
      },
      {
        title: "Check scale and measurements",
        paragraphs: [
          "A size tag confirms only what is printed on the item. It does not prove the actual fit. For clothing, compare key dimensions with a garment that already fits: chest width, length, shoulder and sleeve. For footwear, use insole length or another relevant measurement when available.",
          "Photo perspective can distort scale. A measurement should show both endpoints and a readable tape. If the image hides the start of the tape or bends around the product, ask for a clearer measurement rather than guessing.",
        ],
      },
      {
        title: "Review construction in the same sequence",
        paragraphs: [
          "Move from the whole item to details. Check overall silhouette and symmetry, then seams and stitching, edges, graphics or embroidery, hardware and closures. Comparing left and right sides often reveals alignment problems more quickly than inspecting isolated close-ups.",
          "Separate objective defects from normal variation. A broken zip, missing part, visible tear or clearly misplaced element is different from a minor texture or color shift caused by lighting. Record what is observable and avoid claiming more than the photo proves.",
        ],
        bullets: ["Overall silhouette", "Front and back alignment", "Seams and edge finishing", "Print or embroidery placement", "Hardware and closures", "Visible marks or missing pieces"],
      },
      {
        title: "Request evidence with a decision in mind",
        paragraphs: [
          "An extra photo is useful only if it answers a specific question. Ask for the size tag, a measurement, a close-up of a suspected mark or an alternate angle of a hidden area. Vague requests create more images without improving the decision.",
          "State what you need to verify and where it is located. When the new evidence arrives, decide promptly. Repeated requests can consume the return window without adding certainty.",
        ],
      },
      {
        title: "Use a clear approve, question or return result",
        paragraphs: [
          "Finish the review with one of three statuses. Approve means the ordered variant and condition meet your documented threshold. Question means one defined piece of evidence is missing. Return means the mismatch or defect is material enough that you do not want it in the parcel.",
          "Keep screenshots and notes until the parcel is received. If the delivered item differs from the warehouse evidence, the record helps explain what changed and supports a more precise support request.",
        ],
      },
    ],
    checklist: ["Match color, size, model and quantity.", "Compare actual measurements with a known item.", "Check overall symmetry before close details.", "Inspect seams, graphics, edges and hardware.", "Look for damage, stains and missing accessories.", "Request only evidence that changes the decision.", "Save the final QC record."],
    faqs: [
      ["Are warehouse photos a quality guarantee?", "No. They are evidence from a limited set of angles. They reduce uncertainty but cannot prove hidden construction, long-term durability or fit."],
      ["What should I check first?", "The ordered variant: color, size, model and quantity. There is no value in inspecting the finish of the wrong item first."],
      ["How many extra photos should I request?", "As few as needed to answer material questions. One precise measurement or close-up is better than several vague images."],
    ],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    lead: "International parcel quotes can be controlled by actual weight, volumetric weight or another route-specific charging rule. Understanding the difference helps you predict why a light but bulky parcel can cost more than expected and which packaging changes are worth requesting.",
    keyPoints: [
      "Actual weight is measured; volumetric weight converts parcel size into a weight equivalent.",
      "The chargeable value depends on the selected route and its current rules.",
      "Removing empty volume can matter more than removing a few grams.",
      "Compare quotes only after the parcel dimensions and restrictions are known.",
    ],
    sections: [
      {
        title: "Actual weight measures mass",
        paragraphs: [
          "Actual weight is the measured mass of the packed parcel. It includes products, protective materials, inner packaging and the outer carton. The value can change after consolidation because several seller packages may be replaced with one parcel, or because reinforcement is added.",
          "A product’s listed weight is not the final parcel weight. Use it only as an early estimate. The warehouse measurement after packing is more relevant to the shipping quote.",
        ],
      },
      {
        title: "Volumetric weight measures occupied space",
        paragraphs: [
          "Air transport and other capacity-limited routes care about the space a parcel occupies. Volumetric weight converts length, width and height into a weight-like number using a divisor set by the route. Because divisors and rounding rules vary, never assume one universal formula.",
          "A large lightweight box can therefore be charged above its scale weight. Shoe boxes, rigid packaging, puffer jackets and decorative gift boxes are common sources of empty volume. The goal is not to crush products; it is to remove space that provides no useful protection.",
        ],
      },
      {
        title: "Find the chargeable weight",
        paragraphs: [
          "A route may compare actual and volumetric weight and charge the higher number, but it may also apply minimum increments, size bands or special-item rules. Read the current quote details rather than relying on a calculator from another route or an old shipment.",
          "Ask what parcel dimensions and weight were used. If a quote looks unexpectedly high, check for a single long side, a bulky box or a restricted item before assuming the price is an error.",
        ],
      },
      {
        title: "Use packaging changes deliberately",
        paragraphs: [
          "Removing retail shoe boxes, folding soft packaging and selecting a better-fitting outer carton can reduce dimensions. Vacuum packing may help some textiles, while reinforcement may increase weight or size. Every change has a protection trade-off.",
          "Choose packaging by product risk. A soft garment can tolerate compression more easily than a structured shoe, fragile accessory or electronic device. Request a change only when you understand what protection is being removed.",
        ],
        bullets: ["Remove unnecessary seller cartons", "Use a right-sized outer box", "Fold soft packaging efficiently", "Keep protection for fragile or structured goods", "Recheck dimensions after repacking"],
      },
      {
        title: "Compare routes using the final parcel",
        paragraphs: [
          "Route comparisons are meaningful only when they use the same destination, parcel dimensions, measured weight, product restrictions and service level. A low headline rate may disappear when a route applies a different volumetric divisor or excludes the item type.",
          "Save the final measurements and quote before payment. This gives you a baseline for later tracking and makes it easier to understand a revised charge if the parcel is remeasured.",
        ],
      },
    ],
    checklist: ["Record actual weight after packing.", "Record all three outer dimensions.", "Check the selected route’s divisor and rounding.", "Identify bulky packaging before paying.", "Protect structured and fragile products.", "Compare routes with identical parcel inputs.", "Save the final quote and measurements."],
    faqs: [
      ["Is volumetric weight always charged?", "No. It depends on the route and parcel. Some lines compare it with actual weight; others use different charging rules."],
      ["Will removing a shoe box always save money?", "Not always. It can reduce volume, but the saving depends on the final dimensions and may reduce protection. Compare both outcomes."],
      ["Why did the quote change after packing?", "Consolidation, reinforcement, repacking or remeasurement can change actual weight, dimensions or route eligibility."],
    ],
  },
  "how-to-buy-with-hipobuy": {
    lead: "Buying through a shopping agent is easier when product selection, purchasing, warehouse review and international shipping are treated as separate decisions. This guide turns the process into a controlled sequence so that a low product price does not hide a wrong variant, failed QC check or unsuitable parcel.",
    keyPoints: [
      "Open and verify the exact listing before submitting an order.",
      "Separate product cost from domestic delivery and later international shipping.",
      "Use warehouse evidence to approve, question or return each item.",
      "Choose packaging and route only after the final parcel is known.",
    ],
    sections: [
      {
        title: "1. Define the product before paying",
        paragraphs: [
          "Start with the exact listing, not a screenshot shared without context. Confirm seller, product option, size system, color, quantity and included accessories. Save the selected option and any note that must be communicated during purchase.",
          "Treat the displayed price as one component. Domestic delivery, service or payment charges, currency conversion and international shipping may be added at different stages. A clear budget needs room for all of them.",
        ],
      },
      {
        title: "2. Submit a precise purchase request",
        paragraphs: [
          "Choose the required variant and write short, objective notes. Avoid asking a buyer to interpret style preferences that should have been decided before the order. If a listing is ambiguous, resolve the ambiguity before payment rather than hoping the warehouse can fix it later.",
          "Keep the order record. It becomes the reference for warehouse QC and any return request. Without it, a photo difference is harder to classify as a seller error or a change of preference.",
        ],
      },
      {
        title: "3. Track arrival and warehouse status",
        paragraphs: [
          "After the seller dispatches, watch for warehouse receipt, quantity confirmation and photo availability. Different items may arrive on different days. Record which orders are still moving so that one delay does not remain invisible.",
          "The public app listing advertises a 90-day free-storage window, but return timing and live account rules still require separate attention. Use storage as a buffer, not as a reason to postpone the first inspection.",
        ],
      },
      {
        title: "4. Make a documented QC decision",
        paragraphs: [
          "Compare the received item with the ordered color, size, model and quantity. Then check measurements, construction, visible damage and accessories. When a photo cannot answer a material question, request one specific piece of evidence.",
          "Assign approve, question or return. Do not consolidate a question item. If a return is needed, act within the live window and keep the order option, warehouse images and issue description together.",
        ],
      },
      {
        title: "5. Build and quote the parcel",
        paragraphs: [
          "Select only approved items. Decide whether retail packaging is useful, whether fragile goods need reinforcement and whether soft goods can be compressed. These choices affect actual and volumetric weight.",
          "Compare routes using the final destination, measured parcel and product restrictions. The public listing says international delivery can be as fast as five days, but that is an advertised best case rather than a promise for every route or country.",
        ],
      },
      {
        title: "6. Pay, track and inspect on arrival",
        paragraphs: [
          "Save the paid quote, parcel weight, dimensions, route and tracking number. Follow exceptions rather than only the estimated date. Customs processing and last-mile delivery can vary by destination.",
          "When the parcel arrives, photograph the outer condition before opening if it is visibly damaged. Compare received items with the warehouse record and keep evidence until every item is checked.",
        ],
      },
    ],
    checklist: ["Verify the exact listing and option.", "Budget for every cost stage.", "Save the purchase request.", "Inspect each item before consolidation.", "Resolve returns before their deadline.", "Choose packaging by product risk.", "Compare routes using final parcel data.", "Save tracking and arrival evidence."],
    faqs: [
      ["Do I pay international shipping with the product order?", "Often the parcel quote is handled after items reach the warehouse. Review the live checkout because stages and charges can change."],
      ["Can the spreadsheet guarantee product quality?", "No. It helps you find and open a listing. Seller choice, live listing details and warehouse evidence still need review."],
      ["When should I consolidate?", "After all included items have been received and approved, and after unresolved return or measurement questions are closed."],
    ],
  },
  "hipobuy-shipping-cost-guide": {
    lead: "The number that matters is not the cheapest product price or the lowest advertised shipping rate. It is the landed cost of the parcel under the route, packaging and destination conditions that apply to your order. Breaking the cost into layers makes comparisons more realistic.",
    keyPoints: [
      "Separate product, domestic, service, payment, international and destination costs.",
      "Use chargeable weight rather than product weight alone.",
      "Route eligibility and protection level matter as much as the headline price.",
      "Compare two complete parcel scenarios before paying.",
    ],
    sections: [
      {
        title: "Build a six-part cost model",
        paragraphs: [
          "Start with product price, then add seller-to-warehouse delivery, purchasing or service charges, payment or exchange-rate effects, international parcel shipping and possible destination charges. Not every order uses every line, but ignoring a stage makes the total look artificially low.",
          "Use a spreadsheet row for each cost and mark whether it is confirmed or estimated. This shows which uncertainty has the largest effect and prevents a small product discount from dominating the decision.",
        ],
      },
      {
        title: "Estimate chargeable weight honestly",
        paragraphs: [
          "International shipping can depend on actual weight, volumetric weight, minimum increments and route-specific rules. Product weights from listings are only a starting point because outer packaging, reinforcement and consolidation change the parcel.",
          "Estimate a range before ordering, then replace it with warehouse measurements. If bulky packaging dominates, compare a repacked scenario without assuming that less protection is always better.",
        ],
      },
      {
        title: "Compare routes beyond the headline rate",
        paragraphs: [
          "Check eligibility, tracking, compensation limits, estimated transit, size limits and how the route handles the product type. Batteries, liquids, fragrances and other restricted categories can narrow the available options. A route that cannot accept the parcel is not a real price alternative.",
          "The fastest advertised delivery is a best-case marketing statement. Destination processing, customs and last-mile delivery may extend the journey. Choose a route that fits the value and urgency of the parcel rather than only the shortest estimate.",
        ],
      },
      {
        title: "Understand the packaging trade-off",
        paragraphs: [
          "Retail boxes and seller packaging can protect goods but also create empty volume. Removing them may reduce chargeable size, while reinforcement, corner protection or waterproofing may increase mass. The correct choice depends on the product.",
          "Create two parcel plans when the difference matters: protection-first and compact. Compare their likely dimensions, route options and risk. Document requested packaging so the final quote can be checked against the plan.",
        ],
      },
      {
        title: "Allow for destination costs and uncertainty",
        paragraphs: [
          "Taxes, duties, customs handling and carrier fees vary by destination, item type and shipment terms. Do not present a general website estimate as a guaranteed destination charge. Review the current route terms and local requirements before payment.",
          "Keep a contingency amount in the budget. A practical budget should survive a moderate change in exchange rate, remeasurement or route availability without forcing you to abandon the parcel after purchase.",
        ],
      },
      {
        title: "Compare complete scenarios",
        paragraphs: [
          "A useful comparison might be one consolidated parcel versus two smaller parcels, or compact packaging versus retail packaging. Use the same product set and destination. Include all known fees and mark uncertain values as ranges.",
          "Select the scenario with the best balance of cost, control and product protection. Save the final parcel details so the next order can use real history instead of guesses.",
        ],
      },
    ],
    checklist: ["List product and domestic delivery costs.", "Add service, payment and exchange-rate effects.", "Estimate actual and volumetric weight.", "Check route eligibility and protection.", "Model packaging alternatives.", "Review destination rules.", "Keep a contingency amount.", "Save the final landed-cost record."],
    faqs: [
      ["Why can shipping cost more than the products?", "Bulky dimensions, heavy packaging, route restrictions or long-distance delivery can make parcel shipping the largest cost layer."],
      ["Is the cheapest line always best?", "No. Eligibility, tracking, protection, transit time and destination terms may make a slightly higher quote more suitable."],
      ["Can a calculator give the final cost before warehouse arrival?", "It can give a range, but final dimensions, measured weight, product restrictions and current route terms are needed for a reliable quote."],
    ],
  },
  "hipobuy-warehouse-return-checklist": {
    lead: "A warehouse return should be a documented decision, not a frustrated message. The strongest request identifies what was ordered, what arrived, why the difference matters, what evidence proves it and which resolution is being requested within the available time.",
    keyPoints: [
      "Classify the problem as mismatch, damage, missing item or preference change.",
      "Use warehouse photos and the order record as evidence.",
      "Confirm timing and possible fees before submitting the request.",
      "Ask for one clear outcome and keep the full record.",
    ],
    sections: [
      {
        title: "Identify the type of problem",
        paragraphs: [
          "Separate seller error from a change of mind. Wrong color, wrong size, wrong model, missing quantity and visible damage are different from deciding that you no longer like the item. The category can affect responsibility, evidence and cost.",
          "Write one factual sentence: what was ordered, what appears to have arrived and where the difference is visible. Avoid emotional or unsupported claims because they make the request harder to review.",
        ],
      },
      {
        title: "Build an evidence packet",
        paragraphs: [
          "Keep the listing option, purchase note, order record, warehouse images and any extra measurement together. Mark the exact photo area that shows the issue. If the question is size, provide the ordered size and measured dimension rather than only saying it looks small.",
          "Evidence should prove the requested outcome. A close-up can show a tear; a wide photo can show the wrong color; a measurement can show a size mismatch. Ask for additional evidence only when the existing photos cannot establish the issue.",
        ],
      },
      {
        title: "Check the live deadline before waiting",
        paragraphs: [
          "Storage time is not the same as the return window. An item can remain eligible for storage after a seller return is no longer practical. Check the live order status and submit questions early.",
          "If support needs more information, respond quickly and keep the conversation connected to the same order. Waiting for unrelated items to arrive should not delay a return decision for a clear mismatch.",
        ],
      },
      {
        title: "Confirm fees and logistics",
        paragraphs: [
          "A return may involve domestic delivery, service, transaction or seller-related costs depending on the reason and current terms. Ask which amounts are refundable, which are not and when the balance will be updated.",
          "Do not assume that a return request is complete when a message is sent. Look for an accepted status, return movement or other confirmation in the account. Record dates and reference numbers.",
        ],
      },
      {
        title: "Request one specific resolution",
        paragraphs: [
          "State whether you want a return, exchange, missing-part solution or clarification. Multiple contradictory requests slow the process. If an exchange is chosen, specify the correct variant and decide how long you are willing to wait.",
          "When the case closes, save the result and update the parcel plan. Remove returned items from consolidation and recalculate the parcel if weight or packaging has changed.",
        ],
      },
      {
        title: "Learn from the return",
        paragraphs: [
          "Record the cause: ambiguous listing, wrong option, seller mismatch, QC defect or preference change. This improves future listing checks and helps you decide which details need confirmation before purchase.",
          "A good return record also prevents repeating the same request. Keep it until the refund, replacement or final warehouse status is visible.",
        ],
      },
    ],
    checklist: ["Open the exact order and selected option.", "Classify mismatch, damage, missing item or preference.", "Save relevant warehouse photos.", "Request one precise extra photo if needed.", "Check the live return deadline.", "Confirm possible fees and refundable amounts.", "Ask for one clear resolution.", "Save acceptance and final account status."],
    faqs: [
      ["Does a visible defect guarantee a free return?", "Not automatically. Responsibility and fees depend on evidence, seller response and current platform terms. Confirm the live case details."],
      ["Should I wait for all items before requesting a return?", "No. A clear issue should be raised promptly because the return opportunity may close while other items are still arriving."],
      ["What evidence is strongest?", "The selected order option plus a warehouse photo or measurement that directly shows the mismatch."],
    ],
  },
};

const de: Record<LegacySlug, ArticleBody> = {
  "hipobuy-90-day-warehouse-storage": {
    lead: "Der öffentliche Hipobuy-App-Eintrag wirbt mit 90 Tagen kostenloser Lagerung. Entscheidend ist nicht, wie lange ein Artikel liegen kann, sondern wie du das Zeitfenster nutzt, ohne Rückgabefristen zu verpassen, die Bündelung zu verzögern oder ein unnötig großes Paket zu bauen.",
    keyPoints: ["90 Tage sind eine Obergrenze für die Planung, kein Warteziel.", "Verkäufer-Rückgabe und Lagerzeit brauchen getrennte Termine.", "Nur vollständig geprüfte Artikel dürfen gebündelt werden.", "Für Fotos, Support, Umpacken und Routenwechsel ist ein Puffer nötig."],
    sections: [
      { title: "Was das Lagerfenster tatsächlich verändert", paragraphs: ["Die Lagerzeit erlaubt, dass Bestellungen verschiedener Verkäufer an unterschiedlichen Tagen eintreffen und später zusammengeführt werden. Sie friert aber weder Produktwert noch Wechselkurs, Versandpreis oder Routenverfügbarkeit ein.", "Führe jeden Artikel durch vier datierte Zustände: bestellt, eingetroffen, geprüft und bündelbereit. Bleibt er zu lange in einem Zustand, sollte der Kalender eine Entscheidung auslösen."] },
      { title: "Mit zwei Uhren planen", paragraphs: ["Lagerzeit und Verkäufer-Rückgabefrist sind nicht dasselbe. Ein Artikel kann noch viele Lagertage haben, obwohl eine Rückgabe kaum noch möglich ist. Notiere Ankunft, Bereitstellung der QC-Fotos und den letzten realistischen Tag für eine Reklamation.", "Eine einfache Paketliste mit Status, fehlenden Bestellungen, Rückgabeentscheidung und Zielwoche macht Verzögerungen sichtbar."], bullets: ["Ankunft im Lager", "QC abgeschlossen", "Rückgabeentscheidung", "Zieltermin Bündelung", "Spätester sicherer Versand"] },
      { title: "Nicht vor abgeschlossener QC bündeln", paragraphs: ["Vergleiche vor der Bündelung Farbe, Größe, Variante und Menge mit der Bestellung. Prüfe danach Maße, Verarbeitung, sichtbare Schäden und Zubehör. Reicht ein Foto nicht aus, fordere einen gezielten Nachweis an.", "Markiere jeden Artikel als behalten, klären oder zurückgeben. Nur behaltene Artikel gehören in den Paketplan; ein offener Fall braucht eine konkrete Aktion und ein Datum."] },
      { title: "Das Paket statt nur die Produktliste planen", paragraphs: ["Mehr Artikel können Aufwand verteilen, erhöhen aber möglicherweise Abrechnungsgewicht, Außenmaße und Einschränkungen. Schuhkartons, dicke Jacken und Schutzmaterial können das Volumengewicht stark steigern.", "Vergleiche mindestens zwei Szenarien: fertige Artikel sofort senden oder auf weitere warten. Beziehe Zeit, Rückgaberisiko und wahrscheinliches Abrechnungsgewicht ein."] },
      { title: "In den letzten zwei Wochen einen Puffer schützen", paragraphs: ["Plane nie den letzten möglichen Tag als Versandtag. Zusätzliche Fotos, Supportantworten, Umpacken, Zahlungsprüfung oder eine Routenänderung brauchen Zeit.", "Wenn der Puffer beginnt, füge keine optionalen Produkte mehr hinzu. Löse offene Fragen, bestätige Ziel und aktuelle Route und reiche das Paket früh genug ein, um eine abgelehnte Option noch korrigieren zu können."] },
    ],
    checklist: ["Jede Lagerankunft notieren.", "Eigene Rückgabeentscheidung festlegen.", "Variante, Maße und Zustand prüfen.", "Sofortversand und Warten vergleichen.", "Vor dem Sicherheitspuffer nichts Optionales hinzufügen.", "Live-Countdown vor Paketeinreichung prüfen."],
    faqs: [["Bedeutet kostenlose Lagerung, dass alle Lagerleistungen kostenlos sind?", "Nein. Einkauf, Rückgabe, Umpacken, Zahlung und Versand können eigene Kosten haben."], ["Sollte ich fast 90 Tage warten?", "In der Regel nicht. Das Fenster ist ein Puffer für versetzte Ankünfte und Problemlösung."], ["Was tun, wenn ein Artikel alles verzögert?", "Vergleiche das Warten mit einem separaten Versand der fertigen Artikel und schütze den Puffer der übrigen Bestellung."]],
  },
  "hipobuy-warehouse-qc-photos": {
    lead: "Lagerfotos sind der letzte praktische Nachweis zwischen Verkäuferangebot und Freigabe. Eine feste Prüfreihenfolge findet objektive Abweichungen zuerst und verhindert, dass Styling oder Licht von wichtigen Fragen ablenken.",
    keyPoints: ["Zuerst die bestellte Variante bestätigen.", "Maße sind aussagekräftiger als ein Größenetikett allein.", "Symmetrie, Nähte, Kanten, Druck, Beschläge und Schäden immer gleich prüfen.", "Zusatzbilder nur anfordern, wenn sie die Entscheidung verändern können."],
    sections: [
      { title: "Mit der Bestellaufzeichnung beginnen", paragraphs: ["Notiere Farbe, Größe, Modell, Menge und Verkäuferhinweis der exakten Option. Vergleiche diese Daten vor der Detailprüfung mit dem Lagereintrag.", "Nutze stabile Angaben statt Erinnerung. Ähnliche Farben, regionale Größen und kleine Modellunterschiede sind leicht zu verwechseln."] },
      { title: "Maßstab und Maße prüfen", paragraphs: ["Ein Größenetikett beweist nicht die tatsächliche Passform. Vergleiche bei Kleidung Brustweite, Länge, Schulter und Ärmel mit einem passenden Kleidungsstück; bei Schuhen kann die Innensohlenlänge helfen.", "Eine brauchbare Messaufnahme zeigt beide Endpunkte und ein lesbares Maßband. Ist der Anfang verdeckt oder das Band gebogen, fordere ein klareres Foto an."] },
      { title: "Verarbeitung in fester Reihenfolge lesen", paragraphs: ["Beginne mit Silhouette und Symmetrie, gehe dann zu Nähten, Kanten, Grafik oder Stickerei, Beschlägen und Verschlüssen. Der Seitenvergleich zeigt Ausrichtungsfehler schneller.", "Trenne objektive Defekte von normaler Abweichung. Ein kaputter Reißverschluss oder fehlendes Teil ist etwas anderes als eine durch Licht verursachte Farbverschiebung."], bullets: ["Silhouette", "Vorder- und Rückseite", "Nähte und Kanten", "Druck oder Stickerei", "Beschläge", "Flecken und Fehlteile"] },
      { title: "Nachweise mit Entscheidungszweck anfordern", paragraphs: ["Bitte gezielt um Größenetikett, Maß, Nahaufnahme einer Stelle oder eine andere Perspektive. Vage Wünsche erzeugen mehr Bilder, aber keine bessere Entscheidung.", "Nenne, was geprüft werden soll und wo es liegt. Entscheide nach Erhalt zügig, damit die Rückgabefrist nicht durch wiederholte Anfragen verstreicht."] },
      { title: "Freigeben, klären oder zurückgeben", paragraphs: ["Freigeben bedeutet: Variante und Zustand erfüllen die dokumentierte Schwelle. Klären bedeutet: ein definierter Nachweis fehlt. Zurückgeben bedeutet: Abweichung oder Defekt ist wesentlich.", "Bewahre Bilder und Notizen bis zum Erhalt des Pakets auf. Bei einer späteren Differenz lässt sich genauer zeigen, was sich geändert hat."] },
    ],
    checklist: ["Farbe, Größe, Modell und Menge abgleichen.", "Maße mit einem bekannten Produkt vergleichen.", "Zuerst Gesamtsymmetrie prüfen.", "Nähte, Grafik, Kanten und Beschläge prüfen.", "Schäden und fehlendes Zubehör suchen.", "Nur entscheidungsrelevante Nachweise anfordern.", "QC-Aufzeichnung speichern."],
    faqs: [["Sind Lagerfotos eine Qualitätsgarantie?", "Nein. Sie reduzieren Unsicherheit, zeigen aber nur begrenzte Winkel und keine Langzeitqualität."], ["Was wird zuerst geprüft?", "Die bestellte Variante: Farbe, Größe, Modell und Menge."], ["Wie viele Zusatzfotos brauche ich?", "So wenige wie möglich und so präzise wie nötig. Ein gutes Maß ist wertvoller als mehrere vage Bilder."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    lead: "Ein internationales Angebot kann vom Istgewicht, Volumengewicht oder einer routenspezifischen Regel bestimmt werden. Wer den Unterschied kennt, versteht, warum ein leichtes, aber großes Paket teuer sein kann und welche Verpackungsänderung sinnvoll ist.",
    keyPoints: ["Istgewicht wird gemessen; Volumengewicht bewertet Platz.", "Das Abrechnungsgewicht hängt von der aktuellen Route ab.", "Leervolumen zu entfernen kann wichtiger sein als wenige Gramm.", "Routen erst mit endgültigen Maßen und Einschränkungen vergleichen."],
    sections: [
      { title: "Istgewicht misst Masse", paragraphs: ["Das Istgewicht umfasst Produkte, Schutz, Innenverpackung und Außenkarton. Es kann sich bei Bündelung oder Verstärkung ändern.", "Ein Produktgewicht aus dem Angebot ist nur eine frühe Schätzung. Für das Versandangebot zählt die Messung des fertig gepackten Pakets."] },
      { title: "Volumengewicht misst belegten Raum", paragraphs: ["Kapazitätsbegrenzte Routen rechnen Länge, Breite und Höhe mit einem routeneigenen Divisor in ein Gewichtsäquivalent um. Divisor und Rundung sind nicht universell.", "Große leichte Kartons können daher über dem Waagengewicht berechnet werden. Schuhkartons, starre Geschenkboxen und voluminöse Kleidung erzeugen oft Leervolumen."] },
      { title: "Abrechnungsgewicht bestimmen", paragraphs: ["Manche Routen berechnen den höheren Wert aus Ist- und Volumengewicht; andere nutzen Mindeststufen, Größenbänder oder Sonderregeln. Lies die aktuelle Angebotslogik.", "Frage, welche Maße und welches Gewicht verwendet wurden. Prüfe bei einem hohen Preis lange Kanten, große Kartons und eingeschränkte Artikel."] },
      { title: "Verpackung bewusst ändern", paragraphs: ["Unnötige Verkaufskartons entfernen, weiche Verpackung falten und einen passenden Außenkarton wählen kann die Maße senken. Verstärkung kann Gewicht oder Größe erhöhen.", "Wähle nach Produktrisiko. Ein weiches Kleidungsstück verträgt Kompression eher als strukturierte Schuhe, zerbrechliches Zubehör oder Elektronik."], bullets: ["Unnötige Kartons entfernen", "Passenden Außenkarton wählen", "Weiche Verpackung effizient falten", "Schutz für empfindliche Ware behalten", "Nach Umpacken neu messen"] },
      { title: "Routen mit demselben Endpaket vergleichen", paragraphs: ["Vergleiche nur mit gleichem Ziel, Maßen, Gewicht, Einschränkungen und Leistungsniveau. Eine niedrige Rate kann durch anderen Divisor oder Ausschluss verschwinden.", "Speichere Endmaße und Angebot vor Zahlung. So lässt sich eine spätere Neuberechnung nachvollziehen."] },
    ],
    checklist: ["Istgewicht nach Verpackung notieren.", "Alle drei Außenmaße speichern.", "Divisor und Rundung der Route prüfen.", "Voluminöse Verpackung identifizieren.", "Empfindliche Ware schützen.", "Routen mit identischen Daten vergleichen.", "Endangebot speichern."],
    faqs: [["Wird Volumengewicht immer berechnet?", "Nein. Das hängt von Route und Paket ab."], ["Spart das Entfernen eines Schuhkartons immer Geld?", "Nein. Es kann Volumen reduzieren, aber die Wirkung und der Schutzverlust müssen verglichen werden."], ["Warum ändert sich das Angebot nach dem Packen?", "Bündelung, Verstärkung, Umpacken oder Neumessung können Gewicht, Maße oder Eignung ändern."]],
  },
  "how-to-buy-with-hipobuy": {
    lead: "Der Kauf über einen Shopping-Agenten wird übersichtlich, wenn Produktauswahl, Einkauf, Lagerprüfung und internationaler Versand getrennt entschieden werden. So verdeckt ein niedriger Produktpreis weder eine falsche Variante noch einen QC-Fehler oder ein ungeeignetes Paket.",
    keyPoints: ["Exakten Eintrag vor der Bestellung prüfen.", "Produktpreis von Inlands- und internationalem Versand trennen.", "Jeden Artikel anhand von Lagernachweisen entscheiden.", "Verpackung und Route erst mit bekanntem Endpaket wählen."],
    sections: [
      { title: "1. Produkt vor Zahlung definieren", paragraphs: ["Bestätige Verkäufer, Option, Größensystem, Farbe, Menge und Zubehör im exakten Angebot. Speichere die Auswahl und notwendige Hinweise.", "Plane neben dem Produktpreis auch Inlandsversand, mögliche Service- oder Zahlungskosten, Wechselkurs und internationalen Versand ein."] },
      { title: "2. Präzisen Kaufauftrag senden", paragraphs: ["Wähle die Variante eindeutig und schreibe kurze objektive Hinweise. Kläre ein mehrdeutiges Angebot vor der Zahlung.", "Bewahre den Auftrag als Referenz für QC und Rückgabe auf. Ohne ihn ist eine Abweichung schwerer einzuordnen."] },
      { title: "3. Ankunft und Lagerstatus verfolgen", paragraphs: ["Beobachte Wareneingang, Menge und Fotoverfügbarkeit. Notiere fehlende Bestellungen, damit eine Verzögerung sichtbar bleibt.", "Der öffentliche App-Eintrag wirbt mit 90 Tagen kostenloser Lagerung. Rückgabefristen und Live-Regeln müssen dennoch separat geprüft werden."] },
      { title: "4. Dokumentierte QC-Entscheidung treffen", paragraphs: ["Vergleiche Farbe, Größe, Modell und Menge; prüfe danach Maße, Verarbeitung, Schäden und Zubehör. Fordere bei Bedarf einen präzisen Nachweis an.", "Vergib freigeben, klären oder zurückgeben. Ein offener Artikel wird nicht gebündelt."] },
      { title: "5. Paket bauen und Angebot prüfen", paragraphs: ["Nimm nur freigegebene Artikel. Entscheide über Verkaufskartons, Kompression und Schutz nach Produktrisiko.", "Vergleiche Routen mit Ziel, Endmaßen und Einschränkungen. Die beworbenen fünf Tage sind ein Bestfall, keine Zusage für jede Route."] },
      { title: "6. Zahlen, verfolgen und bei Ankunft prüfen", paragraphs: ["Speichere bezahltes Angebot, Gewicht, Maße, Route und Tracking. Beobachte Ausnahmen statt nur das Schätzdatum.", "Fotografiere sichtbare Außenschäden vor dem Öffnen und vergleiche die Ware mit dem Lagerprotokoll."] },
    ],
    checklist: ["Exaktes Angebot prüfen.", "Alle Kostenstufen budgetieren.", "Kaufauftrag speichern.", "Vor Bündelung prüfen.", "Rückgabe fristgerecht lösen.", "Verpackung nach Risiko wählen.", "Routen mit Enddaten vergleichen.", "Tracking und Ankunft dokumentieren."],
    faqs: [["Wird internationaler Versand mit dem Produkt bezahlt?", "Häufig entsteht das Paketangebot erst nach Lagerankunft. Prüfe den aktuellen Ablauf im Checkout."], ["Garantiert die Tabelle Produktqualität?", "Nein. Sie hilft beim Finden; Live-Angebot und Lagernachweise bleiben entscheidend."], ["Wann sollte gebündelt werden?", "Wenn alle enthaltenen Artikel angekommen, freigegeben und alle Rückgabe- oder Maßfragen geschlossen sind."]],
  },
  "hipobuy-shipping-cost-guide": {
    lead: "Wichtig ist weder der niedrigste Produktpreis noch die kleinste beworbene Versandrate, sondern die Gesamtkosten des Pakets unter den tatsächlichen Routen-, Verpackungs- und Zielbedingungen.",
    keyPoints: ["Produkt, Inland, Service, Zahlung, international und Zielkosten trennen.", "Abrechnungsgewicht statt nur Produktgewicht verwenden.", "Eignung und Schutz zählen genauso wie die Rate.", "Vor Zahlung zwei vollständige Szenarien vergleichen."],
    sections: [
      { title: "Ein Kostenmodell aus sechs Teilen", paragraphs: ["Addiere Produktpreis, Verkäufer-Lager-Versand, mögliche Servicekosten, Zahlungs- oder Wechselkurseffekte, internationalen Versand und mögliche Zielkosten.", "Markiere jeden Betrag als bestätigt oder geschätzt. So wird sichtbar, welche Unsicherheit den größten Einfluss hat."] },
      { title: "Abrechnungsgewicht realistisch schätzen", paragraphs: ["Istgewicht, Volumengewicht, Mindeststufen und Routenregeln können den Preis bestimmen. Produktangaben sind nur ein Startwert.", "Ersetze Schätzungen nach Lagerankunft durch gemessene Werte und vergleiche bei großem Leervolumen ein Umpack-Szenario."] },
      { title: "Routen jenseits der Rate vergleichen", paragraphs: ["Prüfe Eignung, Tracking, Entschädigungsgrenzen, Laufzeit, Größenlimits und Produktart. Eingeschränkte Artikel können Optionen ausschließen.", "Die schnellste beworbene Lieferung ist ein Bestfall. Zielabwicklung, Zoll und letzte Meile können länger dauern."] },
      { title: "Verpackungs-Kompromiss verstehen", paragraphs: ["Verkaufskartons schützen, erzeugen aber Volumen. Entfernen kann sparen; Verstärkung oder Nässeschutz kann Gewicht erhöhen.", "Vergleiche Schutz- und Kompakt-Szenario mit wahrscheinlichen Maßen, Routen und Risiko."] },
      { title: "Zielkosten und Unsicherheit einplanen", paragraphs: ["Steuern, Zoll, Abfertigung und Carrier-Gebühren hängen von Ziel, Ware und Versandbedingungen ab. Allgemeine Schätzungen sind keine Garantie.", "Halte eine Reserve für Wechselkurs, Neumessung oder Routenänderung vor."] },
      { title: "Vollständige Szenarien vergleichen", paragraphs: ["Vergleiche zum Beispiel ein gebündeltes Paket mit zwei kleineren oder kompakte mit originaler Verpackung. Nutze denselben Produktsatz und dasselbe Ziel.", "Wähle die beste Balance aus Kosten, Kontrolle und Schutz und speichere die Enddaten für die nächste Bestellung."] },
    ],
    checklist: ["Produkt- und Inlandskosten notieren.", "Service, Zahlung und Wechselkurs ergänzen.", "Ist- und Volumengewicht schätzen.", "Route und Schutz prüfen.", "Verpackungsalternativen modellieren.", "Zielregeln prüfen.", "Reserve einplanen.", "Gesamtkosten speichern."],
    faqs: [["Warum kann Versand teurer als die Ware sein?", "Große Maße, schwere Verpackung, Einschränkungen oder Distanz können Versand zur größten Kostenstufe machen."], ["Ist die billigste Route immer richtig?", "Nein. Tracking, Schutz, Laufzeit und Eignung können eine andere Route sinnvoller machen."], ["Liefert ein Rechner vor Lagerankunft den Endpreis?", "Nur eine Spanne. Endmaße, Gewicht, Einschränkungen und aktuelle Bedingungen werden benötigt."]],
  },
  "hipobuy-warehouse-return-checklist": {
    lead: "Eine Lagerrückgabe sollte eine dokumentierte Entscheidung sein. Die stärkste Anfrage zeigt, was bestellt wurde, was angekommen ist, warum die Abweichung wichtig ist, welcher Nachweis sie belegt und welche Lösung fristgerecht gewünscht wird.",
    keyPoints: ["Problem als Abweichung, Schaden, Fehlteil oder Meinungsänderung einordnen.", "Bestellung und Lagerbilder als Nachweis nutzen.", "Frist und mögliche Gebühren vor Antrag prüfen.", "Eine klare Lösung verlangen und alles speichern."],
    sections: [
      { title: "Problemtyp bestimmen", paragraphs: ["Trenne Verkäuferfehler von einer Meinungsänderung. Falsche Farbe, Größe, Modell, fehlende Menge und sichtbarer Schaden sind unterschiedliche Fälle.", "Schreibe einen sachlichen Satz: bestellt, angekommen und sichtbare Stelle der Differenz."] },
      { title: "Nachweispaket bauen", paragraphs: ["Sammle Angebotsoption, Kaufhinweis, Bestellung, Lagerbilder und Messung. Markiere den relevanten Bildbereich.", "Ein Nachweis sollte die gewünschte Lösung stützen: Nahaufnahme für Riss, Gesamtbild für Farbe, Maß für Größenabweichung."] },
      { title: "Live-Frist vor dem Warten prüfen", paragraphs: ["Lagerzeit ist nicht Rückgabefrist. Ein Artikel kann lagerfähig bleiben, obwohl eine Verkäufer-Rückgabe kaum noch möglich ist.", "Reagiere auf Supportfragen schnell und verzögere einen klaren Fall nicht wegen anderer Bestellungen."] },
      { title: "Gebühren und Logistik bestätigen", paragraphs: ["Je nach Grund können Inlandstransport, Service, Transaktion oder Verkäuferkosten entstehen. Frage, was erstattbar ist und wann der Saldo aktualisiert wird.", "Eine Nachricht allein ist keine abgeschlossene Rückgabe. Suche nach Annahmestatus, Bewegung oder Bestätigung und speichere Referenzen."] },
      { title: "Eine konkrete Lösung verlangen", paragraphs: ["Wähle Rückgabe, Tausch, fehlendes Teil oder Klärung. Widersprüchliche Wünsche bremsen den Ablauf.", "Nach Abschluss Paketplan aktualisieren, zurückgesendete Ware entfernen und Maße neu kalkulieren."] },
      { title: "Aus der Rückgabe lernen", paragraphs: ["Notiere die Ursache: unklarer Eintrag, falsche Option, Verkäuferabweichung, QC-Defekt oder Meinungsänderung.", "Bewahre den Vorgang bis zur sichtbaren Erstattung, Ersatzlieferung oder finalen Lagerstatus auf."] },
    ],
    checklist: ["Bestellung und Option öffnen.", "Problem klassifizieren.", "Relevante Lagerbilder speichern.", "Falls nötig einen präzisen Nachweis anfordern.", "Live-Frist prüfen.", "Gebühren und Erstattung bestätigen.", "Eine Lösung verlangen.", "Annahme und Endstatus speichern."],
    faqs: [["Garantiert ein sichtbarer Defekt eine kostenlose Rückgabe?", "Nein. Verantwortung und Gebühren hängen von Nachweis, Verkäuferreaktion und aktuellen Bedingungen ab."], ["Soll ich auf alle Artikel warten?", "Nein. Ein klarer Fehler sollte früh gemeldet werden."], ["Welcher Nachweis ist am stärksten?", "Die bestellte Option zusammen mit Foto oder Messung, die die Abweichung direkt zeigt."]],
  },
};

const es: Record<LegacySlug, ArticleBody> = {
  "hipobuy-90-day-warehouse-storage": {
    lead: "La ficha pública de Hipobuy anuncia 90 días de almacenamiento gratuito. Lo útil no es dejar un artículo el máximo tiempo posible, sino aprovechar ese margen sin perder devoluciones, retrasar la consolidación ni crear un paquete más grande de lo necesario.",
    keyPoints: ["Usa los 90 días como límite de planificación, no como objetivo.", "Separa el plazo de devolución del contador de almacén.", "Consolida solo artículos con QC terminado.", "Reserva margen para fotos, soporte, reembalaje y cambios de ruta."],
    sections: [
      { title: "Qué cambia realmente el almacenamiento", paragraphs: ["El margen permite que compras de vendedores distintos lleguen en fechas diferentes y se combinen después. No congela el valor, el cambio de moneda, el precio del envío ni la disponibilidad de rutas.", "Gestiona cada artículo con cuatro fechas: pedido, recibido, inspeccionado y listo para consolidar. Si permanece demasiado en un estado, el calendario debe provocar una decisión."] },
      { title: "Trabaja con dos relojes", paragraphs: ["El reloj del almacén y el de devolución al vendedor son distintos. Puede quedar mucho almacenamiento cuando la devolución ya está cerrándose. Registra llegada, disponibilidad de fotos y último día realista para plantear un problema.", "Una hoja con estado, pedidos pendientes, decisión de devolución y semana de consolidación hace visible cualquier bloqueo."], bullets: ["Llegada al almacén", "QC terminado", "Decisión de devolución", "Consolidación prevista", "Último envío seguro"] },
      { title: "No consolides antes del QC", paragraphs: ["Compara color, talla, versión y cantidad con el pedido. Después revisa medidas, fabricación, daños y accesorios. Si una foto no resuelve una pregunta importante, pide una prueba concreta.", "Marca cada artículo como conservar, aclarar o devolver. Solo los conservados entran en el paquete; una duda necesita acción y fecha."] },
      { title: "Planifica el paquete, no solo la lista", paragraphs: ["Más artículos pueden repartir parte del esfuerzo, pero también elevan peso facturable, medidas y restricciones. Cajas de zapatos, chaquetas voluminosas y protección pueden aumentar mucho el peso volumétrico.", "Compara enviar lo que ya está listo con esperar a lo pendiente. Incluye riesgo de devolución, tiempo y cambio probable del peso facturable."] },
      { title: "Protege un margen final", paragraphs: ["No programes el último día posible. Fotos adicionales, soporte, reembalaje, revisión de pago o cambios temporales de ruta necesitan tiempo.", "Cuando empiece el margen, deja de añadir productos opcionales. Resuelve dudas, confirma destino y rutas actuales y envía con tiempo para corregir un rechazo."] },
    ],
    checklist: ["Registrar cada llegada.", "Fijar un plazo separado para devolver.", "Revisar variante, medidas y estado.", "Comparar enviar ahora o esperar.", "Dejar de añadir opcionales antes del margen.", "Confirmar el contador vigente."],
    faqs: [["¿Almacenamiento gratuito significa que todos los servicios son gratis?", "No. Compra, devolución, reembalaje, pago y envío pueden tener costes propios."], ["¿Conviene esperar casi 90 días?", "Normalmente no. Es un colchón para llegadas escalonadas y problemas."], ["¿Qué hago si un artículo retrasa todo?", "Compara esperar con enviar por separado los artículos listos y protege el margen del resto."]],
  },
  "hipobuy-warehouse-qc-photos": {
    lead: "Las fotos de almacén son la última prueba práctica entre el anuncio y tu aprobación. Un orden fijo permite detectar primero diferencias objetivas, evitar distracciones de estilo o iluminación y pedir solo pruebas que cambien la decisión.",
    keyPoints: ["Verifica primero la variante pedida.", "Las medidas pesan más que una etiqueta de talla.", "Revisa simetría, costuras, bordes, impresión, herrajes y daños en el mismo orden.", "Pide otra foto solo si puede cambiar conservar o devolver."],
    sections: [
      { title: "Empieza por el registro del pedido", paragraphs: ["Anota color, talla, modelo, cantidad y nota del vendedor de la opción exacta. Compáralos con el registro de almacén antes de buscar pequeños defectos.", "Usa datos guardados, no memoria. Colores parecidos, tallas regionales y pequeñas variaciones se confunden con facilidad."] },
      { title: "Comprueba escala y medidas", paragraphs: ["La etiqueta indica lo impreso, no el ajuste real. Compara pecho, largo, hombro y manga con una prenda conocida; en calzado puede ayudar la longitud de plantilla.", "Una medición útil muestra ambos extremos y la cinta legible. Si el inicio está oculto o la cinta se curva, pide una toma clara."] },
      { title: "Revisa la construcción en secuencia", paragraphs: ["Pasa de la silueta completa a simetría, costuras, bordes, estampado o bordado, herrajes y cierres. Comparar lados descubre desalineaciones rápidamente.", "Separa defecto objetivo de variación normal. Una cremallera rota o una pieza ausente no es igual que un cambio de color causado por la luz."], bullets: ["Silueta", "Alineación frontal y trasera", "Costuras y bordes", "Estampado o bordado", "Herrajes", "Marcas o faltantes"] },
      { title: "Pide pruebas con una decisión en mente", paragraphs: ["Solicita etiqueta, medida, primer plano de una marca o ángulo de una zona oculta. Una petición vaga produce más fotos sin resolver nada.", "Explica qué verificar y dónde. Cuando llegue la prueba, decide pronto para no consumir la devolución."] },
      { title: "Aprueba, pregunta o devuelve", paragraphs: ["Aprobar significa que variante y estado cumplen tu umbral. Preguntar significa que falta una prueba definida. Devolver significa que el problema es material.", "Guarda fotos y notas hasta recibir el paquete. Si el producto entregado difiere, el registro permite describir el cambio."] },
    ],
    checklist: ["Comparar color, talla, modelo y cantidad.", "Contrastar medidas reales.", "Revisar simetría general.", "Inspeccionar costuras, gráficos, bordes y herrajes.", "Buscar daños y accesorios faltantes.", "Pedir solo pruebas decisivas.", "Guardar el registro QC."],
    faqs: [["¿Las fotos garantizan calidad?", "No. Reducen incertidumbre, pero no prueban construcción oculta, durabilidad o ajuste."], ["¿Qué se revisa primero?", "La variante pedida: color, talla, modelo y cantidad."], ["¿Cuántas fotos extra necesito?", "Las mínimas necesarias. Una medida precisa vale más que varias imágenes vagas."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    lead: "Una cotización internacional puede depender del peso real, el volumétrico o una regla concreta de la ruta. Entenderlo explica por qué un paquete ligero pero grande puede ser caro y qué cambio de embalaje merece la pena.",
    keyPoints: ["El peso real se mide; el volumétrico valora el espacio.", "La ruta vigente determina el peso facturable.", "Eliminar aire puede importar más que unos gramos.", "Compara rutas con medidas y restricciones finales."],
    sections: [
      { title: "El peso real mide masa", paragraphs: ["Incluye productos, protección, embalaje interior y caja exterior. Puede cambiar después de consolidar o reforzar.", "El peso indicado en un anuncio es solo una estimación inicial; importa la medición del paquete terminado."] },
      { title: "El peso volumétrico mide espacio", paragraphs: ["Las rutas con capacidad limitada convierten largo, ancho y alto en un equivalente mediante un divisor propio. Divisor y redondeo varían.", "Una caja grande y ligera puede cobrarse por encima de la báscula. Cajas de calzado, embalajes rígidos y ropa voluminosa generan espacio vacío."] },
      { title: "Encuentra el peso facturable", paragraphs: ["Algunas rutas cobran el mayor entre real y volumétrico; otras usan mínimos, bandas o reglas especiales. Lee la cotización actual.", "Pregunta qué medidas y peso se usaron. Ante un precio alto, revisa lados largos, cajas grandes y artículos restringidos."] },
      { title: "Modifica el embalaje con intención", paragraphs: ["Quitar cajas innecesarias, plegar embalajes blandos y usar una caja ajustada reduce medidas. El refuerzo puede elevar peso o volumen.", "Decide según el riesgo: una prenda blanda tolera compresión mejor que zapatos estructurados, accesorios frágiles o electrónica."], bullets: ["Quitar cajas innecesarias", "Elegir caja ajustada", "Plegar materiales blandos", "Mantener protección útil", "Medir de nuevo"] },
      { title: "Compara rutas con el paquete final", paragraphs: ["Usa el mismo destino, medidas, peso, restricciones y nivel de servicio. Una tarifa baja puede desaparecer por otro divisor o exclusión.", "Guarda medidas y cotización final antes de pagar para entender cualquier revisión posterior."] },
    ],
    checklist: ["Registrar peso real.", "Guardar las tres medidas.", "Comprobar divisor y redondeo.", "Detectar embalaje voluminoso.", "Proteger productos frágiles.", "Comparar con datos idénticos.", "Guardar la cotización final."],
    faqs: [["¿Siempre se cobra peso volumétrico?", "No. Depende de la ruta y el paquete."], ["¿Quitar la caja de zapatos siempre ahorra?", "No. Puede reducir volumen, pero hay que comparar ahorro y protección."], ["¿Por qué cambia la cotización?", "Consolidación, refuerzo, reembalaje o nueva medición pueden cambiar datos o elegibilidad."]],
  },
  "how-to-buy-with-hipobuy": {
    lead: "Comprar mediante un agente resulta más claro cuando selección, compra, revisión de almacén y envío internacional se tratan como decisiones separadas. Así un precio bajo no oculta una variante incorrecta, un fallo QC o un paquete inadecuado.",
    keyPoints: ["Verifica el anuncio exacto.", "Separa producto, entrega nacional y envío internacional.", "Decide cada artículo con pruebas de almacén.", "Elige embalaje y ruta cuando conozcas el paquete final."],
    sections: [
      { title: "1. Define el producto", paragraphs: ["Confirma vendedor, opción, sistema de tallas, color, cantidad y accesorios. Guarda la selección y cualquier nota.", "Reserva presupuesto para entrega nacional, servicio o pago, cambio de moneda y envío internacional."] },
      { title: "2. Envía una solicitud precisa", paragraphs: ["Selecciona una variante clara y usa notas breves y objetivas. Resuelve ambigüedades antes de pagar.", "Guarda el pedido como referencia para QC y devolución."] },
      { title: "3. Sigue llegada y estado", paragraphs: ["Controla recepción, cantidad y fotos. Anota pedidos pendientes para que un retraso no quede oculto.", "La ficha pública anuncia 90 días gratuitos, pero las devoluciones y reglas vigentes requieren control separado."] },
      { title: "4. Toma una decisión QC documentada", paragraphs: ["Compara color, talla, modelo y cantidad; después medidas, fabricación, daños y accesorios. Pide una prueba concreta si falta.", "Marca aprobar, preguntar o devolver. No consolides un artículo abierto."] },
      { title: "5. Construye y cotiza el paquete", paragraphs: ["Incluye solo productos aprobados. Decide cajas, compresión y refuerzo según el riesgo.", "Compara rutas con destino, medidas y restricciones. Los cinco días anunciados son un mejor caso, no una promesa."] },
      { title: "6. Paga, sigue e inspecciona", paragraphs: ["Guarda cotización, peso, medidas, ruta y seguimiento. Vigila incidencias, no solo la fecha estimada.", "Fotografía daños exteriores antes de abrir y compara con el registro de almacén."] },
    ],
    checklist: ["Verificar el anuncio.", "Presupuestar todas las fases.", "Guardar la solicitud.", "Inspeccionar antes de consolidar.", "Resolver devoluciones a tiempo.", "Elegir embalaje por riesgo.", "Comparar rutas con datos finales.", "Guardar seguimiento y recepción."],
    faqs: [["¿Se paga el envío internacional con el producto?", "A menudo la cotización del paquete llega después del almacén. Revisa el proceso vigente."], ["¿La hoja garantiza calidad?", "No. Ayuda a encontrar el anuncio; los datos vivos y el QC siguen siendo necesarios."], ["¿Cuándo consolidar?", "Cuando todo haya llegado, esté aprobado y no queden devoluciones o medidas pendientes."]],
  },
  "hipobuy-shipping-cost-guide": {
    lead: "No importa solo el precio del producto ni la tarifa publicitada, sino el coste total del paquete bajo la ruta, el embalaje y el destino aplicables.",
    keyPoints: ["Separa producto, entrega nacional, servicio, pago, envío y destino.", "Usa peso facturable.", "Elegibilidad y protección importan tanto como el precio.", "Compara dos escenarios completos."],
    sections: [
      { title: "Crea un modelo de seis costes", paragraphs: ["Suma producto, vendedor-almacén, posibles servicios, efectos de pago o cambio, envío internacional y posibles costes de destino.", "Marca cada cifra como confirmada o estimada para ver dónde está la mayor incertidumbre."] },
      { title: "Estima el peso facturable", paragraphs: ["Peso real, volumétrico, mínimos y reglas de ruta pueden controlar la tarifa. El peso del anuncio es un inicio.", "Sustituye estimaciones por medidas reales y compara reembalaje si sobra mucho espacio."] },
      { title: "Compara más que la tarifa", paragraphs: ["Revisa elegibilidad, seguimiento, compensación, tránsito, límites y tipo de producto. Restricciones pueden eliminar opciones.", "La entrega más rápida anunciada es un mejor caso; destino, aduanas y última milla pueden alargarla."] },
      { title: "Entiende el equilibrio de embalaje", paragraphs: ["Las cajas protegen pero añaden volumen. Quitarlas puede ahorrar; reforzar o impermeabilizar puede añadir peso.", "Compara un escenario protector y otro compacto con medidas, rutas y riesgo."] },
      { title: "Prevé costes de destino", paragraphs: ["Impuestos, aranceles, gestión y transportista varían según país y mercancía. Una estimación general no es garantía.", "Mantén una reserva para cambio de moneda, nueva medición o cambio de ruta."] },
      { title: "Compara escenarios completos", paragraphs: ["Compara un paquete consolidado con dos pequeños o embalaje compacto con original, usando los mismos productos y destino.", "Elige el equilibrio entre coste, control y protección y guarda los datos para la siguiente compra."] },
    ],
    checklist: ["Anotar producto y entrega nacional.", "Añadir servicio, pago y cambio.", "Estimar peso real y volumétrico.", "Comprobar ruta y protección.", "Modelar embalajes.", "Revisar destino.", "Reservar contingencia.", "Guardar coste total."],
    faqs: [["¿Por qué el envío puede superar al producto?", "Medidas grandes, embalaje pesado, restricciones o distancia pueden convertirlo en el mayor coste."], ["¿La línea más barata es siempre mejor?", "No. Seguimiento, protección, tiempo y elegibilidad pueden justificar otra."], ["¿Un calculador da el precio final antes del almacén?", "Solo un rango; hacen falta medidas, peso, restricciones y condiciones actuales."]],
  },
  "hipobuy-warehouse-return-checklist": {
    lead: "Una devolución desde almacén debe ser una decisión documentada. La mejor solicitud explica qué se pidió, qué llegó, por qué importa, qué prueba lo demuestra y qué solución se solicita dentro del plazo.",
    keyPoints: ["Clasifica diferencia, daño, faltante o cambio de opinión.", "Usa pedido y fotos como prueba.", "Confirma plazo y tasas.", "Solicita un resultado claro y guarda todo."],
    sections: [
      { title: "Identifica el problema", paragraphs: ["Separa error del vendedor de cambio de opinión. Color, talla, modelo, cantidad y daño son casos distintos.", "Escribe una frase factual: pedido, recibido y lugar visible de la diferencia."] },
      { title: "Construye el paquete de pruebas", paragraphs: ["Reúne opción, nota, pedido, fotos y medidas. Marca la zona relevante.", "Un primer plano prueba una rotura; una vista amplia, el color; una medida, la talla."] },
      { title: "Comprueba el plazo vigente", paragraphs: ["Almacenamiento no equivale a devolución. La venta puede cerrar aunque el artículo aún pueda guardarse.", "Responde rápido al soporte y no esperes otros pedidos para plantear un error claro."] },
      { title: "Confirma tasas y logística", paragraphs: ["Puede haber transporte nacional, servicio, transacción o costes del vendedor. Pregunta qué se devuelve y cuándo.", "Un mensaje no completa el proceso. Busca aceptación, movimiento o confirmación y guarda referencias."] },
      { title: "Pide una solución concreta", paragraphs: ["Elige devolución, cambio, pieza faltante o aclaración. Peticiones contradictorias retrasan.", "Al cerrar, actualiza el paquete, elimina el artículo y recalcula si cambian peso o medidas."] },
      { title: "Aprende de la devolución", paragraphs: ["Registra la causa: anuncio ambiguo, opción equivocada, error del vendedor, defecto QC o preferencia.", "Conserva el caso hasta ver reembolso, sustitución o estado final."] },
    ],
    checklist: ["Abrir pedido y opción.", "Clasificar el problema.", "Guardar fotos.", "Pedir una prueba precisa si hace falta.", "Comprobar plazo.", "Confirmar tasas y reembolso.", "Solicitar una solución.", "Guardar aceptación y cierre."],
    faqs: [["¿Un defecto visible garantiza devolución gratuita?", "No. Depende de pruebas, vendedor y condiciones vigentes."], ["¿Debo esperar a todos los artículos?", "No. Un problema claro debe plantearse pronto."], ["¿Cuál es la prueba más fuerte?", "La opción pedida junto con foto o medida que muestra directamente la diferencia."]],
  },
};

const it: Record<LegacySlug, ArticleBody> = {
  "hipobuy-90-day-warehouse-storage": {
    lead: "La scheda pubblica di Hipobuy pubblicizza 90 giorni di deposito gratuito. Il punto non è lasciare un articolo fermo il più a lungo possibile, ma usare il margine senza perdere un reso, ritardare il consolidamento o creare un pacco più grande del necessario.",
    keyPoints: ["Considera i 90 giorni un limite, non un obiettivo.", "Separa la scadenza del reso dal tempo di deposito.", "Consolida solo articoli con QC completato.", "Lascia margine per foto, assistenza, reimballo e cambi di rotta."],
    sections: [
      { title: "Cosa cambia davvero il deposito", paragraphs: ["Il margine consente ad acquisti di venditori diversi di arrivare in giorni differenti e di essere uniti. Non blocca valore, cambio, prezzo di spedizione o disponibilità delle rotte.", "Gestisci ogni articolo con quattro date: ordinato, ricevuto, controllato e pronto. Se resta troppo nello stesso stato, il calendario deve attivare una decisione."] },
      { title: "Usa due orologi", paragraphs: ["Il tempo di magazzino e quello del reso al venditore sono diversi. Possono restare molti giorni di deposito mentre il reso sta già chiudendo. Registra arrivo, disponibilità delle foto e ultimo giorno realistico per segnalare un problema.", "Un foglio con stato, ordini mancanti, decisione sul reso e settimana di consolidamento rende visibili i blocchi."], bullets: ["Arrivo in magazzino", "QC completato", "Decisione sul reso", "Consolidamento previsto", "Ultima spedizione sicura"] },
      { title: "Non consolidare prima del QC", paragraphs: ["Confronta colore, taglia, versione e quantità. Poi controlla misure, costruzione, danni e accessori. Se una foto non risponde a una domanda importante, chiedi una prova specifica.", "Segna conservare, chiarire o restituire. Solo i prodotti da conservare entrano nel pacco; ogni dubbio deve avere azione e data."] },
      { title: "Pianifica il pacco, non solo l’elenco", paragraphs: ["Più articoli possono distribuire parte dello sforzo, ma aumentare peso fatturabile, dimensioni e restrizioni. Scatole di scarpe, giacche voluminose e protezioni fanno salire il peso volumetrico.", "Confronta la spedizione immediata degli articoli pronti con l’attesa. Includi tempo, rischio di reso e possibile variazione del peso."] },
      { title: "Proteggi un margine finale", paragraphs: ["Non scegliere l’ultimo giorno possibile. Foto extra, assistenza, reimballo, verifica del pagamento e cambi temporanei richiedono tempo.", "Quando inizia il margine, non aggiungere articoli opzionali. Risolvi i dubbi, conferma destinazione e rotte e invia con tempo per correggere un rifiuto."] },
    ],
    checklist: ["Registrare ogni arrivo.", "Fissare una scadenza separata per il reso.", "Controllare variante, misure e stato.", "Confrontare spedire ora o aspettare.", "Smettere di aggiungere opzionali prima del margine.", "Confermare il conto alla rovescia attuale."],
    faqs: [["Deposito gratuito significa che tutti i servizi sono gratis?", "No. Acquisto, reso, reimballo, pagamento e spedizione possono avere costi propri."], ["Conviene aspettare quasi 90 giorni?", "Di solito no. È un cuscinetto per arrivi sfalsati e problemi."], ["Se un articolo ritarda tutto?", "Confronta l’attesa con una spedizione separata e proteggi il margine degli altri articoli."]],
  },
  "hipobuy-warehouse-qc-photos": {
    lead: "Le foto di magazzino sono l’ultima prova pratica tra inserzione e approvazione. Un ordine fisso fa emergere prima le differenze oggettive, evita distrazioni di stile o luce e limita le richieste alle prove che cambiano la decisione.",
    keyPoints: ["Verifica prima la variante ordinata.", "Le misure valgono più della sola etichetta.", "Controlla sempre simmetria, cuciture, bordi, stampa, hardware e danni.", "Chiedi altre foto solo se possono cambiare la scelta."],
    sections: [
      { title: "Parti dal registro dell’ordine", paragraphs: ["Annota colore, taglia, modello, quantità e nota dell’opzione esatta. Confrontali con il magazzino prima dei piccoli difetti.", "Usa dati salvati e non la memoria: colori simili, taglie regionali e differenze di modello si confondono facilmente."] },
      { title: "Controlla scala e misure", paragraphs: ["L’etichetta indica ciò che è stampato, non la vestibilità. Confronta torace, lunghezza, spalle e maniche con un capo noto; per le scarpe può aiutare la soletta.", "Una misura utile mostra entrambi gli estremi e il metro leggibile. Se l’inizio è nascosto o il nastro piegato, chiedi uno scatto migliore."] },
      { title: "Leggi la costruzione in sequenza", paragraphs: ["Passa da silhouette e simmetria a cuciture, bordi, stampa o ricamo, hardware e chiusure. Il confronto tra i lati rivela gli allineamenti.", "Separa difetti oggettivi da variazioni normali. Una cerniera rotta o una parte mancante non è un cambio di colore dovuto alla luce."], bullets: ["Silhouette", "Allineamento fronte e retro", "Cuciture e bordi", "Stampa o ricamo", "Hardware", "Segni o parti mancanti"] },
      { title: "Chiedi prove orientate alla decisione", paragraphs: ["Richiedi etichetta, misura, dettaglio di un segno o angolo di una zona nascosta. Una richiesta vaga produce immagini senza risposta.", "Spiega cosa verificare e dove. Decidi rapidamente quando arriva la prova per non consumare la finestra del reso."] },
      { title: "Approva, chiarisci o restituisci", paragraphs: ["Approvare significa che variante e stato superano la soglia. Chiarire significa che manca una prova definita. Restituire significa che il problema è rilevante.", "Conserva foto e note fino alla consegna. Se il prodotto differisce, il registro mostra cosa è cambiato."] },
    ],
    checklist: ["Confrontare colore, taglia, modello e quantità.", "Verificare le misure.", "Controllare la simmetria generale.", "Ispezionare cuciture, grafiche, bordi e hardware.", "Cercare danni e accessori mancanti.", "Chiedere solo prove decisive.", "Salvare il registro QC."],
    faqs: [["Le foto garantiscono la qualità?", "No. Riducono l’incertezza ma non provano costruzione nascosta, durata o vestibilità."], ["Cosa controllo per primo?", "La variante ordinata: colore, taglia, modello e quantità."], ["Quante foto extra servono?", "Il minimo necessario. Una misura precisa vale più di diverse foto vaghe."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    lead: "Un preventivo internazionale può dipendere dal peso reale, volumetrico o da una regola della rotta. Capire la differenza spiega perché un pacco leggero ma grande può costare molto e quale modifica dell’imballo è utile.",
    keyPoints: ["Il peso reale misura massa; quello volumetrico misura spazio.", "La rotta attuale determina il valore fatturabile.", "Ridurre il vuoto può contare più di pochi grammi.", "Confronta le rotte con dati finali."],
    sections: [
      { title: "Il peso reale misura la massa", paragraphs: ["Comprende prodotti, protezione, imballo interno e scatola esterna. Cambia con consolidamento o rinforzo.", "Il peso dell’inserzione è solo una stima iniziale; conta la misurazione del pacco finito."] },
      { title: "Il peso volumetrico misura lo spazio", paragraphs: ["Le rotte con capacità limitata convertono lunghezza, larghezza e altezza con un divisore proprio. Divisore e arrotondamento variano.", "Una scatola grande e leggera può essere fatturata sopra il peso di bilancia. Scatole di scarpe, confezioni rigide e tessili voluminosi creano vuoto."] },
      { title: "Trova il peso fatturabile", paragraphs: ["Alcune rotte usano il maggiore tra reale e volumetrico; altre minimi, fasce o regole speciali. Leggi il preventivo corrente.", "Chiedi quali misure e peso sono stati usati. Se il costo è alto, controlla lati lunghi, scatole grandi e articoli limitati."] },
      { title: "Modifica l’imballo con criterio", paragraphs: ["Togliere scatole inutili, piegare materiali morbidi e usare un contenitore adatto riduce le misure. Il rinforzo può aumentare massa o volume.", "Scegli in base al rischio: un capo morbido tollera compressione meglio di scarpe strutturate, accessori fragili o elettronica."], bullets: ["Rimuovere cartoni inutili", "Usare una scatola adatta", "Piegare materiali morbidi", "Mantenere la protezione utile", "Misurare di nuovo"] },
      { title: "Confronta le rotte sul pacco finale", paragraphs: ["Usa stessa destinazione, misure, peso, restrizioni e servizio. Una tariffa bassa può sparire con un altro divisore o un’esclusione.", "Salva misure e preventivo finale prima del pagamento per capire eventuali revisioni."] },
    ],
    checklist: ["Registrare il peso reale.", "Salvare le tre dimensioni.", "Controllare divisore e arrotondamento.", "Individuare imballi voluminosi.", "Proteggere gli articoli fragili.", "Confrontare dati identici.", "Salvare il preventivo finale."],
    faqs: [["Il peso volumetrico si paga sempre?", "No. Dipende da rotta e pacco."], ["Togliere la scatola delle scarpe fa sempre risparmiare?", "No. Può ridurre il volume, ma va confrontato con la perdita di protezione."], ["Perché cambia il preventivo?", "Consolidamento, rinforzo, reimballo o nuova misura possono cambiare dati o idoneità."]],
  },
  "how-to-buy-with-hipobuy": {
    lead: "Acquistare tramite un agente è più chiaro se scelta, acquisto, controllo in magazzino e spedizione internazionale sono decisioni separate. Così un prezzo basso non nasconde variante errata, QC fallito o pacco inadatto.",
    keyPoints: ["Verifica l’inserzione esatta.", "Separa prodotto, consegna interna e spedizione internazionale.", "Decidi ogni articolo con prove di magazzino.", "Scegli imballo e rotta sul pacco finale."],
    sections: [
      { title: "1. Definisci il prodotto", paragraphs: ["Conferma venditore, opzione, sistema taglie, colore, quantità e accessori. Salva la selezione e le note.", "Prevedi consegna interna, servizio o pagamento, cambio e spedizione internazionale oltre al prodotto."] },
      { title: "2. Invia una richiesta precisa", paragraphs: ["Scegli una variante chiara e usa note brevi e oggettive. Risolvi ambiguità prima di pagare.", "Conserva l’ordine come riferimento per QC e reso."] },
      { title: "3. Segui arrivo e stato", paragraphs: ["Controlla ricezione, quantità e foto. Annota ciò che manca per rendere visibile un ritardo.", "La scheda pubblica annuncia 90 giorni gratuiti, ma resi e regole live hanno tempi separati."] },
      { title: "4. Prendi una decisione QC documentata", paragraphs: ["Confronta colore, taglia, modello e quantità; poi misure, costruzione, danni e accessori. Chiedi una prova precisa se manca.", "Segna approvare, chiarire o restituire. Non consolidare un caso aperto."] },
      { title: "5. Costruisci e quota il pacco", paragraphs: ["Includi solo articoli approvati. Decidi scatole, compressione e rinforzo in base al rischio.", "Confronta rotte con destinazione, misure e restrizioni. I cinque giorni pubblicizzati sono un caso migliore, non una promessa."] },
      { title: "6. Paga, traccia e controlla", paragraphs: ["Salva preventivo, peso, misure, rotta e tracking. Segui le eccezioni, non solo la data stimata.", "Fotografa danni esterni prima di aprire e confronta con il registro di magazzino."] },
    ],
    checklist: ["Verificare l’inserzione.", "Prevedere tutti i costi.", "Salvare la richiesta.", "Controllare prima del consolidamento.", "Risolvere i resi in tempo.", "Scegliere imballo per rischio.", "Confrontare rotte con dati finali.", "Salvare tracking e ricezione."],
    faqs: [["La spedizione internazionale si paga con il prodotto?", "Spesso il preventivo arriva dopo il magazzino. Controlla il flusso attuale."], ["Il foglio garantisce qualità?", "No. Aiuta a trovare l’inserzione; dati live e QC restano necessari."], ["Quando consolidare?", "Quando tutto è arrivato, approvato e non ci sono resi o misure aperte."]],
  },
  "hipobuy-shipping-cost-guide": {
    lead: "Conta il costo totale del pacco nelle condizioni di rotta, imballo e destinazione, non solo il prezzo del prodotto o la tariffa più bassa.",
    keyPoints: ["Separa prodotto, consegna interna, servizio, pagamento, spedizione e destinazione.", "Usa il peso fatturabile.", "Idoneità e protezione contano quanto il prezzo.", "Confronta due scenari completi."],
    sections: [
      { title: "Crea un modello a sei costi", paragraphs: ["Somma prodotto, consegna venditore-magazzino, servizi, effetti di pagamento o cambio, spedizione internazionale e possibili costi di destinazione.", "Segna ogni cifra come confermata o stimata per vedere l’incertezza principale."] },
      { title: "Stima il peso fatturabile", paragraphs: ["Peso reale, volumetrico, minimi e regole di rotta possono controllare il prezzo. Il peso dell’inserzione è solo l’inizio.", "Sostituisci le stime con misure reali e confronta il reimballo se c’è molto vuoto."] },
      { title: "Confronta oltre la tariffa", paragraphs: ["Controlla idoneità, tracking, compensazione, transito, limiti e tipo di articolo. Le restrizioni possono eliminare rotte.", "La consegna più rapida pubblicizzata è un caso migliore; destinazione, dogana e ultimo miglio possono allungarla."] },
      { title: "Capisci il compromesso dell’imballo", paragraphs: ["Le scatole proteggono ma aggiungono volume. Toglierle può risparmiare; rinforzo e impermeabilizzazione possono aggiungere peso.", "Confronta uno scenario protettivo e uno compatto con dimensioni, rotte e rischio."] },
      { title: "Prevedi i costi a destinazione", paragraphs: ["Imposte, dazi, gestione e vettore variano per paese e merce. Una stima generale non è una garanzia.", "Mantieni un margine per cambio, nuova misura o cambio di rotta."] },
      { title: "Confronta scenari completi", paragraphs: ["Confronta un pacco consolidato con due piccoli o imballo compatto con originale, usando stessi prodotti e destinazione.", "Scegli il miglior equilibrio tra costo, controllo e protezione e salva i dati reali."] },
    ],
    checklist: ["Annotare prodotto e consegna interna.", "Aggiungere servizio, pagamento e cambio.", "Stimare peso reale e volumetrico.", "Controllare rotta e protezione.", "Modellare imballi.", "Verificare destinazione.", "Tenere una riserva.", "Salvare il costo totale."],
    faqs: [["Perché la spedizione può costare più dei prodotti?", "Dimensioni, imballo, restrizioni o distanza possono renderla la voce maggiore."], ["La linea più economica è sempre migliore?", "No. Tracking, protezione, tempo e idoneità possono favorirne un’altra."], ["Un calcolatore dà il prezzo finale prima del magazzino?", "Solo un intervallo; servono misure, peso, restrizioni e condizioni attuali."]],
  },
  "hipobuy-warehouse-return-checklist": {
    lead: "Un reso dal magazzino deve essere una decisione documentata. La richiesta migliore spiega cosa è stato ordinato, cosa è arrivato, perché conta, quale prova lo mostra e quale soluzione viene chiesta nei tempi disponibili.",
    keyPoints: ["Classifica differenza, danno, mancanza o cambio di idea.", "Usa ordine e foto come prova.", "Conferma tempi e possibili costi.", "Chiedi un esito chiaro e conserva tutto."],
    sections: [
      { title: "Identifica il problema", paragraphs: ["Separa errore del venditore da cambio di idea. Colore, taglia, modello, quantità e danno sono casi diversi.", "Scrivi una frase fattuale: ordinato, arrivato e punto visibile della differenza."] },
      { title: "Costruisci il pacchetto di prove", paragraphs: ["Raccogli opzione, nota, ordine, foto e misure. Evidenzia la zona rilevante.", "Un dettaglio prova uno strappo; una vista ampia il colore; una misura la taglia."] },
      { title: "Controlla la scadenza attuale", paragraphs: ["Deposito e reso non coincidono. Il reso può chiudersi anche se l’articolo resta conservabile.", "Rispondi rapidamente all’assistenza e non aspettare altri ordini per segnalare un errore chiaro."] },
      { title: "Conferma costi e logistica", paragraphs: ["Possono esserci trasporto interno, servizio, transazione o costi del venditore. Chiedi cosa è rimborsabile e quando.", "Un messaggio non completa il reso. Cerca accettazione, movimento o conferma e salva i riferimenti."] },
      { title: "Chiedi una soluzione specifica", paragraphs: ["Scegli reso, cambio, parte mancante o chiarimento. Richieste contraddittorie rallentano.", "Alla chiusura aggiorna il pacco, rimuovi l’articolo e ricalcola peso e misure."] },
      { title: "Impara dal reso", paragraphs: ["Registra la causa: inserzione ambigua, opzione errata, errore del venditore, difetto QC o preferenza.", "Conserva il caso fino a rimborso, sostituzione o stato finale visibile."] },
    ],
    checklist: ["Aprire ordine e opzione.", "Classificare il problema.", "Salvare le foto.", "Chiedere una prova precisa se serve.", "Controllare la scadenza.", "Confermare costi e rimborso.", "Chiedere una soluzione.", "Salvare accettazione e chiusura."],
    faqs: [["Un difetto visibile garantisce un reso gratuito?", "No. Dipende da prove, venditore e condizioni attuali."], ["Devo aspettare tutti gli articoli?", "No. Un problema chiaro va segnalato presto."], ["Qual è la prova più forte?", "L’opzione ordinata insieme a foto o misura che mostra direttamente la differenza."]],
  },
};

const pl: Record<LegacySlug, ArticleBody> = {
  "hipobuy-90-day-warehouse-storage": {
    lead: "Publiczna karta Hipobuy reklamuje 90 dni bezpłatnego magazynowania. Nie chodzi o trzymanie rzeczy jak najdłużej, lecz o wykorzystanie zapasu bez utraty terminu zwrotu, opóźniania konsolidacji i budowania zbyt dużej paczki.",
    keyPoints: ["Traktuj 90 dni jako limit planu, nie cel.", "Oddziel termin zwrotu od licznika magazynu.", "Łącz tylko produkty po zakończonym QC.", "Zostaw czas na zdjęcia, pomoc, przepakowanie i zmianę trasy."],
    sections: [
      { title: "Co naprawdę zmienia magazynowanie", paragraphs: ["Okno pozwala, by zakupy od różnych sprzedawców dotarły w inne dni i zostały później połączone. Nie zamraża wartości produktu, kursu, ceny wysyłki ani dostępności tras.", "Prowadź cztery daty dla każdego produktu: zamówiono, odebrano, sprawdzono i gotowe do połączenia. Zbyt długi postój powinien uruchamiać decyzję."] },
      { title: "Używaj dwóch zegarów", paragraphs: ["Czas magazynu i zwrot do sprzedawcy to różne terminy. Może pozostać wiele dni przechowywania, gdy zwrot już się zamyka. Zapisz przyjęcie, pojawienie się zdjęć i ostatni realny dzień zgłoszenia.", "Prosty arkusz ze statusem, brakującymi zamówieniami, decyzją o zwrocie i tygodniem konsolidacji ujawnia blokady."], bullets: ["Przyjęcie do magazynu", "QC zakończone", "Decyzja o zwrocie", "Planowana konsolidacja", "Ostatnia bezpieczna wysyłka"] },
      { title: "Nie łącz przed zakończeniem QC", paragraphs: ["Porównaj kolor, rozmiar, wersję i liczbę z zamówieniem. Potem sprawdź wymiary, wykonanie, uszkodzenia i dodatki. Gdy zdjęcie nie rozstrzyga ważnej kwestii, poproś o konkretny dowód.", "Oznacz zachować, wyjaśnić lub zwrócić. Do paczki trafiają tylko zachowane rzeczy; pytanie musi mieć działanie i datę."] },
      { title: "Planuj paczkę, nie samą listę", paragraphs: ["Więcej produktów może rozłożyć część wysiłku, ale podnieść wagę rozliczeniową, wymiary i ograniczenia. Pudełka po butach, grube kurtki i ochrona zwiększają wagę objętościową.", "Porównaj wysyłkę gotowych rzeczy teraz z czekaniem. Uwzględnij czas, ryzyko zwrotu i zmianę wagi."] },
      { title: "Chroń końcowy zapas czasu", paragraphs: ["Nie wybieraj ostatniego możliwego dnia. Dodatkowe zdjęcia, pomoc, przepakowanie, kontrola płatności i zmiany tras wymagają czasu.", "Gdy zaczyna się zapas, nie dodawaj opcjonalnych rzeczy. Zamknij pytania, potwierdź kraj i trasy oraz złóż paczkę z czasem na poprawkę."] },
    ],
    checklist: ["Zapisać każde przyjęcie.", "Wyznaczyć osobny termin zwrotu.", "Sprawdzić wariant, wymiary i stan.", "Porównać wysyłkę teraz z czekaniem.", "Nie dodawać opcjonalnych rzeczy przed zapasem.", "Sprawdzić aktualny licznik."],
    faqs: [["Czy bezpłatny magazyn oznacza darmowe wszystkie usługi?", "Nie. Zakup, zwrot, przepakowanie, płatność i wysyłka mogą mieć własne koszty."], ["Czy warto czekać prawie 90 dni?", "Zwykle nie. To bufor na różne daty dostaw i rozwiązywanie problemów."], ["Co zrobić, gdy jedna rzecz opóźnia wszystko?", "Porównaj czekanie z osobną wysyłką gotowych produktów i chroń zapas pozostałych."]],
  },
  "hipobuy-warehouse-qc-photos": {
    lead: "Zdjęcia magazynowe są ostatnim praktycznym dowodem między ofertą a zatwierdzeniem. Stała kolejność pozwala najpierw znaleźć obiektywne różnice, nie dać się rozproszyć światłu i prosić tylko o dowody wpływające na decyzję.",
    keyPoints: ["Najpierw potwierdź zamówiony wariant.", "Wymiary są ważniejsze niż sama metka.", "Sprawdzaj symetrię, szwy, krawędzie, nadruk, okucia i uszkodzenia.", "Proś o dodatkowe zdjęcie tylko wtedy, gdy może zmienić decyzję."],
    sections: [
      { title: "Zacznij od zapisu zamówienia", paragraphs: ["Zapisz kolor, rozmiar, model, liczbę i uwagę dla dokładnej opcji. Porównaj je z magazynem przed szukaniem drobnych wad.", "Używaj zapisanych danych, nie pamięci. Podobne kolory, regionalne rozmiary i różnice modeli łatwo pomylić."] },
      { title: "Sprawdź skalę i wymiary", paragraphs: ["Metka pokazuje nadruk, nie faktyczne dopasowanie. Porównaj szerokość, długość, ramiona i rękaw ze znanym ubraniem; w butach pomocna jest wkładka.", "Dobre zdjęcie pomiaru pokazuje oba końce i czytelną miarkę. Jeśli początek jest ukryty lub taśma wygięta, poproś o lepsze."] },
      { title: "Czytaj wykonanie w kolejności", paragraphs: ["Przejdź od sylwetki i symetrii do szwów, krawędzi, nadruku lub haftu, okuć i zapięć. Porównanie stron szybko wykrywa przesunięcia.", "Oddziel obiektywną wadę od normalnej różnicy. Zepsuty zamek lub brak części to nie zmiana koloru wywołana światłem."], bullets: ["Sylwetka", "Przód i tył", "Szwy i krawędzie", "Nadruk lub haft", "Okucia", "Ślady i braki"] },
      { title: "Proś o dowód dla konkretnej decyzji", paragraphs: ["Poproś o metkę, wymiar, zbliżenie śladu lub inny kąt ukrytego miejsca. Ogólna prośba tworzy więcej zdjęć, ale nie odpowiedź.", "Napisz, co i gdzie ma być sprawdzone. Po otrzymaniu dowodu zdecyduj szybko, aby nie zużyć czasu zwrotu."] },
      { title: "Zatwierdź, wyjaśnij albo zwróć", paragraphs: ["Zatwierdzenie oznacza zgodny wariant i stan. Wyjaśnienie oznacza brak jednego dowodu. Zwrot oznacza istotną różnicę lub wadę.", "Zachowaj zdjęcia i notatki do odbioru. Jeśli dostarczona rzecz się różni, zapis pokaże zmianę."] },
    ],
    checklist: ["Porównać kolor, rozmiar, model i liczbę.", "Sprawdzić rzeczywiste wymiary.", "Ocenić ogólną symetrię.", "Sprawdzić szwy, grafiki, krawędzie i okucia.", "Szukaj uszkodzeń i braków.", "Prosić tylko o rozstrzygające dowody.", "Zapisać QC."],
    faqs: [["Czy zdjęcia gwarantują jakość?", "Nie. Zmniejszają niepewność, ale nie dowodzą ukrytej konstrukcji, trwałości ani dopasowania."], ["Co sprawdzić najpierw?", "Zamówiony wariant: kolor, rozmiar, model i ilość."], ["Ile dodatkowych zdjęć potrzeba?", "Jak najmniej, ale precyzyjnych. Jeden dobry pomiar jest lepszy niż kilka ogólnych zdjęć."]],
  },
  "hipobuy-actual-vs-volumetric-weight": {
    lead: "Międzynarodowa wycena może zależeć od wagi rzeczywistej, objętościowej lub reguły trasy. Różnica wyjaśnia, dlaczego lekka, lecz duża paczka może być droga i jaka zmiana opakowania ma sens.",
    keyPoints: ["Waga rzeczywista mierzy masę, objętościowa przestrzeń.", "Aktualna trasa ustala wagę rozliczeniową.", "Usunięcie pustej przestrzeni może być ważniejsze niż kilka gramów.", "Porównuj trasy na końcowych danych."],
    sections: [
      { title: "Waga rzeczywista mierzy masę", paragraphs: ["Obejmuje produkty, ochronę, opakowania wewnętrzne i karton. Zmienia się przy konsolidacji lub wzmocnieniu.", "Waga z oferty jest tylko wstępną oceną; liczy się pomiar gotowej paczki."] },
      { title: "Waga objętościowa mierzy przestrzeń", paragraphs: ["Trasy o ograniczonej pojemności przeliczają długość, szerokość i wysokość przez własny dzielnik. Dzielniki i zaokrąglenia różnią się.", "Duży lekki karton może być liczony powyżej wagi z wagi. Pudełka po butach, sztywne opakowania i grube ubrania tworzą pustkę."] },
      { title: "Znajdź wagę rozliczeniową", paragraphs: ["Część tras bierze wyższą z dwóch wag, inne stosują minima, przedziały lub reguły specjalne. Czytaj bieżącą wycenę.", "Zapytaj o użyte wymiary i wagę. Przy wysokiej cenie sprawdź długi bok, duże pudełko i ograniczone produkty."] },
      { title: "Zmieniaj opakowanie świadomie", paragraphs: ["Usunięcie zbędnych kartonów, złożenie miękkich materiałów i dopasowane pudło zmniejsza wymiary. Wzmocnienie może dodać wagę.", "Wybierz według ryzyka: miękkie ubranie znosi kompresję lepiej niż buty, delikatne dodatki czy elektronika."], bullets: ["Usunąć zbędne kartony", "Wybrać dopasowane pudło", "Złożyć miękkie materiały", "Zachować potrzebną ochronę", "Ponownie zmierzyć"] },
      { title: "Porównuj trasy na gotowej paczce", paragraphs: ["Użyj tego samego kraju, wymiarów, wagi, ograniczeń i poziomu usługi. Niska stawka może zniknąć przy innym dzielniku.", "Zapisz końcowe wymiary i wycenę przed płatnością, aby rozumieć późniejszą korektę."] },
    ],
    checklist: ["Zapisać wagę rzeczywistą.", "Zachować trzy wymiary.", "Sprawdzić dzielnik i zaokrąglenie.", "Znaleźć duże opakowania.", "Chronić delikatne produkty.", "Porównywać identyczne dane.", "Zapisać końcową wycenę."],
    faqs: [["Czy waga objętościowa jest zawsze naliczana?", "Nie. Zależy od trasy i paczki."], ["Czy usunięcie pudełka zawsze oszczędza?", "Nie. Może zmniejszyć objętość, ale trzeba porównać ochronę."], ["Dlaczego wycena zmienia się po pakowaniu?", "Konsolidacja, wzmocnienie, przepakowanie lub pomiar zmieniają dane albo dostępność."]],
  },
  "how-to-buy-with-hipobuy": {
    lead: "Zakup przez agenta jest łatwiejszy, gdy wybór, kupno, kontrola magazynowa i wysyłka międzynarodowa są osobnymi decyzjami. Niska cena nie ukryje wtedy złego wariantu, błędu QC lub niewłaściwej paczki.",
    keyPoints: ["Sprawdź dokładną ofertę.", "Oddziel produkt, wysyłkę krajową i międzynarodową.", "Decyduj na podstawie dowodów magazynu.", "Wybierz opakowanie i trasę na końcowej paczce."],
    sections: [
      { title: "1. Zdefiniuj produkt", paragraphs: ["Potwierdź sprzedawcę, opcję, rozmiarówkę, kolor, ilość i dodatki. Zapisz wybór i uwagi.", "Oprócz produktu uwzględnij dostawę krajową, usługę lub płatność, kurs i wysyłkę międzynarodową."] },
      { title: "2. Wyślij precyzyjne zlecenie", paragraphs: ["Wybierz jasny wariant i krótkie obiektywne uwagi. Rozwiąż niejasności przed płatnością.", "Zachowaj zlecenie jako odniesienie dla QC i zwrotu."] },
      { title: "3. Śledź przyjęcie i status", paragraphs: ["Kontroluj odbiór, liczbę i zdjęcia. Zapisuj brakujące zamówienia.", "Karta publiczna reklamuje 90 darmowych dni, ale zwrot i reguły konta mają osobne terminy."] },
      { title: "4. Podejmij udokumentowaną decyzję QC", paragraphs: ["Porównaj kolor, rozmiar, model i ilość, potem wymiary, wykonanie, uszkodzenia i dodatki. Poproś o precyzyjny dowód.", "Oznacz zatwierdzić, wyjaśnić lub zwrócić. Nie łącz otwartego przypadku."] },
      { title: "5. Zbuduj i wyceń paczkę", paragraphs: ["Dodaj tylko zatwierdzone produkty. Wybierz pudełka, kompresję i ochronę według ryzyka.", "Porównaj trasy z krajem, wymiarami i ograniczeniami. Reklamowane pięć dni to najlepszy przypadek, nie obietnica."] },
      { title: "6. Zapłać, śledź i sprawdź", paragraphs: ["Zapisz wycenę, wagę, wymiary, trasę i tracking. Obserwuj wyjątki, nie tylko datę.", "Fotografuj widoczne uszkodzenia zewnętrzne przed otwarciem i porównaj z QC."] },
    ],
    checklist: ["Sprawdzić ofertę.", "Zaplanować wszystkie koszty.", "Zapisać zlecenie.", "Sprawdzić przed konsolidacją.", "Rozwiązać zwroty w terminie.", "Wybrać opakowanie według ryzyka.", "Porównać trasy na danych końcowych.", "Zachować tracking i odbiór."],
    faqs: [["Czy wysyłkę międzynarodową płaci się z produktem?", "Często wycena powstaje po przyjęciu do magazynu. Sprawdź aktualny proces."], ["Czy arkusz gwarantuje jakość?", "Nie. Pomaga znaleźć ofertę; dane na żywo i QC pozostają konieczne."], ["Kiedy konsolidować?", "Gdy wszystko dotarło, zostało zatwierdzone i nie ma otwartych zwrotów ani pomiarów."]],
  },
  "hipobuy-shipping-cost-guide": {
    lead: "Liczy się całkowity koszt paczki przy danej trasie, opakowaniu i kraju, a nie tylko cena produktu lub najniższa reklamowana stawka.",
    keyPoints: ["Oddziel produkt, dostawę krajową, usługę, płatność, wysyłkę i kraj.", "Użyj wagi rozliczeniowej.", "Dostępność i ochrona są równie ważne jak cena.", "Porównaj dwa pełne scenariusze."],
    sections: [
      { title: "Zbuduj model sześciu kosztów", paragraphs: ["Dodaj produkt, dostawę sprzedawca-magazyn, możliwe usługi, efekty płatności lub kursu, wysyłkę międzynarodową i możliwe opłaty w kraju.", "Oznacz kwoty jako potwierdzone lub szacowane, aby zobaczyć największą niepewność."] },
      { title: "Realnie oszacuj wagę", paragraphs: ["Waga rzeczywista, objętościowa, minima i reguły trasy mogą ustalać cenę. Waga z oferty to początek.", "Po magazynie zastąp szacunki pomiarami i porównaj przepakowanie przy dużej pustce."] },
      { title: "Porównuj więcej niż stawkę", paragraphs: ["Sprawdź dostępność, tracking, rekompensatę, czas, limity i typ produktu. Ograniczenia mogą usunąć opcje.", "Najszybsza reklamowana dostawa to najlepszy przypadek; kraj, odprawa i ostatnia mila mogą ją wydłużyć."] },
      { title: "Zrozum kompromis opakowania", paragraphs: ["Pudełka chronią, ale dodają objętość. Usunięcie może oszczędzić; wzmocnienie i wodoodporność mogą dodać wagę.", "Porównaj wariant ochronny i kompaktowy pod względem wymiarów, tras i ryzyka."] },
      { title: "Uwzględnij koszty kraju", paragraphs: ["Podatki, cło, obsługa i przewoźnik różnią się według kraju i towaru. Ogólny szacunek nie jest gwarancją.", "Zostaw rezerwę na kurs, ponowny pomiar lub zmianę trasy."] },
      { title: "Porównaj pełne scenariusze", paragraphs: ["Porównaj jedną paczkę z dwiema mniejszymi albo opakowanie kompaktowe z oryginalnym, przy tych samych produktach i kraju.", "Wybierz balans kosztu, kontroli i ochrony oraz zachowaj dane do następnego zakupu."] },
    ],
    checklist: ["Zapisać produkt i dostawę krajową.", "Dodać usługę, płatność i kurs.", "Oszacować obie wagi.", "Sprawdzić trasę i ochronę.", "Modelować opakowania.", "Sprawdzić kraj.", "Zostawić rezerwę.", "Zapisać całkowity koszt."],
    faqs: [["Dlaczego wysyłka może być droższa od produktów?", "Duże wymiary, ciężkie opakowanie, ograniczenia lub odległość mogą uczynić ją największym kosztem."], ["Czy najtańsza linia jest zawsze najlepsza?", "Nie. Tracking, ochrona, czas i dostępność mogą wskazać inną."], ["Czy kalkulator poda cenę końcową przed magazynem?", "Tylko zakres; potrzebne są wymiary, waga, ograniczenia i aktualne warunki."]],
  },
  "hipobuy-warehouse-return-checklist": {
    lead: "Zwrot z magazynu powinien być udokumentowaną decyzją. Najlepsze zgłoszenie pokazuje, co zamówiono, co dotarło, dlaczego różnica ma znaczenie, jaki dowód ją potwierdza i jakiego rozwiązania oczekujesz w terminie.",
    keyPoints: ["Klasyfikuj różnicę, uszkodzenie, brak lub zmianę zdania.", "Użyj zamówienia i zdjęć jako dowodu.", "Potwierdź termin i możliwe koszty.", "Poproś o jeden wynik i zachowaj całość."],
    sections: [
      { title: "Określ problem", paragraphs: ["Oddziel błąd sprzedawcy od zmiany zdania. Zły kolor, rozmiar, model, liczba i uszkodzenie to różne przypadki.", "Napisz jedno rzeczowe zdanie: zamówione, otrzymane i miejsce widocznej różnicy."] },
      { title: "Zbuduj zestaw dowodów", paragraphs: ["Zbierz opcję, uwagę, zamówienie, zdjęcia i pomiar. Zaznacz właściwy obszar.", "Zbliżenie pokazuje rozdarcie, szerokie ujęcie kolor, a pomiar rozmiar."] },
      { title: "Sprawdź bieżący termin", paragraphs: ["Magazynowanie nie jest zwrotem. Zwrot może się zamknąć, choć rzecz nadal może leżeć.", "Odpowiadaj szybko i nie czekaj na inne zamówienia przy jasnym błędzie."] },
      { title: "Potwierdź koszty i logistykę", paragraphs: ["Mogą wystąpić przewóz krajowy, usługa, transakcja lub koszt sprzedawcy. Zapytaj, co podlega zwrotowi i kiedy.", "Sama wiadomość nie kończy procesu. Szukaj akceptacji, ruchu lub potwierdzenia i zapisuj numery."] },
      { title: "Poproś o konkretne rozwiązanie", paragraphs: ["Wybierz zwrot, wymianę, brakującą część lub wyjaśnienie. Sprzeczne prośby spowalniają.", "Po zamknięciu zaktualizuj paczkę, usuń produkt i przelicz wagę oraz wymiary."] },
      { title: "Wyciągnij wniosek", paragraphs: ["Zapisz przyczynę: niejasna oferta, zła opcja, błąd sprzedawcy, wada QC lub preferencja.", "Zachowaj sprawę do widocznego zwrotu, wymiany lub końcowego statusu."] },
    ],
    checklist: ["Otworzyć zamówienie i opcję.", "Sklasyfikować problem.", "Zapisać zdjęcia.", "Poprosić o precyzyjny dowód.", "Sprawdzić termin.", "Potwierdzić opłaty i zwrot.", "Poprosić o jedno rozwiązanie.", "Zapisać akceptację i finał."],
    faqs: [["Czy widoczna wada gwarantuje darmowy zwrot?", "Nie. Zależy od dowodu, sprzedawcy i bieżących warunków."], ["Czy czekać na wszystkie produkty?", "Nie. Jasny problem należy zgłosić szybko."], ["Jaki dowód jest najmocniejszy?", "Zamówiona opcja wraz ze zdjęciem lub pomiarem pokazującym różnicę."]],
  },
};

function enrichBodies(lang: Lang, bodies: Record<LegacySlug, ArticleBody>): Record<ArticleSlug, ArticleBody> {
  const enriched = {} as Record<ArticleSlug, ArticleBody>;
  for (const slug of articleSlugs) {
    if (slug === "hipobuy-review-2026") {
      enriched[slug] = reviewArticles[lang];
      continue;
    }
    const base = bodies[slug];
    const extra = articleExpansions[lang][slug];
    const details = localizedSectionDetails[lang][slug];
    const parity = lang === "en" ? undefined : localizedParityDetails[lang][slug];
    enriched[slug] = {
      ...base,
      sections: [...base.sections, ...extra.sections.map((section, index) => ({
        ...section,
        paragraphs: details[index]
          ? [...section.paragraphs, [details[index], parity?.[index]].filter(Boolean).join(" ")]
          : section.paragraphs,
      }))],
      checklist: [...base.checklist, ...extra.checklist],
      faqs: [...base.faqs, ...extra.faqs],
      visual: extra.visual,
    };
  }
  return enriched;
}

export const articleBodies: Record<Lang, Record<ArticleSlug, ArticleBody>> = {
  en: enrichBodies("en", en),
  de: enrichBodies("de", de),
  es: enrichBodies("es", es),
  it: enrichBodies("it", it),
  pl: enrichBodies("pl", pl),
};
