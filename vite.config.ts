import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      proxy: {
        '/api': {
          target: env.endpoint,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      tsconfigPaths({ loose: true }),
      Vue({
        reactivityTransform: true,
      }),
      AutoImport({
        imports: ['vue', 'vue/macros'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables'],
      }),
      Components({
        dts: 'src/types/components.d.ts',
      }),
      // Frontend
      Pages(),
      Layouts(),
      Unocss(),
    ],
  }
})
