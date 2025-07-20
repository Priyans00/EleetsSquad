"use client"

import { useState } from "react"
import type { Profile, LeetCodeStats } from "@/types/profile"
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
  const [updateUsername, setUpdateUsername] = useState('')
  const [followUsername, setFollowUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        body: JSON.stringify({ leetcode_username: updateUsername }),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updateProfile = await res.json()
      setProfile(updateProfile)
      setUpdateUsername('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error updating LeetCode username');
      }
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
        body: JSON.stringify({ leetcode_username: followUsername }),
      })
      if (!res.ok) throw new Error('Failed to follow')
      await updateProfile()
      setFollowUsername('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error following user');
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-auto">
      {/* Background grid layer */}
      <GridBackground className="fixed inset-0 w-full h-full -z-10" />
      {/* Main content layer */}
      <div className="relative z-10 w-full max-w-5xl mx-auto fade-in min-h-screen flex flex-col justify-start py-10 px-2">
        <div className="flex-1 flex flex-col gap-10">
          <div className="bg-gray-900/80 rounded-2xl shadow-lg p-8 mb-6 border border-gray-800">
            <h2 className="text-4xl font-extrabold text-white mb-4 code-font tracking-tight flex items-center gap-3">
              <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Your Profile</span>
            </h2>
            {/* Show current LeetCode username */}
            <div className="mb-4">
              <span className="text-lg font-mono text-gray-300">LeetCode Username: </span>
              <span className="text-lg font-bold text-yellow-400">{profile.leetcode_username || <span className='text-gray-500'>Not set</span>}</span>
            </div>
            {error && <p className="text-red-400 mb-4 text-lg font-semibold">{error}</p>}
            {profile.leetcode_username && profile.leetcode_stats ? (
              <div className="mb-6">
                <UserCard {...profile.leetcode_stats} />
              </div>
            ) : (
              <p className="text-gray-400 code-font mb-6">No LeetCode username set</p>
            )}
            <div className="flex flex-col md:flex-row gap-6">
              <form onSubmit={handleUpdateLeetcode} className="flex-1 bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow border border-gray-700">
                <label className="text-gray-300 font-semibold mb-1">Update your LeetCode username</label>
                <input
                  type="text"
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                  placeholder="Enter LeetCode username"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <AnimatedButton type="submit" className="mt-2" disabled={loading || !updateUsername.trim()}>
                  {loading ? 'Updating...' : 'Update Username'}
                </AnimatedButton>
              </form>
              <form onSubmit={handleFollow} className="flex-1 bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow border border-gray-700">
                <label className="text-gray-300 font-semibold mb-1">Follow another user</label>
                <input
                  type="text"
                  value={followUsername}
                  onChange={(e) => setFollowUsername(e.target.value)}
                  placeholder="Enter LeetCode username"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <AnimatedButton type="submit" className="mt-2" disabled={loading || !followUsername.trim()}>
                  {loading ? 'Following...' : 'Follow User'}
                </AnimatedButton>
              </form>
            </div>
          </div>
          <div className="bg-gray-900/80 rounded-2xl shadow-lg p-8 border border-gray-800">
            <h3 className="text-3xl font-bold text-white mb-6 code-font flex items-center gap-2">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">Followed Users</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {profile.followed_stats.map((stats: LeetCodeStats) => (
                <UserCard key={stats.username} {...stats} />
              ))}
            </div>
            <div className="mt-8">
              <Leaderboard users={[profile.leetcode_stats, ...profile.followed_stats].filter(Boolean) as LeetCodeStats[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
