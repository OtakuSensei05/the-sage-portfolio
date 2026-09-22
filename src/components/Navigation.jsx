import { motion } from 'framer-motion'
import { getMode, modeList } from '../lib/theme'
import SoundToggle from './SoundToggle'

export default function Navigation({ activeMode, onNavigate }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sage-nav"
    >
      <button type="button" onClick={() => onNavigate('home')} className="sage-nav__brand">
        <span className="sage-nav__brand-mark" aria-hidden="true" />
        <span className="hidden sm:inline">THE SAGE</span>
        <span className="sm:hidden">SAGE</span>
      </button>

      <nav aria-label="Modes" className="sage-nav__modes">
        {modeList.map((id) => {
          const mode = getMode(id)
          const active = id === activeMode
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={active ? 'page' : undefined}
              className={`sage-nav__mode ${active ? 'is-active' : ''}`}
              style={{ '--card-accent': mode.accent }}
            >
              {mode.short}
            </button>
          )
        })}
      </nav>

      <SoundToggle className="shrink-0" />
    </motion.header>
  )
}
