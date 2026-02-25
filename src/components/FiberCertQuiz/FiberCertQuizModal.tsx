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
    const shuffledWrong = [...q.wrongPool].sort(() => Math.random() - 0.5);
    const selectedWrong = shuffledWrong.slice(0, 3);
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

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (phase === "quiz" && e.key === "Enter" && selected !== null) handleNext();
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
          className="relative bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 sm:p-5 z-10">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Close quiz"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="font-mono text-sm sm:text-base text-primary font-bold tracking-wider uppercase">
              SBI Fiber Cert Quick Quiz
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5 tracking-wide">
              No frayed wires allowed.
            </p>
          </div>

          <div className="p-4 sm:p-5">
            {phase === "quiz" && (
              <div>
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    Question {current + 1}/{total}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: total }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i < current
                            ? "bg-primary/70"
                            : i === current
                            ? "bg-primary animate-pulse"
                            : "bg-muted"
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
                  <p className="font-mono text-xs sm:text-sm text-foreground leading-relaxed mb-5">
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
                            ? "border-primary/70 bg-primary/10 ring-1 ring-primary/30 text-foreground"
                            : "border-border bg-card hover:border-primary/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`shrink-0 font-bold ${
                            selected === idx ? "text-primary" : "text-muted-foreground"
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
                        ? "border-primary/60 text-primary hover:bg-primary/10 cursor-pointer"
                        : "border-border text-muted-foreground/40 cursor-not-allowed"
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
                      passed ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {score}/{total}
                  </div>
                  <div
                    className={`font-mono text-xs mt-1 tracking-wider ${
                      passed ? "text-primary/80" : "text-destructive/70"
                    }`}
                  >
                    {passed ? "PASS" : "FAIL"} — {Math.round((score / total) * 100)}%
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground mt-2 tracking-wide">
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
                            ? "border-primary/30 bg-primary/5"
                            : "border-destructive/30 bg-destructive/5"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-1.5">
                          {isCorrect ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                          )}
                          <p className="font-mono text-[10px] text-foreground/80 leading-relaxed">
                            {pq.question.prompt}
                          </p>
                        </div>
                        {!isCorrect && userChoice !== null && (
                          <p className="font-mono text-[9px] text-destructive/70 ml-5 mb-1">
                            Your answer: {pq.choices[userChoice].text}
                          </p>
                        )}
                        <p className="font-mono text-[9px] text-primary/60 ml-5">
                          ✓ {pq.question.correct}
                        </p>
                        {pq.question.explanation && (
                          <p className="font-mono text-[9px] text-muted-foreground/60 ml-5 mt-0.5 italic">
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
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded border border-primary/60 text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Retake
                  </button>
                  <button
                    onClick={onClose}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <p className="font-mono text-[9px] text-muted-foreground/40 text-center mt-4 tracking-wide">
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
