#!/usr/bin/env bash
set -euo pipefail

if [[ "${CF_PAGES:-}" == "1" ]]; then
  exec bash scripts/build-pages-ci.sh
fi

exec bash scripts/build-verified.sh
