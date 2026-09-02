export type Lang = "en" | "de" | "es" | "it" | "pl";
export type PageKey = "home" | "spreadsheet" | "categories" | "qc" | "shipping" | "faq" | "articles";

export const articleSlugs = [
  "how-to-buy-with-hipobuy",
  "hipobuy-shipping-cost-guide",
  "hipobuy-warehouse-qc-photos",
  "hipobuy-actual-vs-volumetric-weight",
  "hipobuy-90-day-warehouse-storage",
  "hipobuy-warehouse-return-checklist",
  "hipobuy-review-2026",
] as const;

export type ArticleSlug = (typeof articleSlugs)[number];

export const mainSite = "https://www.cnfanshm.com";

export const languages: Array<{ code: Lang; label: string; market: string; flag: string }> = [
  { code: "en", label: "English", market: "Global · UK · US", flag: "🌐" },
  { code: "de", label: "Deutsch", market: "DE · AT · CH", flag: "🇩🇪" },
  { code: "es", label: "Español", market: "ES", flag: "🇪🇸" },
  { code: "it", label: "Italiano", market: "IT", flag: "🇮🇹" },
  { code: "pl", label: "Polski", market: "PL", flag: "🇵🇱" },
];

export const products = [
  {
    id: "HS-5004",
    name: "Nike Zoom Vomero 5 Collection",
    category: "shoes",
    detail: "Multiple colorways",
    price: "$34.10",
    sourcePrice: "¥230",
    image: `${mainSite}/uploads/allimg/20260213/1-2602131J25L52.webp`,
    href: `${mainSite}/AllProducts/5004.html`,
  },
  {
    id: "HS-1178",
    name: "Alexander McQueen Logo T-Shirt",
    category: "tshirts",
    detail: "31 styles listed",
    price: "$17.20",
    sourcePrice: "¥116",
    image: `${mainSite}/uploads/allimg/20251221/1-251221130213D5.webp`,
    href: `${mainSite}/AllProducts/1178.html`,
  },
  {
    id: "HS-4433",
    name: "Loro Piana Cap",
    category: "headwear",
    detail: "Classic cap",
    price: "$17.50",
    sourcePrice: "¥118",
    image: `${mainSite}/uploads/allimg/20260205/1-26020513344E61.webp`,
    href: `${mainSite}/AllProducts/4433.html`,
  },
  {
    id: "HS-5364",
    name: "New Era 59FIFTY Fitted Caps",
    category: "headwear",
    detail: "40 styles listed",
    price: "$7.30",
    sourcePrice: "¥49",
    image: `${mainSite}/uploads/allimg/20260310/1-260310142Q6129.webp`,
    href: `${mainSite}/AllProducts/5364.html`,
  },
  {
    id: "HS-3754",
    name: "Balenciaga Runner",
    category: "shoes",
    detail: "Runner silhouette",
    price: "$74.10",
    sourcePrice: "¥500",
    image: `${mainSite}/uploads/allimg/20260125/1-2601251F91X17.webp`,
    href: `${mainSite}/AllProducts/3754.html`,
  },
  {
    id: "HS-1687",
    name: "UGG Mini Bailey Button Boots",
    category: "shoes",
    detail: "26 styles listed",
    price: "$23.60",
    sourcePrice: "¥159",
    image: `${mainSite}/uploads/allimg/20251226/1-251226161201233.webp`,
    href: `${mainSite}/AllProducts/1687.html`,
  },
];

export const categoryLinks = [
  { key: "shoes", href: `${mainSite}/shoes/` },
  { key: "hoodies", href: `${mainSite}/hoodies-sweaters/` },
  { key: "tshirts", href: `${mainSite}/t-shirts/` },
  { key: "jackets", href: `${mainSite}/jackets/` },
  { key: "pants", href: `${mainSite}/pants-shorts/` },
  { key: "headwear", href: `${mainSite}/headwear/` },
  { key: "accessories", href: `${mainSite}/accessories/` },
  { key: "jerseys", href: `${mainSite}/jersey/` },
  { key: "electronics", href: `${mainSite}/electronics/` },
  { key: "all", href: `${mainSite}/AllProducts/` },
] as const;

const en = {
  nav: { home: "Home", spreadsheet: "Spreadsheet", categories: "Categories", qc: "QC Guide", shipping: "Shipping", faq: "FAQ", articles: "Buying Guides" },
  common: {
    independent: "Independent directory", checked: "Links checked 14 Aug 2026", review: "Published index · updated 14 Aug 2026",
    openIndex: "Open full index", language: "Language", back: "Back to top", footer: "Independent product-discovery resource. Not affiliated with Hipobuy or the marketplaces referenced by product listings.",
    updated: "Updated", source: "Source", usd: "USD ref.", status: "Status", checkedShort: "Checked", live: "Link live", openProduct: "Open product",
    product: "Product", category: "Category", noResults: "No rows match this filter. Try another category or search term.",
    priceNote: "USD values are reference conversions, not checkout quotes.", shown: "rows shown", factsNote: "Platform-reported information checked August 14, 2026. Routes, conditions and availability vary.",
  },
  home: {
    overline: "HIPOBUY PRODUCT INDEX · 2026 EDITION", title: "A cleaner way to browse the Hipobuy spreadsheet.",
    lead: "Search product finds, compare price snapshots and open the exact listing—then use the QC checklist before you approve anything for shipping.",
    searchLabel: "Search the full product index", searchPlaceholder: "Search shoes, hoodies, jerseys…", searchButton: "Search products",
    overview: "Sheet overview", categoriesMetric: "categories", rowsMetric: "featured rows", countriesMetric: "countries stated by app", storageMetric: "listed free storage",
    overviewNote: "Product prices are snapshots. Confirm the live listing, domestic delivery and final shipping quote before purchase.",
    sheetName: "hipobuy-finds-2026", verified: "6 verified page responses", featured: "Featured finds", allCategories: "All categories", qcTab: "QC checklist", shippingTab: "Shipping notes", searchSheet: "Search this sheet", all: "All",
    browseKicker: "Browse by category", browseTitle: "Jump straight to the right shelf.", browseIntro: "Each tile opens a focused product category. The directory keeps the same fast, spreadsheet-first navigation.",
    storageLabel: "Platform-listed storage", downloadsLabel: "Google Play downloads", countriesLabel: "Countries mentioned", deliveryLabel: "Fastest advertised delivery*",
    qcKicker: "Warehouse QC", qcTitle: "Approve with a checklist, not a feeling.", qcIntro: "Use the same review order for every item. A live link is only the beginning; warehouse photos should drive the final decision.",
    ruleLabel: "QC rule 01", ruleTitle: "Never approve from one angle alone.", ruleText: "Request a useful close-up or measurement when a supplied image cannot answer a material question.", ruleLink: "Read the full QC guide",
    shipKicker: "From link to parcel", shipTitle: "Five decisions. One clear flow.", shipIntro: "Keep product selection, warehouse review and international shipping as separate checkpoints.",
    guidesKicker: "Research notes", guidesTitle: "Useful guides, kept separate from the sheet.", guidesIntro: "Practical guides support the directory while keeping product rows quick to scan.",
    faqKicker: "Quick answers", faqTitle: "Know what the sheet can—and cannot—tell you.", faqBadge: "Independent resource · facts checked 14 Aug 2026",
  },
  pages: {
    spreadsheet: { kicker: "Live product sheet", title: "Searchable rows, exact product links.", intro: "Use the filters to narrow the sample directory. Every action opens the matching product page, not a generic marketplace homepage." },
    categories: { kicker: "Category index", title: "Ten focused ways into the catalogue.", intro: "Start with product intent instead of scrolling an endless mixed list. Every category opens the matching collection." },
    qc: { kicker: "Warehouse QC guide", title: "Turn warehouse photos into a decision.", intro: "Follow a fixed inspection order, separate objective defects from preference, and request evidence when a photo cannot answer the question." },
    shipping: { kicker: "Shipping guide", title: "Plan the parcel before choosing the route.", intro: "International shipping depends on chargeable weight, route restrictions, destination rules and packaging—not only the product price." },
    faq: { kicker: "Frequently asked questions", title: "Clear limits before you buy.", intro: "These answers separate directory information, platform claims and variables that must be confirmed at checkout." },
    articles: { kicker: "Buying guide library", title: "Practical Hipobuy guides for real purchase decisions.", intro: "Each topic answers one decision with a repeatable check, clear limits and useful next steps." },
  },
  categories: {
    shoes: ["Shoes", "Sneakers & boots"], hoodies: ["Hoodies", "Sweats & knitwear"], tshirts: ["T-Shirts", "Graphics & basics"], jackets: ["Jackets", "Outerwear"], pants: ["Pants", "Denim & shorts"], headwear: ["Headwear", "Caps & beanies"], accessories: ["Accessories", "Bags & extras"], jerseys: ["Jerseys", "Football & basketball"], electronics: ["Electronics", "Watches & devices"], all: ["All finds", "Full product index"],
  },
  qcSteps: [
    ["Variant match", "Confirm color, size and selected version before judging anything else.", "First"],
    ["Measurements", "Compare actual dimensions with a garment that already fits you.", "Fit"],
    ["Construction", "Review symmetry, stitching, edges, print placement and hardware.", "Build"],
    ["Damage & extras", "Look for marks, scratches, missing pieces and packaging issues.", "Final"],
  ],
  shipSteps: [
    ["Find", "Open the exact listing and recheck options."], ["Order", "Confirm item price, notes and domestic delivery."], ["Inspect", "Review warehouse photos before approval."], ["Consolidate", "Group suitable items and manage packaging."], ["Ship", "Compare weight, restrictions and route terms."],
  ],
  qcTips: [
    ["Request useful evidence", "Ask for a close-up, measurement or alternate angle only when it can change the keep/return decision."],
    ["Separate fit from finish", "A correct size label does not prove fit; a cosmetic variation does not always affect function."],
    ["Record the decision", "Keep the order option and warehouse evidence together so the final approval is traceable."],
  ],
  shippingFactors: [
    ["Actual weight", "The measured parcel weight after consolidation."], ["Volumetric weight", "A size-based calculation that can exceed actual weight."], ["Route restrictions", "Items, batteries, liquids and branded goods may limit available lines."], ["Destination rules", "Taxes, customs processes and delivery terms vary by country."],
  ],
  faqItems: [
    ["Is this the official Hipobuy website?", "No. This is an independent product-discovery and education resource. Confirm current product details and platform terms before ordering."],
    ["Are the USD prices final checkout prices?", "No. They are reference conversions from a CNY snapshot. Product price, domestic delivery, exchange rate and international shipping can change."],
    ["What does ‘link live’ mean?", "It means the linked page responded when checked. It does not guarantee stock, quality, seller reliability or suitability."],
    ["What should I check first in QC photos?", "Start with the ordered variant: color, size and version. Then compare measurements, construction and visible damage."],
    ["Does Hipobuy ship worldwide?", "The Google Play listing says the app serves more than 200 countries. A specific route still needs to be confirmed for the destination and item type."],
    ["How long is free warehouse storage?", "The current Google Play listing advertises 90 days of free storage. Confirm the live policy before relying on the full period."],
  ],
  articles: [
    ["Beginner", "How to buy with Hipobuy in 2026: product link to delivery", "A fact-checked, decision-by-decision guide to product choice, warehouse QC, consolidation and shipping."],
    ["Costs", "Hipobuy shipping cost explained: build a realistic total", "Compare chargeable weight, packaging, route limits and destination costs instead of one headline rate."],
    ["QC", "How to read Hipobuy QC photos before warehouse approval", "Use a repeatable inspection order for variants, measurements, construction and visible damage."],
    ["Shipping", "Hipobuy actual weight vs volumetric weight", "Understand which measurement may control the quote and which packaging changes are worth testing."],
    ["Warehouse", "How to use Hipobuy’s advertised 90-day storage window", "Plan consolidation, returns and a safety buffer without treating 90 days as a target."],
    ["Returns", "Hipobuy warehouse return checklist: evidence, timing and fees", "Document the mismatch, protect the deadline and confirm costs before requesting a return."],
    ["Review", "Hipobuy review 2026: what public app reviews actually say", "A balanced reading of app-store and review-site feedback, including the limits of public ratings."],
  ],
  pageExtras: {
    spreadsheetTitle: "How to use this sheet", spreadsheetItems: ["Filter by category before searching a brand or model.", "Treat every price as a dated snapshot, not a promise.", "Open the exact page and confirm variants before ordering."],
    categoriesTitle: "A better category route", categoriesItems: ["Use Shoes for sneakers and boots.", "Use Headwear for caps and beanies.", "Use All finds only when a focused category cannot answer the search."],
    qcTitle: "Three rules behind the checklist", shippingTitle: "Four variables behind a quote", articlesCta: "Read full article",
  },
};

const de = {
  nav: { home: "Startseite", spreadsheet: "Tabelle", categories: "Kategorien", qc: "QC-Ratgeber", shipping: "Versand", faq: "FAQ", articles: "Kaufratgeber" },
  common: {
    independent: "Unabhängiges Verzeichnis", checked: "Links geprüft am 14. Aug. 2026", review: "Veröffentlichter Index · aktualisiert am 14. Aug. 2026",
    openIndex: "Gesamten Index öffnen", language: "Sprache", back: "Nach oben", footer: "Unabhängige Produktsuche. Nicht mit Hipobuy oder den in Produktlisten genannten Marktplätzen verbunden.",
    updated: "Aktualisiert", source: "Quelle", usd: "USD-Referenz", status: "Status", checkedShort: "Geprüft", live: "Link aktiv", openProduct: "Produkt öffnen",
    product: "Produkt", category: "Kategorie", noResults: "Keine Zeilen entsprechen diesem Filter. Wähle eine andere Kategorie oder Suche.",
    priceNote: "USD-Werte sind Referenzumrechnungen, keine Endpreise.", shown: "Zeilen angezeigt", factsNote: "Plattformangaben geprüft am 14. August 2026. Routen, Bedingungen und Verfügbarkeit können abweichen.",
  },
  home: {
    overline: "HIPOBUY PRODUKTINDEX · AUSGABE 2026", title: "Die übersichtlichere Hipobuy-Tabelle.",
    lead: "Produkte suchen, Preisstände vergleichen und den exakten Eintrag öffnen – danach vor dem Versand die QC-Checkliste nutzen.",
    searchLabel: "Gesamten Produktindex durchsuchen", searchPlaceholder: "Schuhe, Hoodies, Trikots suchen…", searchButton: "Produkte suchen",
    overview: "Tabellenübersicht", categoriesMetric: "Kategorien", rowsMetric: "ausgewählte Zeilen", countriesMetric: "vom App-Eintrag genannte Länder", storageMetric: "angegebene Gratislagerung",
    overviewNote: "Preise sind Momentaufnahmen. Vor dem Kauf Eintrag, Inlandsversand und endgültiges Versandangebot prüfen.",
    sheetName: "hipobuy-fundstücke-2026", verified: "6 geprüfte Seitenantworten", featured: "Ausgewählte Produkte", allCategories: "Alle Kategorien", qcTab: "QC-Checkliste", shippingTab: "Versandhinweise", searchSheet: "Diese Tabelle durchsuchen", all: "Alle",
    browseKicker: "Nach Kategorie", browseTitle: "Direkt zum richtigen Bereich.", browseIntro: "Jede Kachel öffnet eine passende Produktkategorie. Die Navigation bleibt schnell und tabellenorientiert.",
    storageLabel: "Angegebene Lagerzeit", downloadsLabel: "Google-Play-Downloads", countriesLabel: "Genannte Länder", deliveryLabel: "Schnellste beworbene Lieferung*",
    qcKicker: "Lager-QC", qcTitle: "Mit Checkliste freigeben, nicht nach Gefühl.", qcIntro: "Prüfe jeden Artikel in derselben Reihenfolge. Ein aktiver Link ist nur der Anfang; Lagerfotos bestimmen die Entscheidung.",
    ruleLabel: "QC-Regel 01", ruleTitle: "Nie nach nur einem Blickwinkel freigeben.", ruleText: "Fordere eine Nahaufnahme oder Messung an, wenn das vorhandene Foto eine wichtige Frage nicht beantwortet.", ruleLink: "Vollständigen QC-Ratgeber lesen",
    shipKicker: "Vom Link zum Paket", shipTitle: "Fünf Entscheidungen. Ein klarer Ablauf.", shipIntro: "Produktauswahl, Lagerprüfung und internationalen Versand als getrennte Kontrollpunkte behandeln.",
    guidesKicker: "Recherche-Notizen", guidesTitle: "Nützliche Ratgeber getrennt von der Tabelle.", guidesIntro: "Praktische Ratgeber ergänzen das Verzeichnis, während die Produktzeilen schnell erfassbar bleiben.",
    faqKicker: "Kurze Antworten", faqTitle: "Wissen, was die Tabelle leisten kann – und was nicht.", faqBadge: "Unabhängige Quelle · Fakten geprüft am 14. Aug. 2026",
  },
  pages: {
    spreadsheet: { kicker: "Aktuelle Produkttabelle", title: "Durchsuchbare Zeilen, exakte Produktlinks.", intro: "Filtere das Beispielverzeichnis. Jede Aktion öffnet die passende Produktseite statt einer allgemeinen Startseite." },
    categories: { kicker: "Kategorieindex", title: "Zehn gezielte Wege in den Katalog.", intro: "Beginne mit der Produktabsicht statt mit einer endlosen Mischliste. Jede Kategorie öffnet die passende Sammlung." },
    qc: { kicker: "Lager-QC-Ratgeber", title: "Lagerfotos in eine Entscheidung verwandeln.", intro: "Feste Prüfreihenfolge nutzen, objektive Mängel von Vorlieben trennen und Belege anfordern, wenn ein Foto nicht reicht." },
    shipping: { kicker: "Versandratgeber", title: "Paket planen, bevor die Route gewählt wird.", intro: "Internationaler Versand hängt von Abrechnungsgewicht, Einschränkungen, Zielland und Verpackung ab – nicht nur vom Produktpreis." },
    faq: { kicker: "Häufige Fragen", title: "Klare Grenzen vor dem Kauf.", intro: "Die Antworten trennen Verzeichnisangaben, Plattformversprechen und Variablen, die beim Checkout bestätigt werden müssen." },
    articles: { kicker: "Bibliothek der Kaufratgeber", title: "Praktische Hipobuy-Ratgeber für echte Kaufentscheidungen.", intro: "Jedes Thema beantwortet eine Entscheidung mit klaren Prüfschritten, Grenzen und nächsten Schritten." },
  },
  categories: {
    shoes: ["Schuhe", "Sneaker & Stiefel"], hoodies: ["Hoodies", "Sweats & Strick"], tshirts: ["T-Shirts", "Grafiken & Basics"], jackets: ["Jacken", "Oberbekleidung"], pants: ["Hosen", "Denim & Shorts"], headwear: ["Kopfbedeckung", "Caps & Mützen"], accessories: ["Accessoires", "Taschen & Extras"], jerseys: ["Trikots", "Fußball & Basketball"], electronics: ["Elektronik", "Uhren & Geräte"], all: ["Alle Produkte", "Vollständiger Produktindex"],
  },
  qcSteps: [
    ["Variante prüfen", "Farbe, Größe und gewählte Version zuerst bestätigen.", "Zuerst"], ["Maße", "Tatsächliche Maße mit einem gut passenden Kleidungsstück vergleichen.", "Passform"], ["Verarbeitung", "Symmetrie, Nähte, Kanten, Druck und Beschläge prüfen.", "Aufbau"], ["Schäden & Zubehör", "Flecken, Kratzer, fehlende Teile und Verpackung prüfen.", "Final"],
  ],
  shipSteps: [
    ["Finden", "Exakten Eintrag öffnen und Optionen erneut prüfen."], ["Bestellen", "Preis, Hinweise und Inlandsversand bestätigen."], ["Prüfen", "Lagerfotos vor der Freigabe kontrollieren."], ["Bündeln", "Passende Artikel zusammenfassen und Verpackung planen."], ["Versenden", "Gewicht, Einschränkungen und Routenbedingungen vergleichen."],
  ],
  qcTips: [
    ["Nützliche Belege anfordern", "Nahaufnahme, Messung oder weiteren Winkel nur anfordern, wenn dies die Behalten-/Rückgabeentscheidung ändern kann."], ["Passform und Finish trennen", "Ein korrektes Größenetikett beweist keine Passform; eine optische Abweichung beeinträchtigt nicht immer die Funktion."], ["Entscheidung dokumentieren", "Bestelloption und Lagerbelege zusammenhalten, damit die Freigabe nachvollziehbar bleibt."],
  ],
  shippingFactors: [
    ["Tatsächliches Gewicht", "Gemessenes Paketgewicht nach dem Bündeln."], ["Volumengewicht", "Größenbasierte Berechnung, die höher sein kann."], ["Routenbeschränkungen", "Artikel, Batterien, Flüssigkeiten und Markenware können Linien einschränken."], ["Ziellandregeln", "Steuern, Zoll und Lieferbedingungen unterscheiden sich."],
  ],
  faqItems: [
    ["Ist dies die offizielle Hipobuy-Website?", "Nein. Dies ist eine unabhängige Produktsuche und Informationsquelle. Aktuelle Produktdetails und Bedingungen vor der Bestellung bestätigen."], ["Sind die USD-Preise endgültig?", "Nein. Es sind Referenzumrechnungen eines CNY-Preisstands. Produktpreis, Inlandsversand, Wechselkurs und internationaler Versand können sich ändern."], ["Was bedeutet ‚Link aktiv‘?", "Die verlinkte Seite hat bei der Prüfung geantwortet. Das garantiert weder Bestand noch Qualität, Verkäuferzuverlässigkeit oder Eignung."], ["Was prüfe ich zuerst auf QC-Fotos?", "Mit der bestellten Variante beginnen: Farbe, Größe und Version. Danach Maße, Verarbeitung und sichtbare Schäden prüfen."], ["Versendet Hipobuy weltweit?", "Der Google-Play-Eintrag nennt mehr als 200 Länder. Eine konkrete Route muss dennoch für Ziel und Artikeltyp bestätigt werden."], ["Wie lange ist die kostenlose Lagerung?", "Der aktuelle Google-Play-Eintrag wirbt mit 90 Tagen. Vor Nutzung der gesamten Frist die aktuelle Richtlinie prüfen."],
  ],
  articles: [
    ["Einsteiger", "Mit Hipobuy kaufen: vom Produktlink bis zur Lieferung", "Faktengeprüfter Ablauf für Auswahl, Lager-QC, Bündelung und Versand."], ["Kosten", "Hipobuy-Versandkosten erklärt: realistische Gesamtkosten", "Abrechnungsgewicht, Verpackung, Routenlimits und Zielkosten statt nur einer Lockrate vergleichen."], ["QC", "Hipobuy-QC-Fotos vor der Lagerfreigabe lesen", "Feste Prüfreihenfolge für Variante, Maße, Verarbeitung und sichtbare Schäden."], ["Versand", "Hipobuy: Istgewicht oder Volumengewicht", "Verstehen, welcher Wert das Angebot bestimmen kann und welche Verpackungsänderung sich lohnt."], ["Lager", "Das beworbene 90-Tage-Lagerfenster von Hipobuy nutzen", "Bündelung, Rückgaben und Sicherheitspuffer planen, ohne 90 Tage zum Ziel zu machen."], ["Rückgabe", "Hipobuy-Lagerrückgabe: Belege, Fristen und Gebühren", "Abweichung dokumentieren, Frist schützen und Kosten vor der Rückgabe bestätigen."], ["Bewertung", "Hipobuy Test 2026: Was öffentliche App-Bewertungen wirklich sagen", "Ausgewogene Auswertung von App-Store- und Bewertungsfeedback samt Grenzen öffentlicher Ratings."],
  ],
  pageExtras: {
    spreadsheetTitle: "So nutzt du die Tabelle", spreadsheetItems: ["Vor der Markensuche nach Kategorie filtern.", "Jeden Preis als datierte Momentaufnahme behandeln.", "Exakten Eintrag und Varianten vor der Bestellung prüfen."], categoriesTitle: "Der bessere Kategoriepfad", categoriesItems: ["Schuhe für Sneaker und Stiefel nutzen.", "Kopfbedeckung für Caps und Mützen nutzen.", "Alle Produkte nur öffnen, wenn eine Kategorie nicht reicht."], qcTitle: "Drei Regeln hinter der Checkliste", shippingTitle: "Vier Variablen hinter einem Angebot", articlesCta: "Vollständigen Artikel lesen",
  },
};

const es = {
  nav: { home: "Inicio", spreadsheet: "Hoja", categories: "Categorías", qc: "Guía QC", shipping: "Envío", faq: "Preguntas", articles: "Guías de compra" },
  common: {
    independent: "Directorio independiente", checked: "Enlaces revisados el 14 ago 2026", review: "Índice publicado · actualizado el 14 ago 2026", openIndex: "Abrir índice completo", language: "Idioma", back: "Volver arriba", footer: "Recurso independiente para descubrir productos. No está afiliado con Hipobuy ni con los mercados citados.", updated: "Actualizado", source: "Origen", usd: "Ref. USD", status: "Estado", checkedShort: "Revisado", live: "Enlace activo", openProduct: "Abrir producto", product: "Producto", category: "Categoría", noResults: "Ninguna fila coincide. Prueba otra categoría o búsqueda.", priceNote: "Los valores USD son conversiones orientativas, no precios finales.", shown: "filas mostradas", factsNote: "Información declarada por la plataforma y revisada el 14 de agosto de 2026. Las rutas y condiciones pueden variar.",
  },
  home: {
    overline: "ÍNDICE DE PRODUCTOS HIPOBUY · EDICIÓN 2026", title: "Una forma más clara de explorar la hoja Hipobuy.", lead: "Busca productos, compara precios de referencia y abre el anuncio exacto; después usa la lista QC antes de autorizar el envío.", searchLabel: "Buscar en el índice completo", searchPlaceholder: "Buscar zapatillas, sudaderas, camisetas…", searchButton: "Buscar productos", overview: "Resumen de la hoja", categoriesMetric: "categorías", rowsMetric: "filas destacadas", countriesMetric: "países indicados por la app", storageMetric: "almacenamiento gratis indicado", overviewNote: "Los precios son capturas. Confirma el anuncio, el envío nacional y la cotización final antes de comprar.", sheetName: "hallazgos-hipobuy-2026", verified: "6 páginas verificadas", featured: "Hallazgos destacados", allCategories: "Todas las categorías", qcTab: "Lista QC", shippingTab: "Notas de envío", searchSheet: "Buscar en esta hoja", all: "Todo", browseKicker: "Explorar por categoría", browseTitle: "Ve directo a la sección correcta.", browseIntro: "Cada tarjeta abre una categoría concreta. La navegación se mantiene rápida y centrada en la hoja.", storageLabel: "Almacenamiento indicado", downloadsLabel: "Descargas en Google Play", countriesLabel: "Países mencionados", deliveryLabel: "Entrega más rápida anunciada*", qcKicker: "QC de almacén", qcTitle: "Aprueba con una lista, no por intuición.", qcIntro: "Usa el mismo orden en cada artículo. Un enlace activo es solo el comienzo; las fotos del almacén determinan la decisión.", ruleLabel: "Regla QC 01", ruleTitle: "Nunca apruebes con un solo ángulo.", ruleText: "Pide un primer plano o una medida cuando la foto disponible no resuelva una cuestión importante.", ruleLink: "Leer la guía QC completa", shipKicker: "Del enlace al paquete", shipTitle: "Cinco decisiones. Un flujo claro.", shipIntro: "Separa la elección del producto, la revisión de almacén y el envío internacional.", guidesKicker: "Notas de investigación", guidesTitle: "Guías útiles separadas de la hoja.", guidesIntro: "Las guías prácticas complementan el directorio sin ocultar los productos bajo textos largos.", faqKicker: "Respuestas rápidas", faqTitle: "Conoce lo que la hoja puede —y no puede— decirte.", faqBadge: "Recurso independiente · datos revisados el 14 ago 2026",
  },
  pages: {
    spreadsheet: { kicker: "Hoja de productos", title: "Filas buscables y enlaces exactos.", intro: "Usa los filtros para acotar el directorio. Cada acción abre la página concreta del producto." }, categories: { kicker: "Índice de categorías", title: "Diez entradas claras al catálogo.", intro: "Empieza por la intención de producto y no por una lista mixta interminable." }, qc: { kicker: "Guía QC de almacén", title: "Convierte las fotos del almacén en una decisión.", intro: "Sigue un orden fijo, separa defectos objetivos de preferencias y pide pruebas cuando falten datos." }, shipping: { kicker: "Guía de envío", title: "Planifica el paquete antes de elegir la ruta.", intro: "El envío depende del peso facturable, restricciones, destino y embalaje, no solo del precio." }, faq: { kicker: "Preguntas frecuentes", title: "Límites claros antes de comprar.", intro: "Estas respuestas separan datos del directorio, afirmaciones de la plataforma y variables del checkout." }, articles: { kicker: "Biblioteca de guías", title: "Guías prácticas de Hipobuy para decisiones reales.", intro: "Cada tema ofrece comprobaciones, límites y próximos pasos claros para una decisión concreta." },
  },
  categories: { shoes: ["Calzado", "Zapatillas y botas"], hoodies: ["Sudaderas", "Sudaderas y punto"], tshirts: ["Camisetas", "Gráficos y básicos"], jackets: ["Chaquetas", "Ropa exterior"], pants: ["Pantalones", "Denim y shorts"], headwear: ["Gorras", "Gorras y gorros"], accessories: ["Accesorios", "Bolsos y extras"], jerseys: ["Camisetas deportivas", "Fútbol y baloncesto"], electronics: ["Electrónica", "Relojes y dispositivos"], all: ["Todos", "Índice completo"] },
  qcSteps: [["Comprobar variante", "Confirma color, talla y versión elegida antes de todo.", "Primero"], ["Medidas", "Compara dimensiones reales con una prenda que te quede bien.", "Ajuste"], ["Construcción", "Revisa simetría, costuras, bordes, estampado y herrajes.", "Acabado"], ["Daños y extras", "Busca manchas, arañazos, piezas ausentes y embalaje.", "Final"]],
  shipSteps: [["Encontrar", "Abre el anuncio exacto y revisa opciones."], ["Pedir", "Confirma precio, notas y envío nacional."], ["Inspeccionar", "Revisa las fotos antes de aprobar."], ["Consolidar", "Agrupa artículos y gestiona el embalaje."], ["Enviar", "Compara peso, restricciones y condiciones."]],
  qcTips: [["Pide pruebas útiles", "Solicita un primer plano, medida u otro ángulo solo si cambia la decisión."], ["Separa ajuste y acabado", "Una etiqueta correcta no demuestra el ajuste; una variación estética no siempre afecta la función."], ["Documenta la decisión", "Mantén juntas la opción pedida y las pruebas del almacén."]],
  shippingFactors: [["Peso real", "Peso medido tras la consolidación."], ["Peso volumétrico", "Cálculo por tamaño que puede superar el peso real."], ["Restricciones", "Baterías, líquidos y marcas pueden limitar rutas."], ["Reglas del destino", "Impuestos, aduanas y entrega varían por país."]],
  faqItems: [["¿Es la web oficial de Hipobuy?", "No. Es un recurso independiente. Confirma detalles y condiciones actuales antes de pedir."], ["¿Los precios USD son finales?", "No. Son conversiones orientativas de una captura en CNY; precio, envío y cambio pueden variar."], ["¿Qué significa ‘enlace activo’?", "La página respondió al revisarla. No garantiza stock, calidad ni fiabilidad."], ["¿Qué reviso primero en las fotos QC?", "Empieza por color, talla y versión; luego medidas, construcción y daños."], ["¿Hipobuy envía a todo el mundo?", "Google Play indica más de 200 países. Aun así, confirma una ruta para el destino y tipo de artículo."], ["¿Cuánto dura el almacenamiento gratuito?", "La ficha actual anuncia 90 días. Confirma la política vigente antes de usar todo el periodo."]],
  articles: [["Principiantes", "Cómo comprar con Hipobuy en 2026: del enlace a la entrega", "Guía contrastada para elegir, revisar en almacén, consolidar y enviar."], ["Costes", "Coste de envío de Hipobuy: calcula un total realista", "Compara peso facturable, embalaje, límites de ruta y costes de destino."], ["QC", "Cómo leer las fotos QC de Hipobuy antes de aprobar", "Orden repetible para variante, medidas, acabado y daños visibles."], ["Envío", "Hipobuy: peso real frente a peso volumétrico", "Entiende qué valor puede controlar la cotización y qué cambios de embalaje probar."], ["Almacén", "Cómo usar los 90 días de almacenamiento anunciados", "Planifica consolidación, devoluciones y un margen de seguridad sin esperar por sistema."], ["Devoluciones", "Devolución en almacén Hipobuy: pruebas, plazos y tasas", "Documenta la diferencia, protege el plazo y confirma costes."], ["Reseña", "Hipobuy review 2026: qué dicen realmente las opiniones públicas", "Lectura equilibrada de reseñas en tiendas y portales, con sus límites."],],
  pageExtras: { spreadsheetTitle: "Cómo usar esta hoja", spreadsheetItems: ["Filtra por categoría antes de buscar una marca.", "Trata cada precio como una captura fechada.", "Confirma variantes en la página exacta."], categoriesTitle: "Una mejor ruta por categorías", categoriesItems: ["Usa Calzado para zapatillas y botas.", "Usa Gorras para gorras y gorros.", "Abre Todos solo si una categoría no basta."], qcTitle: "Tres reglas tras la lista", shippingTitle: "Cuatro variables de una cotización", articlesCta: "Leer artículo completo" },
};

const it = {
  nav: { home: "Home", spreadsheet: "Foglio", categories: "Categorie", qc: "Guida QC", shipping: "Spedizione", faq: "FAQ", articles: "Guide all’acquisto" },
  common: { independent: "Directory indipendente", checked: "Link controllati il 14 ago 2026", review: "Indice pubblicato · aggiornato il 14 ago 2026", openIndex: "Apri indice completo", language: "Lingua", back: "Torna su", footer: "Risorsa indipendente per la scoperta di prodotti. Non affiliata a Hipobuy o ai marketplace citati.", updated: "Aggiornato", source: "Fonte", usd: "Rif. USD", status: "Stato", checkedShort: "Controllato", live: "Link attivo", openProduct: "Apri prodotto", product: "Prodotto", category: "Categoria", noResults: "Nessuna riga corrisponde. Prova un altro filtro.", priceNote: "I valori USD sono conversioni indicative, non prezzi finali.", shown: "righe mostrate", factsNote: "Informazioni dichiarate dalla piattaforma e controllate il 14 agosto 2026. Rotte e condizioni possono variare." },
  home: { overline: "LISTA PRODOTTI HIPOBUY · EDIZIONE 2026", title: "Lista Hipobuy 2026: prodotti, prezzi e link verificati.", lead: "Consulta la lista Hipobuy 2026 con prodotti, prezzi indicativi e link verificati. Filtra per categoria e controlla foto QC e spedizione prima dell’acquisto.", searchLabel: "Cerca nell’indice completo", searchPlaceholder: "Cerca scarpe, felpe, maglie…", searchButton: "Cerca prodotti", overview: "Panoramica foglio", categoriesMetric: "categorie", rowsMetric: "righe in evidenza", countriesMetric: "paesi indicati dall’app", storageMetric: "deposito gratuito indicato", overviewNote: "I prezzi sono istantanee. Controlla inserzione, spedizione interna e preventivo finale.", sheetName: "prodotti-hipobuy-2026", verified: "6 pagine verificate", featured: "Prodotti in evidenza", allCategories: "Tutte le categorie", qcTab: "Checklist QC", shippingTab: "Note di spedizione", searchSheet: "Cerca in questo foglio", all: "Tutti", browseKicker: "Sfoglia per categoria", browseTitle: "Vai subito allo scaffale giusto.", browseIntro: "Ogni riquadro apre una categoria mirata, con navigazione rapida e centrata sul foglio.", storageLabel: "Deposito indicato", downloadsLabel: "Download Google Play", countriesLabel: "Paesi menzionati", deliveryLabel: "Consegna più rapida pubblicizzata*", qcKicker: "QC di magazzino", qcTitle: "Approva con una checklist, non a intuito.", qcIntro: "Usa lo stesso ordine per ogni articolo. Un link attivo è solo l’inizio; le foto di magazzino guidano la decisione.", ruleLabel: "Regola QC 01", ruleTitle: "Non approvare mai da una sola angolazione.", ruleText: "Chiedi un dettaglio o una misura quando la foto non risponde a una domanda importante.", ruleLink: "Leggi la guida QC completa", shipKicker: "Dal link al pacco", shipTitle: "Cinque decisioni. Un flusso chiaro.", shipIntro: "Tieni separate scelta, controllo in magazzino e spedizione internazionale.", guidesKicker: "Guide pratiche", guidesTitle: "Approfondisci prima di approvare e spedire.", guidesIntro: "Le guide completano la lista prodotti con controlli ripetibili per foto QC, peso, imballaggio e resi.", faqKicker: "Risposte rapide", faqTitle: "Sapere cosa il foglio può — e non può — dirti.", faqBadge: "Risorsa indipendente · pagina aggiornata il 2 set 2026" },
  pages: { spreadsheet: { kicker: "Foglio prodotti", title: "Righe ricercabili, link esatti.", intro: "Usa i filtri per restringere la directory. Ogni azione apre la pagina precisa del prodotto." }, categories: { kicker: "Indice categorie", title: "Dieci accessi mirati al catalogo.", intro: "Parti dall’intento di prodotto invece di scorrere una lista mista infinita." }, qc: { kicker: "Guida QC magazzino", title: "Trasforma le foto in una decisione.", intro: "Segui un ordine fisso, separa difetti oggettivi da preferenze e chiedi prove quando servono." }, shipping: { kicker: "Costi e spedizione", title: "Costi di spedizione Hipobuy: stima il totale prima di pagare.", intro: "Calcola peso reale e volumetrico, valuta imballaggio, restrizioni, dogana e tempi prima di confrontare le rotte disponibili per l’Italia." }, faq: { kicker: "Domande frequenti", title: "Limiti chiari prima dell’acquisto.", intro: "Le risposte separano dati della directory, dichiarazioni della piattaforma e variabili del checkout." }, articles: { kicker: "Guide all’acquisto", title: "Guide Hipobuy pratiche per decisioni reali.", intro: "Ogni argomento offre controlli, limiti e prossimi passi chiari per una decisione concreta." } },
  categories: { shoes: ["Scarpe", "Sneaker e stivali"], hoodies: ["Felpe", "Felpe e maglieria"], tshirts: ["T-shirt", "Grafiche e basic"], jackets: ["Giacche", "Capispalla"], pants: ["Pantaloni", "Denim e shorts"], headwear: ["Copricapi", "Cappelli e berretti"], accessories: ["Accessori", "Borse ed extra"], jerseys: ["Maglie sportive", "Calcio e basket"], electronics: ["Elettronica", "Orologi e dispositivi"], all: ["Tutti i prodotti", "Indice completo"] },
  qcSteps: [["Verifica variante", "Conferma colore, taglia e versione prima di tutto.", "Prima"], ["Misure", "Confronta le dimensioni reali con un capo che veste bene.", "Vestibilità"], ["Costruzione", "Controlla simmetria, cuciture, bordi, stampa e hardware.", "Finitura"], ["Danni ed extra", "Cerca macchie, graffi, parti mancanti e problemi di imballo.", "Finale"]],
  shipSteps: [["Trova", "Apri l’inserzione esatta e ricontrolla le opzioni."], ["Ordina", "Conferma prezzo, note e consegna interna."], ["Controlla", "Esamina le foto prima di approvare."], ["Consolida", "Raggruppa articoli e gestisci l’imballo."], ["Spedisci", "Confronta peso, restrizioni e condizioni."]],
  qcTips: [["Chiedi prove utili", "Richiedi dettaglio, misura o altra angolazione solo se può cambiare la decisione."], ["Separa vestibilità e finitura", "L’etichetta corretta non prova la vestibilità; una variazione estetica non cambia sempre la funzione."], ["Documenta la decisione", "Conserva insieme opzione ordinata e prove di magazzino."]],
  shippingFactors: [["Peso reale", "Usa il peso misurato sul pacco consolidato, non la somma delle schede prodotto."], ["Peso volumetrico", "Confronta le dimensioni finali: una scatola leggera ma grande può aumentare il peso fatturabile."], ["Restrizioni di rotta", "Verifica prima batterie, liquidi, magneti e categorie di marchi accettate dalla linea."], ["Regole del paese", "Controlla cosa include la rotta e quali imposte, documenti o oneri possono spettare al destinatario."]],
  faqItems: [["È il sito ufficiale Hipobuy?", "No. È una risorsa indipendente. Conferma dettagli e condizioni prima dell’ordine."], ["I prezzi USD sono finali?", "No. Sono conversioni indicative da una rilevazione in CNY; prezzi e spedizioni possono cambiare."], ["Cosa significa ‘link attivo’?", "La pagina ha risposto al controllo. Non garantisce disponibilità, qualità o affidabilità."], ["Cosa controllo prima nelle foto QC?", "Inizia da colore, taglia e versione; poi misure, costruzione e danni."], ["Hipobuy spedisce in tutto il mondo?", "Google Play indica oltre 200 paesi. Conferma comunque la rotta per destinazione e tipo di articolo."], ["Quanto dura il deposito gratuito?", "La scheda attuale pubblicizza 90 giorni. Controlla la politica prima di usare l’intero periodo."]],
  articles: [["Principianti", "Come acquistare con Hipobuy nel 2026: dal link alla consegna", "Guida verificata per scelta, QC in magazzino, consolidamento e spedizione."], ["Costi", "Costo di spedizione Hipobuy: costruire un totale realistico", "Confronta peso fatturabile, imballo, limiti di rotta e costi a destinazione."], ["QC", "Foto QC Hipobuy: cosa controllare prima dell’approvazione", "Controlla variante, misure, cuciture, stampe, danni e accessori nelle foto QC Hipobuy prima di approvare o chiedere il reso."], ["Spedizione", "Hipobuy: peso reale contro peso volumetrico", "Capisci quale valore può controllare il preventivo e quali modifiche testare."], ["Magazzino", "Come usare i 90 giorni di deposito pubblicizzati", "Pianifica consolidamento, resi e margine senza aspettare per abitudine."], ["Resi", "Reso dal magazzino Hipobuy: prove, tempi e commissioni", "Documenta la differenza, proteggi la scadenza e conferma i costi."], ["Recensione", "Hipobuy review 2026: cosa dicono davvero le recensioni pubbliche", "Lettura equilibrata di store e portali, con i limiti dei rating pubblici."],],
  pageExtras: { spreadsheetTitle: "Come usare il foglio", spreadsheetItems: ["Filtra per categoria prima di cercare un marchio.", "Tratta ogni prezzo come un’istantanea datata.", "Conferma le varianti nella pagina esatta."], categoriesTitle: "Un percorso migliore", categoriesItems: ["Usa Scarpe per sneaker e stivali.", "Usa Copricapi per cappelli e berretti.", "Apri Tutti solo se una categoria non basta."], qcTitle: "Tre regole dietro la checklist", shippingTitle: "Le quattro variabili da verificare per prime", articlesCta: "Leggi articolo completo" },
};

const pl = {
  nav: { home: "Start", spreadsheet: "Arkusz", categories: "Kategorie", qc: "Poradnik QC", shipping: "Wysyłka", faq: "FAQ", articles: "Poradniki zakupowe" },
  common: { independent: "Niezależny katalog", checked: "Linki sprawdzone 14 sie 2026", review: "Opublikowany indeks · aktualizacja 14 sie 2026", openIndex: "Otwórz pełny indeks", language: "Język", back: "Do góry", footer: "Niezależne źródło odkrywania produktów. Nie jest powiązane z Hipobuy ani wymienionymi platformami.", updated: "Zaktualizowano", source: "Źródło", usd: "USD orient.", status: "Status", checkedShort: "Sprawdzono", live: "Link działa", openProduct: "Otwórz produkt", product: "Produkt", category: "Kategoria", noResults: "Brak pasujących wierszy. Zmień filtr lub wyszukiwanie.", priceNote: "Kwoty USD są przeliczeniem orientacyjnym, nie ceną końcową.", shown: "wyświetlonych wierszy", factsNote: "Informacje platformy sprawdzone 14 sierpnia 2026. Trasy i warunki mogą się różnić." },
  home: { overline: "INDEKS PRODUKTÓW HIPOBUY · EDYCJA 2026", title: "Czytelniejszy sposób przeglądania arkusza Hipobuy.", lead: "Wyszukuj produkty, porównuj ceny orientacyjne i otwieraj dokładne oferty, a przed wysyłką użyj listy QC.", searchLabel: "Przeszukaj pełny indeks", searchPlaceholder: "Szukaj butów, bluz, koszulek…", searchButton: "Szukaj produktów", overview: "Podsumowanie arkusza", categoriesMetric: "kategorii", rowsMetric: "wyróżnionych wierszy", countriesMetric: "krajów podanych przez aplikację", storageMetric: "deklarowanego darmowego magazynu", overviewNote: "Ceny są migawką. Przed zakupem sprawdź ofertę, wysyłkę krajową i ostateczną wycenę.", sheetName: "znaleziska-hipobuy-2026", verified: "6 sprawdzonych stron", featured: "Wyróżnione produkty", allCategories: "Wszystkie kategorie", qcTab: "Lista QC", shippingTab: "Uwagi o wysyłce", searchSheet: "Szukaj w arkuszu", all: "Wszystkie", browseKicker: "Przeglądaj kategoriami", browseTitle: "Przejdź prosto do właściwej półki.", browseIntro: "Każda karta otwiera właściwą kategorię. Nawigacja pozostaje szybka i oparta na arkuszu.", storageLabel: "Deklarowany magazyn", downloadsLabel: "Pobrania Google Play", countriesLabel: "Wymienione kraje", deliveryLabel: "Najszybsza reklamowana dostawa*", qcKicker: "QC w magazynie", qcTitle: "Zatwierdzaj listą, nie przeczuciem.", qcIntro: "Stosuj tę samą kolejność dla każdego produktu. Działający link to początek; zdjęcia magazynowe decydują.", ruleLabel: "Zasada QC 01", ruleTitle: "Nigdy nie zatwierdzaj na podstawie jednego ujęcia.", ruleText: "Poproś o zbliżenie lub pomiar, gdy zdjęcie nie odpowiada na ważne pytanie.", ruleLink: "Przeczytaj pełny poradnik QC", shipKicker: "Od linku do paczki", shipTitle: "Pięć decyzji. Jeden jasny proces.", shipIntro: "Oddziel wybór produktu, kontrolę magazynową i wysyłkę międzynarodową.", guidesKicker: "Notatki badawcze", guidesTitle: "Przydatne poradniki poza arkuszem.", guidesIntro: "Praktyczne poradniki uzupełniają katalog, a wiersze produktów pozostają łatwe do przejrzenia.", faqKicker: "Szybkie odpowiedzi", faqTitle: "Wiedz, co arkusz może — i czego nie może — powiedzieć.", faqBadge: "Niezależne źródło · dane sprawdzone 14 sie 2026" },
  pages: { spreadsheet: { kicker: "Arkusz produktów", title: "Wyszukiwalne wiersze i dokładne linki.", intro: "Filtruj przykładowy katalog. Każda akcja otwiera dokładną stronę produktu." }, categories: { kicker: "Indeks kategorii", title: "Dziesięć celnych wejść do katalogu.", intro: "Zacznij od typu produktu zamiast przewijać nieskończoną listę mieszaną." }, qc: { kicker: "Poradnik QC magazynu", title: "Zamień zdjęcia magazynowe w decyzję.", intro: "Stosuj stałą kolejność, oddziel wady od preferencji i proś o dowody, gdy zdjęcie nie wystarcza." }, shipping: { kicker: "Poradnik wysyłki", title: "Zaplanuj paczkę przed wyborem trasy.", intro: "Wysyłka zależy od wagi rozliczeniowej, ograniczeń, kraju i opakowania, nie tylko ceny produktu." }, faq: { kicker: "Najczęstsze pytania", title: "Jasne ograniczenia przed zakupem.", intro: "Odpowiedzi rozdzielają dane katalogu, deklaracje platformy i zmienne do potwierdzenia przy płatności." }, articles: { kicker: "Biblioteka poradników", title: "Praktyczne poradniki Hipobuy dla realnych decyzji.", intro: "Każdy temat przedstawia jasne kontrole, ograniczenia i kolejne kroki dla jednej decyzji." } },
  categories: { shoes: ["Buty", "Sneakersy i kozaki"], hoodies: ["Bluzy", "Bluzy i dzianiny"], tshirts: ["T-shirty", "Grafiki i podstawy"], jackets: ["Kurtki", "Odzież wierzchnia"], pants: ["Spodnie", "Jeansy i szorty"], headwear: ["Nakrycia głowy", "Czapki z daszkiem i zimowe"], accessories: ["Akcesoria", "Torby i dodatki"], jerseys: ["Koszulki sportowe", "Piłka nożna i koszykówka"], electronics: ["Elektronika", "Zegarki i urządzenia"], all: ["Wszystkie produkty", "Pełny indeks"] },
  qcSteps: [["Zgodność wariantu", "Najpierw potwierdź kolor, rozmiar i wersję.", "Najpierw"], ["Wymiary", "Porównaj realne wymiary z pasującym ubraniem.", "Dopasowanie"], ["Wykonanie", "Sprawdź symetrię, szwy, krawędzie, nadruk i okucia.", "Budowa"], ["Uszkodzenia i dodatki", "Szukaj plam, zarysowań, braków i problemów opakowania.", "Finał"]],
  shipSteps: [["Znajdź", "Otwórz dokładną ofertę i ponownie sprawdź opcje."], ["Zamów", "Potwierdź cenę, uwagi i wysyłkę krajową."], ["Sprawdź", "Przejrzyj zdjęcia przed zatwierdzeniem."], ["Połącz", "Połącz odpowiednie rzeczy i zaplanuj opakowanie."], ["Wyślij", "Porównaj wagę, ograniczenia i warunki trasy."]],
  qcTips: [["Proś o przydatne dowody", "Poproś o zbliżenie, pomiar lub inne ujęcie tylko wtedy, gdy może to zmienić decyzję."], ["Oddziel dopasowanie od wykończenia", "Poprawna metka nie dowodzi dopasowania; różnica wizualna nie zawsze wpływa na funkcję."], ["Zapisz decyzję", "Trzymaj zamówiony wariant i dowody z magazynu razem."]],
  shippingFactors: [["Waga rzeczywista", "Waga paczki po konsolidacji."], ["Waga objętościowa", "Obliczenie z wymiarów, które może być wyższe."], ["Ograniczenia tras", "Baterie, płyny i marki mogą ograniczać linie."], ["Przepisy kraju", "Podatki, odprawa i dostawa różnią się."]],
  faqItems: [["Czy to oficjalna strona Hipobuy?", "Nie. To niezależne źródło. Przed zamówieniem sprawdź aktualne dane i warunki."], ["Czy ceny USD są końcowe?", "Nie. To przeliczenia orientacyjne z ceny CNY; ceny i wysyłka mogą się zmienić."], ["Co oznacza ‘link działa’?", "Strona odpowiedziała podczas kontroli. Nie gwarantuje stanu, jakości ani wiarygodności."], ["Co najpierw sprawdzić na zdjęciach QC?", "Zacznij od koloru, rozmiaru i wersji; potem wymiary, wykonanie i uszkodzenia."], ["Czy Hipobuy wysyła na cały świat?", "Google Play podaje ponad 200 krajów. Potwierdź jednak trasę dla kraju i rodzaju produktu."], ["Ile trwa darmowe przechowywanie?", "Aktualna karta aplikacji reklamuje 90 dni. Sprawdź politykę przed wykorzystaniem całego okresu."]],
  articles: [["Początkujący", "Jak kupować przez Hipobuy w 2026: od linku do dostawy", "Sprawdzony przewodnik po wyborze, QC, konsolidacji i wysyłce."], ["Koszty", "Koszt wysyłki Hipobuy: zbuduj realistyczny budżet", "Porównaj wagę rozliczeniową, opakowanie, limity trasy i koszty kraju."], ["QC", "Jak czytać zdjęcia QC Hipobuy przed zatwierdzeniem", "Stała kolejność dla wariantu, wymiarów, wykonania i widocznych wad."], ["Wysyłka", "Hipobuy: waga rzeczywista a objętościowa", "Zrozum, która wartość może sterować wyceną i jakie zmiany opakowania testować."], ["Magazyn", "Jak wykorzystać reklamowane 90 dni magazynowania", "Zaplanuj konsolidację, zwroty i bufor bez czekania dla samego czekania."], ["Zwroty", "Zwrot z magazynu Hipobuy: dowody, terminy i opłaty", "Udokumentuj różnicę, chroń termin i potwierdź koszty."], ["Recenzja", "Hipobuy review 2026: co naprawdę mówią publiczne opinie", "Wyważona analiza ocen ze sklepów i portali wraz z ich ograniczeniami."],],
  pageExtras: { spreadsheetTitle: "Jak korzystać z arkusza", spreadsheetItems: ["Filtruj kategorią przed szukaniem marki.", "Traktuj cenę jako datowaną migawkę.", "Potwierdź wariant na dokładnej stronie."], categoriesTitle: "Lepsza droga przez kategorie", categoriesItems: ["Buty służą do sneakersów i kozaków.", "Nakrycia głowy obejmują czapki.", "Wszystkie produkty otwieraj tylko, gdy kategoria nie wystarcza."], qcTitle: "Trzy zasady listy QC", shippingTitle: "Cztery zmienne wyceny", articlesCta: "Czytaj pełny artykuł" },
};

export const copies = { en, de, es, it, pl };

export function pageHref(lang: Lang, page: PageKey) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  if (page === "home") return `${prefix || "/"}${prefix ? "/" : ""}`;
  const slug = page === "qc" ? "qc-guide" : page;
  return `${prefix}/${slug}/`;
}

export function languageHref(lang: Lang, page: PageKey) {
  return pageHref(lang, page);
}

export function articleHref(lang: Lang, slug: ArticleSlug) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${prefix}/articles/${slug}/`;
}
