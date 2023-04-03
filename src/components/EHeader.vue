<script setup lang="ts">
import useColors from '@/composables/useColors'
import useCustomNav from '@/composables/useCustomNav'
import useRouter from '@/composables/useRouter'
import { useTurntable } from '@/composables/useTurntable'

const { statusHeight, buttonHeight, buttonInfo } = useCustomNav()
const { turntable } = useTurntable()
const { currentColor } = useColors(turntable)
const router = useRouter()

const pages = getCurrentPages()
const pageInfo = pages.slice(-1)[0]
const root = ['/index/index']
const canBack = root.every(path => !pageInfo.route?.includes(path))
</script>

<template>
  <view :style="{ height: statusHeight }" />
  <view
    transition-all-750 ease-in
    text="center white" relative
    :style="{
      height: buttonHeight,
      lineHeight: buttonHeight,
      padding: `0 calc(100% - ${buttonInfo.left}px)`,
      color: currentColor ?? 'rgba(255,255,255,0.8)',
    }"
  >
    <view v-if="canBack" absolute h-full flex justify-center items-center left-0 p-sm box-border @click="router.back()">
      <view v-if="pages.length === 1 && canBack" i-material-symbols-house-outline-rounded text-24px />
      <view v-else i-material-symbols-arrow-back-ios-rounded text-15px />
    </view>
    <view w-full truncate text-13px>
      <slot />
    </view>
  </view>
</template>
