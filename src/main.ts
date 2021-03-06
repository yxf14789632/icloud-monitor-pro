import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'
import * as Icons from '@element-plus/icons'
import IconPlugin from '@/icons/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(store)
// 刷新 重新load localCache数据到vuex中
setupStore()
app.use(router)
app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
app.use(IconPlugin)
app.mount('#app')

// 全局注册图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

// 自定义指令
import * as directive from '@/directive'

Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key])
})
