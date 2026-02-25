import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 5 — Patch Panel Port Mapping
 * Player must connect numbered ports to the correct labeled destinations.
 */

interface PortMapping {
  port: number;
  destination: string;
}

const MAPPINGS: PortMapping[] = [
  { port: 1, destination: "CONF-A-01" },
  { port: 2, destination: "CONF-A-02" },
  { port: 3, destination: "LOBBY-01" },
  { port: 4, destination: "EXEC-01" },
  { port: 5, destination: "SERVER-01" },
  { port: 6, destination: "WAP-FL2" },
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

export default function Level5PatchPanel({ onComplete }: Props) {
  const [shuffledDests] = useState(() => shuffle(MAPPINGS.map((m) => m.destination)));
  const [connections, setConnections] = useState<(number | null)[]>(Array(6).fill(null));
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const connectedPorts = new Set(connections.filter((v) => v !== null));

  // Tap a port → auto-place into the next empty destination slot
  const handlePortClick = useCallback(
    (portIdx: number) => {
      if (result) return;
      if (connectedPorts.has(portIdx)) return;
      const nextEmpty = connections.indexOf(null);
      if (nextEmpty === -1) return;
      setConnections((prev) => {
        const next = [...prev];
        next[nextEmpty] = portIdx;
        return next;
      });
    },
    [connections, connectedPorts, result]
  );

  const handleRemove = useCallback(
    (destIdx: number) => {
      if (result) return;
      setConnections((prev) => {
        const next = [...prev];
        next[destIdx] = null;
        return next;
      });
    },
    [result]
  );

  const allConnected = connections.every((v) => v !== null);

  const handleValidate = () => {
    const correct = shuffledDests.every((dest, idx) => {
      const portIdx = connections[idx];
      if (portIdx === null) return false;
      return MAPPINGS[portIdx].destination === dest;
    });
    if (correct) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setConnections(Array(6).fill(null));
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 5</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Patch Panel Port Mapping
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Tap a port to place it in the next destination slot. Tap a destination to remove.
        </p>
      </div>

      {/* Ports */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Patch Panel — Ports
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {MAPPINGS.map((m, i) => (
            <motion.button
              key={i}
              onClick={() => !result && !connectedPorts.has(i) && handlePortClick(i)}
              disabled={connectedPorts.has(i)}
              whileTap={{ scale: 0.92 }}
              className={`font-mono text-[11px] py-2.5 rounded border transition-all ${
                connectedPorts.has(i)
                  ? "border-green-800/30 text-green-700/40 bg-green-950/20"
                  : "border-green-900/40 bg-[#0a0e13] text-green-500/70 hover:border-green-700/50"
              }`}
            >
              P{m.port}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Destinations */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Destinations
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {shuffledDests.map((dest, idx) => {
            const connPort = connections[idx];
            const isNext = connPort === null && idx === connections.indexOf(null);
            return (
              <button
                key={idx}
                onClick={() => connPort !== null ? handleRemove(idx) : undefined}
                className={`font-mono text-[10px] py-2 px-1.5 rounded border transition-all text-center ${
                  connPort !== null
                    ? "border-green-600/50 bg-green-900/20 text-green-300 hover:border-red-500/50 cursor-pointer"
                    : isNext
                    ? "border-green-500/40 bg-green-900/10 text-green-400/80 animate-pulse"
                    : "border-green-900/40 bg-[#0a0e13] text-green-500/60"
                }`}
              >
                <div>{dest}</div>
                {connPort !== null && (
                  <div className="text-[8px] text-green-600/60 mt-0.5">← P{MAPPINGS[connPort].port}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {allConnected && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleValidate}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Verify Patch Map ]
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
            {result === "success" ? "▸ PATCH MAP VERIFIED ◂" : "✗ MAPPING ERROR — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
