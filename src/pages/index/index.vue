<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTurntable } from '@/composables/useTurntable'
import EButton from '@/components/EButton.vue'
import ECard from '@/components/ECard.vue'
import useColors from '@/composables/useColors'
import { useTemplateStore } from '@/stores/template'

const { turntable, onInit } = useTurntable('canvas')
const template = useTemplateStore()
const options = computed(() => template.current?.options || [])
const result = ref(-1)
const { resultText, currentColor, darkenedColor, boxShadow } = useColors(turntable, options, result)
const state = ref<'wait' | 'running' | 'ended'>('wait')
const animate = computed(() => {
  if (state.value === 'wait') {
    return ['animate-mybounce', 'animate-duration-1500']
  }
  else if (state.value === 'ended') {
    return ['animate-fade-in', 'animate-mode-forwards', 'animate-duration-1500']
  }
  else if (state.value === 'running') {
    return ['animate-fade-out', 'animate-mode-forwards']
  }
  else {
    return []
  }
})

// 胶囊按钮信息
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// 手机信息
const mobileInfo = uni.getSystemInfoSync()

const statusHeight = `${mobileInfo.statusBarHeight!}px`
// 按钮与手机状态栏之间的间隙： 对应图中3
const buttonMaginTopBottom = menuButtonInfo.top - mobileInfo.statusBarHeight!
// 包含分享按钮的容器高度：图中蓝色区域部分
const buttonHeight = `${menuButtonInfo.height + 2 + buttonMaginTopBottom * 2}px`

const originTitle = 'N决定大转盘'
const title = computed(() => template.current ? `${originTitle}之${template.current?.name}` : originTitle)

onInit(() => {
  redraw()
})

watch(options, redraw, { deep: true })

async function start() {
  if (options.value.length === 0) return uni.showToast({ icon: 'error', title: '请先创建模板～' })
  state.value = 'running'
  result.value = await turntable.value.start()
  state.value = 'ended'
}

function redraw() {
  turntable.value.setOptions(options.value)
  turntable.value.draw()
}

function changeColors() {
  turntable.value.updateColors()
  turntable.value.draw()
  const now = result.value
  result.value = -1
  result.value = now
}

function changeTemplate() {
  uni.navigateTo({
    url: '/pages/template/index',
  })
}

function handleAnimate({ detail }: { detail: AnimationEvent }) {
  if (state.value === 'ended' && detail.animationName === 'fade-in')
    state.value = 'wait'
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
      :style="{
        height: buttonHeight,
        lineHeight: buttonHeight,
        padding: `0 calc(100% - ${menuButtonInfo.left}px)`,
        color: currentColor,
      }"
      text="center white" truncate
    >
      {{ title }}
    </view>
    <canvas id="canvas" flex-1 w-full type="2d" />
    <ECard flex-shrink-0 mx-xl :box-shadow="boxShadow">
      <view
        text="white/10 center" :class="animate"
        transition-all-750 ease-in text-xl mb-md font-bold
        :style="{ color: currentColor }"
        @animationend="e => handleAnimate(e as any)"
      >
        {{ resultText }}
      </view>

      <view flex="~ col gap-md" :style="{ color: currentColor }">
        <EButton @click="start">
          决定转转
        </EButton>

        <EButton @click="changeColors">
          随机颜色
        </EButton>

        <EButton @click="changeTemplate">
          切换模板
        </EButton>
      </view>
    </ECard>
  </view>
</template>
