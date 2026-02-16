import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/network-infrastructure",
  "/services/wireless-mobility",
  "/services/security-access",
  "/services/audio-visual",
  "/contact",
  "/sitemap",
];

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react()];

  if (mode === "development") {
    plugins.push(componentTagger());
  }

  // Pre-rendering only runs on production builds where Puppeteer is available.
  // Set ENABLE_PRERENDER=true in your CI/server environment to activate.
  if (mode === "production" && process.env.ENABLE_PRERENDER === "true") {
    try {
      const vitePrerender = (await import("vite-plugin-prerender")).default;
      plugins.push(
        vitePrerender({
          staticDir: path.join(__dirname, "dist"),
          routes: PRERENDER_ROUTES,
          renderer: new vitePrerender.PuppeteerRenderer({
            renderAfterTime: 2000,
            headless: true,
          }),
          postProcess(renderedRoute: any) {
            renderedRoute.route = renderedRoute.route.replace(/\/$/, "") || "/";
            return renderedRoute;
          },
        })
      );
    } catch {
      console.warn("vite-plugin-prerender skipped: Puppeteer not available in this environment.");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
