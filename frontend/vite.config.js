import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import keys from '../keys.json'

console.log((keys.mode=="production")?keys.backend_proxy: 'http://127.0.0.1:8000')

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Proxying API requests to Django
      '/api': {
        // target: "https://destinyrecaps.com",
        target: (keys.mode=="production")?keys.backend_proxy: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    }
  }
})

