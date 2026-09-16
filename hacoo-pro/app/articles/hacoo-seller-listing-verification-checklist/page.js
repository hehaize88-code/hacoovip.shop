import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";
const slug = "hacoo-seller-listing-verification-checklist";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
