import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * TIA-598 12-fiber color code standard.
 * Players must place fibers in the correct sequential order (position 1-12).
 * Immediate sequence validation with terminal-style hints on wrong picks.
 */
const FIBER_COLORS: { name: string; hex: string }[] = [
  { name: "Blue", hex: "#3b82f6" },
  { name: "Orange", hex: "#f97316" },
  { name: "Green", hex: "#22c55e" },
  { name: "Brown", hex: "#92400e" },
  { name: "Slate", hex: "#64748b" },
  { name: "White", hex: "#f1f5f9" },
  { name: "Red", hex: "#ef4444" },
  { name: "Black", hex: "#1e293b" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Aqua", hex: "#06b6d4" },
];

interface Props {
  onComplete: () => void;
}

export default function Level3FiberColor({ onComplete }: Props) {
  const [shuffled] = useState(() => {
    const arr = Array.from({ length: 12 }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [placed, setPlaced] = useState<number[]>([]);
  const [result, setResult] = useState<"success" | "fail" | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placedSet = new Set(placed);

  const showHint = useCallback((msg: string) => {
    if (hintTimer.current) clearTimeout(hintTimer.current);
    setHint(msg);
    hintTimer.current = setTimeout(() => setHint(null), 2500);
  }, []);

  // The next expected fiber index in the TIA-598 sequence
  const nextExpected = placed.length < 12 ? placed.length : null;

  const handlePickFiber = useCallback(
    (fiberIdx: number) => {
      if (result) return;
      if (placed.length >= 12) return;

      // Sequence validation: only allow the correct next fiber
      if (fiberIdx !== nextExpected) {
        const expectedName = FIBER_COLORS[nextExpected!].name;
        const tappedName = FIBER_COLORS[fiberIdx].name;
        showHint(
          `Sequence Error: ${expectedName} required at position ${placed.length + 1}, not ${tappedName}.`
        );
        playError();
        return;
      }

      // Correct fiber — auto-place into the next slot
      setPlaced((prev) => [...prev, fiberIdx]);
      setHint(null);
    },
    [placed, result, nextExpected, showHint]
  );

  // Clicking a placed fiber removes it and all fibers after it
  const handleSlotClick = useCallback(
    (slotIdx: number) => {
      if (result) return;
      if (slotIdx >= placed.length) return;
      setPlaced((prev) => prev.slice(0, slotIdx));
      setHint(null);
    },
    [placed, result]
  );

  // Auto-complete: once all 12 are placed (all correct by construction), succeed
  const handleValidate = useCallback(() => {
    // All placed fibers are guaranteed correct due to sequence validation
    playSuccess();
    setResult("success");
    setTimeout(onComplete, 1800);
  }, [onComplete]);

  const allPlaced = placed.length === 12;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">
          Level 3
        </h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Fiber Color Code — TIA-598
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Place fibers in the correct TIA-598 color-code sequence. Wrong picks are rejected.
        </p>
      </div>

      {/* Fiber tray slots */}
      <div className="relative bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Fiber Tray — Position 1-12
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5">
          {Array.from({ length: 12 }).map((_, slotIdx) => {
            const fiberIdx = placed[slotIdx] ?? null;
            const isNext = slotIdx === placed.length;
            return (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`relative h-14 sm:h-16 rounded border transition-all duration-200 flex flex-col items-center justify-center ${
                  fiberIdx !== null
                    ? "border-green-700/50 hover:border-red-500/50 cursor-pointer"
                    : isNext
                    ? "border-green-500/60 bg-green-900/10 animate-pulse"
                    : "border-green-900/30 bg-[#0a0e13]"
                }`}
                aria-label={`Position ${slotIdx + 1}${fiberIdx !== null ? `: ${FIBER_COLORS[fiberIdx].name}` : ""}`}
              >
                <span className="font-mono text-[8px] text-green-700/50 absolute top-0.5">
                  {slotIdx + 1}
                </span>
                {fiberIdx !== null && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="w-2 sm:w-2.5 h-8 sm:h-10 rounded-full"
                    style={{
                      backgroundColor: FIBER_COLORS[fiberIdx].hex,
                      boxShadow: `0 0 6px ${FIBER_COLORS[fiberIdx].hex}66`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {placed.length > 0 && !result && (
          <div className="font-mono text-[9px] text-green-600/40 mt-2 text-center">
            Tap a placed fiber to remove it and all after
          </div>
        )}
      </div>

      {/* Fiber pool */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Available Fibers
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {shuffled.map((fiberIdx) => {
            if (placedSet.has(fiberIdx)) return null;
            const fiber = FIBER_COLORS[fiberIdx];
            return (
              <motion.button
                key={fiberIdx}
                onClick={() => handlePickFiber(fiberIdx)}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded border transition-all font-mono text-[10px] border-green-900/40 bg-[#0a0e13] hover:border-green-700/50"
              >
                <span
                  className="w-2.5 h-6 rounded-full inline-block"
                  style={{
                    backgroundColor: fiber.hex,
                    boxShadow: `0 0 4px ${fiber.hex}44`,
                  }}
                />
                <span className="text-green-300/80 whitespace-nowrap">{fiber.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Terminal Hint */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[10px] text-amber-400/80 text-center tracking-wider"
            style={{ textShadow: "0 0 8px rgba(245,158,11,0.4)" }}
          >
            ▸ {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validate */}
      {allPlaced && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Validate Color Code ]
        </motion.button>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`font-mono text-sm font-bold tracking-wider text-center py-2 ${
              result === "success" ? "text-green-400" : "text-red-400"
            }`}
            style={
              result === "success"
                ? { textShadow: "0 0 12px rgba(0,255,102,0.6)" }
                : { textShadow: "0 0 12px rgba(255,50,50,0.5)" }
            }
          >
            {result === "success"
              ? "▸ COLOR CODE VERIFIED ◂"
              : "✗ INCORRECT SEQUENCE — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
