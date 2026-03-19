import LiveScoreboard from "@/components/modules/match-center/LiveScoreboard";
import NewsCard from "@/components/modules/news/NewsCard";
import DailyTips from "@/components/modules/ai-tools/DailyTips";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import GlobalAlertSignup from "@/components/shared/GlobalAlertSignup";
import NativeAdSlot from "@/components/shared/NativeAdSlot";
import SEOHead from "@/components/shared/SEOHead";
import { ArrowRight, Sparkles, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const TRENDING_NEWS = [
  { title: "Mbappé Scores Hat-trick in El Clásico Thriller", excerpt: "A stunning display from the French star sealed a dramatic victory under the lights at the Bernabéu.", category: "La Liga", time: "2h ago", trending: true, large: true },
  { title: "Arsenal Close In On Premier League Title", excerpt: "The Gunners moved 5 points clear at the top after a dominant display.", category: "Premier League", time: "3h ago", trending: false },
  { title: "Champions League Draw: Who Faces Who?", excerpt: "The quarter-final draw has thrown up some mouthwatering clashes.", category: "UCL", time: "5h ago", trending: true },
  { title: "Transfer Rumor: Bellingham to PSG?", excerpt: "Reports from France suggest a record-breaking bid is being prepared.", category: "Transfers", time: "1h ago", trending: false },
  { title: "VAR Controversy in Serie A Derby", excerpt: "AC Milan denied a clear penalty in the dying moments of the match.", category: "Serie A", time: "4h ago", trending: false },
];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div>
      <SEOHead title="Home — Live Scores & AI Predictions" description="Global sports scores, AI betting predictions, and real-time odds comparison. Your ultimate sports intelligence platform." path="/" />
      <LiveScoreboard />

      <div className="container py-6 space-y-8">
        <AffiliateBanner variant="hero" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: t("liveMatches"), value: "12", icon: Activity, color: "text-primary" },
            { label: t("aiPredictions"), value: "48", icon: Sparkles, color: "text-secondary" },
            { label: t("winRate"), value: "78%", icon: TrendingUp, color: "text-accent" },
            { label: t("usersOnline"), value: "2.4K", icon: Activity, color: "text-warning" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <Icon size={18} className={stat.color} />
                <p className="mt-2 font-mono-brand text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-foreground">{t("trendingNow")}</h2>
            <Link to="/news" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              {t("allNews")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {TRENDING_NEWS.map((news, i) => (
              <NewsCard key={i} {...news} large={i === 0} />
            ))}
          </div>
        </section>

        <NativeAdSlot slot="feed" />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-foreground">{t("todaysGoldenPicks")}</h2>
            <Link to="/ai-tools" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              {t("aiTools")} <ArrowRight size={14} />
            </Link>
          </div>
          <DailyTips />
        </section>

        <GlobalAlertSignup />
        <AffiliateBanner variant="inline" />
      </div>
    </div>
  );
}
