import { useAppConfig } from "@/contexts/AppConfigContext";
import { useEffect, useRef } from "react";

interface NativeAdSlotProps {
  slot: "feed" | "sidebar" | "article";
}

export default function NativeAdSlot({ slot }: NativeAdSlotProps) {
  const { config } = useAppConfig();
  const containerRef = useRef<HTMLDivElement>(null);

  const scriptMap: Record<string, string> = {
    feed: config.adsenseScript,
    sidebar: config.sidebarAdScript,
    article: config.articleAdScript,
  };

  const adCode = scriptMap[slot];

  useEffect(() => {
    if (!adCode || !containerRef.current) return;
    // Safely inject ad script
    containerRef.current.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.innerHTML = adCode;
    const scripts = wrapper.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      containerRef.current?.appendChild(newScript);
    });
    // Append non-script elements
    Array.from(wrapper.childNodes).forEach((node) => {
      if ((node as Element).tagName !== "SCRIPT") {
        containerRef.current?.appendChild(node.cloneNode(true));
      }
    });
  }, [adCode]);

  if (!adCode) return null;

  return (
    <div
      ref={containerRef}
      className="rounded-lg border border-dashed border-border bg-muted/30 p-2 text-center text-[10px] text-muted-foreground"
    />
  );
}
