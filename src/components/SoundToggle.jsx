import { useSound } from '../lib/sound'

export default function SoundToggle({ className = '' }) {
  const { muted, toggleMuted } = useSound()
  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
      className={`sage-icon-btn ${className}`}
    >
      {muted ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
          <path d="M16 9l4 6M20 9l-4 6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
