import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import imRequest from './service/index'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')

imRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
