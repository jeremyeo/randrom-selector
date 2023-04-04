<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import EButton from '@/components/EButton.vue'
import ECard from '@/components/ECard.vue'
import useRouter from '@/composables/useRouter'
import { useTemplateStore } from '@/stores/template'
import EHeader from '@/components/EHeader.vue'

const template = useTemplateStore()
const router = useRouter()
const mode = ref<'select' | 'edit'>('select')
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
          @click="mode === 'edit' ? editTemplate(temp.id) : template.select(temp.id)"
        >
          <view flex="~" items-center>
            <view flex-1 truncate>
              {{ temp.name }}
            </view>

            <view flex-shrink-0 flex justify-center items-center>
              <view v-if="temp.id !== template.id" v-show="mode === 'select'" i-carbon-radio-button text-xl />
              <view v-else v-show="mode === 'select'" i-carbon-radio-button-checked text-xl />
              <view v-show="mode === 'edit'" i-material-symbols-edit-outline-rounded text-xl />
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
      </view>
    </view>
  </view>
</template>
