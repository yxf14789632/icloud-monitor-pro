import imRequest from '../index'

import {
  IAccount,
  IDataType,
  ILoginResult,
  IUserInfoResult,
  IUserMenusResult
} from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return imRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return imRequest.get<IDataType<IUserInfoResult>>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenuByRoleId(id: number) {
  return imRequest.get<IDataType<IUserMenusResult[]>>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
