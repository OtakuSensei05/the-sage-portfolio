# The SAGE Portfolio — v3.0

The personal engineering portfolio of **Kelvin T. Muchabaya**, Mechatronics
Engineering student at Chinhoyi University of Technology.

Live: https://the-sage-portfolio.vercel.app/

## What this is

A React + Vite + Tailwind site built around **The SAGE Core** — a
shader-based, mode-reactive centerpiece — with three sections:

- **Engineer Mode** — technical profile, toolkit, education, journey
- **The Sage Mode** — interests, learning mission, knowledge archive
- **Project Blackbox** — engineering case-study archive (data-driven, empty
  until real projects are added — see below)

Plus a real AI assistant (`SAGE AI`) that answers questions about Kelvin from
a structured knowledge base only — never invents facts.

## Local development

```bash
npm install
npm run dev
```

The AI assistant works offline in dev too — without `ANTHROPIC_API_KEY` set,
it falls back to answering the same knowledge base locally (see
`src/lib/localAnswer.js`), so the site is never broken, just less eloquent,
before you configure the key.

## Adding real content

Everything a visitor sees, and everything the AI is allowed to say, comes
from `src/data/`:

- `profile.js` — name, bio, contact links, photo/CV paths
- `engineer.js` — toolkit, academic record, journey
- `sage.js` — interests, learning mission, knowledge archive
- `projects.js` — Project Blackbox case studies (starts empty)

To publish a project case study: copy `docs/project-template.js`, fill in
what's true, add it to the `projects` array in `src/data/projects.js`, and
drop any images in `public/images/projects/<slug>/`.

To add your photo or CV: drop the files in `public/images/` or `public/cv/`
and update the paths in `src/data/profile.js`.

## The AI assistant

`api/ask.js` is a Vercel serverless function that calls the Anthropic API,
constrained to the knowledge base above. To enable it in production:

1. Get a key at https://console.anthropic.com/
2. In Vercel → Project Settings → Environment Variables, add
   `ANTHROPIC_API_KEY`
3. Redeploy

See `.env.example` for local development.

## Build

```bash
npm run build   # outputs to dist/
npm run lint
```

## Deploying

This project is set up for Vercel (zero-config for Vite). Push to the
`OtakuSensei05/the-sage-portfolio` repository and Vercel will build and
deploy automatically. Set `ANTHROPIC_API_KEY` in the Vercel dashboard for the
AI assistant to use the real backend rather than its offline fallback.

## `legacy-v2/`

A full, untouched copy of the previous version of this project, kept for
reference/rollback. It isn't imported by the app and isn't part of the
production build — safe to delete once you've verified v3 and no longer need
to compare against it.
