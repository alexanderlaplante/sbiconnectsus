import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RACK_UNITS = 6;
const AUTO_CLOSE_MS = 5500;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── hook: detect N clicks within a time window ─── */
export function useTripleClick(threshold = 2000, onTrigger?: () => void) {
  const clicks = useRef<number[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      clicks.current = clicks.current.filter((t) => now - t < threshold);
      clicks.current.push(now);
      if (clicks.current.length >= 3) {
        e.preventDefault();
        clicks.current = [];
        onTrigger?.();
      }
    },
    [threshold, onTrigger],
  );

  return { handleClick };
}

/* ─── overlay component ─── */
export default function RackAndStackOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = prefersReducedMotion();
  const dur = reduced ? 0.01 : 1;

  /* auto-close */
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [open, onClose]);

  /* escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur * 0.4 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(16,17,20,0.92)",
            cursor: "pointer",
          }}
        >
          {/* blueprint grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(56,152,236,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,152,236,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          <RackAnimation dur={dur} />

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dur * 3.2, duration: dur * 0.6 }}
            style={{
              marginTop: 28,
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.02em",
              textAlign: "center",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Proper rack management isn't magic. It's{" "}
            <span style={{ color: "#3898ec", fontWeight: 700 }}>SBI</span>.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── rack SVG animation ─── */
function RackAnimation({ dur }: { dur: number }) {
  const rackW = 180;
  const rackH = 260;
  const unitH = (rackH - 40) / RACK_UNITS;

  return (
    <motion.svg
      width={rackW}
      height={rackH}
      viewBox={`0 0 ${rackW} ${rackH}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: dur * 0.5 }}
      style={{ filter: "drop-shadow(0 0 24px rgba(56,152,236,0.18))" }}
    >
      {/* rack frame */}
      <motion.rect
        x={10}
        y={10}
        width={rackW - 20}
        height={rackH - 20}
        rx={6}
        fill="none"
        stroke="rgba(56,152,236,0.35)"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: dur * 0.8 }}
      />

      {/* vertical rails */}
      {[28, rackW - 28].map((x) => (
        <motion.line
          key={x}
          x1={x}
          y1={20}
          x2={x}
          y2={rackH - 20}
          stroke="rgba(56,152,236,0.2)"
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: dur * 0.6, delay: dur * 0.3 }}
        />
      ))}

      {/* rack units sliding in */}
      {Array.from({ length: RACK_UNITS }).map((_, i) => {
        const y = rackH - 25 - (i + 1) * unitH;
        const delay = dur * 0.6 + i * dur * 0.25;
        return (
          <motion.g key={i}>
            {/* unit body */}
            <motion.rect
              x={32}
              y={y}
              width={rackW - 64}
              height={unitH - 4}
              rx={3}
              fill="rgba(56,152,236,0.08)"
              stroke="rgba(56,152,236,0.25)"
              strokeWidth={1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: dur * 0.35, ease: "easeOut" }}
            />
            {/* faceplate detail */}
            <motion.rect
              x={40}
              y={y + 5}
              width={rackW - 80}
              height={unitH - 14}
              rx={2}
              fill="rgba(56,152,236,0.04)"
              stroke="rgba(56,152,236,0.12)"
              strokeWidth={0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + dur * 0.15, duration: dur * 0.2 }}
            />
            {/* LED indicators */}
            {[0, 1].map((led) => (
              <motion.circle
                key={led}
                cx={rackW - 42 + led * 8}
                cy={y + unitH / 2 - 2}
                r={2}
                fill={led === 0 ? "#22c55e" : "#3898ec"}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 1, 0.7, 1] }}
                transition={{
                  delay: delay + dur * 0.3,
                  duration: dur * 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
