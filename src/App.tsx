import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { useDynamicFavicon } from "./hooks/useDynamicFavicon";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NetworkInfrastructure = lazy(() => import("./pages/services/NetworkInfrastructure"));
const WirelessMobility = lazy(() => import("./pages/services/WirelessMobility"));
const SecurityAccess = lazy(() => import("./pages/services/SecurityAccess"));
const AudioVisual = lazy(() => import("./pages/services/AudioVisual"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Glossary = lazy(() => import("./pages/employees/Glossary"));

const queryClient = new QueryClient();

const AppContent = () => {
  useDynamicFavicon();
  return null;
};

const App = () => (
  <ThemeProvider>
    <AppContent />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/network-infrastructure" element={<NetworkInfrastructure />} />
              <Route path="/services/wireless-mobility" element={<WirelessMobility />} />
              <Route path="/services/security-access" element={<SecurityAccess />} />
              <Route path="/services/audio-visual" element={<AudioVisual />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/employees/glossary" element={<Glossary />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
