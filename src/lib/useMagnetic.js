import { useMotionValue, useSpring } from 'framer-motion'
import { useIsCoarsePointer, usePrefersReducedMotion } from './useMediaQuery'

// A subtle magnetic pull toward the cursor — used sparingly (the three
// primary mode-entry buttons only, not every button site-wide) so it reads
// as a premium touch rather than a gimmick applied everywhere. Naturally a
// no-op on touch (no hover/mousemove to react to) and explicitly disabled
// under prefers-reduced-motion.
//
// Takes the target ref rather than creating and returning one itself —
// bundling a ref inside a returned object alongside other values reads as
// an unsafe ref access to React's stricter hook linting, even though only
// the ref *object* (never `.current`) is touched during render. Accepting
// it as a parameter keeps the ref entirely in the caller's own component,
// where `ref={myRef}` is always the standard, always-allowed pattern.
export function useMagnetic(ref, strength = 0.25) {
  const coarse = useIsCoarsePointer()
  const reducedMotion = usePrefersReducedMotion()
  const disabled = coarse || reducedMotion

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 })

  if (disabled) {
    return { style: {}, onMouseMove: undefined, onMouseLeave: undefined }
  }

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave }
}
