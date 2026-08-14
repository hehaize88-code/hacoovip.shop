import { SiteShell } from "../../site-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USFans Shoes Listing Checklist: Size, Variant & Evidence",
  description: "Verify a USFans shoes listing by checking link identity, exact variant, size evidence, pair details, seller claims and shipping risk before ordering.",
};

export default function ShoesListingPage() {
  return <SiteShell page="article" article="usfans-shoes-listing-checklist" />;
}
