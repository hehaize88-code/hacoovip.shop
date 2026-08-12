import {
  categories,
  ConceptSwitcher,
  ProductCard,
  products,
  SearchBar,
} from "../concepts";
import { getEnglishArticle } from "./articles";

export const locales = ["en", "de", "fr", "es", "it", "pl", "ro"] as const;
export type Locale = (typeof locales)[number];

type LocaleCopy = {
  name: string;
  labels: string[];
  cats: string[];
  hero: [string, string, string];
  ui: string[];
  pages: Record<string, [string, string]>;
  qc: [string, string][];
  shipping: [string, string][];
  articles: [string, string, string][];
  faq: [string, string][];
};

const localeCopy: Record<Locale, LocaleCopy> = {
  en: {
    name: "English",
    labels: [
      "Database",
      "Categories",
      "QC guide",
      "Shipping",
      "Articles",
      "FAQ",
    ],
    cats: [
      "Sneakers",
      "Hoodies",
      "T-Shirts",
      "Jackets",
      "Bottoms",
      "Accessories",
    ],
    hero: [
      "PRODUCT DISCOVERY ENGINE v3.0",
      "Search less. Find better.",
      "A fast, structured index for AllChinaBuy spreadsheet searches. Compare USD prices and open the exact product listing.",
    ],
    ui: [
      "Browse products",
      "Menu",
      "Language",
      "QUICK QUERY",
      "INDEX STATUS",
      "active records",
      "FILTERS",
      "RESET",
      "CATEGORY",
      "PRICE_USD",
      "STATUS",
      "Link verified",
      "New this week",
      "MATCHES",
      "CURATED",
      "WHY THIS INDEX",
      "Read article",
      "Open collection",
      "Search products, categories, styles...",
    ],
    pages: {
      products: [
        "Product database",
        "Browse curated finds with product images, USD price previews and direct paths to exact listings.",
      ],
      categories: [
        "Browse by category",
        "Start with a focused department, then open the matching shopping collection.",
      ],
      "qc-guide": [
        "How to read QC photos",
        "A practical inspection checklist for shape, details, measurements and visible defects before shipping.",
      ],
      "shipping-guide": [
        "Plan your parcel",
        "Understand cost inputs before submission. Routes and final prices depend on destination, size, weight and item type.",
      ],
      articles: [
        "Research library",
        "Fact-led guides for product discovery, inspection and parcel planning.",
      ],
      faq: [
        "Frequently asked questions",
        "Clear answers about this independent index, product links, QC photos, pricing and shipping.",
      ],
    },
    qc: [
      [
        "Confirm the item",
        "Match product, colour and size with the order record before checking smaller details.",
      ],
      [
        "Check every angle",
        "Review front, back, side and close-ups for asymmetry, stains or damage.",
      ],
      [
        "Use measurements",
        "A label is not a measurement. Compare ruler photos with an item you own.",
      ],
      [
        "Inspect key details",
        "Zoom in on seams, prints, embroidery, closures and hardware.",
      ],
      [
        "Decide before shipping",
        "Ask for clarification while the item is still in the warehouse.",
      ],
    ],
    shipping: [
      [
        "Build the parcel",
        "Combine only ready items and verify recorded weight and dimensions.",
      ],
      [
        "Review restrictions",
        "Batteries, liquids and sensitive categories can change available routes.",
      ],
      [
        "Compare chargeable weight",
        "Carriers may use actual or volumetric weight.",
      ],
      [
        "Choose protection",
        "Remove unnecessary packaging, but reinforce fragile items.",
      ],
      [
        "Verify the live quote",
        "Routes, estimates and prices change; confirm the current checkout quote.",
      ],
    ],
    articles: [
      [
        "How to Use an AllChinaBuy Spreadsheet Without Getting Lost",
        "spreadsheet-guide",
        "Move from a huge list to a short, comparable product shortlist.",
      ],
      [
        "QC Photos: A Five-Minute Inspection Routine",
        "qc-photo-routine",
        "What to check first and when an extra photo is worth requesting.",
      ],
      [
        "Product Price vs Parcel Cost",
        "parcel-cost-guide",
        "Why a low item price does not predict the final shipping total.",
      ],
    ],
    faq: [
      [
        "Is this the official AllChinaBuy website?",
        "No. This is an independent research and product-discovery site.",
      ],
      [
        "Where do product buttons lead?",
        "Each card opens the exact product at our shopping destination, not AllChinaBuy.",
      ],
      [
        "Are prices final?",
        "No. USD values are previews; options, exchange rates and shipping change the total.",
      ],
      [
        "What are QC photos?",
        "Warehouse inspection photos used before international parcel submission.",
      ],
      [
        "Do QC photos guarantee quality?",
        "No. They help with visible issues but cannot reveal every hidden detail.",
      ],
      [
        "Can I search by product name?",
        "Yes. The query is sent to the live shopping catalogue.",
      ],
      [
        "Why can shipping cost more than the item?",
        "Destination, route, type, packed weight and volume determine cost.",
      ],
      [
        "Do you link to competing agents?",
        "No. Calls to action use one consistent shopping destination.",
      ],
      [
        "What services does AllChinaBuy publicly describe?",
        "Its official app description lists procurement, order fulfilment, quality inspection, international logistics and after-sales service; international shipping is provided by third-party service companies.",
      ],
      [
        "What information is needed for a shipping estimate?",
        "The official calculator asks for destination, product category, estimated weight and, where relevant, package dimensions.",
      ],
      [
        "Does a calculator result guarantee the final parcel price?",
        "No. Final packed measurements, item eligibility and currently available routes can change the live quote.",
      ],
      [
        "What should I verify before parcel submission?",
        "Confirm the received item, QC evidence, recorded weight and dimensions, route eligibility and the current checkout total.",
      ],
    ],
  },
  de: {
    name: "Deutsch",
    labels: [
      "Datenbank",
      "Kategorien",
      "QC-Ratgeber",
      "Versand",
      "Artikel",
      "FAQ",
    ],
    cats: ["Sneaker", "Hoodies", "T-Shirts", "Jacken", "Hosen", "Accessoires"],
    hero: [
      "PRODUKTSUCHMASCHINE v3.0",
      "Weniger suchen. Besser finden.",
      "Ein schneller Index für AllChinaBuy-Spreadsheet-Suchen. USD-Preise vergleichen und direkt das Produkt öffnen.",
    ],
    ui: [
      "Produkte ansehen",
      "Menü",
      "Sprache",
      "SCHNELLSUCHE",
      "INDEXSTATUS",
      "aktive Einträge",
      "FILTER",
      "ZURÜCKSETZEN",
      "KATEGORIE",
      "PREIS_USD",
      "STATUS",
      "Link geprüft",
      "Neu diese Woche",
      "TREFFER",
      "KURATIERT",
      "WARUM DIESER INDEX",
      "Artikel lesen",
      "Kollektion öffnen",
      "Produkte, Kategorien, Stile suchen...",
    ],
    pages: {
      products: [
        "Produktdatenbank",
        "Kuratierte Produkte mit Bildern, USD-Preisvorschau und direktem Link.",
      ],
      categories: [
        "Nach Kategorie",
        "Wähle eine Abteilung und öffne die passende Kollektion.",
      ],
      "qc-guide": [
        "QC-Fotos richtig prüfen",
        "Checkliste für Form, Details, Maße und sichtbare Mängel vor dem Versand.",
      ],
      "shipping-guide": [
        "Paket planen",
        "Kosten hängen von Ziel, Größe, Gewicht und Artikelart ab.",
      ],
      articles: [
        "Ratgeber-Bibliothek",
        "Faktenbasierte Anleitungen zu Suche, Prüfung und Paketplanung.",
      ],
      faq: [
        "Häufige Fragen",
        "Klare Antworten zu Index, Links, QC-Fotos, Preisen und Versand.",
      ],
    },
    qc: [
      [
        "Artikel bestätigen",
        "Name, Farbe und Größe zuerst mit der Bestellung abgleichen.",
      ],
      [
        "Alle Winkel prüfen",
        "Vorderseite, Rückseite, Seiten und Nahaufnahmen prüfen.",
      ],
      [
        "Maße nutzen",
        "Etiketten sind keine Maße. Mit eigener Kleidung vergleichen.",
      ],
      [
        "Details vergrößern",
        "Nähte, Drucke, Stickerei, Verschlüsse und Beschläge prüfen.",
      ],
      [
        "Vor Versand entscheiden",
        "Unklare Details klären, solange der Artikel im Lager ist.",
      ],
    ],
    shipping: [
      [
        "Paket zusammenstellen",
        "Nur versandbereite Artikel bündeln und Maße prüfen.",
      ],
      [
        "Einschränkungen prüfen",
        "Akkus, Flüssigkeiten und sensible Waren können Routen begrenzen.",
      ],
      [
        "Abrechnungsgewicht vergleichen",
        "Es kann reales oder Volumengewicht gelten.",
      ],
      [
        "Schutz wählen",
        "Unnötige Verpackung entfernen, Zerbrechliches schützen.",
      ],
      [
        "Aktuelles Angebot prüfen",
        "Routen und Preise ändern sich; maßgeblich ist das aktuelle Angebot.",
      ],
    ],
    articles: [
      [
        "AllChinaBuy Spreadsheet ohne Chaos nutzen",
        "spreadsheet-guide",
        "Von einer großen Liste zu einer kurzen Produktauswahl.",
      ],
      [
        "QC-Fotos: Prüfung in fünf Minuten",
        "qc-photo-routine",
        "Was zuerst geprüft wird und wann ein Zusatzfoto sinnvoll ist.",
      ],
      [
        "Produktpreis und Paketkosten",
        "parcel-cost-guide",
        "Warum ein günstiger Artikel keinen günstigen Versand garantiert.",
      ],
    ],
    faq: [
      [
        "Ist dies die offizielle AllChinaBuy-Seite?",
        "Nein. Dies ist eine unabhängige Produktsuche.",
      ],
      [
        "Wohin führen Produktbuttons?",
        "Direkt zum Produkt unseres Einkaufsziels, nicht zu AllChinaBuy.",
      ],
      [
        "Sind Preise endgültig?",
        "Nein. Optionen, Kurse und Versand ändern den Endbetrag.",
      ],
      [
        "Was sind QC-Fotos?",
        "Lagerfotos zur Prüfung vor dem internationalen Versand.",
      ],
      [
        "Garantieren sie Qualität?",
        "Nein. Sie zeigen sichtbare, aber nicht alle versteckten Details.",
      ],
      [
        "Kann ich nach Namen suchen?",
        "Ja. Das Stichwort wird an den Produktkatalog übergeben.",
      ],
      [
        "Warum kann Versand teurer sein?",
        "Ziel, Route, Warenart, Gewicht und Volumen bestimmen den Preis.",
      ],
      [
        "Gibt es Links zu anderen Agenten?",
        "Nein. Alle Handlungslinks nutzen ein Einkaufsziel.",
      ],
    ],
  },
  fr: {
    name: "Français",
    labels: [
      "Base produits",
      "Catégories",
      "Guide QC",
      "Livraison",
      "Articles",
      "FAQ",
    ],
    cats: [
      "Baskets",
      "Sweats",
      "T-shirts",
      "Vestes",
      "Pantalons",
      "Accessoires",
    ],
    hero: [
      "MOTEUR DE DÉCOUVERTE v3.0",
      "Cherchez moins. Trouvez mieux.",
      "Un index structuré pour les recherches AllChinaBuy spreadsheet. Comparez les prix USD et ouvrez la fiche exacte.",
    ],
    ui: [
      "Voir les produits",
      "Menu",
      "Langue",
      "RECHERCHE RAPIDE",
      "ÉTAT DE L’INDEX",
      "fiches actives",
      "FILTRES",
      "RÉINITIALISER",
      "CATÉGORIE",
      "PRIX_USD",
      "STATUT",
      "Lien vérifié",
      "Nouveau cette semaine",
      "RÉSULTATS",
      "SÉLECTION",
      "POURQUOI CET INDEX",
      "Lire l’article",
      "Ouvrir la collection",
      "Rechercher produits, catégories, styles...",
    ],
    pages: {
      products: [
        "Base de produits",
        "Produits sélectionnés avec images, prix USD et lien direct.",
      ],
      categories: [
        "Par catégorie",
        "Choisissez un rayon puis ouvrez la collection.",
      ],
      "qc-guide": [
        "Lire les photos QC",
        "Vérifiez forme, détails, mesures et défauts visibles.",
      ],
      "shipping-guide": [
        "Planifier le colis",
        "Le coût dépend du pays, du volume, du poids et du type d’article.",
      ],
      articles: [
        "Bibliothèque de guides",
        "Conseils factuels sur la recherche, le contrôle et l’expédition.",
      ],
      faq: [
        "Questions fréquentes",
        "Réponses sur l’index, les liens, les photos QC et les coûts.",
      ],
    },
    qc: [
      [
        "Confirmer l’article",
        "Comparez nom, couleur et taille avec la commande.",
      ],
      ["Voir tous les angles", "Contrôlez face, dos, côtés et gros plans."],
      ["Utiliser les mesures", "Comparez les mesures avec un vêtement connu."],
      [
        "Zoomer sur les détails",
        "Inspectez coutures, impressions, broderies et fermetures.",
      ],
      [
        "Décider avant l’envoi",
        "Demandez une précision tant que l’article est à l’entrepôt.",
      ],
    ],
    shipping: [
      [
        "Composer le colis",
        "Regroupez les articles prêts et vérifiez les dimensions.",
      ],
      [
        "Vérifier les restrictions",
        "Batteries, liquides et articles sensibles peuvent limiter les lignes.",
      ],
      [
        "Comparer le poids facturé",
        "Le poids réel ou volumétrique peut s’appliquer.",
      ],
      [
        "Choisir la protection",
        "Retirez le superflu mais protégez les objets fragiles.",
      ],
      [
        "Vérifier le devis",
        "Lignes et prix changent; confirmez au moment de l’envoi.",
      ],
    ],
    articles: [
      [
        "Utiliser un spreadsheet AllChinaBuy efficacement",
        "spreadsheet-guide",
        "Transformer une longue liste en courte sélection.",
      ],
      [
        "Photos QC : contrôle en cinq minutes",
        "qc-photo-routine",
        "Les priorités et le bon moment pour demander une photo.",
      ],
      [
        "Prix produit et coût du colis",
        "parcel-cost-guide",
        "Pourquoi un article peu cher ne garantit pas un envoi peu cher.",
      ],
    ],
    faq: [
      [
        "Est-ce le site officiel AllChinaBuy ?",
        "Non. C’est un guide indépendant.",
      ],
      [
        "Où mènent les boutons ?",
        "Vers la fiche exacte de notre destination, pas vers AllChinaBuy.",
      ],
      [
        "Les prix sont-ils définitifs ?",
        "Non. Options, change et livraison modifient le total.",
      ],
      [
        "Que sont les photos QC ?",
        "Des photos d’entrepôt avant l’envoi international.",
      ],
      [
        "Garantissent-elles la qualité ?",
        "Non. Elles montrent certains défauts, pas tous les détails cachés.",
      ],
      [
        "Puis-je chercher par nom ?",
        "Oui. Le mot-clé est transmis au catalogue.",
      ],
      [
        "Pourquoi la livraison peut-elle coûter plus ?",
        "Pays, ligne, poids et volume déterminent le coût.",
      ],
      [
        "Liens vers d’autres agents ?",
        "Non. Tous les boutons gardent une seule destination.",
      ],
    ],
  },
  es: {
    name: "Español",
    labels: [
      "Base de datos",
      "Categorías",
      "Guía QC",
      "Envío",
      "Artículos",
      "FAQ",
    ],
    cats: [
      "Zapatillas",
      "Sudaderas",
      "Camisetas",
      "Chaquetas",
      "Pantalones",
      "Accesorios",
    ],
    hero: [
      "MOTOR DE PRODUCTOS v3.0",
      "Busca menos. Encuentra mejor.",
      "Índice estructurado para búsquedas AllChinaBuy spreadsheet. Compara precios USD y abre el producto exacto.",
    ],
    ui: [
      "Ver productos",
      "Menú",
      "Idioma",
      "BÚSQUEDA RÁPIDA",
      "ESTADO DEL ÍNDICE",
      "registros activos",
      "FILTROS",
      "REINICIAR",
      "CATEGORÍA",
      "PRECIO_USD",
      "ESTADO",
      "Enlace verificado",
      "Nuevo esta semana",
      "RESULTADOS",
      "SELECCIÓN",
      "POR QUÉ ESTE ÍNDICE",
      "Leer artículo",
      "Abrir colección",
      "Buscar productos, categorías, estilos...",
    ],
    pages: {
      products: [
        "Base de productos",
        "Productos seleccionados con imágenes, precio USD y enlace directo.",
      ],
      categories: [
        "Explorar categorías",
        "Elige un departamento y abre su colección.",
      ],
      "qc-guide": [
        "Cómo leer fotos QC",
        "Comprueba forma, detalles, medidas y defectos visibles.",
      ],
      "shipping-guide": [
        "Planifica el paquete",
        "El coste depende de destino, tamaño, peso y tipo.",
      ],
      articles: [
        "Biblioteca de guías",
        "Consejos basados en hechos sobre búsqueda, control y envío.",
      ],
      faq: [
        "Preguntas frecuentes",
        "Respuestas sobre el índice, enlaces, fotos QC y costes.",
      ],
    },
    qc: [
      ["Confirmar el artículo", "Compara nombre, color y talla con el pedido."],
      [
        "Revisar todos los ángulos",
        "Mira frente, espalda, laterales y primeros planos.",
      ],
      ["Usar medidas", "Compara la cinta métrica con una prenda propia."],
      ["Ampliar detalles", "Revisa costuras, estampados, bordados y cierres."],
      [
        "Decidir antes del envío",
        "Aclara dudas mientras el artículo sigue en almacén.",
      ],
    ],
    shipping: [
      ["Crear el paquete", "Agrupa artículos listos y verifica dimensiones."],
      [
        "Revisar restricciones",
        "Baterías, líquidos y artículos sensibles pueden limitar rutas.",
      ],
      ["Comparar peso facturable", "Puede aplicarse peso real o volumétrico."],
      ["Elegir protección", "Quita embalaje innecesario y protege lo frágil."],
      [
        "Verificar cotización",
        "Rutas y precios cambian; confirma el importe actual.",
      ],
    ],
    articles: [
      [
        "Usar un spreadsheet AllChinaBuy sin perderse",
        "spreadsheet-guide",
        "De una lista enorme a una selección comparable.",
      ],
      [
        "Fotos QC: revisión en cinco minutos",
        "qc-photo-routine",
        "Qué revisar primero y cuándo pedir otra foto.",
      ],
      [
        "Precio del producto y coste del paquete",
        "parcel-cost-guide",
        "Por qué un producto barato no asegura un envío barato.",
      ],
    ],
    faq: [
      ["¿Es la web oficial de AllChinaBuy?", "No. Es una guía independiente."],
      [
        "¿A dónde llevan los botones?",
        "A la ficha exacta de nuestro destino, no a AllChinaBuy.",
      ],
      [
        "¿Son precios finales?",
        "No. Opciones, cambio y envío modifican el total.",
      ],
      [
        "¿Qué son las fotos QC?",
        "Fotos de almacén antes del envío internacional.",
      ],
      [
        "¿Garantizan calidad?",
        "No. Ayudan con defectos visibles, no con todo lo oculto.",
      ],
      ["¿Puedo buscar por nombre?", "Sí. La palabra se envía al catálogo."],
      [
        "¿Por qué el envío puede costar más?",
        "Destino, ruta, peso y volumen determinan el precio.",
      ],
      [
        "¿Hay enlaces a otros agentes?",
        "No. Todos los botones usan un destino.",
      ],
    ],
  },
  it: {
    name: "Italiano",
    labels: [
      "Database",
      "Categorie",
      "Guida QC",
      "Spedizione",
      "Articoli",
      "FAQ",
    ],
    cats: ["Sneaker", "Felpe", "T-shirt", "Giacche", "Pantaloni", "Accessori"],
    hero: [
      "MOTORE DI RICERCA v3.0",
      "Cerca meno. Trova meglio.",
      "Indice strutturato per ricerche AllChinaBuy spreadsheet. Confronta i prezzi USD e apri il prodotto esatto.",
    ],
    ui: [
      "Vedi prodotti",
      "Menu",
      "Lingua",
      "RICERCA RAPIDA",
      "STATO INDICE",
      "schede attive",
      "FILTRI",
      "AZZERA",
      "CATEGORIA",
      "PREZZO_USD",
      "STATO",
      "Link verificato",
      "Nuovi questa settimana",
      "RISULTATI",
      "SELEZIONATI",
      "PERCHÉ QUESTO INDICE",
      "Leggi articolo",
      "Apri collezione",
      "Cerca prodotti, categorie, stili...",
    ],
    pages: {
      products: [
        "Database prodotti",
        "Prodotti selezionati con immagini, prezzi USD e link diretto.",
      ],
      categories: [
        "Esplora categorie",
        "Scegli un reparto e apri la collezione.",
      ],
      "qc-guide": [
        "Leggere le foto QC",
        "Controlla forma, dettagli, misure e difetti visibili.",
      ],
      "shipping-guide": [
        "Pianifica il pacco",
        "Il costo dipende da destinazione, dimensioni, peso e tipo.",
      ],
      articles: [
        "Guide e ricerche",
        "Contenuti basati su fatti per ricerca, controllo e spedizione.",
      ],
      faq: ["Domande frequenti", "Risposte su indice, link, foto QC e costi."],
    },
    qc: [
      ["Conferma l’articolo", "Confronta nome, colore e taglia con l’ordine."],
      ["Controlla ogni angolo", "Esamina fronte, retro, lati e primi piani."],
      ["Usa le misure", "Confronta le foto con un capo tuo."],
      [
        "Ingrandisci i dettagli",
        "Controlla cuciture, stampe, ricami e chiusure.",
      ],
      [
        "Decidi prima dell’invio",
        "Chiedi chiarimenti mentre il prodotto è in magazzino.",
      ],
    ],
    shipping: [
      [
        "Componi il pacco",
        "Raggruppa articoli pronti e verifica le dimensioni.",
      ],
      [
        "Controlla i limiti",
        "Batterie, liquidi e articoli sensibili possono limitare le linee.",
      ],
      ["Confronta il peso", "Può valere il peso reale o volumetrico."],
      [
        "Scegli la protezione",
        "Riduci l’imballo ma proteggi gli oggetti fragili.",
      ],
      [
        "Verifica il preventivo",
        "Linee e prezzi cambiano; conferma il dato attuale.",
      ],
    ],
    articles: [
      [
        "Usare uno spreadsheet AllChinaBuy senza perdersi",
        "spreadsheet-guide",
        "Da una grande lista a una selezione confrontabile.",
      ],
      [
        "Foto QC: controllo in cinque minuti",
        "qc-photo-routine",
        "Cosa guardare prima e quando chiedere una foto extra.",
      ],
      [
        "Prezzo prodotto e costo pacco",
        "parcel-cost-guide",
        "Perché un articolo economico non garantisce una spedizione economica.",
      ],
    ],
    faq: [
      ["È il sito ufficiale AllChinaBuy?", "No. È una guida indipendente."],
      [
        "Dove portano i pulsanti?",
        "Alla pagina esatta del nostro sito, non ad AllChinaBuy.",
      ],
      [
        "I prezzi sono definitivi?",
        "No. Opzioni, cambio e spedizione cambiano il totale.",
      ],
      ["Cosa sono le foto QC?", "Foto di magazzino prima della spedizione."],
      [
        "Garantiscono la qualità?",
        "No. Aiutano con difetti visibili, non con tutto.",
      ],
      ["Posso cercare per nome?", "Sì. La parola passa al catalogo."],
      [
        "Perché la spedizione può costare di più?",
        "Destinazione, linea, peso e volume determinano il costo.",
      ],
      [
        "Collegate altri agenti?",
        "No. Tutti i pulsanti usano una sola destinazione.",
      ],
    ],
  },
  pl: {
    name: "Polski",
    labels: [
      "Baza produktów",
      "Kategorie",
      "Poradnik QC",
      "Wysyłka",
      "Artykuły",
      "FAQ",
    ],
    cats: ["Buty", "Bluzy", "T-shirty", "Kurtki", "Spodnie", "Akcesoria"],
    hero: [
      "WYSZUKIWARKA PRODUKTÓW v3.0",
      "Szukaj mniej. Znajduj lepiej.",
      "Uporządkowany indeks dla wyszukiwań AllChinaBuy spreadsheet. Porównuj ceny USD i otwieraj konkretny produkt.",
    ],
    ui: [
      "Zobacz produkty",
      "Menu",
      "Język",
      "SZYBKIE WYSZUKIWANIE",
      "STAN INDEKSU",
      "aktywnych pozycji",
      "FILTRY",
      "RESETUJ",
      "KATEGORIA",
      "CENA_USD",
      "STATUS",
      "Link sprawdzony",
      "Nowe w tym tygodniu",
      "WYNIKÓW",
      "WYBRANE",
      "DLACZEGO TEN INDEKS",
      "Czytaj artykuł",
      "Otwórz kolekcję",
      "Szukaj produktów, kategorii, stylów...",
    ],
    pages: {
      products: [
        "Baza produktów",
        "Wybrane produkty ze zdjęciami, cenami USD i linkiem.",
      ],
      categories: ["Kategorie", "Wybierz dział i otwórz kolekcję."],
      "qc-guide": [
        "Jak czytać zdjęcia QC",
        "Sprawdź kształt, detale, wymiary i widoczne wady.",
      ],
      "shipping-guide": [
        "Zaplanuj paczkę",
        "Koszt zależy od kraju, rozmiaru, wagi i typu.",
      ],
      articles: [
        "Biblioteka poradników",
        "Rzetelne treści o wyszukiwaniu, kontroli i przesyłce.",
      ],
      faq: [
        "Częste pytania",
        "Odpowiedzi o indeksie, linkach, zdjęciach QC i kosztach.",
      ],
    },
    qc: [
      ["Potwierdź produkt", "Porównaj nazwę, kolor i rozmiar z zamówieniem."],
      ["Sprawdź każdy kąt", "Obejrzyj przód, tył, boki i zbliżenia."],
      ["Użyj wymiarów", "Porównaj zdjęcia z własną odzieżą."],
      ["Powiększ szczegóły", "Sprawdź szwy, nadruki, hafty i zamki."],
      [
        "Zdecyduj przed wysyłką",
        "Wyjaśnij wątpliwości, gdy produkt jest w magazynie.",
      ],
    ],
    shipping: [
      ["Zbuduj paczkę", "Połącz gotowe produkty i sprawdź wymiary."],
      [
        "Sprawdź ograniczenia",
        "Baterie, płyny i wrażliwe towary mogą ograniczać linie.",
      ],
      ["Porównaj wagę", "Może obowiązywać waga rzeczywista lub objętościowa."],
      [
        "Wybierz zabezpieczenie",
        "Usuń zbędne opakowania i chroń delikatne rzeczy.",
      ],
      ["Sprawdź wycenę", "Linie i ceny się zmieniają; potwierdź ofertę."],
    ],
    articles: [
      [
        "Jak używać AllChinaBuy spreadsheet bez chaosu",
        "spreadsheet-guide",
        "Od ogromnej listy do krótkiego porównania.",
      ],
      [
        "Zdjęcia QC: kontrola w pięć minut",
        "qc-photo-routine",
        "Co sprawdzić i kiedy poprosić o dodatkowe zdjęcie.",
      ],
      [
        "Cena produktu a koszt paczki",
        "parcel-cost-guide",
        "Dlaczego tani produkt nie oznacza taniej wysyłki.",
      ],
    ],
    faq: [
      [
        "Czy to oficjalna strona AllChinaBuy?",
        "Nie. To niezależny przewodnik.",
      ],
      [
        "Dokąd prowadzą przyciski?",
        "Do dokładnej karty produktu, nie do AllChinaBuy.",
      ],
      ["Czy ceny są ostateczne?", "Nie. Opcje, kurs i wysyłka zmieniają sumę."],
      ["Czym są zdjęcia QC?", "Zdjęciami magazynowymi przed wysyłką."],
      [
        "Czy gwarantują jakość?",
        "Nie. Pokazują widoczne wady, nie wszystkie ukryte.",
      ],
      ["Czy mogę szukać po nazwie?", "Tak. Hasło trafia do katalogu."],
      [
        "Dlaczego wysyłka bywa droższa?",
        "Kraj, linia, waga i objętość określają cenę.",
      ],
      [
        "Czy linkujecie innych agentów?",
        "Nie. Wszystkie przyciski prowadzą do jednego celu.",
      ],
    ],
  },
  ro: {
    name: "Română",
    labels: [
      "Bază produse",
      "Categorii",
      "Ghid QC",
      "Livrare",
      "Articole",
      "FAQ",
    ],
    cats: [
      "Pantofi",
      "Hanorace",
      "Tricouri",
      "Jachete",
      "Pantaloni",
      "Accesorii",
    ],
    hero: [
      "MOTOR DE CĂUTARE v3.0",
      "Caută mai puțin. Găsește mai bine.",
      "Index structurat pentru căutări AllChinaBuy spreadsheet. Compară prețuri USD și deschide produsul exact.",
    ],
    ui: [
      "Vezi produsele",
      "Meniu",
      "Limbă",
      "CĂUTARE RAPIDĂ",
      "STARE INDEX",
      "înregistrări active",
      "FILTRE",
      "RESETEAZĂ",
      "CATEGORIE",
      "PREȚ_USD",
      "STARE",
      "Link verificat",
      "Nou săptămâna aceasta",
      "REZULTATE",
      "SELECTATE",
      "DE CE ACEST INDEX",
      "Citește articolul",
      "Deschide colecția",
      "Caută produse, categorii, stiluri...",
    ],
    pages: {
      products: [
        "Bază de produse",
        "Produse selectate cu imagini, prețuri USD și link direct.",
      ],
      categories: [
        "Explorează categoriile",
        "Alege un departament și deschide colecția.",
      ],
      "qc-guide": [
        "Cum citești pozele QC",
        "Verifică forma, detaliile, măsurile și defectele vizibile.",
      ],
      "shipping-guide": [
        "Planifică pachetul",
        "Costul depinde de destinație, dimensiune, greutate și tip.",
      ],
      articles: [
        "Bibliotecă de ghiduri",
        "Conținut documentat despre căutare, verificare și livrare.",
      ],
      faq: [
        "Întrebări frecvente",
        "Răspunsuri despre index, linkuri, poze QC și costuri.",
      ],
    },
    qc: [
      ["Confirmă produsul", "Compară numele, culoarea și mărimea cu comanda."],
      [
        "Verifică toate unghiurile",
        "Privește fața, spatele, lateralele și detaliile.",
      ],
      [
        "Folosește măsurătorile",
        "Compară fotografiile cu o piesă pe care o ai.",
      ],
      [
        "Mărește detaliile",
        "Verifică cusături, imprimeuri, broderii și fermoare.",
      ],
      [
        "Decide înainte de livrare",
        "Cere clarificări cât produsul este în depozit.",
      ],
    ],
    shipping: [
      [
        "Construiește pachetul",
        "Grupează produsele pregătite și verifică dimensiunile.",
      ],
      [
        "Verifică restricțiile",
        "Bateriile, lichidele și produsele sensibile pot limita rutele.",
      ],
      ["Compară greutatea", "Se poate folosi greutatea reală sau volumetrică."],
      [
        "Alege protecția",
        "Elimină ambalajul inutil și protejează obiectele fragile.",
      ],
      [
        "Verifică oferta",
        "Rutele și prețurile se schimbă; confirmă oferta actuală.",
      ],
    ],
    articles: [
      [
        "Cum folosești un AllChinaBuy spreadsheet eficient",
        "spreadsheet-guide",
        "De la o listă mare la o selecție comparabilă.",
      ],
      [
        "Poze QC: verificare în cinci minute",
        "qc-photo-routine",
        "Ce verifici și când merită o fotografie suplimentară.",
      ],
      [
        "Prețul produsului și costul pachetului",
        "parcel-cost-guide",
        "De ce un produs ieftin nu garantează o livrare ieftină.",
      ],
    ],
    faq: [
      ["Este site-ul oficial AllChinaBuy?", "Nu. Este un ghid independent."],
      [
        "Unde duc butoanele produselor?",
        "La pagina exactă a produsului, nu la AllChinaBuy.",
      ],
      [
        "Prețurile sunt finale?",
        "Nu. Opțiunile, cursul și livrarea schimbă totalul.",
      ],
      ["Ce sunt pozele QC?", "Fotografii din depozit înainte de transport."],
      [
        "Garantează calitatea?",
        "Nu. Arată probleme vizibile, nu toate detaliile ascunse.",
      ],
      ["Pot căuta după nume?", "Da. Termenul este trimis către catalog."],
      [
        "De ce livrarea poate costa mai mult?",
        "Destinația, ruta, greutatea și volumul determină costul.",
      ],
      [
        "Trimiteți către alți agenți?",
        "Nu. Toate acțiunile folosesc o singură destinație.",
      ],
    ],
  },
};

Object.assign(localeCopy.en, {
  hero: [
    "ROMANIA PRODUCT DISCOVERY",
    "AllChinaBuy Spreadsheet for Romania",
    "A Romania-focused index for product discovery, QC checks and parcel planning. Compare current USD estimates and open the mapped product listing.",
  ],
  ui: [
    "Browse products",
    "Menu",
    "Language",
    "QUICK QUERY",
    "INDEX STATUS",
    "visible records",
    "FILTERS",
    "RESET",
    "CATEGORY",
    "PRICE_USD",
    "STATUS",
    "Link checked",
    "USD estimate",
    "RESULTS",
    "CURATED",
    "METHODOLOGY",
    "Read article",
    "Open collection",
    "Search current products...",
  ],
  pages: {
    ...localeCopy.en.pages,
    products: [
      "Product database for Romania",
      "Browse eight visible records with current images, USD estimates and mapped paths to the live catalogue.",
    ],
    categories: [
      "Browse by category",
      "Open the current shopping collection with referral parameters identifying traffic from allchinabuy.ro.",
    ],
    "qc-guide": [
      "How to read QC photos",
      "A practical checklist for Romanian buyers: identity, details, measurements and visible defects before international shipping.",
    ],
    "shipping-guide": [
      "Shipping to Romania",
      "Plan route eligibility, packed weight, VAT, customs treatment and the live parcel quote before submission.",
    ],
    articles: [
      "Romania research library",
      "Fact-led guides for product discovery, inspection and parcel planning for Romanian shoppers.",
    ],
    faq: [
      "Frequently asked questions",
      "Clear answers about this independent Romania guide, product links, QC photos, estimates and shipping.",
    ],
  },
});

Object.assign(localeCopy.ro, {
  hero: [
    "GHID DE PRODUSE PENTRU ROMÂNIA",
    "AllChinaBuy Spreadsheet pentru România",
    "Index românesc pentru descoperirea produselor, verificarea pozelor QC și planificarea coletului. Compară estimări USD actuale și deschide pagina mapată a produsului.",
  ],
  ui: [
    "Vezi produsele",
    "Meniu",
    "Limbă",
    "CĂUTARE RAPIDĂ",
    "STARE INDEX",
    "înregistrări afișate",
    "FILTRE",
    "RESETEAZĂ",
    "CATEGORIE",
    "PREȚ_USD",
    "STARE",
    "Link verificat",
    "Estimare USD",
    "REZULTATE",
    "SELECTATE",
    "METODOLOGIE",
    "Citește articolul",
    "Deschide colecția",
    "Caută produse actuale...",
  ],
  pages: {
    ...localeCopy.ro.pages,
    products: [
      "Bază de produse pentru România",
      "Opt înregistrări vizibile, cu imagini actuale, estimări USD și linkuri mapate către catalogul activ.",
    ],
    categories: [
      "Explorează categoriile",
      "Deschide colecția actuală, cu parametri de recomandare care identifică traficul din allchinabuy.ro.",
    ],
    "qc-guide": [
      "Cum citești pozele QC",
      "Listă practică pentru cumpărătorii din România: identitate, detalii, măsuri și defecte vizibile înainte de expediere.",
    ],
    "shipping-guide": [
      "Livrare către România",
      "Planifică eligibilitatea rutei, greutatea ambalată, TVA, formalitățile vamale și oferta live înainte de trimitere.",
    ],
    articles: [
      "Bibliotecă pentru România",
      "Ghiduri documentate despre produse, QC și planificarea coletelor pentru cumpărătorii din România.",
    ],
    faq: [
      "Întrebări frecvente",
      "Răspunsuri despre acest ghid românesc independent, linkuri, poze QC, estimări și livrare.",
    ],
  },
});

const siteText: Record<
  Locale,
  {
    independent: string;
    records: string;
    checked: string;
    estimate: string;
    source: string;
    open: string;
    search: string;
  }
> = {
  ro: {
    independent:
      "Ghid independent pentru România · Nu este site-ul oficial AllChinaBuy",
    records: "produse vizibile",
    checked: "Linkuri verificate la 12 august 2026",
    estimate: "Estimări USD, nu prețuri finale",
    source: "Sursă și metodă",
    open: "CATALOG LIVE",
    search: "Caută",
  },
  en: {
    independent:
      "Independent Romania guide · Not the official AllChinaBuy website",
    records: "visible products",
    checked: "Links checked 12 August 2026",
    estimate: "USD estimates, not final prices",
    source: "Source and method",
    open: "LIVE CATALOG",
    search: "Search",
  },
  de: {
    independent:
      "Unabhängiger Rumänien-Ratgeber · Keine offizielle AllChinaBuy-Website",
    records: "sichtbare Produkte",
    checked: "Links geprüft am 12. August 2026",
    estimate: "USD-Schätzungen, keine Endpreise",
    source: "Quelle und Methode",
    open: "LIVE-KATALOG",
    search: "Suchen",
  },
  fr: {
    independent:
      "Guide indépendant pour la Roumanie · Ce n’est pas le site officiel AllChinaBuy",
    records: "produits visibles",
    checked: "Liens vérifiés le 12 août 2026",
    estimate: "Estimations USD, pas des prix finaux",
    source: "Source et méthode",
    open: "CATALOGUE ACTUEL",
    search: "Rechercher",
  },
  es: {
    independent:
      "Guía independiente para Rumanía · No es el sitio oficial de AllChinaBuy",
    records: "productos visibles",
    checked: "Enlaces revisados el 12 de agosto de 2026",
    estimate: "Estimaciones USD, no precios finales",
    source: "Fuente y método",
    open: "CATÁLOGO ACTUAL",
    search: "Buscar",
  },
  it: {
    independent:
      "Guida indipendente per la Romania · Non è il sito ufficiale AllChinaBuy",
    records: "prodotti visibili",
    checked: "Link verificati il 12 agosto 2026",
    estimate: "Stime USD, non prezzi finali",
    source: "Fonte e metodo",
    open: "CATALOGO ATTUALE",
    search: "Cerca",
  },
  pl: {
    independent:
      "Niezależny przewodnik dla Rumunii · To nie jest oficjalna strona AllChinaBuy",
    records: "widoczne produkty",
    checked: "Linki sprawdzono 12 sierpnia 2026",
    estimate: "Szacunki USD, nie ceny końcowe",
    source: "Źródło i metoda",
    open: "AKTUALNY KATALOG",
    search: "Szukaj",
  },
};

const factualFaqExtras: Record<Exclude<Locale, "en">, [string, string][]> = {
  de: [
    [
      "Welche Leistungen beschreibt AllChinaBuy öffentlich?",
      "Die offizielle App nennt Einkauf, Bestellabwicklung, Qualitätsprüfung, internationale Logistik und Kundendienst; der internationale Versand erfolgt durch Drittanbieter.",
    ],
    [
      "Welche Daten braucht eine Versandschätzung?",
      "Der offizielle Rechner fragt nach Ziel, Warenkategorie, geschätztem Gewicht und gegebenenfalls Paketmaßen.",
    ],
    [
      "Ist der Rechnerpreis endgültig?",
      "Nein. Endmaße, Wareneignung und aktuell verfügbare Linien können das Live-Angebot ändern.",
    ],
    [
      "Was prüfe ich vor dem Paketversand?",
      "Artikel, QC-Nachweise, Gewicht, Maße, Linien-Eignung und den aktuellen Gesamtbetrag prüfen.",
    ],
  ],
  fr: [
    [
      "Quels services AllChinaBuy décrit-il ?",
      "L’application officielle cite l’achat, le traitement des commandes, le contrôle qualité, la logistique internationale et le service après-vente; l’envoi international est assuré par des tiers.",
    ],
    [
      "Quelles données faut-il pour estimer l’envoi ?",
      "Le calculateur officiel demande la destination, la catégorie, le poids estimé et, si nécessaire, les dimensions.",
    ],
    [
      "Le résultat du calculateur est-il final ?",
      "Non. Mesures finales, éligibilité et lignes disponibles peuvent modifier le devis réel.",
    ],
    [
      "Que vérifier avant l’envoi ?",
      "Article reçu, preuves QC, poids, dimensions, éligibilité de la ligne et total actuel.",
    ],
  ],
  es: [
    [
      "¿Qué servicios describe AllChinaBuy?",
      "La app oficial enumera compra, gestión de pedidos, inspección de calidad, logística internacional y posventa; el envío internacional lo prestan terceros.",
    ],
    [
      "¿Qué datos necesita una estimación?",
      "La calculadora oficial solicita destino, categoría, peso estimado y, cuando corresponde, dimensiones.",
    ],
    [
      "¿El resultado es el precio final?",
      "No. Medidas finales, elegibilidad y rutas disponibles pueden cambiar la cotización real.",
    ],
    [
      "¿Qué revisar antes de enviar?",
      "Producto, pruebas QC, peso, dimensiones, elegibilidad de ruta y total actual.",
    ],
  ],
  it: [
    [
      "Quali servizi descrive AllChinaBuy?",
      "L’app ufficiale indica acquisto, gestione ordini, controllo qualità, logistica internazionale e post-vendita; la spedizione internazionale è fornita da terzi.",
    ],
    [
      "Quali dati servono per una stima?",
      "Il calcolatore ufficiale richiede destinazione, categoria, peso stimato e, se necessario, dimensioni.",
    ],
    [
      "Il risultato è il prezzo finale?",
      "No. Misure finali, idoneità e linee disponibili possono cambiare il preventivo reale.",
    ],
    [
      "Cosa verificare prima della spedizione?",
      "Prodotto, prove QC, peso, dimensioni, idoneità della linea e totale attuale.",
    ],
  ],
  pl: [
    [
      "Jakie usługi opisuje AllChinaBuy?",
      "Oficjalna aplikacja wymienia zakup, realizację zamówień, kontrolę jakości, logistykę międzynarodową i obsługę posprzedażową; wysyłkę zapewniają firmy zewnętrzne.",
    ],
    [
      "Jakie dane są potrzebne do wyceny?",
      "Oficjalny kalkulator pyta o kraj, kategorię, szacowaną wagę i w razie potrzeby wymiary.",
    ],
    [
      "Czy wynik kalkulatora jest ostateczny?",
      "Nie. Końcowe wymiary, kwalifikacja towaru i dostępne linie mogą zmienić ofertę.",
    ],
    [
      "Co sprawdzić przed wysyłką?",
      "Produkt, zdjęcia QC, wagę, wymiary, dostępność linii i aktualną sumę.",
    ],
  ],
  ro: [
    [
      "Ce servicii descrie AllChinaBuy?",
      "Aplicația oficială enumeră achiziția, procesarea comenzilor, controlul calității, logistica internațională și serviciile post-vânzare; transportul internațional este oferit de terți.",
    ],
    [
      "Ce date sunt necesare pentru estimare?",
      "Calculatorul oficial cere destinația, categoria, greutatea estimată și, unde este cazul, dimensiunile.",
    ],
    [
      "Rezultatul este prețul final?",
      "Nu. Dimensiunile finale, eligibilitatea și rutele disponibile pot modifica oferta reală.",
    ],
    [
      "Ce verific înainte de expediere?",
      "Produsul, dovezile QC, greutatea, dimensiunile, eligibilitatea rutei și totalul actual.",
    ],
  ],
};

for (const locale of locales) {
  if (locale !== "en") localeCopy[locale].faq.push(...factualFaqExtras[locale]);
}

const methodologyCopy: Record<Locale, [string, string][]> = {
  ro: [
    [
      "8 ÎNREGISTRĂRI VIZIBILE",
      "Numărul afișat descrie numai cele opt carduri publicate pe această pagină. Nu pretindem că există o bază ascunsă cu mii de produse.",
    ],
    [
      "LINKURI MAPATE",
      "Fiecare produs a fost remapat la o pagină cnbuycha.com care returna un produs cu același nume la verificarea din 12 august 2026.",
    ],
    [
      "ESTIMĂRI USD",
      "Valorile USD sunt orientative, calculate din prețurile CNY afișate și cursul de referință 1 USD = 6,744 CNY din 12 august 2026. Varianta și cursul pot schimba totalul.",
    ],
  ],
  en: [
    [
      "8 VISIBLE RECORDS",
      "The count describes only the eight product cards published on this page. We do not claim a hidden database containing thousands of products.",
    ],
    [
      "MAPPED LINKS",
      "Each product was remapped to a cnbuycha.com page returning the same named product when checked on 12 August 2026.",
    ],
    [
      "USD ESTIMATES",
      "USD values are indicative conversions from displayed CNY prices using 1 USD = 6.744 CNY on 12 August 2026. Variant and exchange-rate changes affect the total.",
    ],
  ],
  de: [
    [
      "8 SICHTBARE EINTRÄGE",
      "Die Zahl beschreibt nur die acht veröffentlichten Produktkarten. Es wird keine versteckte Datenbank mit Tausenden Produkten behauptet.",
    ],
    [
      "ZUGEORDNETE LINKS",
      "Jedes Produkt wurde einer passenden cnbuycha.com-Produktseite zugeordnet und am 12. August 2026 geprüft.",
    ],
    [
      "USD-SCHÄTZUNGEN",
      "Die USD-Werte sind Näherungen aus den angezeigten CNY-Preisen bei 1 USD = 6,744 CNY am 12. August 2026. Variante und Wechselkurs können den Betrag ändern.",
    ],
  ],
  fr: [
    [
      "8 FICHES VISIBLES",
      "Le nombre décrit uniquement les huit cartes publiées sur cette page. Nous ne revendiquons pas une base cachée de milliers de produits.",
    ],
    [
      "LIENS MAPPÉS",
      "Chaque produit a été associé à une fiche cnbuycha.com portant le même nom et vérifiée le 12 août 2026.",
    ],
    [
      "ESTIMATIONS USD",
      "Les montants USD sont des conversions indicatives des prix CNY avec 1 USD = 6,744 CNY au 12 août 2026. Variante et taux de change modifient le total.",
    ],
  ],
  es: [
    [
      "8 REGISTROS VISIBLES",
      "La cifra describe solo las ocho tarjetas publicadas en esta página. No afirmamos tener una base oculta con miles de productos.",
    ],
    [
      "ENLACES MAPEADOS",
      "Cada producto se asoció con una ficha de cnbuycha.com del mismo nombre y se revisó el 12 de agosto de 2026.",
    ],
    [
      "ESTIMACIONES USD",
      "Los importes USD son conversiones orientativas de precios CNY con 1 USD = 6,744 CNY el 12 de agosto de 2026. Variante y cambio pueden modificar el total.",
    ],
  ],
  it: [
    [
      "8 SCHEDE VISIBILI",
      "Il numero descrive soltanto le otto schede pubblicate. Non dichiariamo l’esistenza di un database nascosto con migliaia di prodotti.",
    ],
    [
      "LINK MAPPATI",
      "Ogni prodotto è stato associato a una pagina cnbuycha.com con lo stesso nome e verificato il 12 agosto 2026.",
    ],
    [
      "STIME USD",
      "Gli importi USD sono conversioni indicative dei prezzi CNY con 1 USD = 6,744 CNY al 12 agosto 2026. Variante e cambio possono modificare il totale.",
    ],
  ],
  pl: [
    [
      "8 WIDOCZNYCH POZYCJI",
      "Liczba opisuje wyłącznie osiem kart opublikowanych na tej stronie. Nie deklarujemy ukrytej bazy z tysiącami produktów.",
    ],
    [
      "DOPASOWANE LINKI",
      "Każdy produkt połączono ze stroną cnbuycha.com o tej samej nazwie i sprawdzono 12 sierpnia 2026.",
    ],
    [
      "SZACUNKI USD",
      "Kwoty USD są orientacyjnym przeliczeniem cen CNY po kursie 1 USD = 6,744 CNY z 12 sierpnia 2026. Wariant i kurs mogą zmienić sumę.",
    ],
  ],
};

const romaniaGuidance: Record<Locale, [string, string, string, string][]> = {
  ro: [
    [
      "TVA și declarația de import",
      "Toate bunurile care intră în UE necesită declarație de import. Pentru expedierile IOSS de până la 150 EUR, TVA poate fi colectată la cumpărare numai dacă numărul IOSS ajunge corect în mesajele electronice.",
      "Comisia Europeană",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Taxă vamală temporară din 2026",
      "De la 1 iulie 2026, UE aplică o taxă vamală temporară de 3 EUR per articol pentru vânzările la distanță din colete cu valoare de până la 150 EUR, până la 1 iulie 2028. Verifică regula înainte de expediere.",
      "Ghidul UE 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "Oferta de transport nu este costul livrat",
      "Prețul rutei nu garantează TVA, taxele vamale, comisionul de prezentare sau alte costuri locale. Confirmă documentele IOSS și tarifele actuale ale operatorului înainte de trimitere.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  en: [
    [
      "Import VAT and declaration",
      "All goods entering the EU require an import declaration. For IOSS consignments up to EUR 150, VAT is treated as paid at purchase only when valid IOSS data reaches the postal customs message.",
      "European Commission",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Temporary 2026 customs duty",
      "From 1 July 2026, the EU applies a temporary EUR 3 customs duty per item to distance sales in consignments up to EUR 150, until 1 July 2028. Recheck the rule before shipping.",
      "EU 2026 guidance",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "A freight quote is not landed cost",
      "A route price does not guarantee VAT, customs duty, presentation fees or other local charges. Verify IOSS data and the current Romanian operator tariff before submission.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  de: [
    [
      "Einfuhrumsatzsteuer und Anmeldung",
      "Alle Waren in die EU benötigen eine Einfuhranmeldung. Bei IOSS-Sendungen bis 150 EUR gilt die Steuer nur dann als vorausbezahlt, wenn gültige IOSS-Daten elektronisch übermittelt werden.",
      "Europäische Kommission",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Befristeter Zoll 2026",
      "Seit 1. Juli 2026 gilt vorübergehend ein Zoll von 3 EUR je Artikel für Fernverkäufe in Sendungen bis 150 EUR, bis 1. Juli 2028. Vor Versand erneut prüfen.",
      "EU-Leitfaden 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "Frachtpreis ist nicht Endpreis",
      "Der Routenpreis garantiert weder Steuer noch Zoll, Vorlagegebühr oder weitere lokale Kosten. IOSS-Daten und aktuelle Tarife in Rumänien prüfen.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  fr: [
    [
      "TVA et déclaration d’importation",
      "Toute marchandise entrant dans l’UE exige une déclaration. Pour l’IOSS jusqu’à 150 EUR, la TVA n’est reconnue comme payée que si les données IOSS valides sont transmises électroniquement.",
      "Commission européenne",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Droit temporaire 2026",
      "Depuis le 1er juillet 2026, un droit temporaire de 3 EUR par article s’applique aux ventes à distance dans les colis jusqu’à 150 EUR, jusqu’au 1er juillet 2028. À revérifier avant l’envoi.",
      "Guide UE 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "Le devis n’est pas le coût livré",
      "Le prix de la ligne ne garantit ni TVA, ni droits, ni frais de présentation locaux. Vérifiez les données IOSS et les tarifs roumains actuels.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  es: [
    [
      "IVA y declaración de importación",
      "Todos los bienes que entran en la UE requieren declaración. En IOSS hasta 150 EUR, el IVA solo se reconoce como pagado si los datos IOSS válidos se transmiten electrónicamente.",
      "Comisión Europea",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Derecho temporal de 2026",
      "Desde el 1 de julio de 2026 se aplica un derecho temporal de 3 EUR por artículo a ventas a distancia en envíos de hasta 150 EUR, hasta el 1 de julio de 2028. Revísalo antes de enviar.",
      "Guía UE 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "La tarifa no es el coste entregado",
      "El precio de la ruta no garantiza IVA, derechos, tasas de presentación ni otros cargos locales. Verifica IOSS y las tarifas vigentes en Rumanía.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  it: [
    [
      "IVA e dichiarazione d’importazione",
      "Tutte le merci che entrano nell’UE richiedono una dichiarazione. Per IOSS fino a 150 EUR, l’IVA risulta pagata solo se i dati IOSS validi sono trasmessi elettronicamente.",
      "Commissione europea",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Dazio temporaneo 2026",
      "Dal 1º luglio 2026 si applica un dazio temporaneo di 3 EUR per articolo alle vendite a distanza in colli fino a 150 EUR, fino al 1º luglio 2028. Ricontrolla prima della spedizione.",
      "Guida UE 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "Il preventivo non è il costo consegnato",
      "Il prezzo della linea non garantisce IVA, dazi, spese di presentazione o altri costi locali. Verifica IOSS e le tariffe correnti in Romania.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
  pl: [
    [
      "VAT i zgłoszenie importowe",
      "Wszystkie towary wwożone do UE wymagają zgłoszenia. Dla IOSS do 150 EUR VAT uznaje się za zapłacony tylko po prawidłowym elektronicznym przekazaniu danych IOSS.",
      "Komisja Europejska",
      "https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-formalities-low-value-consignments_en",
    ],
    [
      "Tymczasowe cło 2026",
      "Od 1 lipca 2026 obowiązuje tymczasowe cło 3 EUR za sztukę w sprzedaży na odległość dla przesyłek do 150 EUR, do 1 lipca 2028. Sprawdź zasady przed wysyłką.",
      "Wytyczne UE 2026",
      "https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en",
    ],
    [
      "Wycena nie jest kosztem dostawy",
      "Cena trasy nie gwarantuje VAT, cła, opłat prezentacyjnych ani innych kosztów lokalnych. Sprawdź IOSS i aktualne taryfy w Rumunii.",
      "Poșta Română",
      "https://www.posta-romana.ro/en/a1488/i-want-to-receive/useful-information//vat-and-customs-clearance-modifications.html",
    ],
  ],
};

const slugs = [
  "products",
  "categories",
  "qc-guide",
  "shipping-guide",
  "articles",
  "faq",
];
const href = (locale: Locale, path = "") =>
  `${locale === "ro" ? "" : `/${locale}`}${path ? `/${path}` : locale === "ro" ? "/" : ""}`;

function Header({ locale, path }: { locale: Locale; path: string[] }) {
  const t = localeCopy[locale],
    suffix = path.join("/");
  return (
    <header className="site-nav nav-c terminal-header">
      <a
        className="terminal-brand"
        href={href(locale)}
        aria-label="AllChinaBuy finds home"
      >
        <img
          src="/allchinabuy.png"
          alt="AllChinaBuy"
          width="1718"
          height="253"
        />
      </a>
      <nav className="terminal-nav">
        {slugs.map((slug, i) => (
          <a
            className={path[0] === slug ? "active" : ""}
            href={href(locale, slug)}
            key={slug}
          >
            {t.labels[i]}
          </a>
        ))}
      </nav>
      <div className="terminal-actions">
        <details className="lang-menu">
          <summary>{locale.toUpperCase()}⌄</summary>
          <div>
            {locales.map((l) => (
              <a
                className={l === locale ? "active" : ""}
                href={href(l, suffix)}
                key={l}
              >
                <span>{l.toUpperCase()}</span>
                {localeCopy[l].name}
              </a>
            ))}
          </div>
        </details>
        <a
          className="terminal-cta"
          href="https://www.cnbuycha.com/AllProducts/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_header"
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          {t.ui[0]} ↗
        </a>
        <details className="mobile-menu">
          <summary>{t.ui[1]}</summary>
          <div>
            {slugs.map((slug, i) => (
              <a href={href(locale, slug)} key={slug}>
                {t.labels[i]}
              </a>
            ))}
            <span>{t.ui[2]}</span>
            {locales.map((l) => (
              <a href={href(l, suffix)} key={l}>
                {localeCopy[l].name}
              </a>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

function SiteFooter({ locale }: { locale: Locale }) {
  const t = localeCopy[locale];
  const trustLinks = [
    ["Methodology", "/methodology"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Privacy", "/privacy"],
    ["Terms", "/terms"],
    ["Affiliate disclosure", "/affiliate-disclosure"],
  ];
  return (
    <footer className="site-footer footer-c terminal-footer">
      <div className="terminal-footer-logo">
        <img
          src="/allchinabuy.png"
          alt="AllChinaBuy"
          width="1718"
          height="253"
        />
      </div>
      <p>
        {t.pages.products[1]}
        <br />
        <span>{siteText[locale].independent}</span>
        <span className="footer-trust-links">
          {trustLinks.map(([label, url]) => (
            <a href={url} key={url}>
              {label}
            </a>
          ))}
        </span>
      </p>
      <span>allchinabuy.ro · 2026</span>
    </footer>
  );
}

function Home({ locale }: { locale: Locale }) {
  const t = localeCopy[locale];
  return (
    <>
      <section className="hero-c">
        <div className="terminal-path">/ DISCOVER / ALL_PRODUCTS</div>
        <div className="hero-c-grid">
          <div>
            <span className="mono-label">{t.hero[0]}</span>
            <h1>
              {t.hero[1]
                .replace(". ", ".\n")
                .split("\n")
                .map((x, i) => (
                  <span key={x}>
                    {x}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h1>
            <p>{t.hero[2]}</p>
          </div>
          <div className="system-panel">
            <span>{t.ui[4]}</span>
            <strong>{products.length}</strong>
            <small>{siteText[locale].records}</small>
            <hr />
            <div>
              <i>8/8</i> · {siteText[locale].checked}
            </div>
          </div>
        </div>
        <SearchBar label={t.ui[18]} buttonLabel={siteText[locale].search} />
        <div className="quick-queries">
          <span>{t.ui[3]}:</span>
          {categories.slice(0, 5).map(([, , url], i) => (
            <a href={url} target="_blank" rel="noopener" key={url}>
              [{t.cats[i].toUpperCase()}]
            </a>
          ))}
        </div>
      </section>
      <section className="terminal-body">
        <aside className="filter-panel">
          <div className="filter-title">
            <span>{t.ui[6]}</span>
            <b>{t.ui[7]}</b>
          </div>
          <label>{t.ui[8]}</label>
          {categories.map(([, , url], i) => (
            <a href={url} target="_blank" rel="noopener" key={url}>
              <i className={i === 0 ? "checked" : ""} />
              {t.cats[i]}
              <span>{siteText[locale].open}</span>
            </a>
          ))}
          <label>{t.ui[9]}</label>
          <div className="price-range">
            <span>$0</span>
            <span>$80+</span>
          </div>
          <div className="range-line">
            <i />
          </div>
          <label>{t.ui[10]}</label>
          <a href="#results">
            <i className="checked" />
            {t.ui[11]}
            <span>{products.length}</span>
          </a>
          <a href="#results">
            <i />
            {t.ui[12]}
            <span>{products.length}</span>
          </a>
        </aside>
        <section className="results-panel" id="results">
          <div className="results-head">
            <div>
              <span>RESULT_SET</span>
              <b>
                {products.length} {t.ui[13]}
              </b>
            </div>
            <div>
              <button>{t.ui[14]} ↓</button>
              <button>GRID ▦</button>
            </div>
          </div>
          <div className="products-c">
            {products.map((p, i) => (
              <ProductCard
                mode="c"
                product={p}
                index={i}
                statusLabel={t.ui[11]}
                key={p.href}
              />
            ))}
          </div>
          <a className="terminal-more" href={href(locale, "products")}>
            {t.ui[0]} →
          </a>
        </section>
      </section>
      <section className="data-promise">
        <span>{t.ui[15]}</span>
        <div>
          {methodologyCopy[locale].map(([a, b], i) => (
            <article key={a}>
              <b>0{i + 1}</b>
              <h2>{a}</h2>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <HomeArticles locale={locale} />
      <HomeFaq locale={locale} />
    </>
  );
}

function HomeArticles({ locale }: { locale: Locale }) {
  const t = localeCopy[locale];
  return (
    <section className="home-library">
      <div className="home-module-head">
        <div>
          <span>/ SEO_ARTICLES</span>
          <h2>{t.pages.articles[0]}</h2>
          <p>{t.pages.articles[1]}</p>
        </div>
        <a href={href(locale, "articles")}>{t.labels[4]} →</a>
      </div>
      <div className="article-grid home-article-grid">
        {t.articles.map(([title, slug, summary], i) => (
          <a href={href(locale, `articles/${slug}`)} key={slug}>
            <span>0{i + 1} · FIELD NOTE</span>
            <h2>{title}</h2>
            <p>{summary}</p>
            <b>{t.ui[16]} →</b>
          </a>
        ))}
      </div>
    </section>
  );
}

function HomeFaq({ locale }: { locale: Locale }) {
  const t = localeCopy[locale];
  return (
    <section className="home-library home-faq-section">
      <div className="home-module-head">
        <div>
          <span>/ FAQ_INDEX</span>
          <h2>{t.pages.faq[0]}</h2>
          <p>{t.pages.faq[1]}</p>
        </div>
        <a href={href(locale, "faq")}>{t.labels[5]} →</a>
      </div>
      <div className="home-faq-grid">
        {t.faq.slice(0, 4).map(([q, a], i) => (
          <a href={href(locale, "faq")} key={q}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{q}</h3>
            <p>{a}</p>
            <b>FAQ →</b>
          </a>
        ))}
      </div>
    </section>
  );
}

function PageHero({ t, section }: { t: LocaleCopy; section: string }) {
  const p = t.pages[section] || t.pages.articles;
  return (
    <section className="terminal-page-hero">
      <span>/ {section.toUpperCase().replaceAll("-", "_")}</span>
      <h1>{p[0]}</h1>
      <p>{p[1]}</p>
    </section>
  );
}

function Article({ locale, slug }: { locale: Locale; slug: string }) {
  const t = localeCopy[locale],
    localized = t.articles.find((x) => x[1] === slug) || t.articles[0],
    article = getEnglishArticle(slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "en" ? article.title : localized[0],
    description: locale === "en" ? article.description : localized[2],
    dateModified: "2026-08-12",
    datePublished: "2026-08-12",
    inLanguage: locale,
    mainEntityOfPage: `https://allchinabuy.ro${href(locale, `articles/${slug}`)}`,
    author: {
      "@type": "Organization",
      name: "allchinabuy.ro Editorial Research",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="article-hero">
        <a href={href(locale, "articles")}>← {t.labels[4]}</a>
        <span>
          FIELD NOTE · {article.updated.toUpperCase()} ·{" "}
          {article.readTime.toUpperCase()}
        </span>
        <h1>{locale === "en" ? article.title : localized[0]}</h1>
        <p>{locale === "en" ? article.description : localized[2]}</p>
        <div className="article-keywords">
          <b>PRIMARY KEYWORD</b>
          <span>{article.primaryKeyword}</span>
          <b>SUPPORTING</b>
          <span>{article.secondaryKeywords.join(" · ")}</span>
        </div>
      </section>
      <article className="terminal-article">
        {article.intro.map((paragraph, i) => (
          <p
            className={i === 0 ? "article-intro" : "article-lede"}
            key={paragraph}
          >
            {paragraph}
          </p>
        ))}
        {article.sections.map((section, i) => (
          <section key={section.heading}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.checklist && (
                <ul className="article-checklist">
                  {section.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
        <div className="article-callout">
          <b>RESEARCH NOTE</b>
          <p>{article.sourceNote}</p>
          <p className="source-links">
            <span>AllChinaBuy freight calculator · checked 12 Aug 2026</span>
            <span>Official app description · checked 12 Aug 2026</span>
          </p>
        </div>
      </article>
    </>
  );
}

function Section({ locale, path }: { locale: Locale; path: string[] }) {
  const t = localeCopy[locale],
    section = path[0] || "products";
  if (section === "articles" && path[1])
    return <Article locale={locale} slug={path[1]} />;
  const faqSchema =
    section === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null;
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PageHero t={t} section={section} />
      <section className="terminal-page-content">
        {section === "products" && (
          <>
            <div className="page-toolbar">
              <span>
                {products.length} {t.ui[13]} · {siteText[locale].checked}
              </span>
              <SearchBar
                label={t.ui[18]}
                buttonLabel={siteText[locale].search}
              />
            </div>
            <div className="products-c page-products">
              {products.map((p, i) => (
                <ProductCard
                  mode="c"
                  product={p}
                  index={i}
                  statusLabel={t.ui[11]}
                  key={p.href}
                />
              ))}
            </div>
          </>
        )}
        {section === "categories" && (
          <div className="category-terminal-grid">
            {categories.map(([, , url], i) => (
              <a href={url} target="_blank" rel="noopener" key={url}>
                <span>0{i + 1}</span>
                <b>{t.cats[i]}</b>
                <small>{siteText[locale].open}</small>
                <i>{t.ui[17]} ↗</i>
              </a>
            ))}
          </div>
        )}
        {section === "qc-guide" && <Steps items={t.qc} />}{" "}
        {section === "shipping-guide" && (
          <>
            <Steps items={t.shipping} />
            <RegionalGuidance locale={locale} />
          </>
        )}{" "}
        {section === "articles" && (
          <div className="article-grid">
            {t.articles.map(([title, slug, summary], i) => (
              <a href={href(locale, `articles/${slug}`)} key={slug}>
                <span>0{i + 1} · FIELD NOTE</span>
                <h2>{title}</h2>
                <p>{summary}</p>
                <b>{t.ui[16]} →</b>
              </a>
            ))}
          </div>
        )}
        {section === "faq" && (
          <div className="faq-terminal">
            {t.faq.map(([q, a], i) => (
              <details open={i === 0} key={q}>
                <summary>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {q}
                  <b>+</b>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
function Steps({ items }: { items: [string, string][] }) {
  return (
    <div className="terminal-steps">
      {items.map(([h, p], i) => (
        <article key={h}>
          <span>0{i + 1}</span>
          <div>
            <h2>{h}</h2>
            <p>{p}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function RegionalGuidance({ locale }: { locale: Locale }) {
  return (
    <section className="regional-guidance" aria-label="Romania import guidance">
      <span>/ ROMANIA_IMPORT_NOTES</span>
      <div>
        {romaniaGuidance[locale].map(([heading, text, source, url], index) => (
          <article key={heading}>
            <b>0{index + 1}</b>
            <h2>{heading}</h2>
            <p>{text}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {source} ↗
            </a>
          </article>
        ))}
      </div>
      <p className="regional-note">
        Checked 12 August 2026 · Rules, rates, route availability and operator
        fees can change. Confirm current official information before parcel
        submission.
      </p>
    </section>
  );
}

export function TerminalPage({
  locale = "ro",
  path = [],
  showSwitcher = false,
}: {
  locale?: Locale;
  path?: string[];
  showSwitcher?: boolean;
}) {
  return (
    <main className="site concept-c" lang={locale}>
      {showSwitcher && <ConceptSwitcher active="C" />}
      <Header locale={locale} path={path} />
      <div className="independent-strip">{siteText[locale].independent}</div>
      {path.length ? (
        <Section locale={locale} path={path} />
      ) : (
        <Home locale={locale} />
      )}
      <SiteFooter locale={locale} />
    </main>
  );
}
export const getLocaleCopy = (locale: Locale) => localeCopy[locale];
