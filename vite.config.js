import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // framer-motion is used throughout the app (it's meant to load eagerly),
    // so it gets its own stable vendor chunk for caching. three.js and
    // @react-three are deliberately NOT force-grouped here: they're only
    // ever reached via dynamic import(SageCore), and naming/grouping them
    // into an explicit vendor chunk was actually promoting that chunk to an
    // eager <link rel="modulepreload"> in index.html, defeating the whole
    // point of deferring the ~900KB 3D bundle until after the boot sequence.
    // Leaving them alone lets Rollup's default async-chunk splitting do the
    // right thing: fetch only when the dynamic import actually fires.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion')) return 'motion'
          return undefined
        },
      },
    },
  },
})
