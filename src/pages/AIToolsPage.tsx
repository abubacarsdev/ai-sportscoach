import BetSlipGenerator from "@/components/modules/ai-tools/BetSlipGenerator";
import SlipAnalyzer from "@/components/modules/ai-tools/SlipAnalyzer";
import DailyTips from "@/components/modules/ai-tools/DailyTips";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import AffiliateCTA from "@/components/shared/AffiliateCTA";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";
import { Sparkles, BrainCircuit, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function AIToolsPage() {
  const { t } = useI18n();

  return (
    <div className="bg-background min-h-screen pb-12">
      <SEOHead 
        title="AI Betting Intelligence — Neural Predictions" 
        description="Optimize your bets with our Neural Engine. Generate parlays, analyze risk, and find value bets using advanced AI." 
        path="/ai-tools" 
      />

      <div className="container py-8 space-y-10">
        
        {/* Header de Alto Impacto */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 border border-primary/20">
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Próxima Geração de Apostas</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tighter leading-none">
            {t("aiBettingIntel")}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            {t("poweredByAI")}. Processamos milhões de pontos de dados para transformar o seu instinto em lucro matemático.
          </p>
        </header>

        {/* Banner de Boas-Vindas / Promoção */}
        <AffiliateBanner variant="hero" />

        {/* Grid Principal das Ferramentas */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Lado Esquerdo: Geração de Bilhetes */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 ml-1">
              <Zap size={18} className="text-emerald-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Gerador de Bilhetes Neurais</h2>
            </div>
            <BetSlipGenerator />
            <div className="rounded-2xl border border-border bg-surface/50 p-1">
               <AffiliateCTA />
            </div>
          </div>

          {/* Lado Direito: Análise de Risco */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 ml-1">
              <BarChart3 size={18} className="text-primary" />
              <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Detector de Armadilhas (Trap)</h2>
            </div>
            <SlipAnalyzer />
            <div className="rounded-2xl border border-border bg-surface/50 p-1">
               <AffiliateCTA />
            </div>
          </div>
        </div>

        {/* Secção Inferior: Dicas Diárias de Elite */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 ml-1">
            <BrainCircuit size={18} className="text-warning" />
            <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Prognósticos de Alta Confiança</h2>
          </div>
          <DailyTips />
        </section>

        {/* Banner Final de Rodapé */}
        <div className="pt-6">
          <AffiliateBanner variant="inline" />
        </div>
      </div>
    </div>
  );
      }
