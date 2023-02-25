import { createApp } from 'vue'
import App from './App.vue'
import fontawesome from './plugins/fontawesome'
import pinia from './plugins/pinia'

import '@/main.scss'

createApp(App).use(fontawesome).use(pinia).mount('#app')
