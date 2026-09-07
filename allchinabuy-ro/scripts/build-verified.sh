#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build

# Cloudflare Pages only publishes the configured dist/client directory. Vinext
# emits the request handler separately in dist/server, so copy its module graph
# into Pages' advanced-mode _worker.js directory before the upload step.
pages_worker="${SITES_PROJECT_ROOT}/dist/client/_worker.js"
mkdir -p "${pages_worker}"
cp "${SITES_PROJECT_ROOT}/dist/server/index.js" "${pages_worker}/index.js"
cp "${SITES_PROJECT_ROOT}/dist/server/__vite_rsc_assets_manifest.js" "${pages_worker}/__vite_rsc_assets_manifest.js"
cp "${SITES_PROJECT_ROOT}/dist/server/image-config.json" "${pages_worker}/image-config.json"
cp "${SITES_PROJECT_ROOT}/dist/server/vinext-externals.json" "${pages_worker}/vinext-externals.json"
cp "${SITES_PROJECT_ROOT}/dist/server/vinext-server.json" "${pages_worker}/vinext-server.json"
cp -R "${SITES_PROJECT_ROOT}/dist/server/assets" "${pages_worker}/assets"
cp -R "${SITES_PROJECT_ROOT}/dist/server/ssr" "${pages_worker}/ssr"
cp "${SITES_PROJECT_ROOT}/_routes.json" "${SITES_PROJECT_ROOT}/dist/client/_routes.json"

"${script_dir}/validate-artifact.sh"
