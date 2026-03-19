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

const DEFAULT_CONFIG: AppConfig = {
  affiliateUrl: "https://1win.com/?ref=sportai",
  promoCode: "WINBIG600",
  geminiApiKey: "",
  sportsApiKey: "",
  newsApiKey: "",
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
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
});

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const stored = localStorage.getItem("sportai_config");
      return stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const updateConfig = (updates: Partial<AppConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("sportai_config", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AppConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export const useAppConfig = () => useContext(AppConfigContext);
