const catalogue = document.querySelector('[data-finds]');
if (catalogue) {
  const search = catalogue.querySelector('input');
  const cards = [...catalogue.querySelectorAll('[data-product]')];
  const chips = [...catalogue.querySelectorAll('[data-filter]')];
  const normalize = value => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let category = '';
  function filter() {
    const query = normalize(search.value.trim());
    for (const card of cards) {
      card.hidden = Boolean((category && card.dataset.category !== category) || !normalize(card.dataset.product).includes(query));
    }
    catalogue.querySelector('[role=status]').hidden = cards.some(card => !card.hidden);
    for (const chip of chips) chip.setAttribute('aria-pressed', String(chip.dataset.filter === category));
  }
  for (const chip of chips) chip.addEventListener('click', () => { category = chip.dataset.filter; filter(); });
  search.addEventListener('input', filter);
  catalogue.querySelector('[data-clear]').addEventListener('click', () => { category = ''; search.value = ''; filter(); search.focus(); });
}
