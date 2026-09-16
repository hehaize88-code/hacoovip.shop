import PriorityArticlePage, { buildPriorityMetadata } from "../PriorityArticlePage";
const slug = "hacoo-website-app-official-links";
export const metadata = buildPriorityMetadata(slug);
export default function Page() { return <PriorityArticlePage slug={slug}/>; }
