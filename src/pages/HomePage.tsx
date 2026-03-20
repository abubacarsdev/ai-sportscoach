import { useState, useEffect } from "react";
import LiveScoreboard from "@/components/modules/match-center/LiveScoreboard";
import NewsCard from "@/components/modules/news/NewsCard";
import DailyTips from "@/components/modules/ai-tools/DailyTips";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import GlobalAlertSignup from "@/components/shared/GlobalAlertSignup";
import NativeAdSlot from "@/components/shared/NativeAdSlot";
import SEOHead from "@/components/shared/SEOHead";
import { ArrowRight, Sparkles, TrendingUp, Activity, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

// Plano de Emergência: Notícias de backup se a API falhar
const FALLBACK_NEWS = [
  { title: "Champions League Quarter-Finals Set", excerpt: "The road to Munich heats up with massive clashes confirmed.", category: "UCL", time: "Now", trending: true, large: true },
  { title: "Premier League Title Race Update", excerpt: "Top three separated by just two points as we enter the final stretch.", category: "Premier League", time: "1h ago", trending: false },
];

export default function HomePage() {
  const { t } = useI18n();
  const [realNews, setRealNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
        if (!apiKey) {
          setRealNews(FALLBACK_NEWS);
          setLoadingNews(false);
          return;
        }

        const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=sports&lang=en&apikey=${apiKey}`);
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          const formatted = data.articles.slice(0, 5).map((article: any, index: number) => ({
            title: article.title,
            excerpt: article.description || "Click to read the full report on this match.",
            category: article.source.name || "Sports",
            time: new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            image: article.image,
            trending: index < 2,
            large: index === 0
          }));
          setRealNews(formatted);
        } else {
          setRealNews(FALLBACK_NEWS);
        }
      } catch (error) {
        setRealNews(FALLBACK_NEWS);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchHomeNews();
  }, []);

  return (
    <div className="bg-background min-h-screen pb-10">
      <SEOHead title="Home — Live Scores & AI Predictions" description="Global sports scores, AI betting predictions, and real-time odds comparison." path="/" />
      
      {/* 1. Placar de Jogos Reais no Topo */}
      <LiveScoreboard />

      <div className="container py-6 space-y-10">
        
        {/* 2. Banner de Boas-Vindas 1win (Monetização) */}
        <AffiliateBanner variant="hero" />

        {/* 3. Dashboard de Estatísticas Rápidas */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: t("liveMatches"), value: "LIVE", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: t("aiPredictions"), value: "PREMIUM", icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
            { label: t("winRate"), value: "84%", icon: TrendingUp, color: "text-warning", bg: "bg-warning/10" },
            { label: t("usersOnline"), value: "3.1K", icon: Activity, color: "text-slate-400", bg: "bg-slate-400/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all ${stat.bg.replace('/10', '/5')}`}
              >
                <div className={`inline-flex p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <p className="mt-4 font-mono text-2xl font-black text-foreground tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Notícias em Destaque (Dinâmicas) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
               <div className="h-6 w-1 bg-primary rounded-full" />
               <h2 className="text-xl font-black text-foreground uppercase tracking-tight">{t("trendingNow")}</h2>
            </div>
            <Link to="/news" className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
              {t("allNews")} <ArrowRight size={14} />
            </Link>
          </div>

          {loadingNews ? (
            <div className="flex justify-center py-20">
               <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {realNews.map((news, i) => (
                <NewsCard key={i} {...news} />
              ))}
            </div>
          )}
        </section>

        <NativeAdSlot slot="feed" />

        {/* 5. Golden Picks (IA Real) */}
        <section className="bg-surface rounded-3xl p-1 border border-border shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <div className="h-6 w-1 bg-warning rounded-full" />
                 <h2 className="text-xl font-black text-foreground uppercase tracking-tight">{t("todaysGoldenPicks")}</h2>
              </div>
              <Link to="/ai-tools" className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-warning hover:text-warning/80 transition-colors">
                {t("aiTools")} <ArrowRight size={14} />
              </Link>
            </div>
            <DailyTips />
          </div>
        </section>

        <GlobalAlertSignup />
        <AffiliateBanner variant="inline" />
      </div>
    </div>
  );
              }
