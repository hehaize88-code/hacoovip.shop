"use client";

import Link from "next/link";
import SearchBox from "../components/SearchBox";
import ProductCard from "../components/ProductCard";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import { useLanguage } from "../components/LanguageProvider";
import { categories, products } from "../lib/data";

function StackedText({ value }) {
  const lines = value.split("\n");
  return lines.map((line, index) => <span key={line}>{line}{index < lines.length - 1 && <br />}</span>);
}

export default function HomePage() {
  const { t } = useLanguage();
  const previewFaqs = [1, 2, 3].map((number) => ({
    question: t(`home.faq${number}Question`),
    answer: t(`home.faq${number}Answer`),
  }));

  return (
    <>
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
        </div>

        <div className="inspection-board" aria-label={t("home.reviewDesk")}>
          <div className="board-header">
            <span>{t("home.reviewDesk")}</span>
            <b>QC / 01</b>
          </div>
          <div className="board-photo">
            <img src="/products/shoes-60.jpg" alt="Footwear product example" />
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
            <Link href="/categories" className="text-link">{t("home.allCategories")} <ArrowIcon /></Link>
          </div>
          <div className="category-strip">
            {categories.slice(0, 6).map((category) => (
              <Link className="category-chip" href={`/categories/${category.slug}`} key={category.slug}>
                <span>{category.code}</span>
                <div><strong>{t(`category.${category.slug}.name`)}</strong><small>{t(`category.${category.slug}.short`)}</small></div>
                <ArrowIcon size={16} />
              </Link>
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
          {products.slice(0, 4).map((product, index) => <ProductCard product={product} priority={index < 2} key={product.id} />)}
        </div>
        <p className="price-note">{t("home.priceNote")}</p>
      </section>

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
