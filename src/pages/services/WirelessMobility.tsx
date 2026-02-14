import { Wifi, CheckCircle2, Shield, Cpu, Headphones, Building2, Server, Heart, GraduationCap, Factory, Landmark, AlertTriangle, Wrench, Radio, Signal, RefreshCw, Network } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroWireless from "@/assets/hero-wireless.jpg";
import wirelessEngineeringImage from "@/assets/wireless-engineering.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import usePageSEO from "@/hooks/usePageSEO";
import AeoSection from "@/components/seo/AeoSection";
import ServiceSchemaJsonLd from "@/components/seo/ServiceSchemaJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const WirelessMobility = () => {
  usePageSEO({
    title: "Wireless, Mobility & Industrial Connectivity | SBI Connects",
    description: "Enterprise Wi-Fi, Public Safety DAS, Private LTE, and point-to-point wireless solutions engineered with predictive RF modeling and field validation for demanding environments.",
    keywords: "enterprise WiFi, DAS, distributed antenna system, public safety DAS, private LTE, wireless survey, RF engineering, point-to-point wireless, Starlink, NFPA, IFC",
  });

  const wirelessFaqs = [
    { question: "What is Public Safety DAS?", answer: "Public Safety DAS (Distributed Antenna System) is an in-building radio frequency system designed to provide reliable first responder communication coverage. It is required by NFPA and IFC codes in many commercial, healthcare, and government buildings to ensure fire, police, and EMS radio signals penetrate throughout the structure." },
    { question: "What is predictive RF modeling?", answer: "Predictive RF modeling uses specialized software to simulate wireless signal propagation through a building's architectural environment before installation. It accounts for wall materials, floor plans, interference sources, and device density to optimize access point placement and ensure reliable coverage." },
    { question: "What is the difference between DAS and Wi-Fi?", answer: "DAS extends cellular or public safety radio signals inside buildings using a network of distributed antennas. Wi-Fi provides local area network connectivity using unlicensed spectrum. DAS addresses cellular coverage gaps; Wi-Fi provides data connectivity for enterprise devices and applications." },
    { question: "Do you provide predictive wireless modeling?", answer: "Yes. We use predictive RF modeling and heatmap simulation based on architectural drawings and environmental variables to optimize access point placement and coverage before installation begins." },
    { question: "Can you support NFPA-compliant Public Safety DAS?", answer: "Absolutely. We design, deploy, and support Public Safety DAS systems in full compliance with NFPA and IFC requirements, including AHJ coordination and inspection support." },
    { question: "Do you design high-density Wi-Fi environments?", answer: "Yes. Our designs account for peak device counts, roaming behavior, and application performance requirements to ensure reliable connectivity in high-density environments." },
    { question: "Can you deploy private LTE networks?", answer: "Yes. We engineer and deploy private LTE solutions for environments requiring dedicated wireless capacity, enhanced security, and operational independence from public carrier networks." },
    { question: "Do you perform post-installation validation testing?", answer: "Every deployment includes post-installation surveys, signal verification, throughput testing, and optimization tuning to ensure the system performs to specification under real-world conditions." },
  ];

  const wirelessEntities = [
    {
      question: "What is enterprise Wi-Fi engineering?",
      answer: "Enterprise Wi-Fi engineering is the process of designing, deploying, and optimizing wireless local area networks for commercial and institutional environments. It involves site surveys, predictive RF modeling, access point placement, controller configuration, and post-deployment validation to ensure consistent coverage, capacity, and roaming performance.",
      details: "Unlike consumer-grade wireless, enterprise Wi-Fi must support hundreds or thousands of simultaneous devices, maintain Quality of Service for real-time applications, and integrate with network authentication systems. SBI designs enterprise wireless systems using predictive modeling validated by on-site surveys, ensuring performance under peak load conditions.",
      standards: ["IEEE 802.11ax (Wi-Fi 6/6E)", "BICSI", "ANSI/TIA-568"],
      relatedLink: { label: "Enterprise Structured Cabling Solutions", href: "/services/network-infrastructure" },
    },
    {
      question: "What is Public Safety DAS?",
      answer: "Public Safety DAS is a code-required in-building wireless system that ensures reliable radio frequency coverage for first responders including fire, police, and emergency medical services. NFPA 72, NFPA 1221, and IFC Section 510 mandate these systems in buildings where signal penetration testing reveals inadequate coverage levels.",
      details: "SBI designs and deploys Public Safety DAS systems in full compliance with NFPA and IFC requirements. Our process includes initial signal strength testing, system design coordinated with the Authority Having Jurisdiction (AHJ), professional installation, final acceptance testing, and ongoing annual compliance testing.",
      standards: ["NFPA 72", "NFPA 1221", "IFC Section 510", "FCC Part 90"],
      relatedLink: { label: "Integrated Security & Life-Safety Systems", href: "/services/security-access" },
    },
    {
      question: "What is a cellular Distributed Antenna System (DAS)?",
      answer: "A cellular DAS extends carrier macro network signals throughout buildings and campuses where architectural materials or building density attenuate outdoor cellular signals. It uses a network of antennas connected to signal source equipment to distribute cellular coverage uniformly across all areas of a facility.",
      details: "SBI deploys carrier-neutral DAS solutions that support multiple carriers on a single infrastructure. These systems improve cellular voice and data performance for building occupants and visitors, supporting enterprise mobility, IoT connectivity, and operational continuity.",
      standards: ["FCC Part 22/24/27", "3GPP", "BICSI"],
    },
  ];

  return (
  <>
  <ServiceSchemaJsonLd
    serviceName="Wireless, Mobility & Industrial Connectivity"
    serviceDescription="Enterprise Wi-Fi, Public Safety DAS, Private LTE, and point-to-point wireless solutions engineered with predictive RF modeling and field validation."
    serviceType="Wireless Infrastructure Services"
    faqs={wirelessFaqs}
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Wireless & Mobility", path: "/services/wireless-mobility" },
    ]}
  />
  <ServicePageTemplate
    icon={Wifi}
    title="Wireless, Mobility & Industrial Connectivity"
    subtitle="Core 2 — Wireless"
    headline="Coverage and Capacity Engineered for Real-World Conditions"
    description="We design and deploy wireless and RF systems that support mobility, safety, and operational continuity across demanding environments. Wireless designs are validated through predictive modeling and field verification—not guesswork."
    tagline="Designed for uptime, interference control, and real-world RF conditions."
    heroImage={heroWireless}
    items={[
      { title: "Enterprise & Industrial Wi-Fi", description: "Surveys, heat mapping, optimization, and performance remediation for enterprise wireless networks." },
      { title: "Public Safety DAS", description: "NFPA / IFC compliant and AHJ coordinated systems for first responder coverage in buildings and facilities." },
      { title: "Cellular DAS & Private LTE", description: "Carrier-neutral and private wireless solutions for enhanced cellular coverage and capacity." },
      { title: "Point-to-Point & Remote Connectivity", description: "Licensed/unlicensed wireless, backhaul, and remote connectivity solutions including Starlink." },
    ]}
    prevService={{ title: "Network Infrastructure", href: "/services/network-infrastructure" }}
    nextService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  >
    {/* Section 1: Why Wireless Engineering Matters */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Wireless Engineering <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Wireless performance is not defined by signal bars. It is defined by coverage consistency, device density capacity, interference mitigation, and real-world validation.
            </p>

            <h3 className="text-lg font-semibold mb-4">Risks of Poor Wireless Design</h3>
            <ul className="space-y-3 mb-8">
              {["Coverage gaps and dead zones", "Capacity overload in high-density areas", "Interference and co-channel congestion", "Failed compliance inspections", "Unreliable mobility for critical operations"].map((item, i) => (
                <motion.li key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Engineered for Real-World Conditions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our wireless and RF systems are designed using predictive modeling, validated through on-site surveys, and optimized for enterprise, industrial, healthcare, and campus environments.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={wirelessEngineeringImage} alt="Wireless RF heat map survey and access point" className="w-full h-full object-cover aspect-[4/3]" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 2: Standards & Code Compliance */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Standards & <span className="text-gradient">Code Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All systems are designed and deployed in alignment with applicable industry standards and Authority Having Jurisdiction requirements.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "NFPA & IFC Compliance", desc: "Public Safety DAS systems meeting fire and life-safety code requirements." },
            { icon: Radio, title: "Carrier-Neutral Standards", desc: "Carrier-neutral deployment standards for broad compatibility." },
            { icon: Signal, title: "FCC & Spectrum", desc: "FCC and spectrum considerations for licensed and unlicensed deployments." },
            { icon: Landmark, title: "AHJ Coordination", desc: "Authority Having Jurisdiction coordination and inspection support." },
            { icon: CheckCircle2, title: "Turnover Documentation", desc: "Complete documentation packages for inspection and system turnover." },
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

    {/* Section 3: Our Wireless Delivery Approach */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our Wireless <span className="text-gradient">Delivery Approach</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Validated RF Engineering Process
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-5 gap-4">
              {[
                { step: 1, title: "Assess", desc: "Spectrum analysis, site surveys, interference identification, capacity forecasting." },
                { step: 2, title: "Model", desc: "Predictive RF modeling and heatmap simulation based on architectural and environmental variables." },
                { step: 3, title: "Design", desc: "Access point placement, antenna selection, DAS layout, and capacity engineering." },
                { step: 4, title: "Deploy", desc: "Structured installation integrated with network infrastructure and backhaul systems." },
                { step: 5, title: "Validate", desc: "Post-installation surveys, signal verification, throughput testing, and optimization tuning." },
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
            { step: 1, title: "Assess", desc: "Spectrum analysis, site surveys, interference identification, capacity forecasting." },
            { step: 2, title: "Model", desc: "Predictive RF modeling and heatmap simulation based on architectural and environmental variables." },
            { step: 3, title: "Design", desc: "Access point placement, antenna selection, DAS layout, and capacity engineering." },
            { step: 4, title: "Deploy", desc: "Structured installation integrated with network infrastructure and backhaul systems." },
            { step: 5, title: "Validate", desc: "Post-installation surveys, signal verification, throughput testing, and optimization tuning." },
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
              We design wireless systems for environments where mobility, safety, and operational continuity are mission-critical.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="p-6 rounded-2xl glass-card border-primary/20"
          >
            <h3 className="font-semibold mb-4 text-primary">Key Capabilities</h3>
            <ul className="space-y-3">
              {["Hospitals and healthcare facilities", "Manufacturing and industrial campuses", "High-density office environments", "Warehouses and logistics centers", "Multi-building campuses", "Remote and rural facilities"].map((item, i) => (
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

    {/* Section 5: Capacity, Density & Performance Engineering */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Capacity, Density & <span className="text-gradient">Performance Engineering</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            { icon: Signal, title: "Coverage", desc: "Consistent signal strength across operational areas." },
            { icon: Cpu, title: "Capacity", desc: "Engineered device density support and bandwidth forecasting." },
            { icon: RefreshCw, title: "Resiliency", desc: "Redundant backhaul, failover planning, and interference mitigation." },
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
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          Wireless systems must perform under load, not just during testing. Our designs account for peak device counts, roaming behavior, and application performance.
        </motion.p>
      </div>
    </section>

    {/* Section 6: Remote & Point-to-Point Connectivity */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Remote & <span className="text-gradient">Point-to-Point Connectivity</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For locations where traditional wired infrastructure is impractical, we engineer licensed and unlicensed wireless backhaul solutions.
            </p>
            <ul className="space-y-3">
              {["Point-to-point microwave links", "Licensed spectrum solutions", "Private LTE deployments", "Temporary and rapid deployment connectivity", "Integration with satellite backhaul including Starlink"].map((item, i) => (
                <motion.li key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={heroWireless} alt="Point-to-point wireless connectivity" className="w-full h-full object-cover aspect-[4/3]" />
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
            Wireless & Mobility solutions operate in coordination with the broader infrastructure ecosystem.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Network, title: "Network Infrastructure", desc: "Structured cabling and fiber backbone supporting wireless access layers.", href: "/services/network-infrastructure" },
            { icon: Cpu, title: "Intelligent Systems", desc: "Integration with IoT, AV, security, and operational technology systems.", href: "/services/audio-visual" },
            { icon: Headphones, title: "Lifecycle Operations", desc: "Ongoing wireless monitoring, performance tuning, and expansion planning.", href: "/services/security-access" },
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
          <p className="text-muted-foreground">Proven wireless performance across demanding operational environments.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: Building2, title: "Enterprise & Corporate" },
            { icon: Heart, title: "Healthcare" },
            { icon: Factory, title: "Manufacturing" },
            { icon: GraduationCap, title: "Education" },
            { icon: Landmark, title: "Government" },
            { icon: Server, title: "Industrial & Logistics" },
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

    {/* AEO Entity Definition Sections */}
    <AeoSection
      sectionTitle="Core Entities & Definitions"
      sectionSubtitle="Authoritative definitions for the core components of enterprise wireless and RF infrastructure."
      entities={wirelessEntities}
    />

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
            {wirelessFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`q${i + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>

    {/* Section 10: Final CTA */}
    <section className="py-20 md:py-28 bg-primary/5 border-y border-primary/10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Engineered Wireless Systems Built for <span className="text-gradient">Real-World Performance</span>
          </h2>
          <p className="text-muted-foreground mb-8">Let's assess your environment and engineer a wireless solution that performs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              Schedule a Wireless Assessment
            </Link>
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Speak With an RF Specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </ServicePageTemplate>
  </>
  );
};

export default WirelessMobility;
