import { memo } from 'react'
import type { LeetCodeStats } from '@/types/profile'


function UserCard({
  username,
  total_solved,
  easy,
  medium,
  hard,
  ranking,
}: LeetCodeStats) {
  return (
    <div className="p-6 bg-gray-800 rounded-lg w-md shadow-lg hover:shadow-xl transition duration-100 transform hover:-translate-y-1 fade-out">
      <h3 className="text-xl font-bold text-white mb-4 code-font">{username}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-300">Total Solved</p>
          <p className="text-code-cyan font-semibold code-font">{total_solved}</p>
        </div>
        <div>
          <p className="text-gray-300">Ranking</p>
          <p className="text-code-cyan font-semibold code-font">{ranking}</p>
        </div>
        <div>
          <p className="text-gray-300">Easy</p>
          <p className="text-green-400 font-semibold code-font">{easy}</p>
        </div>
        <div>
          <p className="text-gray-300">Medium</p>
          <p className="text-yellow-400 font-semibold code-font">{medium}</p>
        </div>
        <div>
          <p className="text-gray-300">Hard</p>
          <p className="text-red-400 font-semibold code-font">{hard}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(UserCard)
