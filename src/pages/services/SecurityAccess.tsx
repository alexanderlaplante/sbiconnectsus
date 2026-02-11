import { ShieldCheck } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroSecurity from "@/assets/hero-security.jpg";

const SecurityAccess = () => (
  <ServicePageTemplate
    icon={ShieldCheck}
    title="Security, Access & Life-Safety Systems"
    subtitle="Core Pillar 3"
    headline="Integrated Protection with Documented Performance"
    description="We deliver converged security platforms designed to integrate cleanly with network and facility infrastructure. Systems are designed for scalability, auditability, and operational clarity."
    tagline="Security systems engineered—not pieced together."
    heroImage={heroSecurity}
    items={[
      { title: "IP Video Surveillance", description: "IP cameras, analytics, perimeter detection, and industrial monitoring with enterprise-grade recording." },
      { title: "Access Control & Identity Management", description: "Card, mobile, biometric, and multi-factor systems for facility and area access management." },
      { title: "Intrusion, Duress & Monitoring", description: "Alarm systems, duress integrations, and monitoring interfaces for site-specific protection." },
      { title: "Unified Security Platforms", description: "Converged video, access, and alarm management under a single operational interface." },
    ]}
    prevService={{ title: "Wireless & Mobility", href: "/services/wireless-mobility" }}
    nextService={{ title: "Audio-Visual Systems", href: "/services/audio-visual" }}
  />
);

export default SecurityAccess;
