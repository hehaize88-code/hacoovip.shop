from __future__ import annotations


SITE = {
    "en": {
        "lang": "en",
        "prefix": "",
        "site_name": "Sugargoos.de",
        "nav": {
            "finds": "Finds",
            "categories": "Categories",
            "guides": "Guides",
            "articles": "Articles",
            "faq": "FAQ",
        },
        "catalog": "Main catalog",
        "locale": "DE",
        "locale_name": "Deutsch",
        "skip": "Skip to content",
        "read": "Read article",
        "view": "View record",
        "checked": "Last checked",
        "category": "Category",
        "product_id": "Catalog ID",
        "price": "Price snapshot",
        "open_catalog": "Open matching catalog record",
        "disclaimer": (
            "Independent research site. Sugargoos.de is not affiliated with Sugargoo "
            "or the brands named in catalog records. A listed link, image or title is "
            "not an authenticity or quality claim."
        ),
    },
    "de": {
        "lang": "de-DE",
        "prefix": "/de",
        "site_name": "Sugargoos.de",
        "nav": {
            "finds": "Finds",
            "categories": "Kategorien",
            "guides": "Anleitungen",
            "articles": "Artikel",
            "faq": "FAQ",
        },
        "catalog": "Hauptkatalog",
        "locale": "EN",
        "locale_name": "English",
        "skip": "Zum Inhalt springen",
        "read": "Artikel lesen",
        "view": "Datensatz ansehen",
        "checked": "Zuletzt geprüft",
        "category": "Kategorie",
        "product_id": "Katalog-ID",
        "price": "Preis-Snapshot",
        "open_catalog": "Passenden Katalogeintrag öffnen",
        "disclaimer": (
            "Unabhängige Recherche-Seite. Sugargoos.de ist weder mit Sugargoo noch "
            "mit den in Katalogeinträgen genannten Marken verbunden. Ein gelisteter "
            "Link, ein Bild oder ein Titel ist keine Echtheits- oder Qualitätsaussage."
        ),
    },
}


CATEGORIES = {
    "shoes": {
        "label": {"en": "Shoes", "de": "Schuhe"},
        "catalog_path": "/shoes/",
        "intro": {
            "en": (
                "Footwear records need more than a thumbnail. This category puts sizing, "
                "left-right symmetry, sole construction and parcel volume ahead of hype."
            ),
            "de": (
                "Bei Schuhen reicht ein Vorschaubild nicht. Hier stehen Maße, Links-rechts-"
                "Symmetrie, Sohlenaufbau und Paketvolumen vor Werbeversprechen."
            ),
        },
        "focus_title": {
            "en": "Fit evidence to collect",
            "de": "Nachweise für die Passform",
        },
        "focus": {
            "en": [
                "Ask for the insole length in centimetres; do not rely on EU/US labels alone.",
                "Compare toe-box shape, heel height and left-right symmetry in one frame.",
                "Check the size label, box label and selected order variant against each other.",
                "Look for glue overflow, uneven stitching and separation along the sole edge.",
                "Confirm whether the box is required, because it can materially increase volume.",
            ],
            "de": [
                "Innensohlenlänge in Zentimetern prüfen; EU-/US-Größen allein reichen nicht.",
                "Zehenbox, Fersenhöhe und Links-rechts-Symmetrie im selben Bild vergleichen.",
                "Größenetikett, Kartonetikett und bestellte Variante gegeneinander prüfen.",
                "Auf Klebereste, ungleichmäßige Nähte und offene Sohlenkanten achten.",
                "Klären, ob der Schuhkarton nötig ist, da er das Volumen deutlich erhöhen kann.",
            ],
        },
        "shipping_title": {
            "en": "Packing and Germany planning",
            "de": "Verpackung und Planung für Deutschland",
        },
        "shipping": {
            "en": [
                "Shoes are often charged by parcel volume rather than product price.",
                "Removing a retail box may reduce volume but also reduces transit protection.",
                "Battery, liquid or magnetic restrictions normally do not apply to basic footwear, but decorative electronics can change the route options.",
                "Treat the USD figure as a conversion snapshot; freight, VAT and customs charges are separate.",
            ],
            "de": [
                "Bei Schuhen kann das Paketvolumen wichtiger als der Warenpreis sein.",
                "Ohne Verkaufskarton sinkt eventuell das Volumen, aber auch der Transportschutz.",
                "Normale Schuhe haben meist keine Batterie- oder Flüssigkeitsmerkmale; leuchtende oder elektronische Teile können Versandlinien einschränken.",
                "Der USD-Wert ist nur eine Umrechnung; Fracht, Einfuhrumsatzsteuer und Zoll kommen getrennt hinzu.",
            ],
        },
    },
    "sweatshirts": {
        "label": {"en": "Sweatshirts", "de": "Sweatshirts"},
        "catalog_path": "/hoodies-sweaters/",
        "intro": {
            "en": (
                "Sweatshirts and knit tops are judged by garment measurements, fabric behaviour, "
                "print or embroidery alignment and how much dense material they add to a parcel."
            ),
            "de": (
                "Bei Sweatshirts und Strickteilen zählen Kleidungsmaße, Stoffverhalten, "
                "Ausrichtung von Druck oder Stickerei sowie das zusätzliche Paketgewicht."
            ),
        },
        "focus_title": {
            "en": "Measurements and surface checks",
            "de": "Maße und Oberflächenkontrolle",
        },
        "focus": {
            "en": [
                "Compare chest width, body length, shoulder width and sleeve length with a garment that fits.",
                "Check ribbing at the neck, cuffs and hem for waves, gaps or uneven tension.",
                "Ask for a straight-on image when print or embroidery placement matters.",
                "Inspect inside seams and the composition or care label without assuming fibre content from appearance.",
                "Confirm colour under neutral light; warehouse lighting can shift dark or muted tones.",
            ],
            "de": [
                "Brustweite, Länge, Schulterbreite und Ärmel mit einem passenden Kleidungsstück vergleichen.",
                "Rippbündchen an Hals, Ärmeln und Saum auf Wellen, Lücken und ungleiche Spannung prüfen.",
                "Bei Druck oder Stickerei ein gerades Frontalbild verlangen.",
                "Innennähte und Material-/Pflegeetikett prüfen; die Faser lässt sich nicht sicher vom Bild ableiten.",
                "Farbe möglichst bei neutralem Licht bestätigen, da Lagerlicht dunkle Töne verfälschen kann.",
            ],
        },
        "shipping_title": {
            "en": "Weight and consolidation",
            "de": "Gewicht und Konsolidierung",
        },
        "shipping": {
            "en": [
                "Heavy fleece and dense knitwear can raise actual parcel weight quickly.",
                "Folding or vacuum packing may reduce volume but can crease prints or structured details.",
                "Consolidate only after every item has passed measurement and visible-defect review.",
                "Seasonal route demand can change prices, so recalculate at parcel submission.",
            ],
            "de": [
                "Schwerer Fleece und dichter Strick erhöhen das tatsächliche Gewicht schnell.",
                "Falten oder Vakuumieren spart Volumen, kann aber Drucke und strukturierte Details belasten.",
                "Erst konsolidieren, wenn Maße und sichtbare Mängel jedes Teils geprüft sind.",
                "Versandpreise können saisonal wechseln; deshalb beim Einreichen neu berechnen.",
            ],
        },
    },
    "t-shirts": {
        "label": {"en": "T-shirts", "de": "T-Shirts"},
        "catalog_path": "/t-shirts/",
        "intro": {
            "en": (
                "T-shirt records focus on exact variant selection, garment measurements, collar "
                "shape, print registration and the limits of what standard warehouse photos prove."
            ),
            "de": (
                "T-Shirt-Datensätze konzentrieren sich auf die konkrete Variante, Kleidungsmaße, "
                "Kragenform, Druckausrichtung und die Grenzen normaler Lagerfotos."
            ),
        },
        "focus_title": {
            "en": "A T-shirt QC sequence",
            "de": "QC-Ablauf für T-Shirts",
        },
        "focus": {
            "en": [
                "Record the chosen colour and size before payment and compare both with the warehouse label.",
                "Measure pit-to-pit width and back length on a flat garment.",
                "Check collar symmetry, shoulder seams and side-seam twist.",
                "Use a straight photo to judge print centring; close-ups show edge quality but not placement.",
                "Inspect the inside label and hem stitching for missing or visibly broken construction.",
            ],
            "de": [
                "Farbe und Größe vor Zahlung notieren und später mit dem Lageretikett abgleichen.",
                "Brustweite und Rückenlänge am flach liegenden Kleidungsstück messen.",
                "Kragensymmetrie, Schulternähte und verdrehte Seitennähte prüfen.",
                "Druckzentrierung im geraden Gesamtbild prüfen; Nahaufnahmen zeigen nur die Kante.",
                "Innenetikett und Saumnaht auf fehlende oder sichtbar fehlerhafte Verarbeitung prüfen.",
            ],
        },
        "shipping_title": {
            "en": "Low weight does not remove import checks",
            "de": "Geringes Gewicht ersetzt keine Importprüfung",
        },
        "shipping": {
            "en": [
                "T-shirts consolidate efficiently, but several items still affect customs classification and the 2026 low-value item duty.",
                "Do not describe commercial purchases as gifts or use an inaccurate content declaration.",
                "A low product price does not prove material safety, authenticity or legal importability.",
                "Keep the order screenshot, QC evidence and final parcel declaration consistent.",
            ],
            "de": [
                "T-Shirts lassen sich gut bündeln; mehrere Artikel beeinflussen dennoch Zolltarif und die seit 2026 geltende Niedrigwert-Abgabe pro Warenart.",
                "Gewerbliche Käufe nicht als Geschenk und Inhalte nicht falsch deklarieren.",
                "Ein niedriger Preis beweist weder Materialsicherheit noch Echtheit oder legale Einfuhr.",
                "Bestellscreenshot, QC-Nachweise und Paketdeklaration müssen zusammenpassen.",
            ],
        },
    },
    "jackets": {
        "label": {"en": "Jackets", "de": "Jacken"},
        "catalog_path": "/jackets/",
        "intro": {
            "en": (
                "Outerwear needs category-specific evidence: garment dimensions, zipper travel, "
                "lining and embroidery condition, filling distribution and realistic packed volume."
            ),
            "de": (
                "Oberbekleidung braucht eigene Nachweise: Maße, Reißverschlusslauf, Futter und "
                "Stickerei, Verteilung der Füllung sowie realistisches Packvolumen."
            ),
        },
        "focus_title": {
            "en": "Construction and warmth checks",
            "de": "Verarbeitung und Wärmeleistung prüfen",
        },
        "focus": {
            "en": [
                "Record chest width, back length, shoulder width and sleeve length instead of trusting a size letter.",
                "Ask for the zipper to be shown closed and open; a still image cannot prove smooth operation.",
                "Compare cuffs, pocket placement and embroidery from left to right.",
                "For padded garments, inspect visible clumping or empty panels but do not infer fill composition from photos.",
                "Check lining, care label and detachable parts before accepting the item.",
            ],
            "de": [
                "Brustweite, Rückenlänge, Schulter und Ärmel notieren statt nur dem Größenbuchstaben zu vertrauen.",
                "Reißverschluss geschlossen und geöffnet zeigen lassen; ein Standbild beweist keinen reibungslosen Lauf.",
                "Bündchen, Taschen und Stickerei links und rechts vergleichen.",
                "Bei gefütterten Jacken auf Klumpen oder leere Kammern achten; die Füllung ist per Foto nicht sicher bestimmbar.",
                "Futter, Pflegeetikett und abnehmbare Teile vor Annahme prüfen.",
            ],
        },
        "shipping_title": {
            "en": "Why jackets change the parcel",
            "de": "Warum Jacken das Paket verändern",
        },
        "shipping": {
            "en": [
                "Puffers and structured jackets can produce high volumetric weight even when the scale weight looks moderate.",
                "Vacuum packing can reduce volume, but compression may not suit every fabric or construction.",
                "Use pre-shipment measurement when a jacket could move the parcel into another route or price tier.",
                "Recalculate Germany duties and VAT from the complete parcel, not from the jacket price alone.",
            ],
            "de": [
                "Daunenoptik und strukturierte Jacken können trotz moderatem Waagengewicht hohes Volumengewicht erzeugen.",
                "Vakuumieren spart Volumen, ist aber nicht für jedes Material und jede Konstruktion sinnvoll.",
                "Vorabvermessung nutzen, wenn die Jacke Versandlinie oder Preisstufe verändern kann.",
                "Abgaben und Einfuhrumsatzsteuer für das gesamte Paket kalkulieren, nicht nur für den Jackenpreis.",
            ],
        },
    },
    "pants-shorts": {
        "label": {"en": "Pants & shorts", "de": "Hosen & Shorts"},
        "catalog_path": "/pants-shorts/",
        "intro": {
            "en": (
                "Bottoms are comparison problems: waist method, rise, inseam, leg opening and "
                "fabric behaviour matter more than a generic S, M or L label."
            ),
            "de": (
                "Bei Hosen sind Vergleichsmaße entscheidend: Bundmessung, Leibhöhe, Innenbein, "
                "Beinöffnung und Stoffverhalten sind wichtiger als S, M oder L."
            ),
        },
        "focus_title": {
            "en": "Fit and hardware checklist",
            "de": "Checkliste für Passform und Hardware",
        },
        "focus": {
            "en": [
                "Confirm whether the waist is measured flat, stretched or around the full circumference.",
                "Record front rise, back rise, inseam and leg opening for the selected size.",
                "Check zipper, button, drawstring and pocket openings for visible damage or missing pieces.",
                "Compare wash, print or distressing across both legs and against the selected variant.",
                "Do not infer stretch percentage or fabric weight from a photograph.",
            ],
            "de": [
                "Klären, ob der Bund flach, gedehnt oder als voller Umfang gemessen wurde.",
                "Vordere/hintere Leibhöhe, Innenbein und Beinöffnung der gewählten Größe notieren.",
                "Reißverschluss, Knopf, Kordel und Taschen auf sichtbare Schäden oder fehlende Teile prüfen.",
                "Waschung, Druck oder Used-Effekte an beiden Beinen und mit der bestellten Variante vergleichen.",
                "Stretch-Anteil oder Stoffgewicht nicht aus einem Foto ableiten.",
            ],
        },
        "shipping_title": {
            "en": "Parcel planning for bottoms",
            "de": "Paketplanung für Hosen",
        },
        "shipping": {
            "en": [
                "Denim and heavy cotton raise actual weight; wide-leg cuts can also add volume.",
                "Remove unnecessary retail packaging only after deciding whether it protects hardware.",
                "Group similar garments only after all measurements have been accepted.",
                "Use the current route calculator because an old per-kilogram quote is not a live offer.",
            ],
            "de": [
                "Denim und schwere Baumwolle erhöhen das reale Gewicht; weite Schnitte auch das Volumen.",
                "Unnötige Verkaufsverpackung erst entfernen, wenn Hardware ausreichend geschützt bleibt.",
                "Ähnliche Kleidungsstücke erst nach Freigabe aller Maße bündeln.",
                "Den aktuellen Routenrechner nutzen; ein alter Kilopreis ist kein heutiges Angebot.",
            ],
        },
    },
    "headwear": {
        "label": {"en": "Headwear", "de": "Kopfbedeckungen"},
        "catalog_path": "/headwear/",
        "intro": {
            "en": (
                "Caps, visors and hats are shape-sensitive. Crown symmetry, brim curvature, "
                "embroidery placement and closure hardware need views that flat clothing does not."
            ),
            "de": (
                "Caps, Visors und Hüte sind formempfindlich. Kronensymmetrie, Schirmkrümmung, "
                "Stickposition und Verschluss brauchen andere Ansichten als flache Kleidung."
            ),
        },
        "focus_title": {
            "en": "Shape-focused photo plan",
            "de": "Fotoplan mit Fokus auf Form",
        },
        "focus": {
            "en": [
                "Request front, side and back views at the same camera height.",
                "Compare crown panels, brim centring and left-right embroidery placement.",
                "Check adjustable straps, buckles, snaps or hook-and-loop closures.",
                "Confirm circumference or adjustment range instead of assuming one size fits all.",
                "Ask how the item will be supported in the parcel if crushing would be difficult to reverse.",
            ],
            "de": [
                "Front-, Seiten- und Rückansicht auf gleicher Kamerahöhe anfordern.",
                "Kronensegmente, Zentrierung des Schirms und Stickposition links/rechts vergleichen.",
                "Verstellband, Schnalle, Druckknöpfe oder Klettverschluss prüfen.",
                "Umfang oder Verstellbereich bestätigen, statt Einheitsgröße anzunehmen.",
                "Klären, wie die Form im Paket gestützt wird, wenn Verformungen schwer rückgängig sind.",
            ],
        },
        "shipping_title": {
            "en": "Protect shape without wasting volume",
            "de": "Form schützen, Volumen begrenzen",
        },
        "shipping": {
            "en": [
                "Rigid crown support protects shape but increases volumetric weight.",
                "Soft hats can often be folded, but creases may remain in coated or structured fabric.",
                "Consolidating a hat with heavy shoes or hardware needs a deliberate packing note.",
                "The product price excludes any special packing and international freight.",
            ],
            "de": [
                "Starre Stützen schützen die Form, erhöhen aber das Volumengewicht.",
                "Weiche Hüte lassen sich oft falten; beschichtete oder strukturierte Stoffe können Knicke behalten.",
                "Bei Zusammenpacken mit Schuhen oder Metallteilen ist eine klare Packanweisung sinnvoll.",
                "Im Warenpreis sind Spezialverpackung und internationale Fracht nicht enthalten.",
            ],
        },
    },
    "accessories": {
        "label": {"en": "Accessories", "de": "Accessoires"},
        "catalog_path": "/accessories/",
        "intro": {
            "en": (
                "Accessories vary too much for a generic checklist. Dimensions, included parts, "
                "moving hardware, material claims and transport restrictions must be tied to the record."
            ),
            "de": (
                "Accessoires sind zu unterschiedlich für eine allgemeine Checkliste. Maße, Lieferumfang, "
                "bewegliche Teile, Materialangaben und Versandbeschränkungen müssen zum Datensatz passen."
            ),
        },
        "focus_title": {
            "en": "Record-specific evidence",
            "de": "Datensatzbezogene Nachweise",
        },
        "focus": {
            "en": [
                "Confirm exact length, width, thickness or circumference in centimetres.",
                "Photograph all included pieces together so missing accessories are visible.",
                "Check clasps, hinges, zippers, folding joints or watch crowns in more than one position.",
                "Treat metal, stone, lens and movement descriptions as seller claims unless independently tested.",
                "Match the warehouse variant to the saved order screenshot when one listing contains many styles.",
            ],
            "de": [
                "Länge, Breite, Dicke oder Umfang in Zentimetern bestätigen.",
                "Alle enthaltenen Teile zusammen fotografieren, damit fehlendes Zubehör sichtbar wird.",
                "Schließen, Scharniere, Reißverschlüsse, Faltgelenke oder Kronen in mehreren Positionen prüfen.",
                "Angaben zu Metall, Stein, Glas oder Uhrwerk bleiben Verkäuferangaben ohne unabhängigen Test.",
                "Bei vielen Varianten Lagerware mit dem gespeicherten Bestellscreenshot abgleichen.",
            ],
        },
        "shipping_title": {
            "en": "Restrictions depend on the object",
            "de": "Beschränkungen hängen vom Gegenstand ab",
        },
        "shipping": {
            "en": [
                "Liquids, batteries, strong magnets and certain materials can change eligible routes.",
                "Small objects need separate bags or boxes so parts do not disappear during consolidation.",
                "High apparent value can affect insurance and customs review even when physical weight is low.",
                "Check the live route restrictions for the exact item before payment and again before dispatch.",
            ],
            "de": [
                "Flüssigkeiten, Batterien, starke Magnete und bestimmte Materialien können Routen einschränken.",
                "Kleine Teile brauchen separate Beutel oder Boxen, damit sie bei Konsolidierung nicht verloren gehen.",
                "Hoher sichtbarer Wert kann Versicherung und Zollprüfung beeinflussen, obwohl das Gewicht gering ist.",
                "Routenbeschränkungen für den konkreten Gegenstand vor Zahlung und Versand erneut prüfen.",
            ],
        },
    },
    "electronics": {
        "label": {"en": "Electronics", "de": "Elektronik"},
        "catalog_path": "/electronics/",
        "intro": {
            "en": (
                "Electronics need the most cautious record: exact model, plug and voltage, battery "
                "status, included cable, functions that photos cannot prove and route eligibility."
            ),
            "de": (
                "Elektronik braucht besonders vorsichtige Datensätze: Modell, Stecker und Spannung, "
                "Batteriestatus, Kabel, nicht per Foto prüfbare Funktionen und Versandlinie."
            ),
        },
        "focus_title": {
            "en": "Compatibility and function limits",
            "de": "Kompatibilität und Funktionsgrenzen",
        },
        "focus": {
            "en": [
                "Record the exact model number, regional version, plug and supported voltage.",
                "Confirm whether a lithium battery is built in, removable, separate or absent.",
                "Photograph serial/model labels and every included cable or adapter.",
                "A powered-on screen does not prove battery health, radio compliance, waterproofing or long-term function.",
                "Do not treat warehouse photographs as an electrical safety certification.",
            ],
            "de": [
                "Exakte Modellnummer, Region, Stecker und unterstützte Spannung notieren.",
                "Klären, ob eine Lithiumbatterie eingebaut, entnehmbar, separat oder nicht vorhanden ist.",
                "Serien-/Modellaufkleber sowie jedes Kabel und jeden Adapter fotografieren.",
                "Ein eingeschalteter Bildschirm beweist weder Akkuzustand noch Funkkonformität, Wasserdichtheit oder Dauerfunktion.",
                "Lagerfotos sind keine elektrische Sicherheitszertifizierung.",
            ],
        },
        "shipping_title": {
            "en": "Battery and Germany route checks",
            "de": "Batterie- und Routenprüfung für Deutschland",
        },
        "shipping": {
            "en": [
                "Battery type and watt-hour rating can determine whether an international line accepts the item.",
                "EU product-safety, radio and charger requirements may apply independently of carrier acceptance.",
                "Use only a route that explicitly accepts the declared attributes; do not hide a battery or magnet.",
                "Function uncertainty, return difficulty and possible import refusal belong in the cost decision.",
            ],
            "de": [
                "Batterietyp und Wattstunden können entscheiden, ob eine Linie den Artikel akzeptiert.",
                "EU-Anforderungen an Produktsicherheit, Funk und Ladegeräte gelten unabhängig von der Transportannahme.",
                "Nur eine Linie nutzen, die deklarierte Merkmale ausdrücklich akzeptiert; Batterie oder Magnet nie verschweigen.",
                "Funktionsunsicherheit, schwierige Retoure und mögliche Einfuhrablehnung gehören in die Kostenentscheidung.",
            ],
        },
    },
}


GUIDES = [
    {
        "slug": "how-to-buy-with-sugargoo",
        "title": {
            "en": "How to Use Sugargoo in 2026",
            "de": "Sugargoo 2026 richtig nutzen",
        },
        "description": {
            "en": "A verification-first buying workflow from source link to warehouse decision and parcel submission.",
            "de": "Ein prüfbarer Ablauf vom Quelllink über die Lagerentscheidung bis zur Paketeinreichung.",
        },
    },
    {
        "slug": "sugargoo-qc-photos-guide",
        "title": {
            "en": "Sugargoo QC Photos Guide",
            "de": "Sugargoo-QC-Fotoleitfaden",
        },
        "description": {
            "en": "What standard warehouse photos can confirm, what they cannot, and when to request more evidence.",
            "de": "Was normale Lagerfotos bestätigen können, wo ihre Grenzen liegen und wann weitere Nachweise nötig sind.",
        },
    },
    {
        "slug": "shipping-from-china-to-germany",
        "title": {
            "en": "Shipping from China to Germany",
            "de": "Versand von China nach Deutschland",
        },
        "description": {
            "en": "Plan weight, dimensions, route restrictions, VAT and the July 2026 customs change without false promises.",
            "de": "Gewicht, Maße, Routen, Einfuhrumsatzsteuer und die Zolländerung vom Juli 2026 ohne falsche Versprechen planen.",
        },
    },
    {
        "slug": "sugargoo-spreadsheet-safety",
        "title": {
            "en": "Sugargoo Spreadsheet Safety",
            "de": "Sugargoo-Spreadsheet sicher nutzen",
        },
        "description": {
            "en": "A practical method for testing links, variants, evidence and cost before trusting a spreadsheet row.",
            "de": "Links, Varianten, Nachweise und Kosten prüfen, bevor man einer Spreadsheet-Zeile vertraut.",
        },
    },
    {
        "slug": "w2c-and-qc-explained",
        "title": {
            "en": "W2C and QC Explained",
            "de": "W2C und QC erklärt",
        },
        "description": {
            "en": "Translate two common shopping terms into a repeatable product-research workflow.",
            "de": "Zwei häufige Shopping-Begriffe in einen wiederholbaren Recherche-Ablauf übersetzen.",
        },
    },
]
