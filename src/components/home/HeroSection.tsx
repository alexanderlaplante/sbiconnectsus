import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, Wifi, ShieldCheck, MonitorSpeaker, Zap } from "lucide-react";
import { useRef } from "react";
import heroHome from "@/assets/hero-home.jpg";
import heroHomeSrcSet from "@/assets/hero-home.jpg?w=640;1024;1920&format=webp&as=srcset";

/** Floating 3D card with gentle idle animation */
const FloatingCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ perspective: 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[95vh] flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
        <img srcSet={heroHomeSrcSet} src={heroHome} sizes="100vw" alt="Data center infrastructure" className="w-full h-full object-cover" fetchPriority="high" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent dark:via-background/85 dark:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 dark:to-background/60" />
      </motion.div>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 1, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/60 bg-background/80 dark:bg-background/90 text-primary text-xs sm:text-sm font-semibold mb-8 backdrop-blur-xl shadow-lg shadow-primary/10 animate-badge-glow">
              <Zap className="h-4 w-4 shrink-0" />
              <span>Veteran-Owned (SDVOSB) · Low-Voltage Specialists</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium mb-4 tracking-wide">Design Build Low Voltage Integrator</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Infrastructure<br />
              <span className="text-gradient">Engineered Right.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              We are a design-build low-voltage contractor delivering engineered, standards-based infrastructure across commercial, industrial, and mission-critical environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold">
                Request a Consultation
              </Link>
              <Link to="/services" className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all backdrop-blur-sm">
                Explore Services
              </Link>
            </div>
          </motion.div>

          <div className="hidden md:block relative" style={{ perspective: 1200 }}>
            <FloatingCard delay={0} className="absolute -top-[132px] right-0 w-56">
              <div className="glass-card rounded-2xl p-5 glow-gold" style={{ transform: "rotateY(-8deg) rotateX(4deg)" }}>
                <Network className="h-8 w-8 text-primary mb-3" />
                <div className="text-sm font-semibold mb-1">Network</div>
                <div className="text-xs text-muted-foreground">CAT6A · Fiber · Data Centers</div>
              </div>
            </FloatingCard>
            <FloatingCard delay={1.2} className="absolute -top-[4px] right-32 w-52">
              <div className="glass-card rounded-2xl p-5 glow-accent" style={{ transform: "rotateY(6deg) rotateX(-3deg)" }}>
                <Wifi className="h-8 w-8 text-accent mb-3" />
                <div className="text-sm font-semibold mb-1">Wireless</div>
                <div className="text-xs text-muted-foreground">Wi-Fi · DAS · Private LTE</div>
              </div>
            </FloatingCard>
            <FloatingCard delay={2.4} className="absolute top-[124px] right-8 w-52">
              <div className="glass-card rounded-2xl p-5" style={{ transform: "rotateY(-5deg) rotateX(5deg)", boxShadow: "0 0 30px -8px hsl(0 70% 50% / 0.2)" }}>
                <ShieldCheck className="h-8 w-8 text-red-400 mb-3" />
                <div className="text-sm font-semibold mb-1">Security</div>
                <div className="text-xs text-muted-foreground">IP Cameras · Access Control</div>
              </div>
            </FloatingCard>
            <FloatingCard delay={3.6} className="absolute top-[252px] right-36 w-52">
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
  );
};

export default HeroSection;
