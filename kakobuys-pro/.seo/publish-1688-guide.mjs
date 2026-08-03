import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const slug = "buy-from-1688-with-kakobuy";
const route = `/articles/${slug}/`;
const canonical = `https://kakobuys.pro${route}`;

const indexFile = path.join(root, "articles", "index.html");
let index = fs.readFileSync(indexFile, "utf8");
if (!index.includes(`href="${route}"`)) {
  const card = '<article class="article-card"><div class="article-number">13</div><div><p class="kicker">Expanded research file</p><h3>How to Buy from 1688 with Kakobuy: A Practical Guide</h3><p>A source-first workflow for checking a 1688 offer, importing the right variant into Kakobuy and verifying the warehouse result before shipping.</p><div class="article-meta"><span>1,635-word guide</span><span>Filed 3 August 2026</span></div><a href="/articles/buy-from-1688-with-kakobuy/">Continue the note →</a></div></article>';
  const marker = "</article></div></section></main>";
  if (!index.includes(marker)) throw new Error("Article archive insertion point changed");
  index = index.replace(marker, `</article>${card}</div></section></main>`);
  index = index.replace("Files 04—12", "Files 04—13");
  fs.writeFileSync(indexFile, index);
}
index = fs.readFileSync(indexFile, "utf8");
if (index.includes("1,636-word guide")) {
  fs.writeFileSync(indexFile, index.replace("1,636-word guide", "1,635-word guide"));
}

const topicFile = path.join(here, "topic-map.json");
const topicMap = JSON.parse(fs.readFileSync(topicFile, "utf8"));
if (!topicMap.entries.some((entry) => entry.url.replace(/\/$/, "") === canonical.replace(/\/$/, ""))) {
  topicMap.entries.push({
    url: canonical,
    primaryQuery: "buy from 1688 with Kakobuy",
    relatedTerms: [
      "Kakobuy 1688 agent",
      "1688 link Kakobuy",
      "how to order 1688 Kakobuy"
    ],
    intent: "marketplace-specific buying guidance",
    angle: "preserves 1688 quantity and price conditions from source offer through warehouse verification",
    evidence: "Kakobuy supported product-link search and public service flow plus 1688 platform terms",
    internalLinkRole: "supports readers arriving with 1688 product links"
  });
  topicMap.lastReviewed = "2026-08-03";
  topicMap.nextPriority = "Kakobuy parcel consolidation: when combining warehouse items helps or hurts";
  fs.writeFileSync(topicFile, `${JSON.stringify(topicMap, null, 2)}\n`);
}

const sitemapFile = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapFile, "utf8");
if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
  const row = `  <url>\n    <loc>${canonical}</loc>\n    <lastmod>2026-08-03</lastmod>\n    <xhtml:link rel="alternate" hreflang="en" href="${canonical}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical}"/>\n  </url>\n`;
  if (!sitemap.includes("</urlset>")) throw new Error("Sitemap closing tag missing");
  sitemap = sitemap.replace("</urlset>", `${row}</urlset>`);
  fs.writeFileSync(sitemapFile, sitemap);
}

console.log(JSON.stringify({ route, articleCount: topicMap.entries.length }, null, 2));
