import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, XCircle, Sparkles } from "lucide-react";

const MOCK_ANALYSIS = [
  { match: "Arsenal vs Chelsea", verdict: "value", label: "Value Bet", reason: "Arsenal's home form is exceptional. 82% win rate this season.", color: "text-accent", bg: "bg-accent/10", icon: CheckCircle },
  { match: "Real Madrid vs Barcelona", verdict: "trap", label: "Trap Game", reason: "Barcelona's away record masks a key injury to their midfield anchor.", color: "text-primary", bg: "bg-primary/10", icon: AlertTriangle },
  { match: "Bayern vs Dortmund", verdict: "value", label: "Value Bet", reason: "Over 2.5 goals has hit in 9 of last 10 meetings.", color: "text-accent", bg: "bg-accent/10", icon: CheckCircle },
];

export default function SlipAnalyzer() {
  const [input, setInput] = useState("Arsenal vs Chelsea, Real Madrid vs Barcelona, Bayern vs Dortmund");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalyzed(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-secondary p-2.5">
          <Search size={20} className="text-secondary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground">AI Slip Analyzer</h3>
          <p className="text-xs text-muted-foreground">Identify trap games & value bets</p>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setAnalyzed(false); }}
        placeholder="Paste your matches here (one per line or comma separated)..."
        className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
        rows={3}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !input.trim()}
        className="mt-3 w-full rounded-xl bg-secondary py-3.5 text-sm font-bold text-secondary-foreground transition-transform active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? "Analyzing Risk Profile..." : "Analyze My Slip"}
      </button>

      {analyzed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Risk Analysis</span>
          </div>

          {MOCK_ANALYSIS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.match} className={`rounded-xl border border-border p-4 ${item.bg}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-foreground">{item.match}</span>
                  <div className={`flex items-center gap-1 ${item.color}`}>
                    <Icon size={14} />
                    <span className="text-[10px] font-black uppercase">{item.label}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
              </div>
            );
          })}

          <div className="rounded-xl bg-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Overall Risk Score</span>
              <span className="font-mono-brand text-lg font-black text-warning">6.8/10</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-gradient-to-r from-accent via-warning to-primary" style={{ width: "68%" }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
