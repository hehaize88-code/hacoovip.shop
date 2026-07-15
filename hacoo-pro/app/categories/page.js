import { CategoryCard } from "@/components/Cards";
import { categories } from "../data";
import { languageAlternates } from "../i18n";

export const metadata = { title: "Hacoo Spreadsheet Categories — Shoes, Headwear & More", description: "Browse focused Hacoo spreadsheet category routes for shoes, headwear, hoodies, T-shirts, jackets, pants, accessories and electronics.", alternates: languageAlternates("/categories", "en") };

export default function CategoriesPage() {
  return <><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">Category directory</span><h1>Find the closest<br/><em>product route.</em></h1><p>Eight focused starting points, each with a purpose-built checklist and a direct route into current CNFansHP catalog information.</p></div></section><section className="section wrap"><div className="category-grid">{categories.map((c,i)=><CategoryCard category={c} index={i} key={c.slug}/>)}</div></section></>;
}
