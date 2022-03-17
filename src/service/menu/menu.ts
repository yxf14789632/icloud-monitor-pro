/*
 * @Author: mavon
 * @Date: 2022-01-18 16:05:29
 * @LastEditTime: 2022-01-19 10:24:04
 * @LastEditors: mavon
 * @Description:
 */
import imRequest from '../index'
import { IDataType } from '../login/type'

/**
 * 获取路由列表
 */
export function listRoutes() {
  return imRequest.get<IDataType<any>>({
    url: '/api/v1/menus/route'
  })
}
