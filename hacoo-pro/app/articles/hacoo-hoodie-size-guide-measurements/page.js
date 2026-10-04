import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";

const slug = "hacoo-hoodie-size-guide-measurements";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
