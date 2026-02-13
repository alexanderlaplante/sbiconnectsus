# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

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

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Built-in Publishing

Click **Share → Publish** in the editor to deploy instantly. You can connect a custom domain under **Project > Settings > Domains**.

### Option 2: Self-Host via FTP

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

### Option 3: Other Hosting Platforms

The built output (`dist/`) is a standard static site and can be deployed to:

- **Netlify** — drag & drop the `dist/` folder or connect the GitHub repo
- **Vercel** — import the GitHub repo; framework preset: Vite
- **Cloudflare Pages** — connect the GitHub repo; build command: `npm run build`, output: `dist`
- **AWS S3 + CloudFront** — upload `dist/` to an S3 bucket and serve via CloudFront

## Can I connect a custom domain?

Yes! Navigate to **Project > Settings > Domains** and click **Connect Domain** (requires a paid plan).
