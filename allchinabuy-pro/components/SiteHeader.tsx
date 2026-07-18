/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { categories } from "@/lib/content";

const categoryTarget = (slug: string) => {
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Missing navigation category: ${slug}`);
  return category.targetUrl;
};

const nav = [
  { label: "Finds", href: "/finds" },
  { label: "Shoes", href: categoryTarget("shoes"), external: true },
  { label: "Clothing", href: categoryTarget("clothing"), external: true },
  { label: "Accessories", href: categoryTarget("accessories"), external: true },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
];

const languages = [
  ["EN", "/"],
  ["FR", "/fr"],
  ["DE", "/de"],
  ["IT", "/it"],
  ["ES", "/es"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="AllChinaBuy Pro home">
          <span className="brand__logo-frame">
            <img src="/logo-allchinabuy.png" alt="AllChinaBuy" width="1718" height="253" />
          </span>
          <span className="brand__tagline">Independent China shopping directory</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="nofollow noopener noreferrer">{item.label}</a>
          ) : (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <details className="language-menu">
          <summary aria-label="Choose language"><span aria-hidden="true">◎</span> LANG <span aria-hidden="true">⌄</span></summary>
          <div>
            {languages.map(([label, href]) => <Link key={label} href={href} hrefLang={label.toLowerCase()}>{label}</Link>)}
          </div>
        </details>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span></span><span></span><span></span></summary>
          <nav aria-label="Mobile navigation">
            {nav.map((item) => item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="nofollow noopener noreferrer">{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <div className="mobile-menu__languages">
              {languages.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
