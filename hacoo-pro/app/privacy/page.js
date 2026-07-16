import { PrivacyPage } from "@/components/LegalPages";
import { getLegalCopy } from "../legal-copy";
import { languageAlternates } from "../i18n";
import { createPageMetadata } from "../seo";

const page = getLegalCopy("en").privacy;
export const metadata = createPageMetadata({ title: page.title, description: page.description, path: "/privacy", alternates: languageAlternates("/privacy", "en") });
export default function Privacy() { return <PrivacyPage locale="en"/>; }
