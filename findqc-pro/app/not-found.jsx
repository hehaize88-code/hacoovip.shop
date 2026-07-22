import Link from "../components/LocalizedLink";
import { ArrowIcon } from "../components/Icons";
import T from "../components/LocalizedText";

export default function NotFound() {
  return <section className="shell not-found"><span><T id="notFound.eyebrow" /></span><h1><T id="notFound.title" /></h1><p><T id="notFound.text" /></p><Link href="/"><T id="notFound.link" /> <ArrowIcon /></Link></section>;
}
