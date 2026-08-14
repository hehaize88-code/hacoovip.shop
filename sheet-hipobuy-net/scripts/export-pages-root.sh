#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

npm run build:pages
cp -a out/. .

test -s index.html
test -s articles/index.html

echo "Cloudflare Pages static export copied to the project root."
