import Navigation from './Navigation'
import HUD from './HUD'
import AIInterface from './AIInterface'
import SageCore from './SageCore'
import Starfield from './Starfield'
import { getMode } from '../lib/theme'

export default function ModeShell({ modeId, onNavigate, children }) {
  const mode = getMode(modeId)
  return (
    <div className="relative min-h-screen bg-void text-ink">
      <div className="fixed inset-0 -z-10">
        <Starfield density={90} />
        <div className="sage-grid-bg" />
        {/* The Core makes a subtle appearance here too (mode-reactive colour),
            but stays small, off to the side, and behind the content column so
            it never competes with the text visitors are actually reading. */}
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] opacity-25 lg:block">
          <SageCore modeId={modeId} className="sage-core-fade h-full w-full" />
        </div>
        <div className="sage-vignette" />
      </div>

      <Navigation activeMode={modeId} onNavigate={onNavigate} />
      <HUD modeId={modeId} />
      <AIInterface modeId={modeId} />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 md:px-10 md:pt-16">
        <p className="mb-2 font-mono text-xs tracking-[0.2em]" style={{ color: mode.accent }}>
          {mode.short}
        </p>
        {children}
      </main>
    </div>
  )
}
