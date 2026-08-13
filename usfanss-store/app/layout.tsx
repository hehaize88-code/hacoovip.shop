import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "USFans Product Discovery Atlas", description: "Independent product discovery, QC and shipping guide.", robots: { index: false, follow: false }, other: { "codex-preview": "development" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
