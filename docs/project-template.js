// ─────────────────────────────────────────────────────────────────────────────
// PROJECT TEMPLATE — copy this object into the `projects` array in
// src/data/projects.js and replace every value with the truth.
//
// This file is NOT imported by the site, so nothing here is ever published.
// All fields except `slug` and `title` are optional; empty ones are hidden.
//
// Media (`hero`, `gallery`, `cad`, `circuits`, `simulation`) take
//   { src: '/images/projects/<slug>/photo.jpg', alt: 'What the image shows', caption: '' }
// Put the image files in  public/images/projects/<slug>/
// ─────────────────────────────────────────────────────────────────────────────

export const projectTemplate = {
  slug: 'my-first-project', // used in the URL:  /#/blackbox/my-first-project
  title: 'Project title',
  category: 'Embedded systems', // free text
  date: '2026-09', // YYYY-MM
  status: 'In progress', // 'Concept' | 'In progress' | 'Completed' | 'Archived'
  summary: 'One or two sentences shown on the project card.',
  description: 'A longer overview shown at the top of the case study.',
  technologies: ['SolidWorks', 'Proteus'], // shown as tags and given to the AI
  team: [], // optional: names of collaborators you want public

  hero: null, // { src, alt }
  gallery: [], // [{ src, alt, caption }]

  problem: '',
  objective: '',
  approach: '',
  hardware: [], // ['Component — why it was chosen']
  software: [], // ['Tool — what it did']
  cad: [], // media items
  circuits: [], // media items
  code: [], // [{ label: 'Firmware', href: 'https://github.com/...' }]
  simulation: [], // media items
  results: '',
  documents: [], // [{ label: 'Report (PDF)', href: '/docs/report.pdf' }]
  videos: [], // [{ label: 'Demo', href: 'https://...' }]
  lessons: '',
  future: '',
}
