import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSuccess, playError } from "./audioUtils";

/**
 * Level 10 — Cable Certification (Pass/Fail)
 * Player is shown Fluke-style test results and must determine pass/fail
 * and identify the failing parameter.
 */

interface TestResult {
  param: string;
  value: string;
  limit: string;
  pass: boolean;
}

interface CertScenario {
  cableType: string;
  length: string;
  results: TestResult[];
  overallPass: boolean;
  failParam: string | null;
}

const SCENARIOS: CertScenario[] = [
  {
    cableType: "Cat6A",
    length: "87m",
    results: [
      { param: "Wire Map", value: "OK", limit: "Pass", pass: true },
      { param: "Length", value: "87m", limit: "≤100m", pass: true },
      { param: "Insertion Loss", value: "18.2dB", limit: "≤21.3dB", pass: true },
      { param: "NEXT", value: "42.1dB", limit: "≥33.1dB", pass: true },
      { param: "Return Loss", value: "14.8dB", limit: "≥12.0dB", pass: true },
    ],
    overallPass: true,
    failParam: null,
  },
  {
    cableType: "Cat6",
    length: "92m",
    results: [
      { param: "Wire Map", value: "Pair 3-6 Swap", limit: "Pass", pass: false },
      { param: "Length", value: "92m", limit: "≤100m", pass: true },
      { param: "Insertion Loss", value: "19.8dB", limit: "≤21.3dB", pass: true },
      { param: "NEXT", value: "35.2dB", limit: "≥33.1dB", pass: true },
      { param: "Return Loss", value: "13.1dB", limit: "≥12.0dB", pass: true },
    ],
    overallPass: false,
    failParam: "Wire Map",
  },
  {
    cableType: "Cat6A",
    length: "45m",
    results: [
      { param: "Wire Map", value: "OK", limit: "Pass", pass: true },
      { param: "Length", value: "45m", limit: "≤100m", pass: true },
      { param: "Insertion Loss", value: "9.1dB", limit: "≤21.3dB", pass: true },
      { param: "NEXT", value: "28.4dB", limit: "≥33.1dB", pass: false },
      { param: "Return Loss", value: "15.2dB", limit: "≥12.0dB", pass: true },
    ],
    overallPass: false,
    failParam: "NEXT",
  },
];

interface Props {
  onComplete: () => void;
}

export default function Level10CableCert({ onComplete }: Props) {
  const [scenario, setScenario] = useState(() => SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
  const [verdict, setVerdict] = useState<"pass" | "fail" | null>(null);
  const [failParam, setFailParam] = useState<string | null>(null);
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const handleSubmit = useCallback(() => {
    if (result) return;
    const verdictCorrect = verdict === (scenario.overallPass ? "pass" : "fail");
    const paramCorrect = scenario.overallPass
      ? failParam === null
      : failParam === scenario.failParam;

    if (verdictCorrect && paramCorrect) {
      playSuccess();
      setResult("success");
      setTimeout(onComplete, 1800);
    } else {
      playError();
      setResult("fail");
      setTimeout(() => {
        setResult(null);
        setVerdict(null);
        setFailParam(null);
        setScenario(SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
      }, 1500);
    }
  }, [verdict, failParam, result, scenario, onComplete]);

  const canSubmit = verdict !== null && (verdict === "pass" || failParam !== null);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-2">
      <div className="text-center mb-2">
        <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/60 mb-1">Level 10</h3>
        <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider">
          Cable Certification
        </h2>
        <p className="font-mono text-[10px] text-green-500/50 mt-1">
          Review the Fluke results. Pass or Fail? If fail, identify the parameter.
        </p>
      </div>

      {/* Test results */}
      <div className="bg-[#0c1117] border border-green-900/40 rounded-lg p-3 sm:p-4 w-full">
        <div className="flex justify-between font-mono text-[9px] text-green-600/40 mb-3 uppercase tracking-widest px-1">
          <span>Fluke DSX-8000</span>
          <span>{scenario.cableType} • {scenario.length}</span>
        </div>
        <div className="space-y-1">
          <div className="grid grid-cols-3 font-mono text-[9px] text-green-600/50 px-2 pb-1 border-b border-green-900/30">
            <span>Parameter</span>
            <span className="text-center">Result</span>
            <span className="text-right">Limit</span>
          </div>
          {scenario.results.map((r) => (
            <div key={r.param} className="grid grid-cols-3 font-mono text-[11px] px-2 py-1">
              <span className="text-green-400/80">{r.param}</span>
              <span className="text-center text-green-300">{r.value}</span>
              <span className="text-right text-green-600/60">{r.limit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict selection */}
      <div className="bg-[#0c1117] border border-green-900/30 rounded-lg p-3 w-full">
        <div className="font-mono text-[9px] text-green-600/40 mb-2 text-center uppercase tracking-widest">
          Your Verdict
        </div>
        <div className="flex gap-2 justify-center mb-3">
          {(["pass", "fail"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                if (result) return;
                setVerdict(v);
                if (v === "pass") setFailParam(null);
              }}
              className={`font-mono text-xs uppercase tracking-widest px-5 py-2 rounded border transition-all ${
                verdict === v
                  ? v === "pass"
                    ? "border-green-400 bg-green-900/30 text-green-300 ring-1 ring-green-400/40"
                    : "border-red-400 bg-red-900/20 text-red-300 ring-1 ring-red-400/40"
                  : "border-green-900/40 bg-[#0a0e13] text-green-600/60 hover:border-green-700/50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {verdict === "fail" && (
          <div>
            <div className="font-mono text-[9px] text-green-600/40 mb-1.5 text-center uppercase tracking-widest">
              Failing Parameter
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {scenario.results.map((r) => (
                <button
                  key={r.param}
                  onClick={() => !result && setFailParam(r.param)}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded border transition-all ${
                    failParam === r.param
                      ? "border-red-400 bg-red-900/20 text-red-300 ring-1 ring-red-400/30"
                      : "border-green-900/40 bg-[#0a0e13] text-green-500/70 hover:border-green-700/50"
                  }`}
                >
                  {r.param}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {canSubmit && !result && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-2 border border-green-500/60 text-green-300 rounded hover:bg-green-900/30 transition-colors"
        >
          [ Submit Certification ]
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
            {result === "success" ? "▸ CERTIFICATION LOGGED ◂" : "✗ INCORRECT ANALYSIS — RETRY..."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
