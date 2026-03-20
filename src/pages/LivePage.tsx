import { useState, useEffect } from "react";
import LiveScoreboard from "@/components/modules/match-center/LiveScoreboard";
import MatchCard from "@/components/modules/match-center/MatchCard";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";

// Dados de backup (só aparecem se a API falhar)
const FALLBACK_MATCHES = [
  { league: "Premier League", home: "Arsenal", away: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", isLive: true, stats: { possession: [58, 42] as [number, number], shots: [14, 8] as [number, number], corners: [6, 3] as [number, number] } },
  { league: "La Liga", home: "Real Madrid", away: "Barcelona", homeScore: 1, awayScore: 1, minute: "45+2'", isLive: true, stats: { possession: [45, 55] as [number, number], shots: [10, 12] as [number, number], corners: [4, 5] as [number, number] } },
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
              possession: [50, 50], // Estatísticas detalhadas exigem chamada extra, fixamos 50/50 para performance
              shots: [0, 0],
              corners: [0, 0]
            }
          }));
          setMatches(liveData);
        } else {
          setMatches(FALLBACK_MATCHES);
        }
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
        setMatches(FALLBACK_MATCHES);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SEOHead title="Live Match Center" description="Real-time live scores, minute-by-minute updates, and match statistics from leagues worldwide." path="/live" />
      <LiveScoreboard />
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-foreground">{t("liveMatchCenter")}</h1>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-live-pulse" />
            <span className="text-xs font-bold text-primary">
              {loading ? "..." : matches.length} {t("live")}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {matches.map((match, i) => (
              <MatchCard key={i} {...match} />
            ))}
          </div>
        )}

        <AffiliateBanner variant="inline" />
      </div>
    </div>
  );
}
