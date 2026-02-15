# Deploying SBI Connects to a Production VM with TLS

This guide walks you through deploying the SBI Connects website to a production virtual machine (VM) with a proper TLS/SSL certificate. It's written so anyone on the team can follow along.

---

## Table of Contents

1. [Why You Can't Use Vite Dev Mode in Production](#why-you-cant-use-vite-dev-mode-in-production)
2. [What You Need Before Starting](#what-you-need-before-starting)
3. [Step 1: Build the Production Files](#step-1-build-the-production-files)
4. [Step 2: Upload Files to Your Server](#step-2-upload-files-to-your-server)
5. [Step 3: Install and Configure Nginx](#step-3-install-and-configure-nginx)
6. [Step 4: Get a Free TLS Certificate with Let's Encrypt](#step-4-get-a-free-tls-certificate-with-lets-encrypt)
7. [Step 5: Verify Everything Works](#step-5-verify-everything-works)
8. [Troubleshooting](#troubleshooting)
9. [Ongoing Maintenance](#ongoing-maintenance)

---

## Why You Can't Use Vite Dev Mode in Production

If you're seeing TLS/SSL errors or certificate warnings, it's almost certainly because the site is being served using `npm run dev` (Vite's development server). Here's why that's a problem:

| | Vite Dev Mode (`npm run dev`) | Production Build (`npm run build`) |
|---|---|---|
| **Purpose** | Local development only | Serving to real users |
| **Performance** | Slow — files are processed on every request | Fast — files are pre-optimized and compressed |
| **TLS/SSL** | ❌ No real certificate support | ✅ Works with Nginx + Let's Encrypt |
| **Security** | Exposes development tools and source maps | Minified, no dev tools exposed |
| **Stability** | Not designed for traffic | Production-ready |

**The fix:** Build the site into static files, then serve them with a proper web server (Nginx) that handles TLS certificates.

---

## What You Need Before Starting

- A **Linux VM** (Ubuntu 22.04 or 24.04 recommended) with root or sudo access
- A **domain name** (e.g., `sbiconnects.us`) with DNS pointed to your VM's IP address
- **SSH access** to your server
- **Node.js 18+** installed on your local machine (for building) or on the server

### Check your DNS first

Before starting, make sure your domain's DNS A records point to your VM's IP address:

| Record Type | Name | Value |
|-------------|------|-------|
| A | `@` (root) | Your VM's IP address |
| A | `www` | Your VM's IP address |

You can verify this at [dnschecker.org](https://dnschecker.org).

---

## Step 1: Build the Production Files

On your **local machine** (or on the server if you prefer), run:

```bash
# Clone the repository (if not already done)
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_FOLDER>

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist/` folder containing the final, optimized website files. This is what gets deployed — **not** the source code.

The `dist/` folder will contain:
- `index.html` — The main HTML file
- `assets/` — Optimized JavaScript, CSS, and images

---

## Step 2: Upload Files to Your Server

### Option A: Using SCP (from your local machine)

```bash
# Upload the dist folder to your server
scp -r dist/* your-user@your-server-ip:/var/www/sbiconnects/
```

### Option B: Using rsync (faster for updates)

```bash
rsync -avz --delete dist/ your-user@your-server-ip:/var/www/sbiconnects/
```

### Option C: Build directly on the server

```bash
# SSH into your server
ssh your-user@your-server-ip

# Clone and build
git clone <YOUR_GIT_URL> /opt/sbiconnects
cd /opt/sbiconnects
npm install
npm run build

# Copy built files to the web directory
sudo mkdir -p /var/www/sbiconnects
sudo cp -r dist/* /var/www/sbiconnects/
```

---

## Step 3: Install and Configure Nginx

Nginx is a web server that will serve your files and handle TLS certificates.

### Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

### Create the site configuration

```bash
sudo nano /etc/nginx/sites-available/sbiconnects
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name sbiconnects.us www.sbiconnects.us;

    root /var/www/sbiconnects;
    index index.html;

    # This is critical for single-page apps (React Router)
    # Without it, refreshing any page other than the homepage will show a 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for better performance
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
}
```

### Enable the site

```bash
# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/sbiconnects /etc/nginx/sites-enabled/

# Remove the default site (optional but recommended)
sudo rm /etc/nginx/sites-enabled/default

# Test the configuration for errors
sudo nginx -t

# If the test passes, reload Nginx
sudo systemctl reload nginx
```

At this point, your site should be accessible at `http://sbiconnects.us` (no TLS yet).

---

## Step 4: Get a Free TLS Certificate with Let's Encrypt

Let's Encrypt provides free, automatically-renewing TLS certificates. Certbot is the tool that sets it all up.

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get the certificate

```bash
sudo certbot --nginx -d sbiconnects.us -d www.sbiconnects.us
```

Certbot will:
1. Ask for your email address (for renewal notices)
2. Ask you to agree to terms of service
3. Automatically verify you own the domain
4. Install the certificate
5. Update your Nginx configuration to use HTTPS
6. Set up automatic HTTP → HTTPS redirect

### What Certbot does to your Nginx config

After running Certbot, your configuration will be automatically updated to include:

```nginx
server {
    listen 443 ssl;
    server_name sbiconnects.us www.sbiconnects.us;

    ssl_certificate /etc/letsencrypt/live/sbiconnects.us/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sbiconnects.us/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # ... rest of your config stays the same
}

server {
    listen 80;
    server_name sbiconnects.us www.sbiconnects.us;
    return 301 https://$server_name$request_uri;
}
```

You don't need to edit this manually — Certbot handles it.

### Verify auto-renewal is working

```bash
sudo certbot renew --dry-run
```

If this succeeds, your certificate will automatically renew before it expires (every 90 days). Certbot sets up a system timer that checks for renewal twice daily.

---

## Step 5: Verify Everything Works

### Check these URLs

| URL | Expected behavior |
|-----|-------------------|
| `http://sbiconnects.us` | Redirects to `https://sbiconnects.us` |
| `https://sbiconnects.us` | Shows the homepage with a valid lock icon |
| `https://www.sbiconnects.us` | Shows the site (or redirects to non-www) |
| `https://sbiconnects.us/services` | Shows the Services page (not a 404) |
| `https://sbiconnects.us/services/network-infrastructure` | Shows Network Infrastructure page |
| `https://sbiconnects.us/some-fake-page` | Shows the custom 404 page |

### Check TLS certificate

You can verify the certificate at [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) — enter your domain and it will grade your TLS setup.

---

## Troubleshooting

### "Your connection is not private" or certificate errors
- **Cause:** No TLS certificate, or the certificate is from Vite's dev server
- **Fix:** Follow Step 4 to install a Let's Encrypt certificate. Make sure you are **not** running `npm run dev` on the server

### Pages show 404 when refreshing
- **Cause:** Nginx is looking for actual files instead of routing through `index.html`
- **Fix:** Make sure your Nginx config includes `try_files $uri $uri/ /index.html;`

### "502 Bad Gateway" error
- **Cause:** Nginx can't find the files or there's a permission issue
- **Fix:** Check that `/var/www/sbiconnects/index.html` exists and is readable:
  ```bash
  ls -la /var/www/sbiconnects/
  sudo chown -R www-data:www-data /var/www/sbiconnects/
  ```

### Certbot fails to verify domain
- **Cause:** DNS hasn't propagated yet, or port 80 is blocked
- **Fix:**
  - Verify DNS with `dig sbiconnects.us` — it should show your VM's IP
  - Make sure port 80 and 443 are open in your firewall:
    ```bash
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw reload
    ```

### Site loads but looks broken (no styles or images)
- **Cause:** Files weren't uploaded correctly, or the `dist/` folder structure is wrong
- **Fix:** Make sure the contents of `dist/` are in `/var/www/sbiconnects/` (not nested inside another folder). You should see `index.html` directly at `/var/www/sbiconnects/index.html`

### Old content showing after an update
- **Cause:** Browser or CDN caching
- **Fix:** Hard refresh with `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac). The asset filenames include hashes, so new builds will automatically bypass cache for changed files.

---

## Ongoing Maintenance

### Deploying updates

Every time you make changes to the site:

```bash
# On your local machine (or wherever you build)
npm run build

# Upload the new files
rsync -avz --delete dist/ your-user@your-server-ip:/var/www/sbiconnects/
```

That's it. Nginx serves static files directly — no restart needed.

### Certificate renewal

Let's Encrypt certificates expire every 90 days, but Certbot automatically renews them. You can check the renewal timer with:

```bash
sudo systemctl status certbot.timer
```

### Server updates

Keep your server secure by running updates regularly:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Build the site | `npm run build` |
| Upload to server | `rsync -avz --delete dist/ user@server:/var/www/sbiconnects/` |
| Test Nginx config | `sudo nginx -t` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Check certificate status | `sudo certbot certificates` |
| Renew certificate manually | `sudo certbot renew` |
| Check Nginx error logs | `sudo tail -f /var/log/nginx/error.log` |
| Check Nginx access logs | `sudo tail -f /var/log/nginx/access.log` |

---

*Last updated: February 2026*
