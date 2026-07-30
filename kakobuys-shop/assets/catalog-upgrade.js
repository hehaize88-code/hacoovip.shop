const KB_REVISION = "2026-07-30-catalog-v1";
const KB_LANGS = ["en", "pl", "de", "fr", "it"];
const KB_CATEGORY_ORDER = [
  "shoes",
  "hoodies",
  "t-shirts",
  "jackets",
  "bags",
  "accessories",
  "pants-shorts",
  "headwear",
  "jerseys",
  "electronics"
];

const KB_COPY = {
  en: {
    categories: {
      shoes: "Shoes", hoodies: "Hoodies", "t-shirts": "T-Shirts", jackets: "Jackets",
      bags: "Bags", accessories: "Accessories", "pants-shorts": "Pants & Shorts",
      headwear: "Headwear", jerseys: "Jerseys", electronics: "Electronics"
    },
    homeTitle: "16 independent product routes.",
    homeIntro: "Every card opens a Kakobuys.shop detail page first. The detail page records the source title, item ID, first image and reference price before you continue.",
    categoryProducts: "8 product routes in this category",
    categoryProductsIntro: "Open the independent detail page first, verify the recorded item ID and current source-page facts, then decide whether to continue.",
    view: "View details",
    sourcePrice: "Source price",
    usdReference: "USD reference",
    productId: "Product ID",
    category: "Category",
    reviewed: "Facts reviewed",
    showMore: "Show 12 more products",
    showLess: "Show fewer products",
    disclosure: "Source-page names, IDs, CNY prices and first images were checked on July 30, 2026. USD figures are reference conversions, not checkout quotes.",
    qcTitle: "Category-specific QC checks",
    qcIntro: "Use the photo sequence to answer concrete questions for this product type. If the needed angle or measurement is missing, request it instead of guessing.",
    limitsTitle: "What these photos cannot confirm",
    limitsBody: "Warehouse photos can reveal visible mismatch, placement, shape and measurement problems. They cannot prove authenticity, fibre or material composition, long-term durability, comfort, waterproofing, battery health or electrical safety.",
    browseRoutes: "Browse 8 product routes",
    readGuide: "Read the complete QC guide",
    breadcrumbHome: "Home",
    breadcrumbCatalog: "Catalog",
    independentRecord: "Independent product record",
    continue: "Continue to source listing ↗",
    detailNote: "This page is an independent research record, not a seller page. Recheck the destination title, selected variant, current price, restrictions and after-sales terms before ordering.",
    productQcTitle: "QC questions for this item",
    backCategory: "Back to category",
    unavailable: "Product record not found.",
    footer: "Independent research directory. Not affiliated with the source marketplace, buying agent or any brand referenced."
  },
  pl: {
    categories: {
      shoes: "Buty", hoodies: "Bluzy", "t-shirts": "T-shirty", jackets: "Kurtki",
      bags: "Torby", accessories: "Akcesoria", "pants-shorts": "Spodnie i szorty",
      headwear: "Nakrycia głowy", jerseys: "Koszulki sportowe", electronics: "Elektronika"
    },
    homeTitle: "16 niezależnych tras produktowych.",
    homeIntro: "Każda karta najpierw otwiera stronę szczegółów Kakobuys.shop z nazwą źródłową, ID, pierwszym zdjęciem i ceną orientacyjną.",
    categoryProducts: "8 tras produktowych w tej kategorii",
    categoryProductsIntro: "Najpierw otwórz niezależną stronę szczegółów, sprawdź ID i aktualne dane źródłowe, a dopiero potem przejdź dalej.",
    view: "Zobacz szczegóły", sourcePrice: "Cena źródłowa", usdReference: "USD orientacyjnie",
    productId: "ID produktu", category: "Kategoria", reviewed: "Dane sprawdzono",
    showMore: "Pokaż 12 kolejnych produktów", showLess: "Pokaż mniej produktów",
    disclosure: "Nazwy, ID, ceny CNY i pierwsze zdjęcia sprawdzono 30 lipca 2026 r. Kwoty USD są przeliczeniem orientacyjnym, nie ceną końcową.",
    qcTitle: "Kontrola QC właściwa dla kategorii",
    qcIntro: "Zdjęcia powinny odpowiadać na konkretne pytania dla tego typu produktu. Gdy brakuje ujęcia lub pomiaru, poproś o nie zamiast zgadywać.",
    limitsTitle: "Czego zdjęcia nie potwierdzą",
    limitsBody: "Zdjęcia magazynowe pokazują widoczne różnice, położenie, kształt i wymiary. Nie potwierdzają autentyczności, składu, trwałości, wygody, wodoodporności, kondycji baterii ani bezpieczeństwa elektrycznego.",
    browseRoutes: "Zobacz 8 tras produktów", readGuide: "Pełny przewodnik QC",
    breadcrumbHome: "Strona główna", breadcrumbCatalog: "Katalog", independentRecord: "Niezależny zapis produktu",
    continue: "Przejdź do oferty źródłowej ↗",
    detailNote: "To niezależny zapis badawczy, a nie strona sprzedawcy. Przed zakupem ponownie sprawdź tytuł, wariant, cenę, ograniczenia i zasady posprzedażowe.",
    productQcTitle: "Pytania QC dla tego produktu", backCategory: "Wróć do kategorii",
    unavailable: "Nie znaleziono rekordu produktu.",
    footer: "Niezależny katalog badawczy. Brak powiązania ze źródłowym serwisem, agentem zakupowym i wymienionymi markami."
  },
  de: {
    categories: {
      shoes: "Schuhe", hoodies: "Hoodies", "t-shirts": "T-Shirts", jackets: "Jacken",
      bags: "Taschen", accessories: "Accessoires", "pants-shorts": "Hosen & Shorts",
      headwear: "Kopfbedeckungen", jerseys: "Trikots", electronics: "Elektronik"
    },
    homeTitle: "16 eigenständige Produktwege.",
    homeIntro: "Jede Karte öffnet zuerst eine Kakobuys.shop-Detailseite mit Quelltitel, Artikel-ID, erstem Bild und Referenzpreis.",
    categoryProducts: "8 Produktwege in dieser Kategorie",
    categoryProductsIntro: "Öffne zuerst die unabhängige Detailseite, prüfe Artikel-ID und aktuelle Quelldaten und entscheide dann über den nächsten Schritt.",
    view: "Details ansehen", sourcePrice: "Quellpreis", usdReference: "USD-Referenz",
    productId: "Produkt-ID", category: "Kategorie", reviewed: "Geprüft am",
    showMore: "12 weitere Produkte anzeigen", showLess: "Weniger Produkte anzeigen",
    disclosure: "Quellnamen, IDs, CNY-Preise und erste Bilder wurden am 30. Juli 2026 geprüft. USD-Werte sind nur Referenzumrechnungen.",
    qcTitle: "Kategoriespezifische QC-Prüfung",
    qcIntro: "Die Fotoreihe soll konkrete Fragen zu diesem Produkttyp beantworten. Fehlt ein Winkel oder Maß, fordere es an, statt zu raten.",
    limitsTitle: "Was Fotos nicht bestätigen können",
    limitsBody: "Lagerfotos zeigen sichtbare Abweichungen, Platzierung, Form und Maße. Sie beweisen weder Echtheit, Materialzusammensetzung, Haltbarkeit, Komfort, Wasserdichtigkeit, Akkuzustand noch elektrische Sicherheit.",
    browseRoutes: "8 Produktwege ansehen", readGuide: "Vollständigen QC-Leitfaden lesen",
    breadcrumbHome: "Start", breadcrumbCatalog: "Katalog", independentRecord: "Unabhängiger Produkteintrag",
    continue: "Zur Quellanzeige weitergehen ↗",
    detailNote: "Dies ist ein unabhängiger Rechercheeintrag, keine Verkäuferseite. Prüfe vor dem Kauf erneut Titel, Variante, Preis, Beschränkungen und Bedingungen.",
    productQcTitle: "QC-Fragen zu diesem Artikel", backCategory: "Zurück zur Kategorie",
    unavailable: "Produkteintrag nicht gefunden.",
    footer: "Unabhängiges Rechercheverzeichnis. Keine Verbindung zum Quellmarktplatz, Einkaufsagenten oder genannten Marken."
  },
  fr: {
    categories: {
      shoes: "Chaussures", hoodies: "Sweats", "t-shirts": "T-shirts", jackets: "Vestes",
      bags: "Sacs", accessories: "Accessoires", "pants-shorts": "Pantalons et shorts",
      headwear: "Couvre-chefs", jerseys: "Maillots", electronics: "Électronique"
    },
    homeTitle: "16 parcours produit indépendants.",
    homeIntro: "Chaque carte ouvre d’abord une fiche Kakobuys.shop indiquant le titre source, l’ID, la première image et un prix de référence.",
    categoryProducts: "8 parcours produit dans cette catégorie",
    categoryProductsIntro: "Ouvrez d’abord la fiche indépendante, vérifiez l’ID et les données source actuelles, puis décidez de poursuivre.",
    view: "Voir la fiche", sourcePrice: "Prix source", usdReference: "Référence USD",
    productId: "ID produit", category: "Catégorie", reviewed: "Données vérifiées",
    showMore: "Afficher 12 produits de plus", showLess: "Afficher moins",
    disclosure: "Les noms, ID, prix CNY et premières images ont été vérifiés le 30 juillet 2026. Les montants USD sont indicatifs.",
    qcTitle: "Contrôles QC propres à la catégorie",
    qcIntro: "La série de photos doit répondre à des questions concrètes pour ce type de produit. Si un angle ou une mesure manque, demandez-le au lieu de deviner.",
    limitsTitle: "Ce que les photos ne prouvent pas",
    limitsBody: "Les photos d’entrepôt montrent les écarts visibles, le placement, la forme et les mesures. Elles ne prouvent ni l’authenticité, ni la composition, la durabilité, le confort, l’étanchéité, l’état de la batterie ou la sécurité électrique.",
    browseRoutes: "Voir 8 parcours produit", readGuide: "Lire le guide QC complet",
    breadcrumbHome: "Accueil", breadcrumbCatalog: "Catalogue", independentRecord: "Fiche produit indépendante",
    continue: "Continuer vers l’annonce source ↗",
    detailNote: "Cette page est une fiche de recherche indépendante, pas une page vendeur. Vérifiez à nouveau le titre, la variante, le prix, les restrictions et les conditions avant achat.",
    productQcTitle: "Questions QC pour cet article", backCategory: "Retour à la catégorie",
    unavailable: "Fiche produit introuvable.",
    footer: "Répertoire de recherche indépendant, sans affiliation avec la place de marché, l’agent d’achat ou les marques citées."
  },
  it: {
    categories: {
      shoes: "Scarpe", hoodies: "Felpe", "t-shirts": "T-shirt", jackets: "Giacche",
      bags: "Borse", accessories: "Accessori", "pants-shorts": "Pantaloni e shorts",
      headwear: "Copricapi", jerseys: "Maglie sportive", electronics: "Elettronica"
    },
    homeTitle: "16 percorsi prodotto indipendenti.",
    homeIntro: "Ogni scheda apre prima una pagina Kakobuys.shop con titolo originale, ID, prima immagine e prezzo di riferimento.",
    categoryProducts: "8 percorsi prodotto in questa categoria",
    categoryProductsIntro: "Apri prima la pagina indipendente, verifica ID e dati correnti della fonte, poi decidi se proseguire.",
    view: "Vedi dettagli", sourcePrice: "Prezzo fonte", usdReference: "Riferimento USD",
    productId: "ID prodotto", category: "Categoria", reviewed: "Dati verificati",
    showMore: "Mostra altri 12 prodotti", showLess: "Mostra meno prodotti",
    disclosure: "Nomi, ID, prezzi CNY e prime immagini sono stati verificati il 30 luglio 2026. Gli importi USD sono conversioni indicative.",
    qcTitle: "Controlli QC specifici per categoria",
    qcIntro: "La sequenza di foto deve rispondere a domande concrete per questo tipo di prodotto. Se manca un’angolazione o una misura, richiedila invece di indovinare.",
    limitsTitle: "Cosa le foto non possono confermare",
    limitsBody: "Le foto di magazzino mostrano differenze visibili, posizione, forma e misure. Non provano autenticità, composizione, durata, comfort, impermeabilità, stato della batteria o sicurezza elettrica.",
    browseRoutes: "Vedi 8 percorsi prodotto", readGuide: "Leggi la guida QC completa",
    breadcrumbHome: "Home", breadcrumbCatalog: "Catalogo", independentRecord: "Scheda prodotto indipendente",
    continue: "Vai all’annuncio originale ↗",
    detailNote: "Questa è una scheda di ricerca indipendente, non una pagina del venditore. Prima dell’acquisto ricontrolla titolo, variante, prezzo, restrizioni e condizioni.",
    productQcTitle: "Domande QC per questo articolo", backCategory: "Torna alla categoria",
    unavailable: "Scheda prodotto non trovata.",
    footer: "Directory di ricerca indipendente, non affiliata al marketplace, all’agente di acquisto o ai marchi citati."
  }
};

const KB_QC = {
  en: {
    shoes: [
      ["Pair shape and heel profile", "Place the left and right shoe in the same orientation. Compare toe-box width, side profile, collar height and the rear heel line; one shoe should not sit visibly higher or lean differently."],
      ["Sole bond and level", "Inspect both lateral edges and the rear. Follow the glue line for gaps, excess adhesive or a tilted outsole, and compare the tread edge from shoe to shoe."],
      ["Size system and measurements", "Match the tongue or box label to the ordered EU, US, UK or CN size. Ask for an insole or outsole measurement when the conversion is uncertain."]
    ],
    hoodies: [
      ["Hood, shoulders and drawstrings", "Check whether the hood seam, shoulder line and drawstring exits sit centrally. Unequal cord length can be adjusted; offset eyelets or twisted panels cannot."],
      ["Ribbing, zip and pockets", "Compare both cuffs and the hem for equal height. On zip styles, close the zip and check that the front panels and pockets meet at the same level."],
      ["Artwork position and garment size", "Use the centre seam, neckline and pocket as reference points for print or embroidery placement. Confirm chest width and body length against the selected size chart."]
    ],
    "t-shirts": [
      ["Collar and shoulder balance", "Lay the shirt flat and compare shoulder slopes, sleeve openings and collar ribbing. Look for a twisted neckline or side seam before judging the print."],
      ["Print or embroidery placement", "Check centring relative to the collar and side seams, then inspect visible edges for lifting, cracking, bleeding or loose embroidery threads."],
      ["Chest width and body length", "Request pit-to-pit and back-length measurements. Compare the actual numbers with the seller chart rather than relying only on the sewn size tag."]
    ],
    jackets: [
      ["Placket, zip and fasteners", "Close the jacket and follow the front opening from collar to hem. Zips, snaps and buttonholes should form one straight line without pulling one panel higher."],
      ["Panels, fill and lining", "Compare quilted sections or padded zones for obvious empty spots and bunching. Check that lining does not protrude through the cuffs, hem or zip."],
      ["Pockets, cuffs and measurements", "Compare left and right pocket height, cuff width and hem finish. Confirm chest, sleeve and back length for the selected size."]
    ],
    bags: [
      ["Body shape and base", "View the bag from front, side and base. Compare panel angles, corner shape and whether the bag stands level instead of leaning or collapsing on one side."],
      ["Handles, straps and hardware", "Check that handle anchors are level and equally spaced. Inspect buckles, rings, chain links and strap holes for missing parts, scratches or mismatched colour."],
      ["Zip, lining and dimensions", "Ask for the main compartment open. Verify zipper track, lining, internal pocket layout and label position, then compare width, height and depth with the listing."]
    ],
    accessories: [
      ["Correct item and set count", "Match the ordered colour, shape and number of pieces. For jewellery, eyewear or watches, compare stone, lens, dial and decorative placement with the selected variant."],
      ["Hinges, clasps and small hardware", "Request close-ups of moving or joining points. Look for bent pins, incomplete clasps, loose screws, uneven links or exposed threads."],
      ["Scale, engraving and limits", "Use a ruler photo to confirm size and inspect visible engraving placement. A photo cannot verify metal grade, movement accuracy, UV protection or material claims."]
    ],
    "pants-shorts": [
      ["Waistband, rise and fly", "Lay the garment flat. Check that the waistband is level, belt loops are evenly placed and the fly or drawstring channel is centred without twisting."],
      ["Leg symmetry and seams", "Align both legs and compare inseam, outseam and hem height. On washed or printed styles, confirm that the ordered treatment appears on the correct panels."],
      ["Waist and length measurements", "Request relaxed waist width, total length and, when useful, thigh and leg opening. Compare measurements with the chosen variant, not only the tag."]
    ],
    headwear: [
      ["Crown and brim alignment", "View the hat straight from the front and side. Crown panels should meet evenly, and the brim should sit centrally without a visible twist or one raised edge."],
      ["Embroidery, print and seams", "Use the centre front and panel joins to judge artwork placement. Inspect edge stitching, thread breaks and pattern continuity across seams."],
      ["Circumference and closure", "Confirm the inner label and ordered size. For fitted hats request circumference; for adjustable caps inspect the buckle, snap or hook-and-loop closure."]
    ],
    jerseys: [
      ["Name and number alignment", "Lay the jersey flat and use the collar and side seams as centre references. Check the spelling, number pair spacing and whether the back artwork sits level."],
      ["Badges, sponsor marks and stitching", "Compare patch position on both sides of the chest. Inspect visible badge edges, sponsor print and sleeve details for lifting, gaps or obvious skew."],
      ["Size label and garment measurements", "Match the ordered version and size label, then request pit-to-pit and body length. Multi-style listings require an extra check that the exact team or colour arrived."]
    ],
    electronics: [
      ["Model, colour and included parts", "Match the visible model name, colour, plug or connector type and accessory count with the selected variant. Photograph every included part together."],
      ["Ports, display and power indicator", "Inspect ports and buttons for damage. If the warehouse service permits, request a power-on photo showing the screen or indicator, without treating it as a full functional test."],
      ["Labels and safety limits", "Record visible model, serial and regulatory labels when present. Photos cannot prove battery health, radio performance, electrical safety, water resistance or long-term reliability."]
    ]
  }
};

const KB_QC_TITLES = {
  pl: {
    shoes: ["Kształt pary i profil pięty", "Łączenie i poziom podeszwy", "System rozmiarów i pomiary"],
    hoodies: ["Kaptur, ramiona i sznurki", "Ściągacze, zamek i kieszenie", "Położenie grafiki i wymiary"],
    "t-shirts": ["Kołnierz i ramiona", "Położenie nadruku lub haftu", "Szerokość i długość"],
    jackets: ["Listwa, zamek i zapięcia", "Panele, wypełnienie i podszewka", "Kieszenie, mankiety i pomiary"],
    bags: ["Kształt korpusu i spód", "Uchwyty, paski i okucia", "Zamek, podszewka i wymiary"],
    accessories: ["Właściwy wariant i liczba części", "Zawiasy, zapięcia i drobne okucia", "Skala, grawer i ograniczenia"],
    "pants-shorts": ["Pas, stan i rozporek", "Symetria nogawek i szwy", "Obwód pasa i długość"],
    headwear: ["Korona i ustawienie daszka", "Haft, nadruk i szwy", "Obwód i regulacja"],
    jerseys: ["Ustawienie nazwiska i numeru", "Naszywki, sponsorzy i szwy", "Metka i wymiary koszulki"],
    electronics: ["Model, kolor i elementy zestawu", "Porty, ekran i wskaźnik zasilania", "Etykiety i granice bezpieczeństwa"]
  },
  de: {
    shoes: ["Paarform und Fersenprofil", "Sohlenverklebung und Stand", "Größensystem und Maße"],
    hoodies: ["Kapuze, Schultern und Kordeln", "Bündchen, Reißverschluss und Taschen", "Motivposition und Maße"],
    "t-shirts": ["Kragen und Schulterbalance", "Druck- oder Stickposition", "Brustweite und Länge"],
    jackets: ["Leiste, Reißverschluss und Verschlüsse", "Paneele, Füllung und Futter", "Taschen, Bündchen und Maße"],
    bags: ["Korpusform und Boden", "Griffe, Riemen und Beschläge", "Reißverschluss, Futter und Maße"],
    accessories: ["Richtiger Artikel und Stückzahl", "Scharniere, Schließen und Kleinteile", "Größe, Gravur und Grenzen"],
    "pants-shorts": ["Bund, Leibhöhe und Verschluss", "Beinsymmetrie und Nähte", "Bund- und Längenmaße"],
    headwear: ["Krone und Schirmausrichtung", "Stickerei, Druck und Nähte", "Umfang und Verschluss"],
    jerseys: ["Name- und Nummernausrichtung", "Abzeichen, Sponsor und Nähte", "Größenetikett und Maße"],
    electronics: ["Modell, Farbe und Lieferumfang", "Anschlüsse, Display und Anzeige", "Kennzeichnungen und Sicherheitsgrenzen"]
  },
  fr: {
    shoes: ["Forme de la paire et profil du talon", "Collage et niveau de la semelle", "Système de pointure et mesures"],
    hoodies: ["Capuche, épaules et cordons", "Bords-côtes, zip et poches", "Placement du motif et mesures"],
    "t-shirts": ["Col et équilibre des épaules", "Placement de l’impression ou broderie", "Largeur et longueur"],
    jackets: ["Patte, zip et fermetures", "Panneaux, rembourrage et doublure", "Poches, poignets et mesures"],
    bags: ["Forme du corps et base", "Poignées, sangles et pièces métalliques", "Zip, doublure et dimensions"],
    accessories: ["Bon article et nombre de pièces", "Charnières, fermoirs et petites pièces", "Échelle, gravure et limites"],
    "pants-shorts": ["Ceinture, fourche et braguette", "Symétrie des jambes et coutures", "Mesures de taille et longueur"],
    headwear: ["Calotte et alignement de la visière", "Broderie, imprimé et coutures", "Tour de tête et fermeture"],
    jerseys: ["Alignement du nom et du numéro", "Écussons, sponsor et coutures", "Étiquette de taille et mesures"],
    electronics: ["Modèle, couleur et accessoires", "Ports, écran et témoin d’alimentation", "Étiquettes et limites de sécurité"]
  },
  it: {
    shoes: ["Forma della coppia e profilo del tallone", "Incollaggio e livello della suola", "Sistema taglie e misure"],
    hoodies: ["Cappuccio, spalle e cordini", "Polsini, zip e tasche", "Posizione grafica e misure"],
    "t-shirts": ["Collo ed equilibrio delle spalle", "Posizione di stampa o ricamo", "Larghezza torace e lunghezza"],
    jackets: ["Patta, zip e chiusure", "Pannelli, imbottitura e fodera", "Tasche, polsini e misure"],
    bags: ["Forma del corpo e fondo", "Manici, tracolle e minuteria", "Zip, fodera e dimensioni"],
    accessories: ["Articolo corretto e quantità", "Cerniere, chiusure e minuteria", "Scala, incisione e limiti"],
    "pants-shorts": ["Cintura, cavallo e patta", "Simmetria delle gambe e cuciture", "Misure di vita e lunghezza"],
    headwear: ["Corona e allineamento della visiera", "Ricamo, stampa e cuciture", "Circonferenza e chiusura"],
    jerseys: ["Allineamento di nome e numero", "Patch, sponsor e cuciture", "Etichetta taglia e misure"],
    electronics: ["Modello, colore e accessori inclusi", "Porte, display e indicatore", "Etichette e limiti di sicurezza"]
  }
};

const KB_QC_DESCRIPTIONS = {
  pl: {
    shoes: [
      "Ustaw oba buty w tej samej pozycji i porównaj szerokość nosków, profil boczny, wysokość kołnierza oraz tylną linię pięty.",
      "Prześledź krawędź podeszwy po obu stronach i z tyłu; szukaj przerw, nadmiaru kleju, przechyłu lub różnych krawędzi bieżnika.",
      "Dopasuj oznaczenie EU, US, UK lub CN do zamówienia; przy niejasnym przeliczniku poproś o pomiar wkładki albo podeszwy."
    ],
    hoodies: [
      "Sprawdź wyśrodkowanie szwu kaptura, linii ramion i wyjść sznurków; skręconych paneli nie da się skorygować regulacją sznurka.",
      "Porównaj wysokość obu mankietów i ściągacza; po zamknięciu zamka przednie panele oraz kieszenie powinny spotkać się na jednym poziomie.",
      "Oceń położenie nadruku względem dekoltu, środka i kieszeni, a następnie porównaj szerokość klatki i długość z tabelą."
    ],
    "t-shirts": [
      "Połóż koszulkę płasko i porównaj spadek ramion, otwory rękawów, ściągacz kołnierza oraz skręcenie szwów bocznych.",
      "Sprawdź wyśrodkowanie grafiki względem kołnierza i boków oraz widoczne pęknięcia, odklejenia, rozlanie farby lub luźne nici haftu.",
      "Poproś o pomiar od pachy do pachy i długość pleców; rzeczywiste liczby są ważniejsze niż sama wszyta metka."
    ],
    jackets: [
      "Zapnij kurtkę i prześledź linię od kołnierza do dołu; zamek, napy i dziurki nie powinny podciągać jednego panelu.",
      "Porównaj pikowane lub ocieplane sekcje pod kątem pustych miejsc i zbicia wypełnienia oraz sprawdź, czy podszewka nie wystaje.",
      "Porównaj wysokość kieszeni, szerokość mankietów i dół po obu stronach; potwierdź klatkę, rękaw i długość pleców."
    ],
    bags: [
      "Obejrzyj torbę z przodu, boku i od spodu; sprawdź kąty paneli, kształt narożników i czy stoi równo.",
      "Porównaj wysokość i rozstaw mocowań uchwytów; obejrzyj klamry, kółka, łańcuch oraz otwory paska pod kątem braków i rys.",
      "Poproś o zdjęcie otwartej komory; sprawdź tor zamka, podszewkę, kieszenie wewnętrzne, metkę oraz szerokość, wysokość i głębokość."
    ],
    accessories: [
      "Dopasuj kolor, kształt i liczbę elementów; w biżuterii, okularach i zegarkach porównaj kamienie, szkła, tarczę oraz dekoracje.",
      "Poproś o zbliżenia zawiasów i zapięć; szukaj wygiętych trzpieni, niedomkniętych klamer, luźnych śrub, nierównych ogniw i nitek.",
      "Potwierdź rozmiar zdjęciem z linijką i sprawdź położenie graweru; fotografia nie potwierdza próby metalu, dokładności mechanizmu ani ochrony UV."
    ],
    "pants-shorts": [
      "Połóż spodnie płasko i sprawdź poziom pasa, rozmieszczenie szlufek oraz wyśrodkowanie rozporka albo kanału sznurka.",
      "Wyrównaj nogawki i porównaj szew wewnętrzny, zewnętrzny oraz wysokość dołu; pranie lub nadruk powinny znajdować się na właściwych panelach.",
      "Poproś o szerokość pasa bez rozciągania, długość całkowitą oraz w razie potrzeby udo i otwór nogawki."
    ],
    headwear: [
      "Obejrzyj czapkę dokładnie z przodu i boku; panele korony powinny łączyć się równo, a daszek nie może być skręcony.",
      "Użyj środka przodu i łączeń paneli do oceny haftu lub nadruku; sprawdź krawędzie, zerwane nici i ciągłość wzoru.",
      "Potwierdź metkę i rozmiar; dla czapki dopasowanej poproś o obwód, a przy regulowanej sprawdź klamrę, zatrzask lub rzep."
    ],
    jerseys: [
      "Połóż koszulkę płasko i użyj kołnierza oraz boków jako osi; sprawdź pisownię, odstępy cyfr i poziom nadruku z tyłu.",
      "Porównaj położenie naszywek na klatce oraz krawędzie herbów, nadruk sponsora i detale rękawów pod kątem odklejenia i krzywizny.",
      "Dopasuj wersję oraz metkę, potem poproś o szerokość pod pachami i długość; przy wielu wariantach sprawdź dokładny klub i kolor."
    ],
    electronics: [
      "Dopasuj widoczny model, kolor, typ wtyczki lub złącza i liczbę akcesoriów; wszystkie elementy zestawu powinny być na jednym zdjęciu.",
      "Obejrzyj porty i przyciski; jeżeli usługa na to pozwala, poproś o zdjęcie ekranu lub kontrolki po włączeniu, ale nie traktuj go jako pełnego testu.",
      "Zapisz widoczne oznaczenia modelu, numer seryjny i etykiety regulacyjne; zdjęcia nie potwierdzą kondycji baterii ani bezpieczeństwa elektrycznego."
    ]
  },
  de: {
    shoes: [
      "Richte beide Schuhe gleich aus und vergleiche Zehenbreite, Seitenprofil, Kragenhöhe und hintere Fersenlinie.",
      "Verfolge die Sohlenkante an beiden Seiten und hinten auf Lücken, Klebereste, Schrägstand oder unterschiedliche Profilkanten.",
      "Gleiche EU-, US-, UK- oder CN-Angabe mit der Bestellung ab und fordere bei unklarer Umrechnung ein Innen- oder Außensohlenmaß an."
    ],
    hoodies: [
      "Prüfe, ob Kapuzennaht, Schulterlinie und Kordelaustritte mittig sitzen; verdrehte Paneele lassen sich nicht über die Kordel korrigieren.",
      "Vergleiche beide Bündchen und den Saum; bei geschlossenem Reißverschluss müssen Frontteile und Taschen auf gleicher Höhe liegen.",
      "Beurteile Druck oder Stickerei relativ zu Ausschnitt, Mitte und Tasche und vergleiche Brustweite sowie Länge mit der Tabelle."
    ],
    "t-shirts": [
      "Lege das Shirt flach und vergleiche Schulterneigung, Ärmelöffnungen, Kragenrippe und eine mögliche Verdrehung der Seitennähte.",
      "Prüfe die Zentrierung zum Kragen und zu den Seiten sowie sichtbares Ablösen, Reißen, Ausbluten oder lose Stickfäden.",
      "Fordere Achsel-zu-Achsel- und Rückenlänge an; die realen Maße sind aussagekräftiger als nur das eingenähte Etikett."
    ],
    jackets: [
      "Schließe die Jacke und folge der Öffnung vom Kragen bis zum Saum; Zip, Druckknöpfe und Knopflöcher dürfen kein Frontteil hochziehen.",
      "Vergleiche Stepp- oder Füllzonen auf leere Stellen und Klumpen und prüfe, ob Futter an Ärmel, Saum oder Zip hervortritt.",
      "Vergleiche Taschenhöhe, Bündchenweite und Saum beider Seiten und bestätige Brust-, Ärmel- und Rückenlänge."
    ],
    bags: [
      "Betrachte die Tasche von vorn, von der Seite und unten; prüfe Paneelwinkel, Ecken und einen geraden Stand.",
      "Vergleiche Höhe und Abstand der Griffanker und kontrolliere Schnallen, Ringe, Kettenglieder und Riemenlöcher auf Fehlteile und Kratzer.",
      "Lass das Hauptfach offen fotografieren und prüfe Zip, Futter, Innentaschen, Etikett sowie Breite, Höhe und Tiefe."
    ],
    accessories: [
      "Gleiche Farbe, Form und Stückzahl ab; bei Schmuck, Brillen und Uhren müssen Stein-, Glas-, Zifferblatt- und Dekorposition zur Variante passen.",
      "Fordere Nahaufnahmen von Scharnieren und Verschlüssen an und suche nach verbogenen Stiften, lockeren Schrauben, ungleichen Gliedern oder Fäden.",
      "Bestätige die Größe per Linealfoto und die Gravurposition; Fotos belegen weder Metallgehalt, Ganggenauigkeit noch UV-Schutz."
    ],
    "pants-shorts": [
      "Lege das Kleidungsstück flach und prüfe einen geraden Bund, gleichmäßige Gürtelschlaufen und einen mittigen Zip- oder Kordelkanal.",
      "Richte beide Beine aus und vergleiche Innennaht, Außennaht und Saumhöhe; Waschung oder Druck müssen auf den bestellten Paneelen liegen.",
      "Fordere entspannte Bundweite, Gesamtlänge und bei Bedarf Oberschenkel- sowie Beinöffnungsmaß an."
    ],
    headwear: [
      "Betrachte die Mütze frontal und seitlich; Kronenpaneele sollen gleichmäßig zusammentreffen und der Schirm darf nicht verdreht sein.",
      "Nutze Frontmitte und Paneelnähte zur Beurteilung von Stick oder Druck und prüfe Kanten, Fadenbrüche und Musterübergänge.",
      "Bestätige Innenetikett und Größe; bei fitted Modellen den Umfang, bei verstellbaren Modellen Schnalle, Snap oder Klett prüfen."
    ],
    jerseys: [
      "Lege das Trikot flach und nutze Kragen und Seitennähte als Achse; prüfe Schreibweise, Ziffernabstand und eine waagerechte Rückengrafik.",
      "Vergleiche die Abzeichenpositionen und prüfe Patchkanten, Sponsordruck und Ärmeldetails auf Ablösen, Lücken oder Schrägstand.",
      "Gleiche Version und Größenetikett ab und fordere Brustweite sowie Körperlänge an; bei vielen Varianten Team und Farbe extra prüfen."
    ],
    electronics: [
      "Gleiche sichtbares Modell, Farbe, Stecker- oder Anschlusstyp und Zubehörzahl ab; alle gelieferten Teile sollen gemeinsam fotografiert sein.",
      "Prüfe Ports und Tasten auf Schäden und fordere, falls erlaubt, ein Einschaltfoto mit Display oder Anzeige an, ohne es als Funktionstest zu werten.",
      "Erfasse sichtbare Modell-, Serien- und Zulassungslabels; Fotos belegen weder Akkuzustand, Funkleistung noch elektrische Sicherheit."
    ]
  },
  fr: {
    shoes: [
      "Placez les deux chaussures dans la même orientation et comparez largeur de l’avant, profil latéral, hauteur du col et ligne arrière du talon.",
      "Suivez le bord de semelle des deux côtés et à l’arrière pour repérer espace, excès de colle, inclinaison ou bord de crampons différent.",
      "Faites correspondre la pointure EU, US, UK ou CN à la commande et demandez une mesure intérieure ou extérieure si la conversion est incertaine."
    ],
    hoodies: [
      "Vérifiez le centrage de la couture de capuche, des épaules et des sorties de cordon; un panneau tordu ne se corrige pas avec le cordon.",
      "Comparez les deux poignets et le bord; zip fermé, les panneaux avant et les poches doivent se rejoindre au même niveau.",
      "Évaluez le motif par rapport à l’encolure, au centre et à la poche, puis comparez largeur de poitrine et longueur au tableau."
    ],
    "t-shirts": [
      "Posez le t-shirt à plat et comparez pente des épaules, ouvertures des manches, bord-côte du col et torsion des coutures latérales.",
      "Contrôlez le centrage par rapport au col et aux côtés ainsi que tout décollement, fissure, bavure ou fil de broderie lâche.",
      "Demandez la largeur aisselle à aisselle et la longueur dos; les mesures réelles comptent plus que la seule étiquette."
    ],
    jackets: [
      "Fermez la veste et suivez l’ouverture du col au bas; zip, pressions et boutonnières ne doivent pas tirer un panneau plus haut.",
      "Comparez zones matelassées ou rembourrées pour détecter vide et amas, puis vérifiez que la doublure ne dépasse pas.",
      "Comparez hauteur des poches, largeur des poignets et finition du bas, puis confirmez poitrine, manche et longueur dos."
    ],
    bags: [
      "Observez le sac de face, de côté et dessous; contrôlez angles des panneaux, forme des coins et stabilité de la base.",
      "Comparez hauteur et espacement des ancrages de poignée et examinez boucles, anneaux, chaîne et trous de sangle.",
      "Demandez le compartiment principal ouvert et vérifiez zip, doublure, poches, étiquette, largeur, hauteur et profondeur."
    ],
    accessories: [
      "Faites correspondre couleur, forme et nombre de pièces; pour bijoux, lunettes et montres, contrôlez pierres, verres, cadran et décor.",
      "Demandez des gros plans des charnières et fermoirs et cherchez tige pliée, vis lâche, maillon irrégulier ou fil apparent.",
      "Confirmez la taille avec une règle et la position de la gravure; une photo ne prouve ni titre du métal, précision du mouvement ou protection UV."
    ],
    "pants-shorts": [
      "Posez le vêtement à plat et contrôlez ceinture droite, passants réguliers et braguette ou canal de cordon bien centré.",
      "Alignez les jambes et comparez entrejambe, couture extérieure et hauteur des ourlets; lavage ou imprimé doivent être sur les bons panneaux.",
      "Demandez largeur de taille au repos, longueur totale et, si utile, mesure de cuisse et d’ouverture de jambe."
    ],
    headwear: [
      "Observez le chapeau bien de face et de côté; les panneaux de calotte doivent se rejoindre régulièrement et la visière ne pas se tordre.",
      "Utilisez le milieu avant et les jonctions pour juger broderie ou imprimé et contrôlez bords, fils cassés et continuité du motif.",
      "Confirmez étiquette et taille; demandez le tour de tête pour un modèle ajusté et vérifiez boucle, pression ou velcro pour un réglable."
    ],
    jerseys: [
      "Posez le maillot à plat et utilisez col et côtés comme axe; vérifiez orthographe, espacement des chiffres et horizontalité du dos.",
      "Comparez la position des écussons et inspectez leurs bords, le sponsor et les détails de manche pour décollement ou inclinaison.",
      "Vérifiez version et taille, puis demandez largeur poitrine et longueur; sur une fiche multistyle, confirmez équipe et couleur exactes."
    ],
    electronics: [
      "Faites correspondre modèle visible, couleur, type de prise ou connecteur et nombre d’accessoires; photographiez toutes les pièces ensemble.",
      "Inspectez ports et boutons et, si le service l’autorise, demandez une photo allumée de l’écran ou du voyant sans la prendre pour un test complet.",
      "Relevez modèle, numéro de série et étiquettes réglementaires visibles; les photos ne prouvent ni batterie, radio ou sécurité électrique."
    ]
  },
  it: {
    shoes: [
      "Posiziona entrambe le scarpe allo stesso modo e confronta larghezza della punta, profilo laterale, altezza del collarino e linea del tallone.",
      "Segui il bordo della suola sui due lati e dietro per trovare spazi, colla in eccesso, inclinazione o bordi del battistrada diversi.",
      "Abbina la taglia EU, US, UK o CN all’ordine e richiedi la misura della soletta o della suola se la conversione è incerta."
    ],
    hoodies: [
      "Controlla che cucitura del cappuccio, linea delle spalle e uscite dei cordini siano centrate; un pannello attorcigliato non si regola.",
      "Confronta polsini e bordo; con la zip chiusa, pannelli anteriori e tasche devono incontrarsi alla stessa altezza.",
      "Valuta stampa o ricamo rispetto a scollo, centro e tasca, poi confronta larghezza torace e lunghezza con la tabella."
    ],
    "t-shirts": [
      "Stendi la maglia e confronta pendenza delle spalle, aperture delle maniche, costina del collo e torsione delle cuciture laterali.",
      "Controlla centratura rispetto a collo e lati e cerca sollevamenti, crepe, sbavature o fili sciolti del ricamo.",
      "Richiedi misura ascella-ascella e lunghezza posteriore; i numeri reali contano più della sola etichetta cucita."
    ],
    jackets: [
      "Chiudi la giacca e segui l’apertura dal collo al fondo; zip, bottoni e asole non devono tirare un pannello più in alto.",
      "Confronta zone trapuntate o imbottite per vuoti e accumuli e verifica che la fodera non sporga da polsi, fondo o zip.",
      "Confronta altezza tasche, larghezza polsini e fondo, poi conferma torace, manica e lunghezza della schiena."
    ],
    bags: [
      "Osserva la borsa davanti, di lato e dal fondo; controlla angoli dei pannelli, forma degli spigoli e stabilità della base.",
      "Confronta altezza e distanza degli attacchi dei manici ed esamina fibbie, anelli, catena e fori della tracolla.",
      "Richiedi il vano principale aperto e verifica zip, fodera, tasche interne, etichetta, larghezza, altezza e profondità."
    ],
    accessories: [
      "Abbina colore, forma e numero di pezzi; per gioielli, occhiali e orologi confronta pietre, lenti, quadrante e decorazioni.",
      "Richiedi primi piani di cerniere e chiusure e cerca perni piegati, viti allentate, maglie irregolari o fili esposti.",
      "Conferma dimensione con un righello e posizione dell’incisione; una foto non prova titolo del metallo, precisione o protezione UV."
    ],
    "pants-shorts": [
      "Stendi il capo e controlla cintura in piano, passanti regolari e patta o canale del cordino ben centrato.",
      "Allinea le gambe e confronta cucitura interna, esterna e altezza degli orli; lavaggio o stampa devono essere sui pannelli ordinati.",
      "Richiedi larghezza vita a riposo, lunghezza totale e, se utile, misura della coscia e apertura della gamba."
    ],
    headwear: [
      "Osserva il cappello esattamente davanti e di lato; i pannelli della corona devono unirsi regolarmente e la visiera non deve torcersi.",
      "Usa centro frontale e giunzioni per valutare ricamo o stampa e controlla bordi, fili rotti e continuità del motivo.",
      "Conferma etichetta e taglia; per un fitted chiedi la circonferenza, per un regolabile controlla fibbia, snap o velcro."
    ],
    jerseys: [
      "Stendi la maglia e usa collo e lati come asse; controlla ortografia, distanza tra le cifre e livello della grafica posteriore.",
      "Confronta la posizione delle patch e ispeziona bordi, sponsor e dettagli delle maniche per sollevamenti, spazi o inclinazioni.",
      "Abbina versione ed etichetta, poi richiedi larghezza torace e lunghezza; nelle inserzioni multistile conferma squadra e colore."
    ],
    electronics: [
      "Abbina modello visibile, colore, tipo di spina o connettore e quantità di accessori; fotografa insieme tutti i componenti inclusi.",
      "Ispeziona porte e pulsanti e, se consentito, richiedi una foto di accensione con schermo o indicatore senza considerarla un test completo.",
      "Registra modello, seriale ed etichette normative visibili; le foto non provano salute batteria, prestazioni radio o sicurezza elettrica."
    ]
  }
};

let kbCatalogPromise;
let kbApplying = false;
let kbObserver;

function kbLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  const stored = window.localStorage?.getItem("kakobuys-language");
  return KB_LANGS.includes(fromUrl) ? fromUrl : (KB_LANGS.includes(stored) ? stored : "en");
}

function kbEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function kbLoadCatalog() {
  if (!kbCatalogPromise) {
    kbCatalogPromise = fetch("/assets/product-catalog.json", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog data returned ${response.status}`);
        return response.json();
      });
  }
  return kbCatalogPromise;
}

function kbEnsureCss() {
  if (document.querySelector('link[data-kb-catalog-upgrade]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/catalog-upgrade.css";
  link.dataset.kbCatalogUpgrade = "true";
  document.head.append(link);
}

function kbUsd(product, catalog) {
  return (Number(product.cny) / Number(catalog.cnyPerUsd)).toFixed(2);
}

function kbProductCard(product, catalog, language) {
  const copy = KB_COPY[language];
  const category = copy.categories[product.category] || product.category;
  return `
    <article class="kb-product-card">
      <a href="/products/${kbEscape(product.page)}/" aria-label="${kbEscape(copy.view)}: ${kbEscape(product.name)}">
        <div class="kb-product-image">
          <img src="${kbEscape(product.image)}" alt="${kbEscape(product.name)}" loading="lazy" decoding="async">
          <span>${kbEscape(copy.view)} →</span>
        </div>
        <div class="kb-product-copy">
          <small>${kbEscape(category)}</small>
          <h3>${kbEscape(product.name)}</h3>
          <p class="kb-product-meta">
            <span>ID ${kbEscape(product.id)}</span>
            <strong>≈ $${kbUsd(product, catalog)}</strong>
          </p>
        </div>
      </a>
    </article>`;
}

function kbQcFor(category, language) {
  const english = KB_QC.en[category] || [];
  if (language === "en") return english;
  const titles = KB_QC_TITLES[language]?.[category] || english.map((item) => item[0]);
  const descriptions = KB_QC_DESCRIPTIONS[language]?.[category] || english.map((item) => item[1]);
  return english.map((item, index) => [titles[index] || item[0], descriptions[index] || item[1]]);
}

function kbQcHtml(category, language) {
  return kbQcFor(category, language).map((item, index) => `
    <article class="kb-qc-card">
      <span>0${index + 1}</span>
      <h3>${kbEscape(item[0])}</h3>
      <p>${kbEscape(item[1])}</p>
    </article>`).join("");
}

function kbAddItemList(products, catalog) {
  const signature = products.map((product) => product.page).join("-");
  const old = document.querySelector('script[data-kb-item-list]');
  if (old?.dataset.kbSignature === signature) return;
  if (old) old.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.kbItemList = "true";
  script.dataset.kbSignature = signature;
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://kakobuys.shop/products/${product.page}/`,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image,
        sku: product.id,
        url: `https://kakobuys.shop/products/${product.page}/`,
        additionalProperty: [
          {"@type": "PropertyValue", name: "Source price (CNY)", value: String(product.cny)},
          {"@type": "PropertyValue", name: "USD reference", value: kbUsd(product, catalog)}
        ]
      }
    }))
  });
  document.head.append(script);
}

function kbUpgradeHome(catalog, language) {
  const copy = KB_COPY[language];
  document.querySelectorAll("#categories .category-card").forEach((card, index) => {
    const category = KB_CATEGORY_ORDER[index];
    if (!category) return;
    card.href = `/catalog/${category}`;
    card.removeAttribute("target");
    card.removeAttribute("rel");
  });

  const grid = document.querySelector(".listing-grid");
  if (!grid) return;
  const products = catalog.products.filter((product) => product.home).slice(0, 16);
  if (grid.dataset.kbRevision !== `${KB_REVISION}-${language}`) {
    grid.className = "listing-grid kb-product-grid kb-home-grid";
    grid.innerHTML = products.map((product) => kbProductCard(product, catalog, language)).join("");
    grid.dataset.kbRevision = `${KB_REVISION}-${language}`;
  }

  const section = grid.closest("section");
  const title = section?.querySelector(".section-heading h2");
  const intro = section?.querySelector(".section-heading > p");
  if (title && title.textContent !== copy.homeTitle) title.textContent = copy.homeTitle;
  if (intro && intro.textContent !== copy.homeIntro) intro.textContent = copy.homeIntro;

  let button = section?.querySelector(".kb-expand");
  if (!button && section) {
    button = document.createElement("button");
    button.type = "button";
    button.className = "kb-expand";
    grid.insertAdjacentElement("afterend", button);
  }
  if (button && !button.dataset.kbBound) {
    button.addEventListener("click", () => {
      const expanded = grid.classList.toggle("is-expanded");
      button.textContent = expanded ? copy.showLess : copy.showMore;
      button.setAttribute("aria-expanded", String(expanded));
    });
    button.dataset.kbBound = "true";
  }
  if (button) {
    const buttonText = grid.classList.contains("is-expanded") ? copy.showLess : copy.showMore;
    if (button.textContent !== buttonText) button.textContent = buttonText;
    button.setAttribute("aria-expanded", String(grid.classList.contains("is-expanded")));
  }

  let note = section?.querySelector(".listing-disclosure");
  if (!note && section) {
    note = document.createElement("p");
    note.className = "listing-disclosure kb-product-note";
    section.querySelector(".shell")?.append(note);
  }
  if (note && note.textContent !== copy.disclosure) note.textContent = copy.disclosure;
  kbAddItemList(products, catalog);
}

function kbUpgradeCategory(catalog, language, category) {
  const copy = KB_COPY[language];
  const layout = document.querySelector(".guide-layout");
  const article = layout?.querySelector(".prose");
  const aside = layout?.querySelector(".side-card");
  if (!article || !aside) return;
  const products = catalog.products.filter((product) => product.category === category);
  const image = article.querySelector("img");
  const imageHtml = image
    ? `<img src="${kbEscape(image.src)}" alt="${kbEscape(copy.categories[category])}" style="width:100%;max-height:430px;object-fit:cover;border-radius:18px;margin-bottom:32px">`
    : "";

  if (article.dataset.kbRevision !== `${KB_REVISION}-${category}-${language}`) {
    article.innerHTML = `
      ${imageHtml}
      <div class="kb-qc-intro">
        <h2>${kbEscape(copy.qcTitle)}</h2>
        <p>${kbEscape(copy.qcIntro)}</p>
      </div>
      <div class="kb-qc-grid">${kbQcHtml(category, language)}</div>
      <h2>${kbEscape(copy.limitsTitle)}</h2>
      <p>${kbEscape(copy.limitsBody)}</p>
      <section class="kb-category-products" id="category-products">
        <h2>${kbEscape(copy.categoryProducts)}</h2>
        <p>${kbEscape(copy.categoryProductsIntro)}</p>
        <div class="kb-product-grid">
          ${products.map((product) => kbProductCard(product, catalog, language)).join("")}
        </div>
        <p class="kb-product-note">${kbEscape(copy.disclosure)}</p>
      </section>`;
    article.dataset.kbRevision = `${KB_REVISION}-${category}-${language}`;
  }

  const qc = kbQcFor(category, language);
  if (aside.dataset.kbRevision !== `${KB_REVISION}-${category}-${language}`) {
    aside.innerHTML = `
      <p class="kicker">${kbEscape(copy.qcTitle)}</p>
      <h2>${kbEscape(copy.categories[category])}</h2>
      <ul class="kb-side-list">
        ${qc.map((item) => `<li>${kbEscape(item[0])}</li>`).join("")}
      </ul>
      <a class="button button-dark kb-side-button" href="#category-products">${kbEscape(copy.browseRoutes)} ↓</a>
      <a class="button kb-side-button" href="/guides">${kbEscape(copy.readGuide)}</a>`;
    aside.dataset.kbRevision = `${KB_REVISION}-${category}-${language}`;
  }
  kbAddItemList(products, catalog);
}

function kbSetMeta(selector, content) {
  let node = document.querySelector(selector);
  if (!node && selector.startsWith("meta")) {
    node = document.createElement("meta");
    const nameMatch = selector.match(/name="([^"]+)"/);
    const propertyMatch = selector.match(/property="([^"]+)"/);
    if (nameMatch) node.name = nameMatch[1];
    if (propertyMatch) node.setAttribute("property", propertyMatch[1]);
    document.head.append(node);
  }
  if (node) node.setAttribute("content", content);
}

function kbRenderProduct(catalog, language) {
  const root = document.getElementById("kbProductRoot");
  if (!root) return false;
  const copy = KB_COPY[language];
  const pathMatch = window.location.pathname.match(/^\/products\/(\d+)\/?$/);
  const page = pathMatch?.[1] || new URLSearchParams(window.location.search).get("pid");
  const product = catalog.products.find((item) => item.page === page);
  const select = document.getElementById("kbLanguageSelect");
  if (select) {
    select.value = language;
    if (!select.dataset.bound) {
      select.addEventListener("change", () => {
        window.localStorage?.setItem("kakobuys-language", select.value);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", select.value);
        window.location.href = `${url.pathname}${url.search}`;
      });
      select.dataset.bound = "true";
    }
  }
  if (!product) {
    root.innerHTML = `<p>${kbEscape(copy.unavailable)}</p>`;
    return true;
  }
  const productRevision = `${KB_REVISION}-${product.page}-${language}`;
  if (root.dataset.kbRevision === productRevision) return true;

  const categoryName = copy.categories[product.category];
  const usd = kbUsd(product, catalog);
  const canonical = `https://kakobuys.shop/products/${product.page}/`;
  document.documentElement.lang = language;
  document.title = `${product.name} — Product ID ${product.id} | Kakobuys.shop`;
  kbSetMeta('meta[name="description"]', `Independent product record for ${product.name}: source item ID ${product.id}, first image, reference price and category-specific QC questions.`);
  kbSetMeta('meta[property="og:title"]', `${product.name} | Kakobuys.shop`);
  kbSetMeta('meta[property="og:description"]', `Source item ID ${product.id}, reference price and visible QC checklist.`);
  kbSetMeta('meta[property="og:image"]', product.image);
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.append(canonicalLink);
  }
  canonicalLink.href = canonical;

  root.innerHTML = `
    <p class="kb-breadcrumbs">
      <a href="/">${kbEscape(copy.breadcrumbHome)}</a> /
      <a href="/catalog/${kbEscape(product.category)}">${kbEscape(categoryName)}</a> /
      ${kbEscape(product.name)}
    </p>
    <div class="kb-detail-grid">
      <div class="kb-detail-image">
        <img src="${kbEscape(product.image)}" alt="${kbEscape(product.name)}" fetchpriority="high">
      </div>
      <article class="kb-detail-copy">
        <p class="kb-kicker">${kbEscape(copy.independentRecord)}</p>
        <h1>${kbEscape(product.name)}</h1>
        <p class="kb-price">≈ $${usd}<small>${kbEscape(copy.usdReference)} · ¥${kbEscape(product.cny)} ${kbEscape(copy.sourcePrice)}</small></p>
        <div class="kb-facts">
          <div class="kb-fact"><span>${kbEscape(copy.productId)}</span><strong>${kbEscape(product.id)}</strong></div>
          <div class="kb-fact"><span>${kbEscape(copy.category)}</span><strong>${kbEscape(categoryName)}</strong></div>
          <div class="kb-fact"><span>${kbEscape(copy.reviewed)}</span><strong>${kbEscape(catalog.reviewed)}</strong></div>
        </div>
        <a class="kb-source-button" href="https://www.cnfanshp.com/AllProducts/${kbEscape(product.page)}.html" target="_blank" rel="noopener noreferrer">${kbEscape(copy.continue)}</a>
        <p class="kb-detail-note">${kbEscape(copy.detailNote)}</p>
      </article>
    </div>
    <section class="kb-detail-qc">
      <h2>${kbEscape(copy.productQcTitle)}</h2>
      <p>${kbEscape(copy.qcIntro)}</p>
      <div class="kb-qc-grid">${kbQcHtml(product.category, language)}</div>
      <a href="/catalog/${kbEscape(product.category)}" class="kb-source-button">${kbEscape(copy.backCategory)} →</a>
    </section>`;

  const oldStructured = document.querySelector('script[data-kb-product-structured]');
  if (oldStructured) oldStructured.remove();
  const structured = document.createElement("script");
  structured.type = "application/ld+json";
  structured.dataset.kbProductStructured = "true";
  structured.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    sku: product.id,
    category: categoryName,
    url: canonical,
    additionalProperty: [
      {"@type": "PropertyValue", name: "Source price (CNY)", value: String(product.cny)},
      {"@type": "PropertyValue", name: "USD reference", value: usd},
      {"@type": "PropertyValue", name: "Source facts reviewed", value: catalog.reviewed}
    ]
  });
  document.head.append(structured);
  document.querySelector("[data-kb-footer]")?.replaceChildren(document.createTextNode(copy.footer));
  root.dataset.kbRevision = productRevision;
  return true;
}

async function kbApply() {
  if (kbApplying) return;
  kbApplying = true;
  try {
    kbEnsureCss();
    const catalog = await kbLoadCatalog();
    const language = kbLanguage();
    if (kbRenderProduct(catalog, language)) return;
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/") {
      kbUpgradeHome(catalog, language);
      return;
    }
    const match = path.match(/^\/catalog\/([^/]+)$/);
    if (match && KB_CATEGORY_ORDER.includes(match[1])) {
      kbUpgradeCategory(catalog, language, match[1]);
    }
  } catch (error) {
    console.error("[Kakobuys catalog upgrade]", error);
  } finally {
    kbApplying = false;
  }
}

function kbSchedule() {
  window.clearTimeout(kbSchedule.timer);
  kbSchedule.timer = window.setTimeout(kbApply, 60);
}

kbEnsureCss();
kbApply();
window.setTimeout(kbApply, 250);
window.setTimeout(kbApply, 900);
kbObserver = new MutationObserver(kbSchedule);
kbObserver.observe(document.documentElement, { childList: true, subtree: true });
