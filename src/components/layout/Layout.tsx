import { ReactNode, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IntegratorIQModal from "@/components/IntegratorIQ/IntegratorIQModal";
import { useKeyboardTrigger } from "@/components/IntegratorIQ/useKeyboardTrigger";

const Layout = ({ children }: { children: ReactNode }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  useKeyboardTrigger(openQuiz);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))]">{children}</main>
      <Footer onOpenQuiz={openQuiz} />
      <IntegratorIQModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default Layout;
