import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/seo/SeoHead";

/** Animated "unplugged patch cable" — the low-voltage fail whale */
const UnpluggedCable = () => (
  <div className="relative w-72 h-56 mx-auto mb-8" aria-hidden="true">
    {/* Left RJ45 connector */}
    <motion.g
      initial={{ x: 0, rotate: 0 }}
      animate={{ x: [-4, 0, -4], rotate: [-2, 0, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", left: 0, top: "50%", translateY: "-50%" }}
    >
      <svg width="90" height="60" viewBox="0 0 90 60" className="drop-shadow-lg">
        {/* Cable body */}
        <rect x="0" y="15" width="50" height="30" rx="4" className="fill-muted-foreground/20 stroke-muted-foreground/40" strokeWidth="1.5" />
        {/* Connector head */}
        <rect x="50" y="10" width="30" height="40" rx="3" className="fill-primary/20 stroke-primary/50" strokeWidth="2" />
        {/* Clip */}
        <rect x="55" y="5" width="20" height="8" rx="2" className="fill-primary/30" />
        {/* Pins */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={57 + i * 2.5} y="18" width="1.5" height="10" rx="0.5" className="fill-primary/60" />
        ))}
        {/* Cable coming from left */}
        <path d="M0 30 Q-20 30 -30 35" className="stroke-muted-foreground/30" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    </motion.g>

    {/* Right RJ45 connector (the wall jack) */}
    <motion.g
      initial={{ x: 0 }}
      animate={{ x: [3, 0, 3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      style={{ position: "absolute", right: 0, top: "50%", translateY: "-50%" }}
    >
      <svg width="90" height="70" viewBox="0 0 90 70" className="drop-shadow-lg">
        {/* Port housing */}
        <rect x="10" y="10" width="70" height="50" rx="6" className="fill-card stroke-border" strokeWidth="2" />
        {/* Port opening */}
        <rect x="25" y="20" width="35" height="25" rx="3" className="fill-background stroke-muted-foreground/30" strokeWidth="1.5" />
        {/* Label */}
        <text x="42" y="55" textAnchor="middle" className="fill-muted-foreground/40" fontSize="6" fontFamily="monospace">PORT 404</text>
        {/* LED (blinking red — link down!) */}
        <motion.circle
          cx="68" cy="18" r="3"
          className="fill-destructive"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </motion.g>

    {/* Spark / disconnect effect */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        {/* Lightning bolt */}
        <path d="M22 4 L16 18 L22 18 L18 36 L26 20 L20 20 Z" className="fill-primary/50" />
      </svg>
    </motion.div>
  </div>
);

const cableQuips = [
  "Looks like someone pulled the wrong patch cable.",
  "This link is showing no light. Check your connections.",
  "Port 404: No signal detected. OTDR trace inconclusive.",
  "The cable run to this page failed certification testing.",
  "Somebody forgot to punch down this drop.",
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Deterministic quip based on pathname so it doesn't change on re-renders
  const quipIndex = location.pathname.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % cableQuips.length;

  return (
    <Layout>
      <SeoHead
        title="Page Not Found | SBI Connects"
        description="The page you are looking for does not exist."
        robots="noindex, nofollow"
      />
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <UnpluggedCable />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold text-gradient mb-2" style={{ fontFamily: "Space Grotesk" }}>
              404
            </h1>
            <p className="text-sm font-mono text-primary/60 mb-4 tracking-wider uppercase">
              Link Down · No Carrier
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-3 leading-relaxed">
              {cableQuips[quipIndex]}
            </p>
            <p className="text-sm text-muted-foreground/60 mb-10 font-mono">
              Path: <span className="text-foreground/50">{location.pathname}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-gold"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all"
            >
              <Phone className="h-4 w-4" /> Contact Us
            </Link>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 pt-8 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-4">Maybe you were looking for</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Network Infrastructure", href: "/services/network-infrastructure" },
                { label: "Wireless & Mobility", href: "/services/wireless-mobility" },
                { label: "Security & Life-Safety", href: "/services/security-access" },
                { label: "Audio-Visual", href: "/services/audio-visual" },
                { label: "About SBI", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
