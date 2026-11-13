#!/bin/zsh
set -eu
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd -- "$(dirname -- "$0")"
if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  print "Install Node.js LTS from https://nodejs.org and reopen this file."
  read "?Press Return to close."
  exit 1
fi
if ! node -e 'const [major,minor]=process.versions.node.split(".").map(Number);process.exit(major>22 || (major===22 && minor>=22)?0:1)'; then
  print "This Tina test needs Node.js 22.22 or newer. Update Node.js LTS and reopen this file."
  read "?Press Return to close."
  exit 1
fi
for port in 4322 4001; do
  if lsof -nP -iTCP:$port -sTCP:LISTEN >/dev/null 2>&1; then
    print "Port $port is already in use. Stop the previous Tina test and reopen this file."
    read "?Press Return to close."
    exit 1
  fi
done
if [[ ! -x node_modules/.bin/tinacms || ! -x node_modules/.bin/astro ]]; then
  print "Installing TinaCMS and Astro for this separate test. The first launch may take a few minutes."
  npm install --no-audit --no-fund
fi

log_file="$PWD/tina-preview.log"
npm run dev >"$log_file" 2>&1 &
preview_pid=$!
trap 'kill "$preview_pid" 2>/dev/null || true' EXIT INT TERM

ready=false
for attempt in {1..180}; do
  if ! kill -0 "$preview_pid" 2>/dev/null; then
    cat "$log_file"
    read "?Press Return to close."
    exit 1
  fi
  if curl --silent --fail http://localhost:4322/ >/dev/null; then
    ready=true
    break
  fi
  sleep 1
done
if [[ "$ready" != true ]]; then
  cat "$log_file"
  print "Tina did not start in time. Leave this window open so the error can be checked."
  read "?Press Return to close."
  exit 1
fi
open -a "Google Chrome" "http://localhost:4322/admin/index.html#/~/" "http://localhost:4322/"
print "TinaCMS: http://localhost:4322/admin/index.html#/~/"
print "Preview: http://localhost:4322/"
print "Keep this Terminal window open. No production publication occurs."
wait "$preview_pid"

