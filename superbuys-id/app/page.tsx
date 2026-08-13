import type { Metadata } from "next";
import { SitePage } from "./site-page";

export const metadata: Metadata = {
  title: "Superbuy Indonesia 2026: Produk, Foto QC & Panduan Pengiriman",
  description: "Panduan Superbuy Indonesia untuk menemukan produk aktif, memeriksa foto QC, memahami biaya, dan merencanakan pengiriman paket ke Indonesia.",
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
    title: "Superbuy Indonesia 2026: Produk, Foto QC & Panduan Pengiriman",
    description: "Temukan produk, cek foto QC, dan rencanakan pengiriman Superbuy ke Indonesia.",
    siteName: "superbuys.id",
    locale: "id_ID",
  },
};

export default function Home() {
  return <SitePage lang="id" page="home" />;
}
