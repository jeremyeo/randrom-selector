import { getCurrentInstance, shallowRef } from 'vue'
import { onReady, onUnload } from '@dcloudio/uni-app'
import type { ShallowRef } from 'vue'
import { Turntable } from '@/modules/turntable'

const turntable = shallowRef<Turntable>()

export function useTurntable(id?: string) {
  const subscribers = new Set<() => void>()

  id && onUnload(() => {
    turntable.value = undefined
  })

  turntable.value
    ? notify()
    : onReady(() => {
      if (!id) return
      const selector = uni.createSelectorQuery().in(getCurrentInstance())
      const canvasEl = selector.select(`#${id}`)
      canvasEl.node(({ node: canvas }) => {
        turntable.value = new Turntable(canvas)
      }).exec()

      canvasEl.boundingClientRect((info) => {
        const { width, height } = info as UniApp.NodeInfo
        if (!turntable.value) return
        const dpr = uni.getSystemInfoSync().pixelRatio
        turntable.value.setSize(width!, height!, dpr)
        notify()
      }).exec()
    })

  function notify() {
    subscribers.forEach((subscriber) => {
      subscriber()
    })
    subscribers.clear()
  }

  function onInit(fn: () => void) {
    subscribers.add(fn)
  }

  return {
    onInit,
    turntable: turntable as ShallowRef<Turntable>,
  }
}
