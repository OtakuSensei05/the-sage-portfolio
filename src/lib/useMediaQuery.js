import { useEffect, useState } from 'react'

// Small shared media-query hook. Lazy initializer reads the current match
// once during first render (safe here — this is a client-only Vite SPA, no
// SSR mismatch risk), then a listener keeps it in sync if it changes later.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useIsCoarsePointer() {
  return useMediaQuery('(pointer: coarse)')
}
