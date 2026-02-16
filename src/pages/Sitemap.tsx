import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";

const sections = [
  {
    heading: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About SBI Connects", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "All Services Overview", href: "/services" },
      {
        label: "Network Infrastructure & Data Center Systems",
        href: "/services/network-infrastructure",
      },
      {
        label: "Wireless, Mobility & Industrial Connectivity",
        href: "/services/wireless-mobility",
      },
      {
        label: "Security, Access & Life-Safety Systems",
        href: "/services/security-access",
      },
      {
        label: "Audio-Visual, Communications & Facility Systems",
        href: "/services/audio-visual",
      },
    ],
  },
];

const Sitemap = () => (
  <Layout>
    <SeoHead
      title="Sitemap | SBI Connects"
      description="Complete index of all pages on SBI Connects — network infrastructure, wireless, security, audio-visual services, and more."
      canonical="/sitemap"
      robots="noindex, follow"
    />

    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          Site <span className="text-gradient">Map</span>
        </h1>

        {sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary hover:underline font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Sitemap;
