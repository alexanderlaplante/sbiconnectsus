import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onExit: () => void;
}

const LINES = [
  "DECRYPTING DOSSIER...",
  "",
  "CLASSIFICATION: TOP SECRET // SBI EYES ONLY",
  "",
  "OPERATIVE STATUS: VERIFIED",
  "CLEARANCE LEVEL: SIGNAL INTEGRITY SPECIALIST",
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  'You\'ve proven you can terminate Cat6 to spec',
  'and fuse fiber with sub-0.01dB loss.',
  "",
  "You're operating at SEAL-grade precision.",
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "📞 PRIORITY CONTACT LINE:",
  "sbiconnects.us/contact",
  "",
  "Mission complete, Operator.",
  "SBI Connects salutes you. 🎖️",
];

export default function MissionComplete({ onExit }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const delay = LINES[visibleLines] === "" ? 100 : 60;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full bg-[#0c1117] border border-green-900/40 rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm"
      >
        <div className="text-green-500/50 text-[9px] uppercase tracking-widest mb-3">
          ▸ Classified Dossier
        </div>
        <div className="space-y-1 min-h-[280px]">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`${
                line.startsWith("━") ? "text-green-700/40" :
                line.startsWith("📞") ? "text-green-300" :
                line.includes("sbiconnects") ? "text-green-400 underline" :
                line.includes("SEAL") ? "text-green-300 font-bold" :
                "text-green-400/80"
              }`}
            >
              {line || "\u00A0"}
            </motion.div>
          ))}
          {visibleLines < LINES.length && (
            <span className="inline-block w-2 h-3.5 bg-green-400/70 animate-pulse" />
          )}
        </div>
      </motion.div>

      {visibleLines >= LINES.length && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onExit}
          className="font-mono text-xs tracking-widest uppercase px-4 py-1.5 border border-green-600/40 text-green-400 rounded hover:bg-green-900/20 transition-colors animate-pulse"
        >
          [ Abort Mission — ESC ]
        </motion.button>
      )}
    </div>
  );
}
