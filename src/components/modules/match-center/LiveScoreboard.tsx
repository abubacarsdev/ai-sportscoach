import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Loader2 } from "lucide-react";

interface Match {
  id: string;
  league: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  isLive: boolean;
}

const FALLBACK_MATCHES: Match[] = [
  { id: "1", league: "Premier League", home: "Arsenal", away: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", isLive: true },
  { id: "2", league: "La Liga", home: "Real Madrid", away: "Barcelona", homeScore: 1, awayScore: 1, minute: "45+2'", isLive: true },
];

export default function LiveScoreboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveScores = async () => {
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
            id: m.fixture.id.toString(),
            league: m.league.name,
            home: m.teams.home.name,
            away: m.teams.away.name,
            homeScore: m.goals.home,
            awayScore: m.goals.away,
            minute: m.fixture.status.elapsed + "'",
            isLive: true
          }));
          setMatches(liveData);
        } else {
          setMatches(FALLBACK_MATCHES);
        }
      } catch (error) {
        console.error("Scoreboard Error:", error);
        setMatches(FALLBACK_MATCHES);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveScores();
    const interval = setInterval(fetchLiveScores, 60000); // Atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-40">
      <div className="container py-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-live-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Now</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
               • {loading ? "..." : matches.length} matches
            </span>
          </div>
          {loading && <Loader2 size={12} className="animate-spin text-muted-foreground" />}
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide select-none">
          {matches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex min-w-[200px] flex-col rounded-xl border border-border bg-background p-3 hover:border-emerald-500/30 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span className="mb-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground truncate max-w-[160px]">
                {match.league}
              </span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                  <span className={`text-xs font-black truncate ${match.homeScore >= match.awayScore ? "text-foreground" : "text-muted-foreground"}`}>
                    {match.home}
                  </span>
                  <span className={`text-xs font-black truncate ${match.awayScore >= match.homeScore ? "text-foreground" : "text-muted-foreground"}`}>
                    {match.away}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 border-l border-border pl-3">
                  <span className="font-mono text-sm font-black text-foreground leading-none">{match.homeScore}</span>
                  <span className="font-mono text-sm font-black text-foreground leading-none">{match.awayScore}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-2">
                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] font-black text-emerald-500 uppercase">{match.minute}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
