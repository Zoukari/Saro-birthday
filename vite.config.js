import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  // Vercel = racine. Pour GitHub Pages, déploie avec BASE_PATH=/Saro-birthday/
  base: process.env.BASE_PATH || '/',
})
