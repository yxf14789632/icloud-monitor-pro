import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import { IVaiTab } from '@/service/login/type'

const store = createStore<IRootState>({
  state: () => {
    return {
      routes: [],
      activeSideTab: {},
      tabList: [] // 用于存储navTab
    }
  },
  mutations: {
    setActiveSideTab(state: IRootState, vaitab: IVaiTab) {
      state.activeSideTab = vaitab
    },
    setRoutes(state: IRootState, routes: []) {
      state.routes = routes
    },
    addTab: (state, tab: IVaiTab) => {
      if (state.tabList.some((item) => item.path === tab.path)) return
      state.tabList.push(tab)
    }
  },
  getters: {
    getSideTab: (state: IRootState) => {
      return state.activeSideTab
    },
    getRoutes: (state: IRootState) => {
      return state.routes
    },
    getTabs: (state: IRootState) => {
      return state.tabList
    }
  },
  actions: {},
  modules: {
    login: login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
