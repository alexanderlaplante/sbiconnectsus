import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import PillarsSection from "@/components/home/PillarsSection";
import MissionSection from "@/components/home/MissionSection";

const Index = () => (
  <Layout>
    <HeroSection />
    <StatsBar />
    <CapabilitiesSection />
    <PillarsSection />
    <MissionSection />
  </Layout>
);

export default Index;
