import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: "localhost",
      port: 5173,
      protocol: "ws",
  },
    proxy: {
      '/api': {
        target: 'https://pokemon-api-mirko.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
