import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import type { ManifestOptions } from 'vite-plugin-pwa'
import { VitePWA as PWA } from 'vite-plugin-pwa'
import { chunkSplitPlugin as ChunkSplit } from 'vite-plugin-chunk-split'

const manifest: Partial<ManifestOptions> = {
  name: 'BooCat',
  // eslint-disable-next-line camelcase
  short_name: 'BooCat',
  description: 'A book search engine',
  // eslint-disable-next-line camelcase
  theme_color: '#ffffff',
  icons: [
    {
      src: 'android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: 'android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}

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
      Pages({
        extensions: ['vue', 'md'],
        onRoutesGenerated: routes => generateSitemap({
          routes,
          hostname: 'https://boocat.org',
        }),
      }),
      Layouts(),
      Unocss(),
      ChunkSplit(),
      PWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: { enabled: true },
        manifest,
      }),
    ],
  }
})
