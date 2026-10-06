import type { Metadata } from "next";
import type { Locale } from "./content";

export const SITE_URL = "https://superbuys.store";
export const REVIEW_DATE = "2026-10-06";

export function localizedPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  const localized = locale === "en" ? clean || "/" : `/${locale}${clean}`;
  return localized === "/" ? localized : `${localized.replace(/\/$/, "")}/`;
}

export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: `${SITE_URL}${localizedPath(locale, path)}`,
    languages: {
      en: `${SITE_URL}${localizedPath("en", path)}`,
      "fr-FR": `${SITE_URL}${localizedPath("fr", path)}`,
      "de-DE": `${SITE_URL}${localizedPath("de", path)}`,
      "x-default": `${SITE_URL}${localizedPath("en", path)}`,
    },
  };
}

const home = {
  en: {
    title: "Superbuy Spreadsheet & Finds | QC, Fees and Shipping Guides",
    description: "Explore Superbuy spreadsheet finds in 10 categories. Check product options, QC photos, shipping costs, tracking, returns and warehouse storage before ordering.",
  },
  fr: {
    title: "Superbuy Spreadsheet : trouvailles, frais et livraison",
    description: "Explorez les trouvailles Superbuy dans 10 catégories. Guides pratiques sur les photos QC, les frais, le suivi, les retours et le stockage en entrepôt.",
  },
  de: {
    title: "Superbuy Spreadsheet: Funde, Gebühren und Versand",
    description: "Entdecke Superbuy-Funde in 10 Kategorien. Ratgeber zu QC-Fotos, Versandkosten, Sendungsverfolgung, Rücksendungen und Lagerung helfen bei der Bestellung.",
  },
};

export function homeMetadata(locale: Locale): Metadata {
  const data = home[locale];
  return {
    title: { absolute: data.title },
    description: data.description,
    alternates: pageAlternates(locale, "/"),
    openGraph: { type: "website", ...data, url: `${SITE_URL}${localizedPath(locale, "/")}`, siteName: "Superbuy Product Index" },
    twitter: { card: "summary", ...data },
  };
}

export const relatedSlugs: Record<string, string[]> = {
  "superbuy-domestic-tracking-guide": ["superbuy-seller-not-shipped-delay-record", "superbuy-warehouse-arrival-checklist", "superbuy-warehouse-storage-guide"],
  "superbuy-returns-refunds-guide": ["superbuy-qc-photos-guide", "superbuy-seller-not-shipped-delay-record", "superbuy-fees-total-cost-guide"],
  "superbuy-fees-total-cost-guide": ["superbuy-shipping-cost-guide", "superbuy-packaging-guide", "superbuy-warehouse-storage-guide"],
  "superbuy-warehouse-storage-guide": ["superbuy-domestic-tracking-guide", "superbuy-returns-refunds-guide", "superbuy-shipping-cost-guide"],
  "product-listing-checklist": ["superbuy-order-remarks-writing-guide", "superbuy-fees-total-cost-guide", "superbuy-qc-photos-guide"],
  "superbuy-qc-photos-guide": ["superbuy-returns-refunds-guide", "superbuy-warehouse-arrival-checklist", "superbuy-packaging-guide"],
  "superbuy-shipping-cost-guide": ["superbuy-fees-total-cost-guide", "superbuy-packaging-guide", "superbuy-warehouse-storage-guide"],
  "superbuy-warehouse-arrival-checklist": ["superbuy-domestic-tracking-guide", "superbuy-qc-photos-guide", "superbuy-returns-refunds-guide"],
  "superbuy-order-remarks-writing-guide": ["product-listing-checklist", "superbuy-domestic-tracking-guide", "superbuy-seller-not-shipped-delay-record"],
  "superbuy-seller-not-shipped-delay-record": ["superbuy-domestic-tracking-guide", "superbuy-returns-refunds-guide", "superbuy-warehouse-storage-guide"],
  "superbuy-packaging-guide": ["superbuy-shipping-cost-guide", "superbuy-fees-total-cost-guide", "superbuy-qc-photos-guide"],
};
