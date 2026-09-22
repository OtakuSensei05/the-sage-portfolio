import { useMemo } from 'react'

// A cheap, WebGL-free starfield for full-page ambience. Kept separate from
// SageCore so the Core can be a small, bounded "object" (a real centerpiece)
// instead of a full-viewport canvas — and so every visitor gets a starfield,
// even on the no-WebGL fallback path.
export default function Starfield({ density = 140, className = '' }) {
  const stars = useMemo(() => {
    const seededRandom = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }
    return Array.from({ length: density }, (_, i) => ({
      left: `${(seededRandom(i * 3.7) * 100).toFixed(2)}%`,
      top: `${(seededRandom(i * 5.1 + 1) * 100).toFixed(2)}%`,
      size: seededRandom(i * 7.3 + 2) > 0.85 ? 2 : 1,
      opacity: 0.25 + seededRandom(i * 9.9 + 3) * 0.55,
      delay: `${(seededRandom(i * 4.4 + 4) * 6).toFixed(2)}s`,
      duration: `${(4 + seededRandom(i * 6.6 + 5) * 5).toFixed(2)}s`,
    }))
  }, [density])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="sage-star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            '--max-o': s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  )
}
