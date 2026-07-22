import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({ title: "Contact", description: "Contact information and correction requests for FindQC Pro." }, "/contact");

export default function ContactPage() {
  return (
    <div className="shell inner-page info-page">
      <Breadcrumbs items={[{ labelKey: "footer.contact" }]} />
      <PageHero eyebrow={<T id="contact.eyebrow" />} title={<><T id="contact.title1" /><br /><em><T id="contact.title2" /></em></>} intro={<T id="contact.intro" />} />
      <section className="contact-card"><div><span><T id="contact.general" /></span><a href="mailto:hello@findqc.pro">hello@findqc.pro</a></div><p><T id="contact.text" /></p></section>
    </div>
  );
}
