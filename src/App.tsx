import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NetworkInfrastructure from "./pages/services/NetworkInfrastructure";
import WirelessMobility from "./pages/services/WirelessMobility";
import SecurityAccess from "./pages/services/SecurityAccess";
import AudioVisual from "./pages/services/AudioVisual";
import Services from "./pages/Services";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/network-infrastructure" element={<NetworkInfrastructure />} />
            <Route path="/services/wireless-mobility" element={<WirelessMobility />} />
            <Route path="/services/security-access" element={<SecurityAccess />} />
            <Route path="/services/audio-visual" element={<AudioVisual />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
