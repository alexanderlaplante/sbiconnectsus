import { motion } from "framer-motion";
import { CheckCircle2, Globe, Users, Zap } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const capabilities = [
  "RCDD-led design & BICSI-aligned installation",
  "Certified testing & ANSI/TIA documentation",
  "Live cutover & migration expertise",
  "24/7 support & lifecycle management",
  "Scalable from single-site to multi-campus",
];

const badges = [
  { icon: Globe, label: "Nationwide Reach" },
  { icon: Users, label: "Veteran-Owned" },
  { icon: Zap, label: "Mission-Critical" },
];

const MissionSection = () => (
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
            We don't just install—we engineer systems for reliability, scalability, and long-term operations. Engineering oversight is provided by appropriately licensed Professional Engineers where required by jurisdiction or scope. All work is performed in compliance with applicable state licensing laws and recognized industry standards.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((item) => (
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
              {capabilities.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3">
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
);

export default MissionSection;
