import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

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
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: PRERENDER_ROUTES,
        renderer: new vitePrerender.PuppeteerRenderer({
          // Wait until network is idle to capture full HTML with JSON-LD
          renderAfterDocumentEvent: "DOMContentLoaded",
          // Give React time to render and inject helmet tags
          renderAfterTime: 2000,
          headless: true,
        }),
        postProcess(renderedRoute) {
          // Ensure trailing slashes are consistent
          renderedRoute.route = renderedRoute.route.replace(/\/$/, "") || "/";
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
