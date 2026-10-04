import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";

const slug = "hacoo-spreadsheet-compare-product-links";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
