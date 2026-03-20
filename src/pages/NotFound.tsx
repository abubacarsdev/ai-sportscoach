import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log para monitorizares no futuro quais os links que as pessoas estão a tentar aceder
    console.error("404 Error: Rota não encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <SEOHead title="404 - Página Não Encontrada" description="A página que procura não existe ou foi movida." path="/404" />
      
      <div className="text-center space-y-6 max-w-md">
        {/* Ícone de Aviso Estilizado */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-surface border border-border shadow-2xl">
            <AlertTriangle size={48} className="text-primary animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-foreground tracking-tighter">404</h1>
          <h2 className="text-xl font-bold text-foreground uppercase tracking-widest">Fora de Jogo!</h2>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            A página <span className="text-primary font-mono bg-primary/5 px-1.5 py-0.5 rounded">{location.pathname}</span> não existe no nosso radar tático.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
          >
            <Home size={14} /> Voltar ao Início
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-xs font-black uppercase tracking-widest text-foreground transition-all hover:bg-muted active:scale-95"
          >
            <ArrowLeft size={14} /> Voltar Atrás
          </button>
        </div>

        <p className="pt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">
          SportAI • Neural Intelligence System
        </p>
      </div>
    </div>
  );
};

export default NotFound;
