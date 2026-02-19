# SBI Connects — Company Website

## About SBI

**Smart Building Integrators, LLC (SBI)** is a Service-Disabled Veteran-Owned Small Business (SDVOSB) delivering engineered, standards-driven low-voltage infrastructure solutions for modern facilities. With in-house RCDD leadership and Professional Engineer oversight, SBI designs and builds systems that meet BICSI, ANSI/TIA, and industry compliance standards.

SBI Connects specializes in four integrated service pillars:

- **Network Infrastructure** — Structured cabling, fiber, MDF/IDF, data center systems
- **Wireless & Mobility** — Enterprise Wi-Fi, Public Safety DAS, cellular DAS, private LTE
- **Security & Life-Safety** — IP video surveillance, access control, intrusion detection, unified platforms
- **Audio-Visual Systems** — Conference/collaboration, mass notification, sound masking

## About This Repository

This repository contains the source code for the SBI Connects marketing website at [sbiconnects.us](https://sbiconnects.us). It is a modern single-page application built for fast navigation, SEO optimization, and clear presentation of SBI's design-build capabilities.

## How to Edit This Code

If you want to work locally using your own IDE, clone this repo and push changes. The only requirement is having Node.js & npm installed — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Documentation

- **[Complete Site Changelog](docs/SITE-CHANGELOG.md)** — A plain-language record of every major change made to the site from initial build through current version. Covers pages, design, animations, architecture, and more.
- **[SEO & AI Updates](docs/SEO-AND-AI-UPDATES.md)** — A non-technical summary of all search engine optimization and AI readiness improvements.
- **[Production VM Deployment Guide](docs/PRODUCTION-DEPLOYMENT.md)** — Step-by-step instructions for deploying to a Linux VM with Nginx and a free TLS certificate from Let's Encrypt.
- **[Fixing the Sharp Build Error](docs/FIXING-SHARP-BUILD-ERROR.md)** — How to resolve the "sharp" module CPU compatibility error when building on the production VM.

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

### Option 1: Self-Host via FTP

1. Clone the repo and install dependencies (`npm install`)
2. Build the project: `npm run build`
3. Upload the contents of the `dist/` folder to your server via FTP (FileZilla, WinSCP, etc.)
4. **Important:** Configure your server to redirect all routes to `index.html` for SPA routing:

**Apache (.htaccess in your site root):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Option 2: Other Hosting Platforms

The built output (`dist/`) is a standard static site and can be deployed to:

- **Netlify** — drag & drop the `dist/` folder or connect the GitHub repo
- **Vercel** — import the GitHub repo; framework preset: Vite
- **Cloudflare Pages** — connect the GitHub repo; build command: `npm run build`, output: `dist`
- **AWS S3 + CloudFront** — upload `dist/` to an S3 bucket and serve via CloudFront
