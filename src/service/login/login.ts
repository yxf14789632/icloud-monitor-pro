import request from '@/utils/request'
import { IAccount } from './type'

/**
 * 登录接口
 * @param account 用户信息
 * @returns
 */
export function accountLoginRequest(account: IAccount) {
  return request({
    url: '/login',
    method: 'post',
    data: account
  })
}

/**
 * 获取当前用户
 * @returns 用户信息
 */
export function getCurrentUserInfo() {
  return request({
    url: '/api/v1/users/me',
    method: 'get'
  })
}

/**
 * 获取用户路由
 * @returns
 */
export function requestUserMenu() {
  return request({
    url: '/api/v1/menus/route',
    method: 'get'
  })
}

/**
 * 退出登录
 * @returns
 */
export function logoutRequest() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}
