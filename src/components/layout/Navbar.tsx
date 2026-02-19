import { useState } from "react";
import SbiLogo from "@/components/SbiLogo";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import RackAndStackOverlay, { useTripleClick } from "@/components/RackAndStackEgg";

const services = [
  { title: "Network Infrastructure", href: "/services/network-infrastructure" },
  { title: "Wireless & Mobility", href: "/services/wireless-mobility" },
  { title: "Security & Life-Safety", href: "/services/security-access" },
  { title: "Audio-Visual Systems", href: "/services/audio-visual" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { triggered, handleClick, dismiss } = useTripleClick();

  return (
    <>
    <RackAndStackOverlay open={triggered} onClose={dismiss} />
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center" onClick={handleClick}>
          <SbiLogo className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            Home
          </Link>

          <Link to="/about" className={`text-sm transition-colors hover:text-primary ${location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>About</Link>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={`text-sm flex items-center gap-1 transition-colors hover:text-primary ${location.pathname.startsWith('/services') ? 'text-primary' : 'text-muted-foreground'}`}>
              Services <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl glass-card p-2 shadow-xl"
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className={`block px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/10 hover:text-primary ${location.pathname === s.href ? 'text-primary bg-primary/5' : 'text-muted-foreground'}`}
                    >
                      {s.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact" className={`text-sm transition-colors hover:text-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>Contact</Link>

          <ThemeSwitcher />

          <Link
            to="/contact"
            className="ml-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeSwitcher />
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-2">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-foreground">Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-foreground">About</Link>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2 pb-1">Services</div>
              {services.map((s) => (
                <Link key={s.href} to={s.href} onClick={() => setMobileOpen(false)} className="block py-2 pl-3 text-sm text-muted-foreground hover:text-primary">
                  {s.title}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-foreground">Contact</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 block text-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;
