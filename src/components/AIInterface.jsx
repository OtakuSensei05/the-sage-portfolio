import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMode } from '../lib/theme'
import { localAnswer } from '../lib/localAnswer'
import { useSound } from '../lib/sound'

const SUGGESTIONS = [
  'Who is Kelvin?',
  'What does he study?',
  'What tools does he use?',
  'Show me his projects.',
]

export default function AIInterface({ modeId = 'home' }) {
  const mode = getMode(modeId)
  const { play } = useSound()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "I'm the SAGE AI. Ask me about Kelvin's engineering background, tools, or projects — I'll only tell you what's actually published.",
    },
  ])
  const [pending, setPending] = useState(false)
  const [offline, setOffline] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, pending])

  const send = async (text) => {
    const question = text.trim()
    if (!question || pending) return
    const nextMessages = [...messages, { role: 'user', content: question }]
    setMessages(nextMessages)
    setInput('')
    setPending(true)
    play('Click.mp3', 0.2)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      if (!res.ok) throw new Error('backend unavailable')
      const data = await res.json()
      setOffline(false)
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      // No backend configured yet, or a network hiccup — fall back to the
      // same knowledge base, answered locally, so the assistant still tells
      // the truth instead of going silent.
      setOffline(true)
      setMessages((m) => [...m, { role: 'assistant', content: localAnswer(question) }])
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="SAGE AI assistant"
            className="mb-3 flex h-[28rem] w-[min(90vw,22rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c13]/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <div>
                <p className="font-display text-xs tracking-[0.15em]" style={{ color: mode.accent }}>
                  SAGE AI
                </p>
                <p className="font-mono text-[0.65rem] text-slate-500">
                  {offline ? 'offline knowledge mode' : 'ask about Kelvin'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI assistant"
                className="sage-icon-btn"
              >
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 3l10 10M13 3 3 13" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto bg-white/10 text-slate-100'
                      : 'bg-white/[0.04] text-slate-300 border border-white/5'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {pending && (
                <div className="w-fit rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-500">
                  thinking…
                </div>
              )}
            </div>

            {messages.length < 3 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="sage-pill hover:text-slate-200 hover:border-white/25"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-white/8 p-3"
            >
              <label htmlFor="sage-ai-input" className="sr-only">
                Ask the SAGE AI a question
              </label>
              <input
                id="sage-ai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kelvin…"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
              <button type="submit" className="sage-btn-primary !px-3 !py-2" disabled={pending} aria-label="Send">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        aria-label={open ? 'Close SAGE AI assistant' : 'Open SAGE AI assistant'}
        className="flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs tracking-wide backdrop-blur-xl"
        style={{
          borderColor: `color-mix(in srgb, ${mode.accent} 45%, transparent)`,
          background: `color-mix(in srgb, ${mode.accent} 12%, rgba(10,12,19,0.9))`,
          color: '#eaf0fb',
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: mode.accent }} />
        SAGE AI
      </motion.button>
    </div>
  )
}
