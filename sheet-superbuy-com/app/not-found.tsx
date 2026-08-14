import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, SiteFooter, SiteHeader } from "./components";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description: "The requested Sheet Superbuy route does not exist.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found shell">
        <p className="eyebrow plain">404 · route not found</p>
        <h1>404: Spreadsheet Link Not Found</h1>
        <p>The requested page does not exist. Return to the checked index or search the current product catalogue.</p>
        <div className="hero-actions"><Link href="/" className="button button-primary">Back to home <ArrowIcon /></Link><Link href="/finds/" className="button button-secondary">Browse checked finds</Link></div>
      </main>
      <SiteFooter />
    </>
  );
}
