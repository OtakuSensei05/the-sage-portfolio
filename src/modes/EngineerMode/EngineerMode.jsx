import { motion } from 'framer-motion'
import GlassCard from '../../components/GlassCard'
import Timeline from '../../components/Timeline'
import { profile } from '../../data/profile'
import { focusAreas, toolkit, academicRecord, journey } from '../../data/engineer'
import { getMode } from '../../lib/theme'

const mode = getMode('engineer')

export default function EngineerMode() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{profile.name}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">{profile.bio[0]}</p>
        </div>
        <PhotoSlot />
      </div>

      <Section title="Focus areas">
        <div className="grid gap-5 sm:grid-cols-3">
          {focusAreas.map((f) => (
            <GlassCard key={f.id} accent={mode.accent}>
              <h3 className="font-display text-sm">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <GlassCard accent={mode.accent}>
          <h3 className="font-display text-base">{profile.university}</h3>
          <p className="mt-1 text-sm text-slate-300">{profile.degree}</p>
          <p className="mt-1 font-mono text-xs text-slate-500">Level {profile.level} · started {profile.degreeStart}</p>
        </GlassCard>
      </Section>

      <Section title="Toolkit">
        <div className="grid gap-5 sm:grid-cols-2">
          {toolkit.map((group) => (
            <GlassCard key={group.group} accent={mode.accent}>
              <h3 className="font-mono text-xs tracking-widest text-slate-500">{group.group.toUpperCase()}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="sage-pill">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Academic record">
        <div className="grid gap-5 sm:grid-cols-2">
          {academicRecord.map((rec) => (
            <GlassCard key={rec.level} accent={mode.accent}>
              <h3 className="font-display text-sm">{rec.level}</h3>
              <p className="mt-2 text-sm text-slate-300">{rec.summary}</p>
              {rec.detail && <p className="mt-2 text-sm leading-relaxed text-slate-500">{rec.detail}</p>}
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Engineering journey">
        <Timeline items={journey} accent={mode.accent} />
      </Section>

      <Section title="Connect">
        <ConnectRow />
      </Section>
    </motion.div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 font-display text-lg">{title}</h2>
      {children}
    </section>
  )
}

function PhotoSlot() {
  if (profile.photo) {
    return (
      <img
        src={profile.photo}
        alt={profile.name}
        className="h-28 w-28 rounded-2xl border border-white/10 object-cover"
      />
    )
  }
  return (
    <div
      className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 text-center font-mono text-[0.6rem] leading-tight text-slate-600"
      aria-label="Profile photo not yet added"
    >
      Add photo at
      <br />
      /public/images
      <br />
      /profile.jpg
    </div>
  )
}

function ConnectRow() {
  const links = [
    { label: 'Download CV', href: profile.cv, empty: 'Add CV at /public/cv/' },
    { label: 'GitHub', href: profile.contact.github, empty: null },
    { label: 'LinkedIn', href: profile.contact.linkedin, empty: 'Add LinkedIn URL in profile.js' },
    { label: 'Email', href: profile.contact.email ? `mailto:${profile.contact.email}` : null, empty: 'Add email in profile.js' },
  ]
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l) =>
        l.href ? (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="sage-btn-primary">
            {l.label}
          </a>
        ) : (
          <span
            key={l.label}
            title={l.empty}
            className="sage-btn-ghost cursor-not-allowed opacity-50"
            aria-disabled="true"
          >
            {l.label}
          </span>
        )
      )}
    </div>
  )
}
