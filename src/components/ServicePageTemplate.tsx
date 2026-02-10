import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  items: ServiceItem[];
  tagline: string;
  nextService?: { title: string; href: string };
  prevService?: { title: string; href: string };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const ServicePageTemplate = ({
  icon: Icon,
  title,
  subtitle,
  headline,
  description,
  items,
  tagline,
  nextService,
  prevService,
}: ServicePageProps) => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden noise-overlay">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-sm text-primary font-medium uppercase tracking-wider">{subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              {headline}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Service Items */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold mb-12"
          >
            What's <span className="text-gradient">Included</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-16 border-y border-border/50 bg-card/20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-xl md:text-2xl font-semibold text-gradient italic"
          >
            "{tagline}"
          </motion.p>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {prevService ? (
            <Link to={prevService.href} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm font-medium">{prevService.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextService ? (
            <Link to={nextService.href} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group text-right">
              <div>
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="text-sm font-medium">{nextService.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">Let's scope your project and build something that lasts.</p>
            <Link to="/#contact" className="inline-flex px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold">
              Request a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePageTemplate;
