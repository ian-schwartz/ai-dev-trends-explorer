const HN_TOP = "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const KEYWORDS = [
  "ai",
  "llm",
  "coding",
  "developer tools",
  "agents",
  "copilot",
  "claude",
  "openai",
  "cursor",
  "windsurf",
  "codex",
  "v0",
  "devtools",
  "prompt",
  "inference",
  "model",
];

const MAX_IDS_TO_FETCH = 80;
const TARGET_STORY_COUNT = 6;
const MIN_KEYWORD_MATCHES = 4;

interface HNItem {
  id: number;
  type?: string;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  descendants?: number;
  deleted?: boolean;
  dead?: boolean;
}

export interface AIDevBuzzStory {
  id: number;
  title: string;
  url: string;
  domain: string | null;
  score: number;
  commentCount: number;
  author: string;
}

const CACHE_REVALIDATE_SECONDS = 1800;

async function fetchWithCache<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`HN API error: ${res.status}`);
  return res.json() as Promise<T>;
}

function extractDomain(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "") || null;
  } catch {
    return null;
  }
}

function matchesKeywords(title: string): boolean {
  const lower = title.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw));
}

function toStory(s: HNItem & { title: string }): AIDevBuzzStory {
  return {
    id: s.id,
    title: s.title,
    url: s.url ?? `https://news.ycombinator.com/item?id=${s.id}`,
    domain: s.url ? extractDomain(s.url) : null,
    score: s.score ?? 0,
    commentCount: s.descendants ?? 0,
    author: s.by ?? "unknown",
  };
}

export async function getAIDevBuzzStories(): Promise<AIDevBuzzStory[]> {
  try {
    const ids = (await fetchWithCache<number[]>(HN_TOP)).slice(
      0,
      MAX_IDS_TO_FETCH
    );

    const items = await Promise.all(
      ids.map((id) =>
        fetchWithCache<HNItem | null>(HN_ITEM(id)).catch(() => null)
      )
    );

    const stories = items.filter(
      (item): item is HNItem & { title: string } =>
        item != null &&
        item.type === "story" &&
        typeof item.title === "string" &&
        !item.deleted &&
        !item.dead
    );

    const byScore = [...stories].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const keywordMatches = byScore.filter((s) => matchesKeywords(s.title));
    const keywordStories = keywordMatches.slice(0, TARGET_STORY_COUNT);

    if (keywordStories.length >= MIN_KEYWORD_MATCHES) {
      return keywordStories.map(toStory);
    }

    const chosenIds = new Set(keywordStories.map((s) => s.id));
    const fallbackCandidates = byScore.filter((s) => !chosenIds.has(s.id));
    const countToAdd = Math.min(
      TARGET_STORY_COUNT - keywordStories.length,
      Math.max(0, MIN_KEYWORD_MATCHES - keywordStories.length)
    );
    const toAdd = fallbackCandidates.slice(0, countToAdd);
    const combined = [...keywordStories, ...toAdd]
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, TARGET_STORY_COUNT);

    return combined.map(toStory);
  } catch {
    return [];
  }
}
