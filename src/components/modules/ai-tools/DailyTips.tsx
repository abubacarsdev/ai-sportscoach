import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Flame, Loader2 } from "lucide-react";
import SocialShareButtons from "@/components/shared/SocialShareButtons";
import { useI18n } from "@/contexts/I18nContext";

const FALLBACK_TIPS = [
  { match: "Arsenal vs Chelsea", tip: "Arsenal Win & Over 1.5", odd: 2.40, confidence: 88, tier: "gold" },
  { match: "Bayern vs Dortmund", tip: "Both Teams to Score", odd: 1.72, confidence: 85, tier: "gold" },
  { match: "Real Madrid vs Barça", tip: "Over 2.5 Goals", odd: 1.90, confidence: 79, tier: "silver" },
];

const TIER_STYLES = {
  gold: { bg: "bg-warning/10", border: "border-warning/30", icon: Trophy, color: "text-warning" },
  silver: { bg: "bg-slate-500/10", border: "border-slate-500/20", icon: Star, color: "text-slate-400" },
  bronze: { bg: "bg-muted/50", border: "border-border", icon: Star, color: "text-muted-foreground" },
};

export default function DailyTips() {
  const { t } = useI18n();
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateDailyTips = async () => {
      try {
        const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        // Se não houver chave, usamos o plano de emergência imediatamente
        if (!geminiKey) {
          setTips(FALLBACK_TIPS);
          setLoading(false);
          return;
        }

        const prompt = `Generate 4 professional football betting tips for today's top matches. 
        Assign a tier (gold, silver, or bronze) based on confidence. 
        Return ONLY a JSON array with this format: 
        [{"match": "Team A vs Team B", "tip": "Home Win", "odd": 1.80, "confidence": 85, "tier": "gold"}]`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        const jsonStr = textResponse.match(/\[.*\]/s)[0];
        const parsedTips = JSON.parse(jsonStr);
        
        setTips(parsedTips);
      } catch (err) {
        console.error("Erro nas Dicas IA:", err);
        setTips(FALLBACK_TIPS);
      } finally {
        setLoading(false);
      }
    };

    generateDailyTips();
  }, []);

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-warning p-2.5 shadow-lg shadow-warning/20">
          <Flame size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground uppercase tracking-tighter">{t("goldenBets")}</h3>
          <p className="text-[10px] font-bold text-warning uppercase tracking-widest">{t("goldenBetsDesc")}</p>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-warning" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calculando Probabilidades...</p>
          </div>
        ) : (
          tips.map((tip, i) => {
            const style = TIER_STYLES[tip.tier as keyof typeof TIER_STYLES] || TIER_STYLES.silver;
            const Icon = style.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border ${style.border} ${style.bg} p-4 transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${style.bg} border ${style.border}`}>
                      <Icon size={16} className={style.color} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-foreground uppercase tracking-tight">{tip.match}</p>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{tip.tip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-mono text-sm font-black text-foreground">{tip.odd.toFixed(2)}</p>
                      <p className="text-[9px] font-black text-emerald-500 uppercase">{tip.confidence}% Conf.</p>
                    </div>
                    <div className="border-l border-border pl-3">
                       <SocialShareButtons title={`🔥 DICA DE HOJE: ${tip.match} - ${tip.tip} @ ${tip.odd}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
