#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

pages_root="${SITES_PROJECT_ROOT}/dist/client"
pages_worker="${pages_root}/_worker.js"
esbuild="${SITES_PROJECT_ROOT}/node_modules/.bin/esbuild"

[[ -x "${esbuild}" ]] || {
  echo "esbuild is unavailable. Run npm run install:ci before building." >&2
  exit 69
}

rm -rf "${pages_root}/server"
"${esbuild}" "${SITES_PROJECT_ROOT}/dist/server/index.js" \
  --bundle \
  --format=esm \
  --platform=neutral \
  --external:node:* \
  --outfile="${pages_worker}" \
  --log-level=warning

echo "Packaged Cloudflare Pages output: dist/client/_worker.js"
