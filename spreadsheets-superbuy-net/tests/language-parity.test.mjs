import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { transform } from "esbuild";

async function loadSiteData() {
  const expansionsSource = fs.readFileSync(new URL("../app/article-expansions.ts", import.meta.url), "utf8");
  const { code: expansionsCode } = await transform(expansionsSource, { loader: "ts", format: "esm", target: "es2022" });
  const expansionsUrl = `data:text/javascript;base64,${Buffer.from(expansionsCode).toString("base64")}`;
  const source = fs.readFileSync(new URL("../app/site-data.ts", import.meta.url), "utf8")
    .replace('"./article-expansions"', JSON.stringify(expansionsUrl));
  const { code } = await transform(source, { loader: "ts", format: "esm", target: "es2022" });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}

function articleText(article) {
  return [article.intro, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])].join(" ");
}

test("every language preserves all modules and article depth", async () => {
  const { copy, languages } = await loadSiteData();
  const expected = {
    proof: 3,
    steps: 3,
    faq: 4,
    qc: 5,
    shipping: 4,
    articles: 3,
    sections: 10,
    bullets: 8,
  };

  const englishLengths = Object.fromEntries(
    Object.entries(copy.en.articles).map(([slug, article]) => [slug, [...articleText(article)].length]),
  );

  for (const { code } of languages) {
    const locale = copy[code];
    assert.equal(locale.proof.length, expected.proof, `${code}: proof points`);
    assert.equal(locale.learnSteps.length, expected.steps, `${code}: steps`);
    assert.equal(locale.faqItems.length, expected.faq, `${code}: FAQ items`);
    assert.equal(locale.qcChecklist.length, expected.qc, `${code}: QC items`);
    assert.equal(locale.shippingCards.length, expected.shipping, `${code}: shipping cards`);
    assert.equal(Object.keys(locale.articles).length, expected.articles, `${code}: articles`);

    for (const [slug, article] of Object.entries(locale.articles)) {
      assert.equal(article.sections.length, expected.sections, `${code}: article sections`);
      assert.equal(
        article.sections.reduce((total, section) => total + section.paragraphs.length, 0),
        code === "en" ? 20 : 30,
        `${code}: article paragraphs`,
      );
      assert.equal(article.sections.reduce((total, section) => total + (section.bullets?.length ?? 0), 0), expected.bullets, `${code}: article bullets`);

      const minimumRatio = code === "zh-cn" ? 0.27 : 0.8;
      assert.ok(
        [...articleText(article)].length >= englishLengths[slug] * minimumRatio,
        `${code}: ${slug} retains full editorial detail`,
      );
    }
  }
});
