import { Helmet } from "react-helmet-async";

const BASE_URL = "https://sbiconnects.us";

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BASE_URL}/about#aboutpage`,
      name: "About SBI Connects",
      description:
        "Learn about SBI Connects, a certified Service-Disabled Veteran-Owned Small Business (SDVOSB) specializing in design-build low-voltage infrastructure with RCDD-led engineering.",
      url: `${BASE_URL}/about`,
      mainEntity: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/about#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${BASE_URL}/about`,
        },
      ],
    },
  ],
};

const AboutSchemaJsonLd = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
  </Helmet>
);

export default AboutSchemaJsonLd;
