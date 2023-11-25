import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3003,
    host: '0.0.0.0',
  },
  
  
  plugins: [react()],
})
