import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

const T568B = [
  { name: "White-Orange", color: "#fff", stripe: "#f97316" },
  { name: "Orange", color: "#f97316", stripe: null },
  { name: "White-Green", color: "#fff", stripe: "#22c55e" },
  { name: "Blue", color: "#3b82f6", stripe: null },
  { name: "White-Blue", color: "#fff", stripe: "#3b82f6" },
  { name: "Green", color: "#22c55e", stripe: null },
  { name: "White-Brown", color: "#fff", stripe: "#92400e" },
  { name: "Brown", color: "#92400e", stripe: null },
];

interface Props {
  onComplete: () => void;
}

export default function Level1Cat6({ onComplete }: Props) {
  const [placed, setPlaced] = useState<(number | null)[]>(Array(8).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  // Shuffled wire indices for the pool
  const [pool] = useState(() => {
    const arr = Array.from({ length: 8 }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const placedSet = new Set(placed.filter((v) => v !== null));

  const handleSlotClick = useCallback(
    (slotIdx: number) => {
      if (result) return;
      if (selected === null) return;
      if (placed[slotIdx] !== null) return;
      setPlaced((prev) => {
        const next = [...prev];
        next[slotIdx] = selected;
        return next;
      });
      setSelected(null);
    },
    [selected, placed, result]
  );

  const handleRemove = useCallback(
    (slotIdx: number) => {
      if (result) return;
      setPlaced((prev) => {
        const next = [...prev];
        next[slotIdx] = null;
        return next;
      });
    },
    [result]
  );

  const handleValidate = () => {
    const correct = placed.every((wireIdx, slotIdx) => wireIdx === slotIdx);
    if (correct) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setPlaced(Array(8).fill(null));
        setSelected(null);
      }, 1500);
    }
  };

  const allPlaced = placed.every((v) => v !== null);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      {/* Title */}
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">
          Level 1
        </h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Cat6 Termination — T568B Standard
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Tap a wire, then tap a slot to place it. Tap a placed wire to remove.
        </p>
      </div>

      {/* RJ45 Plug Slots */}
      <div className="relative bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          RJ45 Connector — Pin 1-8
        </div>
        <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
          {placed.map((wireIdx, slotIdx) => (
            <button
              key={slotIdx}
              onClick={() =>
                wireIdx !== null ? handleRemove(slotIdx) : handleSlotClick(slotIdx)
              }
              className={`relative h-14 sm:h-16 rounded border transition-all duration-200 flex flex-col items-center justify-center ${
                wireIdx !== null
                  ? "border-green-700/50"
                  : selected !== null
                  ? "border-green-500/60 bg-green-900/10 animate-pulse"
                  : "border-green-900/30 bg-[#0a0e13]"
              }`}
              aria-label={`Slot ${slotIdx + 1}${wireIdx !== null ? `: ${T568B[wireIdx].name}` : ""}`}
            >
              <span className="font-mono text-[8px] text-green-700/50 absolute top-0.5">
                {slotIdx + 1}
              </span>
              {wireIdx !== null && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  className="w-2.5 sm:w-3 h-8 sm:h-10 rounded-sm relative overflow-hidden"
                  style={{ backgroundColor: T568B[wireIdx].color }}
                >
                  {T568B[wireIdx].stripe && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${T568B[wireIdx].stripe} 2px, ${T568B[wireIdx].stripe} 4px)`,
                      }}
                    />
                  )}
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Wire Pool */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Available Wires
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {pool.map((wireIdx) => {
            if (placedSet.has(wireIdx)) return null;
            const wire = T568B[wireIdx];
            return (
              <motion.button
                key={wireIdx}
                onClick={() => setSelected(selected === wireIdx ? null : wireIdx)}
                whileTap={{ scale: 0.92 }}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded border transition-all font-mono text-[10px] ${
                  selected === wireIdx
                    ? "border-green-400 bg-green-900/30 ring-1 ring-green-400/40"
                    : "border-green-900/40 bg-[#0a0e13] hover:border-green-700/50"
                }`}
              >
                <span
                  className="w-3 h-6 rounded-sm inline-block relative overflow-hidden"
                  style={{ backgroundColor: wire.color }}
                >
                  {wire.stripe && (
                    <span
                      className="absolute inset-0"
                      style={{
                        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${wire.stripe} 2px, ${wire.stripe} 3px)`,
                      }}
                    />
                  )}
                </span>
                <span className="text-green-300/80 whitespace-nowrap">{wire.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Validate Button */}
      {allPlaced && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Validate Termination ]
        </motion.button>
      )}

      {/* Result Feedback */}
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
              ? "▸ TERMINATION SUCCESSFUL ◂"
              : "✗ INCORRECT SEQUENCE — RESETTING..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
