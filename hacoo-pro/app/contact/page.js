import { ContactPage } from "@/components/LegalPages";
import { getLegalCopy } from "../legal-copy";
import { languageAlternates } from "../i18n";
import { createPageMetadata } from "../seo";

const page = getLegalCopy("en").contact;
export const metadata = createPageMetadata({ title: page.title, description: page.description, path: "/contact", alternates: languageAlternates("/contact", "en") });
export default function Contact() { return <ContactPage locale="en"/>; }
