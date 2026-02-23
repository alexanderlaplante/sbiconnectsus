import { useState, useEffect, useRef } from "react";

const LINES = [
  "> Initializing SBI Secure Infrastructure Protocol...",
  "> Establishing encrypted uplink...",
  "> Scanning network integrity...",
  "> Checking fiber backbone...",
  "> Inspecting rack density...",
  "> Validating signal strength...",
  "",
  "> System Scan Complete.",
  "> No frayed wires found.",
  "",
  "> You're in SEAL territory now.",
];

const CHAR_DELAY = 28; // ms per char
const LINE_PAUSE = 400; // ms between lines

interface Props {
  onComplete?: () => void;
}

export default function TerminalText({ onComplete }: Props) {
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      onComplete?.();
      return;
    }

    const line = LINES[lineIdx];

    // Empty lines — just push immediately
    if (line === "") {
      setRenderedLines((prev) => [...prev, ""]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
      setCurrentLine("");
      return;
    }

    // Reduced motion: show instantly
    if (prefersReduced.current) {
      setRenderedLines((prev) => [...prev, line]);
      setLineIdx((i) => i + 1);
      return;
    }

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, CHAR_DELAY);
      return () => clearTimeout(t);
    } else {
      // Line complete — pause, then advance
      const t = setTimeout(() => {
        setRenderedLines((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIdx(0);
        setLineIdx((i) => i + 1);
      }, LINE_PAUSE);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, onComplete]);

  // Auto-scroll
  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [renderedLines, currentLine]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-sm sm:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-2"
      style={{ color: "#00ff66", textShadow: "0 0 8px rgba(0,255,102,0.6)" }}
    >
      {renderedLines.map((line, i) => (
        <p key={i} className={line === "" ? "h-4" : "mb-1"}>
          {line}
        </p>
      ))}
      {currentLine && (
        <p className="mb-1">
          {currentLine}
          <span className="inline-block w-2 h-4 ml-0.5 bg-[#00ff66] animate-pulse align-middle" />
        </p>
      )}
    </div>
  );
}
