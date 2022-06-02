import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localCache.getCache('token')
  if (to.path !== '/login' && !token) {
    NProgress.done()
    next({ path: '/login' })
  } else {
    NProgress.done()
    next()
  }
})

export default router
