import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "99.9%", label: "System Uptime" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "24/7", label: "Support Coverage" },
];

const StatsBar = () => (
  <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-gradient mb-1" style={{ fontFamily: "Space Grotesk" }}>{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsBar;
