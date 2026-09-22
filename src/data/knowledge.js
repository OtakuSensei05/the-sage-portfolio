import { profile } from './profile'
import { focusAreas, toolkit, tools, academicRecord, journey } from './engineer'
import { interests, philosophy, learningMission, archives } from './sage'
import { projects, directions, pipeline } from './projects'

// ─────────────────────────────────────────────────────────────────────────────
// The single knowledge base the AI assistant is allowed to draw from.
// Both the serverless endpoint (api/ask.js) and the offline fallback
// responder (src/lib/localAnswer.js) build their answers from exactly this —
// nothing more. If a fact isn't in here, the assistant says it doesn't know.
// ─────────────────────────────────────────────────────────────────────────────

export function buildKnowledgeBase() {
  return {
    identity: {
      name: profile.name,
      fullName: profile.fullName,
      role: profile.role,
      university: profile.university,
      country: profile.country,
      degree: profile.degree,
      degreeStart: profile.degreeStart,
      level: profile.level,
      bio: profile.bio,
      vision: profile.vision,
    },
    focusAreas,
    toolkit,
    tools,
    academicRecord,
    journey,
    sageInterests: interests,
    philosophy,
    learningMission,
    archives,
    projects: projects.map((p) => ({
      title: p.title,
      category: p.category,
      status: p.status,
      summary: p.summary,
      technologies: p.technologies,
    })),
    researchDirections: directions,
    developmentPipeline: pipeline,
  }
}

export function knowledgeBaseAsText() {
  const kb = buildKnowledgeBase()
  const lines = []
  lines.push(`Name: ${kb.identity.fullName} (goes by ${kb.identity.name})`)
  lines.push(`Role: ${kb.identity.role} at ${kb.identity.university}, ${kb.identity.country}`)
  lines.push(`Degree: ${kb.identity.degree}, started ${kb.identity.degreeStart}, currently level ${kb.identity.level}`)
  lines.push(`Bio: ${kb.identity.bio.join(' ')}`)
  lines.push(`Vision: ${kb.identity.vision}`)
  lines.push('')
  lines.push('Focus areas:')
  kb.focusAreas.forEach((f) => lines.push(`- ${f.title}: ${f.text}`))
  lines.push('')
  lines.push(`Tools/software used: ${kb.tools.join(', ')}`)
  lines.push('')
  lines.push('Academic record:')
  kb.academicRecord.forEach((a) => lines.push(`- ${a.level}: ${a.summary}${a.detail ? ` — ${a.detail}` : ''}`))
  lines.push('')
  lines.push('Engineering journey:')
  kb.journey.forEach((j) => lines.push(`- ${j.year}: ${j.title} — ${j.text}`))
  lines.push('')
  lines.push('The Sage Mode interests:')
  kb.sageInterests.forEach((i) => lines.push(`- ${i.label}: ${i.text}`))
  lines.push('')
  lines.push(
    kb.projects.length
      ? `Published Project Blackbox case studies:\n${kb.projects
          .map((p) => `- ${p.title} (${p.status}): ${p.summary}`)
          .join('\n')}`
      : 'Published Project Blackbox case studies: none yet — the archive is being built.'
  )
  lines.push('')
  lines.push('Project Blackbox research directions (not completed projects, just directions):')
  kb.researchDirections.forEach((d) => lines.push(`- ${d.title} (${d.status}): ${d.text}`))
  return lines.join('\n')
}
