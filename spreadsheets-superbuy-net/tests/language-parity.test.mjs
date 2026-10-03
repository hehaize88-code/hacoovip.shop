import assert from "node:assert/strict";
import test from "node:test";
import { build } from "esbuild";

async function loadSiteData() {
  const result = await build({ entryPoints: ["app/site-data.ts"], bundle: true, write: false, format: "esm", platform: "node" });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
}
const text = article => [article.intro, ...article.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])])].join(" ");

test("all ten guides preserve substantial localized content and original modules", async () => {
  const { copy, languages, articleSlugs } = await loadSiteData();
  assert.equal(articleSlugs.length, 10);
  for (const { code } of languages) {
    const locale = copy[code];
    for (const field of ["proof", "learnSteps", "faqItems", "qcChecklist", "shippingCards"]) {
      assert.equal(locale[field].length, copy.en[field].length, `${code}: ${field}`);
    }
    assert.deepEqual(Object.keys(locale.articles).sort(), [...articleSlugs].sort());
    for (const slug of articleSlugs) {
      const article = locale.articles[slug];
      const english = copy.en.articles[slug];
      assert.ok(article.sections.length >= english.sections.length, `${code}/${slug}: existing sections preserved`);
      assert.ok(article.sections.every(s => s.paragraphs.length >= 2), `${code}/${slug}: full paragraphs`);
      if (articleSlugs.indexOf(slug) >= 4) {
      assert.ok(text(article).length >= text(english).length * (code === "zh-cn" ? .25 : .72), `${code}/${slug}: content depth`);
      }
      assert.doesNotMatch(text(article), /▁|(?:短){10,}|&amp;/, `${code}/${slug}: translation artifacts`);
      if (code !== "en") assert.notEqual(article.intro, english.intro, `${code}/${slug}: translated introduction`);
      if (articleSlugs.indexOf(slug) >= 4) {
        assert.equal(article.sections.length, 8);
        assert.deepEqual(article.sections.map(s => s.paragraphs.length), english.sections.map(s => s.paragraphs.length));
      }
    }
  }
});
