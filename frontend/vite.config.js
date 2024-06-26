import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Proxying API requests to Django
      '/api': {
        target: (process.env.mode=="production")?process.env.backend_proxy: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    }
  }
})

