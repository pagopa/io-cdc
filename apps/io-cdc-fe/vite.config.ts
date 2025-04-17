import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from 'vite-plugin-typescript';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript()
  ],
})
