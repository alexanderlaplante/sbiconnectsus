import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 9 — Fire Alarm Loop Wiring (NFPA 72)
 * Player must wire devices in correct SLC (Signaling Line Circuit) order
 * with proper EOL supervision.
 */

interface Device {
  name: string;
  type: "initiating" | "notification" | "monitor" | "eol";
  icon: string;
}

const CORRECT_ORDER: Device[] = [
  { name: "FACP", type: "monitor", icon: "◆" },
  { name: "Smoke Det #1", type: "initiating", icon: "◉" },
  { name: "Smoke Det #2", type: "initiating", icon: "◉" },
  { name: "Pull Station", type: "initiating", icon: "⬡" },
  { name: "Horn/Strobe", type: "notification", icon: "◈" },
  { name: "EOL Resistor", type: "eol", icon: "⊗" },
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

export default function Level9FireAlarm({ onComplete }: Props) {
  const [shuffled] = useState(() => shuffle(CORRECT_ORDER.map((_, i) => i)));
  const [placed, setPlaced] = useState<number[]>([]);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const placedSet = new Set(placed);

  const handlePick = useCallback(
    (devIdx: number) => {
      if (result) return;
      if (placed.length >= CORRECT_ORDER.length) return;
      setPlaced((prev) => [...prev, devIdx]);
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
    const correct = placed.every((devIdx, pos) => devIdx === pos);
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

  const allPlaced = placed.length === CORRECT_ORDER.length;

  const typeColor = (type: string) => {
    switch (type) {
      case "initiating": return "text-red-400/80";
      case "notification": return "text-yellow-400/80";
      case "monitor": return "text-blue-400/80";
      case "eol": return "text-green-400/80";
      default: return "text-green-400/60";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 9</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Fire Alarm Loop — NFPA 72
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Wire the SLC loop: FACP → Initiating → Notification → EOL
        </p>
      </div>

      {/* Loop diagram */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Signaling Line Circuit
        </div>
        <div className="flex flex-col gap-1">
          {Array.from({ length: CORRECT_ORDER.length }).map((_, slotIdx) => {
            const devIdx = placed[slotIdx] ?? null;
            const dev = devIdx !== null ? CORRECT_ORDER[devIdx] : null;
            return (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`flex items-center gap-2 px-3 py-2 rounded border font-mono text-[11px] transition-all ${
                  dev
                    ? "border-green-700/50 bg-green-950/30 hover:border-red-500/50"
                    : slotIdx === placed.length
                    ? "border-green-500/40 bg-green-900/10"
                    : "border-green-900/20 bg-[#0a0e13]"
                }`}
              >
                <span className="text-[9px] text-green-700/40 w-6">#{slotIdx + 1}</span>
                {dev ? (
                  <>
                    <span className={`text-base ${typeColor(dev.type)}`}>{dev.icon}</span>
                    <span className="text-green-300 flex-1 text-left">{dev.name}</span>
                    <span className="text-[9px] text-green-600/40 uppercase">{dev.type}</span>
                  </>
                ) : (
                  <>
                    {slotIdx === placed.length && (
                      <span className="text-green-600/40 flex-1 text-center">◇ connect next device</span>
                    )}
                    {slotIdx > placed.length && (
                      <span className="text-green-800/30 flex-1 text-center">—</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
        {/* Connection lines */}
        {placed.length > 1 && (
          <div className="font-mono text-[9px] text-green-600/30 text-center mt-2">
            {placed.length} devices wired • {placed.length < CORRECT_ORDER.length ? "loop open" : "loop closed"}
          </div>
        )}
      </div>

      {/* Device pool */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Available Devices
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {shuffled.map((devIdx) => {
            if (placedSet.has(devIdx)) return null;
            const dev = CORRECT_ORDER[devIdx];
            return (
              <motion.button
                key={devIdx}
                onClick={() => handlePick(devIdx)}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1.5 rounded border border-green-900/40 bg-[#0a0e13] hover:border-green-700/50 transition-all"
              >
                <span className={typeColor(dev.type)}>{dev.icon}</span>
                <span className="text-green-400/80">{dev.name}</span>
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
          [ Verify Loop ]
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
            {result === "success" ? "▸ SLC LOOP VERIFIED ◂" : "✗ CIRCUIT FAULT — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
