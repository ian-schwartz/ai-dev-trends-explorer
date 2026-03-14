export interface YouTubeChannel {
  id: string
  name: string
  priority?: number
}

export const youtubeChannels: YouTubeChannel[] = [
  { id: "UCsBjURrPoezykLs9EqgamOA", name: "Fireship", priority: 1 },
  { id: "UCbRP3c757lWg9M-U7TyEkXA", name: "Theo", priority: 1 },
  { id: "UCvBp-3t3qP8W0-t-_Pd2iWq", name: "Jack Herrington", priority: 1 },
  { id: "UCFbNIlppjAuEX4znoulh0Rw", name: "Web Dev Simplified", priority: 2 },
  { id: "UC29ju8bPVHxRSQVKZDtyfZA", name: "Traversy Media", priority: 2 },
  { id: "UCn2WtVdyu5HcQnJaL6tqNwg", name: "Code with Antonio", priority: 2 },
  { id: "UC8butISFwT-Wl7EV0hUK0BQ", name: "freeCodeCamp", priority: 3 },
  { id: "UCsU9-z1x5uQ8H6LbLQ6-2wA", name: "Code to the Moon", priority: 3 },
]
