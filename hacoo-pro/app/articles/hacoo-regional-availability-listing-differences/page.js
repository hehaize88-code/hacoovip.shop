import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";
const slug = "hacoo-regional-availability-listing-differences";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
