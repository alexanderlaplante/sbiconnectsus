import { useEffect } from "react";

const BASE_URL = "https://sbiconnects.us";

const ServicesSchemaJsonLd = () => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${BASE_URL}/services#itemlist`,
          name: "SBI Connects Service Pillars",
          description:
            "Four-pillar integrated low-voltage infrastructure services.",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Network Infrastructure & Data Center Systems",
              url: `${BASE_URL}/services/network-infrastructure`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Wireless, Mobility & Industrial Connectivity",
              url: `${BASE_URL}/services/wireless-mobility`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Security, Access & Life-Safety Systems",
              url: `${BASE_URL}/services/security-access`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Audio-Visual, Communications & Facility Systems",
              url: `${BASE_URL}/services/audio-visual`,
            },
          ],
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${BASE_URL}/services#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: `${BASE_URL}/services`,
            },
          ],
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.id = "services-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("services-schema");
      if (el) el.remove();
    };
  }, []);

  return null;
};

export default ServicesSchemaJsonLd;
