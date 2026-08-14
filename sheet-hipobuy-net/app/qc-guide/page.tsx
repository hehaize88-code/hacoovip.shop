import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("en", "qc");
export default function Page() { return <SitePage lang="en" page="qc" />; }
