import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parseHTML } = require("linkedom");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const baselineRoot = "/tmp/kakobuys-pro-baseline-20260730";
const site = "https://kakobuys.pro";
const locales = ["en", "pl", "de", "fr", "es", "it"];

const categories = {
  shoes: {
    en: "Shoes",
    pl: "Buty",
    description: "sneakers, runners and everyday footwear",
    descriptionPl: "sneakersy, buty sportowe i obuwie codzienne",
    title: "Kakobuy Buty: arkusz produktów i przewodnik QC"
  },
  hoodies: {
    en: "Hoodies",
    pl: "Bluzy",
    description: "pullover, zip and heavyweight layers",
    descriptionPl: "bluzy wkładane przez głowę, rozpinane i grubsze warstwy",
    title: "Kakobuy Bluzy: arkusz produktów i przewodnik QC"
  },
  "t-shirts": {
    en: "T-Shirts",
    pl: "T-shirty",
    description: "graphic, basic and oversized tees",
    descriptionPl: "koszulki z grafiką, podstawowe i oversize",
    title: "Kakobuy T-shirty: arkusz produktów i przewodnik QC"
  },
  jackets: {
    en: "Jackets",
    pl: "Kurtki",
    description: "seasonal shells, puffers and overshirts",
    descriptionPl: "kurtki sezonowe, puchowe i koszule wierzchnie",
    title: "Kakobuy Kurtki: arkusz produktów i przewodnik QC"
  },
  bags: {
    en: "Bags",
    pl: "Torby",
    description: "backpacks, crossbody and travel bags",
    descriptionPl: "plecaki, torby na ramię i torby podróżne",
    title: "Kakobuy Torby: arkusz produktów i przewodnik QC"
  },
  accessories: {
    en: "Accessories",
    pl: "Akcesoria",
    description: "watches, eyewear and small essentials",
    descriptionPl: "zegarki, okulary i drobne akcesoria",
    title: "Kakobuy Akcesoria: arkusz produktów i przewodnik QC"
  },
  "pants-shorts": {
    en: "Pants & Shorts",
    pl: "Spodnie i szorty",
    description: "denim, cargos, sweatpants and summer bottoms",
    descriptionPl: "jeansy, bojówki, spodnie dresowe i szorty",
    title: "Kakobuy Spodnie i szorty: arkusz produktów i przewodnik QC"
  },
  headwear: {
    en: "Headwear",
    pl: "Nakrycia głowy",
    description: "caps, beanies and seasonal hats",
    descriptionPl: "czapki z daszkiem, zimowe i sezonowe",
    title: "Kakobuy Nakrycia głowy: arkusz produktów i przewodnik QC"
  },
  jerseys: {
    en: "Jerseys",
    pl: "Koszulki sportowe",
    description: "football, basketball and retro sports tops",
    descriptionPl: "koszulki piłkarskie, koszykarskie i retro",
    title: "Kakobuy Koszulki sportowe: arkusz produktów i przewodnik QC"
  },
  electronics: {
    en: "Electronics",
    pl: "Elektronika",
    description: "headphones, small devices and desk accessories",
    descriptionPl: "słuchawki, małe urządzenia i akcesoria biurkowe",
    title: "Kakobuy Elektronika: arkusz produktów i przewodnik QC"
  }
};

const polishArticleMeta = {
  "how-to-read-kakobuy-qc-photos": [
    "Przewodnik QC",
    "Jak czytać zdjęcia QC Kakobuy przed wysyłką",
    "Praktyczna kolejność kontroli kształtu, wymiarów, szwów, etykiet i ryzyka linku sprzedawcy — bez przypisywania zdjęciom większej pewności, niż naprawdę dają."
  ],
  "kakobuy-spreadsheet-vs-search": [
    "Proces zakupowy",
    "Kakobuy Spreadsheet czy wyszukiwarka: co szybciej znajduje produkty?",
    "Arkusz pomaga odkrywać produkty, a indeks wyszukiwania weryfikuje aktualne wyniki. Ten poradnik pokazuje mocne strony i ograniczenia obu metod."
  ],
  "warehouse-storage-and-returns": [
    "Zasady magazynu",
    "Magazyn Kakobuy, zwroty i pięciodniowy termin",
    "Co publiczne materiały Kakobuy mówią o bezpłatnym magazynowaniu i kwalifikujących się zwrotach oraz co sprawdzić przed poleganiem na terminie."
  ],
  "kakobuy-shipping-cost-estimate": [
    "Koszt wysyłki",
    "Koszt wysyłki Kakobuy: jak oszacować go przed nadaniem paczki",
    "Praktyczna metoda szacowania frachtu międzynarodowego, porównywania założeń paczki i unikania traktowania kalkulatora jak gwarantowanej wyceny."
  ],
  "how-to-use-kakobuy-step-by-step": [
    "Dla początkujących",
    "Jak korzystać z Kakobuy: zakup i wysyłka krok po kroku",
    "Proces od sprawdzenia linku źródłowego przez magazynowe QC i planowanie paczki po dostawę, z wyraźnym rozdzieleniem dwóch płatności."
  ],
  "buy-from-taobao-with-kakobuy": [
    "Poradnik Taobao",
    "Jak kupować z Taobao przez Kakobuy bez utraty danych wariantu",
    "Metoda zachowania sprzedawcy, wariantu, rozmiaru i ceny podczas przenoszenia linku Taobao do Kakobuy."
  ],
  "buy-from-weidian-with-kakobuy": [
    "Poradnik Weidian",
    "Jak kupować z Weidian przez Kakobuy: link, wariant i sprzedawca",
    "Uważny proces zachowania ID produktu, kontekstu sprzedawcy, instrukcji wariantu, dowodów magazynowych i decyzji o paczce."
  ],
  "kakobuy-volumetric-weight-parcel-packing": [
    "Planowanie paczki",
    "Waga objętościowa Kakobuy: jak rozmiar paczki zmienia koszt wysyłki",
    "Różnica między wagą rzeczywistą, wymiarową i rozliczeniową oraz sposób porównywania wariantów pakowania według zasad aktualnej trasy."
  ],
  "kakobuy-shoes-spreadsheet-qc-guide": [
    "QC obuwia",
    "Kakobuy Shoes Spreadsheet: kontrola QC wykraczająca poza zdjęcie z przodu",
    "Arkusz służy do odkrywania, a aktualna oferta, system rozmiarów, symetria pary, linia podeszwy i pomiary służą do weryfikacji."
  ],
  "kakobuy-hoodie-streetwear-qc-guide": [
    "QC odzieży",
    "Kakobuy bluzy i streetwear: wymiary, nadruki i konstrukcja",
    "Kontrola bluz i streetwearu obejmująca źródło, rzeczywiste wymiary, panele, ściągacze, kieszenie i położenie grafiki."
  ],
  "kakobuy-tracking-purchase-order-parcel": [
    "Śledzenie",
    "Śledzenie Kakobuy: zamówienie zakupu a paczka międzynarodowa",
    "Który numer śledzenia jest właściwy, czym różni się droga do magazynu od transportu międzynarodowego i jakie dowody wysłać przy zatrzymanym statusie."
  ],
  "kakobuy-reviews-evidence-checklist": [
    "Analiza opinii",
    "Opinie o Kakobuy: jak czytać komentarze klientów bez wybierania wygodnych historii",
    "Oparta na dowodach metoda oceny opinii z aplikacji, serwisów recenzji i społeczności bez zamieniania pojedynczych doświadczeń w gwarancje."
  ]
};

const commonTranslations = new Map([
  ["Main navigation", "Główna nawigacja"],
  ["Mobile navigation", "Nawigacja mobilna"],
  ["Choose language", "Wybierz język"],
  ["Browse all finds", "Przeglądaj znaleziska"],
  ["Catalog", "Katalog"],
  ["QC Guides", "Poradniki QC"],
  ["SEO Articles", "Artykuły SEO"],
  ["About", "O nas"],
  ["Home", "Strona główna"],
  ["Explore", "Odkrywaj"],
  ["Product catalog", "Katalog produktów"],
  ["Questions", "Pytania"],
  ["Project", "Projekt"],
  ["About & sources", "O nas i źródła"],
  ["Privacy", "Prywatność"],
  ["Terms", "Warunki"],
  ["Research preview", "Status badań"],
  ["Research status", "Status badań"],
  ["Core facts reviewed July 29, 2026.", "Najważniejsze fakty sprawdzono 29 lipca 2026 r."],
  ["Expansion facts reviewed July 30, 2026.", "Fakty w rozszerzonych materiałach sprawdzono 30 lipca 2026 r."],
  ["Independent Kakobuy spreadsheet research, QC education and product-link discovery.", "Niezależne badania Kakobuy spreadsheet, edukacja QC i katalog linków produktowych."],
  ["Not affiliated with Kakobuy or any marketplace or brand referenced.", "Serwis nie jest powiązany z Kakobuy ani z wymienionymi platformami lub markami."],
  ["Independent resource.", "Niezależny materiał."],
  ["Menu", "Menu"]
  ,["Finds Index", "Indeks znalezisk"]
  ,["QC Fieldwork", "Metoda QC"]
  ,["Research Files / Articles", "Badania / Artykuły"]
  ,["FAQ / Help Desk", "FAQ / Pomoc"]
  ,["The Desk", "Redakcja"]
  ,["Open product index", "Otwórz katalog produktów"]
  ,["Contents", "Menu"]
  ,["Fieldwork", "Materiały"]
  ,["Editorial desk", "Redakcja"]
  ,["Method & sources", "Metoda i źródła"]
  ,["Current issue", "Bieżące wydanie"]
  ,["Policy references checked 30 July 2026.", "Źródła zasad sprawdzono 30 lipca 2026 r."]
  ,["Independent Kakobuy spreadsheet discovery and QC literacy for shoppers researching the buying workflow.", "Niezależny katalog Kakobuy spreadsheet i materiały QC dla osób analizujących proces zakupowy."]
  ,["Independent publication; not operated by Kakobuy, a marketplace or a referenced brand.", "Niezależna publikacja; nie jest prowadzona przez Kakobuy, platformę handlową ani wymienioną markę."]
]);

const homeTranslations = new Map([
  ["Kakobuy spreadsheet finds · Updated 2026", "Kakobuy spreadsheet · Aktualizacja 2026"],
  ["Kakobuy spreadsheet finds", "Produkty Kakobuy spreadsheet"],
  ["with prices, categories and QC.", "z cenami, kategoriami i kontrolą QC."],
  ["Browse Kakobuy shoes, hoodies, bags, jerseys and more. Compare current source titles, reference prices, size or specification checks and direct product routes before you buy.", "Przeglądaj buty, bluzy, torby, koszulki sportowe i inne produkty. Przed zakupem porównaj aktualny tytuł źródłowy, cenę orientacyjną, rozmiar lub specyfikację oraz bezpośrednią trasę produktu."],
  ["Search the product index", "Przeszukaj indeks produktów"],
  ["Search finds", "Szukaj produktów"],
  ["✓ 80 checked product routes", "✓ 80 sprawdzonych tras produktowych"],
  ["✓ 10 shopping categories", "✓ 10 kategorii zakupowych"],
  ["✓ USD reference prices", "✓ Orientacyjne ceny USD"],
  ["Product QC preview", "Podgląd kontroli QC"],
  ["Kakobuy shoes check", "Kontrola butów Kakobuy"],
  ["Size + QC", "Rozmiar + QC"],
  ["Overall shape", "Ogólny kształt"],
  ["Compare both sides", "Porównaj obie strony"],
  ["Sole alignment", "Ułożenie podeszwy"],
  ["Look for tilt", "Sprawdź przechylenie"],
  ["Size label", "Metka rozmiaru"],
  ["Match the order", "Porównaj z zamówieniem"],
  ["Illustration only—not a seller QC photograph.", "Wyłącznie ilustracja — nie jest to zdjęcie QC sprzedawcy."],
  ["Products listed", "Liczba produktów"],
  ["80 product routes", "80 tras produktowych"],
  ["Price display", "Prezentacja ceny"],
  ["CNY source + USD reference", "Cena źródłowa CNY + orientacyjne USD"],
  ["Size checks", "Kontrola rozmiaru"],
  ["Category-specific", "Dostosowana do kategorii"],
  ["Buying path", "Ścieżka zakupu"],
  ["Product page first", "Najpierw strona produktu"],
  ["Kakobuy product categories", "Kategorie produktów Kakobuy"],
  ["Shop Kakobuy finds by category.", "Przeglądaj produkty Kakobuy według kategorii."],
  ["View all 80 products", "Zobacz wszystkie 80 produktów"],
  ["Browse category", "Przeglądaj kategorię"],
  ["Popular Kakobuy finds", "Popularne produkty Kakobuy"],
  ["Popular products with price and QC details.", "Popularne produkty z ceną i szczegółami QC."],
  ["Each card opens a Kakobuys.pro product page with the source title, marketplace item ID, image, CNY price, USD reference conversion and category-specific QC checks.", "Każda karta otwiera stronę produktu Kakobuys.pro z tytułem źródłowym, ID, zdjęciem, ceną CNY, orientacyjnym przeliczeniem USD i kontrolą QC właściwą dla kategorii."],
  ["Show 12 more products", "Pokaż 12 kolejnych produktów"],
  ["Source-page names, IDs, CNY prices and first images were checked on July 30, 2026. USD figures are reference conversions, not checkout quotes.", "Nazwy, ID, ceny CNY i pierwsze zdjęcia sprawdzono 30 lipca 2026 r. Kwoty USD są przeliczeniem orientacyjnym, a nie wyceną końcową."],
  ["Use the spreadsheet for discovery, verify the exact product and variant, inspect warehouse evidence, then compare current parcel options.", "Użyj arkusza do odkrywania, potwierdź dokładny produkt i wariant, sprawdź dowody magazynowe, a następnie porównaj aktualne opcje paczki."],
  ["Find the product. Check size and QC. Then buy.", "Znajdź produkt. Sprawdź rozmiar i QC. Dopiero potem kup."],
  ["Read the Kakobuy QC guide", "Przeczytaj poradnik QC Kakobuy"],
  ["Find a listing", "Znajdź ofertę"],
  ["Search by category, product type or marketplace item ID.", "Szukaj według kategorii, typu produktu lub ID z platformy."],
  ["Confirm the destination", "Potwierdź stronę docelową"],
  ["Check the title, seller link, variant and current price.", "Sprawdź tytuł, link sprzedawcy, wariant i aktualną cenę."],
  ["Read QC in order", "Czytaj QC w ustalonej kolejności"],
  ["Shape → measurements → construction → labels → defects.", "Kształt → pomiary → konstrukcja → etykiety → wady."],
  ["Decide before dispatch", "Podejmij decyzję przed wysyłką"],
  ["Resolve visible issues while warehouse options remain open.", "Rozwiąż widoczne problemy, dopóki dostępne są opcje magazynowe."],
  ["Kakobuy guides", "Poradniki Kakobuy"],
  ["Kakobuy shipping, QC and buying guides.", "Poradniki wysyłki, QC i zakupów Kakobuy."],
  ["Browse all 12 guides", "Zobacz wszystkie 12 poradników"],
  ["Read research note", "Czytaj analizę"],
  ["Find practical answers about product links, warehouse photos, size checks, consolidation, restricted goods and shipping estimates.", "Znajdź praktyczne odpowiedzi o linkach produktowych, zdjęciach magazynowych, rozmiarach, łączeniu paczek, ograniczeniach i kosztach wysyłki."],
  ["Product, QC, size and shipping questions.", "Pytania o produkty, QC, rozmiary i wysyłkę."],
  ["Read all FAQs", "Przeczytaj wszystkie odpowiedzi"],
  ["Open a product page, match its image and item ID, verify the selected variant and continue only when the destination listing matches.", "Otwórz stronę produktu, dopasuj zdjęcie i ID, sprawdź wybrany wariant i przejdź dalej tylko wtedy, gdy oferta docelowa się zgadza."],
  ["Browse products by category, price and QC.", "Przeglądaj produkty według kategorii, ceny i QC."],
  ["Browse all products", "Przeglądaj wszystkie produkty"]
]);

const catalogTranslations = new Map([
  ["Kakobuy spreadsheet catalog", "Katalog Kakobuy spreadsheet"],
  ["Browse by product type.", "Przeglądaj według typu produktu."],
  ["Each category pairs a focused product search with a short QC checklist. Product availability and seller links can change, so re-check the destination before ordering.", "Każda kategoria łączy ukierunkowane wyszukiwanie z krótką listą QC. Dostępność i link sprzedawcy mogą się zmienić, dlatego przed zakupem ponownie sprawdź stronę docelową."],
  ["Search products by keyword", "Szukaj produktów według słowa kluczowego"],
  ["focused category guides", "ukierunkowanych kategorii"],
  ["Read QC checks", "Zobacz kontrolę QC"]
]);

const articleIndexTranslations = new Map([
  ["Evidence-led library", "Biblioteka oparta na dowodach"],
  ["Kakobuy research for decisions people actually make.", "Badania Kakobuy pomocne w rzeczywistych decyzjach zakupowych."],
  ["Twelve complete English guides separate observable facts, dated platform information, editorial methods and the limits of third-party reports.", "Dwanaście pełnych poradników oddziela widoczne fakty, datowane informacje platformy, metody redakcyjne i ograniczenia relacji osób trzecich. Trzy pełne artykuły są dostępne po polsku, a pozostałe prowadzą do pełnych wersji angielskich."],
  ["Published research", "Opublikowane materiały"],
  ["12 complete articles", "12 kompletnych artykułów"],
  ["Each article has one primary search intent. New topics are checked against the topic map before publication to reduce repetition and keyword cannibalisation.", "Każdy artykuł ma jedną główną intencję wyszukiwania. Nowe tematy są porównywane z mapą treści, aby ograniczyć powtórzenia i kanibalizację słów kluczowych."],
  ["Editorial standard", "Standard redakcyjny"],
  ["Articles name the review date, distinguish official statements from examples, avoid invented customer stories and link readers back to independent product records.", "Artykuły podają datę weryfikacji, odróżniają oficjalne informacje od przykładów, nie wymyślają historii klientów i kierują do niezależnych zapisów produktów."],
  ["Read article", "Czytaj artykuł"],
  ["Updated", "Aktualizacja"]
]);

function routePath(route) {
  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

function localeRoute(route, locale) {
  const clean = routePath(route);
  if (locale === "en") return clean;
  return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

function outputFile(route) {
  const clean = routePath(route);
  return clean === "/"
    ? path.join(root, "pl", "index.html")
    : path.join(root, "pl", clean.slice(1), "index.html");
}

function mapForRoute(route) {
  const map = new Map([...commonTranslations, ...homeTranslations, ...catalogTranslations, ...articleIndexTranslations]);
  const categoryMatch = route.match(/^\/catalog\/([^/]+)\/?$/);
  if (categoryMatch) {
    const profile = categories[categoryMatch[1]];
    if (profile) {
      map.set(profile.en, profile.pl);
      map.set(profile.description, profile.descriptionPl);
      map.set("Category shopping snapshot", "Podsumowanie kategorii");
      map.set("Products", "Produkty");
      map.set("8 checked routes", "8 sprawdzonych tras");
      map.set("USD reference range", "Zakres cen referencyjnych USD");
      map.set("Size / specification focus", "Rozmiar / specyfikacja");
      map.set("Last catalog check", "Ostatnia kontrola katalogu");
      map.set("July 30, 2026", "30 lipca 2026 r.");
      map.set("Use this page to narrow your search and review the most useful visible checks for", "Ta strona pomaga zawęzić wyszukiwanie i przejrzeć najważniejsze widoczne kontrole dla");
    }
  }
  for (const profile of Object.values(categories)) {
    map.set(profile.en, profile.pl);
    map.set(profile.description[0].toUpperCase() + profile.description.slice(1), profile.descriptionPl[0].toUpperCase() + profile.descriptionPl.slice(1));
  }
  for (const meta of Object.values(polishArticleMeta)) {
    map.set(meta[0], meta[0]);
  }
  return map;
}

function extractObject(source, name) {
  const marker = `${name}={`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find ${name} in localized bundle`);
  const start = markerIndex + marker.length - 1;
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return vm.runInNewContext(`(${source.slice(start, index + 1)})`);
      }
    }
  }
  throw new Error(`Unclosed ${name} object in localized bundle`);
}

function textLeafPairs(english, translated, pairs = new Map()) {
  if (typeof english === "string" && typeof translated === "string") {
    pairs.set(english, translated);
    return pairs;
  }
  if (!english || !translated || typeof english !== "object" || typeof translated !== "object") {
    return pairs;
  }
  for (const key of Object.keys(english)) {
    if (Object.hasOwn(translated, key)) textLeafPairs(english[key], translated[key], pairs);
  }
  return pairs;
}

function translateText(document, translations) {
  for (const element of document.querySelectorAll("*")) {
    for (const node of element.childNodes) {
      if (node.nodeType !== 3) continue;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) continue;
      const replacement = translations.get(trimmed);
      if (replacement !== undefined) node.nodeValue = raw.replace(trimmed, replacement);
    }
    for (const attribute of ["aria-label", "placeholder", "title"]) {
      const value = element.getAttribute?.(attribute);
      if (value && translations.has(value)) element.setAttribute(attribute, translations.get(value));
    }
  }
}

function setText(node, text) {
  if (node && text !== undefined) node.textContent = text;
}

function pageFile(directory, route) {
  const clean = routePath(route);
  return clean === "/"
    ? path.join(directory, "index.html")
    : path.join(directory, clean.slice(1), "index.html");
}

function productMap() {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, "assets", "product-catalog.json"), "utf8"));
  return {
    ...catalog,
    productsByPage: new Map(catalog.products.map((product) => [String(product.page), product]))
  };
}

function polishQc(category, catalogCopy) {
  const english = catalogCopy.qc.en[category] || [];
  const titles = catalogCopy.qcTitles.pl[category] || english.map((item) => item[0]);
  const descriptions = catalogCopy.qcDescriptions.pl[category] || english.map((item) => item[1]);
  return english.map((item, index) => [titles[index] || item[0], descriptions[index] || item[1]]);
}

function normalizePolishDocument(document, route) {
  const base = routePath(route);
  const own = localeRoute(base, "pl");
  const productMatch = base.match(/^\/products\/(\d+)\/$/);
  const profile = base.match(/^\/catalog\/([^/]+)\/$/)?.[1];
  const metaTitle = {
    "/": "Kakobuy Spreadsheet 2026: produkty, ceny i QC | Kakobuys.pro",
    "/catalog/": "Katalog Kakobuy Spreadsheet 2026 | Kakobuys.pro",
    "/articles/": "Poradniki Kakobuy, badania QC i wysyłka | Kakobuys.pro",
    "/guides/": "Przewodnik QC Kakobuy: zakupy, magazyn i paczka | Kakobuys.pro",
    "/faq/": "Kakobuy FAQ: QC, magazyn, zwroty i wysyłka | Kakobuys.pro"
  };
  if (metaTitle[base]) document.title = metaTitle[base];
  if (profile && categories[profile]) document.title = `${categories[profile].title} | Kakobuys.pro`;
  if (productMatch) document.title = document.title.replace("Product ID", "ID produktu");

  document.documentElement.lang = "pl-PL";
  for (const stylesheet of document.querySelectorAll('link[rel="stylesheet"]')) {
    if (stylesheet.getAttribute("href") === "/assets/index-DkaQDdsl.css") {
      stylesheet.setAttribute("href", "/assets/index-B3cBPZ7F.css");
    }
  }
  if (!document.querySelector('link[href="/assets/locale-nav.css"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", "/assets/locale-nav.css");
    document.head.append(stylesheet);
  }
  document.querySelectorAll('meta[http-equiv="content-language"]').forEach((node) => node.remove());
  const languageMeta = document.createElement("meta");
  languageMeta.setAttribute("http-equiv", "content-language");
  languageMeta.setAttribute("content", "pl-PL");
  document.head.append(languageMeta);

  const canonical = `${site}${own}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.append(canonicalLink);
  }
  canonicalLink.setAttribute("href", canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
  if (productMatch) {
    const name = document.querySelector("h1")?.textContent?.trim() || "Produkt";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      `Niezależny zapis produktu ${name}: ID źródłowe, zdjęcie, orientacyjna cena i pytania QC właściwe dla kategorii.`
    );
  }

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  for (const locale of locales) {
    const localized = locale === "en" ? base : (base === "/" ? `/${locale}/` : `/${locale}${base}`);
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", locale);
    link.setAttribute("href", `${site}${localized}`);
    document.head.append(link);
  }
  const fallback = document.createElement("link");
  fallback.setAttribute("rel", "alternate");
  fallback.setAttribute("hreflang", "x-default");
  fallback.setAttribute("href", `${site}${base}`);
  document.head.append(fallback);

  const polishRouteExists = (pathname) => {
    if (pathname === "/") return true;
    if (/^\/(?:catalog(?:\/[^/]+)?|products\/\d+|guides|faq|about|privacy|terms|articles)\/?$/.test(pathname)) {
      const article = pathname.match(/^\/articles\/([^/]+)\/?$/)?.[1];
      return !article || Object.hasOwn(polishArticleMeta, article);
    }
    return false;
  };
  for (const anchor of document.querySelectorAll('a[href^="/"]')) {
    const href = anchor.getAttribute("href");
    const url = new URL(href, site);
    if (url.pathname.startsWith("/assets/") || !polishRouteExists(url.pathname)) continue;
    const normalized = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/+$/, "")}/`;
    anchor.setAttribute("href", normalized === "/" ? "/pl/" : `/pl${normalized}`);
  }

  const menu = document.querySelector(".language-menu");
  if (menu) {
    const options = [
      ["en", "🌐", "English", "EN"],
      ["pl", "🇵🇱", "Polski", "PL"],
      ["de", "🇩🇪", "Deutsch", "DE"],
      ["fr", "🇫🇷", "Français", "FR"],
      ["es", "🇪🇸", "Español", "ES"],
      ["it", "🇮🇹", "Italiano", "IT"]
    ];
    const links = options.map(([locale, flag, label, short]) => {
      const localized = locale === "en" ? base : (base === "/" ? `/${locale}/` : `/${locale}${base}`);
      return `<a class="${locale === "pl" ? "is-active" : ""}" href="${localized}" lang="${locale}" hreflang="${locale}" role="menuitem"${locale === "pl" ? ' aria-current="page"' : ""}><span aria-hidden="true">${flag}</span><span>${label}</span><small>${short}</small></a>`;
    }).join("");
    menu.outerHTML = `<details class="language-menu"><summary aria-label="Wybierz język"><span aria-hidden="true">◎</span>PL<span class="language-caret" aria-hidden="true">⌄</span></summary><div class="language-popover" role="menu" aria-label="Wybierz język">${links}</div></details>`;
  }

  for (const script of [...document.querySelectorAll("script")]) {
    if (script.getAttribute("type") !== "application/ld+json") script.remove();
  }
  document.querySelectorAll('link[rel="modulepreload"]').forEach((node) => node.remove());
  document.querySelectorAll("[data-rsc-css-href]").forEach((node) => {
    node.removeAttribute("data-rsc-css-href");
    node.removeAttribute("data-precedence");
  });
  const homeGrid = base === "/" ? document.querySelector(".kb-home-grid") : null;
  if (homeGrid) {
    homeGrid.classList.add("is-expanded");
    document.querySelector(".kb-expand")?.remove();
  }
}

function updateExpandedPage(document, route, catalog, catalogCopy) {
  const base = routePath(route);
  translateText(document, mapForRoute(base));
  const categorySlug = base.match(/^\/catalog\/([^/]+)\/$/)?.[1];
  const productPage = base.match(/^\/products\/(\d+)\/$/)?.[1];

  if (base === "/articles/") {
    for (const card of document.querySelectorAll(".article-library article, .article-card")) {
      const href = card.querySelector('a[href*="/articles/"]')?.getAttribute("href") || "";
      const slug = href.match(/\/articles\/([^/]+)/)?.[1];
      const translated = polishArticleMeta[slug];
      if (!translated) continue;
      setText(card.querySelector(".kicker"), translated[0]);
      setText(card.querySelector("h2"), translated[1]);
      setText(card.querySelector("h2 + p"), translated[2]);
    }
  }

  if (categorySlug && categories[categorySlug]) {
    const profile = categories[categorySlug];
    const qc = polishQc(categorySlug, catalogCopy);
    setText(document.querySelector(".page-hero h1"), profile.title);
    const categoryIntro = document.querySelector(".page-hero h1 + p");
    if (categoryIntro) {
      categoryIntro.textContent = `Osiem sprawdzonych tras produktów w kategorii ${profile.pl.toLowerCase()}, orientacyjne ceny USD i pytania QC dopasowane do tego typu produktu.`;
    }
    setText(document.querySelector(".kb-qc-intro h2"), catalogCopy.copy.pl.qcTitle);
    setText(document.querySelector(".kb-qc-intro p"), catalogCopy.copy.pl.qcIntro);
    document.querySelectorAll(".kb-qc-grid .kb-qc-card").forEach((card, index) => {
      setText(card.querySelector("h3"), qc[index]?.[0]);
      setText(card.querySelector("p"), qc[index]?.[1]);
    });
    const limitsHeading = [...document.querySelectorAll(".prose > h2")]
      .find((heading) => heading.textContent.includes("photos") || heading.textContent.includes("zdjęcia"));
    if (limitsHeading) {
      limitsHeading.textContent = catalogCopy.copy.pl.limitsTitle;
      setText(limitsHeading.nextElementSibling, catalogCopy.copy.pl.limitsBody);
    }
    setText(document.querySelector(".kb-category-products h2"), catalogCopy.copy.pl.categoryProducts);
    setText(document.querySelector(".kb-category-products > p"), catalogCopy.copy.pl.categoryProductsIntro);
    setText(document.querySelector(".kb-product-note"), catalogCopy.copy.pl.disclosure);
    for (const card of document.querySelectorAll(".kb-product-card")) {
      setText(card.querySelector("small"), profile.pl);
      const view = card.querySelector(".kb-product-image span");
      if (view) view.textContent = `${catalogCopy.copy.pl.view} →`;
    }
    setText(document.querySelector(".side-card .kicker"), catalogCopy.copy.pl.qcTitle);
    setText(document.querySelector(".side-card h2"), profile.pl);
    document.querySelectorAll(".side-card li").forEach((item, index) => setText(item, qc[index]?.[0]));
    const sideButtons = document.querySelectorAll(".side-card .button");
    if (sideButtons[0]) sideButtons[0].textContent = `${catalogCopy.copy.pl.browseRoutes} ↓`;
    if (sideButtons[1]) sideButtons[1].textContent = catalogCopy.copy.pl.readGuide;
    const article = document.querySelector(".guide-layout .prose");
    if (article && !article.querySelector(".kb-related-topics")) {
      article.insertAdjacentHTML("beforeend", `<section class="kb-related-topics"><h2>Powiązane materiały i aktualna kategoria</h2><p><a href="/pl/faq/">FAQ Kakobuy</a> · <a href="/pl/guides/">Pełna metoda QC</a> · <a href="/pl/articles/how-to-read-kakobuy-qc-photos/">Jak czytać zdjęcia QC</a></p><a class="button button-dark" href="https://cnfanshp.com/search.html?keywords=${encodeURIComponent(profile.en)}&channelid=2" target="_blank" rel="noopener noreferrer">Szukaj aktualnych ofert ${profile.pl.toLowerCase()} ↗</a></section>`);
    }
  }

  if (productPage) {
    const product = catalog.productsByPage.get(productPage);
    if (!product) throw new Error(`Missing product ${productPage}`);
    const profile = categories[product.category];
    const qc = polishQc(product.category, catalogCopy);
    const crumbs = document.querySelectorAll(".kb-breadcrumbs a");
    setText(crumbs[0], catalogCopy.copy.pl.breadcrumbHome);
    setText(crumbs[1], profile.pl);
    if (crumbs[1]) crumbs[1].setAttribute("href", `/pl/catalog/${product.category}/`);
    setText(document.querySelector(".kb-kicker"), catalogCopy.copy.pl.independentRecord);
    const priceSmall = document.querySelector(".kb-price small");
    if (priceSmall) priceSmall.textContent = `USD orientacyjnie · ¥${product.cny} cena źródłowa`;
    const facts = document.querySelectorAll(".kb-fact");
    setText(facts[0]?.querySelector("span"), catalogCopy.copy.pl.productId);
    setText(facts[1]?.querySelector("span"), catalogCopy.copy.pl.category);
    setText(facts[1]?.querySelector("strong"), profile.pl);
    setText(facts[2]?.querySelector("span"), catalogCopy.copy.pl.reviewed);
    setText(document.querySelector(".kb-source-button[target]"), catalogCopy.copy.pl.continue);
    setText(document.querySelector(".kb-detail-note"), catalogCopy.copy.pl.detailNote);
    setText(document.querySelector(".kb-detail-qc > h2"), catalogCopy.copy.pl.productQcTitle);
    setText(document.querySelector(".kb-detail-qc > p"), catalogCopy.copy.pl.qcIntro);
    document.querySelectorAll(".kb-detail-qc .kb-qc-card").forEach((card, index) => {
      setText(card.querySelector("h3"), qc[index]?.[0]);
      setText(card.querySelector("p"), qc[index]?.[1]);
    });
    const back = document.querySelector(".kb-detail-qc > a");
    if (back) {
      back.textContent = `${catalogCopy.copy.pl.backCategory} →`;
      back.setAttribute("href", `/pl/catalog/${product.category}/`);
    }
    setText(document.querySelector("[data-kb-footer]"), catalogCopy.copy.pl.footer);
    const detail = document.querySelector(".kb-detail-qc");
    if (detail && !detail.querySelector(".kb-related-topics")) {
      detail.insertAdjacentHTML("beforeend", `<div class="kb-related-topics"><h2>Sprawdź przed zakupem</h2><p><a href="/pl/guides/">Metoda QC</a> · <a href="/pl/faq/">FAQ</a> · <a href="/pl/articles/how-to-read-kakobuy-qc-photos/">Przewodnik po zdjęciach QC</a></p></div>`);
    }
    const structured = document.querySelector('script[type="application/ld+json"]');
    if (structured) {
      try {
        const data = JSON.parse(structured.textContent);
        data.url = `${site}/pl/products/${product.page}/`;
        data.inLanguage = "pl-PL";
        data.category = profile.pl;
        structured.textContent = JSON.stringify(data);
      } catch {
        // Preserve valid source markup if a future schema block is not JSON.
      }
    }
  }
}

function updateBaselinePage(document, route, sourceData) {
  const base = routePath(route);
  translateText(document, sourceData.uiPairs);
  translateText(document, commonTranslations);

  if (base === "/guides/") {
    const ui = sourceData.polishUi.guides;
    setText(document.querySelector(".page-hero .kicker"), ui.kicker);
    setText(document.querySelector(".page-hero h1"), ui.title);
    setText(document.querySelector(".page-hero h1 + p"), ui.intro);
    const prose = document.querySelector(".guide-research-prose");
    if (prose) {
      prose.innerHTML = `<p class="research-date">${sourceData.guide.reviewed}</p>${sourceData.guide.sections.map((section) => `<section><h2>${section.heading}</h2>${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}${section.points ? `<ol>${section.points.map((point) => `<li>${point}</li>`).join("")}</ol>` : ""}</section>`).join("")}<div class="source-note"><strong>${sourceData.guide.sourceTitle}</strong>${sourceData.guide.sourceText}</div>`;
    }
    const quick = document.querySelector(".guide-quick-card");
    if (quick) {
      setText(quick.querySelector(".kicker"), sourceData.guide.reviewed);
      setText(quick.querySelector("h2"), sourceData.guide.quickTitle);
      quick.querySelector("ul").innerHTML = sourceData.guide.quickPoints.map((point) => `<li>${point}</li>`).join("");
    }
    document.querySelectorAll(".guide-card").forEach((card, index) => {
      const slug = Object.keys(sourceData.polishUi.articles)[index];
      const meta = sourceData.polishUi.articles[slug];
      if (!meta) return;
      setText(card.querySelector(".kicker"), meta.eyebrow);
      setText(card.querySelector("h2"), meta.title);
      setText(card.querySelector("h2 + p"), meta.description);
      const link = card.querySelector("a");
      if (link) {
        link.setAttribute("href", `/pl/articles/${slug}/`);
        link.textContent = `${meta.readTime} · ${sourceData.polishUi.common.readArticle} →`;
      }
    });
  }

  if (base === "/faq/") {
    const ui = sourceData.polishUi.faqPage;
    setText(document.querySelector(".page-hero .kicker"), ui.kicker);
    setText(document.querySelector(".page-hero h1"), ui.title);
    setText(document.querySelector(".page-hero h1 + p"), ui.intro);
    setText(document.querySelector(".faq-intro .kicker"), ui.scope);
    setText(document.querySelector(".faq-intro h2"), ui.independent);
    setText(document.querySelector(".faq-intro h2 + p"), ui.text);
    setText(document.querySelector(".faq-intro a"), `${ui.sourceButton} →`);
    const list = document.querySelector(".faq-list");
    if (list) {
      list.innerHTML = sourceData.polishUi.faq.map((item, index) => `<details${index === 0 ? " open" : ""}><summary>${item.q}<span>+</span></summary><p>${item.a}</p></details>`).join("");
    }
  }

  for (const routeName of ["about", "privacy", "terms"]) {
    if (base !== `/${routeName}/`) continue;
    const ui = sourceData.polishUi[routeName];
    setText(document.querySelector(".page-hero .kicker"), ui.kicker);
    setText(document.querySelector(".page-hero h1"), ui.title);
    setText(document.querySelector(".page-hero h1 + p"), ui.intro || ui.updated);
    const container = routeName === "about"
      ? document.querySelector(".guide-layout .prose")
      : document.querySelector(".legal-page");
    if (container) {
      container.innerHTML = ui.sections.map(([heading, paragraph]) => `<div><h2>${heading}</h2><p>${paragraph}</p></div>`).join("");
    }
    if (routeName === "about") {
      const side = document.querySelector(".side-card");
      setText(side?.querySelector(".kicker"), ui.standard);
      setText(side?.querySelector("h2"), ui.rulesTitle);
      if (side?.querySelector("ul")) side.querySelector("ul").innerHTML = ui.rules.map((rule) => `<li>${rule}</li>`).join("");
      setText(side?.querySelector("a"), ui.button);
    }
  }

  const slug = base.match(/^\/articles\/([^/]+)\/$/)?.[1];
  if (slug && sourceData.articles[slug]) {
    const meta = sourceData.polishUi.articles[slug];
    const article = sourceData.articles[slug];
    document.title = `${meta.title} | Kakobuys.pro`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", meta.description);
    setText(document.querySelector(".page-hero .kicker"), meta.eyebrow);
    setText(document.querySelector(".page-hero h1"), meta.title);
    setText(document.querySelector(".page-hero h1 + p"), meta.description);
    const byline = document.querySelector(".article-byline");
    if (byline) byline.innerHTML = `<span>${sourceData.polishUi.common.by}</span><span>${meta.readTime} ${sourceData.polishUi.common.read}</span><span>${sourceData.polishUi.common.reviewed} ${meta.updated}</span>`;
    const prose = document.querySelector(".article-layout .prose");
    if (prose) {
      prose.innerHTML = `${article.intro.map((paragraph) => `<p>${paragraph}</p>`).join("")}<div class="callout"><strong>${article.calloutTitle}</strong>${article.callout}</div>${article.sections.map((section) => `<div><h2>${section.heading}</h2>${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}${section.points ? `<ol>${section.points.map((point) => `<li>${point}</li>`).join("")}</ol>` : ""}</div>`).join("")}<div class="source-note"><strong>${article.sourceTitle}</strong>${article.sourceText}</div><section class="kb-related-topics"><h2>Powiązane materiały</h2><p><a href="/pl/guides/">Metoda QC</a> · <a href="/pl/faq/">FAQ Kakobuy</a> · <a href="/pl/catalog/">Katalog produktów</a> · <a href="/pl/articles/">Wszystkie artykuły</a></p></section>`;
    }
    const aside = document.querySelector(".article-layout .side-card");
    if (aside) {
      setText(aside.querySelector(".kicker"), sourceData.polishUi.articleShell.independent);
      setText(aside.querySelector("h3"), sourceData.polishUi.articleShell.title);
      setText(aside.querySelector("h3 + p"), sourceData.polishUi.articleShell.text);
      const links = aside.querySelectorAll("a");
      if (links[1]) {
        links[1].setAttribute("href", "/pl/guides/");
        links[1].textContent = sourceData.polishUi.common.allGuides;
      }
    }
    for (const structured of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(structured.textContent);
        const records = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
        for (const record of records) {
          if (record["@type"] !== "Article") continue;
          record.headline = meta.title;
          record.description = meta.description;
          record.url = `${site}/pl/articles/${slug}/`;
          record.mainEntityOfPage = `${site}/pl/articles/${slug}/`;
          record.inLanguage = "pl-PL";
        }
        structured.textContent = JSON.stringify(data);
      } catch {
        // Preserve a future non-JSON structured-data block unchanged.
      }
    }
  }
}

function writePolishPage(sourceRoot, route, updater) {
  const input = pageFile(sourceRoot, route);
  if (!fs.existsSync(input)) throw new Error(`Missing source page ${input}`);
  const { document } = parseHTML(fs.readFileSync(input, "utf8"));
  updater(document);
  normalizePolishDocument(document, route);
  const file = outputFile(route);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `<!DOCTYPE html>${document.documentElement.outerHTML}\n`);
  return file;
}

if (!fs.existsSync(baselineRoot)) throw new Error(`Baseline directory not found: ${baselineRoot}`);
const localizedBundle = fs.readFileSync(path.join(baselineRoot, "assets", "localized-pages-BDX9hRz0.js"), "utf8");
const sourceData = {
  englishUi: extractObject(localizedBundle, "m"),
  polishUi: extractObject(localizedBundle, "h"),
  articles: extractObject(localizedBundle, "d").pl,
  guide: extractObject(localizedBundle, "b").pl
};
sourceData.uiPairs = textLeafPairs(sourceData.englishUi, sourceData.polishUi);

const catalog = productMap();
const catalogSource = fs.readFileSync(path.join(root, "assets", "catalog-upgrade.js"), "utf8");
const catalogPrefix = catalogSource.slice(0, catalogSource.indexOf("let kbCatalogPromise"));
const catalogContext = {};
vm.runInNewContext(`${catalogPrefix}\nglobalThis.__data={copy:KB_COPY,qc:KB_QC,qcTitles:KB_QC_TITLES,qcDescriptions:KB_QC_DESCRIPTIONS};`, catalogContext);
const catalogCopy = catalogContext.__data;

const expandedRoutes = [
  "/",
  "/catalog/",
  "/articles/",
  ...Object.keys(categories).map((category) => `/catalog/${category}/`),
  ...catalog.products.map((product) => `/products/${product.page}/`)
];
const baselineRoutes = [
  "/guides/",
  "/faq/",
  "/about/",
  "/privacy/",
  "/terms/",
  ...Object.keys(sourceData.articles).map((slug) => `/articles/${slug}/`)
];

const written = [];
for (const route of expandedRoutes) {
  written.push(writePolishPage(root, route, (document) => updateExpandedPage(document, route, catalog, catalogCopy)));
}
for (const route of baselineRoutes) {
  written.push(writePolishPage(baselineRoot, route, (document) => updateBaselinePage(document, route, sourceData)));
}

console.log(JSON.stringify({ written: written.length, polishRoot: path.join(root, "pl") }, null, 2));
