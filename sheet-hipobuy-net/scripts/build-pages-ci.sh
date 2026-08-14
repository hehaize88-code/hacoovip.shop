#!/usr/bin/env bash
set -euo pipefail

npm run build:pages

# Keep the export compatible with the common Pages output settings for this
# repository: Next.js static export (`out`), Vite (`dist`), and Vinext client
# assets (`dist/client`).
mkdir -p dist/client
cp -a out/. dist/.
cp -a out/. dist/client/.

test -s out/index.html
test -s dist/index.html
test -s dist/client/index.html

echo "Cloudflare Pages output is ready in out, dist, and dist/client."
