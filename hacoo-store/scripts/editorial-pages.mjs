import fs from "node:fs";
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

const labels = {
  en: ["New Hacoo guides", "Compare products and follow your order", "Read guide", "All guides", "Independent article"],
  fr: ["Nouveaux guides Hacoo", "Comparer les produits et suivre une commande", "Lire en anglais", "Tous les guides", "Article en anglais"],
  de: ["Neue Hacoo-Ratgeber", "Produkte vergleichen und Sendungen verfolgen", "Auf Englisch lesen", "Alle Ratgeber", "Artikel auf Englisch"],
  it: ["Nuove guide Hacoo", "Confronta prodotti e segui la spedizione", "Leggi in inglese", "Tutte le guide", "Articolo in inglese"],
  es: ["Nuevas guías Hacoo", "Compara productos y sigue tu pedido", "Leer en inglés", "Todas las guías", "Artículo en inglés"]
};
const translations = {
  "hacoo-shoes-finds": {
    fr: ["Chaussures Hacoo : liens, photos et pointures", "Comparez les mesures, les variantes et les photos avant de choisir une paire."],
    de: ["Hacoo-Schuhe: Links, Fotos und Größen", "Maße, Varianten und Bilder vor der Auswahl eines Paars vergleichen."],
    it: ["Scarpe Hacoo: link, foto e taglie", "Confronta misure, varianti e fotografie prima di scegliere un paio."],
    es: ["Calzado Hacoo: enlaces, fotos y tallas", "Compara medidas, variantes y fotografías antes de elegir un par."]
  },
  "hacoo-clothing-finds": {
    fr: ["Vêtements Hacoo : sweats, t-shirts et vestes", "Une méthode pour comparer les coupes et les mesures des vêtements."],
    de: ["Hacoo-Kleidung: Hoodies, T-Shirts und Jacken", "Schnitte, Maße und Produktdetails mit einem passenden Kleidungsstück vergleichen."],
    it: ["Abbigliamento Hacoo: felpe, t-shirt e giacche", "Confronta vestibilità, misure e dettagli con un capo che indossi già."],
    es: ["Ropa Hacoo: sudaderas, camisetas y chaquetas", "Compara cortes, medidas y detalles con una prenda que ya te quede bien."]
  },
  "hacoo-bags-accessories": {
    fr: ["Sacs et accessoires Hacoo : dimensions et détails", "Vérifiez l’ouverture, les compartiments et la longueur des anses ou sangles."],
    de: ["Hacoo-Taschen und Zubehör: Maße und Details", "Öffnung, Innenfächer und Trageriemen mit dem geplanten Inhalt abgleichen."],
    it: ["Borse e accessori Hacoo: dimensioni e dettagli", "Controlla apertura, scomparti e tracolla rispetto a ciò che vuoi portare."],
    es: ["Bolsos y accesorios Hacoo: medidas y detalles", "Revisa la abertura, los compartimentos y la correa según lo que llevas."]
  },
  "hacoo-order-tracking": {
    fr: ["Suivi Hacoo : statuts, retards et colis séparés", "Identifiez le transporteur et préparez les informations utiles pour l’assistance."],
    de: ["Hacoo-Sendungsverfolgung: Status und Verzögerungen", "Paketnummern zuordnen und eine konkrete Supportanfrage vorbereiten."],
    it: ["Tracking Hacoo: stati, ritardi e pacchi separati", "Trova il riferimento corretto e prepara i dati utili per l’assistenza."],
    es: ["Seguimiento Hacoo: estados, retrasos y paquetes", "Identifica el transportista y prepara la información para consultar una incidencia."]
  }
};

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

const spreadsheetBlocks = {
  en: `<h2>Browse Hacoo spreadsheet links by product type</h2><p>Use the category that matches your task, then compare exact variants. Product buttons on this site open cnfanshp.com, an external catalogue with its own listings and terms. The category name does not make those products official Hacoo inventory.</p><div class="compare-wrap"><table class="compare-table"><thead><tr><th>Category</th><th>Open the catalogue</th><th>Compare before choosing</th></tr></thead><tbody><tr><td>Shoes</td><td><a href="https://www.cnfanshp.com/shoes/" rel="sponsored nofollow noopener" target="_blank">Footwear links</a></td><td><a href="/articles/hacoo-shoes-finds/">Photo angles and shoe sizes</a></td></tr><tr><td>Clothing</td><td><a href="https://www.cnfanshp.com/hoodies-sweaters/" rel="sponsored nofollow noopener" target="_blank">Hoodies and sweaters</a></td><td><a href="/articles/hacoo-clothing-finds/">Garment measurements and fit</a></td></tr><tr><td>Bags</td><td><a href="https://www.cnfanshp.com/search.html?keywords=bag&amp;channelid=2" rel="sponsored nofollow noopener" target="_blank">Bag search results</a></td><td><a href="/articles/hacoo-bags-accessories/">Openings, compartments and straps</a></td></tr></tbody></table></div><h2>Use a shortlist instead of saving unexplained links</h2><p>Record the final URL, exact variant, dimensions, currency and date checked. Add a separate column for information you could not confirm. This makes it possible to compare listings without treating a blank field as a positive answer. Save the reason you kept each item: a useful size chart, a suitable compartment, or a shape that matches your brief.</p><p>If a link stops opening the intended item, return to the relevant category and search the product description again. Do not assume a replacement result is the same seller or variant. Compare the photographs, measurements and final destination from the beginning. A review date applies to the editorial explanation, not to a continuous stock or price check on every linked item.</p><h2>Continue from discovery to an order</h2><p>Reopen the chosen listing before payment and confirm who accepts the order. Keep the provider's delivery information with your order confirmation. For an existing purchase, the <a href="/articles/hacoo-order-tracking/">tracking guide</a> explains how to distinguish an order number from a parcel reference and prepare a focused support question.</p>`,
  es: `<h2>Enlaces del Hacoo spreadsheet por categoría</h2><p>Elige el tipo de producto y comprueba la ficha concreta. Los botones de catálogo abren cnfanshp.com, un destino externo con sus propias condiciones. Esta selección no es un inventario oficial de la aplicación Hacoo.</p><div class="compare-wrap"><table class="compare-table"><thead><tr><th>Categoría</th><th>Destino externo</th><th>Qué comparar</th></tr></thead><tbody><tr><td>Calzado</td><td><a href="https://www.cnfanshp.com/shoes/" target="_blank" rel="sponsored nofollow noopener">Ver zapatos</a></td><td>Tabla de tallas, longitud y fotos de la variante</td></tr><tr><td>Ropa</td><td><a href="https://www.cnfanshp.com/hoodies-sweaters/" target="_blank" rel="sponsored nofollow noopener">Ver sudaderas</a></td><td>Ancho, largo y método de medición</td></tr><tr><td>Bolsos</td><td><a href="https://www.cnfanshp.com/search.html?keywords=bag&amp;channelid=2" target="_blank" rel="sponsored nofollow noopener">Buscar bolsos</a></td><td>Abertura, compartimentos y correa</td></tr><tr><td>Accesorios</td><td><a href="https://www.cnfanshp.com/accessories/" target="_blank" rel="sponsored nofollow noopener">Ver accesorios</a></td><td>Compatibilidad y piezas incluidas</td></tr></tbody></table></div><h2>Cómo utilizar los enlaces sin perder el contexto</h2><p>Empieza por una categoría o busca una descripción concreta desde la página de inicio. Al pulsar el botón de búsqueda se abren los resultados correspondientes en el catálogo externo. Revisa el título, las fotografías y las opciones disponibles: aparecer en una búsqueda no demuestra que un producto cumpla todos los detalles de la frase utilizada.</p><p>Guarda una fila por variante, con su URL final, color, talla, medidas, moneda y fecha de consulta. Añade una columna para las preguntas pendientes. Si una ficha no explica cómo mide una prenda, deja ese dato sin confirmar; no lo sustituyas por la tabla de otro artículo parecido.</p><p>Una lista corta facilita una comparación real. Conserva el motivo por el que elegiste cada candidato: una abertura suficientemente amplia, una tabla de medidas comprensible o una forma que se ajuste a tu uso. El precio aislado no permite saber si dos variantes son equivalentes.</p><h2>Qué hacer cuando un enlace cambia o deja de funcionar</h2><p>Vuelve a la categoría y busca la descripción del producto. Comprueba de nuevo vendedor, fotos y opciones antes de considerar un resultado como sustituto. Una redirección puede terminar en otro artículo o en una página general. No copies el precio de una hoja antigua como si fuera una oferta vigente.</p><p>La fecha de revisión de esta guía corresponde a su contenido editorial. No significa que se supervise continuamente el stock o el precio de todos los destinos. La información decisiva es la que aparece en la ficha y en el proceso de compra que vayas a utilizar.</p><h2>Guías para comparar cada tipo de producto</h2><p>Consulta los artículos en inglés sobre <a href="/articles/hacoo-shoes-finds/" hreflang="en">calzado y tallas</a>, <a href="/articles/hacoo-clothing-finds/" hreflang="en">ropa y medidas</a> y <a href="/articles/hacoo-bags-accessories/" hreflang="en">bolsos y capacidad</a>. Para los plazos publicados de Hacoo, utiliza nuestra <a href="/es/guides/shipping/">guía de envío en español</a>. Si ya tienes un pedido, identifica primero la empresa que lo aceptó y el transportista indicado en su confirmación.</p>`
};

const shippingAddition = `<h2>How long does Hacoo take to deliver to the UK?</h2><p>The UK appears in the regional receiving-time row above. Use that row when comparing the published guidance with your order, rather than the separate fastest-express wording. A range is useful for planning, but the information shown for your particular order and current carrier record is more specific.</p><h2>Read the delivery clock correctly</h2><p>Write down when the purchase was accepted, whether the order has a dispatch confirmation, and what the latest carrier event actually says. These are separate milestones. A tracking page refreshed today may still contain an older event. Keep the event timestamp alongside the status so a later comparison measures new information rather than a new page visit.</p><p>Receiving time already combines preparation and transport in Hacoo's explanation. Do not add the preparation estimate to a published total again. Conversely, a transport estimate on its own does not tell you when preparation will finish. If the order confirmation is unclear about which period it describes, ask the provider before using it to plan a deadline.</p><h2>What to check when the expected period has passed</h2><ol><li>Confirm the order provider and the destination country on the confirmation.</li><li>Compare the stated estimate with the latest carrier event, preserving both dates.</li><li>Check whether the order lists more than one parcel or an item awaiting dispatch.</li><li>Send the relevant order number, parcel reference and status to the responsible support team.</li></ol><p>The <a href="/articles/hacoo-order-tracking/">Hacoo order tracking guide</a> explains stalled updates, split parcels and delivered-but-missing records. It includes a support checklist and separates general status language from the carrier-specific definitions. This website cannot access an order or change a delivery record.</p><h2>Plan around the information you actually have</h2><p>If an item is needed for a fixed event, record that deadline separately from the estimated delivery range. Do not treat an optimistic edge of the range as a confirmed appointment. Preserve any specific commitment made by the provider with the order record and revisit the estimate when a meaningful shipment update appears.</p><p>For an address error, contact the order provider promptly and use the <a href="/articles/change-hacoo-shipping-address/">address correction guide</a> to prepare the details. Updating an address saved in an account should not be assumed to redirect a parcel already dispatched. For an external catalogue purchase, apply the final provider's terms and support process.</p>`;

const reviewAddition = `<h2>Match the review evidence to the product decision</h2><div class="compare-wrap"><table class="compare-table"><thead><tr><th>Your decision</th><th>Useful review context</th><th>Still needs checking</th></tr></thead><tbody><tr><td>Shoe size</td><td>Exact model, selected size and measurement method</td><td>The chart for your chosen listing</td></tr><tr><td>Clothing fit</td><td>Garment measurements and the wearer's fit preference</td><td>Whether the same variant is still offered</td></tr><tr><td>Bag capacity</td><td>Objects shown inside and views of the opening</td><td>Your own largest item and usable compartment dimensions</td></tr><tr><td>Delivery experience</td><td>Order date, destination and named provider</td><td>The current estimate for your own order</td></tr></tbody></table></div><p>Use the <a href="/articles/hacoo-shoes-finds/">shoe comparison guide</a>, <a href="/articles/hacoo-clothing-finds/">clothing measurement guide</a> and <a href="/articles/hacoo-bags-accessories/">bag dimension guide</a> to turn a recommendation into a specific question. A positive comment is useful only within the context it actually supplies. Missing measurements should remain unknown rather than being replaced by assumptions.</p><p>For delivery claims, keep the purchase provider separate from the website that first linked the product. A creator may describe an order from a different destination or time period. The <a href="/articles/hacoo-order-tracking/">tracking workflow</a> helps organize your own order evidence, which is more relevant to a current support request than someone else's headline delivery time.</p>`;

export function refreshEditorial() {
  const manifest = JSON.parse(read("scripts/editorial-articles.json"));
  const records = manifest.map((entry, index) => {
    const html = read(`articles/${entry.slug}/index.html`);
    return { ...entry, index, title: plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]).replace(/\.$/, ""), description: descriptionOf(html) };
  }).sort((a, b) => b.published.localeCompare(a.published) || a.index - b.index);
  const newest = records.filter((article) => article.published === date).slice(0, 4);
  const changed = new Set();
  const save = (file, html) => { write(file, html); changed.add(file); };
  function card(article, code, compact = false) {
    const [title, description] = translations[article.slug]?.[code] || [article.title, article.description];
    const tag = compact ? "h3" : "h2";
    return `<a class="${compact ? "latest-guide-card" : "article-card"}" href="/articles/${article.slug}/"${code === "en" ? "" : ' hreflang="en"'}>${article.image ? `<img class="article-card-image" src="/assets/images/${article.image}" alt="" width="96" height="96" loading="lazy">` : ""}<span class="article-tag">${labels[code][4]}</span><${tag}>${escape(title)}</${tag}><p>${escape(description)}</p><span class="article-card-link">${labels[code][2]} →</span></a>`;
  }
  for (const code of locales) {
    const base = languagePath(code);
    const hub = `${base}articles/index.html`;
    let html = read(hub);
    html = html.replace(/<div class="article-grid">([\s\S]*?)<\/div>/, (_, current) => {
      const guides = (current.match(/<a class="article-card\b[\s\S]*?<\/a>/g) || []).filter((anchor) => /href="[^\"]*(?:guides\/|faq\/)/.test(anchor));
      if (guides.length !== 6) throw new Error(`Expected six evergreen guides in ${hub}, got ${guides.length}`);
      return `<div class="article-grid">${records.map((article) => card(article, code)).join("\n")}${guides.join("\n")}</div>`;
    });
    html = html.replace(/September 4, 2026/g, "October 4, 2026");
    save(hub, syncMetadata(html));
    const home = `${base}index.html`;
    html = read(home);
    const latest = `<section class="section latest-guides"><div class="shell"><div class="section-head"><div><p class="eyebrow">${labels[code][0]}</p><h2>${labels[code][1]}</h2></div><a class="btn btn-small" href="/${base}articles/">${labels[code][3]} →</a></div><div class="latest-guides-grid">${newest.map((article) => card(article, code, true)).join("\n")}</div></div></section>`;
    html = html.replace(/<!-- latest-guides:start -->[\s\S]*?<!-- latest-guides:end -->\s*/, "");
    html = replaceBlock(html, "latest-guides", latest, '<section class="section section-soft home-steps">');
    html = html.replace(/Updated July 2026/g, "Updated October 2026").replace(/Mis à jour en juillet 2026/g, "Mis à jour en octobre 2026").replace(/Aktualisiert Juli 2026/g, "Aktualisiert Oktober 2026").replace(/Aggiornato settembre 2026/g, "Aggiornato ottobre 2026").replace(/Actualizado en julio de 2026/g, "Actualizado en octubre de 2026");
    html = html.replace(/(<div class="footer-bottom">[\s\S]*?<\/div>)/, (footer) => footer.replace("July 14, 2026", "October 4, 2026").replace("14 juillet 2026", "4 octobre 2026").replace("14. Juli 2026", "4. Oktober 2026").replace("14 luglio 2026", "4 ottobre 2026").replace("4 settembre 2026", "4 ottobre 2026").replace("14 de julio de 2026", "4 de octubre de 2026"));
    if (code === "fr") html = syncMetadata(html, "Hacoo site en ligne : application, produits et livraison", "Hacoo site en ligne : guide indépendant pour trouver des produits, vérifier les liens, comparer les tailles et consulter les délais de livraison.", "Hacoo site en ligne : produits, application et livraison");
    if (code === "it") html = syncMetadata(html, "Hacoo Sito: Prodotti, App e Consegna | Guida 2026", "Hacoo sito e acquisti: guida indipendente a scarpe, abbigliamento e borse, con controlli su link, taglie, app ufficiale e consegna.", "Hacoo sito: prodotti, app e consegna");
    save(home, html);
  }
  for (const code of ["en", "es"]) {
    const file = `${languagePath(code)}guides/what-is-hacoo-spreadsheet/index.html`;
    let html = replaceBlock(read(file), "spreadsheet-routes", spreadsheetBlocks[code], '</article>');
    if (code === "es") html = syncMetadata(html, "Hacoo Spreadsheet 2026: Enlaces y Categorías", "Hacoo spreadsheet con enlaces por categoría: calzado, ropa, bolsos y accesorios. Aprende a comparar variantes y comprobar el destino antes de comprar.", "Hacoo spreadsheet 2026: enlaces y categorías");
    else html = syncMetadata(html, "Hacoo Spreadsheet 2026: Shoe, Clothing & Bag Links", "Explore Hacoo spreadsheet links by category: shoes, clothing, bags and accessories. Compare live listings, sizing and destinations before choosing.", "Hacoo spreadsheet 2026: links by category");
    html = html.replace(/Reviewed September 4, 2026/g, "Reviewed October 4, 2026");
    save(file, html);
  }
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
  for (const article of newest) changed.add(`articles/${article.slug}/index.html`);
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
  console.log(`Refreshed ${records.length} editorial articles, five hubs and five homepages.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) refreshEditorial();
