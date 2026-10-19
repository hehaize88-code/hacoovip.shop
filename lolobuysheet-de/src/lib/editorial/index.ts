import type { Locale } from '../i18n';
import {officialUpdates} from './official-updates';
import de from './de'; import en from './en'; import es from './es'; import fr from './fr'; import it from './it'; import pl from './pl';

export const editorialSlugs = ['spreadsheet-guide','first-order','source-links','photo-check','shipping-cost','order-tracking','warehouse-guide','size-check','price-check','returns-guide'];
export const reviewedAt = '2026-10-19';
const documents: Record<Locale, Record<string,string>> = {de,en,es,fr,it,pl};
export const helpIds = {
 buying:'1242296499766165', qc:'1242300728672386', sizing:'1242296504877978',
 storage:'1242300757049499', packing:'1242306518844916', weight:'1242300798075086',
 status:'1242296850973779', returns:'1242297000395937', claims:'1242301393535401',
 modify:'1242296854971485', confirmation:'1242296873911429', domestic:'1242296838456383',
 guarantee:'1242296939447441', wholesale:'1242296792646674', photos:'1242300722511995',
 service:'1242300714582134', supplement:'1242300801155283', discounts:'1242296946132123', returnSteps:'1242296789304333',
} as const;
type Source = keyof typeof helpIds;
export const helpUrl = (key:Source) => `https://www.lolobuy.com/helpCenter/${helpIds[key]}`;
const sourceTitles: Record<Locale, Record<Source,string>> = {
 de:{buying:'Offizielle Kaufanleitung',qc:'Standardkontrolle und Grenzen',sizing:'Offizielle Größenreferenz',storage:'Lagerfristen',packing:'Verpackungsentfernung',weight:'Geschätztes und tatsächliches Gewicht',status:'Bestell- und Paketstatus',returns:'Stornierung und Rückerstattung',claims:'Paket-Reklamation beantragen',modify:"Bestellung ändern",confirmation:"Bestätigung beantworten",domestic:"Gemeinsamer Inlandsversand",guarantee:"Bedingungen der Fünf-Tage-Rückgabe",wholesale:"1688-Einkauf und Mindestmengen",photos:"Standard-Fotoservice",service:"Übersicht der Einkaufsservices",supplement:"Frachtnachzahlungen",discounts:"Verkäuferrabatte berücksichtigen",returnSteps:"Rückgabe und Erstattungsweg"},
 en:{buying:'Official buying guide',qc:'Standard inspection and limits',sizing:'Official size reference',storage:'Storage periods',packing:'Package removal',weight:'Estimated and actual weight',status:'Order and parcel statuses',returns:'Cancellation and refunds',claims:'Apply for parcel after-sales',modify:"Modify an order",confirmation:"Reply to confirmation requests",domestic:"Combined domestic delivery",guarantee:"Five-day return conditions",wholesale:"1688 purchasing and minimum quantities",photos:"Standard photo service",service:"Shopping service overview",supplement:"Supplemental parcel payments",discounts:"Seller discounts",returnSteps:"Return steps and refund destination"},
 es:{buying:'Guía oficial de compra',qc:'Inspección estándar y límites',sizing:'Referencia oficial de tallas',storage:'Plazos de almacenamiento',packing:'Retirada de embalaje',weight:'Peso estimado y real',status:'Estados de pedido y paquete',returns:'Cancelación y reembolsos',claims:'Solicitud de posventa del paquete',modify:"Modificar un pedido",confirmation:"Responder a confirmaciones",domestic:"Envío nacional conjunto",guarantee:"Condiciones de devolución de cinco días",wholesale:"Compra 1688 y cantidades mínimas",photos:"Servicio de fotos estándar",service:"Resumen del servicio de compra",supplement:"Pagos adicionales de transporte",discounts:"Descuentos del vendedor",returnSteps:"Pasos y destino del reembolso"},
 fr:{buying:'Guide officiel d’achat',qc:'Inspection standard et limites',sizing:'Référence officielle des tailles',storage:'Durées de stockage',packing:'Retrait des emballages',weight:'Poids estimé et réel',status:'Statuts de commande et colis',returns:'Annulation et remboursement',claims:'Demande après-vente du colis',modify:"Modifier une commande",confirmation:"Répondre aux confirmations",domestic:"Port intérieur commun",guarantee:"Conditions du retour sous cinq jours",wholesale:"Achats 1688 et minimums",photos:"Service photo standard",service:"Présentation du service d’achat",supplement:"Compléments de fret",discounts:"Remises du vendeur",returnSteps:"Retour et destination du remboursement"},
 it:{buying:'Guida ufficiale all’acquisto',qc:'Controllo standard e limiti',sizing:'Riferimento ufficiale delle taglie',storage:'Periodi di deposito',packing:'Rimozione dell’imballaggio',weight:'Peso stimato e reale',status:'Stati di ordine e pacco',returns:'Annullamento e rimborsi',claims:'Richiesta postvendita del pacco',modify:"Modificare un ordine",confirmation:"Rispondere alle conferme",domestic:"Trasporto interno condiviso",guarantee:"Condizioni del reso in cinque giorni",wholesale:"Acquisti 1688 e quantità minime",photos:"Servizio foto standard",service:"Panoramica del servizio d’acquisto",supplement:"Supplementi di trasporto",discounts:"Sconti del venditore",returnSteps:"Reso e destinazione del rimborso"},
 pl:{buying:'Oficjalny poradnik zakupu',qc:'Standardowa kontrola i ograniczenia',sizing:'Oficjalna tabela rozmiarów',storage:'Okresy przechowywania',packing:'Usuwanie opakowania',weight:'Waga szacowana i rzeczywista',status:'Statusy zamówienia i paczki',returns:'Anulowanie i refundacja',claims:'Reklamacja paczki',modify:"Zmiana zamówienia",confirmation:"Odpowiedzi na potwierdzenia",domestic:"Wspólny transport krajowy",guarantee:"Warunki zwrotu pięciodniowego",wholesale:"Zakupy 1688 i minima ilościowe",photos:"Standardowe zdjęcia",service:"Opis usługi zakupowej",supplement:"Dopłaty do transportu",discounts:"Rabaty sprzedawcy",returnSteps:"Zwrot i miejsce refundacji"},
};
const sources: Record<string,Source[]> = {
 'spreadsheet-guide':['buying'], 'first-order':['buying','status','qc','modify','confirmation'], 'source-links':['buying','wholesale','qc','photos'],
 'photo-check':['qc','photos','service'], 'shipping-cost':['weight','buying','supplement'], 'order-tracking':['status','buying','confirmation'],
 'warehouse-guide':['storage','buying','packing'], 'size-check':['sizing','qc'],
 'price-check':['buying','weight','domestic','discounts','service'], 'returns-guide':['returns','claims','guarantee','returnSteps'],
};
const related: Record<string,string[]> = {
 'spreadsheet-guide':['first-order','source-links','price-check'], 'first-order':['photo-check','shipping-cost','order-tracking'],
 'source-links':['spreadsheet-guide','first-order','price-check'], 'photo-check':['size-check','warehouse-guide','returns-guide'],
 'shipping-cost':['price-check','warehouse-guide','order-tracking'], 'order-tracking':['first-order','warehouse-guide','returns-guide'],
 'warehouse-guide':['photo-check','shipping-cost','returns-guide'], 'size-check':['photo-check','source-links','first-order'],
 'price-check':['shipping-cost','source-links','spreadsheet-guide'], 'returns-guide':['photo-check','warehouse-guide','order-tracking'],
};
export interface EditorialSection { heading:string; paragraphs:string[]; bullets:string[]; id:string; }
export function getEditorial(lang:Locale,slug:string) {
 const original=documents[lang][slug]; if(!original) return undefined;
 const update=officialUpdates[lang][slug]; if(!update) throw new Error(`Missing official article update: ${lang}/${slug}`);
 const raw=original+'\n'+update;
 const lines=raw.split('\n'); const title=lines[0].replace(/^# /,''); const summary=lines[1].replace(/^> /,'');
 const sections:EditorialSection[]=[];
 for(const line of lines.slice(2)) {
  if(line.startsWith('## ')) sections.push({heading:line.slice(3),paragraphs:[],bullets:[],id:`section-${sections.length+1}`});
  else if(line.startsWith('- ')) sections.at(-1)!.bullets.push(line.slice(2));
  else if(line.trim()) sections.at(-1)!.paragraphs.push(line);
 }
 const words=raw.trim().split(/\s+/u).length;
 return {slug,title,summary,sections,words,minutes:Math.max(2,Math.ceil(words/190)),date:reviewedAt,
  sources:sources[slug].map(key=>({title:sourceTitles[lang][key],url:helpUrl(key)})),related:related[slug]};
}

export const editorialUi:Record<Locale,Record<string,string>>={
 de:{title:'LoloBuy Artikel & Kaufwissen',intro:'Zehn praktische Artikel: vom ersten Fund über QC und Größen bis zu Versand, Tracking und Rückgabe.',toc:'In diesem Artikel',related:'Passend dazu',minutes:'Min. Lesezeit',by:'Redaktion LoloBuy Sheet',sources:'Quellen und Prüfung',note:'Offizielle Seiten zuletzt am 19. Oktober 2026 geprüft. Maßgeblich bleiben die aktuellen Angaben deiner konkreten Bestellung.',faqIntro:'30 Antworten zu Produktsuche, Bestellung, QC, Versand und Rückgaben. Plattformregeln sind mit offiziellen LoloBuy-Hilfeseiten verknüpft.',answerSource:'Quelle / Details',allArticles:'Alle Artikel',browse:'Zum Spreadsheet'},
 en:{title:'LoloBuy articles & buying guides',intro:'Ten practical articles, from your first find to QC, sizing, shipping, tracking and returns.',toc:'In this article',related:'Read next',minutes:'min read',by:'LoloBuy Sheet editorial',sources:'Sources and review',note:'Official pages last checked on 19 October 2026. The current details of your specific order still apply.',faqIntro:'30 answers about product research, ordering, QC, shipping and returns. Platform rules link to official LoloBuy help pages.',answerSource:'Source / details',allArticles:'All articles',browse:'Browse the spreadsheet'},
 es:{title:'Artículos y guías de compra LoloBuy',intro:'Diez artículos prácticos: búsqueda, primer pedido, QC, tallas, envío, seguimiento y devoluciones.',toc:'En este artículo',related:'Sigue leyendo',minutes:'min de lectura',by:'Redacción LoloBuy Sheet',sources:'Fuentes y revisión',note:'Páginas oficiales revisadas el 19 de octubre de 2026. Se aplican los datos actuales de tu pedido concreto.',faqIntro:'30 respuestas sobre búsqueda, pedidos, QC, envíos y devoluciones. Las reglas enlazan a la ayuda oficial de LoloBuy.',answerSource:'Fuente / detalles',allArticles:'Todos los artículos',browse:'Explorar el spreadsheet'},
 fr:{title:'Articles et guides d’achat LoloBuy',intro:'Dix articles pratiques : recherche, premier achat, QC, tailles, livraison, suivi et retours.',toc:'Dans cet article',related:'À lire ensuite',minutes:'min de lecture',by:'Rédaction LoloBuy Sheet',sources:'Sources et vérification',note:'Pages officielles vérifiées le 19 octobre 2026. Les informations actuelles de votre commande précise restent applicables.',faqIntro:'30 réponses sur la recherche, les commandes, le QC, la livraison et les retours. Les règles renvoient à l’aide officielle LoloBuy.',answerSource:'Source / détails',allArticles:'Tous les articles',browse:'Parcourir le spreadsheet'},
 it:{title:'Articoli e guide all’acquisto LoloBuy',intro:'Dieci articoli pratici: ricerca, primo ordine, QC, taglie, spedizione, tracking e resi.',toc:'In questo articolo',related:'Leggi anche',minutes:'min di lettura',by:'Redazione LoloBuy Sheet',sources:'Fonti e verifica',note:'Pagine ufficiali verificate il 19 ottobre 2026. Restano applicabili i dati aggiornati del tuo ordine specifico.',faqIntro:'30 risposte su ricerca, ordini, QC, spedizione e resi. Le regole rimandano all’assistenza ufficiale LoloBuy.',answerSource:'Fonte / dettagli',allArticles:'Tutti gli articoli',browse:'Esplora lo spreadsheet'},
 pl:{title:'Artykuły i poradniki zakupowe LoloBuy',intro:'Dziesięć praktycznych artykułów: wyszukiwanie, pierwszy zakup, QC, rozmiary, wysyłka, śledzenie i zwroty.',toc:'W tym artykule',related:'Czytaj dalej',minutes:'min czytania',by:'Redakcja LoloBuy Sheet',sources:'Źródła i weryfikacja',note:'Oficjalne strony sprawdzono 19 października 2026. Obowiązują aktualne informacje konkretnego zamówienia.',faqIntro:'30 odpowiedzi o wyszukiwaniu, zakupach, QC, wysyłce i zwrotach. Zasady odsyłają do oficjalnej pomocy LoloBuy.',answerSource:'Źródło / szczegóły',allArticles:'Wszystkie artykuły',browse:'Przeglądaj spreadsheet'},
};
