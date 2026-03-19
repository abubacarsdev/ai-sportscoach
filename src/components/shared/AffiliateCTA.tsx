import { Zap, ExternalLink } from "lucide-react";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useI18n } from "@/contexts/I18nContext";

export default function AffiliateCTA() {
  const { config } = useAppConfig();
  const { t } = useI18n();

  if (!config.showAffiliateBanners) return null;

  return (
    <a
      href={config.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary py-4 text-sm font-black text-primary-foreground transition-transform active:scale-[0.98]"
    >
      <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary via-warning/30 to-primary opacity-60" />
      <span className="relative z-10 flex items-center gap-2">
        <Zap size={18} className="animate-bounce" />
        {t("betNowBonus")} — {t("code")}: {config.promoCode}
        <ExternalLink size={14} />
      </span>
    </a>
  );
}
