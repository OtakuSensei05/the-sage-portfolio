import { useMemo, useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { getMode } from '../lib/theme'

// ─────────────────────────────────────────────────────────────────────────────
// SageCore — the signature centerpiece: a mode-reactive, black-hole-inspired
// core. Deliberately a *bounded, self-contained object* (not a full-viewport
// background) — give its wrapper an explicit size and it renders as a
// contained centerpiece. Pair it with <Starfield /> for page-wide ambience.
//
// Design notes from the second pass (fixing "looks like a disco ball, too
// shiny/spherical, no real interactivity"):
//
// - MOTION: previously the disk mesh physically spun AND the shader's own
//   noise pattern scrolled independently — two uncorrelated motions at high
//   angular frequency beat against each other and read as flicker/strobe,
//   not a stately rotation. Now there is exactly ONE source of visible
//   motion: the shader's internal time-based drift. The mesh itself never
//   rotates. Much slower drift + lower angular noise frequencies = a calm,
//   coherent swirl instead of a spinning light show.
//
// - SHAPE: a wide, soft fresnel rim-light on the event-horizon sphere is
//   exactly what makes a 3D sphere read as a lit, glossy ball (think
//   Christmas ornament) rather than a flat black silhouette. Real black
//   hole imagery is almost pure flat black with only a razor-thin bright
//   edge. The horizon material's fresnel is now much narrower and dimmer,
//   and the dedicated PhotonRing is the single, sole bright rim (no more
//   double-bright-ring from two overlapping glow sources).
//
// - INTERACTIVITY: real drag-to-orbit and scroll-to-zoom via drei's
//   OrbitControls, scoped to the large interactive hero instance only (the
//   small decorative corner instance on mode pages stays fully static and
//   non-interactive, so it never fights page scroll/drag). A slow autoRotate
//   keeps it feeling alive when nobody's touching it, and pauses for
//   prefers-reduced-motion.
//
// Full gravitational lensing (background visibly bending around the disk)
// still needs ray-marching through a warped background render — a genuinely
// separate project, not attempted here.
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

      // Tighter bright band close to the horizon, fading out sooner — reads
      // as a dense ring of matter rather than a huge diffuse halo filling
      // the frame (the "spotlight" look the disco-ball complaint pointed at).
      float inner = smoothstep(0.30, 0.40, radius);
      float outer = 1.0 - smoothstep(0.52, 0.80, radius);
      float ring = inner * outer;

      // ONE slow, coherent drift — this is the only source of motion in the
      // whole Core. Angular frequencies kept low so phase changes read as a
      // gentle swirl, not a strobe.
      float drift = uTime * uSpeed * 0.16;
      float streaks = noise(vec2(angle * 4.0 + drift, radius * 6.0 - drift * 0.4));
      streaks += 0.55 * noise(vec2(angle * 8.0 - drift * 1.3, radius * 11.0));
      streaks += 0.3 * noise(vec2(angle * 3.0 + drift * 0.5, radius * 3.5));
      streaks = clamp(streaks / 1.85, 0.0, 1.0);

      // subtle brightness asymmetry across the disk — a stylised nod to
      // Doppler beaming, kept gentle so it doesn't itself look like a
      // rotating light source.
      float sideBias = 0.85 + 0.3 * (0.5 + 0.5 * cos(angle - 0.6));

      vec3 color = mix(uColorA, uColorB, radius * 0.8 + streaks * 0.35);
      float glow = ring * (0.28 + 0.6 * streaks) * sideBias * 0.85;

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
      // A narrow, dim fresnel — just enough to hint the sphere isn't a flat
      // cutout, without the wide glossy-highlight gradient that reads as a
      // lit 3D ball. The PhotonRing (below) carries almost all the brightness.
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 5.5);
      vec3 base = vec3(0.006, 0.007, 0.011);
      vec3 color = mix(base, uColorA, fresnel * 0.22);
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ DiskMaterial, HorizonMaterial })

// A tight, bright ring right at the horizon's edge — the single dominant
// bright accent in the whole Core (the sphere itself stays almost pure
// black). This, not a shiny sphere, is what should read as "the black hole".
function PhotonRing({ radius, color }) {
  const mat = useRef()
  useFrame(() => {
    if (mat.current) mat.current.color.lerp(color, 0.04)
  })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.99, radius * 1.05, 96]} />
      <meshBasicMaterial
        ref={mat}
        color="#6fb7ff"
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function Core({ modeId, quality }) {
  const disk = useRef()
  const horizon = useRef()
  const mode = getMode(modeId)
  const colorA = useMemo(() => new THREE.Color(mode.core.a), [mode.core.a])
  const colorB = useMemo(() => new THREE.Color(mode.core.b), [mode.core.b])

  useFrame((_, delta) => {
    if (disk.current) {
      disk.current.material.uTime += delta
      disk.current.material.uColorA.lerp(colorA, 0.04)
      disk.current.material.uColorB.lerp(colorB, 0.04)
      disk.current.material.uSpeed = mode.core.speed
    }
    if (horizon.current) horizon.current.material.uColorA.lerp(colorA, 0.04)
  })

  const diskSegments = quality === 'low' ? 48 : 128
  const horizonRadius = 0.62

  return (
    <group rotation={[0.5, 0, 0]}>
      {/* Stationary mass at the centre. No rotation of its own — a sphere
          is symmetric, and this is what should read as "the thing
          everything else orbits", never moving itself. */}
      <mesh ref={horizon}>
        <sphereGeometry args={[horizonRadius, quality === 'low' ? 32 : 64, quality === 'low' ? 32 : 64]} />
        <horizonMaterial uColorA={colorA} />
      </mesh>

      <PhotonRing radius={horizonRadius} color={colorA} />

      {/* The disk mesh itself never rotates — all visible motion comes
          from the shader's internal time-based drift (see DiskMaterial
          above). One motion source only. */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={disk}>
          <circleGeometry args={[2.1, diskSegments]} />
          <diskMaterial
            uColorA={colorA}
            uColorB={colorB}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  )
}

function Particles({ modeId, quality, reducedMotion }) {
  const points = useRef()
  const dataRef = useRef(null)
  const mode = getMode(modeId)
  const count = quality === 'low' ? 160 : 460
  const OUTER_R = 3.6
  const INNER_R = 0.78

  useEffect(() => {
    const seededRandom = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453
      return x - Math.floor(x)
    }
    const radius = new Float32Array(count)
    const angle = new Float32Array(count)
    const y = new Float32Array(count)
    const speed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      radius[i] = INNER_R + seededRandom(i * 3.1) * (OUTER_R - INNER_R)
      angle[i] = seededRandom(i * 7.7 + 1) * Math.PI * 2
      y[i] = (seededRandom(i * 5.3 + 2) - 0.5) * 1.1
      speed[i] = 0.25 + seededRandom(i * 9.1 + 3) * 0.3
    }
    const positions = new Float32Array(count * 3)
    dataRef.current = { radius, angle, y, speed, positions }
    if (points.current) {
      points.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [count])

  useFrame((_, delta) => {
    const data = dataRef.current
    if (!points.current || !data) return
    const { radius, angle, y, speed, positions } = data
    const dt = reducedMotion ? 0 : delta
    for (let i = 0; i < count; i++) {
      // matter falls inward slowly, picking up angular speed as it nears
      // the centre (a loose nod to real orbital mechanics) — a calm drift,
      // not a fast whirl.
      const proximity = 1 - (radius[i] - INNER_R) / (OUTER_R - INNER_R)
      radius[i] -= dt * (0.05 + proximity * 0.22) * speed[i]
      angle[i] += dt * (0.12 + proximity * 0.7) * speed[i]

      if (radius[i] <= INNER_R) {
        radius[i] = OUTER_R
        angle[i] = Math.random() * Math.PI * 2
      }

      const r = radius[i]
      const a = angle[i]
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = y[i] * proximity * 0.6 + y[i] * 0.4
      positions[i * 3 + 2] = Math.sin(a) * r
    }
    const posAttr = points.current.geometry.attributes.position
    if (posAttr) posAttr.needsUpdate = true
  })

  return (
    <group rotation={[0.5, 0, 0]}>
      <points ref={points}>
        <bufferGeometry />
        <pointsMaterial
          size={0.018}
          color={mode.core.a}
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function useWebglSupport() {
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
 * page never breaks. `interactive` enables real drag-to-orbit and
 * scroll-to-zoom (via drei's OrbitControls) plus a slow idle auto-rotate;
 * without it, the Core is a fully static decorative element (used for the
 * small corner instance on mode pages, so it never fights page scrolling).
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
          <Core modeId={modeId} quality={quality} />
          <Particles modeId={modeId} quality={quality} reducedMotion={reducedMotion} />
          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={2.6}
              maxDistance={7}
              enableDamping
              dampingFactor={0.08}
              autoRotate={!reducedMotion}
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
