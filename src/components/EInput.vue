<script setup lang="ts">
import { nextTick, ref } from 'vue'

withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: '',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const focus = ref(false)

defineExpose({
  focus() {
    focus.value = false
    nextTick(() => {
      focus.value = true
    })
  },
})
</script>

<template>
  <view border="~ 1rpx solid black/25" flex="~" rd-md>
    <input
      flex-1 p-2
      type="text"
      :value="modelValue"
      :focus="focus"
      @blur="$emit('blur')"
      @input="(e: any) => $emit('update:modelValue', e.detail.value)"
    >

    <view flex-shrink-0 flex="~" justify-center items-center>
      <slot name="right" />
    </view>
  </view>
</template>
