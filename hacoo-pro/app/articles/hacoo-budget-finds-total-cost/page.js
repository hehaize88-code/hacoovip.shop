import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";

const slug = "hacoo-budget-finds-total-cost";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
