/*
 * @Author: Mavon
 * @Description:
 * @Date: 2022-06-06 17:56:55
 * @LastEditTime: 2022-06-06 17:57:04
 * @FilePath: /icloud-monitor-pro/src/utils/validate.ts
 */

const hasPermission = (roles: string[], route: any) => {
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

export { hasPermission }
