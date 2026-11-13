#!/bin/zsh
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${0:A:h}"

if [[ "$(git branch --show-current)" != main ]]; then
  echo "Publishing is only available from main."; read '?Press Return to close.'; exit 1
fi
# Pull first when clean; push rejects remote changes if local edits need reconciling.
if [[ -z "$(git status --porcelain)" ]]; then git pull --ff-only origin main; fi
node --input-type=module -e "import fs from 'node:fs'; fs.writeFileSync('publish.json', JSON.stringify({revision: Date.now()}, null, 2) + '\n');"
git add -A
git commit -m "Publish FullPsych"
git push origin main
open -a 'Google Chrome' 'https://github.com/nathanpuls/fullpsych-site/actions/workflows/publish.yml'
echo "Publish requested. GitHub Actions will build and deploy to fullpsych.com."
read '?Press Return to close.'
