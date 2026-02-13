import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
}

const usePageSEO = ({ title, description, keywords }: SEOProps) => {
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

    setMeta("description", description);
    setMeta("keywords", keywords);
    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
  }, [title, description, keywords]);
};

export default usePageSEO;
