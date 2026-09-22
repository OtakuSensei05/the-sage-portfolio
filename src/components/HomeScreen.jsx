import { motion } from 'framer-motion'
import SageCore from './SageCore'
import Starfield from './Starfield'
import ModeCard from './ModeCard'
import HUD from './HUD'
import AIInterface from './AIInterface'
import SoundToggle from './SoundToggle'
import { profile } from '../data/profile'
import { modeList } from '../lib/theme'

const DESCRIPTIONS = {
  engineer: 'Technical profile · Projects · Skills · CV',
  sage: 'Knowledge · Research · Ideas',
  blackbox: 'R&D · Experiments · Future builds',
}

export default function HomeScreen({ onNavigate }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-ink">
      <div className="fixed inset-0">
        <Starfield density={160} />
        <div className="sage-grid-bg" />
        <div className="sage-vignette" />
      </div>

      <div className="absolute right-5 top-5 z-20">
        <SoundToggle />
      </div>
      <HUD modeId="home" />
      <AIInterface modeId="home" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 pb-32 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.32em' }}
          transition={{ duration: 1 }}
          className="font-display text-xs text-slate-400"
        >
          THE SAGE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
          className="mt-2 h-64 w-64 sm:h-80 sm:w-80"
        >
          <SageCore modeId="home" interactive className="sage-core-fade h-full w-full" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-2 max-w-3xl font-display text-[2rem] leading-tight text-white sm:text-5xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-4 max-w-md text-sm text-slate-300 sm:text-base"
        >
          {profile.role}
          <br />
          <span className="font-mono text-xs tracking-widest text-slate-500">{profile.tagline}</span>
        </motion.p>

        <div className="mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
          {modeList.map((id, i) => (
            <ModeCard key={id} modeId={id} description={DESCRIPTIONS[id]} onSelect={onNavigate} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 font-mono text-[0.65rem] tracking-[0.2em] text-slate-600"
        >
          SYSTEM STATUS: ONLINE
        </motion.p>
      </main>
    </div>
  )
}
