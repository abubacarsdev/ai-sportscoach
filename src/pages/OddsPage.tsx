import OddsTable from "@/components/modules/odds/OddsTable";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";

export default function OddsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">Odds Comparison</h1>
        <span className="text-xs font-bold text-muted-foreground">Updated every 60s</span>
      </div>

      <AffiliateBanner variant="inline" />
      <OddsTable />
      <AffiliateBanner variant="hero" />
    </div>
  );
}
