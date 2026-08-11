#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"
pages_dir="${project_root}/dist/pages"
static_out="${project_root}/.next-static"
next_bin="${project_root}/node_modules/.bin/next"

if [[ ! -x "${next_bin}" ]]; then
  echo "Next.js is unavailable. Run npm ci before building." >&2
  exit 69
fi

rm -rf "${pages_dir}" "${static_out}"

cd "${project_root}"
CLOUDFLARE_PAGES_STATIC=1 "${next_bin}" build

mkdir -p "${project_root}/dist"
mv "${static_out}" "${pages_dir}"

required_pages=(
  "index.html"
  "de/index.html"
  "categories/index.html"
  "articles/index.html"
  "articles/usfans-spreadsheet-guide/index.html"
  "pl/articles/usfans-shipping-cost-guide/index.html"
  "robots.txt"
  "sitemap.xml"
)

for page in "${required_pages[@]}"; do
  if [[ ! -f "${pages_dir}/${page}" ]]; then
    echo "Static Pages artifact is missing ${page}." >&2
    exit 1
  fi
done

echo "Prepared static Cloudflare Pages artifact in dist/pages."
