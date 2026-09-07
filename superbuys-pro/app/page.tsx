import { HomePage } from "./site";
import { makeMetadata } from "./seo";

export const metadata=makeMetadata("","en","Superbuy Spreadsheet 2026: Checked Finds & QC Photos","Browse dated Superbuy product finds, direct category links, warehouse QC guidance, fee explanations and shipping-planning guides.");

export default function Page() {
  return <HomePage locale="en" />;
}
