import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    // Ensure Redux and other dependencies are properly bundled
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {

      external: [] 
    }
  },
  optimizeDeps: {
    include: ['redux', 'react-redux', '@reduxjs/toolkit']
  }
})
