import type { LongArticle } from "./article-content";
import de from "./content/de.json";
import fr from "./content/fr.json";
import es from "./content/es.json";
import it from "./content/it.json";

export const localizedArticles: Record<"de" | "fr" | "es" | "it", Record<string, LongArticle>> = { de, fr, es, it };
