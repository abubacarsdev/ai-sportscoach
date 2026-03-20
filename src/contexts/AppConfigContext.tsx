import { createContext, useContext, useState, ReactNode } from "react";

export interface AppConfig {
  affiliateUrl: string;
  promoCode: string;
  geminiApiKey: string;
  sportsApiKey: string;
  newsApiKey: string;
  adsenseScript: string;
  sidebarAdScript: string;
  articleAdScript: string;
  showAffiliateBanners: boolean;
  showInlineAds: boolean;
  autoFetchNews: boolean;
  autoPostTips: boolean;
  enableSlipGenerator: boolean;
  enableSlipAnalyzer: boolean;
}

// 🚀 O SEGREDO DO CEO: Estes são os valores globais e inquebráveis.
// O mundo inteiro vai ver e usar isto, não importa de onde acedam.
const GLOBAL_CONFIG: AppConfig = {
  affiliateUrl: "https://lkzq.cc/2ea7", // O teu link real cravado no código
  promoCode: "MRI2026", // O teu código real
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || "", // Puxa direto da Vercel
  sportsApiKey: import.meta.env.VITE_API_FOOTBALL_KEY || "", // Puxa direto da Vercel
  newsApiKey: import.meta.env.VITE_GNEWS_API_KEY || "", // Puxa direto da Vercel
  adsenseScript: "",
  sidebarAdScript: "",
  articleAdScript: "",
  showAffiliateBanners: true,
  showInlineAds: true,
  autoFetchNews: true,
  autoPostTips: true,
  enableSlipGenerator: true,
  enableSlipAnalyzer: true,
};

interface AppConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
}

const AppConfigContext = createContext<AppConfigContextType>({
  config: GLOBAL_CONFIG,
  updateConfig: () => {},
});

export function AppConfigProvider({ children }: { children: ReactNode }) {
  // Inicializamos sempre com a GLOBAL_CONFIG (Adeus localStorage para os dados críticos)
  const [config, setConfig] = useState<AppConfig>(GLOBAL_CONFIG);

  // Mantemos a função updateConfig para o teu Painel Admin não dar erro visual,
  // mas garantimos que as chaves vitais não se perdem.
  const updateConfig = (updates: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export const useAppConfig = () => useContext(AppConfigContext);
