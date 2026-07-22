"use client";

import { useState } from "react";
import { ArrowIcon, SearchIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";
import { languagePath } from "../lib/routing";

function searchInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.hostname === "cnfanshp.com" || url.hostname.endsWith(".cnfanshp.com")) {
      return { directUrl: url.toString(), query: "" };
    }
    const itemId = url.searchParams.get("itemID") || url.searchParams.get("id") || trimmed.match(/\d{8,}/)?.[0];
    return { directUrl: "", query: itemId || trimmed };
  } catch {
    return { directUrl: "", query: trimmed };
  }
}

export default function SearchBox({ compact = false }) {
  const [query, setQuery] = useState("");
  const { language, t } = useLanguage();

  function submit(event) {
    event.preventDefault();
    const input = searchInput(query);
    if (!input) return;
    if (input.directUrl) {
      window.location.assign(input.directUrl);
      return;
    }

    const destination = new URL(languagePath("/search", language), window.location.origin);
    destination.searchParams.set("q", input.query);
    window.location.assign(destination.toString());
  }

  return (
    <form className={`search-box ${compact ? "compact" : ""}`} onSubmit={submit}>
      <div className="search-input-wrap">
        <SearchIcon size={compact ? 18 : 21} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search.placeholder")}
          aria-label={t("search.label")}
        />
      </div>
      <button type="submit">
        {t("search.button")} <ArrowIcon size={17} />
      </button>
      {!compact && <p>{t("search.hint")}</p>}
    </form>
  );
}
