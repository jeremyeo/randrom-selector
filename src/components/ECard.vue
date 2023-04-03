<script setup lang="ts">
withDefaults(defineProps<{
  borderColor?: string
  backgroundColor?: string
}>(), {
  backgroundColor: 'rgba(51, 51, 51, 0.5)',
  borderColor: '#333333',
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <view w-full box-border @click="$emit('click')">
    <view
      transition-all-750 ease-in text="white"
      flex-shrink-0 rd-md p-4 border="~ 1px solid"
      :style="{ boxShadow: '0 8px 12px rgba(0, 0, 0, 0.4)', borderColor, backgroundColor }"
    >
      <slot />
    </view>
  </view>
</template>
