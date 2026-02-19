import { Helmet } from "react-helmet-async";

const BASE_URL = "https://sbiconnects.us";

const contactSchema = {
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

const ContactSchemaJsonLd = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
  </Helmet>
);

export default ContactSchemaJsonLd;
