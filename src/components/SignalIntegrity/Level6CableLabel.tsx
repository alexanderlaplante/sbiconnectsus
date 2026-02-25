import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 6 — Cable Labeling Standards (ANSI/TIA-606-C)
 * Player must construct a correct cable label from building/floor/room/port segments.
 */

interface LabelScenario {
  building: string;
  floor: string;
  room: string;
  port: string;
  correct: string;
}

const SCENARIOS: LabelScenario[] = [
  { building: "HQ", floor: "2", room: "205", port: "A03", correct: "HQ-2-205-A03" },
  { building: "DC", floor: "1", room: "MDF", port: "B12", correct: "DC-1-MDF-B12" },
  { building: "WH", floor: "3", room: "301", port: "C07", correct: "WH-3-301-C07" },
  { building: "HQ", floor: "1", room: "IDF", port: "A01", correct: "HQ-1-IDF-A01" },
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

export default function Level6CableLabel({ onComplete }: Props) {
  const [scenario] = useState(() => SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
  const [segments] = useState(() => {
    const parts = [scenario.building, scenario.floor, scenario.room, scenario.port];
    // Add distractors
    const distractors = ["B06", "4", "SRV", "D11"].filter((d) => !parts.includes(d));
    return shuffle([...parts, ...distractors.slice(0, 2)]);
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const selectedSet = new Set(selected);

  const handlePick = useCallback(
    (seg: string) => {
      if (result) return;
      if (selected.length >= 4) return;
      setSelected((prev) => [...prev, seg]);
    },
    [selected, result]
  );

  const handleRemoveLast = useCallback(() => {
    if (result) return;
    setSelected((prev) => prev.slice(0, -1));
  }, [result]);

  const handleValidate = () => {
    const label = selected.join("-");
    if (label === scenario.correct) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setSelected([]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 6</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Cable Labeling — TIA-606-C
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Build the label: BUILDING-FLOOR-ROOM-PORT
        </p>
      </div>

      {/* Assignment */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Work Order
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] px-4">
          <span className="text-green-600/60">Building:</span>
          <span className="text-green-400">{scenario.building}</span>
          <span className="text-green-600/60">Floor:</span>
          <span className="text-green-400">{scenario.floor}</span>
          <span className="text-green-600/60">Room/Closet:</span>
          <span className="text-green-400">{scenario.room}</span>
          <span className="text-green-600/60">Port:</span>
          <span className="text-green-400">{scenario.port}</span>
        </div>
      </div>

      {/* Constructed label */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Label Preview
        </div>
        <div className="flex items-center justify-center gap-1 min-h-[40px]">
          {selected.length === 0 ? (
            <span className="font-mono text-[11px] text-green-700/40">Tap segments below...</span>
          ) : (
            selected.map((seg, i) => (
              <span key={i} className="font-mono text-sm text-green-300 font-bold">
                {i > 0 && <span className="text-green-600/40">-</span>}
                {seg}
              </span>
            ))
          )}
        </div>
        {selected.length > 0 && !result && (
          <button
            onClick={handleRemoveLast}
            className="block mx-auto mt-1 font-mono text-[9px] text-green-600/50 hover:text-green-400"
          >
            ↩ Undo
          </button>
        )}
      </div>

      {/* Segment pool */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Available Segments
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {segments.map((seg) => {
            if (selectedSet.has(seg)) return null;
            return (
              <motion.button
                key={seg}
                onClick={() => handlePick(seg)}
                whileTap={{ scale: 0.92 }}
                className="font-mono text-[11px] px-3 py-1.5 rounded border border-green-900/40 bg-[#0a0e13] text-green-400/80 hover:border-green-700/50 transition-all"
              >
                {seg}
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected.length === 4 && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Validate Label ]
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
            {result === "success" ? "▸ LABEL APPROVED ◂" : "✗ LABEL INCORRECT — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
