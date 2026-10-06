import Link from "next/link";

export const categories = [
  [
    "Sneakers",
    "Open current collection",
    "https://cnfanshp.com/shoes/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "01",
  ],
  [
    "Hoodies",
    "Open current collection",
    "https://cnfanshp.com/hoodies-sweaters/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "02",
  ],
  [
    "T-Shirts",
    "Open current collection",
    "https://cnfanshp.com/t-shirts/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "03",
  ],
  [
    "Jackets",
    "Open current collection",
    "https://cnfanshp.com/jackets/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "04",
  ],
  [
    "Bottoms",
    "Open current collection",
    "https://cnfanshp.com/pants-shorts/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "05",
  ],
  [
    "Accessories",
    "Open current collection",
    "https://cnfanshp.com/accessories/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "06",
  ],
];

export const products = [
  {
    "name": "Gucci pique cotton breathable and versatile short",
    "category": "T-Shirts",
    "price": "$31.88 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1121Q55.webp",
    "href": "https://cnfanshp.com/AllProducts/5976.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Polo shirt（5 styles）",
    "category": "T-Shirts",
    "price": "$16.16 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G04619608.webp",
    "href": "https://cnfanshp.com/AllProducts/5953.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Off White T-shirt",
    "category": "T-Shirts",
    "price": "$16.31 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G02630c8.webp",
    "href": "https://cnfanshp.com/AllProducts/5934.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Celine embroidered chocolate-",
    "category": "Jackets",
    "price": "$44.19 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1193O56.webp",
    "href": "https://cnfanshp.com/AllProducts/5981.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Miu Miu new arrival Knitted",
    "category": "Jackets",
    "price": "$47.45 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G10240Z1.webp",
    "href": "https://cnfanshp.com/AllProducts/5969.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Maison Margiela Casual Business",
    "category": "Jackets",
    "price": "$67.47 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G05126214.webp",
    "href": "https://cnfanshp.com/AllProducts/5958.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Patagonia classic loose-fitting crew neck",
    "category": "Hoodies",
    "price": "$20.76 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1101D39.webp",
    "href": "https://cnfanshp.com/AllProducts/5974.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  },
  {
    "name": "Miu Miu's new collared patchwork casual",
    "category": "Hoodies",
    "price": "$23.72 est.",
    "image": "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1054H39.webp",
    "href": "https://cnfanshp.com/AllProducts/5970.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    "checked": "06 Oct 2026"
  }
];

export function ConceptSwitcher({ active }: { active: "A" | "B" | "C" }) {
  return (
    <nav className="concept-switcher" aria-label="Switch design concept">
      <Link className="switcher-home" href="/">
        All concepts
      </Link>
      {(["A", "B", "C"] as const).map((item) => (
        <Link
          className={active === item ? "active" : ""}
          href={`/concept-${item.toLowerCase()}`}
          key={item}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}

export function SearchBar({
  label = "Search current products",
  buttonLabel = "Search",
}: {
  label?: string;
  buttonLabel?: string;
}) {
  return (
    <form
      className="product-search"
      action="https://cnfanshp.com/search.html"
      method="get"
      target="_blank"
    >
      <label className="sr-only" htmlFor={`product-search-${label}`}>
        Search products
      </label>
      <span aria-hidden="true">⌕</span>
      <input
        id={`product-search-${label}`}
        name="keywords"
        type="search"
        placeholder={label}
        autoComplete="off"
        required
      />
      <input type="hidden" name="channelid" value="2" />
      <input type="hidden" name="utm_source" value="allchinabuy.ro" />
      <input type="hidden" name="utm_medium" value="referral" />
      <input type="hidden" name="utm_campaign" value="ro_search" />
      <button type="submit">
        {buttonLabel} <b>↗</b>
      </button>
    </form>
  );
}

export function ProductCard({
  product,
  index = 0,
  mode = "a",
  statusLabel = "Checked",
}: {
  product: (typeof products)[number];
  index?: number;
  mode?: "a" | "b" | "c";
  statusLabel?: string;
}) {
  return (
    <a
      className={`product-card product-${mode}`}
      href={product.href}
      target="_blank"
      rel="noopener"
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width="640"
          height="800"
        />
        {mode === "a" && <span className="verified-badge">Curated</span>}
        {mode === "b" && <span className="editorial-number">0{index + 1}</span>}
      </div>
      <div className="product-copy">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="product-bottom">
          <strong>{product.price}</strong>
          {mode === "c" ? (
            <span>
              {statusLabel} · {product.checked}
            </span>
          ) : (
            <span>View find ↗</span>
          )}
        </div>
      </div>
    </a>
  );
}

export function Footer({ mode }: { mode: string }) {
  return (
    <footer className={`site-footer footer-${mode}`}>
      <div>
        <span className="brand-mark">A</span>
        <strong>ACBuy Atlas</strong>
      </div>
      <p>
        Independent product discovery guide. Not affiliated with AllChinaBuy or
        any featured brand. Product details and availability may change.
      </p>
      <span>Concept preview · 2026</span>
    </footer>
  );
}
