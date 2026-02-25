import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 7 — PoE Power Budget
 * Player must determine if a switch port can power a given device
 * and select the correct PoE standard.
 */

interface PoeScenario {
  device: string;
  powerDraw: number; // watts
  cableLength: string;
  correctStandard: string;
  options: { label: string; maxWatts: number }[];
}

const SCENARIOS: PoeScenario[] = [
  {
    device: "IP Camera (PTZ)",
    powerDraw: 25,
    cableLength: "45m",
    correctStandard: "PoE+ (802.3at)",
    options: [
      { label: "PoE (802.3af)", maxWatts: 15.4 },
      { label: "PoE+ (802.3at)", maxWatts: 30 },
      { label: "PoE++ (802.3bt T3)", maxWatts: 60 },
      { label: "PoE++ (802.3bt T4)", maxWatts: 90 },
    ],
  },
  {
    device: "Wireless Access Point",
    powerDraw: 12,
    cableLength: "80m",
    correctStandard: "PoE (802.3af)",
    options: [
      { label: "PoE (802.3af)", maxWatts: 15.4 },
      { label: "PoE+ (802.3at)", maxWatts: 30 },
      { label: "PoE++ (802.3bt T3)", maxWatts: 60 },
      { label: "PoE++ (802.3bt T4)", maxWatts: 90 },
    ],
  },
  {
    device: "Video Conference Display",
    powerDraw: 55,
    cableLength: "30m",
    correctStandard: "PoE++ (802.3bt T3)",
    options: [
      { label: "PoE (802.3af)", maxWatts: 15.4 },
      { label: "PoE+ (802.3at)", maxWatts: 30 },
      { label: "PoE++ (802.3bt T3)", maxWatts: 60 },
      { label: "PoE++ (802.3bt T4)", maxWatts: 90 },
    ],
  },
];

interface Props {
  onComplete: () => void;
}

export default function Level7PoeBudget({ onComplete }: Props) {
  const [scenario, setScenario] = useState(() => SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const handleValidate = useCallback(() => {
    if (!selected || result) return;
    if (selected === scenario.correctStandard) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setSelected(null);
        setScenario(SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
      }, 1500);
    }
  }, [selected, result, scenario, onComplete]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 7</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          PoE Power Budget
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Select the minimum PoE standard that powers this device.
        </p>
      </div>

      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-3 text-center uppercase tracking-widest">
          Device Specification
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px] px-4">
          <span className="text-green-600/60">Device:</span>
          <span className="text-green-400">{scenario.device}</span>
          <span className="text-green-600/60">Power Draw:</span>
          <span className="text-yellow-400">{scenario.powerDraw}W</span>
          <span className="text-green-600/60">Cable Run:</span>
          <span className="text-green-400">{scenario.cableLength}</span>
        </div>
      </div>

      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Select PoE Standard
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenario.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => !result && setSelected(opt.label)}
              className={`font-mono text-[11px] py-2.5 px-3 rounded border transition-all text-left ${
                selected === opt.label
                  ? "border-green-400 bg-green-900/30 text-green-300 ring-1 ring-green-400/40"
                  : "border-green-900/40 bg-[#0a0e13] text-green-500/70 hover:border-green-700/50"
              }`}
            >
              <div className="font-bold">{opt.label}</div>
              <div className="text-[9px] text-green-600/50 mt-0.5">Max {opt.maxWatts}W per port</div>
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
          [ Verify PoE Budget ]
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
            {result === "success" ? "▸ POWER BUDGET APPROVED ◂" : "✗ INSUFFICIENT POWER — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
