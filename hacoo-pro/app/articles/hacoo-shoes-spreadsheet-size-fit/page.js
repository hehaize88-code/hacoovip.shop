import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";

const slug = "hacoo-shoes-spreadsheet-size-fit";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
