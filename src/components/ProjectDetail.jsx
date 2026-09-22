import { motion } from 'framer-motion'
import { caseStudySections } from '../data/projects'
import { getMode } from '../lib/theme'

export default function ProjectDetail({ project, onBack }) {
  const mode = getMode('blackbox')

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <button type="button" onClick={onBack} className="sage-btn-ghost mb-8">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M13 8H3.5M7.5 3.5 3 8l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Project Blackbox
      </button>

      <p className="font-mono text-xs tracking-widest text-slate-500">
        {project.category} · {project.date} · {project.status?.toUpperCase()}
      </p>
      <h1 className="mt-2 font-display text-3xl">{project.title}</h1>
      {project.description && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">{project.description}</p>}

      {project.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span key={t} className="sage-pill">
              {t}
            </span>
          ))}
        </div>
      )}

      {project.hero && (
        <img
          src={project.hero.src}
          alt={project.hero.alt}
          className="mt-8 w-full rounded-2xl border border-white/10"
        />
      )}

      <div className="mt-10 space-y-10">
        {caseStudySections.map((section) => {
          const value = project[section.key]
          const hasContent = Array.isArray(value) ? value.length > 0 : Boolean(value)
          if (!hasContent) return null
          return (
            <section key={section.key}>
              <h2 className="mb-3 font-display text-base" style={{ color: mode.accent }}>
                {section.title}
              </h2>
              <SectionBody type={section.type} value={value} />
            </section>
          )
        })}
      </div>

      {project.gallery?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-base" style={{ color: mode.accent }}>
            Gallery
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-xl border border-white/10">
                <img src={img.src} alt={img.alt} className="w-full" />
                {img.caption && <figcaption className="p-2 text-xs text-slate-500">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}

function SectionBody({ type, value }) {
  if (type === 'text') {
    return <p className="text-sm leading-relaxed text-slate-300">{value}</p>
  }
  if (type === 'list') {
    return (
      <ul className="space-y-2 text-sm text-slate-300">
        {value.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (type === 'links') {
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noreferrer" className="sage-btn-ghost">
            {link.label}
          </a>
        ))}
      </div>
    )
  }
  if (type === 'media') {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {value.map((img, i) => (
          <figure key={i} className="overflow-hidden rounded-xl border border-white/10">
            <img src={img.src} alt={img.alt} className="w-full" />
            {img.caption && <figcaption className="p-2 text-xs text-slate-500">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    )
  }
  return null
}
