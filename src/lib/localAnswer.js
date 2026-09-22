import { buildKnowledgeBase } from '../data/knowledge'

// Offline fallback: used only when /api/ask isn't reachable or isn't
// configured yet (no ANTHROPIC_API_KEY set). It never invents anything — it
// just surfaces real entries from the knowledge base by keyword, or says
// plainly that it doesn't know. Once the API key is set in Vercel, the real
// AI in api/ask.js takes over automatically.

const kb = buildKnowledgeBase()

const TOPICS = [
  {
    test: /who is|about kelvin|introduce/i,
    answer: () =>
      `${kb.identity.fullName} is ${kb.identity.role.toLowerCase()} at ${kb.identity.university}, ${kb.identity.country}. ${kb.identity.bio[0]}`,
  },
  {
    test: /study|degree|university|education|level/i,
    answer: () =>
      `Kelvin is studying ${kb.identity.degree} at ${kb.identity.university}, started in ${kb.identity.degreeStart}, currently at level ${kb.identity.level}.`,
  },
  {
    test: /tool|software|solidworks|proteus|cad/i,
    answer: () => `Kelvin's toolkit includes ${kb.tools.join(', ')}.`,
  },
  {
    test: /project/i,
    answer: () =>
      kb.projects.length
        ? `Published case studies: ${kb.projects.map((p) => p.title).join(', ')}.`
        : "Project Blackbox doesn't have any published case studies yet — Kelvin is still building the archive. Ask again once it's live.",
  },
  {
    test: /interest|hobby|sage mode|curious|read|book/i,
    answer: () => `Kelvin's Sage Mode interests: ${kb.sageInterests.map((i) => i.label).join(', ')}.`,
  },
  {
    test: /vision|goal|future|company/i,
    answer: () => kb.identity.vision,
  },
]

export function localAnswer(question) {
  const hit = TOPICS.find((t) => t.test.test(question))
  if (hit) return hit.answer()
  return "That isn't published on the site yet — try asking about Kelvin's education, tools, projects, or interests."
}
