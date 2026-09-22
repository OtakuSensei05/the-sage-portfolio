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
      role="status"
      aria-label="System initializing"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void px-6 font-mono text-sm text-slate-300"
    >
      <div className="w-full max-w-sm">
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
