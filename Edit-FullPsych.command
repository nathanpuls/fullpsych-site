#!/bin/zsh
set -e
unsetopt BG_NICE
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${0:A:h}"
editor_url='http://localhost:4323/admin/index.html#/~/'
if curl --silent --fail --max-time 2 http://localhost:4323/admin/index.html >/dev/null 2>&1; then
  /usr/bin/open "$editor_url"
  exit 0
fi
if lsof -iTCP:4323 -sTCP:LISTEN -t >/dev/null; then
  echo "Port 4323 is occupied, but the FullPsych editor is not responding."
  read '?Press Return to close.'; exit 1
fi
if [[ -z "$(git status --porcelain)" ]]; then
  git pull --ff-only origin main || echo "Could not reach GitHub. Opening the saved local copy."
else
  echo "Opening your saved local edits. Nothing will be overwritten."
fi
if [[ ! -x node_modules/.bin/tinacms ]]; then npm ci --no-audit --no-fund; fi
# Detach the server so closing this launcher window does not stop the editor.
nohup npm run dev >fullpsych-preview.log 2>&1 </dev/null &
preview_pid=$!
disown "$preview_pid"
for attempt in {1..150}; do
  if curl --silent --fail --max-time 2 http://localhost:4323/ >/dev/null 2>&1; then
    /usr/bin/open "$editor_url"
    echo "FullPsych is ready. You can close this window; the server keeps running."
    exit 0
  fi
  if ! kill -0 "$preview_pid" 2>/dev/null; then
    cat fullpsych-preview.log
    read '?FullPsych could not start. Press Return to close.'; exit 1
  fi
  sleep 1
done
cat fullpsych-preview.log
read '?FullPsych did not become ready. Press Return to close.'
exit 1
