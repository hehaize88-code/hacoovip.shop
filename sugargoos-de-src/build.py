#!/usr/bin/env python3
"""Build the sugargoos.de static site from reviewed source data."""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from xml.sax.saxutils import escape as xml_escape

from articles import ARTICLES
from content import CATEGORIES, GUIDES, SITE


ROOT = Path(__file__).resolve().parent
BASE_URL = "https://sugargoos.de"
BUILD_DATE = "2026-07-30"
PRODUCT_DATA = json.loads((ROOT / "data" / "products.json").read_text(encoding="utf-8"))
PRODUCTS = PRODUCT_DATA["products"]
LEGACY_META = {
    (item["locale"], item["path"]): item
    for item in json.loads(
        (ROOT / "data" / "legacy-pages.json").read_text(encoding="utf-8")
    )
}
PRODUCT_BY_ID = {item["id"]: item for item in PRODUCTS}
PRODUCTS_BY_CATEGORY = {
    slug: [item for item in PRODUCTS if item["category"] == slug]
    for slug in CATEGORIES
}
MAIN_CATALOG_URL = "https://www.cnfanshp.com"
EXPECTED_CATEGORY_PATHS = {
    "shoes": "/shoes/",
    "sweatshirts": "/hoodies-sweaters/",
    "t-shirts": "/t-shirts/",
    "jackets": "/jackets/",
    "pants-shorts": "/pants-shorts/",
    "headwear": "/headwear/",
    "accessories": "/accessories/",
    "electronics": "/electronics/",
}
MINIMUM_PRODUCTS = 64
MINIMUM_ARTICLES = 7
MINIMUM_GUIDES = 5

COPY = {
    "en": {
        "home": "Home",
        "browse": "Browse finds",
        "view_all": "View all",
        "categories": "Browse by category",
        "latest": "Latest research articles",
        "records": "reviewed records",
        "search_label": "Search the live catalog",
        "search_help": (
            "Search opens the main cnfanshp.com catalog in a new tab. Verify the live "
            "variant and price before ordering."
        ),
        "search_placeholder": "Product name or ID",
        "search_button": "Search catalog",
        "guide_tag": "Practical guide",
        "article_tag": "SEO research",
        "all_categories": "All categories",
        "filter_placeholder": "Filter title, ID or category",
        "results": "records shown",
        "no_results": "No records match those filters.",
        "catalog_snapshot": "Live catalog snapshot",
        "verified": "Link and image checked 30 July 2026",
        "category_method": "Category-specific review method",
        "qc": "QC evidence to collect",
        "shipping": "Shipping and Germany planning",
        "products_here": "Current reviewed records",
        "related": "Related records",
        "variant_note": (
            "The visible catalog title and price are a dated snapshot. Confirm the exact "
            "colour, size, bundle and seller-to-warehouse charge on the destination page."
        ),
        "photo_note": (
            "Warehouse photos can support visible-condition checks. They cannot prove "
            "authenticity, material composition, electrical safety or long-term performance."
        ),
        "price_note": (
            "USD reference uses ECB rates published 29 July 2026 "
            "(approximately USD 0.1478 per CNY). It excludes payment spread, domestic "
            "delivery, services, international freight, VAT, customs duty and handling."
        ),
        "article_checked": "Facts checked 30 July 2026",
        "sources": "Sources and verification notes",
        "independent": "Independent editorial research",
        "guides_title": "Sugargoo Guides: Buying, QC and Germany Shipping",
        "guides_desc": (
            "Step-by-step operating guides for links, warehouse evidence, parcel planning "
            "and shipping to Germany."
        ),
        "articles_title": "Sugargoo Articles for Germany",
        "articles_desc": (
            "Long-form, localized research on spreadsheets, finds, sizing, warehouse "
            "decisions, volumetric weight, customs and VAT."
        ),
        "finds_title": "64 Sugargoo Spreadsheet Finds Checked in July 2026",
        "finds_desc": (
            "Filter 64 distinct cnfanshp.com product records across eight categories. "
            "Every card has its own image, product ID, price snapshot and detail page."
        ),
        "category_index_title": "Eight Product Categories, Eight Different QC Methods",
        "category_index_desc": (
            "Choose a category to see records and the measurements, visible checks, "
            "packing questions and route limits that actually apply to it."
        ),
        "home_title": "Sugargoo Spreadsheet Finds and QC Guides for Germany",
        "home_desc": (
            "64 checked product records, category-specific QC checklists and independent "
            "Sugargoo shipping, customs and VAT guidance for Germany."
        ),
        "home_dek": (
            "A maintained research layer for China shopping links: distinct records, local "
            "images, dated price snapshots and practical checks before a parcel moves."
        ),
        "method_title": "Germany planning starts before parcel submission",
        "method_desc": (
            "Product type affects measurements, packed volume, eligible routes, VAT and "
            "customs treatment. The directory keeps those decisions attached to each record."
        ),
        "method_points": [
            "64 unique links and locally served product images",
            "Eight category-specific QC and packing checklists",
            "Germany customs and VAT guidance checked 30 July 2026",
        ],
        "stats": [
            ("64", "unique product records"),
            ("8", "distinct category methods"),
            ("12", "in-depth guides and articles"),
            ("2", "localized languages"),
        ],
        "updated": "Updated 30 July 2026",
        "checked_date": "30 July 2026",
        "back_home": "Return home",
        "not_found": "Page not found",
        "not_found_desc": (
            "This address does not match a current record. Use Finds or Categories to "
            "continue with a maintained page."
        ),
    },
    "de": {
        "home": "Startseite",
        "browse": "Finds ansehen",
        "view_all": "Alle ansehen",
        "categories": "Nach Kategorie suchen",
        "latest": "Neue Recherche-Artikel",
        "records": "geprüfte Datensätze",
        "search_label": "Im aktuellen Katalog suchen",
        "search_help": (
            "Die Suche öffnet den Hauptkatalog cnfanshp.com in einem neuen Tab. "
            "Variante und Preis vor der Bestellung live prüfen."
        ),
        "search_placeholder": "Produktname oder ID",
        "search_button": "Katalog durchsuchen",
        "guide_tag": "Praktische Anleitung",
        "article_tag": "SEO-Recherche",
        "all_categories": "Alle Kategorien",
        "filter_placeholder": "Titel, ID oder Kategorie filtern",
        "results": "Datensätze angezeigt",
        "no_results": "Keine Datensätze passen zu diesen Filtern.",
        "catalog_snapshot": "Aktueller Katalog-Snapshot",
        "verified": "Link und Bild am 30. Juli 2026 geprüft",
        "category_method": "Kategoriespezifische Prüfmethode",
        "qc": "Benötigte QC-Nachweise",
        "shipping": "Versand und Planung für Deutschland",
        "products_here": "Aktuell geprüfte Datensätze",
        "related": "Ähnliche Datensätze",
        "variant_note": (
            "Sichtbarer Katalogtitel und Preis sind ein datierter Snapshot. Farbe, Größe, "
            "Paketvariante und Inlandsversand auf der Zielseite erneut bestätigen."
        ),
        "photo_note": (
            "Lagerfotos helfen bei sichtbaren Zustandsprüfungen. Sie beweisen weder "
            "Echtheit und Material noch elektrische Sicherheit oder Dauerfunktion."
        ),
        "price_note": (
            "Die USD-Referenz nutzt die EZB-Kurse vom 29. Juli 2026 "
            "(etwa 0,1478 USD je CNY). Zahlungsaufschlag, Inlandsversand, Services, "
            "internationale Fracht, Einfuhrumsatzsteuer, Zoll und Gebühren fehlen."
        ),
        "article_checked": "Fakten geprüft am 30. Juli 2026",
        "sources": "Quellen und Prüfhinweise",
        "independent": "Unabhängige redaktionelle Recherche",
        "guides_title": "Sugargoo-Anleitungen: Bestellung, QC und Deutschland-Versand",
        "guides_desc": (
            "Schrittweise Anleitungen zu Links, Lagernachweisen, Paketplanung und "
            "Versand nach Deutschland."
        ),
        "articles_title": "Sugargoo-Artikel für Deutschland",
        "articles_desc": (
            "Lokalisierte Langform-Recherche zu Spreadsheets, Finds, Maßen, "
            "Lagerentscheidungen, Volumengewicht, Zoll und Einfuhrumsatzsteuer."
        ),
        "finds_title": "64 Sugargoo-Spreadsheet-Finds, geprüft im Juli 2026",
        "finds_desc": (
            "64 unterschiedliche cnfanshp.com-Produktdatensätze in acht Kategorien. "
            "Jede Karte hat ein eigenes Bild, eine Produkt-ID, einen Preis-Snapshot und eine Detailseite."
        ),
        "category_index_title": "Acht Produktkategorien, acht verschiedene QC-Methoden",
        "category_index_desc": (
            "Für jede Kategorie gelten eigene Maße, sichtbare Prüfungen, "
            "Verpackungsfragen und Routenbeschränkungen."
        ),
        "home_title": "Sugargoo Spreadsheet Finds und QC-Guides für Deutschland",
        "home_desc": (
            "64 geprüfte Produktdatensätze, kategoriespezifische QC-Checklisten sowie "
            "unabhängige Hinweise zu Sugargoo-Versand, Zoll und Einfuhrumsatzsteuer."
        ),
        "home_dek": (
            "Eine gepflegte Recherche-Ebene für China-Shopping-Links: unterschiedliche "
            "Datensätze, lokale Bilder, datierte Preise und praktische Prüfungen vor dem Versand."
        ),
        "method_title": "Deutschland-Planung beginnt vor der Paketeinreichung",
        "method_desc": (
            "Produkttypen verändern Maße, Packvolumen, mögliche Routen, "
            "Einfuhrumsatzsteuer und Zollbehandlung. Diese Entscheidungen bleiben am Datensatz."
        ),
        "method_points": [
            "64 einzigartige Links mit lokal ausgelieferten Produktbildern",
            "Acht kategoriespezifische QC- und Verpackungschecklisten",
            "Deutschland-, Zoll- und Steuerhinweise geprüft am 30. Juli 2026",
        ],
        "stats": [
            ("64", "einzigartige Produktdatensätze"),
            ("8", "unterschiedliche Kategoriemethoden"),
            ("12", "ausführliche Guides und Artikel"),
            ("2", "lokalisierte Sprachen"),
        ],
        "updated": "Aktualisiert am 30. Juli 2026",
        "checked_date": "30. Juli 2026",
        "back_home": "Zur Startseite",
        "not_found": "Seite nicht gefunden",
        "not_found_desc": (
            "Diese Adresse gehört zu keinem aktuellen Datensatz. Über Finds oder "
            "Kategorien gelangen Sie zu gepflegten Seiten."
        ),
    },
}


def e(value: object, quote: bool = True) -> str:
    return html.escape(str(value), quote=quote)


def route(locale: str, relative: str = "") -> str:
    relative = relative.strip("/")
    prefix = SITE[locale]["prefix"]
    if not relative:
        return f"{prefix}/" if prefix else "/"
    return f"{prefix}/{relative}/"


def absolute(locale: str, relative: str = "") -> str:
    return f"{BASE_URL}{route(locale, relative)}"


def output_file(output: Path, url_path: str) -> Path:
    if url_path == "/":
        return output / "index.html"
    return output / url_path.strip("/") / "index.html"


def json_ld(payload: dict | list) -> str:
    encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    return f'<script type="application/ld+json">{encoded}</script>'


def organization_schema() -> dict:
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Sugargoos.de",
        "url": f"{BASE_URL}/",
        "logo": f"{BASE_URL}/images/sugargoo-logo.png",
        "description": (
            "Independent product-link research, QC guidance and Germany parcel planning."
        ),
    }


def breadcrumb_schema(locale: str, crumbs: list[tuple[str, str]]) -> dict:
    items = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": COPY[locale]["home"],
            "item": absolute(locale),
        }
    ]
    for position, (label, relative) in enumerate(crumbs, start=2):
        items.append(
            {
                "@type": "ListItem",
                "position": position,
                "name": label,
                "item": absolute(locale, relative),
            }
        )
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items,
    }


def header(locale: str, relative: str, active: str | None) -> str:
    site = SITE[locale]
    nav_routes = {
        "finds": "finds",
        "categories": "categories",
        "guides": "guides",
        "articles": "articles",
        "faq": "faq",
    }
    nav = "".join(
        (
            f'<a href="{route(locale, rel)}"'
            f'{" aria-current=\"page\"" if key == active else ""}>'
            f'{e(site["nav"][key])}</a>'
        )
        for key, rel in nav_routes.items()
    )
    other = "de" if locale == "en" else "en"
    mobile_links = nav + (
        f'<a href="{route(other, relative)}" hreflang="{SITE[other]["lang"]}">'
        f'{e(site["locale_name"])}</a>'
        f'<a href="https://www.cnfanshp.com/" rel="nofollow sponsored noopener" '
        f'target="_blank">{e(site["catalog"])}</a>'
    )
    return (
        f'<a class="skip-link" href="#main">{e(site["skip"])}</a>'
        '<header class="site-header"><div class="header-inner">'
        f'<a class="brand" href="{route(locale)}" aria-label="Sugargoos.de">'
        '<img src="/images/sugargoo-logo.png" width="480" height="148" '
        'alt="Sugargoos.de"></a>'
        f'<nav class="main-nav" aria-label="Primary">{nav}</nav>'
        '<div class="header-actions">'
        f'<a class="locale-link" href="{route(other, relative)}" '
        f'hreflang="{SITE[other]["lang"]}" aria-label="{e(site["locale_name"])}">'
        f'{e(site["locale"])}</a>'
        f'<a class="button-small button-dark" href="https://www.cnfanshp.com/" '
        f'rel="nofollow sponsored noopener" target="_blank">{e(site["catalog"])}</a>'
        '</div>'
        '<details class="mobile-menu"><summary aria-label="Menu">'
        '<span></span><span></span><span></span></summary>'
        f'<nav class="mobile-menu-panel" aria-label="Mobile">{mobile_links}</nav>'
        '</details></div></header>'
    )


def footer(locale: str) -> str:
    site = SITE[locale]
    labels = (
        {
            "explore": "Explore",
            "research": "Research",
            "legal": "Information",
            "about": "About",
            "contact": "Contact",
            "privacy": "Privacy",
            "terms": "Terms",
        }
        if locale == "en"
        else {
            "explore": "Entdecken",
            "research": "Recherche",
            "legal": "Information",
            "about": "Über uns",
            "contact": "Kontakt",
            "privacy": "Datenschutz",
            "terms": "Bedingungen",
        }
    )
    return (
        '<footer class="site-footer"><div class="shell">'
        '<div class="footer-grid"><div class="footer-brand">'
        '<img src="/images/sugargoo-logo.png" width="480" height="148" '
        'alt="Sugargoos.de">'
        f'<p>{e(site["disclaimer"])}</p></div>'
        f'<div class="footer-column"><h2>{labels["explore"]}</h2>'
        f'<a href="{route(locale, "finds")}">{e(site["nav"]["finds"])}</a>'
        f'<a href="{route(locale, "categories")}">{e(site["nav"]["categories"])}</a>'
        '<a href="https://www.cnfanshp.com/" rel="nofollow sponsored noopener" '
        f'target="_blank">{e(site["catalog"])}</a></div>'
        f'<div class="footer-column"><h2>{labels["research"]}</h2>'
        f'<a href="{route(locale, "guides")}">{e(site["nav"]["guides"])}</a>'
        f'<a href="{route(locale, "articles")}">{e(site["nav"]["articles"])}</a>'
        f'<a href="{route(locale, "faq")}">{e(site["nav"]["faq"])}</a></div>'
        f'<div class="footer-column"><h2>{labels["legal"]}</h2>'
        f'<a href="{route(locale, "about")}">{labels["about"]}</a>'
        f'<a href="{route(locale, "contact")}">{labels["contact"]}</a>'
        f'<a href="{route(locale, "privacy")}">{labels["privacy"]}</a>'
        f'<a href="{route(locale, "terms")}">{labels["terms"]}</a>'
        '<a href="/sitemap.xml">Sitemap</a></div></div>'
        '<div class="footer-bottom">'
        f'<span>© 2026 Sugargoos.de · {e(COPY[locale]["independent"])}</span>'
        f'<span>{e(COPY[locale]["updated"])}</span>'
        '</div></div></footer>'
    )


def page_document(
    *,
    locale: str,
    relative: str,
    title: str,
    description: str,
    body: str,
    active: str | None = None,
    schemas: list[dict] | None = None,
    legacy: bool = False,
    og_type: str = "website",
    robots: str = "index,follow,max-image-preview:large",
    include_canonical: bool = True,
) -> str:
    canonical_url = absolute(locale, relative)
    en_url = absolute("en", relative)
    de_url = absolute("de", relative)
    schema_markup = "".join(json_ld(item) for item in (schemas or []))
    canonical_markup = (
        f'<link rel="canonical" href="{canonical_url}">'
        f'<link rel="alternate" hreflang="en" href="{en_url}">'
        f'<link rel="alternate" hreflang="de-DE" href="{de_url}">'
        f'<link rel="alternate" hreflang="x-default" href="{en_url}">'
        if include_canonical
        else ""
    )
    css = (
        '<link rel="stylesheet" href="/legacy.css">'
        if legacy
        else ""
    )
    body_class = ' class="legacy-page"' if legacy else ""
    return (
        "<!doctype html>"
        f'<html lang="{SITE[locale]["lang"]}"><head>'
        '<meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f"<title>{e(title)}</title>"
        f'<meta name="description" content="{e(description)}">'
        f'<meta name="robots" content="{e(robots)}">'
        f"{canonical_markup}"
        f'<meta property="og:type" content="{og_type}">'
        f'<meta property="og:title" content="{e(title)}">'
        f'<meta property="og:description" content="{e(description)}">'
        f'<meta property="og:url" content="{canonical_url}">'
        f'<meta property="og:locale" content="{"en_US" if locale == "en" else "de_DE"}">'
        '<meta property="og:site_name" content="Sugargoos.de">'
        '<meta property="og:image" content="https://sugargoos.de/images/sugargoo-logo.png">'
        f'{css}<link rel="stylesheet" href="/site.css">'
        '<link rel="icon" href="/favicon.svg" type="image/svg+xml">'
        f"{schema_markup}"
        '<script src="/site.js" defer></script>'
        f"</head><body{body_class}>"
        f"{header(locale, relative, active)}"
        f"{body}"
        f"{footer(locale)}"
        "</body></html>"
    )


def breadcrumb_markup(locale: str, crumbs: list[tuple[str, str]]) -> str:
    links = [f'<a href="{route(locale)}">{e(COPY[locale]["home"])}</a>']
    for index, (label, relative) in enumerate(crumbs):
        if index == len(crumbs) - 1:
            links.append(f"<span>{e(label)}</span>")
        else:
            links.append(f'<a href="{route(locale, relative)}">{e(label)}</a>')
    return '<nav class="breadcrumbs" aria-label="Breadcrumb">' + " / ".join(links) + "</nav>"


def page_hero(
    locale: str,
    title: str,
    description: str,
    crumbs: list[tuple[str, str]],
    eyebrow: str,
) -> str:
    return (
        '<section class="page-hero"><div class="shell">'
        f"{breadcrumb_markup(locale, crumbs)}"
        f'<p class="eyebrow">{e(eyebrow)}</p>'
        f"<h1>{e(title)}</h1><p>{e(description)}</p>"
        "</div></section>"
    )


def display_title(product: dict) -> str:
    title = " ".join(product["catalog_title"].split()).strip(" -")
    return title or f'Catalog record {product["id"]}'


def main_category_url(slug: str) -> str:
    return f'{MAIN_CATALOG_URL}{CATEGORIES[slug]["catalog_path"]}'


def product_card(locale: str, product: dict, *, eager: bool = False) -> str:
    category = CATEGORIES[product["category"]]["label"][locale]
    title = display_title(product)
    url = route(locale, f'finds/{product["slug"]}')
    return (
        f'<article class="product-card" data-product-card '
        f'data-category="{e(product["category"])}" '
        f'data-search-text="{e(f"{title} {product['id']} {category}")}">'
        f'<a href="{url}"><img src="{e(product["local_image"])}" '
        f'alt="{e(f"{title}, catalog ID {product['id']}")}" '
        f'width="900" height="900" loading="{"eager" if eager else "lazy"}" '
        'decoding="async"></a>'
        '<div class="product-card-body">'
        f'<div class="card-kicker"><span>{e(category)}</span>'
        f'<span>ID {e(product["id"])}</span></div>'
        f'<h3><a href="{url}">{e(title)}</a></h3>'
        f'<p>{e(COPY[locale]["verified"])}</p>'
        '<div class="product-card-footer">'
        f'<span>¥{product["price_cny"]:,.2f}</span>'
        f'<span>≈ ${product["price_usd"]:,.2f}</span>'
        "</div></div></article>"
    )


def category_card(locale: str, slug: str, index: int) -> str:
    item = CATEGORIES[slug]
    return (
        '<article class="category-card">'
        f'<span class="category-number">{index:02d} · '
        f'{len(PRODUCTS_BY_CATEGORY[slug])} {e(COPY[locale]["records"])}</span>'
        f'<h3>{e(item["label"][locale])}</h3>'
        f'<p>{e(item["intro"][locale])}</p>'
        f'<a href="{e(main_category_url(slug))}" '
        'rel="nofollow sponsored noopener" target="_blank">'
        f'{e(COPY[locale]["view_all"])} →</a></article>'
    )


def validate_source_data() -> None:
    if set(CATEGORIES) != set(EXPECTED_CATEGORY_PATHS):
        raise ValueError("The eight reviewed category keys must be preserved")
    for slug, expected_path in EXPECTED_CATEGORY_PATHS.items():
        actual_path = CATEGORIES[slug]["catalog_path"]
        if actual_path != expected_path:
            raise ValueError(
                f"Category {slug!r} must target {expected_path!r}, got {actual_path!r}"
            )
        if not PRODUCTS_BY_CATEGORY[slug]:
            raise ValueError(f"Category {slug!r} must retain reviewed products")
    if len(PRODUCTS) < MINIMUM_PRODUCTS:
        raise ValueError(f"At least {MINIMUM_PRODUCTS} products must be preserved")
    if len(ARTICLES) < MINIMUM_ARTICLES:
        raise ValueError(f"At least {MINIMUM_ARTICLES} articles must be preserved")
    if len(GUIDES) < MINIMUM_GUIDES:
        raise ValueError(f"At least {MINIMUM_GUIDES} guides must be preserved")


def guide_card(locale: str, guide: dict) -> str:
    return (
        '<article class="article-card">'
        f'<span class="tag">{e(COPY[locale]["guide_tag"])}</span>'
        f'<h3>{e(guide["title"][locale])}</h3>'
        f'<p>{e(guide["description"][locale])}</p>'
        f'<a href="{route(locale, f"guides/{guide["slug"]}")}">'
        f'{e(SITE[locale]["read"])} →</a></article>'
    )


def article_card(locale: str, article: dict) -> str:
    info = article[locale]
    return (
        '<article class="article-card">'
        f'<span class="tag">{e(COPY[locale]["article_tag"])}</span>'
        f'<h3>{e(info["title"])}</h3>'
        f'<p>{e(info["description"])}</p>'
        f'<a href="{route(locale, f"articles/{article["slug"]}")}">'
        f'{e(SITE[locale]["read"])} →</a></article>'
    )


class Builder:
    def __init__(self, output: Path):
        self.output = output
        self.routes: list[tuple[str, str]] = []

    def prepare(self) -> None:
        if self.output.exists():
            shutil.rmtree(self.output)
        self.output.mkdir(parents=True)
        shutil.copy2(ROOT / "assets" / "site.css", self.output / "site.css")
        shutil.copy2(ROOT / "assets" / "site.js", self.output / "site.js")
        shutil.copy2(ROOT / "assets" / "legacy.css", self.output / "legacy.css")
        shutil.copy2(ROOT / "assets" / "favicon.svg", self.output / "favicon.svg")
        image_dir = self.output / "images"
        image_dir.mkdir()
        shutil.copy2(
            ROOT / "assets" / "sugargoo-logo.png",
            image_dir / "sugargoo-logo.png",
        )
        for name in ("desk-tech.webp", "everyday-carry.webp", "home-storage.webp"):
            shutil.copy2(ROOT / "assets" / name, image_dir / name)
        shutil.copytree(ROOT / "assets" / "products", image_dir / "products")

    def write(
        self,
        locale: str,
        relative: str,
        document: str,
        *,
        include_sitemap: bool = True,
    ) -> None:
        destination = output_file(self.output, route(locale, relative))
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(document, encoding="utf-8")
        if include_sitemap:
            self.routes.append((locale, relative.strip("/")))

    def home(self, locale: str) -> None:
        c = COPY[locale]
        featured = [PRODUCTS_BY_CATEGORY[slug][0] for slug in CATEGORIES]
        mini = "".join(
            (
                f'<a href="{route(locale, f"finds/{item["slug"]}")}">'
                f'<img src="{e(item["local_image"])}" width="900" height="900" '
                f'alt="{e(display_title(item))}"><span>{e(display_title(item))}</span></a>'
            )
            for item in featured[:3]
        )
        stats = "".join(
            f'<div class="stat"><strong>{e(value)}</strong><span>{e(label)}</span></div>'
            for value, label in c["stats"]
        )
        products = "".join(
            product_card(locale, item, eager=True) for item in featured
        )
        categories = "".join(
            category_card(locale, slug, index)
            for index, slug in enumerate(CATEGORIES, start=1)
        )
        articles = "".join(article_card(locale, item) for item in ARTICLES[:3])
        method_points = "".join(f"<li>{e(point)}</li>" for point in c["method_points"])
        body = (
            '<main id="main"><section class="hero"><div class="hero-grid">'
            '<div class="hero-copy">'
            f'<p class="eyebrow">{e(c["independent"])}</p>'
            f'<h1>{e(c["home_title"])}</h1><p>{e(c["home_dek"])}</p>'
            '<div class="hero-actions">'
            f'<a class="button button-primary" href="{route(locale, "finds")}">'
            f'{e(c["browse"])}</a>'
            f'<a class="button button-ghost" href="{route(locale, "articles")}">'
            f'{e(SITE[locale]["nav"]["articles"])}</a></div>'
            '<div class="trust-row">'
            f'<span>{e(c["method_points"][0])}</span>'
            f'<span>{e(c["method_points"][1])}</span>'
            f'<span>{e(c["method_points"][2])}</span></div></div>'
            '<div class="finder-card">'
            f'<h2>{e(c["search_label"])}</h2><p>{e(c["search_help"])}</p>'
            '<form class="finder-form" data-main-search>'
            f'<label class="skip-link" for="hero-search-{locale}">{e(c["search_label"])}</label>'
            f'<input id="hero-search-{locale}" name="q" type="search" '
            f'placeholder="{e(c["search_placeholder"])}" autocomplete="off">'
            f'<button type="submit">{e(c["search_button"])}</button></form>'
            f'<div class="mini-products">{mini}</div></div></div></section>'
            f'<div class="stats">{stats}</div>'
            '<section class="section"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">{e(c["catalog_snapshot"])}</p>'
            f'<h2>{e(c["browse"])}</h2>'
            f'<p>{e(c["finds_desc"])}</p></div>'
            f'<a class="text-link" href="{route(locale, "finds")}">'
            f'{e(c["view_all"])} →</a></div>'
            f'<div class="product-grid">{products}</div></div></section>'
            '<section class="section section-soft"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">{e(c["category_method"])}</p>'
            f'<h2>{e(c["categories"])}</h2>'
            f'<p>{e(c["category_index_desc"])}</p></div>'
            f'<a class="text-link" href="{route(locale, "categories")}">'
            f'{e(c["view_all"])} →</a></div>'
            f'<div class="category-grid">{categories}</div></div></section>'
            '<section class="section section-dark"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">Germany / Deutschland</p><h2>{e(c["method_title"])}</h2>'
            f'<p>{e(c["method_desc"])}</p></div>'
            f'<a class="text-link" href="{route(locale, "articles/sugargoo-germany-customs-vat-2026")}">'
            f'{e(SITE[locale]["read"])} →</a></div>'
            '<div class="check-panel"><ul>'
            f"{method_points}</ul></div></div></section>"
            '<section class="section"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">{e(c["article_tag"])}</p>'
            f'<h2>{e(c["latest"])}</h2><p>{e(c["articles_desc"])}</p></div>'
            f'<a class="text-link" href="{route(locale, "articles")}">'
            f'{e(c["view_all"])} →</a></div>'
            f'<div class="article-grid">{articles}</div></div></section></main>'
        )
        schema = [
            organization_schema(),
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Sugargoos.de",
                "url": absolute(locale),
                "inLanguage": SITE[locale]["lang"],
                "description": c["home_desc"],
            },
        ]
        document = page_document(
            locale=locale,
            relative="",
            title=f'{c["home_title"]} | Sugargoos.de',
            description=c["home_desc"],
            body=body,
            schemas=schema,
        )
        self.write(locale, "", document)

    def finds(self, locale: str) -> None:
        c = COPY[locale]
        options = "".join(
            f'<option value="{e(slug)}">{e(item["label"][locale])}</option>'
            for slug, item in CATEGORIES.items()
        )
        cards = "".join(product_card(locale, item) for item in PRODUCTS)
        body = (
            '<main id="main">'
            f'{page_hero(locale, c["finds_title"], c["finds_desc"], [("Finds", "finds")], c["catalog_snapshot"])}'
            '<section class="section"><div class="shell">'
            '<form class="filter-bar" data-product-filter>'
            f'<label class="skip-link" for="filter-{locale}">{e(c["filter_placeholder"])}</label>'
            f'<input id="filter-{locale}" name="filter-query" type="search" '
            f'placeholder="{e(c["filter_placeholder"])}">'
            '<label class="skip-link" for="category-filter">Category</label>'
            f'<select id="category-filter" name="filter-category">'
            f'<option value="">{e(c["all_categories"])}</option>{options}</select>'
            f'<div class="result-count"><span data-result-count>{len(PRODUCTS)}</span>&nbsp;'
            f'{e(c["results"])}</div></form>'
            f'<div class="product-grid">{cards}'
            f'<div class="empty-state" data-empty-state hidden>{e(c["no_results"])}</div>'
            "</div></div></section></main>"
        )
        item_list = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": c["finds_title"],
            "numberOfItems": len(PRODUCTS),
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": index,
                    "url": absolute(locale, f'finds/{item["slug"]}'),
                    "name": display_title(item),
                }
                for index, item in enumerate(PRODUCTS, start=1)
            ],
        }
        self.write(
            locale,
            "finds",
            page_document(
                locale=locale,
                relative="finds",
                title=f'{c["finds_title"]} | Sugargoos.de',
                description=c["finds_desc"],
                body=body,
                active="finds",
                schemas=[breadcrumb_schema(locale, [("Finds", "finds")]), item_list],
            ),
        )

    def category_index(self, locale: str) -> None:
        c = COPY[locale]
        cards = "".join(
            category_card(locale, slug, index)
            for index, slug in enumerate(CATEGORIES, start=1)
        )
        label = SITE[locale]["nav"]["categories"]
        body = (
            '<main id="main">'
            f'{page_hero(locale, c["category_index_title"], c["category_index_desc"], [(label, "categories")], c["category_method"])}'
            '<section class="section"><div class="shell">'
            f'<div class="category-grid">{cards}</div></div></section></main>'
        )
        self.write(
            locale,
            "categories",
            page_document(
                locale=locale,
                relative="categories",
                title=f'{c["category_index_title"]} | Sugargoos.de',
                description=c["category_index_desc"],
                body=body,
                active="categories",
                schemas=[breadcrumb_schema(locale, [(label, "categories")])],
            ),
        )

    def category(self, locale: str, slug: str) -> None:
        c = COPY[locale]
        item = CATEGORIES[slug]
        label = item["label"][locale]
        title = (
            f"Sugargoo {label} Spreadsheet: {len(PRODUCTS_BY_CATEGORY[slug])} Checked Finds"
            if locale == "en"
            else f"Sugargoo-{label}-Spreadsheet: {len(PRODUCTS_BY_CATEGORY[slug])} geprüfte Finds"
        )
        description = item["intro"][locale]
        focus = "".join(f"<li>{e(point)}</li>" for point in item["focus"][locale])
        shipping = "".join(
            f"<li>{e(point)}</li>" for point in item["shipping"][locale]
        )
        cards = "".join(
            product_card(locale, product)
            for product in PRODUCTS_BY_CATEGORY[slug]
        )
        category_root = SITE[locale]["nav"]["categories"]
        body = (
            '<main id="main">'
            f'{page_hero(locale, title, description, [(category_root, "categories"), (label, f"categories/{slug}")], c["category_method"])}'
            '<section class="section section-soft"><div class="shell">'
            '<div class="category-intro">'
            f'<article class="check-panel"><h2>{e(item["focus_title"][locale])}</h2>'
            f'<p>{e(c["photo_note"])}</p><ul>{focus}</ul></article>'
            f'<article class="check-panel"><h2>{e(item["shipping_title"][locale])}</h2>'
            f'<p>{e(c["price_note"])}</p><ul>{shipping}</ul></article>'
            "</div></div></section>"
            '<section class="section"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">{e(c["catalog_snapshot"])}</p>'
            f'<h2>{e(c["products_here"])}</h2>'
            f'<p>{len(PRODUCTS_BY_CATEGORY[slug])} {e(c["records"])} · '
            f'{e(c["verified"])}</p></div>'
            f'<a class="text-link" href="{e(main_category_url(slug))}" '
            'rel="nofollow sponsored noopener" target="_blank">'
            f'{e(SITE[locale]["catalog"])} →</a></div>'
            f'<div class="product-grid">{cards}</div></div></section></main>'
        )
        item_list = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": title,
            "numberOfItems": len(PRODUCTS_BY_CATEGORY[slug]),
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": index,
                    "url": absolute(locale, f'finds/{product["slug"]}'),
                    "name": display_title(product),
                }
                for index, product in enumerate(
                    PRODUCTS_BY_CATEGORY[slug], start=1
                )
            ],
        }
        relative = f"categories/{slug}"
        self.write(
            locale,
            relative,
            page_document(
                locale=locale,
                relative=relative,
                title=f"{title} | Sugargoos.de",
                description=description,
                body=body,
                active="categories",
                schemas=[
                    breadcrumb_schema(
                        locale,
                        [
                            (category_root, "categories"),
                            (label, relative),
                        ],
                    ),
                    item_list,
                ],
            ),
        )

    def product(self, locale: str, product: dict) -> None:
        c = COPY[locale]
        title = display_title(product)
        category = CATEGORIES[product["category"]]
        category_label = category["label"][locale]
        relative = f'finds/{product["slug"]}'
        seo_title = (
            f"{title} — Catalog ID {product['id']} and QC Checklist"
            if locale == "en"
            else f"{title} — Katalog-ID {product['id']} und QC-Checkliste"
        )
        description = (
            f"Checked {category_label} record {product['id']} with a dated CNY/USD "
            "price snapshot, local image, category-specific QC points and matching catalog link."
            if locale == "en"
            else f"Geprüfter {category_label}-Datensatz {product['id']} mit datiertem "
            "CNY-/USD-Preis, lokalem Bild, QC-Punkten und passendem Kataloglink."
        )
        focus = "".join(
            f"<li>{e(point)}</li>" for point in category["focus"][locale]
        )
        shipping = "".join(
            f"<li>{e(point)}</li>" for point in category["shipping"][locale]
        )
        related = [
            item
            for item in PRODUCTS_BY_CATEGORY[product["category"]]
            if item["id"] != product["id"]
        ][:4]
        related_cards = "".join(product_card(locale, item) for item in related)
        body = (
            '<main id="main"><section class="section"><div class="shell">'
            f'{breadcrumb_markup(locale, [(SITE[locale]["nav"]["finds"], "finds"), (title, relative)])}'
            '<div class="product-detail">'
            '<div class="product-detail-image">'
            f'<img src="{e(product["local_image"])}" '
            f'alt="{e(f"{title}, catalog ID {product['id']}")}" '
            'width="900" height="900" fetchpriority="high"></div>'
            '<div><p class="eyebrow">'
            f'{e(c["catalog_snapshot"])} · {e(c["verified"])}</p>'
            f"<h1>{e(title)}</h1><p class=\"product-note\">{e(c['variant_note'])}</p>"
            '<div class="product-meta-grid">'
            f'<div class="meta-box"><span>{e(SITE[locale]["product_id"])}</span>'
            f'<strong>{e(product["id"])}</strong></div>'
            f'<div class="meta-box"><span>{e(SITE[locale]["category"])}</span>'
            f'<strong><a href="{route(locale, f"categories/{product["category"]}")}">'
            f'{e(category_label)}</a></strong></div>'
            f'<div class="meta-box"><span>CNY</span><strong>¥{product["price_cny"]:,.2f}</strong></div>'
            f'<div class="meta-box"><span>USD</span><strong>≈ ${product["price_usd"]:,.2f}</strong></div>'
            f'<div class="meta-box"><span>{e(SITE[locale]["checked"])}</span>'
            f'<strong>{e(c["checked_date"])}</strong></div>'
            '<div class="meta-box"><span>Source</span><strong>cnfanshp.com</strong></div>'
            "</div>"
            f'<a class="button button-primary" href="{e(product["detail_url"])}" '
            'rel="nofollow sponsored noopener" target="_blank">'
            f'{e(SITE[locale]["open_catalog"])}</a>'
            f'<p class="price-note">{e(c["price_note"])}</p></div></div>'
            "</div></section>"
            '<section class="section section-soft"><div class="shell">'
            '<div class="category-intro">'
            f'<article class="check-panel"><h2>{e(category["focus_title"][locale])}</h2>'
            f'<p>{e(c["photo_note"])}</p><ul>{focus}</ul></article>'
            f'<article class="check-panel"><h2>{e(category["shipping_title"][locale])}</h2>'
            f'<p>{e(c["variant_note"])}</p><ul>{shipping}</ul></article>'
            "</div></div></section>"
            '<section class="section"><div class="shell">'
            '<div class="section-heading"><div>'
            f'<p class="eyebrow">{e(category_label)}</p><h2>{e(c["related"])}</h2>'
            f'<p>{e(c["verified"])}</p></div>'
            f'<a class="text-link" href="{route(locale, f"categories/{product["category"]}")}">'
            f'{e(c["view_all"])} →</a></div>'
            f'<div class="product-grid">{related_cards}</div></div></section></main>'
        )
        web_page = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seo_title,
            "url": absolute(locale, relative),
            "description": description,
            "inLanguage": SITE[locale]["lang"],
            "dateModified": BUILD_DATE,
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": f'{BASE_URL}{product["local_image"]}',
                "width": 900,
                "height": 900,
            },
            "about": {
                "@type": "Thing",
                "name": title,
                "identifier": product["id"],
            },
        }
        self.write(
            locale,
            relative,
            page_document(
                locale=locale,
                relative=relative,
                title=f"{seo_title} | Sugargoos.de",
                description=description,
                body=body,
                active="finds",
                schemas=[
                    breadcrumb_schema(
                        locale,
                        [
                            (SITE[locale]["nav"]["finds"], "finds"),
                            (title, relative),
                        ],
                    ),
                    web_page,
                ],
            ),
        )

    def guides(self, locale: str) -> None:
        c = COPY[locale]
        cards = "".join(guide_card(locale, item) for item in GUIDES)
        label = SITE[locale]["nav"]["guides"]
        body = (
            '<main id="main">'
            f'{page_hero(locale, c["guides_title"], c["guides_desc"], [(label, "guides")], c["guide_tag"])}'
            '<section class="section"><div class="shell">'
            f'<div class="article-grid">{cards}</div></div></section></main>'
        )
        self.write(
            locale,
            "guides",
            page_document(
                locale=locale,
                relative="guides",
                title=f'{c["guides_title"]} | Sugargoos.de',
                description=c["guides_desc"],
                body=body,
                active="guides",
                schemas=[breadcrumb_schema(locale, [(label, "guides")])],
            ),
        )

    def articles(self, locale: str) -> None:
        c = COPY[locale]
        cards = "".join(article_card(locale, item) for item in ARTICLES)
        label = SITE[locale]["nav"]["articles"]
        body = (
            '<main id="main">'
            f'{page_hero(locale, c["articles_title"], c["articles_desc"], [(label, "articles")], c["article_tag"])}'
            '<section class="section"><div class="shell">'
            f'<div class="article-grid">{cards}</div></div></section></main>'
        )
        self.write(
            locale,
            "articles",
            page_document(
                locale=locale,
                relative="articles",
                title=f'{c["articles_title"]} | Sugargoos.de',
                description=c["articles_desc"],
                body=body,
                active="articles",
                schemas=[breadcrumb_schema(locale, [(label, "articles")])],
            ),
        )

    def article(self, locale: str, article: dict) -> None:
        c = COPY[locale]
        info = article[locale]
        relative = f'articles/{article["slug"]}'
        sections = "".join(
            (
                f'<section id="section-{index}"><h2>{e(section["heading"])}</h2>'
                + "".join(f"<p>{e(paragraph)}</p>" for paragraph in section["paragraphs"])
                + "</section>"
            )
            for index, section in enumerate(info["sections"], start=1)
        )
        sources = "".join(f"<li>{e(source)}</li>" for source in info["sources"])
        if locale == "en":
            sidebar_title = "Use the article as a checklist"
            sidebar_text = (
                "Open the matching category or product record and verify the live "
                "facts again before paying or submitting a parcel."
            )
        else:
            sidebar_title = "Artikel als Checkliste nutzen"
            sidebar_text = (
                "Passende Kategorie oder Produktdatensatz öffnen und Live-Daten "
                "vor Zahlung oder Paketeinreichung erneut prüfen."
            )
        body = (
            '<main id="main">'
            f'{page_hero(locale, info["title"], info["dek"], [(SITE[locale]["nav"]["articles"], "articles"), (info["title"], relative)], c["article_checked"])}'
            '<section class="section"><div class="shell content-grid">'
            '<article class="prose">'
            '<div class="callout"><strong>'
            f'{e(c["independent"])}</strong><p>{e(SITE[locale]["disclaimer"])}</p></div>'
            f"{sections}"
            f'<section class="source-note"><h2>{e(c["sources"])}</h2>'
            f'<p>{e(c["article_checked"])}</p><ul>{sources}</ul></section>'
            "</article><aside class=\"sidebar-card\">"
            f'<h2>{e(sidebar_title)}</h2><p>{e(sidebar_text)}</p>'
            f'<a class="button button-primary" href="{route(locale, "finds")}">'
            f'{e(c["browse"])}</a>'
            f'<a class="button button-ghost" href="{route(locale, "categories")}">'
            f'{e(c["categories"])}</a></aside>'
            "</div></section></main>"
        )
        word_count = sum(
            len(re.findall(r"\b[\w'-]+\b", paragraph))
            for section in info["sections"]
            for paragraph in section["paragraphs"]
        )
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": info["title"],
            "description": info["description"],
            "datePublished": article["published"],
            "dateModified": BUILD_DATE,
            "inLanguage": SITE[locale]["lang"],
            "mainEntityOfPage": absolute(locale, relative),
            "wordCount": word_count,
            "author": {"@type": "Organization", "name": "Sugargoos.de Research Desk"},
            "publisher": organization_schema() | {"@context": None},
        }
        schema["publisher"].pop("@context", None)
        self.write(
            locale,
            relative,
            page_document(
                locale=locale,
                relative=relative,
                title=f'{info["title"]} | Sugargoos.de',
                description=info["description"],
                body=body,
                active="articles",
                schemas=[
                    breadcrumb_schema(
                        locale,
                        [
                            (SITE[locale]["nav"]["articles"], "articles"),
                            (info["title"], relative),
                        ],
                    ),
                    schema,
                ],
                og_type="article",
            ),
        )

    def legacy(self, locale: str, path: str) -> None:
        meta = LEGACY_META[(locale, path)]
        source = ROOT / "legacy-pages" / locale / f"{path}.html"
        fragment = source.read_text(encoding="utf-8")
        fragment = re.sub(r"</?main(?:\s[^>]*)?>", "", fragment)
        fragment = fragment.replace("SEO Articles", "Guides")
        fragment = fragment.replace("SEO-Artikel", "Anleitungen")
        fragment = re.sub(r'href="(/(?:de/)?finds)"', r'href="\1/"', fragment)
        active = (
            "guides"
            if path.startswith("guides/")
            else "faq"
            if path == "faq"
            else None
        )
        body = f'<main id="main" class="legacy-content">{fragment}</main>'
        self.write(
            locale,
            path,
            page_document(
                locale=locale,
                relative=path,
                title=meta["title"],
                description=meta["description"],
                body=body,
                active=active,
                schemas=[],
                legacy=True,
                og_type="article" if path.startswith("guides/") else "website",
            ),
        )

    def not_found(self, locale: str = "en") -> None:
        c = COPY[locale]
        body = (
            '<main id="main"><section class="page-hero"><div class="shell">'
            '<p class="eyebrow">404</p>'
            f'<h1>{e(c["not_found"])}</h1><p>{e(c["not_found_desc"])}</p>'
            f'<div class="hero-actions"><a class="button button-primary" href="{route(locale)}">'
            f'{e(c["back_home"])}</a><a class="button button-ghost" href="{route(locale, "finds")}">'
            f'{e(c["browse"])}</a></div></div></section></main>'
        )
        document = page_document(
            locale=locale,
            relative="",
            title=f'404 · {c["not_found"]} | Sugargoos.de',
            description=c["not_found_desc"],
            body=body,
            schemas=[],
            robots="noindex,follow",
            include_canonical=False,
        )
        destination = self.output / "404.html"
        destination.write_text(document, encoding="utf-8")

    def infrastructure(self) -> None:
        sitemap_lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ]
        for locale, relative in self.routes:
            sitemap_lines.extend(
                [
                    "  <url>",
                    f"    <loc>{xml_escape(absolute(locale, relative))}</loc>",
                    f"    <lastmod>{BUILD_DATE}</lastmod>",
                    "  </url>",
                ]
            )
        sitemap_lines.append("</urlset>")
        (self.output / "sitemap.xml").write_text(
            "\n".join(sitemap_lines) + "\n", encoding="utf-8"
        )
        (self.output / "sitemap.txt").write_text(
            "\n".join(
                absolute(locale, relative) for locale, relative in self.routes
            )
            + "\n",
            encoding="utf-8",
        )
        (self.output / "robots.txt").write_text(
            "User-agent: *\nAllow: /\n\n"
            f"Sitemap: {BASE_URL}/sitemap.xml\n",
            encoding="utf-8",
        )
        old_product_ids = {
            "loose-fit-crewneck": "5974",
            "pique-short-sleeve-top": "5976",
            "embroidered-zip-jacket": "5981",
            "drawstring-trousers": "5983",
            "embroidered-cap": "5971",
            "magnetic-desk-accessory": "5822",
            "multi-style-watch-record": "5952",
        }
        redirects = [
            "/sitemap-main.xml /sitemap.xml 301",
            "/finds/low-top-everyday-shoes/ /categories/shoes/ 301",
            "/de/finds/low-top-everyday-shoes/ /de/categories/shoes/ 301",
        ]
        for old_slug, product_id in old_product_ids.items():
            new_slug = PRODUCT_BY_ID[product_id]["slug"]
            redirects.append(f"/finds/{old_slug}/ /finds/{new_slug}/ 301")
            redirects.append(
                f"/de/finds/{old_slug}/ /de/finds/{new_slug}/ 301"
            )
        (self.output / "_redirects").write_text(
            "\n".join(redirects) + "\n", encoding="utf-8"
        )
        (self.output / "_headers").write_text(
            "/*\n"
            "  X-Content-Type-Options: nosniff\n"
            "  Referrer-Policy: strict-origin-when-cross-origin\n"
            "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n"
            "  X-Frame-Options: SAMEORIGIN\n"
            "\n"
            "/images/products/*\n"
            "  Cache-Control: public, max-age=31536000, immutable\n"
            "\n"
            "/site.css\n"
            "  Cache-Control: public, max-age=86400\n"
            "\n"
            "/site.js\n"
            "  Cache-Control: public, max-age=86400\n"
            "\n"
            "/legacy.css\n"
            "  Cache-Control: public, max-age=86400\n"
            "\n"
            "/sitemap.xml\n"
            "  Content-Type: application/xml; charset=utf-8\n"
            "  Cache-Control: public, max-age=300\n"
            "\n"
            "/sitemap.txt\n"
            "  Content-Type: text/plain; charset=utf-8\n"
            "  Cache-Control: public, max-age=300\n"
            "\n"
            "/robots.txt\n"
            "  Content-Type: text/plain; charset=utf-8\n"
            "  Cache-Control: public, max-age=300\n",
            encoding="utf-8",
        )

    def build(self) -> None:
        validate_source_data()
        self.prepare()
        for locale in ("en", "de"):
            self.home(locale)
            self.finds(locale)
            self.category_index(locale)
            for slug in CATEGORIES:
                self.category(locale, slug)
            for product in PRODUCTS:
                self.product(locale, product)
            self.guides(locale)
            self.articles(locale)
            for article in ARTICLES:
                self.article(locale, article)
            for path in ("about", "contact", "faq", "privacy", "terms"):
                self.legacy(locale, path)
            for guide in GUIDES:
                self.legacy(locale, f'guides/{guide["slug"]}')
        self.not_found()
        self.infrastructure()
        self.validate_output()

    def validate_output(self) -> None:
        expected_sitemap_urls = [
            absolute(locale, relative) for locale, relative in self.routes
        ]
        text_sitemap_urls = (
            (self.output / "sitemap.txt")
            .read_text(encoding="utf-8")
            .splitlines()
        )
        if text_sitemap_urls != expected_sitemap_urls:
            raise ValueError(
                "sitemap.txt must contain every canonical route exactly once"
            )

        sitemap_root = ET.fromstring(
            (self.output / "sitemap.xml").read_text(encoding="utf-8")
        )
        xml_sitemap_urls = [
            node.text or ""
            for node in sitemap_root.findall(
                "{http://www.sitemaps.org/schemas/sitemap/0.9}url/"
                "{http://www.sitemaps.org/schemas/sitemap/0.9}loc"
            )
        ]
        if xml_sitemap_urls != expected_sitemap_urls:
            raise ValueError(
                "sitemap.xml must contain every canonical route exactly once"
            )

        sitemap_namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        expected_child_tags = [
            f"{sitemap_namespace}loc",
            f"{sitemap_namespace}lastmod",
        ]
        for url_node in sitemap_root.findall(f"{sitemap_namespace}url"):
            child_tags = [child.tag for child in url_node]
            if child_tags != expected_child_tags:
                raise ValueError(
                    "sitemap.xml URL entries must use schema order: loc, lastmod"
                )

        redirect_lines = (
            (self.output / "_redirects").read_text(encoding="utf-8").splitlines()
        )
        if any(line.startswith("/sitemap.txt ") for line in redirect_lines):
            raise ValueError("sitemap.txt must return directly without a redirect")

        for locale in ("en", "de"):
            for relative in ("", "categories"):
                page = output_file(self.output, route(locale, relative))
                document = page.read_text(encoding="utf-8")
                for slug in EXPECTED_CATEGORY_PATHS:
                    destination = main_category_url(slug)
                    if document.count(f'href="{destination}"') != 1:
                        raise ValueError(
                            f"{route(locale, relative)} must contain one direct "
                            f"main-catalog link for {slug!r}"
                        )
                    internal_destination = route(locale, f"categories/{slug}")
                    if f'href="{internal_destination}"' in document:
                        raise ValueError(
                            f"{route(locale, relative)} still routes {slug!r} "
                            "to the local category page"
                        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path, help="Output directory")
    args = parser.parse_args()
    output = args.output.resolve()
    if output == ROOT or ROOT in output.parents:
        raise SystemExit("Refusing to build inside the source directory")
    Builder(output).build()
    html_count = len(list(output.rglob("*.html")))
    print(
        f"Built {html_count} HTML files, {len(PRODUCTS)} products and "
        f"{len(ARTICLES)} articles in {output}"
    )


if __name__ == "__main__":
    main()
