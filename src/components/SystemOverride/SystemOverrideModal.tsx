import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TerminalText from "./TerminalText";

const MatrixRain = lazy(() => import("./MatrixRain"));

interface Props {
  open: boolean;
  onClose: () => void;
}

const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function SystemOverrideModal({ open, onClose }: Props) {
  const [showExit, setShowExit] = useState(false);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset exit visibility when reopened
  useEffect(() => {
    if (open) setShowExit(false);
  }, [open]);

  const handleComplete = useCallback(() => setShowExit(true), []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.1 : 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="System Override terminal"
        >
          {/* Backdrop — click to close */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#0b0f14" }}
            onClick={onClose}
            aria-label="Close overlay"
          />

          {/* Matrix rain */}
          <Suspense fallback={null}>
            <MatrixRain />
          </Suspense>

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,255,102,0.03) 0px, rgba(0,255,102,0.03) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Terminal window */}
          <motion.div
            className="relative z-10 w-[90vw] max-w-2xl rounded-lg border overflow-hidden"
            style={{
              backgroundColor: "rgba(11,15,20,0.92)",
              borderColor: "rgba(0,255,102,0.25)",
              boxShadow: "0 0 60px -15px rgba(0,255,102,0.2), inset 0 0 30px -15px rgba(0,255,102,0.05)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.3, ease: "easeOut" }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2 border-b"
              style={{ borderColor: "rgba(0,255,102,0.15)" }}
            >
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span
                className="ml-3 text-xs font-mono tracking-wider uppercase"
                style={{ color: "rgba(0,255,102,0.5)" }}
              >
                sbi_secure_terminal v2.4.1
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 sm:p-8">
              <TerminalText onComplete={handleComplete} />
            </div>

            {/* EXIT command */}
            <AnimatePresence>
              {showExit && (
                <motion.div
                  className="px-5 pb-4 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={onClose}
                    className="font-mono text-xs tracking-widest uppercase animate-pulse focus:outline-none focus:ring-1 focus:ring-[#00ff66]/50 rounded px-2 py-1"
                    style={{ color: "#00ff66", textShadow: "0 0 6px rgba(0,255,102,0.5)" }}
                    aria-label="Exit terminal"
                  >
                    [EXIT]
                  </button>

                  {/* SBI watermark */}
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase select-none"
                    style={{ color: "rgba(0,255,102,0.15)" }}
                    aria-hidden="true"
                  >
                    SBI SYSTEMS
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
