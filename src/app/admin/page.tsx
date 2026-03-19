'use client'; // <-- ADICIONADO: Essencial para o Next.js App Router

import { useState } from "react";
import { Shield, Server, Zap, Settings, BarChart3, Users, Globe, Key, Lock, Eye, EyeOff, Code } from "lucide-react";
// Verifica se este caminho está correto no teu GitHub. Se der erro, avisa-me!
import { useAppConfig, AppConfig } from "@/contexts/AppConfigContext";

/* ── Mock Login Gate ── */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // DICA: No futuro, podes mudar o "admin" e "1234" para algo mais seguro
    if (user.trim() === "admin" && pass.trim() === "admin123") {
      onLogin();
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="rounded-xl bg-emerald-500 p-3 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase">Acesso Restrito</h1>
          <p className="text-xs text-slate-400">Painel de Controlo do Proprietário</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Utilizador</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Nome de utilizador"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Senha</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 pr-10 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-xs font-semibold text-red-500 bg-red-500/10 p-2 rounded text-center">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-[0.98] shadow-lg shadow-emerald-500/20">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Componentes de UI (Mantidos do teu original) ── */
function AdminCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-emerald-500" />
        <h3 className="text-sm font-black uppercase tracking-wider text-white">{title}</h3>
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
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </div>
  );
}

function ConfigTextarea({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none font-mono text-[10px]"
      />
    </div>
  );
}

function ToggleSwitch({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-950/50 px-4 py-3 border border-slate-800/50">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      <button
        onClick={onToggle}
        className={`relative h-5 w-10 rounded-full transition-colors ${on ? "bg-emerald-500" : "bg-slate-700"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function StatusBadge({ label, status }: { label: string; status: "online" | "offline" }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${status === "online" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
      <span className="text-[10px] font-bold uppercase text-slate-300">{label}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-800/50 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="font-mono text-xs font-bold text-emerald-400">{value}</span>
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
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500 p-3 shadow-lg shadow-emerald-500/20">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Centro de Comando</h1>
              <p className="text-xs font-bold text-emerald-500 tracking-widest uppercase opacity-80">Painel do Administrador</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusBadge label="API-Football" status={config.sportsApiKey ? "online" : "offline"} />
            <StatusBadge label="Gemini AI" status={config.geminiApiKey ? "online" : "offline"} />
            <StatusBadge label="News API" status={config.newsApiKey ? "online" : "offline"} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <AdminCard title="Conexões de Dados & APIs" icon={Key}>
              <div className="grid gap-6 md:grid-cols-2">
                <ConfigInput label="Gemini AI Key" placeholder="AI-xxxxxxxx" type="password" value={config.geminiApiKey} onChange={(v) => update("geminiApiKey", v)} />
                <ConfigInput label="API-Football Key" placeholder="xxxxxxxx" type="password" value={config.sportsApiKey} onChange={(v) => update("sportsApiKey", v)} />
                <ConfigInput label="GNews API Key" placeholder="xxxxxxxx" type="password" value={config.newsApiKey} onChange={(v) => update("newsApiKey", v)} />
              </div>
            </AdminCard>

            <AdminCard title="Monetização & Afiliados" icon={Zap}>
              <div className="grid gap-6 md:grid-cols-2">
                <ConfigInput label="Link de Afiliado 1win" placeholder="https://1win.com/..." value={config.affiliateUrl} onChange={(v) => update("affiliateUrl", v)} />
                <ConfigInput label="Código Promocional" placeholder="EX: WIN600" value={config.promoCode} onChange={(v) => update("promoCode", v)} />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                <ToggleSwitch label="Mostrar Banners 1win" on={config.showAffiliateBanners} onToggle={() => update("showAffiliateBanners", !config.showAffiliateBanners)} />
                <ToggleSwitch label="Ativar Anúncios Google" on={config.showInlineAds} onToggle={() => update("showInlineAds", !config.showInlineAds)} />
              </div>
            </AdminCard>

            <AdminCard title="Scripts de Publicidade (Google AdSense)" icon={Code}>
              <div className="space-y-6">
                <ConfigTextarea label="Script do Feed de Notícias" placeholder="Cole o código <script> aqui..." value={config.adsenseScript} onChange={(v) => update("adsenseScript", v)} />
                <ConfigTextarea label="Script da Barra Lateral" placeholder="Cole o código aqui..." value={config.sidebarAdScript} onChange={(v) => update("sidebarAdScript", v)} />
              </div>
            </AdminCard>

            <AdminCard title="Automação & Inteligência" icon={Settings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ToggleSwitch label="Auto-Gerar Dicas Diárias" on={config.autoPostTips} onToggle={() => update("autoPostTips", !config.autoPostTips)} />
                <ToggleSwitch label="Gerador de Bilhetes IA" on={config.enableSlipGenerator} onToggle={() => update("enableSlipGenerator", !config.enableSlipGenerator)} />
                <ToggleSwitch label="Analisador de Bilhetes IA" on={config.enableSlipAnalyzer} onToggle={() => update("enableSlipAnalyzer", !config.enableSlipAnalyzer)} />
                <ToggleSwitch label="Publicar Notícias Auto" on={config.autoFetchNews} onToggle={() => update("autoFetchNews", !config.autoFetchNews)} />
              </div>
            </AdminCard>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-8">
            <AdminCard title="Saúde do Sistema" icon={Server}>
              <div className="space-y-4">
                <Metric label="Chamadas API (24h)" value="142.802" />
                <Metric label="Gerações IA" value="12.440" />
                <Metric label="Cliques Afiliado" value="892" />
                <Metric label="Uptime" value="99.98%" />
              </div>
            </AdminCard>
            
            <AdminCard title="Performance" icon={BarChart3}>
              <div className="space-y-4">
                <Metric label="Visualizações Hoje" value="48.291" />
                <Metric label="Taxa de Rejeição" value="24.3%" />
                <Metric label="Tempo Médio" value="4m 32s" />
                <Metric label="Conversão" value="3.8%" />
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  );
}
