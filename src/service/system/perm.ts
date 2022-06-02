/*
 * @Author: your name
 * @Date: 2022-03-17 20:42:13
 * @LastEditTime: 2022-03-17 20:50:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /icloud-monitor-pro/src/service/system/perm.ts
 */
import imRequest from '../index'

/**
 * 获取权限列表
 *
 * @param queryParams
 */
export function listPerms(queryParams: any) {
  return imRequest.get({
    url: '/api/v1/permissions/list',
    method: 'get',
    params: queryParams
  })
}
