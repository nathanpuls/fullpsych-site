#!/bin/zsh
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${0:A:h}"

if [[ -z "$(git status --porcelain)" ]]; then
  git pull --ff-only origin main
else
  echo "Opening your saved local edits. GitHub changes will be pulled when the working copy is clean."
fi
if [[ ! -x node_modules/.bin/tinacms ]]; then npm ci --no-audit --no-fund; fi
if lsof -iTCP:4323 -sTCP:LISTEN -t >/dev/null; then
  open -a 'Google Chrome' 'http://localhost:4323/admin/index.html#/~/'; exit 0
fi
npm run dev >fullpsych-preview.log 2>&1 &
preview_pid=$!
trap 'kill "$preview_pid" 2>/dev/null || true' EXIT INT TERM
for attempt in {1..120}; do
  if curl --silent --fail http://localhost:4323/ >/dev/null; then
    open -a 'Google Chrome' 'http://localhost:4323/admin/index.html#/~/'
    echo "FullPsych editor is open. Leave this window running."
    wait "$preview_pid"
    exit
  fi
  if ! kill -0 "$preview_pid" 2>/dev/null; then cat fullpsych-preview.log; read '?Press Return to close.'; exit 1; fi
  sleep 1
done
cat fullpsych-preview.log
read '?Preview did not start. Press Return to close.'
exit 1
