import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const languageCodes = ["en", "fr", "de", "it", "es"];

const routes = {
  home: { slug: "", file: "index.html", type: "home" },
  finds: { slug: "finds/", file: "finds/index.html", type: "catalog" },
  categories: { slug: "categories/", file: "categories/index.html", type: "catalog" },
  articles: { slug: "articles/", file: "articles/index.html", type: "hub" },
  checklist: { slug: "guides/hacoo-shopping-checklist/", file: "guides/hacoo-shopping-checklist/index.html", type: "article" },
  how: { slug: "guides/how-hacoo-works/", file: "guides/how-hacoo-works/index.html", type: "article" },
  shipping: { slug: "guides/shipping/", file: "guides/shipping/index.html", type: "shipping" },
  size: { slug: "guides/size-guide/", file: "guides/size-guide/index.html", type: "article" },
  spreadsheet: { slug: "guides/what-is-hacoo-spreadsheet/", file: "guides/what-is-hacoo-spreadsheet/index.html", type: "article" },
  faq: { slug: "faq/", file: "faq/index.html", type: "faq" },
  about: { slug: "about/", file: "about/index.html", type: "article" },
  privacy: { slug: "privacy/", file: "privacy/index.html", type: "article" },
  terms: { slug: "terms/", file: "terms/index.html", type: "article" }
};

const localizedAdditions = {
  fr: {
    articlesLabel: "Articles SEO",
    stepsButton: "Lire le guide complet en trois étapes",
    articlesPage: {
      title: "Articles et guides Hacoo 2026 | Recherche indépendante",
      description: "Retrouvez les guides Hacoo indépendants sur les achats, les spreadsheets, la livraison, les tailles et les contrôles avant paiement.",
      crumb: "Articles SEO", eyebrow: "Centre de recherche", h1: "Guides Hacoo approfondis et clairement sourcés", lead: "Chaque article répond à une intention de recherche précise, distingue les sources officielles des parcours externes et conduit vers une page dédiée.",
      cardLabel: "Guide indépendant", openArticle: "Lire l’article", introTitle: "Commencez par la question qui vous concerne", introText: "Ces pages sont reliées entre elles pour faciliter la recherche sans répéter le même contenu. Consultez toujours la page en direct avant une commande."
    },
    checklistPage: {
      title: "Checklist d’achat Hacoo 2026 | 3 vérifications essentielles", description: "Un guide complet en trois étapes pour choisir la bonne source, vérifier le produit et comprendre la destination avant de payer.",
      crumb: "Checklist d’achat", eyebrow: "Guide complet en trois étapes", h1: "La checklist Hacoo à utiliser avant de continuer", lead: "Passez de la découverte à une décision plus sûre en vérifiant la source, les détails qui bloquent et le site qui gérera réellement la transaction.",
      summaryLabel: "En bref", summary: " Utilisez Hacoo pour ses informations et produits officiels, traitez chaque base externe comme une destination séparée et ne payez qu’après avoir contrôlé la variante, le prix, la livraison et les retours.",
      sections: [
        ["1. Choisir la bonne source", `<p>Commencez par identifier le type de page ouverte. L’application et les pages officielles Hacoo sont les références pour les produits Hacoo, le compte, les commandes, l’assistance et les politiques actuelles. Une liste appelée « Hacoo spreadsheet » ou un annuaire indépendant sert surtout à organiser la découverte.</p><ul><li>Vérifiez le domaine avant de vous fier au titre de la page.</li><li>Lisez la déclaration d’indépendance ou d’affiliation.</li><li>Utilisez une source officielle pour toute règle susceptible de changer.</li></ul>`],
        ["2. Vérifier le détail qui bloque", `<p>Avant de quitter la page de recherche, repérez ce qui pourrait rendre l’achat incorrect : taille, couleur, variante, stock, prix ou méthode de livraison. Ouvrez la fiche en direct et ne vous fiez pas uniquement à une image ou à une ancienne ligne de liste.</p><ul><li>Comparez les mesures avec un article qui vous va.</li><li>Confirmez la variante et le montant final.</li><li>Lisez les délais, frais, retours et conditions d’assistance.</li></ul>`],
        ["3. Continuer vers la destination", `<p>Le site qui accepte le paiement contrôle la disponibilité, l’exécution, l’expédition, les retours et le service après-vente. Enregistrez la fiche, la variante, le montant et la confirmation de commande. Si le texte de cette destination contredit un guide tiers, la page en direct doit être vérifiée avant d’agir.</p>`],
        ["Une routine de contrôle en 60 secondes", `<ol><li>Confirmez le domaine et l’identité du site.</li><li>Relisez le produit, la taille et la variante sélectionnée.</li><li>Vérifiez le prix total et la devise.</li><li>Repérez le délai et la politique de retour.</li><li>Conservez une preuve avant et après paiement.</li></ol>`]
      ]
    }
  },
  de: {
    articlesLabel: "SEO-Artikel",
    stepsButton: "Vollständigen Drei-Schritte-Ratgeber lesen",
    articlesPage: {
      title: "Hacoo Artikel und Ratgeber 2026 | Unabhängige Recherche", description: "Unabhängige Hacoo Ratgeber zu Shopping, Spreadsheets, Versand, Größen und wichtigen Prüfungen vor der Zahlung.",
      crumb: "SEO-Artikel", eyebrow: "Recherchezentrum", h1: "Ausführliche Hacoo-Ratgeber mit klaren Quellen", lead: "Jeder Artikel beantwortet eine konkrete Suchfrage, trennt offizielle Informationen von externen Zielen und führt auf eine eigenständige Seite.",
      cardLabel: "Unabhängiger Ratgeber", openArticle: "Artikel lesen", introTitle: "Beginne mit deiner wichtigsten Frage", introText: "Die Seiten sind sinnvoll miteinander verknüpft, ohne denselben Inhalt zu wiederholen. Prüfe vor einer Bestellung immer die aktuelle Zielseite."
    },
    checklistPage: {
      title: "Hacoo Shopping-Checkliste 2026 | 3 wichtige Prüfungen", description: "Der vollständige Drei-Schritte-Ratgeber zur richtigen Quelle, zur Produktprüfung und zum tatsächlichen Zahlungsziel.",
      crumb: "Shopping-Checkliste", eyebrow: "Vollständiger Drei-Schritte-Ratgeber", h1: "Die Hacoo-Checkliste vor dem nächsten Schritt", lead: "Triff eine klarere Entscheidung, indem du Quelle, kritische Produktdetails und die tatsächlich verantwortliche Zielseite prüfst.",
      summaryLabel: "Kurz gesagt", summary: " Nutze offizielle Hacoo-Seiten für Hacoo-Informationen, behandle externe Verzeichnisse als getrennte Ziele und zahle erst nach Prüfung von Variante, Preis, Versand und Rückgabe.",
      sections: [
        ["1. Die richtige Quelle wählen", `<p>Identifiziere zuerst die geöffnete Seite. Die Hacoo-App und offizielle Hacoo-Seiten sind maßgeblich für Produkte, Konto, Bestellungen, Support und aktuelle Richtlinien. Ein „Hacoo Spreadsheet“ oder unabhängiges Verzeichnis organisiert in erster Linie die Produktsuche.</p><ul><li>Prüfe die Domain und nicht nur den Seitentitel.</li><li>Lies den Hinweis zu Unabhängigkeit oder Zugehörigkeit.</li><li>Nutze für veränderliche Regeln eine offizielle Quelle.</li></ul>`],
        ["2. Das entscheidende Detail prüfen", `<p>Suche vor dem Wechsel zur Zielseite nach möglichen Fehlerquellen: Größe, Farbe, Variante, Bestand, Preis oder Versandart. Öffne die Live-Produktseite und verlasse dich nicht ausschließlich auf ein Bild oder einen alten Listeneintrag.</p><ul><li>Vergleiche Maße mit einem passenden eigenen Artikel.</li><li>Bestätige Variante, Menge und Endbetrag.</li><li>Lies Lieferzeit, Gebühren, Rückgabe und Supportbedingungen.</li></ul>`],
        ["3. Auf der Zielseite fortfahren", `<p>Die Seite, die die Zahlung annimmt, kontrolliert Verfügbarkeit, Abwicklung, Versand, Rückgaben und Kundendienst. Speichere Produktseite, Variante, Betrag und Bestellbestätigung. Bei Widersprüchen muss die aktuelle Zielseite vor dem Handeln geprüft werden.</p>`],
        ["Die 60-Sekunden-Prüfung", `<ol><li>Domain und Betreiber bestätigen.</li><li>Produkt, Größe und Variante erneut prüfen.</li><li>Gesamtpreis und Währung kontrollieren.</li><li>Lieferzeit und Rückgaberegel finden.</li><li>Vor und nach der Zahlung einen Nachweis speichern.</li></ol>`]
      ]
    }
  },
  it: {
    articlesLabel: "Articoli SEO",
    stepsButton: "Leggi la guida completa in tre passaggi",
    articlesPage: {
      title: "Articoli e guide Hacoo 2026 | Ricerca indipendente", description: "Guide Hacoo indipendenti su acquisti, spreadsheet, spedizione, taglie e controlli prima del pagamento.",
      crumb: "Articoli SEO", eyebrow: "Centro di ricerca", h1: "Guide Hacoo approfondite con fonti chiare", lead: "Ogni articolo risponde a una ricerca precisa, separa le fonti ufficiali dalle destinazioni esterne e porta a una pagina dedicata.",
      cardLabel: "Guida indipendente", openArticle: "Leggi l’articolo", introTitle: "Inizia dalla domanda che conta", introText: "Le pagine sono collegate per facilitare la ricerca senza duplicare lo stesso contenuto. Prima di ordinare verifica sempre la pagina aggiornata."
    },
    checklistPage: {
      title: "Checklist acquisti Hacoo 2026 | 3 controlli essenziali", description: "Guida completa in tre passaggi per scegliere la fonte, controllare il prodotto e capire chi gestisce la transazione.",
      crumb: "Checklist acquisti", eyebrow: "Guida completa in tre passaggi", h1: "La checklist Hacoo prima di continuare", lead: "Passa dalla scoperta a una scelta più chiara verificando la fonte, i dettagli decisivi e il sito responsabile della transazione.",
      summaryLabel: "In breve", summary: " Usa le fonti ufficiali per le informazioni Hacoo, considera ogni indice esterno una destinazione separata e paga solo dopo aver verificato variante, prezzo, spedizione e resi.",
      sections: [
        ["1. Scegliere la fonte corretta", `<p>Identifica prima il tipo di pagina. L’app e le pagine ufficiali Hacoo sono il riferimento per prodotti Hacoo, account, ordini, assistenza e politiche correnti. Uno “Hacoo spreadsheet” o un elenco indipendente serve soprattutto a organizzare la scoperta.</p><ul><li>Controlla il dominio, non solo il titolo.</li><li>Leggi la dichiarazione di indipendenza o affiliazione.</li><li>Per regole variabili usa una fonte ufficiale.</li></ul>`],
        ["2. Controllare il dettaglio decisivo", `<p>Prima di aprire la destinazione individua ciò che potrebbe rendere errato l’acquisto: taglia, colore, variante, disponibilità, prezzo o spedizione. Apri la scheda dal vivo e non affidarti soltanto a un’immagine o a una vecchia riga di elenco.</p><ul><li>Confronta le misure con un capo adatto.</li><li>Conferma variante, quantità e totale.</li><li>Leggi tempi, costi, resi e assistenza.</li></ul>`],
        ["3. Continuare sulla destinazione", `<p>Il sito che accetta il pagamento controlla disponibilità, evasione, spedizione, resi e servizio post-vendita. Salva scheda, variante, importo e conferma d’ordine. Se la destinazione contraddice una guida esterna, verifica il testo aggiornato prima di agire.</p>`],
        ["Il controllo in 60 secondi", `<ol><li>Conferma dominio e gestore.</li><li>Ricontrolla prodotto, taglia e variante.</li><li>Verifica totale e valuta.</li><li>Trova tempi e politica di reso.</li><li>Salva una prova prima e dopo il pagamento.</li></ol>`]
      ]
    }
  },
  es: {
    articlesLabel: "Artículos SEO",
    stepsButton: "Leer la guía completa en tres pasos",
    articlesPage: {
      title: "Artículos y guías Hacoo 2026 | Investigación independiente", description: "Guías Hacoo independientes sobre compras, spreadsheets, envío, tallas y comprobaciones antes de pagar.",
      crumb: "Artículos SEO", eyebrow: "Centro de investigación", h1: "Guías Hacoo detalladas y con fuentes claras", lead: "Cada artículo responde a una búsqueda concreta, separa las fuentes oficiales de los destinos externos y conduce a una página propia.",
      cardLabel: "Guía independiente", openArticle: "Leer el artículo", introTitle: "Empieza por la pregunta que necesitas resolver", introText: "Las páginas están conectadas para facilitar la investigación sin repetir el mismo contenido. Antes de pedir, comprueba siempre la página actual."
    },
    checklistPage: {
      title: "Checklist de compra Hacoo 2026 | 3 comprobaciones", description: "Guía completa en tres pasos para elegir la fuente, revisar el producto y saber quién gestiona realmente la transacción.",
      crumb: "Checklist de compra", eyebrow: "Guía completa en tres pasos", h1: "La checklist Hacoo antes de continuar", lead: "Pasa del descubrimiento a una decisión más clara comprobando la fuente, los detalles decisivos y el sitio responsable de la transacción.",
      summaryLabel: "En resumen", summary: " Usa las fuentes oficiales para la información Hacoo, trata cada índice externo como un destino separado y paga solo después de revisar variante, precio, envío y devoluciones.",
      sections: [
        ["1. Elegir la fuente correcta", `<p>Identifica primero qué tipo de página has abierto. La app y las páginas oficiales Hacoo son la referencia para productos Hacoo, cuenta, pedidos, soporte y políticas actuales. Un “Hacoo spreadsheet” o directorio independiente sirve principalmente para organizar el descubrimiento.</p><ul><li>Comprueba el dominio y no solo el título.</li><li>Lee la declaración de independencia o afiliación.</li><li>Usa una fuente oficial para cualquier regla cambiante.</li></ul>`],
        ["2. Revisar el detalle decisivo", `<p>Antes de abrir el destino, localiza lo que podría hacer incorrecta la compra: talla, color, variante, stock, precio o método de envío. Abre la ficha en directo y no dependas solo de una imagen o una fila antigua.</p><ul><li>Compara medidas con una prenda que te quede bien.</li><li>Confirma variante, cantidad e importe final.</li><li>Lee plazos, costes, devoluciones y soporte.</li></ul>`],
        ["3. Continuar en el destino", `<p>El sitio que acepta el pago controla disponibilidad, preparación, envío, devoluciones y posventa. Guarda la ficha, variante, importe y confirmación del pedido. Si el destino contradice una guía externa, verifica el texto actual antes de actuar.</p>`],
        ["La revisión de 60 segundos", `<ol><li>Confirma dominio y operador.</li><li>Revisa producto, talla y variante.</li><li>Comprueba total y moneda.</li><li>Localiza plazo y política de devolución.</li><li>Guarda una prueba antes y después de pagar.</li></ol>`]
      ]
    }
  }
};

const productRoutes = [
  ["shoes", "https://www.cnfanshp.com/shoes/"],
  ["hoodies", "https://www.cnfanshp.com/hoodies-sweaters/"],
  ["tshirts", "https://www.cnfanshp.com/t-shirts/"],
  ["jackets", "https://www.cnfanshp.com/jackets/"],
  ["bottoms", "https://www.cnfanshp.com/pants-shorts/"],
  ["headwear", "https://www.cnfanshp.com/headwear/"],
  ["accessories", "https://www.cnfanshp.com/accessories/"],
  ["electronics", "https://www.cnfanshp.com/electronics/"],
  ["sets", "https://www.cnfanshp.com/short-sets/"],
  ["jerseys", "https://www.cnfanshp.com/jersey/"],
  ["other", "https://www.cnfanshp.com/other-stuff/"],
  ["allProducts", "https://www.cnfanshp.com/AllProducts/"]
];

const featuredProducts = [
  ["shoes", "shoes.webp", "https://www.cnfanshp.com/AllProducts/6035.html"],
  ["clothing", "clothing.webp", "https://www.cnfanshp.com/AllProducts/3468.html"],
  ["bags", "bags.webp", "https://www.cnfanshp.com/AllProducts/4558.html"],
  ["accessories", "accessories.webp", "https://www.cnfanshp.com/AllProducts/5480.html"]
];

const locales = {
  fr: {
    code: "fr",
    common: {
      skip: "Aller au contenu", home: "Accueil", homeLabel: "Accueil du guide Hacoo Store", openNav: "Ouvrir la navigation", primaryNav: "Navigation principale",
      finds: "Sélections", categories: "Catégories", how: "Fonctionnement", shipping: "Livraison", faq: "FAQ", independent: "Guide indépendant", notAffiliated: "Non affilié à Hacoo",
      guides: "Guides", site: "Site", spreadsheet: "Hacoo spreadsheet", sizeGuide: "Guide des tailles", about: "À propos", privacy: "Confidentialité", terms: "Conditions",
      reviewed: "Révision éditoriale : 13 juillet 2026", footerCopy: "Informations et navigation indépendantes. Non affilié à Hacoo. Vérifiez les détails actuels sur la destination finale avant tout achat.",
      guideNav: "Navigation du guide", browseCategories: "Voir les catégories"
    },
    catalog: {
      labels: { shoes: "Chaussures", clothing: "Vêtements", bags: "Sacs", accessories: "Accessoires" },
      alt: { shoes: "Baskets basses ivoire sans marque", clothing: "Maille pliée dans des tons neutres", bags: "Sac structuré marron sans marque", accessories: "Casquette, lunettes et bracelet sans marque" },
      openFeatured: "Ouvrir le produit sélectionné :",
      openRoute: "Ouvrir la catégorie externe",
      routes: { shoes: "Chaussures", hoodies: "Sweats et pulls", tshirts: "T-shirts", jackets: "Vestes", bottoms: "Pantalons et shorts", headwear: "Casquettes et chapeaux", accessories: "Accessoires", electronics: "Électronique", sets: "Ensembles courts", jerseys: "Maillots", other: "Autres sélections", allProducts: "Tous les produits" }
    },
    home: { finder: { searchLabel: "Rechercher des produits", placeholder: "Rechercher produits, marques, styles…", searchButton: "Lancer la recherche", choose: "Choisir une catégorie", filters: "Filtres de catégorie", all: "Tout" } },
    pages: {
      home: {
        title: "Guide Hacoo Store 2026 | Catégories, achats et livraison", description: "Guide indépendant Hacoo en français : découvrez les catégories, le fonctionnement de l’application, les tailles et les délais de livraison publiés.",
        eyebrow: "Guide de recherche indépendant 2026", h1: "Trouvez des produits Hacoo sans défilement infini", lead: "Un guide vérifié sur les catégories populaires, les tailles, la livraison et la recherche de produits, avec une distinction claire entre l’application officielle Hacoo et les bases externes indépendantes.",
        primary: "Voir les sélections", secondary: "Lire le guide d’achat", updated: "Mis à jour en juillet 2026", categoryLed: "Navigation par catégorie", cited: "Sources officielles citées",
        stepsEyebrow: "Un parcours plus clair", stepsTitle: "Utilisez ce guide en trois étapes.", stepsIntro: "Le site sépare les informations officielles de Hacoo des destinations externes avant de vous envoyer vers la page suivante.",
        steps: [["Choisir la bonne source", "Utilisez l’application officielle pour les commandes et l’assistance Hacoo. Utilisez les catégories indépendantes pour découvrir d’autres produits."], ["Vérifier les détails essentiels", "Contrôlez les mesures, les variantes, le prix, la livraison, les retours et l’identité du site qui encaisse."], ["Continuer sur la destination", "La disponibilité, le paiement, l’expédition et le service après-vente dépendent de la destination choisie."]],
        factsEyebrow: "Vérifié auprès de Hacoo", factsTitle: "Ce que disent les pages officielles.", factsIntro: "Les informations suivantes proviennent des pages d’aide et de livraison de Hacoo. Consultez toujours la source actuelle.",
        facts: [["Commande officielle", "Hacoo décrit un paiement standard dans l’application.", "Ouvrez l’application, connectez-vous, ajoutez les articles au panier puis payez.", "https://act.hacoo.app/act/sara/helpcenter/order1", "Lire l’aide officielle"], ["Délais officiels", "La livraison est une estimation, pas une garantie.", "La page indique généralement 15 à 28 jours, avec des fourchettes régionales et 3 à 5 jours ouvrés de traitement.", "https://www.hacoo.app/en-US/pages/shipping-info", "Consulter la page de livraison"]],
        ctaTitle: "Prêt à parcourir les catégories ?", ctaText: "Choisissez une catégorie claire puis vérifiez le produit en direct avant de poursuivre.", ctaButton: "Voir tous les produits"
      },
      finds: {
        title: "Sélections Hacoo et produits externes | Guide indépendant", description: "Parcourez des sélections Hacoo clairement identifiées et des parcours externes pour chaussures, vêtements, sacs, accessoires et plus.",
        crumb: "Sélections", eyebrow: "Destinations clairement indiquées", h1: "Des sélections Hacoo sans confondre les sources", lead: "Passez d’une recherche générale à un produit ou une catégorie précise. Chaque bouton indique une destination indépendante à vérifier avant achat.",
        directoryEyebrow: "Tous les parcours disponibles", directoryTitle: "Commencez par une catégorie précise.", directoryIntro: "Une catégorie dédiée facilite la comparaison. Les parcours sont contrôlés périodiquement, mais les fiches produits peuvent changer.",
        checksEyebrow: "Avant d’ouvrir un produit", checksTitle: "Trois vérifications utiles.", checksIntro: "Un lien accélère la découverte, mais la destination finale contrôle la transaction.",
        checks: [["Comparer la variante", "Vérifiez que la taille, la couleur, les photos et le prix correspondent au produit sélectionné."], ["Lire les conditions", "Identifiez qui encaisse, expédie, accepte les retours et fournit l’assistance."], ["Conserver une preuve", "Enregistrez la fiche, la variante, le montant, le numéro de commande et le suivi."]]
      },
      categories: {
        title: "Catégories de produits Hacoo 2026 | Chaussures, vêtements et sacs", description: "Explorez un répertoire indépendant de catégories Hacoo pour chaussures, vêtements, sacs, accessoires, électronique et plus.",
        crumb: "Catégories", eyebrow: "Découverte par catégorie", h1: "Allez directement au type de produit recherché", lead: "Ouvrez un produit sélectionné ou une catégorie plus large. Vérifiez la variante, le prix, la livraison et les retours sur la page finale.",
        directoryEyebrow: "Répertoire indépendant", directoryTitle: "Parcourir toutes les catégories.", directoryIntro: "Les catégories donnent un point de départ clair sans présenter les destinations externes comme des pages officielles de Hacoo.",
        checksEyebrow: "Avant de continuer", checksTitle: "Trois contrôles pour chaque produit.", checksIntro: "La page en direct fait foi pour la disponibilité et la transaction.",
        checks: [["Confirmer le produit", "Contrôlez la taille, la couleur, la quantité, les photos et le prix actuels."], ["Vérifier la destination", "Lisez les conditions de paiement, de livraison, de retour et d’assistance."], ["Sauvegarder les détails", "Conservez une copie de la sélection, du montant, de la commande et du suivi."]]
      },
      how: {
        title: "Comment fonctionne Hacoo en 2026 | Commande expliquée", description: "Explication vérifiée du processus de commande Hacoo et de la différence entre les produits de l’application et les liens externes.",
        crumb: "Fonctionnement", eyebrow: "Parcours vérifié", h1: "Comment fonctionne réellement une commande Hacoo", lead: "La page d’aide officielle décrit un achat simple dans l’application. Les bases de produits externes restent des destinations séparées.",
        summaryLabel: "Réponse courte", summary: " Ouvrez l’application Hacoo, connectez-vous, sélectionnez les produits, ajoutez-les au panier puis validez et payez.",
        sections: [["Les quatre étapes officielles", `<ol><li>Ouvrir l’application Hacoo.</li><li>Se connecter au compte.</li><li>Sélectionner les produits et les ajouter au panier.</li><li>Vérifier les informations, valider et payer.</li></ol><p>Cette séquence provient de la page d’aide officielle de Hacoo.</p>`], ["Ce que cela signifie pour les liens externes", `<p>Une recherche appelée « Hacoo spreadsheet » ne transforme pas une liste externe en inventaire officiel. Vérifiez toujours le domaine, la société qui encaisse et les conditions appliquées.</p><p>La page officielle consultée ne décrit pas Hacoo comme un agent acceptant n’importe quelle URL Taobao ou Weidian avec réception en entrepôt et photos QC universelles.</p>`], ["Avant de payer", `<ul><li>Confirmez la variante, la taille, la quantité et le prix.</li><li>Utilisez l’estimation de livraison donnée par le véritable prestataire.</li><li>Lisez la politique de retour et conservez des captures de la commande.</li></ul>`]]
      },
      shipping: {
        title: "Livraison Hacoo 2026 | Délais de traitement et de réception", description: "Consultez les délais de traitement et de livraison publiés par Hacoo, les fourchettes régionales et les vérifications à faire avant paiement.",
        crumb: "Guide de livraison", eyebrow: "Fourchettes officielles expliquées", h1: "Les délais Hacoo sont des estimations, pas des garanties", lead: "Hacoo publie des délais qui varient selon la destination. Cette page résume le texte officiel vérifié en juillet 2026.",
        summaryLabel: "Réponse courte", summary: " La page Hacoo indique généralement 15 à 28 jours de réception et 3 à 5 jours ouvrés de traitement. Les dates restent indicatives.",
        rangesTitle: "Délais de livraison publiés", rangesIntro: "Au moment de la vérification, la page officielle affichait les fourchettes suivantes :", destination: "Destination", range: "Délai publié", ukGroup: "Royaume-Uni, France, Allemagne, Italie", spain: "Espagne", other: "Autres pays", general: "Indication générale", days: "jours",
        sections: [["Traitement et transport sont différents", `<p>Hacoo définit le délai de réception comme le traitement plus le transport. Une promesse de transport express de 5 à 7 jours ouvrés ne signifie donc pas automatiquement une réception totale en 5 à 7 jours.</p>`], ["Pourquoi un colis peut prendre plus de temps", `<ul><li>La destination et le transporteur modifient la fourchette.</li><li>Un article en précommande peut être envoyé séparément.</li><li>Une adresse incorrecte ou un retard logistique peut bloquer l’acheminement.</li></ul>`], ["Vérifications avant paiement", `<ol><li>Confirmez le pays et l’adresse complète.</li><li>Séparez le temps de traitement du transport.</li><li>Enregistrez le numéro de commande et le suivi.</li><li>Consultez l’assistance officielle si le suivi dépasse la fourchette annoncée.</li></ol>`]],
        officialButton: "Voir la livraison officielle"
      },
      size: {
        title: "Guide des tailles Hacoo | Mesures vêtements et chaussures", description: "Guide indépendant fondé sur les mesures pour comparer les tableaux de tailles de vêtements et de chaussures.",
        crumb: "Guide des tailles", eyebrow: "Mesurer d’abord", h1: "Choisissez la taille avec des mesures, pas avec l’étiquette", lead: "Les mêmes lettres et pointures peuvent varier selon le vendeur. Comparez toujours le tableau en direct avec un article qui vous va déjà.",
        summaryLabel: "Méthode rapide", summary: " Mesurez un vêtement ou une chaussure de référence, comparez les mêmes points et gardez la marge nécessaire au confort souhaité.",
        sections: [["Vêtements : mesurer un article qui vous va", `<p>Si le tableau donne les dimensions du vêtement fini, posez une pièce similaire à plat. Comparez largeur de poitrine, longueur, épaules, manches, taille et entrejambe avec la même méthode.</p>`], ["Chaussures : commencer par la longueur du pied", `<p>Mesurez les deux pieds debout et utilisez le plus grand résultat. Vérifiez si le tableau parle de longueur du pied, de longueur intérieure ou de semelle. Une conversion EU, UK ou US n’est pas universelle.</p>`], ["Contrôle final", `<ul><li>Le tableau mesure-t-il le corps ou le vêtement ?</li><li>Les unités sont-elles en centimètres ou en pouces ?</li><li>La variante choisie est-elle celle que vous avez évaluée ?</li><li>Avez-vous gardé une capture du tableau et de la sélection ?</li></ul>`]]
      },
      spreadsheet: {
        title: "Qu’est-ce qu’un Hacoo spreadsheet ? | Explication 2026", description: "Comprenez le terme Hacoo spreadsheet, sa différence avec l’application officielle et les contrôles à faire avant d’ouvrir un lien.",
        crumb: "Hacoo spreadsheet", eyebrow: "Terme de recherche expliqué", h1: "Qu’est-ce qu’un Hacoo spreadsheet ?", lead: "Il s’agit généralement d’un nom informel pour une liste de liens ou de catégories associée aux recherches Hacoo, et non d’une méthode officielle de commande.",
        summaryLabel: "Définition", summary: " Un Hacoo spreadsheet peut être une feuille, un annuaire, une liste sociale ou un site indépendant. Son format n’officialise pas les produits qu’il contient.",
        sections: [["Pourquoi les utilisateurs le recherchent", `<p>Une liste organisée évite de parcourir un long fil lorsque l’utilisateur connaît déjà la catégorie voulue. Elle peut aussi regrouper des chaussures, vêtements, sacs ou accessoires sur des pages plus faciles à consulter sur mobile.</p>`], ["Ce qu’une bonne page doit montrer", `<ul><li>La source et la destination de chaque bouton.</li><li>Des catégories claires et des liens régulièrement contrôlés.</li><li>Des conseils utiles sur tailles, livraison et retours.</li><li>Une mention visible de l’indépendance du site.</li></ul>`], ["Cinq contrôles avant de partager", `<ol><li>Vérifiez le domaine.</li><li>Lisez la mention d’affiliation.</li><li>Identifiez le site qui prendra le paiement.</li><li>Contrôlez le produit et la variante en direct.</li><li>Refusez les promesses universelles sans source actuelle.</li></ol>`]]
      },
      faq: {
        title: "FAQ Hacoo 2026 | Commande, livraison, tailles et liens", description: "Réponses indépendantes aux questions fréquentes sur Hacoo, les commandes, les délais, les catégories externes et les tailles.",
        eyebrow: "Réponses indépendantes", h1: "Les questions Hacoo, sans promesses inventées", lead: "Ces réponses séparent les informations officielles des parcours externes. Les politiques susceptibles de changer renvoient vers la source actuelle.",
        items: [["hacoo.store est-il le site officiel de Hacoo ?", "Non. Il s’agit d’un guide indépendant, non exploité ni approuvé par Hacoo."], ["Comment commander sur Hacoo ?", "La page d’aide indique d’ouvrir l’application, de se connecter, de sélectionner les articles, de les ajouter au panier puis de payer."], ["Qu’est-ce qu’un Hacoo spreadsheet ?", "C’est un terme informel pour des listes de liens ou de catégories. Il ne rend pas une destination externe officielle."], ["hacoo.store vend-il des produits ?", "Non. Le site fournit des informations et une navigation indépendantes. La transaction se déroule sur la destination finale."], ["Quel est le délai de livraison Hacoo ?", "En juillet 2026, la page officielle indiquait généralement 15 à 28 jours, avec 3 à 5 jours ouvrés de traitement et des fourchettes régionales."], ["La livraison en 5 à 7 jours est-elle garantie ?", "Non. La page évoque le transport express le plus rapide, pas un délai total universel incluant traitement, stock et destination."], ["Comment choisir une taille ?", "Comparez les mesures en direct avec un article qui vous va déjà. Ne vous fiez pas uniquement à une lettre ou à une conversion de pointure."], ["Qui gère les retours ?", "La société qui prend la commande contrôle le retour et le service après-vente. Lisez les conditions de cette destination."]],
        ctaTitle: "Vous ne savez pas par où commencer ?", ctaText: "Lisez d’abord le fonctionnement officiel, puis choisissez une catégorie clairement indiquée.", ctaButton: "Comprendre le fonctionnement"
      },
      about: {
        title: "À propos du guide Hacoo Store | Méthode éditoriale", description: "Découvrez comment le guide distingue les informations officielles de Hacoo des parcours produits externes.",
        crumb: "À propos", eyebrow: "Méthode éditoriale", h1: "Indépendant par conception", lead: "Le guide rend les recherches Hacoo plus claires sans vendre, encaisser ni prétendre représenter Hacoo.",
        summaryLabel: "Notre principe", summary: " Les faits sur Hacoo sont vérifiés sur les pages officielles ; les parcours externes sont contrôlés séparément et clairement indiqués.",
        sections: [["Comment les informations sont vérifiées", `<p>Nous ouvrons les sources officielles avant de publier un processus ou un délai, indiquons la date de révision et évitons de transformer une fourchette en garantie.</p>`], ["Ce que le guide ne fera pas", `<p>Nous n’inventons pas de photos QC universelles, de livraison gratuite, de délais garantis, de coupons, de fiabilité vendeur ou de partenariat officiel.</p>`], ["Corrections", `<p>Les pages peuvent changer après une révision. La destination officielle ou finale reste la référence pour toute commande précise.</p>`]]
      },
      privacy: {
        title: "Politique de confidentialité | Guide Hacoo Store", description: "Informations de confidentialité pour le guide indépendant Hacoo Store.",
        crumb: "Confidentialité", eyebrow: "Mise à jour le 13 juillet 2026", h1: "Politique de confidentialité", lead: "Le guide ne propose ni compte, ni paiement, ni commentaire, ni formulaire de commande.",
        summaryLabel: "Données personnelles", summary: " Cette version ne demande pas volontairement de nom, d’adresse postale, de paiement ou de données de commande.",
        sections: [["Données techniques", `<p>L’hébergeur peut traiter l’adresse IP, le navigateur, la page demandée, l’heure et des signaux de sécurité afin de fournir et protéger le site.</p>`], ["Liens externes et cookies", `<p>Les destinations externes appliquent leurs propres politiques. Cette version ne dépose pas de cookie publicitaire ; le choix de langue peut être mémorisé localement dans le navigateur.</p>`], ["Modifications", `<p>La date sera mise à jour lors d’un changement important. La version publique doit inclure un moyen de contact opérationnel avant le lancement.</p>`]]
      },
      terms: {
        title: "Conditions et avertissement | Guide Hacoo Store", description: "Conditions d’utilisation et mention d’indépendance du guide Hacoo Store.",
        crumb: "Conditions", eyebrow: "Mise à jour le 13 juillet 2026", h1: "Conditions et avertissement", lead: "hacoo.store est un site indépendant d’information et de navigation, non affilié, sponsorisé ni exploité par Hacoo.",
        summaryLabel: "Statut indépendant", summary: " Les références à Hacoo identifient le sujet éditorial et ne revendiquent aucun contrôle sur la marque, l’application ou ses services.",
        sections: [["Aucune vente ni transaction", `<p>Le guide ne vend pas, n’encaisse pas, ne gère pas les commandes, l’expédition ou les retours. Toute transaction dépend des conditions de la destination finale.</p>`], ["Limites des informations", `<p>Les prix, stocks, politiques, délais et pages peuvent changer sans préavis. Vérifiez toute information importante sur la page en direct avant d’agir.</p>`], ["Sites et produits externes", `<p>Un lien n’atteste pas l’authenticité, la qualité, la sécurité ou la performance d’un vendeur. Utilisez les destinations externes selon votre propre appréciation.</p>`]]
      }
    }
  },
  de: {
    code: "de",
    common: {
      skip: "Zum Inhalt springen", home: "Startseite", homeLabel: "Startseite des Hacoo Store Guide", openNav: "Navigation öffnen", primaryNav: "Hauptnavigation",
      finds: "Entdeckungen", categories: "Kategorien", how: "So funktioniert es", shipping: "Versand", faq: "FAQ", independent: "Unabhängiger Guide", notAffiliated: "Nicht mit Hacoo verbunden",
      guides: "Ratgeber", site: "Website", spreadsheet: "Hacoo Spreadsheet", sizeGuide: "Größenratgeber", about: "Über uns", privacy: "Datenschutz", terms: "Bedingungen",
      reviewed: "Redaktionell geprüft: 13. Juli 2026", footerCopy: "Unabhängige Information und Navigation. Nicht mit Hacoo verbunden. Prüfe aktuelle Angaben vor dem Kauf auf der endgültigen Zielseite.",
      guideNav: "Ratgeber-Navigation", browseCategories: "Kategorien ansehen"
    },
    catalog: {
      labels: { shoes: "Schuhe", clothing: "Kleidung", bags: "Taschen", accessories: "Accessoires" },
      alt: { shoes: "Ungebrandete elfenbeinfarbene Sneaker", clothing: "Gefaltete Strickkleidung in neutralen Farben", bags: "Ungebrandete braune strukturierte Tasche", accessories: "Ungebrandete Kappe, Brille und Armband" },
      openFeatured: "Ausgewähltes Produkt öffnen:", openRoute: "Externe Kategorie öffnen",
      routes: { shoes: "Schuhe", hoodies: "Hoodies und Pullover", tshirts: "T-Shirts", jackets: "Jacken", bottoms: "Hosen und Shorts", headwear: "Kappen und Hüte", accessories: "Accessoires", electronics: "Elektronik", sets: "Kurze Sets", jerseys: "Trikots", other: "Weitere Entdeckungen", allProducts: "Alle Produkte" }
    },
    home: { finder: { searchLabel: "Produkte suchen", placeholder: "Produkte, Marken, Styles suchen…", searchButton: "Suche starten", choose: "Kategorie wählen", filters: "Kategoriefilter", all: "Alle" } },
    pages: {
      home: {
        title: "Hacoo Store Guide 2026 | Kategorien, Einkauf und Versand", description: "Unabhängiger deutscher Hacoo Guide zu Kategorien, App-Bestellung, Größen und veröffentlichten Lieferzeiten.",
        eyebrow: "Unabhängiger Recherche-Guide 2026", h1: "Hacoo-Produkte ohne endloses Scrollen finden", lead: "Ein quellengeprüfter Guide zu beliebten Kategorien, Größen, Lieferung und Produktsuche – mit klarer Trennung zwischen der offiziellen Hacoo-App und unabhängigen externen Produktdatenbanken.",
        primary: "Beliebte Entdeckungen", secondary: "Einkaufsratgeber lesen", updated: "Aktualisiert Juli 2026", categoryLed: "Nach Kategorien stöbern", cited: "Offizielle Quellen genannt",
        stepsEyebrow: "Ein klarerer Weg", stepsTitle: "Diesen Guide in drei Schritten nutzen.", stepsIntro: "Die Website trennt offizielle Hacoo-Informationen von externen Produktzielen, bevor du weitergehst.",
        steps: [["Die richtige Quelle wählen", "Nutze die offizielle App für Hacoo-Bestellungen und Support. Externe Kategorien dienen der unabhängigen Produktsuche."], ["Wichtige Details prüfen", "Kontrolliere Maße, Varianten, Preis, Versand, Rückgabe und wer die Zahlung entgegennimmt."], ["Auf der Zielseite fortfahren", "Verfügbarkeit, Zahlung, Versand und Kundendienst richten sich nach dem gewählten Ziel."]],
        factsEyebrow: "Mit Hacoo abgeglichen", factsTitle: "Was die offiziellen Seiten sagen.", factsIntro: "Diese Angaben stammen aus Hacoos Hilfe- und Versandseiten. Prüfe vor einer Bestellung immer die aktuelle Quelle.",
        facts: [["Offizieller Bestellablauf", "Hacoo beschreibt einen normalen App-Warenkorb.", "App öffnen, anmelden, Artikel in den Warenkorb legen, zur Kasse gehen und bezahlen.", "https://act.hacoo.app/act/sara/helpcenter/order1", "Offizielle Bestellhilfe lesen"], ["Offizielle Lieferangaben", "Lieferzeiten sind Spannen, keine Garantien.", "Die Seite nennt meist 15 bis 28 Tage sowie regionale Spannen und 3 bis 5 Werktage Bearbeitung.", "https://www.hacoo.app/en-US/pages/shipping-info", "Offizielle Versandseite prüfen"]],
        ctaTitle: "Bereit, die Kategorien zu öffnen?", ctaText: "Wähle einen klaren Produkttyp und prüfe anschließend die Live-Produktseite.", ctaButton: "Alle Produkte ansehen"
      },
      finds: {
        title: "Hacoo-Entdeckungen und externe Produkte | Unabhängiger Guide", description: "Klar gekennzeichnete Hacoo-Suchwege für Schuhe, Kleidung, Taschen, Accessoires, Elektronik und mehr.",
        crumb: "Entdeckungen", eyebrow: "Klar gekennzeichnete Ziele", h1: "Hacoo-Entdeckungen ohne Quellen zu vermischen", lead: "Wechsle von einer breiten Suche zu einem konkreten Produkt oder einer Kategorie. Jedes externe Ziel muss vor dem Kauf geprüft werden.",
        directoryEyebrow: "Alle verfügbaren Wege", directoryTitle: "Eng beginnen, dann vergleichen.", directoryIntro: "Eine eigene Kategorie erleichtert den Vergleich. Wege werden regelmäßig geprüft, einzelne Angebote können sich dennoch ändern.",
        checksEyebrow: "Vor dem Öffnen", checksTitle: "Drei sinnvolle Kontrollen.", checksIntro: "Ein Link beschleunigt die Suche, doch das endgültige Ziel steuert die Transaktion.",
        checks: [["Variante vergleichen", "Prüfe Größe, Farbe, Fotos und Preis des aktuell ausgewählten Artikels."], ["Bedingungen lesen", "Kläre Zahlung, Versand, Rückgabe und zuständigen Support."], ["Nachweise speichern", "Sichere Produktseite, Variante, Betrag, Bestellnummer und Sendungsverfolgung."]]
      },
      categories: {
        title: "Hacoo Produktkategorien 2026 | Schuhe, Kleidung, Taschen", description: "Unabhängiges Hacoo-Kategorieverzeichnis für Schuhe, Kleidung, Taschen, Accessoires, Elektronik und weitere Produkte.",
        crumb: "Kategorien", eyebrow: "Produktsuche nach Kategorie", h1: "Direkt zum gewünschten Produkttyp", lead: "Öffne ein ausgewähltes Produkt oder eine breitere Kategorie. Prüfe Variante, Preis, Lieferung und Rückgabe auf der endgültigen Seite.",
        directoryEyebrow: "Unabhängiges Verzeichnis", directoryTitle: "Alle aktuellen Kategorien ansehen.", directoryIntro: "Kategorien bieten einen klaren Einstieg, ohne externe Ziele als offizielle Hacoo-Seiten darzustellen.",
        checksEyebrow: "Vor dem Fortfahren", checksTitle: "Drei Prüfungen für jedes Produkt.", checksIntro: "Für Bestand und Transaktion ist die Live-Seite maßgeblich.",
        checks: [["Produkt bestätigen", "Kontrolliere Größe, Farbe, Menge, Fotos und aktuellen Preis."], ["Zielseite prüfen", "Lies Zahlungs-, Versand-, Rückgabe- und Supportbedingungen."], ["Details speichern", "Bewahre Auswahl, Betrag, Bestellnummer und Tracking auf."]]
      },
      how: {
        title: "So funktioniert Hacoo 2026 | Bestellablauf erklärt", description: "Quellengeprüfte Erklärung des Hacoo-Bestellablaufs und der Abgrenzung zu externen Produktlinks.",
        crumb: "So funktioniert es", eyebrow: "Geprüfter Ablauf", h1: "So funktioniert eine Hacoo-Bestellung tatsächlich", lead: "Die offizielle Hilfe beschreibt einen einfachen Einkauf in der App. Externe Produktdatenbanken bleiben davon getrennte Ziele.",
        summaryLabel: "Kurzantwort", summary: " Hacoo-App öffnen, anmelden, Produkte auswählen, in den Warenkorb legen, Bestellung prüfen und bezahlen.",
        sections: [["Die vier offiziellen Schritte", `<ol><li>Hacoo-App öffnen.</li><li>Am Konto anmelden.</li><li>Artikel auswählen und in den Warenkorb legen.</li><li>Zur Kasse gehen und bezahlen.</li></ol><p>Diese Reihenfolge stammt aus der offiziellen Hacoo-Hilfe.</p>`], ["Was externe Links bedeuten", `<p>Der Suchbegriff „Hacoo Spreadsheet“ macht eine externe Liste nicht zu offiziellem Hacoo-Bestand. Prüfe Domain, Zahlungsanbieter und geltende Bedingungen.</p><p>Die geprüfte Bestellhilfe beschreibt Hacoo nicht als Einkaufsagenten, der beliebige Taobao- oder Weidian-Links sowie allgemeine Lager-QC-Fotos anbietet.</p>`], ["Vor der Zahlung", `<ul><li>Variante, Größe, Menge und Preis bestätigen.</li><li>Die Lieferangabe des tatsächlichen Anbieters verwenden.</li><li>Rückgaberegeln lesen und Bestellnachweise speichern.</li></ul>`]]
      },
      shipping: {
        title: "Hacoo Versand 2026 | Bearbeitung und Lieferzeiten", description: "Veröffentlichte Hacoo-Bearbeitungs- und Lieferzeiten, regionale Spannen und praktische Kontrollen vor der Zahlung.",
        crumb: "Versandratgeber", eyebrow: "Offizielle Spannen erklärt", h1: "Hacoo-Lieferzeiten sind Schätzungen, keine Garantien", lead: "Hacoo veröffentlicht je nach Ziel unterschiedliche Spannen. Diese Seite fasst die im Juli 2026 geprüften Angaben zusammen.",
        summaryLabel: "Kurzantwort", summary: " Hacoos Versandseite nennt meist 15 bis 28 Tage Empfangszeit und normalerweise 3 bis 5 Werktage Bearbeitung. Termine bleiben Richtwerte.",
        rangesTitle: "Veröffentlichte Lieferzeiten", rangesIntro: "Bei der Prüfung zeigte die offizielle Seite folgende Spannen:", destination: "Ziel", range: "Veröffentlichte Spanne", ukGroup: "Vereinigtes Königreich, Frankreich, Deutschland, Italien", spain: "Spanien", other: "Andere Länder", general: "Allgemeine Angabe", days: "Tage",
        sections: [["Bearbeitung und Transport unterscheiden", `<p>Hacoo beschreibt die Empfangszeit als Bearbeitung plus Versand. Eine schnellste Express-Transportzeit von 5 bis 7 Werktagen ist daher keine allgemeine Gesamtliefergarantie.</p>`], ["Warum es länger dauern kann", `<ul><li>Zielregion und Transportdienst ändern die Spanne.</li><li>Vorbestellte Artikel können getrennt versendet werden.</li><li>Falsche Adressen oder Logistikstörungen können verzögern.</li></ul>`], ["Kontrollen vor der Zahlung", `<ol><li>Land und vollständige Adresse bestätigen.</li><li>Bearbeitungszeit vom Transport trennen.</li><li>Bestellnummer und Tracking speichern.</li><li>Bei Überschreitung der Spanne offiziellen Support nutzen.</li></ol>`]],
        officialButton: "Offizielle Versandseite prüfen"
      },
      size: {
        title: "Hacoo Größenratgeber | Kleidung und Schuhe messen", description: "Unabhängiger messungsbasierter Größenratgeber für Kleidung und Schuhe.",
        crumb: "Größenratgeber", eyebrow: "Zuerst messen", h1: "Größe nach Zahlen wählen, nicht nach dem Etikett", lead: "Gleiche Buchstaben und Schuhgrößen können je nach Anbieter anders ausfallen. Vergleiche die Live-Tabelle mit einem passenden eigenen Artikel.",
        summaryLabel: "Schnelle Methode", summary: " Einen passenden Referenzartikel messen, dieselben Messpunkte vergleichen und die gewünschte Passform berücksichtigen.",
        sections: [["Kleidung: einen passenden Artikel messen", `<p>Wenn die Tabelle Fertigmaße zeigt, lege ein ähnliches Kleidungsstück flach hin. Vergleiche Brustweite, Länge, Schulter, Ärmel, Bund und Innenbein mit derselben Methode.</p>`], ["Schuhe: mit der Fußlänge beginnen", `<p>Beide Füße im Stehen messen und den größeren Wert verwenden. Prüfe, ob Fußlänge, Innenlänge oder Einlegesohle gemeint ist. EU-, UK- und US-Umrechnungen sind nicht universell.</p>`], ["Letzte Kontrolle", `<ul><li>Misst die Tabelle Körper oder Kleidungsstück?</li><li>Sind die Einheiten Zentimeter oder Zoll?</li><li>Ist die gewählte Checkout-Variante identisch?</li><li>Hast du Tabelle und Auswahl gespeichert?</li></ul>`]]
      },
      spreadsheet: {
        title: "Was ist ein Hacoo Spreadsheet? | Erklärung 2026", description: "Erklärung des Begriffs Hacoo Spreadsheet, der Abgrenzung zur offiziellen App und wichtiger Linkprüfungen.",
        crumb: "Hacoo Spreadsheet", eyebrow: "Suchbegriff erklärt", h1: "Was ist ein Hacoo Spreadsheet?", lead: "Meist ist es eine informelle Bezeichnung für organisierte Produktlinks oder Kategorien rund um Hacoo-Suchen, nicht für eine offizielle Bestellmethode.",
        summaryLabel: "Definition", summary: " Ein Hacoo Spreadsheet kann eine Tabelle, ein Verzeichnis, eine Social-Media-Liste oder eine unabhängige Website sein. Das Format macht Produkte nicht offiziell.",
        sections: [["Warum danach gesucht wird", `<p>Eine geordnete Liste verkürzt die Suche, wenn die gewünschte Kategorie schon feststeht. Schuhe, Kleidung, Taschen oder Accessoires lassen sich so mobil leichter öffnen.</p>`], ["Was eine gute Seite zeigen sollte", `<ul><li>Quelle und Ziel jedes Buttons.</li><li>Klare Kategorien und regelmäßig geprüfte Links.</li><li>Nützliche Hinweise zu Größen, Lieferung und Rückgabe.</li><li>Eine sichtbare Unabhängigkeitserklärung.</li></ul>`], ["Fünf Prüfungen", `<ol><li>Domain prüfen.</li><li>Hinweis zur Verbindung mit Hacoo lesen.</li><li>Zahlungsziel identifizieren.</li><li>Produkt und Variante live prüfen.</li><li>Allgemeine Versprechen ohne aktuelle Quelle ablehnen.</li></ol>`]]
      },
      faq: {
        title: "Hacoo FAQ 2026 | Bestellung, Versand, Größen und Links", description: "Unabhängige Antworten zu Hacoo-Bestellung, Lieferzeiten, externen Kategorien und Größen.",
        eyebrow: "Unabhängige Antworten", h1: "Hacoo-Fragen ohne erfundene Versprechen", lead: "Die Antworten trennen offizielle Informationen von externen Produktwegen und verlinken veränderliche Angaben zur aktuellen Quelle.",
        items: [["Ist hacoo.store die offizielle Hacoo-Website?", "Nein. Es ist ein unabhängiger Guide und wird nicht von Hacoo betrieben oder empfohlen."], ["Wie bestelle ich bei Hacoo?", "Laut offizieller Hilfe: App öffnen, anmelden, Artikel auswählen, in den Warenkorb legen und bezahlen."], ["Was ist ein Hacoo Spreadsheet?", "Ein informeller Begriff für Link- oder Kategorielisten. Eine externe Destination wird dadurch nicht offiziell."], ["Verkauft hacoo.store Produkte?", "Nein. Die Website informiert und navigiert unabhängig; die Transaktion findet auf der Zielseite statt."], ["Wie lange dauert Hacoo-Versand?", "Im Juli 2026 nannte die offizielle Seite meist 15 bis 28 Tage sowie 3 bis 5 Werktage Bearbeitung und regionale Spannen."], ["Sind 5 bis 7 Tage garantiert?", "Nein. Das ist eine schnellste Express-Transportangabe, keine universelle Gesamtzeit inklusive Bearbeitung und Bestand."], ["Wie wähle ich eine Größe?", "Vergleiche Live-Maße mit einem passenden eigenen Artikel und vertraue nicht nur Buchstaben oder Umrechnungstabellen."], ["Wer bearbeitet Rückgaben?", "Das Unternehmen, das die Bestellung annimmt, steuert Rückgabe und Support. Lies dessen aktuelle Bedingungen."]],
        ctaTitle: "Noch unsicher, wo du beginnen sollst?", ctaText: "Lies zuerst den offiziellen Ablauf und wähle dann eine klar gekennzeichnete Kategorie.", ctaButton: "Ablauf verstehen"
      },
      about: {
        title: "Über den Hacoo Store Guide | Redaktionelle Methode", description: "Wie der unabhängige Guide offizielle Hacoo-Informationen von externen Produktwegen trennt.",
        crumb: "Über uns", eyebrow: "Redaktionelle Methode", h1: "Bewusst unabhängig", lead: "Der Guide macht Hacoo-Suchen verständlicher, ohne Produkte zu verkaufen, Zahlungen anzunehmen oder Hacoo zu vertreten.",
        summaryLabel: "Unser Grundsatz", summary: " Hacoo-Fakten werden auf offiziellen Seiten geprüft; externe Wege werden separat kontrolliert und gekennzeichnet.",
        sections: [["So prüfen wir Informationen", `<p>Vor konkreten Abläufen oder Zeitangaben öffnen wir offizielle Quellen, nennen das Prüfdatum und verwandeln veröffentlichte Spannen nicht in Garantien.</p>`], ["Was wir nicht versprechen", `<p>Keine erfundenen allgemeinen QC-Fotos, kostenlosen Lieferungen, garantierten Zeiten, Coupons, Verkäuferbewertungen oder offiziellen Partnerschaften.</p>`], ["Korrekturen", `<p>Seiten können sich nach einer Prüfung ändern. Für eine konkrete Bestellung ist die offizielle oder endgültige Zielseite maßgeblich.</p>`]]
      },
      privacy: {
        title: "Datenschutzerklärung | Hacoo Store Guide", description: "Datenschutzinformationen für den unabhängigen Hacoo Store Guide.",
        crumb: "Datenschutz", eyebrow: "Aktualisiert am 13. Juli 2026", h1: "Datenschutzerklärung", lead: "Der Guide bietet keine Konten, Kasse, Kommentare oder Bestellformulare.",
        summaryLabel: "Personenbezogene Daten", summary: " Diese Version fragt nicht absichtlich nach Namen, Postadresse, Zahlungs- oder Bestelldaten.",
        sections: [["Technische Daten", `<p>Der Hosting-Anbieter kann IP-Adresse, Browser, angeforderte Seite, Zeitstempel und Sicherheitssignale verarbeiten, um die Website bereitzustellen und zu schützen.</p>`], ["Externe Links und Cookies", `<p>Externe Ziele haben eigene Richtlinien. Diese Version setzt keine Werbe-Cookies; die Sprachwahl kann lokal im Browser gespeichert werden.</p>`], ["Änderungen", `<p>Das Aktualisierungsdatum ändert sich bei wesentlichen Anpassungen. Vor dem öffentlichen Start ist ein funktionierender Kontaktweg nötig.</p>`]]
      },
      terms: {
        title: "Bedingungen und Hinweis | Hacoo Store Guide", description: "Nutzungsbedingungen und Unabhängigkeitshinweis für den Hacoo Store Guide.",
        crumb: "Bedingungen", eyebrow: "Aktualisiert am 13. Juli 2026", h1: "Bedingungen und Hinweis", lead: "hacoo.store ist eine unabhängige Informations- und Navigationswebsite und nicht mit Hacoo verbunden, gesponsert oder von Hacoo betrieben.",
        summaryLabel: "Unabhängiger Status", summary: " Hinweise auf Hacoo benennen das redaktionelle Thema und beanspruchen keine Kontrolle über Marke, App oder Dienste.",
        sections: [["Kein Verkauf und keine Abwicklung", `<p>Der Guide verkauft nicht, nimmt keine Zahlungen an und bearbeitet keine Bestellungen, Lieferungen oder Rückgaben. Jede Transaktion folgt den Bedingungen der endgültigen Zielseite.</p>`], ["Grenzen der Informationen", `<p>Preise, Bestand, Richtlinien, Lieferzeiten und Seiten können sich ohne Ankündigung ändern. Prüfe wichtige Angaben live, bevor du handelst.</p>`], ["Externe Seiten und Produkte", `<p>Ein Link bestätigt weder Echtheit, Qualität, Sicherheit noch Verkäuferleistung. Externe Ziele werden in eigener Verantwortung genutzt.</p>`]]
      }
    }
  },
  it: {
    code: "it",
    common: {
      skip: "Vai al contenuto", home: "Home", homeLabel: "Home di Hacoo Store Guide", openNav: "Apri navigazione", primaryNav: "Navigazione principale",
      finds: "Scoperte", categories: "Categorie", how: "Come funziona", shipping: "Spedizione", faq: "FAQ", independent: "Guida indipendente", notAffiliated: "Non affiliata a Hacoo",
      guides: "Guide", site: "Sito", spreadsheet: "Hacoo spreadsheet", sizeGuide: "Guida alle taglie", about: "Informazioni", privacy: "Privacy", terms: "Termini",
      reviewed: "Revisione editoriale: 13 luglio 2026", footerCopy: "Informazioni e navigazione indipendenti. Non affiliata a Hacoo. Verifica i dettagli aggiornati sulla destinazione finale prima dell’acquisto.",
      guideNav: "Navigazione della guida", browseCategories: "Vedi le categorie"
    },
    catalog: {
      labels: { shoes: "Scarpe", clothing: "Abbigliamento", bags: "Borse", accessories: "Accessori" },
      alt: { shoes: "Sneaker basse avorio senza marchio", clothing: "Maglieria piegata in colori neutri", bags: "Borsa marrone strutturata senza marchio", accessories: "Cappellino, occhiali e bracciale senza marchio" },
      openFeatured: "Apri il prodotto selezionato:", openRoute: "Apri la categoria esterna",
      routes: { shoes: "Scarpe", hoodies: "Felpe e maglioni", tshirts: "T-shirt", jackets: "Giacche", bottoms: "Pantaloni e shorts", headwear: "Cappelli", accessories: "Accessori", electronics: "Elettronica", sets: "Completi corti", jerseys: "Maglie sportive", other: "Altre scoperte", allProducts: "Tutti i prodotti" }
    },
    home: { finder: { searchLabel: "Cerca prodotti", placeholder: "Cerca prodotti, marchi, stili…", searchButton: "Avvia ricerca", choose: "Scegli una categoria", filters: "Filtri categoria", all: "Tutto" } },
    pages: {
      home: {
        title: "Hacoo Store Guide 2026 | Categorie, acquisti e spedizione", description: "Guida indipendente in italiano a Hacoo: categorie, ordini nell’app, taglie e tempi di consegna pubblicati.",
        eyebrow: "Guida di ricerca indipendente 2026", h1: "Trova prodotti Hacoo senza scorrere all’infinito", lead: "Una guida verificata a categorie popolari, taglie, consegna e ricerca prodotti, con una distinzione chiara tra l’app ufficiale Hacoo e i database esterni indipendenti.",
        primary: "Sfoglia le scoperte", secondary: "Leggi la guida acquisti", updated: "Aggiornato luglio 2026", categoryLed: "Navigazione per categoria", cited: "Fonti ufficiali citate",
        stepsEyebrow: "Un percorso più chiaro", stepsTitle: "Usa questa guida in tre passaggi.", stepsIntro: "Il sito separa le informazioni ufficiali Hacoo dalle destinazioni esterne prima di indirizzarti alla pagina successiva.",
        steps: [["Scegli la fonte giusta", "Usa l’app ufficiale per ordini e assistenza Hacoo. Usa le categorie indipendenti per scoprire altri prodotti."], ["Controlla i dettagli decisivi", "Verifica misure, varianti, prezzo, consegna, resi e chi riceve il pagamento."], ["Continua sulla destinazione", "Disponibilità, pagamento, spedizione e assistenza dipendono dalla destinazione scelta."]],
        factsEyebrow: "Verificato con Hacoo", factsTitle: "Cosa dicono le pagine ufficiali.", factsIntro: "Queste informazioni provengono dalle pagine ufficiali di aiuto e spedizione Hacoo. Controlla sempre la fonte aggiornata.",
        facts: [["Ordine ufficiale", "Hacoo descrive un normale checkout nell’app.", "Apri l’app, accedi, aggiungi gli articoli al carrello, controlla e paga.", "https://act.hacoo.app/act/sara/helpcenter/order1", "Leggi l’aiuto ufficiale"], ["Tempi ufficiali", "La consegna è una stima, non una garanzia.", "La pagina indica in genere 15–28 giorni, fasce regionali e 3–5 giorni lavorativi di elaborazione.", "https://www.hacoo.app/en-US/pages/shipping-info", "Controlla la pagina spedizione"]],
        ctaTitle: "Pronto a sfogliare le categorie?", ctaText: "Scegli un tipo di prodotto chiaro e verifica la scheda aggiornata prima di continuare.", ctaButton: "Vedi tutti i prodotti"
      },
      finds: {
        title: "Scoperte Hacoo e prodotti esterni | Guida indipendente", description: "Percorsi Hacoo chiaramente indicati per scarpe, abbigliamento, borse, accessori, elettronica e altro.",
        crumb: "Scoperte", eyebrow: "Destinazioni chiaramente indicate", h1: "Scoperte Hacoo senza confondere le fonti", lead: "Passa da una ricerca generica a un prodotto o una categoria precisa. Ogni destinazione esterna va verificata prima dell’acquisto.",
        directoryEyebrow: "Tutti i percorsi disponibili", directoryTitle: "Parti da una categoria precisa.", directoryIntro: "Una pagina dedicata facilita il confronto. I percorsi vengono controllati periodicamente, ma le singole inserzioni possono cambiare.",
        checksEyebrow: "Prima di aprire un prodotto", checksTitle: "Tre controlli utili.", checksIntro: "Un link accelera la scoperta, ma la destinazione finale controlla la transazione.",
        checks: [["Confronta la variante", "Controlla taglia, colore, foto e prezzo del prodotto selezionato."], ["Leggi le condizioni", "Identifica chi gestisce pagamento, spedizione, reso e assistenza."], ["Salva le prove", "Conserva scheda, variante, importo, numero d’ordine e tracciamento."]]
      },
      categories: {
        title: "Categorie prodotti Hacoo 2026 | Scarpe, abbigliamento e borse", description: "Directory indipendente di categorie Hacoo per scarpe, abbigliamento, borse, accessori, elettronica e altro.",
        crumb: "Categorie", eyebrow: "Scoperta per categoria", h1: "Vai direttamente al tipo di prodotto che cerchi", lead: "Apri un prodotto selezionato o una categoria più ampia. Controlla variante, prezzo, consegna e resi sulla pagina finale.",
        directoryEyebrow: "Directory indipendente", directoryTitle: "Sfoglia tutte le categorie attuali.", directoryIntro: "Le categorie offrono un punto di partenza chiaro senza presentare le destinazioni esterne come pagine ufficiali Hacoo.",
        checksEyebrow: "Prima di continuare", checksTitle: "Tre controlli per ogni prodotto.", checksIntro: "La pagina aggiornata fa fede per disponibilità e transazione.",
        checks: [["Conferma il prodotto", "Controlla taglia, colore, quantità, foto e prezzo attuale."], ["Verifica la destinazione", "Leggi condizioni di pagamento, spedizione, reso e assistenza."], ["Salva i dettagli", "Conserva selezione, importo, ordine e tracciamento."]]
      },
      how: {
        title: "Come funziona Hacoo nel 2026 | Ordine spiegato", description: "Spiegazione verificata del flusso d’ordine Hacoo e della differenza rispetto ai link prodotto esterni.",
        crumb: "Come funziona", eyebrow: "Procedura verificata", h1: "Come funziona davvero un ordine Hacoo", lead: "La pagina di assistenza ufficiale descrive un acquisto semplice nell’app. I database esterni restano destinazioni separate.",
        summaryLabel: "Risposta breve", summary: " Apri l’app Hacoo, accedi, seleziona i prodotti, aggiungili al carrello, controlla e paga.",
        sections: [["I quattro passaggi ufficiali", `<ol><li>Apri l’app Hacoo.</li><li>Accedi all’account.</li><li>Seleziona gli articoli e aggiungili al carrello.</li><li>Procedi al checkout e paga.</li></ol><p>Questa sequenza viene dalla pagina di assistenza ufficiale.</p>`], ["Cosa significano i link esterni", `<p>Il termine “Hacoo spreadsheet” non trasforma una lista esterna in inventario ufficiale. Controlla dominio, società che incassa e condizioni applicabili.</p><p>L’aiuto consultato non presenta Hacoo come un agente che accetta qualsiasi URL Taobao o Weidian con ricezione in magazzino e foto QC universali.</p>`], ["Prima del pagamento", `<ul><li>Conferma variante, taglia, quantità e prezzo.</li><li>Usa la stima di consegna del fornitore effettivo.</li><li>Leggi i resi e conserva le prove dell’ordine.</li></ul>`]]
      },
      shipping: {
        title: "Spedizione Hacoo 2026 | Elaborazione e tempi di consegna", description: "Tempi di elaborazione e consegna pubblicati da Hacoo, fasce regionali e controlli prima del pagamento.",
        crumb: "Guida spedizione", eyebrow: "Fasce ufficiali spiegate", h1: "I tempi Hacoo sono stime, non garanzie", lead: "Hacoo pubblica tempi diversi in base alla destinazione. Questa pagina riassume le informazioni verificate nel luglio 2026.",
        summaryLabel: "Risposta breve", summary: " La pagina Hacoo indica in genere 15–28 giorni di ricezione e normalmente 3–5 giorni lavorativi di elaborazione. Le date sono indicative.",
        rangesTitle: "Tempi di consegna pubblicati", rangesIntro: "Al momento della verifica, la pagina ufficiale mostrava queste fasce:", destination: "Destinazione", range: "Fascia pubblicata", ukGroup: "Regno Unito, Francia, Germania, Italia", spain: "Spagna", other: "Altri paesi", general: "Indicazione generale", days: "giorni",
        sections: [["Elaborazione e trasporto sono diversi", `<p>Hacoo definisce il tempo di ricezione come elaborazione più spedizione. Il trasporto espresso più rapido di 5–7 giorni lavorativi non equivale quindi a una consegna totale universale.</p>`], ["Perché può servire più tempo", `<ul><li>Destinazione e vettore cambiano la fascia.</li><li>Gli articoli in preordine possono partire separatamente.</li><li>Indirizzi errati o ritardi logistici possono bloccare il pacco.</li></ul>`], ["Controlli prima del pagamento", `<ol><li>Conferma paese e indirizzo completo.</li><li>Separa elaborazione e transito.</li><li>Salva numero d’ordine e tracking.</li><li>Contatta l’assistenza ufficiale se il tracking supera la fascia dichiarata.</li></ol>`]],
        officialButton: "Controlla la spedizione ufficiale"
      },
      size: {
        title: "Guida taglie Hacoo | Misure per abbigliamento e scarpe", description: "Guida indipendente basata sulle misure per confrontare taglie di abbigliamento e scarpe.",
        crumb: "Guida taglie", eyebrow: "Prima le misure", h1: "Scegli la taglia dai numeri, non dall’etichetta", lead: "Le stesse lettere e taglie di scarpe possono cambiare tra venditori. Confronta sempre la tabella aggiornata con un articolo che ti sta bene.",
        summaryLabel: "Metodo rapido", summary: " Misura un articolo di riferimento, confronta gli stessi punti e considera la vestibilità desiderata.",
        sections: [["Abbigliamento: misura un capo adatto", `<p>Se la tabella mostra le misure del capo finito, stendi un articolo simile. Confronta torace, lunghezza, spalle, maniche, vita e interno gamba con lo stesso metodo.</p>`], ["Scarpe: inizia dalla lunghezza del piede", `<p>Misura entrambi i piedi in piedi e usa il risultato maggiore. Controlla se la tabella indica piede, spazio interno o soletta. Le conversioni EU, UK e US non sono universali.</p>`], ["Controllo finale", `<ul><li>La tabella misura il corpo o il capo?</li><li>Le unità sono centimetri o pollici?</li><li>La variante scelta è la stessa valutata?</li><li>Hai salvato tabella e selezione?</li></ul>`]]
      },
      spreadsheet: {
        title: "Cos’è un Hacoo spreadsheet? | Spiegazione 2026", description: "Spiegazione del termine Hacoo spreadsheet, della differenza con l’app ufficiale e dei controlli sui link.",
        crumb: "Hacoo spreadsheet", eyebrow: "Termine di ricerca spiegato", h1: "Cos’è un Hacoo spreadsheet?", lead: "Di solito è un nome informale per una raccolta di link o categorie associata alle ricerche Hacoo, non un metodo d’ordine ufficiale.",
        summaryLabel: "Definizione", summary: " Può essere un foglio, una directory, una lista social o un sito indipendente. Il formato non rende ufficiali i prodotti contenuti.",
        sections: [["Perché viene cercato", `<p>Una lista ordinata evita di scorrere un feed lungo quando la categoria è già nota. Scarpe, vestiti, borse e accessori diventano più facili da aprire da mobile.</p>`], ["Cosa dovrebbe mostrare una buona pagina", `<ul><li>Fonte e destinazione di ogni pulsante.</li><li>Categorie chiare e link controllati periodicamente.</li><li>Contesto su taglie, consegna e resi.</li><li>Una dichiarazione visibile di indipendenza.</li></ul>`], ["Cinque controlli", `<ol><li>Controlla il dominio.</li><li>Leggi la dichiarazione di affiliazione.</li><li>Identifica chi riceve il pagamento.</li><li>Verifica prodotto e variante dal vivo.</li><li>Rifiuta promesse universali senza una fonte attuale.</li></ol>`]]
      },
      faq: {
        title: "FAQ Hacoo 2026 | Ordini, spedizione, taglie e link", description: "Risposte indipendenti su ordini Hacoo, consegna, categorie esterne e taglie.",
        eyebrow: "Risposte indipendenti", h1: "Domande Hacoo senza promesse inventate", lead: "Le risposte distinguono le informazioni ufficiali dai percorsi esterni e rimandano alla fonte per le politiche che possono cambiare.",
        items: [["hacoo.store è il sito ufficiale Hacoo?", "No. È una guida indipendente, non gestita né approvata da Hacoo."], ["Come si ordina su Hacoo?", "La guida ufficiale indica di aprire l’app, accedere, scegliere gli articoli, aggiungerli al carrello e pagare."], ["Cos’è un Hacoo spreadsheet?", "È un termine informale per liste di link o categorie. Non rende ufficiale una destinazione esterna."], ["hacoo.store vende prodotti?", "No. Fornisce informazioni e navigazione; la transazione avviene sulla destinazione finale."], ["Quanto dura la spedizione Hacoo?", "Nel luglio 2026 la pagina ufficiale indicava in genere 15–28 giorni, più 3–5 giorni lavorativi di elaborazione e fasce regionali."], ["La consegna in 5–7 giorni è garantita?", "No. È il trasporto espresso più rapido, non un tempo totale universale con elaborazione e disponibilità."], ["Come scelgo la taglia?", "Confronta le misure aggiornate con un articolo adatto e non affidarti solo a lettere o conversioni."], ["Chi gestisce i resi?", "La società che accetta l’ordine controlla resi e assistenza. Leggi i suoi termini aggiornati."]],
        ctaTitle: "Non sai da dove iniziare?", ctaText: "Leggi prima il flusso ufficiale, poi scegli una categoria chiaramente indicata.", ctaButton: "Capire come funziona"
      },
      about: {
        title: "Informazioni su Hacoo Store Guide | Metodo editoriale", description: "Come la guida indipendente separa le informazioni ufficiali Hacoo dai percorsi prodotto esterni.",
        crumb: "Informazioni", eyebrow: "Metodo editoriale", h1: "Indipendente per scelta", lead: "La guida chiarisce le ricerche Hacoo senza vendere, incassare o affermare di rappresentare Hacoo.",
        summaryLabel: "Il nostro principio", summary: " I fatti Hacoo vengono verificati sulle pagine ufficiali; i percorsi esterni sono controllati e indicati separatamente.",
        sections: [["Come verifichiamo", `<p>Apriamo le fonti ufficiali prima di pubblicare flussi o tempi, registriamo la data di revisione e non trasformiamo una fascia in garanzia.</p>`], ["Cosa non promettiamo", `<p>Nessuna foto QC universale inventata, spedizione gratuita, tempo garantito, coupon, affidabilità venditore o partnership ufficiale.</p>`], ["Correzioni", `<p>Le pagine possono cambiare dopo la revisione. La destinazione ufficiale o finale resta autorevole per un ordine specifico.</p>`]]
      },
      privacy: {
        title: "Informativa privacy | Hacoo Store Guide", description: "Informazioni sulla privacy per la guida indipendente Hacoo Store.",
        crumb: "Privacy", eyebrow: "Aggiornato il 13 luglio 2026", h1: "Informativa sulla privacy", lead: "La guida non offre account, checkout, commenti o moduli d’ordine.",
        summaryLabel: "Dati personali", summary: " Questa versione non richiede intenzionalmente nomi, indirizzi postali, pagamenti o dati d’ordine.",
        sections: [["Dati tecnici", `<p>Il provider può elaborare IP, browser, pagina richiesta, orari e segnali di sicurezza per fornire e proteggere il sito.</p>`], ["Link esterni e cookie", `<p>Le destinazioni esterne seguono le proprie politiche. Questa versione non usa cookie pubblicitari; la lingua può essere memorizzata localmente nel browser.</p>`], ["Modifiche", `<p>La data cambierà dopo una revisione importante. Prima del lancio pubblico servirà un contatto operativo.</p>`]]
      },
      terms: {
        title: "Termini e avvertenza | Hacoo Store Guide", description: "Termini d’uso e dichiarazione di indipendenza per Hacoo Store Guide.",
        crumb: "Termini", eyebrow: "Aggiornato il 13 luglio 2026", h1: "Termini e avvertenza", lead: "hacoo.store è un sito indipendente di informazione e navigazione, non affiliato, sponsorizzato o gestito da Hacoo.",
        summaryLabel: "Stato indipendente", summary: " I riferimenti a Hacoo identificano l’argomento editoriale e non rivendicano controllo su marchio, app o servizi.",
        sections: [["Nessuna vendita o transazione", `<p>La guida non vende, non accetta pagamenti e non gestisce ordini, spedizioni o resi. Ogni transazione segue i termini della destinazione finale.</p>`], ["Limiti delle informazioni", `<p>Prezzi, disponibilità, politiche, tempi e pagine possono cambiare senza preavviso. Verifica i dati importanti dal vivo.</p>`], ["Siti e prodotti esterni", `<p>Un link non certifica autenticità, qualità, sicurezza o prestazioni del venditore. Usa le destinazioni esterne a tua discrezione.</p>`]]
      }
    }
  },
  es: {
    code: "es",
    common: {
      skip: "Ir al contenido", home: "Inicio", homeLabel: "Inicio de Hacoo Store Guide", openNav: "Abrir navegación", primaryNav: "Navegación principal",
      finds: "Hallazgos", categories: "Categorías", how: "Cómo funciona", shipping: "Envío", faq: "FAQ", independent: "Guía independiente", notAffiliated: "No afiliada a Hacoo",
      guides: "Guías", site: "Sitio", spreadsheet: "Hacoo spreadsheet", sizeGuide: "Guía de tallas", about: "Acerca de", privacy: "Privacidad", terms: "Términos",
      reviewed: "Revisión editorial: 13 de julio de 2026", footerCopy: "Información y navegación independientes. No afiliada a Hacoo. Comprueba los datos actuales en el destino final antes de comprar.",
      guideNav: "Navegación de la guía", browseCategories: "Ver categorías"
    },
    catalog: {
      labels: { shoes: "Calzado", clothing: "Ropa", bags: "Bolsos", accessories: "Accesorios" },
      alt: { shoes: "Zapatillas bajas color marfil sin marca", clothing: "Prendas de punto dobladas en tonos neutros", bags: "Bolso marrón estructurado sin marca", accessories: "Gorra, gafas y pulsera sin marca" },
      openFeatured: "Abrir producto seleccionado:", openRoute: "Abrir categoría externa",
      routes: { shoes: "Calzado", hoodies: "Sudaderas y jerséis", tshirts: "Camisetas", jackets: "Chaquetas", bottoms: "Pantalones y shorts", headwear: "Gorras y sombreros", accessories: "Accesorios", electronics: "Electrónica", sets: "Conjuntos cortos", jerseys: "Camisetas deportivas", other: "Otros hallazgos", allProducts: "Todos los productos" }
    },
    home: { finder: { searchLabel: "Buscar productos", placeholder: "Buscar productos, marcas, estilos…", searchButton: "Iniciar búsqueda", choose: "Elige una categoría", filters: "Filtros de categoría", all: "Todo" } },
    pages: {
      home: {
        title: "Hacoo Store Guide 2026 | Categorías, compras y envío", description: "Guía independiente de Hacoo en español sobre categorías, pedidos en la app, tallas y plazos de entrega publicados.",
        eyebrow: "Guía de investigación independiente 2026", h1: "Encuentra productos Hacoo sin desplazarte sin fin", lead: "Una guía contrastada sobre categorías populares, tallas, entrega y búsqueda de productos, con una separación clara entre la app oficial de Hacoo y las bases externas independientes.",
        primary: "Ver hallazgos", secondary: "Leer la guía de compra", updated: "Actualizado en julio de 2026", categoryLed: "Navegación por categoría", cited: "Fuentes oficiales citadas",
        stepsEyebrow: "Una ruta más clara", stepsTitle: "Usa esta guía en tres pasos.", stepsIntro: "El sitio separa la información oficial de Hacoo de los destinos externos antes de llevarte a la página siguiente.",
        steps: [["Elige la fuente correcta", "Usa la app oficial para pedidos y soporte de Hacoo. Usa las categorías independientes para descubrir otros productos."], ["Comprueba los detalles clave", "Revisa medidas, variantes, precio, entrega, devoluciones y quién recibe el pago."], ["Continúa en el destino", "La disponibilidad, el pago, el envío y la posventa dependen del destino elegido."]],
        factsEyebrow: "Verificado con Hacoo", factsTitle: "Lo que dicen las páginas oficiales.", factsIntro: "Estos datos proceden de las páginas de ayuda y envío de Hacoo. Consulta siempre la fuente actual antes de pedir.",
        facts: [["Pedido oficial", "Hacoo describe un checkout normal dentro de la app.", "Abre la app, inicia sesión, añade productos al carrito, revisa y paga.", "https://act.hacoo.app/act/sara/helpcenter/order1", "Leer la ayuda oficial"], ["Plazos oficiales", "La entrega es una estimación, no una garantía.", "La página indica normalmente 15–28 días, rangos regionales y 3–5 días laborables de preparación.", "https://www.hacoo.app/en-US/pages/shipping-info", "Consultar la página de envío"]],
        ctaTitle: "¿Listo para explorar las categorías?", ctaText: "Elige un tipo de producto claro y comprueba la ficha en directo antes de continuar.", ctaButton: "Ver todos los productos"
      },
      finds: {
        title: "Hallazgos Hacoo y productos externos | Guía independiente", description: "Rutas Hacoo claramente identificadas para calzado, ropa, bolsos, accesorios, electrónica y más.",
        crumb: "Hallazgos", eyebrow: "Destinos claramente identificados", h1: "Hallazgos Hacoo sin mezclar las fuentes", lead: "Pasa de una búsqueda general a un producto o categoría concretos. Comprueba cada destino externo antes de comprar.",
        directoryEyebrow: "Todas las rutas disponibles", directoryTitle: "Empieza por una categoría concreta.", directoryIntro: "Una página dedicada facilita la comparación. Las rutas se revisan periódicamente, pero las fichas pueden cambiar.",
        checksEyebrow: "Antes de abrir un producto", checksTitle: "Tres comprobaciones útiles.", checksIntro: "Un enlace acelera el descubrimiento, pero el destino final controla la transacción.",
        checks: [["Compara la variante", "Revisa talla, color, fotos y precio del artículo seleccionado."], ["Lee las condiciones", "Identifica quién gestiona pago, envío, devolución y soporte."], ["Guarda pruebas", "Conserva la ficha, la variante, el importe, el pedido y el seguimiento."]]
      },
      categories: {
        title: "Categorías de productos Hacoo 2026 | Calzado, ropa y bolsos", description: "Directorio independiente de categorías Hacoo para calzado, ropa, bolsos, accesorios, electrónica y más.",
        crumb: "Categorías", eyebrow: "Descubrimiento por categoría", h1: "Ve directamente al tipo de producto que buscas", lead: "Abre un producto seleccionado o una categoría más amplia. Comprueba variante, precio, entrega y devoluciones en la página final.",
        directoryEyebrow: "Directorio independiente", directoryTitle: "Explora todas las categorías actuales.", directoryIntro: "Las categorías ofrecen un punto de partida claro sin presentar los destinos externos como páginas oficiales de Hacoo.",
        checksEyebrow: "Antes de continuar", checksTitle: "Tres controles para cada producto.", checksIntro: "La página en directo manda sobre disponibilidad y transacción.",
        checks: [["Confirma el producto", "Comprueba talla, color, cantidad, fotos y precio actual."], ["Verifica el destino", "Lee las condiciones de pago, envío, devolución y soporte."], ["Guarda los detalles", "Conserva selección, importe, pedido y seguimiento."]]
      },
      how: {
        title: "Cómo funciona Hacoo en 2026 | Pedido explicado", description: "Explicación contrastada del proceso de pedido Hacoo y su diferencia respecto a enlaces externos.",
        crumb: "Cómo funciona", eyebrow: "Proceso verificado", h1: "Cómo funciona realmente un pedido Hacoo", lead: "La ayuda oficial describe una compra sencilla dentro de la app. Las bases de productos externas son destinos separados.",
        summaryLabel: "Respuesta breve", summary: " Abre la app de Hacoo, inicia sesión, elige productos, añádelos al carrito, revisa y paga.",
        sections: [["Los cuatro pasos oficiales", `<ol><li>Abre la app de Hacoo.</li><li>Inicia sesión en la cuenta.</li><li>Selecciona artículos y añádelos al carrito.</li><li>Finaliza la compra y paga.</li></ol><p>Esta secuencia procede de la página de ayuda oficial.</p>`], ["Qué significan los enlaces externos", `<p>El término “Hacoo spreadsheet” no convierte una lista externa en inventario oficial. Revisa el dominio, la empresa que cobra y las condiciones aplicables.</p><p>La ayuda consultada no presenta Hacoo como un agente que acepte cualquier URL de Taobao o Weidian con almacén y fotos QC universales.</p>`], ["Antes de pagar", `<ul><li>Confirma variante, talla, cantidad y precio.</li><li>Usa la estimación del proveedor real.</li><li>Lee las devoluciones y guarda pruebas del pedido.</li></ul>`]]
      },
      shipping: {
        title: "Envío Hacoo 2026 | Preparación y plazos de entrega", description: "Plazos de preparación y entrega publicados por Hacoo, rangos regionales y controles antes del pago.",
        crumb: "Guía de envío", eyebrow: "Rangos oficiales explicados", h1: "Los plazos Hacoo son estimaciones, no garantías", lead: "Hacoo publica plazos que varían según el destino. Esta página resume la información revisada en julio de 2026.",
        summaryLabel: "Respuesta breve", summary: " La página de Hacoo indica normalmente 15–28 días de recepción y 3–5 días laborables de preparación. Las fechas son orientativas.",
        rangesTitle: "Plazos de entrega publicados", rangesIntro: "En el momento de la revisión, la página oficial mostraba estos rangos:", destination: "Destino", range: "Rango publicado", ukGroup: "Reino Unido, Francia, Alemania, Italia", spain: "España", other: "Otros países", general: "Indicación general", days: "días",
        sections: [["Preparación y transporte son distintos", `<p>Hacoo define el tiempo de recepción como preparación más envío. Un transporte exprés más rápido de 5–7 días laborables no equivale a una entrega total universal.</p>`], ["Por qué puede tardar más", `<ul><li>El destino y el transportista cambian el rango.</li><li>Los artículos en preventa pueden enviarse por separado.</li><li>Una dirección incorrecta o retrasos logísticos pueden bloquear el paquete.</li></ul>`], ["Controles antes de pagar", `<ol><li>Confirma país y dirección completa.</li><li>Separa preparación y tránsito.</li><li>Guarda número de pedido y seguimiento.</li><li>Usa soporte oficial si el seguimiento supera el rango indicado.</li></ol>`]],
        officialButton: "Consultar el envío oficial"
      },
      size: {
        title: "Guía de tallas Hacoo | Medidas de ropa y calzado", description: "Guía independiente basada en medidas para comparar tallas de ropa y calzado.",
        crumb: "Guía de tallas", eyebrow: "Primero las medidas", h1: "Elige la talla por los números, no por la etiqueta", lead: "Las mismas letras y tallas de calzado pueden variar entre vendedores. Compara la tabla en directo con una prenda o zapato que ya te quede bien.",
        summaryLabel: "Método rápido", summary: " Mide una referencia que tengas, compara los mismos puntos y deja el margen necesario para el ajuste que deseas.",
        sections: [["Ropa: mide una prenda que te quede bien", `<p>Si la tabla muestra medidas de la prenda terminada, coloca una similar en plano. Compara pecho, largo, hombros, mangas, cintura y entrepierna con el mismo método.</p>`], ["Calzado: empieza por la longitud del pie", `<p>Mide ambos pies de pie y usa el resultado mayor. Comprueba si la tabla indica pie, longitud interior o plantilla. Las conversiones EU, UK y US no son universales.</p>`], ["Control final", `<ul><li>¿La tabla mide el cuerpo o la prenda?</li><li>¿Las unidades son centímetros o pulgadas?</li><li>¿La variante elegida es la evaluada?</li><li>¿Has guardado la tabla y la selección?</li></ul>`]]
      },
      spreadsheet: {
        title: "¿Qué es un Hacoo spreadsheet? | Explicación 2026", description: "Explicación del término Hacoo spreadsheet, su diferencia con la app oficial y los controles antes de abrir enlaces.",
        crumb: "Hacoo spreadsheet", eyebrow: "Término de búsqueda explicado", h1: "¿Qué es un Hacoo spreadsheet?", lead: "Suele ser un nombre informal para una colección de enlaces o categorías relacionada con búsquedas Hacoo, no un método oficial de pedido.",
        summaryLabel: "Definición", summary: " Puede ser una hoja, directorio, lista social o web independiente. El formato no hace oficiales los productos incluidos.",
        sections: [["Por qué se busca", `<p>Una lista organizada evita recorrer un feed largo cuando ya se conoce la categoría. Calzado, ropa, bolsos y accesorios se abren con más facilidad desde el móvil.</p>`], ["Qué debería mostrar una buena página", `<ul><li>Fuente y destino de cada botón.</li><li>Categorías claras y enlaces revisados.</li><li>Contexto sobre tallas, entrega y devoluciones.</li><li>Una declaración visible de independencia.</li></ul>`], ["Cinco comprobaciones", `<ol><li>Revisa el dominio.</li><li>Lee la declaración de afiliación.</li><li>Identifica quién recibe el pago.</li><li>Comprueba producto y variante en directo.</li><li>Rechaza promesas universales sin fuente actual.</li></ol>`]]
      },
      faq: {
        title: "FAQ Hacoo 2026 | Pedidos, envío, tallas y enlaces", description: "Respuestas independientes sobre pedidos Hacoo, entrega, categorías externas y tallas.",
        eyebrow: "Respuestas independientes", h1: "Preguntas sobre Hacoo sin promesas inventadas", lead: "Las respuestas separan la información oficial de las rutas externas y enlazan la fuente cuando una política puede cambiar.",
        items: [["¿hacoo.store es la web oficial de Hacoo?", "No. Es una guía independiente, no operada ni respaldada por Hacoo."], ["¿Cómo hago un pedido en Hacoo?", "La ayuda oficial indica abrir la app, iniciar sesión, elegir artículos, añadirlos al carrito y pagar."], ["¿Qué es un Hacoo spreadsheet?", "Es un término informal para listas de enlaces o categorías. No hace oficial un destino externo."], ["¿hacoo.store vende productos?", "No. Ofrece información y navegación; la transacción ocurre en el destino final."], ["¿Cuánto tarda el envío Hacoo?", "En julio de 2026 la página oficial indicaba normalmente 15–28 días, 3–5 días laborables de preparación y rangos regionales."], ["¿Está garantizada la entrega en 5–7 días?", "No. Se refiere al transporte exprés más rápido, no al tiempo total universal con preparación y stock."], ["¿Cómo elijo una talla?", "Compara las medidas en directo con algo que ya te quede bien y no uses solo letras o conversiones."], ["¿Quién gestiona las devoluciones?", "La empresa que acepta el pedido controla devoluciones y soporte. Lee sus condiciones actuales."]],
        ctaTitle: "¿No sabes por dónde empezar?", ctaText: "Lee primero el flujo oficial y después elige una categoría claramente identificada.", ctaButton: "Entender cómo funciona"
      },
      about: {
        title: "Acerca de Hacoo Store Guide | Método editorial", description: "Cómo la guía independiente separa la información oficial Hacoo de las rutas externas.",
        crumb: "Acerca de", eyebrow: "Método editorial", h1: "Independiente por diseño", lead: "La guía aclara búsquedas Hacoo sin vender, cobrar ni afirmar que representa a Hacoo.",
        summaryLabel: "Nuestro principio", summary: " Los hechos sobre Hacoo se verifican en páginas oficiales; las rutas externas se revisan y etiquetan por separado.",
        sections: [["Cómo verificamos", `<p>Abrimos fuentes oficiales antes de publicar procesos o plazos, registramos la fecha de revisión y no convertimos un rango en garantía.</p>`], ["Lo que no prometemos", `<p>No inventamos fotos QC universales, envío gratis, tiempos garantizados, cupones, fiabilidad del vendedor ni asociaciones oficiales.</p>`], ["Correcciones", `<p>Las páginas pueden cambiar después de una revisión. El destino oficial o final manda para un pedido concreto.</p>`]]
      },
      privacy: {
        title: "Política de privacidad | Hacoo Store Guide", description: "Información de privacidad para la guía independiente Hacoo Store.",
        crumb: "Privacidad", eyebrow: "Actualizado el 13 de julio de 2026", h1: "Política de privacidad", lead: "La guía no ofrece cuentas, checkout, comentarios ni formularios de pedido.",
        summaryLabel: "Datos personales", summary: " Esta versión no solicita de forma intencionada nombres, direcciones, pagos ni datos de pedidos.",
        sections: [["Datos técnicos", `<p>El proveedor de alojamiento puede procesar IP, navegador, página solicitada, hora y señales de seguridad para servir y proteger el sitio.</p>`], ["Enlaces externos y cookies", `<p>Los destinos externos aplican sus propias políticas. Esta versión no usa cookies publicitarias; la elección de idioma puede guardarse localmente en el navegador.</p>`], ["Cambios", `<p>La fecha cambiará cuando haya una revisión importante. Antes del lanzamiento público debe añadirse un contacto operativo.</p>`]]
      },
      terms: {
        title: "Términos y aviso | Hacoo Store Guide", description: "Términos de uso y declaración de independencia de Hacoo Store Guide.",
        crumb: "Términos", eyebrow: "Actualizado el 13 de julio de 2026", h1: "Términos y aviso", lead: "hacoo.store es un sitio independiente de información y navegación, no afiliado, patrocinado ni operado por Hacoo.",
        summaryLabel: "Estado independiente", summary: " Las referencias a Hacoo identifican el tema editorial y no reclaman control sobre la marca, la app o sus servicios.",
        sections: [["Sin ventas ni transacciones", `<p>La guía no vende, cobra ni gestiona pedidos, envíos o devoluciones. Cada transacción se rige por las condiciones del destino final.</p>`], ["Límites de la información", `<p>Precios, stock, políticas, plazos y páginas pueden cambiar sin aviso. Verifica la información importante en directo antes de actuar.</p>`], ["Sitios y productos externos", `<p>Un enlace no certifica autenticidad, calidad, seguridad ni rendimiento del vendedor. Usa los destinos externos según tu propio criterio.</p>`]]
      }
    }
  }
};

for (const [code, addition] of Object.entries(localizedAdditions)) {
  locales[code].common.articles = addition.articlesLabel;
  locales[code].pages.home.stepsButton = addition.stepsButton;
  locales[code].pages.articles = addition.articlesPage;
  locales[code].pages.checklist = addition.checklistPage;
}

function relativeRoot(outputFile) {
  const directory = path.posix.dirname(outputFile);
  const depth = directory === "." ? 0 : directory.split("/").length;
  return "../".repeat(depth);
}

function localBase(prefix, code) {
  return prefix + code + "/";
}

function languageAlternates(route) {
  const links = languageCodes.map((code) => {
    const href = code === "en"
      ? `https://hacoo.store/${route.slug}`
      : `https://hacoo.store/${code}/${route.slug}`;
    return `  <link rel="alternate" hreflang="${code}" href="${href}">`;
  });
  links.push(`  <link rel="alternate" hreflang="x-default" href="https://hacoo.store/${route.slug}">`);
  return links.join("\n");
}

function header(locale, routeKey, prefix) {
  const base = localBase(prefix, locale.code);
  const c = locale.common;
  const nav = [
    ["finds", c.finds],
    ["categories", c.categories],
    ["articles", c.articles],
    ["how", c.how],
    ["shipping", c.shipping],
    ["faq", c.faq]
  ];
  return `
  <a class="skip-link" href="#main">${c.skip}</a>
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="${base}index.html" aria-label="${c.homeLabel}"><img class="brand-logo" src="${prefix}assets/images/hacoo-logo.png" alt="Hacoo" width="200" height="64"></a>
      <button class="menu-toggle" type="button" aria-label="${c.openNav}" aria-expanded="false" data-menu-toggle>☰</button>
      <nav class="site-nav" aria-label="${c.primaryNav}" data-site-nav data-open="false"><ul>
        ${nav.map(([key, label]) => `<li><a${key === "articles" ? ' class="nav-featured"' : ""} href="${base}${routes[key].file}"${key === routeKey ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
      </ul></nav>
      <div class="language-switcher"><span class="language-icon" aria-hidden="true">文</span><label class="skip-link" for="site-language">Language</label><select id="site-language" aria-label="Website language" data-language-switch>${[["en", "English"], ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"], ["es", "Español"]].map(([code, label]) => `<option value="${code}"${code === locale.code ? " selected" : ""}>${label}</option>`).join("")}</select></div>
      <div class="independent-note">${c.independent}<br>${c.notAffiliated}</div>
    </div>
  </header>`;
}

function footer(locale, prefix) {
  const base = localBase(prefix, locale.code);
  const c = locale.common;
  return `
  <footer class="site-footer"><div class="shell"><div class="footer-grid">
    <div><div class="brand"><img class="brand-logo" src="${prefix}assets/images/hacoo-logo.png" alt="Hacoo" width="200" height="64"></div><p class="footer-copy">${c.footerCopy}</p></div>
    <div><div class="footer-title">${c.guides}</div><nav class="footer-links"><a href="${base}${routes.articles.file}">${c.articles}</a><a href="${base}${routes.spreadsheet.file}">${c.spreadsheet}</a><a href="${base}${routes.how.file}">${c.how}</a><a href="${base}${routes.shipping.file}">${c.shipping}</a><a href="${base}${routes.size.file}">${c.sizeGuide}</a></nav></div>
    <div><div class="footer-title">${c.site}</div><nav class="footer-links"><a href="${base}${routes.about.file}">${c.about}</a><a href="${base}${routes.faq.file}">${c.faq}</a><a href="${base}${routes.privacy.file}">${c.privacy}</a><a href="${base}${routes.terms.file}">${c.terms}</a></nav></div>
  </div><div class="footer-bottom"><span>© 2026 Hacoo Store Guide</span><span>${c.reviewed}</span></div></div></footer>`;
}

function featuredCards(locale, prefix) {
  const labels = locale.catalog.labels;
  return featuredProducts.map(([key, image, url]) => `
        <a class="category-card" href="${url}" target="_blank" rel="noopener" aria-label="${locale.catalog.openFeatured} ${labels[key]}">
          <span class="card-label">${labels[key]}</span><img src="${prefix}assets/images/${image}" width="900" height="900" alt="${locale.catalog.alt[key]}">
        </a>`).join("");
}

function routeCards(locale) {
  return productRoutes.map(([key, url]) => `
          <a class="route-card" href="${url}" target="_blank" rel="noopener"><h3>${locale.catalog.routes[key]}</h3><span>${locale.catalog.openRoute} →</span></a>`).join("");
}

function finder(locale) {
  const f = locale.home.finder;
  return `
        <div class="finder" data-finder>
          <div class="search-box" role="search"><label class="skip-link" for="product-search">${f.searchLabel}</label><input id="product-search" type="search" placeholder="${f.placeholder}" autocomplete="off" data-search-input><button class="search-button" type="button" aria-label="${f.searchButton}" data-search-button>⌕</button></div>
          <span class="finder-label">${f.choose}</span>
          <div class="filter-row" aria-label="${f.filters}"><button class="filter-btn" type="button" data-filter="all" aria-pressed="true">${f.all}</button><button class="filter-btn" type="button" data-filter="shoes" aria-pressed="false">${locale.catalog.labels.shoes}</button><button class="filter-btn" type="button" data-filter="clothing" aria-pressed="false">${locale.catalog.labels.clothing}</button><button class="filter-btn" type="button" data-filter="bags" aria-pressed="false">${locale.catalog.labels.bags}</button><button class="filter-btn" type="button" data-filter="accessories" aria-pressed="false">${locale.catalog.labels.accessories}</button></div>
          <div class="finder-results" aria-live="polite" data-results></div>
        </div>`;
}

function renderHome(locale, prefix) {
  const p = locale.pages.home;
  const base = localBase(prefix, locale.code);
  return `
  <main id="main">
    <section class="hero"><div class="shell hero-grid"><div class="hero-copy"><p class="eyebrow">${p.eyebrow}</p><h1>${p.h1}<span class="dot">.</span></h1><p class="lead">${p.lead}</p><div class="actions"><a class="btn btn-primary" href="${base}${routes.finds.file}">${p.primary}</a><a class="btn" href="${base}${routes.how.file}">${p.secondary}</a></div><div class="trust-row"><span class="trust-pill"><span class="trust-icon">↻</span>${p.updated}</span><span class="trust-pill"><span class="trust-icon">▦</span>${p.categoryLed}</span><span class="trust-pill"><span class="trust-icon">✓</span>${p.cited}</span></div></div>${finder(locale)}</div></section>
    <section class="category-strip" aria-label="${locale.common.categories}"><div class="shell category-grid">${featuredCards(locale, prefix)}</div></section>
    <section class="section section-soft"><div class="shell"><div class="section-head"><div><p class="eyebrow">${p.stepsEyebrow}</p><h2>${p.stepsTitle}</h2></div><p>${p.stepsIntro}</p></div><div class="steps">${p.steps.map((step, index) => `<article class="step-card"><span class="step-number">0${index + 1}</span><h3>${step[0]}</h3><p>${step[1]}</p></article>`).join("")}</div><div class="section-actions"><a class="btn btn-primary" href="${base}${routes.checklist.file}">${p.stepsButton}</a></div></div></section>
    <section class="section"><div class="shell"><div class="section-head"><div><p class="eyebrow">${p.factsEyebrow}</p><h2>${p.factsTitle}</h2></div><p>${p.factsIntro}</p></div><div class="fact-grid">${p.facts.map((fact, index) => `<article class="fact-card${index === 0 ? " primary" : ""}"><p class="kicker">${fact[0]}</p><h3>${fact[1]}</h3><p>${fact[2]}</p><a class="source-link" href="${fact[3]}" target="_blank" rel="noopener nofollow">${fact[4]} →</a></article>`).join("")}</div></div></section>
    <section class="cta-band"><div class="shell cta-inner"><div><h2>${p.ctaTitle}</h2><p>${p.ctaText}</p></div><a class="btn" href="https://www.cnfanshp.com/AllProducts/" target="_blank" rel="noopener">${p.ctaButton}</a></div></section>
  </main>`;
}

function renderCatalog(locale, routeKey, prefix) {
  const page = locale.pages[routeKey];
  return `
  <main id="main">
    <section class="page-hero"><div class="shell hero-box"><div class="breadcrumbs"><a href="${localBase(prefix, locale.code)}index.html">${locale.common.home}</a><span>/</span><strong>${page.crumb}</strong></div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}<span class="dot">.</span></h1><p>${page.lead}</p></div></section>
    <section class="category-strip" style="padding-top:0"><div class="shell category-grid">${featuredCards(locale, prefix)}</div></section>
    <section class="section section-soft"><div class="shell"><div class="section-head"><div><p class="eyebrow">${page.directoryEyebrow}</p><h2>${page.directoryTitle}</h2></div><p>${page.directoryIntro}</p></div><div class="route-grid">${routeCards(locale)}</div></div></section>
    <section class="section"><div class="shell"><div class="section-head"><div><p class="eyebrow">${page.checksEyebrow}</p><h2>${page.checksTitle}</h2></div><p>${page.checksIntro}</p></div><div class="steps">${page.checks.map((step, index) => `<article class="step-card"><span class="step-number">0${index + 1}</span><h3>${step[0]}</h3><p>${step[1]}</p></article>`).join("")}</div></div></section>
  </main>`;
}

function renderArticles(locale, prefix) {
  const page = locale.pages.articles;
  const base = localBase(prefix, locale.code);
  const articleKeys = ["checklist", "spreadsheet", "how", "shipping", "size", "faq"];
  return `
  <main id="main">
    <section class="page-hero"><div class="shell hero-box"><div class="breadcrumbs"><a href="${base}index.html">${locale.common.home}</a><span>/</span><strong>${page.crumb}</strong></div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}<span class="dot">.</span></h1><p>${page.lead}</p></div></section>
    <section class="section article-hub-section" style="padding-top:0"><div class="shell"><div class="section-head"><div><p class="eyebrow">${page.cardLabel}</p><h2>${page.introTitle}</h2></div><p>${page.introText}</p></div><div class="article-grid">${articleKeys.map((key, index) => { const target = locale.pages[key]; return `<a class="article-card${index === 0 ? " article-card-featured" : ""}" href="${base}${routes[key].file}"><span class="article-tag">${page.cardLabel}</span><h2>${target.h1}</h2><p>${target.lead}</p><span class="article-card-link">${page.openArticle} →</span></a>`; }).join("")}</div></div></section>
  </main>`;
}

function renderArticle(locale, routeKey, prefix) {
  const page = locale.pages[routeKey];
  const base = localBase(prefix, locale.code);
  return `
  <main id="main">
    <section class="page-hero"><div class="shell hero-box"><div class="breadcrumbs"><a href="${base}index.html">${locale.common.home}</a><span>/</span><strong>${page.crumb}</strong></div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}<span class="dot">.</span></h1><p>${page.lead}</p></div></section>
    <div class="shell article-layout"><article class="article"><div class="callout"><strong>${page.summaryLabel}</strong>${page.summary}</div>${page.sections.map((section) => `<h2>${section[0]}</h2>${section[1]}`).join("")}</article><aside class="sidebar"><h3>${locale.common.guideNav}</h3><nav><a href="${base}${routes.articles.file}">${locale.common.articles}</a><a href="${base}${routes.how.file}">${locale.common.how}</a><a href="${base}${routes.shipping.file}">${locale.common.shipping}</a><a href="${base}${routes.size.file}">${locale.common.sizeGuide}</a><a href="${base}${routes.faq.file}">${locale.common.faq}</a></nav><a class="btn btn-primary btn-small" href="${base}${routes.categories.file}">${locale.common.browseCategories}</a></aside></div>
  </main>`;
}

function renderShipping(locale, prefix) {
  const page = locale.pages.shipping;
  const base = localBase(prefix, locale.code);
  return `
  <main id="main">
    <section class="page-hero"><div class="shell hero-box"><div class="breadcrumbs"><a href="${base}index.html">${locale.common.home}</a><span>/</span><strong>${page.crumb}</strong></div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}<span class="dot">.</span></h1><p>${page.lead}</p></div></section>
    <div class="shell article-layout"><article class="article"><div class="callout"><strong>${page.summaryLabel}</strong>${page.summary}</div><h2>${page.rangesTitle}</h2><p>${page.rangesIntro}</p><div class="compare-wrap"><table class="compare-table"><thead><tr><th>${page.destination}</th><th>${page.range}</th></tr></thead><tbody><tr><td>${page.ukGroup}</td><td>15–25 ${page.days}</td></tr><tr><td>${page.spain}</td><td>15–30 ${page.days}</td></tr><tr><td>${page.other}</td><td>25–65 ${page.days}</td></tr><tr><td>${page.general}</td><td>15–28 ${page.days}</td></tr></tbody></table></div>${page.sections.map((section) => `<h2>${section[0]}</h2>${section[1]}`).join("")}</article><aside class="sidebar"><h3>${locale.common.guideNav}</h3><nav><a href="${base}${routes.articles.file}">${locale.common.articles}</a><a href="${base}${routes.how.file}">${locale.common.how}</a><a href="${base}${routes.size.file}">${locale.common.sizeGuide}</a><a href="${base}${routes.faq.file}">${locale.common.faq}</a></nav><a class="btn btn-primary btn-small" href="https://www.hacoo.app/en-US/pages/shipping-info" target="_blank" rel="noopener nofollow">${page.officialButton}</a></aside></div>
  </main>`;
}

function renderFaq(locale, prefix) {
  const page = locale.pages.faq;
  const base = localBase(prefix, locale.code);
  return `
  <main id="main"><section class="page-hero"><div class="shell hero-box"><div class="breadcrumbs"><a href="${base}index.html">${locale.common.home}</a><span>/</span><strong>FAQ</strong></div><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}<span class="dot">.</span></h1><p>${page.lead}</p></div></section><section class="section" style="padding-top:0"><div class="shell faq-list">${page.items.map((item, index) => `<details${index === 0 ? " open" : ""}><summary>${item[0]}</summary><p>${item[1]}</p></details>`).join("")}</div></section><section class="cta-band"><div class="shell cta-inner"><div><h2>${page.ctaTitle}</h2><p>${page.ctaText}</p></div><a class="btn" href="${base}${routes.how.file}">${page.ctaButton}</a></div></section></main>`;
}

function renderDocument(locale, routeKey) {
  const route = routes[routeKey];
  const outputFile = `${locale.code}/${route.file}`;
  const prefix = relativeRoot(outputFile);
  const page = locale.pages[routeKey];
  const canonical = `https://hacoo.store/${locale.code}/${route.slug}`;
  let main = "";
  if (route.type === "home") main = renderHome(locale, prefix);
  else if (route.type === "catalog") main = renderCatalog(locale, routeKey, prefix);
  else if (route.type === "hub") main = renderArticles(locale, prefix);
  else if (route.type === "shipping") main = renderShipping(locale, prefix);
  else if (route.type === "faq") main = renderFaq(locale, prefix);
  else main = renderArticle(locale, routeKey, prefix);

  return `<!doctype html>
<html lang="${locale.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical}">
${languageAlternates(route)}
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="stylesheet" href="${prefix}assets/styles.css">
</head>
<body>${header(locale, routeKey, prefix)}${main}${footer(locale, prefix)}
  <script src="${prefix}assets/site.js" defer></script>
</body>
</html>\n`;
}

for (const code of ["fr", "de", "it", "es"]) {
  const locale = locales[code];
  for (const routeKey of Object.keys(routes)) {
    const outputFile = path.join(root, code, routes[routeKey].file);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, renderDocument(locale, routeKey));
  }
}

for (const [routeKey, route] of Object.entries(routes)) {
  const englishPath = path.join(root, route.file);
  let html = fs.readFileSync(englishPath, "utf8");
  const prefix = relativeRoot(route.file);

  html = html
    .replaceAll('href="#categories"', `href="${prefix}${routes.categories.file}"`)
    .replaceAll(`href="${prefix}index.html#categories"`, `href="${prefix}${routes.categories.file}"`)
    .replaceAll('<span class="language-icon" aria-hidden="true">◎</span>', '<span class="language-icon" aria-hidden="true">文</span>');

  if (!html.includes(">Categories</a>") && html.includes("data-site-nav")) {
    const howLink = `<li><a href="${prefix}${routes.how.file}">How it works</a></li>`;
    html = html.replace(howLink, `<li><a href="${prefix}${routes.categories.file}">Categories</a></li>${howLink}`);
  }

  const primaryNavMatch = html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/);
  if (primaryNavMatch && !primaryNavMatch[0].includes(">SEO Articles</a>")) {
    const articlesLink = `<li><a class="nav-featured" href="${prefix}${routes.articles.file}">SEO Articles</a></li>`;
    const updatedNav = primaryNavMatch[0].replace(/(<li><a[^>]*>How it works<\/a><\/li>)/, `${articlesLink}$1`);
    html = html.replace(primaryNavMatch[0], updatedNav);
  }

  const footerGuideStart = '<div class="footer-title">Guides</div><nav class="footer-links">';
  const footerMatch = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/);
  if (footerMatch && html.includes(footerGuideStart) && !footerMatch[0].includes(`href="${prefix}${routes.articles.file}">SEO Articles</a>`)) {
    html = html.replace(footerGuideStart, `${footerGuideStart}<a href="${prefix}${routes.articles.file}">SEO Articles</a>`);
  }

  if (!html.includes('hreflang="fr"')) {
    const canonicalPattern = /(<link rel="canonical" href="[^"]+">)/;
    html = html.replace(canonicalPattern, `$1\n${languageAlternates(route)}`);
  }

  if (!html.includes("data-language-switch") && html.includes("data-site-nav")) {
    const switcher = '<div class="language-switcher"><span class="language-icon" aria-hidden="true">文</span><label class="skip-link" for="site-language">Language</label><select id="site-language" aria-label="Website language" data-language-switch><option value="en" selected>English</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="it">Italiano</option><option value="es">Español</option></select></div>';
    html = html.replace(/<\/nav>(\s*)<div class="independent-note">/, `</nav>$1${switcher}$1<div class="independent-note">`);
  }

  fs.writeFileSync(englishPath, html);
}

const sitemapEntries = [];
for (const code of languageCodes) {
  for (const route of Object.values(routes)) {
    const url = code === "en" ? `https://hacoo.store/${route.slug}` : `https://hacoo.store/${code}/${route.slug}`;
    sitemapEntries.push(`  <url><loc>${url}</loc><lastmod>2026-07-14</lastmod></url>`);
  }
}
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`);

console.log("Localized routes, English alternates, navigation, and sitemap generated.");
