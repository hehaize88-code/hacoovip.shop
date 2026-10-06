import { articleCatalog, articleSlugs, articleTools, relatedArticles, sourceNames, articleSources, type ArticleSlug } from "./article-catalog";

type Lang = "id" | "en" | "de" | "fr" | "es" | "it";
type PageName =
  | "home"
  | "hot-drops"
  | "categories"
  | "how-it-works"
  | "faq"
  | "articles"
  | "article";

export type { ArticleSlug, Lang, PageName };

const languages: { code: Lang; label: string; short: string }[] = [
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "it", label: "Italiano", short: "IT" },
];

export const isLang = (value: string): value is Lang =>
  languages.some((item) => item.code === value);
export const isPage = (
  value: string,
): value is Exclude<PageName, "home" | "article"> =>
  ["hot-drops", "categories", "how-it-works", "faq", "articles"].includes(
    value,
  );
export const isArticle = (value: string): value is ArticleSlug =>
  (articleSlugs as readonly string[]).includes(value);

const products = [
  {
    "id": "3418",
    "title": "NIKE P6000",
    "type": "Shoes · Sneakers",
    "price": "$278.00",
    "image": "https://cnfanshp.com/uploads/allimg/20260106/1-260106142P3A4.webp"
  },
  {
    "id": "295",
    "title": "Loro Piana Loafers",
    "type": "Shoes · Loafers",
    "price": "$390.00",
    "image": "https://cnfanshp.com/uploads/allimg/20251103/1-251103115Q5923.webp"
  },
  {
    "id": "5555",
    "title": "Boss Polo Shirt  Boss Shorts",
    "type": "Clothing · Polo & Shorts",
    "price": "$188.00",
    "image": "https://cnfanshp.com/uploads/allimg/20260317/1-26031G0301K51.webp"
  },
  {
    "id": "5978",
    "title": "Acne Studios 1996 Splatter Paint Graffiti Jeans",
    "type": "Pants · Jeans",
    "price": "$268.00",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G11524Y0.webp"
  },
  {
    "id": "5919",
    "title": "The North Face Nuptse Jacket",
    "type": "Jackets · Down",
    "price": "$299.00",
    "image": "https://cnfanshp.com/uploads/allimg/20260402/1-2604021143443I.webp"
  }
] as const;

const categories = [
  ["Shoes", "https://cnfanshp.com/shoes/", "Current finds"],
  ["Hoodies", "https://cnfanshp.com/hoodies-sweaters/", "New layers"],
  ["T-Shirts", "https://cnfanshp.com/t-shirts/", "Fresh tees"],
  ["Jackets", "https://cnfanshp.com/jackets/", "Outerwear"],
  ["Pants", "https://cnfanshp.com/pants-shorts/", "Daily edit"],
  ["Jerseys", "https://cnfanshp.com/Jersey/", "Match day"],
  ["Accessories", "https://cnfanshp.com/accessories/", "Small details"],
  ["Electronics", "https://cnfanshp.com/electronics/", "Useful tech"],
] as const;

type Copy = {
  nav: [string, string, string, string, string];
  browse: string;
  kicker: string;
  heroA: string;
  heroB: string;
  heroText: string;
  search: string;
  placeholder: string;
  catEyebrow: string;
  categories: string;
  dropsEyebrow: string;
  dropsTitle: string;
  dropsAccent: string;
  view: string;
  howTitle: string;
  steps: [string, string][];
  faqTitle: string;
  faqIntro: string;
  articleTitle: string;
  articleIntro: string;
  read: string;
  all: string;
  back: string;
  footer: string;
  est: string;
};

const copy: Record<Lang, Copy> = {
  id: {
    nav: ["Temuan baru", "Kategori", "Cara kerja", "FAQ", "Panduan"],
    browse: "LIHAT SEMUA",
    kicker: "SUPERBUY INDONESIA · PANDUAN 2026",
    heroA: "SUPERBUY INDONESIA.",
    heroB: "SPREADSHEET, QC & ONGKIR.",
    heroText:
      "Panduan cara belanja lewat Superbuy, tautan produk aktif, checklist foto QC, estimasi ongkir, pajak, dan pengiriman ke Indonesia.",
    search: "Cari",
    placeholder: "Cari sepatu, hoodie, jersey…",
    catEyebrow: "MULAI DARI KATEGORI ↓",
    categories: "Jelajahi semua kategori",
    dropsEyebrow: "TEMUAN TERBARU",
    dropsTitle: "PILIH PRODUK.",
    dropsAccent: "BUKA DETAILNYA.",
    view: "Lihat produk",
    howTitle: "CARI. PERIKSA. KIRIM.",
    steps: [
      [
        "Temukan listing aktif",
        "Cari dengan kata kunci atau buka kategori, lalu periksa halaman produk dan pilihan yang masih tersedia.",
      ],
      [
        "Catat opsi yang tepat",
        "Simpan warna, ukuran, jumlah, harga produk, dan catatan penjual sebelum membayar.",
      ],
      [
        "Pembelian oleh agen",
        "Superbuy membeli dari penjual pihak ketiga, kemudian penjual mengirim barang ke gudang yang dipilih.",
      ],
      [
        "Inspeksi dan foto QC",
        "Layanan saat ini mengiklankan inspeksi gudang serta foto QC gratis untuk pemeriksaan visual.",
      ],
      [
        "Simpan dan konsolidasikan",
        "Barang saat ini mendapat penyimpanan gratis 90 hari sehingga beberapa pesanan dapat diperiksa dan digabung secara terencana.",
      ],
      [
        "Susun paket",
        "Pilih barang yang memenuhi syarat, jalur pengiriman ke Indonesia, dan perlindungan kemasan yang benar-benar diperlukan.",
      ],
      [
        "Bayar estimasi",
        "Ongkir internasional dibayar dari data perkiraan, lalu disesuaikan dengan berat dan ukuran akhir dari penyedia logistik.",
      ],
      [
        "Lacak dan selesaikan masalah",
        "Pantau nomor paket dan gunakan layanan purnajual dengan bukti pesanan jika terjadi masalah yang terdokumentasi.",
      ],
    ],
    faqTitle: "PERTANYAAN PENTING, TERJAWAB.",
    faqIntro:
      "Catatan berbasis sumber mengenai layanan, biaya, QC, penyimpanan, pengiriman, serta batas panduan independen ini.",
    articleTitle: "PANDUAN YANG LAYAK DISIMPAN.",
    articleIntro:
      "Panduan untuk pembayaran, ukuran sepatu, QC, gudang, ongkir, pajak, dan pelacakan Superbuy dari sudut pembeli Indonesia.",
    read: "Baca panduan",
    all: "Lihat semua",
    back: "Kembali ke panduan",
    footer: "BUKAN PENJUAL · TITIK AWAL YANG LEBIH JELAS",
    est: "perkiraan",
  },
  en: {
    nav: ["Hot drops", "Categories", "How it works", "FAQ", "Guides"],
    browse: "BROWSE ALL",
    kicker: "SUPERBUY INDONESIA · 2026 GUIDE",
    heroA: "SUPERBUY INDONESIA.",
    heroB: "SHIPPING, QC & FINDS.",
    heroText:
      "Indonesia-focused guidance for live product finds, warehouse QC photos, parcel planning, shipping estimates and import costs.",
    search: "Search",
    placeholder: "Search shoes, hoodies, jerseys…",
    catEyebrow: "JUMP STRAIGHT IN ↓",
    categories: "Browse every category",
    dropsEyebrow: "HOT RIGHT NOW",
    dropsTitle: "PICK A FIND.",
    dropsAccent: "OPEN THE DETAILS.",
    view: "View item",
    howTitle: "FIND IT. CHECK IT. SHIP IT.",
    steps: [
      [
        "Find a live listing",
        "Search by keyword or open a category route, then verify the current product page and options.",
      ],
      [
        "Submit the exact option",
        "Record colour, size, quantity and seller notes before paying for the product and domestic delivery.",
      ],
      [
        "Agent purchase",
        "Superbuy buys from the third-party seller, who sends the item to the selected warehouse.",
      ],
      [
        "QC and photos",
        "The current service advertises warehouse inspection plus free QC photos for visible checks.",
      ],
      [
        "Store and consolidate",
        "Items currently receive 90 days of free storage, giving time to review and combine suitable orders.",
      ],
      [
        "Build the parcel",
        "Choose eligible items, a delivery line and only the packaging services the contents actually need.",
      ],
      [
        "Pay the estimate",
        "International freight is collected from estimated data, then reconciled against the logistics provider’s final bill.",
      ],
      [
        "Track and resolve",
        "Follow the parcel record and use after-sales support with the order or parcel number if a documented issue appears.",
      ],
    ],
    faqTitle: "QUESTIONS, ANSWERED.",
    faqIntro:
      "Fact-checked notes based on Superbuy’s current service, fee and forwarding guidance, plus clear limits for this independent index.",
    articleTitle: "GUIDES WORTH SAVING.",
    articleIntro:
      "Long-form, research-led reading for better product checks, clearer shipping budgets and fewer avoidable surprises.",
    read: "Read guide",
    all: "See all",
    back: "Back to guides",
    footer: "NOT A SELLER · JUST A BETTER PLACE TO START",
    est: "est.",
  },
  de: {
    nav: [
      "Neue Funde",
      "Kategorien",
      "So funktioniert’s",
      "FAQ",
      "Ratgeber",
    ],
    browse: "ALLES ANSEHEN",
    kicker: "SUPERBUY-TABELLE · NEU GEDACHT",
    heroA: "NICHT MEHR SUCHEN.",
    heroB: "BESSER FINDEN.",
    heroText:
      "Aktuelle Produktlinks. Klare Kategorien. Echte Angebotsfotos. Weniger Tabellenchaos.",
    search: "Suchen",
    placeholder: "Schuhe, Hoodies, Trikots suchen…",
    catEyebrow: "DIREKT EINSTEIGEN ↓",
    categories: "Alle Kategorien entdecken",
    dropsEyebrow: "JETZT BELIEBT",
    dropsTitle: "FUND AUSWÄHLEN.",
    dropsAccent: "DETAILS ÖFFNEN.",
    view: "Produkt ansehen",
    howTitle: "FINDEN. PRÜFEN. VERSENDEN.",
    steps: [
      [
        "Aktuelles Angebot finden",
        "Per Suchwort oder Kategorie starten und aktuelle Optionen prüfen.",
      ],
      [
        "Option genau angeben",
        "Farbe, Größe, Menge und Hinweise vor der Zahlung festhalten.",
      ],
      [
        "Einkauf durch Agent",
        "Superbuy kauft beim Drittanbieter, der ins Lager sendet.",
      ],
      [
        "QC und Fotos",
        "Die aktuelle Leistung nennt Prüfung und kostenlose QC-Fotos.",
      ],
      [
        "Lagern und bündeln",
        "Derzeit gelten 90 Tage kostenlose Lagerung zum Prüfen und Bündeln.",
      ],
      [
        "Paket erstellen",
        "Geeignete Artikel, Route und wirklich nötige Verpackung wählen.",
      ],
      [
        "Schätzung bezahlen",
        "Fracht wird geschätzt und später mit der finalen Logistikrechnung abgeglichen.",
      ],
      [
        "Verfolgen und klären",
        "Paket verfolgen und bei belegbaren Problemen den Kundendienst nutzen.",
      ],
    ],
    faqTitle: "FRAGEN, BEANTWORTET.",
    faqIntro:
      "Recherchierte Hinweise zu aktuellem Superbuy-Service, Gebühren, QC und Versand sowie die Grenzen dieses unabhängigen Index.",
    articleTitle: "RATGEBER ZUM MERKEN.",
    articleIntro:
      "Praxisnahe Langform-Ratgeber für bessere Produktprüfungen und Versandplanung.",
    read: "Ratgeber lesen",
    all: "Alle ansehen",
    back: "Zurück zu Ratgebern",
    footer: "KEIN VERKÄUFER · NUR DER BESSERE START",
    est: "ca.",
  },
  fr: {
    nav: ["Nouveautés", "Catégories", "Mode d’emploi", "FAQ", "Guides"],
    browse: "TOUT VOIR",
    kicker: "TABLEUR SUPERBUY · RÉINVENTÉ",
    heroA: "ARRÊTEZ DE DÉFILER.",
    heroB: "COMMENCEZ À TROUVER.",
    heroText:
      "Liens récents. Catégories claires. Photos réelles. Plus besoin de se perdre dans un tableur.",
    search: "Rechercher",
    placeholder: "Chaussures, sweats, maillots…",
    catEyebrow: "ACCÈS DIRECT ↓",
    categories: "Explorer les catégories",
    dropsEyebrow: "EN CE MOMENT",
    dropsTitle: "CHOISISSEZ.",
    dropsAccent: "OUVREZ LES DÉTAILS.",
    view: "Voir l’article",
    howTitle: "TROUVER. VÉRIFIER. EXPÉDIER.",
    steps: [
      [
        "Trouver l’annonce actuelle",
        "Rechercher ou choisir une catégorie puis vérifier les options.",
      ],
      [
        "Préciser la variante",
        "Noter couleur, taille, quantité et remarques avant paiement.",
      ],
      [
        "Achat par l’agent",
        "Superbuy achète au vendeur tiers, qui expédie à l’entrepôt.",
      ],
      [
        "QC et photos",
        "Le service actuel annonce une inspection et des photos QC gratuites.",
      ],
      [
        "Stocker et regrouper",
        "Les articles bénéficient actuellement de 90 jours de stockage gratuit.",
      ],
      [
        "Créer le colis",
        "Choisir articles, ligne admissible et protection réellement nécessaire.",
      ],
      [
        "Payer l’estimation",
        "Le fret estimé est ensuite ajusté selon la facture logistique finale.",
      ],
      [
        "Suivre et résoudre",
        "Suivre le colis et utiliser le service après-vente avec des preuves.",
      ],
    ],
    faqTitle: "VOS QUESTIONS.",
    faqIntro:
      "Des réponses documentées sur les services, frais, photos QC et expéditions Superbuy, avec les limites de cet index indépendant.",
    articleTitle: "GUIDES À CONSERVER.",
    articleIntro:
      "Des guides approfondis et documentés pour mieux vérifier et budgéter.",
    read: "Lire le guide",
    all: "Tout voir",
    back: "Retour aux guides",
    footer: "PAS UN VENDEUR · UN MEILLEUR POINT DE DÉPART",
    est: "estimé",
  },
  es: {
    nav: ["Novedades", "Categorías", "Cómo funciona", "FAQ", "Guías"],
    browse: "VER TODO",
    kicker: "HOJA SUPERBUY · REINVENTADA",
    heroA: "DEJA DE DESLIZAR.",
    heroB: "EMPIEZA A ENCONTRAR.",
    heroText:
      "Enlaces recientes. Categorías claras. Fotos reales. Sin el caos de una hoja de cálculo.",
    search: "Buscar",
    placeholder: "Buscar zapatillas, sudaderas, camisetas…",
    catEyebrow: "ENTRA DIRECTO ↓",
    categories: "Explora las categorías",
    dropsEyebrow: "AHORA MISMO",
    dropsTitle: "ELIGE UN HALLAZGO.",
    dropsAccent: "ABRE LOS DETALLES.",
    view: "Ver producto",
    howTitle: "ENCUENTRA. REVISA. ENVÍA.",
    steps: [
      [
        "Encuentra el anuncio actual",
        "Busca o abre una categoría y verifica las opciones vigentes.",
      ],
      [
        "Indica la variante",
        "Guarda color, talla, cantidad y notas antes de pagar.",
      ],
      [
        "Compra del agente",
        "Superbuy compra al vendedor, que envía al almacén.",
      ],
      [
        "QC y fotos",
        "El servicio actual anuncia inspección y fotos QC gratuitas.",
      ],
      [
        "Almacena y consolida",
        "Actualmente hay 90 días de almacenamiento gratuito.",
      ],
      [
        "Crea el paquete",
        "Elige artículos, ruta y solo la protección necesaria.",
      ],
      [
        "Paga la estimación",
        "El flete estimado se ajusta con la factura logística final.",
      ],
      [
        "Sigue y resuelve",
        "Rastrea el paquete y usa posventa con pruebas si hay un problema.",
      ],
    ],
    faqTitle: "PREGUNTAS RESUELTAS.",
    faqIntro:
      "Notas verificadas sobre servicios, tarifas, fotos QC y envíos de Superbuy, con los límites de este índice independiente.",
    articleTitle: "GUÍAS PARA GUARDAR.",
    articleIntro:
      "Guías extensas y documentadas para revisar productos y presupuestar mejor.",
    read: "Leer guía",
    all: "Ver todo",
    back: "Volver a las guías",
    footer: "NO SOMOS VENDEDORES · SOMOS UN MEJOR COMIENZO",
    est: "aprox.",
  },
  it: {
    nav: ["Novità", "Categorie", "Come funziona", "FAQ", "Guide"],
    browse: "VEDI TUTTO",
    kicker: "FOGLIO SUPERBUY · RIVISITATO",
    heroA: "SMETTI DI SCORRERE.",
    heroB: "INIZIA A TROVARE.",
    heroText:
      "Link recenti. Categorie chiare. Foto reali. Niente più caos da foglio di calcolo.",
    search: "Cerca",
    placeholder: "Cerca scarpe, felpe, maglie…",
    catEyebrow: "ENTRA SUBITO ↓",
    categories: "Esplora le categorie",
    dropsEyebrow: "ORA DI TENDENZA",
    dropsTitle: "SCEGLI UN PRODOTTO.",
    dropsAccent: "APRI I DETTAGLI.",
    view: "Vedi prodotto",
    howTitle: "TROVA. CONTROLLA. SPEDISCI.",
    steps: [
      [
        "Trova l’inserzione attuale",
        "Cerca o apri una categoria e verifica le opzioni correnti.",
      ],
      [
        "Indica la variante",
        "Salva colore, taglia, quantità e note prima del pagamento.",
      ],
      [
        "Acquisto dell’agente",
        "Superbuy acquista dal venditore, che invia al magazzino.",
      ],
      [
        "QC e foto",
        "Il servizio attuale indica ispezione e foto QC gratuite.",
      ],
      [
        "Stocca e consolida",
        "Attualmente sono previsti 90 giorni di stoccaggio gratuito.",
      ],
      [
        "Crea il pacco",
        "Scegli articoli, linea idonea e protezione davvero necessaria.",
      ],
      [
        "Paga la stima",
        "Il trasporto stimato viene conguagliato con il conto logistico finale.",
      ],
      [
        "Traccia e risolvi",
        "Segui il pacco e usa il post-vendita con prove in caso di problemi.",
      ],
    ],
    faqTitle: "DOMANDE, RISPOSTE.",
    faqIntro:
      "Note verificate su servizi, costi, foto QC e spedizione Superbuy, con i limiti di questo indice indipendente.",
    articleTitle: "GUIDE DA SALVARE.",
    articleIntro:
      "Guide approfondite e documentate per controlli e budget migliori.",
    read: "Leggi la guida",
    all: "Vedi tutto",
    back: "Torna alle guide",
    footer: "NON UN VENDITORE · UN PUNTO DI PARTENZA MIGLIORE",
    est: "stima",
  },
};

const faq: Record<Lang, [string, string][]> = {
  id: [
    [
      "Apa itu superbuys.id?",
      "Indeks penemuan produk dan panduan independen untuk pembeli Indonesia. Situs ini tidak menjual barang, menerima pembayaran, atau menangani pengiriman.",
    ],
    [
      "Ke mana tautan produk diarahkan?",
      "Kartu produk dan kategori membuka halaman terkait yang sudah diverifikasi di situs utama cnfanshp.com pada tab baru.",
    ],
    [
      "Apakah kolom pencarian memakai hasil produk nyata?",
      "Ya. Kata kunci dikirim ke rute pencarian situs utama menggunakan parameter keywords yang diperlukan.",
    ],
    [
      "Apakah harga USD merupakan harga akhir?",
      "Tidak. Nilai USD adalah perkiraan dari harga CNY yang terlihat saat verifikasi 13 Agustus 2026 dan dapat berubah karena opsi produk atau kurs.",
    ],
    [
      "Apa yang dapat dipastikan dari foto QC?",
      "Foto membantu memeriksa warna, label ukuran, bentuk, jumlah, dan cacat yang terlihat. Foto tidak dapat membuktikan bahan tersembunyi, keaslian, atau daya tahan jangka panjang.",
    ],
    [
      "Berapa foto QC gratis yang diiklankan Superbuy?",
      "Halaman layanan yang diperiksa pada Agustus 2026 menyebutkan foto QC gratis setelah inspeksi gudang. Foto detail terarah dan pemeriksaan tambahan merupakan layanan opsional.",
    ],
    [
      "Berapa lama penyimpanan gratis saat ini?",
      "Panduan biaya yang diperiksa pada Agustus 2026 menyebutkan 90 hari penyimpanan gratis. Setelah itu terdapat biaya harian dan batas normal 180 hari kecuali perpanjangan diatur lebih awal.",
    ],
    [
      "Mengapa biaya kirim internasional dapat berubah?",
      "Deposit dihitung dari data paket perkiraan. Berat dan dimensi aktual setelah pengemasan dipakai untuk rekonsiliasi biaya akhir oleh penyedia logistik.",
    ],
    [
      "Apakah pembelian standar dikenai biaya layanan?",
      "Panduan biaya yang diperiksa menyatakan pembelian standar dari Taobao, Tmall, JD, dan 1688 tidak dikenai biaya pembelian. Sumber barang bekas, platform yang tidak terdaftar, dan layanan khusus memiliki aturan berbeda.",
    ],
    [
      "Bisakah beberapa barang digabung dalam satu paket?",
      "Panduan yang diperiksa menyatakan barang gudang dapat dikonsolidasikan tanpa biaya konsolidasi, tetapi berat, volume, jenis barang, dan batas jalur tetap menentukan pilihan.",
    ],
    [
      "Apakah semua barang dapat diretur?",
      "Tidak. Hasilnya mengikuti kebijakan marketplace asal dan penjual. Barang bekas pada umumnya tidak memenuhi syarat retur atau penukaran.",
    ],
    [
      "Siapa yang menanggung bea masuk dan pajak Indonesia?",
      "Penerima bertanggung jawab atas bea masuk, PPN, atau pungutan tujuan yang berlaku. Periksa klasifikasi barang, nilai pabean, dan ketentuan Indonesia sebelum pengiriman.",
    ],
    [
      "Pilihan kemasan apa yang tersedia?",
      "Pilihan saat ini mencakup pelepasan kemasan, kemasan sederhana, bantalan gelembung, vakum, pelindung sudut, pelindung lembap, dan kotak yang lebih kuat. Ketersediaan serta biaya harus dicek saat mengirim paket.",
    ],
    [
      "Apakah ini situs resmi Superbuy?",
      "Tidak. Ini adalah panduan dan indeks penemuan produk independen, bukan properti resmi Superbuy.",
    ],
  ],
  en: [
    [
      "What is superbuys.id?",
      "An independent product-discovery index. It organizes product and category routes but does not sell, take payment or handle fulfilment.",
    ],
    [
      "Where do product links go?",
      "Product and category cards open the corresponding destination-shop page in a new tab.",
    ],
    [
      "Does the search box search real products?",
      "Yes. It sends your exact keyword through the main shop’s verified /search.html route using its required keywords parameter.",
    ],
    [
      "Are displayed prices final?",
      "No. USD figures are estimates based on listed prices and may change with product options or exchange rates.",
    ],
    [
      "What can QC photos confirm?",
      "They help check visible colour, size labels, shape and obvious defects. They cannot confirm hidden materials, authenticity or long-term durability.",
    ],
    [
      "How many free QC photos does Superbuy advertise?",
      "The current Superbuy homepage states that free QC photos are taken after warehouse inspection. Targeted detailed photos and other inspection services are optional extras.",
    ],
    [
      "How long is current free storage?",
      "The current fee guide states 90 days of free storage. It lists a daily fee after that period and a normal maximum of 180 days unless storage is extended in advance.",
    ],
    [
      "Why can international shipping change?",
      "The deposit uses estimated parcel data. Superbuy’s current fee FAQ says the logistics provider’s official bill determines the final cost, followed by reconciliation.",
    ],
    [
      "Does standard purchasing have a service fee?",
      "Superbuy’s current fee guide says standard purchasing is free for mainstream sources such as Taobao, Tmall, JD and 1688. Second-hand, unlisted and specialist services have different rules.",
    ],
    [
      "Can items be combined into one parcel?",
      "The current guide says multiple warehouse items can be consolidated into one parcel without a consolidation charge, although weight, volume and route limits still affect the result.",
    ],
    [
      "Are returns always available?",
      "No. The outcome depends on the source marketplace and seller policy. Superbuy warns that second-hand items are generally not eligible for return or exchange.",
    ],
    [
      "Who is responsible for customs tax?",
      "Superbuy’s current fee guide says destination-country customs duties or VAT are borne by the recipient. Users should follow local declaration and import rules.",
    ],
    [
      "What packaging choices are available?",
      "Current options include package removal, simple packaging, bubble cushioning, vacuum packaging, corner protection, moisture protection and stronger cases. Availability and prices should be checked at parcel submission.",
    ],
    [
      "Is this an official Superbuy website?",
      "No. This is an independent guide and discovery resource, not an official Superbuy property.",
    ],
  ],
  de: [
    [
      "Was ist superbuys.id?",
      "Ein unabhängiger Produktindex. Er ordnet Produkte und Kategorien, verkauft aber nichts und wickelt keine Zahlungen ab.",
    ],
    [
      "Wohin führen Produktlinks?",
      "Produkt- und Kategoriekarten öffnen die passende Seite des Zielshops in einem neuen Tab.",
    ],
    [
      "Sucht das Suchfeld echte Produkte?",
      "Ja. Der Begriff wird über den geprüften Suchpfad und den erforderlichen keywords-Parameter an den Hauptshop gesendet.",
    ],
    [
      "Sind die Preise endgültig?",
      "Nein. USD-Werte sind Schätzungen und können sich durch Optionen oder Wechselkurse ändern.",
    ],
    [
      "Was zeigen QC-Fotos?",
      "Sichtbare Farbe, Größenetikett, Form und offensichtliche Mängel. Verdeckte Materialien oder Haltbarkeit bestätigen sie nicht.",
    ],
    [
      "Wie viele kostenlose QC-Fotos werden genannt?",
      "Die aktuelle Superbuy-Seite nennt kostenlose QC-Fotos nach der Lagerprüfung. Gezielte Detailfotos sind Zusatzleistungen.",
    ],
    [
      "Wie lange ist Lagerung kostenlos?",
      "Der aktuelle Gebührenleitfaden nennt 90 Tage. Danach werden Tagesgebühren und normalerweise höchstens 180 Tage genannt, sofern nicht verlängert wird.",
    ],
    [
      "Warum ändern sich Versandkosten?",
      "Die Anzahlung basiert auf Schätzdaten; endgültig zählt laut aktuellem FAQ die offizielle Rechnung des Logistikdienstleisters.",
    ],
    [
      "Ist der Standard-Einkauf kostenlos?",
      "Für Taobao, Tmall, JD und 1688 nennt der aktuelle Leitfaden keine Einkaufsgebühr. Für Gebrauchtwaren und andere Quellen gelten andere Regeln.",
    ],
    [
      "Kann ich Artikel bündeln?",
      "Mehrere Lagerartikel können laut aktuellem Leitfaden ohne Bündelungsgebühr in ein Paket gelegt werden; Gewicht und Volumen bleiben relevant.",
    ],
    [
      "Sind Rückgaben immer möglich?",
      "Nein. Das hängt von Plattform und Verkäufer ab. Gebrauchte Artikel sind laut Superbuy normalerweise nicht rückgabe- oder umtauschfähig.",
    ],
    [
      "Wer trägt Zoll und VAT?",
      "Der Empfänger trägt laut aktuellem Gebührenleitfaden die Abgaben des Ziellands und muss lokale Regeln beachten.",
    ],
    [
      "Welche Verpackung gibt es?",
      "Unter anderem Paketentfernung, einfache Verpackung, Luftpolster, Vakuum, Kantenschutz und Feuchtigkeitsschutz. Bedingungen bei Versand prüfen.",
    ],
    [
      "Ist dies eine offizielle Superbuy-Seite?",
      "Nein. Dies ist ein unabhängiger Ratgeber und Produktindex.",
    ],
  ],
  fr: [
    [
      "Qu’est-ce que superbuys.id ?",
      "Un index indépendant de découverte. Il classe produits et catégories, sans vendre ni encaisser de paiement.",
    ],
    [
      "Où mènent les liens ?",
      "Les cartes ouvrent la page correspondante de la boutique de destination dans un nouvel onglet.",
    ],
    [
      "La recherche affiche-t-elle de vrais résultats ?",
      "Oui. Le mot-clé passe par la route /search.html vérifiée et le paramètre keywords de la boutique principale.",
    ],
    [
      "Les prix sont-ils définitifs ?",
      "Non. Les montants en USD sont estimatifs et peuvent varier selon les options et le change.",
    ],
    [
      "Que confirment les photos QC ?",
      "La couleur visible, l’étiquette de taille, la forme et les défauts évidents, pas les matières cachées ni la durabilité.",
    ],
    [
      "Combien de photos QC gratuites ?",
      "La page Superbuy actuelle annonce des photos QC gratuites après inspection. Les gros plans ciblés sont des services optionnels.",
    ],
    [
      "Combien de temps le stockage est-il gratuit ?",
      "Le guide tarifaire actuel indique 90 jours, puis des frais journaliers et normalement 180 jours maximum sans prolongation.",
    ],
    [
      "Pourquoi le transport peut-il varier ?",
      "L’acompte utilise des données estimées ; la facture officielle du prestataire détermine le montant final et sa régularisation.",
    ],
    [
      "L’achat standard a-t-il des frais ?",
      "Le guide actuel indique zéro frais d’achat standard pour Taobao, Tmall, JD et 1688. D’autres sources ont des règles différentes.",
    ],
    [
      "Peut-on regrouper des articles ?",
      "Le guide indique que plusieurs articles peuvent être consolidés sans frais de consolidation, mais poids et volume restent déterminants.",
    ],
    [
      "Les retours sont-ils toujours possibles ?",
      "Non. Ils dépendent du vendeur et de la plateforme ; les articles d’occasion ne sont généralement pas retournables.",
    ],
    [
      "Qui paie la douane et la TVA ?",
      "Le guide actuel indique que les droits ou la TVA du pays de destination sont à la charge du destinataire.",
    ],
    [
      "Quelles protections sont proposées ?",
      "Retrait d’emballage, emballage simple, bulles, vide, coins, protection contre l’humidité et autres options selon le colis.",
    ],
    [
      "Est-ce un site officiel Superbuy ?",
      "Non. C’est un guide et index indépendant.",
    ],
  ],
  es: [
    [
      "¿Qué es superbuys.id?",
      "Un índice independiente de productos. Organiza rutas y categorías, pero no vende ni procesa pagos.",
    ],
    [
      "¿Adónde llevan los enlaces?",
      "Las tarjetas abren la página correspondiente de la tienda de destino en una pestaña nueva.",
    ],
    [
      "¿La búsqueda muestra productos reales?",
      "Sí. Envía la palabra mediante la ruta /search.html verificada y el parámetro keywords de la tienda principal.",
    ],
    [
      "¿Los precios son finales?",
      "No. Los importes en USD son estimaciones y pueden variar por opciones o cambio de divisa.",
    ],
    [
      "¿Qué confirman las fotos QC?",
      "Color visible, etiqueta de talla, forma y defectos obvios; no materiales ocultos ni durabilidad.",
    ],
    [
      "¿Cuántas fotos QC gratuitas hay?",
      "La página actual de Superbuy anuncia fotos QC gratuitas tras la inspección. Los primeros planos son opcionales.",
    ],
    [
      "¿Cuánto dura el almacenamiento gratuito?",
      "La guía actual indica 90 días; después menciona una tarifa diaria y normalmente un máximo de 180 días sin ampliación.",
    ],
    [
      "¿Por qué cambia el envío internacional?",
      "El depósito usa datos estimados; la factura oficial del proveedor logístico determina el coste final y el ajuste.",
    ],
    [
      "¿La compra estándar tiene comisión?",
      "La guía actual indica comisión de compra estándar cero para Taobao, Tmall, JD y 1688. Otras fuentes tienen reglas distintas.",
    ],
    [
      "¿Se pueden consolidar artículos?",
      "La guía indica consolidación sin cargo, aunque peso, volumen y límites de ruta siguen afectando al coste.",
    ],
    [
      "¿Siempre se permiten devoluciones?",
      "No. Dependen del vendedor y la plataforma; los artículos de segunda mano generalmente no admiten devolución.",
    ],
    [
      "¿Quién paga aduanas e IVA?",
      "La guía actual indica que los impuestos del país de destino corresponden al destinatario.",
    ],
    [
      "¿Qué embalajes se ofrecen?",
      "Retirada de embalaje, embalaje simple, burbujas, vacío, protección de esquinas y humedad, entre otras opciones.",
    ],
    [
      "¿Es una web oficial de Superbuy?",
      "No. Es una guía e índice independiente.",
    ],
  ],
  it: [
    [
      "Cos’è superbuys.id?",
      "Un indice indipendente di prodotti. Organizza link e categorie, ma non vende e non gestisce pagamenti.",
    ],
    [
      "Dove portano i link?",
      "Le schede aprono la pagina corrispondente del negozio di destinazione in una nuova scheda.",
    ],
    [
      "La ricerca mostra prodotti reali?",
      "Sì. Invia la parola tramite il percorso /search.html verificato e il parametro keywords del negozio principale.",
    ],
    [
      "I prezzi sono finali?",
      "No. I valori in USD sono stime e possono cambiare per opzioni o tassi di cambio.",
    ],
    [
      "Cosa confermano le foto QC?",
      "Colore visibile, etichetta taglia, forma e difetti evidenti; non materiali nascosti o durata.",
    ],
    [
      "Quante foto QC gratuite?",
      "La pagina Superbuy attuale indica foto QC gratuite dopo l’ispezione. I dettagli mirati sono servizi opzionali.",
    ],
    [
      "Quanto dura lo stoccaggio gratuito?",
      "La guida attuale indica 90 giorni, poi una tariffa giornaliera e normalmente 180 giorni massimi senza estensione.",
    ],
    [
      "Perché la spedizione può cambiare?",
      "Il deposito usa dati stimati; il conto ufficiale del fornitore logistico determina costo finale e conguaglio.",
    ],
    [
      "L’acquisto standard ha commissioni?",
      "La guida attuale indica zero commissioni standard per Taobao, Tmall, JD e 1688. Altre fonti hanno regole diverse.",
    ],
    [
      "Si possono consolidare articoli?",
      "La guida indica consolidamento senza costo, ma peso, volume e limiti della rotta restano rilevanti.",
    ],
    [
      "I resi sono sempre disponibili?",
      "No. Dipendono dal venditore e dalla piattaforma; gli articoli usati generalmente non sono restituibili.",
    ],
    [
      "Chi paga dogana e IVA?",
      "La guida attuale indica che dazi o IVA del paese di destinazione spettano al destinatario.",
    ],
    [
      "Quali imballaggi sono disponibili?",
      "Rimozione scatole, imballaggio semplice, bolle, vuoto, protezione angoli e umidità, secondo il pacco.",
    ],
    [
      "È un sito ufficiale Superbuy?",
      "No. È una guida e un indice indipendente.",
    ],
  ],
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const destination = (id: string) =>
  `https://cnfanshp.com/AllProducts/${id}.html`;
const prefix = (lang: Lang) => (lang === "id" ? "" : `/${lang}`);
const local = (lang: Lang, path = "") => {
  const route = `${prefix(lang)}${path || "/"}`;
  return route.endsWith("/") ? route : `${route}/`;
};

const labels: Record<
  Lang,
  {
    newFinds: string;
    noTabs: string;
    stages: string;
    seo: string;
    article: string;
    process: string;
    qc: string;
    research: string;
    categoryNames: string[];
    categoryNotes: string[];
    productTypes: string[];
  }
> = {
  id: {
    newFinds: "TEMUAN BARU",
    noTabs: "TAK ADA TAB HILANG",
    stages: "04 TAHAP UTAMA",
    seo: "PANDUAN BELANJA",
    article: "PANDUAN",
    process: "ALUR PRODUK · 2026",
    qc: "QC ≠ AUTENTIKASI",
    research: "PANDUAN · SUMBER RESMI",
    categoryNames: [
      "Sepatu",
      "Hoodie",
      "Kaos",
      "Jaket",
      "Celana",
      "Jersey",
      "Aksesori",
      "Elektronik",
    ],
    categoryNotes: [
      "Temuan aktif",
      "Lapisan baru",
      "Kaos terbaru",
      "Pakaian luar",
      "Pilihan harian",
      "Hari pertandingan",
      "Detail kecil",
      "Teknologi berguna",
    ],
    productTypes: [
      "Sepatu · Sneakers",
      "Sepatu · Loafer",
      "Pakaian · Polo & Celana Pendek",
      "Celana · Jeans",
      "Jaket · Down",
    ],
  },
  en: {
    newFinds: "NEW FINDS",
    noTabs: "NO MORE LOST TABS",
    stages: "04 KEY STAGES",
    seo: "BUYING GUIDES",
    article: "GUIDE",
    process: "PRODUCT ROUTE · 2026",
    qc: "QC ≠ AUTHENTICATION",
    research: "GUIDES · OFFICIAL SOURCES",
    categoryNames: [
      "Shoes",
      "Hoodies",
      "T-Shirts",
      "Jackets",
      "Pants",
      "Jerseys",
      "Accessories",
      "Electronics",
    ],
    categoryNotes: [
      "Current finds",
      "New layers",
      "Fresh tees",
      "Outerwear",
      "Daily edit",
      "Match day",
      "Small details",
      "Useful tech",
    ],
    productTypes: products.map((p) => p.type),
  },
  de: {
    newFinds: "NEUE FUNDE",
    noTabs: "KEINE VERLORENEN TABS",
    stages: "04 HAUPTSCHRITTE",
    seo: "EINKAUFSRATGEBER",
    article: "RATGEBER",
    process: "PRODUKTWEG · 2026",
    qc: "QC ≠ ECHTHEITSPRÜFUNG",
    research: "RATGEBER · OFFIZIELLE QUELLEN",
    categoryNames: [
      "Schuhe",
      "Hoodies",
      "T-Shirts",
      "Jacken",
      "Hosen",
      "Trikots",
      "Accessoires",
      "Elektronik",
    ],
    categoryNotes: [
      "Aktuelle Funde",
      "Neue Lagen",
      "Neue Shirts",
      "Oberbekleidung",
      "Tägliche Auswahl",
      "Spieltag",
      "Kleine Details",
      "Nützliche Technik",
    ],
    productTypes: [
      "Schuhe · Sneaker",
      "Schuhe · Loafer",
      "T-Shirts · Polo",
      "Hosen · Jeans",
      "Jacken · Daune",
    ],
  },
  fr: {
    newFinds: "NOUVELLES TROUVAILLES",
    noTabs: "PLUS D’ONGLETS PERDUS",
    stages: "04 ÉTAPES CLÉS",
    seo: "GUIDES D’ACHAT",
    article: "GUIDE",
    process: "PARCOURS PRODUIT · 2026",
    qc: "QC ≠ AUTHENTIFICATION",
    research: "GUIDES · SOURCES OFFICIELLES",
    categoryNames: [
      "Chaussures",
      "Sweats",
      "T-shirts",
      "Vestes",
      "Pantalons",
      "Maillots",
      "Accessoires",
      "Électronique",
    ],
    categoryNotes: [
      "Sélection actuelle",
      "Nouvelles couches",
      "T-shirts récents",
      "Vêtements d’extérieur",
      "Sélection du jour",
      "Jour de match",
      "Petits détails",
      "Tech utile",
    ],
    productTypes: [
      "Chaussures · baskets",
      "Chaussures · mocassins",
      "Vêtements · polo et short",
      "Pantalons · jeans",
      "Vestes · duvet",
    ],
  },
  es: {
    newFinds: "NUEVOS HALLAZGOS",
    noTabs: "SIN PESTAÑAS PERDIDAS",
    stages: "04 ETAPAS CLAVE",
    seo: "GUÍAS DE COMPRA",
    article: "GUÍA",
    process: "RUTA DEL PRODUCTO · 2026",
    qc: "QC ≠ AUTENTICACIÓN",
    research: "GUÍAS · FUENTES OFICIALES",
    categoryNames: [
      "Zapatillas",
      "Sudaderas",
      "Camisetas",
      "Chaquetas",
      "Pantalones",
      "Camisetas deportivas",
      "Accesorios",
      "Electrónica",
    ],
    categoryNotes: [
      "Hallazgos actuales",
      "Nuevas capas",
      "Camisetas recientes",
      "Ropa exterior",
      "Selección diaria",
      "Día de partido",
      "Pequeños detalles",
      "Tecnología útil",
    ],
    productTypes: [
      "Calzado · zapatillas",
      "Calzado · mocasines",
      "Ropa · polo y pantalones cortos",
      "Pantalones · vaqueros",
      "Chaquetas · plumón",
    ],
  },
  it: {
    newFinds: "NUOVI PRODOTTI",
    noTabs: "NESSUNA SCHEDA PERSA",
    stages: "04 FASI CHIAVE",
    seo: "GUIDE ALL’ACQUISTO",
    article: "GUIDA",
    process: "PERCORSO PRODOTTO · 2026",
    qc: "QC ≠ AUTENTICAZIONE",
    research: "GUIDE · FONTI UFFICIALI",
    categoryNames: [
      "Scarpe",
      "Felpe",
      "T-shirt",
      "Giacche",
      "Pantaloni",
      "Maglie",
      "Accessori",
      "Elettronica",
    ],
    categoryNotes: [
      "Prodotti attuali",
      "Nuovi strati",
      "T-shirt recenti",
      "Capispalla",
      "Selezione quotidiana",
      "Giorno partita",
      "Piccoli dettagli",
      "Tecnologia utile",
    ],
    productTypes: [
      "Scarpe · sneakers",
      "Scarpe · mocassini",
      "Abbigliamento · polo e pantaloncini",
      "Pantaloni · jeans",
      "Giacche · piumino",
    ],
  },
};

function Brand({ lang }: { lang: Lang }) {
  return (
    <a className="brand" href={local(lang)} aria-label="Superbuy home">
      <img src="/superbuy-logo.png" alt="Superbuy" width="733" height="150" />
    </a>
  );
}

function Search({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <form
      className="pop-search"
      action="https://cnfanshp.com/search.html"
      method="get"
      {...ext}
    >
      <input type="hidden" name="channelid" value="2" />
      <label htmlFor="product-search">{t.search}</label>
      <span>⌕</span>
      <input
        id="product-search"
        name="keywords"
        placeholder={t.placeholder}
        required
      />
      <button type="submit">
        {t.search} <b>↗</b>
      </button>
    </form>
  );
}

function LanguagePicker({
  lang,
  page,
  article,
}: {
  lang: Lang;
  page: PageName;
  article?: ArticleSlug;
}) {
  const route =
    page === "home"
      ? ""
      : page === "article"
        ? `/articles/${article}`
        : `/${page}`;
  const choices = languages;
  return (
    <details className="language">
      <summary>
        {languages.find((x) => x.code === lang)?.short} <span>⌄</span>
      </summary>
      <div>
        {choices.map((item) => (
          <a
            className={item.code === lang ? "active" : ""}
            href={local(item.code, route)}
            hrefLang={item.code === "id" ? "id-ID" : item.code}
            key={item.code}
          >
            <b>{item.short}</b>
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}

function Header({
  lang,
  page,
  article,
}: {
  lang: Lang;
  page: PageName;
  article?: ArticleSlug;
}) {
  const t = copy[lang];
  const routes = [
    "/hot-drops",
    "/categories",
    "/how-it-works",
    "/faq",
    "/articles",
  ];
  return (
    <header className="site-header">
      <Brand lang={lang} />
      <nav>
        {t.nav.map((label, i) => (
          <a
            className={page === routes[i].slice(1) ? "active" : ""}
            href={local(lang, routes[i])}
            key={label}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <LanguagePicker lang={lang} page={page} article={article} />
        <a
          className="browse"
          href="https://cnfanshp.com/AllProducts/"
          {...ext}
        >
          {t.browse}
          <span>↗</span>
        </a>
      </div>
    </header>
  );
}

function ProductGrid({ lang, limit = 6 }: { lang: Lang; limit?: number }) {
  const t = copy[lang];
  return (
    <div className="product-grid">
      {products.slice(0, limit).map((p, i) => (
        <a href={destination(p.id)} key={p.id} {...ext}>
          <div>
            <img
              src={p.image}
              alt={p.title}
              width="750"
              height="750"
              loading="lazy"
            />
            <b>{String(i + 1).padStart(2, "0")}</b>
          </div>
          <span>{labels[lang].productTypes[i]}</span>
          <h3>{p.title}</h3>
          <p>
            {p.price} {t.est}
            <i>↗</i>
          </p>
        </a>
      ))}
    </div>
  );
}

function CategoryGrid({ lang }: { lang: Lang }) {
  return (
    <div className="category-grid">
      {categories.map((cat, i) => (
        <a href={cat[1]} className={`c${i + 1}`} key={cat[0]} {...ext}>
          <span>{labels[lang].categoryNames[i]}</span>
          <small>{labels[lang].categoryNotes[i]}</small>
          <b>↗</b>
        </a>
      ))}
    </div>
  );
}

function ArticleCards({ lang, limit }: { lang: Lang; limit?: number }) {
  const t = copy[lang];
  return (
    <div className="article-grid">
      {articleSlugs.slice(0, limit).map((slug, i) => {
        const article = articleCatalog[lang][slug];
        return (
          <a href={local(lang, `/articles/${slug}`)} key={slug}>
            <span>{String(i + 1).padStart(2, "0")} · {labels[lang].article}</span>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <b>{t.read} ↗</b>
          </a>
        );
      })}
    </div>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="site-footer">
      <Brand lang={lang} />
      <p>{t.footer}</p>
      <div>
        <a href={local(lang, "/faq")}>FAQ</a>
        <a href={local(lang, "/articles")}>{t.nav[4]}</a>
        <a href="https://cnfanshp.com/AllProducts/" {...ext}>
          {t.browse} ↗
        </a>
      </div>
    </footer>
  );
}

function Home({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://superbuys.id/#website",
                url: "https://superbuys.id/",
                name: "superbuys.id",
                inLanguage: lang === "id" ? "id-ID" : lang,
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://cnfanshp.com/search.html?keywords={search_term_string}&channelid=2",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://superbuys.id/#organization",
                name: "superbuys.id",
                url: "https://superbuys.id/",
                logo: "https://superbuys.id/superbuy-logo.png",
              },
            ],
          }),
        }}
      />
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">
            <span>SUPERBUY</span>
            {t.kicker.replace("SUPERBUY", "")}
          </div>
          <h1>
            {t.heroA}
            <em>{t.heroB}</em>
          </h1>
          <p>{t.heroText}</p>
          <Search lang={lang} />
        </div>
        <div className="collage">
          <div className="collage-circle" />
          <a
            className="shot shot-a"
            href={destination(products[0].id)}
            {...ext}
          >
            <img
              src={products[0].image}
              alt={products[0].title}
              width="750"
              height="750"
              loading="eager"
              fetchPriority="high"
            />
            <b>{products[0].price}</b>
          </a>
          <a
            className="shot shot-b"
            href={destination(products[4].id)}
            {...ext}
          >
            <img
              src={products[4].image}
              alt={products[4].title}
              width="750"
              height="750"
              loading="lazy"
            />
            <b>{products[4].price}</b>
          </a>
          <a
            className="shot shot-c"
            href={destination(products[3].id)}
            {...ext}
          >
            <img
              src={products[3].image}
              alt={products[3].title}
              width="750"
              height="750"
              loading="lazy"
            />
            <b>{products[3].price}</b>
          </a>
          <div className="burst">
            {labels[lang].newFinds}
            <br />
            <span>↗</span>
          </div>
          <div className="sticker">{labels[lang].noTabs}</div>
        </div>
      </section>
      <section className="section cats-preview">
        <div className="section-top">
          <div>
            <span>{t.catEyebrow}</span>
            <h2>{t.categories}</h2>
          </div>
          <a href={local(lang, "/categories")}>{t.all} ↗</a>
        </div>
        <CategoryGrid lang={lang} />
      </section>
      <section className="section drops-preview">
        <div className="section-top">
          <div>
            <span>{t.dropsEyebrow}</span>
            <h2>
              {t.dropsTitle}
              <em>{t.dropsAccent}</em>
            </h2>
          </div>
          <a href={local(lang, "/hot-drops")}>{t.all} ↗</a>
        </div>
        <ProductGrid lang={lang} />
      </section>
      <section className="how-band">
        <div>
          <span>{labels[lang].stages}</span>
          <h2>{t.howTitle}</h2>
          <a href={local(lang, "/how-it-works")}>{t.nav[2]} ↗</a>
        </div>
        <ol>
          {t.steps.slice(0, 4).map((step, i) => (
            <li key={step[0]}>
              <b>0{i + 1}</b>
              <span>
                <strong>{step[0]}</strong>
                {step[1]}
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className="section content-preview">
        <div className="section-top">
          <div>
            <span>FAQ</span>
            <h2>{t.faqTitle}</h2>
          </div>
          <a href={local(lang, "/faq")}>{t.all} ↗</a>
        </div>
        <div className="faq-mini">
          {faq[lang].slice(0, 4).map((item, i) => (
            <a href={local(lang, "/faq")} key={item[0]}>
              <b>0{i + 1}</b>
              <span>{item[0]}</span>
              <i>＋</i>
            </a>
          ))}
        </div>
      </section>
      <section className="section articles-preview">
        <div className="section-top">
          <div>
            <span>{labels[lang].seo}</span>
            <h2>{t.articleTitle}</h2>
          </div>
          <a href={local(lang, "/articles")}>{t.all} ↗</a>
        </div>
        <ArticleCards lang={lang} limit={4} />
      </section>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-hero">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

const articleUi: Record<
  Lang,
  {
    guide: string;
    updated: string;
    words: string;
    remember: string;
    factCheck: string;
    sources: string;
    sourceLabels: string[];
    recheck: string;
  }
> = {
  id: {
    guide: "PANDUAN SUPERBUY INDONESIA",
    updated: "DIPERBARUI SEPTEMBER 2026",
    words: "KATA",
    remember: "INGAT",
    factCheck: "PEMERIKSAAN FAKTA",
    sources: "Sumber primer yang diperiksa",
    sourceLabels: [
      "Struktur biaya resmi",
      "Panduan forwarding resmi",
      "Ringkasan layanan resmi",
      "Panduan barang kiriman Bea Cukai",
    ],
    recheck:
      "Aturan layanan, pengiriman, dan pungutan dapat berubah. Periksa kembali ketentuan resmi sebelum membayar.",
  },
  en: {
    guide: "SUPERBUY GUIDE",
    updated: "UPDATED AUGUST 2026",
    words: "WORDS",
    remember: "REMEMBER",
    factCheck: "FACT CHECK",
    sources: "Primary sources checked",
    sourceLabels: [
      "Official fee structure",
      "Official forwarding guide",
      "Official service overview",
      "Indonesian customs guidance",
    ],
    recheck:
      "Service rules, shipping and import charges can change. Recheck the official pages before paying.",
  },
  de: {
    guide: "SUPERBUY-RATGEBER",
    updated: "AKTUALISIERT AUGUST 2026",
    words: "WÖRTER",
    remember: "MERKEN",
    factCheck: "FAKTENCHECK",
    sources: "Geprüfte Primärquellen",
    sourceLabels: [
      "Offizielle Gebührenstruktur",
      "Offizieller Weiterleitungsleitfaden",
      "Offizielle Leistungsübersicht",
      "Indonesische Zollhinweise",
    ],
    recheck:
      "Leistungsregeln, Versand und Einfuhrabgaben können sich ändern. Prüfen Sie die offiziellen Seiten vor der Zahlung erneut.",
  },
  fr: {
    guide: "GUIDE SUPERBUY",
    updated: "MIS À JOUR EN AOÛT 2026",
    words: "MOTS",
    remember: "À RETENIR",
    factCheck: "VÉRIFICATION",
    sources: "Sources primaires vérifiées",
    sourceLabels: [
      "Structure tarifaire officielle",
      "Guide officiel de réexpédition",
      "Présentation officielle du service",
      "Conseils douaniers indonésiens",
    ],
    recheck:
      "Les règles, l’expédition et les taxes peuvent changer. Vérifiez les pages officielles avant de payer.",
  },
  es: {
    guide: "GUÍA SUPERBUY",
    updated: "ACTUALIZADA EN AGOSTO DE 2026",
    words: "PALABRAS",
    remember: "RECUERDA",
    factCheck: "VERIFICACIÓN",
    sources: "Fuentes primarias verificadas",
    sourceLabels: [
      "Estructura oficial de tarifas",
      "Guía oficial de reenvío",
      "Descripción oficial del servicio",
      "Guía aduanera de Indonesia",
    ],
    recheck:
      "Las reglas, los envíos y los impuestos pueden cambiar. Vuelve a comprobar las páginas oficiales antes de pagar.",
  },
  it: {
    guide: "GUIDA SUPERBUY",
    updated: "AGGIORNATA AD AGOSTO 2026",
    words: "PAROLE",
    remember: "DA RICORDARE",
    factCheck: "VERIFICA DEI FATTI",
    sources: "Fonti primarie verificate",
    sourceLabels: [
      "Struttura tariffaria ufficiale",
      "Guida ufficiale all'inoltro",
      "Panoramica ufficiale del servizio",
      "Guida doganale indonesiana",
    ],
    recheck:
      "Regole, spedizioni e imposte possono cambiare. Ricontrolla le pagine ufficiali prima di pagare.",
  },
};

function SourcePanel({ lang, slug }: { lang: Lang; slug?: ArticleSlug }) {
  const ui = articleUi[lang];
  return (
    <section className="source-panel">
      <div>
        <b>{ui.factCheck}</b>
        <strong>{ui.sources}</strong>
      </div>
      <ul>
        {(slug ? articleSources[slug] : [0, 1, 2, 4]).map((i) => (
          <li key={i}>
            <span>{sourceNames[lang][i]}</span>
          </li>
        ))}
      </ul>
      <p>{articleTools[lang].sources}: <time dateTime="2026-10-06">{new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date("2026-10-06"))}</time>. {ui.recheck}</p>
    </section>
  );
}

function InnerPage({
  lang,
  page,
}: {
  lang: Lang;
  page: Exclude<PageName, "home" | "article">;
}) {
  const t = copy[lang];
  if (page === "hot-drops") {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.dropsTitle,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: destination(p.id),
        name: p.title,
      })),
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHero
          eyebrow={t.dropsEyebrow}
          title={`${t.dropsTitle} ${t.dropsAccent}`}
          text={t.heroText}
        />
        <section className="section inner-section">
          <ProductGrid lang={lang} />
        </section>
      </>
    );
  }
  if (page === "categories") {
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t.categories,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: categories.map((cat, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: cat[1],
          name: labels[lang].categoryNames[i],
        })),
      },
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHero
          eyebrow={t.catEyebrow}
          title={t.categories}
          text={t.heroText}
        />
        <section className="section inner-section">
          <CategoryGrid lang={lang} />
          <div className="inner-search">
            <Search lang={lang} />
          </div>
        </section>
      </>
    );
  }
  if (page === "how-it-works")
    return (
      <>
        <PageHero
          eyebrow={labels[lang].process}
          title={t.howTitle}
          text={t.heroText}
        />
        <section className="process-page">
          {t.steps.map((step, i) => (
            <article key={step[0]}>
              <b>0{i + 1}</b>
              <div>
                <h2>{step[0]}</h2>
                <p>{step[1]}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="notice">
          <b>{labels[lang].qc}</b>
          <p>{faq[lang][4][1]}</p>
        </section>
        <SourcePanel lang={lang} />
      </>
    );
  if (page === "faq") {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq[lang].map((item) => ({
        "@type": "Question",
        name: item[0],
        acceptedAnswer: { "@type": "Answer", text: item[1] },
      })),
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <PageHero
          eyebrow={`FAQ · ${String(faq[lang].length).padStart(2, "0")}`}
          title={t.faqTitle}
          text={t.faqIntro}
        />
        <section className="faq-page">
          {faq[lang].map((item, i) => (
            <details key={item[0]}>
              <summary>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{item[0]}</span>
                <i>＋</i>
              </summary>
              <p>{item[1]}</p>
            </details>
          ))}
        </section>
        <SourcePanel lang={lang} />
      </>
    );
  }
  return (
    <>
      <PageHero
        eyebrow={labels[lang].research}
        title={t.articleTitle}
        text={t.articleIntro}
      />
      <section className="section inner-section">
        <ArticleCards lang={lang} />
      </section>
    </>
  );
}

function ArticlePage({ lang, slug }: { lang: Lang; slug: ArticleSlug }) {
  const t = copy[lang];
  const ui = articleUi[lang];
  const long = articleCatalog[lang][slug];
  const tools = articleTools[lang];
  const headline = long.title;
  const description = long.description;
  const wordCount = long.sections
    .flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])])
    .join(" ")
    .trim()
    .split(/\s+/).length;
  const articleUrl = `https://superbuys.id${local(lang, `/articles/${slug}`)}`;
  const guideUrl = `https://superbuys.id${local(lang, "/articles")}`;
  const publishedAt = long.publishedAt ?? "2026-08-12";
  const modifiedAt = long.modifiedAt ?? "2026-08-13";
  const updatedLabel = `${tools.updated} ${new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(modifiedAt))}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline,
        description,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        wordCount,
        inLanguage: lang === "id" ? "id-ID" : lang,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        image: { "@type": "ImageObject", url: "https://superbuys.id/superbuy-logo.png" },
        author: {
          "@type": "Organization",
          name: "superbuys.id",
          url: "https://superbuys.id/",
        },
        publisher: {
          "@type": "Organization",
          name: "superbuys.id",
          url: "https://superbuys.id/",
          logo: {
            "@type": "ImageObject",
            url: "https://superbuys.id/superbuy-logo.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "superbuys.id",
            item: "https://superbuys.id/",
          },
          { "@type": "ListItem", position: 2, name: t.nav[4], item: guideUrl },
          {
            "@type": "ListItem",
            position: 3,
            name: headline,
            item: articleUrl,
          },
        ],
      },
    ],
  };
  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a href={local(lang, "/articles")}>← {t.back}</a>
      <span>
        {ui.guide} · {updatedLabel} · {wordCount.toLocaleString(lang)}{" "}
        {ui.words}
      </span>
      <h1>{headline}</h1>
      <p className="article-deck">{description}</p>
      <nav className="article-toc" aria-label={tools.toc}>
        <strong>{tools.toc}</strong>
        <ol>{long.sections.map((section, i) => <li key={i}><a href={`#section-${i + 1}`}>{section.heading}</a></li>)}</ol>
      </nav>
      <div className="article-catalog-cta">
        <a href={slug === "superbuy-shoe-size-qc-guide" ? "https://cnfanshp.com/shoes/" : "https://cnfanshp.com/AllProducts/"} data-article-catalog={slug} {...ext}>{tools.browse} ↗</a>
        <small>{tools.shopNote}</small>
      </div>
      <div className="article-body long-form">
        {long.sections.map((section, i) => (
          <section key={section.heading} id={`section-${i + 1}`} data-article-end={i === long.sections.length - 1 ? slug : undefined}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
      <aside>
        <strong>{ui.remember}</strong>
        <p>{faq[lang][4][1]}</p>
      </aside>
      <section className="related-guides">
        <h2>{tools.related}</h2>
        <ul>{relatedArticles[slug].map((related) => <li key={related}><a href={local(lang, `/articles/${related}`)}>{articleCatalog[lang][related].title} →</a></li>)}</ul>
        <a className="article-bottom-cta" href={slug === "superbuy-shoe-size-qc-guide" ? "https://cnfanshp.com/shoes/" : "https://cnfanshp.com/AllProducts/"} data-article-catalog={slug} {...ext}>{tools.browse} ↗</a>
      </section>
      <SourcePanel lang={lang} slug={slug} />
    </article>
  );
}

export function SitePage({
  lang,
  page,
  article,
}: {
  lang: Lang;
  page: PageName;
  article?: ArticleSlug;
}) {
  return (
    <div className="site" id="top" lang={lang}>
      <Header lang={lang} page={page} article={article} />
      <main>
        {page === "home" ? (
          <Home lang={lang} />
        ) : page === "article" && article ? (
          <ArticlePage lang={lang} slug={article} />
        ) : (
          <InnerPage
            lang={lang}
            page={page as Exclude<PageName, "home" | "article">}
          />
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
}

