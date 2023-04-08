import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Template } from '@/types'

function loadTemplates() {
  const template = uni.getStorageSync('templates') || `[
    {
      "id": 1,
      "name": "今天玩什么？",
      "options": ["英雄联盟", "绝地求生", "王者荣耀", "金铲铲之战", "地下城与勇士"]
    }
  ]`
  return JSON.parse(template)
}

function saveTemplates(templates: Template[]) {
  uni.setStorageSync('templates', JSON.stringify(templates))
}

function loadCurrentTemplateId() {
  const templateId = Number(uni.getStorageSync('templateId')) || 1
  return templateId
}

function saveCurrentTemplateId(id: number) {
  uni.setStorageSync('templateId', id)
}

export const useTemplateStore = defineStore('template', () => {
  const id = ref(loadCurrentTemplateId())
  const all = ref<Template[]>(loadTemplates())

  watch(all, saveTemplates, { deep: true })
  watch(id, saveCurrentTemplateId)

  const current = computed(() => all.value.find(template => template.id === id.value))
  const options = computed(() => current.value?.options || [])

  function add(template: Template) {
    if (all.value.find(t => t.name === template.name))
      return uni.showToast({ icon: 'none', title: '已经用过这个名字啦，请换一个哦～' })
    all.value.push(template)
  }

  function update(template: Template) {
    const target = all.value.find(t => t.id === template.id)
    if (!target) return

    Object.assign(target, template)
  }

  function select(templateId: number) {
    id.value = templateId
  }

  function remove(templateId: number) {
    const index = all.value.findIndex(template => template.id === templateId)
    if (index === -1) return
    all.value.splice(index, 1)

    if (all.value.length > 0 && id.value === templateId) id.value = all.value[0].id
  }

  function clearEmpty() {
    all.value = all.value.filter(template => template.name !== '' && template.options.length > 0)
  }

  return {
    id,
    all,
    options,
    current,
    add,
    update,
    select,
    clearEmpty,
    remove,
  }
})
