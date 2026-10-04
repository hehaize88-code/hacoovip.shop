import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";

const slug = "hacoo-spreadsheet-men-clothing-finds";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
