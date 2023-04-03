import { computed } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import { darkenColor } from '@/utils/gencolors'
import type { Turntable } from '@/modules/turntable'
import { useTemplateStore } from '@/stores/template'

export default function useColors(
  turntable: ShallowRef<Turntable>,
  current: Ref<number>,
) {
  const template = useTemplateStore()
  const resultText = computed(() => template.options[current.value] ?? '开始吧')
  const currentColor = computed(() => turntable.value?.colors[current.value])
  const darkenedColor = computed(() => currentColor.value ? darkenColor(currentColor.value, 30) : '#181818')
  const boxShadow = computed(() => {
    return `0 0 100rpx 10rpx ${currentColor.value ? darkenColor(currentColor.value, 40) : 'rgba(100,100,100,0.3)'},
          0 0 50rpx 5rpx rgba(0,0,0,0.2)`
  })

  function updateColors() {
    turntable.value.updateColors()
    turntable.value.draw()
    const now = current.value
    current.value = -1
    current.value = now
  }

  return {
    resultText,
    currentColor,
    darkenedColor,
    boxShadow,
    updateColors,
  }
}
