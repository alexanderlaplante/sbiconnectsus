import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, Wifi, ShieldCheck, MonitorSpeaker, ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useRef, useCallback } from "react";

const pillars = [
  {
    icon: Network,
    title: "Network Infrastructure & Data Center Systems",
    desc: "We design, build, remediate, and support structured network infrastructure—from greenfield deployments to complex live environments. All systems align with BICSI methodologies and ANSI/TIA standards.",
    href: "/services/network-infrastructure",
    highlights: ["Structured Cabling", "Fiber Rings", "OSP & Duct Banks", "Live Cutovers"],
  },
  {
    icon: Wifi,
    title: "Wireless, Mobility & Industrial Connectivity",
    desc: "We design and deploy wireless and RF systems that support mobility, safety, and operational continuity across demanding environments—validated through predictive modeling and field verification.",
    href: "/services/wireless-mobility",
    highlights: ["Enterprise Wi-Fi", "Public Safety DAS", "Private LTE", "Starlink"],
  },
  {
    icon: ShieldCheck,
    title: "Security, Access & Life-Safety Systems",
    desc: "We deliver converged security platforms designed to integrate cleanly with network and facility infrastructure—built for scalability, auditability, and operational clarity.",
    href: "/services/security-access",
    highlights: ["IP Surveillance", "Access Control", "Intrusion & Duress", "Unified Platforms"],
  },
  {
    icon: MonitorSpeaker,
    title: "Audio-Visual, Communications & Facility Systems",
    desc: "We deploy professional AV and communication systems using structured cabling principles and coordinated design oversight for clear communication at scale.",
    href: "/services/audio-visual",
    highlights: ["Conference AV", "Mass Notification", "Sound Masking"],
  },
];

const PillarsSection = ({ onEasterEgg }: { onEasterEgg?: () => void }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePressStart = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onEasterEgg?.();
    }, 1500);
  }, [onEasterEgg]);

  const handlePressEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return (
  <section className="py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <h2
          className="text-3xl md:text-5xl font-bold mb-4 select-none cursor-default"
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
        >
          Four <span className="text-gradient">Core</span> Pillars
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          End-to-end low-voltage solutions across the critical systems your operations rely on.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {pillars.map((pillar, i) => (
          <motion.div key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}>
            <Link to={pillar.href} className="group block h-full p-8 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 hover:glow-gold hover:-translate-y-1" style={{ perspective: 800 }}>
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
  );
};

export default PillarsSection;
