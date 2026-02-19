#!/usr/bin/env bash
# deploy.sh — Pull latest code, build, and deploy to /var/www/sbiconnects
# Usage: sudo bash deploy.sh

set -euo pipefail

REPO_DIR="/opt/sbiconnects"
WEB_DIR="/var/www/sbiconnects"

echo "==> Pulling latest changes..."
cd "$REPO_DIR"
git pull

echo "==> Installing dependencies..."
npm install

echo "==> Building for production (with pre-rendering)..."
ENABLE_PRERENDER=true npx vite build

echo "==> Deploying to $WEB_DIR..."
sudo mkdir -p "$WEB_DIR"
sudo rsync -av --delete dist/ "$WEB_DIR/"
sudo chown -R www-data:www-data "$WEB_DIR"

echo "==> Done! Site updated at $(date)"
