import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Hipobuy Finds by Category, Price & Product Link",
  description: "Filter 60 checked product rows by category, compare dated USD reference prices and open each exact product link.",
  alternates: { canonical: "/spreadsheet/" },
};

export default function SpreadsheetLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
