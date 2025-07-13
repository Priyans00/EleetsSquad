"use client"

import { useState, useCallback } from "react"
import type { Profile, LeetCodeStats } from "@/types/profile"
import _ from "lodash"
import UserCard from "@/components/UserCard"
import Leaderboard from "@/components/Leaderboard"
import AnimatedButton from "@/components/AnimatedButtons"
import GridBackground from "@/components/GridBackground"

interface Props {
  profile: Profile
  token: string
}

export default function ProfileClient({ profile: initialProfile, token }: Props) {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const debouncedSetLeetcodeUsername = useCallback(
    _.debounce((value: string) => setLeetcodeUsername(value), 300),
    []
  )

  const API_URL = process.env.NEXT_PUBLIC_API_URL!

  const updateProfile = async () => {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    const fresh = await res.json()
    setProfile(fresh)
  }

  const handleUpdateLeetcode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/update_leetcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ leetcode_username: leetcodeUsername }),
      })
      if (!res.ok) throw new Error('Failed to update')
      await updateProfile()
      setLeetcodeUsername('')
    } catch (err: any) {
      setError(err.message || 'Error updating LeetCode username')
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/follow_leetcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ leetcode_username: leetcodeUsername }),
      })
      if (!res.ok) throw new Error('Failed to follow')
      await updateProfile()
      setLeetcodeUsername('')
    } catch (err: any) {
      setError(err.message || 'Error following user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="lg:ml-64 p-6 fade-in">
        <GridBackground>
          <div className="relative min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6 code-font">Your Profile</h2>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            {profile.leetcode_username && profile.leetcode_stats ? (
              <UserCard {...profile.leetcode_stats} />
            ) : (
              <p className="text-gray-400 code-font">No LeetCode username set</p>
            )}

            <form onSubmit={handleUpdateLeetcode} className="mb-8">
              <input
                type="text"
                value={leetcodeUsername}
                onChange={(e) => debouncedSetLeetcodeUsername(e.target.value)}
                placeholder="Enter LeetCode username"
                className="w-full max-w-md px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
              />
              <AnimatedButton type="submit">Update Username</AnimatedButton>
            </form>

            <form onSubmit={handleFollow} className="mb-8">
              <input
                type="text"
                value={leetcodeUsername}
                onChange={(e) => debouncedSetLeetcodeUsername(e.target.value)}
                placeholder="Enter LeetCode username"
                className="w-full max-w-md px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
              />
              <AnimatedButton type="submit">Follow User</AnimatedButton>
            </form>

            <h3 className="text-2xl font-bold text-white mb-4 code-font">Followed Users</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.followed_stats.map((stats: LeetCodeStats) => (
                <UserCard key={stats.username} {...stats} />
              ))}
            </div>
            <Leaderboard users={[profile.leetcode_stats, ...profile.followed_stats].filter(Boolean) as LeetCodeStats[]} />
          </div>
        </GridBackground>
      </div>
    </div>
  )
}
