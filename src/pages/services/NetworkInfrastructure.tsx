import { Network } from "lucide-react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroNetwork from "@/assets/hero-network.jpg";

const NetworkInfrastructure = () => (
  <ServicePageTemplate
    icon={Network}
    title="Network Infrastructure & Data Center Systems"
    subtitle="Core Pillar 1"
    headline="The Backbone of Reliable Operations"
    description="We design, build, remediate, and support structured network infrastructure ranging from greenfield deployments to complex, live operational environments. All systems are delivered in alignment with BICSI methodologies and ANSI/TIA standards."
    tagline="Every system is delivered fully tested, labeled, and documented—no orphaned cables, no assumptions."
    heroImage={heroNetwork}
    items={[
      { title: "Structured Cabling Design-Build", description: "CAT6, CAT6A, and fiber optic systems with standards-based installation and labeling." },
      { title: "MDF/IDF Design & Integration", description: "Rack & stack integration, cable management, cleanup, and remediation." },
      { title: "Backbone Fiber & Campus Connectivity", description: "Redundant fiber ring architectures and campus interconnects." },
      { title: "Outside Plant (OSP)", description: "Underground and aerial fiber, conduit systems, duct banks, and pathway remediation." },
      { title: "Migrations & Live Cutovers", description: "Network transitions, equipment swaps, and phased cutovers with minimal downtime." },
      { title: "Troubleshooting & Remediation", description: "Fault isolation, performance issues, damaged cabling, and undocumented systems." },
      { title: "IT Field Services & Support", description: "Ticket-based support, break/fix, adds/moves/changes, and lifecycle management." },
      { title: "Testing, Qualification & Certification", description: "Copper fully qualified and certified. Fiber tested to Tier 1 (OLTS) and Tier 2 (OTDR). Results reviewed under RCDD technical oversight." },
    ]}
    nextService={{ title: "Wireless & Mobility", href: "/services/wireless-mobility" }}
  />
);

export default NetworkInfrastructure;
