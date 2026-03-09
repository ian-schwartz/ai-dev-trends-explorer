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
  time?: number;
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

/** Buzz page story with time (unix) for display. */
export interface BuzzPageStory extends AIDevBuzzStory {
  time: number;
}

/** Weighted keywords for buzz page: AI-specific terms 3, generic dev terms 1. */
const BUZZ_PAGE_KEYWORD_WEIGHTS: Record<string, number> = {
  ai: 3,
  llm: 3,
  agent: 3,
  copilot: 3,
  cursor: 3,
  codex: 3,
  claude: 3,
  anthropic: 3,
  openai: 3,
  windsurf: 3,
  v0: 3,
  developer: 1,
  coding: 1,
  programming: 1,
  repo: 1,
  framework: 1,
  model: 1,
  inference: 1,
};

const BUZZ_PAGE_TOP_N = 50;
const BUZZ_PAGE_MAX_STORIES = 20;
const BUZZ_PAGE_REVALIDATE = 600;
const BUZZ_PAGE_MIN_KEYWORD_SCORE = 2;

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

function getBuzzKeywordScore(title: string, url: string): number {
  const lower = `${title} ${url}`.toLowerCase();
  let score = 0;
  for (const [keyword, weight] of Object.entries(BUZZ_PAGE_KEYWORD_WEIGHTS)) {
    if (lower.includes(keyword)) score += weight;
  }
  return score;
}

function toBuzzPageStory(s: HNItem & { title: string; time?: number }): BuzzPageStory {
  return {
    ...toStory(s),
    time: s.time ?? 0,
  };
}

export async function getBuzzPageStories(): Promise<BuzzPageStory[]> {
  try {
    const ids = (
      await fetch(HN_TOP, { next: { revalidate: BUZZ_PAGE_REVALIDATE } }).then(
        (res) => (res.ok ? res.json() as Promise<number[]> : Promise.reject(new Error("HN top failed")))
      )
    ).slice(0, BUZZ_PAGE_TOP_N);

    const items = await Promise.all(
      ids.map((id) =>
        fetch(HN_ITEM(id), {
          next: { revalidate: BUZZ_PAGE_REVALIDATE },
        })
          .then((res) => (res.ok ? res.json() as Promise<HNItem | null> : null))
          .catch(() => null)
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

    const withScore = stories
      .map((s) => {
        const keywordScore = getBuzzKeywordScore(s.title, s.url ?? "");
        return { story: s, keywordScore, hnScore: s.score ?? 0 };
      })
      .filter(({ keywordScore }) => keywordScore >= BUZZ_PAGE_MIN_KEYWORD_SCORE)
      .map(({ story, keywordScore, hnScore }) => ({
        story,
        storyScore: keywordScore * 10 + hnScore,
      }))
      .sort((a, b) => b.storyScore - a.storyScore)
      .slice(0, BUZZ_PAGE_MAX_STORIES)
      .map(({ story }) => story);

    return withScore.map(toBuzzPageStory);
  } catch {
    return [];
  }
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
