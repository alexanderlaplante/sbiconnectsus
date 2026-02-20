import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, questionBank, categories, Category } from "./questionBank";
import { X } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HISTORY_KEY = "sbi-iq-history";

function getHistory(): Record<Category, string[]> {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { fiber: [], rack: [], das: [] };
}

function saveHistory(selected: Question[]) {
  const history = getHistory();
  for (const q of selected) {
    history[q.category].push(q.id);
    if (history[q.category].length > 3) history[q.category] = history[q.category].slice(-3);
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function pickQuestions(): { question: Question; shuffledOptions: string[]; correctShuffled: number }[] {
  const history = getHistory();
  return categories.map((cat) => {
    const pool = questionBank[cat];
    const avoid = new Set(history[cat]);
    let candidates = pool.filter((q) => !avoid.has(q.id));
    if (candidates.length === 0) candidates = pool;
    const question = candidates[Math.floor(Math.random() * candidates.length)];
    const correctAnswer = question.options[question.correctIndex];
    const shuffledOptions = shuffleArray(question.options);
    const correctShuffled = shuffledOptions.indexOf(correctAnswer);
    return { question, shuffledOptions, correctShuffled };
  });
}

interface Props {
  open: boolean;
  onClose: () => void;
}

type Phase = "question" | "feedback" | "results";

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const transition = reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" as const };

export default function IntegratorIQModal({ open, onClose }: Props) {
  const [quiz, setQuiz] = useState<ReturnType<typeof pickQuestions>>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [wasCorrect, setWasCorrect] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setQuiz(pickQuestions());
    setStep(0);
    setScore(0);
    setPhase("question");
    setSelectedIdx(null);
    setWasCorrect(false);
  }, []);

  useEffect(() => {
    if (open) {
      prevFocus.current = document.activeElement as HTMLElement;
      reset();
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      prevFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || quiz.length === 0) return null;

  const current = quiz[step];

  const handleAnswer = (idx: number) => {
    if (phase !== "question") return;
    const correct = idx === current.correctShuffled;
    setSelectedIdx(idx);
    setWasCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setPhase("feedback");
  };

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => s + 1);
      setPhase("question");
      setSelectedIdx(null);
    } else {
      saveHistory(quiz.map((q) => q.question));
      setPhase("results");
    }
  };

  const passed = score >= 2;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "hsl(var(--background) / 0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onClick={(e) => e.target === overlayRef.current && onClose()}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Integrator IQ Quiz"
            tabIndex={-1}
            className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl outline-none sm:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={transition}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close quiz"
            >
              <X className="h-5 w-5" />
            </button>

            <h2
              className="mb-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
            >
              Integrator IQ
            </h2>

            {phase !== "results" ? (
              <>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Question {step + 1} of 3
                </p>
                <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={false}
                    animate={{ width: `${((step + (phase === "feedback" ? 1 : 0)) / 3) * 100}%` }}
                    transition={transition}
                  />
                </div>

                <span className="mb-3 inline-block rounded-md bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                  {current.question.categoryLabel}
                </span>

                <p className="mb-5 text-sm leading-relaxed text-foreground sm:text-base">
                  {current.question.prompt}
                </p>

                <div className="space-y-2.5">
                  {current.shuffledOptions.map((opt, idx) => {
                    let variant = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
                    if (phase === "feedback") {
                      if (idx === current.correctShuffled) {
                        variant = "bg-primary text-primary-foreground";
                      } else if (idx === selectedIdx && !wasCorrect) {
                        variant = "bg-destructive/20 text-destructive border border-destructive/40";
                      } else {
                        variant = "bg-secondary/50 text-muted-foreground";
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={phase === "feedback"}
                        className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-default ${variant}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {phase === "feedback" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={transition}
                      className="mt-4 overflow-hidden"
                    >
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        {wasCorrect
                          ? current.question.explanationCorrect
                          : current.question.explanationWrong}
                      </p>
                      <button
                        onClick={handleNext}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {step < 2 ? "Next Question" : "See Results"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="mt-4 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-3xl">
                  {passed ? "🏆" : "🔧"}
                </div>
                <p className="mb-1 text-lg font-bold text-foreground">
                  {score}/3 Correct
                </p>
                <p
                  className="mb-2 text-base font-semibold text-primary"
                  style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                >
                  {passed
                    ? "Certified Smart Building Thinker"
                    : "Call SBI Before You Pull That Cable"}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  {passed
                    ? "Nice work. You understand the infrastructure behind the magic."
                    : "No shame. Better to do it right than do it twice."}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={reset}
                    className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
