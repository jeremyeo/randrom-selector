<script setup lang="ts">
defineProps<{
  boxShadow?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <view w-full box-border @click="$emit('click')">
    <view
      shadow-md transition-all-750 ease-in text="white/50"
      flex-shrink-0 rd-md p-4 bg="gray-500/5"
      :style="{ boxShadow }"
    >
      <slot />
    </view>
  </view>
</template>
