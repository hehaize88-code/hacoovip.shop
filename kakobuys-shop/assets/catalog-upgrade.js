/* The catalog is rendered as complete localized HTML at build time.
   This file only provides the compact mobile expand/collapse control. */
const grid = document.querySelector('.kb-home-grid');
const button = document.querySelector('.kb-expand');

if (grid && button) {
  const language = document.documentElement.lang.split('-')[0];
  const labels = {
    en: { more: 'Show 12 more products', less: 'Show fewer products' },
    de: { more: '12 weitere Produkte anzeigen', less: 'Weniger Produkte anzeigen' },
    fr: { more: 'Afficher 12 produits supplémentaires', less: 'Afficher moins de produits' },
    es: { more: 'Mostrar 12 productos más', less: 'Mostrar menos productos' },
    it: { more: 'Mostra altri 12 prodotti', less: 'Mostra meno prodotti' }
  };
  const copy = labels[language] || labels.en;

  button.textContent = copy.more;
  button.addEventListener('click', () => {
    const expanded = grid.classList.toggle('is-expanded');
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? copy.less : copy.more;
  });
}
