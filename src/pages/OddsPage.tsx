import OddsTable from "@/components/modules/odds/OddsTable";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import SEOHead from "@/components/shared/SEOHead";

export default function OddsPage() {
  // Puxamos a chave para garantir que o componente OddsTable a receba se necessário
  const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;

  return (
    <div className="container py-6 space-y-6">
      <SEOHead 
        title="Real-Time Odds Comparison" 
        description="Compare betting odds from top bookmakers worldwide. Real-time updates for football, basketball, and more." 
        path="/odds" 
      />
      
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tighter">Comparação de Odds</h1>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-70">Inteligência de Mercado em Tempo Real</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-500 uppercase">Atualizado a cada 60s</span>
        </div>
      </div>

      <AffiliateBanner variant="inline" />
      
      {/* O OddsTable é onde a mágica acontece. Se a chave não existir, ele usará Backup */}
      <OddsTable />
      
      <AffiliateBanner variant="hero" />
    </div>
  );
}
