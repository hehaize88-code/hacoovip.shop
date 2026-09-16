import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";
const slug = "hacoo-customer-reviews-evidence-guide";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
