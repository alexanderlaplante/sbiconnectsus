# Fixing the "sharp" Build Error on the Production VM

If you see this error when running `deploy.sh` or `npm run build` on the server:

```
Error: Could not load the "sharp" module using the linux-x64 runtime
Unsupported CPU: Prebuilt binaries for linux-x64 require v2 microarchitecture
```

It means the VM's CPU is too old for the prebuilt `sharp` binaries. The `sharp` module (used by `vite-imagetools` for image optimization) ships prebuilt binaries that require x86-64-v2 instructions.

---

## Option A: Compile sharp from Source on the Server

Install the build tools so `sharp` can compile natively for your CPU:

```bash
sudo apt update
sudo apt install -y build-essential python3
```

Then reinstall dependencies:

```bash
cd /opt/sbiconnects
rm -rf node_modules
npm install
```

This forces `sharp` to build from source instead of using prebuilt binaries. After this, `deploy.sh` should work normally.

---

## Option B: Build Locally, Deploy Only the Output

Skip building on the server entirely. Build on your local machine (or any machine with a modern CPU) and upload the result.

### 1. Build locally

```bash
cd <your-local-project-folder>
npm install
ENABLE_PRERENDER=true npx vite build
```

### 2. Upload the `dist/` folder to the server

```bash
rsync -avz --delete dist/ your-user@your-server-ip:/var/www/sbiconnects/
```

### 3. Fix ownership

```bash
ssh your-user@your-server-ip "sudo chown -R www-data:www-data /var/www/sbiconnects"
```

No Nginx restart is needed — it serves static files directly.

---

## Which Option Should I Use?

| | Option A (compile on server) | Option B (build locally) |
|---|---|---|
| **Setup** | One-time install of build tools | No server changes needed |
| **Build speed** | Slower (server is often less powerful) | Faster (uses your local machine) |
| **deploy.sh** | Works as-is | Need to skip the build step |
| **Risk** | Compilation may fail if server has very limited RAM (<1 GB) | None — prebuilt binaries work on modern local machines |

**Recommendation:** Option B is simpler and more reliable. Build locally, upload `dist/`.

---

## Verifying the Fix

After deploying, confirm the site loads correctly:

```bash
curl -I https://sbiconnects.us
```

You should see `HTTP/2 200` with proper headers. Visit the site in a browser and check a few pages including `/services` and `/about`.

---

*Last updated: February 2026*
