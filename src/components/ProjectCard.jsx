import { motion } from 'framer-motion'
import { getMode } from '../lib/theme'

const STATUS_TONE = {
  Concept: 'text-purple-300',
  'In progress': 'text-amber-300',
  Completed: 'text-emerald-300',
  Archived: 'text-slate-400',
}

export default function ProjectCard({ project, onOpen, index = 0 }) {
  const mode = getMode('blackbox')
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project.slug)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="sage-card group text-left"
      style={{ '--card-accent': mode.accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.65rem] tracking-widest text-slate-500">{project.category}</p>
          <h3 className="mt-1 font-display text-base">{project.title}</h3>
        </div>
        <span className={`font-mono text-[0.65rem] ${STATUS_TONE[project.status] || 'text-slate-400'}`}>
          {project.status?.toUpperCase()}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-400 sage-clamp-3">{project.summary}</p>
      {project.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="sage-pill">
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs" style={{ color: mode.accent }}>
        Open case study
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.button>
  )
}
