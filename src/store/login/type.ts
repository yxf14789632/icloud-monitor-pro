import { IUserMenusResult } from '@/service/login/type'

export interface ILoginState {
  token: string
  userInfo: any
  userMenus: IUserMenusResult[]
}
