import { ReactNode } from 'react'

interface GridBackgroundProps {
  children?: ReactNode
  className?: string
}

export default function GridBackground({
  children,
  className = '',
}: GridBackgroundProps) {
  return (
    <div
      className={`w-full h-full min-h-screen min-w-full bg-black bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:64px_64px] ${className}`}
    >
      {children}
    </div>
  )
}
