import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  // Needed for GitHub Pages deployment at https://zoukari.github.io/Saro-birthday/
  base: '/Saro-birthday/',
})
