/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SearchBox } from "@/components/SearchBox";
import { categories, MAIN_CATALOGUE_URL, SITE_URL } from "@/lib/content";
import { isSupportedLocale, localeContent, supportedLocales } from "@/lib/locales";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    return { title: "Page not found", robots: { index: false, follow: false } };
  }
  const content = localeContent[locale];
  return {
    title: content.headline,
    description: content.subcopy,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: SITE_URL,
        fr: `${SITE_URL}/fr`,
        de: `${SITE_URL}/de`,
        it: `${SITE_URL}/it`,
        es: `${SITE_URL}/es`,
        "x-default": SITE_URL,
      },
    },
  };
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const content = localeContent[locale];

  return (
    <main id="main-content" className="inner-page" lang={content.language}>
      <section className="localized-hero">
        <div className="localized-hero__copy">
          <p className="eyebrow">AllChinaBuy Pro · {content.label}</p>
          <h1>{content.headline}</h1>
          <p>{content.subcopy}</p>
          <SearchBox placeholder={content.placeholder} buttonLabel={content.search} />
          <div className="page-hero__actions">
            <a className="button button--lime" href={MAIN_CATALOGUE_URL} target="_blank" rel="nofollow noopener noreferrer">
              {content.categories} <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button--outline-dark" href="/guides/how-a-china-shopping-directory-works">{content.guide}</Link>
          </div>
          <p className="localized-note">{content.note}</p>
        </div>
        <div className="localized-hero__image" aria-hidden="true">
          <img
            src="/images/hero-collage.webp"
            srcSet="/images/hero-collage-560.webp 560w, /images/hero-collage.webp 1120w"
            sizes="(max-width: 860px) 100vw, 50vw"
            alt=""
            width="1120"
            height="1400"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">{content.categories}</p><h2>Browse clear product routes.</h2></div>
          <p>{content.note}</p>
        </div>
        <div className="localized-grid">
          {categories.slice(0, 6).map((category) => (
            <a key={category.slug} href={category.targetUrl} target="_blank" rel="nofollow noopener noreferrer">
              <span>{category.title}</span><span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
