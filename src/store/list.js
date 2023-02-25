import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useListStore = defineStore('List', () => {
  const news = reactive([])
  const isSelected = ref(null)

  const newItem = reactive({
    id: 1,
    name: '',
    content: 'content...',
    from: null,
    to: null,
    image: ''
  })

  const addItem = () => {
    const newId = news.length > 0 ? news[news.length - 1].id + 1 : 1
    newItem.id++
    news.push({
      id: newId,
      name: newItem.name,
      content: newItem.content,
      from: newItem.from,
      to: newItem.to,
      image: newItem.image
    })
  }

  const findItem = (idx) => {
    newItem.id = news[idx].id
    newItem.name = news[idx].name
    newItem.content = news[idx].content
    newItem.from = news[idx].from
    newItem.to = news[idx].to
    newItem.image = news[idx].image
    isSelected.value = news[idx].id
  }

  const delItem = (idx) => {
    news.splice(idx, 1)
    newItem.name = ''
    newItem.content = ''
    newItem.from = ''
    newItem.to = ''
    newItem.image = ''
  }

  return {
    news,
    newItem,
    addItem,
    findItem,
    delItem,
    isSelected
  }
})
