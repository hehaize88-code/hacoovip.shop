import Link from "next/link";

export const categories = [
  [
    "Sneakers",
    "Open current collection",
    "https://www.cnbuycha.com/shoes/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "01",
  ],
  [
    "Hoodies",
    "Open current collection",
    "https://www.cnbuycha.com/hoodies-sweaters/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "02",
  ],
  [
    "T-Shirts",
    "Open current collection",
    "https://www.cnbuycha.com/t-shirts/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "03",
  ],
  [
    "Jackets",
    "Open current collection",
    "https://www.cnbuycha.com/jackets/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "04",
  ],
  [
    "Bottoms",
    "Open current collection",
    "https://www.cnbuycha.com/pants-shorts/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "05",
  ],
  [
    "Accessories",
    "Open current collection",
    "https://www.cnbuycha.com/accessories/?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_category_index",
    "06",
  ],
];

export const products = [
  {
    name: "Mertra Hoodie",
    category: "Hoodies",
    price: "$31.44 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260806/1-260P616301A57.webp",
    href: "https://www.cnbuycha.com/AllProducts/3393.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "Canada Goose Sweatshirt",
    category: "Hoodies",
    price: "$33.95 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9212445610.webp",
    href: "https://www.cnbuycha.com/AllProducts/3380.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "Nike Sweater",
    category: "Hoodies",
    price: "$39.15 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9211624601.jpg",
    href: "https://www.cnbuycha.com/AllProducts/3375.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "ACG & SUP Pullover Sweatshirt",
    category: "Hoodies",
    price: "$59.16 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9211449611.webp",
    href: "https://www.cnbuycha.com/AllProducts/3374.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "The North Face Down Jacket",
    category: "Jackets",
    price: "$98.31 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260806/1-260P6163I3956.webp",
    href: "https://www.cnbuycha.com/AllProducts/3396.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "Louis Vuitton Varsity",
    category: "Jackets",
    price: "$42.85 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260806/1-260P61636001B.jpg",
    href: "https://www.cnbuycha.com/AllProducts/3395.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "Stussy Jacket",
    category: "Jackets",
    price: "$26.39 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260806/1-260P616341J10.webp",
    href: "https://www.cnbuycha.com/AllProducts/3394.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
  {
    name: "Ralph Lauren Longsleeve",
    category: "Hoodies",
    price: "$34.10 est.",
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1154920N8.webp",
    href: "https://www.cnbuycha.com/AllProducts/3340.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_product_index",
    checked: "12 Aug 2026",
  },
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
      action="https://www.cnbuycha.com/search.html"
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
