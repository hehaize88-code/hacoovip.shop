import Link from "next/link";
import { articleEdition, featuredSlugs } from "@/app/articles/editions";
import { editionCopy } from "@/app/articles/edition-copy";
import { localizePath } from "@/app/i18n";
import { Arrow } from "./Icons";

export function EntryLinks({ locale = "en" }) {
  const paths = ["/spreadsheet", "/articles/hacoo-product-links-not-working", "/articles/hacoo-on-pc-without-app"];
  return <div className="editorial-entries">{editionCopy[locale].routes.map((label, i) =>
    <Link key={label} href={localizePath(paths[i], locale)}>{label}<Arrow size={15}/></Link>
  )}</div>;
}

export default function EditorialReading({ locale = "en", compact = false }) {
  const copy = editionCopy[locale];
  return <div className={compact ? "research-reading research-reading-home" : "research-reading"}>
    <div className="section-heading compact"><div><span className="section-label">Hacoo Pro</span><h2>{copy.hub}</h2></div><Link className="text-link" href={localizePath("/articles", locale)}>{copy.related} <Arrow size={16}/></Link></div>
    <div className="guide-grid">{featuredSlugs.map((slug, index) => {
      const a = articleEdition(locale, slug);
      return <Link className="guide-card" href={localizePath(`/articles/${slug}`, locale)} key={slug}>
        <span className="guide-number">0{index+1}</span><div><h3>{a.title}</h3><p>{a.description}</p><span className="text-link">{copy.read} <Arrow size={16}/></span></div>
      </Link>;
    })}</div>
  </div>;
}
