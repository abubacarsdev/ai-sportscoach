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
    <div className="rounded-xl border border-border bg-surface p-5 transition-all hover:shadow-lg hover:border-emerald-500/20 group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
          {league}
        </span>
        {isLive ? (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-live-pulse" />
            <span className="font-mono text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{minute}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-500 bg-slate-500/10 px-3 py-1 rounded-full border border-slate-500/10">
            <Clock size={10} className="text-slate-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{minute}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 py-2">
        <div className="flex-1 text-center">
          <p className={`text-sm font-black uppercase tracking-tight leading-tight ${homeScore > awayScore ? "text-foreground" : "text-muted-foreground opacity-70"}`}>
            {home}
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 shadow-inner">
          <span className="font-mono text-xl font-black text-white">{homeScore}</span>
          <span className="text-slate-600 font-bold">:</span>
          <span className="font-mono text-xl font-black text-white">{awayScore}</span>
        </div>

        <div className="flex-1 text-center">
          <p className={`text-sm font-black uppercase tracking-tight leading-tight ${awayScore > homeScore ? "text-foreground" : "text-muted-foreground opacity-70"}`}>
            {away}
          </p>
        </div>
      </div>

      {/* Só mostra as estatísticas se elas existirem e não forem [0,0] */}
      {stats && (stats.possession[0] > 0 || stats.shots[0] > 0) && (
        <div className="mt-5 space-y-2.5 border-t border-border pt-4">
          <StatBar label="Posse" left={stats.possession[0]} right={stats.possession[1]} unit="%" color="bg-emerald-500" />
          <StatBar label="Remates" left={stats.shots[0]} right={stats.shots[1]} color="bg-primary" />
          <StatBar label="Cantos" left={stats.corners[0]} right={stats.corners[1]} color="bg-warning" />
        </div>
      )}

      <div className="mt-4 border-t border-border pt-4 flex items-center justify-between">
        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Partilhar Resultado
        </div>
        <SocialShareButtons title={`${home} ${homeScore} - ${awayScore} ${away} (LIVE)`} />
      </div>
    </div>
  );
}

function StatBar({ label, left, right, unit = "", color = "bg-primary" }: { label: string; left: number; right: number; unit?: string; color?: string }) {
  const total = left + right || 1;
  const leftPct = (left / total) * 100;
  return (
    <div className="flex items-center gap-3 text-[10px]">
      <span className="w-8 text-right font-mono font-black text-foreground">{left}{unit}</span>
      <div className="flex-1 flex h-1.5 rounded-full overflow-hidden bg-slate-800/50 p-[1px]">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${leftPct}%` }} />
      </div>
      <span className="w-16 text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex-1 flex h-1.5 rounded-full overflow-hidden bg-slate-800/50 p-[1px] justify-end">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${100 - leftPct}%` }} />
      </div>
      <span className="w-8 font-mono font-black text-foreground">{right}{unit}</span>
    </div>
  );
}
