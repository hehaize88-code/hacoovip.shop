import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Link Review Method",
  description: "How AllChinaBuy Pro checks destination routes and writes independent shopping research entries without inventing ratings.",
  alternates: { canonical: `${SITE_URL}/reviews` },
};

export default function ReviewsPage() {
  return (
    <InfoPage
      eyebrow="Editorial method"
      title="Reviewed links, clearly limited claims."
      intro="A route check can confirm where a link goes. It cannot prove product quality, authenticity, stock or a future delivery outcome."
    >
      <div className="callout">
        <p>
          Looking for practical platform answers? Read the <Link href="/faq">source-linked AllChinaBuy FAQ</Link>.
        </p>
      </div>

      <h2>What “route checked” means</h2>
      <p>
        For a product entry, we match the public source title, first image and numeric item ID to the exact
        CNFansHP product page. Category and search routes are checked separately against the same main-site
        catalogue. Destination content can change afterward,
        so every entry still asks readers to verify the live page.
      </p>

      <h2>What we do not claim</h2>
      <p>
        We do not assign quality scores without test evidence. We do not invent purchases, customer
        quotations, ratings, prices, stock counters or authenticity conclusions. Product cards use
        source-listing images for identification; original category and editorial artwork remains
        clearly separate from live catalogue content.
      </p>

      <h2>How an entry is written</h2>
      <ol>
        <li>Choose a useful product type or shopping question.</li>
        <li>Match the source title, first image and numeric item ID.</li>
        <li>Locate the exact matching CNFansHP product page and verify its item ID.</li>
        <li>Write specific checks a shopper can perform on the destination page.</li>
        <li>State the review date and the limits of the information.</li>
        <li>Update or remove routes that no longer match their stated destination.</li>
      </ol>

      <div className="callout"><p>Editorial usefulness comes before volume. A smaller explained index is more trustworthy than thousands of copied rows with no source context.</p></div>

      <h2>Corrections</h2>
      <p>
        Broken routes and factual errors should be corrected promptly. The public reporting channel
        will be listed on the contact page before this inspection build is released.
      </p>
    </InfoPage>
  );
}
