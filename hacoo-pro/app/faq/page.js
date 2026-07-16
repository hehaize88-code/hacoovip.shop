import StructuredData from "@/components/StructuredData";
import BreadcrumbData from "@/components/BreadcrumbData";
import { faqs } from "../data";
import { languageAlternates } from "../i18n";
import { createPageMetadata } from "../seo";

export const metadata=createPageMetadata({title:"Hacoo Spreadsheet FAQ: Direct Answers",description:"Direct answers about Hacoo Pro, spreadsheet-style product discovery, external links, sizing and shipping research.",path:"/faq",alternates:languageAlternates("/faq","en")});
export default function FAQPage(){const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};return <><StructuredData data={schema}/><BreadcrumbData path="/faq" items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}/><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">Frequently asked</span><h1>Direct answers.<br/><em>No guesswork.</em></h1><p>What this independent site does, where links go and which information still needs to be verified on the live destination.</p></div></section><section className="section wrap faq-page"><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section></>}
