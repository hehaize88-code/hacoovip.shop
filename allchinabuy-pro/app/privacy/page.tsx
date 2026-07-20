import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { buildPageMetadata, socialCard } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Notice",
  description: "How the AllChinaBuy Pro directory handles search transitions, standard technical logs and future privacy updates.",
  path: "/privacy",
  image: socialCard("privacy", "AllChinaBuy Pro privacy notice share card"),
});

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy notice"
      title="A directory with minimal data needs."
      intro="Effective July 18, 2026. This notice describes the current public website."
    >
      <h2>No directory account</h2>
      <p>
        AllChinaBuy Pro does not currently provide user accounts, order processing, payments, comments or
        a newsletter. It does not ask visitors to submit identity documents or payment information.
      </p>

      <h2>Search transitions</h2>
      <p>
        When you submit a catalogue search, your keywords are sent directly to CNFansHP in the destination
        URL. From that point, the destination website&apos;s privacy terms apply. Do not place passwords,
        payment data or other sensitive information in a search field.
      </p>

      <h2>Technical request information</h2>
      <p>
        Hosting and security infrastructure may process standard request information such as IP address,
        device or browser data, timestamps and requested pages to deliver and protect the website. The
        website does not add advertising trackers or a custom analytics script.
      </p>

      <h2>Outbound websites</h2>
      <p>
        AllChinaBuy Pro does not control how another website collects or uses information. Review the
        destination address and its current privacy notice before creating an account or submitting data.
      </p>

      <h2>Changes and contact</h2>
      <p>
        If analytics, email forms or other data features are added, this notice will be updated before
        those features are enabled. Privacy questions and factual corrections can be submitted through the
        public editorial report form on the <Link href="/contact">contact page</Link>. Do not include
        sensitive or confidential information in that public form.
      </p>
    </InfoPage>
  );
}
