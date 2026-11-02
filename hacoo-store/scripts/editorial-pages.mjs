import fs from "node:fs";
import { publishGuides } from "./store-guides.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-10-04";
const version = "20261004-editorial";
const origin = "https://hacoo.store";
const locales = ["en", "fr", "de", "it", "es"];
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const plain = (value) => value.replace(/<[^>]+>/g, " ").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replace(/\s+/g, " ").replace(/\s+([.,?!;:])/g, "$1").trim();
const descriptionOf = (html) => plain(html.match(/<meta\b(?=[^>]*\bname="description")[^>]*\bcontent="([^"]*)"/)[1]);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, html) => fs.writeFileSync(path.join(root, file), html);
const languagePath = (code) => code === "en" ? "" : `${code}/`;

function replaceBlock(html, name, content, insertion) {
  const block = `<!-- ${name}:start -->\n${content}\n<!-- ${name}:end -->`;
  const regex = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  return regex.test(html) ? html.replace(regex, block) : html.replace(insertion, `${block}\n${insertion}`);
}

function syncMetadata(html, title, description, headline) {
  if (title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
  if (description) html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escape(description)}">`);
  if (headline) html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1>${escape(headline)}<span class="dot">.</span></h1>`);
  const actualTitle = plain(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
  const actualDescription = descriptionOf(html);
  const actualHeadline = plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escape(actualTitle)}">`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escape(actualDescription)}">`);
  return html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, start, body, end) => {
    const data = JSON.parse(body);
    for (const node of data["@graph"] || [data]) {
      if (["WebPage", "CollectionPage", "Article"].includes(node["@type"])) {
        node.description = actualDescription;
        node.dateModified = date;
        if (node["@type"] === "Article") {
          node.headline = actualHeadline;
          const article = html.match(/<article class="article">([\s\S]*?)<\/article>/);
          if (article) node.wordCount = plain(article[1]).split(/\s+/).length;
        } else node.name = actualHeadline;
        if (node["@type"] === "CollectionPage" && html.includes('class="article-grid"')) {
          const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
          const cards = html.match(/<a class="article-card\b[\s\S]*?<\/a>/g) || [];
          node.mainEntity = { "@type": "ItemList", numberOfItems: cards.length, itemListElement: cards.map((card, index) => ({ "@type": "ListItem", position: index + 1, url: new URL(card.match(/href="([^"]+)"/)[1], canonical).href, name: plain(card.match(/<h2>([\s\S]*?)<\/h2>/)[1]) })) };
        }
      }
    }
    return start + JSON.stringify(data) + end;
  });
}

const shippingAddition = `<h2>How long does Hacoo take to deliver to the UK?</h2><p>The UK appears in the regional receiving-time row above. Use that row when comparing the published guidance with your order, rather than the separate fastest-express wording. A range is useful for planning, but the information shown for your particular order and current carrier record is more specific.</p><h2>Read the delivery clock correctly</h2><p>Write down when the purchase was accepted, whether the order has a dispatch confirmation, and what the latest carrier event actually says. These are separate milestones. A tracking page refreshed today may still contain an older event. Keep the event timestamp alongside the status so a later comparison measures new information rather than a new page visit.</p><p>Receiving time already combines preparation and transport in Hacoo's explanation. Do not add the preparation estimate to a published total again. Conversely, a transport estimate on its own does not tell you when preparation will finish. If the order confirmation is unclear about which period it describes, ask the provider before using it to plan a deadline.</p><h2>What to check when the expected period has passed</h2><ol><li>Confirm the order provider and the destination country on the confirmation.</li><li>Compare the stated estimate with the latest carrier event, preserving both dates.</li><li>Check whether the order lists more than one parcel or an item awaiting dispatch.</li><li>Send the relevant order number, parcel reference and status to the responsible support team.</li></ol><p>The <a href="/articles/hacoo-order-tracking/">Hacoo order tracking guide</a> explains stalled updates, split parcels and delivered-but-missing records. It includes a support checklist and separates general status language from the carrier-specific definitions. This website cannot access an order or change a delivery record.</p><h2>Plan around the information you actually have</h2><p>If an item is needed for a fixed event, record that deadline separately from the estimated delivery range. Do not treat an optimistic edge of the range as a confirmed appointment. Preserve any specific commitment made by the provider with the order record and revisit the estimate when a meaningful shipment update appears.</p><p>For an address error, contact the order provider promptly and use the <a href="/articles/change-hacoo-shipping-address/">address correction guide</a> to prepare the details. Updating an address saved in an account should not be assumed to redirect a parcel already dispatched. For an external catalogue purchase, apply the final provider's terms and support process.</p>`;

const reviewAddition = `<h2>Match the review evidence to the product decision</h2><div class="compare-wrap"><table class="compare-table"><thead><tr><th>Your decision</th><th>Useful review context</th><th>Still needs checking</th></tr></thead><tbody><tr><td>Shoe size</td><td>Exact model, selected size and measurement method</td><td>The chart for your chosen listing</td></tr><tr><td>Clothing fit</td><td>Garment measurements and the wearer's fit preference</td><td>Whether the same variant is still offered</td></tr><tr><td>Bag capacity</td><td>Objects shown inside and views of the opening</td><td>Your own largest item and usable compartment dimensions</td></tr><tr><td>Delivery experience</td><td>Order date, destination and named provider</td><td>The current estimate for your own order</td></tr></tbody></table></div><p>Use the <a href="/articles/hacoo-shoes-finds/">shoe comparison guide</a>, <a href="/articles/hacoo-clothing-finds/">clothing measurement guide</a> and <a href="/articles/hacoo-bags-accessories/">bag dimension guide</a> to turn a recommendation into a specific question. A positive comment is useful only within the context it actually supplies. Missing measurements should remain unknown rather than being replaced by assumptions.</p><p>For delivery claims, keep the purchase provider separate from the website that first linked the product. A creator may describe an order from a different destination or time period. The <a href="/articles/hacoo-order-tracking/">tracking workflow</a> helps organize your own order evidence, which is more relevant to a current support request than someone else's headline delivery time.</p>`;

export function refreshEditorial() {
  const manifest = JSON.parse(read("scripts/editorial-articles.json"));
  const changed = new Set();
  const save = (file, html) => { write(file, html); changed.add(file); };
  const shipping = "guides/shipping/index.html";
  let html = replaceBlock(read(shipping), "delivery-workflow", shippingAddition, '</article>');
  html = html.replace(/September 2026/g, "October 2026").replace(/Reviewed September 4, 2026/g, "Reviewed October 4, 2026");
  save(shipping, syncMetadata(html, "Hacoo Delivery Time: UK 15–25 Days, Tracking & Delays", "How long does Hacoo take to deliver? Compare published UK and Europe estimates, processing time and practical steps for tracking updates or delayed parcels."));
  const review = "articles/how-to-verify-hacoo-reviews/index.html";
  html = replaceBlock(read(review), "product-review-evidence", reviewAddition, '</article>');
  html = html.replace(/<p class="editorial-update">[\s\S]*?<\/p>/, "");
  html = html.replace('<article class="article">', '<article class="article"><p class="editorial-update">Updated October 4, 2026: added product-specific review checks and related comparison guides.</p>');
  save(review, syncMetadata(html));
  const reviewEntry = manifest.find((article) => article.slug === "how-to-verify-hacoo-reviews");
  reviewEntry.modified = date;
  write("scripts/editorial-articles.json", JSON.stringify(manifest, null, 2) + "\n");

  const privacy = {
    en: ["Analytics and search interactions", "This site uses Google Analytics to measure page visits and interactions. When available in your browser, the custom search-submission event records the destination domain and website language; it does not include the text you typed. Google Analytics may use cookies or similar technologies according to its configuration and your browser settings. Product searches are sent to the external catalogue to provide matching results, whose own privacy policy applies. Do not enter personal or order information in product search."],
    fr: ["Statistiques et recherches", "Ce site utilise Google Analytics pour mesurer les visites et les interactions. L’événement de recherche personnalisé transmet le domaine de destination et la langue du site, sans le texte saisi. Google Analytics peut utiliser des cookies ou technologies similaires selon sa configuration et les réglages du navigateur. La recherche de produits est envoyée au catalogue externe pour obtenir des résultats ; sa politique de confidentialité s’applique. Ne saisissez pas de données personnelles ou de commande dans la recherche."],
    de: ["Statistik und Suchvorgänge", "Diese Website nutzt Google Analytics für Seitenaufrufe und Interaktionen. Das eigene Suchereignis enthält die Zieldomain und die Sprache der Website, nicht den eingegebenen Suchtext. Google Analytics kann abhängig von Konfiguration und Browsereinstellungen Cookies oder ähnliche Technologien verwenden. Produktsuchen werden für passende Ergebnisse an den externen Katalog gesendet; dort gilt dessen Datenschutzerklärung. Gib keine persönlichen Daten oder Bestelldaten in die Produktsuche ein."],
    it: ["Statistiche e ricerche", "Questo sito usa Google Analytics per misurare visite e interazioni. L’evento di ricerca personalizzato include il dominio di destinazione e la lingua del sito, senza il testo digitato. Google Analytics può usare cookie o tecnologie simili in base alla configurazione e alle impostazioni del browser. Le ricerche di prodotti sono inviate al catalogo esterno per ottenere risultati e sono soggette alla sua informativa. Non inserire dati personali o di ordini nella ricerca."],
    es: ["Estadísticas y búsquedas", "Este sitio utiliza Google Analytics para medir visitas e interacciones. El evento de búsqueda personalizado incluye el dominio de destino y el idioma, sin el texto escrito. Google Analytics puede utilizar cookies o tecnologías similares según su configuración y los ajustes del navegador. Las búsquedas de productos se envían al catálogo externo para obtener resultados y se aplica su política de privacidad. No introduzcas datos personales ni de pedidos en la búsqueda."]
  };
  for (const code of locales) {
    const file = `${languagePath(code)}privacy/index.html`;
    let content = read(file).replace("If analytics or another optional service is introduced, this policy and any required consent behavior will be updated first.", "See the analytics information below for the measurement service currently used.");
    content = replaceBlock(content, "search-analytics-privacy", `<h2>${privacy[code][0]}</h2><p>${privacy[code][1]}</p>`, code === "en" ? "</div></main>" : "</article>");
    content = content.replace(/Last updated July 13, 2026/g, "Last updated October 4, 2026").replace(/Updated July 14, 2026/g, "Updated October 4, 2026");
    save(file, syncMetadata(content));
  }

  // Preserve these manually authored pages across locale rebuilds. No schedule
  // or other site's files are controlled by this build helper.

  for (const file of changed) {
    let content = read(file).replace(/assets\/styles\.css(?:\?[^" ]*)?/g, `assets/styles.css?v=${version}`).replace(/assets\/site\.js(?:\?[^" ]*)?/g, `assets/site.js?v=${version}`).replaceAll('>SEO Articles</a>', '>Guides</a>');
    if (!content.includes('googletagmanager.com/gtag/js?id=G-KVZZSJN8W2')) {
      content = content.replace('</head>', `<script async src="https://www.googletagmanager.com/gtag/js?id=G-KVZZSJN8W2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KVZZSJN8W2');</script>\n</head>`);
    }
    write(file, content);
  }
  const sitemapFile = "sitemap.xml";
  const urls = new Map([...read(sitemapFile).matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)].map((match) => [match[1], match[2].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] || ""]));
  for (const article of manifest) urls.set(article.url, article.modified || article.published);
  for (const file of changed) urls.set(`${origin}/${file.replace(/index\.html$/, "")}`, date);
  const entries = [...urls].map(([url, modified]) => `  <url><loc>${url}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ""}</url>`);
  write(sitemapFile, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`);
  publishGuides(root, manifest);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) refreshEditorial();
