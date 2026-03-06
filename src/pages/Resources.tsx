import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";
import { BookOpen } from "lucide-react";

const resources = [
  {
    title: "Technical Glossary",
    description:
      "A comprehensive reference of 150+ industry acronyms and terminology used across low-voltage, telecommunications, and infrastructure disciplines.",
    href: "/employees/glossary",
    icon: BookOpen,
  },
];

const Resources = () => (
  <Layout>
    <SeoHead
      title="Resources | SBI Connects"
      description="Technical resources, glossaries, and reference materials for low-voltage and telecommunications professionals."
      canonical="/resources"
    />

    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Resources</span>
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Reference materials and tools for industry professionals.
        </p>

        <div className="space-y-4">
          {resources.map((r) => (
            <Link
              key={r.href}
              to={r.href}
              className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/40 p-6 transition-all hover:border-primary/40 hover:bg-card/70"
            >
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2.5 text-primary">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {r.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {r.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Resources;
