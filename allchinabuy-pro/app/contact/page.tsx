import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & Corrections",
  description: "Contact boundaries for directory corrections and destination-platform order support.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

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
        A monitored editorial reporting address will be added here before the site is publicly released.
        This inspection build intentionally does not display an unverified mailbox or a form that cannot
        actually deliver a message.
      </p>

      <div className="callout"><p>When reporting a route later, include the AllChinaBuy Pro page address, the unexpected destination and the date you observed the issue. Do not include passwords, payment details or identity documents.</p></div>

      <h2>Brand or rights concerns</h2>
      <p>
        A rights notice should identify the relevant page, the protected work or mark, the basis of the
        concern and a method for verification. The same public editorial channel will handle those notices.
      </p>
    </InfoPage>
  );
}
