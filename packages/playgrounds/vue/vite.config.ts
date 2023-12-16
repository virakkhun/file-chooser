import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [vue()],
  base: env.command === 'build' ? '/vue-file-chooser/' : '/'
}))
