import { computed, watch } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import { darkenColor } from '@/utils/gencolors'
import type { Turntable } from '@/modules/turntable'

export default function useColors(
  turntable: ShallowRef<Turntable>,
  options: Ref<string[]>,
  current: Ref<number>,
) {
  const resultText = computed(() => options.value[current.value] ?? '开始吧')
  const currentColor = computed(() => turntable.value?.colors[current.value])
  const darkenedColor = computed(() => currentColor.value ? darkenColor(currentColor.value, 30) : '#181818')
  const boxShadow = computed(() => {
    return `0 0 100rpx 10rpx ${currentColor.value ? darkenColor(currentColor.value, 40) : 'rgba(100,100,100,0.3)'},
          0 0 50rpx 5rpx rgba(0,0,0,0.2)`
  })

  watch(currentColor, () => {
    setTimeout(() => {
      uni.setBackgroundColor({
        backgroundColor: darkenedColor.value,
      })
      uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: darkenedColor.value,
      })
    }, 400)
  })

  return {
    resultText,
    currentColor,
    darkenedColor,
    boxShadow,
  }
}
