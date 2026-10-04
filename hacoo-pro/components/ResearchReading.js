import Link from "next/link";
import { Arrow } from "./Icons";
import { comparisonArticles } from "../app/articles/comparison-articles";

export default function ResearchReading({ compact = false }) {
  return <div className={compact ? "research-reading research-reading-home" : "research-reading"}>
    <div className="section-heading compact"><div><span className="section-label">New comparison guides</span><h2>Find the next useful check.</h2></div><Link className="text-link" href="/articles/">All research articles <Arrow size={16}/></Link></div>
    <div className="guide-grid">{comparisonArticles.map((article, index) => <Link className="guide-card" href={`/articles/${article.slug}/`} key={article.slug}>
      <span className="guide-number">{String(index + 1).padStart(2, "0")}</span>
      <div><small>{article.read} read · October 4, 2026</small><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">Read the comparison <Arrow size={16}/></span></div>
    </Link>)}</div>
  </div>;
}
