#!/usr/bin/env bash
set -e

echo "Publishing Wiki to https://github.com/eshaanag/CommitIQ.wiki.git..."
cd "$(dirname "$0")/../wiki"

# Ensure all files are tracked and committed locally
git add .
git -c commit.gpgsign=false commit -m "Update CommitIQ wiki documentation" || true

# Get authentication token from gh CLI
TOKEN=$(gh auth token)
REMOTE_URL="https://x-access-token:${TOKEN}@github.com/eshaanag/CommitIQ.wiki.git"

# Push to GitHub Wiki
git push -u "$REMOTE_URL" master:master --force

echo "✅ Successfully published all wiki pages to GitHub Wiki!"
