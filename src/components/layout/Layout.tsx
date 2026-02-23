import { ReactNode, useState, useCallback, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IntegratorIQModal from "@/components/IntegratorIQ/IntegratorIQModal";
import { useKeyboardTrigger } from "@/components/IntegratorIQ/useKeyboardTrigger";
import CableRunnerGame from "@/components/CableRunner/CableRunnerGame";
import { useGameKeyboardTrigger } from "@/components/CableRunner/useGameKeyboardTrigger";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useSignalIntegrityTrigger } from "@/components/SignalIntegrity/useSignalIntegrityTrigger";
import { playMechanicalLock } from "@/components/SignalIntegrity/audioUtils";

const SystemOverrideModal = lazy(() => import("@/components/SystemOverride/SystemOverrideModal"));
const SignalIntegrityGame = lazy(() => import("@/components/SignalIntegrity/SignalIntegrityGame"));

const Layout = ({ children }: { children: ReactNode }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [signalOpen, setSignalOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const openGame = useCallback(() => setGameOpen(true), []);
  const openOverride = useCallback(() => setOverrideOpen(true), []);
  const openSignal = useCallback(() => {
    playMechanicalLock();
    setSignalOpen(true);
  }, []);
  useKeyboardTrigger(openQuiz);
  useGameKeyboardTrigger(openGame);
  useKonamiCode(openOverride);
  useSignalIntegrityTrigger(openSignal);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))]">{children}</main>
      <Footer onOpenQuiz={openQuiz} onOpenGame={openGame} />
      <IntegratorIQModal open={quizOpen} onClose={() => setQuizOpen(false)} />
      <CableRunnerGame open={gameOpen} onClose={() => setGameOpen(false)} />
      <Suspense fallback={null}>
        {overrideOpen && (
          <SystemOverrideModal open={overrideOpen} onClose={() => setOverrideOpen(false)} />
        )}
        {signalOpen && (
          <SignalIntegrityGame open={signalOpen} onClose={() => setSignalOpen(false)} />
        )}
      </Suspense>
    </div>
  );
};

export default Layout;
