import { useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import PillarsSection from "@/components/home/PillarsSection";
import MissionSection from "@/components/home/MissionSection";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/JsonLd";
import CableRunnerGame from "@/components/CableRunner/CableRunnerGame";

const Index = () => {
  const [gameOpen, setGameOpen] = useState(false);
  const openGame = useCallback(() => setGameOpen(true), []);

  return (
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
      <PillarsSection onEasterEgg={openGame} />
      <MissionSection />
      <CableRunnerGame open={gameOpen} onClose={() => setGameOpen(false)} />
    </Layout>
  );
};

export default Index;
