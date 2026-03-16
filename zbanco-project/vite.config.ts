import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isGithub = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGithub ? "/prueba-tecnica-zbanco" : "",
  plugins: [react(), tailwindcss()],
})
