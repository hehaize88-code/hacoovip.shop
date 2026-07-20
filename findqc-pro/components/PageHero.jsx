export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
      {children && <div className="page-hero-side">{children}</div>}
    </section>
  );
}
