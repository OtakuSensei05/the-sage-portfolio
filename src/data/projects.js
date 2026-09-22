// ─────────────────────────────────────────────────────────────────────────────
// PROJECT BLACKBOX — case-study archive.
//
// `projects` is intentionally EMPTY: no project is invented for Kelvin.
// To publish a case study, copy docs/project-template.js, fill in what is true,
// and add it to this array. Every field is optional except `slug` and `title`;
// sections with no content are simply not shown.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = []

// Research directions from the original site. These are directions, not
// completed projects, and are labelled with their honest status.
export const directions = [
  {
    id: 'robotics',
    title: 'Autonomous robotics',
    text: 'Future exploration of robotic systems, automation and intelligent machines.',
    status: 'Planned',
  },
  {
    id: 'ai-systems',
    title: 'AI engineering systems',
    text: 'Exploring AI applications in engineering, research and productivity.',
    status: 'Learning',
  },
  {
    id: 'embedded',
    title: 'Embedded systems',
    text: 'Microcontrollers, sensors, electronics and automation projects.',
    status: 'Upcoming',
  },
  {
    id: 'future-tech',
    title: 'Future technologies',
    text: 'Ideas inspired by space, advanced engineering and innovation.',
    status: 'Concept',
  },
]

// The development pipeline (a genuine sequence).
export const pipeline = [
  { title: 'Research & learn', text: 'Understand the problem and the physics before touching a tool.' },
  { title: 'Design & simulate', text: 'CAD, CAE and circuit simulation to test ideas cheaply.' },
  { title: 'Prototype', text: 'Build the smallest version that can prove or break the idea.' },
  { title: 'Improve & deploy', text: 'Test, document, iterate — then put it to work.' },
]

// What every published case study will contain (shown on the empty archive).
export const caseStudyBlueprint = [
  'Problem statement',
  'Objective',
  'Engineering approach',
  'Hardware & software',
  'CAD & circuit diagrams',
  'Code & simulation',
  'Results',
  'Lessons learned',
]

// Sections a case study can render, in order. `key` matches the project field.
export const caseStudySections = [
  { key: 'problem', title: 'Problem statement', type: 'text' },
  { key: 'objective', title: 'Objective', type: 'text' },
  { key: 'approach', title: 'Engineering approach', type: 'text' },
  { key: 'hardware', title: 'Hardware', type: 'list' },
  { key: 'software', title: 'Software', type: 'list' },
  { key: 'cad', title: 'CAD', type: 'media' },
  { key: 'circuits', title: 'Circuit diagrams', type: 'media' },
  { key: 'code', title: 'Code', type: 'links' },
  { key: 'simulation', title: 'Simulation', type: 'media' },
  { key: 'results', title: 'Results', type: 'text' },
  { key: 'documents', title: 'Documentation', type: 'links' },
  { key: 'videos', title: 'Videos', type: 'links' },
  { key: 'lessons', title: 'Lessons learned', type: 'text' },
  { key: 'future', title: 'Future improvements', type: 'text' },
]
