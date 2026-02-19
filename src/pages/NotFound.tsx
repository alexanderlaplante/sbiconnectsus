import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SeoHead
        title="Page Not Found | SBI Connects"
        description="The page you are looking for does not exist."
        robots="noindex, nofollow"
      />
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
