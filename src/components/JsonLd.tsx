import { useEffect } from "react";

const BASE_URL = "https://sbiconnects.us";

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SBI Connects",
      legalName: "Smart Building Integrators, LLC",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.ico`,
      description:
        "Service-Disabled Veteran-Owned design-build low-voltage contractor delivering network infrastructure, wireless, security, and audio-visual solutions.",
      foundingDate: "2020",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-407-509-3004",
        email: "info@sbiconnects.us",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
      knowsAbout: [
        "Structured Cabling",
        "Fiber Optic Backbone",
        "Network Infrastructure",
        "Enterprise Wi-Fi",
        "Public Safety DAS",
        "Access Control Systems",
        "IP Video Surveillance",
        "Commercial AV Systems",
        "Mass Notification Systems",
        "RCDD Design",
        "BICSI Standards",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Low-Voltage Infrastructure Services",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Network Infrastructure & Data Center Systems",
            url: `${BASE_URL}/services/network-infrastructure`,
          },
          {
            "@type": "OfferCatalog",
            name: "Wireless, Mobility & Industrial Connectivity",
            url: `${BASE_URL}/services/wireless-mobility`,
          },
          {
            "@type": "OfferCatalog",
            name: "Security, Access & Life-Safety Systems",
            url: `${BASE_URL}/services/security-access`,
          },
          {
            "@type": "OfferCatalog",
            name: "Audio-Visual, Communications & Facility Systems",
            url: `${BASE_URL}/services/audio-visual`,
          },
        ],
      },
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "SBI Connects",
      image: `${BASE_URL}/favicon.ico`,
      url: BASE_URL,
      telephone: "+1-407-509-3004",
      email: "info@sbiconnects.us",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2120 N Ronald Reagan Blvd, Unit 1104",
        addressLocality: "Longwood",
        addressRegion: "FL",
        postalCode: "32750",
        addressCountry: "US",
      },
      description:
        "SDVOSB-certified design-build low-voltage integrator specializing in RCDD-led network infrastructure, wireless, security & life-safety, and audio-visual systems for enterprise and government facilities.",
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "SBI Connects",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
    },
  ],
};

const JsonLd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLdData);
    script.id = "json-ld-structured-data";
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("json-ld-structured-data");
      if (el) el.remove();
    };
  }, []);

  return null;
};

export default JsonLd;
