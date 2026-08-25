import { DESTINATION } from "@/app/data";
import { Arrow, SearchIcon } from "./Icons";

const SEARCH_COPY = {
  en: { label: "Search live products", placeholder: "Search products...", button: "Search live products" },
  es: { label: "Buscar productos actuales", placeholder: "Buscar productos...", button: "Buscar productos actuales" },
  fr: { label: "Rechercher des produits", placeholder: "Rechercher un produit...", button: "Rechercher des produits" },
  de: { label: "Produkte durchsuchen", placeholder: "Produkte suchen...", button: "Produkte durchsuchen" },
  it: { label: "Cerca prodotti", placeholder: "Cerca prodotti...", button: "Cerca prodotti" },
  pt: { label: "Pesquisar produtos", placeholder: "Pesquisar produtos...", button: "Pesquisar produtos" },
};

export default function HeroSearch({ locale = "en" }) {
  const copy = SEARCH_COPY[locale] || SEARCH_COPY.en;

  return (
    <form
      className="search-card"
      role="search"
      action={`${DESTINATION}/search.html`}
      method="get"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SearchIcon/>
      <label>
        <span>{copy.label}</span>
        <input
          type="search"
          name="keywords"
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          autoComplete="off"
          maxLength="80"
          required
        />
      </label>
      <input type="hidden" name="channelid" value="2"/>
      <input type="hidden" name="method" value="1"/>
      <button type="submit" aria-label={copy.button}><Arrow/></button>
    </form>
  );
}
