import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const FAVICON_SVG_TEMPLATE = (bgColor: string, lineColor: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575">
  <path fill="${bgColor}" d="M10,0h560c2.76,0,5,2.24,5,5v565c0,2.76-2.24,5-5,5H5c-2.76,0-5-2.24-5-5V10C0,4.48,4.48,0,10,0Z"/>
  <g fill="${lineColor}">
    <path d="M487.69,497.42l-16.27-.14-274.58-24.88-.26,23.65-109.91,19.72c0,.28,1.29.5,3.83.73h397.19"/>
    <path d="M487.7,142.46l-143.53-38.82c-79.91-21.6-146.41-45.15-146.97-45.14l-.34,30.01-48.32,24.28c-32.37,16.26-48.32,24.96-48.32,26.35,0,1.19.77,1.78,1.78,1.4.99-.38,23.04-8.02,49.02-16.99l47.24-16.29,142.59,25.64c78.43,14.1,144.57,31.17,146.23,31.57.49.12.89.2,1.23.23l-.62-22.23Z"/>
    <path d="M487.7,203.15l-2.32-.62c-6.36-1.7-286.17-72.83-286.91-72.83l-.18,29.4-48.59,21.13c-26.08,11.34-47.73,20.94-48.13,21.33-3.57,3.57,6.87,1.43,47.52-9.72l47.29-12.97,142.65,21.08c78.45,11.6,144.61,21.39,147.01,21.76l1.66.26v-18.82h.01Z"/>
    <path d="M487.7,262.57l-136.24-29.2c-78.81-16.89-153.18-33.76-153.18-33.76v29.72l-44.49,16.02c-32.25,11.61-48.31,18.03-48.31,19.29,0,1.13.95,1.64,2.35,1.29,1.29-.33,23.27-4.75,48.82-9.83l46.48-9.24,146.5,16.96,138.06,19.17v-20.43h.01Z"/>
    <path d="M487.7,320.65l-288.87-55.62v29.47c-28.37,7.89-93.83,28.28-94.76,29.16-.69.65-.87,1.56-.41,2.03.47.47,21.87-1.89,47.56-5.22l46.71-6.07,147.32,12.34,142.43,11.94v-18.01h.02Z"/>
    <path d="M198.28,335.16l.04,25.79-44.5,11.46c-24.18,5.28-45.92,9.98-48.32,10.44-2.41.46-4.37,1.67-4.37,2.68s.46,1.84,1.02,1.84,20.83-1.2,45.02-2.66l43.99-2.66,142.56,7.36c78.41,4.05,145.74,7.36,149.62,7.37h4.34v-20.63l-289.41-40.98h.01"/>
    <path d="M196.11,431.14c-.93,0-22.14,3.03-47.15,6.71-25,3.69-45.99,6.7-46.64,6.7s-1.19.87-1.19,1.94c0,1.64,6.37,2.02,41.28,2.41l345.28,6.95v-18.9l-139.58-15.47c-77.89-8.64-143.57-15.73-145.97-15.78l-6.76-.11.73,25.54h0Z"/>
  </g>
</svg>`;

export const useDynamicFavicon = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Delay to ensure theme CSS variables are applied before reading them
    const timeout = setTimeout(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const bgColor = styles.getPropertyValue("--logo-text").trim() || "#121417";
      const lineColor = styles.getPropertyValue("--logo-accent").trim() || "#f37216";

      const svg = FAVICON_SVG_TEMPLATE(bgColor, lineColor);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      // Remove all existing favicon links to force browser refresh
      document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach(el => el.remove());

      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = url;
      document.head.appendChild(link);

      // Store url for cleanup
      (link as any).__blobUrl = url;
    }, 50);

    return () => {
      clearTimeout(timeout);
      const link = document.querySelector("link[rel='icon']") as any;
      if (link?.__blobUrl) URL.revokeObjectURL(link.__blobUrl);
    };
  }, [theme]);
};
