export interface LeetCodeStats {
  username: string
  total_solved: number
  easy: number
  medium: number
  hard: number
  ranking: number
}

export interface Profile {
  leetcode_username?: string
  leetcode_stats?: LeetCodeStats
  followed_stats: LeetCodeStats[]
  // add other fields if needed
}
