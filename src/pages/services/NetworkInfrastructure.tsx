import { Network, CheckCircle2, Shield, Cpu, Headphones, Building2, Server, Heart, GraduationCap, Factory, Landmark, FileText, Tags, Award, LayoutGrid, AlertTriangle, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroNetwork from "@/assets/hero-network.jpg";
import networkInfraImage from "@/assets/hero-network-infrastructure.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const NetworkInfrastructure = () => (
  <ServicePageTemplate
    icon={Network}
    title="Network Infrastructure & Data Center Systems"
    subtitle="Core 1 — Network"
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
  >
    {/* Section 1: Why Structured Infrastructure Matters */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Structured Infrastructure <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Your network infrastructure is the physical foundation of performance, uptime, and long-term scalability. Poorly designed or undocumented systems introduce operational risk, recurring outages, and costly remediation.
            </p>

            <h3 className="text-lg font-semibold mb-4">Operational Risks of Poor Infrastructure</h3>
            <ul className="space-y-3 mb-8">
              {["Recurring downtime and latency", "Bandwidth bottlenecks", "Compliance exposure", "Limited scalability", "Increased troubleshooting time"].map((item, i) => (
                <motion.li key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Engineered for Modern Enterprise Demands</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our structured cabling and fiber infrastructure solutions support high-density enterprise environments, data centers, healthcare systems, manufacturing facilities, and multi-building campuses.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={networkInfraImage} alt="Enterprise structured cabling and patch panels" className="w-full h-full object-cover aspect-[4/3]" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 2: Standards & Compliance */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Standards & <span className="text-gradient">Compliance Alignment</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All infrastructure deployments follow nationally recognized standards to ensure performance, longevity, and warranty compliance.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Award, title: "ANSI/TIA-568 Standards", desc: "ANSI/TIA-568 and related TIA standards for structured cabling." },
            { icon: CheckCircle2, title: "BICSI Best Practices", desc: "BICSI best practices and methodologies for design and installation." },
            { icon: FileText, title: "Manufacturer Specifications", desc: "Manufacturer installation specifications followed precisely." },
            { icon: Shield, title: "Fire & Building Codes", desc: "Industry fire and building codes for safety compliance." },
            { icon: Landmark, title: "RCDD Technical Review", desc: "RCDD technical review processes for quality assurance." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="p-6 rounded-2xl glass-card text-center"
            >
              <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3: Our Delivery Approach */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our <span className="text-gradient">Delivery Approach</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Disciplined Execution Model for Mission-Critical Environments
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-5 gap-4">
              {[
                { step: 1, title: "Assess", desc: "Site surveys, pathway evaluation, documentation review, risk identification." },
                { step: 2, title: "Design", desc: "Standards-compliant architecture aligned with growth and redundancy requirements." },
                { step: 3, title: "Build", desc: "Professional installation with structured labeling and quality control." },
                { step: 4, title: "Validate", desc: "Copper certification and fiber Tier 1 and Tier 2 testing with documented results." },
                { step: 5, title: "Support", desc: "Ongoing lifecycle support and infrastructure expansion planning." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4 relative z-10 backdrop-blur-sm">
                    <span className="text-lg font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stacked */}
        <div className="md:hidden space-y-6">
          {[
            { step: 1, title: "Assess", desc: "Site surveys, pathway evaluation, documentation review, risk identification." },
            { step: 2, title: "Design", desc: "Standards-compliant architecture aligned with growth and redundancy requirements." },
            { step: 3, title: "Build", desc: "Professional installation with structured labeling and quality control." },
            { step: 4, title: "Validate", desc: "Copper certification and fiber Tier 1 and Tier 2 testing with documented results." },
            { step: 5, title: "Support", desc: "Ongoing lifecycle support and infrastructure expansion planning." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                <span className="font-bold text-primary">{item.step}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4: Designed for Complex Environments */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Designed for <span className="text-gradient">Complex Environments</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We specialize in delivering infrastructure solutions within live operational environments where downtime is not acceptable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="p-6 rounded-2xl glass-card border-primary/20"
          >
            <h3 className="font-semibold mb-4 text-primary">Key Capabilities</h3>
            <ul className="space-y-3">
              {["Phased migrations", "After-hours cutovers", "Regulated environments", "Multi-site campus deployments", "Critical infrastructure facilities"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 5: Documentation & Visibility */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Documentation & <span className="text-gradient">Visibility</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear documentation protects your infrastructure investment and reduces future operational friction.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: FileText, title: "As-Built Documentation", desc: "Complete records of installed infrastructure." },
            { icon: Tags, title: "Labeling Standards", desc: "Consistent, standards-compliant labeling throughout." },
            { icon: Award, title: "Certification Reports", desc: "Full copper and fiber test documentation." },
            { icon: LayoutGrid, title: "Rack Elevations & Pathway Diagrams", desc: "Visual references for ongoing management." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="p-6 rounded-2xl glass-card text-center"
            >
              <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 6: Risk Mitigation & Remediation */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Risk Mitigation & <span className="text-gradient">Remediation</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="p-6 rounded-2xl glass-card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" /> Common Infrastructure Issues
            </h3>
            <ul className="space-y-3">
              {["Abandoned cable", "Improper bend radius", "Overloaded pathways", "Non-compliant installations", "Undocumented fiber routes"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="p-6 rounded-2xl glass-card border-primary/20">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" /> Our Remediation Approach
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We restore compliance, improve airflow and safety, re-establish documentation accuracy, and future-proof legacy environments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 7: Four Pillar Integration */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Four Core <span className="text-gradient">Integration</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Network Infrastructure serves as the physical foundation for all four operational pillars.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "Secure Infrastructure", desc: "Supports physical security, access control, and surveillance systems.", href: "/services/security-access" },
            { icon: Cpu, title: "Intelligent Systems & Low Voltage", desc: "Provides backbone support for AV, IoT, and building automation.", href: "/services/audio-visual" },
            { icon: Headphones, title: "Lifecycle Operations & Support", desc: "Enables ongoing maintenance, validation, and scalable growth.", href: "/services/wireless-mobility" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
            >
              <Link to={item.href} className="block p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 group h-full">
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 8: Industries We Serve */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-muted-foreground">Proven performance across complex, high-demand environments.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: Building2, title: "Enterprise & Corporate Campuses" },
            { icon: Server, title: "Data Centers" },
            { icon: Heart, title: "Healthcare" },
            { icon: GraduationCap, title: "Education" },
            { icon: Factory, title: "Manufacturing" },
            { icon: Landmark, title: "Government" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="p-5 rounded-2xl glass-card text-center"
            >
              <item.icon className="h-7 w-7 text-primary mx-auto mb-3" />
              <h3 className="text-sm font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 9: FAQ */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>Do you provide copper and fiber certification?</AccordionTrigger>
              <AccordionContent>
                Yes. All copper installations are fully qualified and certified. Fiber is tested to Tier 1 (OLTS) and Tier 2 (OTDR) standards, with results reviewed under RCDD technical oversight.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Can you perform live cutovers with minimal downtime?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We specialize in phased migrations and after-hours cutovers within live operational environments, ensuring minimal disruption to your operations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Are your designs standards compliant?</AccordionTrigger>
              <AccordionContent>
                All designs follow ANSI/TIA standards and BICSI best practices. Every project receives RCDD technical review to ensure full compliance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Do you support large campus fiber builds?</AccordionTrigger>
              <AccordionContent>
                Yes. We design and build redundant fiber ring architectures, campus interconnects, and outside plant (OSP) systems including underground and aerial fiber deployments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>

    {/* Section 10: Final CTA */}
    <section className="py-20 md:py-28 bg-primary/5 border-y border-primary/10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build a Reliable Foundation for Your <span className="text-gradient">Network Infrastructure</span>
          </h2>
          <p className="text-muted-foreground mb-8">Let's assess your environment and engineer a solution built to last.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              Start Your Infrastructure Assessment
            </Link>
            <Link
              to="/#contact"
              className="inline-flex px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Speak With an Infrastructure Specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </ServicePageTemplate>
);

export default NetworkInfrastructure;
