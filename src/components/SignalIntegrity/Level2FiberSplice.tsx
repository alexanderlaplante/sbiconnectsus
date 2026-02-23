import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playArc, playSuccess, playError } from "./audioUtils";

interface Props {
  onComplete: () => void;
}

const CORE_RADIUS = 6;
const CLAD_RADIUS = 24;

export default function Level2FiberSplice({ onComplete }: Props) {
  const [offsetY, setOffsetY] = useState(() => Math.round((Math.random() - 0.5) * 40));
  const [arced, setArced] = useState(false);
  const [result, setResult] = useState<"success" | "fail" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const alignment = Math.max(0, 100 - Math.abs(offsetY) * 2.5);
  const loss = Math.abs(offsetY) * 0.005;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (arced) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setOffsetY((v) => Math.max(v - 1, -40));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setOffsetY((v) => Math.min(v + 1, 40));
      } else if (e.key === " ") {
        e.preventDefault();
        handleArc();
      }
    },
    [arced]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const handleArc = () => {
    if (arced) return;
    playArc();
    setArced(true);
    setTimeout(() => {
      if (alignment >= 98) {
        playSuccess();
        setResult("success");
        setTimeout(onComplete, 2000);
      } else {
        playError();
        setResult("fail");
        setTimeout(() => {
          setArced(false);
          setResult(null);
          setOffsetY(Math.round((Math.random() - 0.5) * 40));
        }, 1800);
      }
    }, 600);
  };

  const centerY = 60;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2"
    >
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">
          Level 2
        </h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Fiber Fusion Splicing
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Use ↑↓ arrows to align cores. Spacebar to arc. Target: ≥98% alignment.
        </p>
      </div>

      {/* Microscope View */}
      <div className="relative w-full bg-[#050810] border border-green-900/40 rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 320 120"
          className="w-full"
          style={{ filter: "drop-shadow(0 0 8px rgba(0,255,102,0.1))" }}
        >
          {/* Grid lines */}
          {Array.from({ length: 17 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 20}
              y1={0}
              x2={i * 20}
              y2={120}
              stroke="rgba(0,255,102,0.06)"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 20}
              x2={320}
              y2={i * 20}
              stroke="rgba(0,255,102,0.06)"
              strokeWidth={0.5}
            />
          ))}

          {/* Center crosshair */}
          <line x1={160} y1={0} x2={160} y2={120} stroke="rgba(0,255,102,0.15)" strokeWidth={0.5} strokeDasharray="4 4" />
          <line x1={0} y1={centerY} x2={320} y2={centerY} stroke="rgba(0,255,102,0.15)" strokeWidth={0.5} strokeDasharray="4 4" />

          {/* Left fiber (fixed) */}
          <circle cx={120} cy={centerY} r={CLAD_RADIUS} fill="none" stroke="rgba(0,255,102,0.2)" strokeWidth={1} />
          <circle cx={120} cy={centerY} r={CORE_RADIUS} fill="#00ff66" opacity={0.7} />
          <rect x={0} y={centerY - CLAD_RADIUS} width={120} height={CLAD_RADIUS * 2} fill="rgba(0,255,102,0.03)" />

          {/* Right fiber (movable) */}
          <circle cx={200} cy={centerY + offsetY} r={CLAD_RADIUS} fill="none" stroke="rgba(0,255,102,0.2)" strokeWidth={1} />
          <circle cx={200} cy={centerY + offsetY} r={CORE_RADIUS} fill="#00ff66" opacity={0.7} />
          <rect x={200} y={centerY + offsetY - CLAD_RADIUS} width={120} height={CLAD_RADIUS * 2} fill="rgba(0,255,102,0.03)" />

          {/* Arc flash */}
          {arced && (
            <motion.line
              x1={126}
              y1={centerY}
              x2={194}
              y2={centerY + offsetY}
              stroke="#fff"
              strokeWidth={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1, 0] }}
              transition={{ duration: 0.5 }}
              style={{ filter: "drop-shadow(0 0 6px #fff)" }}
            />
          )}
        </svg>

        {/* HUD readouts */}
        <div className="absolute top-2 left-3 font-mono text-[10px] text-green-500/70 space-y-0.5">
          <div>OFFSET: {offsetY > 0 ? "+" : ""}{offsetY}μm</div>
          <div>ALIGN: <span className={alignment >= 98 ? "text-green-300" : "text-yellow-400"}>{alignment.toFixed(1)}%</span></div>
        </div>
        <div className="absolute top-2 right-3 font-mono text-[10px] text-green-500/70">
          LOSS: {loss.toFixed(3)}dB
        </div>
      </div>

      {/* Mobile controls */}
      <div className="flex gap-3 sm:hidden">
        <button
          onPointerDown={() => !arced && setOffsetY((v) => Math.max(v - 1, -40))}
          className="font-mono text-xs px-4 py-2 border border-green-700/40 text-green-400 rounded active:bg-green-900/30"
        >
          ▲
        </button>
        <button
          onPointerDown={handleArc}
          disabled={arced}
          className="font-mono text-xs px-4 py-2 border border-green-500/50 text-green-300 rounded active:bg-green-900/30 disabled:opacity-40"
        >
          ARC
        </button>
        <button
          onPointerDown={() => !arced && setOffsetY((v) => Math.min(v + 1, 40))}
          className="font-mono text-xs px-4 py-2 border border-green-700/40 text-green-400 rounded active:bg-green-900/30"
        >
          ▼
        </button>
      </div>

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
              ? `▸ SEAL QUALITY — ${loss.toFixed(3)}dB LOSS ◂`
              : `✗ ALIGNMENT INSUFFICIENT (${alignment.toFixed(1)}%) — RETRY...`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
