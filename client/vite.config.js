import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: true,
  server:{
    watch:{
      usePolling:true,
    }
  }
})
