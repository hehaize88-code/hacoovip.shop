/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { categories } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <Link href="/" className="brand brand--footer">
            <span className="brand__logo-frame">
              <img src="/logo-allchinabuy.png" alt="AllChinaBuy" width="1718" height="253" loading="lazy" />
            </span>
            <span className="brand__tagline">Independent China shopping directory</span>
          </Link>
          <p>Clearer product discovery, link routes and practical research notes for international shoppers.</p>
        </div>
        <div>
          <h2>Browse</h2>
          <Link href="/finds">All finds</Link>
          {categories.slice(0, 4).map((category) => <Link key={category.slug} href={`/collections/${category.slug}`}>{category.title}</Link>)}
        </div>
        <div>
          <h2>Learn</h2>
          <Link href="/guides">Guides</Link>
          <Link href="/allchinabuy-spreadsheet">Spreadsheet alternative</Link>
          <Link href="/reviews">Review method</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </div>
        <div>
          <h2>Important</h2>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 AllChinaBuy Pro</span>
        <span>Independent directory. No products are sold or shipped here.</span>
      </div>
    </footer>
  );
}
