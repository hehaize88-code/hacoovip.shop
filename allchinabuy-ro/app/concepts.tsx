import Link from "next/link";

export const categories = [
  ["Sneakers", "64+ fresh finds", "https://www.cnfanshp.com/shoes/", "01"],
  ["Hoodies", "Layers & knitwear", "https://www.cnfanshp.com/hoodies-sweaters/", "02"],
  ["T-Shirts", "Daily rotation", "https://www.cnfanshp.com/t-shirts/", "03"],
  ["Jackets", "Outerwear edit", "https://www.cnfanshp.com/jackets/", "04"],
  ["Bottoms", "Pants & shorts", "https://www.cnfanshp.com/pants-shorts/", "05"],
  ["Accessories", "Finish the fit", "https://www.cnfanshp.com/accessories/", "06"],
];

export const products = [
  { name: "Piqué Cotton Polo", category: "T-Shirts", price: "$29.90", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1121Q55.webp", href: "https://www.cnfanshp.com/AllProducts/5976.html", score: "94" },
  { name: "Classic Polo · 5 styles", category: "T-Shirts", price: "$15.15", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G04619608.webp", href: "https://www.cnfanshp.com/AllProducts/5953.html", score: "91" },
  { name: "Graphic Cotton Tee", category: "T-Shirts", price: "$15.30", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G02630c8.webp", href: "https://www.cnfanshp.com/AllProducts/5934.html", score: "89" },
  { name: "Chocolate Embroidered Jacket", category: "Jackets", price: "$41.40", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1193O56.webp", href: "https://www.cnfanshp.com/AllProducts/5981.html", score: "96" },
  { name: "New Season Knit", category: "Jackets", price: "$44.45", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G10240Z1.webp", href: "https://www.cnfanshp.com/AllProducts/5969.html", score: "92" },
  { name: "Casual Business Jacket", category: "Jackets", price: "$63.20", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G05126214.webp", href: "https://www.cnfanshp.com/AllProducts/5958.html", score: "90" },
  { name: "Classic Loose-Fit Sweatshirt", category: "Hoodies", price: "$19.45", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1101D39.webp", href: "https://www.cnfanshp.com/AllProducts/5974.html", score: "93" },
  { name: "Collared Patchwork Knit", category: "Hoodies", price: "$22.25", image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1054H39.webp", href: "https://www.cnfanshp.com/AllProducts/5970.html", score: "88" },
];

export function ConceptSwitcher({ active }: { active: "A" | "B" | "C" }) {
  return (
    <nav className="concept-switcher" aria-label="Switch design concept">
      <Link className="switcher-home" href="/">All concepts</Link>
      {(["A", "B", "C"] as const).map((item) => (
        <Link className={active === item ? "active" : ""} href={`/concept-${item.toLowerCase()}`} key={item}>
          {item}
        </Link>
      ))}
    </nav>
  );
}

export function SearchBar({ label = "Search 2,000+ finds" }: { label?: string }) {
  return (
    <form className="product-search" action="https://www.cnfanshp.com/search.html" method="get" target="_blank">
      <label className="sr-only" htmlFor={`product-search-${label}`}>Search products</label>
      <span aria-hidden="true">⌕</span>
      <input id={`product-search-${label}`} name="keywords" type="search" placeholder={label} autoComplete="off" required />
      <input type="hidden" name="channelid" value="2" />
      <button type="submit">Search <b>↗</b></button>
    </form>
  );
}

export function ProductCard({ product, index = 0, mode = "a" }: { product: typeof products[number]; index?: number; mode?: "a" | "b" | "c" }) {
  return (
    <a className={`product-card product-${mode}`} href={product.href} target="_blank" rel="noopener">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" width="640" height="800" />
        {mode === "a" && <span className="verified-badge">Curated</span>}
        {mode === "b" && <span className="editorial-number">0{index + 1}</span>}
      </div>
      <div className="product-copy">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="product-bottom">
          <strong>{product.price}</strong>
          {mode === "c" ? <span>Match {product.score}%</span> : <span>View find ↗</span>}
        </div>
      </div>
    </a>
  );
}

export function Footer({ mode }: { mode: string }) {
  return (
    <footer className={`site-footer footer-${mode}`}>
      <div><span className="brand-mark">A</span><strong>ACBuy Atlas</strong></div>
      <p>Independent product discovery guide. Not affiliated with AllChinaBuy or any featured brand. Product details and availability may change.</p>
      <span>Concept preview · 2026</span>
    </footer>
  );
}
