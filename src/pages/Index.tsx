import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import PillarsSection from "@/components/home/PillarsSection";
import MissionSection from "@/components/home/MissionSection";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/JsonLd";

const Index = () => (
  <Layout>
    <SeoHead
      title="SBI Connects | Design-Build Low-Voltage Infrastructure & Technology Solutions"
      description="SBI Connects is a veteran-owned (SDVOSB) design-build low-voltage contractor delivering network infrastructure, wireless systems, security, and audio-visual solutions for enterprise environments."
      canonical="/"
      keywords="low voltage contractor, structured cabling, network infrastructure, wireless systems, security systems, audio visual, RCDD, BICSI, veteran-owned, SDVOSB, design-build"
    />
    <JsonLd />
    <HeroSection />
    <StatsBar />
    <CapabilitiesSection />
    <PillarsSection />
    <MissionSection />
  </Layout>
);

export default Index;
