import { motion } from "framer-motion";
import { Award, CheckCircle2, FileCheck, Wrench } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const closeoutItems = [
  "As-built drawings and updated floor plans",
  "Cable schedules and labeling records",
  "Copper and fiber test results (Tier 1 / Tier 2)",
  "Fiber polarity, loss budgets, and performance data",
  "Rack elevations and cabinet layouts",
  "Grounding and bonding verification",
];

const CapabilitiesSection = () => (
  <section className="py-24 md:py-32 bg-card/20 border-b border-border/50">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
          <Award className="h-3 w-3" />
          RCDD-Led · PE Coordinated · BICSI Aligned
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          SBI <span className="text-gradient">Capabilities</span>
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          We are a design-build low-voltage contractor delivering engineered, standards-based infrastructure across commercial, industrial, and mission-critical environments. Our work is executed under RCDD-led design oversight, with Professional Engineer involvement where required.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Design-Build Advantage */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
          <div className="h-full glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Design-Build Advantage</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Our design-build model provides a single point of accountability—from design and engineering through installation, testing, and closeout. The result is infrastructure that is compliant, supportable, and engineered to perform from day one through the life of the facility.
            </p>
            <div className="space-y-3">
              {["Single point of accountability", "RCDD-led design oversight", "PE involvement where required", "Compliant & supportable systems"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Standards-Based Closeout */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
          <div className="h-full glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Standards-Based Closeout & Documentation</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Every project is closed out using a BICSI-aligned, ANSI/TIA-compliant documentation package—clients receive a complete, auditable record of what was installed, how it was tested, and how it performs.
            </p>
            <div className="space-y-3">
              {closeoutItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
