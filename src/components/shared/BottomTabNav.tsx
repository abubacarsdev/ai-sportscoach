import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Newspaper, Sparkles, User } from "lucide-react";

const TABS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/live", label: "Live", icon: Activity },
  { path: "/ai-tools", label: "AI", icon: Sparkles },
  { path: "/news", label: "News", icon: Newspaper },
  { path: "/odds", label: "Odds", icon: User },
];

export default function BottomTabNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${active ? "" : "font-semibold"}`}>
                {tab.label}
              </span>
              {tab.path === "/live" && (
                <span className="absolute -top-0.5 right-0.5 h-2 w-2 rounded-full bg-primary animate-live-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
