import LanguageSwitcher from "./language-switcher";
import { articleContent } from "./article-content";
import { notFound } from "next/navigation";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "pl";

export const localeCodes: Locale[] = ["en", "de", "fr", "es", "it", "pl"];

export const categories = [
  { name: "Sneakers", href: "https://www.cnfanshp.com/shoes/", code: "SNK", note: "Footwear finds" },
  { name: "Hoodies", href: "https://www.cnfanshp.com/hoodies-sweaters/", code: "HDY", note: "Layers & knits" },
  { name: "T-Shirts", href: "https://www.cnfanshp.com/t-shirts/", code: "TEE", note: "Daily rotation" },
  { name: "Jerseys", href: "https://www.cnfanshp.com/jersey/", code: "JSY", note: "Club & country" },
  { name: "Pants", href: "https://www.cnfanshp.com/pants-shorts/", code: "PNT", note: "Denim & shorts" },
  { name: "Headwear", href: "https://www.cnfanshp.com/headwear/", code: "CAP", note: "Caps & beanies" },
  { name: "Accessories", href: "https://www.cnfanshp.com/accessories/", code: "ACC", note: "Small essentials" },
  { name: "Electronics", href: "https://www.cnfanshp.com/electronics/", code: "ELX", note: "Tech finds" },
];

export const products = [
  { name: "Stone Island Hoodie · 40 styles", category: "Hoodies", price: "$25 est.", image: "/products/hoodie.webp", href: "https://www.cnfanshp.com/AllProducts/5564.html", gate: "A01" },
  { name: "Patagonia Loose Crewneck", category: "Sweatshirts", price: "$19 est.", image: "/products/crewneck.webp", href: "https://www.cnfanshp.com/AllProducts/5974.html", gate: "A02" },
  { name: "Curated Sneaker Find #60", category: "Shoes", price: "$46 est.", image: "/products/sneakers.jpg", href: "https://www.cnfanshp.com/AllProducts/6045.html", gate: "B06" },
  { name: "Piqué Cotton Short Sleeve", category: "T-Shirts", price: "$30 est.", image: "/products/polo.webp", href: "https://www.cnfanshp.com/AllProducts/5976.html", gate: "B12" },
  { name: "Letter-Embroidered Cap", category: "Headwear", price: "$12 est.", image: "/products/cap.webp", href: "https://www.cnfanshp.com/AllProducts/5971.html", gate: "C04" },
  { name: "BIGBOY Relaxed Jeans", category: "Pants", price: "$19 est.", image: "/products/jeans.webp", href: "https://www.cnfanshp.com/AllProducts/5662.html", gate: "C08" },
  { name: "Everyday Sport Shorts", category: "Shorts", price: "$19 est.", image: "/products/shorts.webp", href: "https://www.cnfanshp.com/AllProducts/5789.html", gate: "D03" },
];

type Copy = {
  nav: string[];
  route: string;
  homeOverline: string;
  homeTitle: string;
  homeAccent: string;
  homeLead: string;
  searchLabel: string;
  searchPrompt: string;
  searchPlaceholder: string;
  searchButton: string;
  categoryEyebrow: string;
  categoryTitle: string;
  categoryLead: string;
  productEyebrow: string;
  productTitle: string;
  qcEyebrow: string;
  qcTitle: string;
  qcLead: string;
  articlesEyebrow: string;
  articlesTitle: string;
  articlesLead: string;
  helpEyebrow: string;
  helpTitle: string;
  helpLead: string;
  open: string;
  read: string;
  back: string;
};

export const copy: Record<Locale, Copy> = {
  en: { nav:["Categories","Product Tags","QC Desk","SEO Articles","Help"], route:"Get a route", homeOverline:"Independent product route", homeTitle:"USFans Spreadsheet,", homeAccent:"cleared for takeoff.", homeLead:"A sharper way to discover product finds, compare approximate USD prices and understand QC photos before your parcel leaves the warehouse.", searchLabel:"Search route", searchPrompt:"What are you looking for?", searchPlaceholder:"hoodie / jersey / shoes", searchButton:"Scan catalog", categoryEyebrow:"01 / Departure board", categoryTitle:"Choose your route.", categoryLead:"Eight focused collections that open the matching live catalog.", productEyebrow:"02 / Baggage claim", productTitle:"Fresh tags on the belt.", qcEyebrow:"03 / Visual inspection", qcTitle:"Put every QC photo under the light.", qcLead:"A repeatable inspection order for warehouse photos, without pretending a photograph can guarantee material or durability.", articlesEyebrow:"04 / Field notes", articlesTitle:"SEO guides with useful answers.", articlesLead:"Fact-based guides for spreadsheet discovery, QC decisions and parcel-cost planning.", helpEyebrow:"05 / Information desk", helpTitle:"Questions before boarding?", helpLead:"Clear answers, without vague promises.", open:"Open route", read:"Read guide", back:"Back to articles" },
  de: { nav:["Kategorien","Produkt-Tags","QC-Prüfung","SEO-Ratgeber","Hilfe"], route:"Route finden", homeOverline:"Unabhängige Produktsuche", homeTitle:"USFans Spreadsheet,", homeAccent:"bereit zum Abflug.", homeLead:"Produkte schneller entdecken, ungefähre USD-Preise vergleichen und QC-Fotos prüfen, bevor das Paket das Lager verlässt.", searchLabel:"Suchroute", searchPrompt:"Was suchst du?", searchPlaceholder:"Hoodie / Trikot / Schuhe", searchButton:"Katalog durchsuchen", categoryEyebrow:"01 / Abflugtafel", categoryTitle:"Wähle deine Route.", categoryLead:"Acht gezielte Kollektionen führen direkt zum passenden Live-Katalog.", productEyebrow:"02 / Gepäckausgabe", productTitle:"Neue Tags auf dem Band.", qcEyebrow:"03 / Sichtprüfung", qcTitle:"Jedes QC-Foto genau prüfen.", qcLead:"Eine wiederholbare Prüfreihenfolge für Lagerfotos – ohne falsche Qualitätsversprechen.", articlesEyebrow:"04 / Reiseberichte", articlesTitle:"SEO-Ratgeber mit echten Antworten.", articlesLead:"Faktenbasierte Leitfäden zu Produktsuche, QC und Paketkosten.", helpEyebrow:"05 / Information", helpTitle:"Fragen vor dem Abflug?", helpLead:"Klare Antworten ohne vage Versprechen.", open:"Route öffnen", read:"Ratgeber lesen", back:"Zurück zu den Ratgebern" },
  fr: { nav:["Catégories","Étiquettes","Contrôle QC","Articles SEO","Aide"], route:"Trouver une route", homeOverline:"Route produit indépendante", homeTitle:"USFans Spreadsheet,", homeAccent:"prêt au décollage.", homeLead:"Découvrez des produits, comparez les prix indicatifs en USD et comprenez les photos QC avant le départ de votre colis.", searchLabel:"Route de recherche", searchPrompt:"Que recherchez-vous ?", searchPlaceholder:"sweat / maillot / chaussures", searchButton:"Rechercher", categoryEyebrow:"01 / Tableau des départs", categoryTitle:"Choisissez votre route.", categoryLead:"Huit collections ciblées ouvrant le catalogue correspondant.", productEyebrow:"02 / Retrait bagages", productTitle:"Nouvelles étiquettes sur le tapis.", qcEyebrow:"03 / Inspection visuelle", qcTitle:"Examinez chaque photo QC.", qcLead:"Une méthode cohérente pour vérifier les photos d’entrepôt sans promettre ce qu’une image ne peut prouver.", articlesEyebrow:"04 / Carnet de route", articlesTitle:"Des articles SEO réellement utiles.", articlesLead:"Des guides factuels sur les spreadsheets, le QC et le coût des colis.", helpEyebrow:"05 / Bureau d’information", helpTitle:"Une question avant le départ ?", helpLead:"Des réponses claires, sans promesses vagues.", open:"Ouvrir", read:"Lire le guide", back:"Retour aux articles" },
  es: { nav:["Categorías","Etiquetas","Control QC","Artículos SEO","Ayuda"], route:"Buscar ruta", homeOverline:"Ruta de productos independiente", homeTitle:"USFans Spreadsheet,", homeAccent:"listo para despegar.", homeLead:"Descubre productos, compara precios aproximados en USD y entiende las fotos QC antes de que el paquete salga del almacén.", searchLabel:"Ruta de búsqueda", searchPrompt:"¿Qué estás buscando?", searchPlaceholder:"sudadera / camiseta / zapatillas", searchButton:"Buscar catálogo", categoryEyebrow:"01 / Panel de salidas", categoryTitle:"Elige tu ruta.", categoryLead:"Ocho colecciones que abren el catálogo correspondiente.", productEyebrow:"02 / Recogida de equipaje", productTitle:"Nuevas etiquetas en la cinta.", qcEyebrow:"03 / Inspección visual", qcTitle:"Revisa cada foto QC con detalle.", qcLead:"Un orden de inspección repetible para fotos de almacén, sin promesas que una imagen no puede demostrar.", articlesEyebrow:"04 / Notas de viaje", articlesTitle:"Guías SEO con respuestas útiles.", articlesLead:"Guías basadas en hechos sobre spreadsheets, QC y costes de envío.", helpEyebrow:"05 / Información", helpTitle:"¿Preguntas antes de salir?", helpLead:"Respuestas claras, sin promesas vagas.", open:"Abrir ruta", read:"Leer guía", back:"Volver a artículos" },
  it: { nav:["Categorie","Etichette","Controllo QC","Articoli SEO","Aiuto"], route:"Trova una rotta", homeOverline:"Rotta prodotti indipendente", homeTitle:"USFans Spreadsheet,", homeAccent:"pronto al decollo.", homeLead:"Scopri prodotti, confronta prezzi indicativi in USD e interpreta le foto QC prima che il pacco lasci il magazzino.", searchLabel:"Rotta di ricerca", searchPrompt:"Cosa stai cercando?", searchPlaceholder:"felpa / maglia / scarpe", searchButton:"Cerca catalogo", categoryEyebrow:"01 / Tabellone partenze", categoryTitle:"Scegli la tua rotta.", categoryLead:"Otto collezioni mirate che aprono il catalogo corrispondente.", productEyebrow:"02 / Ritiro bagagli", productTitle:"Nuove etichette sul nastro.", qcEyebrow:"03 / Ispezione visiva", qcTitle:"Esamina ogni foto QC.", qcLead:"Un ordine di controllo ripetibile per le foto di magazzino, senza promesse che una foto non può dimostrare.", articlesEyebrow:"04 / Note di viaggio", articlesTitle:"Guide SEO con risposte utili.", articlesLead:"Guide basate sui fatti per spreadsheet, QC e costi del pacco.", helpEyebrow:"05 / Informazioni", helpTitle:"Domande prima della partenza?", helpLead:"Risposte chiare, senza promesse vaghe.", open:"Apri rotta", read:"Leggi guida", back:"Torna agli articoli" },
  pl: { nav:["Kategorie","Etykiety","Kontrola QC","Artykuły SEO","Pomoc"], route:"Znajdź trasę", homeOverline:"Niezależna trasa produktowa", homeTitle:"USFans Spreadsheet,", homeAccent:"gotowy do startu.", homeLead:"Odkrywaj produkty, porównuj orientacyjne ceny w USD i sprawdzaj zdjęcia QC przed wysyłką paczki z magazynu.", searchLabel:"Trasa wyszukiwania", searchPrompt:"Czego szukasz?", searchPlaceholder:"bluza / koszulka / buty", searchButton:"Przeszukaj katalog", categoryEyebrow:"01 / Tablica odlotów", categoryTitle:"Wybierz swoją trasę.", categoryLead:"Osiem kolekcji prowadzących do odpowiedniego katalogu.", productEyebrow:"02 / Odbiór bagażu", productTitle:"Nowe etykiety na taśmie.", qcEyebrow:"03 / Kontrola wizualna", qcTitle:"Sprawdź każde zdjęcie QC.", qcLead:"Powtarzalna kolejność kontroli zdjęć magazynowych, bez obietnic, których zdjęcie nie może potwierdzić.", articlesEyebrow:"04 / Notatki z trasy", articlesTitle:"Artykuły SEO z użytecznymi odpowiedziami.", articlesLead:"Praktyczne poradniki o spreadsheetach, QC i kosztach przesyłki.", helpEyebrow:"05 / Punkt informacji", helpTitle:"Pytania przed startem?", helpLead:"Jasne odpowiedzi bez pustych obietnic.", open:"Otwórz trasę", read:"Czytaj poradnik", back:"Wróć do artykułów" },
};

const localizedFaqs: Record<Locale, { q: string; a: string }[]> = {
  en: [
    { q:"What is a USFans spreadsheet?", a:"An independently organized product-link directory that makes finds easier to browse. It is an index, not inventory and not a quality guarantee." },
    { q:"Does the search box open matching results?", a:"Yes. The exact keyword is sent to the matching main-catalog search results instead of opening a generic catalog page." },
    { q:"Are the displayed USD prices final?", a:"No. They are approximate product-price references. Exchange rates, domestic delivery, services and international parcel shipping can change the total." },
    { q:"What should I inspect in QC photos?", a:"Start with shape and color, then review stitching, labels, hardware, prints, size markings and visible defects." },
    { q:"How many QC photos does USFans describe?", a:"Current public product pages state that 3–7 HD inspection photos may be provided. The exact images available can vary by item and service." },
    { q:"Can QC photos prove material quality?", a:"No. Photos can reveal visible issues but cannot prove durability, feel, composition or long-term performance." },
    { q:"Does this site sell or ship products?", a:"No. It is an independent discovery and education site. Product, category and search actions open the external main catalog." },
    { q:"Which languages are available here?", a:"English, German, French, Spanish, Italian and Polish use separate crawlable URLs. Switching language keeps you on the same page." },
  ],
  de: [
    { q:"Was ist ein USFans Spreadsheet?", a:"Ein unabhängig organisierter Produktlink-Katalog. Er ist ein Index, kein Warenbestand und keine Qualitätsgarantie." },
    { q:"Öffnet die Suche passende Ergebnisse?", a:"Ja. Der genaue Suchbegriff wird an die passende Suche im Hauptkatalog übertragen." },
    { q:"Sind die USD-Preise endgültig?", a:"Nein. Es sind ungefähre Produktpreise. Wechselkurs, Inlandslieferung, Services und internationaler Versand verändern den Gesamtpreis." },
    { q:"Was sollte ich auf QC-Fotos prüfen?", a:"Zuerst Form und Farbe, danach Nähte, Etiketten, Hardware, Drucke, Größenangaben und sichtbare Mängel." },
    { q:"Wie viele QC-Fotos nennt USFans?", a:"Aktuelle öffentliche Produktseiten nennen 3–7 HD-Prüffotos. Die tatsächliche Anzahl kann je Artikel und Service variieren." },
    { q:"Beweisen QC-Fotos die Materialqualität?", a:"Nein. Fotos zeigen sichtbare Probleme, beweisen aber nicht Haltbarkeit, Haptik oder Zusammensetzung." },
    { q:"Verkauft oder versendet diese Seite Produkte?", a:"Nein. Sie dient der unabhängigen Produktsuche und Information; Links öffnen den externen Hauptkatalog." },
    { q:"Welche Sprachen gibt es?", a:"Englisch, Deutsch, Französisch, Spanisch, Italienisch und Polnisch haben eigene crawlbare URLs. Der Seitenkontext bleibt erhalten." },
  ],
  fr: [
    { q:"Qu’est-ce qu’un spreadsheet USFans ?", a:"Un répertoire indépendant de liens produits. C’est un index, pas un stock ni une garantie de qualité." },
    { q:"La recherche ouvre-t-elle les bons résultats ?", a:"Oui. Le mot-clé exact est transmis à la recherche correspondante du catalogue principal." },
    { q:"Les prix en USD sont-ils définitifs ?", a:"Non. Ce sont des références approximatives. Change, livraison locale, services et transport international modifient le total." },
    { q:"Que vérifier sur les photos QC ?", a:"Commencez par la forme et la couleur, puis vérifiez coutures, étiquettes, pièces métalliques, impressions, tailles et défauts visibles." },
    { q:"Combien de photos QC USFans annonce-t-il ?", a:"Les pages produits publiques actuelles indiquent 3 à 7 photos HD. Le nombre réel peut varier selon l’article et le service." },
    { q:"Les photos prouvent-elles la qualité du matériau ?", a:"Non. Elles montrent des défauts visibles mais ne prouvent ni durabilité, ni toucher, ni composition." },
    { q:"Ce site vend-il ou expédie-t-il ?", a:"Non. C’est un guide indépendant. Les actions produit, catégorie et recherche ouvrent le catalogue externe." },
    { q:"Quelles langues sont disponibles ?", a:"Anglais, allemand, français, espagnol, italien et polonais disposent d’URL distinctes et indexables." },
  ],
  es: [
    { q:"¿Qué es un spreadsheet de USFans?", a:"Un directorio independiente de enlaces de productos. Es un índice, no inventario ni garantía de calidad." },
    { q:"¿La búsqueda abre resultados coincidentes?", a:"Sí. La palabra exacta se envía a la búsqueda correspondiente del catálogo principal." },
    { q:"¿Los precios en USD son finales?", a:"No. Son referencias aproximadas; cambio, envío nacional, servicios y transporte internacional cambian el total." },
    { q:"¿Qué debo revisar en las fotos QC?", a:"Empieza por forma y color; después revisa costuras, etiquetas, herrajes, estampados, tallas y defectos visibles." },
    { q:"¿Cuántas fotos QC describe USFans?", a:"Las páginas públicas actuales indican entre 3 y 7 fotos HD. La cantidad real puede variar por artículo y servicio." },
    { q:"¿Las fotos demuestran la calidad del material?", a:"No. Pueden mostrar problemas visibles, pero no demuestran durabilidad, tacto o composición." },
    { q:"¿Este sitio vende o envía productos?", a:"No. Es un sitio independiente de descubrimiento y educación; los enlaces abren el catálogo externo." },
    { q:"¿Qué idiomas están disponibles?", a:"Inglés, alemán, francés, español, italiano y polaco tienen URL separadas e indexables." },
  ],
  it: [
    { q:"Cos’è uno spreadsheet USFans?", a:"Una directory indipendente di link prodotto. È un indice, non un inventario né una garanzia di qualità." },
    { q:"La ricerca apre risultati corrispondenti?", a:"Sì. La parola esatta viene inviata alla ricerca corrispondente del catalogo principale." },
    { q:"I prezzi in USD sono definitivi?", a:"No. Sono riferimenti indicativi; cambio, consegna interna, servizi e spedizione internazionale modificano il totale." },
    { q:"Cosa controllare nelle foto QC?", a:"Inizia da forma e colore, poi controlla cuciture, etichette, hardware, stampe, taglie e difetti visibili." },
    { q:"Quante foto QC descrive USFans?", a:"Le attuali pagine prodotto pubbliche indicano 3–7 foto HD. Il numero reale può variare per articolo e servizio." },
    { q:"Le foto provano la qualità del materiale?", a:"No. Mostrano problemi visibili ma non provano durata, sensazione o composizione." },
    { q:"Questo sito vende o spedisce prodotti?", a:"No. È un sito indipendente di scoperta e informazione; i link aprono il catalogo esterno." },
    { q:"Quali lingue sono disponibili?", a:"Inglese, tedesco, francese, spagnolo, italiano e polacco usano URL separate e indicizzabili." },
  ],
  pl: [
    { q:"Czym jest USFans spreadsheet?", a:"Niezależnie uporządkowany katalog linków produktowych. To indeks, nie magazyn ani gwarancja jakości." },
    { q:"Czy wyszukiwarka otwiera pasujące wyniki?", a:"Tak. Dokładne hasło trafia do odpowiadających mu wyników w głównym katalogu." },
    { q:"Czy ceny w USD są ostateczne?", a:"Nie. To orientacyjne ceny produktów; kurs, dostawa krajowa, usługi i wysyłka międzynarodowa zmieniają sumę." },
    { q:"Co sprawdzać na zdjęciach QC?", a:"Najpierw kształt i kolor, potem szwy, etykiety, okucia, nadruki, rozmiar i widoczne wady." },
    { q:"Ile zdjęć QC opisuje USFans?", a:"Aktualne publiczne strony produktów mówią o 3–7 zdjęciach HD. Rzeczywista liczba zależy od produktu i usługi." },
    { q:"Czy zdjęcia potwierdzają jakość materiału?", a:"Nie. Pokazują widoczne problemy, ale nie potwierdzają trwałości, dotyku ani składu." },
    { q:"Czy ta strona sprzedaje lub wysyła produkty?", a:"Nie. To niezależny serwis informacyjny; linki otwierają zewnętrzny katalog główny." },
    { q:"Jakie języki są dostępne?", a:"Angielski, niemiecki, francuski, hiszpański, włoski i polski mają osobne, indeksowalne adresy URL." },
  ],
};

const articleMeta = [
  { slug:"usfans-spreadsheet-guide", label:"Spreadsheet guide", minutes:"12 min", image:"/products/hoodie.webp", titles:{ en:"USFans Spreadsheet 2026: How to Find Links Without Buying Blind", de:"USFans Spreadsheet 2026: Produktlinks systematisch prüfen", fr:"USFans Spreadsheet 2026 : trouver et vérifier les liens", es:"USFans Spreadsheet 2026: cómo comprobar enlaces", it:"USFans Spreadsheet 2026: trovare e verificare i link", pl:"USFans Spreadsheet 2026: jak sprawdzać linki" } },
  { slug:"usfans-qc-photos-guide", label:"QC guide", minutes:"11 min", image:"/products/sneakers.jpg", titles:{ en:"USFans QC Photos Guide: A Practical Inspection Order", de:"USFans QC-Fotos: eine praktische Prüfreihenfolge", fr:"Photos QC USFans : une méthode d’inspection pratique", es:"Fotos QC de USFans: un orden práctico de revisión", it:"Foto QC USFans: un metodo pratico di controllo", pl:"Zdjęcia QC USFans: praktyczna kolejność kontroli" } },
  { slug:"usfans-shipping-cost-guide", label:"Parcel planning", minutes:"10 min", image:"/products/crewneck.webp", titles:{ en:"USFans Shipping Cost: Plan Weight, Volume and Packaging", de:"USFans Versandkosten: Gewicht, Volumen und Verpackung", fr:"Frais d’expédition USFans : poids, volume et emballage", es:"Coste de envío USFans: peso, volumen y embalaje", it:"Costo spedizione USFans: peso, volume e imballaggio", pl:"Koszt wysyłki USFans: waga, objętość i opakowanie" } },
];

const ui = {
  en: {
    ariaHome:"USFans Sheets home", ariaNav:"Main navigation", ariaLang:"Choose language", board:["Code","Collection","Contents","Status"],
    categories:["Sneakers","Hoodies","T-Shirts","Jerseys","Pants","Headwear","Accessories","Electronics"],
    categoryNotes:["Footwear finds","Layers & knits","Daily rotation","Club & country","Denim & shorts","Caps & beanies","Small essentials","Tech finds"],
    productCategories:["Hoodies","Sweatshirts","Shoes","T-Shirts","Headwear","Pants","Shorts"], productNames:["Stone Island Hoodie · 40 styles","Patagonia loose crewneck","Curated sneaker find #60","Piqué cotton short sleeve","Letter-embroidered cap","BIGBOY relaxed jeans","Everyday sport shorts"], priceLabel:"Approx. product price", you:"YOU", stampRoute:"Route", live:"Live", productTag:"Tag",
    featured:"Featured baggage", shoes:"Shoes", headwear:"Headwear", from:"From a find", to:"To your next parcel", open:"Open",
    heroNotes:["Categories","Price context","Visual checks"], status:["Status","Routes open","USFans sheets 2026","QC guide active","Prices in USD"],
    focus:["Shape","Details","Size"], reference:"Reference view / not a quality guarantee", next:"Next departure", nextTitle:"Your next find leaves from here.",
    qcManual:"USFans QC photos / 2026", qcManualTitle:"Visible evidence first.", qcManualLead:"Current public USFans pages describe warehouse inspection and, on some product pages, 3–7 HD QC photos. The exact views can vary, so use the live order record as the final source.",
    qcSteps:["Silhouette, proportions and color","Stitching, labels, prints and hardware","Size tag and useful measurements","Visible marks, missing pieces and symmetry","Specific questions while the item is stored","Save evidence before parcel submission"],
    qcStepText:"Compare the exact ordered variant and ask a specific question when the available view cannot answer it. A photograph is useful visible evidence, not a material or durability guarantee.",
    footer:"Independent product discovery and QC education. Product information, availability, services and routes may change. Confirm the current order and parcel information before payment.",
    updated:"Updated 11 Aug 2026", fieldNote:"Independent field note", important:"Important boundary", disclaimer:"Availability, prices, warehouse services, routes and policies can change. Confirm the live product and account information before paying or submitting a parcel.",
    labels:["Spreadsheet guide","QC guide","Parcel planning"]
  },
  de: {
    ariaHome:"Startseite USFans Sheets", ariaNav:"Hauptnavigation", ariaLang:"Sprache wählen", board:["Code","Kollektion","Inhalt","Status"],
    categories:["Sneaker","Hoodies","T-Shirts","Trikots","Hosen","Kopfbedeckung","Accessoires","Elektronik"],
    categoryNotes:["Schuh-Fundstücke","Sweats und Strick","Alltagsshirts","Verein und Land","Denim und Shorts","Caps und Mützen","Kleine Essentials","Technik-Fundstücke"],
    productCategories:["Hoodies","Sweatshirts","Schuhe","T-Shirts","Kopfbedeckung","Hosen","Shorts"], productNames:["Stone Island Hoodie · 40 Varianten","Patagonia lockeres Sweatshirt","Ausgewählter Sneaker-Fund #60","Piqué-Kurzarmshirt aus Baumwolle","Cap mit Buchstabenstickerei","BIGBOY Jeans mit lockerer Passform","Sportshorts für jeden Tag"], priceLabel:"Ungefährer Produktpreis", you:"DU", stampRoute:"Route", live:"Aktiv", productTag:"Tag",
    featured:"Hauptgepäck", shoes:"Schuhe", headwear:"Kopfbedeckung", from:"Vom Fundstück", to:"Bis zu deinem Paket", open:"Öffnen",
    heroNotes:["Kategorien","Preiskontext","Sichtprüfung"], status:["Status","Routen offen","USFans Sheets 2026","QC-Leitfaden aktiv","Preise in USD"],
    focus:["Form","Details","Größe"], reference:"Referenzansicht / keine Qualitätsgarantie", next:"Nächster Abflug", nextTitle:"Dein nächstes Fundstück startet hier.",
    qcManual:"USFans QC-Fotos / 2026", qcManualTitle:"Sichtbare Belege zuerst.", qcManualLead:"Aktuelle öffentliche USFans-Seiten beschreiben Lagerprüfung und auf einigen Produktseiten 3–7 HD-QC-Fotos. Die Ansichten können variieren; maßgeblich ist der aktuelle Bestelldatensatz.",
    qcSteps:["Silhouette, Proportionen und Farbe","Nähte, Etiketten, Drucke und Hardware","Größenetikett und sinnvolle Maße","Sichtbare Flecken, fehlende Teile und Symmetrie","Konkrete Fragen während der Lagerung","Belege vor Paketfreigabe speichern"],
    qcStepText:"Vergleiche die genaue bestellte Variante und stelle eine konkrete Frage, wenn die vorhandene Ansicht nicht ausreicht. Ein Foto ist sichtbarer Beleg, aber keine Material- oder Haltbarkeitsgarantie.",
    footer:"Unabhängige Produktsuche und QC-Information. Produktdaten, Verfügbarkeit, Services und Routen können sich ändern. Prüfe vor Zahlung die aktuellen Bestell- und Paketdaten.",
    updated:"Aktualisiert am 11. Aug. 2026", fieldNote:"Unabhängiger Praxisleitfaden", important:"Wichtige Grenze", disclaimer:"Verfügbarkeit, Preise, Lagerleistungen, Routen und Regeln können sich ändern. Prüfe vor Zahlung oder Paketfreigabe die aktuellen Produkt- und Kontodaten.",
    labels:["Spreadsheet-Leitfaden","QC-Leitfaden","Paketplanung"]
  },
  fr: {
    ariaHome:"Accueil USFans Sheets", ariaNav:"Navigation principale", ariaLang:"Choisir la langue", board:["Code","Collection","Contenu","Statut"],
    categories:["Baskets","Sweats","T-shirts","Maillots","Pantalons","Couvre-chefs","Accessoires","Électronique"],
    categoryNotes:["Sélection chaussures","Mailles et couches","Rotation quotidienne","Club et pays","Denim et shorts","Casquettes et bonnets","Petits essentiels","Sélection tech"],
    productCategories:["Sweats","Pulls","Chaussures","T-shirts","Couvre-chefs","Pantalons","Shorts"], productNames:["Sweat Stone Island · 40 styles","Sweat ample Patagonia","Sélection baskets n°60","Manches courtes en coton piqué","Casquette brodée de lettres","Jean ample BIGBOY","Short de sport quotidien"], priceLabel:"Prix produit approximatif", you:"VOUS", stampRoute:"Route", live:"Actif", productTag:"Étiquette",
    featured:"Bagage en vedette", shoes:"Chaussures", headwear:"Couvre-chefs", from:"D’une trouvaille", to:"À votre prochain colis", open:"Ouvrir",
    heroNotes:["Catégories","Contexte prix","Contrôles visuels"], status:["Statut","Routes ouvertes","USFans Sheets 2026","Guide QC actif","Prix en USD"],
    focus:["Forme","Détails","Taille"], reference:"Vue de référence / aucune garantie de qualité", next:"Prochain départ", nextTitle:"Votre prochaine trouvaille part d’ici.",
    qcManual:"Photos QC USFans / 2026", qcManualTitle:"Les preuves visibles d’abord.", qcManualLead:"Les pages publiques actuelles de USFans décrivent l’inspection en entrepôt et, sur certaines fiches, 3 à 7 photos QC HD. Les vues varient; le dossier de commande actuel reste la source finale.",
    qcSteps:["Silhouette, proportions et couleur","Coutures, étiquettes, impressions et pièces","Étiquette de taille et mesures utiles","Marques visibles, pièces manquantes et symétrie","Questions précises pendant le stockage","Conserver les preuves avant l’envoi"],
    qcStepText:"Comparez la variante exacte et posez une question précise si la vue disponible ne suffit pas. Une photo apporte une preuve visible, pas une garantie de matière ou de durabilité.",
    footer:"Découverte produit et information QC indépendantes. Produits, disponibilité, services et routes peuvent changer. Confirmez les données actuelles avant paiement.",
    updated:"Mis à jour le 11 août 2026", fieldNote:"Guide de terrain indépendant", important:"Limite importante", disclaimer:"Disponibilité, prix, services d’entrepôt, routes et règles peuvent changer. Confirmez les informations actuelles avant paiement ou soumission du colis.",
    labels:["Guide spreadsheet","Guide QC","Planification colis"]
  },
  es: {
    ariaHome:"Inicio de USFans Sheets", ariaNav:"Navegación principal", ariaLang:"Elegir idioma", board:["Código","Colección","Contenido","Estado"],
    categories:["Zapatillas","Sudaderas","Camisetas","Equipaciones","Pantalones","Gorras","Accesorios","Electrónica"],
    categoryNotes:["Selección de calzado","Capas y punto","Rotación diaria","Club y selección","Vaqueros y shorts","Gorras y gorros","Pequeños esenciales","Selección tecnológica"],
    productCategories:["Sudaderas","Jerséis","Calzado","Camisetas","Gorras","Pantalones","Shorts"], productNames:["Sudadera Stone Island · 40 estilos","Sudadera holgada Patagonia","Selección de zapatillas n.º 60","Manga corta de algodón piqué","Gorra con letras bordadas","Vaqueros holgados BIGBOY","Short deportivo diario"], priceLabel:"Precio aproximado del producto", you:"TÚ", stampRoute:"Ruta", live:"Activa", productTag:"Etiqueta",
    featured:"Equipaje destacado", shoes:"Calzado", headwear:"Gorras", from:"Desde un hallazgo", to:"Hasta tu próximo paquete", open:"Abrir",
    heroNotes:["Categorías","Contexto de precio","Controles visuales"], status:["Estado","Rutas abiertas","USFans Sheets 2026","Guía QC activa","Precios en USD"],
    focus:["Forma","Detalles","Talla"], reference:"Vista de referencia / no garantiza calidad", next:"Próxima salida", nextTitle:"Tu próximo hallazgo sale de aquí.",
    qcManual:"Fotos QC de USFans / 2026", qcManualTitle:"Primero la evidencia visible.", qcManualLead:"Las páginas públicas actuales de USFans describen inspección en almacén y, en algunas fichas, entre 3 y 7 fotos QC HD. Las vistas pueden variar; el registro activo del pedido es la fuente final.",
    qcSteps:["Silueta, proporciones y color","Costuras, etiquetas, impresiones y herrajes","Etiqueta de talla y medidas útiles","Marcas visibles, piezas faltantes y simetría","Preguntas concretas durante el almacenamiento","Guardar pruebas antes de enviar"],
    qcStepText:"Compara la variante exacta y formula una pregunta concreta si la vista no responde. Una foto aporta evidencia visible, no una garantía de material o durabilidad.",
    footer:"Descubrimiento independiente e información QC. Productos, disponibilidad, servicios y rutas pueden cambiar. Confirma los datos actuales antes de pagar.",
    updated:"Actualizado el 11 ago 2026", fieldNote:"Guía de campo independiente", important:"Límite importante", disclaimer:"Disponibilidad, precios, servicios de almacén, rutas y normas pueden cambiar. Confirma la información activa antes de pagar o enviar el paquete.",
    labels:["Guía spreadsheet","Guía QC","Planificación del paquete"]
  },
  it: {
    ariaHome:"Home USFans Sheets", ariaNav:"Navigazione principale", ariaLang:"Scegli la lingua", board:["Codice","Collezione","Contenuto","Stato"],
    categories:["Sneaker","Felpe","T-shirt","Maglie","Pantaloni","Copricapi","Accessori","Elettronica"],
    categoryNotes:["Selezione calzature","Strati e maglia","Rotazione quotidiana","Club e nazionale","Denim e shorts","Cappelli e berretti","Piccoli essenziali","Selezione tech"],
    productCategories:["Felpe","Maglioni","Scarpe","T-shirt","Copricapi","Pantaloni","Shorts"], productNames:["Felpa Stone Island · 40 stili","Felpa ampia Patagonia","Sneaker selezionata n. 60","Manica corta in cotone piqué","Cappello con lettere ricamate","Jeans BIGBOY dalla vestibilità ampia","Short sportivo quotidiano"], priceLabel:"Prezzo indicativo del prodotto", you:"TU", stampRoute:"Rotta", live:"Attiva", productTag:"Etichetta",
    featured:"Bagaglio in evidenza", shoes:"Scarpe", headwear:"Copricapi", from:"Da un prodotto", to:"Al tuo prossimo pacco", open:"Apri",
    heroNotes:["Categorie","Contesto prezzo","Controlli visivi"], status:["Stato","Rotte aperte","USFans Sheets 2026","Guida QC attiva","Prezzi in USD"],
    focus:["Forma","Dettagli","Taglia"], reference:"Vista di riferimento / nessuna garanzia di qualità", next:"Prossima partenza", nextTitle:"Il tuo prossimo prodotto parte da qui.",
    qcManual:"Foto QC USFans / 2026", qcManualTitle:"Prima le prove visibili.", qcManualLead:"Le attuali pagine pubbliche USFans descrivono l’ispezione in magazzino e, su alcune schede, 3–7 foto QC HD. Le viste possono variare; fa fede il record attuale dell’ordine.",
    qcSteps:["Silhouette, proporzioni e colore","Cuciture, etichette, stampe e hardware","Etichetta taglia e misure utili","Segni visibili, parti mancanti e simmetria","Domande precise durante lo stoccaggio","Salvare le prove prima della spedizione"],
    qcStepText:"Confronta la variante esatta e fai una domanda precisa se la vista non basta. Una foto è una prova visibile, non una garanzia di materiale o durata.",
    footer:"Scoperta indipendente e informazione QC. Prodotti, disponibilità, servizi e rotte possono cambiare. Verifica i dati attuali prima del pagamento.",
    updated:"Aggiornato l’11 ago 2026", fieldNote:"Guida indipendente", important:"Limite importante", disclaimer:"Disponibilità, prezzi, servizi, rotte e regole possono cambiare. Conferma le informazioni attuali prima di pagare o inviare il pacco.",
    labels:["Guida spreadsheet","Guida QC","Pianificazione pacco"]
  },
  pl: {
    ariaHome:"Strona główna USFans Sheets", ariaNav:"Nawigacja główna", ariaLang:"Wybierz język", board:["Kod","Kolekcja","Zawartość","Status"],
    categories:["Sneakersy","Bluzy","T-shirty","Koszulki sportowe","Spodnie","Nakrycia głowy","Akcesoria","Elektronika"],
    categoryNotes:["Znaleziska obuwnicze","Warstwy i dzianiny","Codzienny wybór","Klub i kraj","Denim i szorty","Czapki i beanie","Małe dodatki","Znaleziska tech"],
    productCategories:["Bluzy","Swetry","Buty","T-shirty","Nakrycia głowy","Spodnie","Szorty"], productNames:["Bluza Stone Island · 40 stylów","Luźna bluza Patagonia","Wybrane sneakersy nr 60","Koszulka z bawełny piqué","Czapka z haftowanymi literami","Luźne jeansy BIGBOY","Codzienne szorty sportowe"], priceLabel:"Orientacyjna cena produktu", you:"TY", stampRoute:"Trasa", live:"Aktywna", productTag:"Etykieta",
    featured:"Wyróżniony bagaż", shoes:"Buty", headwear:"Nakrycia głowy", from:"Od znaleziska", to:"Do twojej paczki", open:"Otwórz",
    heroNotes:["Kategorie","Kontekst ceny","Kontrola wizualna"], status:["Status","Trasy otwarte","USFans Sheets 2026","Poradnik QC aktywny","Ceny w USD"],
    focus:["Kształt","Detale","Rozmiar"], reference:"Widok referencyjny / bez gwarancji jakości", next:"Następny odlot", nextTitle:"Twoje następne znalezisko zaczyna się tutaj.",
    qcManual:"Zdjęcia QC USFans / 2026", qcManualTitle:"Najpierw widoczne dowody.", qcManualLead:"Aktualne publiczne strony USFans opisują kontrolę magazynową, a niektóre oferty 3–7 zdjęć QC HD. Ujęcia mogą się różnić; decydują bieżące dane zamówienia.",
    qcSteps:["Sylwetka, proporcje i kolor","Szwy, metki, nadruki i okucia","Metka rozmiaru i przydatne pomiary","Widoczne ślady, brakujące części i symetria","Konkretne pytania podczas magazynowania","Zapisz dowody przed wysyłką"],
    qcStepText:"Porównaj dokładnie zamówiony wariant i zadaj konkretne pytanie, jeśli ujęcie nie wystarcza. Zdjęcie jest dowodem widocznym, nie gwarancją materiału ani trwałości.",
    footer:"Niezależne odkrywanie produktów i informacje QC. Produkty, dostępność, usługi i trasy mogą się zmieniać. Przed płatnością sprawdź bieżące dane.",
    updated:"Zaktualizowano 11 sie 2026", fieldNote:"Niezależny poradnik", important:"Ważne ograniczenie", disclaimer:"Dostępność, ceny, usługi magazynowe, trasy i zasady mogą się zmieniać. Przed płatnością potwierdź aktualne informacje.",
    labels:["Poradnik spreadsheet","Poradnik QC","Planowanie paczki"]
  }
} satisfies Record<Locale, Record<string, unknown>>;

const articleBody: Record<Locale, Record<string, { intro:string; sections:{h:string;p:string}[] }>> = {
  en: {
    "usfans-spreadsheet-guide": { intro:"A spreadsheet is useful only when it helps you reach a current listing and make a better decision. This guide explains how to move from a product find to a verified route without treating an old row as proof of stock, price or quality.", sections:[
      { h:"Treat every row as a lead, not a promise", p:"A product link can change after it is added to a sheet. Open the live page, confirm that it still resolves, and compare the current title, variants and visible price with the description you expected. A checked link means the destination worked at that moment; it does not mean every size is available or that the seller has not changed the listing." },
      { h:"Search by intent before searching by brand", p:"Start with the product type, fit and measurable detail you need: low-top shoe, heavyweight hoodie, embroidered cap or football jersey. This produces a manageable shortlist. Use the search box on this site to send that exact phrase to the matching main-catalog results, then open individual records instead of landing on a generic catalog page." },
      { h:"Compare variants and the delivered-cost drivers", p:"Record the exact color, size and version before ordering. Product price is only one part of the decision. Domestic delivery, exchange rate, optional services, packed weight, volumetric weight and the international route can all affect the final total. Bulky boxes may cost more to ship than their scale weight suggests." },
      { h:"Build a QC plan before the item reaches storage", p:"Decide which evidence matters for the category. Shoes need both sides, outsole, heel alignment and useful measurements. Clothing needs front, back, labels, seams, print alignment and garment dimensions. Electronics require compatibility and shipping-restriction checks that a surface photo cannot solve." },
      { h:"Keep a simple verification record", p:"Save the destination URL, date checked, chosen variant and any seller note. When warehouse photos appear, compare them with that record. USFans public product pages currently describe 3–7 HD inspection photos on some listings, but the exact evidence can vary. Ask for clarification while the item is still in storage when a decisive detail is missing." },
      { h:"Use the sheet as a discovery layer", p:"The best spreadsheet workflow is short: discover, verify, inspect and then plan the parcel. Do not rely on unsupported rankings, anonymous quality scores or claims that every link is verified forever. A smaller set of current, readable records is more useful than thousands of rows that no one has checked recently." },
    ]},
    "usfans-qc-photos-guide": { intro:"Warehouse photos reduce uncertainty, but they do not remove it. A consistent inspection order helps you notice visible problems before parcel submission and makes requests for extra evidence more precise.", sections:[
      { h:"Begin with the full silhouette", p:"Look at the item from a distance before zooming in. Compare overall shape, proportions, color family and symmetry. For shoes, check whether the pair appears consistent. For clothing, look for twisting, uneven hems or obvious panel differences. Lighting can change color, so treat small shade differences carefully." },
      { h:"Inspect construction details", p:"Move to stitching, seams, edges, prints, embroidery, zippers, buttons and other hardware. Ask whether details are aligned and complete rather than trying to judge craftsmanship from one compressed image. A photo can reveal a loose thread or scratch; it cannot prove how the material will feel or wear." },
      { h:"Verify the selected variant", p:"Confirm size label, color, model and any customization against the order record. Measurements are more useful than a letter size. Compare them with an item you already own, and remember that the measuring method can introduce small differences." },
      { h:"Separate defects from packaging effects", p:"Folds, creases and compressed shapes may come from transport or temporary packaging. Stains, broken hardware, missing components or clear asymmetry need a different response. Ask a specific question tied to a visible area instead of sending a vague request to check quality." },
      { h:"Know what photos cannot prove", p:"Images cannot confirm fiber composition, smell, internal construction, electrical safety, durability or future colorfastness. Restricted or sensitive items can also face route limitations regardless of appearance. Confirm live shipping restrictions before paying for an international parcel." },
      { h:"Save the evidence before approving", p:"Keep the photos, selected variant and any agent response together. Current USFans public listings describe 3–7 HD QC photos for some products and show warehouse workflows, but services can change. Use the account’s current information as the final source before accepting or requesting after-sales action." },
    ]},
    "usfans-shipping-cost-guide": { intro:"The lowest product price does not always produce the lowest delivered cost. Parcel planning starts with weight, dimensions, packaging and route restrictions—not with an unsupported promise of one universal shipping rate.", sections:[
      { h:"Separate product cost from parcel cost", p:"Build a simple estimate with product price, domestic seller delivery, optional services and international shipping as separate lines. Currency conversion can move between ordering and parcel submission. Customs treatment also varies by destination, item and current policy, so avoid copying another buyer’s total as a guarantee." },
      { h:"Understand actual and volumetric weight", p:"Carriers may compare scale weight with a volume-based calculation. A light but large box can therefore cost more than expected. Shoes, padded coats and rigid packaging are common examples. Measurements from a product page are useful planning inputs, but the final packed parcel determines the billable figure." },
      { h:"Decide what packaging is necessary", p:"Removing unnecessary retail boxes may reduce volume, but protection still matters. Fragile or crush-sensitive items may need reinforcement, corner protection or other services. Make the choice by item risk rather than automatically removing or adding every option." },
      { h:"Check route restrictions early", p:"Batteries, liquids, powders, cosmetics, magnets and other sensitive categories may have fewer routes. USFans public purchasing notices describe prohibited and limited items and advise checking with support. A product being purchasable does not guarantee that every international line accepts it." },
      { h:"Compare lines on more than price", p:"Look at accepted item types, estimated transit window, tracking, compensation terms, size limits and destination coverage. The cheapest listed option is not automatically the best fit. Keep a buffer because final measurements and exchange rates can change." },
      { h:"Submit only after a final parcel check", p:"Confirm address, contents, packaging requests, declared information and the current billable weight before payment. Save the estimate and tracking record. USFans says it covers more than 200 countries and regions, but available lines and customs conditions still depend on the destination and parcel contents." },
    ]},
  },
  de: {}, fr: {}, es: {}, it: {}, pl: {},
};

const translatedArticleFallback: Record<Exclude<Locale,"en">, { intro:string; headings:string[]; paragraphs:string[] }> = {
  de:{ intro:"Dieser Leitfaden folgt einem überprüfbaren Ablauf: aktuellen Link öffnen, Variante bestätigen, sichtbare Fakten notieren, QC-Fotos prüfen und erst danach die Paketkosten planen.", headings:["Live-Seite statt alter Tabellenzeile","Variante und Preis bestätigen","QC vorab planen","Gewicht und Volumen berücksichtigen","Grenzen von Fotos verstehen","Entscheidung dokumentieren"], paragraphs:["Ein Tabellenlink ist nur ein Ausgangspunkt. Prüfe Zielseite, Titel, Varianten und aktuellen Preis, bevor du ihn verwendest.","Notiere Größe, Farbe und Version. Produktpreis, Inlandslieferung, Services und internationaler Versand sind getrennte Kosten.","Lege je Kategorie fest, welche Ansichten und Maße du brauchst. Konkrete Fragen liefern bessere Antworten als allgemeine Qualitätsanfragen.","Große, leichte Pakete können nach Volumen berechnet werden. Verpackung sollte Schutz und sinnvolles Volumen ausbalancieren.","Fotos zeigen sichtbare Abweichungen, beweisen aber weder Materialzusammensetzung noch Haltbarkeit oder sichere Versandfähigkeit.","Speichere Link, Prüfdatum, Variante und Fotos. Nutze die aktuellen Konto- und Routenangaben als endgültige Quelle."] },
  fr:{ intro:"Ce guide suit une méthode vérifiable : ouvrir le lien actuel, confirmer la variante, noter les faits visibles, contrôler les photos QC puis planifier le colis.", headings:["Vérifier la page en direct","Confirmer variante et prix","Préparer le contrôle QC","Prévoir poids et volume","Connaître les limites des photos","Conserver une trace"], paragraphs:["Une ligne de spreadsheet n’est qu’un point de départ. Vérifiez destination, titre, variantes et prix actuel.","Notez taille, couleur et version. Prix produit, livraison locale, services et transport international sont des coûts distincts.","Définissez les vues et mesures nécessaires pour chaque catégorie. Une question précise est plus utile qu’une demande générale.","Un colis léger mais volumineux peut être facturé au volume. L’emballage doit équilibrer protection et encombrement.","Une photo montre des défauts visibles mais ne prouve ni composition, ni durabilité, ni admissibilité à toutes les lignes.","Conservez lien, date, variante et photos. Les données actuelles du compte et de la route restent la source finale."] },
  es:{ intro:"Esta guía sigue un proceso verificable: abrir el enlace actual, confirmar la variante, anotar los datos visibles, revisar fotos QC y después planificar el paquete.", headings:["Comprobar la página activa","Confirmar variante y precio","Preparar el control QC","Calcular peso y volumen","Entender los límites de una foto","Guardar la decisión"], paragraphs:["Una fila de spreadsheet es solo un punto de partida. Comprueba destino, título, variantes y precio actual.","Anota talla, color y versión. Producto, entrega nacional, servicios y envío internacional son costes separados.","Define las vistas y medidas necesarias para cada categoría. Una pregunta concreta produce una respuesta más útil.","Un paquete ligero pero grande puede cobrarse por volumen. El embalaje debe equilibrar protección y tamaño.","Las fotos muestran problemas visibles, pero no demuestran composición, durabilidad ni compatibilidad con todas las rutas.","Guarda enlace, fecha, variante y fotos. La información actual de cuenta y ruta es la fuente final."] },
  it:{ intro:"Questa guida segue un processo verificabile: aprire il link attuale, confermare la variante, registrare i dati visibili, controllare le foto QC e poi pianificare il pacco.", headings:["Controllare la pagina live","Confermare variante e prezzo","Preparare il controllo QC","Calcolare peso e volume","Capire i limiti delle foto","Salvare la decisione"], paragraphs:["Una riga dello spreadsheet è solo un punto di partenza. Controlla destinazione, titolo, varianti e prezzo attuale.","Registra taglia, colore e versione. Prezzo prodotto, consegna interna, servizi e spedizione internazionale sono costi distinti.","Definisci viste e misure necessarie per categoria. Una domanda precisa è più utile di una richiesta generica.","Un pacco leggero ma grande può essere calcolato a volume. L’imballaggio deve bilanciare protezione e ingombro.","Le foto mostrano problemi visibili ma non provano composizione, durata o idoneità a ogni rotta.","Conserva link, data, variante e foto. I dati attuali dell’account e della rotta restano la fonte finale."] },
  pl:{ intro:"Ten poradnik opiera się na sprawdzalnym procesie: otwarciu aktualnego linku, potwierdzeniu wariantu, zapisaniu widocznych danych, kontroli zdjęć QC i planowaniu paczki.", headings:["Sprawdź aktualną stronę","Potwierdź wariant i cenę","Zaplanuj kontrolę QC","Uwzględnij wagę i objętość","Poznaj ograniczenia zdjęć","Zapisz decyzję"], paragraphs:["Wiersz w spreadsheetzie to tylko punkt wyjścia. Sprawdź adres, tytuł, warianty i bieżącą cenę.","Zapisz rozmiar, kolor i wersję. Cena produktu, dostawa krajowa, usługi i wysyłka międzynarodowa to osobne koszty.","Określ potrzebne ujęcia i pomiary dla kategorii. Konkretne pytanie daje bardziej użyteczną odpowiedź.","Lekka, ale duża paczka może być liczona objętościowo. Opakowanie powinno równoważyć ochronę i rozmiar.","Zdjęcia pokazują widoczne problemy, ale nie potwierdzają składu, trwałości ani dostępności każdej trasy.","Zachowaj link, datę, wariant i zdjęcia. Aktualne dane konta i trasy są źródłem ostatecznym."] },
};

function localePath(locale: Locale, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}${clean ? `/${clean}` : "/"}`.replace(/\/$/, clean ? "" : "/");
}

function Logo({ footer = false }: { footer?: boolean }) {
  return <img className={footer ? "logo logo-footer" : "logo"} src="/usfans.png" alt="USFans" width="375" height="123" />;
}

function Header({ locale, route }: { locale: Locale; route: string }) {
  const c = copy[locale];
  const u = ui[locale];
  const nav = ["categories","products","qc-desk","articles","help"];
  const languageLabels = { en:"English", de:"Deutsch", fr:"Français", es:"Español", it:"Italiano", pl:"Polski" };
  const languageLinks = localeCodes.map((code) => ({ code, short:code.toUpperCase(), label:languageLabels[code], href:localePath(code, route) }));
  return <header className="site-header">
    <a href={localePath(locale)} aria-label={u.ariaHome}><Logo /></a>
    <nav aria-label={u.ariaNav}>{nav.map((path,index)=><a key={path} className={route === path || route.startsWith(`${path}/`) ? "active" : ""} href={localePath(locale,path)}>{c.nav[index]}</a>)}</nav>
    <div className="header-actions"><LanguageSwitcher current={locale} languages={languageLinks} label={u.ariaLang}/><a className="header-ticket" href={`${localePath(locale)}#search`}><span>{c.route}</span><b>↗</b></a></div>
  </header>;
}

function Footer({ locale }: { locale: Locale }) {
  const c=copy[locale], u=ui[locale];
  return <footer><Logo footer/><p>{u.footer}</p><nav>{["categories","products","qc-desk","articles","help"].map((path,index)=><a key={path} href={localePath(locale,path)}>{c.nav[index]}</a>)}<span>© 2026</span></nav></footer>;
}

function SearchForm({ locale }: { locale: Locale }) {
  const c=copy[locale];
  return <form className="boarding-pass" id="search" action="https://www.cnfanshp.com/search.html" method="get" target="_blank">
    <div className="pass-label"><small>{c.searchLabel}</small><b>{c.searchPrompt}</b></div>
    <label className="sr-only" htmlFor="product-search">{c.searchPrompt}</label>
    <input id="product-search" name="keywords" placeholder={c.searchPlaceholder} required />
    <input type="hidden" name="channelid" value="2"/>
    <button type="submit"><span>{c.searchButton}</span><b>↗</b></button>
  </form>;
}

function CategoryBoard({ locale, compact=false }: {locale:Locale;compact?:boolean}) {
  const c=copy[locale], u=ui[locale];
  return <div className={compact ? "departure-board compact-board" : "departure-board"}>
    <div className="board-head">{u.board.map(label=><span key={label}>{label}</span>)}</div>
    {categories.map((category,index)=><a key={category.name} href={category.href} target="_blank" rel="noopener"><b>{category.code}</b><strong>{u.categories[index]}</strong><span>{u.categoryNotes[index]}</span><em>{c.open.toUpperCase()} <i>↗</i></em></a>)}
  </div>;
}

function ProductBelt({locale}:{locale:Locale}) {
  const c=copy[locale], u=ui[locale];
  return <div className="belt">{products.map((product,index)=><a className="baggage-tag" key={product.name} href={product.href} target="_blank" rel="noopener"><div className="tag-index"><small>{u.productTag}</small><b>{String(index+1).padStart(2,"0")}</b></div><div className="tag-thumb"><img src={product.image} alt={u.productNames[index]} width="220" height="220" loading="lazy"/></div><div className="tag-main"><small>{product.gate} / {u.productCategories[index]}</small><strong>{u.productNames[index]}</strong><span>{u.priceLabel}</span></div><div className="tag-price"><b>{product.price}</b><span>{c.open.toUpperCase()} ↗</span></div><div className="mini-barcode" aria-hidden="true"/></a>)}</div>;
}

function ArticleCards({ locale }: {locale:Locale}) {
  const c=copy[locale], u=ui[locale];
  return <div className="article-grid">{articleMeta.map((article,index)=><a className="article-card" href={localePath(locale,`articles/${article.slug}`)} key={article.slug}><span className="article-no">0{index+1}</span><div className="article-image"><img src={article.image} alt="" width="520" height="360" loading="lazy"/></div><small>{u.labels[index]} / {article.minutes}</small><h3>{article.titles[locale]}</h3><b>{c.read.toUpperCase()} ↗</b></a>)}</div>;
}

function Home({locale}:{locale:Locale}) {
  const c=copy[locale], u=ui[locale];
  const faqs=localizedFaqs[locale].slice(0,4);
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <section className="hero">
      <div className="route-stamp" aria-hidden="true"><span>{u.stampRoute.toUpperCase()}</span><b>026</b><small>{u.live.toUpperCase()} / 2026</small></div>
      <div className="hero-copy"><p className="overline"><span/> {c.homeOverline}</p><h1>{c.homeTitle}<br/><em>{c.homeAccent}</em></h1><p className="hero-lede">{c.homeLead}</p><SearchForm locale={locale}/><div className="hero-notes"><span><b>08</b> {u.heroNotes[0]}</span><span><b>USD</b> {u.heroNotes[1]}</span><span><b>QC</b> {u.heroNotes[2]}</span></div></div>
      <div className="route-map" aria-label={u.featured}><div className="map-grid"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="route-line route-line-a"/><div className="route-line route-line-b"/><span className="map-pin pin-a">CN</span><span className="map-pin pin-b">QC</span><span className="map-pin pin-c">{u.you}</span>
        <a className="hero-tag hero-tag-main" href={products[0].href} target="_blank" rel="noopener"><div className="tag-photo"><img src={products[0].image} alt={u.productNames[0]} width="430" height="430"/></div><div className="tag-copy"><small>{u.featured.toUpperCase()} / {products[0].gate}</small><b>{u.productNames[0]}</b><span>{products[0].price}<i>{u.open.toUpperCase()} ↗</i></span></div><div className="barcode" aria-hidden="true"/></a>
        <a className="route-mini-tag route-mini-a" href={products[2].href} target="_blank" rel="noopener"><img src={products[2].image} alt={u.productNames[2]} width="140" height="140"/><span><small>{products[2].gate} / {u.shoes.toUpperCase()}</small><b>{u.productNames[2]}</b><em>{products[2].price} ↗</em></span></a>
        <a className="route-mini-tag route-mini-b" href={products[4].href} target="_blank" rel="noopener"><img src={products[4].image} alt={u.productNames[4]} width="140" height="140"/><span><small>{products[4].gate} / {u.headwear.toUpperCase()}</small><b>{u.productNames[4]}</b><em>{products[4].price} ↗</em></span></a>
        <div className="map-caption"><b>{u.from.toUpperCase()}</b><span>{u.to.toUpperCase()}</span></div>
      </div>
    </section>
    <section className="status-ribbon"><span>{u.status[0].toUpperCase()}</span><b><i/> {u.status[1].toUpperCase()}</b><span>{u.status[2].toUpperCase()}</span><b>{u.status[3].toUpperCase()}</b><span>{u.status[4].toUpperCase()}</span></section>
    <section className="departures section-wrap"><div className="route-heading"><p>{c.categoryEyebrow}</p><h2>{c.categoryTitle}</h2><a href={localePath(locale,"categories")}>{c.categoryLead} ↗</a></div><CategoryBoard locale={locale} compact/></section>
    <section className="baggage section-wrap"><div className="route-heading route-heading-light"><p>{c.productEyebrow}</p><h2>{c.productTitle}</h2><a href={localePath(locale,"products")}>{c.nav[1]} ↗</a></div><ProductBelt locale={locale}/></section>
    <section className="inspection section-wrap"><div className="inspection-copy"><p className="section-code">{c.qcEyebrow}</p><h2>{c.qcTitle}</h2><p>{c.qcLead}</p><a href={localePath(locale,"qc-desk")}>{c.nav[2].toUpperCase()} <span>↗</span></a></div><div className="light-table"><div className="crosshair" aria-hidden="true"><i/><i/></div><img src={products[2].image} alt={u.reference} width="700" height="700" loading="lazy"/><span className="focus focus-a">01 {u.focus[0].toUpperCase()}</span><span className="focus focus-b">02 {u.focus[1].toUpperCase()}</span><span className="focus focus-c">03 {u.focus[2].toUpperCase()}</span><div className="light-label">{u.reference.toUpperCase()}</div></div></section>
    <section className="articles-home section-wrap"><div className="route-heading"><p>{c.articlesEyebrow}</p><h2>{c.articlesTitle}</h2><a href={localePath(locale,"articles")}>{c.nav[3]} ↗</a></div><ArticleCards locale={locale}/></section>
    <section className="help section-wrap"><div className="help-desk"><span>{c.helpEyebrow}</span><h2>{c.helpTitle}</h2><p>{c.helpLead}</p><a className="text-link" href={localePath(locale,"help")}>{c.nav[4]} ↗</a></div><div className="faq-list">{faqs.map((faq,index)=><details key={faq.q} open={index===0}><summary><span>{String(index+1).padStart(2,"0")}</span><b>{faq.q}</b><i>+</i></summary><p>{faq.a}</p></details>)}</div></section>
    <section className="final-route section-wrap"><span>{u.next.toUpperCase()}</span><h2>{u.nextTitle}</h2><a href="#search"><b>{c.searchButton.toUpperCase()}</b><i>↗</i></a></section>
  </>;
}

function InteriorHero({locale,eyebrow,title,lead}:{locale:Locale;eyebrow:string;title:string;lead:string}) { return <section className="interior-hero section-wrap"><div><p className="overline"><span/>{eyebrow}</p><h1>{title}</h1><p>{lead}</p></div><div className="interior-route"><span>CN</span><i/><b>QC</b><i/><em>{ui[locale].you}</em></div></section>; }

function CategoriesPage({locale}:{locale:Locale}) { const c=copy[locale]; return <><InteriorHero locale={locale} eyebrow={c.categoryEyebrow} title={c.categoryTitle} lead={c.categoryLead}/><section className="section-wrap interior-section"><CategoryBoard locale={locale}/><div className="search-panel"><h2>{c.searchPrompt}</h2><SearchForm locale={locale}/></div></section></>; }
function ProductsPage({locale}:{locale:Locale}) { const c=copy[locale]; return <><InteriorHero locale={locale} eyebrow={c.productEyebrow} title={c.productTitle} lead={c.homeLead}/><section className="baggage section-wrap interior-section"><ProductBelt locale={locale}/></section></>; }
function QcPage({locale}:{locale:Locale}) { const c=copy[locale], u=ui[locale]; return <><InteriorHero locale={locale} eyebrow={c.qcEyebrow} title={c.qcTitle} lead={c.qcLead}/><section className="qc-manual section-wrap"><div className="manual-intro"><span>{u.qcManual.toUpperCase()}</span><h2>{u.qcManualTitle}</h2><p>{u.qcManualLead}</p></div><ol>{u.qcSteps.map((step,index)=><li key={step}><span>0{index+1}</span><h3>{step}</h3><p>{u.qcStepText}</p></li>)}</ol><a className="manual-article" href={localePath(locale,"articles/usfans-qc-photos-guide")}>{c.read} ↗</a></section></>; }
function ArticlesPage({locale}:{locale:Locale}) { const c=copy[locale]; return <><InteriorHero locale={locale} eyebrow={c.articlesEyebrow} title={c.articlesTitle} lead={c.articlesLead}/><section className="articles-page section-wrap"><ArticleCards locale={locale}/></section></>; }
function HelpPage({locale}:{locale:Locale}) { const c=copy[locale], faqs=localizedFaqs[locale]; const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))}; return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><InteriorHero locale={locale} eyebrow={c.helpEyebrow} title={c.helpTitle} lead={c.helpLead}/><section className="help-page section-wrap"><div className="faq-list">{faqs.map((faq,index)=><details key={faq.q} open={index===0}><summary><span>{String(index+1).padStart(2,"0")}</span><b>{faq.q}</b><i>+</i></summary><p>{faq.a}</p></details>)}</div><div className="search-panel"><h2>{c.searchPrompt}</h2><SearchForm locale={locale}/></div></section></>; }

function ArticlePage({locale,slug}:{locale:Locale;slug:string}) {
  const c=copy[locale], u=ui[locale], meta=articleMeta.find(item=>item.slug===slug) ?? articleMeta[0];
  const content=articleContent[locale][meta.slug];
  const schema={"@context":"https://schema.org","@type":"Article",headline:meta.titles[locale],datePublished:"2026-08-11",dateModified:"2026-08-11",inLanguage:locale,image:`https://usfanss.uk${meta.image}`,mainEntityOfPage:`https://usfanss.uk${localePath(locale,`articles/${meta.slug}`)}`};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><article className="article-page"><header className="article-hero section-wrap"><a href={localePath(locale,"articles")}>← {c.back}</a><small>{u.labels[articleMeta.indexOf(meta)]} / {u.updated.toUpperCase()} / {meta.minutes}</small><h1>{meta.titles[locale]}</h1><p>{content.intro}</p></header><div className="article-layout section-wrap"><aside><img src={meta.image} alt="" width="520" height="520"/><span>{u.fieldNote.toUpperCase()}</span><b>{c.route.toUpperCase()} / {meta.slug.slice(-5).toUpperCase()}</b></aside><div className="article-body">{content.sections.map((section,index)=><section key={section.h}><span>{String(index+1).padStart(2,"0")}</span><h2>{section.h}</h2><div>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></section>)}<div className="article-disclaimer"><b>{u.important}</b><p>{u.disclaimer}</p></div><SearchForm locale={locale}/></div></div></article></>;
}

export function SitePage({locale="en",route=""}:{locale?:Locale;route?:string}) {
  let page;
  if (!route) page=<Home locale={locale}/>;
  else if (route==="categories") page=<CategoriesPage locale={locale}/>;
  else if (route==="products") page=<ProductsPage locale={locale}/>;
  else if (route==="qc-desk") page=<QcPage locale={locale}/>;
  else if (route==="articles") page=<ArticlesPage locale={locale}/>;
  else if (route==="help") page=<HelpPage locale={locale}/>;
  else if (route.startsWith("articles/") && articleMeta.some(item=>item.slug===route.split("/")[1])) page=<ArticlePage locale={locale} slug={route.split("/")[1]}/>;
  else notFound();
  return <main id="top" lang={locale}><Header locale={locale} route={route}/>{page}<Footer locale={locale}/></main>;
}

export function pageMeta(locale:Locale,route:string) {
  const c=copy[locale];
  if (route==="categories") return {title:`${c.nav[0]} | USFans Spreadsheet 2026`,description:c.categoryLead};
  if (route==="products") return {title:`${c.nav[1]} | USFans Product Finds`,description:c.homeLead};
  if (route==="qc-desk") return {title:`USFans QC Photos Guide 2026 | ${c.nav[2]}`,description:c.qcLead};
  if (route==="articles") return {title:`USFans SEO Articles & Guides 2026`,description:c.articlesLead};
  if (route==="help") return {title:`USFans Spreadsheet FAQ 2026`,description:c.helpLead};
  if (route.startsWith("articles/")) { const article=articleMeta.find(item=>item.slug===route.split("/")[1]) ?? articleMeta[0]; return {title:article.titles[locale],description:articleContent[locale][article.slug].intro}; }
  return {title:"USFans Spreadsheet 2026: Product Finds & QC Guide",description:c.homeLead};
}
