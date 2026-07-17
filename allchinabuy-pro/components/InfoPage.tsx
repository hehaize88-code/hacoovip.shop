import Link from "next/link";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <main className="inner-page">
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="prose-shell">{children}</section>
      <section className="page-cta">
        <div><p className="eyebrow">Continue browsing</p><h2>Use the directory, then verify the live page.</h2></div>
        <Link href="/finds" className="button button--lime">Browse finds <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

