import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetIcons({
      prefix: '',
      scale: 1.2,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
