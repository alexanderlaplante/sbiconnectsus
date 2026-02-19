import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

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
  const plugins: any[] = [react(), imagetools()];

  if (mode === "development") {
    plugins.push(componentTagger());
  }

  // Pre-rendering for production builds (no Puppeteer needed)
  if (mode === "production" && process.env.ENABLE_PRERENDER === "true") {
    const { vitePrerenderPlugin } = await import("vite-prerender-plugin");
    plugins.push(
      vitePrerenderPlugin({
        renderTarget: "#root",
        additionalPrerenderRoutes: PRERENDER_ROUTES,
      })
    );
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
