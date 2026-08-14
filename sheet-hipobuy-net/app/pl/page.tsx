import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("pl", "home");
export default function Page() { return <SitePage lang="pl" page="home" />; }
