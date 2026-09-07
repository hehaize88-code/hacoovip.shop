import LanguageSwitcher from "./language-switcher";
import { articleContent } from "./article-content";
import { newArticleMeta } from "./seo-articles";
import { notFound } from "next/navigation";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "pl";

export const localeCodes: Locale[] = ["en", "de", "fr", "es", "it", "pl"];

export const categories = [
  { name: "Sneakers", href: "https://cnfanshp.com/shoes/", code: "SNK", note: "Footwear finds" },
  { name: "Hoodies", href: "https://cnfanshp.com/hoodies-sweaters/", code: "HDY", note: "Layers & knits" },
  { name: "T-Shirts", href: "https://cnfanshp.com/t-shirts/", code: "TEE", note: "Daily rotation" },
  { name: "Jerseys", href: "https://cnfanshp.com/Jersey/", code: "JSY", note: "Club & country" },
  { name: "Pants", href: "https://cnfanshp.com/pants-shorts/", code: "PNT", note: "Denim & shorts" },
  { name: "Headwear", href: "https://cnfanshp.com/headwear/", code: "CAP", note: "Caps & beanies" },
  { name: "Accessories", href: "https://cnfanshp.com/accessories/", code: "ACC", note: "Small essentials" },
  { name: "Electronics", href: "https://cnfanshp.com/electronics/", code: "ELX", note: "Tech finds" },
];

export const products = [
  { name: "Stone Island Hoodie · 40 styles", category: "Hoodies", price: "$25 est.", image: "/products/hoodie.webp", href: "https://cnfanshp.com/AllProducts/5564.html", gate: "A01" },
  { name: "Patagonia Loose Crewneck", category: "Sweatshirts", price: "$19 est.", image: "/products/crewneck.webp", href: "https://cnfanshp.com/AllProducts/5974.html", gate: "A02" },
  { name: "Curated Sneaker Find #60", category: "Shoes", price: "$46 est.", image: "/products/sneakers.jpg", href: "https://cnfanshp.com/AllProducts/6045.html", gate: "B06" },
  { name: "Piqué Cotton Short Sleeve", category: "T-Shirts", price: "$30 est.", image: "/products/polo.webp", href: "https://cnfanshp.com/AllProducts/5976.html", gate: "B12" },
  { name: "Letter-Embroidered Cap", category: "Headwear", price: "$12 est.", image: "/products/cap.webp", href: "https://cnfanshp.com/AllProducts/5971.html", gate: "C04" },
  { name: "BIGBOY Relaxed Jeans", category: "Pants", price: "$19 est.", image: "/products/jeans.webp", href: "https://cnfanshp.com/AllProducts/5662.html", gate: "C08" },
  { name: "Everyday Sport Shorts", category: "Shorts", price: "$19 est.", image: "/products/shorts.webp", href: "https://cnfanshp.com/AllProducts/5789.html", gate: "D03" },
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
    { q