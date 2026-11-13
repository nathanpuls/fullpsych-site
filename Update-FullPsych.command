#!/bin/zsh
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${0:A:h}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "You have local changes. Commit and push them before pulling GitHub changes; nothing was overwritten."
  read '?Press Return to close.'; exit 1
fi
git pull --ff-only origin main
echo "Pulled GitHub changes. The running preview refreshes automatically."
read '?Press Return to close.'
