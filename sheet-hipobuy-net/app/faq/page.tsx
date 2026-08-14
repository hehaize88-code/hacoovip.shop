import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("en", "faq");
export default function Page() { return <SitePage lang="en" page="faq" />; }
