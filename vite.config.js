import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the build work on any host or sub-path
// (Vercel, Netlify, GitHub Pages project sites...).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // keep every image / avatar layer as a real file instead of inlining it
    assetsInlineLimit: 0,
  },
})
