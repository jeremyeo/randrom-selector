import { computed, ref } from 'vue'

export default function useAnimate() {
  const state = ref<'wait' | 'running' | 'ended'>('wait')
  const animate = computed(() => {
    if (state.value === 'wait') {
      return ['animate-mybounce', 'animate-duration-1500']
    }
    else if (state.value === 'ended') {
      return ['animate-fade-in', 'animate-mode-forwards', 'animate-duration-1500']
    }
    else if (state.value === 'running') {
      return ['animate-fade-out', 'animate-mode-forwards']
    }
    else {
      return []
    }
  })

  function handleAnimationend({ detail }: { detail: AnimationEvent }) {
    if (state.value === 'ended' && detail.animationName === 'fade-in')
      state.value = 'wait'
  }

  return {
    state,
    animate,
    handleAnimationend,
  }
}
