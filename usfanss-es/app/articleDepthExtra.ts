import type { Lang } from "./i18n";

export const localizedDepthExtra: Partial<Record<Lang, string[][]>> = {
  zh: [
    [
      "还应记录实际使用者、使用气候和可以接受的不确定性。这样能用同一套标准比较相似商品，减少冲动下单。关键测量没有提供，就应当视为信息缺失，而不是默认尺寸符合要求；必要时应在付款前询问。",
      "商品标题只能作为入口。继续查看规格选择、描述、尺码表、卖家图片、国内发货时间和代理提示。同一商品出现多个批次时，应寻找可以测量或清楚说明的差异；‘高配’之类词语不能代替可验证规格。",
      "建议同时保存单件成本表和预计包裹成本表，判断便宜配饰是真正增加使用价值，还是只增加计费重量。比较线路时要看完整费用、追踪、限制、时效范围和保障，而不是只看一个最低起步价格。",
      "缺少决定性角度时，只申请一张具体照片或一个具体测量，并先确认当前费用。尽量查看原始高清文件，不依赖压缩截图。把商品页、规格、订单和 QC 放在同一记录中，后续比较就不需要依赖记忆。",
      "售后未结束前不要把商品加入国际包裹。有效说明应包含下单内容、照片显示的事实、差异为什么会影响决定以及希望采取的处理方式。代理或卖家回复的条件也要保存，避免后续沟通出现新的歧义。",
      "合并前还要判断一个受限商品是否会迫使整包使用特殊线路。根据当时报价比较一个包裹与拆成两个包裹的结果；不存在适用于所有国家的理想重量，目的地、内容、限制和实时规则共同决定可用方案。",
      "即使链接上周能够使用，也应再次核对。价格、库存、卖家行为和线路都会变化。真正有价值的索引不是链接最多，而是能进入当前有效页面、留下完整证据，并清楚说明每件商品为什么值得占用包裹空间。"
    ],
    [
      "QC 的目的不是说服自己商品完美，而是区分仍可处理的可见差异，以及相机无法解决的不确定性。折叠、仓库灯光、拍摄距离和透视都会改变外观，因此重要结论应尽量由多个角度共同支持。",
      "卖家修改页面前就要保存参考。如果商品存在不同测量方法，应记录具体测量点，因为名称相同的数据也可能取自不同位置。这样追加测量时可以提出准确要求，而不是让仓库笼统地‘全部检查一下’。",
      "裤子还需要检查腰部、裤裆、腿型、口袋和裤脚。不要从阴影推断面料克重、成分或手感。应优先处理错误颜色、错误尺码、配件缺少、破洞、污渍、图案歪斜以及超过预设容差的测量。",
      "打包前决定鞋盒是否属于购买价值的一部分。保留鞋盒可以提供结构或收藏价值，但会增加体积；去掉可能降低运输费用，也会降低保护。这个选择应结合可用线路、鞋子类型和对外包装损伤的容忍度。",
      "逐一清点小配件，并对照商品页确认所有可拆卸部件。反光或金属表面应比较多张图片后再判断颜色和表面问题。外观检查与物流资格要分开：商品外观正确，仍可能属于某些线路的限制类别。",
      "追加证据到达后必须作出决定。如果新照片消除疑问且在容差内，就可以接受；如果确认重大差异，就应启动售后。不断申请不会改变结论的照片，只会消耗可能很短的处理时间，并不会让证据更有价值。",
      "商品页的通用说明不能代替具体订单条款。定制、卫生限制、包装状态、商品状态和中国境内退回费用都可能改变结果。在退货、换货或接受决定完全结束前，应让商品保持在国际包裹之外。",
      "所有商品都按照同一顺序检查，并给每一项做标记。这样一张好看的照片就不会掩盖错误尺码或缺失配件。QC 最终应形成一份可说明、可重复的决定记录，而不只是浏览图片之后的主观感觉。"
    ],
    [
      "商品页重量和尺寸只是计划数据。最终包裹还包含外箱、合并方式和保护材料。去掉零售包装可能减少空间，护角、气泡膜或加固会增加重量和尺寸；计算时必须使用当前线路公式，而不是记忆中的旧除数。",
      "预算中要给仓库测量差异留出余量。体积大但商品价低的物品特别需要注意：鞋盒、玩偶、结构化包和厚外套都可能产生较高体积重，即使单价很低，也会改变整个包裹的经济性。",
      "不要在未检查限制时，把普通衣服与电池、液体、磁性物品、化妆品、食品、易碎品或敏感类别混合。拆开特殊商品有时能释放更好的线路，但第二个包裹的基础费用也可能抵消节省，必须比较实时可用方案。",
      "预演比简单相加商品重量更有参考价值，但仍早于承运商最终认定。包装指示要和内容匹配，并重新查看账户中服务说明及费用。功能、线路资格和价格都可能变化，不能把一次结果写成长期保证。",
      "保存最终选择线路的条款截图。预计时效不是约定日期，卖家发货、仓库处理、出口、航班、海关和末端派送都会造成波动。高价值包裹中，清楚追踪和适合的赔付范围可能比理论上快几天更重要。",
      "税费和限制应查询目的地国家官方海关资料，其他国家买家的总费用不能预测你的结果。购买保障前核对除外商品、承保事件、证据要求、赔付上限和申请期限，确认保护范围与包裹内容真正匹配。",
      "遵守承运商的字符长度、转写和格式要求，申报描述必须准确清楚，不能复制其他人的随机写法。追踪短暂停顿不等于丢失，应先根据线路规定的时间阈值和支持渠道处理，再判断是否需要查询或索赔。",
      "最高预算可以避免所有商品入库后被迫接受不合理报价。超过上限时，重新检查商品、鞋盒、保护、拆包和线路。最终付款前再次确认收件人、已接受商品、已排除退货、包装指示、打包尺寸和实时线路条件。"
    ]
  ],
  pt: [
    [
      "Registe também quem vai usar, o clima e a incerteza aceitável. Esta nota limita compras impulsivas e permite comparar páginas pela mesma regra. A ausência de uma medida essencial significa informação em falta, não confirmação implícita.",
      "O título é apenas o início. Reveja seletores, descrição, fotos, entrega doméstica e avisos. Com vários lotes procure diferenças mensuráveis; palavras como ‘premium’ não substituem uma especificação verificável antes e depois da compra.",
      "Mantenha um total por artigo e outro para o pacote previsto. Assim verá se um acessório barato acrescenta valor ou apenas peso faturável. Compare linhas elegíveis por custo completo, tracking, limites, prazo e proteção.",
      "Se faltar um ângulo decisivo, peça foto ou medida específica após confirmar a taxa. Amplie ficheiros originais. Guarde página, variante, encomenda e QC juntos para comparar com provas datadas, não com memória.",
      "Não coloque o artigo no pacote enquanto o caso estiver aberto. Um relatório eficaz indica encomenda, prova visível, importância da diferença e solução pretendida. Guarde também respostas e condições comunicadas na negociação.",
      "Confirme se um artigo limitado força uma linha especial para o resto. Compare um pacote e dois envios com tarifas atuais; não existe peso ideal universal. Destino, conteúdo, limites e regras live determinam a opção utilizável.",
      "Volte a verificar mesmo um link recente. Stock, preço, vendedor e linhas mudam. O melhor índice conduz a dados atuais, preserva provas claras e explica por que cada artigo merece entrar no pacote."
    ],
    [
      "O objetivo não é provar perfeição, mas separar um erro visível e resolúvel de uma dúvida que a câmara não esclarece. Dobras, luz e perspetiva alteram o aspeto; sustente conclusões importantes em várias vistas.",
      "Guarde a referência antes de a página mudar. Quando houver métodos de medição diferentes, registe os pontos usados. Isso permite pedir uma medida concreta em vez de uma revisão geral pouco útil.",
      "Nas calças verifique cintura, gancho, perna, bolsos e bainha. Não deduza gramagem, composição ou toque pela sombra. Priorize cor ou tamanho errados, peças em falta, buracos, manchas, gráfico torto e medidas fora da tolerância.",
      "Decida antes se a caixa faz parte do valor. Mantê-la dá estrutura ou valor de coleção, mas aumenta volume; removê-la pode reduzir custo e proteção. Relacione a escolha com linha e tolerância a danos.",
      "Conte peças pequenas e compare elementos removíveis. Avalie superfícies refletoras em várias imagens. Separe controlo visual e logística: um artigo correto pode continuar limitado em certas linhas.",
      "Depois da foto adicional, decida. Se resolve a dúvida dentro da tolerância, aceite; se confirma discrepância importante, inicie pós-venda. Pedir imagens sem alterar o resultado consome a janela disponível.",
      "O texto geral da página não substitui termos da encomenda. Personalização, higiene, embalagem alterada, estado e custo de retorno podem mudar o resultado. Mantenha o artigo fora do pacote até decisão final.",
      "Use sempre a mesma ordem e marque cada ponto. Uma foto atraente não desviará a atenção de tamanho errado ou acessório ausente. O QC deve produzir uma decisão documentada e repetível."
    ],
    [
      "Peso e dimensões da página são dados de planeamento. O pacote final inclui caixa, consolidação e proteção. Retirar embalagem pode reduzir espaço, enquanto reforço aumenta peso e medidas; use a fórmula da linha ativa.",
      "Adicione margem para diferenças de medição. Artigos grandes e baratos exigem atenção: caixa de sapatos, peluche, mala estruturada ou casaco acolchoado podem criar muito peso volumétrico e alterar o custo do pacote.",
      "Não misture sem controlo roupa com baterias, líquidos, ímanes, cosméticos, alimentos, frágeis ou categorias sensíveis. Separar pode libertar uma linha melhor, mas uma segunda taxa base pode eliminar a vantagem.",
      "Rehearsal informa melhor do que somar pesos, mas antecede a avaliação final do transportador. Dê instruções adequadas e confirme descrição e taxa. Funções, disponibilidade e preços podem mudar.",
      "Guarde os termos da linha. O prazo é um intervalo: vendedor, armazém, exportação, voo, alfândega e entrega criam variação. Em pacotes valiosos, tracking e compensação podem importar mais do que alguns dias.",
      "Use fontes aduaneiras oficiais do país. O total de outro comprador não prevê o seu. Antes da proteção confirme exclusões, eventos cobertos, provas, limite e prazo de reclamação.",
      "Respeite transliteração, comprimento e formato do transportador. A declaração deve ser correta; não copie uma aleatória. Se o tracking parar, use o limite e canal indicados antes de concluir perda.",
      "O teto de orçamento evita sentir-se obrigado a pagar após armazenamento. Se excedido, reveja artigo, caixa, proteção, divisão e linha. Antes de pagar confirme destinatário, conteúdo, devoluções, instruções, medidas e condições."
    ]
  ],
  pl: [
    [
      "Zapisz też użytkownika, klimat i akceptowalną niepewność. Taka notatka ogranicza zakupy impulsywne i pozwala porównywać oferty tą samą metodą. Brak kluczowego wymiaru oznacza brak informacji, a nie domyślne potwierdzenie.",
      "Tytuł jest początkiem. Sprawdź selektory, opis, zdjęcia, dostawę krajową i ostrzeżenia. Przy kilku partiach szukaj mierzalnych różnic; słowo ‘premium’ nie zastępuje specyfikacji, którą można zweryfikować po przyjęciu.",
      "Prowadź sumę dla produktu i planowanej paczki. Zobaczysz, czy tani dodatek daje wartość, czy tylko zwiększa wagę. Porównuj dopuszczalne linie według pełnego kosztu, trackingu, ograniczeń, czasu i ochrony.",
      "Jeśli brakuje ważnego ujęcia, zamów konkretne zdjęcie lub pomiar po sprawdzeniu opłaty. Powiększaj oryginały. Zachowaj ofertę, wariant, zamówienie i QC razem, aby porównanie opierało się na datowanych dowodach.",
      "Nie dodawaj rzeczy do paczki, gdy sprawa jest otwarta. Dobre zgłoszenie podaje zamówienie, widoczny dowód, znaczenie różnicy i oczekiwane rozwiązanie. Zachowaj odpowiedzi i warunki przekazane podczas negocjacji.",
      "Sprawdź, czy jeden ograniczony artykuł nie wymusza specjalnej linii dla reszty. Porównaj jedną i dwie paczki według aktualnych stawek; nie istnieje uniwersalna idealna waga. Liczą się kraj, zawartość, limity i bieżące zasady.",
      "Weryfikuj ponownie nawet świeży link. Stan, cena, sprzedawca i linie zmieniają się. Dobry indeks prowadzi do aktualnych danych, zachowuje jasny ślad dowodów i wyjaśnia, dlaczego każdy produkt trafia do paczki."
    ],
    [
      "Celem nie jest udowodnienie perfekcji, lecz oddzielenie widocznego, możliwego do rozwiązania błędu od niepewności kamery. Złożenie, światło i perspektywa zmieniają wygląd; ważne wnioski opieraj na kilku ujęciach.",
      "Zapisz referencję przed zmianą oferty. Przy różnych metodach pomiaru zanotuj punkty, bo wartości o tej samej nazwie mogą być mierzone inaczej. Dzięki temu poprosisz o konkretny pomiar zamiast ogólnej kontroli.",
      "W spodniach sprawdź pas, stan, nogawkę, kieszenie i dół. Nie wnioskuj o gramaturze, składzie ani dotyku z cienia. Priorytetem są błędny kolor lub rozmiar, brak części, dziura, plama, krzywy nadruk i pomiar poza tolerancją.",
      "Zdecyduj wcześniej, czy pudełko jest częścią wartości. Daje strukturę lub walor kolekcjonerski, ale zwiększa objętość; usunięcie może obniżyć koszt i ochronę. Powiąż wybór z linią i tolerancją uszkodzeń.",
      "Policz drobne części i porównaj elementy odpinane. Powierzchnie odblaskowe oceniaj na kilku zdjęciach. Oddziel kontrolę wizualną od logistyki: poprawny produkt może nadal być ograniczony w niektórych liniach.",
      "Po dodatkowym zdjęciu podejmij decyzję. Jeśli rozwiązuje wątpliwość w granicach tolerancji, zaakceptuj; jeśli potwierdza istotny błąd, rozpocznij zwrot. Kolejne zdjęcia bez wpływu na wynik zużywają czas.",
      "Ogólny tekst oferty nie zastępuje warunków zamówienia. Personalizacja, higiena, zmienione opakowanie, stan i koszt zwrotu mogą zmienić wynik. Trzymaj produkt poza paczką do ostatecznej decyzji.",
      "Stosuj tę samą kolejność i zaznaczaj każdy punkt. Atrakcyjne zdjęcie nie odwróci wtedy uwagi od złego rozmiaru lub brakującego dodatku. QC ma prowadzić do udokumentowanej, powtarzalnej decyzji."
    ],
    [
      "Waga i wymiary oferty są danymi planistycznymi. Paczka obejmuje karton, konsolidację i ochronę. Usunięcie opakowania może zmniejszyć przestrzeń, a wzmocnienie ją zwiększa; używaj wzoru aktywnej linii.",
      "Dodaj margines pomiaru. Duże tanie rzeczy wymagają uwagi: pudełko butów, pluszak, torba strukturalna lub kurtka puchowa mogą stworzyć dużą wagę gabarytową i zmienić koszt całej paczki.",
      "Nie mieszaj bez kontroli ubrań z bateriami, płynami, magnesami, kosmetykami, żywnością, kruchymi lub wrażliwymi kategoriami. Podział może uwolnić lepszą linię, lecz druga opłata bazowa może usunąć korzyść.",
      "Rehearsal jest lepszy niż suma wag, ale poprzedza ocenę przewoźnika. Podaj instrukcje odpowiednie do zawartości i sprawdź opis oraz opłatę. Funkcje, dostępność i ceny mogą się zmieniać.",
      "Zachowaj warunki linii. Zakres dostawy nie jest terminem: sprzedawca, magazyn, eksport, lot, odprawa i kurier powodują zmienność. Przy wartościowej paczce tracking i odszkodowanie mogą być ważniejsze niż kilka dni.",
      "Korzystaj z oficjalnych źródeł celnych kraju. Wynik kupującego z innego państwa nie przewiduje twojego. Przed ochroną sprawdź wyłączenia, zdarzenia, dowody, limit i termin roszczenia.",
      "Przestrzegaj transliteracji, długości i formatu przewoźnika. Deklaracja ma być poprawna; nie kopiuj losowej. Gdy tracking stoi, użyj progu i kanału linii, zanim uznasz paczkę za utraconą.",
      "Maksymalny budżet zapobiega przymusowi zapłaty po magazynowaniu. Po przekroczeniu sprawdź produkt, pudełko, ochronę, podział i linię. Przed płatnością potwierdź odbiorcę, zawartość, zwroty, instrukcje, wymiary i warunki."
    ]
  ],
  it: [
    [
      "Annota anche destinatario, clima d’uso e incertezza accettabile. Questa nota limita gli acquisti impulsivi e rende confrontabili schede simili. Se manca una misura essenziale, trattala come informazione assente, non come conferma implicita.",
      "Il titolo è solo l’inizio. Controlla selettori, descrizione, foto, consegna interna e avvisi. Con più lotti cerca differenze misurabili: parole come ‘premium’ non sostituiscono una specifica utile prima del pagamento e verificabile dopo l’arrivo.",
      "Mantieni un totale per articolo e uno per il pacco previsto. Capirai se un accessorio economico aggiunge valore o solo peso fatturabile. Confronta linee idonee per costo completo, tracking, limiti, tempi indicativi e protezione, non per una cifra iniziale isolata.",
      "Se manca un’angolazione decisiva, chiedi una foto o misura specifica e verifica prima la tariffa. Ingrandisci i file originali quando possibile. Conserva insieme scheda, variante, ordine e QC affinché il confronto dipenda da prove datate e non dalla memoria.",
      "Non inserire l’articolo nel pacco mentre il caso è aperto. Una segnalazione efficace spiega cosa è stato ordinato, cosa mostra la prova, perché la differenza conta e quale soluzione si richiede. Salva anche risposte e condizioni comunicate durante la negoziazione.",
      "Prima di consolidare verifica se un articolo limitato obbliga tutto il resto a una linea speciale. Confronta un pacco e due invii con tariffe attuali; non esiste un peso ideale universale. Destinazione, contenuto, limiti e regole live determinano l’opzione utilizzabile.",
      "Ripeti la verifica anche se il link funzionava di recente. Stock, prezzo, venditore e linee cambiano. Il miglior indice non accumula più link: conduce a dati attuali, conserva prove chiare e spiega perché ogni articolo merita spazio nel pacco."
    ],
    [
      "Lo scopo non è convincersi che l’articolo sia perfetto, ma separare un difetto visibile e gestibile da un dubbio che la fotocamera non risolve. Pieghe, luce e prospettiva alterano l’aspetto; usa quindi più viste per ogni conclusione importante.",
      "Salva il riferimento prima che il venditore lo modifichi. Se esistono metodi di misura diversi, annota i punti usati: valori con lo stesso nome possono essere rilevati diversamente. Così potrai chiedere una misura mirata invece di una generica revisione completa.",
      "Per i pantaloni aggiungi vita, cavallo, forma della gamba, tasche e fondo. Non dedurre peso, composizione o tatto da un’ombra. Dai priorità a colore o taglia errati, parti mancanti, fori, macchie, grafica storta e misure fuori tolleranza.",
      "Decidi prima dell’imballaggio se la scatola fa parte del valore. Conservarla offre struttura o interesse da collezione ma aumenta il volume; rimuoverla può ridurre costo e protezione. Collega la scelta alla linea, al tipo di scarpa e alla tolleranza ai danni esterni.",
      "Conta i piccoli pezzi e confronta gli elementi rimovibili con la scheda. Per superfici riflettenti usa più immagini prima di dichiarare un difetto. Separa sempre ispezione visiva e logistica: un articolo corretto può restare limitato su certe linee.",
      "Dopo una foto aggiuntiva prendi una decisione. Se risolve il dubbio entro la tua tolleranza, accetta; se conferma una discrepanza materiale, avvia il post-vendita. Accumulare immagini senza cambiare l’esito consuma solo tempo utile.",
      "Il testo comune della scheda non sostituisce i termini dell’ordine. Personalizzazione, igiene, confezione alterata, stato e costo di ritorno possono modificare il risultato. Tieni l’articolo fuori dal pacco internazionale fino alla decisione finale.",
      "Usa sempre lo stesso ordine e spunta ogni punto. Questa disciplina impedisce a una foto attraente di nascondere taglia errata o accessorio assente. Il QC deve produrre una decisione documentata e ripetibile, non una semplice impressione."
    ],
    [
      "Peso e dimensioni della scheda sono valori di pianificazione. Il pacco finale include scatola esterna, consolidamento e protezione. Rimuovere confezioni può ridurre spazio, mentre rinforzo e imbottitura aumentano peso e misure; usa la formula della linea attiva.",
      "Aggiungi margine per differenze di misurazione. Articoli grandi ed economici meritano attenzione: scatola di scarpe, peluche, borsa strutturata o giacca imbottita possono creare molto peso volumetrico e cambiare l’economia dell’intero pacco.",
      "Non mescolare senza controllo abiti normali con batterie, liquidi, magneti, cosmetici, alimenti, fragili o categorie sensibili. Separare può liberare una linea migliore, ma una seconda tariffa base può annullare il vantaggio. Confronta solo scenari attualmente idonei.",
      "Rehearsal informa meglio della somma dei pesi, ma precede la valutazione finale del vettore. Dai istruzioni adatte al contenuto e rileggi descrizione e tariffa nel conto. Funzioni, disponibilità e prezzi possono cambiare.",
      "Salva i termini della linea scelta. La finestra di consegna non è un appuntamento: venditore, magazzino, export, volo, dogana e ultimo miglio introducono variazioni. Per pacchi di valore tracking e compensazione possono contare più di pochi giorni teorici.",
      "Usa fonti doganali ufficiali del paese per tasse e limiti. Il totale di un acquirente estero non predice il tuo. Prima della protezione verifica merci escluse, eventi coperti, prove, massimale e termine di reclamo.",
      "Rispetta traslitterazione, lunghezze e formato del vettore. La dichiarazione deve essere corretta e comprensibile; non copiarne una casuale. Se il tracking si ferma, applica soglia e canale indicati dalla linea prima di concludere che il pacco sia perso.",
      "Il tetto di spesa evita di sentirsi obbligati a pagare un preventivo sfavorevole dopo lo stoccaggio. Se viene superato, rivedi articolo, scatola, protezione, divisione e linea. Prima del pagamento ricontrolla destinatario, contenuto, resi esclusi, istruzioni, misure e condizioni."
    ]
  ],
  de: [
    [
      "Notiere zusätzlich Nutzer, Einsatzklima und akzeptierbare Unsicherheit. Diese Bedarfsnotiz verhindert Impulskäufe und macht ähnliche Angebote nach derselben Regel vergleichbar. Fehlt ein entscheidendes Maß, behandle es als fehlende Information und niemals als stillschweigende Bestätigung.",
      "Der Titel ist nur der Einstieg. Prüfe Auswahlfelder, Beschreibung, Bilder, Inlandslieferung und Warnhinweise. Suche bei mehreren Chargen nach messbaren Unterschieden; Wörter wie „Premium“ ersetzen weder eine belastbare Spezifikation vor der Zahlung noch einen späteren Vergleich im Lager.",
      "Führe eine Summe je Artikel und eine zweite für das geplante Paket. So erkennst du, ob ein billiges Zubehör Nutzen bringt oder nur abrechenbares Gewicht erhöht. Vergleiche zulässige Linien nach Gesamtkosten, Tracking, Einschränkungen, Zeitrahmen und Schutz statt nach einem isolierten Einstiegspreis.",
      "Fehlt eine entscheidende Ansicht, frage nach einem konkreten Foto oder Maß und prüfe vorher die aktuelle Gebühr. Vergrößere möglichst Originaldateien statt komprimierter Screenshots. Bewahre Angebot, Variante, Bestellung und QC gemeinsam auf, damit der Vergleich auf datierten Belegen statt Erinnerung beruht.",
      "Lege den Artikel nicht in ein Paket, solange der Fall offen ist. Ein wirksamer Bericht nennt Bestellung, sichtbaren Beleg, Bedeutung der Abweichung und gewünschte Lösung. Speichere auch Antworten und Bedingungen, die während der Verhandlung mitgeteilt werden.",
      "Prüfe vor der Bündelung, ob ein einzelner beschränkter Artikel für den Rest eine Speziallinie erzwingt. Vergleiche ein Paket und zwei Sendungen mit aktuellen Tarifen; ein universelles Idealgewicht gibt es nicht. Ziel, Inhalt, Grenzen und Live-Regeln bestimmen die nutzbare Option.",
      "Wiederhole die Prüfung auch bei kürzlich funktionierendem Link. Bestand, Preis, Verkäufer und Linien ändern sich. Der beste Index sammelt nicht die meisten Links, sondern führt zu aktuellen Daten, bewahrt eine klare Beweisspur und begründet, warum jeder Artikel in das Paket gehört."
    ],
    [
      "Das Ziel ist nicht, sich von Perfektion zu überzeugen, sondern eine sichtbare, lösbare Abweichung von einer kamerabedingt unklärbaren Unsicherheit zu trennen. Falten, Licht und Perspektive verändern das Bild; stütze wichtige Schlussfolgerungen daher möglichst auf mehrere Ansichten.",
      "Speichere die Referenz, bevor der Verkäufer sie ändert. Notiere bei unterschiedlichen Messmethoden die verwendeten Punkte, denn gleich benannte Werte können anders erhoben sein. Dadurch kannst du später eine gezielte Messung verlangen, statt das Lager unspezifisch um eine Komplettprüfung zu bitten.",
      "Bei Hosen gehören Bund, Leibhöhe, Beinform, Taschen und Saum zur Kontrolle. Leite Gewicht, Zusammensetzung oder Griff nicht aus Schatten ab. Priorisiere falsche Farbe oder Größe, fehlende Teile, Löcher, Flecken, schiefen Druck und Maße außerhalb deiner vorab gesetzten Toleranz.",
      "Entscheide vor dem Verpacken, ob die Box Teil des gewünschten Werts ist. Sie kann Struktur oder Sammlerwert bieten, erhöht aber Volumen; das Entfernen kann Kosten senken und Schutz mindern. Verbinde die Entscheidung mit Linie, Schuhtyp und deiner Toleranz für Außenschäden.",
      "Zähle Kleinteile und gleiche abnehmbare Elemente mit dem Angebot ab. Vergleiche reflektierende Flächen auf mehreren Bildern, bevor du einen Farbfehler meldest. Trenne Sichtprüfung und Logistik: Auch ein optisch korrekter Artikel kann für bestimmte Versandlinien beschränkt bleiben.",
      "Triff nach dem Zusatzbild eine Entscheidung. Klärt es die Frage innerhalb deiner Toleranz, akzeptiere; bestätigt es einen wesentlichen Fehler, starte den Kundendienst. Weitere Bilder ohne mögliche Ergebnisänderung verbrauchen nur Zeit innerhalb eines möglicherweise kurzen Fensters.",
      "Allgemeiner Angebotstext ersetzt nicht die Bedingungen der konkreten Bestellung. Personalisierung, Hygiene, veränderte Verpackung, Zustand und Inlandskosten können die Antwort ändern. Halte den Artikel aus dem internationalen Paket, bis Rückgabe, Umtausch oder Annahme abschließend entschieden ist.",
      "Prüfe jeden Artikel in derselben Reihenfolge und hake jeden Punkt ab. So lenkt ein attraktives Bild nicht von falscher Größe oder fehlendem Zubehör ab. QC soll eine dokumentierte, wiederholbare Entscheidung ergeben und nicht nur ein Gefühl nach dem Durchsehen einer Galerie."
    ],
    [
      "Gewicht und Maße im Angebot sind Planwerte. Das Endpaket enthält Außenkarton, Bündelung und Schutz. Das Entfernen von Verpackung kann Raum sparen, Verstärkung und Polsterung erhöhen Gewicht und Größe; nutze die Formel der aktiven Linie statt eines Divisors aus einem früheren Kauf.",
      "Plane Reserve für Messabweichungen ein. Große, billige Artikel verdienen besondere Aufmerksamkeit: Schuhkarton, Plüschtier, strukturierte Tasche oder Daunenjacke können viel Volumengewicht erzeugen und trotz niedrigem Produktpreis die Wirtschaftlichkeit des gesamten Pakets verändern.",
      "Mische normale Kleidung nicht ungeprüft mit Batterien, Flüssigkeiten, Magneten, Kosmetik, Lebensmitteln, Zerbrechlichem oder sensiblen Kategorien. Eine Trennung kann eine bessere Linie freigeben, doch eine zweite Grundgebühr kann den Vorteil aufheben. Vergleiche nur aktuell zulässige Szenarien.",
      "Rehearsal ist aussagekräftiger als das Addieren von Einzelgewichten, bleibt aber vor der endgültigen Carrierbewertung. Gib inhaltsgerechte Anweisungen und lies Leistungsbeschreibung sowie Gebühr im Konto. Funktionen, Verfügbarkeit und Preise können sich ändern und dürfen nicht als dauerhaft versprochen werden.",
      "Speichere die Bedingungen der gewählten Linie. Eine Lieferspanne ist kein Termin: Verkäufer, Lager, Export, Flug, Zoll und letzte Meile erzeugen Schwankungen. Bei wertvollen Paketen können klares Tracking und passende Entschädigung wichtiger als wenige theoretische Tage sein.",
      "Nutze offizielle Zollquellen des Ziellands für Steuern und Grenzen. Der Gesamtbetrag eines Käufers in einem anderen Land ist keine Prognose. Prüfe vor Schutzkauf ausgeschlossene Waren, gedeckte Ereignisse, Nachweise, Höchstbetrag und Frist, damit der tatsächliche Umfang klar ist.",
      "Beachte Transliteration, Zeichenlängen und Carrierformat. Die Deklaration muss korrekt und verständlich sein; kopiere keine zufällige Beschreibung. Wenn Tracking pausiert, nutze den definierten Schwellenwert und Supportweg der Linie, bevor du voreilig von Verlust ausgehst.",
      "Die Kostenobergrenze verhindert, dass du dich nach Einlagerung zu einem schlechten Angebot gezwungen fühlst. Wird sie überschritten, prüfe Artikel, Box, Schutz, Teilung und Linie neu. Bestätige direkt vor Zahlung Empfänger, akzeptierten Inhalt, ausgeschlossene Rückgaben, Anweisungen, Packmaße und Live-Bedingungen."
    ]
  ],
  fr: [
    [
      "Notez aussi la personne concernée, le climat d’usage et l’incertitude que vous accepteriez. Cette fiche de besoin empêche l’achat impulsif et permet de comparer des annonces similaires avec la même règle. Lorsqu’une mesure indispensable manque, traitez-la comme une information absente, jamais comme une confirmation implicite.",
      "Le titre n’est qu’un point de départ. Parcourez sélecteurs, description, photos, délai intérieur et avertissements. Si plusieurs lots sont proposés, recherchez une différence mesurable; des mots comme «premium» ou «meilleur» ne permettent ni une comparaison sérieuse avant paiement ni une vérification après réception.",
      "Tenez un total par article et un second pour le colis envisagé. Vous verrez ainsi si un petit accessoire améliore réellement l’achat ou ajoute seulement du poids facturable. Comparez les lignes admissibles selon coût complet, suivi, restrictions, délai indicatif et protection, pas selon un prix d’appel isolé.",
      "Si un angle décisif manque, demandez une photo ou mesure précise et vérifiez d’abord le tarif actuel. Agrandissez les fichiers originaux plutôt que des captures compressées. Conservez annonce, variante, commande et QC ensemble afin que la comparaison repose sur des preuves datées et non sur votre mémoire.",
      "Ne placez pas l’article dans un colis tant que le dossier reste ouvert. Un rapport efficace précise ce qui a été commandé, ce que montre l’image, pourquoi l’écart change la décision et quelle résolution est demandée. Sauvegardez également les réponses et conditions communiquées pendant la négociation.",
      "Avant consolidation, vérifiez si un seul article limité impose une ligne spéciale au reste. Comparez un colis unique et deux envois avec les tarifs actuels; aucun poids idéal n’est universel. Destination, contenu, seuils et règles visibles au moment de la création déterminent l’option réellement utilisable.",
      "Répétez la vérification même si le lien fonctionnait récemment. Stock, prix, vendeur et lignes évoluent. Le meilleur index n’est pas celui qui contient le plus de liens, mais celui qui mène à une fiche actuelle, garde une trace claire et explique pourquoi chaque article mérite sa place."
    ],
    [
      "L’objectif n’est pas de se persuader que l’article est parfait, mais de séparer un écart visible et actionnable d’une incertitude que la caméra ne peut résoudre. Plis, éclairage et perspective modifient l’apparence; appuyez donc chaque conclusion importante sur plusieurs vues lorsque c’est possible.",
      "Sauvegardez la référence avant qu’elle ne soit modifiée. Si plusieurs méthodes de mesure existent, notez celle utilisée: deux valeurs portant le même nom peuvent être prises entre des points différents. Cette préparation permet aussi de demander une mesure ciblée plutôt qu’un vague contrôle général.",
      "Pour les pantalons, ajoutez taille, fourche, forme de jambe, poches et ourlet. Ne déduisez pas grammage, composition ou toucher d’une ombre. Priorisez couleur ou taille incorrecte, pièce absente, trou, tache, motif incliné ou mesure située hors de la tolérance définie avant achat.",
      "Décidez avant emballage si la boîte fait partie de la valeur recherchée. La conserver apporte structure ou intérêt de collection, mais augmente souvent le volume; la retirer peut réduire le coût tout en diminuant la protection. Reliez ce choix à la ligne disponible et à votre tolérance aux dommages.",
      "Comptez les petites pièces et vérifiez les éléments amovibles par rapport à la fiche. Pour les surfaces réfléchissantes, comparez plusieurs vues avant de conclure à un défaut de couleur. Séparez toujours inspection visuelle et admissibilité logistique: un article correct peut rester limité pour certaines lignes.",
      "Après réception d’une vue supplémentaire, prenez une décision. Si elle lève le doute et reste dans votre tolérance, acceptez; si elle confirme un écart matériel, ouvrez le SAV. Accumuler des images sans modifier l’issue consomme inutilement une fenêtre de traitement potentiellement courte.",
      "Le texte courant d’une fiche ne remplace pas les conditions de la commande. Personnalisation, hygiène, emballage modifié, état et frais intérieurs peuvent changer la réponse. Gardez l’article hors du colis international jusqu’à une décision finale de retour, échange ou acceptation.",
      "Utilisez toujours le même ordre et cochez chaque point. Cette discipline empêche une photo flatteuse de détourner l’attention d’une taille incorrecte ou d’un accessoire absent. Le QC doit produire une décision documentée et reproductible, pas seulement une impression après avoir parcouru la galerie."
    ],
    [
      "Poids et dimensions de la fiche restent des données de planification. Le colis final comprend boîte extérieure, consolidation et protection. Retirer un emballage réduit parfois l’espace, tandis que renforts et rembourrage ajoutent poids et mesures; utilisez la formule de la ligne active, jamais celle mémorisée d’un ancien achat.",
      "Ajoutez une marge pour les différences de mesure. Les objets volumineux et peu chers exigent une attention particulière: boîte à chaussures, peluche, sac structuré ou veste rembourrée peuvent créer beaucoup de poids volumétrique et modifier l’économie de tout le colis malgré leur faible prix produit.",
      "Ne mélangez pas sans contrôle vêtements ordinaires, batteries, liquides, aimants, cosmétiques, nourriture, fragile ou sensible. Séparer l’article spécial peut libérer une meilleure ligne, mais un second tarif de base peut annuler le gain. Comparez uniquement des scénarios réellement admissibles au moment de l’envoi.",
      "Le rehearsal informe mieux qu’une somme de poids, mais reste antérieur à l’évaluation finale du transporteur. Donnez des instructions adaptées au contenu et relisez description et tarif du service dans votre compte. Fonctions, disponibilités et prix peuvent évoluer; évitez d’en faire une promesse permanente.",
      "Conservez une capture des conditions sélectionnées. Le délai n’est pas un rendez-vous: expédition vendeur, entrepôt, export, vols, douane et dernier kilomètre ajoutent de la variabilité. Pour un colis de valeur, suivi clair et compensation appropriée peuvent compter davantage que quelques jours théoriques.",
      "Utilisez les sources douanières officielles du pays pour taxes et limites. Le total d’un acheteur étranger ne prédit pas le vôtre. Avant de payer une protection, vérifiez produits exclus, événements couverts, preuves, plafond et délai de réclamation afin de savoir ce qui serait réellement indemnisable.",
      "Respectez translittération, longueur et format imposés par le transporteur. La déclaration doit être exacte et compréhensible; ne copiez pas celle d’un autre colis. Si le suivi s’arrête, appliquez le seuil et le canal de la ligne avant de conclure trop tôt à une perte.",
      "Le plafond budgétaire évite de se sentir obligé de payer une offre médiocre une fois tout stocké. S’il est dépassé, revoyez article, boîte, protection, division et ligne. Juste avant paiement, confirmez destinataire, contenu accepté, retours exclus, instructions, mesures emballées et conditions actuelles."
    ]
  ],
  es: [
    [
      "Conviene anotar también para quién es el producto, el clima en el que se usará y qué incertidumbre aceptarías. Esa nota evita comprar por impulso y permite comparar fichas similares con la misma regla. Si una medida esencial no aparece, considérala información ausente y no una confirmación implícita.",
      "Lee el título solo como punto de partida. Recorre selectores, descripción, imágenes, notas de entrega nacional y advertencias del agente. Cuando la diferencia entre lotes sea ambigua, pide una explicación concreta; una palabra como ‘premium’ no sustituye una especificación medible ni permite verificar después lo recibido.",
      "Mantén un total por artículo y otro para el paquete previsto. Así puedes decidir si un accesorio barato aporta valor o únicamente aumenta peso facturable. La pregunta útil no es qué línea tiene el precio inicial menor, sino cuál admite el contenido y ofrece una combinación razonable de coste, seguimiento, límites y protección.",
      "Si falta un ángulo decisivo, consulta si existe foto o medición adicional y revisa la tarifa vigente antes de pedirla. Amplía los archivos originales, no capturas comprimidas cuando puedas evitarlo. Conserva juntos anuncio, variante, pedido y QC para que la comparación no dependa de la memoria.",
      "No metas el artículo en un paquete mientras el caso siga abierto. Un informe breve y preciso reduce mensajes de ida y vuelta: especifica qué se pidió, qué muestra la evidencia, por qué afecta a la decisión y qué solución se solicita. Guarda también cualquier respuesta o condición comunicada por el agente.",
      "Antes de consolidar, comprueba si un solo artículo restringido obliga al resto a utilizar una línea especial. Compara una sola caja frente a dos paquetes con las tarifas actuales; no existe un peso ideal universal. La elegibilidad depende de destino, contenido, límites y reglas visibles en el momento de crear el envío.",
      "Repite la verificación aunque el enlace funcionara la semana anterior. Stock, precio, comportamiento del vendedor y rutas cambian. La mejor hoja no es la que acumula más enlaces, sino la que conduce a una ficha vigente, deja un rastro de pruebas claro y ayuda a explicar por qué cada artículo merece entrar en el paquete."
    ],
    [
      "La finalidad no es convencerse de que el artículo es perfecto, sino separar una diferencia visible y accionable de una duda que la cámara no puede resolver. Un pliegue puede ocultar la forma y una lente puede distorsionar proporciones; por eso cada conclusión debe apoyarse en más de una vista cuando sea posible.",
      "Guarda la referencia antes de que el vendedor modifique la ficha. Si existen varios métodos de medición, anota cuál se utilizó; dos cifras con nombres iguales pueden haberse tomado de puntos distintos. Esta preparación también permite redactar una solicitud de medida concreta, en lugar de pedir al almacén que ‘revise todo’.",
      "En pantalones incluye cintura, tiro, forma de la pierna, bolsillos y bajo. No deduzcas gramaje, composición o tacto a partir de una sombra. Prioriza errores demostrables: color equivocado, etiqueta distinta, pieza ausente, agujero, mancha, gráfico torcido o medida que supera la tolerancia que definiste antes de comprar.",
      "Decide por adelantado si la caja forma parte del valor de compra. Mantenerla puede aportar estructura o interés de colección, pero también aumentar volumen; quitarla puede abaratar el envío y reducir protección. Relaciona esa elección con la ruta disponible, el tipo de calzado y tu tolerancia al daño exterior.",
      "Cuenta piezas pequeñas y revisa que los elementos desmontables correspondan a la ficha. En superficies reflectantes, compara varias imágenes antes de declarar un defecto de color o acabado. Además, separa la evaluación visual de la logística: un artículo correcto puede seguir teniendo clasificación restringida para determinadas líneas.",
      "Después de recibir la imagen adicional, toma una decisión. Si resuelve la duda y entra dentro de tu tolerancia, acepta; si confirma una discrepancia material, inicia posventa. Pedir fotografías sucesivas sin cambiar el resultado consume tiempo dentro de una ventana que puede ser corta y no mejora la calidad del expediente.",
      "No interpretes el texto común de una ficha como sustituto de los términos del pedido. Los productos personalizados, sensibles a higiene o devueltos con embalaje alterado pueden recibir un tratamiento distinto. Mantén el artículo separado del paquete internacional hasta que exista una decisión final de aceptación, cambio o devolución.",
      "Haz la revisión en el mismo orden para todos los productos y marca cada punto. Esta disciplina evita que una foto atractiva desplace la atención de una talla incorrecta o un accesorio ausente. El resultado del QC debe ser una decisión documentada, no simplemente el tiempo pasado mirando una galería."
    ],
    [
      "Los datos de peso y dimensiones de una ficha son entradas de planificación, no medidas finales. El paquete incluye caja exterior, consolidación y protección. Eliminar embalaje puede reducir espacio, mientras que esquineras, burbuja o refuerzo añaden peso y tamaño; utiliza la regla de la línea activa, no un divisor recordado de otra compra.",
      "Añade un margen porque la medición del almacén puede diferir de la estimación. Los artículos grandes y baratos merecen especial atención: una caja de zapatos, un peluche, un bolso estructurado o una chaqueta acolchada puede ocupar más peso volumétrico del que su precio sugiere y alterar la economía de todo el pedido.",
      "No mezcles sin revisar productos ordinarios con baterías, líquidos, imanes, cosmética, comida, mercancía frágil o categorías sensibles. A veces separar el artículo especial libera una línea mejor para la ropa; otras veces el segundo cargo base encarece el total. Solo una comparación con opciones elegibles actuales permite decidir.",
      "El resultado del ensayo es más informativo que sumar pesos individuales, pero sigue siendo una estimación previa al transportista. Da instrucciones de embalaje coherentes con el contenido y revisa la descripción y tarifa del servicio en tu cuenta. Las funciones, opciones y precios pueden cambiar con el tiempo.",
      "Conserva una captura de los términos de la línea elegida. Una entrega estimada no es una cita: despacho del vendedor, procesamiento, preparación, exportación, vuelos, aduana y reparto local introducen variabilidad. El seguimiento y la compensación pueden ser más importantes que unos días teóricos en un paquete de alto valor.",
      "Consulta fuentes aduaneras oficiales del país de destino para impuestos y límites. El total publicado por un comprador de otro país no predice el tuyo. Si compras protección, comprueba mercancías excluidas, eventos cubiertos, documentos necesarios, valor máximo y plazo para abrir una reclamación antes de asumir que todo está asegurado.",
      "Respeta límites de caracteres, transliteración y formato del transportista cuando aparezcan. La declaración debe ser exacta y comprensible; no copies una descripción aleatoria de otra persona. Si el seguimiento permanece sin cambios, utiliza el umbral y el canal de soporte indicados por la línea en lugar de concluir inmediatamente que el paquete está perdido.",
      "El presupuesto máximo evita sentirte obligado a pagar una cotización poco atractiva cuando todo ya está almacenado. Si se supera, revisa producto, caja, protección, división y línea. Antes del pago final confirma destinatario, contenido aceptado, exclusión de devoluciones, instrucciones, peso embalado y condiciones de la ruta una última vez."
    ]
  ]
};
