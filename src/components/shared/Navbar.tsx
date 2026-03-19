import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Newspaper, BarChart3, Sparkles, Globe, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: Activity },
  { path: "/live", label: "Live", icon: Activity },
  { path: "/news", label: "News", icon: Newspaper },
  { path: "/odds", label: "Odds", icon: BarChart3 },
  { path: "/ai-tools", label: "AI Tools", icon: Sparkles },
];

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

export default function Navbar() {
  const location = useLocation();
  const [lang, setLang] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Activity size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">
            SPORT<span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-0.5 rounded-lg border border-border p-0.5 md:flex">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-md px-2 py-1 text-xs font-bold transition-colors ${
                  lang === l.code
                    ? "bg-foreground text-surface"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface p-4 md:hidden">
          <div className="flex flex-wrap gap-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold ${
                  lang === l.code
                    ? "bg-foreground text-surface"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
