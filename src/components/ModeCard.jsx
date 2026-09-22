import { motion } from 'framer-motion'
import { getMode } from '../lib/theme'

const ICONS = {
  engineer: (
    <path
      d="M12 3.5l1.6 2.8 3.2.5-2.3 2.3.5 3.2-2.9-1.5-2.9 1.5.5-3.2-2.3-2.3 3.2-.5L12 3.5z"
      strokeLinejoin="round"
    />
  ),
  sage: <path d="M12 4a5.5 5.5 0 0 0-3 10.1V16h6v-1.9A5.5 5.5 0 0 0 12 4zM10 19h4M10.5 21h3" strokeLinecap="round" strokeLinejoin="round" />,
  blackbox: (
    <>
      <rect x="4.5" y="7" width="15" height="12" rx="1.4" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" strokeLinecap="round" />
    </>
  ),
}

export default function ModeCard({ modeId, description, onSelect, index = 0 }) {
  const mode = getMode(modeId)
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(modeId)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * index, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="sage-mode-card"
      style={{ '--card-accent': mode.accent }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4" className="sage-mode-card__icon">
        {ICONS[modeId]}
      </svg>
      <span className="sage-mode-card__title">{mode.label}</span>
      <span className="sage-mode-card__desc">{description}</span>
      <span className="sage-mode-card__enter">
        Enter
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.button>
  )
}
