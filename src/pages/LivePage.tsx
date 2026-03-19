import LiveScoreboard from "@/components/modules/match-center/LiveScoreboard";
import MatchCard from "@/components/modules/match-center/MatchCard";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";

const LIVE_MATCHES = [
  { league: "Premier League", home: "Arsenal", away: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", isLive: true, stats: { possession: [58, 42] as [number, number], shots: [14, 8] as [number, number], corners: [6, 3] as [number, number] } },
  { league: "La Liga", home: "Real Madrid", away: "Barcelona", homeScore: 1, awayScore: 1, minute: "45+2'", isLive: true, stats: { possession: [45, 55] as [number, number], shots: [10, 12] as [number, number], corners: [4, 5] as [number, number] } },
  { league: "Serie A", home: "AC Milan", away: "Inter Milan", homeScore: 0, awayScore: 0, minute: "12'", isLive: true, stats: { possession: [50, 50] as [number, number], shots: [2, 3] as [number, number], corners: [1, 0] as [number, number] } },
  { league: "Bundesliga", home: "Bayern Munich", away: "Dortmund", homeScore: 3, awayScore: 2, minute: "82'", isLive: true, stats: { possession: [62, 38] as [number, number], shots: [18, 11] as [number, number], corners: [7, 4] as [number, number] } },
  { league: "Ligue 1", home: "PSG", away: "Lyon", homeScore: 1, awayScore: 0, minute: "34'", isLive: true, stats: { possession: [65, 35] as [number, number], shots: [9, 4] as [number, number], corners: [5, 1] as [number, number] } },
  { league: "Primeira Liga", home: "Porto", away: "Benfica", homeScore: 2, awayScore: 2, minute: "71'", isLive: true, stats: { possession: [48, 52] as [number, number], shots: [13, 14] as [number, number], corners: [5, 6] as [number, number] } },
];

export default function LivePage() {
  const { t } = useI18n();

  return (
    <div>
      <SEOHead title="Live Match Center" description="Real-time live scores, minute-by-minute updates, and match statistics from leagues worldwide." path="/live" />
      <LiveScoreboard />
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-foreground">{t("liveMatchCenter")}</h1>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-live-pulse" />
            <span className="text-xs font-bold text-primary">{LIVE_MATCHES.length} {t("live")}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {LIVE_MATCHES.map((match, i) => (
            <MatchCard key={i} {...match} />
          ))}
        </div>

        <AffiliateBanner variant="inline" />
      </div>
    </div>
  );
}
