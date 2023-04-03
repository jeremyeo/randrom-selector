import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

type RouteParamsValue = string | number | boolean

interface RouteParams {
  [k: string]: RouteParamsValue | RouteParamsValue[] | RouteParams | RouteParams[]
}

interface RouterPushOptions {
  query?: RouteParams
}

function paramsToJson(params: RouteParams) {
  return encodeURIComponent(JSON.stringify(params))
}

function jsonToParams(json: string) {
  return JSON.parse(decodeURIComponent(json))
}

export default function useRouter() {
  const currentParams = ref<RouteParams>()
  function push(url: string, { query = {} }: RouterPushOptions = {}) {
    const json = paramsToJson(query)
    uni.navigateTo({
      url: `/pages${url}?json=${json}`,
    })
  }

  function back(callback?: () => void) {
    uni.navigateBack({
      fail() {
        uni.redirectTo({ url: '/pages/index/index' })
      },
      complete: callback,
    })
  }

  onLoad((query) => {
    const params = jsonToParams(query?.json || '{}')
    currentParams.value = params
  })

  return {
    push,
    back,
    currentParams,
  }
}
