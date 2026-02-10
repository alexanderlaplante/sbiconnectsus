import { Network } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";

const NetworkInfrastructure = () => (
  <ServicePageTemplate
    icon={Network}
    title="Network Infrastructure"
    subtitle="Core Pillar 1"
    headline="The Backbone of Modern Facilities"
    description="We design, build, remediate, and support structured network infrastructure across enterprise, industrial, and mission-critical environments—handling everything from greenfield deployments to complex live cutovers."
    tagline="Built for reliability, scalability, and long-term operations—not just installation."
    items={[
      { title: "Structured Cabling Design-Build", description: "CAT6/CAT6A and fiber optic systems, MDF/IDF architecture, labeling, and standards-based installation." },
      { title: "Testing & Certification", description: "Tier 1 and Tier 2 testing for all copper and fiber systems, including qualification, certification, and documented results." },
      { title: "Data Center & MDF/IDF Services", description: "Rack & stack, cabinet builds, cable management, MDF/IDF cleanup and remediation." },
      { title: "Fiber Infrastructure & Rings", description: "Backbone fiber, redundant ring topologies, campus and plant interconnects." },
      { title: "Outside Plant (OSP)", description: "Underground and aerial fiber, conduit systems, duct banks, pathway remediation." },
      { title: "Migrations & Cutovers", description: "Live network transitions, equipment swaps, phased cutovers with minimal downtime." },
      { title: "Troubleshooting & Remediation", description: "Fault isolation, performance issues, damaged cabling, undocumented systems." },
      { title: "IT Service & Field Support", description: "Ticket-based support, break/fix, adds/moves/changes, and lifecycle management." },
    ]}
    nextService={{ title: "Wireless & Mobility", href: "/services/wireless-mobility" }}
  />
);

export default NetworkInfrastructure;
