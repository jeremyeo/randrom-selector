<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { cloneDeep } from 'lodash-es'
import { nextTick, ref } from 'vue'
import EInput from '@/components/EInput.vue'
import useRouter from '@/composables/useRouter'
import { useTemplateStore } from '@/stores/template'
import type { Template } from '@/types'
import EButton from '@/components/EButton.vue'

const router = useRouter()
const { update, all } = useTemplateStore()
const template = ref<Template>()
onLoad(initData)

let isFirst = true
function initData() {
  const target = all.find(template => template.id === router.currentParams.value?.templateId)
  template.value = cloneDeep(target)
  !isFirst && uni.showToast({ title: '已还原到更改前' })
  isFirst = false
}

function removeOptionByIndex(index: number) {
  if (!template.value) return
  template.value && template.value.options.splice(index, 1)
}

function handleBlur(index: number) {
  if (template.value && template.value.options[index].trim() === '') {
    removeOptionByIndex(index)
  }
}

function handleAdd() {
  if (!template.value) return
  template.value.options.push('')
  nextTick(() => {

  })
}

function handleNew(input: InstanceType<typeof EInput>) {
  input.focus()
}

function handleSave() {
  if (!template.value) return
  if (template.value.name === '') return uni.showToast({ icon: 'error', title: '模板名称不能为空' })
  if (template.value.options.length === 0) return uni.showToast({ icon: 'error', title: '模板选项不能为空' })
  update(template.value)
  uni.showToast({ title: '保存成功' })
  router.back()
}
</script>

<template>
  <view page p-sm>
    <view v-if="template" flex="~ col gap-2xl">
      <view flex="~ col gap-2">
        <view text="gray-500/50">
          模板名称
        </view>
        <EInput v-model="template.name" />
      </view>

      <view flex="~ col gap-2">
        <view text="gray-500/50">
          选项
        </view>

        <view v-for="(_, index) in template.options" :key="index" flex="~" items-center>
          <EInput
            :ref="instance => template && template.options[index] === '' && handleNew(instance as any)"
            v-model="template.options[index]"
            flex-1
            @blur="handleBlur(index)"
          >
            <template #right>
              <view p-2 @click="removeOptionByIndex(index)">
                <view i-material-symbols-delete-outline-rounded text-xl />
              </view>
            </template>
          </EInput>
        </view>

        <EButton @click="handleAdd">
          增加选项
        </EButton>
      </view>

      <view flex="~ col gap-sm">
        <EButton @click="initData">
          重置更改
        </EButton>
        <EButton @click="handleSave">
          保存模板
        </EButton>
      </view>
    </view>
  </view>
</template>
