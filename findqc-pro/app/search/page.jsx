import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata = {
  title: "Search",
  description: "Search mapped FindQC Pro products and categories.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="shell inner-page search-page" />}>
      <SearchResults />
    </Suspense>
  );
}
