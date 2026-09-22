import { useCallback, useEffect, useState } from 'react'

// A tiny sound manager: one shared "muted" flag (persisted per-session), and
// a `play(name)` function that respects it. Nothing plays until the visitor
// has interacted with the page once (browser autoplay rules), and nothing
// ever plays if the visitor has muted.

const STORAGE_KEY = 'sage:muted'
const listeners = new Set()
let mutedState = typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === '1'

function setMuted(value) {
  mutedState = value
  if (typeof window !== 'undefined') sessionStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  listeners.forEach((fn) => fn(mutedState))
}

export function useSound() {
  const [muted, setLocalMuted] = useState(mutedState)
  useEffect(() => {
    listeners.add(setLocalMuted)
    return () => listeners.delete(setLocalMuted)
  }, [])

  const play = useCallback((file, volume = 0.35) => {
    if (mutedState) return
    try {
      const audio = new Audio(`/audio/${file}`)
      audio.volume = volume
      audio.play().catch(() => {})
    } catch {
      // ignore — sound is decorative, never blocks the UI
    }
  }, [])

  const toggleMuted = useCallback(() => setMuted(!mutedState), [])

  return { muted, play, toggleMuted }
}
