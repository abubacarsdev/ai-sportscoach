import { Zap, ExternalLink } from "lucide-react";

interface AffiliateBannerProps {
  variant?: "inline" | "hero";
}

export default function AffiliateBanner({ variant = "inline" }: AffiliateBannerProps) {
  if (variant === "hero") {
    return (
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-surface to-warning/10 p-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="rounded-xl bg-primary p-3">
            <Zap size={28} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-foreground">
              Get a <span className="text-primary">600% Crypto Bonus</span> on Your First Deposit
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Join 1win and boost every prediction with the best odds in the market.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95">
              Claim Bonus <ExternalLink size={14} />
            </button>
            <span className="font-mono-brand text-xs font-bold text-primary">Code: WINBIG600</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-dashed border-primary/20 bg-primary/5 px-4 py-3">
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-primary" />
        <span className="text-xs font-bold text-foreground">
          600% Bonus on 1win
        </span>
      </div>
      <span className="font-mono-brand text-[10px] font-bold text-primary">WINBIG600</span>
    </div>
  );
}
