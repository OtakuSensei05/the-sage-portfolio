import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootSequence from './components/BootSequence'
import HomeScreen from './components/HomeScreen'
import ModeShell from './components/ModeShell'
import ErrorBoundary from './components/ErrorBoundary'
import EngineerMode from './modes/EngineerMode/EngineerMode'
import SageMode from './modes/SageMode/SageMode'
import ProjectBlackBox from './modes/ProjectBlackBox/ProjectBlackBox'
import { useHashRoute } from './lib/useHashRoute'
import { useSound } from './lib/sound'

const VALID_MODES = new Set(['engineer', 'sage', 'blackbox'])

export default function App() {
  const [booted, setBooted] = useState(false)
  const { segments, navigate } = useHashRoute()
  const { play } = useSound()

  const [modeId, slug] = segments
  const activeMode = VALID_MODES.has(modeId) ? modeId : null

  const goTo = (path) => {
    play('Click2.mp3', 0.25)
    navigate(path === 'home' ? '/' : `/${path}`)
  }

  if (!booted) {
    return (
      <AnimatePresence>
        <BootSequence
          key="boot"
          onComplete={() => {
            play('activate.mp3', 0.3)
            setBooted(true)
          }}
        />
      </AnimatePresence>
    )
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {!activeMode ? (
          <motion.div key="home" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <HomeScreen onNavigate={goTo} />
          </motion.div>
        ) : (
          <motion.div key={activeMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <ModeShell modeId={activeMode} onNavigate={goTo}>
              <ErrorBoundary>
                {activeMode === 'engineer' && <EngineerMode />}
                {activeMode === 'sage' && <SageMode />}
                {activeMode === 'blackbox' && (
                  <ProjectBlackBox
                    slug={slug}
                    onOpenProject={(s) => navigate(`/blackbox/${s}`)}
                    onBack={() => navigate('/blackbox')}
                  />
                )}
              </ErrorBoundary>
            </ModeShell>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  )
}
