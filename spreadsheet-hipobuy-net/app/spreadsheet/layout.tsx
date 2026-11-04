import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hipobuy Finds: Product Links & Budget Filters",
  description: "Search Hipobuy product links by category and reference price. Compare budget finds under $30, check product details and plan the full cost.",
  alternates: { canonical: "/spreadsheet/" },
};

export default function SpreadsheetLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
