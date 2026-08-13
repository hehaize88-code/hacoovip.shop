import type { Lang } from "./site-data";

export const seoRouteKeys = ["finds", "categories", "qc-guide", "shipping", "articles", "faq"] as const;
export type SeoRoute = (typeof seoRouteKeys)[number];

export const trustRouteKeys = ["about", "editorial-policy", "privacy", "terms"] as const;
export type TrustRoute = (typeof trustRouteKeys)[number];

type SeoEntry = { title: string; h1: string; description: string };

export const homeSeo: Record<Lang, { title: string; description: string }> = {
  en: { title: "Superbuy Spreadsheet 2026 | Verified Product Index", description: "Browse a curated Superbuy spreadsheet with verified product links, category indexes, USD estimates, QC checkpoints and last-checked listing data." },
  fr: { title: "Tableau Superbuy 2026 | Index de produits vérifiés", description: "Parcourez un tableau Superbuy organisé avec liens produits vérifiés, catégories, estimations en USD et points de contrôle QC." },
  de: { title: "Superbuy Spreadsheet 2026 | Geprüfter Produktindex", description: "Ein kuratiertes Superbuy-Spreadsheet mit geprüften Produktlinks, Kategorien, USD-Schätzungen und QC-Prüfpunkten." },
  id: { title: "Spreadsheet Superbuy 2026 | Indeks Produk Terverifikasi", description: "Jelajahi spreadsheet Superbuy dengan tautan produk terverifikasi, kategori, estimasi USD, dan titik pemeriksaan QC." },
  "zh-cn": { title: "Superbuy 表格 2026｜已核验商品索引", description: "浏览整理后的 Superbuy 商品表格，包含已核验商品链接、分类、美元估价、核验日期和 QC 检查重点。" },
};

export const pageSeo: Record<Lang, Record<SeoRoute, SeoEntry>> = {
  en: {
    finds: { title: "Superbuy Product Finds 2026 | Verified Spreadsheet Links", h1: "Superbuy Product Finds 2026", description: "Browse verified Superbuy spreadsheet finds with matching first images, exact product destinations, USD estimates and QC notes." },
    categories: { title: "Superbuy Spreadsheet Categories | Shoes, Hoodies & Jerseys", h1: "Superbuy Spreadsheet Categories", description: "Browse Superbuy spreadsheet categories including shoes, hoodies, jerseys, bags, electronics and accessories." },
    "qc-guide": { title: "Superbuy QC Photos Guide 2026 | Warehouse Checklist", h1: "Superbuy QC Photos Guide 2026", description: "Use a practical Superbuy warehouse QC checklist to verify product identity, measurements, visible defects and included pieces." },
    shipping: { title: "Superbuy Shipping Cost Guide | Weight & Consolidation", h1: "Superbuy Shipping Cost Guide", description: "Understand Superbuy shipping cost planning, chargeable weight, warehouse storage, parcel consolidation and route selection." },
    articles: { title: "Superbuy Buying Guides | Spreadsheet, QC & Shipping", h1: "Superbuy Buying Guides", description: "Read evidence-led Superbuy guides covering spreadsheet use, warehouse QC photos, shipping costs and consolidation." },
    faq: { title: "Superbuy Spreadsheet FAQ | Products, QC & Shipping", h1: "Superbuy Spreadsheet FAQ", description: "Clear answers about Superbuy spreadsheet links, product prices, QC photos, warehouse storage and international shipping." },
  },
  fr: {
    finds: { title: "Sélections Superbuy 2026 | Liens de tableau vérifiés", h1: "Sélections de produits Superbuy 2026", description: "Consultez des produits Superbuy vérifiés avec première image correspondante, destination exacte, estimation USD et notes QC." },
    categories: { title: "Catégories du tableau Superbuy | Chaussures, sweats et maillots", h1: "Catégories du tableau Superbuy", description: "Parcourez les catégories du tableau Superbuy : chaussures, sweats, maillots, sacs, électronique et accessoires." },
    "qc-guide": { title: "Guide des photos QC Superbuy 2026 | Liste de contrôle", h1: "Guide des photos QC Superbuy 2026", description: "Utilisez une liste pratique pour vérifier identité, mesures, défauts visibles et pièces incluses à l’entrepôt." },
    shipping: { title: "Guide des frais d’expédition Superbuy | Poids et consolidation", h1: "Guide des frais d’expédition Superbuy", description: "Comprenez le poids facturable, le stockage, la consolidation et le choix d’une ligne d’expédition Superbuy." },
    articles: { title: "Guides d’achat Superbuy | Tableau, QC et expédition", h1: "Guides d’achat Superbuy", description: "Lisez des guides Superbuy fondés sur des faits : tableau, photos QC, frais d’expédition et consolidation." },
    faq: { title: "FAQ du tableau Superbuy | Produits, QC et expédition", h1: "FAQ du tableau Superbuy", description: "Réponses claires sur les liens, prix, photos QC, stockage et expédition internationale Superbuy." },
  },
  de: {
    finds: { title: "Superbuy Produktfunde 2026 | Geprüfte Spreadsheet-Links", h1: "Superbuy Produktfunde 2026", description: "Geprüfte Superbuy-Funde mit passendem Hauptbild, exaktem Produktziel, USD-Schätzung und QC-Hinweisen." },
    categories: { title: "Superbuy Spreadsheet-Kategorien | Schuhe, Hoodies & Trikots", h1: "Superbuy Spreadsheet-Kategorien", description: "Superbuy-Kategorien für Schuhe, Hoodies, Trikots, Taschen, Elektronik und Accessoires durchsuchen." },
    "qc-guide": { title: "Superbuy QC-Foto-Guide 2026 | Lager-Checkliste", h1: "Superbuy QC-Foto-Guide 2026", description: "Mit einer praktischen Checkliste Identität, Maße, sichtbare Mängel und Lieferumfang im Lager prüfen." },
    shipping: { title: "Superbuy Versandkosten-Guide | Gewicht & Konsolidierung", h1: "Superbuy Versandkosten-Guide", description: "Superbuy-Versandkosten, berechenbares Gewicht, Lagerung, Konsolidierung und Routenwahl verstehen." },
    articles: { title: "Superbuy Kaufratgeber | Spreadsheet, QC & Versand", h1: "Superbuy Kaufratgeber", description: "Faktenbasierte Superbuy-Ratgeber zu Spreadsheet-Nutzung, QC-Fotos, Versandkosten und Konsolidierung." },
    faq: { title: "Superbuy Spreadsheet FAQ | Produkte, QC & Versand", h1: "Superbuy Spreadsheet FAQ", description: "Klare Antworten zu Superbuy-Links, Preisen, QC-Fotos, Lagerung und internationalem Versand." },
  },
  id: {
    finds: { title: "Temuan Produk Superbuy 2026 | Tautan Spreadsheet Terverifikasi", h1: "Temuan Produk Superbuy 2026", description: "Jelajahi temuan Superbuy terverifikasi dengan gambar utama yang cocok, tujuan tepat, estimasi USD, dan catatan QC." },
    categories: { title: "Kategori Spreadsheet Superbuy | Sepatu, Hoodie & Jersey", h1: "Kategori Spreadsheet Superbuy", description: "Jelajahi kategori Superbuy untuk sepatu, hoodie, jersey, tas, elektronik, dan aksesori." },
    "qc-guide": { title: "Panduan Foto QC Superbuy 2026 | Checklist Gudang", h1: "Panduan Foto QC Superbuy 2026", description: "Gunakan checklist praktis untuk memeriksa identitas, ukuran, cacat terlihat, dan kelengkapan produk di gudang." },
    shipping: { title: "Panduan Biaya Pengiriman Superbuy | Berat & Konsolidasi", h1: "Panduan Biaya Pengiriman Superbuy", description: "Pahami berat tertagih, penyimpanan gudang, konsolidasi paket, dan pemilihan jalur Superbuy." },
    articles: { title: "Panduan Belanja Superbuy | Spreadsheet, QC & Pengiriman", h1: "Panduan Belanja Superbuy", description: "Baca panduan Superbuy berbasis fakta tentang spreadsheet, foto QC, biaya pengiriman, dan konsolidasi." },
    faq: { title: "FAQ Spreadsheet Superbuy | Produk, QC & Pengiriman", h1: "FAQ Spreadsheet Superbuy", description: "Jawaban jelas tentang tautan produk, harga, foto QC, penyimpanan, dan pengiriman internasional Superbuy." },
  },
  "zh-cn": {
    finds: { title: "Superbuy 商品推荐 2026｜已核验表格链接", h1: "Superbuy 已核验商品推荐 2026", description: "浏览已核验的 Superbuy 商品，包含匹配首图、准确商品链接、美元估价和 QC 检查重点。" },
    categories: { title: "Superbuy 表格分类｜鞋类、卫衣与球衣", h1: "Superbuy 商品表格分类", description: "按鞋类、卫衣、球衣、包袋、电子产品和配饰浏览 Superbuy 商品表格。" },
    "qc-guide": { title: "Superbuy QC 图片指南 2026｜仓库检查清单", h1: "Superbuy QC 图片指南 2026", description: "使用实用清单检查商品身份、尺寸、可见瑕疵和配件是否完整。" },
    shipping: { title: "Superbuy 运费指南｜计费重量与合包", h1: "Superbuy 运费与合包指南", description: "了解 Superbuy 计费重量、免费仓储、包裹合并和运输线路选择。" },
    articles: { title: "Superbuy 购买指南｜表格、QC 与运输", h1: "Superbuy 购买与研究指南", description: "阅读基于事实的 Superbuy 表格使用、仓库 QC、运费和合包指南。" },
    faq: { title: "Superbuy 表格常见问题｜商品、QC 与运输", h1: "Superbuy 表格常见问题", description: "了解 Superbuy 商品链接、价格、QC 图片、仓储和国际运输的常见问题。" },
  },
};

export const guideUi: Record<Lang, { nav: string; title: string; text: string; related: string }> = {
  en: { nav: "Buying Guides", title: "Buying guides people can use.", text: "Original, evidence-led guides answer practical questions on dedicated pages.", related: "Related guides" },
  fr: { nav: "Guides d’achat", title: "Des guides d’achat vraiment utiles.", text: "Des guides originaux et documentés répondent aux questions pratiques sur des pages dédiées.", related: "Guides associés" },
  de: { nav: "Kaufratgeber", title: "Kaufratgeber mit echtem Nutzwert.", text: "Eigene, belegte Leitfäden beantworten praktische Fragen auf separaten Seiten.", related: "Ähnliche Ratgeber" },
  id: { nav: "Panduan Belanja", title: "Panduan belanja yang benar-benar berguna.", text: "Panduan asli berbasis bukti menjawab pertanyaan praktis di halaman khusus.", related: "Panduan terkait" },
  "zh-cn": { nav: "购买指南", title: "真正实用的购买指南。", text: "基于公开事实的原创指南，在独立页面回答实际购买问题。", related: "相关指南" },
};

type TrustPage = { title: string; description: string; eyebrow: string; sections: { title: string; text: string }[] };

const englishTrust: Record<TrustRoute, TrustPage> = {
  about: { eyebrow: "About this index", title: "About Spreadsheets Superbuy", description: "Why this independent product index exists and how its verified links are maintained.", sections: [
    { title: "Our purpose", text: "Spreadsheets Superbuy is an independent discovery and research website. It organizes a small set of product destinations and practical buying guides so readers can verify a listing before making a warehouse or shipping decision." },
    { title: "What we verify", text: "For every displayed product, we compare the card title, first image and destination URL. Prices are approximate planning figures; the destination page remains the source for current price, options and availability." },
    { title: "What we do not claim", text: "We do not sell products, guarantee stock or provide professional authentication. QC photos can show visible evidence, but they cannot prove composition, comfort, authenticity or long-term durability." },
  ] },
  "editorial-policy": { eyebrow: "Research standards", title: "Editorial Policy", description: "The checks used before a product card or buying guide is published.", sections: [
    { title: "Evidence first", text: "Platform features and workflow claims are checked against publicly available Superbuy guidance. We avoid fixed promises about prices, delivery times, customs outcomes or route availability because these can change." },
    { title: "Product-link checks", text: "A product card is published only after its title, first image and destination have been compared. A visible last-checked date records when that comparison was made." },
    { title: "Corrections", text: "Listings can change after publication. If a link, image or option no longer matches, the card should be corrected or removed rather than silently redirected to an unrelated product." },
  ] },
  privacy: { eyebrow: "Visitor information", title: "Privacy Policy", description: "A concise explanation of referral parameters and ordinary hosting data.", sections: [
    { title: "No account system", text: "This website does not provide visitor accounts, checkout or direct product sales. Search terms are sent to the destination catalog only when a visitor submits the search form." },
    { title: "Referral measurement", text: "Outbound links may contain UTM parameters so the destination can identify traffic from this website. These parameters describe the referral source and page type; they do not contain the visitor’s name or contact details." },
    { title: "Hosting logs", text: "The hosting and security providers may process standard technical data such as IP address, browser type and request time to deliver and protect the website." },
  ] },
  terms: { eyebrow: "Important limitations", title: "Terms & Disclaimer", description: "The limits of this independent spreadsheet, price estimates and shipping information.", sections: [
    { title: "Independent information", text: "This website is an independent product-discovery guide and is not the seller. Product, warehouse and shipping decisions are completed on the relevant destination services." },
    { title: "Prices and availability", text: "USD figures are approximate conversions for comparison only. Exchange rates, domestic delivery, service charges, international shipping, taxes, customs and stock can change the final amount." },
    { title: "Use current evidence", text: "Before paying, verify the live product page, selected option, current platform policy and the route shown for the actual parcel. Informational content is not a delivery, quality or customs guarantee." },
  ] },
};

export const trustPages: Record<Lang, Record<TrustRoute, TrustPage>> = {
  en: englishTrust,
  fr: {
    about: { eyebrow: "À propos de l’index", title: "À propos de Spreadsheets Superbuy", description: "Pourquoi cet index indépendant existe et comment ses liens sont vérifiés.", sections: [
      { title: "Notre objectif", text: "Spreadsheets Superbuy est un site indépendant de découverte et de recherche. Il organise des destinations produits et des guides pratiques afin de vérifier une annonce avant une décision d’entrepôt ou d’expédition." },
      { title: "Nos vérifications", text: "Pour chaque produit, nous comparons le titre, la première image et l’URL de destination. Les prix sont des estimations ; la page de destination reste la référence." },
      { title: "Nos limites", text: "Nous ne vendons aucun produit, ne garantissons pas le stock et ne réalisons pas d’authentification professionnelle." },
    ] },
    "editorial-policy": { eyebrow: "Normes de recherche", title: "Politique éditoriale", description: "Les contrôles réalisés avant publication.", sections: [
      { title: "Des preuves d’abord", text: "Les informations sur le fonctionnement de Superbuy sont vérifiées dans ses guides publics. Nous évitons les promesses fixes sur prix, délais, douane et lignes disponibles." },
      { title: "Contrôle des liens", text: "Une carte est publiée après comparaison du titre, de la première image et de la destination, avec une date de dernière vérification visible." },
      { title: "Corrections", text: "Si un lien ou une image ne correspond plus, la carte doit être corrigée ou retirée, jamais redirigée vers un produit sans rapport." },
    ] },
    privacy: { eyebrow: "Informations visiteurs", title: "Politique de confidentialité", description: "Paramètres de recommandation et données techniques ordinaires.", sections: [
      { title: "Aucun compte", text: "Le site ne propose ni compte, ni paiement, ni vente directe. Les termes de recherche sont transmis au catalogue seulement après envoi du formulaire." },
      { title: "Mesure des recommandations", text: "Les liens peuvent contenir des paramètres UTM indiquant la source et le type de page, sans nom ni coordonnées du visiteur." },
      { title: "Journaux d’hébergement", text: "Les fournisseurs d’hébergement et de sécurité peuvent traiter des données techniques standard pour fournir et protéger le site." },
    ] },
    terms: { eyebrow: "Limites importantes", title: "Conditions et avertissement", description: "Limites du tableau, des estimations et des informations d’expédition.", sections: [
      { title: "Information indépendante", text: "Ce site est un guide indépendant et n’est pas le vendeur. Les décisions d’achat et d’expédition sont prises sur les services de destination." },
      { title: "Prix et disponibilité", text: "Les montants USD sont des conversions approximatives. Le change, les frais, le transport, les taxes, la douane et le stock peuvent modifier le total." },
      { title: "Vérifier avant paiement", text: "Contrôlez la page active, l’option choisie, la politique actuelle et la ligne disponible pour le colis réel." },
    ] },
  },
  de: {
    about: { eyebrow: "Über diesen Index", title: "Über Spreadsheets Superbuy", description: "Warum dieser unabhängige Index existiert und wie Links geprüft werden.", sections: [
      { title: "Unser Zweck", text: "Spreadsheets Superbuy ist eine unabhängige Recherche- und Entdeckungsseite. Produktziele und Ratgeber helfen, Angebote vor Lager- oder Versandentscheidungen zu prüfen." },
      { title: "Was wir prüfen", text: "Bei jedem Produkt vergleichen wir Titel, Hauptbild und Ziel-URL. Preise sind Näherungswerte; die Zielseite bleibt die aktuelle Referenz." },
      { title: "Keine Garantien", text: "Wir verkaufen keine Produkte, garantieren keinen Bestand und bieten keine professionelle Authentifizierung." },
    ] },
    "editorial-policy": { eyebrow: "Recherche-Standards", title: "Redaktionsrichtlinie", description: "Prüfungen vor Veröffentlichung einer Karte oder eines Ratgebers.", sections: [
      { title: "Belege zuerst", text: "Aussagen zu Superbuy werden anhand öffentlicher Anleitungen geprüft. Feste Versprechen zu Preisen, Laufzeiten, Zoll oder Routen werden vermieden." },
      { title: "Link-Prüfung", text: "Karten erscheinen erst nach Abgleich von Titel, Hauptbild und Ziel. Das sichtbare Prüfdatum dokumentiert den Zeitpunkt." },
      { title: "Korrekturen", text: "Ändert sich ein Angebot, wird die Karte korrigiert oder entfernt und nicht auf ein fremdes Produkt umgeleitet." },
    ] },
    privacy: { eyebrow: "Besucherinformationen", title: "Datenschutz", description: "Hinweise zu Referral-Parametern und technischen Hosting-Daten.", sections: [
      { title: "Keine Konten", text: "Die Website bietet keine Konten, Kasse oder Direktverkäufe. Suchbegriffe werden erst nach Absenden an den Zielkatalog übertragen." },
      { title: "Referral-Messung", text: "Links können UTM-Parameter für Quelle und Seitentyp enthalten, jedoch keinen Namen oder Kontaktdaten des Besuchers." },
      { title: "Hosting-Protokolle", text: "Hosting- und Sicherheitsanbieter können technische Standarddaten zur Bereitstellung und Absicherung verarbeiten." },
    ] },
    terms: { eyebrow: "Wichtige Grenzen", title: "Bedingungen & Haftungshinweis", description: "Grenzen des Index, der Schätzwerte und Versandinformationen.", sections: [
      { title: "Unabhängige Information", text: "Diese Website ist ein unabhängiger Produktfinder und nicht der Verkäufer. Kauf- und Versandentscheidungen erfolgen bei den Zielservices." },
      { title: "Preise und Bestand", text: "USD-Werte sind ungefähre Umrechnungen. Wechselkurs, Gebühren, Versand, Steuern, Zoll und Bestand können den Endbetrag ändern." },
      { title: "Aktuelle Daten prüfen", text: "Vor Zahlung die aktive Produktseite, Option, aktuelle Richtlinie und verfügbare Route für das echte Paket prüfen." },
    ] },
  },
  id: {
    about: { eyebrow: "Tentang indeks", title: "Tentang Spreadsheets Superbuy", description: "Alasan indeks independen ini dibuat dan cara tautan diperiksa.", sections: [
      { title: "Tujuan kami", text: "Spreadsheets Superbuy adalah situs penemuan dan riset independen. Tujuannya membantu pembaca memeriksa produk sebelum mengambil keputusan gudang atau pengiriman." },
      { title: "Yang kami periksa", text: "Setiap kartu dibandingkan pada judul, gambar utama, dan URL tujuan. Harga adalah perkiraan; halaman tujuan tetap menjadi rujukan terkini." },
      { title: "Batas klaim", text: "Kami tidak menjual produk, menjamin stok, atau menyediakan autentikasi profesional." },
    ] },
    "editorial-policy": { eyebrow: "Standar riset", title: "Kebijakan Editorial", description: "Pemeriksaan sebelum kartu atau panduan diterbitkan.", sections: [
      { title: "Bukti lebih dulu", text: "Klaim tentang alur Superbuy diperiksa dari panduan publik. Kami menghindari janji tetap tentang harga, waktu kirim, bea cukai, atau jalur." },
      { title: "Pemeriksaan tautan", text: "Kartu diterbitkan setelah judul, gambar utama, dan tujuan dibandingkan. Tanggal pemeriksaan terakhir ditampilkan." },
      { title: "Koreksi", text: "Jika tautan atau gambar tidak lagi cocok, kartu dikoreksi atau dihapus, bukan dialihkan ke produk lain." },
    ] },
    privacy: { eyebrow: "Informasi pengunjung", title: "Kebijakan Privasi", description: "Penjelasan singkat tentang parameter rujukan dan data hosting.", sections: [
      { title: "Tanpa akun", text: "Situs ini tidak menyediakan akun, checkout, atau penjualan langsung. Kata pencarian dikirim setelah formulir diajukan." },
      { title: "Pengukuran rujukan", text: "Tautan dapat memuat parameter UTM untuk menunjukkan sumber dan jenis halaman, tanpa nama atau kontak pengunjung." },
      { title: "Log hosting", text: "Penyedia hosting dan keamanan dapat memproses data teknis standar untuk mengirimkan dan melindungi situs." },
    ] },
    terms: { eyebrow: "Batas penting", title: "Ketentuan & Penafian", description: "Batas spreadsheet, estimasi harga, dan informasi pengiriman.", sections: [
      { title: "Informasi independen", text: "Situs ini adalah panduan independen dan bukan penjual. Keputusan pembelian dan pengiriman dilakukan pada layanan tujuan." },
      { title: "Harga dan ketersediaan", text: "Angka USD adalah konversi perkiraan. Kurs, biaya, pengiriman, pajak, bea cukai, dan stok dapat mengubah total." },
      { title: "Periksa data terbaru", text: "Sebelum membayar, periksa halaman aktif, opsi, kebijakan terbaru, dan jalur untuk paket sebenarnya." },
    ] },
  },
  "zh-cn": {
    about: { eyebrow: "关于本索引", title: "关于 Spreadsheets Superbuy", description: "说明本站的独立定位以及商品链接核验方式。", sections: [
      { title: "网站目的", text: "Spreadsheets Superbuy 是独立的商品发现和研究网站，用整理后的商品入口与实用指南，帮助读者在作出仓库或运输决定前核对信息。" },
      { title: "核验内容", text: "每张商品卡都会比对标题、首图和目标网址。美元价格仅作估算，实时价格、选项和库存以目标页面为准。" },
      { title: "不作保证", text: "本站不销售商品、不保证库存，也不提供专业鉴定。QC 图片只能证明可见信息。" },
    ] },
    "editorial-policy": { eyebrow: "研究标准", title: "编辑政策", description: "商品卡和购买指南发布前采用的核验标准。", sections: [
      { title: "事实优先", text: "平台流程与功能以 Superbuy 的公开指南为依据，不对价格、时效、海关结果或线路可用性作固定承诺。" },
      { title: "商品链接检查", text: "商品卡只有在标题、首图和目标网址完成比对后才会发布，并显示最后核验日期。" },
      { title: "更正原则", text: "如果链接、图片或选项不再匹配，应修正或移除商品卡，而不是跳转到无关商品。" },
    ] },
    privacy: { eyebrow: "访客信息", title: "隐私政策", description: "说明推荐参数与常规托管数据的使用。", sections: [
      { title: "没有账户系统", text: "本站不提供访客账户、结账或直接销售。只有访客提交搜索表单时，关键词才会发送至目标目录。" },
      { title: "推荐来源统计", text: "外链可能包含 UTM 参数，用于识别访问来源和页面类型，不包含访客姓名或联系方式。" },
      { title: "托管日志", text: "托管和安全服务商可能处理 IP、浏览器类型和请求时间等标准技术数据，以提供和保护网站。" },
    ] },
    terms: { eyebrow: "重要限制", title: "条款与免责声明", description: "说明商品索引、价格估算和运输信息的适用范围。", sections: [
      { title: "独立信息网站", text: "本站是独立商品发现指南，不是卖家。商品购买、仓库服务和运输决定均在相应目标服务中完成。" },
      { title: "价格与库存", text: "美元金额只是近似换算。汇率、境内运费、服务费、国际运输、税费、海关与库存都会影响最终金额。" },
      { title: "以实时信息为准", text: "付款前请核对实时商品页、所选规格、当前平台政策以及实际包裹可用的运输线路。" },
    ] },
  },
};
