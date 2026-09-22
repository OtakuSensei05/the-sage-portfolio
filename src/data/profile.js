// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC PROFILE DATA — the single source of truth for who Kelvin is.
// Everything here is shown to visitors AND given to the AI assistant as its
// only approved knowledge. Never put private information in this file.
//
// Anything set to `null` is an unfilled placeholder: the UI shows a tidy
// "coming soon" state and the AI will say the information isn't published.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  brand: 'The SAGE',
  name: 'Kelvin T. Muchabaya',
  fullName: 'Kelvin Tadiwanashe Muchabaya',
  role: 'Mechatronics Engineering Student',
  tagline: 'AI • Robotics • Embedded Systems • Engineering',
  university: 'Chinhoyi University of Technology',
  country: 'Zimbabwe',
  degree: "Bachelor's Honours Degree in Mechatronic Engineering",
  degreeStart: 2024,
  level: '3.1',

  bio: [
    'Kelvin is a Mechatronics Engineering student exploring the intersection of engineering, artificial intelligence, software and hardware.',
    'He is passionate about designing intelligent systems, automation, robotics and innovative technologies, and about building technology and companies that create real impact — for Africa and beyond.',
  ],

  vision:
    'To create impactful technology and build solutions for Africa and beyond, and to grow this platform into a lasting record of his engineering career and a foundation for future companies.',

  // ── Placeholders: fill these in when you are ready ──────────────────────────
  // 1. Put your photo at  public/images/profile.jpg  then set:  '/images/profile.jpg'
  photo: null,
  // 2. Put your CV at  public/cv/Kelvin-T-Muchabaya-CV.pdf  then set that path.
  cv: null,

  contact: {
    email: null, // e.g. 'name@example.com'
    phone: null, // e.g. '+263 ...'
    linkedin: null, // full URL
    // Derived from the repository owner in your GitHub URL (OtakuSensei05).
    github: 'https://github.com/OtakuSensei05',
  },
}

export const siteMeta = {
  title: 'Kelvin T. Muchabaya — Mechatronics Engineering',
  description:
    'The SAGE — the digital engineering laboratory of Kelvin T. Muchabaya, a Mechatronics Engineering student at Chinhoyi University of Technology, Zimbabwe. AI, robotics, embedded systems and engineering.',
}
