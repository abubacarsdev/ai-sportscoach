import { Activity, Clock } from "lucide-react";
import SocialShareButtons from "@/components/shared/SocialShareButtons";

interface MatchCardProps {
  league: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  isLive: boolean;
  stats?: { possession: [number, number]; shots: [number, number]; corners: [number, number] };
}

export default function MatchCard({ league, home, away, homeScore, awayScore, minute, isLive, stats }: MatchCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{league}</span>
        {isLive ? (
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live-pulse" />
            <span className="font-mono-brand text-[10px] font-bold text-primary">{minute}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={12} />
            <span className="text-[10px] font-semibold">{minute}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="flex-1">
          <p className={`text-sm font-bold ${homeScore > awayScore ? "text-foreground" : "text-muted-foreground"}`}>{home}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-foreground px-3 py-1.5">
          <span className="font-mono-brand text-lg font-black text-surface">{homeScore}</span>
          <span className="text-muted-foreground">-</span>
          <span className="font-mono-brand text-lg font-black text-surface">{awayScore}</span>
        </div>
        <div className="flex-1 text-right">
          <p className={`text-sm font-bold ${awayScore > homeScore ? "text-foreground" : "text-muted-foreground"}`}>{away}</p>
        </div>
      </div>

      {stats && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          <StatBar label="Possession" left={stats.possession[0]} right={stats.possession[1]} unit="%" />
          <StatBar label="Shots" left={stats.shots[0]} right={stats.shots[1]} />
          <StatBar label="Corners" left={stats.corners[0]} right={stats.corners[1]} />
        </div>
      )}

      <div className="mt-3 border-t border-border pt-3">
        <SocialShareButtons title={`${home} ${homeScore} - ${awayScore} ${away}`} />
      </div>
    </div>
  );
}

function StatBar({ label, left, right, unit = "" }: { label: string; left: number; right: number; unit?: string }) {
  const total = left + right || 1;
  const leftPct = (left / total) * 100;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-8 text-right font-mono-brand font-bold text-foreground">{left}{unit}</span>
      <div className="flex-1 flex h-1.5 rounded-full overflow-hidden bg-muted">
        <div className="h-full bg-secondary rounded-full" style={{ width: `${leftPct}%` }} />
      </div>
      <span className="w-20 text-center text-muted-foreground font-semibold">{label}</span>
      <div className="flex-1 flex h-1.5 rounded-full overflow-hidden bg-muted justify-end">
        <div className="h-full bg-primary rounded-full" style={{ width: `${100 - leftPct}%` }} />
      </div>
      <span className="w-8 font-mono-brand font-bold text-foreground">{right}{unit}</span>
    </div>
  );
}
