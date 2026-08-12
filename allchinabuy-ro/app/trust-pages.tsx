import type { Metadata } from "next";
import Link from "next/link";

type TrustContent = {
  title: string;
  summary: string;
  sections: [string, string][];
};

export const trustPages: Record<string, TrustContent> = {
  methodology: {
    title: "Metodologie",
    summary:
      "Cum verificăm linkurile, imaginile și estimările publicate pe allchinabuy.ro.",
    sections: [
      [
        "Ce publicăm",
        "Pagina de produse afișează opt înregistrări vizibile. Nu folosim numere de bază de date, procente de potrivire sau statut «verificat» fără metodă și dovezi publice.",
      ],
      [
        "Verificarea linkurilor",
        "La 12 august 2026, fiecare card a fost asociat cu o pagină cnbuycha.com care returna un produs cu același nume. Linkurile includ parametri UTM pentru a identifica traficul din allchinabuy.ro.",
      ],
      [
        "Estimări în USD",
        "Prețurile CNY afișate au fost transformate orientativ la cursul de referință 1 USD = 6,744 CNY din 12 august 2026. Selecția variantei, cursul de schimb și actualizările catalogului pot modifica suma.",
      ],
      [
        "Reguli variabile",
        "Transportul, taxele, TVA, rutele, restricțiile și serviciile se verifică din surse oficiale la data publicării. Informația nu înlocuiește oferta live, autoritatea vamală sau consultanța profesională.",
      ],
    ],
  },
  about: {
    title: "Despre acest ghid",
    summary:
      "allchinabuy.ro este un ghid independent pentru cumpărătorii din România.",
    sections: [
      [
        "Scop",
        "Organizăm descoperirea produselor, verificarea pozelor QC și planificarea coletelor într-un format ușor de verificat pentru utilizatorii din România.",
      ],
      [
        "Independență",
        "Acesta nu este site-ul oficial AllChinaBuy și nu este afiliat cu AllChinaBuy sau cu mărcile prezentate. Numele terților sunt folosite descriptiv pentru a explica subiectul ghidului.",
      ],
      [
        "Limitări",
        "Nu vindem produsele afișate și nu controlăm catalogul, stocul, calitatea, transportatorii, taxele ori deciziile vamale. Verifică datele live înainte de plată.",
      ],
    ],
  },
  contact: {
    title: "Contact",
    summary:
      "Corecții editoriale, linkuri nefuncționale și solicitări privind conținutul.",
    sections: [
      [
        "Corecții",
        "Nu publicăm o adresă de contact neverificată. Până la activarea unui canal editorial confirmat, paginile indică data ultimei verificări, iar linkurile nefuncționale sunt reverificate la următoarea revizie programată.",
      ],
      [
        "Drepturi și mărci",
        "Pentru solicitări privind drepturile de autor sau mărcile, include materialul exact și dovada dreptului invocat. Vom analiza și corecta conținutul editorial justificat.",
      ],
      [
        "Asistență pentru comenzi",
        "Nu avem acces la conturi, comenzi, plăți sau colete. Pentru o comandă concretă, folosește canalul de suport al serviciului prin care ai comandat.",
      ],
    ],
  },
  privacy: {
    title: "Confidențialitate",
    summary: "Ce date sunt procesate când folosești acest site.",
    sections: [
      [
        "Date tehnice",
        "Serverul și furnizorii de infrastructură pot procesa date tehnice necesare livrării și securității, precum adresa IP, tipul de browser, momentul solicitării și pagina accesată.",
      ],
      [
        "Căutări și linkuri externe",
        "Căutarea și linkurile de produs trimit utilizatorul către cnbuycha.com. Parametrii UTM identifică sursa de recomandare, fără a include numele sau adresa ta de e-mail.",
      ],
      [
        "Contact",
        "Site-ul nu oferă în prezent un formular și nu solicită date personale prin e-mail. Nu trimite parole, date de plată sau documente vamale sensibile către adrese care pretind că reprezintă acest ghid.",
      ],
    ],
  },
  terms: {
    title: "Termeni de utilizare",
    summary:
      "Condițiile aplicabile conținutului editorial și linkurilor externe.",
    sections: [
      [
        "Informare, nu garanție",
        "Conținutul este oferit în scop informativ. Prețurile sunt estimări, iar disponibilitatea, taxele, rutele și politicile se pot schimba fără notificare.",
      ],
      [
        "Responsabilitatea utilizatorului",
        "Verifică legalitatea produsului, condițiile comerciantului, costul live și regulile de import aplicabile în România înainte de comandă sau expediere.",
      ],
      [
        "Site-uri externe",
        "Nu controlăm conținutul ori funcționarea paginilor externe. Un link valid la data verificării poate fi modificat sau eliminat ulterior de administratorul destinației.",
      ],
    ],
  },
  "affiliate-disclosure": {
    title: "Dezvăluire privind linkurile",
    summary: "Cum funcționează linkurile către catalogul extern.",
    sections: [
      [
        "Linkuri de recomandare",
        "Linkurile către cnbuycha.com includ parametri UTM pentru atribuirea traficului. Site-ul poate beneficia direct sau indirect de recomandări, fără ca această relație să schimbe prețul afișat utilizatorului.",
      ],
      [
        "Selecție editorială",
        "O posibilă relație de recomandare nu transformă un produs într-o recomandare garantată. Cardurile sunt puncte de descoperire și trebuie verificate în pagina live și, când există, prin dovezile QC.",
      ],
      [
        "Nicio afiliere oficială",
        "allchinabuy.ro este independent și nu reprezintă AllChinaBuy sau mărcile menționate. Linkurile nu constituie aprobare oficială din partea terților.",
      ],
    ],
  },
};

export function trustMetadata(slug: string): Metadata {
  const content = trustPages[slug];
  return {
    title: `${content.title} | allchinabuy.ro`,
    description: content.summary,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: content.title,
      description: content.summary,
      url: `/${slug}`,
      type: "website",
    },
  };
}

export function TrustPage({ slug }: { slug: string }) {
  const content = trustPages[slug];
  return (
    <main className="trust-page">
      <header>
        <Link href="/">← allchinabuy.ro</Link>
        <span>GHID INDEPENDENT PENTRU ROMÂNIA</span>
      </header>
      <section className="trust-page-hero">
        <span>/ TRUST_AND_TRANSPARENCY</span>
        <h1>{content.title}</h1>
        <p>{content.summary}</p>
      </section>
      <section className="trust-page-content">
        {content.sections.map(([heading, text], index) => (
          <article key={heading}>
            <span>0{index + 1}</span>
            <div>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
        <p className="trust-updated">Ultima actualizare: 12 august 2026</p>
      </section>
    </main>
  );
}
