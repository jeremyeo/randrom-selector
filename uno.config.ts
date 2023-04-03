import { defineConfig, presetIcons } from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default defineConfig({
  presets: [
    presetWeapp(),
    presetIcons(),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
  ],
  rules: [
    ['page', {
      'padding-bottom': 'env(safe-area-inset-bottom)',
      'background-color': '#181818',
      'box-sizing': 'border-box',
      'overflow': 'auto',
      'height': '100vh',
    }],
  ],
})
