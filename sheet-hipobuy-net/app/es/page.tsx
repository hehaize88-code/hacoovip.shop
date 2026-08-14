import SitePage from "../site-page";
import { pageMetadata } from "../seo";
export const metadata = pageMetadata("es", "home");
export default function Page() { return <SitePage lang="es" page="home" />; }
