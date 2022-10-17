import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
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
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
      }),
      AutoImport({
        vueTemplate: true,
        imports: ['vue', 'vue/macros'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables'],
      }),
      Markdown({ wrapperClasses: 'prose m-auto' }),
      Components({
        extensions: ['vue', 'md'],
        dts: 'src/types/components.d.ts',
      }),
      Pages({ extensions: ['vue', 'md'] }),
      Layouts(),
      Unocss(),
    ],
  }
})
