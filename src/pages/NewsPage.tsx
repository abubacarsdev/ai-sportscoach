import { useState, useEffect } from "react";
import NewsCard from "@/components/modules/news/NewsCard";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import NativeAdSlot from "@/components/shared/NativeAdSlot";
import GlobalAlertSignup from "@/components/shared/GlobalAlertSignup";
import SEOHead from "@/components/shared/SEOHead";
import { useI18n } from "@/contexts/I18nContext";

// O teu Plano de Emergência: Só aparece se a API falhar, para o site nunca ficar em branco na reunião.
const FALLBACK_NEWS = [
  { title: "Mbappé Scores Hat-trick in El Clásico Thriller", excerpt: "A stunning display from the French star sealed a dramatic victory.", category: "La Liga", time: "2h ago", trending: true },
  { title: "Arsenal Close In On Premier League Title", excerpt: "The Gunners moved 5 points clear at the top.", category: "Premier League", time: "3h ago", trending: false },
  { title: "Champions League Draw: Who Faces Who?", excerpt: "Quarter-final draw has thrown up mouthwatering clashes.", category: "UCL", time: "5h ago", trending: true },
  { title: "Transfer Rumor: Bellingham to PSG?", excerpt: "Reports from France suggest a record-breaking bid.", category: "Transfers", time: "1h ago", trending: false },
  { title: "VAR Controversy in Serie A Derby", excerpt: "AC Milan denied a clear penalty in dying moments.", category: "Serie A", time: "4h ago", trending: false },
  { title: "Bundesliga Title Race Heats Up", excerpt: "Bayern and Dortmund separated by just two points heading into the final stretch.", category: "Bundesliga", time: "6h ago", trending: false },
  { title: "Haaland Breaks Scoring Record", excerpt: "The Norwegian striker netted his 40th goal of the season.", category: "Premier League", time: "7h ago", trending: true },
  { title: "World Cup 2026 Venues Announced", excerpt: "FIFA confirms the final list of host cities across three nations.", category: "International", time: "8h ago", trending: false },
];

export default function NewsPage() {
  const { t } = useI18n();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealNews = async () => {
      try {
        // Vai buscar a chave real que tu colocaste na Vercel
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

        if (!apiKey) {
          console.warn("Chave GNews não encontrada na Vercel. A usar dados de backup.");
          setNews(FALLBACK_NEWS);
          setLoading(false);
          return;
        }

        // Puxa as notícias reais do mundo
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=sports&lang=en&apikey=${apiKey}`);
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          // Transforma os dados reais para o formato do teu design
          const realNews = data.articles.map((article: any, index: number) => ({
            title: article.title,
            excerpt: article.description || "Read full story...",
            category: article.source.name || "Global Sports",
            time: new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            trending: index < 2 // Dá destaque às duas primeiras notícias reais
          }));
          setNews(realNews);
        } else {
          setNews(FALLBACK_NEWS);
        }
      } catch (error) {
        console.error("Erro ao puxar notícias reais:", error);
        setNews(FALLBACK_NEWS); // Se a API falhar, o show continua!
      } finally {
        setLoading(false);
      }
    };

    fetchRealNews();
  }, []);

  return (
    <div className="container py-6 space-y-6">
      <SEOHead title="Sports News & Gossip" description="Latest sports news, transfer rumors, and trending topics from football leagues worldwide." path="/news" />
      <h1 className="text-2xl font-black text-foreground">{t("newsHub")}</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {news.slice(0, 3).map((item, i) => (
              <NewsCard key={i} {...item} large={i === 0} />
            ))}
          </div>

          <NativeAdSlot slot="feed" />
          <AffiliateBanner variant="inline" />

          <div className="grid gap-4 md:grid-cols-3">
            {news.slice(3, 9).map((item, i) => (
              <NewsCard key={i + 3} {...item} />
            ))}
          </div>
        </>
      )}

      <NativeAdSlot slot="article" />
      <GlobalAlertSignup />
      <AffiliateBanner variant="hero" />
    </div>
  );
      }
