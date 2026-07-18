type SearchBoxProps = {
  placeholder?: string;
  buttonLabel?: string;
  compact?: boolean;
};

export function SearchBox({
  placeholder = "Search shoes, clothing or paste a product name",
  buttonLabel = "Search all finds",
  compact = false,
}: SearchBoxProps) {
  return (
    <form
      className={compact ? "search-form search-form--compact" : "search-form"}
      action="https://www.allchinabuy.com/en/page/search"
      method="get"
      aria-label="Search the AllChinaBuy catalogue"
    >
      <input type="hidden" name="nTag" value="Home-search" />
      <input type="hidden" name="from" value="search-input" />
      <input type="hidden" name="_search" value="keyword" />
      <input type="hidden" name="position" value="" />
      <label className="sr-only" htmlFor={compact ? "catalogue-search-compact" : "catalogue-search"}>
        Search products
      </label>
      <span className="search-form__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id={compact ? "catalogue-search-compact" : "catalogue-search"}
        name="keyword"
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
