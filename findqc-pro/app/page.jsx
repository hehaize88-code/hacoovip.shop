"use client";

import Link from "../components/LocalizedLink";
import SearchBox from "../components/SearchBox";
import ProductCard from "../components/ProductCard";
import ResponsiveImage from "../components/ResponsiveImage";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import { useLanguage } from "../components/LanguageProvider";
import { MAIN_SITE, categories, products } from "../lib/data";
import { BUILD_LANGUAGE, languageUrl } from "../lib/routing";
import { preload } from "react-dom";
import { featuredReading } from "../lib/featuredReading";

function StackedText({ value }) {
  const lines = value.split("\n");
  return lines.map((line, index) => <span key={line}>{line}{index < lines.length - 1 && <br />}</span>);
}

export default function HomePage() {
  const { t } = useLanguage();
  preload("/optimized/products/shoes-60-960.avif", {
    as: "image",
    type: "image/avif",
    imageSrcSet: "/optimized/products/shoes-60-480.avif 480w, /optimized/products/shoes-60-960.avif 960w",
    imageSizes: "(max-width: 760px) calc(100vw - 56px), 414px",
    fetchPriority: "high",
  });
  const previewFaqs = [1, 2, 3].map((number) => ({
    question: t(`home.faq${number}Question`),
    answer: t(`home.faq${number}Answer`),
  }));
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://findqc.pro/#organization",
    name: "FindQC Pro Editorial Desk",
    alternateName: "FindQC Pro",
    url: "https://findqc.pro/",
    logo: {
      "@type": "ImageObject",
      url: "https://findqc.pro/findqc-logo.png",
      width: 128,
      height: 128,
    },
    description: t("footer.description"),
    email: "hello@findqc.pro",
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${languageUrl("/")}#website`,
    url: languageUrl("/"),
    name: "FindQC Pro",
    inLanguage: BUILD_LANGUAGE,
    publisher: { "@id": "https://findqc.pro/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${MAIN_SITE}/search.html?keywords={search_term_string}&channelid=2`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <section className="home-hero shell">
        <div className="hero-copy">
          <span className="eyebrow"><i /> {t("home.eyebrow")}</span>
          <h1>{t("home.titleLine1")}<br /><em>{t("home.titleLine2")}</em></h1>
          <p className="hero-intro">
            {t("home.intro")}
          </p>
          <SearchBox />
          <div className="hero-notes" aria-label="Site features">
            <span><CheckIcon size={15} /> {t("home.featureSearch")}</span>
            <span><CheckIcon size={15} /> {t("home.featureLinks")}</span>
            <span><CheckIcon size={15} /> {t("home.featureGuides")}</span>
          </div>
          <nav className="hero-guide-links" aria-label={t("home.guideLinks")}>
            <Link href="/articles/findqc-search-methods">{t("home.searchGuide")} <ArrowIcon size={14} /></Link>
            <Link href="/articles/before-you-buy-qc-guide">{t("home.photoChecklist")} <ArrowIcon size={14} /></Link>
          </nav>
        </div>

        <div className="inspection-board" aria-label={t("home.reviewDesk")}>
          <div className="board-header">
            <span>{t("home.reviewDesk")}</span>
            <b>QC / 01</b>
          </div>
          <div className="board-photo">
            <ResponsiveImage
              src="/products/shoes-60.jpg"
              alt="Footwear product example"
              sizes="(max-width: 760px) calc(100vw - 56px), 414px"
              priority
            />
            <span className="corner tl" /><span className="corner tr" />
            <span className="corner bl" /><span className="corner br" />
            <div className="photo-tag">{t("home.referenceImage")}</div>
          </div>
          <div className="board-checks">
            <div><CheckIcon /><span><b>{t("home.shape")}</b><small>{t("home.shapeHelp")}</small></span></div>
            <div><CheckIcon /><span><b>{t("home.stitching")}</b><small>{t("home.stitchingHelp")}</small></span></div>
            <div><CheckIcon /><span><b>{t("home.sizeLabel")}</b><small>{t("home.sizeHelp")}</small></span></div>
          </div>
          <div className="board-stamp"><StackedText value={t("home.lookTwice")} /></div>
        </div>
      </section>

      <section className="category-band">
        <div className="shell">
          <div className="section-heading compact-heading">
            <div>
              <span className="eyebrow">{t("home.browseType")}</span>
              <h2>{t("home.startCategory")}</h2>
            </div>
            <a href={`${MAIN_SITE}/AllProducts/`} className="text-link" target="_blank" rel="noopener noreferrer">{t("home.allCategories")} <ArrowIcon /></a>
          </div>
          <div className="category-strip">
            {categories.slice(0, 6).map((category) => (
              <a className="category-chip" href={category.href} target="_blank" rel="noopener noreferrer" key={category.slug}>
                <span>{category.code}</span>
                <div><strong>{t(`category.${category.slug}.name`)}</strong><small>{t(`category.${category.slug}.short`)}</small></div>
                <ArrowIcon size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("home.catalogShortlist")}</span>
            <h2>{t("home.recentFinds")}</h2>
            <p>{t("home.recentIntro")}</p>
          </div>
          <Link href="/products" className="outline-button">{t("home.viewAll")} <ArrowIcon /></Link>
        </div>
        <div className="product-grid home-products">
          {products.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
        <p className="price-note">{t("home.priceNote")}</p>
      </section>

      {BUILD_LANGUAGE === "en" && <section className="section shell latest-reading" aria-labelledby="latest-reading-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("home.readingEyebrow")}</span>
            <h2 id="latest-reading-title">{t("home.readingTitle")}</h2>
            <p>{t("home.readingIntro")}</p>
          </div>
          <Link href="/articles" className="outline-button">{t("home.allGuides")} <ArrowIcon /></Link>
        </div>
        <div className="related-article-grid latest-reading-grid">
          {featuredReading.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug}>
              <span>{t("home.englishGuide")}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <b>{t("home.readNote")} <ArrowIcon /></b>
            </Link>
          ))}
        </div>
      </section>}

      <section className="method-section">
        <div className="shell method-grid">
          <div className="method-intro">
            <span className="eyebrow light">{t("home.methodEyebrow")}</span>
            <h2>{t("home.methodTitle1")}<br />{t("home.methodTitle2")}</h2>
            <p>{t("home.methodIntro")}</p>
            <Link href="/guides/qc-photo-checklist" className="lime-button">{t("home.openChecklist")} <ArrowIcon /></Link>
          </div>
          <ol className="method-list">
            <li><span>01</span><div><h3>{t("home.method1Title")}</h3><p>{t("home.method1Text")}</p></div></li>
            <li><span>02</span><div><h3>{t("home.method2Title")}</h3><p>{t("home.method2Text")}</p></div></li>
            <li><span>03</span><div><h3>{t("home.method3Title")}</h3><p>{t("home.method3Text")}</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section shell editorial-section">
        <div className="article-feature">
          <div className="article-number">{t("home.fieldNote")}</div>
          <div className="article-copy">
            <span className="eyebrow">{t("home.articleCategory")} · {t("home.articleReadTime")}</span>
            <h2>{t("home.articleTitle")}</h2>
            <p>{t("home.articleExcerpt")}</p>
            <Link href="/articles/before-you-buy-qc-guide" className="text-link">{t("home.readNote")} <ArrowIcon /></Link>
          </div>
          <div className="article-visual" aria-hidden="true">
            <span>01</span><span>02</span><span>03</span>
            <b><StackedText value={t("home.checkBeforeShip")} /></b>
          </div>
        </div>

        <div className="faq-preview">
          <div>
            <span className="eyebrow">{t("home.quickAnswers")}</span>
            <h2>{t("home.beforeClick")}</h2>
          </div>
          <div className="faq-list">
            {previewFaqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <Link href="/faq" className="text-link">{t("home.seeAnswers")} <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
