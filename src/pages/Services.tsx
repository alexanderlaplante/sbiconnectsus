import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Network,
  Wifi,
  ShieldCheck,
  MonitorSpeaker,
  ArrowRight,
  Building2,
  Server,
  Heart,
  Factory,
  GraduationCap,
  Landmark,
  ShieldAlert,
  FileCheck,
  Eye,
  CheckCircle2,
  Award,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-home.jpg";
import usePageSEO from "@/hooks/usePageSEO";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const pillars = [
  {
    icon: Network,
    title: "Network Infrastructure",
    description:
      "Standards-based structured cabling, fiber backbone systems, MDF/IDF integration, OSP deployment, testing, and remediation. The physical foundation of reliable operations.",
    href: "/services/network-infrastructure",
    cta: "View Network Infrastructure",
  },
  {
    icon: Wifi,
    title: "Wireless & Mobility",
    description:
      "Enterprise Wi-Fi, Public Safety DAS, Private LTE, and point-to-point connectivity engineered using predictive RF modeling and field validation.",
    href: "/services/wireless-mobility",
    cta: "View Wireless & Mobility",
  },
  {
    icon: ShieldCheck,
    title: "Security & Life-Safety",
    description:
      "Integrated video surveillance, access control, intrusion systems, and unified security platforms designed for compliance and documented performance.",
    href: "/services/security-access",
    cta: "View Security & Life-Safety",
  },
  {
    icon: MonitorSpeaker,
    title: "Audio-Visual Systems",
    description:
      "Enterprise AV systems, collaboration environments, mass notification, and sound masking solutions engineered for clarity and scale.",
    href: "/services/audio-visual",
    cta: "View Audio-Visual Systems",
  },
];

const integrationBenefits = [
  "Reduced operational risk",
  "Simplified system management",
  "Compliance-ready documentation",
  "Scalable architecture",
  "Coordinated lifecycle support",
];

const deliverySteps = [
  {
    step: "01",
    title: "Assess",
    description: "Site evaluation, compliance review, infrastructure analysis.",
  },
  {
    step: "02",
    title: "Design",
    description: "Standards-based engineering across all relevant pillars.",
  },
  {
    step: "03",
    title: "Integrate",
    description: "Cross-system coordination ensuring interoperability.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Professional installation with documented validation.",
  },
  {
    step: "05",
    title: "Support",
    description: "Ongoing lifecycle services and performance monitoring.",
  },
];

const industries = [
  { icon: Building2, label: "Enterprise & Corporate Campuses" },
  { icon: Server, label: "Data Centers" },
  { icon: Heart, label: "Healthcare" },
  { icon: Factory, label: "Manufacturing & Industrial" },
  { icon: GraduationCap, label: "Education" },
  { icon: Landmark, label: "Government & Municipal" },
];

const complianceColumns = [
  {
    icon: ShieldAlert,
    title: "Standards Alignment",
    description: "BICSI, ANSI/TIA, NFPA, and AHJ coordination.",
  },
  {
    icon: FileCheck,
    title: "Validation & Testing",
    description:
      "Certified copper and fiber testing, RF validation, system commissioning.",
  },
  {
    icon: Eye,
    title: "Operational Clarity",
    description:
      "As-built documentation, audit-ready reporting, lifecycle transparency.",
  },
];

const Services = () => {
  usePageSEO({
    title: "Services | SBI Connects — Network, Wireless, Security & AV Solutions",
    description: "Explore SBI Connects' four-pillar service model: network infrastructure, wireless & mobility, security & life-safety, and audio-visual systems. RCDD-led, BICSI-aligned design-build for enterprise environments.",
    keywords: "low voltage services, network infrastructure, wireless mobility, security access control, audio visual integration, structured cabling, DAS, enterprise technology services",
  });

  return (
    <Layout>
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
              <Award className="h-3 w-3" />
              RCDD-Led · BICSI Aligned · PE Coordinated
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Integrated Infrastructure.{" "}
              <span className="text-gradient">Engineered for Performance.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              We design, deploy, and support converged infrastructure systems
              across network backbone, wireless mobility, security platforms, and
              enterprise communication environments. Our four-pillar approach
              ensures operational continuity, scalability, and documented
              performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pillars"
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
              >
                Explore Our Services
              </a>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
              >
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FOUR-PILLAR APPROACH */}
      <section id="pillars" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Four-Pillar{" "}
              <span className="text-gradient">Approach</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our services are structured around four integrated pillars
              designed to deliver resilient, scalable, and performance-driven
              environments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group"
              >
                <Link
                  to={pillar.href}
                  className="glass-card rounded-2xl p-8 h-full flex flex-col hover:border-primary/40 transition-all duration-300 block"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    {pillar.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY INTEGRATED INFRASTRUCTURE MATTERS */}
      <section className="py-20 md:py-28 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Converged Systems Deliver{" "}
                <span className="text-gradient">Operational Advantage</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                When infrastructure systems operate independently, complexity
                increases and performance suffers. Our four-pillar model ensures
                coordinated design, deployment, and lifecycle support across all
                technology layers.
              </p>
              <ul className="space-y-3">
                {integrationBenefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Integration diagram */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <div className="grid grid-cols-2 gap-4">
                  {pillars.map((pillar, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center hover:bg-primary/10 transition-colors"
                    >
                      <pillar.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <span className="text-xs font-semibold text-foreground">
                        {pillar.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                    <span className="text-xs font-semibold text-primary">
                      Unified Infrastructure Platform
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. DELIVERY MODEL */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A Structured Approach to{" "}
              <span className="text-gradient">Complex Environments</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {deliverySteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-2xl p-6 text-center relative"
              >
                <span className="text-3xl font-bold text-primary/20 mb-2 block">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < deliverySteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES WE SERVE */}
      <section className="py-20 md:py-28 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Industries We <span className="text-gradient">Serve</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Proven performance across demanding operational environments.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <industry.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-sm">{industry.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DOCUMENTATION, COMPLIANCE & ACCOUNTABILITY */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Documentation, Compliance &{" "}
              <span className="text-gradient">Accountability</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {complianceColumns.map((col, i) => (
              <motion.div
                key={col.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <col.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{col.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {col.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center text-muted-foreground italic max-w-2xl mx-auto"
          >
            Our systems are engineered not only to perform, but to withstand
            inspection, expansion, and operational scrutiny.
          </motion.p>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Build Infrastructure That Performs Today{" "}
              <span className="text-gradient">
                and Scales for Tomorrow.
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
              Let's engineer a solution built for long-term operational success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
              >
                Schedule a Strategy Session
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
              >
                Speak With an Infrastructure Specialist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
