# Static publication

Production serves the committed HTML documents in this directory. Keep the
2026-10-07 complete-document repair; do not restore Next hydration scripts.
The older `app/` export contains truncated source files and is not the current
static publication input.

The complete article sources live in `content/2026-10/*.{lang}.json`. Their
templates are in `templates/`. `article-order.json` is the shared article
registry: every English, German, French, Spanish, Italian and Polish hub must
contain the same 14 articles. Each translated article preserves the original
sections, paragraphs, tables, references and related-guide relationships.
Homepages show the same four featured articles in the selected language.

All article language switches remain on the same article. Related guides stay
in the selected language, and every article publishes six reciprocal language
alternates plus `x-default`. Missing translations are a build error; never
replace a local article with an English fallback or silently hide its card.
The validator checks the complete source and rendered-page language matrix.
Local translation drafts were reviewed for titles, terminology and numerical
examples before rendering; translation models are not part of the deployment.

Refresh content, validate existing routes and export a deployable tree:

```sh
python3 -m pip install -r requirements-maintenance.txt
npm run build:pages
```

`dist/pages` excludes source files and editorial JSON. The committed public
HTML is also updated by the build for the existing GitHub-linked deployment.
Only `usfanss-uk/` belongs to this site. Automatic article publication remains
disabled for this domain in the shared scheduler.
