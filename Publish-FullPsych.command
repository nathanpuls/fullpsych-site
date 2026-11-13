#!/bin/zsh
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${0:A:h}"

node scripts/publish.mjs
open -a 'Google Chrome' 'https://github.com/nathanpuls/fullpsych-site/actions/workflows/publish.yml'
echo "Publish requested. GitHub Actions will build and deploy to fullpsych.com."
read '?Press Return to close.'
