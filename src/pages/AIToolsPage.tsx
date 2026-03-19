import BetSlipGenerator from "@/components/modules/ai-tools/BetSlipGenerator";
import SlipAnalyzer from "@/components/modules/ai-tools/SlipAnalyzer";
import DailyTips from "@/components/modules/ai-tools/DailyTips";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import AffiliateCTA from "@/components/shared/AffiliateCTA";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";

export default function AIToolsPage() {
  const { t } = useI18n();

  return (
    <div className="container py-6 space-y-6">
      <SEOHead title="AI Betting Intelligence" description="Use AI-powered tools to generate optimized bet slips, analyze risk, and discover golden picks of the day." path="/ai-tools" />
      <h1 className="text-2xl font-black text-foreground">{t("aiBettingIntel")}</h1>
      <p className="text-sm text-muted-foreground">{t("poweredByAI")}</p>

      <AffiliateBanner variant="hero" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <BetSlipGenerator />
          <AffiliateCTA />
        </div>
        <div className="space-y-4">
          <SlipAnalyzer />
          <AffiliateCTA />
        </div>
      </div>

      <DailyTips />

      <AffiliateBanner variant="inline" />
    </div>
  );
}
