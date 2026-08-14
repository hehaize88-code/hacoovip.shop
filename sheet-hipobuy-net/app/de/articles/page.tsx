import SitePage from "../../site-page";
import { pageMetadata } from "../../seo";
export const metadata = pageMetadata("de", "articles");
export default function Page() { return <SitePage lang="de" page="articles" />; }
