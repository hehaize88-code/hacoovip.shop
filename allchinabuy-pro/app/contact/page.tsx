import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { EDITORIAL_REPORT_URL } from "@/lib/content";
import { buildPageMetadata, socialCard } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact & Corrections",
  description: "Contact boundaries for directory corrections and destination-platform order support.",
  path: "/contact",
  image: socialCard("contact", "AllChinaBuy Pro contact and corrections share card"),
});

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact boundaries"
      title="Send the right question to the right place."
      intro="This independent directory cannot see or change an order placed on another website."
    >
      <h2>Orders, payments and shipping</h2>
      <p>
        Contact the destination platform through the support channel shown in your account or on its
        official website. AllChinaBuy Pro has no access to account records, payments, warehouse images,
        parcels, returns or refunds.
      </p>

      <h2>Broken links and editorial corrections</h2>
      <p>
        Use the public editorial report form for a broken route, factual error or outdated destination.
        The form is hosted in this website&apos;s public GitHub repository, so a GitHub sign-in may be
        required and anything submitted there can be read publicly.
      </p>

      <p>
        <a
          className="button button--lime"
          href={EDITORIAL_REPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open editorial report form <span aria-hidden="true">↗</span>
        </a>
      </p>

      <div className="callout">
        <p>
          Include the AllChinaBuy Pro page address, the unexpected destination and the date you observed
          the issue. Do not submit passwords, payment details, identity documents or other private data.
        </p>
      </div>

      <h2>Brand or rights concerns</h2>
      <p>
        A rights notice should identify the relevant page, the protected work or mark, the basis of the
        concern and a method for verification. Use the same editorial report form, but keep the initial
        public report limited to non-confidential information.
      </p>
    </InfoPage>
  );
}
