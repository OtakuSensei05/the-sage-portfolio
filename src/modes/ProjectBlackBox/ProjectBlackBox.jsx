import { motion } from 'framer-motion'
import GlassCard from '../../components/GlassCard'
import ProjectCard from '../../components/ProjectCard'
import ProjectDetail from '../../components/ProjectDetail'
import { projects, directions, pipeline, caseStudyBlueprint } from '../../data/projects'
import { getMode } from '../../lib/theme'

const mode = getMode('blackbox')

export default function ProjectBlackBox({ slug, onOpenProject, onBack }) {
  const activeProject = slug ? projects.find((p) => p.slug === slug) : null

  if (slug && activeProject) {
    return <ProjectDetail project={activeProject} onBack={onBack} />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h1 className="font-display text-3xl md:text-4xl">Project Blackbox</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
        The research and engineering-project archive. Concepts move from imagination toward reality here — each entry
        becomes a full case study once it's real.
      </p>

      <Section title="Case studies">
        {projects.length === 0 ? (
          <EmptyArchive />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} onOpen={onOpenProject} index={i} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Research directions">
        <div className="grid gap-5 sm:grid-cols-2">
          {directions.map((d) => (
            <GlassCard key={d.id} accent={mode.accent}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-sm">{d.title}</h3>
                <span className="font-mono text-[0.65rem] text-slate-500">{d.status.toUpperCase()}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{d.text}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Development pipeline">
        <ol className="grid gap-4 sm:grid-cols-4">
          {pipeline.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-white/8 p-4">
              <p className="font-mono text-xs" style={{ color: mode.accent }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-sm">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.text}</p>
            </li>
          ))}
        </ol>
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

function EmptyArchive() {
  return (
    <div className="rounded-2xl border border-dashed border-white/12 p-8 text-center">
      <p className="text-sm text-slate-400">No case studies published yet — this archive is being built.</p>
      <p className="mt-4 font-mono text-xs tracking-widest text-slate-600">EVERY CASE STUDY WILL COVER</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {caseStudyBlueprint.map((item) => (
          <span key={item} className="sage-pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
