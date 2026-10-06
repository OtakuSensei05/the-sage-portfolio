import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsCoarsePointer, usePrefersReducedMotion } from '../lib/useMediaQuery'

// A soft glow that trails the real cursor with a little spring lag — this is
// deliberately additive, not a replacement. The native pointer arrow always
// stays visible and fully functional; this only adds a subtle premium touch
// on top of it, so nothing about precision, accessibility, or unusual input
// devices is ever put at risk by a custom cursor bug.
//
// Disabled entirely on touch devices (no persistent pointer to trail) and
// under prefers-reduced-motion (this is exactly the kind of continuous
// following animation that preference exists to suppress).
export default function CustomCursor() {
  const coarse = useIsCoarsePointer()
  const reducedMotion = usePrefersReducedMotion()
  const disabled = coarse || reducedMotion

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 26, stiffness: 260, mass: 0.5 })
  const springY = useSpring(y, { damping: 26, stiffness: 260, mass: 0.5 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (disabled) return undefined
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHovering(!!e.target.closest('button, a, [role="button"]'))
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [disabled, x, y])

  if (disabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="sage-cursor-glow"
      style={{ translateX: springX, translateY: springY, opacity: visible ? 1 : 0 }}
      animate={{ scale: hovering ? 1.7 : 1 }}
      transition={{ scale: { duration: 0.25, ease: 'easeOut' } }}
    />
  )
}
