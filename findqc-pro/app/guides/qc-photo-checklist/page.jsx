import Link from "next/link";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import { ArrowIcon, CheckIcon } from "../../../components/Icons";
import T from "../../../components/LocalizedText";

export const metadata = {
  title: "QC Photo Checklist",
  description: "A practical seven-stage checklist for reviewing warehouse quality-control photos before international shipping.",
  alternates: { canonical: "/guides/qc-photo-checklist" },
};

export default function ChecklistPage() {
  return (
    <article className="shell inner-page guide-article">
      <Breadcrumbs items={[{ labelKey: "nav.guides", href: "/guides" }, { labelKey: "checklist.crumb" }]} />
      <PageHero eyebrow={<T id="checklist.eyebrow" />} title={<><T id="checklist.title1" /><br /><em><T id="checklist.title2" /></em></>} intro={<T id="checklist.intro" />} />
      <div className="article-layout">
        <aside className="article-aside">
          <div><span><T id="checklist.useWhen" /></span><p><T id="checklist.useWhenText" /></p></div>
          <div><span><T id="checklist.keepInMind" /></span><p><T id="checklist.keepInMindText" /></p></div>
          <Link href="/products"><T id="checklist.findProduct" /> <ArrowIcon /></Link>
        </aside>
        <div className="stage-list">
          {[1, 2, 3, 4, 5, 6, 7].map((number, index) => (
            <section key={number}>
              <span className="stage-no">0{index + 1}</span>
              <div><h2><T id={`checklist.stages.${number}.title`} /></h2><p><T id={`checklist.stages.${number}.text`} /></p></div>
              <CheckIcon size={24} />
            </section>
          ))}
          <div className="article-callout"><strong><T id="checklist.calloutTitle" /></strong><p><T id="checklist.calloutText" /></p></div>
        </div>
      </div>
    </article>
  );
}
