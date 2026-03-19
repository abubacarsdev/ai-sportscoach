import NewsCard from "@/components/modules/news/NewsCard";
import AffiliateBanner from "@/components/modules/ads/AffiliateBanner";
import NativeAdSlot from "@/components/shared/NativeAdSlot";
import GlobalAlertSignup from "@/components/shared/GlobalAlertSignup";

const ALL_NEWS = [
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
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-black text-foreground">News & Gossip Hub</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {ALL_NEWS.slice(0, 3).map((news, i) => (
          <NewsCard key={i} {...news} large={i === 0} />
        ))}
      </div>

      <NativeAdSlot slot="feed" />
      <AffiliateBanner variant="inline" />

      <div className="grid gap-4 md:grid-cols-3">
        {ALL_NEWS.slice(3).map((news, i) => (
          <NewsCard key={i + 3} {...news} />
        ))}
      </div>

      <NativeAdSlot slot="article" />
      <GlobalAlertSignup />
      <AffiliateBanner variant="hero" />
    </div>
  );
}
