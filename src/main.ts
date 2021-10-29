import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import { bus } from '@/assets/mitt'

import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/global.scss'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)

app.config.globalProperties.$bus = bus

app.mount('#app')
