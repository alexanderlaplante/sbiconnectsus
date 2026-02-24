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
import { useRackKeywordTrigger } from "@/components/RackAndStack/useRackKeywordTrigger";

const SystemOverrideModal = lazy(() => import("@/components/SystemOverride/SystemOverrideModal"));
const SignalIntegrityGame = lazy(() => import("@/components/SignalIntegrity/SignalIntegrityGame"));
const RackAndStackGame = lazy(() => import("@/components/RackAndStack/RackAndStackGame"));

const Layout = ({ children }: { children: ReactNode }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [signalOpen, setSignalOpen] = useState(false);
  const [rackOpen, setRackOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const openGame = useCallback(() => setGameOpen(true), []);
  const openOverride = useCallback(() => setOverrideOpen(true), []);
  const openSignal = useCallback(() => {
    playMechanicalLock();
    setSignalOpen(true);
  }, []);
  const openRack = useCallback(() => setRackOpen(true), []);
  useKeyboardTrigger(openQuiz);
  useGameKeyboardTrigger(openGame);
  useKonamiCode(openOverride);
  useSignalIntegrityTrigger(openSignal);
  useRackKeywordTrigger(openRack);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenRackGame={openRack} />
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
        {rackOpen && (
          <RackAndStackGame open={rackOpen} onClose={() => setRackOpen(false)} />
        )}
      </Suspense>
    </div>
  );
};

export default Layout;
