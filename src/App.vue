<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
page, view, text, button {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.8);
}
</style>
