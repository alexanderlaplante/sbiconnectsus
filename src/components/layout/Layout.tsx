import { ReactNode, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IntegratorIQModal from "@/components/IntegratorIQ/IntegratorIQModal";
import { useKeyboardTrigger } from "@/components/IntegratorIQ/useKeyboardTrigger";
import CableRunnerGame from "@/components/CableRunner/CableRunnerGame";
import { useGameKeyboardTrigger } from "@/components/CableRunner/useGameKeyboardTrigger";

const Layout = ({ children }: { children: ReactNode }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const openGame = useCallback(() => setGameOpen(true), []);
  useKeyboardTrigger(openQuiz);
  useGameKeyboardTrigger(openGame);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))]">{children}</main>
      <Footer onOpenQuiz={openQuiz} onOpenGame={openGame} />
      <IntegratorIQModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <CableRunnerGame open={gameOpen} onClose={() => setGameOpen(false)} />
    </div>
  );
};

export default Layout;
