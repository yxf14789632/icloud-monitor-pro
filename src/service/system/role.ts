import imRequest from '../index'
import { IDataType } from '../login/type'

/**
 * 获取角色列表
 *
 * @param queryParams
 */
export function listRoles(queryParams?: any) {
  return imRequest.get<IDataType<any>>({
    url: '/api/v1/roles',
    params: queryParams
  })
}
