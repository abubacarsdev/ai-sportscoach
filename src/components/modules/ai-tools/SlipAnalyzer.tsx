import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, Sparkles, Loader2 } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

export default function SlipAnalyzer() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { config } = useAppConfig();

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setAnalyzed(false);

    try {
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      const prompt = `Analyze these football matches: "${input}". 
      For each match, decide if it's a "Value Bet" or a "Trap Game". 
      Provide a logical reason and a total risk score from 1 to 10.
      Return ONLY a JSON object: 
      {"matches": [{"match": "Team A vs Team B", "verdict": "value", "label": "Value Bet", "reason": "Reason here"}], "totalRisk": 6.5}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      const jsonStr = textResponse.match(/\{.*\}/s)[0];
      const result = JSON.parse(jsonStr);
      
      setAnalysis(result.matches);
      setRiskScore(result.totalRisk);
      setAnalyzed(true);
    } catch (err) {
      console.error("Erro na análise IA:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-secondary p-2.5 shadow-lg shadow-secondary/20">
          <Search size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-foreground uppercase tracking-tighter">AI Slip Analyzer</h3>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Detector de Armadilhas & Valor</p>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => { setInput(e.target.value); setAnalyzed(false); }}
        placeholder="Cole seus jogos aqui (ex: Benfica vs Porto, Man City vs Liverpool)..."
        className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none font-medium"
        rows={3}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !input.trim()}
        className="mt-3 w-full rounded-xl bg-secondary py-4 text-xs font-black text-white uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-secondary/90 shadow-lg shadow-secondary/10"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processando Dados Neurais...
          </div>
        ) : "Analisar Meu Bilhete"}
      </button>

      {analyzed && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <Sparkles size={14} className="text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Relatório de Risco AI</span>
          </div>

          {analysis.map((item, i) => (
            <div key={i} className={`rounded-xl border border-border p-4 ${item.verdict === 'value' ? 'bg-emerald-500/5' : 'bg-primary/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-foreground uppercase tracking-tight">{item.match}</span>
                <div className={`flex items-center gap-1.5 ${item.verdict === 'value' ? 'text-emerald-500' : 'text-primary'}`}>
                  {item.verdict === 'value' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic">"{item.reason}"</p>
            </div>
          ))}

          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pontuação de Risco Geral</span>
              <span className="font-mono text-xl font-black text-warning">{riskScore}/10</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-warning to-primary transition-all duration-1000" 
                style={{ width: `${riskScore * 10}%` }} 
              />
            </div>
            <p className="mt-3 text-[9px] text-center text-slate-500 uppercase font-bold tracking-tighter">
              Análise baseada em algoritmos de probabilidade e estatísticas recentes
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
              }
