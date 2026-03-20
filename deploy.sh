#!/usr/bin/env bash
# deploy.sh — Build and deploy SBI Connects to /var/www/sbiconnects
#
# Usage:
#   sudo bash deploy.sh            # Pull, build, and deploy
#   sudo bash deploy.sh --local    # Deploy pre-built dist/ (skip build)
#
# Prerequisites:
#   - Node.js 18+ installed
#   - Git repository cloned to /opt/sbiconnects
#   - Nginx configured to serve /var/www/sbiconnects

set -euo pipefail

REPO_DIR="/opt/sbiconnects"
WEB_DIR="/var/www/sbiconnects"
LOCAL_MODE=false

# --- Helpers ---
info()  { echo -e "\033[1;34m==>\033[0m $*"; }
ok()    { echo -e "\033[1;32m✓\033[0m   $*"; }
fail()  { echo -e "\033[1;31m✗\033[0m   $*" >&2; exit 1; }

# --- Parse flags ---
for arg in "$@"; do
  case "$arg" in
    --local) LOCAL_MODE=true ;;
    --help|-h)
      echo "Usage: sudo bash deploy.sh [--local]"
      echo "  --local  Skip build, deploy existing dist/ folder"
      exit 0
      ;;
    *) fail "Unknown option: $arg" ;;
  esac
done

cd "$REPO_DIR" || fail "Repository not found at $REPO_DIR"

# --- Build or validate dist/ ---
if [ "$LOCAL_MODE" = true ]; then
  info "Local mode — skipping build"
else
  info "Pulling latest changes..."
  git pull
  ok "Code updated"

  info "Installing dependencies..."
  npm install --prefer-offline
  ok "Dependencies ready"

  info "Building for production (with pre-rendering)..."
  ENABLE_PRERENDER=true npx vite build
  ok "Build complete"
fi

# --- Validate dist/ ---
if [ ! -f "dist/index.html" ]; then
  fail "dist/index.html not found. Build locally first, then copy dist/ to $REPO_DIR/dist/"
fi

# --- Verify GTM tags are present ---
if grep -q "G-1XKXVMQ6GT" dist/index.html && grep -q "G-YG6CT4C9ME" dist/index.html; then
  ok "Google Tag Manager verified (both IDs present)"
else
  echo -e "\033[1;33m⚠\033[0m  Warning: GTM tags may be missing from dist/index.html"
fi

# --- Deploy ---
info "Deploying to $WEB_DIR..."
sudo mkdir -p "$WEB_DIR"
sudo rsync -a --delete dist/ "$WEB_DIR/"
sudo chown -R www-data:www-data "$WEB_DIR"
ok "Deployed to $WEB_DIR"

echo ""
ok "Site updated at $(date)"
