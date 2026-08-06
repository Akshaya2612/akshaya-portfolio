import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' works both at username.github.io root and in a project subpath
export default defineConfig({
  plugins: [react()],
  base: './',
})
