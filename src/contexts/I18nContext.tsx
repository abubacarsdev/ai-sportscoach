import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type Lang = "en" | "pt" | "es" | "fr";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home",
    live: "Live",
    news: "News",
    odds: "Odds",
    aiTools: "AI Tools",
    trendingNow: "Trending Now",
    allNews: "All News",
    todaysGoldenPicks: "Today's Golden Picks",
    liveMatchCenter: "Live Match Center",
    newsHub: "News & Gossip Hub",
    oddsComparison: "Odds Comparison",
    aiBettingIntel: "AI Betting Intelligence",
    poweredByAI: "Powered by advanced neural networks trained on millions of historical matches.",
    subscribe: "Subscribe",
    globalAlerts: "Global Betting Alerts",
    alertsDesc: "Real-time AI predictions",
    betNowBonus: "Bet Now with 600% Bonus",
    code: "Code",
    share: "Share",
    liveMatches: "Live Matches",
    aiPredictions: "AI Predictions",
    winRate: "Win Rate (AI)",
    usersOnline: "Users Online",
    goldenBets: "Golden Bets of the Day",
    goldenBetsDesc: "AI-curated top picks • Updated daily",
  },
  pt: {
    home: "Início",
    live: "Ao Vivo",
    news: "Notícias",
    odds: "Cotações",
    aiTools: "IA Tools",
    trendingNow: "Em Alta Agora",
    allNews: "Todas Notícias",
    todaysGoldenPicks: "Escolhas de Ouro de Hoje",
    liveMatchCenter: "Central de Jogos Ao Vivo",
    newsHub: "Central de Notícias",
    oddsComparison: "Comparação de Cotações",
    aiBettingIntel: "Inteligência de Apostas IA",
    poweredByAI: "Alimentado por redes neurais avançadas treinadas em milhões de partidas históricas.",
    subscribe: "Inscrever-se",
    globalAlerts: "Alertas Globais de Apostas",
    alertsDesc: "Previsões de IA em tempo real",
    betNowBonus: "Aposte Agora com Bônus de 600%",
    code: "Código",
    share: "Compartilhar",
    liveMatches: "Jogos Ao Vivo",
    aiPredictions: "Previsões IA",
    winRate: "Taxa de Acerto (IA)",
    usersOnline: "Usuários Online",
    goldenBets: "Apostas de Ouro do Dia",
    goldenBetsDesc: "Seleções da IA • Atualizado diariamente",
  },
  es: {
    home: "Inicio",
    live: "En Vivo",
    news: "Noticias",
    odds: "Cuotas",
    aiTools: "IA Tools",
    trendingNow: "Tendencias Ahora",
    allNews: "Todas las Noticias",
    todaysGoldenPicks: "Selecciones de Oro de Hoy",
    liveMatchCenter: "Centro de Partidos en Vivo",
    newsHub: "Centro de Noticias",
    oddsComparison: "Comparación de Cuotas",
    aiBettingIntel: "Inteligencia de Apuestas IA",
    poweredByAI: "Impulsado por redes neuronales avanzadas entrenadas con millones de partidos históricos.",
    subscribe: "Suscribirse",
    globalAlerts: "Alertas Globales de Apuestas",
    alertsDesc: "Predicciones de IA en tiempo real",
    betNowBonus: "Apuesta Ahora con Bono del 600%",
    code: "Código",
    share: "Compartir",
    liveMatches: "Partidos en Vivo",
    aiPredictions: "Predicciones IA",
    winRate: "Tasa de Acierto (IA)",
    usersOnline: "Usuarios Online",
    goldenBets: "Apuestas de Oro del Día",
    goldenBetsDesc: "Selecciones de IA • Actualizado diariamente",
  },
  fr: {
    home: "Accueil",
    live: "En Direct",
    news: "Actualités",
    odds: "Cotes",
    aiTools: "Outils IA",
    trendingNow: "Tendances",
    allNews: "Toutes les Actualités",
    todaysGoldenPicks: "Choix en Or du Jour",
    liveMatchCenter: "Centre des Matchs en Direct",
    newsHub: "Centre d'Actualités",
    oddsComparison: "Comparaison des Cotes",
    aiBettingIntel: "Intelligence de Paris IA",
    poweredByAI: "Propulsé par des réseaux neuronaux avancés entraînés sur des millions de matchs historiques.",
    subscribe: "S'abonner",
    globalAlerts: "Alertes Mondiales de Paris",
    alertsDesc: "Prédictions IA en temps réel",
    betNowBonus: "Pariez Maintenant avec un Bonus de 600%",
    code: "Code",
    share: "Partager",
    liveMatches: "Matchs en Direct",
    aiPredictions: "Prédictions IA",
    winRate: "Taux de Réussite (IA)",
    usersOnline: "Utilisateurs en Ligne",
    goldenBets: "Paris en Or du Jour",
    goldenBetsDesc: "Sélections IA • Mis à jour quotidiennement",
  },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("sportai_lang") as Lang | null;
    if (stored && translations[stored]) return stored;
    const browserLang = navigator.language.slice(0, 2) as Lang;
    return translations[browserLang] ? browserLang : "en";
  });

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem("sportai_lang", l);
  }, []);

  const t = useCallback((key: string) => translations[lang]?.[key] || translations.en[key] || key, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
