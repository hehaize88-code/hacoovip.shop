import type { Metadata } from "next";
import { SiteRouter } from "../components/site";
import { homeMetadata } from "../lib/seo";

export const metadata: Metadata = homeMetadata("en");

export default function HomePage() {
  return <SiteRouter segments={[]} />;
}
