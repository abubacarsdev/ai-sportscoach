import { Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  time: string;
  image?: string;
  trending?: boolean;
  large?: boolean;
}

export default function NewsCard({ title, excerpt, category, time, trending, large }: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-lg ${
        large ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image placeholder */}
      <div className={`relative bg-gradient-to-br from-secondary/20 to-primary/10 ${large ? "h-48 md:h-64" : "h-32"}`}>
        {trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1">
            <TrendingUp size={12} className="text-primary-foreground" />
            <span className="text-[10px] font-black uppercase text-primary-foreground">Trending</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 rounded-md bg-foreground/80 px-2 py-0.5">
          <span className="text-[10px] font-bold uppercase text-surface">{category}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors leading-tight ${
          large ? "text-lg md:text-xl" : "text-sm"
        }`}>
          {title}
        </h3>
        <p className={`mt-1.5 text-muted-foreground leading-relaxed ${large ? "text-sm" : "text-xs"} line-clamp-2`}>
          {excerpt}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-muted-foreground">
          <Clock size={12} />
          <span className="text-[10px] font-semibold">{time}</span>
        </div>
      </div>
    </motion.article>
  );
}
