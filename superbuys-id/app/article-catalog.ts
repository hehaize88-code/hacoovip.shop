import type { LongArticle } from "./article-content";
import en from "./content/en.json";
import id from "./content/id.json";
import de from "./content/de.json";
import fr from "./content/fr.json";
import es from "./content/es.json";
import it from "./content/it.json";

export const articleSlugs = [
  "superbuy-payment-fees-indonesia",
  "superbuy-shoe-size-qc-guide",
  "superbuy-warehouse-consolidation-guide",
  "superbuy-tracking-indonesia",
  "cara-belanja-di-superbuy",
  "shipping-cost-guide",
  "pajak-bea-cukai-superbuy-indonesia",
  "superbuy-review-indonesia",
  "spreadsheet-guide",
  "qc-photo-checklist",
] as const;

export type ArticleSlug = (typeof articleSlugs)[number];
export type ArticleLanguage = "id" | "en" | "de" | "fr" | "es" | "it";
export const articleCatalog: Record<ArticleLanguage, Record<string, LongArticle>> = { id, en, de, fr, es, it };

export const relatedArticles: Record<ArticleSlug, ArticleSlug[]> = {
  "superbuy-payment-fees-indonesia": ["shipping-cost-guide", "pajak-bea-cukai-superbuy-indonesia", "cara-belanja-di-superbuy"],
  "superbuy-shoe-size-qc-guide": ["qc-photo-checklist", "spreadsheet-guide", "superbuy-warehouse-consolidation-guide"],
  "superbuy-warehouse-consolidation-guide": ["shipping-cost-guide", "qc-photo-checklist", "superbuy-tracking-indonesia"],
  "superbuy-tracking-indonesia": ["pajak-bea-cukai-superbuy-indonesia", "superbuy-warehouse-consolidation-guide", "shipping-cost-guide"],
  "cara-belanja-di-superbuy": ["superbuy-payment-fees-indonesia", "qc-photo-checklist", "superbuy-tracking-indonesia"],
  "shipping-cost-guide": ["superbuy-warehouse-consolidation-guide", "superbuy-payment-fees-indonesia", "pajak-bea-cukai-superbuy-indonesia"],
  "pajak-bea-cukai-superbuy-indonesia": ["superbuy-payment-fees-indonesia", "shipping-cost-guide", "superbuy-tracking-indonesia"],
  "superbuy-review-indonesia": ["cara-belanja-di-superbuy", "superbuy-payment-fees-indonesia", "qc-photo-checklist"],
  "spreadsheet-guide": ["superbuy-shoe-size-qc-guide", "cara-belanja-di-superbuy", "superbuy-payment-fees-indonesia"],
  "qc-photo-checklist": ["superbuy-shoe-size-qc-guide", "superbuy-warehouse-consolidation-guide", "spreadsheet-guide"],
};

export const articleTools = {
  id: { toc: "Isi panduan", related: "Panduan terkait", browse: "Bandingkan listing produk", shopNote: "Katalog cnfanshp.com terpisah dari akun Superbuy. Periksa varian dan harga terkini sebelum memesan.", updated: "Diperbarui", sources: "Sumber diperiksa" },
  en: { toc: "In this guide", related: "Related guides", browse: "Compare product listings", shopNote: "The cnfanshp.com catalog is separate from your Superbuy account. Check current variants and prices before ordering.", updated: "Updated", sources: "Sources checked" },
  de: { toc: "In diesem Ratgeber", related: "Passende Ratgeber", browse: "Produktangebote vergleichen", shopNote: "Der Katalog auf cnfanshp.com ist von Ihrem Superbuy-Konto getrennt. Prüfen Sie Varianten und aktuelle Preise vor der Bestellung.", updated: "Aktualisiert", sources: "Quellen geprüft" },
  fr: { toc: "Dans ce guide", related: "Guides associés", browse: "Comparer les annonces", shopNote: "Le catalogue cnfanshp.com est distinct de votre compte Superbuy. Vérifiez les variantes et les prix actuels avant de commander.", updated: "Mis à jour", sources: "Sources vérifiées" },
  es: { toc: "En esta guía", related: "Guías relacionadas", browse: "Comparar productos", shopNote: "El catálogo de cnfanshp.com es independiente de tu cuenta Superbuy. Revisa las variantes y los precios actuales antes de pedir.", updated: "Actualizado", sources: "Fuentes consultadas" },
  it: { toc: "In questa guida", related: "Guide correlate", browse: "Confronta gli annunci", shopNote: "Il catalogo cnfanshp.com è separato dal tuo account Superbuy. Controlla varianti e prezzi attuali prima di ordinare.", updated: "Aggiornato", sources: "Fonti consultate" },
};

export const sourceNames = {
  id: ["Superbuy: struktur biaya", "Superbuy: pusat bantuan", "Superbuy: kalkulator pengiriman", "Superbuy: pelacakan paket", "Bea Cukai: Barang Kiriman dan FAQ", "Superbuy: panduan forwarding", "Superbuy: ringkasan layanan", "Superbuy: layanan 1688", "Superbuy: panduan agen belanja"],
  en: ["Superbuy: fee structure", "Superbuy: Help Center", "Superbuy: shipping calculator", "Superbuy: parcel tracking", "Bea Cukai: parcel imports and FAQ", "Superbuy: forwarding guide", "Superbuy: service overview", "Superbuy: 1688 service", "Superbuy: shopping agent guide"],
  de: ["Superbuy: Gebührenstruktur", "Superbuy: Hilfecenter", "Superbuy: Versandkostenrechner", "Superbuy: Paketverfolgung", "Bea Cukai: Paketeinfuhr und FAQ", "Superbuy: Weiterleitungsleitfaden", "Superbuy: Leistungsübersicht", "Superbuy: 1688-Service", "Superbuy: Einkaufsagent-Leitfaden"],
  fr: ["Superbuy : structure tarifaire", "Superbuy : centre d’aide", "Superbuy : calculateur de livraison", "Superbuy : suivi des colis", "Bea Cukai : importation de colis et FAQ", "Superbuy : guide de réexpédition", "Superbuy : présentation des services", "Superbuy : service 1688", "Superbuy : guide d’achat assisté"],
  es: ["Superbuy: estructura de tarifas", "Superbuy: centro de ayuda", "Superbuy: calculadora de envíos", "Superbuy: seguimiento de paquetes", "Bea Cukai: importación de paquetes y FAQ", "Superbuy: guía de reenvío", "Superbuy: resumen de servicios", "Superbuy: servicio 1688", "Superbuy: guía del agente de compras"],
  it: ["Superbuy: struttura delle tariffe", "Superbuy: centro assistenza", "Superbuy: calcolatore di spedizione", "Superbuy: tracciamento pacchi", "Bea Cukai: importazione di pacchi e FAQ", "Superbuy: guida all’inoltro", "Superbuy: panoramica dei servizi", "Superbuy: servizio 1688", "Superbuy: guida all’agente d’acquisto"],
};

export const articleSources: Record<ArticleSlug, number[]> = {
  "superbuy-payment-fees-indonesia": [0, 1],
  "superbuy-shoe-size-qc-guide": [0, 8],
  "superbuy-warehouse-consolidation-guide": [0, 2],
  "superbuy-tracking-indonesia": [3, 1, 4],
  "cara-belanja-di-superbuy": [0, 8, 4],
  "shipping-cost-guide": [0, 2, 5],
  "pajak-bea-cukai-superbuy-indonesia": [4, 0],
  "superbuy-review-indonesia": [0, 6, 4, 8],
  "spreadsheet-guide": [0, 6, 8],
  "qc-photo-checklist": [0, 6, 5, 7, 8],
};
