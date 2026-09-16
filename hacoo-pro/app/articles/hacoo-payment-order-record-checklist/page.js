import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";
const slug = "hacoo-payment-order-record-checklist";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
