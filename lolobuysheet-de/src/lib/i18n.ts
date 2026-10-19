export const locales = ['de', 'en', 'es', 'fr', 'it', 'pl'] as const;
export type Locale = typeof locales[number];
export const names: Record<Locale, string> = { de: 'Deutsch', en: 'English', es: 'Español', fr: 'Français', it: 'Italiano', pl: 'Polski' };
export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);
export function href(lang: Locale, page = '') { return (lang === 'de' ? '/' : `/${lang}/`) + (page ? page.replace(/^\/+|\/+$/g, '') + '/' : ''); }
const rows = `home|Startseite|Home|Inicio|Accueil|Home|Strona główna
catalog|Spreadsheet|Spreadsheet|Spreadsheet|Spreadsheet|Spreadsheet|Spreadsheet
categories|Kategorien|Categories|Categorías|Catégories|Categorie|Kategorie
guide|Kaufguide|Buying guide|Guía de compra|Guide d’achat|Guida all’acquisto|Poradnik zakupowy
qc|QC-Fotos|QC photos|Fotos QC|Photos QC|Foto QC|Zdjęcia QC
shipping|Versand|Shipping|Envíos|Livraison|Spedizione|Wysyłka
faq|FAQ|FAQ|Preguntas frecuentes|FAQ|FAQ|FAQ
articles|Ratgeber|Articles|Artículos|Articles|Articoli|Artykuły
register|Zu LoloBuy ↗|Visit LoloBuy ↗|Ir a LoloBuy ↗|Voir LoloBuy ↗|Vai a LoloBuy ↗|Przejdź do LoloBuy ↗
language|Sprache|Language|Idioma|Langue|Lingua|Język
menu|Menü|Menu|Menú|Menu|Menu|Menu
eyebrow|DEIN NÄCHSTER FUND|YOUR NEXT FIND|TU PRÓXIMO HALLAZGO|VOTRE PROCHAINE TROUVAILLE|LA TUA PROSSIMA SCOPERTA|TWÓJ NASTĘPNY ZNALEZIONY PRODUKT
hero|Gute Funde. Klarer Überblick.|Good finds. A clearer view.|Buenos hallazgos. Todo más claro.|De belles trouvailles. Une vue claire.|Belle scoperte. Tutto più chiaro.|Ciekawe produkty. Przejrzysty wybór.
intro|Entdecke Produkte, vergleiche Fotos und geschätzte USD-Preise. Öffne den passenden Artikel anschließend direkt bei LoloBuy.|Discover products, compare photos and estimated USD prices, then open the matching item directly in LoloBuy.|Descubre productos, compara fotos y precios estimados en USD y abre el artículo correspondiente en LoloBuy.|Découvrez des produits, comparez les photos et les prix estimés en USD, puis ouvrez l’article correspondant sur LoloBuy.|Scopri prodotti, confronta foto e prezzi stimati in USD, poi apri l’articolo corrispondente su LoloBuy.|Odkrywaj produkty, porównuj zdjęcia i szacunkowe ceny w USD, a następnie otwórz wybrany produkt w LoloBuy.
search|Suchen|Search|Buscar|Rechercher|Cerca|Szukaj
placeholder|Produkt oder Suchbegriff …|Product or keyword …|Producto o palabra clave …|Produit ou mot-clé…|Prodotto o parola chiave…|Produkt lub słowo kluczowe…
imageSearch|Bildersuche|Image search|Búsqueda por imagen|Recherche par image|Ricerca per immagine|Wyszukiwanie obrazem
browse|Alle Produkte ansehen|Browse all products|Ver todos los productos|Voir tous les produits|Vedi tutti i prodotti|Zobacz wszystkie produkty
latestTitle|Neu im Spreadsheet|New in the spreadsheet|Novedades del spreadsheet|Nouveautés du spreadsheet|Novità nello spreadsheet|Nowości w spreadsheet
latestIntro|Die neuesten Einträge – mit den verfügbaren Produktbildern und Preisen.|The latest entries, with their available product images and prices.|Las últimas entradas, con sus imágenes y precios disponibles.|Les dernières fiches, avec leurs images et prix disponibles.|Le ultime schede, con immagini e prezzi disponibili.|Najnowsze pozycje z dostępnymi zdjęciami i cenami.
categoryTitle|Finde deine Kategorie|Find your category|Encuentra tu categoría|Trouvez votre catégorie|Trova la tua categoria|Znajdź swoją kategorię
categoryIntro|Vom ersten Suchbegriff bis zum passenden Produkt.|From your first search to the right product.|Desde tu primera búsqueda hasta el producto adecuado.|De votre première recherche au bon produit.|Dalla prima ricerca al prodotto giusto.|Od pierwszego wyszukiwania do właściwego produktu.
all|Alle|All|Todos|Tout|Tutti|Wszystkie
latest|Neueste|Latest|Más recientes|Plus récents|Più recenti|Najnowsze
popular|Beliebteste|Popular|Populares|Populaires|Popolari|Popularne
priceAsc|Preis aufsteigend|Price: low to high|Precio: menor a mayor|Prix croissant|Prezzo crescente|Cena rosnąco
priceDesc|Preis absteigend|Price: high to low|Precio: mayor a menor|Prix décroissant|Prezzo decrescente|Cena malejąco
sort|Sortierung|Sort|Ordenar|Trier|Ordina|Sortowanie
apply|Anwenden|Apply|Aplicar|Appliquer|Applica|Zastosuj
view|Details ansehen|View details|Ver detalles|Voir les détails|Vedi dettagli|Zobacz szczegóły
buy|Bei LoloBuy öffnen ↗|Open in LoloBuy ↗|Abrir en LoloBuy ↗|Ouvrir sur LoloBuy ↗|Apri su LoloBuy ↗|Otwórz w LoloBuy ↗
estimate|Geschätzter Artikelpreis|Estimated item price|Precio estimado del artículo|Prix estimé de l’article|Prezzo stimato dell’articolo|Szacunkowa cena produktu
priceNote|USD-Schätzung aus dem erfassten CNY-Preis. Versand und weitere Gebühren sind nicht enthalten. Prüfe Preis, Bestand und Varianten bei LoloBuy.|USD estimate from the recorded CNY price. Shipping and additional fees are excluded. Check price, stock and options in LoloBuy.|Estimación en USD a partir del precio registrado en CNY. No incluye envíos ni cargos adicionales. Comprueba precio, stock y opciones en LoloBuy.|Estimation en USD du prix enregistré en CNY. Livraison et frais supplémentaires exclus. Vérifiez prix, stock et options sur LoloBuy.|Stima in USD dal prezzo registrato in CNY. Spedizione e costi aggiuntivi esclusi. Verifica prezzo, disponibilità e varianti su LoloBuy.|Szacunek w USD na podstawie zapisanej ceny w CNY. Bez wysyłki i dodatkowych opłat. Sprawdź cenę, dostępność i warianty w LoloBuy.
photos|Produktbilder|Product photos|Fotos del producto|Photos du produit|Foto del prodotto|Zdjęcia produktu
noQC|Für diesen Artikel sind derzeit keine eindeutig zugeordneten QC-Fotos verfügbar.|No verified QC photo references are currently available for this item.|Actualmente no hay fotos QC claramente identificadas para este artículo.|Aucune référence de photo QC clairement identifiée n’est disponible pour cet article.|Al momento non sono disponibili foto QC chiaramente identificate per questo articolo.|Obecnie brak jednoznacznie przypisanych zdjęć QC dla tego produktu.
qcNote|Produktbilder und Lagerprüfungsfotos sind unterschiedliche Quellen. Nutze QC-Fotos deiner eigenen Bestellung für die Versandentscheidung.|Product images and warehouse inspection photos are different sources. Use QC photos of your own order when deciding whether to ship.|Las imágenes del producto y las fotos de inspección del almacén son fuentes distintas. Revisa las fotos QC de tu propio pedido antes del envío.|Les images produit et les photos de contrôle en entrepôt sont des sources différentes. Consultez les photos QC de votre commande avant l’expédition.|Le immagini del prodotto e le foto di ispezione in magazzino sono fonti diverse. Controlla le foto QC del tuo ordine prima della spedizione.|Zdjęcia produktu i zdjęcia kontroli magazynowej to różne źródła. Przed wysyłką sprawdź zdjęcia QC własnego zamówienia.
sourceId|Originale Artikel-ID|Original item ID|ID original del artículo|Identifiant d’origine|ID originale dell’articolo|Oryginalny identyfikator produktu
back|Zurück zur Übersicht|Back to the catalog|Volver al catálogo|Retour au catalogue|Torna al catalogo|Wróć do katalogu
previous|Zurück|Previous|Anterior|Précédent|Precedente|Poprzednia
next|Weiter|Next|Siguiente|Suivant|Successivo|Następna
page|Seite|Page|Página|Page|Pagina|Strona
results|Ergebnisse|Results|Resultados|Résultats|Risultati|Wyniki
empty|Keine passenden Produkte gefunden.|No matching products found.|No se encontraron productos.|Aucun produit correspondant.|Nessun prodotto corrispondente.|Nie znaleziono pasujących produktów.
clear|Filter zurücksetzen|Clear filters|Borrar filtros|Réinitialiser les filtres|Cancella filtri|Wyczyść filtry
retry|Erneut versuchen|Try again|Reintentar|Réessayer|Riprova|Spróbuj ponownie
unavailable|Produkte sind gerade nicht erreichbar. Bitte versuche es erneut.|Products are temporarily unavailable. Please try again.|Los productos no están disponibles temporalmente. Vuelve a intentarlo.|Les produits sont momentanément indisponibles. Veuillez réessayer.|I prodotti non sono momentaneamente disponibili. Riprova.|Produkty są chwilowo niedostępne. Spróbuj ponownie.
notFound|Diese Seite wurde nicht gefunden.|This page could not be found.|No se encontró esta página.|Cette page est introuvable.|Questa pagina non è stata trovata.|Nie znaleziono tej strony.
imageUnavailable|Die Bildersuche ist derzeit nicht verfügbar. Suche mit einem Produktnamen oder wähle eine Kategorie.|Image search is currently unavailable. Search by product name or browse a category.|La búsqueda por imagen no está disponible. Busca por nombre o explora una categoría.|La recherche par image est indisponible. Recherchez un nom de produit ou parcourez une catégorie.|La ricerca per immagine non è disponibile. Cerca per nome o scegli una categoria.|Wyszukiwanie obrazem jest niedostępne. Wpisz nazwę produktu lub wybierz kategorię.
noImage|Bild nicht verfügbar|Image unavailable|Imagen no disponible|Image indisponible|Immagine non disponibile|Zdjęcie niedostępne
noPrice|Preis bei LoloBuy prüfen|Check price in LoloBuy|Consultar precio en LoloBuy|Vérifier le prix sur LoloBuy|Controlla il prezzo su LoloBuy|Sprawdź cenę w LoloBuy
noLink|Für diesen Artikel ist noch kein geprüfter LoloBuy-Link verfügbar.|A verified LoloBuy link is not yet available for this item.|Este artículo aún no tiene un enlace LoloBuy verificado.|Aucun lien LoloBuy vérifié n’est disponible pour cet article.|Non è ancora disponibile un link LoloBuy verificato per questo articolo.|Dla tego produktu nie ma jeszcze zweryfikowanego linku LoloBuy.
searchOrder|Suchergebnisse folgen der Reihenfolge der Produktsuche. Nutze Kategorien für die Preissortierung.|Search results follow the product search order. Browse categories to sort by price.|Los resultados siguen el orden de búsqueda. Usa las categorías para ordenar por precio.|Les résultats suivent l’ordre de recherche. Parcourez les catégories pour trier par prix.|I risultati seguono l’ordine di ricerca. Usa le categorie per ordinare per prezzo.|Wyniki zachowują kolejność wyszukiwania. W kategoriach możesz sortować według ceny.
read|Weiterlesen|Read guide|Leer guía|Lire le guide|Leggi la guida|Czytaj poradnik
editorial|Vor dem Kauf|Before you buy|Antes de comprar|Avant d’acheter|Prima di acquistare|Przed zakupem
articleIntro|Praktische Hinweise zu Links, Größen, Bildern und Preisen.|Practical notes on links, sizing, images and prices.|Consejos prácticos sobre enlaces, tallas, imágenes y precios.|Conseils pratiques sur les liens, tailles, images et prix.|Consigli pratici su link, taglie, immagini e prezzi.|Praktyczne wskazówki o linkach, rozmiarach, zdjęciach i cenach.
about|Über diese Website|About this site|Sobre este sitio|À propos du site|Informazioni sul sito|O tej stronie
privacy|Datenschutz|Privacy|Privacidad|Confidentialité|Privacy|Prywatność
independent|Unabhängiger Produktkatalog. Nicht von LoloBuy betrieben. Registrierung, Bestellung, Zahlung und Versand erfolgen bei LoloBuy.|Independent product directory. Not operated by LoloBuy. Registration, ordering, payment and shipping take place on LoloBuy.|Catálogo independiente, no operado por LoloBuy. El registro, los pedidos, los pagos y los envíos se gestionan en LoloBuy.|Catalogue indépendant, non exploité par LoloBuy. Inscription, commande, paiement et livraison se font sur LoloBuy.|Catalogo indipendente, non gestito da LoloBuy. Registrazione, ordini, pagamenti e spedizione avvengono su LoloBuy.|Niezależny katalog, nieprowadzony przez LoloBuy. Rejestracja, zamówienia, płatności i wysyłka odbywają się w LoloBuy.
sourceTitle|Offizielle Informationen|Official information|Información oficial|Informations officielles|Informazioni ufficiali|Informacje oficjalne
checked|Stand: 19. Oktober 2026|Checked: 19 October 2026|Revisado: 19 de octubre de 2026|Vérifié le 19 octobre 2026|Verificato il 19 ottobre 2026|Sprawdzono: 19 października 2026
skip|Zum Inhalt|Skip to content|Ir al contenido|Aller au contenu|Vai al contenuto|Przejdź do treści
stepsTitle|Vom Fund zur Bestellung|From discovery to ordering|Del hallazgo al pedido|De la découverte à la commande|Dalla scoperta all’ordine|Od znalezienia do zamówienia
step1|Entdecken|Discover|Descubrir|Découvrir|Scopri|Odkrywaj
step2|Vergleichen|Compare|Comparar|Comparer|Confronta|Porównuj
step3|Bei LoloBuy prüfen|Check in LoloBuy|Comprobar en LoloBuy|Vérifier sur LoloBuy|Verifica su LoloBuy|Sprawdź w LoloBuy
step1Text|Suche im Katalog oder öffne eine Kategorie.|Search the catalog or open a category.|Busca en el catálogo o abre una categoría.|Recherchez dans le catalogue ou ouvrez une catégorie.|Cerca nel catalogo o apri una categoria.|Przeszukaj katalog lub otwórz kategorię.
step2Text|Prüfe Produktbilder, Artikel-ID und Preis.|Review photos, item ID and price.|Revisa fotos, ID y precio.|Vérifiez les photos, l’identifiant et le prix.|Controlla foto, ID e prezzo.|Sprawdź zdjęcia, identyfikator i cenę.
step3Text|Bestätige die aktuelle Variante vor dem Kauf.|Confirm the current option before buying.|Confirma la variante actual antes de comprar.|Confirmez la variante actuelle avant d’acheter.|Conferma la variante attuale prima dell’acquisto.|Potwierdź aktualny wariant przed zakupem.`;
export const ui = Object.fromEntries(locales.map((lang, i) => [lang, Object.fromEntries(rows.split('\n').map(row => { const [key, ...values] = row.split('|'); if (values.length !== locales.length) throw new Error(`Missing translation: ${key}`); return [key, values[i]]; }))])) as Record<Locale, Record<string, string>>;
const categoryRows = `shoes|Schuhe|Shoes|Calzado|Chaussures|Scarpe|Buty
hoodies-sweaters|Sweatshirts|Sweatshirts|Sudaderas|Sweatshirts|Felpe|Bluzy
t-shirts|T-Shirts|T-shirts|Camisetas|T-shirts|T-shirt|Koszulki
jackets|Jacken|Jackets|Chaquetas|Vestes|Giacche|Kurtki
pants-shorts|Hosen & Shorts|Pants & shorts|Pantalones y shorts|Pantalons et shorts|Pantaloni e shorts|Spodnie i szorty
headwear|Mützen & Caps|Headwear|Gorras y gorros|Couvre-chefs|Cappelli|Nakrycia głowy
accessories|Accessoires|Accessories|Accesorios|Accessoires|Accessori|Akcesoria
short-sets|Sets|Sets|Conjuntos|Ensembles|Completi|Zestawy
electronics|Elektronik|Electronics|Electrónica|Électronique|Elettronica|Elektronika
other-stuff|Weitere Produkte|Other products|Otros productos|Autres produits|Altri prodotti|Inne produkty
jersey|Trikots|Jerseys|Camisetas deportivas|Maillots|Maglie sportive|Koszulki sportowe`;
export function categoryName(lang: Locale, slug: string, original: string) { const row = categoryRows.split('\n').find(x => x.split('|')[0] === slug); return row ? row.split('|')[locales.indexOf(lang) + 1] : original; }
export function money(n: number | null, lang: Locale) { return n === null ? ui[lang].noPrice : new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }).format(n); }
export const infoPages = ['guide', 'qc', 'shipping', 'faq', 'articles', 'about', 'privacy', 'image-search'];
export const articleSlugs = ['source-links', 'size-check', 'price-check', 'photo-check'];
