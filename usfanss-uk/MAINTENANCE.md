# Static publication

Production serves the committed HTML documents in this directory. Keep the
2026-10-07 complete-document repair; do not restore Next hydration scripts.
The older `app/` export contains truncated source files and is not the current
static publication input.

The October article sources live in `content/2026-10/*.json`. Their templates
are in `templates/`. English and Italian versions have matching sections and
meaning. Other language hubs retain their existing local articles and mark
new English destinations explicitly; they do not claim untranslated pages as
hreflang equivalents.

Refresh content, validate existing routes and export a deployable tree:

```sh
python3 -m pip install -r requirements-maintenance.txt
npm run build:pages
```

`dist/pages` excludes source files and editorial JSON. The committed public
HTML is also updated by the build for the existing GitHub-linked deployment.
Only `usfanss-uk/` belongs to this site. Automatic article publication remains
disabled for this domain in the shared scheduler.
