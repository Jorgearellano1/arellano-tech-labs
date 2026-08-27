import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
            if (id.includes('i18next')) return 'i18n'
            if (id.includes('react-router')) return 'router'
            if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'react'
            return 'vendor'
          }
        },
      },
    },
  },
})
