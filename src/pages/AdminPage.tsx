import { useState } from "react";
import { Shield, Server, Zap, Settings, BarChart3, Users, Globe, Key, Lock, Eye, EyeOff, Code } from "lucide-react";
import { useAppConfig, AppConfig } from "@/contexts/AppConfigContext";

/* ── Mock Login Gate ── */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      onLogin();
    } else {
      setError("Please enter credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="rounded-xl bg-foreground p-3">
            <Lock size={24} className="text-surface" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-foreground">ADMIN ACCESS</h1>
          <p className="text-xs text-muted-foreground">Authorized personnel only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Username</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-foreground py-2.5 text-sm font-bold text-surface transition-transform active:scale-[0.98]">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Reusable sub-components ── */
function AdminCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-muted-foreground" />
        <h3 className="text-sm font-black uppercase tracking-wider text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ConfigInput({ label, placeholder, type = "text", value, onChange }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
      />
    </div>
  );
}

function ConfigTextarea({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none font-mono text-xs"
      />
    </div>
  );
}

function ToggleSwitch({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-accent" : "bg-border"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow transition-transform ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function StatusBadge({ label, status }: { label: string; status: "online" | "offline" }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
      <span className={`h-2 w-2 rounded-full ${status === "online" ? "bg-accent animate-live-pulse" : "bg-destructive"}`} />
      <span className="text-xs font-semibold text-foreground">{label}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono-brand text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

/* ── Main Admin Page ── */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const { config, updateConfig } = useAppConfig();

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  const update = (key: keyof AppConfig, value: string | boolean) => updateConfig({ [key]: value });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-foreground p-2.5">
              <Shield size={20} className="text-surface" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-foreground">COMMAND CENTER</h1>
              <p className="text-xs text-muted-foreground">God-Mode Admin Panel</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge label="API-Football" status={config.sportsApiKey ? "online" : "offline"} />
            <StatusBadge label="Gemini AI" status={config.geminiApiKey ? "online" : "offline"} />
            <StatusBadge label="News API" status={config.newsApiKey ? "online" : "offline"} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            {/* Integrations & API Hub */}
            <AdminCard title="Integrations & API Hub" icon={Key}>
              <div className="grid gap-4 md:grid-cols-2">
                <ConfigInput label="Google Gemini API Key" placeholder="AI-xxxxxxxxxxxxxxxx" type="password" value={config.geminiApiKey} onChange={(v) => update("geminiApiKey", v)} />
                <ConfigInput label="API-Football Key" placeholder="xxxxxxxxxxxxxxxx" type="password" value={config.sportsApiKey} onChange={(v) => update("sportsApiKey", v)} />
                <ConfigInput label="News API Key (GNews)" placeholder="xxxxxxxxxxxxxxxx" type="password" value={config.newsApiKey} onChange={(v) => update("newsApiKey", v)} />
              </div>
            </AdminCard>

            {/* Affiliate & Monetization */}
            <AdminCard title="Affiliate & Monetization" icon={Zap}>
              <div className="grid gap-4 md:grid-cols-2">
                <ConfigInput label="1win Affiliate URL" placeholder="https://1win.com/?ref=..." value={config.affiliateUrl} onChange={(v) => update("affiliateUrl", v)} />
                <ConfigInput label="Global Promo Code" placeholder="WINBIG600" value={config.promoCode} onChange={(v) => update("promoCode", v)} />
              </div>
              <div className="mt-4 space-y-2">
                <ToggleSwitch label="Show Affiliate Banners" on={config.showAffiliateBanners} onToggle={() => update("showAffiliateBanners", !config.showAffiliateBanners)} />
                <ToggleSwitch label="Show Inline Ads" on={config.showInlineAds} onToggle={() => update("showInlineAds", !config.showInlineAds)} />
              </div>
            </AdminCard>

            {/* Ads Management */}
            <AdminCard title="Ads Management" icon={Code}>
              <div className="space-y-4">
                <ConfigTextarea label="News Feed Ad Script (AdSense)" placeholder='<script async src="https://pagead2.googlesyndication.com/..."></script>' value={config.adsenseScript} onChange={(v) => update("adsenseScript", v)} />
                <ConfigTextarea label="Sidebar Ad Script" placeholder="Paste sidebar ad script here..." value={config.sidebarAdScript} onChange={(v) => update("sidebarAdScript", v)} />
                <ConfigTextarea label="In-Article Ad Script" placeholder="Paste in-article ad script here..." value={config.articleAdScript} onChange={(v) => update("articleAdScript", v)} />
              </div>
            </AdminCard>

            {/* AI Engine & Content */}
            <AdminCard title="AI Engine & Content Toggles" icon={Settings}>
              <div className="space-y-2">
                <ToggleSwitch label="Auto-Post Daily Tips" on={config.autoPostTips} onToggle={() => update("autoPostTips", !config.autoPostTips)} />
                <ToggleSwitch label="Enable AI Slip Generator" on={config.enableSlipGenerator} onToggle={() => update("enableSlipGenerator", !config.enableSlipGenerator)} />
                <ToggleSwitch label="Enable AI Slip Analyzer" on={config.enableSlipAnalyzer} onToggle={() => update("enableSlipAnalyzer", !config.enableSlipAnalyzer)} />
                <ToggleSwitch label="Auto-Fetch News Articles" on={config.autoFetchNews} onToggle={() => update("autoFetchNews", !config.autoFetchNews)} />
              </div>
            </AdminCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <AdminCard title="System Health" icon={Server}>
              <div className="space-y-3">
                <Metric label="API Calls (24h)" value="142,802" />
                <Metric label="AI Generations" value="12,440" />
                <Metric label="Affiliate Clicks" value="892" />
                <Metric label="Active Users" value="2,418" />
                <Metric label="Uptime" value="99.97%" />
              </div>
            </AdminCard>
            <AdminCard title="Analytics" icon={BarChart3}>
              <div className="space-y-3">
                <Metric label="Page Views (Today)" value="48,291" />
                <Metric label="Bounce Rate" value="24.3%" />
                <Metric label="Avg. Session" value="4m 32s" />
                <Metric label="Conversion Rate" value="3.8%" />
              </div>
            </AdminCard>
            <AdminCard title="User Management" icon={Users}>
              <div className="space-y-3">
                <Metric label="Total Users" value="18,429" />
                <Metric label="Premium Users" value="2,104" />
                <Metric label="New Today" value="143" />
                <Metric label="Banned" value="12" />
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  );
      }
