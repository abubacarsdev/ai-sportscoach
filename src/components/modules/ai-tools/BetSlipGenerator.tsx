import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldAlert, Zap, TrendingUp, Trophy, AlertCircle } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

const RISK_LEVELS = [
  { id: "low", label: "Safe", color: "text-accent", bg: "bg-accent/10", icon: ShieldAlert },
  { id: "med", label: "Balanced", bg: "bg-warning/10", color: "text-warning", icon: Zap },
  { id: "high", label: "Aggressive", bg: "bg-primary/10", color: "text-primary", icon: TrendingUp },
];

export default function BetSlipGenerator() {
  const [risk, setRisk] = useState("med");
  const [generatedSlip, setGeneratedSlip] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useAppConfig();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!geminiKey) {
        throw new Error("AI Engine not configured");
      }

      // 🤖 PROMPT PARA O GEMINI: Ele vai inventar um bilhete baseado no risco
      // Numa fase futura, podes passar os jogos REAIS da API-Football aqui para ele escolher
      const prompt = `Generate a sports betting parlay with 3 matches for a ${risk} risk profile. 
      Return ONLY a JSON array with this format: 
      [{"match": "Team A vs Team B", "pick": "Winner A", "odd": 1.50, "confidence": 85}]`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Limpa a resposta para garantir que é um JSON válido
      const jsonStr = textResponse.match(/\[.*\]/s)[0];
      const parsedSlip = JSON.parse(jsonStr);
      
      setGeneratedSlip(parsedSlip);
    } catch (err) {
      console.error("AI Error:", err);
      setError("AI Engine busy. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const totalOdd = generatedSlip.reduce((acc, s) => acc * s.odd, 1);

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-lg shadow-primary/5">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary p-2.5 shadow-lg shadow-primary/20">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground uppercase tracking-tighter">AI Slip Generator</h3>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Neural Intelligence Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
          Selecione o Perfil de Risco
        </label>
        <div className="grid grid-cols-3 gap-3">
          {RISK_LEVELS.map((level) => {
            const Icon = level.icon;
            const active = risk === level.id;
            return (
              <button
                key={level.id}
                onClick={() => { setRisk(level.id); setGeneratedSlip([]); }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                  active ? `border-primary ${level.bg}` : "border-border hover:border-muted-foreground/30 bg-muted/20"
                }`}
              >
                <Icon size={20} className={active ? level.color : "text-slate-500"} />
                <span className={`text-[10px] font-black uppercase ${active ? "text-foreground" : "text-slate-500"}`}>
                  {level.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="group relative mt-4 w-full overflow-hidden rounded-xl bg-foreground py-4 font-black text-surface transition-all active:scale-[0.98] shadow-xl shadow-foreground/10"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
            {loading ? (
              <>
                <LoaderIcon /> Analyzing Live Markets...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Gerar Prognóstico IA
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-red-500 border border-red-500/20">
          <AlertCircle size={14} />
          <p className="text-[10px] font-bold uppercase">{error}</p>
        </div>
      )}

      {generatedSlip.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Bilhete Gerado por IA
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
              <Trophy size={12} className="text-emerald-500" />
              <span className="font-mono text-xs font-black text-emerald-500">{totalOdd.toFixed(2)}x</span>
            </div>
          </div>

          {generatedSlip.map((pick, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-muted/10 p-4 transition-hover hover:border-primary/30">
              <div>
                <p className="text-xs font-black text-foreground uppercase">{pick.match}</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase">{pick.pick}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-black text-foreground">{pick.odd.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-1 w-8 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pick.confidence}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-500">{pick.confidence}%</span>
                </div>
              </div>
            </div>
          ))}

          {/* Banner de Conversão 1win */}
          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5 mt-6 relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Bónus de Ativação</p>
               <p className="text-sm font-bold text-foreground leading-tight">
                 Ganhe <span className="text-emerald-500">500% de bónus</span> ao apostar este bilhete na 1win.
               </p>
               <a 
                 href={config.affiliateUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-3 inline-block w-full rounded-lg bg-primary py-2.5 text-center text-[10px] font-black text-white uppercase tracking-widest hover:bg-primary/90 transition-colors"
               >
                 Apostar agora com Promo: {config.promoCode}
               </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function LoaderIcon() {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
      <Sparkles size={16} />
    </motion.div>
  );
              }
