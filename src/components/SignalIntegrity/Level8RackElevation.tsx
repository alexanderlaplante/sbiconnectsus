import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 8 — Rack Elevation Planning
 * Player must place equipment in the correct rack units (RU) order:
 * heaviest at bottom, patch panels at top, UPS at bottom.
 */

interface Equipment {
  name: string;
  ru: number;
  weight: string;
  priority: number; // lower = bottom of rack
}

const EQUIPMENT: Equipment[] = [
  { name: "UPS Battery", ru: 2, weight: "65 lbs", priority: 1 },
  { name: "Core Switch", ru: 1, weight: "22 lbs", priority: 2 },
  { name: "PoE Switch 48p", ru: 1, weight: "15 lbs", priority: 3 },
  { name: "Fiber Enclosure", ru: 1, weight: "8 lbs", priority: 4 },
  { name: "Cable Mgmt", ru: 1, weight: "3 lbs", priority: 5 },
  { name: "Patch Panel 24p", ru: 1, weight: "4 lbs", priority: 6 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  onComplete: () => void;
}

export default function Level8RackElevation({ onComplete }: Props) {
  const [shuffled] = useState(() => shuffle(EQUIPMENT.map((_, i) => i)));
  const [placed, setPlaced] = useState<number[]>([]);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const placedSet = new Set(placed);

  const handlePick = useCallback(
    (eqIdx: number) => {
      if (result) return;
      if (placed.length >= EQUIPMENT.length) return;
      setPlaced((prev) => [...prev, eqIdx]);
    },
    [placed, result]
  );

  const handleSlotClick = useCallback(
    (slotIdx: number) => {
      if (result) return;
      if (slotIdx >= placed.length) return;
      setPlaced((prev) => prev.slice(0, slotIdx));
    },
    [placed, result]
  );

  const handleValidate = () => {
    // Correct order: priority 1 (bottom) to priority 6 (top)
    // placed[0] = bottom of rack, placed[last] = top
    const correct = placed.every(
      (eqIdx, pos) => EQUIPMENT[eqIdx].priority === pos + 1
    );
    if (correct) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setPlaced([]);
      }, 1500);
    }
  };

  const allPlaced = placed.length === EQUIPMENT.length;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 8</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Rack Elevation Planning
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Stack equipment bottom → top. Heaviest at bottom, patch panels at top.
        </p>
      </div>

      {/* Rack */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          42U Rack — Elevation View
        </div>
        <div className="flex flex-col-reverse gap-1">
          {Array.from({ length: EQUIPMENT.length }).map((_, slotIdx) => {
            const eqIdx = placed[slotIdx] ?? null;
            const eq = eqIdx !== null ? EQUIPMENT[eqIdx] : null;
            return (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`flex items-center justify-between px-3 py-2 rounded border font-mono text-[11px] transition-all ${
                  eq
                    ? "border-green-700/50 bg-green-950/30 text-green-300 hover:border-red-500/50"
                    : slotIdx === placed.length
                    ? "border-green-500/40 bg-green-900/10 text-green-600/40"
                    : "border-green-900/20 bg-[#0a0e13] text-green-800/30"
                }`}
              >
                <span className="text-[9px] text-green-700/40 w-8">RU{slotIdx + 1}</span>
                {eq ? (
                  <>
                    <span className="flex-1 text-left ml-2">{eq.name}</span>
                    <span className="text-[9px] text-green-600/50">{eq.ru}U • {eq.weight}</span>
                  </>
                ) : (
                  <span className="flex-1 text-center text-[9px]">— empty —</span>
                )}
              </button>
            );
          })}
        </div>
        {placed.length > 0 && !result && (
          <div className="font-mono text-[9px] text-green-600/40 mt-2 text-center">
            Tap a placed item to remove it
          </div>
        )}
      </div>

      {/* Equipment pool */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Available Equipment
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {shuffled.map((eqIdx) => {
            if (placedSet.has(eqIdx)) return null;
            const eq = EQUIPMENT[eqIdx];
            return (
              <motion.button
                key={eqIdx}
                onClick={() => handlePick(eqIdx)}
                whileTap={{ scale: 0.92 }}
                className="font-mono text-[10px] px-2.5 py-1.5 rounded border border-green-900/40 bg-[#0a0e13] text-green-400/80 hover:border-green-700/50 transition-all"
              >
                {eq.name} <span className="text-green-600/50">({eq.weight})</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {allPlaced && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Verify Rack Plan ]
        </motion.button>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`font-mono text-sm font-bold tracking-wider text-center py-2 ${
              result === "success" ? "text-green-400" : "text-red-400"
            }`}
            style={result === "success" ? { textShadow: "0 0 12px rgba(0,255,102,0.6)" } : { textShadow: "0 0 12px rgba(255,50,50,0.5)" }}
          >
            {result === "success" ? "▸ RACK ELEVATION APPROVED ◂" : "✗ WEIGHT DISTRIBUTION ERROR — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
