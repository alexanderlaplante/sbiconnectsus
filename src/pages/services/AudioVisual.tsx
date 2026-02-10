import { MonitorSpeaker } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";

const AudioVisual = () => (
  <ServicePageTemplate
    icon={MonitorSpeaker}
    title="Audio-Visual Systems"
    subtitle="Core Pillar 4"
    headline="Clear Communication Where It Counts"
    description="We design and deploy professional AV and communication systems that support collaboration, safety, and daily operations."
    tagline="Technology that communicates clearly, reliably, and at scale."
    items={[
      { title: "Audio-Visual & Collaboration", description: "Conference rooms, control spaces, digital displays, and video conferencing solutions." },
      { title: "Paging & Mass Notification", description: "Facility-wide voice and alerting systems for emergency and daily communication needs." },
      { title: "Sound Masking & Commercial Audio", description: "Acoustic privacy and ambient sound solutions for open offices and sensitive environments." },
    ]}
    prevService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  />
);

export default AudioVisual;
