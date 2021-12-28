import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import imRequest from './service/index'
import * as Icons from '@element-plus/icons'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')

// 全局注册图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

console.log(process.env.NODE_ENV)

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

imRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log(res)
  })
