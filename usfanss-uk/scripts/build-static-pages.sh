#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"
cd "${project_root}"
python3 -c 'import bs4' || { echo 'Install requirements-maintenance.txt before building.' >&2; exit 69; }
python3 scripts/refresh-static.py
python3 scripts/validate-static.py
python3 scripts/export-static.py
