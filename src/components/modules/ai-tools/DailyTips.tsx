import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Flame } from "lucide-react";

const TIPS = [
  { match: "Arsenal vs Chelsea", tip: "Arsenal Win & Over 1.5", odd: 2.40, confidence: 88, tier: "gold" },
  { match: "Bayern vs Dortmund", tip: "Both Teams to Score", odd: 1.72, confidence: 85, tier: "gold" },
  { match: "PSG vs Lyon", tip: "Over 2.5 Goals", odd: 1.90, confidence: 79, tier: "silver" },
  { match: "AC Milan vs Inter", tip: "Draw", odd: 3.20, confidence: 65, tier: "bronze" },
];

const TIER_STYLES = {
  gold: { bg: "bg-warning/10", border: "border-warning/30", icon: Trophy, color: "text-warning" },
  silver: { bg: "bg-muted", border: "border-border", icon: Star, color: "text-muted-foreground" },
  bronze: { bg: "bg-muted/50", border: "border-border", icon: Star, color: "text-muted-foreground" },
};

export default function DailyTips() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-warning p-2.5">
          <Flame size={20} className="text-warning-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground">Golden Bets of the Day</h3>
          <p className="text-xs text-muted-foreground">AI-curated top picks • Updated daily</p>
        </div>
      </div>

      <div className="space-y-3">
        {TIPS.map((tip, i) => {
          const style = TIER_STYLES[tip.tier as keyof typeof TIER_STYLES];
          const Icon = style.icon;
          return (
            <motion.div
              key={tip.match}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center justify-between rounded-xl border ${style.border} ${style.bg} p-4`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={style.color} />
                <div>
                  <p className="text-xs font-bold text-foreground">{tip.match}</p>
                  <p className="text-[10px] text-muted-foreground">{tip.tip}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono-brand text-sm font-bold text-foreground">{tip.odd}</p>
                <p className="text-[10px] font-bold text-accent">{tip.confidence}% conf.</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
