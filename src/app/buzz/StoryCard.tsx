"use client";

import {
  ArrowUp,
  Clock,
  ExternalLink,
  Globe,
  MessageCircle,
} from "lucide-react";
import type { BuzzPageStory } from "@/lib/hacker-news";

const HN_ITEM_URL = (id: number) => `https://news.ycombinator.com/item?id=${id}`;

function formatTimeAgo(unixSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixSeconds;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(unixSeconds * 1000).toLocaleDateString();
}

const buttonBase =
  "inline-flex items-center gap-1.5 rounded-lg border border-zinc-600 bg-transparent px-3 py-1.5 text-xs font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function StoryCard({ story }: { story: BuzzPageStory }) {
  function openArticle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    window.open(story.url, "_blank", "noopener,noreferrer");
  }

  function openDiscussion(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    window.open(HN_ITEM_URL(story.id), "_blank", "noopener,noreferrer");
  }

  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-md hover:shadow-zinc-900/20 sm:p-5"
    >
      <h2 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-violet-200">
        {story.title}
      </h2>
      {story.domain != null && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-400">
          <Globe className="h-3.5 w-3.5 shrink-0" />
          {story.domain}
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
        <span className="flex items-center gap-1.5">
          <ArrowUp className="h-3.5 w-3.5 shrink-0" />
          {story.score} pts
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5 shrink-0" />
          {story.commentCount} comments
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {formatTimeAgo(story.time)}
        </span>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={openArticle}
          className={`${buttonBase} text-foreground hover:border-violet-500/50 hover:bg-violet-500/5`}
        >
          Article
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={openDiscussion}
          className={`${buttonBase} text-zinc-400 hover:border-zinc-500 hover:text-foreground`}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Discussion
        </button>
      </div>
    </a>
  );
}
