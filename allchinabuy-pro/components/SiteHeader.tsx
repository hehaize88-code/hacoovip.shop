/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const nav = [
  ["Finds", "/finds"],
  ["Shoes", "/collections/shoes"],
  ["Clothing", "/collections/clothing"],
  ["Accessories", "/collections/accessories"],
  ["Guides", "/guides"],
  ["FAQ", "/faq"],
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
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
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
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <div className="mobile-menu__languages">
              {languages.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
