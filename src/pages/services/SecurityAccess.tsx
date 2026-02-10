import { ShieldCheck } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";

const SecurityAccess = () => (
  <ServicePageTemplate
    icon={ShieldCheck}
    title="Security & Life-Safety"
    subtitle="Core Pillar 3"
    headline="Integrated Physical Security with Operational Intelligence"
    description="We deliver converged security systems that protect people, assets, and operations—designed to integrate cleanly with IT infrastructure."
    tagline="Security systems engineered—not pieced together."
    items={[
      { title: "Video Surveillance", description: "IP cameras, analytics, perimeter and industrial monitoring with enterprise-grade recording." },
      { title: "Access Control & Identity", description: "Card, mobile, biometric, and multi-factor systems for facility and area access management." },
      { title: "Intrusion & Duress", description: "Alarm systems, monitoring interfaces, and site-specific protection strategies." },
      { title: "Integrated Security Platforms", description: "Unified video, access, and intrusion management under a single operational interface." },
    ]}
    prevService={{ title: "Wireless & Mobility", href: "/services/wireless-mobility" }}
    nextService={{ title: "Audio-Visual Systems", href: "/services/audio-visual" }}
  />
);

export default SecurityAccess;
