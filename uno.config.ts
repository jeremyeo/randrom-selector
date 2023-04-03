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
  theme: {
    animation: {
      keyframes: {
        mybounce: '{0%,20%,53%,to {animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);transform: translateZ(0);}40%,43% {animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);transform: translate3d(0, -30px, 0) scaleY(1.1);}70% {animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);transform: translate3d(0, -15px, 0) scaleY(1.05);}80% {transform: translateZ(0) scaleY(0.95);transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);}90% {transform: translate3d(0, -4px, 0) scaleY(1.02);}}',
      },
      durations: {
        mybounce: '1s',
      },
      counts: {
        mybounce: 'infinite',
      },
    },
  },
  rules: [
    ['page', {
      'padding-bottom': 'max(env(safe-area-inset-bottom), 48rpx)',
      'background-color': 'black',
      'box-sizing': 'border-box',
      'overflow': 'auto',
      'height': '100vh',
    }],
  ],
  safelist: [
    'animate-mybounce',
    'animate-duration-1500',
    'animate-fade-in',
    'animate-fade-out',
    'animate-mode-forwards',
  ],
})
