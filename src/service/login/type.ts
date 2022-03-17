export interface IAccount {
  username: string
  password: string
}

export interface ILoginResult {
  id: number
  token: string
  name: string
}

export interface IUserInfoResult {
  id: number
  nickname: string
  avatar: string
  roles: []
  perms: []
}

// export interface Child {
//   id: number
//   parentId: number
//   path: string
//   component: string
//   name: string
//   hidden: boolean
//   meta: Meta
//   children: Child[]
// }

export interface Meta {
  title: string
  icon: string
  roles: []
}

export interface IUserMenusResult {
  id: number
  parentId: number
  path: string
  component: string
  alwaysShow: boolean
  name: string
  hidden: boolean
  meta: Meta
  children: IUserMenusResult[]
}

export interface IVaiTab {
  title?: string
  path?: string
}

export interface IDataType<T> {
  code: number
  data: T
}
