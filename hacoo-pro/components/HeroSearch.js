import { DESTINATION } from "@/app/data";
import { Arrow, SearchIcon } from "./Icons";

const SEARCH_COPY = {
  en: { label: "Search CNFansHP", placeholder: "Search products...", button: "Search CNFansHP products" },
  es: { label: "Buscar en CNFansHP", placeholder: "Buscar productos...", button: "Buscar productos en CNFansHP" },
  fr: { label: "Rechercher sur CNFansHP", placeholder: "Rechercher un produit...", button: "Rechercher des produits sur CNFansHP" },
  de: { label: "CNFansHP durchsuchen", placeholder: "Produkte suchen...", button: "Produkte auf CNFansHP suchen" },
  it: { label: "Cerca su CNFansHP", placeholder: "Cerca prodotti...", button: "Cerca prodotti su CNFansHP" },
  pt: { label: "Pesquisar na CNFansHP", placeholder: "Pesquisar produtos...", button: "Pesquisar produtos na CNFansHP" },
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
