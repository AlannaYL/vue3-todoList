import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useimagesStore = defineStore('pics', () => {
  const images = reactive([
    { id: 1, name: 'duck', file: new URL('@/assets/duck.jpeg', import.meta.url).href },
    { id: 2, name: 'dog', file: new URL('@/assets/dog.jpeg', import.meta.url).href },
    { id: 3, name: 'lemon', file: new URL('@/assets/lemon.jpeg', import.meta.url).href }
  ])
  return {
    images
  }
})
