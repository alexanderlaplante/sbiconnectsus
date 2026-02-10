import { Wifi } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroWireless from "@/assets/hero-wireless.jpg";

const WirelessMobility = () => (
  <ServicePageTemplate
    icon={Wifi}
    title="Wireless & Mobility"
    subtitle="Core Pillar 2"
    headline="Coverage, Capacity, and Continuity—Everywhere"
    description="We engineer and deploy wireless and RF solutions that support mobility, safety, and operations across challenging environments."
    tagline="Designed for uptime, interference control, and real-world RF conditions."
    heroImage={heroWireless}
    items={[
      { title: "Wi-Fi Networks", description: "Surveys, heat mapping, optimization, and performance remediation for enterprise wireless." },
      { title: "Public Safety DAS", description: "Code-compliant systems (NFPA / IFC) for first responder coverage in buildings and facilities." },
      { title: "Cellular DAS & Private LTE", description: "Carrier-neutral and private wireless solutions for enhanced cellular coverage and capacity." },
      { title: "Point-to-Point & Remote Connectivity", description: "Licensed/unlicensed wireless, Starlink, and industrial backhaul for remote and distributed sites." },
    ]}
    prevService={{ title: "Network Infrastructure", href: "/services/network-infrastructure" }}
    nextService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  />
);

export default WirelessMobility;
