export const plArticleUi = {
  journalMetadataTitle: "Poradniki FindQC: wyszukiwanie, zdjęcia QC i agenci zakupowi",
  journalMetadataDescription: "Sprawdzone poradniki o wyszukiwaniu w FindQC, sygnałach popularności, ocenie zdjęć QC i współpracy z agentem zakupowym.",
  journalSchemaName: "Magazyn poradnikowy FindQC Pro",
  journalCount: "05 szczegółowych poradników",
  journalNote: "Każdy artykuł został napisany po polsku, sprawdzony na aktualnych stronach należących do FindQC i połączony z oficjalnymi źródłami. Ilustracje redakcyjne są wyraźnie opisane i nie udają zdjęć QC z magazynu.",
  editorialDesk: "Redakcja FindQC Pro",
  factChecked: "Zweryfikowane fakty",
  heroCaption: "Zdjęcie redakcyjne ilustrujące przedmiot kontroli. Nie jest przedstawiane jako materiał QC z magazynu FindQC.",
  contents: "W tym artykule",
  researchNotes: "Notatki badawcze",
  officialSources: "Sprawdzone źródła oficjalne",
  sourceIntro: "Ten niezależny poradnik sprawdzono 20 lipca 2026 r. na poniższych stronach należących do FindQC. Funkcje i zasady mogą się zmieniać, dlatego aktualne informacje zawsze potwierdź u źródła.",
  independentNote: "FindQC Pro jest niezależnym serwisem wyszukiwawczym i edukacyjnym. Nie jest FindQC i nie twierdzi, że obsługuje jego usługi.",
  continueResearch: "Kontynuuj sprawdzanie",
  relatedNotes: "Powiązane poradniki",
  allArticles: "Wszystkie artykuły",
  readArticle: "Czytaj artykuł",
  home: "Strona główna",
  journal: "Artykuły",
};

export const plArticleSources = {
  "https://findqc.com/": {
    label: "Strona główna FindQC",
    note: "Aktualne opisy nawigacji oraz sekcji Trending, Karma, Review Wall i Real Hauls.",
  },
  "https://findqc.com/terms-of-service": {
    label: "Warunki korzystania z FindQC",
    note: "Oficjalny opis usługi, zakupów realizowanych przez podmioty zewnętrzne i ograniczeń danych QC.",
  },
  "https://findqc.com/privacy-policy": {
    label: "Polityka prywatności FindQC",
    note: "Oficjalne wyjaśnienie wyszukiwania, popularności, kolekcji i zewnętrznych rekordów QC.",
  },
  "https://academy.findqc.com/2024/12/21/mastering-qc-finder-choosing-the-best-search-method/": {
    label: "FindQC Academy: wybór metody wyszukiwania",
    note: "Porównanie wyszukiwania za pomocą linku, obrazu i słów kluczowych.",
  },
  "https://findqc.com/robots": {
    label: "Bot FindQC",
    note: "Oficjalny opis analizowania linków, rozpoznawania obrazów oraz materiałów QC w serwisie Discord.",
  },
};

export const plArticles = {
  "before-you-buy-qc-guide": {
    title: "Jak korzystać z FindQC przed zakupem: praktyczna lista kontroli zdjęć QC",
    shortTitle: "Praktyczna lista kontroli zdjęć QC",
    description: "Sprawdzony proces łączenia wyniku FindQC z właściwą ofertą, oceny zdjęć magazynowych i podejmowania decyzji bez traktowania fotografii jak gwarancji.",
    excerpt: "Potwierdź ofertę, przejrzyj pełny zestaw zdjęć, porównaj wymiary i oddziel widoczne fakty od tego, czego fotografia nie dowodzi.",
    category: "Poradnik FindQC",
    readTime: "10 min czytania",
    date: "20 lipca 2026",
    heroAlt: "Para szarych butów sfotografowana z góry obok pudełka",
    keywords: ["FindQC", "poradnik FindQC", "zdjęcia QC", "kontrola jakości w magazynie", "agent zakupowy"],
    intro: [
      "Dobra kontrola nie zaczyna się od powiększania logo. Najpierw trzeba potwierdzić, że rekord dotyczy produktu, który rzeczywiście zamierzasz kupić. Następnie należy oddzielić to, co widać, od przypuszczeń. FindQC ułatwia znalezienie ofert i materiałów QC, lecz nie podejmuje decyzji za kupującego i nie zastępuje sprawdzenia aktualnej strony sprzedaży.",
      "Poniższy proces warto wykonać dwukrotnie: przed złożeniem zamówienia, aby odrzucić słabe oferty, oraz po opublikowaniu przez agenta zdjęć konkretnej sztuki w magazynie. Drugi zestaw ma większe znaczenie, ponieważ jest powiązany z Twoim zamówieniem.",
    ],
    sections: [
      {
        id: "role",
        title: "1. Zrozum, czym naprawdę jest FindQC",
        blocks: [
          { type: "p", text: "Warunki korzystania opisują FindQC jako platformę do wyszukiwania i agregowania materiałów QC. Usługi mogą obejmować wyszukiwanie linkiem lub obrazem, zwykłe i rozszerzone QC, konwerter linków, pomoc w doborze rozmiaru i bota Discord. Platforma porządkuje dane badawcze; nie jest sprzedawcą produktu." },
          { type: "p", text: "Zakup, płatność, transport i zwroty realizują zewnętrzni sprzedawcy oraz agenci. Cenę, wariant, koszt krajowej dostawy i warunki zwrotu trzeba więc ponownie potwierdzić na stronie, na której dojdzie do transakcji." },
          { type: "callout", title: "Właściwy podział ról", text: "FindQC służy do analizy, oferta źródłowa określa warunki handlowe, a zdjęcia z Twojego magazynu pokazują sztukę przypisaną do zamówienia." },
        ],
      },
      {
        id: "listing",
        title: "2. Potwierdź ofertę, zanim ocenisz zdjęcia",
        blocks: [
          { type: "p", text: "Jeśli masz dokładny link z Taobao, Weidian lub 1688, zacznij od niego. FindQC Academy uznaje wyszukiwanie linkiem za najbardziej precyzyjne przy jasno określonym celu, ale ostrzega, że usunięty, podmieniony lub uszkodzony adres może prowadzić do starego albo innego produktu." },
          { type: "list", title: "Pięć kontroli tożsamości", items: [
            "Platforma i link źródłowy zgadzają się z wybraną ofertą.",
            "Nazwa sprzedawcy lub sklepu nie uległa zmianie.",
            "Kolor, model i wariant są dokładnie tymi, które chcesz zamówić.",
            "Rekord nie jest oznaczony jako usunięty lub niedostępny.",
            "Aktualna cena, dostawa krajowa i zwrot są potwierdzone na stronie zakupu.",
          ] },
          { type: "p", text: "Różni sprzedawcy często wykorzystują te same zdjęcia promocyjne. Identyczna miniatura albo podobny tytuł nie oznaczają tej samej fabryki, partii czy wersji. Najpierw ustal tożsamość, dopiero potem oceniaj widoczną jakość." },
        ],
      },
      {
        id: "whole-item",
        title: "3. Czytaj cały zestaw: od bryły do detalu",
        blocks: [
          { type: "p", text: "Otwórz wszystkie fotografie przed wydaniem opinii. Zacznij od dostępnych ujęć z przodu, z tyłu, z boków i z góry. Sprawdź sylwetkę, symetrię pary, układ paneli, zgodność koloru oraz obecność wszystkich części. Pojedyncze ujęcie rzadko daje wystarczający kontekst." },
          { type: "p", text: "Następnie obejrzyj łączenia szwów, kołnierze, mankiety, zamki, oczka, hafty, krawędzie nadruków i okucia. Odbicie światła nie jest tym samym co rysa, a zagniecenie transportowe nie dowodzi skręcenia odzieży. Szukaj tego samego śladu pod więcej niż jednym kątem." },
          { type: "figure", image: "/products/jacket.webp", alt: "Ciemna kurtka użyta jako ilustracja redakcyjna", caption: "Przykład redakcyjny: najpierw oceń ogólny kształt, a później powiększ zamki, szwy i haft. To nie jest rekord magazynowy FindQC." },
          { type: "p", text: "Na końcu sprawdź metki, akcesoria i opakowanie. Rozmiar na etykiecie powinien odpowiadać zamówionemu wariantowi, a elementy odpinane muszą być obecne. Opakowanie nie potwierdza jakości produktu, ale może ujawnić braki lub ryzyko uszkodzenia." },
        ],
      },
      {
        id: "measurements",
        title: "4. Traktuj wymiary jako dowód, nie ozdobę",
        blocks: [
          { type: "p", text: "Kąt aparatu łatwo zniekształca wrażenie rozmiaru. Gdy na zdjęciu widać linijkę lub taśmę, porównaj oba końce z tabelą sprzedawcy i z podobnym przedmiotem, który posiadasz. W odzieży przydatne są szerokość klatki, długość, ramiona, rękawy, pas i nogawka; w obuwiu długość wkładki bywa ważniejsza niż nadrukowany numer." },
          { type: "p", text: "Sprawdź też sposób mierzenia. Wygięta taśma, złożona odzież lub inny punkt początkowy mogą zmienić wynik o kilka centymetrów. Szerokość na płasko nie jest obwodem ciała, a długość podeszwy zewnętrznej nie jest długością użytkową wkładki." },
          { type: "callout", title: "Praktyczna zasada", text: "Porównuj pomiary wykonane tą samą metodą: odzież płasko z odzieżą płasko, wkładkę z wkładką oraz identyczne punkty początku i końca." },
        ],
      },
      {
        id: "signals",
        title: "5. Używaj sygnałów społeczności jako kontekstu",
        blocks: [
          { type: "p", text: "FindQC oddziela sekcje Trending, Karma, Review Wall i Real Hauls. Pomagają one odkrywać produkty i pytania warte sprawdzenia, ale opisują różne zjawiska: zainteresowanie, preferencje społeczności, obserwacje kupujących oraz przykłady wysłanych paczek." },
          { type: "p", text: "Popularność nie oznacza trwałości. Recenzja może dotyczyć innego rozmiaru, koloru, daty lub partii, a haul pokazuje jedynie, że paczka przeszła określoną drogę. Przed nadaniem sygnałowi wagi sprawdź datę, link i liczbę dostępnych przykładów." },
          { type: "p", text: "Pewność rośnie, gdy niezależne wskazówki są zgodne: oferta jest właściwa, kilka zestawów QC pokazuje podobne wykonanie, wymiary pasują, a świeże opinie powtarzają tę samą obserwację. Nie usuwa to jednak całego ryzyka." },
        ],
      },
      {
        id: "limits",
        title: "6. Wiedz, czego zdjęcia QC nie potwierdzają",
        blocks: [
          { type: "p", text: "FindQC informuje, że zdjęcia, waga, wymiary i rejestry wad zwykle pochodzą od zewnętrznych agentów. Platforma organizuje te dane, lecz nie gwarantuje ich dokładności, kompletności ani autentyczności i nie wydaje certyfikatów autentyczności." },
          { type: "p", text: "Fotografia może pokazać plamę, brakującą część, krzywy nadruk lub niewłaściwy kolor. Zwykle nie dowodzi składu włókien, długoterminowej trwałości, stanu baterii, wodoodporności, wygody, zapachu czy konstrukcji wewnętrznej. To, czego nie ma w kadrze, pozostaje niewiadomą." },
          { type: "p", text: "Publiczne rekordy pomagają ocenić, czy oferta zasługuje na dalsze badanie. Zdjęcia Twojej sztuki pomagają zdecydować o przyjęciu, dodatkowej kontroli, wymianie lub zwrocie zgodnie z aktualnymi zasadami sprzedawcy i agenta." },
        ],
      },
      {
        id: "workflow",
        title: "7. Dziesięciominutowy proces decyzyjny",
        blocks: [
          { type: "list", title: "Sprawdzaj w tej kolejności", items: [
            "Minuta 1: zapisz dokładny link i wybrany wariant.",
            "Minuty 2–3: potwierdź sprzedawcę, dostępność i bieżące warunki.",
            "Minuty 4–5: oceń kształt, kolor, symetrię i kompletność.",
            "Minuty 6–7: powiększ detale ważne dla danej kategorii.",
            "Minuta 8: porównaj pomiary z własnym przedmiotem referencyjnym.",
            "Minuta 9: poszukaj powtarzalnych uwag w świeżych recenzjach.",
            "Minuta 10: wybierz przyjęcie, dodatkowy dowód albo odrzucenie.",
          ] },
          { type: "p", text: "Jeżeli informacji brakuje, nazwij potrzebne ujęcie: zbliżenie śladu, zdjęcie metki, pomiar wkładki lub widok wszystkich akcesoriów. Precyzyjna prośba jest łatwiejsza do wykonania i oceny niż ogólne „proszę o więcej zdjęć”." },
          { type: "p", text: "Celem nie jest wyeliminowanie ryzyka, lecz podjęcie następnej decyzji na podstawie najlepszych dostępnych dowodów, gdy agent może jeszcze zareagować." },
        ],
      },
    ],
    cta: { eyebrow: "Kontynuuj kontrolę", title: "Użyj siedmioetapowej listy do zdjęć magazynowych", label: "Otwórz listę QC" },
  },

  "findqc-search-methods": {
    title: "Metody wyszukiwania w FindQC: link, obraz czy słowa kluczowe",
    shortTitle: "Link, obraz czy słowa kluczowe",
    description: "Kiedy użyć każdej metody FindQC, jak może ona zawieść i co sprawdzić, zanim uznasz wynik za właściwy produkt.",
    excerpt: "Zachowaj najmocniejszą wskazówkę, którą już masz, i weryfikuj wynik zamiast ufać pierwszemu podobnemu obrazowi.",
    category: "Strategia wyszukiwania",
    readTime: "9 min czytania",
    date: "20 lipca 2026",
    heroAlt: "Złożony biały T-shirt jako redakcyjny przykład wyszukiwania produktu",
    keywords: ["wyszukiwanie FindQC", "wyszukiwanie linkiem", "wyszukiwanie obrazem", "słowa kluczowe FindQC", "znajdź zdjęcia QC"],
    intro: [
      "Pełny link, przycięty zrzut ekranu i ogólna nazwa zawierają zupełnie inną ilość informacji. Nie powinny być używane w ten sam sposób. FindQC udostępnia kilka dróg wyszukiwania, a jego Academy porównuje metodę linkową, obrazową i słowa kluczowe.",
      "Najlepsza metoda nie jest najbardziej efektowna, lecz ta, która zachowuje najsilniejszy posiadany identyfikator. Po znalezieniu kandydatów trzeba wykonać tę samą kontrolę tożsamości, aby podobieństwa nie pomylić z pewnością." ],
    sections: [
      { id: "decision", title: "1. Dobierz metodę do materiału wyjściowego", blocks: [
        { type: "p", text: "Oryginalny adres produktu z Taobao, Weidian lub 1688 zawiera bezpośredni identyfikator i powinien być pierwszym wyborem. Czysta fotografia pozwala szukać wizualnie podobnych ofert. Nazwa, model lub kategoria nadają się do szerszego wyszukiwania słowami." },
        { type: "table", headers: ["Posiadana wskazówka", "Pierwsza metoda", "Główne ryzyko"], rows: [["Ważny adres produktu", "Link", "Oferta mogła zostać usunięta lub podmieniona"], ["Wyraźne, charakterystyczne zdjęcie", "Obraz", "Podobny wygląd nie oznacza tego samego sprzedawcy"], ["Nazwa, model lub kategoria", "Słowa kluczowe", "Język i nazewnictwo tworzą szum"], ["Zrzut z częściowym tekstem", "Obraz, potem słowa", "Nakładki i kadrowanie zmniejszają precyzję"]] },
        { type: "p", text: "Nie porzucaj dokładnego linku na rzecz ogólnej nazwy. Każdy krok od unikalnego identyfikatora zwiększa liczbę wyników, które musisz ręcznie odsiać." },
      ] },
      { id: "link-search", title: "2. Link: najkrótsza droga do konkretnej oferty", blocks: [
        { type: "p", text: "FindQC Academy określa tę metodę jako precyzyjną i szybką przy jasnym celu. Wklej pełny adres produktu, a nie stronę sklepu, hostingu zdjęć czy skrócony link społecznościowy. W adresie musi pozostać identyfikator pozycji." },
        { type: "p", text: "Po znalezieniu wyniku porównaj platformę, sklep, tytuł, miniaturę i wariant. Rekord oznaczony jako usunięty może być wartościowym archiwum zdjęć, ale nie potwierdza, że produkt nadal da się kupić." },
        { type: "list", title: "Użyj linku, gdy", items: ["Sprzedawca, arkusz lub wpis podaje adres produktu.", "Szukasz QC jednej oferty, a nie podobnych zamienników.", "Chcesz wrócić do kandydata bez odtwarzania zapytania."] },
        { type: "p", text: "Brak wyniku nie dowodzi braku rekordów QC. Zachowaj adres, wyodrębnij tytuł i obraz główny, a potem przejdź do kolejnej metody." },
      ] },
      { id: "image-search", title: "3. Obraz: dobry do rozpoznawania, słaby do potwierdzania", blocks: [
        { type: "p", text: "Wyszukiwanie obrazem pomaga, gdy nie znasz nazwy, tekst jest w innym języku albo masz tylko zrzut. Usuń dymki rozmów, ceny, znaki wodne i obce przedmioty, lecz zachowaj sylwetkę oraz wyróżniające okucia, nadruk i kolory." },
        { type: "figure", image: "/products/headwear.webp", alt: "Czarna haftowana czapka na jasnym tle", caption: "Czyste, wyśrodkowane zdjęcie daje algorytmowi więcej użytecznych cech niż zatłoczona fotografia stylizowana. Przykład redakcyjny." },
        { type: "p", text: "Academy ostrzega, że jakość i kąt wpływają na trafność. Wypróbuj drugie ujęcie, gdy lista jest zbyt szeroka. Sprzedawcy mogą korzystać z tych samych zdjęć katalogowych, dlatego identyczna miniatura jest tylko tropem." },
        { type: "p", text: "Otwórz kandydatów i porównaj link, sklep, warianty, wymiary oraz zestawy QC. Najbliższy wizualnie wynik nie musi być źródłem ani tą samą partią." },
      ] },
      { id: "keyword-search", title: "4. Słowa kluczowe: szerokie odkrywanie z filtrowaniem", blocks: [
        { type: "p", text: "Ta metoda sprawdza się przy eksploracji kategorii. Zacznij od konkretnych cech: rodzaju, widocznego materiału, koloru, modelu albo detalu. Usuń ogólne określenia reklamowe, które mogą pojawić się w każdej ofercie." },
        { type: "p", text: "Testuj warianty angielskie i oryginalny tekst skopiowany ze strony. Zmieniaj jeden element zapytania naraz. Zbyt długa fraza potrafi odrzucić dobry wynik z powodu małej różnicy w nazwie." },
        { type: "p", text: "Lista wyników jest zbiorem kandydatów, nie rankingiem jakości. Porównuj źródła i zapisuj dokładne adresy ofert, które przejdą weryfikację." },
      ] },
      { id: "verify", title: "5. Każdy wynik sprawdź czterema pytaniami", blocks: [
        { type: "list", title: "Przed uznaniem dopasowania", items: ["Czy platforma, sklep i adres odpowiadają oczekiwanej ofercie?", "Czy wariant, kolor i model są właściwe?", "Czy zdjęcia QC dotyczą tej oferty, czy tylko podobnego produktu?", "Czy dostępność i warunki handlowe są nadal aktualne?"] },
        { type: "p", text: "Kontrola jest potrzebna nawet przy idealnej miniaturze. Nazwy i zdjęcia katalogowe łatwo skopiować; zestaw zgodnych identyfikatorów ma większą wartość niż jedno podobieństwo." },
        { type: "callout", title: "Zasada wyszukiwania", text: "FindQC ma zmniejszyć obszar poszukiwań, a nie zastąpić potwierdzenie tożsamości produktu." },
      ] },
      { id: "recovery", title: "6. Gdy pierwszy sposób zawiedzie, użyj drabiny odzyskiwania", blocks: [
        { type: "p", text: "Zacznij od pełnego linku. Następnie usuń wyłącznie parametry śledzące. Potem użyj czystej miniatury, a jeśli jest ogólna — przytnij charakterystyczny detal. Na końcu połącz nazwę, model, kategorię i jedną widoczną cechę." },
        { type: "p", text: "Nie wyrzucaj pierwotnych wskazówek. Link i datowany zrzut będą potrzebne do powrotu na stronę transakcji i sprawdzenia wariantu." },
        { type: "p", text: "Jeżeli żadna droga nie prowadzi do wyniku możliwego do zweryfikowania, potraktuj brak jako niewiadomą. Nie łącz produktów wyłącznie na podstawie stylu." },
      ] },
      { id: "sequence", title: "7. Sekwencja, która zachowuje dowody", blocks: [
        { type: "p", text: "Zapisz URL, wariant i zrzut z datą. Szukaj linkiem, potem obrazem, na końcu słowami. Przy każdym kandydacie zanotuj, co się zgadza i czego brakuje. Odrzuć wynik, który nie przechodzi kontroli tożsamości, nawet jeśli ma atrakcyjne zdjęcia." },
        { type: "p", text: "Po znalezieniu mocnego kandydata przejdź do osobnego etapu oceny zdjęć: bryła, detale, pomiary i ograniczenia. Rozdzielenie etapów chroni przed uznaniem ładnej fotografii za dowód właściwej oferty." },
      ] },
    ],
    cta: { eyebrow: "Następny krok", title: "Zamień wynik wyszukiwania w uporządkowaną kontrolę QC", label: "Otwórz listę zdjęć QC" },
  },

  "findqc-product-signals": {
    title: "Jak czytać Trending, Karma, recenzje i hauls w FindQC bez nadmiernego zaufania",
    shortTitle: "Jak interpretować sygnały FindQC",
    description: "Co mogą oznaczać społeczne sygnały FindQC, czego nie dowodzą i jak łączyć je z ofertą oraz zdjęciami QC.",
    excerpt: "Zainteresowanie, preferencje, opinie i wysłane paczki odpowiadają na inne pytania; żaden sygnał nie zastępuje kontroli produktu.",
    category: "Ocena sygnałów",
    readTime: "9 min czytania",
    date: "20 lipca 2026",
    heroAlt: "Akcesorium użyte jako redakcyjny przykład sygnału popularności produktu",
    keywords: ["FindQC Trending", "FindQC Karma", "recenzje FindQC", "Real Hauls", "sygnały produktu"],
    intro: ["Sygnały społeczności są wartościowe jako kontekst. Stają się ryzykowne, gdy zmienia się je w certyfikat jakości, którego nigdy nie obiecywały. FindQC rozdziela Trending, Karma, Review Wall i Real Hauls, dlatego najpierw ustal, jaką obserwację reprezentuje każda sekcja.", "Nie chodzi o ignorowanie opinii, lecz o zachowanie dat, wariantów, partii i wielkości próby. Sygnał pomaga zadawać pytania; oferta i fotografie Twojej sztuki pozostają głównym dowodem."],
    sections: [
      { id: "map", title: "1. Dopasuj sygnał do właściwego pytania", blocks: [
        { type: "table", headers: ["Sygnał", "Przydatne pytanie", "Czego nie dowodzi"], rows: [["Trending", "Co przyciąga uwagę teraz?", "Jakości ani trwałości"], ["Karma", "Co wybiera społeczność?", "Zweryfikowanej specyfikacji"], ["Review Wall", "Co zauważył kupujący?", "Identycznego wyniku dla innego wariantu"], ["Real Hauls", "Co znalazło się w wysłanej paczce?", "Powtarzalnego kosztu i rezultatu"]] },
        { type: "p", text: "Sekcje pomagają odkrywać kandydatów, problemy i słownictwo do dalszego sprawdzania. Nie zmieniają historycznych obserwacji w gwarancję przyszłego zamówienia." },
        { type: "p", text: "Zanim użyjesz sygnału, zapisz jego datę, link, wariant i liczbę widocznych przykładów. Im mniej kontekstu, tym mniejszą wagę powinien mieć." },
      ] },
      { id: "trending", title: "2. Trending mierzy uwagę, nie wytrzymałość", blocks: [
        { type: "p", text: "Produkt może być popularny, bo jest nowy, tani, sezonowy, kontrowersyjny lub łatwy do udostępnienia. Liczba odsłon nie pokazuje jakości szwów, zgodności rozmiaru ani stabilności partii." },
        { type: "p", text: "Ranking jest dobrym punktem odkrywania świeżych kandydatów. Potem należy otworzyć ofertę, potwierdzić sprzedawcę i przejrzeć dostępne rekordy QC." },
        { type: "list", title: "Pytania przed podążeniem za trendem", items: ["Czy oferta nadal jest aktywna i pochodzi od tego samego sklepu?", "Czy istnieje kilka świeżych zestawów QC?", "Czy opinie dotyczą interesującego Cię wariantu?", "Czy uwagę buduje dowód, cena czy wyłącznie nowość?"] },
      ] },
      { id: "karma", title: "3. Karma jest filtrem społeczności, nie specyfikacją", blocks: [
        { type: "p", text: "Karma może wyłonić często wybierane produkty. Preferencja nie podaje jednak wymiarów, składu, tolerancji produkcyjnych ani zasad zwrotu." },
        { type: "p", text: "Porównaj datę i link głosów z obecną ofertą. Sklep może zmienić warianty albo dostawcę bez oczywistej zmiany adresu. Karma służy do ustalenia priorytetów badania, nie do automatycznego zatwierdzenia." },
        { type: "figure", image: "/products/accessories.webp", alt: "Akcesorium jako przykład redakcyjny", caption: "Popularność pomaga znaleźć kandydata; dopiero oferta i materiał QC określają, co można o nim stwierdzić." },
      ] },
      { id: "reviews", title: "4. Czytaj obserwacje, nie tylko oceny", blocks: [
        { type: "p", text: "Recenzja jest użyteczna, gdy opisuje coś sprawdzalnego: wymiar, kolor, brakującą część, wyrównanie albo doświadczenie z konkretnym wariantem. Samo „idealne” bez daty, linku i zdjęcia ma małą wartość." },
        { type: "p", text: "Oddziel fakt od interpretacji. „Taśma pokazuje 68 cm” można odtworzyć, natomiast „standardowy rozmiar” zależy od sylwetki i oczekiwań autora." },
        { type: "list", title: "Większą wagę ma opinia, która", items: ["Podaje ofertę, rozmiar, kolor i datę.", "Zawiera zdjęcia wspierające obserwację.", "Wyjaśnia oczekiwanie i otrzymany wynik.", "Zgadza się z innymi świeżymi rekordami."] },
        { type: "p", text: "Nawet szczegółowa recenzja opisuje jedną sztukę. Użyj jej do stworzenia listy pytań dla własnego zamówienia, nie do przewidywania identycznego rezultatu." },
      ] },
      { id: "hauls", title: "5. Haul pokazuje ukończoną drogę, nie powtarzalny wynik", blocks: [
        { type: "p", text: "Real Hauls może pokazać, jakie produkty znalazły się w paczce. Nie ustala ceny dla innego kraju, terminu, wagi gabarytowej, trasy ani deklaracji celnej." },
        { type: "p", text: "Nie jest też rekomendacją każdego przedmiotu. Sprawdź, czy dostępne są uwagi, zdjęcia magazynowe i aktualne linki. Atrakcyjna paczka może zawierać mało danych o pojedynczej sztuce." },
        { type: "p", text: "Traktuj haul jako kontekst do grupowania produktów i pytań logistycznych, które później potwierdzisz u własnego agenta." },
      ] },
      { id: "triangulate", title: "6. Łącz sygnały z ofertą i QC", blocks: [
        { type: "p", text: "Sygnał społeczności proponuje kandydata. Oryginalna oferta potwierdza tożsamość, wariant i warunki. Historyczne QC pokazuje przykłady, a zdjęcia z Twojego magazynu przedstawiają zamówioną sztukę. Każda warstwa odpowiada na inne pytanie." },
        { type: "callout", title: "Zasada wagi", text: "Im bliżej dowód jest Twojej sztuki, wariantu i daty zakupu, tym większe powinien mieć znaczenie." },
        { type: "p", text: "Gdy warstwy się wykluczają, nie uśredniaj ich bez sprawdzenia. Wysoka popularność nie poprawia błędnego wymiaru, a stare idealne zdjęcie nie usuwa wady widocznej teraz." },
      ] },
      { id: "scorecard", title: "7. Zbuduj krótką kartę dowodów", blocks: [
        { type: "list", title: "Zapisz pięć pozycji", items: ["Tożsamość: platforma, sklep, URL i wariant.", "Aktualność: daty oferty oraz sygnałów.", "Wzorce: powtarzane uwagi w opiniach i QC.", "Własna sztuka: wymiary, wady i kompletność.", "Niewiadome: brakujące ujęcia lub zasady."] },
        { type: "p", text: "Oznacz każdy punkt jako potwierdzony, wątpliwy albo nieznany i dopisz dowód uzasadniający etykietę." },
        { type: "p", text: "Słabe sygnały społeczne nie przeszkadzają, jeżeli tożsamość i materiał własnej sztuki są mocne. Odwrotna sytuacja nie działa: popularność nie naprawia niepewnej oferty." },
        { type: "p", text: "Zachowaj kartę z linkiem i zrzutami. Ułatwi porównanie kolejnych zamówień bez opierania się na pamięci." },
      ] },
    ],
    cta: { eyebrow: "Zastosuj kontekst", title: "Sprawdź, co zdjęcia QC mogą naprawdę udowodnić", label: "Poznaj ograniczenia zdjęć QC" },
  },

  "what-qc-photos-can-prove": {
    title: "Co zdjęcia QC w FindQC mogą — i czego nie mogą — powiedzieć przed wysyłką",
    shortTitle: "Rzeczywiste granice zdjęć QC",
    description: "Jak oddzielić widoczne wady, wymiary i kompletność od cech, których fotografia magazynowa nie jest w stanie potwierdzić.",
    excerpt: "Zdjęcie odpowiada na konkretne pytania wizualne, ale nie certyfikuje autentyczności, materiału, wygody ani przyszłej trwałości.",
    category: "Podstawy QC",
    readTime: "9 min czytania",
    date: "20 lipca 2026",
    heroAlt: "Odzież sfotografowana jako przykład redakcyjny kontroli QC",
    keywords: ["zdjęcia QC FindQC", "kontrola magazynowa", "ograniczenia QC", "pomiary QC", "kontrola przed wysyłką"],
    intro: ["Zdjęcia magazynowe są cenne, bo zamieniają część abstrakcyjnych pytań w widoczne obserwacje. Mogą też tworzyć fałszywą pewność, gdy oczekuje się od nich informacji spoza kadru. Dobra kontrola zaczyna się od pytania, na które obraz rzeczywiście może odpowiedzieć.", "FindQC wskazuje, że zdjęcia, waga, wymiary i informacje o wadach w dużej mierze pochodzą od zewnętrznych agentów, a ich dokładność, kompletność i autentyczność nie są gwarantowane. Ograniczenie nie czyni danych bezużytecznymi — określa sposób ich czytania."],
    sections: [
      { id: "source", title: "1. Zrozum pochodzenie dowodów", blocks: [
        { type: "p", text: "FindQC agreguje i porządkuje materiały podmiotów zewnętrznych. Serwis badawczy nie musi wykonywać zdjęć, kupować produktu ani kontrolować transakcji. Inny agent, termin lub wariant może dać inny zestaw." },
        { type: "p", text: "Publiczny rekord może dotyczyć wcześniejszej sztuki. Fotografie zamieszczone przez agenta na Twoim koncie są związane z bieżącym zamówieniem i powinny ważyć więcej, jeśli numer oraz wariant się zgadzają." },
        { type: "callout", title: "Hierarchia dowodów", text: "Publiczne rekordy służą do badania oferty; zdjęcia z Twojego magazynu do decyzji o konkretnej sztuce." },
      ] },
      { id: "visible", title: "2. Co zwykle pokazuje wyraźne zdjęcie", blocks: [
        { type: "p", text: "Ujęcie ogólne może ujawnić niewłaściwy kolor, brakującą część, silną asymetrię, deformację, uszkodzenie lub różnicę wobec zamówionego wariantu. Zbliżenia pokazują widoczne szwy, krawędzie nadruków, rysy, plamy, okucia i metki." },
        { type: "p", text: "Pewność rośnie, gdy ślad widać pod dwoma kątami i obok skali. Znak obecny tylko na ciemnym zdjęciu może być kurzem, odbiciem lub kompresją. Poproś o dodatkowe ujęcie przed nazwaniem go wadą." },
        { type: "figure", image: "/products/shoes-60.jpg", alt: "Szare buty jako ilustracja redakcyjna", caption: "Pełny widok pomaga sprawdzić parę, kształt i kolor; zbliżenia odpowiadają na pytania o łączenia oraz powierzchnie." },
        { type: "p", text: "Można też sprawdzić obecność pasków, sznurówek, elementów i opakowania, lecz zawsze porównuj je z dokładnym opisem oferty." },
      ] },
      { id: "measurements", title: "3. Pomiary odpowiadają na pytania o dopasowanie", blocks: [
        { type: "p", text: "Widoczna taśma zmienia wrażenie w liczbę. Dla odzieży wybierz szerokość klatki, długość, ramiona, rękaw, pas lub nogawkę zależnie od typu. Przy obuwiu proś o wkładkę, a przy torbie o trzy zewnętrzne wymiary." },
        { type: "p", text: "Metoda jest równie ważna jak wynik. Taśma powinna zaczynać się od zera, nie wyginać na grubej powierzchni i korzystać z tych samych punktów co Twój przedmiot referencyjny. Szerokość na płasko nie jest obwodem." },
        { type: "p", text: "Dopuszczaj niewielką tolerancję ułożenia i odczytu, ale wyjaśniaj różnice wpływające na użycie. Niewyraźne zdjęcie z zasłoniętym końcem taśmy nie rozwiązuje pytania." },
      ] },
      { id: "cannot-prove", title: "4. Czego fotografia zwykle nie udowadnia", blocks: [
        { type: "list", title: "Nie wyciągaj z obrazu tych wniosków", items: ["Skład, klasa ani bezpieczeństwo chemiczne materiału.", "Autentyczność lub certyfikat marki.", "Trwałość po wielu użyciach i praniach.", "Wygoda, zapach, dotyk lub układanie na ciele.", "Stan baterii, działanie wnętrza lub realna wodoodporność.", "Wady poza kadrem albo pod zamkniętą warstwą."] },
        { type: "p", text: "Gładka powierzchnia może być sztywna, urządzenie może się włączać mimo słabej baterii, a poprawny szew zewnętrzny nie pokazuje wzmocnienia od środka. Potrzebne są specyfikacje, testy, warunki zwrotu lub doświadczenie użytkowe." },
        { type: "p", text: "Warunki FindQC podają również, że materiał QC może zawierać błędy i nie stanowi certyfikacji autentyczności. Zagregowanego zdjęcia nie należy przedstawiać jako ekspertyzy." },
      ] },
      { id: "photo-problems", title: "5. Oddziel problem produktu od problemu fotografii", blocks: [
        { type: "p", text: "Światło zmienia odcień, szeroki obiektyw wygina krawędzie, złożona odzież wygląda niesymetrycznie, a folia tworzy refleksy. Sprawdź, czy domniemana wada pozostaje widoczna po zmianie ułożenia i oświetlenia." },
        { type: "p", text: "Nie odrzucaj jednak ostrego, powtarzalnego śladu jako winy aparatu. Opisz jego położenie względem szwu, metki lub linijki, aby magazyn mógł go odnaleźć." },
        { type: "figure", image: "/products/tshirt.webp", alt: "T-shirt ilustrujący wpływ zagnieceń i światła", caption: "Zagniecenia i cień zmieniają pozorny kształt. Gdy krój ma znaczenie, poproś o płaskie rozłożenie." },
      ] },
      { id: "request", title: "6. Proś o dodatkowy dowód w konkretnym celu", blocks: [
        { type: "p", text: "Dobra prośba podaje miejsce, kąt i powód. „Więcej zdjęć” może przynieść kolejne ogólne ujęcie. Lepiej napisać: „zbliżenie lewej krawędzi nadruku bez folii” albo „wkładka z widocznymi końcami taśmy”." },
        { type: "list", title: "Przykłady celowych próśb", items: ["Metka rozmiaru obok numeru zamówienia.", "Dwa kąty podejrzanego śladu.", "Płaski pomiar z widocznym początkiem i końcem.", "Wszystkie akcesoria poza opakowaniem.", "Konkretny test działania, jeśli agent go oferuje."] },
        { type: "p", text: "Przed zleceniem sprawdź koszt, czas i termin zwrotu. Dowód otrzymany po zamknięciu możliwości działania ma niewielką wartość praktyczną." },
      ] },
      { id: "decision", title: "7. Stosuj trzy stany decyzji", blocks: [
        { type: "p", text: "Przyjęcie oznacza zgodną tożsamość i brak widocznego problemu przekraczającego Twoją tolerancję. Nie jest gwarancją wszystkich cech produktu." },
        { type: "p", text: "Prośba o dowód oznacza, że wątpliwość wizualną może rozstrzygnąć pomiar, kąt lub dostępny test. To aktywny krok, nie nieokreślone czekanie." },
        { type: "p", text: "Odrzucenie albo wymiana dotyczy potwierdzonej, istotnej różnicy i podlega zasadom agenta oraz sprzedawcy. Zachowaj zrzuty i wskaż dokładny punkt." },
        { type: "p", text: "Trzy stany chronią zarówno przed automatyczną akceptacją kilku ładnych zdjęć, jak i odrzuceniem z powodu niejasnego cienia." },
      ] },
    ],
    cta: { eyebrow: "Zastosuj w praktyce", title: "Przejdź przez cały proces przed zatwierdzeniem wysyłki", label: "Otwórz poradnik zakupowy" },
  },

  "findqc-shopping-agent-workflow": {
    title: "FindQC i agent zakupowy: od linku produktu do decyzji w magazynie",
    shortTitle: "Od FindQC do decyzji magazynowej",
    description: "Jasny proces badania oferty, przekazania właściwego wariantu agentowi, kontroli własnej sztuki i oddzielenia akceptacji produktu od przygotowania paczki.",
    excerpt: "Rozdziel badanie, transakcję i dowody magazynowe, aby wiedzieć, która strona odpowiada za każdy etap.",
    category: "Proces z agentem",
    readTime: "10 min czytania",
    date: "20 lipca 2026",
    heroAlt: "Kurtka jako redakcyjny przykład zamówienia przez agenta",
    keywords: ["FindQC agent zakupowy", "zakupy z FindQC", "zdjęcia magazynowe", "link Taobao agent", "proces QC"],
    intro: ["FindQC i agent zakupowy pełnią odmienne role. FindQC pomaga wyszukiwać oraz porządkować rekordy; sprzedawca oferuje towar; agent może kupić, odebrać, sfotografować, przechować i wysłać przedmiot według własnych zasad. Pomieszanie funkcji utrudnia sprawdzenie ceny lub zgłoszenie problemu.", "Najbezpieczniejszy proces zachowuje ślad od pierwszego linku do decyzji magazynowej. Dzięki temu porównasz zamówiony wariant z otrzymanym, nadasz największą wagę zdjęciom własnej sztuki i rozwiążesz wątpliwości przed planowaniem wysyłki."],
    sections: [
      { id: "separate", title: "1. Oddziel badanie od transakcji", blocks: [
        { type: "p", text: "Warunki FindQC mówią, że platforma nie świadczy usług zakupu ani przekazywania paczek. Płatności, transport i zwroty realizują podmioty zewnętrzne, a link może prowadzić do agenta." },
        { type: "p", text: "Każdą kwotę i zasadę wpływającą na pieniądze potwierdź u odpowiedzialnej strony. Cena pochodzi z oferty, opłaty, zdjęcia dodatkowe, magazynowanie i trasy — od agenta, a podatki i ograniczenia zależą także od kraju docelowego." },
        { type: "table", headers: ["Etap", "Główne źródło", "Co potwierdzić"], rows: [["Badanie", "FindQC i oferta", "Tożsamość, rekordy, pytania"], ["Zakup", "Sprzedawca i agent", "Wariant, cena, zwrot"], ["Magazyn", "Konto agenta", "Sztuka, wymiary, widoczne wady"], ["Wysyłka", "Agent i przewoźnik", "Waga, trasa, ubezpieczenie, ograniczenia"]] },
      ] },
      { id: "candidate", title: "2. Utwórz kartę kandydata", blocks: [
        { type: "p", text: "Przed otwarciem agenta zapisz pełny URL, sklep, datowany zrzut, kolor, rozmiar, model oraz dołączane części. Zachowaj tabelę wymiarów i warunki, które mogą się zmienić." },
        { type: "p", text: "Dodaj ryzyka właściwe kategorii. W butach będą to wkładka, symetria i klejenie; w kurtce pomiary, zamek i panele; w elektronice model, wtyczka i dostępny test działania." },
        { type: "list", title: "Minimalna karta", items: ["Link i platforma źródłowa.", "Widoczny sklep lub sprzedawca.", "Dokładny wariant i liczba sztuk.", "Niezbędne wymiary lub akcesoria.", "Data i istotne warunki oferty."] },
      ] },
      { id: "research", title: "3. Nie myl historii ze stanem magazynowym", blocks: [
        { type: "p", text: "Wyszukaj link w FindQC i potwierdź dopasowanie. Dawne rekordy mogą ujawnić kąty, pomiary i powtarzalne problemy, ale nie dowodzą dostępności wariantu ani identyczności obecnej partii." },
        { type: "p", text: "Gdy strona informuje o usunięciu produktu, traktuj zdjęcia jak archiwum. Dostępność sprawdź w ofercie lub u agenta. Zachowana fotografia nie jest potwierdzeniem handlowym." },
        { type: "figure", image: "/products/jacket.webp", alt: "Ciemna kurtka jako przykład redakcyjny", caption: "Historyczne rekordy podpowiadają pytania kontrolne; bieżąca oferta pokazuje, co można kupić teraz." },
      ] },
      { id: "handoff", title: "4. Przekaż agentowi dokładne źródło i wariant", blocks: [
        { type: "p", text: "Wklej oryginalny link i uważnie wybierz opcję. W uwagach zapisz sprawdzalne dane: kolor, rozmiar, model i akcesorium. Unikaj „ten ze zdjęcia”, jeżeli strona ma wiele wariantów." },
        { type: "p", text: "Przed zapłatą potwierdź cenę, dostawę krajową, kurs agenta, ewentualne opłaty i zasady zwrotu. Historyczna liczba z FindQC nie jest aktualną wyceną." },
        { type: "callout", title: "Czyste przekazanie", text: "Ten sam link i nazwa wariantu powinny wystąpić w Twojej karcie, zamówieniu agenta i kontroli magazynowej." },
      ] },
      { id: "warehouse", title: "5. Największą wagę nadaj zdjęciom własnej sztuki", blocks: [
        { type: "p", text: "Po przyjęciu towaru porównaj numer zamówienia, wariant, kolor i liczbę. Następnie oceń ujęcia ogólne, detale i pomiary według przygotowanych pytań. Publiczna galeria nie może zastąpić dowodów z Twojego zamówienia." },
        { type: "p", text: "Jeśli agent oferuje limit bezpłatnych zdjęć lub płatne dodatki, sprawdź aktualne reguły na koncie. Wybieraj ujęcia, które mogą zmienić decyzję, a nie ozdobne zbliżenia." },
        { type: "list", title: "Kolejność kontroli", items: ["Zamówienie i wariant.", "Kształt, kolor i ilość.", "Detale wykonania ważne dla kategorii.", "Pomiary porównywalne z odniesieniem.", "Akcesoria i widoczne uszkodzenia opakowania."] },
      ] },
      { id: "uncertainty", title: "6. Zamień niewiadomą w precyzyjną prośbę", blocks: [
        { type: "p", text: "Podaj miejsce i cel: „zdjęcie prawej krawędzi nadruku bez folii” albo „pomiar wkładki od końca do końca”. Precyzyjne pytanie daje wynik możliwy do porównania z kryterium." },
        { type: "p", text: "Przed zleceniem sprawdź koszt, czas i termin zwrotu. Odpowiedź po zamknięciu okna zwrotu może być bezwartościowa praktycznie." },
        { type: "p", text: "Jeśli dostępna usługa nie może wykazać cechy, na przykład przyszłej trwałości, zapisz ją jako ryzyko resztkowe zamiast zamawiać nieprzydatną fotografię." },
      ] },
      { id: "parcel", title: "7. Zatwierdź produkt przed optymalizacją paczki", blocks: [
        { type: "p", text: "Najpierw przyjmij, wymień albo zwróć sztukę zgodnie z zasadami. Dopiero później porównuj opakowanie, usunięcie pudełek, wzmocnienie, wagę rzeczywistą i gabarytową, trasy, ubezpieczenie oraz ograniczenia." },
        { type: "p", text: "Historyczny haul daje kontekst, lecz nie jest ceną dla Twojego kraju, daty, wagi i objętości. Wycenę uzyskaj u agenta po poznaniu parametrów paczki." },
        { type: "figure", image: "/products/electronics.webp", alt: "Akcesorium elektroniczne jako przykład redakcyjny", caption: "Delikatne przedmioty i baterie mogą wymagać odrębnych kontroli i tras. Potwierdź aktualne zasady u agenta." },
      ] },
      { id: "audit", title: "8. Zachowaj krótki ślad decyzji", blocks: [
        { type: "p", text: "Zapisz adres, wariant, zrzuty oferty, zdjęcia magazynowe, zamówione pomiary i ostateczną decyzję. Daty pozwolą odróżnić historię od informacji aktualnej." },
        { type: "p", text: "W razie problemu pokażesz, co zamówiono i co otrzymano, nawet gdy strona ulegnie zmianie. Rejestr pomaga też porównywać sprzedawców, rozmiary i skuteczne prośby przy kolejnych zakupach." },
        { type: "p", text: "Dobry ślad nie musi być długi. Powinien zachować identyfikatory i dowody, które uzasadniały decyzję na każdym etapie." },
      ] },
    ],
    cta: { eyebrow: "Zacznij od dowodu", title: "Użyj FindQC z najbardziej precyzyjną metodą wyszukiwania", label: "Porównaj metody wyszukiwania" },
  },
};
