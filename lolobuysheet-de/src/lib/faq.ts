import {locales,ui,type Locale} from './i18n';
import {article} from './content';
const questions=`Was ist ein LoloBuy Spreadsheet?|What is a LoloBuy spreadsheet?|¿Qué es un spreadsheet LoloBuy?|Qu’est-ce qu’un spreadsheet LoloBuy ?|Cos’è uno spreadsheet LoloBuy?|Czym jest spreadsheet LoloBuy?
Wie bestelle ich einen Artikel?|How do I order an item?|¿Cómo pido un artículo?|Comment commander un article ?|Come ordino un articolo?|Jak zamówić produkt?
Sind Versandkosten im Preis enthalten?|Does the price include shipping?|¿El precio incluye el envío?|Le prix comprend-il la livraison ?|Il prezzo include la spedizione?|Czy cena obejmuje wysyłkę?
Sind Produktbilder auch QC-Fotos?|Are product images also QC photos?|¿Las imágenes del producto son fotos QC?|Les images produit sont-elles des photos QC ?|Le immagini prodotto sono foto QC?|Czy zdjęcia produktu to zdjęcia QC?
Warum ist die Artikel-ID wichtig?|Why does the item ID matter?|¿Por qué importa el ID del artículo?|Pourquoi l’identifiant est-il important ?|Perché conta l’ID dell’articolo?|Dlaczego ID produktu jest ważne?
Wie überprüfe ich die Größe?|How do I check the size?|¿Cómo compruebo la talla?|Comment vérifier la taille ?|Come verifico la taglia?|Jak sprawdzić rozmiar?
Kann ich nach einem Bild suchen?|Can I search with an image?|¿Puedo buscar con una imagen?|Puis-je rechercher avec une image ?|Posso cercare con un’immagine?|Czy mogę wyszukiwać obrazem?
Ist diese Website der offizielle LoloBuy-Shop?|Is this the official LoloBuy store?|¿Es esta la tienda oficial de LoloBuy?|Est-ce la boutique officielle LoloBuy ?|È il negozio ufficiale LoloBuy?|Czy to oficjalny sklep LoloBuy?`;
export function faqs(lang:Locale){
 const t=ui[lang];const answers=[article(lang,'about').paragraphs[0],article(lang,'guide').paragraphs[0],t.priceNote,`${t.noQC} ${t.qcNote}`,article(lang,'source-links').paragraphs[0],article(lang,'size-check').paragraphs[0],t.imageUnavailable,t.independent];
 return questions.split('\n').map((row,i)=>{const values=row.split('|');if(values.length!==locales.length)throw new Error('FAQ translation missing');return {question:values[locales.indexOf(lang)],answer:answers[i]};});
}
