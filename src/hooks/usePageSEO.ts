import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://sbiconnects.us";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
}

const usePageSEO = ({ title, description, keywords }: SEOProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Canonical tag
    const canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:url", canonicalUrl);
  }, [title, description, keywords, pathname]);
};

export default usePageSEO;
