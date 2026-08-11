export type ArticleLocale = "en" | "de" | "fr" | "es" | "it" | "pl";

export type ArticleSection = { h: string; paragraphs: string[]; bullets?: string[] };
export type ArticleContent = { intro: string; sections: ArticleSection[] };

const en: Record<string, ArticleContent> = {
  "usfans-spreadsheet-guide": {
    intro: "A USFans spreadsheet can shorten product discovery, but it should never replace verification. This practical 2026 workflow explains how to turn a promising row into a checked product route, a precise order record and a useful QC plan without treating an old link, a price snapshot or an anonymous rating as a guarantee.",
    sections: [
      { h: "What a spreadsheet can—and cannot—do", paragraphs: [
        "A spreadsheet is best understood as a discovery layer. It groups product links into categories so that you can compare ideas without repeating the same broad search. It may help you find a hoodie, shoe, jersey or accessory that matches the style you want. It does not hold inventory, control the seller, lock a price or prove that the item in today’s listing is identical to the item reviewed months ago.",
        "That distinction matters because marketplace listings change. A seller can remove a color, replace photographs, edit a title, change the price or reuse a listing. Treat every row as a lead that must be opened and checked. A smaller sheet with current, readable links is more useful than thousands of rows whose destinations and variants have not been reviewed recently."
      ]},
      { h: "Start with intent, not an endless brand list", paragraphs: [
        "Write down the product type, fit, material clues and measurable details that actually matter before searching. “Heavyweight zip hoodie, relaxed fit, dark grey” is a better starting point than a single broad brand word. For shoes, include silhouette, intended use, color and size range. For a jersey, include club or country, season, sleeve style and whether you want a fan or player cut.",
        "Use those terms to create a shortlist, then compare only a few live pages at a time. This site’s search form sends the exact phrase you enter to the matching catalog results. It is designed to avoid the common dead end where a search button opens a generic all-products page and loses the user’s keyword."
      ]},
      { h: "Verify the live destination before comparing products", paragraphs: [
        "Open the current product page and confirm four basics: the destination loads, the title still describes the expected item, the required variant exists and the visible price applies to that variant. Watch for price ranges in which the lowest number belongs to an accessory, deposit or different option. Record the exact color, size and version instead of relying on a screenshot of the sheet.",
        "If a link no longer matches its spreadsheet description, discard it or search again. Do not rescue an outdated row by assuming a visually similar option is equivalent. Checking the live destination is also the point where you should review visible seller notes, size information, product measurements and any current purchasing notice shown in the order flow."
      ]},
      { h: "Build an order record that survives the warehouse stage", paragraphs: [
        "Save the URL, date checked, selected variant, visible product price and any seller note that affected your decision. A short record prevents confusion when several similar products reach storage. It also gives you something concrete to compare with the warehouse record: ordered color, label size, model details and included pieces.",
        "USFans publicly describes an agent workflow in which a user submits a product link, the item is purchased, received at a Chinese warehouse, inspected and later prepared for international shipping. Some current public product pages describe three to seven HD inspection photos, but the number and available views can vary. The live account record should therefore remain the final source for a specific order."
      ]},
      { h: "Plan QC questions before the item arrives", paragraphs: [
        "A useful QC request is category-specific. For shoes, plan to check both lateral sides, the heel pair, outsole, toe shape, size label and insole or outsole measurement when available. For clothing, check front and back, seams, print or embroidery placement, care and size labels, visible marks and practical garment measurements. For a cap or bag, focus on symmetry, closures, hardware, stitching and included parts.",
        "Photos are evidence of visible condition, not a laboratory test. They cannot confirm fiber composition, smell, long-term durability, internal construction or electrical safety. If a decisive detail is missing, ask a narrow question while the item is still in storage. “Please show the size tag and measure the chest width flat” is more actionable than “Please check quality.”"
      ]},
      { h: "Estimate the complete cost, not only the row price", paragraphs: [
        "Keep product price separate from domestic seller delivery, optional services and international parcel shipping. Exchange rates can also move between product purchase and parcel submission. The cheapest row in a spreadsheet may not be the cheapest delivered option if it is unusually heavy, ships in a large rigid box or requires protective packing.",
        "Volume matters as well as scale weight. Carriers can calculate a volume-based weight for large, light parcels, subject to the current line’s formula and rules. Shoes, padded coats and boxed accessories are common cases where packaging decisions change the final billable figure. Wait for the packed parcel information before treating an estimate as final."
      ]},
      { h: "Check route compatibility before committing", paragraphs: [
        "A purchasable item is not automatically accepted by every international line. Batteries, liquids, powders, cosmetics, magnets and other sensitive goods commonly face narrower routing choices. Destination coverage, parcel dimensions, declared information and current restrictions can also change what is available. Check the live route list and current support information for the exact destination and contents.",
        "USFans states publicly that its service reaches more than 200 countries and regions. That is a broad coverage statement, not a promise that every product has a route to every address. A careful spreadsheet guide should preserve that boundary instead of turning a platform-level claim into a parcel-level guarantee."
      ]},
      { h: "Use a four-step routine every time", paragraphs: [
        "The reliable sequence is simple: discover, verify, inspect and plan. Discover with categories and specific search terms. Verify the live page and exact variant. Inspect warehouse evidence against your saved order record. Plan packaging, route and the full parcel cost only after the item information is available.",
        "This routine is slower than clicking the first attractive row, but it removes avoidable mistakes. It also makes a spreadsheet genuinely useful for 2026 searchers: not a wall of unsupported “best” claims, but a practical bridge between discovery and a documented purchase decision."
      ]},
      { h: "Judge the quality of the spreadsheet itself", paragraphs: [
        "A trustworthy directory makes its purpose and limits clear. Look for understandable category names, working destinations, visible update information, consistent price context and practical explanations of QC and parcel cost. Be cautious when a sheet publishes huge product counts without showing the records, labels every item “best quality,” or gives precise success percentages without a source. Those claims do not help you verify a specific order.",
        "Good maintenance is also visible in small details. Search should preserve the user’s keyword. Category buttons should open the matching category, not a generic homepage. Product cards should lead to the intended product, and unavailable links should be removed instead of silently redirected. Articles should answer different questions rather than repeating the same brand paragraph with a new title.",
        "Finally, check whether the site keeps a clean boundary between editorial guidance and the destination catalog. A useful spreadsheet does not need to send users through unrelated agents, marketplaces or competing directories. Clear routing, current records and honest uncertainty create more value than an inflated number at the top of the page."
      ]}
    ]
  },
  "usfans-qc-photos-guide": {
    intro: "USFans QC photos can reduce uncertainty before international shipping, but only if you inspect them in a consistent order and understand their limits. This guide turns warehouse images into a practical decision record without pretending that photographs can guarantee materials, durability or route eligibility.",
    sections: [
      { h: "Begin with the order record, not the photograph", paragraphs: [
        "Before judging an image, reopen the order record and confirm what was actually selected: product, color, size, model and any included pieces. A photograph can be perfectly clear and still show the wrong variant. Keep the original listing details and your saved notes beside the warehouse images so the comparison starts from facts rather than memory.",
        "USFans publicly describes warehouse receipt and quality inspection as part of its purchasing workflow. Some current product pages state that three to seven HD inspection photos may be supplied. Treat that as a description of the visible service on those pages, not a universal promise about every category or order."
      ]},
      { h: "Inspect the full silhouette before zooming in", paragraphs: [
        "Look at the item from a distance first. Check overall shape, proportions, color family and symmetry. For a shoe pair, compare toe shapes, heel heights and the left-right balance. For clothing, look for twisting, uneven hems, misplaced panels or obvious differences between sleeves. For bags and caps, check whether the structure appears centered and balanced.",
        "Warehouse lighting, camera exposure and screen settings can change perceived color. A slight shade difference between the listing and QC image is not automatically a defect. If color is decisive, request a clearer neutral-light view rather than making a confident judgment from one compressed photograph."
      ]},
      { h: "Move through construction details in a fixed order", paragraphs: [
        "After the overall view, inspect seams, edge finishing, prints, embroidery, labels, zippers, buttons and other hardware. Use the same order each time so you do not spend all your attention on a logo and miss a broken closure or visible stain. Zoom enough to identify a problem, but remember that compression and sharpening can create false edges.",
        "Ask whether a detail is present, aligned, complete and visibly undamaged. Those are questions a photograph can often answer. Avoid turning a warehouse image into an unsupported craftsmanship score. A picture may reveal a loose thread or scratch, but it cannot show how a fabric feels or how a seam will perform after repeated use."
      ]},
      { h: "Use measurements instead of trusting a letter size", paragraphs: [
        "Confirm the visible size label, but do not stop there. Letter sizes and seller charts can vary. For clothing, flat chest width, length, shoulder and sleeve measurements are more useful when compared with an item that already fits you. For shoes, an insole or outsole measurement can help, provided you understand which measurement was taken and how.",
        "Small measurement differences can come from the measuring method, garment position or ruler angle. Define the needed measurement precisely and allow a sensible tolerance. If the photograph does not clearly show both endpoints, ask for a better view rather than reading an exact number from an ambiguous angle."
      ]},
      { h: "Separate defects from temporary packaging effects", paragraphs: [
        "Folds, compressed shapes and light creases may result from domestic transport or temporary warehouse packaging. Missing components, broken hardware, stains, holes, severe asymmetry and clearly incorrect variants require a different response. Compare multiple views before deciding whether what you see is surface presentation or a material problem.",
        "When you contact support, point to the exact area and question. “There is a dark mark near the lower-left seam; please confirm whether it wipes off” is easier to act on than “The quality looks bad.” Specific requests create a better written record and reduce the chance that the answer addresses the wrong detail."
      ]},
      { h: "Know the hard limits of QC photography", paragraphs: [
        "QC photos cannot prove fiber composition, odor, internal construction, electrical safety, water resistance, colorfastness or long-term durability. They also cannot guarantee authenticity or legal importability. Those questions require seller documentation, testing, policy checks or judgment beyond what a warehouse camera can provide.",
        "Route restrictions are a separate issue. An item can look flawless and still be limited because it contains a battery, liquid, powder, magnet or another sensitive component. Confirm live shipping eligibility before parcel payment. Visual approval and route approval are two different decisions."
      ]},
      { h: "Make the after-sales decision while evidence is current", paragraphs: [
        "If the item is wrong or visibly defective, review the current order page and available after-sales options promptly. Some public USFans listings display a return window tied to warehouse arrival, including five-day wording on certain pages, but seller acceptance, category rules and timing can vary. Never convert an item-specific notice into a site-wide guarantee.",
        "Save the warehouse images, order variant, dates and support responses before choosing to keep, exchange or return the item. The goal is a traceable decision based on what was visible at the time, not a vague recollection after the parcel has already left storage."
      ]},
      { h: "Finish with a one-minute approval checklist", paragraphs: [
        "Confirm the variant, visible condition, required measurements, included pieces and any support answer. Then check that you understand what remains unknown. If a missing view could change the decision, request it before parcel submission. If the uncertainty concerns material, durability or safety, acknowledge that another photograph may not solve it.",
        "A disciplined QC workflow does not promise perfection. It improves the odds of catching visible errors while action is still possible. That is the useful role of USFans QC photos: evidence for a better decision, not a badge that makes every future outcome certain."
      ]},
      { h: "Apply the checklist differently by category", paragraphs: [
        "For shoes, compare the pair as a pair: toe shape, heel height, side panels, outsole pattern, size labels and a useful length measurement. A close-up of one logo cannot reveal whether the left and right shoes match. For hoodies and T-shirts, prioritize flat garment measurements, print or embroidery placement, seams, cuffs, hem and visible marks. Folded fabric can hide large areas, so request a clear front or back view if needed.",
        "For jerseys, check the ordered name, number, sleeve patches, size label and whether printed elements appear aligned. For caps and structured bags, inspect symmetry, closure, brim or base shape, hardware and included straps or parts. Electronics require a different boundary: appearance may be checked, but plug compatibility, battery rules, function and safety cannot be established from surface images alone.",
        "Do not turn these lists into a demand for unnecessary photographs. Start with the images already provided, identify the one uncertainty that could change your decision, and request only the evidence needed to resolve it. This keeps the review focused and creates a clearer record if after-sales action becomes necessary.",
        "A simple scoring note can keep the decision objective: correct variant, visible condition, required measurement, included components and unresolved limits. Mark each point as confirmed, unclear or not applicable. Do not convert that note into a universal quality score; it exists only to document what this order’s images did and did not show. If a decisive point remains unclear, pause approval and ask for the narrowest useful clarification. Review the reply against the same checklist instead of starting a completely new judgment. This preserves a clear trail from the original order through the final warehouse decision and prevents an attractive close-up from distracting you from a missing measurement or wrong variant."
      ]}
    ]
  },
  "usfans-shipping-cost-guide": {
    intro: "USFans shipping cost cannot be reduced to one universal rate. The delivered total depends on product cost, domestic delivery, services, packed weight, parcel dimensions, route rules and destination. This 2026 guide shows how to estimate those parts without copying another buyer’s total or inventing a guaranteed price.",
    sections: [
      { h: "Separate the four cost layers", paragraphs: [
        "Start with four lines: product price, domestic seller delivery, optional warehouse or packaging services, and international parcel shipping. Keeping them separate makes it easier to see why a low product price can still lead to a high delivered total. Currency conversion may also move between the purchase and parcel stages.",
        "Taxes, declarations and customs treatment depend on destination, contents and current rules. They should not be copied from a different buyer’s parcel as if they were fixed. Use any calculator as an estimate and keep a buffer until the packed parcel and live route choices are available."
      ]},
      { h: "Understand actual weight and volumetric weight", paragraphs: [
        "Actual weight is the parcel’s scale weight. Volumetric weight represents the space a parcel occupies and is calculated from dimensions using a divisor set by the current carrier or route. A line may charge according to whichever billable figure its rules specify. That is why a large, light box can cost more than expected.",
        "Shoeboxes, padded jackets, rigid gift packaging and loosely packed accessories are typical volume-sensitive cases. Product-page measurements help with early planning, but the final packed dimensions are what matter. Do not present an early estimate as a final invoice."
      ]},
      { h: "Consolidation can help, but it is not automatically cheaper", paragraphs: [
        "USFans publicly describes consolidation as part of the warehouse-to-international-shipping workflow. Combining several items may reduce repeated base charges and make one parcel easier to track. It can also increase dimensions, cross a weight bracket or remove access to a route with a lower size limit.",
        "Compare one consolidated parcel with sensible split options when the contents are bulky, sensitive or very different. The right decision depends on the current route table and packed data, not on a rule that consolidation is always best."
      ]},
      { h: "Choose packaging by risk and volume", paragraphs: [
        "Removing unnecessary retail packaging can reduce volume, but protection still matters. Soft clothing may need little structure, while crush-sensitive shoes, electronics, ceramics or framed items may need stronger protection. Extra wrapping, corner protection or reinforcement can add weight and dimensions, so choose services for a reason.",
        "Write packaging instructions that identify the risk: protect corners, keep a box, waterproof the outer layer or separate a fragile component. Avoid adding every option by default. Good parcel planning balances damage risk, billable size and the value of the contents."
      ]},
      { h: "Check sensitive-item and destination restrictions early", paragraphs: [
        "Batteries, liquids, powders, cosmetics, magnets and other sensitive goods often have fewer available lines. A product being purchasable does not guarantee that every carrier will accept it. Confirm the live restrictions for the exact contents and destination before assuming that a popular route applies.",
        "USFans states that it serves more than 200 countries and regions. That describes broad platform coverage; it does not mean every shipping method serves every address or accepts every item. Parcel size limits, destination coverage and current operational conditions still control the choices shown at submission."
      ]},
      { h: "Compare routes on more than the headline price", paragraphs: [
        "Review accepted item types, billing method, size limits, tracking, estimated transit range, compensation terms and destination coverage. The cheapest displayed line may have restrictions that make it unsuitable. The fastest estimate is not a delivery guarantee because customs, weather, peak periods and local handoffs can affect movement.",
        "Record the route and quote date when comparing options. A screenshot from months ago or from another destination is weak evidence. Use the options visible for the actual packed parcel and current address."
      ]},
      { h: "Audit the parcel before payment", paragraphs: [
        "Confirm recipient name, address format, contact details, contents, quantity, packaging requests, declared information and billable weight. Check that prohibited or sensitive items have not been mixed into an incompatible parcel. Save the submitted estimate and any support guidance that affected the route decision.",
        "This last review is where many preventable errors can be caught. A correct product and good QC record do not compensate for a wrong address, unsuitable line or misunderstood packaging request."
      ]},
      { h: "Use a realistic planning formula", paragraphs: [
        "For planning, think in ranges: current product total plus domestic delivery plus selected services plus an estimated international range, followed by any destination-specific obligations. Recalculate after warehouse receipt and again after packing. Keep enough margin for exchange-rate and measurement changes.",
        "The goal is not to predict an exact USFans shipping cost before the parcel exists. It is to understand the variables, avoid false certainty and make the final route comparison with current data. That produces a more useful answer than a promotional promise of the cheapest shipping."
      ]},
      { h: "Work through an estimate without inventing a rate", paragraphs: [
        "Suppose you are comparing a hoodie, a pair of shoes and two small accessories. Begin with the current product totals and domestic seller delivery shown during ordering. Note whether the shoes include a rigid box and whether any item is sensitive. Do not insert a made-up international price per kilogram; wait for the applicable calculator or route quote for the destination.",
        "At warehouse arrival, replace assumptions with recorded weights and useful measurements. Decide whether the shoe box is necessary, which protection is justified and whether all items can use the same line. After packing, compare the billable figure and available routes. If volumetric weight is higher than scale weight under a line’s current rule, use the line’s displayed billable basis rather than the smaller number you prefer.",
        "This worked method produces a range before packing and a firmer comparison afterward. It also shows which decision changes the total: product choice, packaging, consolidation or route. That is much more actionable than repeating another buyer’s parcel price from a different month and destination."
      ]},
      { h: "Know when a split parcel deserves comparison", paragraphs: [
        "A split is worth checking when one sensitive item removes several otherwise suitable routes, when a bulky box pushes the entire parcel above a size limit, or when contents have very different protection needs. Splitting can restore options, but it can also repeat base charges and create two tracking and customs events. It is a comparison, not an automatic saving.",
        "Use the current packed data to compare at least the meaningful scenarios: one consolidated parcel and a sensible split. Include the services and packaging that each scenario actually needs. Avoid artificial comparisons in which one option includes protection and the other does not.",
        "Whichever structure you choose, review each address, declaration, route and tracking record separately. The correct result is the option that fits the contents, destination, risk tolerance and current line rules—not necessarily the one with the lowest headline number.",
        "Keep the comparison dated and tied to the actual parcel data. Route prices and availability can change, so an older screenshot should not override the live choices shown at submission. If a support answer affects the split, save it beside the two estimates. That record makes later tracking and cost review much clearer. Recheck both parcels after any repacking request because new dimensions can change the comparison. The final decision should use the last confirmed measurements today, not the figures recorded before packaging was adjusted."
      ]}
    ]
  }
};

const localized: Record<Exclude<ArticleLocale, "en">, Record<string, ArticleContent>> = {
  de: {}, fr: {}, es: {}, it: {}, pl: {}
};

const fallback: Record<Exclude<ArticleLocale, "en">, Record<string, {intro:string; headings:string[]}>> = {
  de: {
    "usfans-spreadsheet-guide": { intro:"Ein USFans Spreadsheet erleichtert die Produktsuche, ersetzt aber keine Prüfung. Dieser Leitfaden zeigt den vollständigen Ablauf von der Tabellenzeile bis zur dokumentierten Kaufentscheidung.", headings:["Möglichkeiten und Grenzen eines Spreadsheets","Mit konkreter Suchabsicht beginnen","Die aktuelle Zielseite prüfen","Bestelldaten für das Lager sichern","QC-Fragen vorab planen","Gesamtkosten statt Zeilenpreis betrachten","Versandfähigkeit früh prüfen","Entdecken, prüfen, kontrollieren, planen","Qualität des Spreadsheets beurteilen"] },
    "usfans-qc-photos-guide": { intro:"USFans QC-Fotos reduzieren Unsicherheit, wenn sie systematisch geprüft werden. Sie zeigen sichtbare Merkmale, ersetzen aber keine Material-, Sicherheits- oder Haltbarkeitsprüfung.", headings:["Mit den Bestelldaten beginnen","Zuerst die Gesamtsilhouette prüfen","Konstruktionsdetails in fester Reihenfolge","Maße statt Buchstabengröße nutzen","Mängel von Verpackungseffekten trennen","Grenzen der Fotoprüfung kennen","After-Sales rechtzeitig entscheiden","Abschlusscheck vor Freigabe","Checkliste nach Produktkategorie anwenden"] },
    "usfans-shipping-cost-guide": { intro:"USFans Versandkosten hängen von Produkt, Inlandsversand, Services, Gewicht, Volumen, Route und Ziel ab. Dieser Leitfaden erklärt eine realistische Schätzung ohne erfundene Festpreise.", headings:["Vier Kostenschichten trennen","Tatsächliches und Volumengewicht verstehen","Konsolidierung sachlich vergleichen","Verpackung nach Risiko wählen","Beschränkungen früh prüfen","Routen nicht nur nach Preis vergleichen","Paket vor Zahlung kontrollieren","Mit realistischen Bandbreiten planen","Eine Schätzung ohne erfundene Rate durchführen","Geteilte Pakete sinnvoll vergleichen"] }
  },
  fr: {
    "usfans-spreadsheet-guide": { intro:"Un spreadsheet USFans accélère la découverte, mais ne remplace jamais la vérification. Ce guide suit tout le parcours, du lien repéré à une décision documentée.", headings:["Ce qu’un spreadsheet peut réellement faire","Commencer par une intention précise","Vérifier la destination actuelle","Conserver une fiche de commande","Préparer le contrôle QC","Calculer le coût complet","Vérifier la compatibilité des lignes","Découvrir, vérifier, inspecter, planifier","Évaluer la qualité du spreadsheet"] },
    "usfans-qc-photos-guide": { intro:"Les photos QC USFans réduisent l’incertitude lorsqu’elles sont contrôlées dans un ordre constant. Elles montrent l’état visible sans garantir matière, sécurité ou durabilité.", headings:["Commencer par la commande","Observer la silhouette complète","Contrôler les détails dans le même ordre","Privilégier les mesures","Distinguer défauts et emballage","Connaître les limites des images","Décider du service après-vente à temps","Terminer par une liste de contrôle","Adapter le contrôle à la catégorie"] },
    "usfans-shipping-cost-guide": { intro:"Le coût d’expédition USFans dépend du produit, du transport intérieur, des services, du poids, du volume, de la ligne et de la destination. Voici une méthode réaliste, sans tarif inventé.", headings:["Séparer quatre couches de coût","Comprendre poids réel et volumétrique","Comparer la consolidation","Choisir l’emballage selon le risque","Contrôler les restrictions tôt","Comparer au-delà du prix","Auditer le colis avant paiement","Planifier avec une fourchette réaliste","Construire une estimation sans inventer de tarif","Comparer un colis séparé"] }
  },
  es: {
    "usfans-spreadsheet-guide": { intro:"Un spreadsheet de USFans agiliza el descubrimiento, pero nunca sustituye la verificación. Esta guía recorre el proceso completo desde una fila hasta una decisión documentada.", headings:["Qué puede y qué no puede hacer","Buscar con una intención concreta","Verificar la página activa","Guardar un registro del pedido","Preparar las preguntas de QC","Calcular el coste completo","Comprobar la compatibilidad de ruta","Descubrir, verificar, inspeccionar y planificar","Evaluar la calidad del spreadsheet"] },
    "usfans-qc-photos-guide": { intro:"Las fotos QC de USFans reducen incertidumbre cuando se revisan con un orden constante. Muestran el estado visible, pero no garantizan material, seguridad ni durabilidad.", headings:["Empezar por el pedido","Revisar primero la silueta","Seguir un orden para los detalles","Usar medidas, no solo tallas","Separar defectos y efectos del embalaje","Conocer los límites de las fotos","Decidir la posventa a tiempo","Cerrar con una lista de aprobación","Adaptar la revisión a la categoría"] },
    "usfans-shipping-cost-guide": { intro:"El coste de envío de USFans depende del producto, entrega nacional, servicios, peso, volumen, ruta y destino. Esta guía explica una estimación realista sin inventar tarifas.", headings:["Separar cuatro capas de coste","Entender peso real y volumétrico","Comparar la consolidación","Elegir embalaje según el riesgo","Revisar restricciones pronto","Comparar más que el precio","Auditar el paquete antes de pagar","Planificar con un rango realista","Crear una estimación sin inventar tarifas","Comparar un paquete dividido"] }
  },
  it: {
    "usfans-spreadsheet-guide": { intro:"Uno spreadsheet USFans accelera la scoperta, ma non sostituisce la verifica. Questa guida segue l’intero percorso dal link trovato alla decisione documentata.", headings:["Cosa può fare uno spreadsheet","Partire da un intento preciso","Verificare la pagina attuale","Salvare un registro dell’ordine","Pianificare le domande QC","Calcolare il costo completo","Controllare la compatibilità della rotta","Scoprire, verificare, controllare e pianificare","Valutare la qualità dello spreadsheet"] },
    "usfans-qc-photos-guide": { intro:"Le foto QC USFans riducono l’incertezza quando vengono controllate con un ordine coerente. Mostrano condizioni visibili senza garantire materiale, sicurezza o durata.", headings:["Partire dai dati dell’ordine","Controllare la silhouette completa","Seguire un ordine per i dettagli","Usare misure reali","Separare difetti ed effetti dell’imballo","Conoscere i limiti delle foto","Decidere il post-vendita in tempo","Concludere con una checklist","Adattare il controllo alla categoria"] },
    "usfans-shipping-cost-guide": { intro:"Il costo di spedizione USFans dipende da prodotto, consegna interna, servizi, peso, volume, rotta e destinazione. Questa guida spiega una stima realistica senza tariffe inventate.", headings:["Separare quattro livelli di costo","Capire peso reale e volumetrico","Confrontare il consolidamento","Scegliere l’imballaggio per rischio","Controllare presto le restrizioni","Confrontare oltre il prezzo","Verificare il pacco prima del pagamento","Pianificare con un intervallo realistico","Creare una stima senza inventare tariffe","Confrontare un pacco diviso"] }
  },
  pl: {
    "usfans-spreadsheet-guide": { intro:"USFans spreadsheet przyspiesza wyszukiwanie, ale nie zastępuje weryfikacji. Ten poradnik prowadzi od znalezionego wiersza do udokumentowanej decyzji zakupowej.", headings:["Możliwości i ograniczenia arkusza","Zacznij od konkretnej potrzeby","Sprawdź aktualną stronę","Zapisz dane zamówienia","Zaplanuj pytania QC","Policz pełny koszt","Sprawdź zgodność z trasą","Odkryj, zweryfikuj, sprawdź i zaplanuj","Oceń jakość spreadsheetu"] },
    "usfans-qc-photos-guide": { intro:"Zdjęcia QC USFans ograniczają niepewność, jeśli są sprawdzane w stałej kolejności. Pokazują stan widoczny, ale nie gwarantują materiału, bezpieczeństwa ani trwałości.", headings:["Zacznij od danych zamówienia","Najpierw oceń sylwetkę","Sprawdzaj detale w stałej kolejności","Używaj pomiarów","Oddziel wady od efektów pakowania","Poznaj granice zdjęć","Podejmij decyzję posprzedażową na czas","Zakończ listą kontrolną","Dostosuj kontrolę do kategorii"] },
    "usfans-shipping-cost-guide": { intro:"Koszt wysyłki USFans zależy od produktu, dostawy krajowej, usług, wagi, objętości, trasy i kraju. Poradnik pokazuje realistyczne szacowanie bez zmyślonych stawek.", headings:["Rozdziel cztery warstwy kosztu","Zrozum wagę rzeczywistą i objętościową","Porównaj konsolidację","Dobierz opakowanie do ryzyka","Sprawdź ograniczenia wcześnie","Porównuj więcej niż cenę","Sprawdź paczkę przed płatnością","Planuj realistyczny przedział","Zbuduj szacunek bez zmyślonej stawki","Porównaj dzieloną paczkę"] }
  }
};

const localizedParagraphs: Record<Exclude<ArticleLocale, "en">, string[]> = {
  de: [
    "Öffne immer die aktuelle Produktseite und bestätige Titel, Variante, Preis und sichtbare Hinweise. Ein alter Link ist nur ein Ausgangspunkt; Bestand, Farben und Verkäuferangaben können sich ändern. Dokumentiere URL, Datum, Größe und Farbe, damit die Lagerdaten später eindeutig verglichen werden können.",
    "Arbeite mit konkreten Produkttypen, Passform, Farbe und messbaren Merkmalen. Der Preis des Artikels ist nur ein Teil. Inlandsversand, optionale Leistungen, Wechselkurs, Paketgewicht, Volumen und internationale Route beeinflussen die Gesamtkosten getrennt.",
    "USFans beschreibt öffentlich einen Ablauf mit Linkeinreichung, Einkauf, Lagereingang, Qualitätsprüfung, Konsolidierung und internationalem Versand. Einige öffentliche Produktseiten nennen drei bis sieben HD-Prüffotos. Umfang und Ansichten können je Bestellung variieren; entscheidend sind die aktuellen Kontodaten.",
    "Plane die nötigen Ansichten und Maße nach Kategorie. Fotos zeigen sichtbare Abweichungen, können aber Material, Geruch, innere Konstruktion, elektrische Sicherheit oder Haltbarkeit nicht beweisen. Stelle eine genaue Frage, solange der Artikel noch im Lager liegt.",
    "Große, leichte Pakete können nach Volumengewicht berechnet werden. Verpackung sollte Schutz und sinnvolles Volumen ausbalancieren. Konsolidierung kann Grundkosten bündeln, aber auch Größen- oder Gewichtsstufen verändern.",
    "Batterien, Flüssigkeiten, Pulver, Kosmetik und Magnete können die Routenauswahl einschränken. Die öffentliche Angabe von mehr als 200 Ländern und Regionen bedeutet nicht, dass jeder Artikel über jede Linie an jede Adresse versendet werden kann.",
    "Speichere Fotos, Varianten, Maße, Termine und Supportantworten. Prüfe aktuelle Rückgabe- oder After-Sales-Hinweise zügig; einzelne öffentliche Listings zeigen Fristen, die nicht pauschal für alle Verkäufer und Kategorien gelten.",
    "Die zuverlässige Reihenfolge lautet: entdecken, aktuelle Seite prüfen, sichtbare Belege kontrollieren und erst dann Paket und Route planen. So wird aus einer Linkliste ein nachvollziehbarer Entscheidungsprozess ohne erfundene Qualitäts- oder Preisgarantien.",
    "Prüfe je nach Kategorie die entscheidenden Details und bewerte auch das Verzeichnis selbst: aktuelle Ziele, klare Kategorien, funktionierende Suche und ehrliche Grenzen. Große Zahlen und unbelegte Qualitätsurteile ersetzen keine nachvollziehbaren Datensätze.",
    "Vergleiche ein konsolidiertes Paket mit einer sinnvollen Teilung, wenn sensible oder sperrige Inhalte Routen einschränken. Nutze dafür aktuelle Gewichte, Maße und Regeln; eine Teilung kann Optionen öffnen, aber auch Grundkosten doppelt auslösen."
  ],
  fr: [
    "Ouvrez toujours la page actuelle et confirmez titre, variante, prix et notes visibles. Un ancien lien n’est qu’un point de départ : stock, couleurs et informations vendeur peuvent changer. Conservez URL, date, taille et couleur pour comparer ensuite avec le dossier d’entrepôt.",
    "Cherchez avec le type de produit, la coupe, la couleur et des critères mesurables. Le prix produit n’est qu’une partie du total. Livraison intérieure, services, change, poids, volume et ligne internationale sont des coûts distincts.",
    "USFans décrit publiquement un parcours comprenant soumission du lien, achat, réception en entrepôt, inspection, consolidation et expédition internationale. Certaines pages produits publiques mentionnent trois à sept photos HD. Le nombre et les vues peuvent varier; le compte actif reste la source finale.",
    "Préparez les vues et mesures utiles pour chaque catégorie. Une photo révèle des défauts visibles, mais ne prouve ni matière, odeur, construction interne, sécurité électrique ni durabilité. Posez une question précise pendant que l’article est encore stocké.",
    "Un colis léger mais volumineux peut être facturé au poids volumétrique. L’emballage doit équilibrer protection et dimensions. La consolidation peut regrouper des frais de base, mais aussi changer de palier ou dépasser une limite de taille.",
    "Batteries, liquides, poudres, cosmétiques et aimants peuvent réduire le choix de lignes. L’annonce publique de plus de 200 pays et régions ne garantit pas que chaque article soit accepté par chaque ligne vers chaque adresse.",
    "Conservez photos, variante, mesures, dates et réponses du support. Vérifiez rapidement les options de retour ou d’après-vente; les délais visibles sur certaines fiches ne constituent pas une règle universelle pour tous les vendeurs.",
    "La méthode fiable reste : découvrir, vérifier la page actuelle, contrôler les preuves visibles, puis planifier colis et ligne. Le spreadsheet devient ainsi un processus documenté, sans promesse inventée de qualité ou de prix.",
    "Adaptez le contrôle à la catégorie et évaluez aussi le répertoire : destinations actuelles, catégories claires, recherche fonctionnelle et limites honnêtes. De grands chiffres et des notes non sourcées ne remplacent pas des données vérifiables.",
    "Comparez un colis consolidé avec une séparation raisonnable lorsque des objets sensibles ou volumineux limitent les lignes. Utilisez poids, dimensions et règles actuels; séparer peut rouvrir des options mais répéter des frais de base."
  ],
  es: [
    "Abre siempre la página activa y confirma título, variante, precio y avisos visibles. Un enlace antiguo solo es un punto de partida; stock, colores y datos del vendedor pueden cambiar. Guarda URL, fecha, talla y color para compararlos con el registro del almacén.",
    "Busca por tipo, corte, color y detalles medibles. El precio del producto es solo una parte. Entrega nacional, servicios, cambio, peso, volumen y ruta internacional influyen por separado en el total.",
    "USFans describe públicamente un flujo con envío del enlace, compra, recepción en almacén, inspección, consolidación y envío internacional. Algunas páginas públicas mencionan de tres a siete fotos HD. La cantidad puede variar; el registro actual de la cuenta es la fuente final.",
    "Prepara vistas y medidas según la categoría. Las fotos muestran problemas visibles, pero no prueban material, olor, construcción interna, seguridad eléctrica ni durabilidad. Formula una pregunta concreta mientras el artículo sigue almacenado.",
    "Un paquete ligero pero grande puede cobrarse por peso volumétrico. El embalaje debe equilibrar protección y tamaño. Consolidar puede agrupar cargos base, pero también cambiar el tramo de peso o superar límites.",
    "Baterías, líquidos, polvos, cosméticos e imanes pueden limitar las rutas. La declaración pública de cobertura en más de 200 países y regiones no garantiza que todos los artículos sean aceptados por todas las líneas.",
    "Guarda fotos, variante, medidas, fechas y respuestas. Revisa pronto las opciones de devolución o posventa; los plazos visibles en algunas fichas no son una garantía general para todos los vendedores y categorías.",
    "La secuencia fiable es descubrir, verificar la página actual, revisar la evidencia visible y después planificar paquete y ruta. Así el spreadsheet se convierte en un proceso documentado, no en una promesa inventada de calidad o precio.",
    "Adapta la revisión a la categoría y evalúa también el directorio: destinos actuales, categorías claras, búsqueda funcional y límites honestos. Grandes cifras y puntuaciones sin fuente no sustituyen registros verificables.",
    "Compara un paquete consolidado con una división razonable cuando artículos sensibles o voluminosos limiten rutas. Usa pesos, medidas y normas actuales; dividir puede abrir opciones, pero también repetir cargos base."
  ],
  it: [
    "Apri sempre la pagina attuale e conferma titolo, variante, prezzo e note visibili. Un vecchio link è solo un punto di partenza: disponibilità, colori e informazioni del venditore possono cambiare. Salva URL, data, taglia e colore per il confronto con il magazzino.",
    "Cerca per tipo, vestibilità, colore e dettagli misurabili. Il prezzo del prodotto è solo una parte. Consegna interna, servizi, cambio, peso, volume e rotta internazionale incidono separatamente sul totale.",
    "USFans descrive pubblicamente un flusso con invio del link, acquisto, ricezione in magazzino, ispezione, consolidamento e spedizione internazionale. Alcune pagine indicano da tre a sette foto HD. Il numero può variare; fa fede il registro attuale dell’account.",
    "Prepara viste e misure per categoria. Le foto mostrano problemi visibili, ma non provano materiale, odore, costruzione interna, sicurezza elettrica o durata. Fai una domanda precisa mentre l’articolo è ancora in magazzino.",
    "Un pacco leggero ma grande può essere fatturato a peso volumetrico. L’imballaggio deve bilanciare protezione e dimensioni. Il consolidamento può unire costi base ma anche cambiare fascia o superare limiti.",
    "Batterie, liquidi, polveri, cosmetici e magneti possono limitare le rotte. La copertura pubblica di oltre 200 paesi e regioni non garantisce che ogni articolo sia accettato da ogni linea verso ogni indirizzo.",
    "Salva foto, variante, misure, date e risposte. Controlla subito reso e assistenza: le finestre mostrate su alcune schede non sono una garanzia generale valida per ogni venditore e categoria.",
    "La sequenza affidabile è scoprire, verificare la pagina attuale, controllare le prove visibili e poi pianificare pacco e rotta. Così lo spreadsheet diventa un processo documentato senza promesse inventate.",
    "Adatta il controllo alla categoria e valuta anche la directory: destinazioni attuali, categorie chiare, ricerca funzionante e limiti onesti. Grandi numeri e voti senza fonte non sostituiscono record verificabili.",
    "Confronta un pacco consolidato con una divisione sensata quando articoli sensibili o voluminosi limitano le rotte. Usa pesi, misure e regole attuali; dividere può aprire opzioni ma ripetere costi base."
  ],
  pl: [
    "Zawsze otwieraj aktualną stronę i potwierdzaj tytuł, wariant, cenę oraz widoczne uwagi. Stary link jest tylko punktem wyjścia; dostępność, kolory i dane sprzedawcy mogą się zmienić. Zapisz URL, datę, rozmiar i kolor do późniejszego porównania.",
    "Szukaj według typu, kroju, koloru i mierzalnych cech. Cena produktu to tylko część całości. Dostawa krajowa, usługi, kurs, waga, objętość i trasa międzynarodowa wpływają na koszt oddzielnie.",
    "USFans publicznie opisuje proces obejmujący przekazanie linku, zakup, przyjęcie do magazynu, kontrolę, konsolidację i wysyłkę międzynarodową. Niektóre strony mówią o trzech do siedmiu zdjęciach HD. Liczba może się różnić; decydują dane bieżącego konta.",
    "Zaplanuj ujęcia i pomiary dla danej kategorii. Zdjęcia pokazują widoczne problemy, ale nie potwierdzają materiału, zapachu, konstrukcji wewnętrznej, bezpieczeństwa elektrycznego ani trwałości. Zadawaj konkretne pytania przed wysyłką.",
    "Lekka, ale duża paczka może być liczona według wagi objętościowej. Opakowanie powinno równoważyć ochronę i rozmiar. Konsolidacja może ograniczyć opłaty bazowe, lecz również zmienić próg wagi lub przekroczyć limit.",
    "Baterie, płyny, proszki, kosmetyki i magnesy mogą ograniczać trasy. Publiczna informacja o ponad 200 krajach i regionach nie oznacza, że każdy produkt jest akceptowany przez każdą linię do każdego adresu.",
    "Zachowaj zdjęcia, wariant, pomiary, daty i odpowiedzi wsparcia. Szybko sprawdź zwrot i obsługę posprzedażową; terminy widoczne w niektórych ofertach nie są gwarancją dla wszystkich sprzedawców.",
    "Pewna kolejność to odkrywanie, weryfikacja aktualnej strony, kontrola widocznych dowodów, a następnie planowanie paczki i trasy. Arkusz staje się wtedy udokumentowanym procesem bez zmyślonych obietnic.",
    "Dostosuj kontrolę do kategorii i oceń sam katalog: aktualne cele, jasne kategorie, działające wyszukiwanie i uczciwe granice. Wielkie liczby oraz oceny bez źródeł nie zastępują sprawdzalnych danych.",
    "Porównaj jedną skonsolidowaną paczkę z rozsądnym podziałem, gdy wrażliwe lub duże przedmioty ograniczają trasy. Używaj aktualnej wagi, wymiarów i zasad; podział może otworzyć opcje, ale powtórzyć opłaty bazowe."
  ]
};

for (const locale of ["de", "fr", "es", "it", "pl"] as const) {
  for (const slug of Object.keys(en)) {
    const base = en[slug];
    const translated = fallback[locale][slug];
    localized[locale][slug] = {
      intro: translated.intro,
      sections: base.sections.map((_, index) => ({ h: translated.headings[index], paragraphs: [localizedParagraphs[locale][index]] }))
    };
  }
}

export const articleContent: Record<ArticleLocale, Record<string, ArticleContent>> = { en, ...localized };
