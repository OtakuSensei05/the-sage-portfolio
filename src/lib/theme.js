// Mode → visual language. Every mode-aware component reads from here so the
// three atmospheres (Engineer / Sage / Blackbox) stay consistent everywhere:
// the Core, buttons, borders, HUD accents.

export const modes = {
  home: {
    id: 'home',
    label: 'The SAGE',
    accent: '#6fb7ff',
    accentSoft: 'rgba(111, 183, 255, 0.14)',
    core: { a: '#6fb7ff', b: '#b98bff', speed: 0.35 },
  },
  engineer: {
    id: 'engineer',
    label: 'Engineer Mode',
    short: 'ENGINEER',
    accent: '#5ec8ff',
    accentSoft: 'rgba(94, 200, 255, 0.14)',
    core: { a: '#5ec8ff', b: '#3b6fd8', speed: 0.55 },
  },
  sage: {
    id: 'sage',
    label: 'The Sage Mode',
    short: 'SAGE',
    accent: '#a78bfa',
    accentSoft: 'rgba(167, 139, 250, 0.14)',
    core: { a: '#a78bfa', b: '#5b3fae', speed: 0.22 },
  },
  blackbox: {
    id: 'blackbox',
    label: 'Project Blackbox',
    short: 'BLACKBOX',
    accent: '#ff8a5c',
    accentSoft: 'rgba(255, 138, 92, 0.14)',
    core: { a: '#ff6a4a', b: '#7a1f1f', speed: 0.75 },
  },
}

export const modeList = ['engineer', 'sage', 'blackbox']

export function getMode(id) {
  return modes[id] || modes.home
}
