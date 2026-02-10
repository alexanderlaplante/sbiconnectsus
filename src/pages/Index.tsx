import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, Wifi, ShieldCheck, MonitorSpeaker, ArrowRight, CheckCircle2, Zap, Globe, Users } from "lucide-react";
import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import heroHome from "@/assets/hero-home.jpg";

const pillars = [
  {
    icon: Network,
    title: "Network Infrastructure & Data Center",
    desc: "Structured cabling, fiber optics, MDF/IDF architecture, and data center services—built for reliability and scale.",
    href: "/services/network-infrastructure",
    highlights: ["Structured Cabling", "Fiber Rings", "Data Center Build-Outs"],
  },
  {
    icon: Wifi,
    title: "Wireless, Mobility & Industrial Connectivity",
    desc: "Wi-Fi, DAS, private LTE, and point-to-point solutions engineered for coverage and uptime.",
    href: "/services/wireless-mobility",
    highlights: ["Wi-Fi Optimization", "Public Safety DAS", "Private LTE"],
  },
  {
    icon: ShieldCheck,
    title: "Security, Access & Life-Safety",
    desc: "Converged IP video, access control, and intrusion systems integrated with your IT backbone.",
    href: "/services/security-access",
    highlights: ["IP Surveillance", "Access Control", "Integrated Platforms"],
  },
  {
    icon: MonitorSpeaker,
    title: "Audio-Visual & Communications",
    desc: "Professional AV, paging, mass notification, and sound masking for clear communication at scale.",
    href: "/services/audio-visual",
    highlights: ["Conference AV", "Mass Notification", "Sound Masking"],
  },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "99.9%", label: "System Uptime" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "24/7", label: "Support Coverage" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const FloatingCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ perspective: 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={heroHome} alt="Data center infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto max-w-7xl px-6 py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8 backdrop-blur-sm">
                <Zap className="h-3 w-3" />
                Veteran-Owned (DVOSB) · Low-Voltage Specialists
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Infrastructure<br />
                <span className="text-gradient">Engineered Right.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
                We design, build, and support the low-voltage systems that modern facilities depend on—network, wireless, security, and AV.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/#contact"
                  className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
                >
                  Request a Consultation
                </Link>
                <Link
                  to="/services/network-infrastructure"
                  className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            {/* 3D Floating Pillar Cards */}
            <div className="hidden md:block relative" style={{ perspective: 1200 }}>
              <FloatingCard delay={0} className="absolute top-0 right-0 w-56">
                <div className="glass-card rounded-2xl p-5 glow-gold" style={{ transform: "rotateY(-8deg) rotateX(4deg)" }}>
                  <Network className="h-8 w-8 text-primary mb-3" />
                  <div className="text-sm font-semibold mb-1">Network</div>
                  <div className="text-xs text-muted-foreground">CAT6A · Fiber · Data Centers</div>
                </div>
              </FloatingCard>
              <FloatingCard delay={1.2} className="absolute top-28 right-32 w-52">
                <div className="glass-card rounded-2xl p-5 glow-accent" style={{ transform: "rotateY(6deg) rotateX(-3deg)" }}>
                  <Wifi className="h-8 w-8 text-accent mb-3" />
                  <div className="text-sm font-semibold mb-1">Wireless</div>
                  <div className="text-xs text-muted-foreground">Wi-Fi · DAS · Private LTE</div>
                </div>
              </FloatingCard>
              <FloatingCard delay={2.4} className="absolute top-56 right-8 w-52">
                <div className="glass-card rounded-2xl p-5" style={{ transform: "rotateY(-5deg) rotateX(5deg)", boxShadow: "0 0 30px -8px hsl(0 70% 50% / 0.2)" }}>
                  <ShieldCheck className="h-8 w-8 text-red-400 mb-3" />
                  <div className="text-sm font-semibold mb-1">Security</div>
                  <div className="text-xs text-muted-foreground">IP Cameras · Access Control</div>
                </div>
              </FloatingCard>
              <FloatingCard delay={3.6} className="absolute top-80 right-36 w-52">
                <div className="glass-card rounded-2xl p-5" style={{ transform: "rotateY(4deg) rotateX(-2deg)", boxShadow: "0 0 30px -8px hsl(270 70% 50% / 0.2)" }}>
                  <MonitorSpeaker className="h-8 w-8 text-purple-400 mb-3" />
                  <div className="text-sm font-semibold mb-1">Audio-Visual</div>
                  <div className="text-xs text-muted-foreground">AV · Paging · Displays</div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1" style={{ fontFamily: 'Space Grotesk' }}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Four Core <span className="text-gradient">Pillars</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              End-to-end low-voltage solutions across the critical systems your operations rely on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              >
                <Link
                  to={pillar.href}
                  className="group block h-full p-8 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 hover:glow-gold hover:-translate-y-1"
                  style={{ perspective: 800 }}
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                      <pillar.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pillar.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pillar.highlights.map((h) => (
                          <span key={h} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-primary" /> {h}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section id="about" className="py-24 md:py-32 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Built by People Who<br />
                <span className="text-gradient">Build Systems.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SBI Connects is a service-disabled veteran-owned small business delivering low-voltage and telecommunications infrastructure solutions for enterprise, industrial, and mission-critical environments.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We don't just install—we engineer systems for reliability, scalability, and long-term operations. From greenfield builds to complex live cutovers, our team brings discipline, precision, and deep technical expertise to every project.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Globe, label: "Nationwide Reach" },
                  { icon: Users, label: "Veteran-Owned" },
                  { icon: Zap, label: "Mission-Critical" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors">
                    <item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
              <div className="relative rounded-2xl overflow-hidden glass-card p-8" style={{ perspective: 800 }}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="relative space-y-6">
                  {[
                    "Standards-based design & installation",
                    "Certified testing & documentation",
                    "Live cutover & migration expertise",
                    "24/7 support & lifecycle management",
                    "Scalable from single-site to multi-campus",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Let's <span className="text-gradient">Connect.</span>
            </h2>
            <p className="text-muted-foreground text-lg">Tell us about your project. We'll scope it, spec it, and deliver it right.</p>
          </motion.div>

          <motion.form
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="glass-card rounded-2xl p-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <input className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Company</label>
              <input className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your company" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Tell us about your project…" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold">
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
