import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Eager imports for prerendering (no lazy loading)
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NetworkInfrastructure from "./pages/services/NetworkInfrastructure";
import WirelessMobility from "./pages/services/WirelessMobility";
import SecurityAccess from "./pages/services/SecurityAccess";
import AudioVisual from "./pages/services/AudioVisual";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

const routeMap: Record<string, React.ReactNode> = {
  "/": <Index />,
  "/about": <About />,
  "/contact": <Contact />,
  "/services": <Services />,
  "/services/network-infrastructure": <NetworkInfrastructure />,
  "/services/wireless-mobility": <WirelessMobility />,
  "/services/security-access": <SecurityAccess />,
  "/services/audio-visual": <AudioVisual />,
  "/sitemap": <Sitemap />,
};

export async function prerender(data: { url: string }) {
  const queryClient = new QueryClient();
  const helmetContext: any = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StaticRouter location={data.url}>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </StaticRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );

  // Extract head tags from Helmet
  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title?.toString(),
        helmet.meta?.toString(),
        helmet.link?.toString(),
        helmet.script?.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return {
    html,
    head,
    links: Object.keys(routeMap),
  };
}
