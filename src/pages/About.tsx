import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import heroAbout from "@/assets/hero-about.jpg";
import aboutTeam from "@/assets/about-team.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const pillars = [
  { num: "01", title: "Tailored Solutions" },
  { num: "02", title: "Expert Team" },
  { num: "03", title: "Veteran Commitment" },
  { num: "04", title: "Customer-centric Approach" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img src={heroAbout} alt="SBI professionals collaborating" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm italic text-primary font-medium mb-1">about us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">WE ARE LEADERS IN INNOVATION</h1>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-base md:text-lg text-foreground font-medium leading-relaxed max-w-4xl">
            Our mission is to understand the business goals of our customers and deliver the highest quality of resilient, future-ready solutions that support the growth and security of the organization.
          </motion.p>
        </div>
      </section>

      {/* Why Choose SBI */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <p className="text-sm italic text-primary font-medium mb-1">why</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">CHOOSE SBI</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Smart Building Integrators, LLC (SBI), we pride ourselves on being more than just a technology integration company; we are your dedicated partner in creating innovative infrastructure solutions. As a Certified Disabled Veteran-Owned Small Business, we bring a unique perspective and commitment to excellence that sets us apart in the industry. Our team is about understanding your unique needs and delivering solutions that not only meet but exceed your expectations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You should choose us because we customize our services to align perfectly to your specific requirements, ensuring optimal performance and satisfaction. Our skilled professionals have extensive experience in technology, guaranteeing high-quality results. Our values are rooted in discipline and integrity, ensuring that we deliver on our promises. And we prioritize open communication and collaboration with our clients fostering long-lasting partnerships.
              </p>
            </motion.div>

            {/* Right - Numbered pillars */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="flex flex-col justify-center space-y-8">
              {pillars.map((item, i) => (
                <motion.div key={item.num} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <div className="flex items-center gap-6">
                    <span className="text-4xl md:text-5xl font-bold text-primary">{item.num}</span>
                    <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                  </div>
                  <div className="mt-3 ml-[calc(3rem+1.5rem)] h-0.5 bg-primary/30 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 md:py-32 bg-card/20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <p className="text-sm italic text-primary font-medium mb-1">who</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">WE ARE</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-8" />
              <p className="text-muted-foreground leading-relaxed">
                Smart Building Integrators, LLC (SBI), a Certified Disabled Veteran-Owned Small Business (DVOSB), is a dynamic and forward-thinking technology integration small business specializing in delivering end-to-end infrastructure solutions tailored to meet the evolving demands of modern environments.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="rounded-2xl overflow-hidden border border-border/50">
              <img src={aboutTeam} alt="SBI team collaboration" className="w-full h-full object-cover aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
