import { Sun, Moon, Palette } from "lucide-react";
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const themes: { id: Theme; label: string; icon: typeof Sun; accent: string }[] = [
  { id: "dark-gold", label: "Dark Gold", icon: Moon, accent: "bg-amber-400" },
  { id: "dark-blue", label: "Dark Blue", icon: Palette, accent: "bg-sky-400" },
  { id: "dusk", label: "Dusk", icon: Palette, accent: "bg-violet-400" },
  { id: "light", label: "Light Blue", icon: Sun, accent: "bg-blue-500" },
  { id: "light-warm", label: "Light Warm", icon: Sun, accent: "bg-orange-400" },
  { id: "light-forest", label: "Light Forest", icon: Sun, accent: "bg-emerald-500" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = themes.find((t) => t.id === theme)!;
  const CurrentIcon = current.icon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/50 bg-secondary/50 hover:bg-secondary transition-colors"
        aria-label="Switch theme"
      >
        <CurrentIcon className="h-4 w-4 text-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border/50 bg-popover/95 backdrop-blur-xl p-1.5 shadow-xl z-50"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  theme === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${t.accent}`} />
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
