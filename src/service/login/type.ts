export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  token: string
  name: string
}

export interface IUserInfoResult {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}

export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}

export interface Child {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: any
  parentId: number
}

export interface IUserMenusResult {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Child[]
}

export interface IDataType<T> {
  code: number
  data: T
}
