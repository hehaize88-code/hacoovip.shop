export const supportedLocales = ["fr", "de", "it", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const localeContent: Record<
  SupportedLocale,
  {
    language: string;
    label: string;
    headline: string;
    subcopy: string;
    placeholder: string;
    search: string;
    guide: string;
    categories: string;
    note: string;
  }
> = {
  fr: {
    language: "fr-FR",
    label: "FR",
    headline: "Trouvez plus vite de meilleurs liens d’achat en Chine.",
    subcopy:
      "Sélections de produits, vérification des liens et guides pratiques pour les acheteurs internationaux.",
    placeholder: "Rechercher chaussures, vêtements ou un produit",
    search: "Rechercher",
    guide: "Comment ça marche",
    categories: "Catégories principales",
    note: "Guide indépendant — nous ne vendons et n’expédions aucun produit.",
  },
  de: {
    language: "de-DE",
    label: "DE",
    headline: "Bessere China-Shopping-Links. Schneller gefunden.",
    subcopy:
      "Kuratierte Produktideen, Link-Prüfungen und praktische Einkaufsleitfäden für internationale Käufer.",
    placeholder: "Schuhe, Kleidung oder ein Produkt suchen",
    search: "Suchen",
    guide: "So funktioniert es",
    categories: "Beliebte Kategorien",
    note: "Unabhängiger Ratgeber — wir verkaufen und versenden keine Produkte.",
  },
  it: {
    language: "it-IT",
    label: "IT",
    headline: "Trova link migliori per acquistare dalla Cina. Più velocemente.",
    subcopy:
      "Prodotti selezionati, controllo dei link e guide pratiche per chi acquista dall’estero.",
    placeholder: "Cerca scarpe, abbigliamento o un prodotto",
    search: "Cerca",
    guide: "Come funziona",
    categories: "Categorie principali",
    note: "Guida indipendente — non vendiamo né spediamo prodotti.",
  },
  es: {
    language: "es-ES",
    label: "ES",
    headline: "Encuentra mejores enlaces de compra en China. Más rápido.",
    subcopy:
      "Productos seleccionados, revisión de enlaces y guías prácticas para compradores internacionales.",
    placeholder: "Busca calzado, ropa o un producto",
    search: "Buscar",
    guide: "Cómo funciona",
    categories: "Categorías principales",
    note: "Guía independiente: no vendemos ni enviamos productos.",
  },
};

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.includes(value as SupportedLocale);
}

