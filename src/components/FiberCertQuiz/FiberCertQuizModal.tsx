import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { quizQuestions, type QuizQuestion } from "./quizData";

interface PreparedQuestion {
  question: QuizQuestion;
  choices: { text: string; isCorrect: boolean }[];
}

function prepareQuiz(): PreparedQuestion[] {
  return quizQuestions.map((q) => {
    // Pick 3 random wrong answers from the pool
    const shuffledWrong = [...q.wrongPool].sort(() => Math.random() - 0.5);
    const selectedWrong = shuffledWrong.slice(0, 3);

    // Build choices and shuffle
    const choices = [
      { text: q.correct, isCorrect: true },
      ...selectedWrong.map((w) => ({ text: w, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    return { question: q, choices };
  });
}

interface Props {
  open: boolean;
  onClose: () => void;
}

type Phase = "quiz" | "results";

export default function FiberCertQuizModal({ open, onClose }: Props) {
  const [prepared, setPrepared] = useState<PreparedQuestion[]>(() => prepareQuiz());
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(17).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");

  const total = prepared.length;
  const q = prepared[current];

  // Reset quiz state when modal opens
  useEffect(() => {
    if (open) {
      const newPrep = prepareQuiz();
      setPrepared(newPrep);
      setCurrent(0);
      setSelected(null);
      setAnswers(Array(17).fill(null));
      setPhase("quiz");
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (phase === "quiz" && e.key === "Enter" && selected !== null) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase, selected, current]);

  const handleSelect = useCallback((idx: number) => {
    setSelected(idx);
  }, []);

  const handleNext = useCallback(() => {
    if (selected === null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = selected;
      return next;
    });

    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setPhase("results");
    }
  }, [selected, current, total]);

  const handleRetake = useCallback(() => {
    const newPrep = prepareQuiz();
    setPrepared(newPrep);
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(17).fill(null));
    setPhase("quiz");
  }, []);

  const score = useMemo(() => {
    return answers.reduce<number>((acc, choiceIdx, qIdx) => {
      if (choiceIdx === null) return acc;
      return acc + (prepared[qIdx].choices[choiceIdx].isCorrect ? 1 : 0);
    }, 0);
  }, [answers, prepared]);

  const passed = score / total >= 0.8;
  const perfect = score === total;

  const CHOICE_LETTERS = ["A", "B", "C", "D"];

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[#0a0e13] border border-green-900/50 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#0a0e13]/95 backdrop-blur-sm border-b border-green-900/30 p-4 sm:p-5 z-10">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-green-700/60 hover:text-green-400 transition-colors"
              aria-label="Close quiz"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-mono text-sm sm:text-base text-green-300 font-bold tracking-wider uppercase">
              SBI Fiber Cert Quick Quiz
            </h2>
            <p className="font-mono text-[10px] text-green-600/50 mt-0.5 tracking-wide">
              No frayed wires allowed.
            </p>
          </div>

          <div className="p-4 sm:p-5">
            {phase === "quiz" && (
              <div>
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-green-500/60 uppercase tracking-widest">
                    Question {current + 1}/{total}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i < current
                            ? "bg-green-500/70"
                            : i === current
                            ? "bg-green-400 animate-pulse"
                            : "bg-green-900/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-mono text-xs sm:text-sm text-green-200/90 leading-relaxed mb-5">
                    {q.question.prompt}
                  </p>

                  {/* Choices */}
                  <div className="space-y-2">
                    {q.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left p-3 rounded border transition-all duration-200 font-mono text-[11px] sm:text-xs leading-relaxed flex gap-2 ${
                          selected === idx
                            ? "border-green-400/70 bg-green-900/30 ring-1 ring-green-400/30 text-green-200"
                            : "border-green-900/40 bg-[#0c1117] hover:border-green-700/50 text-green-300/70 hover:text-green-300/90"
                        }`}
                      >
                        <span
                          className={`shrink-0 font-bold ${
                            selected === idx ? "text-green-400" : "text-green-600/50"
                          }`}
                        >
                          {CHOICE_LETTERS[idx]}.
                        </span>
                        <span>{choice.text}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Next Button */}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] px-5 py-2 rounded border flex items-center gap-1.5 transition-all ${
                      selected !== null
                        ? "border-green-500/60 text-green-300 hover:bg-green-900/30 cursor-pointer"
                        : "border-green-900/30 text-green-800/50 cursor-not-allowed"
                    }`}
                  >
                    {current < total - 1 ? "Next" : "Finish"}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {phase === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Score Banner */}
                <div className="text-center mb-6">
                  <div
                    className={`font-mono text-3xl font-bold tracking-wider ${
                      passed ? "text-green-400" : "text-red-400"
                    }`}
                    style={{
                      textShadow: passed
                        ? "0 0 20px rgba(0,255,102,0.5)"
                        : "0 0 20px rgba(255,50,50,0.4)",
                    }}
                  >
                    {score}/{total}
                  </div>
                  <div
                    className={`font-mono text-xs mt-1 tracking-wider ${
                      passed ? "text-green-500/80" : "text-red-400/70"
                    }`}
                  >
                    {passed ? (passed && perfect ? "PASS" : "PASS") : "FAIL"} —{" "}
                    {Math.round((score / total) * 100)}%
                  </div>
                  <p className="font-mono text-[10px] text-green-500/50 mt-2 tracking-wide">
                    {perfect
                      ? "Certified. Go rack and stack."
                      : passed
                      ? "Solid work. You know your fiber."
                      : "Call SBI before you pull that cable."}
                  </p>
                </div>

                {/* Review */}
                <div className="space-y-3 mb-5">
                  {prepared.map((pq, qIdx) => {
                    const userChoice = answers[qIdx];
                    const isCorrect =
                      userChoice !== null && pq.choices[userChoice].isCorrect;

                    return (
                      <div
                        key={qIdx}
                        className={`border rounded p-3 ${
                          isCorrect
                            ? "border-green-800/40 bg-green-950/20"
                            : "border-red-900/40 bg-red-950/10"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          {isCorrect ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                          )}
                          <p className="font-mono text-[10px] text-green-300/80 leading-relaxed">
                            {pq.question.prompt}
                          </p>
                        </div>
                        {!isCorrect && userChoice !== null && (
                          <p className="font-mono text-[9px] text-red-400/70 ml-5 mb-1">
                            Your answer: {pq.choices[userChoice].text}
                          </p>
                        )}
                        <p className="font-mono text-[9px] text-green-500/60 ml-5">
                          ✓ {pq.question.correct}
                        </p>
                        {pq.question.explanation && (
                          <p className="font-mono text-[9px] text-green-600/40 ml-5 mt-0.5 italic">
                            {pq.question.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleRetake}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded border border-green-500/60 text-green-300 hover:bg-green-900/30 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retake
                  </button>
                  <button
                    onClick={onClose}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded border border-green-900/40 text-green-600/60 hover:text-green-400 hover:border-green-700/50 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="font-mono text-[9px] text-green-700/30 text-center mt-4 tracking-wide">
                  Type `test` again if you're brave.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
