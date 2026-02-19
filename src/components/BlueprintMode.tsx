import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 8000;
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── triple-click hook ─── */
export function useBlueprintTrigger(threshold = 2000) {
  const clicks = useRef<number[]>([]);
  const [active, setActive] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      clicks.current = clicks.current.filter((t) => now - t < threshold);
      clicks.current.push(now);
      if (clicks.current.length >= 3) {
        e.stopPropagation();
        clicks.current = [];
        setActive(true);
      }
    },
    [threshold],
  );

  const dismiss = useCallback(() => setActive(false), []);
  return { active, handleClick, dismiss };
}

/* ─── overlay ─── */
export default function BlueprintOverlay({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
}) {
  const reduced = reducedMotion();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!active) return;
    setToast(true);
    const t1 = setTimeout(() => setToast(false), 2500);
    const t2 = setTimeout(onClose, DURATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, onClose]);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, onClose]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9998 }}
        >
          {/* Navy overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10, 18, 32, 0.88)",
            }}
          />

          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Wireframe edge highlights on sections */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 0 1px rgba(56,152,236,0.15)",
              borderRadius: 0,
            }}
          />

          {/* Fiber path lines */}
          {!reduced && (
            <>
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.line
                    key={i}
                    x1="-10%"
                    y1={`${20 + i * 30}%`}
                    x2="110%"
                    y2={`${35 + i * 25}%`}
                    stroke="rgba(56,152,236,0.12)"
                    strokeWidth={1}
                    strokeDasharray="8 16"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -200 }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </svg>
            </>
          )}

          {/* Badge top-right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              position: "fixed",
              top: 80,
              right: 20,
              padding: "10px 16px",
              borderRadius: 10,
              background: "rgba(10,18,32,0.95)",
              border: "1px solid rgba(56,152,236,0.3)",
              boxShadow: "0 0 20px rgba(56,152,236,0.1)",
              pointerEvents: "auto",
            }}
          >
            <div style={{ color: "#3898ec", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>
              BLUEPRINT MODE
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>
              Designed With Precision
            </div>
          </motion.div>

          {/* Toast bottom center */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  bottom: 32,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "8px 20px",
                  borderRadius: 8,
                  background: "rgba(10,18,32,0.95)",
                  border: "1px solid rgba(56,152,236,0.25)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontWeight: 500,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Blueprint Mode enabled.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
