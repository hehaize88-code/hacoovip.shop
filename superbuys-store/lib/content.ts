import enArticles from "./articles/en.json";
import frArticles from "./articles/fr.json";
import deArticles from "./articles/de.json";

export type Locale = "en" | "fr" | "de";

export const ROOT = "https://www.cnfanshp.com";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

export const categories = [
  { key: "shoes", href: `${ROOT}/shoes/` },
  { key: "hoodies", href: `${ROOT}/hoodies-sweaters/` },
  { key: "tees", href: `${ROOT}/t-shirts/` },
  { key: "jackets", href: `${ROOT}/jackets/` },
  { key: "bottoms", href: `${ROOT}/pants-shorts/` },
  { key: "headwear", href: `${ROOT}/headwear/` },
  { key: "accessories", href: `${ROOT}/accessories/` },
  { key: "jerseys", href: `${ROOT}/Jersey/` },
  { key: "electronics", href: `${ROOT}/electronics/` },
  { key: "other", href: `${ROOT}/other-stuff/` },
] as const;

export const edit = [
  {
    number: "No. 01",
    image: `${ROOT}/uploads/allimg/20260427/1-26042G03A3226.webp`,
    href: `${ROOT}/AllProducts/6049.html`,
    className: "feature feature--wide",
  },
  {
    number: "No. 02",
    image: `${ROOT}/uploads/allimg/20260427/1-26042G03505957.webp`,
    href: `${ROOT}/AllProducts/6048.html`,
    className: "feature feature--portrait",
  },
  {
    number: "No. 03",
    image: `${ROOT}/uploads/allimg/20260427/1-26042G0310V93.webp`,
    href: `${ROOT}/AllProducts/6047.html`,
    className: "feature feature--small",
  },
  {
    number: "No. 04",
    image: `${ROOT}/uploads/allimg/20260427/1-26042G0293E05.webp`,
    href: `${ROOT}/AllProducts/6046.html`,
    className: "feature feature--offset",
  },
] as const;

const shared = {
  en: {
    nav: { home: "Cover", categories: "Directory", guides: "Guides", faq: "FAQ", articles: "Articles", browse: "Browse all" },
    searchLabel: "Looking for something specific?",
    searchPlaceholder: "Try shoes, hoodie, jersey…",
    searchButton: "Search",
    back: "Back to cover",
    open: "Open",
    read: "Read article",
    updated: "Updated 6 October 2026",
    disclaimer: "Independent Superbuy-related product discovery guide. Not affiliated with or endorsed by Superbuy. Product details, availability, shipping routes and policies can change; verify them before acting.",
    cat: {
      shoes: ["Shoes", "Everyday runners and statement pairs"], hoodies: ["Hoodies & sweaters", "Layers for every rotation"],
      tees: ["T-shirts", "Graphics and daily basics"], jackets: ["Jackets", "Outer layers and seasonal pieces"],
      bottoms: ["Pants & shorts", "Shape, proportion and comfort"], headwear: ["Headwear", "Caps and finishing details"],
      accessories: ["Accessories", "Bags, small goods and extras"], jerseys: ["Jerseys", "Match-day and sport-inspired pieces"],
      electronics: ["Electronics", "Small devices and useful add-ons"], other: ["Other finds", "Everything outside the usual edit"],
    },
  },
  fr: {
    nav: { home: "Couverture", categories: "Répertoire", guides: "Guides", faq: "FAQ", articles: "Articles", browse: "Tout voir" },
    searchLabel: "Vous cherchez quelque chose de précis ?",
    searchPlaceholder: "Essayez chaussures, sweat, maillot…",
    searchButton: "Rechercher",
    back: "Retour à la couverture",
    open: "Ouvrir",
    read: "Lire l’article",
    updated: "Mis à jour le 6 octobre 2026",
    disclaimer: "Guide indépendant de découverte de produits liés à Superbuy. Ce site n’est ni affilié à Superbuy ni approuvé par celui-ci. Les produits, disponibilités, itinéraires et règles peuvent changer ; vérifiez-les avant d’agir.",
    cat: {
      shoes: ["Chaussures", "Paires quotidiennes et modèles forts"], hoodies: ["Sweats et pulls", "Des couches pour chaque rotation"],
      tees: ["T-shirts", "Graphismes et essentiels"], jackets: ["Vestes", "Couches extérieures et pièces de saison"],
      bottoms: ["Pantalons et shorts", "Forme, proportion et confort"], headwear: ["Couvre-chefs", "Casquettes et détails finaux"],
      accessories: ["Accessoires", "Sacs, petits objets et compléments"], jerseys: ["Maillots", "Pièces sportives et jour de match"],
      electronics: ["Électronique", "Petits appareils et accessoires utiles"], other: ["Autres trouvailles", "Tout ce qui sort de la sélection habituelle"],
    },
  },
  de: {
    nav: { home: "Cover", categories: "Verzeichnis", guides: "Ratgeber", faq: "FAQ", articles: "Artikel", browse: "Alles ansehen" },
    searchLabel: "Suchst du etwas Bestimmtes?",
    searchPlaceholder: "Zum Beispiel Schuhe, Hoodie, Trikot…",
    searchButton: "Suchen",
    back: "Zurück zum Cover",
    open: "Öffnen",
    read: "Artikel lesen",
    updated: "Aktualisiert am 6. Oktober 2026",
    disclaimer: "Unabhängiger Leitfaden zur Entdeckung von Superbuy-bezogenen Produkten. Keine Verbindung zu oder Unterstützung durch Superbuy. Produkte, Verfügbarkeit, Versandwege und Regeln können sich ändern; prüfe sie vor jeder Entscheidung.",
    cat: {
      shoes: ["Schuhe", "Alltagssneaker und auffällige Paare"], hoodies: ["Hoodies & Pullover", "Layer für jede Rotation"],
      tees: ["T-Shirts", "Grafiken und tägliche Basics"], jackets: ["Jacken", "Outerwear und saisonale Stücke"],
      bottoms: ["Hosen & Shorts", "Form, Proportion und Komfort"], headwear: ["Kopfbedeckung", "Caps und letzte Details"],
      accessories: ["Accessoires", "Taschen, Kleinteile und Extras"], jerseys: ["Trikots", "Sport- und Spieltagsstücke"],
      electronics: ["Elektronik", "Kleine Geräte und nützliche Ergänzungen"], other: ["Weitere Funde", "Alles außerhalb der üblichen Auswahl"],
    },
  },
} as const;

export const copy = {
  en: {
    ...shared.en,
    home: {
      eyebrow: "Independent product discovery journal", titleA: "SUPERBUY", titleB: "SPREADSHEET", titleC: "FINDS",
      deck: "Explore Superbuy spreadsheet finds in ten categories, then check variants, QC photos and total shipping costs before ordering.",
      coverAlt: "Featured low-profile shoe from the current edit", coverCaption: "Cover find / No. 01",
      directoryKicker: "Directory / 01", directoryIntro: "Choose a section, then browse the complete collection.",
      directoryTitle: "Find your section.", routes: "10 routes",
      editKicker: "The visual edit / 04 finds", editSource: "Images from live listings", editTitle: "Four ways to start.",
      editIntro: "Selected as browsing directions, not endorsements. Open the destination listing and review every detail before making a decision.",
      names: [["Low-profile runner", "Muted palette / daily rotation"], ["Technical sneaker", "Layered upper / bold sole"], ["Statement pair", "High contrast / weekend pick"], ["Quiet essential", "Simple lines / easy styling"]],
      idea: "The idea", statement: ["Fewer tabs.", "Better routes.", "A clearer find."], enter: "Enter the full index",
      notesKicker: "Reading room / 04", notesTitle: "Field notes", notesIntro: "Practical, fact-checked context for discovery, warehouse review and parcel planning.",
      notes: [
        ["Start here", "How to use a Superbuy spreadsheet without guessing", "Move from a promising find to the exact variant, a written inspection brief and a realistic two-stage budget.", "product-listing-checklist"],
        ["QC desk", "What useful QC photos should help you check", "Review shape, color consistency, visible marks and the details that matter to you. A photo is evidence to examine—not a promise of quality.", "superbuy-qc-photos-guide"],
        ["Parcel", "Estimate Superbuy shipping cost with the calculator", "Compare actual and volumetric weight, packaging, consolidation and live route options before treating an estimate as the final price.", "superbuy-shipping-cost-guide"],
        ["Arrival desk", "What to verify when a Superbuy order reaches the warehouse", "Reconcile order identity, intake data and visible evidence before requesting extras, after-sales help or parcel submission.", "superbuy-warehouse-arrival-checklist"],
      ],
    },
    categoriesPage: { kicker: "Superbuy product categories / 10 routes", title: "Superbuy product categories & finds.", intro: "Browse ten product routes, then use the category-specific checks below to verify variants, measurements, QC evidence and likely parcel impact before ordering." },
    guidesPage: { kicker: "Superbuy guides / 11", title: "How to use Superbuy in 2026.", intro: "Practical Superbuy guides for ordering, QC photos, warehouse checks, packaging, shipping-cost estimates, storage and international parcel planning." },
    articlesPage: { kicker: "Superbuy articles / Issue 01", title: "Superbuy guides: shipping, QC, warehouse & packaging.", intro: "Eleven practical Superbuy guides covering product checks, QC, domestic tracking, returns, fees, storage and international shipping." },
    faqPage: { kicker: "Superbuy FAQ / 12 answers", title: "Superbuy FAQ 2026: shipping cost, storage, QC & packaging.", intro: "Direct answers about Superbuy orders, warehouse photos, shipping estimates, storage, consolidation and packaging, checked against published guidance." },
  },
  fr: {
    ...shared.fr,
    home: {
      eyebrow: "Journal indépendant de découverte produit", titleA: "SUPERBUY", titleB: "SPREADSHEET", titleC: "SÉLECTION",
      deck: "Explorez dix catégories de trouvailles Superbuy, puis vérifiez variantes, photos QC et frais de livraison avant de commander.",
      coverAlt: "Chaussure basse présentée dans la sélection", coverCaption: "Trouvaille couverture / N° 01",
      directoryKicker: "Répertoire / 01", directoryIntro: "Choisissez une section, puis explorez toute la collection.",
      directoryTitle: "Trouvez votre section.", routes: "10 parcours",
      editKicker: "Sélection visuelle / 04 trouvailles", editSource: "Images de fiches actives", editTitle: "Quatre points de départ.",
      editIntro: "Des directions de recherche, pas des recommandations. Ouvrez la fiche de destination et vérifiez chaque détail avant de décider.",
      names: [["Runner profil bas", "Palette douce / rotation quotidienne"], ["Sneaker technique", "Tige superposée / semelle forte"], ["Paire affirmée", "Contraste élevé / choix du week-end"], ["Essentiel discret", "Lignes simples / facile à assortir"]],
      idea: "L’idée", statement: ["Moins d’onglets.", "De meilleurs parcours.", "Une trouvaille plus claire."], enter: "Entrer dans l’index complet",
      notesKicker: "Salle de lecture / 04", notesTitle: "Notes de terrain", notesIntro: "Un contexte pratique pour chercher, vérifier et planifier avant de vous engager.",
      notes: [
        ["Commencer ici", "Lire une fiche produit avant de l’ouvrir", "Le titre, les photos du vendeur et les variantes permettent de décider si une trouvaille mérite un examen. Gardez vos questions pour l’étape de contrôle.", "product-listing-checklist"],
        ["Bureau QC", "Ce que des photos QC utiles doivent permettre de vérifier", "Examinez la forme, la cohérence des couleurs, les marques visibles et les détails importants. Une photo est une preuve à étudier, pas une promesse de qualité.", "superbuy-qc-photos-guide"],
        ["Colis", "Pourquoi le prix produit n’est que la moitié de la décision", "La livraison internationale dépend du volume emballé, du poids, de l’itinéraire et de la destination. Pensez au colis probable avant de composer un lot.", "superbuy-shipping-cost-guide"],
        ["Réception", "Que vérifier à l’arrivée d’une commande Superbuy", "Rapprochez identité, données d’entrée et preuves visibles avant de demander une photo, un après-vente ou l’envoi du colis.", "superbuy-warehouse-arrival-checklist"],
      ],
    },
    categoriesPage: { kicker: "Catégories de produits Superbuy / 10 parcours", title: "Catégories et trouvailles Superbuy.", intro: "Parcourez dix itinéraires produits, puis utilisez les contrôles propres à chaque catégorie pour vérifier variantes, mesures, preuves QC et effet probable sur le colis." },
    guidesPage: { kicker: "Guides Superbuy / 11", title: "Comment utiliser Superbuy en 2026.", intro: "Des guides pratiques sur la commande, les photos QC, l’entrepôt, l’emballage, l’estimation des frais et l’envoi international." },
    articlesPage: { kicker: "Articles Superbuy / Numéro 01", title: "Guides Superbuy : livraison, QC, entrepôt et emballage.", intro: "Des guides indépendants pour transformer la recherche produit, les preuves d’entrepôt, le calcul des frais et l’emballage en décisions concrètes." },
    faqPage: { kicker: "FAQ Superbuy / 10 réponses", title: "FAQ Superbuy 2026 : livraison, stockage, QC et emballage.", intro: "Des réponses directes sur les commandes, photos d’entrepôt, estimations, stockage, regroupement et emballage, vérifiées à partir des guides publiés." },
  },
  de: {
    ...shared.de,
    home: {
      eyebrow: "Unabhängiges Magazin zur Produktentdeckung", titleA: "SUPERBUY", titleB: "SPREADSHEET", titleC: "FUNDE",
      deck: "Entdecke Superbuy-Funde in zehn Kategorien und prüfe Varianten, QC-Fotos und Versandkosten vor der Bestellung.",
      coverAlt: "Ausgewählter flacher Sneaker aus der aktuellen Edition", coverCaption: "Cover-Fund / Nr. 01",
      directoryKicker: "Verzeichnis / 01", directoryIntro: "Wähle einen Bereich und öffne anschließend die vollständige Sammlung.",
      directoryTitle: "Finde deinen Bereich.", routes: "10 Wege",
      editKicker: "Visuelle Auswahl / 04 Funde", editSource: "Bilder aus aktiven Listings", editTitle: "Vier Wege zum Start.",
      editIntro: "Als Suchrichtungen ausgewählt, nicht als Empfehlungen. Öffne das Ziel-Listing und prüfe jedes Detail vor deiner Entscheidung.",
      names: [["Flacher Runner", "Ruhige Farben / tägliche Rotation"], ["Technischer Sneaker", "Mehrlagiges Oberteil / starke Sohle"], ["Statement-Paar", "Hoher Kontrast / Wochenendwahl"], ["Ruhiges Essential", "Klare Linien / leicht zu kombinieren"]],
      idea: "Die Idee", statement: ["Weniger Tabs.", "Bessere Wege.", "Ein klarerer Fund."], enter: "Zum vollständigen Index",
      notesKicker: "Leseraum / 04", notesTitle: "Notizen aus der Praxis", notesIntro: "Praktischer Kontext zum Suchen, Prüfen und Planen vor deiner Entscheidung.",
      notes: [
        ["Hier starten", "Ein Produkt-Listing lesen, bevor du es öffnest", "Titel, Verkäuferbilder und Varianten zeigen, ob sich ein genauer Blick lohnt. Notiere Fragen für die spätere Prüfung.", "product-listing-checklist"],
        ["QC-Schreibtisch", "Was hilfreiche QC-Fotos zeigen sollten", "Prüfe Form, Farbkonsistenz, sichtbare Spuren und wichtige Details. Ein Foto ist Material zur Beurteilung – kein Qualitätsversprechen.", "superbuy-qc-photos-guide"],
        ["Paket", "Warum der Produktpreis nur die halbe Entscheidung ist", "Internationaler Versand hängt von Packmaß, Gewicht, Route und Ziel ab. Denke vor dem Zusammenstellen eines Hauls an das wahrscheinliche Paket.", "superbuy-shipping-cost-guide"],
        ["Wareneingang", "Was beim Superbuy-Lagereingang zu prüfen ist", "Bestellidentität, Eingangsdaten und sichtbare Belege abgleichen, bevor Zusatzfoto, After-Sales oder Paket folgen.", "superbuy-warehouse-arrival-checklist"],
      ],
    },
    categoriesPage: { kicker: "Superbuy-Produktkategorien / 10 Wege", title: "Superbuy-Kategorien & Produktfunde.", intro: "Durchsuche zehn Produktwege und nutze danach die Kategorie-Checks für Varianten, Maße, QC-Belege und den wahrscheinlichen Paketeffekt." },
    guidesPage: { kicker: "Superbuy-Ratgeber / 11", title: "Superbuy 2026 nutzen: Bestellung bis Versand.", intro: "Praktische Anleitungen zu Bestellung, QC-Fotos, Lagerprüfung, Verpackung, Versandkostenschätzung und internationalem Paket." },
    articlesPage: { kicker: "Superbuy-Artikel / Ausgabe 01", title: "Superbuy-Ratgeber: Versand, QC, Lager und Verpackung.", intro: "Unabhängige Anleitungen für Produktsuche, Lagerbelege, Versandkostenrechner und passende Verpackungsentscheidungen." },
    faqPage: { kicker: "Superbuy FAQ / 10 Antworten", title: "Superbuy FAQ 2026: Versandkosten, Lagerung, QC und Verpackung.", intro: "Direkte Antworten zu Bestellungen, Lagerfotos, Schätzungen, Aufbewahrung, Konsolidierung und Verpackung auf Basis veröffentlichter Hinweise." },
  },
} as const;

export const faq = {
  en: [
    ["What does a Superbuy shopping-agent order involve?", "Superbuy’s published process has five broad stages: select a product, submit the shopping-agent order, let the agent purchase it, review it after warehouse arrival, and then submit stored items as an international parcel. The product order and the later parcel are separate transactions, so the product price is not the complete delivered cost."],
    ["Do I pay once or twice?", "Normally twice. Superbuy’s first-stage payment covers the item, any Chinese domestic delivery and chosen product-level add-ons. The second payment is made when warehouse items are submitted for international delivery. That payment depends on the selected route, destination and estimated parcel data, then is reconciled after packing."],
    ["Does ordinary Superbuy purchasing have a service fee?", "The published fee structure distinguishes standard purchasing from optional and special services. Check the fee shown for your source marketplace and selected service, then record product price, domestic delivery and any additional charges separately. Do not assume that one standard-service statement applies to every type of purchase."],
    ["What can warehouse QC photos help me check?", "Superbuy’s Shopping Agent guide describes warehouse inspection and photos after receipt. They are useful for confirming the visible variant, quantity, general shape and obvious damage. They cannot prove authenticity, fit, hidden construction, battery health or long-term durability, so ask for targeted evidence when one of those details matters."],
    ["How long can items stay in the warehouse?", "The current fee page gives items 90 days of free storage after arrival. It then states a storage charge of CN¥0.1 per item per day and a maximum storage period of 180 days, after which unsubmitted and unanswered items may be treated as abandoned. Check the live account deadline for each item rather than relying on memory."],
    ["Can several orders be consolidated into one parcel?", "Yes. Superbuy’s published fee and agent guides say multiple stored items can be consolidated, and the current fee page describes basic consolidation as free. Consolidation may remove duplicated outer packaging, but it is not guaranteed to reduce cost: a bigger parcel may attract dimensional-weight pricing or lose access to a preferred route."],
    ["How is the international shipping deposit calculated?", "Superbuy says the deposit uses estimated weight, the selected shipping method and the destination. After the warehouse packs and weighs the parcel, the final charge is based on verified parcel data and the logistics provider’s bill. The platform then adjusts the difference rather than treating the first estimate as the final price."],
    ["Which packaging options are available?", "The official guidance lists optional services such as packaging removal or replacement, reinforcement and insurance. Its current fee page also lists choices including vacuum packaging and folding shoe boxes. The useful option depends on the item: reducing volume can help soft goods, while fragile or crush-sensitive products may justify more protection."],
    ["How many destinations can Superbuy ship to?", "Check the current shipping calculator for your destination, parcel dimensions and item characteristics. General coverage statements do not confirm that a particular route accepts your exact contents or address."],
    ["Are customs taxes and delays included in Superbuy’s promise?", "No. Superbuy’s guide says international delivery is carried out by designated third-party providers and that processing time, item restrictions and customs tax are not fully under its control. Buyers should check the destination’s rules, restricted-item status and the route’s current terms before submitting a parcel."],
    ["What should I do if the warehouse photos show a problem?", "Document the exact mismatch—wrong variant, missing part, visible damage or measurement—and act through the current order page promptly. Superbuy’s help center provides after-sales paths, but the available remedy depends on timing, seller acceptance and the specific order. A marked screenshot and a precise request are more useful than a vague complaint."],
    ["Is this website operated by Superbuy?", "No. This is an independent product-discovery and educational site. It does not operate Superbuy accounts, place agent orders, handle payments or make promises for Superbuy. Platform facts on this page were checked against Superbuy’s published English guidance on 6 October 2026 and should be rechecked before a time-sensitive decision."],
  ],
  fr: [
    ["Que fait un agent d’achat ?", "Un agent reçoit un lien ou une demande, achète l’article en Chine, le réceptionne dans un entrepôt puis permet au client de soumettre les articles stockés à la livraison internationale. Le parcours publié par Superbuy sépare le paiement du produit de celui du colis international."],
    ["Superbuy fournit-il des photos QC ?", "Le guide Shopping Agent décrit une inspection et des photos du produit reçu en entrepôt. Elles aident à examiner l’état visible et les détails, sans garantir l’authenticité, la taille ou la qualité générale."],
    ["Combien de temps dure le stockage gratuit ?", "Le guide officiel actuel indique 90 jours de stockage gratuit. Vérifiez toujours les notifications du compte et la politique à jour avant de compter sur toute cette période."],
    ["Peut-on regrouper plusieurs commandes ?", "Oui. Le processus publié permet de soumettre plusieurs commandes stockées dans un seul colis. Le regroupement évite certains emballages en double, mais peut modifier le poids facturable, le volume et les lignes disponibles."],
    ["Comment les frais internationaux sont-ils calculés ?", "L’acompte dépend du poids estimé, du mode d’envoi et de la destination. Le coût final repose sur le volume et le poids vérifiés après emballage ; l’écart avec l’acompte est ajusté sur le compte."],
    ["Combien de pays Superbuy dessert-il ?", "Vérifiez le calculateur actuel avec votre destination, les dimensions et les caractéristiques des articles. Une couverture générale ne garantit pas la disponibilité d’une ligne pour votre colis exact."],
    ["Peut-on modifier l’emballage ?", "Le guide officiel cite le retrait d’emballage, le renforcement et l’assurance parmi les services supplémentaires. Leur disponibilité dépend du colis et de la ligne."],
    ["Les taxes douanières sont-elles comprises ?", "Ne le supposez pas. Superbuy précise ne pas contrôler entièrement la douane, les restrictions et les transporteurs tiers. La fiscalité dépend de la destination, du contenu déclaré et des règles locales."],
    ["Puis-je suivre mon colis ?", "Le parcours publié indique que le suivi apparaît dans la zone My Parcel après l’expédition. Les événements du transporteur peuvent mettre du temps à s’afficher."],
    ["Ce site est-il Superbuy ?", "Non. Il s’agit d’un site indépendant de découverte et d’information. Il ne fournit pas les services Superbuy, ne traite pas les paiements et ne fait aucune promesse au nom de Superbuy."],
  ],
  de: [
    ["Was macht ein Shopping Agent?", "Ein Shopping Agent erhält einen Produktlink oder eine Anfrage, kauft den Artikel in China, nimmt ihn im Lager an und ermöglicht anschließend den internationalen Versand eingelagerter Waren. Im veröffentlichten Superbuy-Ablauf sind Produktzahlung und spätere Paketzahlung getrennt."],
    ["Stellt Superbuy QC-Fotos bereit?", "Der Shopping-Agent-Leitfaden beschreibt eine Lagerprüfung und Fotos der erhaltenen Ware. Sie helfen bei der Sichtprüfung, garantieren aber weder Echtheit noch Größe oder Gesamtqualität."],
    ["Wie lange ist die Lagerung kostenlos?", "Der aktuelle offizielle Leitfaden nennt 90 Tage kostenlose Lagerung. Prüfe vor der Nutzung immer die Hinweise im Konto und die gültige Richtlinie."],
    ["Kann ich mehrere Bestellungen zusammen versenden?", "Ja. Laut veröffentlichtem Ablauf können verschiedene Lagerbestellungen in einem Paket eingereicht werden. Konsolidierung reduziert doppelte Verpackung, kann aber Gewicht, Maße und verfügbare Routen verändern."],
    ["Wie werden internationale Versandkosten berechnet?", "Die Vorauszahlung basiert auf geschätztem Gewicht, Versandart und Ziel. Der Endbetrag richtet sich nach Größe und Gewicht des fertig gepackten Pakets; Unterschiede werden im Konto ausgeglichen."],
    ["Wie viele Länder bedient Superbuy?", "Prüfe den aktuellen Versandkostenrechner mit Ziel, Paketmaßen und Artikelmerkmalen. Allgemeine Angaben zur Abdeckung bestätigen keine verfügbare Route für deinen konkreten Inhalt oder deine Adresse."],
    ["Kann die Verpackung angepasst werden?", "Der offizielle Leitfaden nennt Entfernung von Verpackung, Verstärkung und Versicherung als Zusatzleistungen. Verfügbarkeit und Eignung hängen von Paket und Route ab."],
    ["Sind Zollabgaben enthalten?", "Gehe nicht davon aus. Superbuy erklärt, dass Zoll, Beschränkungen und Drittanbieter-Logistik nicht vollständig kontrolliert werden. Steuern richten sich nach Ziel, Inhalt und örtlichen Regeln."],
    ["Kann ich ein Paket verfolgen?", "Laut veröffentlichtem Ablauf ist die Sendungsverfolgung nach Versand im Bereich My Parcel verfügbar. Carrier-Ereignisse können verzögert erscheinen."],
    ["Ist diese Website Superbuy?", "Nein. Dies ist eine unabhängige Entdeckungs- und Informationsseite. Sie betreibt keine Superbuy-Dienste, verarbeitet keine Zahlungen und gibt keine Zusagen im Namen von Superbuy."],
  ],
} as const;

export type Article = {
  slug: string;
  title: string;
  dek: string;
  sections: {
    heading: string;
    paragraphs: string[];
    table?: { caption: string; headers: string[]; rows: string[][] };
  }[];
};

export const articles: Record<Locale, Article[]> = { en: enArticles, fr: frArticles, de: deArticles };
