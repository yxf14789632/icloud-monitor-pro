import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes('ROOT')) {
      return true
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role)
      }
    })
  }
  return false
}

export function filterAsyncRoutes(
  userMenus: any[],
  roles: string[]
): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  // const allRoutes: RouteRecordRaw[] = []
  userMenus.forEach((menu) => {
    const route = { ...menu } as any
    if (hasPermission(roles, route)) {
      if (menu.component === 'Layout') {
        route.component = Layout
        routes.push(route)
      } else {
        route.component = () => import('@/views/' + menu.component + '.vue')
        routes.push(route)
      }

      if (menu.children) {
        route.children = filterAsyncRoutes(menu.children, roles)
      }
    }
  })

  return routes
}
