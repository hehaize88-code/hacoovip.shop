type SearchBoxProps = {
  placeholder?: string;
  buttonLabel?: string;
  compact?: boolean;
};

export function SearchBox({
  placeholder = "Search shoes, clothing or paste a product name",
  buttonLabel = "Search main site",
  compact = false,
}: SearchBoxProps) {
  return (
    <form
      className={compact ? "search-form search-form--compact" : "search-form"}
      action="https://www.cnfanshp.com/search.html"
      method="get"
      aria-label="Search the CNFansHP catalogue"
    >
      <input type="hidden" name="channelid" value="2" />
      <label className="sr-only" htmlFor={compact ? "catalogue-search-compact" : "catalogue-search"}>
        Search products
      </label>
      <span className="search-form__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id={compact ? "catalogue-search-compact" : "catalogue-search"}
        name="keywords"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        required
      />
      <button type="submit" aria-label={buttonLabel}>
        <span className="search-form__button-label">{buttonLabel}</span>
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
