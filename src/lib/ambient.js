import { useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Ambient drone — synthesized live with the Web Audio API, not an audio file.
// There's no tool in this environment that can generate real ambient music,
// and rather than fake it with a low-quality loop, this builds a genuinely
// subtle, mode-reactive pad tone directly from oscillators:
//   - two detuned tones (a few Hz apart) for a soft, slow beating/chorus
//   - run through a lowpass filter, whose cutoff shifts per mode
//   - a slow LFO breathes the volume gently, so it never sounds static
//   - a whisper of filtered noise adds "space" texture underneath
//
// Base pitch and filter tone shift per mode (Engineer brighter/higher, Sage
// deeper/warmer, Blackbox lower/darker) so switching modes is audible as a
// genuine change in atmosphere, not just a color change on screen.
//
// Browsers block audio before a user gesture, so this only ever starts from
// inside a click handler (the boot sequence's "Enter system" button), and it
// respects the existing mute toggle by ramping gain to zero rather than
// hard-cutting (avoids clicks/pops).
// ─────────────────────────────────────────────────────────────────────────────

const MODE_TONE = {
  home: { base: 110, detune: 3, cutoff: 900 },
  engineer: { base: 130, detune: 4, cutoff: 1400 },
  sage: { base: 98, detune: 2.5, cutoff: 700 },
  blackbox: { base: 82, detune: 5, cutoff: 500 },
}

let sharedEngine = null

function createEngine() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  osc1.type = 'sine'
  osc2.type = 'sine'

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.Q.value = 0.7

  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.08 // one gentle "breath" roughly every 12 seconds
  lfoGain.gain.value = 0.4
  lfo.connect(lfoGain)

  const toneGain = ctx.createGain()
  toneGain.gain.value = 0.6
  lfoGain.connect(toneGain.gain)

  osc1.connect(filter)
  osc2.connect(filter)
  filter.connect(toneGain)
  toneGain.connect(master)

  // A whisper of filtered noise for texture, well under the tone's volume
  const bufferSize = 2 * ctx.sampleRate
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer
  noise.loop = true
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = 'lowpass'
  noiseFilter.frequency.value = 400
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.025
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(master)

  osc1.start()
  osc2.start()
  lfo.start()
  noise.start()

  return { ctx, master, osc1, osc2, filter }
}

function getEngine() {
  if (!sharedEngine) sharedEngine = createEngine()
  return sharedEngine
}

/**
 * Call from a user-gesture handler (e.g. the boot sequence's "Enter system"
 * button) to unlock and start the ambient drone. Safe to call more than
 * once — later calls just resume an already-suspended context.
 */
export function startAmbient() {
  const engine = getEngine()
  if (engine.ctx.state === 'suspended') engine.ctx.resume()
}

/**
 * React hook: retunes the shared ambient engine to the given mode, and fades
 * it in or out based on `muted`. Mount once near the app root — it doesn't
 * create a new engine per call, just adjusts the shared one.
 */
export function useAmbient(modeId, muted) {
  useEffect(() => {
    if (!sharedEngine) return undefined
    const { ctx, master, osc1, osc2, filter } = sharedEngine
    const tone = MODE_TONE[modeId] || MODE_TONE.home
    const now = ctx.currentTime

    osc1.frequency.linearRampToValueAtTime(tone.base, now + 1.2)
    osc2.frequency.linearRampToValueAtTime(tone.base + tone.detune, now + 1.2)
    filter.frequency.linearRampToValueAtTime(tone.cutoff, now + 1.2)

    const targetGain = muted ? 0 : 0.05
    master.gain.linearRampToValueAtTime(targetGain, now + 0.8)

    return undefined
  }, [modeId, muted])
}
