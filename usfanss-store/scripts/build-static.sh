#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${project_root}"

rm -rf static-assets .static-build
mkdir -p static-assets .static-build

./node_modules/.bin/esbuild app/static-client.tsx \
  --bundle \
  --format=esm \
  --jsx=automatic \
  --minify \
  --outfile=static-assets/app.js

./node_modules/.bin/esbuild scripts/render-static.tsx \
  --bundle \
  --platform=node \
  --format=esm \
  --packages=external \
  --jsx=automatic \
  --outfile=.static-build/render.mjs

node .static-build/render.mjs
echo "Static Cloudflare Pages output is ready in the project root."
