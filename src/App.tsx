import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { I18nProvider } from "@/contexts/I18nContext";
import AppLayout from "@/components/shared/AppLayout";
import HomePage from "@/pages/HomePage";
import LivePage from "@/pages/LivePage";
import NewsPage from "@/pages/NewsPage";
import OddsPage from "@/pages/OddsPage";
import AIToolsPage from "@/pages/AIToolsPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AppConfigProvider>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/live" element={<LivePage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/odds" element={<OddsPage />} />
                  <Route path="/ai-tools" element={<AIToolsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </I18nProvider>
      </AppConfigProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
