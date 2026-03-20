import OddsTable from "@/components/modules/odds/OddsTable";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";
import { BarChart3, Globe } from "lucide-react";

export default function OddsPage() {
  const { t } = useI18n();

  return (
    <div className="bg-background min-h-screen pb-12">
      <SEOHead 
        title="Real-Time Odds Comparison — Market Intelligence" 
        description="Compare as melhores odds das principais casas de apostas mundiais. Atualizações em tempo real para futebol e mercados asiáticos." 
        path="/odds" 
      />
      
      <div className="container py-8 space-y-8">
        
        {/* Header Estratégico */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
               <Globe size={14} className="text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cobertura Internacional</span>
            </div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter leading-none">
              Comparação de Odds
            </h1>
            <p className="text-sm font-medium text-muted-foreground opacity-80 uppercase tracking-tight">
              Análise em tempo real de mercados 1X2 e Handicaps
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 shadow-lg">
            <div className="relative h-2 w-2">
               <span className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
               <span className="relative h-2 w-2 rounded-full bg-emerald-500 block" />
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Sync: 60s</span>
          </div>
        </div>

        {/* Banner de Monetização Rápida (1win) */}
        <AffiliateBanner variant="inline" />
        
        {/* Tabela de Odds Real (Onde ligámos a API-Football) */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 ml-1">
              <BarChart3 size={16} className="text-primary" />
              <h2 className="text-xs font-black uppercase tracking-widest text-foreground">Melhores Cotações do Mercado</h2>
           </div>
           <OddsTable />
        </div>
        
        {/* Banner Hero Final para converter o utilizador que comparou as odds */}
        <div className="pt-4">
           <AffiliateBanner variant="hero" />
        </div>
      </div>
    </div>
  );
}
