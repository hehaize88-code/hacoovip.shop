import type { ArticleEntry } from './articleRegistry';
import type { Lang } from './i18n';
import es from './november/es.json';
import en from './november/en.json';
import fr from './november/fr.json';
import de from './november/de.json';
import it from './november/it.json';
import pl from './november/pl.json';
import pt from './november/pt.json';
import zh from './november/zh.json';

export const novemberArticles: Record<Lang, ArticleEntry[]> = { es, en, fr, de, it, pl, pt, zh };
