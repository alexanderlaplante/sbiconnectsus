import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";
import ContactSchemaJsonLd from "@/components/seo/ContactSchemaJsonLd";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "2120 N Ronald Reagan Blvd, Unit 1104",
    sub: "Longwood, FL 32750",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(407) 509-3004",
    href: "tel:+14075093004",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sbiconnects.us",
    href: "mailto:info@sbiconnects.us",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Friday",
    sub: "8:00 AM – 5:00 PM EST",
  },
];

const Contact = () => {
  return (
    <Layout>
      <SeoHead
        title="Contact SBI Connects | Schedule a Low-Voltage Infrastructure Consultation"
        description="Contact SBI Connects for a consultation on structured cabling, wireless systems, security, or audio-visual infrastructure. Veteran-owned, RCDD-led design-build services in Longwood, FL."
        canonical="/contact"
        keywords="contact SBI Connects, low voltage consultation, infrastructure quote, Longwood FL, structured cabling contractor, technology consultation"
      />
      <ContactSchemaJsonLd />
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Let's <span className="text-gradient">Connect.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tell us about your project. We'll scope it, spec it, and deliver it right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ready to start your next infrastructure project? Reach out and our team will respond within one business day.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Inner = (
                    <div className="flex items-start gap-4 p-4 rounded-xl glass-card hover:border-primary/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                        <div className="text-sm font-medium text-foreground">{item.value}</div>
                        {item.sub && <div className="text-xs text-muted-foreground">{item.sub}</div>}
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {Inner}
                    </a>
                  ) : (
                    <div key={item.label}>{Inner}</div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <form
                className="glass-card rounded-2xl p-8 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className="text-xl font-semibold mb-2">Request a Consultation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Company</label>
                    <input
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Service Interest</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="">Select a service...</option>
                    <option value="network">Network Infrastructure & Data Center</option>
                    <option value="wireless">Wireless, Mobility & Industrial Connectivity</option>
                    <option value="security">Security, Access & Life-Safety</option>
                    <option value="av">Audio-Visual & Communications</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us about your project…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
