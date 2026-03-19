import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface OddsRow {
  match: string;
  league: string;
  bookmakers: {
    name: string;
    home: number;
    draw: number;
    away: number;
  }[];
  bestOdd: "home" | "draw" | "away";
}

const MOCK_ODDS: OddsRow[] = [
  {
    match: "Arsenal vs Chelsea",
    league: "Premier League",
    bookmakers: [
      { name: "1win", home: 1.85, draw: 3.40, away: 4.20 },
      { name: "Bet365", home: 1.80, draw: 3.50, away: 4.10 },
      { name: "Betway", home: 1.82, draw: 3.30, away: 4.30 },
    ],
    bestOdd: "away",
  },
  {
    match: "Real Madrid vs Barcelona",
    league: "La Liga",
    bookmakers: [
      { name: "1win", home: 2.10, draw: 3.20, away: 3.50 },
      { name: "Bet365", home: 2.05, draw: 3.30, away: 3.40 },
      { name: "Betway", home: 2.15, draw: 3.10, away: 3.60 },
    ],
    bestOdd: "home",
  },
  {
    match: "Bayern vs Dortmund",
    league: "Bundesliga",
    bookmakers: [
      { name: "1win", home: 1.65, draw: 3.80, away: 5.00 },
      { name: "Bet365", home: 1.60, draw: 3.90, away: 4.80 },
      { name: "Betway", home: 1.62, draw: 3.75, away: 5.20 },
    ],
    bestOdd: "away",
  },
];

export default function OddsTable() {
  return (
    <div className="space-y-4">
      {MOCK_ODDS.map((row) => (
        <div key={row.match} className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="border-b border-border bg-muted/50 px-4 py-2.5">
            <p className="text-sm font-bold text-foreground">{row.match}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{row.league}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2 text-left">Bookmaker</th>
                  <th className="px-4 py-2 text-center">Home</th>
                  <th className="px-4 py-2 text-center">Draw</th>
                  <th className="px-4 py-2 text-center">Away</th>
                </tr>
              </thead>
              <tbody>
                {row.bookmakers.map((bk) => {
                  const maxHome = Math.max(...row.bookmakers.map((b) => b.home));
                  const maxDraw = Math.max(...row.bookmakers.map((b) => b.draw));
                  const maxAway = Math.max(...row.bookmakers.map((b) => b.away));
                  return (
                    <tr key={bk.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-foreground">{bk.name}</td>
                      <OddCell value={bk.home} isBest={bk.home === maxHome} />
                      <OddCell value={bk.draw} isBest={bk.draw === maxDraw} />
                      <OddCell value={bk.away} isBest={bk.away === maxAway} />
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
  return (
    <td className="px-4 py-2.5 text-center">
      <span
        className={`inline-block rounded-md px-2.5 py-1 font-mono-brand text-sm font-bold ${
          isBest
            ? "bg-accent/15 text-accent"
            : "text-foreground"
        }`}
      >
        {value.toFixed(2)}
      </span>
    </td>
  );
}
