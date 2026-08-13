import type { Metadata } from "next";
import { SiteRouter } from "../components/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://superbuys.store/",
    languages: {
      en: "https://superbuys.store/",
      "fr-FR": "https://superbuys.store/fr/",
      "de-DE": "https://superbuys.store/de/",
      "x-default": "https://superbuys.store/",
    },
  },
};

export default function HomePage() {
  return <SiteRouter segments={[]} />;
}
