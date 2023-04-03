<script setup lang="ts">
withDefaults(defineProps<{
  disabled: boolean
  loading: boolean
  openType: string
}>(), {
  disabled: false,
  loading: false,
  openType: '',
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    :loading="loading"
    :open-type="openType"
    hover-class="button-hover"
    text="white/50"
    bg="black/10"
    after:border-none
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
