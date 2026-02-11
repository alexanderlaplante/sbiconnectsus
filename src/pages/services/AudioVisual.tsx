import { MonitorSpeaker } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroAV from "@/assets/hero-audiovisual.jpg";

const AudioVisual = () => (
  <ServicePageTemplate
    icon={MonitorSpeaker}
    title="Audio-Visual, Communications & Facility Systems"
    subtitle="Core Pillar 4"
    headline="Clear Communication at Scale"
    description="We deploy professional AV and communication systems using structured cabling principles and coordinated design oversight to support collaboration, safety, and daily operations."
    tagline="Technology that communicates clearly, reliably, and at scale."
    heroImage={heroAV}
    items={[
      { title: "Conference & Collaboration Spaces", description: "Conference rooms, control environments, digital displays, and video conferencing solutions." },
      { title: "Enterprise Paging & Mass Notification", description: "Facility-wide voice and alerting systems for emergency and daily communication needs." },
      { title: "Sound Masking & Commercial Audio", description: "Acoustic privacy and ambient sound solutions for open offices and sensitive environments." },
    ]}
    prevService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  />
);

export default AudioVisual;
