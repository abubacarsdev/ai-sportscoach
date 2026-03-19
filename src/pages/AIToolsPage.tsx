import BetSlipGenerator from "@/components/modules/ai-tools/BetSlipGenerator";
import SlipAnalyzer from "@/components/modules/ai-tools/SlipAnalyzer";
import DailyTips from "@/components/modules/ai-tools/DailyTips";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";

export default function AIToolsPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-black text-foreground">AI Betting Intelligence</h1>
      <p className="text-sm text-muted-foreground">
        Powered by advanced neural networks trained on millions of historical matches.
      </p>

      <AffiliateBanner variant="hero" />

      <div className="grid gap-6 lg:grid-cols-2">
        <BetSlipGenerator />
        <SlipAnalyzer />
      </div>

      <DailyTips />

      <AffiliateBanner variant="inline" />
    </div>
  );
}
