import { IUserInfoResult, IUserMenusResult } from './../../service/login/type'
import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from './../type'
import {
  accountLoginRequest,
  getCurrentUserInfo,
  requestUserMenu
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import router from '@/router'
import { filterAsyncRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: IUserInfoResult) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: IUserMenusResult[]) {
      state.userMenus = userMenus
      const routes = filterAsyncRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute(route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, playload: IAccount) {
      // 1、登录
      const loginResult = await accountLoginRequest(playload)
      const { token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 请求用户信息
      const userInfoResult = await getCurrentUserInfo()
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // // 3. 请求用户菜单
      const userMenusResult = await requestUserMenu()
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4、跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
