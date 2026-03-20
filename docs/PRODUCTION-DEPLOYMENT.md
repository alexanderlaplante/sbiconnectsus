# Deploying SBI Connects to Production

Quick-reference guide for deploying the SBI Connects website to a production VM with TLS.

---

## Prerequisites

- **Linux VM** (Ubuntu 22.04+) with root/sudo access
- **Domain** (`sbiconnects.us`) with DNS A records pointing to the VM
- **Node.js 18+** on local machine or server
- **SSH access** to the server
- **Nginx** + **Let's Encrypt** configured (see [Initial Setup](#initial-server-setup) below)

---

## Deploy Workflows

### Option A: Build on the server

```bash
sudo bash deploy.sh
```

Pulls latest code → installs deps → builds with pre-rendering → syncs to web root → verifies GTM tags.

### Option B: Build locally, deploy output

Use this when the server can't build (e.g., the [sharp CPU issue](FIXING-SHARP-BUILD-ERROR.md)):

```bash
# 1. Build locally
ENABLE_PRERENDER=true npx vite build

# 2. Upload dist/ to server
rsync -avz --delete dist/ your-user@your-server-ip:/opt/sbiconnects/dist/

# 3. Deploy on server
ssh your-user@your-server-ip "cd /opt/sbiconnects && sudo bash deploy.sh --local"
```

### Post-deploy checklist

| Check | How to verify |
|-------|---------------|
| Site loads | Visit `https://sbiconnects.us` |
| TLS valid | Lock icon in browser, or [ssllabs.com](https://www.ssllabs.com/ssltest/) |
| SPA routing works | Refresh `https://sbiconnects.us/services` — should not 404 |
| GTM firing | DevTools → Network → filter `googletagmanager` → both IDs present |
| 404 page works | Visit `https://sbiconnects.us/fake-page` |

---

## Initial Server Setup

Only needed once when provisioning a new server.

### 1. Install Nginx

```bash
sudo apt update && sudo apt install nginx -y
```

### 2. Configure the site

```bash
sudo nano /etc/nginx/sites-available/sbiconnects
```

```nginx
server {
    listen 80;
    server_name sbiconnects.us www.sbiconnects.us;

    root /var/www/sbiconnects;
    index index.html;

    # SPA routing — all paths resolve to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache hashed assets indefinitely
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/sbiconnects /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### 3. TLS with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d sbiconnects.us -d www.sbiconnects.us
sudo certbot renew --dry-run   # verify auto-renewal
```

Certbot auto-updates Nginx config for HTTPS and sets up renewal via systemd timer.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Certificate errors / "not private" | Run `sudo certbot --nginx` — never serve with `npm run dev` |
| 404 on page refresh | Ensure `try_files $uri $uri/ /index.html;` in Nginx config |
| 502 Bad Gateway | Check `/var/www/sbiconnects/index.html` exists and is owned by `www-data` |
| Certbot fails | Verify DNS with `dig sbiconnects.us`, ensure ports 80/443 open (`sudo ufw allow 80 443`) |
| Styles/images broken | Ensure `dist/` contents are at `/var/www/sbiconnects/` root (not nested) |
| Old content after deploy | Hard refresh `Ctrl+Shift+R` — hashed filenames bust cache for changed files |
| GTM tags missing | Rebuild from latest source; `deploy.sh` will warn if tags are absent |

---

## Quick Reference

| Task | Command |
|------|---------|
| Full deploy on server | `sudo bash deploy.sh` |
| Deploy pre-built dist/ | `sudo bash deploy.sh --local` |
| Build locally | `ENABLE_PRERENDER=true npx vite build` |
| Upload dist/ to server | `rsync -avz --delete dist/ user@server:/opt/sbiconnects/dist/` |
| Test Nginx config | `sudo nginx -t` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Check cert status | `sudo certbot certificates` |
| Renew cert | `sudo certbot renew` |
| Nginx error logs | `sudo tail -f /var/log/nginx/error.log` |

---

*Last updated: March 2026*
