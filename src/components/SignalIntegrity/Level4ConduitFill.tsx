import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 4 — Conduit Fill Calculator
 * Player must select the correct conduit size for a given set of cables
 * based on NEC 40% fill ratio for 3+ cables.
 */

interface CableSpec {
  type: string;
  count: number;
  areaEach: number; // sq inches
}

interface Scenario {
  cables: CableSpec[];
  totalArea: number;
  correctConduit: string;
  conduitOptions: { label: string; area: number }[];
}

function generateScenario(): Scenario {
  const scenarios: Scenario[] = [
    {
      cables: [
        { type: "Cat6A", count: 12, areaEach: 0.0491 },
        { type: "Cat6", count: 6, areaEach: 0.0388 },
      ],
      totalArea: 12 * 0.0491 + 6 * 0.0388,
      correctConduit: '1-1/4"',
      conduitOptions: [
        { label: '3/4"', area: 0.213 },
        { label: '1"', area: 0.355 },
        { label: '1-1/4"', area: 0.598 },
        { label: '1-1/2"', area: 0.814 },
      ],
    },
    {
      cables: [
        { type: "Cat6", count: 24, areaEach: 0.0388 },
      ],
      totalArea: 24 * 0.0388,
      correctConduit: '2"',
      conduitOptions: [
        { label: '1"', area: 0.355 },
        { label: '1-1/4"', area: 0.598 },
        { label: '1-1/2"', area: 0.814 },
        { label: '2"', area: 1.316 },
      ],
    },
    {
      cables: [
        { type: "Cat6A", count: 4, areaEach: 0.0491 },
      ],
      totalArea: 4 * 0.0491,
      correctConduit: '3/4"',
      conduitOptions: [
        { label: '1/2"', area: 0.122 },
        { label: '3/4"', area: 0.213 },
        { label: '1"', area: 0.355 },
        { label: '1-1/4"', area: 0.598 },
      ],
    },
  ];
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

interface Props {
  onComplete: () => void;
}

export default function Level4ConduitFill({ onComplete }: Props) {
  const [scenario, setScenario] = useState(generateScenario);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const requiredArea = scenario.totalArea / 0.4; // 40% fill

  const handleValidate = useCallback(() => {
    if (!selected || result) return;
    if (selected === scenario.correctConduit) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setSelected(null);
        setScenario(generateScenario());
      }, 1500);
    }
  }, [selected, result, scenario, onComplete]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 4</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Conduit Fill — NEC 40%
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Select the smallest conduit that meets NEC 40% fill for 3+ cables.
        </p>
      </div>

      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-3 text-center uppercase tracking-widest">
          Cable Load
        </div>
        <div className="space-y-1.5 mb-3">
          {scenario.cables.map((c, i) => (
            <div key={i} className="flex justify-between font-mono text-[11px] text-green-400/80 px-2">
              <span>{c.count}× {c.type}</span>
              <span className="text-green-600/60">{(c.count * c.areaEach).toFixed(3)} in²</span>
            </div>
          ))}
          <div className="border-t border-green-900/30 pt-1.5 flex justify-between font-mono text-[11px] text-green-300 px-2">
            <span>Total cable area</span>
            <span>{scenario.totalArea.toFixed(3)} in²</span>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-green-500/60 px-2">
            <span>Min conduit area (÷0.40)</span>
            <span>{requiredArea.toFixed(3)} in²</span>
          </div>
        </div>

        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Select Conduit Size (EMT)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {scenario.conduitOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => !result && setSelected(opt.label)}
              className={`font-mono text-xs py-3 rounded border transition-all ${
                selected === opt.label
                  ? "border-green-400 bg-green-900/30 text-green-300 ring-1 ring-green-400/40"
                  : "border-green-900/40 bg-[#0a0e13] text-green-500/70 hover:border-green-700/50"
              }`}
            >
              <div className="font-bold">{opt.label}</div>
              <div className="text-[9px] text-green-600/50 mt-0.5">{opt.area} in²</div>
            </button>
          ))}
        </div>
      </div>

      {selected && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Verify Conduit ]
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
            {result === "success" ? "▸ CONDUIT APPROVED ◂" : "✗ FILL VIOLATION — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
