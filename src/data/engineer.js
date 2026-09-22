// Engineer Mode data. Edit freely — the UI and the AI both read from here.
// Only list things that are true. Nothing here is a claim of proficiency level.

export const focusAreas = [
  {
    id: 'engineering',
    title: 'Engineering',
    text: 'Mechatronics, CAD design, CAE, electronics, microprocessors, embedded systems, control systems and automation.',
  },
  {
    id: 'software',
    title: 'Software',
    text: 'JavaScript, programming, AI tools, software development and problem solving.',
  },
  {
    id: 'vision',
    title: 'Vision',
    text: 'Building technologies and companies that create impact.',
  },
]

// Toolkit, grouped by discipline. `items` are names only.
export const toolkit = [
  { group: 'Design & analysis', items: ['SolidWorks', 'AutoCAD', 'CAE'] },
  { group: 'Electronics & embedded', items: ['Proteus', 'Electronics', 'Microprocessors'] },
  { group: 'Software', items: ['JavaScript', 'VS Code', 'NetBeans', 'Programming'] },
  { group: 'Systems', items: ['Control systems', 'Automation'] },
]

// Flat tool/software list (used by the AI knowledge base).
export const tools = ['SolidWorks', 'AutoCAD', 'Proteus', 'VS Code', 'NetBeans', 'JavaScript']

// Tools mentioned as possibilities but NOT yet confirmed by Kelvin.
// They are intentionally NOT displayed and NOT given to the AI.
// Move an item into `toolkit` above once you confirm you actually use it.
export const toConfirm = ['MATLAB/Simulink', 'ESP32', 'PIC / mikroC']

export const academicRecord = [
  {
    level: 'A Level',
    summary: 'A in Pure Mathematics • B in Technical Graphics and Design • C in Physics',
    detail: null,
  },
  {
    level: 'O Level',
    summary: '3 As • 5 Bs • 3 Cs • 1 D',
    detail:
      'A grades: Technical Graphics and Design, Heritage Studies, English Language. Strong subjects: Physics, Geography, Combined Science, History.',
  },
]

export const journey = [
  {
    year: '2023',
    title: 'Academic foundation',
    text: 'Completed A Level studies with a focus on Mathematics, Technical Graphics and Physics.',
  },
  {
    year: '2024',
    title: 'Mechatronics Engineering',
    text: "Started the Bachelor's Honours Degree in Mechatronic Engineering at Chinhoyi University of Technology.",
  },
  {
    year: '2026',
    title: 'Digital engineering identity',
    text: 'Developing skills in AI, software, hardware, CAD design and engineering research — and building The SAGE.',
  },
  {
    year: 'Next',
    title: 'Technology innovation',
    text: 'Building advanced technologies and companies focused on solving real problems.',
  },
]
