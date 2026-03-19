import { motion } from "framer-motion";
import { Activity } from "lucide-react";

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

const MOCK_MATCHES: Match[] = [
  { id: "1", league: "Premier League", home: "Arsenal", away: "Chelsea", homeScore: 2, awayScore: 1, minute: "67'", isLive: true },
  { id: "2", league: "La Liga", home: "Real Madrid", away: "Barcelona", homeScore: 1, awayScore: 1, minute: "45+2'", isLive: true },
  { id: "3", league: "Serie A", home: "AC Milan", away: "Inter Milan", homeScore: 0, awayScore: 0, minute: "12'", isLive: true },
  { id: "4", league: "Bundesliga", home: "Bayern Munich", away: "Dortmund", homeScore: 3, awayScore: 2, minute: "82'", isLive: true },
  { id: "5", league: "Ligue 1", home: "PSG", away: "Lyon", homeScore: 1, awayScore: 0, minute: "34'", isLive: true },
];

export default function LiveScoreboard() {
  return (
    <div className="w-full overflow-hidden border-b border-border bg-surface">
      <div className="container py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-live-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-primary">Live Now</span>
          <span className="text-xs font-semibold text-muted-foreground">
            {MOCK_MATCHES.length} matches
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {MOCK_MATCHES.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex min-w-[220px] flex-col rounded-xl border border-border bg-background p-3 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <span className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {match.league}
              </span>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className={`text-sm font-bold ${match.homeScore > match.awayScore ? "text-foreground" : "text-muted-foreground"}`}>
                    {match.home}
                  </span>
                  <span className={`text-sm font-bold ${match.awayScore > match.homeScore ? "text-foreground" : "text-muted-foreground"}`}>
                    {match.away}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono-brand text-lg font-bold text-foreground">{match.homeScore}</span>
                  <span className="font-mono-brand text-lg font-bold text-foreground">{match.awayScore}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live-pulse" />
                <span className="font-mono-brand text-xs font-bold text-primary">{match.minute}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
