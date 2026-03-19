import { useState } from "react";
import { Shield, Server, Zap, Settings, BarChart3, Users, Globe, Key, ToggleLeft } from "lucide-react";

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

function InputField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      {type === "textarea" ? (
        <textarea placeholder={placeholder} rows={3} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none" />
      ) : (
        <input type={type} placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary" />
      )}
    </div>
  );
}

function ToggleSwitch({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <button
        onClick={() => setOn(!on)}
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

export default function AdminPage() {
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
            <StatusBadge label="API-Football" status="online" />
            <StatusBadge label="Gemini AI" status="online" />
            <StatusBadge label="News API" status="online" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-6">
            <AdminCard title="Affiliate & Monetization" icon={Zap}>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="1win Affiliate URL" placeholder="https://1win.com/?ref=..." />
                <InputField label="Global Promo Code" placeholder="WINBIG600" />
                <InputField label="AdSense Client ID" placeholder="pub-xxxxxxxxxxxxxxxx" />
                <InputField label="Banner Image URL" placeholder="https://..." />
              </div>
              <div className="mt-4 space-y-2">
                <ToggleSwitch label="Show Affiliate Banners" defaultOn />
                <ToggleSwitch label="Show Inline Ads" defaultOn />
              </div>
            </AdminCard>

            <AdminCard title="API Configuration" icon={Key}>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="API-Football Key" placeholder="xxxxxxxxxxxxxxxx" type="password" />
                <InputField label="News API Key" placeholder="xxxxxxxxxxxxxxxx" type="password" />
                <InputField label="Google Gemini API Key" placeholder="AI-xxxxxxxxxxxxxxxx" type="password" />
                <InputField label="OpenAI API Key (Backup)" placeholder="sk-xxxxxxxxxxxxxxxx" type="password" />
              </div>
            </AdminCard>

            <AdminCard title="AI Engine Tuning" icon={Settings}>
              <InputField label="System Prompt (Gemini)" placeholder="You are a world-class sports betting analyst..." type="textarea" />
              <div className="mt-4 space-y-2">
                <ToggleSwitch label="Auto-Post Daily Tips" defaultOn />
                <ToggleSwitch label="Enable AI Slip Generator" defaultOn />
                <ToggleSwitch label="Enable AI Slip Analyzer" defaultOn />
              </div>
            </AdminCard>

            <AdminCard title="Content Management" icon={Globe}>
              <div className="space-y-2">
                <ToggleSwitch label="Auto-Fetch News Articles" defaultOn />
                <ToggleSwitch label="Enable Transfer Rumors" defaultOn />
                <ToggleSwitch label="Show Match Statistics" defaultOn />
                <ToggleSwitch label="Live Commentary Feed" />
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
