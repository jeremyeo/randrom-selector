<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTurntable } from '@/composables/useTurntable'

const index = ref(-1)
const { turntable, onInit } = useTurntable('canvas')

const options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9']
const result = computed(() => options[index.value] ?? '暂无')
onInit(() => {
  turntable.value.setOptions(options)
  turntable.value.draw()
})

async function start() {
  index.value = await turntable.value.start()
}

function changeColors() {
  turntable.value.updateColors()
  turntable.value.draw()
}
</script>

<template>
  <view h-full flex="~ col">
    <canvas id="canvas" flex-1 w-full type="2d" />
    <view flex-shrink-0 bg-red h-300>
      <view>{{ result }}</view>

      <button @click="start">
        开始
      </button>

      <button @click="changeColors">
        换色
      </button>
    </view>
  </view>
</template>
