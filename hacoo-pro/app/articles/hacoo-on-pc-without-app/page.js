import { ArticleEdition, editionMetadata } from "@/components/ArticleEdition";

const slug = "hacoo-on-pc-without-app";
export const metadata = editionMetadata("en", slug);
export default function Page() { return <ArticleEdition locale="en" slug={slug}/>; }
