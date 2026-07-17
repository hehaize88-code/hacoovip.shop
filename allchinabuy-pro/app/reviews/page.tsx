import type { Metadata } from "next";
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
      <h2>What “route checked” means</h2>
      <p>
        We open the destination, confirm that it resolves to the intended CNFansHP search or category,
        and note the date of that review. Search results and catalogue content can change afterward,
        so every discovery entry directs readers to verify the live page.
      </p>

      <h2>What we do not claim</h2>
      <p>
        We do not assign quality scores without test evidence. We do not invent purchases, customer
        quotations, ratings, prices, stock counters or authenticity conclusions. Original images on
        this site are generic editorial illustrations and are labelled as such.
      </p>

      <h2>How an entry is written</h2>
      <ol>
        <li>Choose a useful product type or shopping question.</li>
        <li>Confirm a relevant live category or keyword-search route.</li>
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
