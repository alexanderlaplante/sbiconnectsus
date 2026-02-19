import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Full SBI logo SVG paths — text (SBI letters) and accent (stripes)
const LOGO_SVG = (textColor: string, accentColor: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1452.28 390.14">
  <g>
    <polygon fill="${textColor}" points="1452.28 24.76 1391.05 351.03 1292.13 351.03 1351.79 24.76 1452.28 24.76"/>
    <path fill="${textColor}" d="M880.75,56.13c-13.12,96.81-37.9,192.29-53.39,288.62-.31,1.93-1.09,6.62,1.74,6.32l317.16.07c6,.53,18.64-1.23,24.23-2.07,39.86-5.96,74.89-20.53,92.53-60.06,14.24-31.89,16.61-68.6-13.85-91.15-8.44-6.25-16.6-6.71-23.57-10.32-3.32-1.72-.31-4.96.57-5.9.89-.94,16.32-3.65,24.32-8.68,60.74-38.18,44.27-145.13-40.02-145.07l-318.86-3.36c-5.37-1.29-7.64,8.16-7.74,12.77l-3.14,18.82h.02ZM955.05,218.85l199.78,1.12c22.83,2.9,10.6,49.5-5.58,49.5h-205.69l11.49-50.61h0ZM1164.95,153.38h-199.41l9.21-48.84,192.67-.68c27.71,6.1,12.61,49.52-2.47,49.52Z"/>
    <path fill="${textColor}" d="M838.35,24.76h-292.05c-21.84,0-71.6,14.68-88.42,29.32-33,28.72-50.46,102.34-19.97,137.69,41.15,47.72,193.28,24.39,252.14,31.33,23.54,5.07,11.7,44.72-11.79,43.29l-279.2-.26-17.64,84.88c96.27-4.55,198.11,6.1,293.75.14,9.27-.58,26.84-2.08,39.37-3.33,44.38-3.67,73.96-29.07,88.57-72.77,17.64-52.76,13.46-104.59-46.59-121.49-60.14-16.92-130.32-4.79-191.5-9.47-17.47-1.34-38.7-2.36-31.47-25.35,4.04-12.85,16.93-13.72,28.49-15.5l265.17-.2,11.14-78.27h0Z"/>
  </g>
  <g>
    <path fill="${accentColor}" d="M1452.28,378.76h-539.88l-584.66-4.99-245.42-22.24v22.24L0,389.52c0,.24,1.1.43,3.26.62h1449.02v-11.38h0Z"/>
    <path fill="${accentColor}" d="M341.61,71.52l-122.26-33.07C151.28,20.05,94.63,0,94.16,0l-.29,25.56-41.16,20.68c-27.57,13.85-41.16,21.26-41.16,22.45,0,1.01.66,1.52,1.52,1.19.84-.32,19.63-6.83,41.76-14.47l40.24-13.88,121.46,21.84c66.81,12.01,123.15,26.55,124.56,26.89.42.1.76.17,1.05.2l-.53-18.94Z"/>
    <path fill="${accentColor}" d="M341.61,123.22l-1.98-.53c-5.42-1.45-243.77-62.04-244.4-62.04l-.15,25.04-41.39,18c-22.22,9.66-40.66,17.84-41,18.17-3.04,3.04,5.85,1.22,40.48-8.28l40.28-11.05,121.51,17.96c66.83,9.88,123.18,18.22,125.23,18.54l1.41.22v-16.03h0Z"/>
    <path fill="${accentColor}" d="M341.61,173.83l-116.05-24.87c-67.13-14.39-130.48-28.76-130.48-28.76v25.32l-37.9,13.65c-27.47,9.89-41.15,15.36-41.15,16.43,0,.96.81,1.4,2,1.1,1.1-.28,19.82-4.05,41.59-8.37l39.59-7.87,124.79,14.45,117.6,16.33v-17.4h.01Z"/>
    <path fill="${accentColor}" d="M341.61,223.31l-246.07-47.38v25.1c-24.17,6.72-79.93,24.09-80.72,24.84-.59.55-.74,1.33-.35,1.73.4.4,18.63-1.61,40.51-4.45l39.79-5.17,125.49,10.51,121.33,10.17v-15.34h.02Z"/>
    <path fill="${accentColor}" d="M95.08,235.66c-1.46,0-.43,4.01-.43,12.87v10.69l-37.45,8.18c-20.6,4.5-39.12,8.5-41.16,8.89-2.05.39-3.72,1.42-3.72,2.28s.39,1.57.87,1.57,17.74-1.02,38.35-2.27l37.47-2.27,121.44,6.27c66.79,3.45,124.15,6.27,127.45,6.28h3.7v-17.57l-246.53-34.91h0Z"/>
    <path fill="${accentColor}" d="M93.22,317.43c-.79,0-18.86,2.58-40.16,5.72-21.3,3.14-39.18,5.71-39.73,5.71s-1.01.74-1.01,1.65c0,1.4,5.43,1.72,35.16,2.05l294.12,5.92v-16.1l-118.9-13.18c-66.35-7.36-122.3-13.4-124.34-13.44l-5.76-.09.62,21.76h0Z"/>
  </g>
</svg>`;

/**
 * Render the SBI logo SVG onto a canvas at the given size with a background color,
 * then return a data URL PNG.
 */
function renderIconToDataUrl(
  size: number,
  bgColor: string,
  textColor: string,
  accentColor: string
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Draw logo SVG centered
    const svg = LOGO_SVG(textColor, accentColor);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      // Center the logo with padding
      const padding = size * 0.12;
      const availW = size - padding * 2;
      const availH = size - padding * 2;
      const logoAspect = 1452.28 / 390.14;
      let drawW = availW;
      let drawH = drawW / logoAspect;
      if (drawH > availH) {
        drawH = availH;
        drawW = drawH * logoAspect;
      }
      const x = (size - drawW) / 2;
      const y = (size - drawH) / 2;
      ctx.drawImage(img, x, y, drawW, drawH);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = url;
  });
}

export const useDynamicFavicon = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Defer favicon generation to after page is interactive
    const timeout = setTimeout(async () => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const textColor = styles.getPropertyValue("--logo-text").trim() || "#e0e4ea";
      const accentColor = styles.getPropertyValue("--logo-accent").trim() || "#f37216";
      const bgColor = styles.getPropertyValue("--background").trim();

      // Parse HSL background to a usable color string
      const bgHsl = bgColor ? `hsl(${bgColor})` : "#121417";

      // 1. Update SVG favicon
      const faviconSvg = LOGO_SVG(textColor, accentColor);
      const faviconBlob = new Blob([faviconSvg], { type: "image/svg+xml" });
      const faviconUrl = URL.createObjectURL(faviconBlob);

      document.querySelectorAll("link[rel='icon'][type='image/svg+xml']").forEach(el => el.remove());
      const faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      faviconLink.type = "image/svg+xml";
      faviconLink.href = faviconUrl;
      document.head.appendChild(faviconLink);
      (faviconLink as any).__blobUrl = faviconUrl;

      // 2. Generate themed apple-touch-icon PNG
      const applePng = await renderIconToDataUrl(180, bgHsl, textColor, accentColor);
      document.querySelectorAll("link[rel='apple-touch-icon']").forEach(el => el.remove());
      const appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      appleLink.href = applePng;
      document.head.appendChild(appleLink);

      // 3. Generate themed manifest with dynamic icons
      const icon192 = await renderIconToDataUrl(192, bgHsl, textColor, accentColor);
      const icon512 = await renderIconToDataUrl(512, bgHsl, textColor, accentColor);

      const manifest = {
        name: "SBI Connects",
        short_name: "SBI",
        description: "Design-Build Low-Voltage Infrastructure & Technology Solutions",
        start_url: "/",
        display: "standalone",
        background_color: bgHsl,
        theme_color: accentColor,
        icons: [
          { src: icon192, sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: icon512, sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      };

      document.querySelectorAll("link[rel='manifest']").forEach(el => {
        const old = (el as any).__blobUrl;
        if (old) URL.revokeObjectURL(old);
        el.remove();
      });
      const manifestBlob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
      const manifestUrl = URL.createObjectURL(manifestBlob);
      const manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      manifestLink.href = manifestUrl;
      document.head.appendChild(manifestLink);
      (manifestLink as any).__blobUrl = manifestUrl;
    }, 2000); // Defer to well after LCP

    return () => {
      clearTimeout(timeout);
      const svgLink = document.querySelector("link[rel='icon'][type='image/svg+xml']") as any;
      if (svgLink?.__blobUrl) URL.revokeObjectURL(svgLink.__blobUrl);
      const mLink = document.querySelector("link[rel='manifest']") as any;
      if (mLink?.__blobUrl) URL.revokeObjectURL(mLink.__blobUrl);
    };
  }, [theme]);
};
