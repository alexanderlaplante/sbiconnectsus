import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

interface AeoEntity {
  question: string;
  answer: string;
  details: string;
  standards?: string[];
  relatedLink?: { label: string; href: string };
}

interface AeoSectionProps {
  entities: AeoEntity[];
  sectionTitle: string;
  sectionSubtitle?: string;
}

const AeoSection = ({ entities, sectionTitle, sectionSubtitle }: AeoSectionProps) => (
  <section className="py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">{sectionSubtitle}</p>
        )}
      </motion.div>

      <div className="space-y-12 max-w-4xl mx-auto">
        {entities.map((entity, i) => (
          <motion.article
            key={entity.question}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            variants={fadeUp}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">{entity.question}</h3>
            <p className="text-foreground leading-relaxed mb-4 font-medium">
              {entity.answer}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {entity.details}
            </p>
            {entity.standards && entity.standards.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {entity.standards.map((std) => (
                  <span
                    key={std}
                    className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {std}
                  </span>
                ))}
              </div>
            )}
            {entity.relatedLink && (
              <Link
                to={entity.relatedLink.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {entity.relatedLink.label} →
              </Link>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default AeoSection;
