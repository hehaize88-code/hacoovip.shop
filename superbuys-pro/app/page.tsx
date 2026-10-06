import { HomePage } from "./site";
import { makeMetadata } from "./seo";

export const metadata=makeMetadata("","en","Superbuy Spreadsheet 2026: Shoes, Clothing & QC Guides","Explore 33 Superbuy product finds and 11 practical guides covering shoes, clothing, jerseys, QC photos, warehouse checks and shipping costs.");

export default function Page() {
  return <HomePage locale="en" />;
}
