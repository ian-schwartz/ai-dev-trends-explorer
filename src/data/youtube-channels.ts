export interface YouTubeChannel {
  id: string
  name: string
  priority?: number
}

export const youtubeChannels: YouTubeChannel[] = [
  // Priority 1: strong AI dev focus
  { id: "UCsBjURrPoezykLs9EqgamOA", name: "Fireship", priority: 1 },
  { id: "UCbRP3c757lWg9M-U7TyEkXA", name: "Theo", priority: 1 },
  { id: "UCvBp-3t3qP8W0-t-_Pd2iWq", name: "Jack Herrington", priority: 1 },
  { id: "UCrXSVX9a1mj8l0CMLwKgMVw", name: "AI Jason", priority: 1 },
  { id: "UCtatfZMf-8EkIwASXM4ts0A", name: "AssemblyAI", priority: 1 },
  { id: "UCxBcwypKK-W3GHd_RZ9FZrQ", name: "Latent Space", priority: 1 },
  { id: "UCNJ1Ymd5yFuUPtn21xtRbbw", name: "AI Explained", priority: 1 },
  { id: "UCfQNB91qRP_5ILeu_S_bSkg", name: "Alex Finn", priority: 1 },
  // Priority 2: dev channel with frequent AI topics
  { id: "UCswG6FSbgZjbWtdf_hMLaow", name: "Matt Pocock", priority: 2 },
  { id: "UC8ENHE5xdFSwx71u3fDH5Xw", name: "ThePrimeagen", priority: 2 },
  { id: "UCFbNIlppjAuEX4znoulh0Rw", name: "Web Dev Simplified", priority: 2 },
  { id: "UC29ju8bPVHxRSQVKZDtyfZA", name: "Traversy Media", priority: 2 },
  { id: "UCn2WtVdyu5HcQnJaL6tqNwg", name: "Code with Antonio", priority: 2 },
  { id: "UCHXa4OpASJEwrHrLeIzw7Yg", name: "Nicholas Renotte", priority: 2 },
  { id: "UC8wZnXYK_CGKlBcZp-GxYPA", name: "NeuralNine", priority: 2 },
  { id: "UC4JX40jDee_tINbkjycV4Sg", name: "Tech With Tim", priority: 2 },
  { id: "UC80PWRj_ZU8Zu0HSMNVwKWw", name: "Codevolution", priority: 2 },
  { id: "UCmXmlB4-HJytD7wek0Uo97A", name: "JavaScript Mastery", priority: 2 },
  { id: "UCLNgu_OupwoeESgtab33CCw", name: "Coding Garden", priority: 2 },
  // Priority 3: occasional AI coverage
  { id: "UC8butISFwT-Wl7EV0hUK0BQ", name: "freeCodeCamp", priority: 3 },
  { id: "UCsU9-z1x5uQ8H6LbLQ6-2wA", name: "Code to the Moon", priority: 3 },
]
