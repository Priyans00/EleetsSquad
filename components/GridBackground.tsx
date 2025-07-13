import { ReactNode } from 'react'

interface GridBackgroundProps {
  children: ReactNode
  className?: string
}

export default function GridBackground({
  children,
  className = '',
}: GridBackgroundProps) {
  return (
    <div className="insert-0 min-h-screen bg-black">
      <div
        className={`inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:64px_64px] ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
