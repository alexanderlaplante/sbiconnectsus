import { Helmet } from "react-helmet-async";

const BASE_URL = "https://sbiconnects.us";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
}

const SeoHead = ({
  title,
  description,
  canonical,
  keywords,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = "website",
  robots = "index, follow",
}: SeoHeadProps) => {
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${BASE_URL}${canonical}`
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SeoHead;
