import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, CheckCircle2, ArrowRight, Target, Users, ShieldCheck, Handshake } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroAbout from "@/assets/hero-about.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import SeoHead from "@/components/seo/SeoHead";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const whyChoose = [
  { num: "01", title: "Engineered Design Authority", icon: Target, description: "RCDD-led design with in-house Professional Engineer oversight. Every system is standards-based, code-aligned, and built for long-term performance." },
  { num: "02", title: "Single-Source Accountability", icon: Users, description: "One partner from concept through closeout. Design, installation, testing, documentation, and lifecycle support—all under one roof." },
  { num: "03", title: "Standards-Driven Execution", icon: ShieldCheck, description: "BICSI-aligned installation, certified testing, ANSI/TIA documentation, and complete as-built deliverables. No guesswork. No loose ends." },
  { num: "04", title: "Veteran-Led Discipline", icon: Handshake, description: "Service-Disabled Veteran-Owned. We operate with structure, integrity, and accountability—execution is our differentiator." },
];

const About = () => {
  return (
    <Layout>
      <SeoHead
        title="About SBI Connects | Veteran-Owned SDVOSB Low-Voltage Contractor"
        description="Learn about SBI Connects, a certified disabled veteran-owned small business (SDVOSB) specializing in design-build low-voltage infrastructure with RCDD-led engineering and BICSI-aligned standards."
        canonical="/about"
        keywords="about SBI Connects, veteran-owned contractor, SDVOSB, DVOSB, RCDD, BICSI, low voltage integrator, technology integration company"
      />
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroAbout})` }}
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
              SDVOSB Certified · Veteran-Owned · Mission-Driven
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              We Are Leaders in{" "}
              <span className="text-gradient">Innovation.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Our mission is to understand the business goals of our customers and deliver the highest quality of resilient, future-ready solutions that support the growth and security of the organization.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#why-choose"
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
              >
                Why Choose SBI
              </a>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY CHOOSE SBI */}
      <section id="why-choose" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-gradient">SBI</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                At Smart Building Integrators, LLC (SBI), we are more than a technology integrator—we are a Service-Disabled Veteran-Owned design-build partner committed to disciplined execution and long-term performance. Our projects are led by in-house RCDD and Professional Engineer oversight, ensuring every system is designed to industry standards, code-compliant, and engineered for reliability. From structured cabling and fiber to wireless, access control, and video surveillance, we deliver coordinated infrastructure solutions built for operational continuity and future scalability.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We don't offer one-size-fits-all systems. We assess your environment, understand your operational demands, and design solutions that align precisely with your objectives—then execute with accountability, documentation, and measurable results.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whyChoose.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="text-3xl font-bold text-primary/20 mb-2 block">{item.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
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
                Who <span className="text-gradient">We Are</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Smart Building Integrators, LLC (SBI) is a Service-Disabled Veteran-Owned Small Business delivering engineered, standards-driven low-voltage infrastructure solutions for modern facilities. With in-house RCDD leadership and Professional Engineer oversight, we design and build systems that meet BICSI, ANSI/TIA, and industry compliance standards—without compromise.
              </p>
              <p className="text-sm font-semibold text-foreground mb-3">Our capabilities include:</p>
              <ul className="space-y-3">
                {[
                  "RCDD-led design and BICSI-aligned installation",
                  "Certified testing and ANSI/TIA-compliant documentation",
                  "Live cutovers and complex system migrations",
                  "24/7 support and lifecycle management",
                  "Scalable delivery from single-site deployments to multi-campus rollouts",
                ].map((item, i) => (
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
                    <span className="text-foreground font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                We don't just install infrastructure. We engineer environments for reliability, performance, and long-term serviceability.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden border border-border/50"
            >
              <img src={aboutTeam} alt="SBI team collaboration" className="w-full h-full object-cover aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
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
              Ready to Build Something{" "}
              <span className="text-gradient">That Lasts?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
              Partner with a veteran-owned team that delivers engineered infrastructure with discipline and integrity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
              >
                Start a Conversation
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
              >
                Explore Our Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
