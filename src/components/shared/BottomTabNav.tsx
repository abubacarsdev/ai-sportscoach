import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Newspaper, Sparkles, BarChart3 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const TABS = [
  { path: "/", labelKey: "home", icon: Home },
  { path: "/live", labelKey: "live", icon: Activity },
  { path: "/ai-tools", labelKey: "aiTools", icon: Sparkles },
  { path: "/news", labelKey: "news", icon: Newspaper },
  { path: "/odds", labelKey: "odds", icon: BarChart3 },
];

export default function BottomTabNav() {
  const location = useLocation();
  const { t } = useI18n();

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
                {t(tab.labelKey)}
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
