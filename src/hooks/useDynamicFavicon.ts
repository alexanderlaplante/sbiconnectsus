import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const FAVICON_SVG_TEMPLATE = (bgColor: string, lineColor: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${bgColor}"/>
  <g transform="translate(56, 80) scale(0.78)">
    <path fill="${lineColor}" d="M420,20H128c-15,0-49,10-60,20C45,60,32,110,52,135c28,33,132,17,172,21,16,3,8,31-8,30H24L8,245c66-3,135,4,200,0,6,0,18-1,27-2,30-3,50-20,60-50,12-36,9-72-32-84C222,97,174,105,132,102c-12-1-26-2-21-17,3-9,12-9,19-11h181l8-54Z"/>
    <path fill="${lineColor}" opacity="0.85" d="M0,340l420,35v-30L128,300v20L44,332c-18,4-33,7-35,7s-3,1-3,2c0,0,0,0,0,0l-6-1Z"/>
    <path fill="${lineColor}" opacity="0.85" d="M128,200v20L44,232c-18,4-33,8-35,8s-3,1-3,2l35-3,87-11,124,14,168,18v-16L128,200Z"/>
    <path fill="${lineColor}" opacity="0.85" d="M128,260v20L44,292c-18,4-33,8-35,8s-3,1-3,2l35-3,87-8,124,8,168,14v-16L128,260Z"/>
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
