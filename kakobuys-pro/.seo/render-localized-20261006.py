"""Render reviewed localized adaptations of the four new guides.

Preserves existing localized articles. Unavailable older translations link to the
English article explicitly; language alternates never point to missing pages.
"""
from pathlib import Path
from copy import deepcopy
import json,re,math,importlib.util
from html import escape
from lxml import html,etree
import markdown
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('ed',ROOT/'.seo/editorial-refresh-20261006.py');ed=importlib.util.module_from_spec(spec);spec.loader.exec_module(ed)
SLUGS=dict(zip(['shipping','size','jackets','tracksuit'],ed.NEW))
DATA={}
for p in (ROOT/'.seo').glob('localized-content*20261006.json'):DATA.update(json.loads(p.read_text()))
UI={
 'de':['Neue Ratgeber zu Passform, Produkten und Lieferung','Kakobuy-Ratgeber: Versand, Größen und QC','Wähle einen Ratgeber für Produktsuche, Größenwahl, Lagerprüfung oder Paketplanung.','Neue Ratgeber','Versand und Kosten','Größen und QC','Produkte und Bestellung','Ratgeber','Weiterlesen','Produktkategorien ansehen','Min. Lesezeit','Wörter','6. Oktober 2026','Kakobuy Produktlisten und Kaufratgeber','Produktlinks finden, Größen vergleichen und Lagerfotos prüfen. Plane den Versand vor der Paketeinreichung.','Englisch'],
 'es':['Nuevas guías de tallas, productos y entrega','Guías Kakobuy: envíos, tallas y QC','Elige una guía para buscar productos, comparar tallas, revisar fotos o preparar un paquete.','Nuevas guías','Envíos y costes','Tallas y QC','Productos y pedidos','guías','Seguir leyendo','Ver categorías de productos','min de lectura','palabras','6 de octubre de 2026','Listas de productos y guías de compra Kakobuy','Explora enlaces de productos, compara tallas y revisa fotos del almacén. Planifica el envío antes de solicitar el paquete.','Inglés'],
 'fr':['Nouveaux guides : tailles, produits et livraison','Guides Kakobuy : livraison, tailles et QC','Choisissez un guide pour trouver un produit, comparer les tailles, examiner les photos ou préparer un colis.','Nouveaux guides','Livraison et frais','Tailles et QC','Produits et commandes','guides','À lire ensuite','Voir les catégories de produits','min de lecture','mots','6 octobre 2026','Listes de produits et guides d’achat Kakobuy','Découvrez des liens de produits, comparez les tailles et examinez les photos de l’entrepôt. Préparez votre décision d’expédition.','Anglais'],
 'it':['Nuove guide a taglie, prodotti e consegna','Guide Kakobuy: spedizioni, taglie e QC','Scegli una guida per trovare prodotti, confrontare taglie, controllare foto o preparare un pacco.','Nuove guide','Spedizioni e costi','Taglie e QC','Prodotti e ordini','guide','Continua a leggere','Esplora le categorie','min di lettura','parole','6 ottobre 2026','Elenchi di prodotti e guide all’acquisto Kakobuy','Esplora i prodotti, confronta le taglie e controlla le foto del magazzino. Pianifica la spedizione prima di richiedere il pacco.','Inglese'],
 'pl':['Nowe poradniki: rozmiary, produkty i dostawa','Poradniki Kakobuy: wysyłka, rozmiary i QC','Wybierz poradnik do wyszukiwania produktów, porównywania rozmiarów, kontroli zdjęć lub przygotowania paczki.','Nowe poradniki','Wysyłka i koszty','Rozmiary i QC','Produkty i zamówienia','poradników','Czytaj dalej','Zobacz kategorie produktów','min czytania','słów','6 października 2026','Listy produktów i poradniki zakupowe Kakobuy','Przeglądaj produkty, porównuj rozmiary i sprawdzaj zdjęcia z magazynu. Zaplanuj wysyłkę przed zgłoszeniem paczki.','Angielski']}

UPDATES={
 'de':[
 ['Termine getrennt dokumentieren','Notiere Beginn und Ende der Lagerfrist, aktuelle Rückgabebedingungen und den nächsten Schritt. Die normale Lagerzeit von 100 Tagen verlängert keine Rückgabefrist. Prüfe den tatsächlichen Termin im Konto.'],
 ['Kosten und Lieferzeit getrennt planen','Speichere Zielland, Artikelkategorie, verpacktes Gewicht, Maße und Versandlinie zu jeder Schätzung. Ergänze nur zutreffende Zusatzkosten. Vergleiche die Laufzeitbedingungen mit den noch offenen Verkäufer- und Lageretappen.'],
 ['Die Größenprüfung messbar machen','Ein Etikett belegt die markierte Größe, nicht die Passform. Vergleiche Verkäufertabelle und gut passendes Referenzstück. Fordere im Lager genau das Maß an, das deine Entscheidung verändern könnte, und notiere Methode und Einheit.'],
 ['Passform vor dem Versand klären','Fußlänge, Innensohlenlänge und Außensohlenlänge sind unterschiedliche Maße. Notiere, welche Angabe vorliegt, und vergleiche sie mit einer bequemen Referenz. Ungeklärte Passform bleibt offen, bis der benötigte Beleg vorhanden ist.'],
 ['Oberteil und Hose gemeinsam prüfen','Bestätige bei einem Set, welche Teile enthalten sind und ob unterschiedliche Größen gewählt werden können. Vergleiche Brustweite, Länge, Bund und Innenbein separat mit passenden Kleidungsstücken.'],
 ['Jede Referenz einer Etappe zuordnen','Führe Verkäuferlieferung, Lagereintrag und internationales Paket in getrennten Feldern. Beginne eine Nachfrage mit dem letzten bestätigten Ereignis und seiner Datumsangabe. Eine erzeugte Etikette allein belegt keine Übernahme.']],
 'es':[
 ['Registra los plazos por separado','Anota inicio y fin del almacenamiento, condiciones actuales de devolución y siguiente acción. La referencia normal de 100 días de almacén no amplía el plazo de devolución. Confirma la fecha en tu cuenta.'],
 ['Planifica coste y tiempo por separado','Guarda destino, categoría, peso embalado, dimensiones y ruta para cada estimación. Añade solo cargos aplicables. Compara las condiciones de tránsito con las etapas pendientes del vendedor y del almacén.'],
 ['Haz medible la comprobación de talla','Una etiqueta identifica la talla marcada, no el ajuste. Compara la tabla del vendedor con una prenda que te quede bien. Solicita la medida concreta que pueda cambiar tu decisión y conserva método y unidad.'],
 ['Aclara el ajuste antes del envío','Longitud del pie, plantilla y suela exterior son medidas distintas. Identifica cuál tienes y compárala con un par cómodo. Mantén la duda abierta hasta disponer de la evidencia necesaria.'],
 ['Comprueba las dos partes del conjunto','Confirma qué prendas están incluidas y si se permiten tallas distintas. Compara pecho, largo, cintura y entrepierna por separado con prendas adecuadas.'],
 ['Asocia cada referencia a su etapa','Registra por separado envío del vendedor, entrada de almacén y paquete internacional. Empieza una consulta con el último evento confirmado y su fecha. Una etiqueta creada no demuestra aceptación del transportista.']],
 'fr':[
 ['Noter les échéances séparément','Consignez début et fin du stockage, conditions actuelles de retour et prochaine action. La référence habituelle de 100 jours de stockage ne prolonge pas le retour. Vérifiez la date réelle dans le compte.'],
 ['Planifier séparément coût et délai','Conservez destination, catégorie, poids emballé, dimensions et ligne pour chaque estimation. Ajoutez uniquement les frais applicables. Comparez les conditions de transport aux étapes encore ouvertes chez le vendeur et en entrepôt.'],
 ['Rendre le contrôle de taille mesurable','Une étiquette indique la taille marquée, pas la coupe réelle. Comparez le tableau du vendeur à un vêtement adapté. Demandez la mesure précise qui pourrait changer votre décision et conservez méthode et unité.'],
 ['Clarifier la pointure avant l’expédition','Longueur du pied, de la semelle intérieure et de la semelle extérieure sont différentes. Identifiez la mesure disponible et comparez-la à une paire confortable. Gardez la question ouverte jusqu’au justificatif nécessaire.'],
 ['Vérifier les deux pièces de l’ensemble','Confirmez les pièces incluses et la possibilité de choisir des tailles différentes. Comparez séparément poitrine, longueur, ceinture et entrejambe avec des vêtements adaptés.'],
 ['Associer chaque référence à son étape','Séparez expédition du vendeur, entrée d’entrepôt et colis international. Commencez une demande par le dernier événement confirmé et sa date. Une étiquette créée ne démontre pas la prise en charge.']],
 'it':[
 ['Registra separatamente le scadenze','Annota inizio e fine del deposito, condizioni attuali di reso e prossima azione. Il riferimento normale di 100 giorni di deposito non prolunga il termine di reso. Verifica la data effettiva nell’account.'],
 ['Pianifica costo e tempo separatamente','Conserva destinazione, categoria, peso imballato, dimensioni e linea per ogni stima. Aggiungi solo costi applicabili. Confronta le condizioni di trasporto con le fasi ancora aperte presso venditore e magazzino.'],
 ['Rendi misurabile il controllo della taglia','L’etichetta identifica la taglia indicata, non la vestibilità. Confronta la tabella del venditore con un capo adatto. Richiedi la misura precisa che può cambiare la scelta e conserva metodo e unità.'],
 ['Chiarisci la calzata prima della spedizione','Lunghezza del piede, della soletta e della suola esterna sono diverse. Identifica il dato disponibile e confrontalo con un paio comodo. Mantieni aperta la valutazione finché manca la prova necessaria.'],
 ['Controlla entrambe le parti del completo','Conferma quali capi sono inclusi e se puoi scegliere taglie diverse. Confronta separatamente petto, lunghezza, vita e interno gamba con capi adatti.'],
 ['Associa ogni riferimento alla sua fase','Separa spedizione del venditore, registrazione in magazzino e pacco internazionale. Inizia una richiesta dall’ultimo evento confermato e dalla data. Un’etichetta creata non prova la presa in carico.']],
 'pl':[
 ['Zapisuj terminy oddzielnie','Notuj początek i koniec przechowywania, aktualne warunki zwrotu i następne działanie. Typowy okres 100 dni magazynowania nie przedłuża zwrotu. Potwierdź rzeczywistą datę na koncie.'],
 ['Planuj osobno koszt i czas','Dla każdego szacunku zachowaj cel, kategorię, masę po zapakowaniu, wymiary i linię. Dodaj tylko właściwe opłaty. Porównaj warunki przewozu z niezakończonymi etapami u sprzedawcy i w magazynie.'],
 ['Oprzyj kontrolę rozmiaru na pomiarach','Metka wskazuje oznaczony rozmiar, a nie dopasowanie. Porównaj tabelę sprzedawcy z wygodnym ubraniem. Poproś o konkretny wymiar, który może zmienić decyzję, i zapisz metodę oraz jednostkę.'],
 ['Wyjaśnij dopasowanie przed wysyłką','Długość stopy, wkładki i podeszwy zewnętrznej to różne wymiary. Ustal, który masz, i porównaj z wygodną parą. Nie uznawaj dopasowania za potwierdzone bez potrzebnego pomiaru.'],
 ['Sprawdź obie części kompletu','Potwierdź zawartość i możliwość wyboru różnych rozmiarów. Porównuj osobno klatkę, długość, pas i nogawkę z odpowiednimi ubraniami.'],
 ['Przypisz numer do właściwego etapu','Oddziel numery dostawy sprzedawcy, wpisu magazynowego i paczki międzynarodowej. Zapytanie zacznij od ostatniego potwierdzonego zdarzenia i daty. Sama etykieta nie dowodzi przyjęcia przesyłki.']]}

def local_links(root,lang):
 for a in root.xpath('.//a[@href]'):
  href=a.get('href')
  if href.startswith('/') and not href.startswith('//'):
   raw=re.sub(r'^/(de|es|fr|it|pl)/','/',href)
   target=ROOT/lang/raw.strip('/')/'index.html'
   if target.exists():a.set('href','/'+lang+raw)
   elif raw.startswith('/articles/'):
    a.set('href',raw);a.set('lang','en');a.set('hreflang','en')
    if not a.text_content().endswith('('+UI[lang][15]+')'):a.text=(a.text or '')+' ('+UI[lang][15]+')'

def main():
 for lang,items in DATA.items():
  ui=UI[lang];template=ed.parse(ROOT/lang/'articles/how-to-read-kakobuy-qc-photos/index.html')
  for key,slug in SLUGS.items():
   meta=items[key];r=ed.parse(ROOT/'articles'/slug/'index.html');r.set('lang',lang)
   for tag in ['header','footer']:
    old=r.xpath('//'+tag)[0];old.getparent().replace(old,deepcopy(template.xpath('//'+tag)[0]))
   ed.set_text(r.xpath('//h1')[0],meta['title'])
   hero=r.xpath('//section[contains(@class,"page-hero")]')[0]
   ed.set_text(hero.xpath('.//div[@class="shell"]/p[not(@class)]')[0],meta['description'])
   ed.set_text(hero.xpath('.//p[@class="kicker"]')[0],ui[3])
   crumbs=hero.xpath('.//div[@class="breadcrumbs"]')[0];crumbs.clear();crumbs.set('class','breadcrumbs')
   ed.insert_fragment(crumbs,'<a href="/'+lang+'/">Kakobuys.pro</a> / <a href="/'+lang+'/articles/">'+ui[7]+'</a>')
   old=r.xpath('//article[@id="article-body"]')[0];body=html.fragment_fromstring('<article class="prose" id="article-body">'+markdown.markdown(meta['body'],extensions=['tables'])+'</article>');old.getparent().replace(old,body)
   wc=len(re.findall(r"\b[\w’'-]+\b",body.text_content()));by=hero.xpath('.//div[@class="article-byline"]')[0];by.clear();by.set('class','article-byline')
   ed.insert_fragment(by,f'<span>Kakobuys.pro Research Desk</span><span>{math.ceil(wc/210)} {ui[10]}</span><span data-word-count="">{wc} {ui[11]}</span><time datetime="2026-10-06">{ui[12]}</time>')
   aside=r.xpath('//aside')[0];aside.clear();aside.set('class','side-card')
   links=ed.NEW[slug]['related'];ed.insert_fragment(aside,'<p class="kicker">'+ui[8]+'</p>'+ed.rel_links(links,lang)+'<a href="/'+lang+'/catalog/">'+ui[9]+'</a>')
   url=ed.ORIGIN+'/'+lang+'/articles/'+slug+'/'
   ed.set_meta(r,meta['title'],meta['description'],url)
   for m in r.xpath('//meta[@name="keywords"]'):m.getparent().remove(m)
   for s in r.xpath('//script[@type="application/ld+json"]'):
    data=json.loads(s.text)
    for entry in data.get('@graph',[]):
     if entry.get('@type')=='Article':entry.update(headline=meta['title'],description=meta['description'],url=url,mainEntityOfPage=url,inLanguage=lang,wordCount=wc)
    s.text=json.dumps(data,ensure_ascii=False)
   for e in r.xpath('//footer//div[@class="footer-note"]/p'):ed.set_text(e,ui[12])
   ed.write(ROOT/lang/'articles'/slug/'index.html',r)
  # Once all four files exist, resolve links to their matching language.
  for slug in SLUGS.values():
   p=ROOT/lang/'articles'/slug/'index.html';r=ed.parse(p);local_links(r.xpath('//main')[0],lang);ed.write(p,r)
  for i,(slug,(_,_,links)) in enumerate(ed.UPDATES.items()):
   p=ROOT/lang/'articles'/slug/'index.html'
   if not p.exists():continue
   r=ed.parse(p);article=r.xpath('//article[contains(@class,"prose")]')[0]
   for e in article.xpath('./section[@data-editorial="20261006"]'):article.remove(e)
   title,copy=UPDATES[lang][i]
   block=html.fragment_fromstring('<section class="editorial-update" data-editorial="20261006"><h2>'+escape(title)+'</h2><p>'+escape(copy)+'</p><p class="review-date">'+ui[12]+'</p>'+ed.rel_links(links,lang)+'</section>')
   local_links(block,lang);article.insert(0,block);ed.write(p,r)
  # Keep the established localized homepage copy and move the existing product module forward.
  p=ROOT/lang/'index.html';r=ed.parse(p);main=r.xpath('//main')[0]
  ledger=r.xpath('//section[contains(@class,"evidence-ledger")]')
  if ledger:main.remove(ledger[0]);main.insert(1,ledger[0])
  ed.set_text(r.xpath('//h1')[0],ui[13]);ed.set_meta(r,ui[13]+' | Kakobuys.pro',ui[14],ed.ORIGIN+'/'+lang+'/')
  lede=r.xpath('//section[contains(@class,"editorial-hero")]//p[contains(@class,"lede")]')
  if lede:ed.set_text(lede[0],ui[14])
  archive=r.xpath('//section[contains(@class,"research-archive")]')
  if archive:
   ed.set_text(archive[0].xpath('.//h2')[0],ui[0]);grid=archive[0].xpath('.//div[@class="article-grid"]')[0];grid.clear();grid.set('class','article-grid refresh-grid')
   for slug in SLUGS.values():ed.insert_fragment(grid,ed.card(slug,lang))
  ed.write(p,r)
  # A compact directory lists only the actual articles in this language.
  p=ROOT/lang/'articles/index.html';r=ed.parse(p);main=r.xpath('//main')[0];main.clear()
  slugs=[q.parent.name for q in sorted((ROOT/lang/'articles').glob('*/index.html'))]
  ed.insert_fragment(main,'<section class="page-hero articles-hero"><div class="shell"><p class="kicker">'+str(len(slugs))+' '+ui[7]+'</p><h1>'+ui[1]+'</h1><p>'+ui[2]+'</p><nav class="topic-jump"><a href="#latest">'+ui[3]+'</a><a href="#shipping">'+ui[4]+'</a><a href="#sizing">'+ui[5]+'</a><a href="#ordering">'+ui[6]+'</a></nav></div></section>')
  groups={'latest':(ui[3],list(SLUGS.values())),'shipping':(ui[4],[]),'sizing':(ui[5],[]),'ordering':(ui[6],[])}
  for slug in slugs:
   if slug in SLUGS.values():continue
   group='sizing' if any(k in slug for k in ['qc','shoes','hoodie']) else 'shipping' if any(k in slug for k in ['shipping','warehouse','cost','fees','currency','tracking','weight','parcel','customs','restricted','coupon']) else 'ordering'
   groups[group][1].append(slug)
  for anchor,(heading,ss) in groups.items():
   if ss:ed.insert_fragment(main,'<section class="section shell article-topic" id="'+anchor+'"><div class="section-heading"><h2>'+heading+'</h2></div><div class="article-grid refresh-grid">'+''.join(ed.card(s,lang) for s in ss)+'</div></section>')
  # Remove jump targets with no group, rather than creating empty sections.
  for a in main.xpath('.//nav[@class="topic-jump"]/a'):
   if not main.xpath('.//*[@id="'+a.get('href')[1:]+'"]'):a.getparent().remove(a)
  ed.set_meta(r,ui[1]+' | Kakobuys.pro',ui[2],ed.ORIGIN+'/'+lang+'/articles/')
  for s in r.xpath('//script[@type="application/ld+json"]'):s.getparent().remove(s)
  s=etree.SubElement(r.find('head'),'script',{'type':'application/ld+json'});s.text=json.dumps({'@context':'https://schema.org','@type':'CollectionPage','name':ui[1],'url':ed.ORIGIN+'/'+lang+'/articles/','inLanguage':lang})
  ed.write(p,r)
  print(lang,'reviewed localized release:',len(slugs),'articles')

if __name__=='__main__':main()
