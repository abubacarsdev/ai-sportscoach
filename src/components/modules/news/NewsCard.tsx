import { Clock, TrendingUp, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import SocialShareButtons from "@/components/shared/SocialShareButtons";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  time: string;
  image?: string; // Agora vamos usar esta prop para as imagens reais da GNews
  trending?: boolean;
  large?: boolean;
}

export default function NewsCard({ title, excerpt, category, time, image, trending, large }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      className={`group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ${
        large ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "h-56 md:h-80" : "h-40"}`}>
        {/* Imagem Real da Notícia ou Fallback se não houver */}
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <ImageIcon className="text-slate-700 h-10 w-10" />
          </div>
        )}

        {/* Overlay para melhorar leitura das tags */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {trending && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 shadow-lg shadow-emerald-500/20">
            <TrendingUp size={10} className="text-white" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Trending</span>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-white">{category}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className={`font-black text-foreground group-hover:text-emerald-500 transition-colors leading-tight uppercase tracking-tighter ${
          large ? "text-xl md:text-2xl" : "text-sm"
        }`}>
          {title}
        </h3>
        
        <p className={`mt-2 text-muted-foreground font-medium leading-relaxed ${large ? "text-sm" : "text-[11px]"} line-clamp-2 opacity-80 italic`}>
          {excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{time}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">Partilhar</span>
             <SocialShareButtons title={title} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
