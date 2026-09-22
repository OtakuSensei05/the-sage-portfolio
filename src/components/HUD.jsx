import { motion } from 'framer-motion'
import { getMode } from '../lib/theme'

export default function HUD({ modeId = 'home' }) {
  const mode = getMode(modeId)
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="sage-hud"
      aria-hidden="true"
    >
      <p className="sage-hud__row">
        <span className="sage-hud__dot" style={{ background: mode.accent }} />
        SYSTEM ONLINE
      </p>
      <p className="sage-hud__row sage-hud__row--muted">AI CORE · ACTIVE</p>
      <p className="sage-hud__row sage-hud__row--muted">{mode.label.toUpperCase()} · READY</p>
    </motion.div>
  )
}
