import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectRoot, "public");
const socialDir = join(publicDir, "images", "social");
const guideSourceDir = join(publicDir, "images", "guides");
const guideSocialDir = join(guideSourceDir, "social");

mkdirSync(socialDir, { recursive: true });
mkdirSync(guideSocialDir, { recursive: true });

const logoData = readFileSync(join(publicDir, "logo-allchinabuy.png")).toString("base64");

const cards = [
  ["finds", "RESEARCH FINDS", "Independent China Shopping Finds", "Source-matched products with clear checks and exact routes."],
  ["guides", "PRACTICAL GUIDES", "Fact-Checked AllChinaBuy Guides", "Source-linked workflows for orders, QC, packing and shipping."],
  ["faq", "STRAIGHT ANSWERS", "AllChinaBuy FAQ: Orders, QC, Packing & Shipping", "30 researched answers tied to public source pages."],
  ["spreadsheet", "SEARCHABLE DIRECTORY", "AllChinaBuy Spreadsheet Alternative", "Product routes with context, checks and mobile-friendly search."],
  ["about", "ABOUT THE DIRECTORY", "About This Independent Directory", "Why this independent research layer exists and how it works."],
  ["contact", "CONTACT & CORRECTIONS", "Send the Right Question to the Right Place", "Editorial corrections here; order support at the transaction platform."],
  ["disclaimer", "IMPORTANT DISCLOSURE", "Independent Website Disclaimer", "Clear ownership, evidence and transaction boundaries."],
  ["privacy", "PRIVACY NOTICE", "A Directory With Minimal Data Needs", "How searches, technical requests and outbound sites are handled."],
  ["reviews", "EDITORIAL METHOD", "Reviewed Links, Clearly Limited Claims", "What a route check proves—and what it cannot prove."],
  ["terms", "TERMS OF USE", "Use the Directory as a Research Starting Point", "The terms for using this independent editorial directory."],
  ["home-fr", "GUIDE INDÉPENDANT", "Trouvez plus vite de meilleurs liens d’achat en Chine", "Sélections, vérification des liens et guides pratiques."],
  ["home-de", "UNABHÄNGIGER RATGEBER", "Bessere China-Shopping-Links. Schneller gefunden", "Kuratierte Ideen, Link-Prüfungen und praktische Leitfäden."],
  ["home-it", "GUIDA INDIPENDENTE", "Trova link migliori per acquistare dalla Cina", "Prodotti selezionati, controllo dei link e guide pratiche."],
  ["home-es", "GUÍA INDEPENDIENTE", "Encuentra mejores enlaces de compra en China", "Productos seleccionados, revisión de enlaces y guías prácticas."],
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapWords(value, maxCharacters = 34) {
  const lines = [];
  let line = "";
  for (const word of value.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

async function createCard([filename, eyebrow, title, description]) {
  const titleLines = wrapWords(title);
  const titleSize = titleLines.length === 3 ? 54 : 62;
  const titleStart = titleLines.length === 1 ? 286 : titleLines.length === 2 ? 250 : 218;
  const titleMarkup = titleLines
    .map((line, index) => `<text x="72" y="${titleStart + index * 68}" class="title">${escapeXml(line)}</text>`)
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <style>
        .eyebrow { font: 700 20px 'Nimbus Sans', Arial, sans-serif; letter-spacing: 3px; fill: #626257; }
        .title { font: 700 ${titleSize}px 'Nimbus Sans', Arial, sans-serif; fill: #10110f; }
        .desc { font: 400 24px 'Nimbus Sans', Arial, sans-serif; fill: #34352f; }
        .domain { font: 700 22px 'Nimbus Sans', Arial, sans-serif; letter-spacing: 1px; fill: #ffffff; }
        .mark { font: 700 16px 'Nimbus Sans', Arial, sans-serif; letter-spacing: 2px; fill: #10110f; }
      </style>
      <rect width="1200" height="630" fill="#f4eedf"/>
      <rect width="1200" height="112" fill="#10110f"/>
      <rect x="0" y="112" width="22" height="453" fill="#c8ff2e"/>
      <rect x="22" y="112" width="1178" height="1" fill="#10110f" opacity="0.28"/>
      <rect x="1020" y="112" width="180" height="453" fill="#ebe4d5"/>
      <circle cx="1108" cy="212" r="55" fill="#c8ff2e"/>
      <circle cx="1108" cy="212" r="38" fill="none" stroke="#10110f" stroke-width="2"/>
      <text x="1108" y="207" class="mark" text-anchor="middle">INDEPENDENT</text>
      <text x="1108" y="229" class="mark" text-anchor="middle">NOT OFFICIAL</text>
      <g fill="#10110f" opacity="0.34">
        ${Array.from({ length: 30 }, (_, index) => {
          const x = 1048 + (index % 6) * 24;
          const y = 344 + Math.floor(index / 6) * 24;
          return `<circle cx="${x}" cy="${y}" r="3"/>`;
        }).join("")}
      </g>
      <rect x="58" y="29" width="322" height="54" rx="7" fill="#ffffff"/>
      <image x="70" y="37" width="298" height="44" href="data:image/png;base64,${logoData}" preserveAspectRatio="xMidYMid meet"/>
      <text x="72" y="171" class="eyebrow">${escapeXml(eyebrow)}</text>
      ${titleMarkup}
      <text x="72" y="500" class="desc">${escapeXml(description)}</text>
      <rect x="0" y="565" width="1200" height="65" fill="#10110f"/>
      <text x="72" y="606" class="domain">ALLCHINABUY.PRO</text>
      <rect x="927" y="585" width="201" height="5" fill="#c8ff2e"/>
    </svg>`;
  await sharp(Buffer.from(svg))
    .webp({ quality: 84, effort: 6 })
    .toFile(join(socialDir, `${filename}.webp`));
}

for (const card of cards) await createCard(card);

for (const filename of readdirSync(guideSourceDir).filter((name) => name.endsWith(".svg"))) {
  await sharp(join(guideSourceDir, filename))
    .resize({ width: 1200, height: 630, fit: "contain", background: "#f4eedf" })
    .webp({ quality: 84, effort: 6 })
    .toFile(join(guideSocialDir, basename(filename, ".svg") + ".webp"));
}

console.log(`Generated ${cards.length} page cards and ${readdirSync(guideSocialDir).length} guide cards.`);
