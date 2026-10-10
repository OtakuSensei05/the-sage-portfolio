import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSound } from '../lib/sound'
import { profile } from '../data/profile'

const LINES = [
  { label: 'AI CORE', delay: 0.5 },
  { label: 'ENGINEERING DATABASE', delay: 1.0 },
  { label: 'NEURAL INTERFACE', delay: 1.5 },
  { label: 'SAGE CORE', delay: 2.0, status: 'INITIALIZING' },
  { label: 'SYSTEM STATUS', delay: 2.6, status: 'NOMINAL' },
]

const WELCOME_DELAY = 3.3
const BUTTON_DELAY = 3.9

export default function BootSequence({ onComplete }) {
  const { play } = useSound()
  const [skippable, setSkippable] = useState(false)

  useEffect(() => {
    play('boot.mp3', 0.3)
    const t = setTimeout(() => setSkippable(true), BUTTON_DELAY * 1000)
    // Start fetching the SageCore chunk (three.js and friends, ~900KB) now,
    // during the boot animation, rather than waiting until the user reaches
    // the home screen that actually renders it. The boot sequence runs for
    // several seconds regardless, so this download rides alongside it for
    // free — by "Enter system", the heavy chunk is normally already cached.
    import('./SageCore')
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (skippable && (e.key === 'Enter' || e.key === ' ')) onComplete()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skippable, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void px-6 font-mono text-sm text-slate-300"
    >
      {/*
        Visually hidden, but present in the DOM from the very first render --
        before any interaction, before the "Enter system" click. This exists
        for two audiences at once: a screen reader user who hasn't clicked
        through yet gets real context immediately instead of just boot-
        sequence chrome, and a search engine crawler (which generally
        doesn't simulate clicking buttons) sees substantive, real content
        about Kelvin on its very first pass rather than only "INITIALIZING
        SAGE NETWORK" -- directly relevant to being findable by name search.
        Every fact here is pulled from profile.js, nothing invented.
      */}
      <div className="sr-only">
        <h1>{profile.fullName}</h1>
        <p>
          {profile.role} at {profile.university}, {profile.country}. {profile.bio.join(' ')}
        </p>
      </div>

      <div className="w-full max-w-sm">
        {/*
          role="status" scoped to just this block (the lines that actually
          change) rather than the whole boot screen. A live region
          re-announces its full content on every update — wrapping the
          Enter/Skip buttons in it too meant a screen reader could end up
          re-reading button text five times as each status line appeared.
        */}
        <div role="status" aria-label="System initializing">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 tracking-[0.2em] text-cyan-300/90"
          >
            INITIALIZING SAGE NETWORK
            <BlinkingDots />
          </motion.p>

          <ul className="space-y-2">
            {LINES.map((line) => (
              <motion.li
                key={line.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.4 }}
                className="flex items-baseline justify-between border-b border-white/5 pb-1"
              >
                <span className="text-slate-400">{line.label}</span>
                <span className="text-emerald-300/90">{line.status || 'ONLINE'}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: WELCOME_DELAY, duration: 0.6 }}
            className="mt-8 text-center tracking-[0.15em] text-white"
          >
            WELCOME, {profile.name.toUpperCase()}
          </motion.p>
        </div>

        <AnimatePresence>
          {skippable && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex justify-center"
            >
              <button
                type="button"
                onClick={onComplete}
                className="sage-btn-primary"
                autoFocus
              >
                Enter system
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!skippable && (
          <button
            type="button"
            onClick={onComplete}
            className="absolute bottom-6 right-6 text-xs text-slate-500 underline decoration-dotted underline-offset-4 hover:text-slate-300"
          >
            Skip
          </button>
        )}
      </div>
    </motion.div>
  )
}

function BlinkingDots() {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      ...
    </motion.span>
  )
}
