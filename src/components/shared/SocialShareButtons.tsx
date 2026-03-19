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
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className="flex items-center gap-1.5">
      <Share2 size={12} className="text-muted-foreground" />
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.getUrl(title, shareUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.color} rounded-md px-2 py-1 text-[9px] font-bold text-white transition-opacity hover:opacity-80`}
        >
          {s.name}
        </a>
      ))}
    </div>
  );
}
