(()=>{
  const SEO_LANGS=new Set(['de','fr','es','pl']);
  const INTRO={
    en:'Independent, practical articles covering reverse shopping, image and product-link verification, multi-item order records, order confirmation, QC, warehouse decisions, packing, payments, returns, tracking and destination planning.',
    es:'Artículos independientes y prácticos sobre compra inversa, verificación de imágenes y enlaces, control de pedidos, QC, almacén, embalaje, pagos, devoluciones, seguimiento y planificación del destino.',
    fr:'Articles indépendants et pratiques sur l’achat inversé, la vérification des images et des liens, le suivi des commandes, le QC, l’entrepôt, l’emballage, les paiements, les retours et l’expédition.',
    de:'Unabhängige, praktische Artikel zu Reverse Shopping, Bild- und Linkprüfung, Bestellverwaltung, QC, Lager, Verpackung, Zahlung, Rückgabe, Tracking und Versandplanung.',
    it:'Articoli indipendenti e pratici su acquisti inversi, verifica di immagini e link, gestione ordini, QC, magazzino, imballaggio, pagamenti, resi, tracking e spedizione.',
    pt:'Artigos independentes e práticos sobre compra reversa, verificação de imagens e links, controle de pedidos, QC, armazém, embalagem, pagamentos, devoluções, rastreamento e envio.',
    pl:'Niezależne, praktyczne artykuły o zakupach odwrotnych, weryfikacji zdjęć i linków, kontroli zamówień, QC, magazynie, pakowaniu, płatnościach, zwrotach i wysyłce.',
    nl:'Onafhankelijke, praktische artikelen over reverse shopping, beeld- en linkcontrole, orderbeheer, QC, magazijn, verpakking, betalingen, retouren, tracking en verzending.',
    zh:'独立、实用的反向代购文章，涵盖图片与商品链接核验、多商品订单记录、下单确认、QC、仓库决策、包装、付款、退货、追踪与目的地规划。'
  };

  const EN={
    'sugargoo-reverse-shopping-multi-item-order-ledger.html':['How to Organize a Multi-Item Sugargoo Reverse-Shopping Order','Use batch numbers, item IDs and status records to prevent mixed, missing or incorrectly changed items.'],
    'sugargoo-reverse-shopping-image-to-product-link.html':['How to Find a Sugargoo Product from an Image','Turn a screenshot into search clues, compare candidate links and verify the listing before ordering.'],
    'sugargoo-reverse-shopping-confirmation-checkpoints.html':['How to Prevent Last-Minute Changes in Sugargoo Orders','Use confirmation checkpoints before purchase, after listing changes and before international shipping.'],
    'sugargoo-reverse-shopping-order-boundaries.html':['Which Orders Fit a Sugargoo Reverse-Shopping Workflow?','Judge an order by product clarity, information changes, cross-border limits and communication cost.'],
    'sugargoo-reverse-shopping-product-link-workflow.html':['How Does Sugargoo Reverse Shopping Work?','Verify the product link, selected variant, cost breakdown and pre-shipping details before proceeding.'],
    'what-is-sugargoo.html':['What Is Sugargoo?','Understand the shopping-agent workflow from product link to international parcel.'],
    'qc-guide.html':['Sugargoo QC Photos Guide','Review warehouse photos, measurements and visible condition before shipping.'],
    'shipping-guide.html':['Sugargoo Shipping Guide','Compare routes, packaging, tracking, restrictions and total cost.'],
    'alternative.html':['Sugargoo Alternatives 2026','Compare shopping agents using practical operational criteria.'],
    'sugargoo-spreadsheet-guide.html':['Sugargoo Spreadsheet Guide','Organize product links, variants, source details and QC notes in a useful research sheet.'],
    'sugargoo-qc-checklist.html':['Sugargoo QC Checklist','Check views, labels, measurements, construction, defects and requested extra photos.'],
    'sugargoo-rehearsal-packing-guide.html':['Sugargoo Rehearsal Packing Guide','Use parcel dimensions, chargeable weight and packing instructions before choosing a route.'],
    'sugargoo-shipping-cost-guide.html':['Sugargoo Shipping Cost Guide','Compare actual and volumetric weight, complete charges, restrictions, tracking and compensation.'],
    'sugargoo-warehouse-guide.html':['Sugargoo Warehouse Guide','Match arrivals, review evidence, plan storage and prepare a complete parcel checklist.'],
    'sugargoo-return-guide.html':['Sugargoo Return Guide','Document the issue, collect evidence, check deadlines and act before international shipping.'],
    'sugargoo-restricted-items-guide.html':['Sugargoo Restricted Items Guide','Review product attributes, route eligibility, destination rules and accurate declarations.'],
    'sugargoo-payment-guide.html':['Sugargoo Payment Guide','Separate product and shipping costs, review conversion totals and keep refund records.'],
    'sugargoo-uk-shipping-guide.html':['Sugargoo Shipping to the UK','Plan route eligibility, chargeable weight, declarations, tracking and address details.'],
    'sugargoo-germany-shipping-guide.html':['Sugargoo Shipping to Germany','Check parcel data, route eligibility, address format and current German or EU guidance.'],
    'sugargoo-order-tracking-guide.html':['Sugargoo Order Tracking Guide','Understand domestic movement, warehouse processing, parcel creation and international scans.'],
    'sugargoo-product-link-guide.html':['Sugargoo Product Link Guide','Verify listings, preserve exact variants and handle changed or expired product links.']
  };

  const L={
    en:EN,
    pt:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Como organizar um pedido Sugargoo com vários itens','Use números de lote, códigos por item e registros de status para evitar trocas, perdas e alterações erradas.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Como encontrar um produto Sugargoo usando uma imagem','Transforme a captura em pistas, compare links candidatos e confirme o anúncio antes da compra.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Como evitar mudanças de última hora em pedidos Sugargoo','Confirme antes da compra, após mudanças no anúncio e antes do envio internacional.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quais pedidos combinam com a compra reversa Sugargoo?','Avalie clareza do produto, mudanças de informação, limites internacionais e custo de comunicação.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Como funciona a compra reversa com Sugargoo?','Verifique link, variante, custos e detalhes finais antes de prosseguir.'],
      'what-is-sugargoo.html':['O que é Sugargoo?','Entenda o fluxo do link do produto até o pacote internacional.'],
      'qc-guide.html':['Guia de fotos QC da Sugargoo','Revise fotos do armazém, medidas e condição visível antes do envio.'],
      'shipping-guide.html':['Guia de envio Sugargoo','Compare rotas, embalagem, rastreamento, restrições e custo total.'],
      'alternative.html':['Alternativas à Sugargoo em 2026','Compare agentes de compras usando critérios operacionais práticos.'],
      'sugargoo-spreadsheet-guide.html':['Guia de planilha Sugargoo','Organize links, variantes, fontes e notas de QC em uma planilha útil.'],
      'sugargoo-qc-checklist.html':['Lista de verificação QC Sugargoo','Confira vistas, etiquetas, medidas, construção, defeitos e fotos extras.'],
      'sugargoo-rehearsal-packing-guide.html':['Guia de embalagem de teste Sugargoo','Use dimensões, peso cobrado e instruções de embalagem antes de escolher a rota.'],
      'sugargoo-shipping-cost-guide.html':['Guia de custos de envio Sugargoo','Compare peso real e volumétrico, taxas totais, restrições e rastreamento.'],
      'sugargoo-warehouse-guide.html':['Guia do armazém Sugargoo','Relacione chegadas, revise provas, planeje armazenamento e prepare o pacote.'],
      'sugargoo-return-guide.html':['Guia de devolução Sugargoo','Documente o problema, reúna provas, confira prazos e aja antes do envio.'],
      'sugargoo-restricted-items-guide.html':['Guia de itens restritos Sugargoo','Confira atributos, elegibilidade da rota, regras do destino e declaração correta.'],
      'sugargoo-payment-guide.html':['Guia de pagamentos Sugargoo','Separe custos, confira conversão e mantenha registros de pagamentos e reembolsos.'],
      'sugargoo-uk-shipping-guide.html':['Envio Sugargoo para o Reino Unido','Planeje rota, peso cobrado, declaração, rastreamento e endereço.'],
      'sugargoo-germany-shipping-guide.html':['Envio Sugargoo para a Alemanha','Confira dados do pacote, rota, endereço e orientações alemãs ou da UE.'],
      'sugargoo-order-tracking-guide.html':['Guia de rastreamento de pedidos Sugargoo','Entenda transporte doméstico, armazém, criação do pacote e eventos internacionais.'],
      'sugargoo-product-link-guide.html':['Guia de links de produtos Sugargoo','Verifique anúncios, preserve variantes e trate links alterados ou expirados.']
    },
    es:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Cómo organizar un pedido Sugargoo con varios productos','Usa números de lote, códigos por artículo y estados para evitar mezclas, pérdidas y cambios erróneos.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Cómo encontrar un producto Sugargoo a partir de una imagen','Convierte la captura en pistas, compara enlaces candidatos y verifica el anuncio.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Cómo evitar cambios de última hora en pedidos Sugargoo','Confirma antes de comprar, después de cambios y antes del envío internacional.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['¿Qué pedidos encajan con la compra inversa Sugargoo?','Evalúa claridad, cambios de información, límites transfronterizos y coste de comunicación.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['¿Cómo funciona la compra inversa con Sugargoo?','Verifica enlace, variante, costes y datos previos al envío.'],
      'what-is-sugargoo.html':['¿Qué es Sugargoo?','Comprende el flujo desde el enlace hasta el paquete internacional.'],
      'qc-guide.html':['Guía de fotos QC de Sugargoo','Revisa fotos, medidas y estado visible antes del envío.'],
      'shipping-guide.html':['Guía de envíos Sugargoo','Compara rutas, embalaje, seguimiento, restricciones y coste total.'],
      'alternative.html':['Alternativas a Sugargoo 2026','Compara agentes con criterios operativos prácticos.'],
      'sugargoo-spreadsheet-guide.html':['Guía de hoja de cálculo Sugargoo','Organiza enlaces, variantes, fuentes y notas QC.'],
      'sugargoo-qc-checklist.html':['Lista de control QC Sugargoo','Comprueba vistas, etiquetas, medidas, construcción y defectos.'],
      'sugargoo-rehearsal-packing-guide.html':['Guía de embalaje de prueba Sugargoo','Usa dimensiones, peso facturable e instrucciones antes de elegir ruta.'],
      'sugargoo-shipping-cost-guide.html':['Guía de costes de envío Sugargoo','Compara peso real y volumétrico, cargos, restricciones y seguimiento.'],
      'sugargoo-warehouse-guide.html':['Guía del almacén Sugargoo','Relaciona llegadas, revisa pruebas, planifica almacenamiento y prepara el paquete.'],
      'sugargoo-return-guide.html':['Guía de devoluciones Sugargoo','Documenta el problema, reúne pruebas y actúa antes del envío internacional.'],
      'sugargoo-restricted-items-guide.html':['Guía de artículos restringidos Sugargoo','Revisa atributos, rutas, reglas del destino y declaraciones correctas.'],
      'sugargoo-payment-guide.html':['Guía de pagos Sugargoo','Separa costes, revisa conversiones y conserva registros de reembolsos.'],
      'sugargoo-uk-shipping-guide.html':['Envíos Sugargoo al Reino Unido','Planifica ruta, peso facturable, declaración, seguimiento y dirección.'],
      'sugargoo-germany-shipping-guide.html':['Envíos Sugargoo a Alemania','Comprueba datos, ruta, dirección y orientación alemana o de la UE.'],
      'sugargoo-order-tracking-guide.html':['Guía de seguimiento de pedidos Sugargoo','Entiende el transporte nacional, el almacén y los eventos internacionales.'],
      'sugargoo-product-link-guide.html':['Guía de enlaces de productos Sugargoo','Verifica anuncios, conserva variantes y gestiona enlaces cambiados.']
    },
    fr:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Organiser une commande Sugargoo avec plusieurs articles','Utilisez des numéros de lot, des identifiants et des statuts pour éviter les confusions et les oublis.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Trouver un produit Sugargoo à partir d’une image','Transformez la capture en indices, comparez les liens et vérifiez l’annonce.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Éviter les modifications tardives des commandes Sugargoo','Confirmez avant l’achat, après un changement et avant l’expédition.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quelles commandes conviennent à l’achat inversé Sugargoo ?','Évaluez la clarté, les changements, les limites transfrontalières et la communication.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Comment fonctionne l’achat inversé avec Sugargoo ?','Vérifiez le lien, la variante, les coûts et les détails avant l’envoi.'],
      'what-is-sugargoo.html':['Qu’est-ce que Sugargoo ?','Comprenez le parcours du lien produit au colis international.'],
      'qc-guide.html':['Guide des photos QC Sugargoo','Vérifiez les photos, mesures et l’état visible avant l’envoi.'],
      'shipping-guide.html':['Guide d’expédition Sugargoo','Comparez lignes, emballage, suivi, restrictions et coût total.'],
      'alternative.html':['Alternatives à Sugargoo 2026','Comparez les agents selon des critères opérationnels.'],
      'sugargoo-spreadsheet-guide.html':['Guide du tableur Sugargoo','Organisez liens, variantes, sources et notes QC.'],
      'sugargoo-qc-checklist.html':['Liste de contrôle QC Sugargoo','Vérifiez vues, étiquettes, mesures, construction et défauts.'],
      'sugargoo-rehearsal-packing-guide.html':['Guide de pré-emballage Sugargoo','Utilisez dimensions, poids facturable et instructions avant de choisir une ligne.'],
      'sugargoo-shipping-cost-guide.html':['Guide des coûts d’expédition Sugargoo','Comparez poids réel et volumétrique, frais, restrictions et suivi.'],
      'sugargoo-warehouse-guide.html':['Guide de l’entrepôt Sugargoo','Associez les arrivées, vérifiez les preuves et préparez le colis.'],
      'sugargoo-return-guide.html':['Guide des retours Sugargoo','Documentez le problème, rassemblez les preuves et agissez avant l’envoi.'],
      'sugargoo-restricted-items-guide.html':['Guide des articles restreints Sugargoo','Vérifiez attributs, lignes disponibles, règles du pays et déclaration.'],
      'sugargoo-payment-guide.html':['Guide des paiements Sugargoo','Séparez les coûts, vérifiez la conversion et conservez les remboursements.'],
      'sugargoo-uk-shipping-guide.html':['Expédition Sugargoo vers le Royaume-Uni','Planifiez ligne, poids, déclaration, suivi et adresse.'],
      'sugargoo-germany-shipping-guide.html':['Expédition Sugargoo vers l’Allemagne','Vérifiez données, ligne, adresse et règles allemandes ou européennes.'],
      'sugargoo-order-tracking-guide.html':['Guide de suivi des commandes Sugargoo','Comprenez transport intérieur, entrepôt, création du colis et scans internationaux.'],
      'sugargoo-product-link-guide.html':['Guide des liens produits Sugargoo','Vérifiez annonces, variantes et liens modifiés ou expirés.']
    },
    de:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Mehrere Sugargoo-Artikel richtig organisieren','Chargen- und Artikelnummern verhindern Verwechslungen, Auslassungen und falsche Änderungen.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Ein Sugargoo-Produkt anhand eines Bildes finden','Nutzen Sie Bildmerkmale, vergleichen Sie Links und prüfen Sie das Angebot.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Kurzfristige Änderungen bei Sugargoo-Bestellungen vermeiden','Bestätigen Sie vor dem Kauf, nach Änderungen und vor dem internationalen Versand.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Welche Bestellungen eignen sich für Sugargoo Reverse Shopping?','Bewerten Sie Produktklarheit, Änderungen, Grenzen und Kommunikationsaufwand.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Wie funktioniert Reverse Shopping mit Sugargoo?','Prüfen Sie Link, Variante, Kosten und Versanddetails.'],
      'what-is-sugargoo.html':['Was ist Sugargoo?','Verstehen Sie den Ablauf vom Produktlink bis zum internationalen Paket.'],
      'qc-guide.html':['Sugargoo QC-Foto-Ratgeber','Prüfen Sie Lagerfotos, Maße und sichtbaren Zustand.'],
      'shipping-guide.html':['Sugargoo Versandratgeber','Vergleichen Sie Routen, Verpackung, Tracking, Einschränkungen und Kosten.'],
      'alternative.html':['Sugargoo Alternativen 2026','Vergleichen Sie Einkaufsagenten anhand praktischer Kriterien.'],
      'sugargoo-spreadsheet-guide.html':['Sugargoo Tabellen-Ratgeber','Ordnen Sie Links, Varianten, Quellen und QC-Notizen.'],
      'sugargoo-qc-checklist.html':['Sugargoo QC-Checkliste','Prüfen Sie Ansichten, Etiketten, Maße, Verarbeitung und Mängel.'],
      'sugargoo-rehearsal-packing-guide.html':['Sugargoo Probeverpackungs-Ratgeber','Nutzen Sie Maße, Abrechnungsgewicht und klare Verpackungsanweisungen.'],
      'sugargoo-shipping-cost-guide.html':['Sugargoo Versandkosten-Ratgeber','Vergleichen Sie Gewicht, Gebühren, Einschränkungen, Tracking und Entschädigung.'],
      'sugargoo-warehouse-guide.html':['Sugargoo Lager-Ratgeber','Ordnen Sie Eingänge zu, prüfen Sie Nachweise und bereiten Sie das Paket vor.'],
      'sugargoo-return-guide.html':['Sugargoo Rückgabe-Ratgeber','Dokumentieren Sie Probleme und handeln Sie vor dem internationalen Versand.'],
      'sugargoo-restricted-items-guide.html':['Sugargoo Ratgeber für eingeschränkte Waren','Prüfen Sie Merkmale, Routen, Ziellandregeln und Deklaration.'],
      'sugargoo-payment-guide.html':['Sugargoo Zahlungsratgeber','Trennen Sie Kosten, prüfen Sie Umrechnung und bewahren Sie Rückerstattungen auf.'],
      'sugargoo-uk-shipping-guide.html':['Sugargoo Versand nach Großbritannien','Planen Sie Route, Gewicht, Deklaration, Tracking und Adresse.'],
      'sugargoo-germany-shipping-guide.html':['Sugargoo Versand nach Deutschland','Prüfen Sie Paketdaten, Route, Adresse und deutsche oder EU-Hinweise.'],
      'sugargoo-order-tracking-guide.html':['Sugargoo Sendungsverfolgungs-Ratgeber','Verstehen Sie Inlandstransport, Lager, Paketerstellung und internationale Scans.'],
      'sugargoo-product-link-guide.html':['Sugargoo Produktlink-Ratgeber','Prüfen Sie Angebote, Varianten und geänderte oder abgelaufene Links.']
    },
    it:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Come organizzare un ordine Sugargoo con più articoli','Usa numeri di lotto, codici articolo e stati per evitare scambi, omissioni e modifiche errate.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Come trovare un prodotto Sugargoo da un’immagine','Trasforma lo screenshot in indizi, confronta i link e verifica l’inserzione.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Come evitare modifiche tardive negli ordini Sugargoo','Conferma prima dell’acquisto, dopo i cambiamenti e prima della spedizione.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Quali ordini sono adatti al reverse shopping Sugargoo?','Valuta chiarezza, cambiamenti, limiti internazionali e costi di comunicazione.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Come funziona il reverse shopping con Sugargoo?','Verifica link, variante, costi e dettagli prima della spedizione.'],
      'what-is-sugargoo.html':['Che cos’è Sugargoo?','Comprendi il flusso dal link del prodotto al pacco internazionale.'],
      'qc-guide.html':['Guida alle foto QC Sugargoo','Controlla foto, misure e condizioni visibili prima della spedizione.'],
      'shipping-guide.html':['Guida spedizioni Sugargoo','Confronta rotte, imballaggio, tracking, restrizioni e costo totale.'],
      'alternative.html':['Alternative a Sugargoo 2026','Confronta gli agenti con criteri operativi pratici.'],
      'sugargoo-spreadsheet-guide.html':['Guida al foglio Sugargoo','Organizza link, varianti, fonti e note QC.'],
      'sugargoo-qc-checklist.html':['Checklist QC Sugargoo','Controlla viste, etichette, misure, costruzione e difetti.'],
      'sugargoo-rehearsal-packing-guide.html':['Guida all’imballaggio di prova Sugargoo','Usa dimensioni, peso fatturabile e istruzioni prima di scegliere la rotta.'],
      'sugargoo-shipping-cost-guide.html':['Guida ai costi di spedizione Sugargoo','Confronta peso, costi, restrizioni, tracking e compensazione.'],
      'sugargoo-warehouse-guide.html':['Guida al magazzino Sugargoo','Abbina gli arrivi, controlla le prove e prepara il pacco.'],
      'sugargoo-return-guide.html':['Guida ai resi Sugargoo','Documenta il problema e agisci prima della spedizione internazionale.'],
      'sugargoo-restricted-items-guide.html':['Guida agli articoli limitati Sugargoo','Controlla caratteristiche, rotte, regole del paese e dichiarazione.'],
      'sugargoo-payment-guide.html':['Guida ai pagamenti Sugargoo','Separa i costi, controlla il cambio e conserva i rimborsi.'],
      'sugargoo-uk-shipping-guide.html':['Spedizione Sugargoo nel Regno Unito','Pianifica rotta, peso, dichiarazione, tracking e indirizzo.'],
      'sugargoo-germany-shipping-guide.html':['Spedizione Sugargoo in Germania','Controlla dati, rotta, indirizzo e indicazioni tedesche o UE.'],
      'sugargoo-order-tracking-guide.html':['Guida al tracking degli ordini Sugargoo','Comprendi trasporto interno, magazzino, creazione pacco e scansioni.'],
      'sugargoo-product-link-guide.html':['Guida ai link prodotto Sugargoo','Verifica inserzioni, varianti e link modificati o scaduti.']
    },
    pl:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Jak uporządkować zamówienie Sugargoo z wieloma produktami','Numery partii, kody produktów i statusy pomagają uniknąć pomyłek i braków.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Jak znaleźć produkt Sugargoo na podstawie zdjęcia','Zamień obraz na wskazówki, porównaj linki i sprawdź ofertę.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Jak uniknąć późnych zmian w zamówieniach Sugargoo','Potwierdź przed zakupem, po zmianie oferty i przed wysyłką.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Jakie zamówienia pasują do reverse shopping Sugargoo?','Oceń jasność produktu, zmiany informacji, ograniczenia i komunikację.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Jak działa reverse shopping z Sugargoo?','Sprawdź link, wariant, koszty i dane przed wysyłką.'],
      'what-is-sugargoo.html':['Czym jest Sugargoo?','Poznaj proces od linku produktu do paczki międzynarodowej.'],
      'qc-guide.html':['Poradnik zdjęć QC Sugargoo','Sprawdź zdjęcia magazynowe, wymiary i widoczny stan.'],
      'shipping-guide.html':['Poradnik wysyłki Sugargoo','Porównaj trasy, pakowanie, śledzenie, ograniczenia i koszt.'],
      'alternative.html':['Alternatywy Sugargoo 2026','Porównaj agentów według praktycznych kryteriów.'],
      'sugargoo-spreadsheet-guide.html':['Poradnik arkusza Sugargoo','Uporządkuj linki, warianty, źródła i notatki QC.'],
      'sugargoo-qc-checklist.html':['Lista kontroli QC Sugargoo','Sprawdź ujęcia, etykiety, wymiary, wykonanie i wady.'],
      'sugargoo-rehearsal-packing-guide.html':['Poradnik próbnego pakowania Sugargoo','Użyj wymiarów, wagi rozliczeniowej i instrukcji przed wyborem trasy.'],
      'sugargoo-shipping-cost-guide.html':['Poradnik kosztów wysyłki Sugargoo','Porównaj wagę, opłaty, ograniczenia, tracking i rekompensatę.'],
      'sugargoo-warehouse-guide.html':['Poradnik magazynu Sugargoo','Dopasuj dostawy, sprawdź dowody i przygotuj paczkę.'],
      'sugargoo-return-guide.html':['Poradnik zwrotów Sugargoo','Udokumentuj problem i działaj przed wysyłką międzynarodową.'],
      'sugargoo-restricted-items-guide.html':['Poradnik ograniczonych produktów Sugargoo','Sprawdź cechy, trasy, zasady kraju i deklarację.'],
      'sugargoo-payment-guide.html':['Poradnik płatności Sugargoo','Oddziel koszty, sprawdź przewalutowanie i zachowaj dane zwrotów.'],
      'sugargoo-uk-shipping-guide.html':['Wysyłka Sugargoo do Wielkiej Brytanii','Zaplanuj trasę, wagę, deklarację, tracking i adres.'],
      'sugargoo-germany-shipping-guide.html':['Wysyłka Sugargoo do Niemiec','Sprawdź dane paczki, trasę, adres i wskazówki niemieckie lub UE.'],
      'sugargoo-order-tracking-guide.html':['Poradnik śledzenia zamówień Sugargoo','Poznaj transport krajowy, magazyn, tworzenie paczki i skany.'],
      'sugargoo-product-link-guide.html':['Poradnik linków produktów Sugargoo','Sprawdź oferty, warianty oraz zmienione lub wygasłe linki.']
    },
    nl:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Een Sugargoo-bestelling met meerdere artikelen organiseren','Gebruik batchnummers, itemcodes en statussen om verwisselingen en fouten te voorkomen.'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Een Sugargoo-product vinden met een afbeelding','Zet de afbeelding om in aanwijzingen, vergelijk links en controleer de aanbieding.'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Late wijzigingen in Sugargoo-bestellingen voorkomen','Bevestig vóór aankoop, na wijzigingen en vóór internationale verzending.'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Welke bestellingen passen bij Sugargoo reverse shopping?','Beoordeel duidelijkheid, wijzigingen, grensregels en communicatiekosten.'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Hoe werkt reverse shopping met Sugargoo?','Controleer link, variant, kosten en gegevens vóór verzending.'],
      'what-is-sugargoo.html':['Wat is Sugargoo?','Begrijp het proces van productlink tot internationaal pakket.'],
      'qc-guide.html':['Sugargoo QC-fotogids','Controleer magazijnfoto’s, maten en zichtbare staat.'],
      'shipping-guide.html':['Sugargoo verzendgids','Vergelijk routes, verpakking, tracking, beperkingen en totale kosten.'],
      'alternative.html':['Sugargoo-alternatieven 2026','Vergelijk aankoopagenten met praktische criteria.'],
      'sugargoo-spreadsheet-guide.html':['Sugargoo spreadsheetgids','Orden links, varianten, bronnen en QC-notities.'],
      'sugargoo-qc-checklist.html':['Sugargoo QC-checklist','Controleer aanzichten, labels, maten, afwerking en gebreken.'],
      'sugargoo-rehearsal-packing-guide.html':['Sugargoo proefverpakkingsgids','Gebruik afmetingen, factureerbaar gewicht en instructies vóór routekeuze.'],
      'sugargoo-shipping-cost-guide.html':['Sugargoo verzendkostengids','Vergelijk gewicht, kosten, beperkingen, tracking en vergoeding.'],
      'sugargoo-warehouse-guide.html':['Sugargoo magazijngids','Koppel aankomsten, controleer bewijs en bereid het pakket voor.'],
      'sugargoo-return-guide.html':['Sugargoo retourgids','Leg het probleem vast en handel vóór internationale verzending.'],
      'sugargoo-restricted-items-guide.html':['Sugargoo gids voor beperkte artikelen','Controleer kenmerken, routes, bestemmingsregels en aangifte.'],
      'sugargoo-payment-guide.html':['Sugargoo betalingsgids','Splits kosten, controleer wisselkoersen en bewaar terugbetalingen.'],
      'sugargoo-uk-shipping-guide.html':['Sugargoo verzending naar het VK','Plan route, gewicht, aangifte, tracking en adres.'],
      'sugargoo-germany-shipping-guide.html':['Sugargoo verzending naar Duitsland','Controleer pakketdata, route, adres en Duitse of EU-richtlijnen.'],
      'sugargoo-order-tracking-guide.html':['Sugargoo ordertrackinggids','Begrijp binnenlands vervoer, magazijn, pakketcreatie en internationale scans.'],
      'sugargoo-product-link-guide.html':['Sugargoo productlinkgids','Controleer aanbiedingen, varianten en gewijzigde of verlopen links.']
    },
    zh:{
      'sugargoo-reverse-shopping-multi-item-order-ledger.html':['Sugargoo反向代购多商品订单怎么整理？','用整单编号、子编号和状态记录防止串单、漏单与误改。'],
      'sugargoo-reverse-shopping-image-to-product-link.html':['Sugargoo反向代购只有图片怎么找商品？','把截图拆成视觉线索，建立候选链接并核验商品页。'],
      'sugargoo-reverse-shopping-confirmation-checkpoints.html':['Sugargoo反向代购如何避免临时改单？','在采购前、信息变化时和寄送前设置确认节点。'],
      'sugargoo-reverse-shopping-order-boundaries.html':['Sugargoo反向代购适合什么订单？','从商品可描述性、信息变化、跨境限制和沟通成本判断。'],
      'sugargoo-reverse-shopping-product-link-workflow.html':['Sugargoo反向代购怎么做？','核对商品链接、规格、成本拆分与寄送前信息。'],
      'what-is-sugargoo.html':['什么是 Sugargoo？','了解从商品链接到国际包裹的代购流程。'],
      'qc-guide.html':['Sugargoo QC 质检照片指南','发货前检查仓库照片、尺寸和可见状态。'],
      'shipping-guide.html':['Sugargoo 国际运输指南','比较线路、包装、追踪、限制和总费用。'],
      'alternative.html':['Sugargoo 替代平台 2026','用实际运营标准比较不同代购平台。'],
      'sugargoo-spreadsheet-guide.html':['Sugargoo 商品表格指南','整理商品链接、规格、来源与 QC 备注。'],
      'sugargoo-qc-checklist.html':['Sugargoo QC 检查清单','检查整体、标签、尺寸、做工、瑕疵与补拍照片。'],
      'sugargoo-rehearsal-packing-guide.html':['Sugargoo 预包装指南','选择线路前核对包裹尺寸、计费重量和包装要求。'],
      'sugargoo-shipping-cost-guide.html':['Sugargoo 运费指南','比较实际重量、体积重量、完整费用、限制与追踪。'],
      'sugargoo-warehouse-guide.html':['Sugargoo 仓库指南','核对入库、证据、存储安排并准备包裹清单。'],
      'sugargoo-return-guide.html':['Sugargoo 退货指南','记录问题、收集证据并在国际发货前处理。'],
      'sugargoo-restricted-items-guide.html':['Sugargoo 限制商品指南','检查商品属性、线路资格、目的地规则与准确申报。'],
      'sugargoo-payment-guide.html':['Sugargoo 付款指南','区分商品与运费，核对汇率并保存退款记录。'],
      'sugargoo-uk-shipping-guide.html':['Sugargoo 英国运输指南','规划线路、计费重量、申报、追踪与地址。'],
      'sugargoo-germany-shipping-guide.html':['Sugargoo 德国运输指南','检查包裹数据、线路、地址及德国或欧盟要求。'],
      'sugargoo-order-tracking-guide.html':['Sugargoo 订单追踪指南','了解国内运输、仓库处理、建包和国际扫描。'],
      'sugargoo-product-link-guide.html':['Sugargoo 商品链接指南','核验商品页、保留准确规格并处理失效链接。']
    }
  };

  function normalizedBasePath(){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    let path=match?(match[2]||'/'):location.pathname;
    if(path==='/index.html') path='/';
    if(path==='/guides/index.html') path='/guides/';
    return path;
  }

  function selectedLanguage(){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/|$)/);
    if(match) return match[1];
    const select=document.querySelector('.language-select');
    return (select&&select.value)||localStorage.getItem('sugargooLang')||'en';
  }

  function cardKey(card){
    try{return new URL(card.getAttribute('href'),location.href).pathname.split('/').filter(Boolean).pop()||'';}catch{return '';}
  }

  function localizeGuideCards(lang){
    document.body.dataset.activeLanguage=lang;
    const dictionary=L[lang]||EN;
    document.querySelectorAll('.guide-card').forEach(card=>{
      card.hidden=false;
      card.removeAttribute('hidden');
      const key=cardKey(card);
      const copy=dictionary[key]||EN[key];
      if(!copy) return;
      const h=card.querySelector('h3');
      const p=card.querySelector('p');
      if(h) h.textContent=copy[0];
      if(p) p.textContent=copy[1];
    });
    const intro=document.querySelector('[data-guide-hub-intro],.guide-hub .article-lead');
    if(intro&&INTRO[lang]) intro.textContent=INTRO[lang];
  }

  function leaveSeoLocaleForClientLanguage(lang){
    const match=location.pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    if(!match||lang==='en'||SEO_LANGS.has(lang)) return false;
    localStorage.setItem('sugargooLang',lang);
    location.replace(normalizedBasePath()+location.search+location.hash);
    return true;
  }

  function refresh(lang){
    if(leaveSeoLocaleForClientLanguage(lang)) return;
    setTimeout(()=>localizeGuideCards(lang),0);
  }

  document.addEventListener('DOMContentLoaded',()=>{
    localizeGuideCards(selectedLanguage());
    document.addEventListener('change',event=>{
      if(event.target.matches('.language-select')) refresh(event.target.value);
    });
    document.addEventListener('click',event=>{
      const button=event.target.closest('[data-language-button]');
      if(button) refresh(button.dataset.languageButton);
    });
  });
  window.addEventListener('pageshow',()=>localizeGuideCards(selectedLanguage()));
})();