import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Hydrate if prerendered content exists, otherwise render fresh
const root = document.getElementById("root")!;
if (root.children.length > 0) {
  import("react-dom/client").then(({ hydrateRoot }) => {
    hydrateRoot(
      root,
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  });
} else {
  createRoot(root).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

// Re-export prerender for vite-prerender-plugin
export { prerender } from "./prerender";
