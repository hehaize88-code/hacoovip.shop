#!/usr/bin/env python3
"""Full offline static translations. CI uses committed dictionaries only.
Authoring: next build, --extract, edit the local dictionaries, then run without flags.
Native locale navigation and site-tools.js preserve forms and catalogue filters;
English React hydration is removed from translations to prevent text reversion.
"""
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT, DATA, WORK = ROOT / "out", ROOT / "lib/translations", ROOT / "work"
SITE = "https://allchinabuy.pro"
LOCALES = {"fr": "fr-FR", "de": "de-DE", "it": "it-IT", "es": "es-ES"}
SKIP = {"EN", "FR", "DE", "IT", "ES", "FAQ", "QC", "USD", "AllChinaBuy", "AllChinaBuy Pro", "AllChinaBuy Pro Editorial"}
META_TEXT = {"description", "keywords", "og:title", "og:description", "og:image:alt", "twitter:title", "twitter:description", "twitter:image:alt"}
ATTR_TEXT = {"alt", "title", "aria-label", "placeholder"}
SCHEMA_TEXT = {"name", "headline", "description", "caption", "text"}
PAGES = [p for p in sorted(OUT.rglob("index.html")) if p.relative_to(OUT).parts[0] not in {*LOCALES, "404", "_not-found"}]

def route_for(path):
    return "/" + str(path.relative_to(OUT)).replace("index.html", "")

ROUTES = {route_for(p).rstrip("/") for p in PAGES}

def relevant(value):
    return bool(re.search(r"[A-Za-z]", value)) and value.strip() not in SKIP and not value.strip().startswith(("http:", "https:", "/images/"))

def without_hydration(source):
    def clean(match):
        text = match.group(0)
        return "" if 'src="/_next/' in text or "self.__next_f" in text or "self.__next_s" in text else text
    return re.sub(r"<script\b[^>]*>[\s\S]*?</script>", clean, source, flags=re.I)

class Renderer(HTMLParser):
    def __init__(self, route, locale=None, dictionary=None, collect=None):
        super().__init__(convert_charrefs=True)
        self.route, self.locale = route, locale
        self.dictionary, self.collect = dictionary or {}, collect
        self.output, self.script, self.script_type, self.style = [], False, "", False

    def translate(self, value):
        key = value.strip()
        if not relevant(key):
            return value
        if self.collect is not None:
            self.collect.add(key)
        elif self.locale:
            if key not in self.dictionary:
                raise RuntimeError(f"Missing {self.locale} translation: {key[:120]}")
            return value[:len(value)-len(value.lstrip())] + self.dictionary[key] + value[len(value.rstrip()):]
        return value

    def local_url(self, value):
        if value.startswith(SITE):
            suffix, sep, fragment = (value[len(SITE):] or "/").partition("#")
            if suffix.rstrip("/") in ROUTES:
                return SITE + ("/" + self.locale if self.locale else "") + suffix.rstrip("/") + "/" + (sep + fragment if sep else "")
        elif value.startswith("/") and not value.startswith("//"):
            path, sep, fragment = value.partition("#")
            if path.rstrip("/") in ROUTES:
                return ("/" + self.locale if self.locale else "") + path.rstrip("/") + "/" + (sep + fragment if sep else "")
        return value

    def schema(self, obj, key=""):
        if isinstance(obj, dict): return {k: self.schema(v, k) for k, v in obj.items()}
        if isinstance(obj, list): return [self.schema(v, key) for v in obj]
        if isinstance(obj, str):
            if key in SCHEMA_TEXT: return self.translate(obj)
            if key == "inLanguage" and self.locale: return self.locale
            if obj.endswith("#organization"): return obj
            if self.locale and key in {"url", "item", "mainEntityOfPage", "@id"}: return self.local_url(obj)
        return obj

    def handle_decl(self, decl): self.output.append("<!" + decl + ">")

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "link" and a.get("rel") == "alternate" and "hreflang" in a: return
        if self.locale and tag == "link" and a.get("href", "").startswith("/_next/") and a.get("as") == "script": return
        if tag == "html" and self.locale: a.update({"lang": LOCALES[self.locale], "data-static-locale": self.locale})
        if tag == "main" and self.locale: a["lang"] = LOCALES[self.locale]
        for k in ATTR_TEXT:
            if a.get(k): a[k] = self.translate(a[k])
        if tag == "meta":
            name = a.get("name") or a.get("property")
            if name in META_TEXT and a.get("content"): a["content"] = self.translate(a["content"])
            if name == "og:url": a["content"] = SITE + ("/" + self.locale if self.locale else "") + self.route
            if name == "og:locale" and self.locale: a["content"] = LOCALES[self.locale].replace("-", "_")
        if tag == "link" and a.get("rel") == "canonical": a["href"] = SITE + ("/" + self.locale if self.locale else "") + self.route
        if tag == "a" and a.get("hreflang") in {"en", *LOCALES}:
            code = a["hreflang"]
            a["href"] = ("/" + code if code != "en" else "") + self.route
            if code == (self.locale or "en"): a["aria-current"] = "page"
        elif self.locale and a.get("href"): a["href"] = self.local_url(a["href"])
        if tag == "script": self.script, self.script_type = True, a.get("type", "")
        if tag == "style": self.style = True
        self.output.append("<" + tag + "".join(" " + k + ('="' + html.escape(v, quote=True) + '"' if v is not None else "") for k, v in a.items()) + ">")

    def handle_endtag(self, tag):
        if tag == "head":
            for code in ["en", *LOCALES, "x-default"]:
                suffix = ("/" + code if code in LOCALES else "") + self.route
                self.output.append(f'<link rel="alternate" hreflang="{code}" href="{SITE}{suffix}">')
        self.output.append("</" + tag + ">")
        if tag == "script": self.script = False
        if tag == "style": self.style = False

    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        if self.script:
            self.output.append(json.dumps(self.schema(json.loads(data)), ensure_ascii=False).replace("<", "\\u003c") if self.script_type == "application/ld+json" else data)
        elif self.style: self.output.append(data)
        else: self.output.append(html.escape(self.translate(data), quote=False))

    def handle_comment(self, data): self.output.append("<!--" + data + "-->")

def collect_strings():
    strings = set()
    for p in PAGES:
        parser = Renderer(route_for(p), collect=strings)
        parser.feed(without_hydration(p.read_text()))
    return sorted(strings)

def publish():
    strings = collect_strings()
    dictionaries = {locale: json.loads((DATA / f"{locale}.json").read_text()) for locale in LOCALES}
    for locale, dictionary in dictionaries.items():
        missing = [s for s in strings if s not in dictionary]
        if missing: raise RuntimeError(f"{locale}: {len(missing)} missing translations; first: {missing[0][:120]}")
    for path in PAGES:
        source, route = path.read_text(), route_for(path)
        english = re.sub(r'<link\b(?=[^>]*\brel="alternate")(?=[^>]*\bhref[Ll]ang=)[^>]*>', '', source)
        alternate = ''.join(f'<link rel="alternate" hreflang="{code}" href="{SITE}{"/" + code if code in LOCALES else ""}{route}"/>' for code in ["en", *LOCALES, "x-default"])
        path.write_text(english.replace("</head>", alternate + "</head>"))
        for locale, dictionary in dictionaries.items():
            parser = Renderer(route, locale, dictionary)
            parser.feed(without_hydration(source))
            target = OUT / locale / path.relative_to(OUT)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("".join(parser.output))
    for locale in LOCALES:
        for p in (OUT / locale).rglob("*.txt"): p.unlink()
    ns, alt = "http://www.sitemaps.org/schemas/sitemap/0.9", "http://www.w3.org/1999/xhtml"
    ET.register_namespace("", ns); ET.register_namespace("xhtml", alt)
    sitemap = ET.Element(f"{{{ns}}}urlset")
    original = ET.parse(OUT / "sitemap.xml").getroot()
    dates = {n.findtext(f"{{{ns}}}loc").rstrip("/"): n.findtext(f"{{{ns}}}lastmod") for n in original}
    for path in PAGES:
        route = route_for(path)
        for locale in ["en", *LOCALES]:
            node = ET.SubElement(sitemap, f"{{{ns}}}url")
            ET.SubElement(node, f"{{{ns}}}loc").text = SITE + ("/" + locale if locale != "en" else "") + route
            modified = "2026-10-05T00:00:00.000Z" if locale != "en" else dates.get((SITE + route).rstrip("/"))
            if modified: ET.SubElement(node, f"{{{ns}}}lastmod").text = modified
            for code in ["en", *LOCALES, "x-default"]:
                ET.SubElement(node, f"{{{alt}}}link", {"rel": "alternate", "hreflang": code, "href": SITE + ("/" + code if code in LOCALES else "") + route})
    ET.ElementTree(sitemap).write(OUT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
    print(f"Published {len(PAGES)} pages in 5 languages; {len(PAGES)*5} sitemap URLs; all text comes from committed translations.")

if __name__ == "__main__":
    if "--extract" in sys.argv:
        WORK.mkdir(exist_ok=True)
        values = collect_strings()
        (WORK / "translation-source.json").write_text(json.dumps(values, ensure_ascii=False, indent=2))
        print(f"Extracted {len(values)} unique strings, {sum(map(len,values))} characters from {len(PAGES)} English pages.")
    else: publish()
