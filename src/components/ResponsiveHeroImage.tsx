interface ResponsiveHeroImageProps {
  srcSet: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
}

/**
 * Responsive hero image using srcset for automatic browser-level
 * resolution switching. Serves smaller files on mobile.
 */
const ResponsiveHeroImage = ({
  srcSet,
  fallbackSrc,
  alt,
  className = "w-full h-full object-cover",
  sizes = "100vw",
  fetchPriority = "high",
  loading = "eager",
}: ResponsiveHeroImageProps) => (
  <img
    srcSet={srcSet}
    src={fallbackSrc}
    sizes={sizes}
    alt={alt}
    className={className}
    fetchPriority={fetchPriority}
    loading={loading}
    decoding="async"
  />
);

export default ResponsiveHeroImage;
