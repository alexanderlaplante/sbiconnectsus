import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Level1Cat6 = lazy(() => import("./Level1Cat6"));
const Level2FiberSplice = lazy(() => import("./Level2FiberSplice"));
const Level3FiberColor = lazy(() => import("./Level3FiberColor"));
const Level4ConduitFill = lazy(() => import("./Level4ConduitFill"));
const Level5PatchPanel = lazy(() => import("./Level5PatchPanel"));
const Level6CableLabel = lazy(() => import("./Level6CableLabel"));
const Level7PoeBudget = lazy(() => import("./Level7PoeBudget"));
const Level8RackElevation = lazy(() => import("./Level8RackElevation"));
const Level9FireAlarm = lazy(() => import("./Level9FireAlarm"));
const Level10CableCert = lazy(() => import("./Level10CableCert"));
const MissionComplete = lazy(() => import("./MissionComplete"));

interface Props {
  open: boolean;
  onClose: () => void;
}

type Stage =
  | "briefing"
  | "level1" | "level2" | "level3" | "level4" | "level5"
  | "level6" | "level7" | "level8" | "level9" | "level10"
  | "complete";

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const BRIEFING_LINES = [
  "▸ OPERATION: SIGNAL INTEGRITY",
  "",
  "Operator, your mission:",
  "Complete 10 low-voltage tasks",
  "that meet SBI specifications.",
  "",
  "LEVEL 1  — Cat6 Termination (T568B)",
  "LEVEL 2  — Fiber Fusion Splicing",
  "LEVEL 3  — Fiber Color Code (TIA-598)",
  "LEVEL 4  — Conduit Fill (NEC 40%)",
  "LEVEL 5  — Patch Panel Port Mapping",
  "LEVEL 6  — Cable Labeling (TIA-606-C)",
  "LEVEL 7  — PoE Power Budget",
  "LEVEL 8  — Rack Elevation Planning",
  "LEVEL 9  — Fire Alarm Loop (NFPA 72)",
  "LEVEL 10 — Cable Certification",
  "",
  "Good luck. SBI is watching.",
];

export default function SignalIntegrityGame({ open, onClose }: Props) {
  const [stage, setStage] = useState<Stage>("briefing");
  const [briefingLine, setBriefingLine] = useState(0);

  useEffect(() => {
    if (open) {
      setStage("briefing");
      setBriefingLine(0);
    }
  }, [open]);

  useEffect(() => {
    if (stage !== "briefing" || briefingLine >= BRIEFING_LINES.length) return;
    const delay = BRIEFING_LINES[briefingLine] === "" ? 80 : 50;
    const t = setTimeout(() => setBriefingLine((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [stage, briefingLine]);

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
  const goLevel4 = useCallback(() => setStage("level4"), []);
  const goLevel5 = useCallback(() => setStage("level5"), []);
  const goLevel6 = useCallback(() => setStage("level6"), []);
  const goLevel7 = useCallback(() => setStage("level7"), []);
  const goLevel8 = useCallback(() => setStage("level8"), []);
  const goLevel9 = useCallback(() => setStage("level9"), []);
  const goLevel10 = useCallback(() => setStage("level10"), []);
  const goComplete = useCallback(() => setStage("complete"), []);

  const stageLabel = stage === "briefing"
    ? "standby"
    : stage === "complete"
    ? "mission complete"
    : stage.replace("level", "lvl ");

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
          <div
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
            aria-label="Close game"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,255,102,0.02) 0px, rgba(0,255,102,0.02) 1px, transparent 1px, transparent 3px)",
            }}
          />

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
                sbi_signal_integrity v2.0
              </span>
              <span className="ml-auto font-mono text-[9px] text-green-700/30 uppercase">
                {stageLabel}
              </span>
            </div>

            <div className="p-4 sm:p-6 min-h-[400px] max-h-[80vh] overflow-y-auto flex flex-col justify-center">
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
                {stage === "level3" && <Level3FiberColor onComplete={goLevel4} />}
                {stage === "level4" && <Level4ConduitFill onComplete={goLevel5} />}
                {stage === "level5" && <Level5PatchPanel onComplete={goLevel6} />}
                {stage === "level6" && <Level6CableLabel onComplete={goLevel7} />}
                {stage === "level7" && <Level7PoeBudget onComplete={goLevel8} />}
                {stage === "level8" && <Level8RackElevation onComplete={goLevel9} />}
                {stage === "level9" && <Level9FireAlarm onComplete={goLevel10} />}
                {stage === "level10" && <Level10CableCert onComplete={goComplete} />}
                {stage === "complete" && <MissionComplete onExit={onClose} />}
              </Suspense>
            </div>

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
