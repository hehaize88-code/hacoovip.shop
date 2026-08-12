import type { Metadata } from "next";
import { TerminalPage } from "./terminal";

export const metadata: Metadata = {
  title: "ACBuy Finds Database — AllChinaBuy Spreadsheet & QC Guides",
  description:
    "Search curated product finds and open independent AllChinaBuy spreadsheet, QC photo, shipping and FAQ guides.",
  robots: { index: false, follow: false },
};

export default function ConceptC() {
  return <TerminalPage />;
}
