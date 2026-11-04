import type { Locale, ArticleSlug, LocalArticle } from "../site-data";
import pl from "./growth.pl.json";
import en from "./growth.en.json";
import de from "./growth.de.json";
import fr from "./growth.fr.json";
import it from "./growth.it.json";
import es from "./growth.es.json";
import ro from "./growth.ro.json";

export const growthArticles = { pl, en, de, fr, it, es, ro } as unknown as Record<Locale, Partial<Record<ArticleSlug, LocalArticle>>>;
