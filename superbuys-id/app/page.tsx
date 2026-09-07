import type { Metadata } from "next";
import { SitePage } from "./site-page";

export const metadata: Metadata = {
  title: "Superbuy Indonesia 2026: Spreadsheet, QC & Panduan Ongkir",
  description:
    "Temukan spreadsheet Superbuy, panduan foto QC, estimasi ongkir, pajak, dan cara kirim paket ke Indonesia. Cek produk aktif sebelum membeli.",
  alternates: {
    canonical: "https://superbuys.id/",
    languages: {
      "id-ID": "https://superbuys.id/",
      en: "https://superbuys.id/en/",
      "de-DE": "https://superbuys.id/de/",
      "fr-FR": "https://superbuys.id/fr/",
      "es-ES": "https://superbuys.id/es/",
      "it-IT": "https://superbuys.id/it/",
      "x-default": "https://superbuys.id/",
    },
  },
  openGraph: {
    url: "https://superbuys.id/",
    title: "Superbuy Indonesia 2026: Spreadsheet, QC & Panduan Ongkir",
    description:
      "Temukan spreadsheet Superbuy, cek foto QC, hitung ongkir dan pahami pajak pengiriman ke Indonesia.",
    siteName: "superbuys.id",
    locale: "id_ID",
  },
};

export default function Home() {
  return <SitePage lang="id" page="home" />;
}
