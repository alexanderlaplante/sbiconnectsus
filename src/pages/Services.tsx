import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, Wifi, ShieldCheck, MonitorSpeaker, CheckCircle2, ArrowRight, FileCheck, Wrench, Award } from "lucide-react";
import Layout from "@/components/layout/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const pillars = [
  {
    icon: Network,
    label: "Core 1 — Network",
    title: "Network Infrastructure & Data Center Systems",
    headline: "The backbone of reliable operations",
    description: "We design, build, remediate, and support structured network infrastructure ranging from greenfield deployments to complex, live operational environments. All systems are delivered in alignment with BICSI methodologies and ANSI/TIA standards.",
    capabilities: [
      "Structured cabling design-build (CAT6, CAT6A, and fiber optic systems)",
      "MDF/IDF design, rack & stack integration, cable management, and cleanup",
      "Backbone fiber, campus connectivity, and redundant fiber ring architectures",
      "Outside Plant (OSP): underground and aerial fiber, conduit systems, duct banks, and pathway remediation",
      "Network migrations, live cutovers, and phased transitions",
      "Troubleshooting and remediation of undocumented or underperforming cabling",
      "IT field services and ticket-based support (adds, moves, changes, break/fix)",
    ],
    testing: [
      "Copper cabling fully qualified and certified",
      "Fiber systems tested to Tier 1 (OLTS) and Tier 2 (OTDR) where required",
      "Test results reviewed and validated under RCDD technical oversight",
      "Deliverables aligned with ANSI/TIA performance requirements and manufacturer specifications",
    ],
    testingNote: "Every system is delivered fully tested, labeled, and documented—no orphaned cables, no assumptions.",
    href: "/services/network-infrastructure",
  },
  {
    icon: Wifi,
    label: "Core 2 — Wireless",
    title: "Wireless, Mobility & Industrial Connectivity",
    headline: "Coverage and capacity engineered for real-world conditions",
    description: "We design and deploy wireless and RF systems that support mobility, safety, and operational continuity across demanding environments.",
    capabilities: [
      "Enterprise and industrial Wi-Fi (surveys, heat mapping, optimization)",
      "Public Safety DAS (NFPA / IFC compliant and AHJ coordinated)",
      "Cellular DAS and private LTE solutions",
      "Point-to-point wireless, backhaul, and remote connectivity, including Starlink",
    ],
    testingNote: "Wireless designs are validated through predictive modeling and field verification—not guesswork.",
    href: "/services/wireless-mobility",
  },
  {
    icon: ShieldCheck,
    label: "Core 3 — Security",
    title: "Security, Access & Life-Safety Systems",
    headline: "Integrated protection with documented performance",
    description: "We deliver converged security platforms designed to integrate cleanly with network and facility infrastructure.",
    capabilities: [
      "IP video surveillance and perimeter detection",
      "Access control and identity management (card, mobile, biometric)",
      "Intrusion, duress, and monitoring integrations",
      "Unified security platforms across video, access, and alarms",
    ],
    testingNote: "Systems are designed for scalability, auditability, and operational clarity.",
    href: "/services/security-access",
  },
  {
    icon: MonitorSpeaker,
    label: "Core 4 — Audio-Visual",
    title: "Audio-Visual, Communications & Facility Systems",
    headline: "Clear communication at scale",
    description: "We deploy professional AV and communication systems using structured cabling principles and coordinated design oversight.",
    capabilities: [
      "Conference rooms, collaboration spaces, and control environments",
      "Enterprise paging and mass notification systems",
      "Sound masking and commercial audio solutions",
    ],
    href: "/services/audio-visual",
  },
];

const closeoutItems = [
  "As-built drawings and updated floor plans",
  "Cable schedules and labeling records",
  "Copper and fiber test results (Tier 1 / Tier 2)",
  "Fiber polarity, loss budgets, and performance data",
  "Rack elevations and cabinet layouts",
  "Grounding and bonding verification",
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
              <Award className="h-3 w-3" />
              RCDD-Led · PE Coordinated · BICSI Aligned
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SBI <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              We are a design-build low-voltage contractor delivering engineered, standards-based infrastructure across commercial, industrial, and mission-critical environments. Our work is executed under RCDD-led design oversight, with Professional Engineer involvement where required, ensuring systems are built correctly, tested thoroughly, and documented for long-term operation.
            </p>
            <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Engineering oversight is provided by appropriately licensed Professional Engineers where required by jurisdiction or scope. All work is performed in compliance with applicable state licensing laws and recognized industry standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design-Build Advantage */}
      <section className="py-16 md:py-24 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Wrench className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Design-Build <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our design-build model provides a single point of accountability—from design and engineering through installation, testing, and closeout. The result is infrastructure that is compliant, supportable, and engineered to perform from day one through the life of the facility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Core Pillars */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Four <span className="text-gradient">Core</span> Pillars
            </h2>
          </motion.div>

          <div className="space-y-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className="glass-card rounded-2xl p-8 md:p-10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <pillar.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary mb-1 block">{pillar.label}</span>
                      <h3 className="text-xl md:text-2xl font-bold">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground italic mt-1">{pillar.headline}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{pillar.description}</p>

                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Capabilities include:</h4>
                  <div className="grid md:grid-cols-2 gap-2 mb-6">
                    {pillar.capabilities.map((cap, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{cap}</span>
                      </div>
                    ))}
                  </div>

                  {pillar.testing && (
                    <>
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Testing, Qualification & Certification</h4>
                      <div className="grid md:grid-cols-2 gap-2 mb-6">
                        {pillar.testing.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {pillar.testingNote && (
                    <p className="text-sm text-muted-foreground italic mb-6">{pillar.testingNote}</p>
                  )}

                  <Link
                    to={pillar.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:brightness-110 transition-all"
                  >
                    Explore {pillar.label.split(" — ")[1]} Services <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards-Based Closeout */}
      <section className="py-20 md:py-28 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileCheck className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Standards-Based Closeout & <span className="text-gradient">Documentation</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Every project is closed out using a BICSI-aligned, ANSI/TIA-compliant documentation package, developed under RCDD technical oversight and PE coordination where required.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider text-center">Closeout deliverables may include:</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {closeoutItems.map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic text-center mt-6">
              Clients receive a complete, auditable record of what was installed, how it was tested, and how it performs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build <span className="text-gradient">Infrastructure That Performs?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's assess your environment and engineer a solution built to last.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact" className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold">
                Request a Consultation
              </Link>
              <Link to="/#contact" className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all">
                Speak With a Specialist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
