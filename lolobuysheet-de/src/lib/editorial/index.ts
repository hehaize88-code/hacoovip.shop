import type { Locale } from '../i18n';
import de from './de'; import en from './en'; import es from './es'; import fr from './fr'; import it from './it'; import pl from './pl';

export const editorialSlugs = ['spreadsheet-guide','first-order','source-links','photo-check','shipping-cost','order-tracking','warehouse-guide','size-check','price-check','returns-guide'];
export const reviewedAt = '2026-10-19';
const documents: Record<Locale, Record<string,string>> = {de,en,es,fr,it,pl};
export const helpIds = {
 buying:'1242296499766165', qc:'1242300728672386', sizing:'1242296504877978',
 storage:'1242300757049499', packing:'1242306518844916', weight:'1242300798075086',
 status:'1242296850973779', returns:'1242297000395937', claims:'1242301393535401',
} as const;
type Source = keyof typeof helpIds;
export const helpUrl = (key:Source) => `https://www.lolobuy.com/helpCenter/${helpIds[key]}`;
const sourceTitles: Record<Locale, Record<Source,string>> = {
 de:{buying:'Offizielle Kaufanleitung',qc:'Standardkontrolle und Grenzen',sizing:'Offizielle Größenreferenz',storage:'Lagerfristen',packing:'Verpackungsentfernung',weight:'Geschätztes und tatsächliches Gewicht',status:'Bestell- und Paketstatus',returns:'Stornierung und Rückerstattung',claims:'Paket-Reklamation beantragen'},
 en:{buying:'Official buying guide',qc:'Standard inspection and limits',sizing:'Official size reference',storage:'Storage periods',packing:'Package removal',weight:'Estimated and actual weight',status:'Order and parcel statuses',returns:'Cancellation and refunds',claims:'Apply for parcel after-sales'},
 es:{buying:'Guía oficial de compra',qc:'Inspección estándar y límites',sizing:'Referencia oficial de tallas',storage:'Plazos de almacenamiento',packing:'Retirada de embalaje',weight:'Peso estimado y real',status:'Estados de pedido y paquete',returns:'Cancelación y reembolsos',claims:'Solicitud de posventa del paquete'},
 fr:{buying:'Guide officiel d’achat',qc:'Inspection standard et limites',sizing:'Référence officielle des tailles',storage:'Durées de stockage',packing:'Retrait des emballages',weight:'Poids estimé et réel',status:'Statuts de commande et colis',returns:'Annulation et remboursement',claims:'Demande après-vente du colis'},
 it:{buying:'Guida ufficiale all’acquisto',qc:'Controllo standard e limiti',sizing:'Riferimento ufficiale delle taglie',storage:'Periodi di deposito',packing:'Rimozione dell’imballaggio',weight:'Peso stimato e reale',status:'Stati di ordine e pacco',returns:'Annullamento e rimborsi',claims:'Richiesta postvendita del pacco'},
 pl:{buying:'Oficjalny poradnik zakupu',qc:'Standardowa kontrola i ograniczenia',sizing:'Oficjalna tabela rozmiarów',storage:'Okresy przechowywania',packing:'Usuwanie opakowania',weight:'Waga szacowana i rzeczywista',status:'Statusy zamówienia i paczki',returns:'Anulowanie i refundacja',claims:'Reklamacja paczki'},
};
const sources: Record<string,Source[]> = {
 'spreadsheet-guide':['buying'], 'first-order':['buying','status','qc'], 'source-links':['buying'],
 'photo-check':['qc'], 'shipping-cost':['weight','buying'], 'order-tracking':['status','buying'],
 'warehouse-guide':['storage','buying','packing'], 'size-check':['sizing','qc'],
 'price-check':['buying','weight'], 'returns-guide':['returns','claims'],
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
 const raw=documents[lang][slug]; if(!raw) return undefined;
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
 de:{title:'LoloBuy Artikel & Kaufwissen',intro:'Zehn praktische Artikel: vom ersten Fund über QC und Größen bis zu Versand, Tracking und Rückgabe.',toc:'In diesem Artikel',related:'Passend dazu',minutes:'Min. Lesezeit',by:'Redaktion LoloBuy Sheet',sources:'Quellen und Prüfung',note:'Offizielle Seiten zuletzt am 19. Oktober 2026 geprüft. Maßgeblich bleiben die aktuellen Angaben deiner konkreten Bestellung.',faqIntro:'24 Antworten zu Produktsuche, Bestellung, QC, Versand und Rückgaben. Plattformregeln sind mit offiziellen LoloBuy-Hilfeseiten verknüpft.',answerSource:'Quelle / Details',allArticles:'Alle Artikel',browse:'Zum Spreadsheet'},
 en:{title:'LoloBuy articles & buying guides',intro:'Ten practical articles, from your first find to QC, sizing, shipping, tracking and returns.',toc:'In this article',related:'Read next',minutes:'min read',by:'LoloBuy Sheet editorial',sources:'Sources and review',note:'Official pages last checked on 19 October 2026. The current details of your specific order still apply.',faqIntro:'24 answers about product research, ordering, QC, shipping and returns. Platform rules link to official LoloBuy help pages.',answerSource:'Source / details',allArticles:'All articles',browse:'Browse the spreadsheet'},
 es:{title:'Artículos y guías de compra LoloBuy',intro:'Diez artículos prácticos: búsqueda, primer pedido, QC, tallas, envío, seguimiento y devoluciones.',toc:'En este artículo',related:'Sigue leyendo',minutes:'min de lectura',by:'Redacción LoloBuy Sheet',sources:'Fuentes y revisión',note:'Páginas oficiales revisadas el 19 de octubre de 2026. Se aplican los datos actuales de tu pedido concreto.',faqIntro:'24 respuestas sobre búsqueda, pedidos, QC, envíos y devoluciones. Las reglas enlazan a la ayuda oficial de LoloBuy.',answerSource:'Fuente / detalles',allArticles:'Todos los artículos',browse:'Explorar el spreadsheet'},
 fr:{title:'Articles et guides d’achat LoloBuy',intro:'Dix articles pratiques : recherche, premier achat, QC, tailles, livraison, suivi et retours.',toc:'Dans cet article',related:'À lire ensuite',minutes:'min de lecture',by:'Rédaction LoloBuy Sheet',sources:'Sources et vérification',note:'Pages officielles vérifiées le 19 octobre 2026. Les informations actuelles de votre commande précise restent applicables.',faqIntro:'24 réponses sur la recherche, les commandes, le QC, la livraison et les retours. Les règles renvoient à l’aide officielle LoloBuy.',answerSource:'Source / détails',allArticles:'Tous les articles',browse:'Parcourir le spreadsheet'},
 it:{title:'Articoli e guide all’acquisto LoloBuy',intro:'Dieci articoli pratici: ricerca, primo ordine, QC, taglie, spedizione, tracking e resi.',toc:'In questo articolo',related:'Leggi anche',minutes:'min di lettura',by:'Redazione LoloBuy Sheet',sources:'Fonti e verifica',note:'Pagine ufficiali verificate il 19 ottobre 2026. Restano applicabili i dati aggiornati del tuo ordine specifico.',faqIntro:'24 risposte su ricerca, ordini, QC, spedizione e resi. Le regole rimandano all’assistenza ufficiale LoloBuy.',answerSource:'Fonte / dettagli',allArticles:'Tutti gli articoli',browse:'Esplora lo spreadsheet'},
 pl:{title:'Artykuły i poradniki zakupowe LoloBuy',intro:'Dziesięć praktycznych artykułów: wyszukiwanie, pierwszy zakup, QC, rozmiary, wysyłka, śledzenie i zwroty.',toc:'W tym artykule',related:'Czytaj dalej',minutes:'min czytania',by:'Redakcja LoloBuy Sheet',sources:'Źródła i weryfikacja',note:'Oficjalne strony sprawdzono 19 października 2026. Obowiązują aktualne informacje konkretnego zamówienia.',faqIntro:'24 odpowiedzi o wyszukiwaniu, zakupach, QC, wysyłce i zwrotach. Zasady odsyłają do oficjalnej pomocy LoloBuy.',answerSource:'Źródło / szczegóły',allArticles:'Wszystkie artykuły',browse:'Przeglądaj spreadsheet'},
};
