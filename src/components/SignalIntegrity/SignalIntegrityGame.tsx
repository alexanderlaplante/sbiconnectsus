import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Level1Cat6 = lazy(() => import("./Level1Cat6"));
const Level2FiberSplice = lazy(() => import("./Level2FiberSplice"));
const Level3FiberColor = lazy(() => import("./Level3FiberColor"));
const MissionComplete = lazy(() => import("./MissionComplete"));

interface Props {
  open: boolean;
  onClose: () => void;
}

type Stage = "briefing" | "level1" | "level2" | "level3" | "complete";

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const BRIEFING_LINES = [
  "▸ OPERATION: SIGNAL INTEGRITY",
  "",
  "Operator, your mission:",
  "Prove you can build infrastructure",
  "that meets SBI specifications.",
  "",
  "LEVEL 1 — Cat6 Termination (T568B)",
  "LEVEL 2 — Fiber Fusion Splicing",
  "LEVEL 3 — Fiber Color Code (TIA-598)",
  "",
  "Good luck. SBI is watching.",
];

export default function SignalIntegrityGame({ open, onClose }: Props) {
  const [stage, setStage] = useState<Stage>("briefing");
  const [briefingLine, setBriefingLine] = useState(0);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStage("briefing");
      setBriefingLine(0);
    }
  }, [open]);

  // Briefing typewriter
  useEffect(() => {
    if (stage !== "briefing" || briefingLine >= BRIEFING_LINES.length) return;
    const delay = BRIEFING_LINES[briefingLine] === "" ? 80 : 50;
    const t = setTimeout(() => setBriefingLine((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [stage, briefingLine]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const startMission = useCallback(() => setStage("level1"), []);
  const goLevel2 = useCallback(() => setStage("level2"), []);
  const goLevel3 = useCallback(() => setStage("level3"), []);
  const goComplete = useCallback(() => setStage("complete"), []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.1 : 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Operation Signal Integrity"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
            aria-label="Close game"
          />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,255,102,0.02) 0px, rgba(0,255,102,0.02) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Game Window */}
          <motion.div
            className="relative z-10 w-[95vw] max-w-2xl rounded-lg border overflow-hidden my-auto"
            style={{
              backgroundColor: "rgba(8,12,18,0.96)",
              borderColor: "rgba(0,255,102,0.2)",
              boxShadow: "0 0 60px -15px rgba(0,255,102,0.15)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.3, ease: "easeOut" }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2 border-b"
              style={{ borderColor: "rgba(0,255,102,0.12)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span
                className="ml-3 font-mono text-[10px] tracking-wider uppercase"
                style={{ color: "rgba(0,255,102,0.4)" }}
              >
                sbi_signal_integrity v1.0
              </span>
              <span className="ml-auto font-mono text-[9px] text-green-700/30 uppercase">
                {stage === "briefing" ? "standby" : stage === "complete" ? "mission complete" : stage.replace("level", "lvl ")}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 min-h-[400px] flex flex-col justify-center">
              <Suspense
                fallback={
                  <div className="font-mono text-xs text-green-500/50 text-center animate-pulse">
                    Loading mission assets...
                  </div>
                }
              >
                {stage === "briefing" && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-md font-mono text-xs sm:text-sm space-y-1">
                      {BRIEFING_LINES.slice(0, briefingLine).map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={
                            line.startsWith("▸")
                              ? "text-green-300 font-bold tracking-wider text-sm"
                              : line.startsWith("LEVEL")
                              ? "text-green-400/90"
                              : "text-green-500/70"
                          }
                        >
                          {line || "\u00A0"}
                        </motion.div>
                      ))}
                      {briefingLine < BRIEFING_LINES.length && (
                        <span className="inline-block w-2 h-3 bg-green-400/70 animate-pulse" />
                      )}
                    </div>
                    {briefingLine >= BRIEFING_LINES.length && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={startMission}
                        className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/50 text-green-300 rounded hover:bg-green-900/20 transition-colors mt-2"
                      >
                        [ Begin Mission ]
                      </motion.button>
                    )}
                  </div>
                )}

                {stage === "level1" && <Level1Cat6 onComplete={goLevel2} />}
                {stage === "level2" && <Level2FiberSplice onComplete={goLevel3} />}
                {stage === "level3" && <Level3FiberColor onComplete={goComplete} />}
                {stage === "complete" && <MissionComplete onExit={onClose} />}
              </Suspense>
            </div>

            {/* Footer */}
            <div
              className="px-4 pb-3 flex items-center justify-between"
              style={{ borderColor: "rgba(0,255,102,0.1)" }}
            >
              <button
                onClick={onClose}
                className="font-mono text-[10px] tracking-widest uppercase text-green-600/50 hover:text-green-400 transition-colors focus:outline-none focus:ring-1 focus:ring-green-500/30 rounded px-2 py-1"
                aria-label="Abort mission and exit"
              >
                [ESC] Abort
              </button>
              <span
                className="font-mono text-[9px] tracking-wider uppercase select-none"
                style={{ color: "rgba(0,255,102,0.12)" }}
                aria-hidden="true"
              >
                SBI CONNECTS
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
