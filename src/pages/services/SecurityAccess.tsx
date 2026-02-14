import { ShieldCheck, CheckCircle2, Network, Wifi, Headphones, Building2, Heart, GraduationCap, Factory, Landmark, Users, AlertTriangle, Shield, FileText, Award, Eye, Bell, Radio, MonitorCheck, ClipboardList, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroSecurity from "@/assets/hero-security-facial.jpg";
import securityAccessControl from "@/assets/hero-security.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import usePageSEO from "@/hooks/usePageSEO";
import AeoSection from "@/components/seo/AeoSection";
import ServiceSchemaJsonLd from "@/components/seo/ServiceSchemaJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const SecurityAccess = () => {
  usePageSEO({
    title: "Security, Access Control & Life-Safety Systems | SBI Connects",
    description: "Integrated IP video surveillance, access control, intrusion detection, and unified security platforms designed for compliance, scalability, and documented performance.",
    keywords: "IP video surveillance, access control, intrusion detection, life safety, security integration, NFPA, AHJ, biometric access, enterprise security, converged security platform",
  });

  const securityFaqs = [
    { question: "What is enterprise access control?", answer: "Enterprise access control is a security system that manages and restricts physical entry to buildings, rooms, and sensitive areas using credentials such as key cards, mobile devices, biometrics, or multi-factor authentication. It provides centralized policy management, audit logging, and real-time monitoring across facilities." },
    { question: "What is IP video surveillance?", answer: "IP video surveillance uses network-connected cameras to capture, transmit, and store video over an IP network. Unlike analog CCTV, IP systems support high-resolution imaging, remote access, video analytics, and integration with access control and alarm platforms for unified security management." },
    { question: "Do you integrate video, access control, and intrusion systems?", answer: "Yes. We design and deploy converged security platforms that unify video surveillance, access control, and intrusion detection under a single operational interface for streamlined management." },
    { question: "Are your systems compliant with life-safety standards?", answer: "All deployments are aligned with applicable NFPA codes and local AHJ requirements. We coordinate inspections and deliver complete documentation for compliance readiness." },
    { question: "Can you support audit and documentation requirements?", answer: "Absolutely. Our systems include comprehensive audit trails, access control logging, surveillance retention policies, and compliance-ready reporting for regulated environments." },
    { question: "Do you provide unified security management platforms?", answer: "Yes. We implement converged platforms that provide centralized dashboards, real-time monitoring, and actionable alerts across all security and life-safety subsystems." },
    { question: "Can systems scale across multiple facilities?", answer: "Our security architectures are designed for multi-site scalability, supporting centralized management, standardized configurations, and consistent policy enforcement across distributed locations." },
    { question: "Who installs enterprise access control systems?", answer: "Qualified low-voltage integrators with experience in security system design, network infrastructure, and compliance coordination install enterprise access control systems. SBI provides design-build access control solutions with RCDD-led engineering and documented system validation." },
  ];

  const securityEntities = [
    {
      question: "What are access control systems?",
      answer: "Access control systems are electronic security platforms that manage physical entry to facilities and restricted areas. They authenticate individuals using credentials—such as proximity cards, smart cards, mobile devices, PIN codes, or biometrics—and enforce access policies based on identity, time, and location parameters.",
      details: "SBI designs and deploys enterprise access control systems that integrate with IP video surveillance, intrusion detection, and visitor management platforms. Our systems support centralized policy management, real-time event monitoring, audit-ready logging, and multi-site scalability for corporate, healthcare, government, and education environments.",
      standards: ["UL 294", "NFPA 101", "ADA Compliance"],
      relatedLink: { label: "Enterprise Network Infrastructure", href: "/services/network-infrastructure" },
    },
    {
      question: "What is IP video surveillance?",
      answer: "IP video surveillance is a network-based camera system that captures, transmits, records, and manages video over enterprise IP infrastructure. It replaces legacy analog CCTV with high-resolution digital imaging, remote accessibility, intelligent video analytics, and integration with unified security platforms.",
      details: "SBI deploys IP video surveillance systems engineered for enterprise environments. Our designs include camera placement optimization, storage capacity planning, bandwidth analysis, retention policy configuration, and integration with access control and alarm management platforms. All systems are installed on structured cabling infrastructure designed under RCDD oversight.",
      standards: ["ONVIF", "NDAA Compliant", "BICSI"],
      relatedLink: { label: "Wireless & Mobility Solutions", href: "/services/wireless-mobility" },
    },
    {
      question: "What are unified security platforms?",
      answer: "Unified security platforms converge video surveillance, access control, intrusion detection, and alarm management into a single operational interface. They provide centralized monitoring, correlated event management, and streamlined incident response across all security subsystems within a facility or multi-site organization.",
      details: "SBI implements converged security platforms that reduce operational complexity and improve response time. By unifying disparate security technologies under a single management layer, organizations gain real-time situational awareness, simplified compliance reporting, and reduced total cost of ownership.",
      standards: ["NFPA", "UL", "ASIS International"],
    },
  ];

  return (
  <>
  <ServiceSchemaJsonLd
    serviceName="Security, Access & Life-Safety Systems"
    serviceDescription="Integrated IP video surveillance, access control, intrusion detection, and unified security platforms designed for compliance, scalability, and documented performance."
    serviceType="Security Systems Integration"
    faqs={securityFaqs}
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Security & Life-Safety", path: "/services/security-access" },
    ]}
  />
  <ServicePageTemplate
    icon={ShieldCheck}
    title="Security, Access & Life-Safety Systems"
    subtitle="Core 3 — Security"
    headline="Integrated Protection with Documented Performance"
    description="We deliver converged security platforms designed to integrate cleanly with network and facility infrastructure. Systems are designed for scalability, auditability, and operational clarity."
    tagline="Security systems engineered—not pieced together."
    heroImage={heroSecurity}
    heroAlt="Enterprise IP video surveillance and facial recognition access control system"
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Security & Life-Safety", path: "/services/security-access" },
    ]}
    items={[
      { title: "IP Video Surveillance", description: "IP cameras, analytics, perimeter detection, and industrial monitoring with enterprise-grade recording." },
      { title: "Access Control & Identity Management", description: "Card, mobile, biometric, and multi-factor systems for facility and area access management." },
      { title: "Intrusion, Duress & Monitoring", description: "Alarm systems, duress integrations, and monitoring interfaces for site-specific protection." },
      { title: "Unified Security Platforms", description: "Converged video, access, and alarm management under a single operational interface." },
    ]}
    prevService={{ title: "Wireless & Mobility", href: "/services/wireless-mobility" }}
    nextService={{ title: "Audio-Visual Systems", href: "/services/audio-visual" }}
  >
    {/* Section 1: Why Integrated Security Matters */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Integrated Security <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Modern security and life-safety systems must operate as integrated platforms, not isolated technologies. Converged systems improve visibility, reduce response time, and support audit readiness.
            </p>

            <h3 className="text-lg font-semibold mb-4">Risks of Fragmented Security Systems</h3>
            <ul className="space-y-3 mb-8">
              {["Delayed incident response", "Inconsistent access policies", "Compliance exposure", "Limited audit trails", "Operational blind spots"].map((item, i) => (
                <motion.li key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Built for Performance & Accountability</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our security platforms are engineered for scalability, system interoperability, and documented performance across enterprise and regulated environments. All security systems are deployed on <Link to="/services/network-infrastructure" className="text-primary hover:underline font-medium">enterprise structured cabling and fiber backbone infrastructure</Link> and coordinate with <Link to="/services/audio-visual" className="text-primary hover:underline font-medium">mass notification and facility communication systems</Link>.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={securityAccessControl} alt="Enterprise IP video surveillance cameras and access control card readers" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 2: Compliance & Code Alignment */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Compliance & <span className="text-gradient">Code Alignment</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All security and life-safety deployments are aligned with applicable codes, industry standards, and inspection requirements.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: "NFPA Compliance", desc: "NFPA compliance considerations for life-safety systems." },
            { icon: Landmark, title: "AHJ Coordination", desc: "Local Authority Having Jurisdiction coordination and support." },
            { icon: FileText, title: "Life-Safety Documentation", desc: "Complete life-safety system documentation for inspection readiness." },
            { icon: Lock, title: "Access Control Audit Logging", desc: "Access control audit logging standards for accountability." },
            { icon: Eye, title: "Surveillance Retention", desc: "Surveillance retention and evidentiary integrity practices." },
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

    {/* Section 3: Our Security Delivery Approach */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our Security <span className="text-gradient">Delivery Approach</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Structured Approach to Secure Infrastructure Deployment
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-5 gap-4">
              {[
                { step: 1, title: "Assess", desc: "Risk evaluation, site walkthroughs, compliance requirements review." },
                { step: 2, title: "Design", desc: "Integrated architecture combining video, access control, intrusion, and monitoring systems." },
                { step: 3, title: "Engineer", desc: "Hardware selection, system interoperability planning, and redundancy design." },
                { step: 4, title: "Deploy", desc: "Professional installation integrated with structured cabling and network infrastructure." },
                { step: 5, title: "Validate", desc: "System testing, performance verification, documentation delivery, and stakeholder training." },
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
            { step: 1, title: "Assess", desc: "Risk evaluation, site walkthroughs, compliance requirements review." },
            { step: 2, title: "Design", desc: "Integrated architecture combining video, access control, intrusion, and monitoring systems." },
            { step: 3, title: "Engineer", desc: "Hardware selection, system interoperability planning, and redundancy design." },
            { step: 4, title: "Deploy", desc: "Professional installation integrated with structured cabling and network infrastructure." },
            { step: 5, title: "Validate", desc: "System testing, performance verification, documentation delivery, and stakeholder training." },
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

    {/* Section 4: Designed for Regulated & Critical Environments */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Designed for <span className="text-gradient">Regulated & Critical Environments</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We deliver security and life-safety systems in environments where compliance, auditability, and operational clarity are non-negotiable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="p-6 rounded-2xl glass-card border-primary/20"
          >
            <h3 className="font-semibold mb-4 text-primary">Key Environments</h3>
            <ul className="space-y-3">
              {["Healthcare facilities", "Manufacturing and industrial campuses", "Enterprise headquarters", "Education institutions", "Government facilities", "Multi-site organizations"].map((item, i) => (
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

    {/* Section 5: System Integration & Visibility */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            System Integration & <span className="text-gradient">Visibility</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: MonitorCheck, title: "Converged Platforms", desc: "Unified management of video, access, and alarm systems." },
            { icon: Eye, title: "Real-Time Monitoring", desc: "Centralized dashboards and actionable alerts." },
            { icon: ClipboardList, title: "Documented Performance", desc: "Audit trails, system logs, and compliance-ready reporting." },
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
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
          Security systems should provide clarity, not complexity. Our integrations prioritize operational visibility and simplified management.
        </motion.p>
      </div>
    </section>

    {/* Section 6: Life-Safety System Coordination */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Life-Safety System <span className="text-gradient">Coordination</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Life-safety systems must function seamlessly alongside security platforms without operational conflict.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Bell, label: "Duress integrations" },
                { icon: Radio, label: "Emergency communication interfaces" },
                { icon: MonitorCheck, label: "Monitoring center coordination" },
                { icon: AlertTriangle, label: "Incident escalation workflows" },
                { icon: Shield, label: "Redundant communication pathways" },
              ].map((item, i) => (
                <motion.li key={item.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={securityAccessControl} alt="Life-safety duress alarm and emergency communication systems" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
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
            Security & Life-Safety systems operate as part of a broader infrastructure ecosystem.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Network, title: "Enterprise Structured Cabling Solutions", desc: "Structured cabling and fiber optic backbone supporting IP surveillance cameras, access control readers, and alarm panels.", href: "/services/network-infrastructure" },
            { icon: Wifi, title: "Wireless & Mobility Infrastructure", desc: "Wireless coverage enabling mobile access credentials, wireless IP cameras, and Public Safety DAS integration.", href: "/services/wireless-mobility" },
            { icon: Headphones, title: "Audio-Visual & Mass Notification Systems", desc: "Integration with enterprise paging, mass notification, and emergency communication platforms.", href: "/services/audio-visual" },
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
          <p className="text-muted-foreground">Proven protection across complex operational environments.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: Building2, title: "Enterprise & Corporate" },
            { icon: Heart, title: "Healthcare" },
            { icon: GraduationCap, title: "Education" },
            { icon: Factory, title: "Manufacturing" },
            { icon: Landmark, title: "Government" },
            { icon: Users, title: "Multi-Site Organizations" },
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
      sectionSubtitle="Authoritative definitions for the core components of enterprise security and life-safety infrastructure."
      entities={securityEntities}
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
            {securityFaqs.map((faq, i) => (
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
            Integrated Security Engineered for <span className="text-gradient">Visibility and Compliance</span>
          </h2>
          <p className="text-muted-foreground mb-8">Let's assess your environment and build a security platform that performs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              Schedule a Security Assessment
            </Link>
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Speak With a Security Specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </ServicePageTemplate>
  </>
  );
};

export default SecurityAccess;
