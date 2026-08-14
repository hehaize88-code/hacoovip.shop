import type { LocalArticle, Locale } from "./site-data";

export const polandPreorderArticle: Record<Locale, LocalArticle> = {
  en: {
    seoTitle: "USFans Poland Pre-Order Checklist: Verify Before Paying",
    title: "USFans Poland Pre-Order Checklist: What to Verify Before You Pay",
    excerpt: "A Poland-focused pre-order workflow for checking the seller page, exact variant, domestic leg, route eligibility, parcel budget, VAT evidence, and delivery records.",
    intro: `A USFans order bound for Poland should pass two tests before payment: the marketplace listing must describe the exact item you intend to buy, and the item must still make sense after the warehouse and international-delivery stages are considered. A product card or spreadsheet row can help you discover a listing, but it cannot freeze stock, options, seller terms, route eligibility, or destination charges. The useful pre-order question is therefore not simply “is the price attractive?” It is “can I document what I selected, estimate the complete route, and tolerate the realistic upper end of the cost?”

USFans describes a shopping-agent workflow: paste a marketplace link, place the product order, let the seller send it to a China warehouse, review the warehouse record, and later submit an international parcel. That creates two separate purchases and two separate evidence sets. The checklist below is designed for a buyer in Poland who has not yet paid the seller-stage order. It avoids fixed promises about tax, customs, route names, delivery time, or fees because those depend on the live listing, parcel, route and rules in force when the parcel is submitted.`,
    points: [
      "Verify the live seller page and the exact option, not only the discovery card.",
      "Treat seller-to-warehouse delivery and warehouse-to-Poland shipping as separate stages.",
      "Check current route eligibility with the intended category and destination before paying.",
      "Keep price, payment and later import records in one order file.",
      "Use a stop rule when a missing fact could change fit, legality, route or total cost."
    ],
    sections: [
      ["1. Start with the live listing, not the saved row", `Open the current marketplace listing through the order interface. Match the seller or shop, product title, main image and option list with the card that led you there. A thumbnail can remain online after a seller changes the underlying options. A headline price can also belong to the cheapest accessory, deposit or small variant rather than the pictured item.

Write down the exact option text, colour, size, model, quantity and unit price. If the listing uses translated labels, save both the displayed label and a screenshot of the selected image. For 1688-style listings, check quantity tiers and minimum quantities; for a multi-option listing, confirm that the chosen price belongs to the intended option. Do not infer included pieces from a lifestyle image.

Stop before payment if the title, option image and specification disagree. An order note can clarify a selection, but it cannot repair a listing that does not identify what is being sold. Choose a clearer listing when the ambiguity affects size, compatibility, material, quantity or safety.`],
      ["2. Separate the China leg from the Poland leg", `The seller first delivers inside China to the warehouse. That domestic leg has its own charge, tracking and dispatch time. International shipping to Poland is arranged later, after warehouse arrival. A payment that covers the item and domestic delivery is not evidence that international freight has also been paid.

Create two headings in your budget. Under “purchase stage,” record item price, quantity, China domestic delivery and any amount shown before payment. Under “parcel stage,” leave space for packaging, optional services, measured weight and dimensions, international route, insurance if chosen, and destination-side charges. Keep unknown amounts visibly marked as estimates.

This separation prevents a cheap product from hiding an uneconomic parcel. A light but bulky jacket or shoebox may produce more chargeable volume than expected. A dense small item may behave differently. Estimate a compact and a bulky scenario rather than assuming the product price predicts delivery cost.`],
      ["3. Test route eligibility before owning the item", `Use the current shipping-estimation or route-checking interface with Poland as the destination. Enter the closest available product category and a realistic weight-and-dimensions range. The result is a pre-order scenario, not a reservation: carrier rules, restricted-goods classifications and available lines can change before warehouse submission.

Look beyond the cheapest number. Check whether the route accepts the item category, battery or liquid content, dimensions and declared value range. Record the date of the check. If a product can only travel through one uncertain route, decide whether you are willing to own it at the warehouse if that route disappears.

Do not rely on another buyer’s route screenshot. Their parcel contents, postcode, date and declared information may differ. The relevant evidence is the live result for your destination and product characteristics.`],
      ["4. Validate the Polish delivery data", `Prepare the recipient name exactly as it should appear on the parcel, a deliverable street and building number, apartment number where applicable, postcode, locality, country, telephone number and email used for carrier notices. Use Polish characters only where the order interface and carrier support them reliably; never replace correctness with guesswork.

Check the postcode and locality together. Confirm that a parcel can be received at the address during delivery hours and that the phone remains reachable. If a business, dormitory, parcel room or reception desk will receive it, know what extra name or reference they require.

Copy the address from a trusted record instead of retyping it for each order. A product-page check cannot compensate for an incomplete last-mile address. Treat address verification as part of pre-order eligibility, especially before buying an oversized or time-sensitive item.`],
      ["5. Build an evidence file for VAT and customs questions", `Poland’s tax administration provides current customs information, an EU tariff browser and information about the Import One Stop Shop. Those resources are the appropriate starting points for classification and tax questions; an agent estimate or spreadsheet price is not a legal determination.

Before ordering, save the live listing, selected variant, quantity, item price, seller name, payment record and product description. Later add the warehouse record, parcel contents, shipping invoice and tracking. If a carrier or customs authority requests information, a consistent file is easier to use than screenshots scattered across several apps.

Do not copy a declaration value or product description from an unrelated parcel. The record should describe what you actually bought. If classification, restricted status or tax treatment is material to the decision, consult the official tools or a qualified adviser before payment.`],
      ["6. Use a realistic pre-order cost range", `Calculate three cases: compact, expected and bulky. Each case should use the same item price but a different plausible packed dimension or weight. Add domestic delivery and leave separate lines for payment conversion, warehouse options, international freight and possible destination charges. A range exposes which assumption makes the purchase look affordable.

For example, a jacket may be light on a scale but occupy more space until compressed; shoes may be compact without a retail box but need structure to avoid damage. Do not promise savings from removing packaging before the warehouse confirms what can be changed safely. A cheaper scenario is only useful when it remains physically credible.

Set a maximum delivered-cost threshold before paying. If the upper realistic case exceeds it, either choose a more compact product, wait for better evidence, or do not order. The warehouse quote will be more precise later, but by then the seller-stage purchase has already occurred.`],
      ["7. Write instructions that can be verified", `Order remarks should identify a fact, not express a wish. “Black, EU 42, one pair; please match the option image” can be checked. “Best quality” or “make it perfect” cannot. Use remarks only for details supported by the listing and keep them short enough to translate accurately.

Decide now what warehouse evidence would change the decision. For clothing, that may be a chest width or length. For shoes, it may be the size label and insole length. For sets, it may be all included pieces in one frame. This is not a substitute for the later QC review; it is a way to prevent an undefined request.

Keep the original selection record beside the remark. If the seller sends something different, the comparison should show the promised option, your selected option and the received evidence without relying on memory.`],
      ["8. Apply a final pay-or-pause rule", `Pay only when the seller page identifies the product, the selected option is unambiguous, the domestic amount is understood, a plausible Poland route exists for the category, the address is ready, and the upper cost scenario remains acceptable. One missing non-critical detail can be recorded for later; a missing fact that affects identity, fit, route legality or budget should pause the order.

After payment, keep watching the seller-stage status rather than assuming dispatch. When the item reaches the warehouse, compare it with the evidence file and make a new decision before parcel submission. The pre-order checklist does not guarantee a perfect purchase, but it makes discrepancies visible while action is still possible.

The best first Poland-bound order is not necessarily the lowest-priced find. It is the order whose product identity, route assumptions, address and cost ceiling you can explain from saved evidence. That is a stronger basis for a cross-border decision than a screenshot, a headline price or another buyer’s parcel result.`]
    ]
  },
  pl: {
    seoTitle: "USFans Polska: lista kontroli przed zamówieniem",
    title: "USFans Polska: co sprawdzić przed opłaceniem zamówienia",
    excerpt: "Polska lista kontroli oferty, wariantu, dostawy krajowej, trasy, budżetu, dokumentów VAT i danych odbiorcy przed płatnością.",
    intro: `Zamówienie USFans do Polski powinno przejść dwa testy przed płatnością: aktualna oferta musi jednoznacznie opisywać wybrany produkt, a zakup musi nadal mieć sens po uwzględnieniu magazynu i wysyłki międzynarodowej. Karta produktu lub wiersz arkusza pomaga znaleźć ofertę, lecz nie zamraża stanu, wariantów, zasad sprzedawcy, dostępności trasy ani opłat docelowych.

USFans opisuje proces agenta zakupowego: wklejenie linku, zakup, dostawa sprzedawcy do magazynu w Chinach, kontrola rekordu magazynowego i późniejsze nadanie paczki międzynarodowej. To dwa etapy płatności i dwa zestawy dowodów. Poniższa lista nie obiecuje stałych stawek, czasu ani podatku; liczą się dane oferty, paczki, trasy i przepisy obowiązujące przy nadaniu.`,
    points: ["Sprawdź bieżącą ofertę i dokładny wariant, nie tylko kartę katalogu.", "Oddziel dostawę sprzedawca–magazyn od wysyłki magazyn–Polska.", "Przed płatnością sprawdź bieżącą dostępność trasy dla kategorii.", "Przechowuj cenę, płatność i dokumenty importowe w jednym pliku.", "Wstrzymaj zakup, gdy brak danych zmienia dopasowanie, legalność, trasę lub koszt."],
    sections: [
      ["1. Zacznij od aktualnej oferty", `Otwórz bieżącą stronę marketplace przez formularz zamówienia. Porównaj sprzedawcę, tytuł, zdjęcie i listę opcji z kartą, która doprowadziła do oferty. Miniatura może pozostać bez zmian po zmianie wariantów, a cena nagłówkowa może dotyczyć dodatku, zaliczki lub najtańszej opcji.

Zapisz tekst wariantu, kolor, rozmiar, model, ilość i cenę jednostkową. Przy progach ilościowych sprawdź MOQ. Nie zakładaj zawartości zestawu na podstawie zdjęcia aranżacyjnego. Jeśli tytuł, zdjęcie wariantu i specyfikacja są sprzeczne, zatrzymaj zamówienie.`],
      ["2. Oddziel etap chiński od polskiego", `Sprzedawca najpierw wysyła produkt w Chinach do magazynu. Ten etap ma własną opłatę, tracking i czas wysyłki. Dopiero po przyjęciu organizujesz transport międzynarodowy do Polski. Płatność za produkt i dostawę krajową nie jest dowodem opłacenia przewozu do Polski.

W budżecie utwórz „etap zakupu” oraz „etap paczki”. W pierwszym zapisz produkt, ilość i dostawę krajową. W drugim zostaw miejsce na opakowanie, usługi, wagę i wymiary, trasę, ewentualne ubezpieczenie oraz opłaty docelowe.`],
      ["3. Sprawdź trasę, zanim produkt stanie się Twój", `W bieżącym kalkulatorze ustaw Polskę, właściwą kategorię oraz realistyczny zakres wagi i wymiarów. Wynik jest scenariuszem, nie rezerwacją: zasady przewoźnika, klasyfikacja towaru i dostępne linie mogą się zmienić.

Sprawdź nie tylko najniższą cenę, lecz także dopuszczenie kategorii, baterii lub płynów, wymiary i zakres wartości. Zapisz datę sprawdzenia. Nie używaj zrzutu trasy innej osoby jako dowodu dla własnej paczki.`],
      ["4. Zweryfikuj polskie dane doręczenia", `Przygotuj pełne imię i nazwisko, ulicę, numer budynku i lokalu, kod pocztowy, miejscowość, kraj, działający telefon i e-mail. Sprawdź kod razem z miejscowością oraz możliwość odbioru pod adresem. Recepcja, akademik lub firma mogą wymagać dodatkowej nazwy.

Kopiuj adres z zaufanego zapisu zamiast wpisywać go ponownie. Niepełny adres ostatniej mili może zniweczyć poprawny zakup produktu.`],
      ["5. Zbuduj plik dowodowy dla VAT i cła", `Polska administracja skarbowa publikuje informacje celne, przeglądarkę taryfową UE oraz materiały o IOSS. To właściwe punkty startowe; kalkulator agenta ani cena w arkuszu nie stanowią interpretacji prawnej.

Zapisz ofertę, wariant, ilość, cenę, sprzedawcę, opis i potwierdzenie płatności. Później dodaj rekord magazynowy, zawartość paczki, fakturę transportową i tracking. Opis oraz wartość powinny odpowiadać rzeczywistemu zakupowi.`],
      ["6. Oblicz realistyczny zakres kosztu", `Przygotuj trzy scenariusze: kompaktowy, oczekiwany i objętościowy. Cena produktu pozostaje ta sama, lecz zmieniają się wiarygodne wymiary lub waga opakowania. Osobno dodaj dostawę krajową, przeliczenie płatności, usługi, fracht międzynarodowy i możliwe opłaty docelowe.

Ustal maksymalny akceptowalny koszt z dostawą przed płatnością. Jeżeli realistyczny górny wariant go przekracza, wybierz mniejszy produkt, poczekaj na dane albo zrezygnuj.`],
      ["7. Pisz instrukcje możliwe do sprawdzenia", `Uwagi powinny wskazywać fakt: „czarny, EU 42, jedna para; zgodnie ze zdjęciem wariantu”. „Najlepsza jakość” nie jest możliwa do zweryfikowania. Używaj krótkich uwag opartych na ofercie.

Z góry ustal, jaki dowód magazynowy zmieni decyzję: szerokość klatki, długość wkładki, metka rozmiaru albo komplet elementów zestawu. Zachowaj pierwotny wybór obok uwagi.`],
      ["8. Zastosuj regułę zapłać albo wstrzymaj", `Zapłać tylko wtedy, gdy oferta identyfikuje produkt, wariant jest jasny, dostawa krajowa zrozumiała, istnieje wiarygodny scenariusz trasy do Polski, adres jest gotowy, a górny zakres kosztu akceptowalny. Brak danych wpływających na tożsamość, dopasowanie, legalność trasy lub budżet powinien zatrzymać zakup.

Po płatności obserwuj status u sprzedawcy. Po przyjęciu do magazynu porównaj produkt z plikiem dowodowym i podejmij osobną decyzję o paczce. Najlepsze pierwsze zamówienie to takie, które potrafisz wyjaśnić na podstawie zapisanych danych.`]
    ]
  },
  de: {
    seoTitle: "USFans Polen: Checkliste vor der Bestellung",
    title: "USFans Polen: Was vor der Zahlung zu prüfen ist",
    excerpt: "Polen-spezifische Prüfung von Angebot, Variante, Inlandsweg, Route, Budget, Steuerbelegen und Lieferdaten vor der Zahlung.",
    intro: `Eine USFans-Bestellung nach Polen sollte vor der Zahlung zwei Tests bestehen: Das aktuelle Angebot muss den gewünschten Artikel eindeutig beschreiben, und der Kauf muss nach Lager- und internationaler Versandstufe wirtschaftlich bleiben. Eine Produktkarte hilft beim Finden, fixiert aber weder Bestand noch Optionen, Route oder Zielkosten.

USFans beschreibt einen Einkaufsagenten-Ablauf mit Produktlink, Kauf, chinesischer Lageranlieferung und späterer internationaler Paketeinreichung. Das sind zwei Entscheidungen und zwei Belegsätze. Feste Zusagen zu Steuer, Laufzeit, Route oder Gebühren wären deshalb unangebracht.`,
    points: ["Live-Angebot und exakte Option prüfen.", "China-Inlandsweg und Polen-Paket trennen.", "Routenfähigkeit vor der Zahlung testen.", "Preis-, Zahlungs- und Importbelege zusammenhalten.", "Bei entscheidender Informationslücke pausieren."],
    sections: [
      ["1. Mit dem Live-Angebot beginnen", `Verkäufer, Titel, Hauptbild und Optionen mit der Fundkarte abgleichen. Ein Kopfpreis kann Zubehör, Anzahlung oder kleinste Option meinen. Exakten Optionstext, Farbe, Größe, Modell, Menge und Stückpreis sichern; bei Mengenstaffeln das Minimum prüfen. Bei Widerspruch zwischen Titel, Bild und Spezifikation nicht zahlen.`],
      ["2. China- und Polen-Stufe trennen", `Der Verkäufer liefert zunächst innerhalb Chinas ins Lager. Internationaler Versand folgt erst nach Eingang. Zwei Budgetblöcke führen: Kaufpreis, Menge und Inlandsversand einerseits; Verpackung, Dienste, gemessene Daten, internationale Route, Versicherung und Zielkosten andererseits. Unbekannte Werte als Schätzung markieren.`],
      ["3. Route vor dem Besitz prüfen", `Im aktuellen Schätzer Polen, passende Kategorie sowie realistische Gewichts- und Maßspanne verwenden. Das Ergebnis ist keine Reservierung. Kategorie-, Batterie-, Flüssigkeits-, Maß- und Wertregeln prüfen und das Prüfdatum notieren. Fremde Routenscreenshots gelten nicht für das eigene Paket.`],
      ["4. Polnische Lieferdaten validieren", `Empfängername, Straße, Haus- und Wohnungsnummer, Postleitzahl, Ort, Land, Telefon und E-Mail vorbereiten. Postleitzahl und Ort gemeinsam prüfen. Bei Firma, Wohnheim oder Empfangsstelle die nötige Zusatzbezeichnung klären und den geprüften Datensatz wiederverwenden.`],
      ["5. Steuer- und Zollbelege sammeln", `Die polnische Steuerverwaltung bietet Zollinformationen, EU-Tarifsuche und IOSS-Hinweise. Agentenschätzung und Spreadsheet-Preis sind keine Rechtsauskunft. Live-Angebot, Variante, Menge, Preis, Verkäufer, Beschreibung und Zahlung sichern; später Lagerbeleg, Paketinhalt, Frachtrechnung und Tracking ergänzen.`],
      ["6. Eine Kostenspanne bilden", `Kompaktes, erwartetes und sperriges Szenario mit plausiblen Packdaten rechnen. Inlandsversand, Umrechnung, Dienste, internationale Fracht und mögliche Zielkosten getrennt halten. Vor Zahlung eine Höchstgrenze bestimmen; wird sie im realistischen oberen Fall überschritten, Produkt wechseln, warten oder verzichten.`],
      ["7. Prüffähige Hinweise schreiben", `„Schwarz, EU 42, ein Paar, Optionsbild abgleichen“ ist prüfbar; „beste Qualität“ nicht. Vorab festlegen, welcher Lagerbeleg entscheidet: Brustweite, Einlegesohlenlänge, Größenetikett oder alle Set-Teile. Auswahl und Hinweis zusammen speichern.`],
      ["8. Zahlen oder pausieren", `Nur zahlen, wenn Produktidentität, Option, Inlandsbetrag, plausible Polen-Route, Adresse und Kostenobergrenze geklärt sind. Fehlende Angaben zu Identität, Passform, Routenzulässigkeit oder Budget stoppen den Kauf. Nach Lagereingang Belege vergleichen und die Paketentscheidung separat treffen.`]
    ]
  },
  fr: {
    seoTitle: "USFans Pologne : contrôles avant commande",
    title: "USFans Pologne : que vérifier avant de payer",
    excerpt: "Contrôle de l’annonce, variante, trajet intérieur, route vers la Pologne, budget, preuves TVA et adresse avant paiement.",
    intro: `Une commande USFans vers la Pologne doit réussir deux tests avant paiement : l’annonce actuelle doit identifier exactement le produit et l’achat doit rester cohérent après l’entrepôt et l’expédition internationale. Une carte de découverte ne fige ni stock, ni options, ni route, ni frais à destination.

USFans décrit un parcours d’agent d’achat : lien, achat, livraison chinoise à l’entrepôt puis soumission d’un colis international. Ce sont deux décisions et deux dossiers de preuve; aucun tarif, délai ou traitement fiscal fixe ne peut donc être promis.`,
    points: ["Vérifier l’annonce et l’option exactes.", "Séparer trajet chinois et colis vers la Pologne.", "Tester l’éligibilité de route avant paiement.", "Réunir prix, paiement et documents d’importation.", "Suspendre si une donnée décisive manque."],
    sections: [
      ["1. Partir de l’annonce actuelle", `Comparer vendeur, titre, image et options à la carte découverte. Le prix principal peut viser un accessoire, un acompte ou la plus petite option. Conserver option, couleur, taille, modèle, quantité et prix; vérifier les paliers de quantité. Suspendre si titre, image et spécification se contredisent.`],
      ["2. Séparer Chine et Pologne", `Le vendeur livre d’abord en Chine. Le transport international est payé plus tard. Créer deux budgets : produit, quantité et livraison intérieure; puis emballage, services, poids, dimensions, route, assurance et frais à destination. Marquer clairement chaque estimation.`],
      ["3. Tester la route avant de posséder l’article", `Dans l’outil actuel, choisir Pologne, catégorie et plage réaliste de poids et dimensions. Ce résultat n’est pas une réservation. Vérifier catégorie, batterie, liquide, dimensions et valeur, puis noter la date. La capture d’un autre acheteur n’est pas une preuve pour votre colis.`],
      ["4. Valider l’adresse polonaise", `Préparer nom, rue, numéro, appartement, code postal, ville, pays, téléphone et e-mail. Vérifier code et ville ensemble ainsi que les modalités de réception. Pour entreprise, résidence ou accueil, ajouter la référence demandée et réutiliser une fiche d’adresse contrôlée.`],
      ["5. Créer un dossier TVA et douane", `L’administration fiscale polonaise publie informations douanières, navigateur tarifaire UE et informations IOSS. Un devis d’agent n’est pas un avis juridique. Conserver annonce, option, quantité, prix, vendeur, description et paiement; ajouter ensuite entrepôt, contenu, facture de transport et suivi.`],
      ["6. Calculer une fourchette réaliste", `Évaluer trois cas : compact, attendu et volumineux. Séparer livraison intérieure, conversion, services, fret international et frais possibles. Fixer un plafond livré avant paiement. Si le haut réaliste le dépasse, choisir plus compact, attendre ou renoncer.`],
      ["7. Rédiger une instruction vérifiable", `« Noir, EU 42, une paire; correspondre à l’image » est vérifiable, contrairement à « meilleure qualité ». Définir la preuve d’entrepôt décisive : largeur poitrine, semelle intérieure, étiquette ou pièces du lot. Garder sélection et note ensemble.`],
      ["8. Payer ou suspendre", `Payer seulement si identité, option, coût intérieur, route plausible, adresse et plafond sont établis. Toute lacune affectant identité, taille, légalité de route ou budget doit suspendre. Après arrivée, comparer le dossier et décider séparément du colis.`]
    ]
  },
  it: {
    seoTitle: "USFans Polonia: controlli prima dell’ordine",
    title: "USFans Polonia: cosa verificare prima di pagare",
    excerpt: "Controllo per la Polonia di inserzione, variante, tratta nazionale, rotta, budget, prove IVA e indirizzo prima del pagamento.",
    intro: `Un ordine USFans diretto in Polonia deve superare due verifiche prima del pagamento: l’inserzione attuale deve identificare l’articolo esatto e l’acquisto deve restare sensato dopo magazzino e spedizione internazionale. Una scheda di scoperta non blocca disponibilità, opzioni, rotta o costi a destinazione.

USFans descrive un flusso da agente: link, acquisto, consegna nazionale al magazzino e successivo invio del pacco internazionale. Sono due decisioni e due serie di documenti; non è corretto promettere tariffe, tempi o trattamento fiscale fissi.`,
    points: ["Verifica inserzione e opzione correnti.", "Separa tratta cinese e pacco per la Polonia.", "Controlla la rotta prima del pagamento.", "Conserva prezzo, pagamento e documenti import.", "Sospendi se manca un dato decisivo."],
    sections: [
      ["1. Parti dall’inserzione live", `Confronta venditore, titolo, immagine e opzioni con la scheda. Il prezzo iniziale può riferirsi ad accessorio, deposito o opzione minima. Salva testo dell’opzione, colore, taglia, modello, quantità e prezzo; controlla MOQ e fasce. Se titolo, foto e specifica sono incoerenti, non pagare.`],
      ["2. Separa Cina e Polonia", `Il venditore consegna prima al magazzino in Cina; il trasporto internazionale si organizza dopo. Crea due sezioni di budget: prodotto, quantità e consegna interna; poi imballaggio, servizi, misure, rotta, assicurazione e costi a destinazione. Indica ciò che è ancora stimato.`],
      ["3. Verifica la rotta prima di possedere il prodotto", `Nello strumento corrente imposta Polonia, categoria e intervallo realistico di peso e dimensioni. Non è una prenotazione. Controlla categoria, batterie, liquidi, misure e valore e salva la data. Uno screenshot altrui non vale per il tuo pacco.`],
      ["4. Valida l’indirizzo polacco", `Prepara nome, via, numero civico e interno, CAP, città, paese, telefono ed email. Controlla CAP e città insieme e la possibilità di ricezione. Per azienda, dormitorio o reception aggiungi il riferimento richiesto e riusa un record verificato.`],
      ["5. Prepara le prove IVA e doganali", `L’amministrazione fiscale polacca offre informazioni doganali, tariffario UE e materiali IOSS. Un preventivo dell’agente non è consulenza legale. Conserva inserzione, opzione, quantità, prezzo, venditore, descrizione e pagamento; poi aggiungi magazzino, contenuto, fattura e tracking.`],
      ["6. Calcola una fascia di costo", `Confronta caso compatto, previsto e voluminoso. Tieni separati consegna nazionale, cambio, servizi, trasporto internazionale e possibili oneri. Fissa prima un tetto consegnato; se il caso alto realistico lo supera, scegli un articolo più compatto, attendi o rinuncia.`],
      ["7. Scrivi note verificabili", `“Nero, EU 42, un paio, come immagine opzione” è verificabile; “qualità migliore” no. Decidi quale prova di magazzino cambia la scelta: torace, soletta, etichetta o tutti i pezzi del set. Conserva nota e selezione.`],
      ["8. Paga oppure sospendi", `Paga solo con identità, opzione, importo interno, rotta plausibile, indirizzo e tetto chiari. Se manca un dato su identità, vestibilità, ammissibilità o budget, sospendi. All’arrivo confronta le prove e prendi separatamente la decisione sul pacco.`]
    ]
  },
  es: {
    seoTitle: "USFans Polonia: controles antes de comprar",
    title: "USFans Polonia: qué comprobar antes de pagar",
    excerpt: "Revisión para Polonia del anuncio, variante, tramo nacional, ruta, presupuesto, pruebas de IVA y dirección antes del pago.",
    intro: `Un pedido de USFans a Polonia debe superar dos pruebas antes de pagar: el anuncio actual debe identificar el producto exacto y la compra debe seguir teniendo sentido tras el almacén y el envío internacional. Una tarjeta de descubrimiento no congela stock, opciones, ruta ni costes de destino.

USFans describe un flujo de agente de compras: enlace, compra, entrega china al almacén y posterior presentación del paquete internacional. Son dos decisiones y dos archivos de pruebas; no deben prometerse tarifas, plazos ni tratamiento fiscal fijos.`,
    points: ["Comprueba anuncio y opción actuales.", "Separa tramo chino y paquete a Polonia.", "Verifica la ruta antes de pagar.", "Reúne precio, pago y documentos de importación.", "Pausa si falta un dato decisivo."],
    sections: [
      ["1. Empieza por el anuncio actual", `Compara vendedor, título, imagen y opciones con la tarjeta. El precio principal puede ser de un accesorio, depósito u opción menor. Guarda opción, color, talla, modelo, cantidad y precio; revisa MOQ y tramos. Si título, foto y especificación chocan, no pagues.`],
      ["2. Separa China y Polonia", `El vendedor primero entrega dentro de China. El envío internacional se contrata después. Crea dos presupuestos: producto, cantidad y entrega nacional; luego embalaje, servicios, peso, dimensiones, ruta, seguro y cargos de destino. Marca lo estimado.`],
      ["3. Prueba la ruta antes de poseer el artículo", `En la herramienta vigente selecciona Polonia, categoría y rango realista de peso y medidas. No es una reserva. Revisa categoría, baterías, líquidos, dimensiones y valor, y guarda la fecha. La captura de otro comprador no demuestra tu ruta.`],
      ["4. Valida la dirección polaca", `Prepara nombre, calle, edificio, piso, código postal, localidad, país, teléfono y correo. Comprueba código y ciudad juntos y cómo se recibirá el paquete. Empresas, residencias o recepciones pueden requerir otra referencia. Reutiliza un registro revisado.`],
      ["5. Crea un archivo para IVA y aduanas", `La administración fiscal polaca ofrece información aduanera, navegador arancelario UE e información IOSS. Un cálculo del agente no es una decisión legal. Guarda anuncio, opción, cantidad, precio, vendedor, descripción y pago; añade después almacén, contenido, factura y seguimiento.`],
      ["6. Calcula un rango realista", `Compara escenarios compacto, esperado y voluminoso. Separa entrega china, conversión, servicios, flete internacional y posibles cargos. Fija un máximo entregado antes de pagar; si el caso alto realista lo supera, cambia producto, espera o cancela.`],
      ["7. Escribe instrucciones comprobables", `“Negro, EU 42, un par; igual a imagen” puede comprobarse; “mejor calidad” no. Define la prueba de almacén decisiva: ancho de pecho, plantilla, etiqueta o todas las piezas. Conserva selección y nota juntas.`],
      ["8. Paga o pausa", `Paga solo si identidad, opción, importe nacional, ruta plausible, dirección y límite están claros. Una falta que afecte identidad, talla, legalidad de ruta o presupuesto debe pausar. Al llegar al almacén, compara pruebas y decide el paquete por separado.`]
    ]
  },
  ro: {
    seoTitle: "USFans Polonia: verificări înainte de comandă",
    title: "USFans Polonia: ce verifici înainte de plată",
    excerpt: "Verificare pentru Polonia a ofertei, variantei, traseului intern, rutei, bugetului, dovezilor TVA și adresei înainte de plată.",
    intro: `O comandă USFans către Polonia trebuie să treacă două teste înainte de plată: oferta actuală trebuie să identifice produsul exact, iar achiziția trebuie să rămână rezonabilă după depozit și transport internațional. Un card de descoperire nu fixează stocul, opțiunile, ruta sau costurile la destinație.

USFans descrie un flux de agent: link, cumpărare, livrare internă la depozit și apoi colet internațional. Sunt două decizii și două seturi de dovezi; nu pot fi promise tarife, termene sau tratamente fiscale fixe.`,
    points: ["Verifică oferta și opțiunea actuale.", "Separă etapa din China de coletul spre Polonia.", "Testează ruta înainte de plată.", "Păstrează prețul, plata și actele de import.", "Oprește dacă lipsește o informație decisivă."],
    sections: [
      ["1. Pornește de la oferta actuală", `Compară vânzătorul, titlul, imaginea și opțiunile cu cardul. Prețul principal poate fi pentru accesoriu, avans sau opțiunea minimă. Salvează opțiunea, culoarea, mărimea, modelul, cantitatea și prețul; verifică MOQ. Dacă titlul, poza și specificația se contrazic, nu plăti.`],
      ["2. Separă China și Polonia", `Vânzătorul livrează mai întâi în China. Transportul internațional se comandă ulterior. Creează două bugete: produs, cantitate și livrare internă; apoi ambalaj, servicii, greutate, dimensiuni, rută, asigurare și costuri la destinație. Marchează estimările.`],
      ["3. Testează ruta înainte de a deține produsul", `În instrumentul curent alege Polonia, categoria și intervale realiste de greutate și dimensiuni. Rezultatul nu este rezervare. Verifică reguli pentru categorie, baterii, lichide, dimensiuni și valoare și notează data. Captura altui cumpărător nu dovedește ruta ta.`],
      ["4. Validează adresa poloneză", `Pregătește numele, strada, numărul clădirii și apartamentului, codul poștal, localitatea, țara, telefonul și emailul. Verifică împreună codul și localitatea și modul de primire. Pentru firmă, cămin sau recepție adaugă referința cerută.`],
      ["5. Creează dosarul TVA și vamal", `Administrația fiscală poloneză publică informații vamale, instrument tarifar UE și materiale IOSS. Estimarea agentului nu este opinie juridică. Păstrează oferta, opțiunea, cantitatea, prețul, vânzătorul, descrierea și plata; adaugă apoi depozitul, conținutul, factura și trackingul.`],
      ["6. Calculează un interval realist", `Compară scenarii compact, așteptat și voluminos. Separă livrarea internă, conversia, serviciile, transportul internațional și posibilele taxe. Stabilește un plafon livrat; dacă scenariul superior realist îl depășește, schimbă produsul, așteaptă sau renunță.`],
      ["7. Scrie instrucțiuni verificabile", `„Negru, EU 42, o pereche, conform imaginii” poate fi verificat; „cea mai bună calitate” nu. Decide dovada de depozit relevantă: lățime, branț, etichetă sau toate piesele setului. Păstrează alegerea și nota împreună.`],
      ["8. Plătește sau oprește", `Plătește doar când identitatea, opțiunea, suma internă, ruta plauzibilă, adresa și plafonul sunt clare. O lipsă privind identitatea, potrivirea, legalitatea rutei sau bugetul oprește comanda. La depozit compară dovezile și decide coletul separat.`]
    ]
  }
};
