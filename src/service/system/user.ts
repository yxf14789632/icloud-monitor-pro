import imRequest from '../index'
import { IDataType } from '../login/type'

export function listUsersWithPage(queryParams: any) {
  return imRequest.get<IDataType<any>>({
    url: '/api/v1/users',
    params: queryParams
  })
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserFormDetail(userId: any) {
  return imRequest.get({
    url: '/api/v1/users/' + userId
  })
}

/**
 * 新增用户
 * @param data 用户信息
 * @returns
 */
export function addUser(data: any) {
  return imRequest.post<IDataType<any>>({
    url: '/api/v1/users',
    method: 'post',
    data: data
  })
}

/**
 * 修改用户
 *
 * @param id 用户id
 * @param data 修改内容
 */
export function updateUser(id: number, data: any) {
  return imRequest.put({
    url: '/api/v1/users/' + id,
    method: 'put',
    data: data
  })
}

export function deleteUsers(userIds: any) {
  return imRequest.delete({
    url: '/api/v1/users/' + userIds,
    method: 'delete'
  })
}

/**
 * 选择性修改用户
 *
 * @param id
 * @param data
 */
export function updateUserPart(id: number, data: any) {
  return imRequest.patch({
    url: '/api/v1/users/' + id,
    method: 'patch',
    data: data
  })
}
