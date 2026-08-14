import SitePage from "./site-page";
import { pageMetadata } from "./seo";

export const metadata = pageMetadata("en", "home");

export default function Home() {
  return <SitePage lang="en" page="home" />;
}
