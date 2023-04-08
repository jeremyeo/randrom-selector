import { computed, ref } from 'vue'
import type { ShallowRef } from 'vue'
import { darkenColor } from '@/utils/gencolors'
import type { Turntable } from '@/modules/turntable'
import { useTemplateStore } from '@/stores/template'

const current = ref(-1)

export default function useColors(
  turntable: ShallowRef<Turntable>,
) {
  const template = useTemplateStore()
  const resultText = computed(() => template.options[current.value] ?? '开始吧')
  const currentColor = computed(() => turntable.value?.colors[current.value] ?? '')
  const darkenedColor = computed(() => currentColor.value ? darkenColor(currentColor.value, 30) : '')

  function updateColors() {
    if (template.options.length === 0) return uni.showToast({ icon: 'error', title: '请先创建模板～' })
    turntable.value.updateColors()
    turntable.value.draw()
    const now = current.value
    current.value = -1
    current.value = now
  }

  return {
    current,
    resultText,
    currentColor,
    darkenedColor,
    updateColors,
  }
}
