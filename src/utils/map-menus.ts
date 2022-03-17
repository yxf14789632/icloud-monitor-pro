import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export function filterAsyncRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  // const allRoutes: RouteRecordRaw[] = []
  userMenus.forEach((menu) => {
    const route = { ...menu } as any
    if (menu.component === 'Layout') {
      route.component = Layout
      routes.push(route)
    } else {
      route.component = () => import('@/views/' + menu.component + '.vue')
      routes.push(route)
    }

    if (menu.children) {
      route.children = filterAsyncRoutes(menu.children)
    }
  })

  return routes
}
