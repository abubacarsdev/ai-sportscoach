import { Zap, ExternalLink, Gift, Trophy } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";

interface AffiliateBannerProps {
  variant?: "inline" | "hero";
}

export default function AffiliateBanner({ variant = "inline" }: AffiliateBannerProps) {
  const { config } = useAppConfig();

  // Se o admin desligar os banners, respeitamos a decisão
  if (!config.showAffiliateBanners) return null;

  if (variant === "hero") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-slate-900 p-8 shadow-2xl shadow-primary/20 group">
        {/* Efeito de brilho de fundo */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-all group-hover:bg-primary/30" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-lg shadow-primary/40">
            <Trophy size={32} className="text-white animate-bounce" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
              <Zap size={12} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Oferta Exclusiva 1win</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
              Bónus de Boas-Vindas de <span className="text-emerald-500 text-3xl">500%</span>
            </h3>
            <p className="text-sm font-medium text-slate-400 max-w-md">
              Aumente as suas odds e receba bónus em Crypto no seu primeiro depósito com a nossa parceria oficial.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 md:w-auto">
            <a
              href={config.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/20 transition-all hover:bg-emerald-400 active:scale-95 md:w-auto"
            >
              Reclamar Bónus <ExternalLink size={14} />
            </a>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase">Use o Código:</span>
               <span className="font-mono text-sm font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{config.promoCode}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!config.showInlineAds) return null;

  return (
    <a 
      href={config.affiliateUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 px-5 py-4 transition-all hover:bg-emerald-500/10 hover:border-emerald-500"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-emerald-500 p-1.5">
          <Gift size={16} className="text-white" />
        </div>
        <div>
           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Bonus VIP Ativado</p>
           <p className="text-xs font-bold text-foreground">Deposite e ganhe 500% na 1win</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded sm:block">CODE: {config.promoCode}</span>
        <ExternalLink size={14} className="text-muted-foreground" />
      </div>
    </a>
  );
}
