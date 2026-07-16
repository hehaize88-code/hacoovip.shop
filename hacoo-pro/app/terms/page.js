import { TermsPage } from "@/components/LegalPages";
import { getLegalCopy } from "../legal-copy";
import { languageAlternates } from "../i18n";
import { createPageMetadata } from "../seo";

const page = getLegalCopy("en").terms;
export const metadata = createPageMetadata({ title: page.title, description: page.description, path: "/terms", alternates: languageAlternates("/terms", "en") });
export default function Terms() { return <TermsPage locale="en"/>; }
