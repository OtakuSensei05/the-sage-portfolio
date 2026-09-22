import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The 3D core (three.js) and framer-motion are the two heavy, rarely-
    // changing dependencies — splitting them into their own chunk means a
    // content edit doesn't invalidate the vendor cache, and the initial
    // JS payload for a first paint is smaller.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          return undefined
        },
      },
    },
  },
})
