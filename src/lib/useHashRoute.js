import { useEffect, useState } from 'react'

// Minimal hash-based router — no extra dependency needed for three modes and
// one detail level. Returns { path, segments } and a `navigate(path)` fn.
// Routes look like:  #/  #/engineer  #/sage  #/blackbox  #/blackbox/my-project

function parse() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const segments = raw.split('/').filter(Boolean)
  return { path: raw, segments }
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse())

  useEffect(() => {
    const onHashChange = () => setRoute(parse())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (path) => {
    window.location.hash = path.startsWith('/') ? path : `/${path}`
  }

  return { ...route, navigate }
}
