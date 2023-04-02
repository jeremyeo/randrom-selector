import { getCurrentInstance, shallowRef } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import type { ShallowRef } from 'vue'
import { Turntable } from '@/modules/turntable'

export function useTurntable(id: string) {
  const subscribers = new Set<() => void>()
  const turntable = shallowRef<Turntable>()
  onReady(() => {
    const selector = uni.createSelectorQuery().in(getCurrentInstance())
    const canvasEl = selector.select(`#${id}`)
    canvasEl.node(({ node: canvas }) => {
      turntable.value = new Turntable(canvas)
    }).exec()

    canvasEl.boundingClientRect((info) => {
      const { width, height } = info as UniApp.NodeInfo
      if (!turntable.value) return
      turntable.value.setSize(width!, height!)

      subscribers.forEach((subscriber) => {
        subscriber()
      })
      subscribers.clear()
    }).exec()
  })

  function onInit(fn: () => void) {
    subscribers.add(fn)
  }

  return {
    onInit,
    turntable: turntable as ShallowRef<Turntable>,
  }
}
