import useStore from '@/store'
import { Directive, DirectiveBinding } from 'vue'
import localCache from '@/utils/cache'

/**
 * 按钮权限校验
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「超级管理员」拥有所有的按钮权限
    const user = localCache.getCache('userInfo')
    const roles = user.roles
    if (roles.includes('ROOT')) {
      return true
    }
    // 「其他角色」按钮权限校验
    const { value } = binding
    if (value) {
      const requiredPerms = value // DOM绑定需要的按钮权限标识

      const hasPerm = user.perms?.some((perm: any) => {
        return requiredPerms.includes(perm)
      })

      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(
        "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
      )
    }
  }
}

/**
 * 角色权限校验
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (value) {
      const requiredRoles = value // DOM绑定需要的角色编码
      const user = localCache.getCache('userInfo')
      const hasRole = user.roles.some((perm: any) => {
        return requiredRoles.includes(perm)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"")
    }
  }
}
