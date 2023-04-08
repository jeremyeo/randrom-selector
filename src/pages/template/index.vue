<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import EButton from '@/components/EButton.vue'
import ECard from '@/components/ECard.vue'
import useRouter from '@/composables/useRouter'
import { useTemplateStore } from '@/stores/template'
import EHeader from '@/components/EHeader.vue'
import type { Template } from '@/types'

const template = useTemplateStore()
const router = useRouter()
const mode = ref<'select' | 'edit' | 'remove'>('select')
function editTemplate(templateId: number) {
  router.push('/template/editor', {
    query: { templateId },
  })
}

function handleAdd() {
  const templateId = +new Date()
  template.add({
    id: templateId,
    name: '',
    options: [],
  })

  router.push('/template/editor', { query: { templateId } })
}

onShow(() => {
  template.clearEmpty()
  if (template.all.length === 1) template.select(template.all[0].id)
})

function handleAction(temp: Template) {
  switch (mode.value) {
    case 'select':
      template.select(temp.id)
      break
    case 'edit':
      editTemplate(temp.id)
      break
    case 'remove':
      uni.showModal({
        title: '提示',
        content: '是否要删除这个模板？',
        cancelText: '取消',
        confirmText: '删除',
        success() {
          template.remove(temp.id)
        },
      })
      break
  }
}
</script>

<template>
  <view page>
    <view h-full flex="~ col">
      <EHeader flex-shrink-0>
        模板管理
      </EHeader>
      <view flex-1 px-sm py-sm overflow-auto flex="~ col gap-2">
        <ECard
          v-for="temp in template.all" :key="temp.id"
          :hidden-shadow="true"
          @click="handleAction(temp)"
        >
          <view flex="~" items-center>
            <view flex-1 truncate>
              {{ temp.name }}
            </view>

            <view flex-shrink-0 flex justify-center items-center>
              <view v-if="temp.id !== template.id" v-show="mode === 'select'" i-carbon-radio-button text-xl />
              <view v-else-if="mode === 'select'" i-carbon-radio-button-checked text-xl />
              <view v-if="mode === 'edit'" i-material-symbols-edit-outline-rounded text-xl />
              <view v-if="mode === 'remove'" i-material-symbols-delete-outline-rounded text-xl />
            </view>
          </view>
        </ECard>
      </view>

      <view pt-sm px-sm flex-shrink-0 shadow-sm flex="~ col gap-2">
        <EButton v-show="template.all.length > 0" @click="mode = mode === 'edit' ? 'select' : 'edit'">
          {{ mode === 'select' ? '更改模板' : '选择模板' }}
        </EButton>
        <EButton @click="handleAdd">
          创建模板
        </EButton>
        <EButton v-show="template.all.length > 0" @click="mode = 'remove'">
          删除模板
        </EButton>
      </view>
    </view>
  </view>
</template>
