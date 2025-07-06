import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Esta línea le dice a Vite la URL base de tu aplicación en el servidor final
  base: '/MarketMallorca/ComponentLoginBuild/', 
})
