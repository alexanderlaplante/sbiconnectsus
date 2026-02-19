import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://sbiconnects.us";

interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  faqs: FaqItem[];
  breadcrumbs: { name: string; path: string }[];
}

const ServiceSchemaJsonLd = ({
  serviceName,
  serviceDescription,
  serviceType,
  faqs,
  breadcrumbs,
}: ServiceSchemaProps) => {
  const { pathname } = useLocation();

  const graph: Record<string, unknown>[] = [];

  graph.push({
    "@type": "Service",
    "@id": `${BASE_URL}${pathname}#service`,
    name: serviceName,
    description: serviceDescription,
    serviceType,
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SBI Connects",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: `${BASE_URL}${pathname}`,
  });

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${BASE_URL}${pathname}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}${pathname}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${BASE_URL}${crumb.path}`,
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default ServiceSchemaJsonLd;
