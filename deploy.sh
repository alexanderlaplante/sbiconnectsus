#!/usr/bin/env bash
# deploy.sh — Pull latest code, build, and deploy to /var/www/sbiconnects
#
# Usage:
#   sudo bash deploy.sh            # Full build on server
#   sudo bash deploy.sh --local    # Skip build, sync pre-built dist/ only

set -euo pipefail

REPO_DIR="/opt/sbiconnects"
WEB_DIR="/var/www/sbiconnects"
LOCAL_MODE=false

for arg in "$@"; do
  case "$arg" in
    --local) LOCAL_MODE=true ;;
  esac
done

if [ "$LOCAL_MODE" = true ]; then
  echo "==> Local mode: skipping build, deploying pre-built dist/..."
  cd "$REPO_DIR"

  if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "ERROR: dist/ folder not found or missing index.html."
    echo "Build locally first, then copy dist/ to $REPO_DIR/dist/"
    exit 1
  fi
else
  echo "==> Pulling latest changes..."
  cd "$REPO_DIR"
  git pull

  echo "==> Installing dependencies..."
  npm install

  echo "==> Building for production (with pre-rendering)..."
  ENABLE_PRERENDER=true npx vite build
fi

echo "==> Deploying to $WEB_DIR..."
sudo mkdir -p "$WEB_DIR"
sudo rsync -av --delete dist/ "$WEB_DIR/"
sudo chown -R www-data:www-data "$WEB_DIR"

echo "==> Done! Site updated at $(date)"
