import { memo } from 'react'
import type { LeetCodeStats } from '@/types/profile'

interface LeaderboardProps {
  users: LeetCodeStats[]
}

function Leaderboard({ users }: LeaderboardProps) {
  return (
    <div className="mt-8 fade-in">
      <h2 className="text-2xl font-bold text-white mb-4 code-font">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-code-dark">
              <th className="p-3 text-left text-gray-200 font-semibold code-font">Rank</th>
              <th className="p-3 text-left text-gray-200 font-semibold code-font">Username</th>
              <th className="p-3 text-left text-gray-200 font-semibold code-font">Total Solved</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.total_solved - a.total_solved)
              .map((user, index) => (
                <tr
                  key={user.username}
                  className="border-t border-gray-700 hover:bg-gray-700 transition duration-200"
                >
                  <td className="p-3 text-gray-300 code-font">{index + 1}</td>
                  <td className="p-3 text-code-cyan code-font">{user.username}</td>
                  <td className="p-3 text-gray-300 code-font">{user.total_solved}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default memo(Leaderboard)
