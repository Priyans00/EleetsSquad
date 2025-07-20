"use client"

import { useState, useEffect } from "react"
import type { LeetCodeStats } from "@/types/profile"
import axios, { isAxiosError } from "axios"
import UserCard from "@/components/UserCard"
import Leaderboard from "@/components/Leaderboard"
import AnimatedButton from "@/components/AnimatedButtons"
import { ClipLoader } from "react-spinners"
import GridBackground from "@/components/GridBackground"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export default function FollowedUsers() {
  const [followedStats, setFollowedStats] = useState<LeetCodeStats[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get<{ followed_stats: LeetCodeStats[] }>(
          `${API_URL}/following`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        setFollowedStats(response.data.followed_stats)
      } catch (err: unknown) {
        console.error("Error fetching followed users:", err)
        setError("Error fetching followed users")
      } finally {
        setLoading(false)
      }
    }
    fetchFollowedUsers()
  }, [])

  const handleUnfollow = async (username: string) => {
    setLoading(true)
    try {
      await axios.post(
        `${API_URL}/unfollow_leetcode`,
        { leetcode_username: username },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      setFollowedStats((prev) => prev.filter((stat) => stat.username !== username))
      setError("")
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Error unfollowing user")
      } else {
        setError("Error unfollowing user")
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#00bcd4" size={50} />
      </div>
    )
  }

  return (
    <div className="container py-8 fade-in">
      <GridBackground>
        <h2 className="text-3xl font-bold text-white mb-6 code-font">Followed Users</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {followedStats.length === 0 ? (
          <p className="text-gray-400 code-font">You are not following anyone yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedStats.map((stats) => (
              <div key={stats.username} className="space-y-4">
                <UserCard {...stats} />
                <AnimatedButton
                  onClick={() => handleUnfollow(stats.username)}
                  className="bg-red-500 hover:bg-red-400 w-full"
                >
                  Unfollow
                </AnimatedButton>
              </div>
            ))}
          </div>
        )}
        <Leaderboard users={followedStats} />
      </GridBackground>
    </div>
  )
}
