import { useMemo, useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { getMode } from '../lib/theme'

// ─────────────────────────────────────────────────────────────────────────────
// SageCore — the signature centerpiece: a rotating, mode-reactive
// black-hole-inspired core. Deliberately a *bounded, self-contained object*
// (not a full-viewport background) — give its wrapper an explicit size and
// it renders as a contained centerpiece, the way a hero graphic should.
// Pair it with <Starfield /> for full-page ambience; SageCore itself only
// draws the horizon + disk + a close ring of particles.
//
// Built from three cheap layered pieces rather than one expensive
// simulation, so it stays smooth on modest hardware:
//   1. EventHorizon — a near-black sphere with a fresnel rim light
//   2. AccretionDisk — a shader plane in polar coordinates: turbulent bands,
//      angular drift, radial falloff, additive glow
//   3. a ring of additive particles for depth
//
// The disk shader is written so a later pass can add real gravitational
// lensing (warping a background render-target by the same radial falloff)
// without touching this component's public surface.
// ─────────────────────────────────────────────────────────────────────────────

const DiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color('#6fb7ff'),
    uColorB: new THREE.Color('#b98bff'),
    uSpeed: 0.4,
    uOpacity: 1,
  },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uSpeed;
    uniform float uOpacity;

    // cheap hash-based noise — no external deps
    float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      float a = hash(i), b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 centered = vUv - 0.5;
      float radius = length(centered) * 2.0;
      float angle = atan(centered.y, centered.x);

      // inner event-horizon cutout + soft outer falloff
      float inner = smoothstep(0.28, 0.42, radius);
      float outer = 1.0 - smoothstep(0.75, 1.0, radius);
      float ring = inner * outer;

      float drift = uTime * uSpeed;
      float bands = noise(vec2(angle * 2.4 + drift, radius * 5.0 - drift * 0.5));
      bands += 0.5 * noise(vec2(angle * 5.0 - drift * 1.6, radius * 9.0));
      bands = clamp(bands, 0.0, 1.0);

      vec3 color = mix(uColorA, uColorB, radius * 0.85 + bands * 0.3);
      float glow = ring * (0.35 + 0.65 * bands);

      gl_FragColor = vec4(color, glow * uOpacity);
    }
  `
)

const HorizonMaterial = shaderMaterial(
  { uColorA: new THREE.Color('#6fb7ff') },
  /* vertex */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* fragment */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform vec3 uColorA;
    void main() {
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);
      vec3 base = vec3(0.01, 0.012, 0.02);
      vec3 color = mix(base, uColorA, fresnel);
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ DiskMaterial, HorizonMaterial })

function Core({ modeId, quality, interactive, reducedMotion }) {
  const group = useRef()
  const disk = useRef()
  const horizon = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const mode = getMode(modeId)
  const colorA = useMemo(() => new THREE.Color(mode.core.a), [mode.core.a])
  const colorB = useMemo(() => new THREE.Color(mode.core.b), [mode.core.b])

  useEffect(() => {
    if (!interactive) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [interactive])

  useFrame((_, delta) => {
    if (disk.current) {
      disk.current.material.uTime += delta
      disk.current.material.uColorA.lerp(colorA, 0.04)
      disk.current.material.uColorB.lerp(colorB, 0.04)
      disk.current.material.uSpeed = mode.core.speed
    }
    if (horizon.current) horizon.current.material.uColorA.lerp(colorA, 0.04)
    if (group.current) {
      if (!reducedMotion) {
        group.current.rotation.z += delta * 0.06
        const targetX = 0.62 + (interactive ? pointer.current.y * 0.08 : 0)
        const targetY = interactive ? pointer.current.x * 0.12 : 0
        group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03
        group.current.rotation.y += (targetY - group.current.rotation.y) * 0.03
      } else {
        group.current.rotation.x = 0.62
      }
    }
  })

  const diskSegments = quality === 'low' ? 48 : 128

  return (
    <group ref={group} rotation={[0.62, 0, 0]}>
      <mesh ref={horizon}>
        <sphereGeometry args={[0.62, quality === 'low' ? 32 : 64, quality === 'low' ? 32 : 64]} />
        <horizonMaterial uColorA={colorA} />
      </mesh>
      <mesh ref={disk} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, diskSegments]} />
        <diskMaterial
          uColorA={colorA}
          uColorB={colorB}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function Particles({ modeId, quality }) {
  const points = useRef()
  const mode = getMode(modeId)
  const count = quality === 'low' ? 220 : 700
  const positions = useMemo(() => {
    // Deterministic pseudo-random (seeded by index) rather than Math.random —
    // keeps the component pure so React can safely re-render it, and gives
    // the same starfield layout on every mount instead of reshuffling.
    const seededRandom = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.4 + seededRandom(i * 3.1) * 3.2
      const theta = seededRandom(i * 7.7 + 1) * Math.PI * 2
      const y = (seededRandom(i * 5.3 + 2) - 0.5) * 1.4
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={mode.core.a}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function useWebglSupport() {
  // Lazy initializer runs once during the first render — this is a
  // client-only Vite SPA (no SSR), so reading the DOM here is safe and
  // avoids the extra render pass a useEffect+setState round-trip would cost.
  const [supported] = useState(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      return !!gl
    } catch {
      return false
    }
  })
  return supported
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function StaticFallback({ modeId }) {
  const mode = getMode(modeId)
  return (
    <div
      aria-hidden="true"
      className="w-full h-full rounded-full"
      style={{
        background: `radial-gradient(circle at 50% 45%, ${mode.core.a}55, ${mode.core.b}22 45%, transparent 72%)`,
        filter: 'blur(2px)',
      }}
    />
  )
}

/**
 * SageCore — usage: <SageCore modeId="engineer" interactive />
 * Renders a WebGL scene when available, and a soft CSS glow otherwise so the
 * page never breaks. `interactive` enables the subtle pointer-follow tilt.
 */
export default function SageCore({ modeId = 'home', interactive = false, className = '' }) {
  const webglOk = useWebglSupport()
  const reducedMotion = usePrefersReducedMotion()
  const [quality] = useState(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4
    return coarse || lowCores ? 'low' : 'high'
  })

  if (!webglOk) {
    return (
      <div className={className}>
        <StaticFallback modeId={modeId} />
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas
        dpr={quality === 'low' ? [1, 1.25] : [1, 2]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Core modeId={modeId} quality={quality} interactive={interactive} reducedMotion={reducedMotion} />
          <Particles modeId={modeId} quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  )
}
