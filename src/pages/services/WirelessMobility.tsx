import { Wifi } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroWireless from "@/assets/hero-wireless.jpg";

const WirelessMobility = () => (
  <ServicePageTemplate
    icon={Wifi}
    title="Wireless, Mobility & Industrial Connectivity"
    subtitle="Core Pillar 2"
    headline="Coverage and Capacity Engineered for Real-World Conditions"
    description="We design and deploy wireless and RF systems that support mobility, safety, and operational continuity across demanding environments. Wireless designs are validated through predictive modeling and field verification—not guesswork."
    tagline="Designed for uptime, interference control, and real-world RF conditions."
    heroImage={heroWireless}
    items={[
      { title: "Enterprise & Industrial Wi-Fi", description: "Surveys, heat mapping, optimization, and performance remediation for enterprise wireless networks." },
      { title: "Public Safety DAS", description: "NFPA / IFC compliant and AHJ coordinated systems for first responder coverage in buildings and facilities." },
      { title: "Cellular DAS & Private LTE", description: "Carrier-neutral and private wireless solutions for enhanced cellular coverage and capacity." },
      { title: "Point-to-Point & Remote Connectivity", description: "Licensed/unlicensed wireless, backhaul, and remote connectivity solutions including Starlink." },
    ]}
    prevService={{ title: "Network Infrastructure", href: "/services/network-infrastructure" }}
    nextService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  />
);

export default WirelessMobility;
