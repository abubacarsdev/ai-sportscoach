import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Minus, Loader2 } from "lucide-react";

interface Bookmaker {
  name: string;
  home: number;
  draw: number;
  away: number;
}

interface OddsRow {
  match: string;
  league: string;
  bookmakers: Bookmaker[];
}

const FALLBACK_ODDS: OddsRow[] = [
  {
    match: "Arsenal vs Chelsea",
    league: "Premier League",
    bookmakers: [
      { name: "1win", home: 1.85, draw: 3.40, away: 4.20 },
      { name: "Bet365", home: 1.80, draw: 3.50, away: 4.10 },
    ],
  },
  {
    match: "Real Madrid vs Barcelona",
    league: "La Liga",
    bookmakers: [
      { name: "1win", home: 2.10, draw: 3.20, away: 3.50 },
      { name: "Bet365", home: 2.05, draw: 3.30, away: 3.40 },
    ],
  },
];

export default function OddsTable() {
  const [oddsData, setOddsData] = useState<OddsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;
        if (!apiKey) {
          setOddsData(FALLBACK_ODDS);
          setLoading(false);
          return;
        }

        // Buscamos odds para os jogos do dia (ID 1 é 1X2 market)
        const res = await fetch("https://v3.football.api-sports.io/odds?league=39&season=2025", {
          method: "GET",
          headers: {
            "x-apisports-key": apiKey,
            "x-rapidapi-host": "v3.football.api-sports.io"
          }
        });

        const data = await res.json();

        if (data.response && data.response.length > 0) {
          const formatted = data.response.slice(0, 5).map((m: any) => ({
            match: `${m.fixture.timezone.split('/')[1] || ''} Match`, // Placeholder se nome do time não vier direto
            league: m.league.name,
            bookmakers: m.bookmakers.map((b: any) => {
              const mainMarket = b.bets.find((bet: any) => bet.id === 1);
              return {
                name: b.name,
                home: parseFloat(mainMarket?.values.find((v: any) => v.value === "Home")?.odd || "0"),
                draw: parseFloat(mainMarket?.values.find((v: any) => v.value === "Draw")?.odd || "0"),
                away: parseFloat(mainMarket?.values.find((v: any) => v.value === "Away")?.odd || "0"),
              };
            })
          }));
          setOddsData(formatted);
        } else {
          setOddsData(FALLBACK_ODDS);
        }
      } catch (error) {
        console.error("Erro ao carregar Odds:", error);
        setOddsData(FALLBACK_ODDS);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sincronizando Mercado...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {oddsData.map((row, idx) => (
        <div key={idx} className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <p className="text-sm font-black text-foreground uppercase tracking-tight">{row.match}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{row.league}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[9px] font-black uppercase tracking-widest text-muted-foreground bg-muted/10">
                  <th className="px-4 py-3 text-left">Bookmaker</th>
                  <th className="px-4 py-3 text-center">Casa</th>
                  <th className="px-4 py-3 text-center">Empate</th>
                  <th className="px-4 py-3 text-center">Fora</th>
                </tr>
              </thead>
              <tbody>
                {row.bookmakers.slice(0, 3).map((bk) => {
                  const maxHome = Math.max(...row.bookmakers.map((b) => b.home));
                  const maxDraw = Math.max(...row.bookmakers.map((b) => b.draw));
                  const maxAway = Math.max(...row.bookmakers.map((b) => b.away));
                  
                  return (
                    <tr key={bk.name} className="border-b border-border last:border-0 hover:bg-emerald-500/[0.02] transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${bk.name.toLowerCase().includes('1win') ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                        {bk.name}
                      </td>
                      <OddCell value={bk.home} isBest={bk.home === maxHome && bk.home > 0} />
                      <OddCell value={bk.draw} isBest={bk.draw === maxDraw && bk.draw > 0} />
                      <OddCell value={bk.away} isBest={bk.away === maxAway && bk.away > 0} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function OddCell({ value, isBest }: { value: number; isBest: boolean }) {
  if (value === 0) return <td className="px-4 py-3 text-center text-muted-foreground/30">-</td>;
  
  return (
    <td className="px-4 py-3 text-center">
      <span
        className={`inline-block rounded px-2.5 py-1 font-mono text-xs font-black transition-all ${
          isBest
            ? "bg-emerald-500 text-white shadow-sm scale-105"
            : "bg-muted/50 text-foreground"
        }`}
      >
        {value.toFixed(2)}
      </span>
    </td>
  );
}
