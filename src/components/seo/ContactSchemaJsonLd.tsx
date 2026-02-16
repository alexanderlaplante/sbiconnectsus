import { useEffect } from "react";

const BASE_URL = "https://sbiconnects.us";

const ContactSchemaJsonLd = () => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${BASE_URL}/contact#contactpage`,
          name: "Contact SBI Connects",
          description:
            "Contact SBI Connects for a consultation on structured cabling, wireless systems, security, or audio-visual infrastructure.",
          url: `${BASE_URL}/contact`,
          mainEntity: {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${BASE_URL}/contact#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: `${BASE_URL}/contact`,
            },
          ],
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.id = "contact-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("contact-schema");
      if (el) el.remove();
    };
  }, []);

  return null;
};

export default ContactSchemaJsonLd;
