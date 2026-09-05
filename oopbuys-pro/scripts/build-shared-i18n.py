#!/usr/bin/env python3
"""Build locale text overlays for the canonical English OOPBUYS markup.

The deployed Worker always renders the English document tree. These files only
contain localized visible strings, translated accessibility attributes, SEO
copy, and the locale's existing structured data. A locale therefore cannot
drop a component merely because its old exported HTML was incomplete.
"""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
LOCALES = ("de", "es", "nl")
ROUTES = (
    "",
    "finds",
    "categories",
    "guides",
    "articles",
    "faq",
    "reviews",
    "about",
    "privacy",
    "terms",
    "guides/how-oopbuy-works",
    "guides/oopbuy-spreadsheet",
    "guides/qc",
    "guides/shipping",
)
VISIBLE_TAGS = {
    "a",
    "b",
    "button",
    "caption",
    "cite",
    "dd",
    "dt",
    "figcaption",
    "h1",
    "h2",
    "h3",
    "h4",
    "label",
    "legend",
    "li",
    "option",
    "p",
    "small",
    "span",
    "strong",
    "summary",
    "td",
    "th",
    "time",
}
TRANSLATED_ATTRIBUTES = ("alt", "aria-label", "placeholder", "title")
NON_VISIBLE_PARENTS = {"script", "style", "noscript", "svg"}
MANUAL_TEXT = {
    "de": {
        "h1\u241fOOPBUY Spreadsheet.": "OOPBUY Spreadsheet.",
        "h1\u241fWarehouse QC.": "Lager-QC.",
        "h1\u241fSmarter shipping.": "Intelligentere Versandplanung.",
        "h2\u241fChoose the answer you need.": "Wähle die Antwort, die du brauchst.",
        "title\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "OOPBUY Lager- & Versandkosten-Guide 2026",
        "h1\u241fOOPBUY warehouse.": "OOPBUY Lager.",
        "h1\u241fShipping costs.": "Versandkosten.",
        "h1\u241fSmarter parcels.": "Besser geplante Pakete.",
        "p\u241fTrack storage deadlines, read warehouse QC and plan parcel weight, customs and landed cost before international shipping.": "Behalte Lagerfristen im Blick, prüfe die Lager-QC und plane Paketgewicht, Zoll und Gesamtkosten vor dem internationalen Versand.",
        "span\u241fReviewed September 5, 2026": "Geprüft am 5. September 2026",
        "span\u241f02 · Dated decision guides": "02 · Datierte Entscheidungshilfen",
        "p\u241fUse dated research to resolve storage, shipping, customs, returns and parcel-risk decisions.": "Nutze datierte Recherche für Entscheidungen zu Lagerung, Versand, Zoll, Rückgaben und Paketrisiken.",
        "h2\u241fThe warehouse clock and final parcel decide the real cost.": "Lagerfrist und finales Paket bestimmen die tatsächlichen Kosten.",
        "h3\u241fPlan the OOPBUY 90-day warehouse deadline": "Die 90-Tage-Lagerfrist bei OOPBUY planen",
        "h3\u241fBuild a destination-specific landed cost": "Zielspezifische Gesamtkosten berechnen",
        "span\u241fWarehouse, shipping and landed-cost guides": "Lager-, Versand- und Gesamtkosten-Guides",
        "p\u241fIndependent cost and logistics library": "Unabhängige Kosten- und Logistikbibliothek",
        "h1\u241fPlan the warehouse, parcel and landed cost.": "Lager, Paket und Gesamtkosten planen.",
        "p\u241fUse dated evidence and practical checklists for OOPBUY storage, shipping, customs, returns and parcel-risk decisions.": "Nutze datierte Belege und praktische Checklisten für OOPBUY-Lagerung, Versand, Zoll, Rückgaben und Paketrisiken.",
        "small\u241fWarehouse storage · New": "Lagerung · Neu",
        "h2\u241fOOPBUY Warehouse Storage: Plan the 90-Day Deadline": "OOPBUY-Lagerung: Die 90-Tage-Frist planen",
        "p\u241fTrack each item's storage clock, extension decision and safe parcel date before the oldest deadline becomes urgent.": "Behalte Lagerfrist, Verlängerung und sicheren Pakettermin jedes Artikels im Blick.",
        "small\u241fCustoms and landed cost · New": "Zoll und Gesamtkosten · Neu",
        "h2\u241fOOPBUY Customs, Import Tax and Declaration": "OOPBUY Zoll, Einfuhrsteuer und Deklaration",
        "p\u241fSeparate freight, tax, duty, declaration and carrier fees using destination-specific evidence.": "Trenne Fracht, Steuer, Zoll, Deklaration und Beförderergebühren anhand zielspezifischer Belege.",
        "span\u241fResearch standard": "Recherchestandard",
        "h2\u241fCheck the evidence before paying.": "Belege vor der Zahlung prüfen.",
        "small\u241fProduct verification guide": "Leitfaden zur Produktprüfung",
        "small\u241fWarehouse QC checklist": "Checkliste für Lager-QC",
        "small\u241fWeight and dimensions guide": "Leitfaden zu Gewicht und Maßen",
        "small\u241fFirst-order warehouse workflow": "Lagerablauf der ersten Bestellung",
        "small\u241fWarehouse QC guide": "Lager-QC-Guide",
        "small\u241fShipping cost guide": "Versandkosten-Guide",
        "small\u241fFirst-order workflow": "Ablauf der ersten Bestellung",
        "small\u241fEvidence-led review": "Evidenzbasierte Bewertung",
        "small\u241fParcel planning guide": "Guide zur Paketplanung",
        "small\u241fTracking diagnosis guide": "Guide zur Sendungsverfolgung",
        "small\u241fReturns and refunds guide": "Guide zu Rückgaben und Erstattungen",
        "small\u241fTotal-cost ledger": "Gesamtkostenübersicht",
        "small\u241fDomestic shipping guide": "Inlandsversand-Guide",
        "small\u241fCurrency conversion audit": "Prüfung der Währungsumrechnung",
        "small\u241fParcel protection guide": "Paketschutz-Guide",
        "small\u241fPackaging and volume guide": "Guide zu Verpackung und Volumen",
        "small\u241fShipping-line comparison": "Versandlinienvergleich",
        "small\u241fRoute eligibility guide": "Guide zur Routeneignung",
        "small\u241fInsurance coverage audit": "Prüfung des Versicherungsschutzes",
        "h2\u241fOOPBUY Parcel Reinforcement: Cost vs Damage Risk": "OOPBUY-Paketverstärkung: Kosten gegen Schadensrisiko",
        "h2\u241fOOPBUY Vacuum Packing: Cost, Route and Protection": "OOPBUY-Vakuumverpackung: Kosten, Route und Schutz",
        "p\u241fCompare the live reinforcement offer with item exposure, packed measurements and avoidable loss before paying.": "Vergleiche das aktuelle Verstärkungsangebot vor der Zahlung mit Warenrisiko, Paketmaßen und vermeidbarem Verlust.",
        "p\u241fCheck clothing suitability, route support, packed measurements and the live quote before choosing vacuum bags or simple packaging.": "Prüfe Kleidungseignung, Routenunterstützung, Paketmaße und das aktuelle Angebot vor Vakuumbeutel oder einfacher Verpackung.",
        "p\u241fClaims are separated into official process, dated third-party evidence and practical interpretation. Product, policy, rating and route details are dated so changing information is never presented as permanent.": "Aussagen werden in offiziellen Ablauf, datierte externe Belege und praktische Einordnung getrennt. Veränderliche Produkt-, Richtlinien-, Bewertungs- und Routendaten sind datiert.",
        "div\u241fProcess checked against OOPBUY's official beginner guide. Product availability, route availability and costs can change.": (
            "Ablauf anhand des offiziellen OOPBUY-Einsteigerleitfadens geprüft. "
            "Produktverfügbarkeit, Routenverfügbarkeit und Kosten können sich ändern."
        ),
    },
    "es": {
        "h1\u241fOOPBUY Spreadsheet.": "OOPBUY Spreadsheet.",
        "h1\u241fWarehouse QC.": "QC de almacén.",
        "h1\u241fSmarter shipping.": "Envíos mejor planificados.",
        "h2\u241fChoose the answer you need.": "Elige la respuesta que necesitas.",
        "title\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "Guía OOPBUY 2026: almacén y costes de envío",
        "h1\u241fOOPBUY warehouse.": "Almacén OOPBUY.",
        "h1\u241fShipping costs.": "Costes de envío.",
        "h1\u241fSmarter parcels.": "Paquetes mejor planificados.",
        "p\u241fTrack storage deadlines, read warehouse QC and plan parcel weight, customs and landed cost before international shipping.": "Controla los plazos de almacén, revisa el QC y planifica peso, aduanas y coste final antes del envío internacional.",
        "span\u241fReviewed September 5, 2026": "Revisado el 5 de septiembre de 2026",
        "span\u241f02 · Dated decision guides": "02 · Guías con fecha",
        "p\u241fUse dated research to resolve storage, shipping, customs, returns and parcel-risk decisions.": "Usa investigación fechada para decidir sobre almacenaje, envío, aduanas, devoluciones y riesgos del paquete.",
        "h2\u241fThe warehouse clock and final parcel decide the real cost.": "El plazo de almacén y el paquete final determinan el coste real.",
        "h3\u241fPlan the OOPBUY 90-day warehouse deadline": "Planifica el plazo de 90 días del almacén OOPBUY",
        "h3\u241fBuild a destination-specific landed cost": "Calcula el coste final para tu destino",
        "span\u241fWarehouse, shipping and landed-cost guides": "Guías de almacén, envío y coste final",
        "p\u241fIndependent cost and logistics library": "Biblioteca independiente de costes y logística",
        "h1\u241fPlan the warehouse, parcel and landed cost.": "Planifica el almacén, el paquete y el coste final.",
        "p\u241fUse dated evidence and practical checklists for OOPBUY storage, shipping, customs, returns and parcel-risk decisions.": "Usa pruebas fechadas y listas prácticas para almacenaje, envío, aduanas, devoluciones y riesgos del paquete.",
        "small\u241fWarehouse storage · New": "Almacenaje · Nuevo",
        "h2\u241fOOPBUY Warehouse Storage: Plan the 90-Day Deadline": "Almacén OOPBUY: planifica el plazo de 90 días",
        "p\u241fTrack each item's storage clock, extension decision and safe parcel date before the oldest deadline becomes urgent.": "Controla el plazo, la prórroga y la fecha segura de envío de cada artículo.",
        "small\u241fCustoms and landed cost · New": "Aduanas y coste final · Nuevo",
        "h2\u241fOOPBUY Customs, Import Tax and Declaration": "OOPBUY: aduanas, impuestos y declaración",
        "p\u241fSeparate freight, tax, duty, declaration and carrier fees using destination-specific evidence.": "Separa transporte, impuestos, aranceles, declaración y cargos del transportista según tu destino.",
        "span\u241fResearch standard": "Criterio de investigación",
        "h2\u241fCheck the evidence before paying.": "Comprueba las pruebas antes de pagar.",
        "small\u241fProduct verification guide": "Guía de verificación del producto",
        "small\u241fWarehouse QC checklist": "Lista de QC de almacén",
        "small\u241fWeight and dimensions guide": "Guía de peso y medidas",
        "small\u241fFirst-order warehouse workflow": "Proceso de almacén del primer pedido",
        "small\u241fWarehouse QC guide": "Guía de QC de almacén",
        "small\u241fShipping cost guide": "Guía de costes de envío",
        "small\u241fFirst-order workflow": "Proceso del primer pedido",
        "small\u241fEvidence-led review": "Reseña basada en pruebas",
        "small\u241fParcel planning guide": "Guía de planificación del paquete",
        "small\u241fTracking diagnosis guide": "Guía de diagnóstico del seguimiento",
        "small\u241fReturns and refunds guide": "Guía de devoluciones y reembolsos",
        "small\u241fTotal-cost ledger": "Registro del coste total",
        "small\u241fDomestic shipping guide": "Guía de envío nacional",
        "small\u241fCurrency conversion audit": "Auditoría de conversión de moneda",
        "small\u241fParcel protection guide": "Guía de protección del paquete",
        "small\u241fPackaging and volume guide": "Guía de embalaje y volumen",
        "small\u241fShipping-line comparison": "Comparación de líneas de envío",
        "small\u241fRoute eligibility guide": "Guía de compatibilidad de rutas",
        "small\u241fInsurance coverage audit": "Auditoría de cobertura del seguro",
        "h2\u241fOOPBUY Parcel Reinforcement: Cost vs Damage Risk": "Refuerzo de paquetes OOPBUY: coste y riesgo de daños",
        "h2\u241fOOPBUY Vacuum Packing: Cost, Route and Protection": "Envasado al vacío OOPBUY: coste, ruta y protección",
        "p\u241fCompare the live reinforcement offer with item exposure, packed measurements and avoidable loss before paying.": "Compara el refuerzo actual con el riesgo del artículo, las medidas y las pérdidas evitables antes de pagar.",
        "p\u241fCheck clothing suitability, route support, packed measurements and the live quote before choosing vacuum bags or simple packaging.": "Comprueba prendas, ruta, medidas y precio actual antes de elegir bolsas al vacío o embalaje simple.",
        "p\u241fClaims are separated into official process, dated third-party evidence and practical interpretation. Product, policy, rating and route details are dated so changing information is never presented as permanent.": "Las afirmaciones separan proceso oficial, pruebas externas fechadas e interpretación práctica. Los datos variables de productos, políticas, valoraciones y rutas llevan fecha.",
        "div\u241fProcess checked against OOPBUY's official beginner guide. Product availability, route availability and costs can change.": (
            "Proceso comprobado con la guía oficial para principiantes de OOPBUY. "
            "La disponibilidad de productos y rutas, así como los costes, pueden cambiar."
        ),
    },
    "nl": {
        "h1\u241fOOPBUY Spreadsheet.": "OOPBUY Spreadsheet.",
        "h1\u241fWarehouse QC.": "Magazijn-QC.",
        "h1\u241fSmarter shipping.": "Slimmere verzendplanning.",
        "h2\u241fChoose the answer you need.": "Kies het antwoord dat je nodig hebt.",
        "title\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "OOPBUY magazijn- en verzendkostengids 2026",
        "h1\u241fOOPBUY warehouse.": "OOPBUY-magazijn.",
        "h1\u241fShipping costs.": "Verzendkosten.",
        "h1\u241fSmarter parcels.": "Slimmer geplande pakketten.",
        "p\u241fTrack storage deadlines, read warehouse QC and plan parcel weight, customs and landed cost before international shipping.": "Volg opslagdeadlines, controleer magazijn-QC en plan gewicht, douane en totale kosten vóór internationale verzending.",
        "span\u241fReviewed September 5, 2026": "Gecontroleerd op 5 september 2026",
        "span\u241f02 · Dated decision guides": "02 · Gedateerde keuzehulpen",
        "p\u241fUse dated research to resolve storage, shipping, customs, returns and parcel-risk decisions.": "Gebruik gedateerd onderzoek voor keuzes over opslag, verzending, douane, retouren en pakketrisico.",
        "h2\u241fThe warehouse clock and final parcel decide the real cost.": "De opslagtermijn en het definitieve pakket bepalen de echte kosten.",
        "h3\u241fPlan the OOPBUY 90-day warehouse deadline": "Plan de OOPBUY-opslagtermijn van 90 dagen",
        "h3\u241fBuild a destination-specific landed cost": "Bereken totale kosten voor jouw bestemming",
        "span\u241fWarehouse, shipping and landed-cost guides": "Gidsen voor magazijn, verzending en totale kosten",
        "p\u241fIndependent cost and logistics library": "Onafhankelijke kosten- en logistiekbibliotheek",
        "h1\u241fPlan the warehouse, parcel and landed cost.": "Plan magazijn, pakket en totale kosten.",
        "p\u241fUse dated evidence and practical checklists for OOPBUY storage, shipping, customs, returns and parcel-risk decisions.": "Gebruik gedateerd bewijs en praktische checklists voor opslag, verzending, douane, retouren en pakketrisico.",
        "small\u241fWarehouse storage · New": "Magazijnopslag · Nieuw",
        "h2\u241fOOPBUY Warehouse Storage: Plan the 90-Day Deadline": "OOPBUY-opslag: plan de termijn van 90 dagen",
        "p\u241fTrack each item's storage clock, extension decision and safe parcel date before the oldest deadline becomes urgent.": "Volg per artikel de opslagtermijn, verlenging en veilige pakketdatum.",
        "small\u241fCustoms and landed cost · New": "Douane en totale kosten · Nieuw",
        "h2\u241fOOPBUY Customs, Import Tax and Declaration": "OOPBUY douane, invoerbelasting en aangifte",
        "p\u241fSeparate freight, tax, duty, declaration and carrier fees using destination-specific evidence.": "Splits vracht, belasting, invoerrecht, aangifte en vervoerderskosten met bewijs voor jouw bestemming.",
        "span\u241fResearch standard": "Onderzoeksnorm",
        "h2\u241fCheck the evidence before paying.": "Controleer het bewijs vóór betaling.",
        "small\u241fProduct verification guide": "Gids voor productcontrole",
        "small\u241fWarehouse QC checklist": "Checklist voor magazijn-QC",
        "small\u241fWeight and dimensions guide": "Gids voor gewicht en afmetingen",
        "small\u241fFirst-order warehouse workflow": "Magazijnproces voor de eerste bestelling",
        "small\u241fWarehouse QC guide": "Gids voor magazijn-QC",
        "small\u241fShipping cost guide": "Gids voor verzendkosten",
        "small\u241fFirst-order workflow": "Proces voor de eerste bestelling",
        "small\u241fEvidence-led review": "Review op basis van bewijs",
        "small\u241fParcel planning guide": "Gids voor pakketplanning",
        "small\u241fTracking diagnosis guide": "Gids voor trackingdiagnose",
        "small\u241fReturns and refunds guide": "Gids voor retouren en terugbetalingen",
        "small\u241fTotal-cost ledger": "Overzicht van totale kosten",
        "small\u241fDomestic shipping guide": "Gids voor binnenlandse verzending",
        "small\u241fCurrency conversion audit": "Controle van valutaomrekening",
        "small\u241fParcel protection guide": "Gids voor pakketbescherming",
        "small\u241fPackaging and volume guide": "Gids voor verpakking en volume",
        "small\u241fShipping-line comparison": "Vergelijking van verzendlijnen",
        "small\u241fRoute eligibility guide": "Gids voor routegeschiktheid",
        "small\u241fInsurance coverage audit": "Controle van verzekeringsdekking",
        "h2\u241fOOPBUY Parcel Reinforcement: Cost vs Damage Risk": "OOPBUY-pakketversteviging: kosten en schaderisico",
        "h2\u241fOOPBUY Vacuum Packing: Cost, Route and Protection": "OOPBUY-vacuümverpakking: kosten, route en bescherming",
        "p\u241fCompare the live reinforcement offer with item exposure, packed measurements and avoidable loss before paying.": "Vergelijk het actuele verstevigingsaanbod vóór betaling met productrisico, pakketmaten en vermijdbaar verlies.",
        "p\u241fCheck clothing suitability, route support, packed measurements and the live quote before choosing vacuum bags or simple packaging.": "Controleer kleding, route, pakketmaten en actuele prijs vóór vacuümzakken of eenvoudige verpakking.",
        "p\u241fClaims are separated into official process, dated third-party evidence and practical interpretation. Product, policy, rating and route details are dated so changing information is never presented as permanent.": "Beweringen worden gescheiden in officieel proces, gedateerd extern bewijs en praktische uitleg. Veranderlijke product-, beleids-, beoordelings- en routegegevens zijn gedateerd.",
        "div\u241fProcess checked against OOPBUY's official beginner guide. Product availability, route availability and costs can change.": (
            "Proces gecontroleerd aan de hand van de officiële beginnersgids van OOPBUY. "
            "Productbeschikbaarheid, routebeschikbaarheid en kosten kunnen veranderen."
        ),
    },
}

MANUAL_ATTRIBUTES = {
    "de": {
        "meta\u241fcontent\u241fPlan OOPBUY warehouse storage, QC, parcel weight, shipping costs, customs and landed cost with dated independent guides.": "Plane OOPBUY-Lagerung, QC, Paketgewicht, Versandkosten, Zoll und Gesamtkosten mit datierten unabhängigen Guides.",
        "meta\u241fcontent\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "OOPBUY Lager- & Versandkosten-Guide 2026",
        "meta\u241fcontent\u241fIndependent OOPBUY guides for warehouse storage, shipping cost, customs, returns, tracking, parcel protection and landed cost.": "Unabhängige OOPBUY-Guides zu Lagerung, Versandkosten, Zoll, Rückgaben, Tracking, Paketschutz und Gesamtkosten.",
        "meta\u241fcontent\u241fOOPBUY Warehouse, Shipping Cost & Customs Guides": "OOPBUY-Guides zu Lager, Versandkosten und Zoll",
    },
    "es": {
        "meta\u241fcontent\u241fPlan OOPBUY warehouse storage, QC, parcel weight, shipping costs, customs and landed cost with dated independent guides.": "Planifica almacenaje OOPBUY, QC, peso, envío, aduanas y coste final con guías independientes fechadas.",
        "meta\u241fcontent\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "Guía OOPBUY 2026: almacén y costes de envío",
        "meta\u241fcontent\u241fIndependent OOPBUY guides for warehouse storage, shipping cost, customs, returns, tracking, parcel protection and landed cost.": "Guías OOPBUY independientes sobre almacenaje, envío, aduanas, devoluciones, seguimiento, protección y coste final.",
        "meta\u241fcontent\u241fOOPBUY Warehouse, Shipping Cost & Customs Guides": "Guías OOPBUY de almacén, envío y aduanas",
    },
    "nl": {
        "meta\u241fcontent\u241fPlan OOPBUY warehouse storage, QC, parcel weight, shipping costs, customs and landed cost with dated independent guides.": "Plan OOPBUY-opslag, QC, pakketgewicht, verzendkosten, douane en totale kosten met gedateerde onafhankelijke gidsen.",
        "meta\u241fcontent\u241fOOPBUY Warehouse & Shipping Cost Guide 2026": "OOPBUY magazijn- en verzendkostengids 2026",
        "meta\u241fcontent\u241fIndependent OOPBUY guides for warehouse storage, shipping cost, customs, returns, tracking, parcel protection and landed cost.": "Onafhankelijke OOPBUY-gidsen over opslag, verzendkosten, douane, retouren, tracking, bescherming en totale kosten.",
        "meta\u241fcontent\u241fOOPBUY Warehouse, Shipping Cost & Customs Guides": "OOPBUY-gidsen voor magazijn, verzendkosten en douane",
    },
}


@dataclass
class TextNode:
    text: str
    parent: "Element"


@dataclass
class Element:
    tag: str
    attrs: dict[str, str]
    parent: "Element | None"
    position: int
    children: list["Element | TextNode"] = field(default_factory=list)

    @property
    def classes(self) -> set[str]:
        return set(self.attrs.get("class", "").split())

    @property
    def direct_text(self) -> list[str]:
        return [
            child.text
            for child in self.children
            if isinstance(child, TextNode) and normalize(child.text)
        ]


class TreeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Element("document", {}, None, 0)
        self.stack = [self.root]
        self.elements = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Element(
            tag.lower(),
            {key.lower(): value or "" for key, value in attrs},
            self.stack[-1],
            len(self.elements),
        )
        self.stack[-1].children.append(node)
        self.elements.append(node)
        if tag.lower() not in {
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "link",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
        }:
            self.stack.append(node)

    def handle_startendtag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag.lower():
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag.lower():
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(TextNode(data, self.stack[-1]))


def normalize(value: str) -> str:
    return " ".join(value.split())


def region(node: Element) -> str:
    current: Element | None = node
    while current:
        if current.tag in {"head", "header", "main", "footer"}:
            return current.tag
        current = current.parent
    return "document"


def stable_ancestor(node: Element) -> tuple[str, str, str]:
    current = node.parent
    while current:
        if current.attrs.get("id") or current.classes or current.tag in {
            "article",
            "section",
            "nav",
            "form",
        }:
            return (
                current.tag,
                current.attrs.get("id", ""),
                " ".join(sorted(current.classes)),
            )
        current = current.parent
    return ("", "", "")


def canonical_href(value: str) -> str:
    value = re.sub(r"^https://oopbuys\.pro", "", value)
    value = re.sub(r"^/(de|es|nl)(?=/|$)", "", value)
    return value or "/"


def element_score(left: Element, right: Element, total: tuple[int, int]) -> float:
    if left.tag != right.tag or region(left) != region(right):
        return -10_000

    score = 4.0
    left_id = left.attrs.get("id", "")
    right_id = right.attrs.get("id", "")
    if left_id and right_id:
        score += 90 if left_id == right_id else -55

    left_classes = left.classes
    right_classes = right.classes
    if left_classes or right_classes:
        union = left_classes | right_classes
        overlap = left_classes & right_classes
        score += 46 * (len(overlap) / len(union)) if union else 0
        if not overlap:
            score -= 16

    for attribute in ("href", "src", "action"):
        left_value = left.attrs.get(attribute)
        right_value = right.attrs.get(attribute)
        if left_value and right_value:
            score += (
                65
                if canonical_href(left_value) == canonical_href(right_value)
                else -12
            )

    for attribute in ("name", "property", "role", "type"):
        left_value = left.attrs.get(attribute)
        right_value = right.attrs.get(attribute)
        if left_value and right_value:
            score += 14 if left_value == right_value else -7

    left_ancestor = stable_ancestor(left)
    right_ancestor = stable_ancestor(right)
    if left_ancestor == right_ancestor:
        score += 28
    elif left_ancestor[0] == right_ancestor[0]:
        score += 5

    left_total, right_total = total
    relative_left = left.position / max(left_total, 1)
    relative_right = right.position / max(right_total, 1)
    score += max(0, 10 - abs(relative_left - relative_right) * 50)

    if len(left.direct_text) == len(right.direct_text):
        score += 5
    return score


def align_elements(
    english: list[Element], localized: list[Element]
) -> list[tuple[Element, Element]]:
    """Order-preserving weighted alignment for one tag inside one document region."""

    left_count = len(english)
    right_count = len(localized)
    if not left_count or not right_count:
        return []

    totals = (
        english[-1].position + 1 if english else 1,
        localized[-1].position + 1 if localized else 1,
    )
    gap = -11.0
    dp = [[0.0] * (right_count + 1) for _ in range(left_count + 1)]
    move = [[""] * (right_count + 1) for _ in range(left_count + 1)]
    for index in range(1, left_count + 1):
        dp[index][0] = index * gap
        move[index][0] = "up"
    for index in range(1, right_count + 1):
        dp[0][index] = index * gap
        move[0][index] = "left"

    for left_index in range(1, left_count + 1):
        for right_index in range(1, right_count + 1):
            score = element_score(
                english[left_index - 1], localized[right_index - 1], totals
            )
            choices = (
                (dp[left_index - 1][right_index - 1] + score, "diag"),
                (dp[left_index - 1][right_index] + gap, "up"),
                (dp[left_index][right_index - 1] + gap, "left"),
            )
            dp[left_index][right_index], move[left_index][right_index] = max(
                choices, key=lambda item: item[0]
            )

    pairs: list[tuple[Element, Element]] = []
    left_index, right_index = left_count, right_count
    while left_index or right_index:
        direction = move[left_index][right_index]
        if direction == "diag":
            left = english[left_index - 1]
            right = localized[right_index - 1]
            if element_score(left, right, totals) >= 1:
                pairs.append((left, right))
            left_index -= 1
            right_index -= 1
        elif direction == "up":
            left_index -= 1
        else:
            right_index -= 1
    return list(reversed(pairs))


def visible_elements(parser: TreeParser) -> Iterable[Element]:
    for node in parser.elements:
        if node.tag not in VISIBLE_TAGS:
            continue
        if any(
            ancestor.tag in NON_VISIBLE_PARENTS
            for ancestor in ancestors(node)
        ):
            continue
        yield node


def translatable_attribute_elements(parser: TreeParser) -> Iterable[Element]:
    for node in parser.elements:
        if any(node.attrs.get(attribute) for attribute in TRANSLATED_ATTRIBUTES):
            yield node


def ancestors(node: Element) -> Iterable[Element]:
    current = node.parent
    while current:
        yield current
        current = current.parent


def page_path(locale: str | None, route: str) -> Path:
    parts = [ROOT]
    if locale:
        parts.append(locale)
    if route:
        parts.extend(route.split("/"))
    parts.append("index.html")
    return Path(*parts)


def route_key(route: str) -> str:
    return route.replace("/", "--") if route else "root"


def parse(path: Path) -> tuple[str, TreeParser]:
    html = path.read_text(encoding="utf-8")
    parser = TreeParser()
    parser.feed(html)
    return html, parser


def add_translation(
    target: dict[str, str],
    conflicts: defaultdict[str, list[str]],
    key: str,
    value: str,
) -> None:
    key = normalize(key)
    value = normalize(value)
    if not key or not value or key == value:
        return
    if key not in target:
        target[key] = value
    elif target[key] != value:
        conflicts[key].append(value)


def extract_json_ld(html: str) -> list[str]:
    pattern = re.compile(
        r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>'
        r"([\s\S]*?)</script>",
        re.IGNORECASE,
    )
    return [match.group(1) for match in pattern.finditer(html)]


def build_overlay(
    english_html: str,
    english_parser: TreeParser,
    localized_html: str,
    localized_parser: TreeParser,
    locale: str,
    route: str,
    existing_text: dict[str, str] | None = None,
) -> dict[str, object]:
    text: dict[str, str] = {}
    attributes: dict[str, str] = {}
    conflicts: defaultdict[str, list[str]] = defaultdict(list)

    english_groups: defaultdict[tuple[str, str], list[Element]] = defaultdict(list)
    localized_groups: defaultdict[tuple[str, str], list[Element]] = defaultdict(list)
    for node in visible_elements(english_parser):
        english_groups[(node.tag, region(node))].append(node)
    for node in visible_elements(localized_parser):
        localized_groups[(node.tag, region(node))].append(node)

    matched: list[tuple[Element, Element]] = []
    for group, english_nodes in english_groups.items():
        matched.extend(
            align_elements(english_nodes, localized_groups.get(group, []))
        )

    for english_node, localized_node in matched:
        english_parts = [normalize(value) for value in english_node.direct_text]
        localized_parts = [normalize(value) for value in localized_node.direct_text]
        for english_value, localized_value in zip(english_parts, localized_parts):
            add_translation(
                text,
                conflicts,
                f"{english_node.tag}\u241f{english_value}",
                localized_value,
            )
        for attribute in TRANSLATED_ATTRIBUTES:
            english_value = english_node.attrs.get(attribute, "")
            localized_value = localized_node.attrs.get(attribute, "")
            if english_value and localized_value:
                add_translation(
                    attributes,
                    conflicts,
                    f"{english_node.tag}\u241f{attribute}\u241f{english_value}",
                    localized_value,
                )

    english_attribute_groups: defaultdict[
        tuple[str, str], list[Element]
    ] = defaultdict(list)
    localized_attribute_groups: defaultdict[
        tuple[str, str], list[Element]
    ] = defaultdict(list)
    for node in translatable_attribute_elements(english_parser):
        english_attribute_groups[(node.tag, region(node))].append(node)
    for node in translatable_attribute_elements(localized_parser):
        localized_attribute_groups[(node.tag, region(node))].append(node)
    for group, english_nodes in english_attribute_groups.items():
        for english_node, localized_node in align_elements(
            english_nodes, localized_attribute_groups.get(group, [])
        ):
            for attribute in TRANSLATED_ATTRIBUTES:
                english_value = english_node.attrs.get(attribute, "")
                localized_value = localized_node.attrs.get(attribute, "")
                if english_value and localized_value:
                    add_translation(
                        attributes,
                        conflicts,
                        f"{english_node.tag}\u241f{attribute}\u241f{english_value}",
                        localized_value,
                    )

    # Metadata is paired by its stable name/property rather than document order.
    english_meta = {
        node.attrs.get("name") or node.attrs.get("property"): node
        for node in english_parser.elements
        if node.tag == "meta"
        and (node.attrs.get("name") or node.attrs.get("property"))
    }
    localized_meta = {
        node.attrs.get("name") or node.attrs.get("property"): node
        for node in localized_parser.elements
        if node.tag == "meta"
        and (node.attrs.get("name") or node.attrs.get("property"))
    }
    for key, english_node in english_meta.items():
        localized_node = localized_meta.get(key)
        if not localized_node:
            continue
        english_value = english_node.attrs.get("content", "")
        localized_value = localized_node.attrs.get("content", "")
        if english_value and localized_value:
            add_translation(
                attributes,
                conflicts,
                f"meta\u241fcontent\u241f{english_value}",
                localized_value,
            )

    title_pattern = re.compile(r"<title>([\s\S]*?)</title>", re.IGNORECASE)
    english_title = title_pattern.search(english_html)
    localized_title = title_pattern.search(localized_html)
    if english_title and localized_title:
        add_translation(
            text,
            conflicts,
            f"title\u241f{normalize(unescape(english_title.group(1)))}",
            normalize(unescape(localized_title.group(1))),
        )

    English_visible = [
        normalize(text_value)
        for node in visible_elements(english_parser)
        for text_value in node.direct_text
        if normalize(text_value)
    ]
    visible_values = set(English_visible)
    manual_text_values = set(visible_values)
    if english_title:
        manual_text_values.add(normalize(unescape(english_title.group(1))))
    for key, value in MANUAL_TEXT.get(locale, {}).items():
        english_value = key.split("\u241f", 1)[1]
        if english_value in manual_text_values:
            text[key] = value

    english_attribute_values = {
        value
        for node in english_parser.elements
        for value in node.attrs.values()
        if value
    }
    for key, value in MANUAL_ATTRIBUTES.get(locale, {}).items():
        english_value = key.split("\u241f", 2)[2]
        if english_value in english_attribute_values:
            attributes[key] = value

    for key, value in (existing_text or {}).items():
        if "\u241f" not in key:
            continue
        english_value = key.split("\u241f", 1)[1]
        if english_value in visible_values and key not in text:
            text[key] = value

    translated_english_values = {
        key.split("\u241f", 1)[1] for key in text if "\u241f" in key
    }
    untranslated = [
        value
        for value in English_visible
        if value not in translated_english_values
        and re.search(r"[A-Za-z]", value)
        and len(value) > 2
    ]

    return {
        "locale": locale,
        "route": f"/{route}/" if route else "/",
        "text": text,
        "attributes": attributes,
        "structuredData": extract_json_ld(localized_html),
        "audit": {
            "canonicalVisibleStrings": len(English_visible),
            "translatedVisibleStrings": len(English_visible) - len(untranslated),
            "fallbackEnglishStrings": sorted(set(untranslated)),
            "translationConflicts": {
                key: sorted(set(values)) for key, values in conflicts.items()
            },
        },
    }


def main() -> None:
    output_root = ROOT / "_i18n"
    manifest: dict[str, object] = {
        "canonicalLocale": "en",
        "locales": list(LOCALES),
        "routes": {},
    }
    total_fallbacks = Counter()

    for route in ROUTES:
        english_html, english_parser = parse(page_path(None, route))
        route_record: dict[str, object] = {}
        for locale in LOCALES:
            locale_directory = output_root / locale
            locale_directory.mkdir(parents=True, exist_ok=True)
            output_path = locale_directory / f"{route_key(route)}.json"
            existing_text: dict[str, str] = {}
            if output_path.exists():
                try:
                    existing_overlay = json.loads(
                        output_path.read_text(encoding="utf-8")
                    )
                    existing_text = existing_overlay.get("text", {})
                except (json.JSONDecodeError, OSError):
                    existing_text = {}
            localized_html, localized_parser = parse(page_path(locale, route))
            overlay = build_overlay(
                english_html,
                english_parser,
                localized_html,
                localized_parser,
                locale,
                route,
                existing_text,
            )
            output_path.write_text(
                json.dumps(overlay, ensure_ascii=False, separators=(",", ":")),
                encoding="utf-8",
            )
            fallback_count = len(overlay["audit"]["fallbackEnglishStrings"])
            total_fallbacks[locale] += fallback_count
            route_record[locale] = {
                "file": str(output_path.relative_to(ROOT)),
                "fallbackEnglishStrings": fallback_count,
            }
        manifest["routes"][f"/{route}/" if route else "/"] = route_record

    manifest["audit"] = {"fallbackEnglishStringsByLocale": dict(total_fallbacks)}
    output_root.mkdir(exist_ok=True)
    (output_root / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(manifest["audit"], ensure_ascii=False))


if __name__ == "__main__":
    main()
