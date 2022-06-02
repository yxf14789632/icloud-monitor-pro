import request from '@/utils/request'

/**
 * 获取(树形下拉)菜单列表
 */
export function listTreeSelectMenus() {
  return request({
    url: '/api/v1/menus/tree-select',
    method: 'get'
  })
}
