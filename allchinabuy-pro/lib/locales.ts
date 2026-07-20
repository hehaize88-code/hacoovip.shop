export const supportedLocales = ["fr", "de", "it", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

type ChromeContent = {
  skipToContent: string;
  homeLabel: string;
  tagline: string;
  primaryNavigation: string;
  chooseLanguage: string;
  openMenu: string;
  languageLabel: string;
  nav: {
    finds: string;
    shoes: string;
    clothing: string;
    accessories: string;
    guides: string;
    faq: string;
  };
  footer: {
    description: string;
    browse: string;
    allFinds: string;
    learn: string;
    spreadsheet: string;
    reviewMethod: string;
    about: string;
    important: string;
    disclaimer: string;
    privacy: string;
    terms: string;
    contact: string;
    legal: string;
  };
};

type LocaleContent = {
  language: string;
  label: string;
  headline: string;
  subcopy: string;
  placeholder: string;
  search: string;
  searchFormLabel: string;
  searchInputLabel: string;
  guide: string;
  categories: string;
  browseHeading: string;
  note: string;
  categoryLabels: Record<string, string>;
  chrome: ChromeContent;
};

export const defaultCategoryLabels: Record<string, string> = {
  shoes: "Shoes",
  clothing: "Clothing",
  jackets: "Jackets",
  "pants-shorts": "Pants & shorts",
  headwear: "Headwear",
  accessories: "Accessories",
};

export const defaultChromeContent: ChromeContent = {
  skipToContent: "Skip to content",
  homeLabel: "AllChinaBuy Pro home",
  tagline: "Independent China shopping directory",
  primaryNavigation: "Primary navigation",
  chooseLanguage: "Choose language",
  openMenu: "Open menu",
  languageLabel: "LANG",
  nav: {
    finds: "Finds",
    shoes: "Shoes",
    clothing: "Clothing",
    accessories: "Accessories",
    guides: "Guides",
    faq: "FAQ",
  },
  footer: {
    description: "Clearer product discovery, link routes and practical research notes for international shoppers.",
    browse: "Browse",
    allFinds: "All finds",
    learn: "Learn",
    spreadsheet: "Spreadsheet alternative",
    reviewMethod: "Review method",
    about: "About",
    important: "Important",
    disclaimer: "Disclaimer",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    legal: "Independent directory. No products are sold or shipped here.",
  },
};

export const localeContent: Record<SupportedLocale, LocaleContent> = {
  fr: {
    language: "fr-FR",
    label: "FR",
    headline: "Trouvez plus vite de meilleurs liens d’achat en Chine.",
    subcopy:
      "Sélections de produits, vérification des liens et guides pratiques pour les acheteurs internationaux.",
    placeholder: "Rechercher des chaussures, des vêtements ou un produit",
    search: "Rechercher",
    searchFormLabel: "Rechercher dans le catalogue CNFansHP",
    searchInputLabel: "Rechercher des produits",
    guide: "Comment ça marche",
    categories: "Catégories principales",
    browseHeading: "Parcourez des catégories de produits claires.",
    note: "Guide indépendant — nous ne vendons et n’expédions aucun produit.",
    categoryLabels: {
      shoes: "Chaussures",
      clothing: "Vêtements",
      jackets: "Vestes",
      "pants-shorts": "Pantalons et shorts",
      headwear: "Couvre-chefs",
      accessories: "Accessoires",
    },
    chrome: {
      skipToContent: "Aller au contenu",
      homeLabel: "Accueil AllChinaBuy Pro",
      tagline: "Annuaire indépendant pour acheter en Chine",
      primaryNavigation: "Navigation principale",
      chooseLanguage: "Choisir la langue",
      openMenu: "Ouvrir le menu",
      languageLabel: "LANGUE",
      nav: {
        finds: "Sélections",
        shoes: "Chaussures",
        clothing: "Vêtements",
        accessories: "Accessoires",
        guides: "Guides",
        faq: "FAQ",
      },
      footer: {
        description:
          "Une sélection de produits, des liens vérifiés et des conseils pratiques pour les acheteurs internationaux.",
        browse: "Explorer",
        allFinds: "Toutes les sélections",
        learn: "S’informer",
        spreadsheet: "Alternative au tableur",
        reviewMethod: "Méthode de vérification",
        about: "À propos",
        important: "À savoir",
        disclaimer: "Avertissement",
        privacy: "Confidentialité",
        terms: "Conditions",
        contact: "Contact",
        legal: "Annuaire indépendant. Aucun produit n’est vendu ni expédié ici.",
      },
    },
  },
  de: {
    language: "de-DE",
    label: "DE",
    headline: "Bessere China-Shopping-Links. Schneller gefunden.",
    subcopy:
      "Kuratierte Produktideen, Link-Prüfungen und praktische Einkaufsleitfäden für internationale Käufer.",
    placeholder: "Schuhe, Kleidung oder ein Produkt suchen",
    search: "Suchen",
    searchFormLabel: "Den CNFansHP-Katalog durchsuchen",
    searchInputLabel: "Produkte suchen",
    guide: "So funktioniert es",
    categories: "Beliebte Kategorien",
    browseHeading: "Klare Produktkategorien durchsuchen.",
    note: "Unabhängiger Ratgeber — wir verkaufen und versenden keine Produkte.",
    categoryLabels: {
      shoes: "Schuhe",
      clothing: "Kleidung",
      jackets: "Jacken",
      "pants-shorts": "Hosen & Shorts",
      headwear: "Kopfbedeckungen",
      accessories: "Accessoires",
    },
    chrome: {
      skipToContent: "Zum Inhalt springen",
      homeLabel: "AllChinaBuy Pro Startseite",
      tagline: "Unabhängiges Verzeichnis für China-Einkäufe",
      primaryNavigation: "Hauptnavigation",
      chooseLanguage: "Sprache wählen",
      openMenu: "Menü öffnen",
      languageLabel: "SPRACHE",
      nav: {
        finds: "Funde",
        shoes: "Schuhe",
        clothing: "Kleidung",
        accessories: "Accessoires",
        guides: "Ratgeber",
        faq: "FAQ",
      },
      footer: {
        description: "Klarere Produktsuche, geprüfte Links und praktische Hinweise für internationale Käufer.",
        browse: "Entdecken",
        allFinds: "Alle Funde",
        learn: "Informieren",
        spreadsheet: "Tabellen-Alternative",
        reviewMethod: "Prüfmethode",
        about: "Über uns",
        important: "Wichtig",
        disclaimer: "Hinweis",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
        contact: "Kontakt",
        legal: "Unabhängiges Verzeichnis. Hier werden keine Produkte verkauft oder versendet.",
      },
    },
  },
  it: {
    language: "it-IT",
    label: "IT",
    headline: "Trova link migliori per acquistare dalla Cina. Più velocemente.",
    subcopy:
      "Prodotti selezionati, controllo dei link e guide pratiche per chi acquista dall’estero.",
    placeholder: "Cerca scarpe, abbigliamento o un prodotto",
    search: "Cerca",
    searchFormLabel: "Cerca nel catalogo CNFansHP",
    searchInputLabel: "Cerca prodotti",
    guide: "Come funziona",
    categories: "Categorie principali",
    browseHeading: "Esplora categorie di prodotti chiare.",
    note: "Guida indipendente — non vendiamo né spediamo prodotti.",
    categoryLabels: {
      shoes: "Scarpe",
      clothing: "Abbigliamento",
      jackets: "Giacche",
      "pants-shorts": "Pantaloni e shorts",
      headwear: "Copricapi",
      accessories: "Accessori",
    },
    chrome: {
      skipToContent: "Vai al contenuto",
      homeLabel: "Home di AllChinaBuy Pro",
      tagline: "Directory indipendente per acquisti dalla Cina",
      primaryNavigation: "Navigazione principale",
      chooseLanguage: "Scegli la lingua",
      openMenu: "Apri il menu",
      languageLabel: "LINGUA",
      nav: {
        finds: "Prodotti",
        shoes: "Scarpe",
        clothing: "Abbigliamento",
        accessories: "Accessori",
        guides: "Guide",
        faq: "FAQ",
      },
      footer: {
        description: "Ricerca prodotti più chiara, link verificati e note pratiche per chi acquista dall’estero.",
        browse: "Esplora",
        allFinds: "Tutti i prodotti",
        learn: "Informazioni",
        spreadsheet: "Alternativa al foglio di calcolo",
        reviewMethod: "Metodo di verifica",
        about: "Chi siamo",
        important: "Importante",
        disclaimer: "Avvertenze",
        privacy: "Privacy",
        terms: "Termini",
        contact: "Contatti",
        legal: "Directory indipendente. Qui non vendiamo né spediamo prodotti.",
      },
    },
  },
  es: {
    language: "es-ES",
    label: "ES",
    headline: "Encuentra mejores enlaces de compra en China. Más rápido.",
    subcopy:
      "Productos seleccionados, revisión de enlaces y guías prácticas para compradores internacionales.",
    placeholder: "Busca calzado, ropa o un producto",
    search: "Buscar",
    searchFormLabel: "Buscar en el catálogo de CNFansHP",
    searchInputLabel: "Buscar productos",
    guide: "Cómo funciona",
    categories: "Categorías principales",
    browseHeading: "Explora categorías de productos claras.",
    note: "Guía independiente: no vendemos ni enviamos productos.",
    categoryLabels: {
      shoes: "Calzado",
      clothing: "Ropa",
      jackets: "Chaquetas",
      "pants-shorts": "Pantalones y shorts",
      headwear: "Sombreros y gorras",
      accessories: "Accesorios",
    },
    chrome: {
      skipToContent: "Saltar al contenido",
      homeLabel: "Inicio de AllChinaBuy Pro",
      tagline: "Directorio independiente de compras en China",
      primaryNavigation: "Navegación principal",
      chooseLanguage: "Elegir idioma",
      openMenu: "Abrir menú",
      languageLabel: "IDIOMA",
      nav: {
        finds: "Hallazgos",
        shoes: "Calzado",
        clothing: "Ropa",
        accessories: "Accesorios",
        guides: "Guías",
        faq: "FAQ",
      },
      footer: {
        description: "Búsqueda de productos más clara, enlaces revisados y notas prácticas para compradores internacionales.",
        browse: "Explorar",
        allFinds: "Todos los hallazgos",
        learn: "Aprender",
        spreadsheet: "Alternativa a la hoja de cálculo",
        reviewMethod: "Método de revisión",
        about: "Acerca de",
        important: "Importante",
        disclaimer: "Aviso legal",
        privacy: "Privacidad",
        terms: "Términos",
        contact: "Contacto",
        legal: "Directorio independiente. Aquí no se venden ni envían productos.",
      },
    },
  },
};

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

export function localeFromPathname(pathname: string | null): SupportedLocale | undefined {
  const firstSegment = pathname?.split("/").filter(Boolean)[0];
  return firstSegment && isSupportedLocale(firstSegment) ? firstSegment : undefined;
}
