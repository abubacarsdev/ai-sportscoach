import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldAlert, Zap, TrendingUp, Trophy } from "lucide-react";

const RISK_LEVELS = [
  { id: "low", label: "Safe", color: "text-accent", bg: "bg-accent/10", icon: ShieldAlert },
  { id: "med", label: "Balanced", bg: "bg-warning/10", color: "text-warning", icon: Zap },
  { id: "high", label: "Aggressive", bg: "bg-primary/10", color: "text-primary", icon: TrendingUp },
];

const MOCK_SLIP = [
  { match: "Arsenal vs Chelsea", pick: "Arsenal Win", odd: 1.85, confidence: 82 },
  { match: "Bayern vs Dortmund", pick: "Over 2.5", odd: 1.72, confidence: 78 },
  { match: "PSG vs Lyon", pick: "BTTS Yes", odd: 1.90, confidence: 71 },
];

export default function BetSlipGenerator() {
  const [risk, setRisk] = useState("med");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
    }, 1500);
  };

  const totalOdd = MOCK_SLIP.reduce((acc, s) => acc * s.odd, 1);

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary p-2.5">
          <Sparkles size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground">AI Slip Generator</h3>
          <p className="text-xs text-muted-foreground">Neural-engine optimized parlays</p>
        </div>
      </div>

      {/* Risk selector */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
          Risk Profile
        </label>
        <div className="grid grid-cols-3 gap-3">
          {RISK_LEVELS.map((level) => {
            const Icon = level.icon;
            const active = risk === level.id;
            return (
              <button
                key={level.id}
                onClick={() => { setRisk(level.id); setGenerated(false); }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                  active ? `border-primary ${level.bg}` : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <Icon size={20} className={active ? level.color : "text-muted-foreground"} />
                <span className={`text-xs font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {level.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="group relative mt-4 w-full overflow-hidden rounded-xl bg-foreground py-4 font-bold text-surface transition-transform active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles size={16} />
                </motion.div>
                Analyzing Markets...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate AI Prediction
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-warning opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>

      {/* Generated slip */}
      {generated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              AI Generated Slip
            </span>
            <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5">
              <Trophy size={12} className="text-accent" />
              <span className="font-mono-brand text-xs font-bold text-accent">{totalOdd.toFixed(2)}x</span>
            </div>
          </div>

          {MOCK_SLIP.map((pick) => (
            <div key={pick.match} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-xs font-bold text-foreground">{pick.match}</p>
                <p className="text-[10px] text-muted-foreground">{pick.pick}</p>
              </div>
              <div className="text-right">
                <p className="font-mono-brand text-sm font-bold text-foreground">{pick.odd}</p>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-10 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${pick.confidence}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-accent">{pick.confidence}%</span>
                </div>
              </div>
            </div>
          ))}

          {/* Affiliate CTA */}
          <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 mt-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-primary mb-1.5">Partner Bonus</p>
            <p className="text-sm text-foreground">
              Boost these odds by <span className="font-bold text-primary">600%</span> on your first deposit.
            </p>
            <div className="mt-2 rounded-lg border border-border bg-surface px-3 py-2 text-center font-mono-brand text-xs font-bold text-primary">
              PROMO: WINBIG600
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
