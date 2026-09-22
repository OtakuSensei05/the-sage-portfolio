import { motion } from 'framer-motion'
import GlassCard from '../../components/GlassCard'
import { interests, philosophy, learningMission, archives } from '../../data/sage'
import { getMode } from '../../lib/theme'

const mode = getMode('sage')

export default function SageMode() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="font-display text-3xl md:text-4xl">The Sage Mode</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
        A journey of continuous learning across technology, science, human behaviour and the systems that shape the
        world. Engineering builds the future — understanding the world creates better solutions.
      </p>

      <Section title="Interests">
        <div className="grid gap-5 sm:grid-cols-2">
          {interests.map((i) => (
            <GlassCard key={i.id} accent={mode.accent}>
              <h3 className="font-display text-sm">{i.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{i.text}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Current learning mission">
        <GlassCard accent={mode.accent}>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {learningMission.map((m) => (
              <li key={m} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: mode.accent }} />
                {m}
              </li>
            ))}
          </ul>
        </GlassCard>
      </Section>

      <Section title={philosophy.title}>
        <GlassCard accent={mode.accent}>
          <p className="text-sm leading-relaxed text-slate-300">{philosophy.text}</p>
        </GlassCard>
      </Section>

      <Section title="Knowledge archive">
        <div className="grid gap-5 sm:grid-cols-3">
          <ArchiveColumn title="Books" items={archives.books} empty="No books logged yet." />
          <ArchiveColumn title="Notes" items={archives.notes} empty="No notes published yet." />
          <ArchiveColumn title="Experiments" items={archives.experiments} empty="No experiments logged yet." />
        </div>
      </Section>
    </motion.div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-14 mt-14">
      <h2 className="mb-5 font-display text-lg">{title}</h2>
      {children}
    </section>
  )
}

function ArchiveColumn({ title, items, empty }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-5">
      <h3 className="font-mono text-xs tracking-widest text-slate-500">{title.toUpperCase()}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-600">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
