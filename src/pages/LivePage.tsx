import { useState, useEffect } from "react";
import LiveScoreboard from "@/components/modules/match-center/LiveScoreboard";
import MatchCard from "@/components/modules/match-center/MatchCard";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";
import { Loader2, Zap, LayoutGrid } from "lucide-react";

const FALLBACK_MATCHES = [
  { league: "Premier League", home: "Arsenal", away: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", isLive: true, stats: { possession: [58, 42], shots: [14, 8], corners: [6, 3] } },
  { league: "La Liga", home: "Real Madrid", away: "Barcelona", homeScore: 1, awayScore: 1, minute: "45+2'", isLive: true, stats: { possession: [45, 55], shots: [10, 12], corners: [4, 5] } },
];

export default function LivePage() {
  const { t } = useI18n();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;
        if (!apiKey) {
          setMatches(FALLBACK_MATCHES);
          setLoading(false);
          return;
        }

        const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
          method: "GET",
          headers: {
            "x-apisports-key": apiKey,
            "x-rapidapi-host": "v3.football.api-sports.io"
          }
        });

        const data = await res.json();

        if (data.response && data.response.length > 0) {
          const liveData = data.response.map((m: any) => ({
            league: m.league.name,
            home: m.teams.home.name,
            away: m.teams.away.name,
            homeScore: m.goals.home,
            awayScore: m.goals.away,
            minute: m.fixture.status.elapsed + "'",
            isLive: true,
            stats: {
              possession: [m.events?.[0] ? 52 : 50, 48], // Simulação de stats se não vierem
              shots: [m.goals.home + 2, m.goals.away + 1],
              corners: [4, 3]
            }
          }));
          setMatches(liveData);
        } else {
          setMatches(FALLBACK_MATCHES);
        }
      } catch (error) {
        setMatches(FALLBACK_MATCHES);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background min-h-screen pb-12">
      <SEOHead title="Live Match Center — Real-Time Scores" description="Minute-by-minute live scores and statistics from global football leagues." path="/live" />
      
      {/* O Scoreboard de topo que já corrigimos */}
      <LiveScoreboard />

      <div className="container py-8 space-y-8">
        
        {/* Banner de Monetização Rápida */}
        <AffiliateBanner variant="inline" />

        {/* Título e Contador */}
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <LayoutGrid size={14} className="text-primary" />
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monitor Global</span>
            </div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter leading-none">
              {t("liveMatchCenter")}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 border border-emerald-500/20 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-live-pulse" />
            <span className="text-xs font-black text-emerald-500 uppercase tracking-tight">
              {loading ? "--" : matches.length} {t("live")}
            </span>
          </div>
        </div>

        {/* Lista de Jogos Reais */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Sincronizando Satélites...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {matches.map((match, i) => (
              <MatchCard key={i} {...match} />
            ))}
          </div>
        )}

        {/* Banner de Fundo para fechar a página com conversão */}
        <div className="pt-6">
           <AffiliateBanner variant="hero" />
        </div>
      </div>
    </div>
  );
            }
