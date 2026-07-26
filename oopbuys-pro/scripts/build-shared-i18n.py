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
            f"title\u241f{normalize(english_title.group(1))}",
            normalize(localized_title.group(1)),
        )

    English_visible = [
        normalize(text_value)
        for node in visible_elements(english_parser)
        for text_value in node.direct_text
        if normalize(text_value)
    ]
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
            localized_html, localized_parser = parse(page_path(locale, route))
            overlay = build_overlay(
                english_html,
                english_parser,
                localized_html,
                localized_parser,
                locale,
                route,
            )
            locale_directory = output_root / locale
            locale_directory.mkdir(parents=True, exist_ok=True)
            output_path = locale_directory / f"{route_key(route)}.json"
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
