import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("it", "home");
export default function Page() { return <SitePage lang="it" page="home" />; }
