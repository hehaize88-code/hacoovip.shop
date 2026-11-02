import { ArticleEdition, editionMetadata } from "@/components/ArticleEdition";

const slug = "hacoo-jacket-size-guide";
export const metadata = editionMetadata("en", slug);
export default function Page() { return <ArticleEdition locale="en" slug={slug}/>; }
