<script setup lang="ts">
import { computed, watch } from 'vue'
import { useTurntable } from '@/composables/useTurntable'
import EButton from '@/components/EButton.vue'
import ECard from '@/components/ECard.vue'
import useColors from '@/composables/useColors'
import { useTemplateStore } from '@/stores/template'
import useAnimate from '@/composables/useAnimate'
import useRouter from '@/composables/useRouter'
import { darkenColor } from '@/utils/gencolors'
import EHeader from '@/components/EHeader.vue'

const router = useRouter()
const template = useTemplateStore()

const originTitle = 'N决定大转盘'
const title = computed(() => template.current ? `${originTitle}之${template.current?.name}` : originTitle)

// init canvas and draw
const { turntable, onInit } = useTurntable('canvas')
onInit(redraw)
watch(() => template.options, redraw)

const { current, resultText, currentColor, darkenedColor, updateColors } = useColors(turntable)
const { state, animate, handleAnimationend } = useAnimate()

async function start() {
  if (template.options.length === 0) return uni.showToast({ icon: 'error', title: '请先创建模板～' })
  if (state.value === 'running') return
  state.value = 'running'
  current.value = await turntable.value.start()
  state.value = 'ended'
}

function redraw() {
  turntable.value.setOptions(template.options)
  if (turntable.value.colors.length === 0) updateColors()
  turntable.value.draw()
  current.value = -1
}

function changeTemplate() {
  router.push('/template/index')
}
</script>

<template>
  <view
    page h-full transition-all-750 ease-in flex="~ col"
    bg-red
    :style="{ backgroundColor: darkenedColor }"
  >
    <EHeader flex-shrink-0>
      {{ title }}
    </EHeader>
    <canvas id="canvas" flex-1 w-full type="2d" />
    <ECard flex-shrink-0 mx-xl :border-color="darkenColor(currentColor, 10) ?? '#333'">
      <view
        text="white/80 center" :class="animate"
        transition-all-750 ease-in text-xl mb-md font-bold
        :style="{ color: currentColor }"
        @animationend="e => handleAnimationend(e as any)"
      >
        {{ resultText }}
      </view>

      <view flex="~ col gap-md" :style="{ color: currentColor }">
        <EButton :background-color="darkenedColor" :border-color="darkenedColor" @click="start">
          决定转转
        </EButton>

        <EButton :background-color="darkenedColor" :border-color="darkenedColor" @click="updateColors">
          随机颜色
        </EButton>

        <EButton :background-color="darkenedColor" :border-color="darkenedColor" @click="changeTemplate">
          切换模板
        </EButton>
      </view>
    </ECard>
  </view>
</template>
