import { HomePage } from "./site";
import { makeMetadata } from "./seo";

export const metadata=makeMetadata("","en","Superbuy Spreadsheet 2026: Finds, Products & QC Photos","Browse the updated Superbuy spreadsheet with unique product finds, direct product links, category routes, QC guidance and independent SEO guides.");

export default function Page() {
  return <HomePage locale="en" />;
}
