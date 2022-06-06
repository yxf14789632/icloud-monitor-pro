import request from '@/utils/request'

/**
 * 获取权限列表
 *
 * @param queryParams
 */
export function listPerms(queryParams: any) {
  return request({
    url: '/api/v1/permissions/list',
    method: 'get',
    params: queryParams
  })
}
