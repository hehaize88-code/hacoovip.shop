import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import { ArrowIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";

export const metadata = { title: "About", description: "About FindQC Pro, an independent product-discovery and QC education website.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <div className="shell inner-page info-page">
      <Breadcrumbs items={[{ labelKey: "footer.about" }]} />
      <PageHero eyebrow={<T id="about.eyebrow" />} title={<><T id="about.title1" /><br /><em><T id="about.title2" /></em></>} intro={<T id="about.intro" />} />
      <section className="info-grid">
        <div><span>01</span><h2><T id="about.discoveryTitle" /></h2><p><T id="about.discoveryText" /></p></div>
        <div><span>02</span><h2><T id="about.educationTitle" /></h2><p><T id="about.educationText" /></p></div>
        <div><span>03</span><h2><T id="about.boundariesTitle" /></h2><p><T id="about.boundariesText" /></p></div>
      </section>
      <section className="plain-content"><h2><T id="about.independentTitle" /></h2><p><T id="about.independentText" /></p><Link href="/guides"><T id="about.readGuides" /> <ArrowIcon /></Link></section>
    </div>
  );
}
