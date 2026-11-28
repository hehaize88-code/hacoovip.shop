import {catalogLanguages,catalogWords} from './catalog-locales.mjs'
export const languages = {
  en: 'English', de: 'Deutsch', es: 'Español', fr: 'Français',
  it: 'Italiano', pl: 'Polski', pt: 'Português', 'zh-CN': '简体中文',
  nl:'Nederlands', ro:'Română', sv:'Svenska', da:'Dansk', fi:'Suomi', el:'Ελληνικά',
  cs:'Čeština', hu:'Magyar', bg:'Български', sk:'Slovenčina', hr:'Hrvatski',
  ja:'日本語', ko:'한국어', vi:'Tiếng Việt', th:'ไทย', id:'Bahasa Indonesia'
};

const fields = 'home sheet categories register hero intro browse search placeholder latest all price buy next prev empty retry error gallery back faq q1 a1 q2 a2 q3 a3 page language'.split(' ');
const messages = {
  en: [
    'Home','Spreadsheet','Categories','Register','HipoBuy Spreadsheet','Explore the catalog, compare seller photos and open the item on HipoBuy.',
    'Browse the spreadsheet','Search','Search shoes, jackets, bags…','Latest products','All products','Item price','Open on HipoBuy','Next','Previous',
    'No matching products. Try another search.','Try again','The catalog could not be loaded.','Product photos','Back','FAQ',
    'Where do I place an order?','Open the product on HipoBuy to choose your options and place your order.',
    'What does the price include?','The catalog shows the listed item price. Check the selected option, fees and shipping on HipoBuy.',
    'Who provides the photos?','The gallery shows images from the original product listing. For warehouse QC photos, check your order on HipoBuy.',
    'Page','Language'],
  de: [
    'Startseite','Produkttabelle','Kategorien','Registrieren','HipoBuy-Produkttabelle','Durchsuche den Katalog, vergleiche die Verkäuferfotos und öffne den Artikel auf HipoBuy.',
    'Produkttabelle ansehen','Suchen','Schuhe, Jacken, Taschen suchen…','Neueste Artikel','Alle Artikel','Artikelpreis','Auf HipoBuy öffnen','Weiter','Zurück',
    'Keine passenden Artikel. Versuche einen anderen Suchbegriff.','Erneut versuchen','Der Katalog konnte nicht geladen werden.','Produktbilder','Zurück','Häufige Fragen',
    'Wo kann ich bestellen?','Öffne den Artikel auf HipoBuy, wähle die gewünschte Variante und gib dort deine Bestellung auf.',
    'Was ist im Preis enthalten?','Der Katalog zeigt den angegebenen Artikelpreis. Prüfe Variante, Gebühren und Versand auf HipoBuy.',
    'Woher stammen die Fotos?','Die Galerie zeigt die Bilder aus dem ursprünglichen Angebot. Fotos der Qualitätskontrolle findest du bei deiner Bestellung auf HipoBuy.',
    'Seite','Sprache'],
  es: [
    'Inicio','Hoja de cálculo','Categorías','Registrarse','Hoja de cálculo de HipoBuy','Explora el catálogo, compara las fotos del vendedor y abre el artículo en HipoBuy.',
    'Explorar la hoja de cálculo','Buscar','Buscar zapatos, chaquetas, bolsos…','Últimos artículos','Todos los artículos','Precio del artículo','Abrir en HipoBuy','Siguiente','Anterior',
    'No se encontraron artículos. Prueba con otra búsqueda.','Reintentar','No se pudo cargar el catálogo.','Fotos del artículo','Volver','Preguntas frecuentes',
    '¿Dónde hago el pedido?','Abre el artículo en HipoBuy para elegir una variante y hacer el pedido.',
    '¿Qué incluye el precio?','El catálogo muestra el precio anunciado. Comprueba la variante elegida, las comisiones y el envío en HipoBuy.',
    '¿De dónde vienen las fotos?','La galería muestra las imágenes del anuncio original. Consulta las fotos de control de calidad en tu pedido de HipoBuy.',
    'Página','Idioma'],
  fr: [
    'Accueil','Tableur','Catégories',"S’inscrire",'Tableur HipoBuy','Parcourez le catalogue, comparez les photos du vendeur et ouvrez la fiche sur HipoBuy.',
    'Parcourir le tableur','Rechercher','Rechercher des chaussures, vestes, sacs…','Derniers articles','Tous les articles','Prix de l’article','Ouvrir sur HipoBuy','Suivant','Précédent',
    'Aucun article trouvé. Essayez un autre terme.','Réessayer','Impossible de charger le catalogue.','Photos de l’article','Retour','Questions fréquentes',
    'Où passer commande ?','Ouvrez la fiche sur HipoBuy pour choisir une variante et passer commande.',
    'Que comprend le prix ?','Le catalogue affiche le prix annoncé de l’article. Vérifiez la variante, les frais et la livraison sur HipoBuy.',
    'D’où viennent les photos ?','La galerie reprend les images de l’annonce d’origine. Consultez les photos du contrôle qualité dans votre commande HipoBuy.',
    'Page','Langue'],
  it: [
    'Home','Foglio di calcolo','Categorie','Registrati','Foglio di calcolo HipoBuy','Esplora il catalogo, confronta le foto del venditore e apri il prodotto su HipoBuy.',
    'Sfoglia il foglio di calcolo','Cerca','Cerca scarpe, giacche, borse…','Ultimi prodotti','Tutti i prodotti','Prezzo del prodotto','Apri su HipoBuy','Avanti','Indietro',
    'Nessun prodotto trovato. Prova un altro termine.','Riprova','Impossibile caricare il catalogo.','Foto del prodotto','Indietro','Domande frequenti',
    'Dove posso ordinare?','Apri il prodotto su HipoBuy per scegliere la variante ed effettuare l’ordine.',
    'Cosa include il prezzo?','Il catalogo mostra il prezzo indicato per il prodotto. Verifica variante, commissioni e spedizione su HipoBuy.',
    'Chi fornisce le foto?','La galleria mostra le immagini dell’annuncio originale. Trovi le foto del controllo qualità nel tuo ordine su HipoBuy.',
    'Pagina','Lingua'],
  pl: [
    'Strona główna','Arkusz produktów','Kategorie','Zarejestruj się','Arkusz produktów HipoBuy','Przeglądaj katalog, porównuj zdjęcia sprzedawcy i otwieraj produkty w HipoBuy.',
    'Przeglądaj arkusz','Szukaj','Szukaj butów, kurtek, toreb…','Najnowsze produkty','Wszystkie produkty','Cena produktu','Otwórz w HipoBuy','Dalej','Wstecz',
    'Brak pasujących produktów. Spróbuj innej frazy.','Spróbuj ponownie','Nie udało się wczytać katalogu.','Zdjęcia produktu','Wstecz','Częste pytania',
    'Gdzie złożyć zamówienie?','Otwórz produkt w HipoBuy, wybierz wariant i złóż zamówienie.',
    'Co obejmuje cena?','Katalog podaje cenę produktu z oferty. Sprawdź wybrany wariant, opłaty i koszt wysyłki w HipoBuy.',
    'Skąd pochodzą zdjęcia?','Galeria zawiera zdjęcia z oryginalnej oferty. Zdjęcia z kontroli jakości znajdziesz w swoim zamówieniu w HipoBuy.',
    'Strona','Język'],
  pt: [
    'Início','Planilha','Categorias','Criar conta','Planilha HipoBuy','Explore o catálogo, compare as fotos do vendedor e abra o produto na HipoBuy.',
    'Explorar a planilha','Buscar','Buscar calçados, jaquetas, bolsas…','Produtos recentes','Todos os produtos','Preço do produto','Abrir na HipoBuy','Próxima','Anterior',
    'Nenhum produto encontrado. Tente outro termo.','Tentar novamente','Não foi possível carregar o catálogo.','Fotos do produto','Voltar','Perguntas frequentes',
    'Onde faço o pedido?','Abra o produto na HipoBuy para escolher a variante e fazer o pedido.',
    'O que o preço inclui?','O catálogo mostra o preço anunciado do produto. Confira a variante escolhida, as taxas e o frete na HipoBuy.',
    'De onde vêm as fotos?','A galeria mostra as imagens do anúncio original. Consulte as fotos do controle de qualidade no seu pedido na HipoBuy.',
    'Página','Idioma'],
  'zh-CN': [
    '首页','电子表格','商品分类','注册','HipoBuy 商品电子表格','浏览商品、对比卖家图片，选好后前往 HipoBuy 查看商品。',
    '浏览电子表格','搜索','搜索鞋子、夹克、包袋…','最新商品','全部商品','商品价格','在 HipoBuy 查看','下一页','上一页',
    '没有找到匹配的商品，试试其他关键词。','重新加载','暂时无法加载商品目录。','商品图片','返回','常见问题',
    '在哪里下单？','打开商品的 HipoBuy 页面，选择款式、尺码和数量后下单。',
    '显示的价格包含什么？','目录展示商品标价。所选款式的实际价格、服务费和运费请在 HipoBuy 核对。',
    '商品图片来自哪里？','相册展示原商品页面提供的图片。仓库质检照片请在对应的 HipoBuy 订单中查看。',
    '页','语言']
};

export const copy = Object.fromEntries(Object.entries(messages).map(([lang, values]) => {
  if (values.length !== fields.length) throw new Error('Incomplete translations for ' + lang);
  return [lang, Object.fromEntries(fields.map((field, index) => [field, values[index]]))];
}));


const featureFields = 'currency fxError imgSearch uploadImage imageUrl imageHint searching matches imageError agents copyItem copyStyle styles qc detailPhotos noQc noStyles copied copyManually chooseOptions option size color skuChoice productId'.split(' ');
const featureMessages = {
  en: [
    'Currency','Exchange rates unavailable. Showing the original price.','Image search','Choose a photo','Image URL','Choose a photo or paste a catalog image URL.','Comparing photos…','Similar products','Could not read the image. Try a JPG, PNG, WebP or a catalog image URL.',
    'Other buying agents','Copy Weidian link','Copy style link','Styles','QC photos','Detail photos','No QC photos supplied.','No style options supplied.','Copied','Select and copy the link.','Choose options','Option','Size','Color','Select each option to copy the link for that variant.','Product ID'],
  de: [
    'Währung','Wechselkurse nicht verfügbar. Der Originalpreis wird angezeigt.','Bildersuche','Foto auswählen','Bild-URL','Wähle ein Foto oder füge die URL eines Katalogbilds ein.','Fotos werden verglichen…','Ähnliche Artikel','Bild nicht lesbar. Versuche ein JPG, PNG, WebP oder die URL eines Katalogbilds.',
    'Weitere Einkaufsagenten','Weidian-Link kopieren','Variantenlink kopieren','Varianten','QC-Fotos','Detailfotos','Keine QC-Fotos vorhanden.','Keine Varianten angegeben.','Kopiert','Link markieren und kopieren.','Optionen wählen','Option','Größe','Farbe','Wähle alle Optionen aus, um den Link für diese Variante zu kopieren.','Artikel-ID'],
  es: [
    'Moneda','Tipos de cambio no disponibles. Se muestra el precio original.','Búsqueda por imagen','Elegir una foto','URL de la imagen','Elige una foto o pega la URL de una imagen del catálogo.','Comparando fotos…','Productos similares','No se pudo leer la imagen. Prueba con un archivo JPG, PNG o WebP o con la URL de una imagen del catálogo.',
    'Otros agentes de compra','Copiar enlace de Weidian','Copiar enlace de la variante','Variantes','Fotos de control de calidad','Fotos de detalle','No hay fotos de control de calidad disponibles.','No se han indicado variantes.','Copiado','Selecciona y copia el enlace.','Elegir opciones','Opción','Talla','Color','Selecciona todas las opciones para copiar el enlace de esa variante.','ID del producto'],
  fr: [
    'Devise','Taux de change indisponibles. Le prix d’origine est affiché.','Recherche par image','Choisir une photo','URL de l’image','Choisissez une photo ou collez l’URL d’une image du catalogue.','Comparaison des photos…','Articles similaires','Image illisible. Essayez un fichier JPG, PNG ou WebP, ou l’URL d’une image du catalogue.',
    'Autres agents d’achat','Copier le lien Weidian','Copier le lien de la variante','Variantes','Photos de contrôle qualité','Photos de détail','Aucune photo de contrôle qualité fournie.','Aucune variante indiquée.','Copié','Sélectionnez et copiez le lien.','Choisir les options','Option','Taille','Couleur','Choisissez chaque option pour copier le lien de cette variante.','Identifiant du produit'],
  it: [
    'Valuta','Tassi di cambio non disponibili. Viene mostrato il prezzo originale.','Ricerca per immagine','Scegli una foto','URL immagine','Scegli una foto o incolla l’URL di un’immagine del catalogo.','Confronto delle foto…','Prodotti simili','Impossibile leggere l’immagine. Prova un file JPG, PNG o WebP oppure l’URL di un’immagine del catalogo.',
    'Altri agenti di acquisto','Copia il link Weidian','Copia il link della variante','Varianti','Foto del controllo qualità','Foto dei dettagli','Nessuna foto del controllo qualità disponibile.','Nessuna variante indicata.','Copiato','Seleziona e copia il link.','Scegli le opzioni','Opzione','Taglia','Colore','Seleziona tutte le opzioni per copiare il link della variante.','ID prodotto'],
  pl: [
    'Waluta','Kursy walut są niedostępne. Podano cenę oryginalną.','Wyszukiwanie obrazem','Wybierz zdjęcie','Adres URL zdjęcia','Wybierz zdjęcie lub wklej adres zdjęcia z katalogu.','Porównywanie zdjęć…','Podobne produkty','Nie udało się odczytać zdjęcia. Użyj pliku JPG, PNG lub WebP albo adresu zdjęcia z katalogu.',
    'Inni pośrednicy zakupowi','Kopiuj link do Weidian','Kopiuj link do wariantu','Warianty','Zdjęcia z kontroli jakości','Zdjęcia szczegółów','Brak zdjęć z kontroli jakości.','Brak dostępnych wariantów.','Skopiowano','Zaznacz i skopiuj link.','Wybierz opcje','Opcja','Rozmiar','Kolor','Wybierz wszystkie opcje, aby skopiować link do wariantu.','ID produktu'],
  pt: [
    'Moeda','Taxas de câmbio indisponíveis. O preço original é exibido.','Busca por imagem','Escolher uma foto','URL da imagem','Escolha uma foto ou cole a URL de uma imagem do catálogo.','Comparando fotos…','Produtos semelhantes','Não foi possível ler a imagem. Tente um arquivo JPG, PNG ou WebP ou a URL de uma imagem do catálogo.',
    'Outros agentes de compra','Copiar link da Weidian','Copiar link da variante','Variantes','Fotos do controle de qualidade','Fotos dos detalhes','Nenhuma foto do controle de qualidade disponível.','Nenhuma variante informada.','Copiado','Selecione e copie o link.','Escolher opções','Opção','Tamanho','Cor','Selecione cada opção para copiar o link desta variante.','ID do produto'],
  'zh-CN': [
    '货币','汇率暂不可用，显示原币价格。','以图搜商品','选择图片','图片网址','选择一张照片，或粘贴商品目录中的图片网址。','正在比对图片…','相似商品','无法读取图片，请尝试 JPG、PNG、WebP 格式，或使用商品目录中的图片网址。',
    '其他代购平台','复制微店链接','复制款式链接','款式','质检照片','商品详情图','暂无质检照片。','暂无款式选项。','已复制','请选中并复制链接。','选择规格','选项','尺码','颜色','选好各项规格后，即可复制该款式的链接。','商品编号']
};
for (const [lang, values] of Object.entries(featureMessages)) {
  if (values.length !== featureFields.length) throw new Error('Missing feature labels for ' + lang);
  featureFields.forEach((field,index) => { copy[lang][field] = values[index]; });
}

// Column order follows languages. Keep marketplace names, model numbers and SKU suffixes intact.
const terms = [
 ['All Products','Alle Artikel','Todos los artículos','Tous les articles','Tutti i prodotti','Wszystkie produkty','Todos os produtos','全部商品'],
 ['Hoodies/Sweaters','Hoodies/Pullover','Sudaderas/Jerséis','Sweats à capuche/Pulls','Felpe con cappuccio/Maglioni','Bluzy z kapturem/Swetry','Moletons/Suéteres','连帽衫/毛衣'],
 ['Pants/Shorts','Hosen/Shorts','Pantalones/Pantalones cortos','Pantalons/Shorts','Pantaloni/Pantaloncini','Spodnie/Szorty','Calças/Shorts','长裤/短裤'],
 ['Other Stuff','Sonstiges','Otros artículos','Autres articles','Altri articoli','Pozostałe produkty','Outros produtos','其他商品'],
 ['Short Sets','Sommersets','Conjuntos cortos','Ensembles courts','Completi corti','Komplety letnie','Conjuntos curtos','短装套装'],
 ['T-Shirts','T-Shirts','Camisetas','T-shirts','Magliette','Koszulki','Camisetas','T恤'],
 ['Sweatshirts','Sweatshirts','Sudaderas','Sweats','Felpe','Bluzy','Moletons','卫衣'],
 ['Hoodies','Kapuzenpullover','Sudaderas con capucha','Sweats à capuche','Felpe con cappuccio','Bluzy z kapturem','Moletons com capuz','连帽衫'],
 ['Sweaters','Pullover','Jerséis','Pulls','Maglioni','Swetry','Suéteres','毛衣'],
 ['Jackets','Jacken','Chaquetas','Vestes','Giacche','Kurtki','Jaquetas','夹克'],
 ['Shoes','Schuhe','Zapatos','Chaussures','Scarpe','Buty','Calçados','鞋子'],
 ['Headwear','Kopfbedeckungen','Gorras y sombreros','Couvre-chefs','Copricapi','Nakrycia głowy','Bonés e chapéus','帽饰'],
 ['Accessories','Accessoires','Accesorios','Accessoires','Accessori','Akcesoria','Acessórios','配饰'],
 ['Electronics','Elektronik','Electrónica','Électronique','Elettronica','Elektronika','Eletrônicos','电子产品'],
 ['Jersey','Trikots','Camisetas deportivas','Maillots','Maglie sportive','Koszulki sportowe','Camisas esportivas','球衣'],
 ['Shorts','Shorts','Pantalones cortos','Shorts','Pantaloncini','Szorty','Shorts','短裤'],
 ['Pants','Hosen','Pantalones','Pantalons','Pantaloni','Spodnie','Calças','长裤'],
 ['Bags','Taschen','Bolsos','Sacs','Borse','Torby','Bolsas','包袋'],
 ['Wallets','Geldbörsen','Carteras','Portefeuilles','Portafogli','Portfele','Carteiras','钱包'],
 ['Sneakers','Sneaker','Zapatillas','Baskets','Sneakers','Sneakersy','Tênis','运动鞋'],
 ['Socks','Socken','Calcetines','Chaussettes','Calze','Skarpety','Meias','袜子'],
 ['Watches','Uhren','Relojes','Montres','Orologi','Zegarki','Relógios','手表'],
 ['Jewelry','Schmuck','Joyas','Bijoux','Gioielli','Biżuteria','Joias','首饰']
];
const codes = Object.keys(languages);
for (const row of terms) {
  for (const code of catalogLanguages) row.push(catalogWords[code].get(row[0].toLowerCase()) || row[0]);
}
function key(text) {
  return String(text).normalize('NFKC').trim().toLowerCase().replace(/[-_]/g,' ').replace(/\s*\/\s*/g,'/').replace(/\s+/g,' ');
}

const titleRows = `
closed-toe roman sandals|Closed-toe Roman sandals|Geschlossene Römersandalen|Sandalias romanas de punta cerrada|Spartiates à bout fermé|Sandali alla romana a punta chiusa|Sandały rzymianki z zakrytymi palcami|Sandálias romanas de bico fechado|包头罗马凉鞋
distressed paint-splatter jeans|Distressed paint-splatter jeans|Jeans in Used-Optik mit Farbspritzern|Vaqueros desgastados con salpicaduras de pintura|Jean usé à éclaboussures de peinture|Jeans effetto vissuto con schizzi di vernice|Przecierane dżinsy z efektem farby|Jeans desgastados com respingos de tinta|做旧泼墨牛仔裤
lace-up breathable high-top sneakers|Breathable lace-up high-top sneakers|Atmungsaktive High-Top-Sneaker mit Schnürung|Zapatillas altas transpirables con cordones|Baskets montantes respirantes à lacets|Sneaker alte traspiranti con lacci|Sznurowane przewiewne sneakersy za kostkę|Tênis de cano alto respiráveis com cadarço|透气系带高帮运动鞋
high-top sneakers|High-top sneakers|High-Top-Sneaker|Zapatillas altas|Baskets montantes|Sneaker alte|Sneakersy za kostkę|Tênis de cano alto|高帮运动鞋
low-top sneakers|Low-top sneakers|Low-Top-Sneaker|Zapatillas bajas|Baskets basses|Sneaker basse|Niskie sneakersy|Tênis de cano baixo|低帮运动鞋
high-top|high-top|hoch geschnitten|de caña alta|montant|a collo alto|za kostkę|de cano alto|高帮
low-top|low-top|niedrig geschnitten|de caña baja|bas|a collo basso|z niską cholewką|de cano baixo|低帮
lace-up|lace-up|mit Schnürung|con cordones|à lacets|con lacci|sznurowane|com cadarço|系带
breathable|breathable|atmungsaktiv|transpirable|respirant|traspirante|przewiewne|respirável|透气
colorful|multicolored|mehrfarbig|multicolor|multicolore|multicolore|wielokolorowe|multicolorido|多彩
lambswool|lambswool|Lammwolle|lana de cordero|laine d’agneau|lana d’agnello|wełna jagnięca|lã de cordeiro|羊羔毛
gradient|gradient|Farbverlauf|degradado|dégradé|sfumato|gradient|degradê|渐变
fabric|fabric|Stoff|tejido|tissu|tessuto|tkanina|tecido|织物
non-slip|non-slip|rutschfest|antideslizante|antidérapant|antiscivolo|antypoślizgowe|antiderrapante|防滑
wear-resistant|wear-resistant|abriebfest|resistente al desgaste|résistant à l’usure|resistente all’usura|odporne na ścieranie|resistente ao desgaste|耐磨
glossy finish|glossy finish|Glanzfinish|acabado brillante|finition brillante|finitura lucida|błyszczące wykończenie|acabamento brilhante|亮面
athletic shoes|Athletic shoes|Sportschuhe|Calzado deportivo|Chaussures de sport|Scarpe sportive|Buty sportowe|Calçados esportivos|运动鞋
embroidered|embroidered|bestickt|bordado|brodé|ricamato|haftowane|bordado|刺绣
platform beach sandals|Platform beach sandals|Plateau-Strandsandalen|Sandalias de playa con plataforma|Sandales de plage à plateforme|Sandali da spiaggia con plateau|Sandały plażowe na platformie|Sandálias de praia com plataforma|厚底沙滩凉鞋
studded|studded|mit Nieten|con tachuelas|clouté|con borchie|z ćwiekami|com tachas|铆钉装饰
warm coat|Warm coat|Warmer Mantel|Abrigo cálido|Manteau chaud|Cappotto caldo|Ciepły płaszcz|Casaco quente|保暖外套
pants/shorts|Pants & shorts|Hosen und Shorts|Pantalones y shorts|Pantalons et shorts|Pantaloni e shorts|Spodnie i szorty|Calças e shorts|裤装与短裤
hoodies/sweaters|Hoodies & sweaters|Hoodies und Pullover|Sudaderas y jerséis|Sweats à capuche et pulls|Felpe e maglioni|Bluzy z kapturem i swetry|Moletons e suéteres|连帽衫与毛衣
short sets,short set|Short set|Sommer-Set|Conjunto corto|Ensemble court|Completo corto|Komplet z szortami|Conjunto com shorts|短装套装
other stuff|Other items|Sonstiges|Otros artículos|Autres articles|Altri articoli|Pozostałe produkty|Outros produtos|其他商品
headwear|Headwear|Kopfbedeckung|Gorro o sombrero|Couvre-chef|Copricapo|Nakrycia głowy|Bonés e chapéus|帽饰
accessories|Accessories|Accessoires|Accesorios|Accessoires|Accessori|Akcesoria|Acessórios|配饰
electronics|Electronics|Elektronik|Electrónica|Électronique|Elettronica|Elektronika|Eletrônicos|电子产品
quilted jacket|Quilted jacket|Steppjacke|Chaqueta acolchada|Veste matelassée|Giacca trapuntata|Kurtka pikowana|Jaqueta matelassê|绗缝夹克
puffer jacket,down jacket,down jackets,down coat|Down jacket|Daunenjacke|Plumífero|Doudoune|Piumino|Kurtka puchowa|Jaqueta de plumas|羽绒服
windbreaker,windbreakers|Windbreaker|Windjacke|Cortavientos|Coupe-vent|Giacca a vento|Wiatrówka|Corta-vento|防风夹克
knitted hat,beanie,beanies|Beanie|Strickmütze|Gorro de punto|Bonnet|Berretto in maglia|Czapka dzianinowa|Gorro de tricô|针织帽
bucket hat|Bucket hat|Fischerhut|Sombrero de pescador|Bob|Cappello da pescatore|Kapelusz rybacki|Chapéu bucket|渔夫帽
baseball cap|Baseball cap|Baseballkappe|Gorra de béisbol|Casquette de baseball|Cappellino da baseball|Czapka z daszkiem|Boné de beisebol|棒球帽
long sleeved shirt,long-sleeved shirt,long sleeve shirt|Long-sleeved shirt|Langarmhemd|Camisa de manga larga|Chemise à manches longues|Camicia a maniche lunghe|Koszula z długim rękawem|Camisa de manga longa|长袖衬衫
short sleeved shirt,short sleeve shirt|Short-sleeved shirt|Kurzarmhemd|Camisa de manga corta|Chemise à manches courtes|Camicia a maniche corte|Koszula z krótkim rękawem|Camisa de manga curta|短袖衬衫
longsleeves,longsleeve,long-sleeve t-shirt,long sleeve t-shirt,long-sleeved t-shirt|Long-sleeved T-shirt|Langarmshirt|Camiseta de manga larga|T-shirt à manches longues|Maglietta a maniche lunghe|Koszulka z długim rękawem|Camiseta de manga longa|长袖T恤
hoodies,hoodie,hooded sweatshirt,hoodi|Hoodie|Kapuzenpullover|Sudadera con capucha|Sweat à capuche|Felpa con cappuccio|Bluza z kapturem|Moletom com capuz|连帽衫
sweatshirts,sweatshirt,sweatsirt,sudadera,sudaderas|Sweatshirt|Sweatshirt|Sudadera|Sweat|Felpa|Bluza|Moletom|卫衣
sweaters,sweater,pullover,jumper|Sweater|Pullover|Jersey|Pull|Maglione|Sweter|Suéter|毛衣
t-shirts,t-shirt,t shirts,t shirt,tshirts,tshirt,t-sirt,t-shir,tees,tee,camiseta,camisetas|T-shirt|T-Shirt|Camiseta|T-shirt|Maglietta|Koszulka|Camiseta|T恤
denim jacket|Denim jacket|Jeansjacke|Chaqueta vaquera|Veste en jean|Giacca di jeans|Kurtka dżinsowa|Jaqueta jeans|牛仔夹克
jackets,jacket,cazadora,cazadoras,chaqueta|Jacket|Jacke|Chaqueta|Veste|Giacca|Kurtka|Jaqueta|夹克
cardigans,cardigan|Cardigan|Strickjacke|Cárdigan|Gilet en maille|Cardigan|Kardigan|Cardigã|针织开衫
coats,coat|Coat|Mantel|Abrigo|Manteau|Cappotto|Płaszcz|Casaco|大衣
vests,vest,chaleco|Vest|Weste|Chaleco|Gilet|Gilet|Kamizelka|Colete|背心
shirts,shirt,camisa|Shirt|Hemd|Camisa|Chemise|Camicia|Koszula|Camisa|衬衫
polo shirt,polo shirts,polo|Polo shirt|Poloshirt|Polo|Polo|Polo|Koszulka polo|Camisa polo|Polo衫
football jerseys,football jersey,soccer jersey|Football jersey|Fußballtrikot|Camiseta de fútbol|Maillot de football|Maglia da calcio|Koszulka piłkarska|Camisa de futebol|足球球衣
jerseys,jersey|Jersey|Trikot|Camiseta deportiva|Maillot|Maglia sportiva|Koszulka sportowa|Camisa esportiva|球衣
trousers,pants,pantalones|Pants|Hose|Pantalón|Pantalon|Pantaloni|Spodnie|Calças|长裤
sweatpants,joggers|Sweatpants|Jogginghose|Pantalón de chándal|Pantalon de jogging|Pantaloni da tuta|Spodnie dresowe|Calça de moletom|运动裤
cargo pants,cargo trousers|Cargo pants|Cargohose|Pantalón cargo|Pantalon cargo|Pantaloni cargo|Bojówki|Calça cargo|工装裤
shorts|Shorts|Shorts|Pantalón corto|Short|Shorts|Szorty|Shorts|短裤
jeans,jean|Jeans|Jeans|Vaqueros|Jean|Jeans|Dżinsy|Jeans|牛仔裤
tracksuits,tracksuit|Tracksuit|Trainingsanzug|Chándal|Survêtement|Tuta sportiva|Dres|Agasalho|运动套装
suits,suit,sets,set|Set|Set|Conjunto|Ensemble|Completo|Komplet|Conjunto|套装
underwear|Underwear|Unterwäsche|Ropa interior|Sous-vêtements|Intimo|Bielizna|Roupa íntima|内衣
briefs,boxers,boxer|Underpants|Unterhose|Calzoncillos|Slip|Mutande|Majtki|Cueca|内裤
tights,leggings|Leggings|Leggings|Mallas|Legging|Leggings|Legginsy|Legging|紧身裤
bikini,bikinis|Bikini|Bikini|Bikini|Bikini|Bikini|Bikini|Biquíni|比基尼
dress,dresses|Dress|Kleid|Vestido|Robe|Abito|Sukienka|Vestido|连衣裙
shoes,shoe,zapatos|Shoes|Schuhe|Zapatos|Chaussures|Scarpe|Buty|Calçados|鞋款
sneakers,sneaker,trainers,zapatillas|Sneakers|Sneaker|Zapatillas|Baskets|Sneaker|Sneakersy|Tênis|运动鞋
slides,slide,slippers,slipper|Slippers|Pantoletten|Chanclas|Mules|Ciabatte|Klapki|Chinelos|拖鞋
sandals,sandal|Sandals|Sandalen|Sandalias|Sandales|Sandali|Sandały|Sandálias|凉鞋
boots,boot|Boots|Stiefel|Botas|Bottes|Stivali|Buty z cholewką|Botas|靴子
loafers,loafer|Loafers|Slipper|Mocasines|Mocassins|Mocassini|Mokasyny|Mocassins|乐福鞋
socks,sock|Socks|Socken|Calcetines|Chaussettes|Calze|Skarpety|Meias|袜子
phone case,phone cases,mobile phone case|Phone case|Handyhülle|Funda de móvil|Coque de téléphone|Custodia per telefono|Etui na telefon|Capa de celular|手机壳
shoulder bag,crossbody bag,messenger bag|Shoulder bag|Umhängetasche|Bandolera|Sac à bandoulière|Borsa a tracolla|Torba na ramię|Bolsa tiracolo|斜挎包
tote bag,shopping bag|Tote bag|Tragetasche|Bolso tote|Cabas|Borsa shopper|Torba na zakupy|Bolsa de compras|托特包
bags,bag,bolso,bolsos|Bag|Tasche|Bolso|Sac|Borsa|Torba|Bolsa|包
handbags,handbag,purse|Handbag|Handtasche|Bolso de mano|Sac à main|Borsa a mano|Torebka|Bolsa de mão|手提包
backpack,backpacks|Backpack|Rucksack|Mochila|Sac à dos|Zaino|Plecak|Mochila|双肩包
wallets,wallet,walle,cartera|Wallet|Geldbörse|Cartera|Portefeuille|Portafoglio|Portfel|Carteira|钱包
card holder,cardholder|Card holder|Kartenetui|Tarjetero|Porte-cartes|Portacarte|Etui na karty|Porta-cartões|卡包
belts,belt,cinturón|Belt|Gürtel|Cinturón|Ceinture|Cintura|Pasek|Cinto|腰带
bracelets,bracelet,bangle,brazalete|Bracelet|Armband|Pulsera|Bracelet|Bracciale|Bransoletka|Pulseira|手链
necklaces,necklace|Necklace|Halskette|Collar|Collier|Collana|Naszyjnik|Colar|项链
earrings,earring|Earrings|Ohrringe|Pendientes|Boucles d’oreilles|Orecchini|Kolczyki|Brincos|耳环
rings,ring|Ring|Ring|Anillo|Bague|Anello|Pierścionek|Anel|戒指
watches,watch,reloj|Watch|Armbanduhr|Reloj|Montre|Orologio|Zegarek|Relógio|腕表
scarves,scarf|Scarf|Schal|Bufanda|Écharpe|Sciarpa|Szalik|Cachecol|围巾
hats,hat|Hat|Hut|Sombrero|Chapeau|Cappello|Kapelusz|Chapéu|帽子
caps,cap,gorra|Cap|Kappe|Gorra|Casquette|Cappellino|Czapka z daszkiem|Boné|棒球帽
sunglasses,sunglass|Sunglasses|Sonnenbrille|Gafas de sol|Lunettes de soleil|Occhiali da sole|Okulary przeciwsłoneczne|Óculos de sol|太阳镜
glasses,eyeglasses|Glasses|Brille|Gafas|Lunettes|Occhiali|Okulary|Óculos|眼镜
jewelry,jewellery|Jewelry|Schmuck|Joyas|Bijoux|Gioielli|Biżuteria|Joias|珠宝
perfumes,perfume,fragrance|Perfume|Parfüm|Perfume|Parfum|Profumo|Perfumy|Perfume|香水
gloves,glove|Gloves|Handschuhe|Guantes|Gants|Guanti|Rękawiczki|Luvas|手套
keychain,keyring|Key ring|Schlüsselanhänger|Llavero|Porte-clés|Portachiavi|Brelok|Chaveiro|钥匙扣
earbuds,earphones,headphones|Headphones|Kopfhörer|Auriculares|Écouteurs|Cuffie|Słuchawki|Fones de ouvido|耳机
hairdryer,hair dryer|Hair dryer|Haartrockner|Secador|Sèche-cheveux|Asciugacapelli|Suszarka do włosów|Secador de cabelo|吹风机
speakers,speaker|Speaker|Lautsprecher|Altavoz|Enceinte|Altoparlante|Głośnik|Alto-falante|扬声器
umbrella|Umbrella|Regenschirm|Paraguas|Parapluie|Ombrello|Parasol|Guarda-chuva|雨伞
plush|Plush toy|Plüschtier|Peluche|Peluche|Peluche|Pluszak|Pelúcia|毛绒玩具
mechanical watch|Mechanical watch|Mechanische Uhr|Reloj mecánico|Montre mécanique|Orologio meccanico|Zegarek mechaniczny|Relógio mecânico|机械表
styles,style,estilos|styles|Varianten|variantes|variantes|varianti|warianty|variantes|款式
colors,colours,color,colour,colores|colors|Farben|colores|coloris|colori|kolory|cores|配色
high quality,top quality,best quality|high quality|hochwertig|alta calidad|haute qualité|alta qualità|wysoka jakość|alta qualidade|高品质
high version|high version|höhere Ausführung|versión superior|version supérieure|versione superiore|wersja premium|versão premium|高配版
collection|collection|Kollektion|colección|collection|collezione|kolekcja|coleção|系列
series|series|Serie|serie|série|serie|seria|série|系列
version|version|Ausführung|versión|version|versione|wersja|versão|版本
women’s,women's,womens,women,woman,ladies|women’s|Damen|mujer|femme|donna|damskie|feminino|女款
men’s,men's,mens,men,man|men’s|Herren|hombre|homme|uomo|męskie|masculino|男款
children,kids|kids|Kinder|infantil|enfant|bambini|dziecięce|infantil|儿童
zip up,zip-up|zip-up|mit Reißverschluss|con cremallera|zippé|con zip|z zamkiem|com zíper|拉链款
long-sleeved,long sleeved,long sleeve,long sleeves|long sleeves|Langarm|manga larga|manches longues|maniche lunghe|z długim rękawem|mangas longas|长袖
short-sleeved,short sleeved,short sleeve,short sleeves|short sleeves|Kurzarm|manga corta|manches courtes|maniche corte|z krótkim rękawem|mangas curtas|短袖
limited edition|limited edition|Sonderedition|edición limitada|édition limitée|edizione limitata|edycja limitowana|edição limitada|限量版
cotton|cotton|Baumwolle|algodón|coton|cotone|bawełna|algodão|棉
leather|leather|Leder|piel|cuir|pelle|skóra|couro|皮革
canvas|canvas|Canvas|lona|toile|tela|płótno|lona|帆布
denim|denim|Denim|tejido vaquero|denim|denim|denim|jeans|牛仔布
knitted,knit|knit|Strick|punto|maille|maglia|dzianinowy|de tricô|针织
embroidered|embroidered|bestickt|bordado|brodé|ricamato|haftowany|bordado|刺绣
graphic print,printed|printed|bedruckt|estampado|imprimé|stampato|nadruk graficzny|estampa gráfica|印花
quilted|quilted|gesteppt|acolchado|matelassé|trapuntato|pikowany|matelassê|绗缝
distressed|distressed|Used-Look|efecto desgastado|effet usé|effetto usurato|postarzany|desgastado|做旧
slim fit|slim fit|schmale Passform|corte ajustado|coupe ajustée|vestibilità aderente|dopasowany krój|corte ajustado|修身
wide leg|wide leg|weites Bein|pernera ancha|jambes larges|gamba larga|szeroka nogawka|perna larga|阔腿
wireless|wireless|kabellos|inalámbrico|sans fil|senza fili|bezprzewodowy|sem fio|无线
black|black|Schwarz|negro|noir|nero|czarny|preto|黑色
white|white|Weiß|blanco|blanc|bianco|biały|branco|白色
blue|blue|Blau|azul|bleu|blu|niebieski|azul|蓝色
green|green|Grün|verde|vert|verde|zielony|verde|绿色
red|red|Rot|rojo|rouge|rosso|czerwony|vermelho|红色
pink|pink|Rosa|rosa|rose|rosa|różowy|rosa|粉色
grey,gray|grey|Grau|gris|gris|grigio|szary|cinza|灰色
brown|brown|Braun|marrón|marron|marrone|brązowy|marrom|棕色
gold|gold|Gold|dorado|or|oro|złoty|dourado|金色
silver|silver|Silber|plateado|argent|argento|srebrny|prateado|银色
iphone case|iPhone case|iPhone-Hülle|Funda para iPhone|Coque pour iPhone|Custodia per iPhone|Etui na iPhone|Capa de iPhone|iPhone 手机壳
flip-flops,flip flops|Flip-flops|Zehentrenner|Chanclas|Tongs|Infradito|Japonki|Chinelos de dedo|人字拖
clogs|Clogs|Clogs|Zuecos|Sabots|Zoccoli|Chodaki|Tamancos|包头拖鞋
mules|Mules|Pantoletten|Mules|Mules|Sabot|Klapki mule|Mules|穆勒鞋
high heel,high heels|High heels|Pumps|Zapatos de tacón|Talons hauts|Tacchi alti|Buty na obcasie|Sapatos de salto alto|高跟鞋
ski goggles|Ski goggles|Skibrille|Gafas de esquí|Masque de ski|Maschera da sci|Gogle narciarskie|Óculos de esqui|滑雪镜
waist pack,belt bag|Waist pack|Gürteltasche|Riñonera|Sac banane|Marsupio|Nerka|Pochete|腰包
minibag,mini bag|Mini bag|Minitasche|Minibolso|Mini-sac|Mini borsa|Mała torebka|Minibolsa|迷你包
card case|Card case|Kartenetui|Tarjetero|Porte-cartes|Portacarte|Etui na karty|Porta-cartões|卡包
slacks|Slacks|Stoffhose|Pantalón de vestir|Pantalon habillé|Pantaloni eleganti|Spodnie wizytowe|Calças sociais|休闲西裤
zip jacket|Zip jacket|Reißverschlussjacke|Chaqueta con cremallera|Veste zippée|Giacca con zip|Kurtka na zamek|Jaqueta com zíper|拉链夹克
goggles|Goggles|Schutzbrille|Gafas protectoras|Lunettes de protection|Occhiali protettivi|Gogle|Óculos de proteção|护目镜
mask|Mask|Maske|Máscara|Masque|Maschera|Maska|Máscara|面罩
camping mug|Camping mug|Campingbecher|Taza de camping|Tasse de camping|Tazza da campeggio|Kubek turystyczny|Caneca de camping|露营杯
stainless steel|stainless steel|Edelstahl|acero inoxidable|acier inoxydable|acciaio inossidabile|stal nierdzewna|aço inoxidável|不锈钢
drawstring|drawstring|Kordelzug|cordón ajustable|cordon de serrage|coulisse|sznurek|cordão|抽绳
crew neck,crewneck|crew neck|Rundhals|cuello redondo|col rond|girocollo|okrągły dekolt|gola redonda|圆领
crew neck top,yoga top,top|Top|Oberteil|Top|Haut|Top|Top|Blusa|上衣
tanks,tank top|Tank top|Tanktop|Camiseta de tirantes|Débardeur|Canotta|Top bez rękawów|Regata|吊带背心
new arrival,new arrivals|new arrival|Neuheit|novedad|nouveauté|novità|nowość|novidade|新款
new|new|neu|nuevo|nouveau|nuovo|nowy|novo|新款
classic|classic|klassisch|clásico|classique|classico|klasyczny|clássico|经典款
loose-fitting,loose fitting,loose|loose fit|weite Passform|corte holgado|coupe ample|vestibilità ampia|luźny krój|modelagem ampla|宽松版型
casual|casual|lässig|informal|décontracté|casual|codzienny|casual|休闲
comfortable|comfortable|bequem|cómodo|confortable|comodo|wygodny|confortável|舒适款
design|design|Design|diseño|design|design|wzór|design|设计
new design|new design|neues Design|nuevo diseño|nouveau design|nuovo design|nowy wzór|novo design|新设计
patchwork|patchwork|Patchwork|patchwork|patchwork|patchwork|patchwork|patchwork|拼接
striped|striped|gestreift|a rayas|rayé|a righe|w paski|listrado|条纹
crew|crew|Crew|crew|crew|crew|o okrągłym dekolcie|de gola redonda|圆领
lightweight|lightweight|leicht|ligero|léger|leggero|lekki|leve|轻量
reversible|reversible|wendbar|reversible|réversible|reversibile|dwustronny|reversível|双面
winter|winter|Winter|invierno|hiver|inverno|zimowy|de inverno|冬季
sports|sports|Sport|deporte|sport|sport|sportowy|esportivo|运动
vintage|vintage|Vintage|vintage|vintage|vintage|vintage|vintage|复古
fleece|fleece|Fleece|forro polar|polaire|pile|polar|fleece|摇粒绒
printed,print|print|Druck|estampado|imprimé|stampa|nadruk|estampa|印花
pendant|pendant|Anhänger|colgante|pendentif|ciondolo|zawieszka|pingente|吊坠
jewelled,rhinestone|rhinestone|Strass|pedrería|strass|strass|cyrkonie|strass|水钻
half-zip|half zip|halber Reißverschluss|media cremallera|demi-zip|mezza zip|krótki zamek|meio zíper|半拉链
full zip|full zip|durchgehender Reißverschluss|cremallera completa|zip intégral|zip intera|pełny zamek|zíper inteiro|全拉链
best quality,bese quality|high quality|hochwertig|alta calidad|haute qualité|alta qualità|wysoka jakość|alta qualidade|高品质
styles available|styles available|Varianten verfügbar|variantes disponibles|variantes disponibles|varianti disponibili|dostępne warianty|variantes disponíveis|可选款式
best|best|beste|mejor|meilleur|migliore|najlepszy|melhor|优选
stylish|stylish|modisch|de moda|élégant|alla moda|stylowy|elegante|时尚款
and|and|und|y|et|e|i|e|和
with|with|mit|con|avec|con|z|com|带
wind breaker|Windbreaker|Windjacke|Cortavientos|Coupe-vent|Giacca a vento|Wiatrówka|Corta-vento|防风夹克
hair straighteners,hair straightener,straightener|Hair straightener|Haarglätter|Plancha de pelo|Lisseur|Piastra per capelli|Prostownica|Prancha de cabelo|直发器
ski googles|Ski goggles|Skibrille|Gafas de esquí|Masque de ski|Maschera da sci|Gogle narciarskie|Óculos de esqui|滑雪镜
trainers,trainer,snrakersa|Trainers|Sneaker|Zapatillas|Baskets|Sneakers|Sneakersy|Tênis|运动鞋
headset|Headset|Headset|Auriculares|Casque audio|Cuffie|Zestaw słuchawkowy|Headset|耳机
mobile phone,cell phone|Mobile phone|Mobiltelefon|Teléfono móvil|Téléphone portable|Cellulare|Telefon komórkowy|Celular|手机
phone holder|Phone holder|Handyhalterung|Soporte para móvil|Support de téléphone|Supporto per telefono|Uchwyt na telefon|Suporte para celular|手机支架
car mounted|Car-mounted|fürs Auto|para coche|pour voiture|per auto|samochodowy|para carro|车载
puffers,puffer|Puffer jacket|Steppjacke|Chaqueta acolchada|Doudoune|Piumino|Kurtka puchowa|Jaqueta acolchoada|棉服
sunglasses,sunglass|Sunglasses|Sonnenbrille|Gafas de sol|Lunettes de soleil|Occhiali da sole|Okulary przeciwsłoneczne|Óculos de sol|太阳镜
pulsera|Bracelet|Armband|Pulsera|Bracelet|Bracciale|Bransoletka|Pulseira|手链
vestido|Dress|Kleid|Vestido|Robe|Abito|Sukienka|Vestido|连衣裙
bolsa|Bag|Tasche|Bolso|Sac|Borsa|Torba|Bolsa|包袋
pantalón corto,antalón corto|Shorts|Shorts|Pantalón corto|Short|Pantaloncini|Szorty|Shorts|短裤
gift box|Gift box|Geschenkbox|Caja de regalo|Coffret cadeau|Confezione regalo|Pudełko prezentowe|Caixa de presente|礼盒
duffle bag,duffel bag|Travel bag|Reisetasche|Bolsa de viaje|Sac de voyage|Borsone|Torba podróżna|Bolsa de viagem|旅行包
waist bag|Waist bag|Gürteltasche|Riñonera|Sac banane|Marsupio|Nerka|Pochete|腰包
hand luggage|Hand luggage|Handgepäck|Equipaje de mano|Bagage à main|Bagaglio a mano|Bagaż podręczny|Bagagem de mão|随身行李
duffle,duffel|Travel bag|Reisetasche|Bolsa de viaje|Sac de voyage|Borsone|Torba podróżna|Bolsa de viagem|旅行包
flip-flop,flip flop|Flip-flop|Zehentrenner|Chancla|Tong|Infradito|Japonka|Chinelo de dedo|人字拖
dress shirt|Dress shirt|Oberhemd|Camisa de vestir|Chemise habillée|Camicia elegante|Koszula wizytowa|Camisa social|正装衬衫
training shoes,running shoes|Running shoes|Laufschuhe|Zapatillas de running|Chaussures de course|Scarpe da corsa|Buty do biegania|Tênis de corrida|跑鞋
hooded jacket|Hooded jacket|Kapuzenjacke|Chaqueta con capucha|Veste à capuche|Giacca con cappuccio|Kurtka z kapturem|Jaqueta com capuz|连帽夹克
denim shorts|Denim shorts|Jeansshorts|Pantalones cortos vaqueros|Short en jean|Pantaloncini di jeans|Szorty dżinsowe|Shorts jeans|牛仔短裤
boxer briefs|Boxer briefs|Boxershorts|Bóxers|Boxers|Boxer|Bokserki|Cueca boxer|平角内裤
button down shirt|Button-down shirt|Button-down-Hemd|Camisa con cuello abotonado|Chemise à col boutonné|Camicia con colletto button-down|Koszula z kołnierzykiem na guziki|Camisa com colarinho abotoado|纽扣领衬衫
jacket for men|Men’s jacket|Herrenjacke|Chaqueta de hombre|Veste pour homme|Giacca da uomo|Kurtka męska|Jaqueta masculina|男士夹克
sneaker shoes,shoes sneakers|Sneakers|Sneaker|Zapatillas|Baskets|Sneakers|Sneakersy|Tênis|运动鞋
protective case|Protective case|Schutzhülle|Funda protectora|Coque de protection|Custodia protettiva|Etui ochronne|Capa protetora|保护壳
hair clip|Hair clip|Haarspange|Pinza de pelo|Barrette|Fermaglio per capelli|Spinka do włosów|Presilha de cabelo|发夹
bag decoration|Bag charm|Taschenanhänger|Colgante para bolso|Bijou de sac|Charm per borsa|Zawieszka do torby|Pingente de bolsa|包饰
reflective|reflective|reflektierend|reflectante|réfléchissant|riflettente|odblaskowy|refletivo|反光
unisex|unisex|Unisex|unisex|unisexe|unisex|unisex|unissex|男女通用
waterproof|waterproof|wasserdicht|impermeable|imperméable|impermeabile|wodoodporny|impermeável|防水
hooded|hooded|mit Kapuze|con capucha|à capuche|con cappuccio|z kapturem|com capuz|连帽
clothing,clothes|Clothing|Kleidung|Ropa|Vêtements|Abbigliamento|Odzież|Roupas|服装
shoulder|shoulder|Schulter|hombro|épaule|spalla|ramię|ombro|肩
long socks|Long socks|Lange Socken|Calcetines largos|Chaussettes hautes|Calze lunghe|Długie skarpety|Meias longas|长袜
clog|Clog|Clog|Zueco|Sabot|Zoccolo|Chodak|Tamanco|木屐
cherry|cherry|Kirsche|cereza|cerise|ciliegia|wiśnia|cereja|樱桃
cotton clothes|Cotton clothing|Baumwollkleidung|Ropa de algodón|Vêtements en coton|Abbigliamento in cotone|Odzież bawełniana|Roupa de algodão|棉质服装
running|running|Laufen|running|course|corsa|bieganie|corrida|跑步
style,styles available|Style|Variante|Variante|Variante|Variante|Wariant|Variante|款式
`.trim().split('\n').map(row => row.split('|'));
const protectedNames = ['New York City','New Balance NB','New Rock','New Look','New Era Cap','New Balance Numeric','New Balance Made in USA','New Balance Made in UK','Nike Air Force 1 Low','Air Jordan 1 Low','Air Jordan 1 High','Jordan 1 Low','Jordan 1 High','Dolce and Gabbana','Burberry London','A Bathing Ape','Louis Vuitton','Miu Miu','The Row','New Era','New York','New Orleans','New Jersey','New England','Chrome Hearts','Fear of God','Stone Island','New Balance','Stone Roses','Golden State','White Mountaineering','Black Sabbath','Black Scale','Black Diamond','Red Bull','Red Sox','Pink Panther','Blue Jays','Green Bay','Golden Goose','The North Face','Stone Island','Fear of God','Off White','Off-White','White Mountaineering','Canada Goose','New Balance','Palm Angels','Chrome Hearts','Golden Goose','Red Wing','Blue Moon','Blue Version','Nike Air Force','Air Jordan','Air Max','Apple Watch','Apple Watch Series','Polo Ralph Lauren','Polo Bear','Pink Floyd','Black Cat','Black Phantom','Black Opium','Black Orchid','White Fox','Broken Planet','Silver Bullet','Blue Tint','Pure White','Air Force','Purple Brand','Green Goblin','Red Thunder','Blue Chill','Brown Thomas','Stone Cold','Gold Label','Silver Shadow','Gold Collection','Black Label'];

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function wordPattern(words) {
  return new RegExp('(?<![\\p{L}])(?:' + [...words].sort((a,b) => b.length-a.length).map(escapeRegExp).join('|') + ')(?![\\p{L}])','giu');
}
const brandNames = new Set(protectedNames.map(v => v.toLowerCase()));
const preferredSearchTerm = {
  'puffer jacket':'down jacket', suits:'set', sneakers:'sneaker', trousers:'pants', slides:'slipper',
  'short sleeved shirt':'short sleeve shirt', 'long sleeved shirt':'long sleeve shirt', sweatpants:'jogger'
};
// Additional terms observed in live catalog titles. Each row follows the language selector order.
const descriptorRows = `
splatter paint graffiti jeans,paint splatter graffiti jeans|Jeans mit Graffiti und Farbspritzern|vaqueros con grafitis y salpicaduras de pintura|jean à graffitis et éclaboussures de peinture|jeans con graffiti e schizzi di vernice|dżinsy z graffiti i rozpryskami farby|jeans com grafite e respingos de tinta|泼墨涂鸦牛仔裤|jeans met graffiti en verfspatten|blugi cu graffiti și stropi de vopsea|jeans med graffiti och färgstänk|jeans med graffiti og malingstænk|graffiti- ja maaliroiskekuvioiset farkut|τζιν με γκράφιτι και πιτσιλιές μπογιάς|džíny s graffiti a cákanci barvy|graffitis, festékfröccsenéses farmer|дънки с графити и пръски боя|džínsy s grafitmi a fŕkancami farby|traperice s grafitima i mrljama boje|ペンキ飛沫とグラフィティ柄のジーンズ|페인트 스플래터 그래피티 청바지|quần jeans họa tiết graffiti và vệt sơn bắn|กางเกงยีนส์ลายกราฟฟิตีและสีสาด|jeans bermotif grafiti dan percikan cat
vintage washed denim jeans|Jeans in Vintage-Waschung|vaqueros con lavado vintage|jean délavé de style vintage|jeans in denim con lavaggio vintage|dżinsy z efektem sprania vintage|jeans com lavagem vintage|复古水洗牛仔裤|jeans met vintagewassing|blugi cu aspect vintage prespălat|jeans med vintagetvätt|jeans med vintagevask|vintagepestyt farkut|τζιν με vintage ξεθώριασμα|džíny s vintage opráním|vintage mosású farmer|дънки с винтидж избелване|džínsy s vintage praním|traperice s vintage efektom ispiranja|ヴィンテージウォッシュのジーンズ|빈티지 워싱 청바지|quần jeans giặt bạc màu phong cách vintage|กางเกงยีนส์ฟอกสไตล์วินเทจ|jeans dengan efek pudar vintage
distressed wide-leg jeans|weite Jeans im Used-Look|vaqueros de pernera ancha con efecto desgastado|jean large effet usé|jeans a gamba larga effetto usurato|dżinsy z szerokimi nogawkami i przetarciami|jeans de pernas largas com efeito desgastado|做旧阔腿牛仔裤|wijde jeans met versleten afwerking|blugi largi cu aspect uzat|vida jeans med slitningar|jeans med brede ben og slidt look|kulutetut leveälahkeiset farkut|φαρδύ τζιν με φθορές|džíny se širokými nohavicemi a odřeným vzhledem|bő szárú koptatott farmer|широки дънки със състарен ефект|široké džínsy s obnoseným vzhľadom|široke traperice s pohabanim detaljima|ダメージ加工のワイドジーンズ|디스트레스드 와이드 청바지|quần jeans ống rộng tạo hiệu ứng sờn|กางเกงยีนส์ขากว้างแต่งขาด|jeans lebar beraksen usang
quick-drying pants|schnell trocknende Hose|pantalón de secado rápido|pantalon à séchage rapide|pantaloni ad asciugatura rapida|szybkoschnące spodnie|calça de secagem rápida|速干裤|sneldrogende broek|pantaloni cu uscare rapidă|snabbtorkande byxor|hurtigttørrende bukser|nopeasti kuivuvat housut|παντελόνι που στεγνώνει γρήγορα|rychleschnoucí kalhoty|gyorsan száradó nadrág|бързосъхнещ панталон|rýchloschnúce nohavice|brzosušeće hlače|速乾パンツ|속건성 바지|quần nhanh khô|กางเกงแห้งเร็ว|celana cepat kering
classic loose-fitting crew neck|klassischer, locker geschnittener Rundhalsstil|diseño clásico holgado de cuello redondo|coupe ample classique à col rond|modello classico ampio a girocollo|klasyczny luźny krój z okrągłym dekoltem|modelo clássico de corte solto com gola redonda|经典宽松圆领款|klassiek ruim model met ronde hals|croială clasică lejeră cu guler rotund|klassisk ledig modell med rund halsringning|klassisk løs model med rund hals|klassinen väljä malli pyöreällä pääntiellä|κλασική άνετη γραμμή με στρογγυλή λαιμόκοψη|klasický volný střih s kulatým výstřihem|klasszikus bő szabás, kerek nyakkivágás|класически свободен модел с обло деколте|klasický voľný strih s okrúhlym výstrihom|klasičan širok kroj s okruglim izrezom|クラシックなゆったりしたクルーネック|클래식 루즈핏 크루넥|kiểu cổ tròn dáng rộng cổ điển|ทรงหลวมคอกลมแบบคลาสสิก|model klasik berpotongan longgar dan berkerah bulat
letter-embroidered,letter embroidered|mit Buchstabenstickerei|con letras bordadas|à lettres brodées|con lettere ricamate|z haftowanymi literami|com letras bordadas|字母刺绣|met geborduurde letters|cu litere brodate|med broderade bokstäver|med broderede bogstaver|kirjaimin kirjailtu|με κεντημένα γράμματα|s vyšívanými písmeny|hímzett betűkkel|с бродирани букви|s vyšívanými písmenami|s izvezenim slovima|レタリング刺繍入り|레터링 자수|thêu chữ|ปักตัวอักษร|bersulam huruf
butterfly|Schmetterling|mariposa|papillon|farfalla|motyl|borboleta|蝴蝶|vlinder|fluture|fjäril|sommerfugl|perhonen|πεταλούδα|motýl|pillangó|пеперуда|motýľ|leptir|蝶|나비|bướm|ผีเสื้อ|kupu-kupu
new drawstring|neues Modell mit Kordelzug|nuevo modelo con cordón ajustable|nouveau modèle à cordon de serrage|nuovo modello con coulisse|nowy model ze ściągaczem|novo modelo com cordão ajustável|新款抽绳设计|nieuw model met trekkoord|model nou cu șnur reglabil|ny modell med dragsko|ny model med løbesnor|uusi malli kiristysnyörillä|νέο σχέδιο με κορδόνι|nový model se stahovací šňůrkou|új húzózsinóros modell|нов модел с връзка за пристягане|nový model so sťahovacou šnúrkou|novi model s vezicom za stezanje|新作ドローコードデザイン|신상 드로스트링 디자인|mẫu mới có dây rút|ดีไซน์เชือกรูดแบบใหม่|model baru bertali serut
embroidered chocolate|schokoladenbraun mit Stickerei|marrón chocolate con bordados|brun chocolat brodé|color cioccolato con ricamo|czekoladowy z haftem|marrom chocolate com bordado|巧克力色刺绣款|chocoladebruin met borduurwerk|ciocolatiu cu broderie|chokladbrun med broderi|chokoladebrun med broderi|suklaanruskea, kirjailtu|σοκολατί με κέντημα|čokoládově hnědý s výšivkou|csokoládébarna, hímzéssel|шоколадовокафяв с бродерия|čokoládovohnedý s výšivkou|čokoladnosmeđi s vezom|チョコレート色の刺繍入り|초콜릿색 자수 디자인|màu nâu sô cô la có thêu|สีน้ำตาลช็อกโกแลตพร้อมงานปัก|cokelat tua dengan sulaman
closed-toe roman sandals|geschlossene Römersandalen|sandalias romanas de punta cerrada|spartiates à bout fermé|sandali alla romana a punta chiusa|sandały rzymianki z zakrytymi palcami|sandálias romanas de bico fechado|包头罗马凉鞋|Romeinse sandalen met gesloten neus|sandale romane cu vârf închis|romerska sandaler med stängd tå|romerske sandaler med lukket tå|umpikärkiset roomalaissandaalit|ρωμαϊκά σανδάλια με κλειστά δάχτυλα|římské sandály s uzavřenou špičkou|zárt orrú római szandál|римски сандали със затворени пръсти|rímske sandále s uzavretou špičkou|rimske sandale sa zatvorenim prstima|つま先を覆うグラディエーターサンダル|앞이 막힌 글래디에이터 샌들|xăng đan La Mã bít mũi|รองเท้าแตะกลาดิเอเตอร์แบบปิดหัว|sandal Romawi berujung tertutup
new baroque flip-flops|neue Zehentrenner im Barockstil|nuevas chanclas de estilo barroco|nouvelles tongs de style baroque|nuove infradito in stile barocco|nowe japonki w stylu barokowym|novos chinelos de estilo barroco|新款巴洛克风格人字拖|nieuwe teenslippers in barokstijl|șlapi noi în stil baroc|nya flipflops i barockstil|nye klipklapper i barokstil|uudet barokkityyliset varvassandaalit|νέες σαγιονάρες σε μπαρόκ στιλ|nové žabky v barokním stylu|új barokk stílusú papucs|нови джапанки в бароков стил|nové žabky v barokovom štýle|nove japanke u baroknom stilu|新作バロック調ビーチサンダル|신상 바로크풍 플립플롭|dép xỏ ngón kiểu Baroque mới|รองเท้าแตะคีบสไตล์บาโรกแบบใหม่|sandal jepit bergaya barok terbaru
casual|lässig|informal|décontracté|casual|casualowy|casual|休闲|casual|casual|ledig|afslappet|rento|καθημερινό|ležérní|lezser|ежедневен|ležérny|ležeran|カジュアル|캐주얼|thường ngày|ลำลอง|kasual
straight-leg pants|Hose mit geradem Bein|pantalón de pierna recta|pantalon droit|pantaloni a gamba dritta|spodnie z prostą nogawką|calça de corte reto|直筒裤|broek met rechte pijpen|pantaloni drepți|byxor med raka ben|bukser med lige ben|suorat housut|παντελόνι σε ίσια γραμμή|kalhoty s rovnými nohavicemi|egyenes szárú nadrág|панталон с прав крачол|nohavice s rovným strihom|hlače ravnih nogavica|ストレートパンツ|스트레이트 팬츠|quần ống đứng|กางเกงทรงตรง|celana potongan lurus
with laces,lace-up|zum Schnüren|con cordones|à lacets|con lacci|sznurowane|com cadarços|系带|met veters|cu șireturi|med snörning|med snørebånd|nauhallinen|με κορδόνια|se šněrováním|fűzős|с връзки|so šnúrkami|s vezicama|レースアップ|레이스업|có dây buộc|แบบผูกเชือก|bertali
new arrival,new arrivals,new|Neuheit|novedad|nouveauté|novità|nowość|novidade|新款|nieuw|noutate|nyhet|nyhed|uutuus|νέα άφιξη|novinka|újdonság|нов модел|novinka|novitet|新作|신상품|mẫu mới|มาใหม่|model baru
stylish,fashionable|stilvoll|con estilo|élégant|elegante|stylowy|elegante|时尚|stijlvol|elegant|snygg|stilfuld|tyylikäs|κομψό|stylový|stílusos|стилен|štýlový|moderan|スタイリッシュ|세련된|sành điệu|มีสไตล์|bergaya
simple|schlicht|sencillo|simple|semplice|prosty|simples|简约|eenvoudig|simplu|enkel|enkel|yksinkertainen|απλό|jednoduchý|egyszerű|изчистен|jednoduchý|jednostavan|シンプル|심플|đơn giản|เรียบง่าย|sederhana
fashion|Mode|moda|mode|moda|moda|moda|时尚|mode|modă|mode|mode|muoti|μόδα|móda|divat|мода|móda|moda|ファッション|패션|thời trang|แฟชั่น|mode
running shoes,running sneakers|Laufschuhe|zapatillas de running|chaussures de running|scarpe da corsa|buty do biegania|tênis de corrida|跑鞋|hardloopschoenen|pantofi de alergare|löparskor|løbesko|juoksukengät|παπούτσια τρεξίματος|běžecké boty|futócipő|обувки за бягане|bežecká obuv|tenisice za trčanje|ランニングシューズ|러닝화|giày chạy bộ|รองเท้าวิ่ง|sepatu lari
multicolor,multi-color,multi-colorway,multicolour|mehrfarbig|multicolor|multicolore|multicolore|wielokolorowy|multicolorido|多色|veelkleurig|multicolor|flerfärgad|flerfarvet|monivärinen|πολύχρωμο|vícebarevný|többszínű|многоцветен|viacfarebný|višebojni|マルチカラー|다색|nhiều màu|หลากสี|aneka warna
low-top sneakers,low top sneakers|Halbsneaker|zapatillas de caña baja|baskets basses|sneakers basse|niskie sneakersy|tênis de cano baixo|低帮运动鞋|lage sneakers|teniși cu guler jos|låga sneakers|lave sneakers|matalavartiset tennarit|χαμηλά αθλητικά παπούτσια|nízké tenisky|alacsony szárú sportcipő|ниски маратонки|nízke tenisky|niske tenisice|ローカットスニーカー|로우탑 스니커즈|giày thể thao cổ thấp|รองเท้าผ้าใบหุ้มส้นทรงเตี้ย|sepatu kets berpotongan rendah
wristwatch,wristwatches|Armbanduhr|reloj de pulsera|montre-bracelet|orologio da polso|zegarek na rękę|relógio de pulso|腕表|polshorloge|ceas de mână|armbandsur|armbåndsur|rannekello|ρολόι χειρός|náramkové hodinky|karóra|ръчен часовник|náramkové hodinky|ručni sat|腕時計|손목시계|đồng hồ đeo tay|นาฬิกาข้อมือ|jam tangan
mechanical|mechanisch|mecánico|mécanique|meccanico|mechaniczny|mecânico|机械|mechanisch|mecanic|mekanisk|mekanisk|mekaaninen|μηχανικό|mechanický|mechanikus|механичен|mechanický|mehanički|機械式|기계식|cơ khí|กลไก|mekanis
diamond,diamonds|Diamant|diamante|diamant|diamante|diament|diamante|钻石|diamant|diamant|diamant|diamant|timantti|διαμάντι|diamant|gyémánt|диамант|diamant|dijamant|ダイヤモンド|다이아몬드|kim cương|เพชร|berlian
drawstring|Kordelzug|cordón ajustable|cordon de serrage|coulisse|ściągacz|cordão ajustável|抽绳|trekkoord|șnur reglabil|dragsko|løbesnor|kiristysnyöri|κορδόνι περίσφιξης|stahovací šňůrka|húzózsinór|връзка за пристягане|sťahovacia šnúrka|vezica za stezanje|ドローコード|드로스트링|dây rút|เชือกรูด|tali serut
washed|gewaschen|lavado|délavé|lavato|sprany|lavado|水洗|gewassen|prespălat|tvättad|vasket|pesty|ξεβαμμένο|sepraný|mosott|пран|praný|isprani|ウォッシュ加工|워싱 가공|giặt wash|ฟอก|dicuci
distressed|im Used-Look|desgastado|effet usé|effetto usurato|postarzany|desgastado|做旧|verweerd|uzat|sliten|slidt|kulutettu|φθαρμένο|obnošený vzhled|koptatott|състарен|ošúchaný|iznošen izgled|ダメージ加工|디스트레스드|kiểu sờn rách|แต่งขาด|efek usang
and|und|y|et|e|i|e|和|en|și|och|og|ja|και|a|és|и|a|i|・|및|và|และ|dan
with|mit|con|avec|con|z|com|带|met|cu|med|med|sisältää|με|s|és|с|s|s|付き|포함|với|พร้อม|dengan
logo|Logo|Logotipo|Logo|Logo|Logo|Logotipo|标志|Logo|Siglă|Logotyp|Logo|Logo|Λογότυπο|Logo|Logó|Лого|Logo|Logotip|ロゴ|로고|Biểu trưng|โลโก้|Logo
tracksuit,tracksuits|Trainingsanzug|Chándal|Survêtement|Tuta sportiva|Dres|Fato de treino|运动套装|Trainingspak|Trening|Träningsoverall|Træningsdragt|Verryttelypuku|Φόρμα|Tepláková souprava|Melegítő|Анцуг|Tepláková súprava|Trenirka|トラックスーツ|트레이닝복|Bộ đồ thể thao|ชุดวอร์ม|Setelan olahraga
longsleeve,longsleeves|Langarmshirt|Camiseta de manga larga|T-shirt à manches longues|Maglia a maniche lunghe|Koszulka z długim rękawem|Camiseta de manga comprida|长袖上衣|Shirt met lange mouwen|Bluză cu mânecă lungă|Långärmad tröja|Langærmet trøje|Pitkähihainen paita|Μακρυμάνικη μπλούζα|Tričko s dlouhým rukávem|Hosszú ujjú felső|Блуза с дълъг ръкав|Tričko s dlhým rukávom|Majica dugih rukava|長袖シャツ|긴팔 셔츠|Áo dài tay|เสื้อแขนยาว|Atasan lengan panjang
fleece|Fleece|Forro polar|Polaire|Pile|Polar|Tecido polar|抓绒|Fleece|Polar|Fleece|Fleece|Fleece|Φλις|Flís|Polár|Полар|Flís|Flis|フリース|플리스|Nỉ lông|ผ้าฟลีซ|Fleece
baseball cap,baseball caps|Baseballkappe|Gorra de béisbol|Casquette de baseball|Cappellino da baseball|Czapka bejsbolowa|Boné de beisebol|棒球帽|Baseballpet|Șapcă de baseball|Basebollkeps|Baseballkasket|Baseball-lippis|Καπέλο μπέιζμπολ|Baseballová čepice|Baseballsapka|Бейзболна шапка|Baseballová šiltovka|Bejzbolska kapa|ベースボールキャップ|야구 모자|Mũ bóng chày|หมวกเบสบอล|Topi bisbol
monogram|Monogramm|Monograma|Monogramme|Monogramma|Monogram|Monograma|字母组合|Monogram|Monogramă|Monogram|Monogram|Monogrammi|Μονόγραμμα|Monogram|Monogram|Монограм|Monogram|Monogram|モノグラム|모노그램|Chữ lồng|โมโนแกรม|Monogram
classic|Klassisch|Clásico|Classique|Classico|Klasyczny|Clássico|经典款|Klassiek|Clasic|Klassisk|Klassisk|Klassinen|Κλασικό|Klasický|Klasszikus|Класически|Klasický|Klasični|クラシック|클래식|Cổ điển|คลาสสิก|Klasik
vintage|Vintage|Vintage|Vintage|Vintage|Vintage|Vintage|复古|Vintage|Vintage|Vintage|Vintage|Vintage|Βίντατζ|Vintage|Vintage|Винтидж|Vintage|Vintage|ヴィンテージ|빈티지|Phong cách hoài cổ|วินเทจ|Vintage
collection,collections|Kollektion|Colección|Collection|Collezione|Kolekcja|Coleção|系列|Collectie|Colecție|Kollektion|Kollektion|Mallisto|Συλλογή|Kolekce|Kollekció|Колекция|Kolekcia|Kolekcija|コレクション|컬렉션|Bộ sưu tập|คอลเลกชัน|Koleksi
chain,chains|Kette|Cadena|Chaîne|Catena|Łańcuszek|Corrente|链条|Ketting|Lanț|Kedja|Kæde|Ketju|Αλυσίδα|Řetízek|Lánc|Верижка|Retiazka|Lanac|チェーン|체인|Dây xích|โซ่|Rantai
embroidered|mit Stickerei|con bordado|avec broderie|con ricamo|z haftem|com bordado|刺绣|met borduursel|cu broderie|med broderi|med broderi|kirjailtu|με κέντημα|s výšivkou|hímzett|с бродерия|s výšivkou|s vezom|刺繍入り|자수|thêu|ปักลาย|bersulam
loafers,loafer|Loafer|Mocasines|Mocassins|Mocassini|Mokasyny|Mocassins|乐福鞋|Loafers|Mocasini|Loafers|Loafers|Loaferit|Μοκασίνια|Mokasíny|Mokaszin|Мокасини|Mokasíny|Mokasinke|ローファー|로퍼|Giày lười|รองเท้าโลฟเฟอร์|Loafer
gloves,glove|Handschuhe|Guantes|Gants|Guanti|Rękawiczki|Luvas|手套|Handschoenen|Mănuși|Handskar|Handsker|Käsineet|Γάντια|Rukavice|Kesztyű|Ръкавици|Rukavice|Rukavice|手袋|장갑|Găng tay|ถุงมือ|Sarung tangan
keychain,keychains|Schlüsselanhänger|Llavero|Porte-clés|Portachiavi|Brelok|Porta-chaves|钥匙扣|Sleutelhanger|Breloc|Nyckelring|Nøglering|Avaimenperä|Μπρελόκ|Přívěsek na klíče|Kulcstartó|Ключодържател|Prívesok na kľúče|Privjesak za ključeve|キーホルダー|열쇠고리|Móc khóa|พวงกุญแจ|Gantungan kunci
cardigan,cardigans|Strickjacke|Cárdigan|Gilet en maille|Cardigan|Kardigan|Cardigã|针织开衫|Vest|Cardigan|Kofta|Cardigan|Neuletakki|Ζακέτα|Propínací svetr|Kardigán|Жилетка|Kardigán|Kardigan|カーディガン|카디건|Áo khoác len|เสื้อคาร์ดิแกน|Kardigan
earbuds|In-Ear-Kopfhörer|Auriculares intraurales|Écouteurs intra-auriculaires|Auricolari|Słuchawki douszne|Fones intra-auriculares|入耳式耳机|Oordopjes|Căști intraauriculare|In-ear-hörlurar|Øretelefoner|Nappikuulokkeet|Ακουστικά ψείρες|Špuntová sluchátka|Fülhallgató|Слушалки тапи|Štuple do uší|Slušalice za uši|イヤホン|이어버드|Tai nghe nhét tai|หูฟังเอียร์บัด|Earbud
wireless|kabellos|inalámbrico|sans fil|senza fili|bezprzewodowe|sem fio|无线|draadloos|fără fir|trådlös|trådløs|langaton|ασύρματο|bezdrátové|vezeték nélküli|безжично|bezdrôtové|bežično|ワイヤレス|무선|không dây|ไร้สาย|nirkabel
striped|gestreift|a rayas|à rayures|a righe|w paski|às riscas|条纹|gestreept|în dungi|randig|stribet|raidallinen|ριγέ|pruhovaný|csíkos|на райета|pruhovaný|prugasti|ストライプ|줄무늬|kẻ sọc|ลายทาง|bergaris
high-q|hochwertig|alta calidad|haute qualité|alta qualità|wysoka jakość|alta qualidade|高品质|hoge kwaliteit|calitate superioară|hög kvalitet|høj kvalitet|korkea laatu|υψηλή ποιότητα|vysoká kvalita|kiváló minőség|високо качество|vysoká kvalita|visoka kvaliteta|高品質|고품질|chất lượng cao|คุณภาพสูง|kualitas tinggi
cheap|preisgünstig|económico|économique|economico|niedrogi|econômico|平价|voordelig|accesibil|prisvärd|prisvenlig|edullinen|οικονομικό|cenově dostupné|kedvező árú|на достъпна цена|cenovo dostupné|povoljan|低価格|저가형|giá rẻ|ราคาประหยัด|terjangkau
football,soccer|Fußball|Fútbol|Football|Calcio|Piłka nożna|Futebol|足球|Voetbal|Fotbal|Fotboll|Fodbold|Jalkapallo|Ποδόσφαιρο|Fotbal|Labdarúgás|Футбол|Futbal|Nogomet|サッカー|축구|Bóng đá|ฟุตบอล|Sepak bola
baseball|Baseball|Béisbol|Baseball|Baseball|Baseball|Beisebol|棒球|Honkbal|Baseball|Baseboll|Baseball|Baseball|Μπέιζμπολ|Baseball|Baseball|Бейзбол|Bejzbal|Bejzbol|野球|야구|Bóng chày|เบสบอล|Bisbol
low-top,low top|niedriger Schaft|de caña baja|tige basse|a collo basso|z niską cholewką|de cano baixo|低帮|laag model|model jos|lågt skaft|lavt skaft|matalavartinen|χαμηλό|nízký střih|alacsony szárú|нисък модел|nízky strih|niski model|ローカット|로우톱|cổ thấp|ข้อสั้น|potongan rendah
high-top,high top|hoher Schaft|de caña alta|tige haute|a collo alto|z wysoką cholewką|de cano alto|高帮|hoog model|model înalt|högt skaft|højt skaft|korkeavartinen|ψηλό|vysoký střih|magas szárú|висок модел|vysoký strih|visoki model|ハイカット|하이톱|cổ cao|หุ้มข้อ|potongan tinggi
`.trim().split('\n').map(row=>row.split('|'));
const titleLexicon = new Map();
const reverseLexicon = codes.map(() => new Map());
for (const [sources, ...labels] of titleRows) {
  const aliases = sources.split(',');
  const queryTerm = preferredSearchTerm[aliases[0]] || aliases.find(term => aliases[0] === term+'s') || aliases[0];
  for (const term of aliases) titleLexicon.set(term, labels);
  labels.forEach((label,index) => {
    if (!reverseLexicon[index].has(label.toLowerCase())) reverseLexicon[index].set(label.toLowerCase(),queryTerm);
  });
}
const spanishSearchAliases = new Set(['brazalete','bolsa','cartera','pulsera','vestido','pantalón corto','antalón corto']);
const catalogPatterns = {};
for (const code of catalogLanguages) {
  const lexicon = catalogWords[code];
  // Align variants such as plural spellings and seller typos with the same
  // searchable noun, while retaining compound phrases supplied by the source.
  for (const [sources] of titleRows) {
    const aliases = sources.split(',');
    const known = aliases.find(alias=>lexicon.has(alias));
    if (known) for (const alias of aliases) if(!lexicon.has(alias)) lexicon.set(alias,lexicon.get(known));
  }
  const reverse = reverseLexicon[codes.indexOf(code)];
  for (const [source,label] of lexicon) if(!reverse.has(label.toLowerCase())) reverse.set(label.toLowerCase(),source);
  for (const [sources] of titleRows) {
    const aliases=sources.split(',');
    const queryTerm=preferredSearchTerm[aliases[0]] || aliases.find(term=>aliases[0]===term+'s') || aliases[0];
    // Pick the spelling available in the feed over translated or misspelled aliases.
    const label=lexicon.get(queryTerm);
    if(label && !spanishSearchAliases.has(queryTerm)) reverse.set(label.toLowerCase(),queryTerm);
  }
  for(const source of ['down jacket','hoodie','jacket','sweater','sweatshirt','sunglasses','card holder','standard gift box','running shoes','shoulder bag','high quality','bag','t-shirt','style','styles','color','size']){
    const label=lexicon.get(source);
    if(label) reverse.set(label.toLowerCase(),source);
  }
  catalogPatterns[code]=wordPattern([...lexicon.keys(),...brandNames]);
}
for(const [sources,...labels] of descriptorRows){
  const aliases=sources.split(',');
  for(const term of aliases){
    if(!titleLexicon.has(term))titleLexicon.set(term,[term,...labels]);
    for(const code of catalogLanguages){
      if(!catalogWords[code].has(term))catalogWords[code].set(term,labels[codes.indexOf(code)-1]);
    }
  }
  labels.forEach((label,index)=>{
    const reverse=reverseLexicon[index+1];
    if(!reverse.has(label.toLowerCase()))reverse.set(label.toLowerCase(),aliases[0]);
  });
}
for(const code of catalogLanguages){
  catalogPatterns[code]=wordPattern([...catalogWords[code].keys(),...brandNames]);
}
for (const row of terms) {
  row.forEach((term,index) => {
    if(!reverseLexicon[index].has(term.toLowerCase())) reverseLexicon[index].set(term.toLowerCase(),row[0]);
  });
}
const titlePattern = wordPattern([...titleLexicon.keys(),...brandNames]);
const searchPatterns = reverseLexicon.map(dict => wordPattern([...dict.keys(),...brandNames]));
const skuRows = [
  ['标准礼盒|標準禮盒','Standard gift box','Standard-Geschenkbox','Caja de regalo estándar','Coffret cadeau standard','Confezione regalo standard','Standardowe pudełko prezentowe','Caixa de presente padrão','标准礼盒'],
  ['原装礼盒（品质保证，不退不换）','Original gift box (quality guaranteed, no returns or exchanges)','Original-Geschenkbox (Qualitätsgarantie, keine Rückgabe oder Umtausch)','Caja de regalo original (calidad garantizada, sin devoluciones ni cambios)','Coffret cadeau d’origine (qualité garantie, sans retour ni échange)','Confezione regalo originale (qualità garantita, senza resi o cambi)','Oryginalne pudełko prezentowe (gwarancja jakości, bez zwrotów i wymiany)','Caixa de presente original (qualidade garantida, sem devoluções ou trocas)','原装礼盒（品质保证，不退不换）'],
  ['无礼盒|無禮盒','Without a gift box','Ohne Geschenkbox','Sin caja de regalo','Sans coffret cadeau','Senza confezione regalo','Bez pudełka prezentowego','Sem caixa de presente','无礼盒'],
  ['标准尺码|標準尺碼','Standard sizing','Standardgröße','Tallaje estándar','Taille standard','Taglia standard','Standardowa rozmiarówka','Tamanho padrão','标准尺码'],
  ['配色|颜色组合|顏色組合','Color scheme','Farbkombination','Combinación de colores','Coloris','Combinazione di colori','Kolorystyka','Combinação de cores','配色'],
  ['颜色|色号|顏色','Color','Farbe','Color','Couleur','Colore','Kolor','Cor','颜色'],
  ['尺寸|尺码|尺碼|碼數','Size','Größe','Talla','Taille','Taglia','Rozmiar','Tamanho','尺码'],
  ['款式|款型|型号|型號','Style','Variante','Variante','Variante','Variante','Wariant','Variante','款式'],
  ['均码|均碼|通码|通碼','One size','Einheitsgröße','Talla única','Taille unique','Taglia unica','Rozmiar uniwersalny','Tamanho único','均码'],
  ['男款|男士|男式','Men’s','Herren','Hombre','Homme','Uomo','Męski','Masculino','男款'],
  ['女款|女士|女式','Women’s','Damen','Mujer','Femme','Donna','Damski','Feminino','女款'],
  ['浅灰色|淺灰色|浅灰|淺灰','Light gray','Hellgrau','Gris claro','Gris clair','Grigio chiaro','Jasnoszary','Cinza-claro','浅灰色'],
  ['深灰色|深灰','Dark gray','Dunkelgrau','Gris oscuro','Gris foncé','Grigio scuro','Ciemnoszary','Cinza-escuro','深灰色'],
  ['藏青色|藏青|海军蓝|海軍藍','Navy','Marineblau','Azul marino','Bleu marine','Blu navy','Granatowy','Azul-marinho','藏青色'],
  ['米色|米白色|米白','Beige','Beige','Beis','Beige','Beige','Beżowy','Bege','米色'],
  ['卡其色|卡其','Khaki','Khaki','Caqui','Kaki','Cachi','Khaki','Cáqui','卡其色'],
  ['紫色|紫','Purple','Violett','Morado','Violet','Viola','Fioletowy','Roxo','紫色'],
  ['黄色|黃色|黄|黃','Yellow','Gelb','Amarillo','Jaune','Giallo','Żółty','Amarelo','黄色'],
  ['橙色|橘色','Orange','Orange','Naranja','Orange','Arancione','Pomarańczowy','Laranja','橙色'],
  ['黑色|黑','Black','Schwarz','Negro','Noir','Nero','Czarny','Preto','黑色'],
  ['白色|白','White','Weiß','Blanco','Blanc','Bianco','Biały','Branco','白色'],
  ['藍色|蓝色|蓝|藍','Blue','Blau','Azul','Bleu','Blu','Niebieski','Azul','蓝色'],
  ['红色|紅色|红|紅','Red','Rot','Rojo','Rouge','Rosso','Czerwony','Vermelho','红色'],
  ['绿色|綠色|绿|綠','Green','Grün','Verde','Vert','Verde','Zielony','Verde','绿色'],
  ['灰色|灰','Gray','Grau','Gris','Gris','Grigio','Szary','Cinza','灰色'],
  ['棕色|咖啡色|棕','Brown','Braun','Marrón','Marron','Marrone','Brązowy','Marrom','棕色'],
  ['粉红色|粉紅色|粉色|粉','Pink','Rosa','Rosa','Rose','Rosa','Różowy','Rosa','粉色'],
  ['银色|銀色','Silver','Silber','Plateado','Argenté','Argento','Srebrny','Prateado','银色'],
  ['金色','Gold','Gold','Dorado','Doré','Oro','Złoty','Dourado','金色'],
  ['套装|套裝','Set','Set','Conjunto','Ensemble','Completo','Komplet','Conjunto','套装']
];
const skuTerms = new Map();
const skuEnglish = new Map();
for(const [chinese,...labels] of skuRows) {
  for(const code of catalogLanguages) labels.push(catalogWords[code].get(labels[0].toLowerCase()) || labels[0]);
  for(const word of chinese.split('|')) skuTerms.set(word,labels);
  skuEnglish.set(labels[0].toLowerCase(),labels);
}
const skuChinesePattern = new RegExp([...skuTerms.keys()].sort((a,b)=>b.length-a.length).join('|'),'gu');
const skuEnglishPattern = wordPattern(skuEnglish.keys());
const spanishLabel = /^(?:sudaderas?|camisetas?|cazadoras?|chaqueta|camisa|pantalones|zapatos|zapatillas|bolsos?|cartera|cinturón|brazalete|reloj|gorra|chaleco|estilos|colores)$/;
export function localName(name,lang='en') {
  const value=String(name??'').trim();
  const index=Math.max(0,codes.indexOf(lang));
  const exact=/^(.*?)([\s#_-]*\d[\d./_-]*)?$/.exec(value);
  if (exact) {
    const category=terms.find(words=>key(words[0])===key(exact[1]));
    if(category) return category[index]+(exact[2]||'');
  }
  const sourceLabel = lang === 'en' ? value : value.replace(/([\p{L}])['’]s(?=\s)/gu, '$1');
  let translated = sourceLabel.replace(catalogPatterns[lang] || titlePattern, match=>{
    const term=match.toLowerCase();
    if(brandNames.has(term) || (index===0 && !spanishLabel.test(term))) return match;
    return catalogWords[lang]?.get(term) || titleLexicon.get(term)?.[index] || match;
  }).replace(/\s+/g,' ');
  if(lang==='pl') {
    translated = translated.replace(/(\d+)\s*(warianty|kolory)\b/giu,(_,count,word)=>{
      const forms=word.toLowerCase()==='kolory'?['kolor','kolory','kolorów']:['wariant','warianty','wariantów'];
      const n=Number(count),plural=n%10>=2&&n%10<=4&&(n%100<12||n%100>14);
      return count+' '+forms[n===1?0:plural?1:2];
    });
  }
  return translated;
}

export function localOption(name,lang='en') {
  const value=String(name??'').trim(), index=Math.max(0,codes.indexOf(lang));
  const exact=skuEnglish.get(value.toLowerCase());
  if(exact) return exact[index];
  const numbered = /^(style|colou?r|size)(\s*[-#]?\s*\d+)?$/i.exec(value);
  if(numbered) return skuEnglish.get(numbered[1].toLowerCase().replace('colour','color'))[index]+(numbered[2]||'');
  if(/\p{Script=Han}/u.test(value)){
    if(lang==='zh-CN') return value;
    return value.replace(skuChinesePattern,word=>' '+skuTerms.get(word)[index]+' ').replace(/\s+/g,' ').trim();
  }
  return localName(value.replace(skuEnglishPattern,word=>skuEnglish.get(word.toLowerCase())[index]),lang);
}

export function sourceQuery(q,lang='en') {
  const value=String(q??'').trim(), index=Math.max(0,codes.indexOf(lang));
  if(index===0) return value;
  // Numbered category names are used as seller product titles. Keep the
  // source's plural spelling and model separator when searching an exact ID.
  const numbered=/^(.*?)([\s#_-]+\d[\d./_-]*)$/.exec(value);
  if(numbered) {
    const category=terms.find(words=>key(words[index])===key(numbered[1]));
    if(category) return category[0]+numbered[2];
  }
  return value.replace(searchPatterns[index],match=>{
    if(brandNames.has(match.toLowerCase())) return match;
    return reverseLexicon[index].get(match.toLowerCase())||match;
  });
}

import {westCopy} from './locale-west.mjs'
import {eastCopy} from './locale-east.mjs'
Object.assign(copy,westCopy,eastCopy);

const translatedLabels = new Map();
const pendingTranslations = new Map();
const labelBrands = wordPattern([...protectedNames, ...(
  'Air Force 1|ASICS|Gel-Kayano|Gel-NYC|Nike|Adidas|UGG|Gucci|Dior|Hermès|Hermes|HOKA|Timberland|Balenciaga|Prada|Lacoste|Moncler|Supreme|Vans|Stussy|New Balance|Arc’teryx|Arc\'teryx|Bape|Corteiz|Alo|Fendi|Loewe|Chanel|Givenchy|Tory Burch|Celine|Miu Miu|Stone Island|Onitsuka Tiger|Loro Piana|Rolex|Cartier|Tissot|Longines|Van Cleef & Arpels|Bulgari|Bvlgari|Oakley|Ray-Ban|Yeezy|Burberry|Ferragamo|Patagonia|AMI Paris|Amiri|EVISU|Maison Margiela|The North Face|Polo Ralph Lauren|Ralph Lauren|Trapstar|Dsquared2|Under Armour|Canada Goose|Claude|Apple|AirPods|iPhone|Air Zoom|Air Jordan|Jordan|Shox|Vomero|Travis Scott|Carhartt|Armani|Guess|Acne Studios|Drew House|Versace|Acqua di Parma|Saint Laurent|YSL|JBL|Levi’s|Calvin Klein|Coach|A Bathing Ape|Philipp Plein|Balmain|Bottega Veneta|Fear of God|Vivienne Westwood|Dunk Low|Dunk High|Chuck Taylor|Maison Kitsuné|Rick Owens|Christian Louboutin|Kobe|Chrome Hearts|Golden Goose|On Running|Audemars Piguet|Patek Philippe|New Balance Numeric|Jordan Jumpman'
).split('|')]);
const sizeOrCode = /(?<![\p{L}\d])(?:\d*X{1,4}[SL]|[SML]|\d+(?:[.\/-][A-Za-z0-9]+)+|[A-Za-z]*\d+[A-Za-z][\w.-]*|[A-Za-z]+[.-]?\d+[\w.-]*|\d+(?:[.\/-]\d+)*)(?![\p{L}\d])/gu;

function translationCandidate(name, lang, kind) {
  if (!name || name.length > 400) return false;
  if (kind === 'option' && (skuEnglish.has(name.toLowerCase()) || skuTerms.has(name) || /^(?:size|colou?r|style)[\s#_-]*\d*$/i.test(name))) return false;
  if (terms.some(row => key(row[0]) === key(name.replace(/[\s#_-]*\d[\d./_-]*$/, '')))) return false;
  if (lang === 'zh-CN' && !/[a-z]{2}/i.test(name)) return false;
  if (lang === 'en' && !/[\u3400-\u9fff]/u.test(name) && !/\b(?:sudadera|camiseta|cazadora|chaqueta|zapatos|bolsa|reloj|brazalete|pantalones|zapatillas|gorra|cartera|estilos|colores)\b/i.test(name)) return false;
  const descriptors = name.replace(labelBrands, ' ').replace(sizeOrCode, ' ').trim();
  if (!/[\p{L}]{2}/u.test(descriptors)) return false;
  if (kind==='option' && !descriptors.replace(skuChinesePattern, '').match(/[\p{L}]{2}/u)) return false;
  const exact = titleLexicon.get(descriptors.toLowerCase())?.[codes.indexOf(lang)] || catalogWords[lang]?.get(descriptors.toLowerCase());
  return !exact;
}

// Keep product codes and brand spelling exactly as supplied by the seller.
function maskLabel(entry) {
  const tokens = [];
  const protect = token => { tokens.push(token); return ' ZXQ' + (tokens.length-1) + 'QXZ '; };
  const source = entry.name.replace(/[\n\r\t]+/g,' ').replace(labelBrands,protect);
  const text = source.split(/(ZXQ\d+QXZ)/g).map(part=>/^ZXQ\d+QXZ$/.test(part) ? part : part.replace(sizeOrCode,protect)).join('').replace(/\s+/g,' ').trim();
  return {...entry,tokens,text};
}
async function translateBatch(entries, lang) {
  const masked = entries.map(maskLabel);
  const params = new URLSearchParams({client:'gtx',sl:'auto',tl:lang,dt:'t',q:masked.map(e=>e.text).join('\n')});
  const request = 'https://translate.googleapis.com/translate_a/single?' + params;
  if (pendingTranslations.has(request)) return pendingTranslations.get(request);
  const job = (async () => {
    const res = await fetch(request,{signal:AbortSignal.timeout(3200),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':86400,'400-599':0}}});
    if(!res.ok) return;
    const data = await res.json();
    if(!Array.isArray(data[0])) return;
    const lines = data[0].map(segment=>segment[0]||'').join('').trim().split(/\s*\n\s*/);
    if(lines.length!==masked.length) return;
    for(const [i,e] of masked.entries()){
      const line=lines[i].trim();
      const markers=[...line.matchAll(/ZXQ\s*(\d+)\s*QXZ/gi)].map(m=>Number(m[1]));
      if(!line || markers.length!==e.tokens.length || e.tokens.some((_,j)=>!markers.includes(j))) continue;
      const restored=line.replace(/ZXQ\s*(\d+)\s*QXZ/gi,(_,j)=>e.tokens[Number(j)]);
      if(translatedLabels.size>=18000) translatedLabels.delete(translatedLabels.keys().next().value);
      translatedLabels.set(e.key,restored);
    }
  })().finally(()=>pendingTranslations.delete(request));
  pendingTranslations.set(request,job);
  return job;
}

// Called with public source labels only; visitor searches and photo uploads stay separate.
export async function pageNames(names,lang,kind='title') {
  const result=new Map(), entries=[];
  for(const name of new Set(names)){
    const id=JSON.stringify([lang,kind,name]);
    const local=(kind==='option'?localOption:localName)(name,lang);
    result.set(name,translatedLabels.get(id)||local);
    if(typeof name==='string' && !translatedLabels.has(id) && translationCandidate(name,lang,kind)) entries.push({name,key:id});
  }
  const batches=[];
  let chars=0;
  for(const entry of entries){
    if(!batches.length || chars+entry.name.length>1300 || batches.at(-1).length>=20){batches.push([]);chars=0;}
    batches.at(-1).push(entry);chars+=entry.name.length+1;
  }
  const maxConcurrency=Math.min(2,batches.length);
  let next=0;
  async function work(){
    while(next<batches.length){
      const batch=batches[next++];
      try{await translateBatch(batch,lang)}catch{/* Local labels remain available when translation is offline. */}
      for(const entry of batch) if(translatedLabels.has(entry.key)) result.set(entry.name,translatedLabels.get(entry.key));
    }
  }
  await Promise.all(Array.from({length:maxConcurrency},work));
  return result;
}
