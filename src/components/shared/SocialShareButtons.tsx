import { useState, useRef, useEffect } from "react";
import { Share2 } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

const SOCIALS = [
  { name: "WhatsApp", color: "bg-[hsl(142,70%,40%)]", getUrl: (t: string, u: string) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { name: "Telegram", color: "bg-[hsl(200,80%,50%)]", getUrl: (t: string, u: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "X", color: "bg-foreground", getUrl: (t: string, u: string) => `https://x.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { name: "Facebook", color: "bg-[hsl(220,70%,45%)]", getUrl: (_t: string, u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "LinkedIn", color: "bg-[hsl(210,70%,40%)]", getUrl: (t: string, u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}` },
];

export default function SocialShareButtons({ title, url }: SocialShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5 text-[10px] font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Share2 size={12} />
        Share
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 z-50 flex items-center gap-1 rounded-lg border border-border bg-surface p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.getUrl(title, shareUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`${s.color} rounded-md px-2 py-1 text-[9px] font-bold text-white transition-opacity hover:opacity-80 whitespace-nowrap`}
            >
              {s.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
