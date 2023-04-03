<script setup lang="ts">
import EHeader from './EHeader.vue'
</script>

<template>
  <view page overflow-hidden flex="~ col">
    <EHeader flex-shrink-0>
      <slot name="title" />
    </EHeader>

    <view flex="~ 1 col" overflow-auto>
      <slot />
    </view>
  </view>
</template>
