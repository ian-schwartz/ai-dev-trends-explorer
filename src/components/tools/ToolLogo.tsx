"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  Bot,
  Wand2,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ToolCategory } from "@/types/tool";

const CDN_BASE = "https://cdn.simpleicons.org";

/** Tools that should use a parent/company logo when primary fails or is missing. */
const LOGO_FALLBACK_MAP: Record<string, string> = {
  codex: `${CDN_BASE}/openai/white`,
  "github-copilot": `${CDN_BASE}/github/white`,
  v0: `${CDN_BASE}/vercel/white`,
};

const categoryIcons: Record<ToolCategory, LucideIcon> = {
  "ai-ide": Code2,
  "coding-agent": Bot,
  "ui-generator": Wand2,
  assistant: Sparkles,
  "terminal-tool": Terminal,
};

const categoryIconClasses: Record<ToolCategory, string> = {
  "ai-ide": "text-blue-400/90",
  "coding-agent": "text-violet-400/90",
  "ui-generator": "text-emerald-400/90",
  assistant: "text-amber-400/90",
  "terminal-tool": "text-cyan-400/90",
};

type Size = "sm" | "md";

const sizeClasses: Record<Size, { box: string; icon: string }> = {
  sm: { box: "h-5 w-5", icon: "h-5 w-5" },
  md: { box: "h-10 w-10", icon: "h-10 w-10" },
};

export interface ToolLogoProps {
  /** Tool slug, used for fallback mapping (e.g. codex -> openai). */
  slug: string;
  category: ToolCategory;
  /** Primary logo URL from tool data. Optional. */
  logoUrl?: string | null;
  /** sm = 20px (cards), md = 40px (detail header). */
  size?: Size;
  /** Accessible label when showing icon fallback (tool name). */
  name?: string;
}

type Phase = "primary" | "fallback" | "loaded" | "icon";

export function ToolLogo({
  slug,
  category,
  logoUrl,
  size = "sm",
  name,
}: ToolLogoProps) {
  const fallbackUrl = LOGO_FALLBACK_MAP[slug];

  const [phase, setPhase] = useState<Phase>(() => {
    if (logoUrl) return "primary";
    if (fallbackUrl) return "fallback";
    return "icon";
  });
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "primary" && phase !== "fallback") return;

    const url = phase === "primary" ? (logoUrl ?? null) : fallbackUrl ?? null;
    if (!url) return;

    const img = new Image();
    img.onload = () => {
      setLoadedUrl(url);
      setPhase("loaded");
    };
    img.onerror = () => {
      if (phase === "primary" && fallbackUrl) {
        setPhase("fallback");
      } else {
        setPhase("icon");
      }
    };
    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [phase, logoUrl, fallbackUrl]);

  const Icon = categoryIcons[category];
  const { box, icon } = sizeClasses[size];

  if (phase === "icon" || (phase === "fallback" && !fallbackUrl)) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center ${box} ${categoryIconClasses[category]}`}
        aria-label={name ? `${name} (category)` : undefined}
        aria-hidden={!name}
      >
        <Icon className={icon} />
      </span>
    );
  }

  if (phase === "loaded" && loadedUrl) {
    return (
      <span className={`inline-block shrink-0 ${box}`} aria-hidden>
        <img
          src={loadedUrl}
          alt=""
          width={size === "sm" ? 20 : 40}
          height={size === "sm" ? 20 : 40}
          className={`${box} object-contain opacity-90`}
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${box} ${categoryIconClasses[category]}`}
      aria-label={name ? `${name} (category)` : undefined}
      aria-hidden={!name}
    >
      <Icon className={icon} />
    </span>
  );
}
