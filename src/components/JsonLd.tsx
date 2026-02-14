import { useEffect } from "react";

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sbiconnectsus.lovable.app/#organization",
      name: "SBI Connects",
      legalName: "Smart Building Integrators, LLC",
      url: "https://sbiconnectsus.lovable.app",
      logo: "https://sbiconnectsus.lovable.app/favicon.ico",
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
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://sbiconnectsus.lovable.app/#localbusiness",
      name: "SBI Connects",
      image: "https://sbiconnectsus.lovable.app/favicon.ico",
      url: "https://sbiconnectsus.lovable.app",
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
      knowsAbout: [
        "Structured Cabling",
        "Network Infrastructure",
        "Wireless Systems",
        "Security & Access Control",
        "Audio-Visual Systems",
        "RCDD Design",
        "BICSI Standards",
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
