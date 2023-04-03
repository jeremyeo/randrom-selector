<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTurntable } from '@/composables/useTurntable'
import EButton from '@/components/EButton.vue'
import ECard from '@/components/ECard.vue'
import useColors from '@/composables/useColors'
import { useTemplateStore } from '@/stores/template'
import useCustomNav from '@/composables/useCustomNav'
import useAnimate from '@/composables/useAnimate'
import useRouter from '@/composables/useRouter'

const result = ref(-1)
const router = useRouter()
const template = useTemplateStore()

const originTitle = 'N决定大转盘'
const title = computed(() => template.current ? `${originTitle}之${template.current?.name}` : originTitle)

// init canvas and draw
const { turntable, onInit } = useTurntable('canvas')
onInit(redraw)
watch(() => template.options, redraw)

const { statusHeight, buttonHeight, buttonInfo } = useCustomNav()
const { resultText, currentColor, darkenedColor, boxShadow, updateColors } = useColors(turntable, result)
const { state, animate, handleAnimationend } = useAnimate()

async function start() {
  if (template.options.length === 0) return uni.showToast({ icon: 'error', title: '请先创建模板～' })
  state.value = 'running'
  result.value = await turntable.value.start()
  state.value = 'ended'
}

function redraw() {
  turntable.value.setOptions(template.options)
  turntable.value.draw()
}

function changeTemplate() {
  router.push('/template/index')
}
</script>

<template>
  <view
    page h-full transition-all-750 ease-in bg="#181818" flex="~ col"
    :style="{ backgroundColor: darkenedColor }"
  >
    <view :style="{ height: statusHeight }" />
    <view
      transition-all-750 ease-in
      text="center white" truncate
      :style="{
        height: buttonHeight,
        lineHeight: buttonHeight,
        padding: `0 calc(100% - ${buttonInfo.left}px)`,
        color: currentColor,
      }"
    >
      {{ title }}
    </view>
    <canvas id="canvas" flex-1 w-full type="2d" />
    <ECard flex-shrink-0 mx-xl :box-shadow="boxShadow">
      <view
        text="white/10 center" :class="animate"
        transition-all-750 ease-in text-xl mb-md font-bold
        :style="{ color: currentColor }"
        @animationend="e => handleAnimationend(e as any)"
      >
        {{ resultText }}
      </view>

      <view flex="~ col gap-md" :style="{ color: currentColor }">
        <EButton @click="start">
          决定转转
        </EButton>

        <EButton @click="updateColors">
          随机颜色
        </EButton>

        <EButton @click="changeTemplate">
          切换模板
        </EButton>
      </view>
    </ECard>
  </view>
</template>
