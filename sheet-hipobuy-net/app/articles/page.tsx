import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("en", "articles");
export default function Page() { return <SitePage lang="en" page="articles" />; }
