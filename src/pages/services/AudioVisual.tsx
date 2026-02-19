import { MonitorSpeaker, CheckCircle2, Network, Wifi, ShieldCheck, Headphones, Building2, Heart, GraduationCap, Factory, Landmark, Users, AlertTriangle, Volume2, Monitor, Smartphone, Speaker, Bell, Radio, Shield, Mic, Eye, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import heroAV from "@/assets/hero-audiovisual.jpg";
import heroAVSrcSet from "@/assets/hero-audiovisual.jpg?w=640;1024;1920&format=webp&as=srcset";
import avEngineeringImage from "@/assets/av-why-matters.jpg";
import avMassNotificationImage from "@/assets/av-mass-notification.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SeoHead from "@/components/seo/SeoHead";
import AeoSection from "@/components/seo/AeoSection";
import ServiceSchemaJsonLd from "@/components/seo/ServiceSchemaJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const AudioVisual = () => {
  const avFaqs = [
    { question: "What is commercial AV integration?", answer: "Commercial AV integration is the design, engineering, and installation of professional audio-visual systems for enterprise environments. It encompasses conference room technology, video conferencing, digital signage, paging systems, and control interfaces—all engineered to work reliably within a facility's network and cabling infrastructure." },
    { question: "What are mass notification systems?", answer: "Mass notification systems deliver emergency and routine messages across a facility or campus using speakers, displays, strobes, and digital endpoints. They integrate with life-safety platforms and provide zoned alerting, pre-recorded messages, and live paging capabilities for building-wide communication." },
    { question: "What is sound masking?", answer: "Sound masking is an acoustic technology that introduces a uniform, low-level background sound into open office environments. It reduces speech intelligibility at a distance, improving acoustic privacy, reducing distractions, and supporting compliance with HIPAA and other privacy requirements." },
    { question: "Do you standardize AV systems across multiple rooms?", answer: "Yes. We design modular, standardized AV configurations that ensure consistent user experience and simplified management across multiple rooms, floors, and campuses." },
    { question: "Can AV integrate with existing network infrastructure?", answer: "Absolutely. Our AV systems are engineered to integrate seamlessly with structured cabling, network switches, and existing IT infrastructure using standards-based design principles." },
    { question: "Do you provide system documentation and training?", answer: "Every deployment includes complete system documentation, rack elevations, signal flow diagrams, and end-user training to ensure confident, independent operation." },
    { question: "Can paging systems integrate with life-safety platforms?", answer: "Yes. Our paging and mass notification systems are designed to coordinate with life-safety platforms, supporting emergency messaging, zoned alerts, and redundant communication pathways." },
    { question: "Do you support multi-site deployments?", answer: "We specialize in multi-site enterprise AV deployments with standardized designs, centralized management capabilities, and consistent performance across all locations." },
  ];

  const avEntities = [
    {
      question: "What is commercial AV integration?",
      answer: "Commercial AV integration is the professional design, engineering, and deployment of audio-visual technology systems for enterprise, government, healthcare, and education environments. It includes conference room solutions, video conferencing, digital signage, control systems, and rack-based infrastructure—all coordinated with structured cabling and network systems.",
      details: "SBI designs AV systems using structured cabling principles and coordinated design oversight. Every system is engineered for clarity, reliability, and long-term maintainability. Our deployments integrate with enterprise network infrastructure and are delivered with complete documentation, rack elevations, and signal flow diagrams.",
      standards: ["AVIXA", "BICSI", "ANSI/TIA-568"],
      relatedLink: { label: "Enterprise Network Infrastructure", href: "/services/network-infrastructure" },
    },
    {
      question: "What are mass notification systems?",
      answer: "Mass notification systems are facility-wide communication platforms that deliver emergency alerts, routine announcements, and safety messages through speakers, visual displays, strobes, and digital endpoints. They are designed to reach all building occupants rapidly during emergency events and daily operations.",
      details: "SBI designs and deploys mass notification systems that integrate with security and life-safety platforms. Our systems support zoned audio distribution, pre-recorded emergency messaging, live paging, and coordination with fire alarm and access control systems for unified emergency response.",
      standards: ["NFPA 72", "UL 2572", "OSHA"],
      relatedLink: { label: "Security & Life-Safety Systems", href: "/services/security-access" },
    },
    {
      question: "What is sound masking technology?",
      answer: "Sound masking introduces a controlled, uniform background sound into a workspace to reduce the intelligibility of human speech at a distance. It is deployed in open offices, healthcare facilities, legal environments, and government buildings where acoustic privacy and reduced distraction are operational requirements.",
      details: "SBI installs sound masking systems as part of integrated AV and facility communication deployments. These systems improve workplace productivity, support HIPAA compliance in healthcare settings, and protect confidential conversations in executive and legal environments.",
      standards: ["ASTM E1130", "HIPAA", "GSA PBS-P100"],
    },
  ];

  return (
  <>
  <SeoHead
    title="Audio-Visual, Communications & Facility Systems | SBI Connects"
    description="Enterprise AV systems, video conferencing, mass notification, sound masking, and collaboration environments engineered for clarity, scalability, and reliable facility communication."
    canonical="/services/audio-visual"
    keywords="audio visual integration, AV systems, video conferencing, mass notification, sound masking, enterprise AV, paging systems, collaboration rooms, digital signage"
  />
  <ServiceSchemaJsonLd
    serviceName="Audio-Visual, Communications & Facility Systems"
    serviceDescription="Enterprise AV systems, video conferencing, mass notification, sound masking, and collaboration environments engineered for clarity, scalability, and reliable facility communication."
    serviceType="Audio-Visual Integration Services"
    faqs={avFaqs}
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Audio-Visual Systems", path: "/services/audio-visual" },
    ]}
  />
  <ServicePageTemplate
    icon={MonitorSpeaker}
    title="Audio-Visual, Communications & Facility Systems"
    subtitle="Core 4 — Audio-Visual"
    headline="Clear Communication at Scale"
    description="We deploy professional AV and communication systems using structured cabling principles and coordinated design oversight to support collaboration, safety, and daily operations."
    tagline="Technology that communicates clearly, reliably, and at scale."
    heroImage={heroAV}
    heroSrcSet={heroAVSrcSet}
    heroAlt="Enterprise conference room with professional video conferencing and AV integration"
    breadcrumbs={[
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Audio-Visual Systems", path: "/services/audio-visual" },
    ]}
    items={[
      { title: "Conference & Collaboration Spaces", description: "Conference rooms, control environments, digital displays, and video conferencing solutions." },
      { title: "Enterprise Paging & Mass Notification", description: "Facility-wide voice and alerting systems for emergency and daily communication needs." },
      { title: "Sound Masking & Commercial Audio", description: "Acoustic privacy and ambient sound solutions for open offices and sensitive environments." },
    ]}
    prevService={{ title: "Security & Life-Safety", href: "/services/security-access" }}
  >
    {/* Section 1: Why Professional AV Engineering Matters */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Professional AV Engineering <span className="text-gradient">Matters</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Enterprise audio-visual systems must perform reliably under real operational conditions. Poorly designed AV environments create communication breakdowns, user frustration, and operational inefficiencies.
            </p>

            <h3 className="text-lg font-semibold mb-4">Risks of Under-Engineered AV Systems</h3>
            <ul className="space-y-3 mb-8">
              {["Inconsistent video conferencing performance", "Audio intelligibility issues", "Integration conflicts with network infrastructure", "Scalability limitations", "Complex user interfaces"].map((item, i) => (
                <motion.li key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Designed for Clarity & Scalability</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AV systems are engineered using structured cabling principles, coordinated design oversight, and integration with <Link to="/services/network-infrastructure" className="text-primary hover:underline font-medium">enterprise network infrastructure</Link>, <Link to="/services/security-access" className="text-primary hover:underline font-medium">security and life-safety platforms</Link>, and <Link to="/services/wireless-mobility" className="text-primary hover:underline font-medium">wireless mobility systems</Link>.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            <img src={avEngineeringImage} alt="Professional enterprise conference room with video conferencing and AV rack systems" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Section 2: Enterprise AV Architecture */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Enterprise AV <span className="text-gradient">Architecture</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Network, title: "Structured Infrastructure", desc: "AV systems built on standards-based cabling and coordinated rack design." },
            { icon: Monitor, title: "Integrated Platforms", desc: "Seamless integration with video conferencing, collaboration, and control systems." },
            { icon: SlidersHorizontal, title: "Scalable Deployment", desc: "Modular system designs supporting growth and multi-room standardization." },
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
          Clear communication at scale requires intentional engineering, not isolated equipment installs.
        </motion.p>
      </div>
    </section>

    {/* Section 3: Our AV Delivery Approach */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our AV <span className="text-gradient">Delivery Approach</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A Structured Method for Reliable Communication Systems
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-5 gap-4">
              {[
                { step: 1, title: "Assess", desc: "Space evaluation, acoustic considerations, lighting analysis, and operational use cases." },
                { step: 2, title: "Design", desc: "System schematics, signal flow planning, equipment specification, and integration mapping." },
                { step: 3, title: "Engineer", desc: "Infrastructure coordination, rack elevations, power planning, and cable management design." },
                { step: 4, title: "Deploy", desc: "Professional installation aligned with network and security systems." },
                { step: 5, title: "Validate", desc: "System testing, user acceptance validation, training, and documentation delivery." },
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
            { step: 1, title: "Assess", desc: "Space evaluation, acoustic considerations, lighting analysis, and operational use cases." },
            { step: 2, title: "Design", desc: "System schematics, signal flow planning, equipment specification, and integration mapping." },
            { step: 3, title: "Engineer", desc: "Infrastructure coordination, rack elevations, power planning, and cable management design." },
            { step: 4, title: "Deploy", desc: "Professional installation aligned with network and security systems." },
            { step: 5, title: "Validate", desc: "System testing, user acceptance validation, training, and documentation delivery." },
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

    {/* Section 4: Designed for Enterprise & Multi-Site Environments */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Designed for <span className="text-gradient">Enterprise & Multi-Site Environments</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We design AV systems for organizations that require consistent performance across multiple rooms, floors, or campuses.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="p-6 rounded-2xl glass-card border-primary/20"
          >
            <h3 className="font-semibold mb-4 text-primary">Key Environments</h3>
            <ul className="space-y-3">
              {["Executive boardrooms", "Conference and collaboration spaces", "Training rooms", "Control rooms", "Multi-site enterprise deployments", "Education and government facilities"].map((item, i) => (
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

    {/* Section 5: Acoustics, Intelligibility & User Experience */}
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Acoustics, Intelligibility & <span className="text-gradient">User Experience</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Mic, title: "Audio Clarity", desc: "Optimized speaker placement and acoustic balancing." },
            { icon: Eye, title: "Visual Performance", desc: "Display sizing, sightline planning, and lighting integration." },
            { icon: Smartphone, title: "User Simplicity", desc: "Intuitive control systems and streamlined interfaces." },
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
          Effective communication depends on clarity. Our systems prioritize intelligibility, visibility, and ease of use.
        </motion.p>
      </div>
    </section>

    {/* Section 6: Mass Notification & Facility Communication */}
    <section className="py-20 md:py-28 bg-card/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Mass Notification & <span className="text-gradient">Facility Communication</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Enterprise paging and mass notification systems must deliver clear messaging across facilities during both routine operations and emergency events.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Speaker, label: "Facility-wide paging systems" },
                { icon: Volume2, label: "Zoned audio distribution" },
                { icon: Bell, label: "Emergency notification integration" },
                { icon: ShieldCheck, label: "Coordination with life-safety platforms" },
                { icon: Radio, label: "Redundant communication pathways" },
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
            <img src={avMassNotificationImage} alt="Enterprise mass notification speakers and facility-wide paging system" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
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
            Audio-Visual Systems operate as part of an integrated infrastructure ecosystem.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Network, title: "Enterprise Structured Cabling Solutions", desc: "Structured cabling and fiber backbone systems supporting AV signal transport, video distribution, and control wiring.", href: "/services/network-infrastructure" },
            { icon: Wifi, title: "Wireless & Mobility Infrastructure", desc: "Wireless connectivity enabling collaboration devices, wireless presentation, and mobile device integration.", href: "/services/wireless-mobility" },
            { icon: Shield, title: "Security & Life-Safety Systems", desc: "Integration with IP video surveillance, access control, and emergency notification platforms.", href: "/services/security-access" },
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
          <p className="text-muted-foreground">Engineered communication systems for performance-driven environments.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: Building2, title: "Enterprise & Corporate" },
            { icon: Heart, title: "Healthcare" },
            { icon: GraduationCap, title: "Education" },
            { icon: Landmark, title: "Government" },
            { icon: Factory, title: "Manufacturing" },
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
      sectionSubtitle="Authoritative definitions for the core components of enterprise audio-visual and communication systems."
      entities={avEntities}
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
            {avFaqs.map((faq, i) => (
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
            Engineered AV Systems Built for <span className="text-gradient">Scalable Communication</span>
          </h2>
          <p className="text-muted-foreground mb-8">Let's design a communication platform engineered for your operational environment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              Schedule an AV Consultation
            </Link>
            <Link
              to="/contact"
              className="inline-flex px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              Speak With an AV Specialist
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </ServicePageTemplate>
  </>
  );
};

export default AudioVisual;
