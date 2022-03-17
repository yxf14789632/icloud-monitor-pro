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
  LoginUserInfo = '/api/v1/users',
  UserMenus = '/api/v1/menus'
}

export function accountLoginRequest(account: IAccount) {
  return imRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function getCurrentUserInfo() {
  return imRequest.get<IDataType<IUserInfoResult>>({
    url: LoginAPI.LoginUserInfo + '/me'
  })
}

export function requestUserMenu() {
  return imRequest.get<IDataType<IUserMenusResult[]>>({
    url: LoginAPI.UserMenus + '/route'
  })
}
