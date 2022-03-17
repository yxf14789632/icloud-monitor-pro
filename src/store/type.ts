import { IVaiTab } from './../service/login/type'
import { ILoginState } from './login/type'

export interface IRootState {
  routes: []
  activeSideTab: IVaiTab
  tabList: IVaiTab[]
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
