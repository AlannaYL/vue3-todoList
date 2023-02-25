<template>
  <div v-if="windowWidth > 768 || showSidebar" class="sideBar">
    <div class="sidebar-header">
      <p>Demon Todo List</p>
      <span class="sideBarIcon">
        <font-awesome-icon :icon="['fas', 'xmark']" @click="showSidebar = false" />
      </span>
    </div>
    <ul>
      <li
        v-for="i in news"
        :key="i.id"
        :class="{ 'selected': isSelected === i.id }"
        @click="findItem(news.findIndex(item => item.id === i.id))"
      >
        {{ i.name }}
      </li>
    </ul>
    <button :disabled="news.length === 10" :class="{ 'disabled': news.length === 10 }" @click="addItem">
      Add Item
    </button>
  </div>
  <!-- 遮罩 -->
  <div
    v-if=" windowWidth < 768 && showSidebar"
    class="sidebar-mask"
    @click="showSidebar = false"
  ></div>
  <div class="navBar">
    <ul class="navBarIcon">
      <li v-if="windowWidth < 768" @click="toggleSidebar">
        <font-awesome-icon :icon="['fas', 'bars']" class="size" />
      </li>
      <li @click="delItem(news.findIndex(item => item.id === newItem.id))">
        <font-awesome-icon :icon="['fas', 'trash-can']" class="size" />
      </li>
    </ul>
  </div>
  <div class="container">
    <div class="row">
      <!-- todolist 標題 -->
      <div class="col">
        <input v-model="newItem.name" class="input" type="text" placeholder="New Item Title" @keydown.enter="addItem">
      </div>
      <!-- 說明區 -->
      <div class="col-6 textarea-wrapper">
        <textarea v-model="newItem.content" maxlength="200"> </textarea>
        <label class="content"> {{ newItem.content.length }} /200 </label>
        <div class="inputdate">
          <input id="from" v-model="newItem.from" class="input date" type="date" style="text-align: center;">
          <p>~</p>
          <input id="to" v-model="newItem.to" class="input date" type="date" style="text-align: center;">
        </div>
      </div>
      <!-- 圖片選擇 -->
      <div class="col-6 ">
        <div>
          <img v-if="newItem.image !== ''" :src="newItem.image" class="image-show">
          <img v-else class="image-show">
        </div>
        <br>
        <button class="imgbutton" @click="showUpload = true">
          Upload Image
        </button>
      </div>
    </div>
    <div class="row" style="justify-content: flex-end">
      <div v-if="showUpload" class="upload">
        <font-awesome-icon :icon="['fas', 'xmark']" class="size" @click="showUpload = false" />
        <h3>Select an image</h3>
        <div v-for="img in images" :key="img.id" class="img" @click="selectedImageId(img.id)">
          <img :src="img.file">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useimagesStore } from '@/store/images'
import { useListStore } from './store/list'
import { storeToRefs } from 'pinia'

const showSidebar = ref(false)
const showUpload = ref(false)
const pics = useimagesStore()
const item = useListStore()
const { images } = storeToRefs(pics)
const { addItem, newItem, findItem, delItem } = item
const { news, isSelected } = storeToRefs(item)
const windowWidth = ref(window.innerWidth)
const onResize = () => {
  windowWidth.value = window.innerWidth
}

watch(windowWidth, (value) => {
  if (value > 768) {
    showSidebar.value = true
  }
})

window.addEventListener('resize', onResize)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const selectedImageId = (id) => {
  const image = images.value.find(image => image.id === id)
  newItem.image = image.file
}

// 確認日期區間是否符合要求
const validateDateRange = () => {
  if (!newItem.from) {
    return false
  }

  if (!newItem.to) {
    return true
  }

  // 將日期字串轉換為日期物件
  const fromDate = new Date(newItem.from)
  const toDate = new Date(newItem.to)

  // 如果起始日期大於結束日期，則不符合要求
  if (fromDate >= toDate) {
    return false
  }

  // 符合要求
  return true
}

watch(newItem, (value) => {
  if (!validateDateRange()) {
    // 如果不符合要求，將起始日期或結束日期設為空值
    if (newItem.from && newItem.to && new Date(newItem.from) >= new Date(newItem.to)) {
      newItem.to = ''
    } else {
      newItem.from = ''
    }
  }
}, { deep: true })

</script>
